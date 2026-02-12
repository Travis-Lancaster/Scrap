import type { TemplateRow } from "../types/template";
import * as XLSX from "xlsx";

/**
 * Extended field definition with XLSX-specific properties
 */
interface ExtendedXlsxField {
	col?: number // Column index
	headerName?: string // Find column by header text
	sheet?: string // Override sheet for cross-sheet reference
	repeat?: boolean // Whether field repeats per row (default: true)
	sourceRow?: number // For non-repeating: specific row to extract from
}

/**
 * Parse XLSX workbook using a template
 *
 * @param template - Array of template rows defining extraction rules
 * @param workbook - XLSX workbook object
 * @returns Parsed data object with simple fields and row patterns
 */
export function XlsxParser(
	template: TemplateRow[],
	workbook: XLSX.WorkBook,
): Record<string, any> {
	const output: Record<string, any> = {};

	// Cache for non-repeating field values (extracted once)
	const nonRepeatingCache: Record<string, Record<string, any>> = {};

	// Track line numbers for each pattern array
	const patternLineNumbers: Record<string, number> = {};

	// Cache for header row column mappings
	const headerColumnCache: Record<string, Map<string, number>> = {};

	for (const row of template) {
		// Determine which sheet to use
		const sheetName = row.sheet || workbook.SheetNames[0];
		const worksheet = workbook.Sheets[sheetName];

		if (!worksheet) {
			console.warn(`Sheet "${sheetName}" not found in workbook`);
			continue;
		}

		// ─────────────────────────────
		// SIMPLE FIELD (Single Cell)
		// ─────────────────────────────
		if (!row.Column) {
			if (row.row == null || row.col == null)
				continue;

			const value = getCellValue(worksheet, row.row, row.col);
			output[row.Name] = value;

			continue;
		}

		// ─────────────────────────────
		// ROW PATTERN (Repeating Structure)
		// ─────────────────────────────
		if (!output[row.Name]) {
			output[row.Name] = [];
			patternLineNumbers[row.Name] = 0;
		}

		const rowObj: Record<string, any> = {};

		// Auto-add LineNumber field (0-based, incrementing)
		rowObj.LineNumber = patternLineNumbers[row.Name];
		patternLineNumbers[row.Name]++;

		// Build header column cache if needed
		if (row.headerRow !== undefined) {
			const cacheKey = `${sheetName}_${row.headerRow}`;
			if (!headerColumnCache[cacheKey]) {
				headerColumnCache[cacheKey] = buildHeaderColumnMap(worksheet, row.headerRow);
			}
		}

		// Process each column in the pattern
		for (const [key, def] of Object.entries(row.Column)) {
			const value = resolveColumnValue(
				workbook,
				def,
				sheetName,
				row.row!,
				row.headerRow,
				headerColumnCache,
				nonRepeatingCache,
				row.Name,
				key,
			);

			rowObj[key] = value;
		}

		output[row.Name].push(rowObj);
	}

	return output;
}

/**
 * Resolve the value for a column based on its definition
 */
function resolveColumnValue(
	workbook: XLSX.WorkBook,
	columnDef: any,
	currentSheet: string,
	currentRow: number,
	headerRow: number | undefined,
	headerColumnCache: Record<string, Map<string, number>>,
	nonRepeatingCache: Record<string, Record<string, any>>,
	patternName: string,
	columnKey: string,
): any {
	// Handle empty object
	if (columnDef === null || (typeof columnDef === "object" && Object.keys(columnDef).length === 0)) {
		return null;
	}

	// Handle static/literal value (string or number)
	if (typeof columnDef === "string" || typeof columnDef === "number") {
		return columnDef;
	}

	// Handle XLSX field definition
	if (typeof columnDef === "object") {
		const field = columnDef as ExtendedXlsxField;

		// Determine which sheet to use (cross-sheet reference support)
		const targetSheet = field.sheet || currentSheet;
		const worksheet = workbook.Sheets[targetSheet];

		if (!worksheet) {
			console.warn(`Sheet "${targetSheet}" not found for column "${columnKey}"`);
			return null;
		}

		// Non-repeating field (extract once from sourceRow)
		if (field.repeat === false && field.sourceRow !== undefined) {
			const cacheKey = `${patternName}_${columnKey}`;

			if (!nonRepeatingCache[cacheKey]) {
				const colIndex = resolveColumnIndex(field, targetSheet, headerRow, headerColumnCache);

				if (colIndex === null) {
					console.warn(`Could not resolve column index for "${columnKey}"`);
					nonRepeatingCache[cacheKey] = { value: null };
				}
				else {
					const value = getCellValue(worksheet, field.sourceRow, colIndex);
					nonRepeatingCache[cacheKey] = { value };
				}
			}

			return nonRepeatingCache[cacheKey].value;
		}

		// Repeating field (extract from current row)
		const colIndex = resolveColumnIndex(field, currentSheet, headerRow, headerColumnCache);

		if (colIndex === null) {
			console.warn(`Could not resolve column index for "${columnKey}"`);
			return null;
		}

		return getCellValue(worksheet, currentRow, colIndex);
	}

	return null;
}

/**
 * Resolve column index from field definition
 * Supports both direct column index and header-based lookup
 */
function resolveColumnIndex(
	field: ExtendedXlsxField,
	sheetName: string,
	headerRow: number | undefined,
	headerColumnCache: Record<string, Map<string, number>>,
): number | null {
	// Direct column index
	if (field.col !== undefined) {
		return field.col;
	}

	// Header-based lookup
	if (field.headerName !== undefined && headerRow !== undefined) {
		const cacheKey = `${sheetName}_${headerRow}`;
		const headerMap = headerColumnCache[cacheKey];

		if (headerMap && headerMap.has(field.headerName)) {
			return headerMap.get(field.headerName)!;
		}

		console.warn(`Header "${field.headerName}" not found in row ${headerRow}`);
		return null;
	}

	return null;
}

/**
 * Build a map of header names to column indices
 */
function buildHeaderColumnMap(
	worksheet: XLSX.WorkSheet,
	headerRow: number,
): Map<string, number> {
	const map = new Map<string, number>();

	// Get the range of the worksheet
	const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");

	// Scan the header row
	for (let col = range.s.c; col <= range.e.c; col++) {
		const cellAddress = XLSX.utils.encode_cell({ r: headerRow, c: col });
		const cell = worksheet[cellAddress];

		if (cell && cell.v) {
			const headerText = String(cell.v).trim();
			if (headerText) {
				map.set(headerText, col);
			}
		}
	}

	return map;
}

/**
 * Extract value from a specific cell in a worksheet
 */
function getCellValue(
	worksheet: XLSX.WorkSheet,
	row: number,
	col: number,
): any {
	try {
		const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
		const cell = worksheet[cellAddress];

		if (!cell) {
			return null;
		}

		// Return the formatted value (v) or calculated value for formulas
		// Preserve type: number stays number, string stays string
		const value = cell.v;

		// Handle dates - convert to ISO string
		if (cell.t === "d" && value instanceof Date) {
			return value.toISOString();
		}

		// Handle numbers - preserve as number
		if (cell.t === "n" && typeof value === "number") {
			return value;
		}

		// Handle booleans
		if (cell.t === "b") {
			return Boolean(value);
		}

		// Handle strings and everything else
		return value !== null && value !== undefined ? value : null;
	}
	catch (error) {
		console.warn(`Failed to extract cell value at (${row}, ${col}):`, error);
		return null;
	}
}

/**
 * Helper: Get the maximum row number in a worksheet
 */
export function getWorksheetRowCount(worksheet: XLSX.WorkSheet): number {
	if (!worksheet["!ref"])
		return 0;
	const range = XLSX.utils.decode_range(worksheet["!ref"]);
	return range.e.r + 1; // +1 because it's 0-based
}

/**
 * Helper: Get the maximum column number in a worksheet
 */
export function getWorksheetColumnCount(worksheet: XLSX.WorkSheet): number {
	if (!worksheet["!ref"])
		return 0;
	const range = XLSX.utils.decode_range(worksheet["!ref"]);
	return range.e.c + 1; // +1 because it's 0-based
}

/**
 * Helper: Validate that a sheet exists in workbook
 */
export function validateSheetExists(
	workbook: XLSX.WorkBook,
	sheetName: string,
): boolean {
	return workbook.SheetNames.includes(sheetName);
}

/**
 * Helper: Validate that row/col are within worksheet bounds
 */
export function validateCellInBounds(
	worksheet: XLSX.WorkSheet,
	row: number,
	col: number,
): boolean {
	if (!worksheet["!ref"])
		return false;
	const range = XLSX.utils.decode_range(worksheet["!ref"]);
	return row >= range.s.r && row <= range.e.r && col >= range.s.c && col <= range.e.c;
}
