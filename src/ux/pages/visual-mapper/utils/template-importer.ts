import type {
	ColumnField,
	FixedField,
	RowPattern,
	SimpleField,
	TemplateInProgress,
	TemplateRow,
} from "../types/template";

/**
 * Import a TemplateRow[] and convert it back to a TemplateInProgress
 * This allows editing of exported templates
 */
export function importTemplate(rows: TemplateRow[]): TemplateInProgress {
	if (rows.length === 0) {
		return {
			name: "Imported Template",
			format: "TXT",
			simpleFields: [],
			rowPatterns: [],
		};
	}

	// Detect format from first row
	const format = detectTemplateFormat(rows[0]);

	if (format === "TXT") {
		return importTxtTemplate(rows);
	}
	else {
		return importXlsxTemplate(rows);
	}
}

/**
 * Detect template format from a template row
 */
function detectTemplateFormat(row: TemplateRow): "TXT" | "XLSX" {
	// XLSX rows have 'sheet', 'row', 'col' properties
	// TXT rows have 'Line', 'start', 'length' properties
	if (row.sheet !== undefined || row.row !== undefined || row.col !== undefined) {
		return "XLSX";
	}
	return "TXT";
}

/**
 * Import TXT template
 */
function importTxtTemplate(rows: TemplateRow[]): TemplateInProgress {
	const simpleFields: SimpleField[] = [];
	const patternMap = new Map<string, {
		columns: ColumnField[]
		lines: number[]
		exampleLine: number
	}>();

	for (const row of rows) {
		if (!row.Column) {
			// Simple field
			if (row.start !== undefined && row.length !== undefined && row.Line !== undefined) {
				simpleFields.push({
					id: `field-${Date.now()}-${Math.random()}`,
					format: "TXT",
					name: row.Name,
					line: row.Line,
					start: row.start,
					length: row.length,
				});
			}
		}
		else {
			// Row pattern
			const key = row.Name;

			if (!patternMap.has(key)) {
				// First occurrence - extract column definitions
				const columns: ColumnField[] = extractTxtColumns(row.Column);

				patternMap.set(key, {
					columns,
					lines: [row.Line!],
					exampleLine: row.Line!,
				});
			}
			else {
				// Additional line for existing pattern
				patternMap.get(key)!.lines.push(row.Line!);
			}
		}
	}

	// Convert pattern map to RowPattern array
	const rowPatterns: RowPattern[] = Array.from(patternMap.entries()).map(
		([name, data], idx) => ({
			id: `pattern-${Date.now()}-${idx}`,
			format: "TXT",
			name,
			exampleLine: data.exampleLine,
			columns: data.columns,
			appliedToLines: data.lines.sort((a, b) => a - b),
		}),
	);

	return {
		name: "Imported Template",
		format: "TXT",
		simpleFields,
		rowPatterns,
	};
}

/**
 * Import XLSX template
 */
function importXlsxTemplate(rows: TemplateRow[]): TemplateInProgress {
	const simpleFields: SimpleField[] = [];
	const patternMap = new Map<string, {
		columns: ColumnField[]
		rows: number[]
		sheet: string
		headerRow?: number
	}>();

	for (const row of rows) {
		if (!row.Column) {
			// Simple field
			if (row.row !== undefined && row.col !== undefined) {
				simpleFields.push({
					id: `field-${Date.now()}-${Math.random()}`,
					format: "XLSX",
					name: row.Name,
					sheet: row.sheet,
					row: row.row,
					col: row.col,
					cell: row.cell,
				});
			}
		}
		else {
			// Row pattern - group by (Name + sheet) to handle multi-sheet patterns
			const key = `${row.Name}|${row.sheet || "default"}`;

			if (!patternMap.has(key)) {
				// First occurrence - extract column definitions
				const columns: ColumnField[] = extractXlsxColumns(row.Column);

				patternMap.set(key, {
					columns,
					rows: [row.row!],
					sheet: row.sheet || "",
					headerRow: row.headerRow,
				});
			}
			else {
				// Additional row for existing pattern
				patternMap.get(key)!.rows.push(row.row!);
			}
		}
	}

	// Convert pattern map to RowPattern array
	const rowPatterns: RowPattern[] = Array.from(patternMap.entries()).map(
		([key, data], idx) => {
			const name = key.split("|")[0]; // Extract name from composite key
			const sortedRows = data.rows.sort((a, b) => a - b);

			return {
				id: `pattern-${Date.now()}-${idx}`,
				format: "XLSX",
				name,
				sheet: data.sheet,
				startRow: sortedRows[0],
				endRow: sortedRows[sortedRows.length - 1],
				headerRow: data.headerRow,
				columns: data.columns,
			};
		},
	);

	return {
		name: "Imported Template",
		format: "XLSX",
		simpleFields,
		rowPatterns,
	};
}

/**
 * Extract TXT column definitions from Column object
 */
function extractTxtColumns(columnObj: Record<string, any>): ColumnField[] {
	const columns: ColumnField[] = [];

	for (const [colName, colDef] of Object.entries(columnObj)) {
		if (typeof colDef === "object" && colDef !== null) {
			if ("start" in colDef && "length" in colDef) {
				// Fixed-width field
				const field = colDef as FixedField & { repeat?: boolean, sourceLine?: number };
				columns.push({
					name: colName,
					start: field.start,
					length: field.length,
					repeat: field.repeat,
					sourceLine: field.sourceLine,
				});
			}
			else {
				// Empty object
				columns.push({
					name: colName,
					start: 0,
					length: 0,
					isEmpty: true,
				});
			}
		}
		else {
			// Static value (string or number)
			columns.push({
				name: colName,
				start: 0,
				length: 0,
				staticValue: colDef as string | number,
			});
		}
	}

	return columns;
}

/**
 * Extract XLSX column definitions from Column object
 */
function extractXlsxColumns(columnObj: Record<string, any>): ColumnField[] {
	const columns: ColumnField[] = [];

	for (const [colName, colDef] of Object.entries(columnObj)) {
		if (typeof colDef === "object" && colDef !== null) {
			// Check if it's an empty object
			if (Object.keys(colDef).length === 0) {
				columns.push({
					name: colName,
					isEmpty: true,
				});
			}
			else {
				// XLSX column definition
				const field = colDef as {
					col?: number
					headerName?: string
					sheet?: string
					repeat?: boolean
					sourceRow?: number
				};

				columns.push({
					name: colName,
					col: field.col,
					headerName: field.headerName,
					sheet: field.sheet,
					repeat: field.repeat,
					sourceRow: field.sourceRow,
				});
			}
		}
		else {
			// Static value (string or number)
			columns.push({
				name: colName,
				staticValue: colDef as string | number,
			});
		}
	}

	return columns;
}

/**
 * Validate that a JSON structure is a valid TemplateRow[]
 */
export function validateTemplateRows(data: any): data is TemplateRow[] {
	if (!Array.isArray(data))
		return false;

	for (const row of data) {
		if (typeof row !== "object" || row === null)
			return false;
		if (typeof row.Name !== "string")
			return false;
		if (typeof row.Line !== "number")
			return false;

		// Must have either (start + length) or Column
		const hasSimpleFields = typeof row.start === "number" && typeof row.length === "number";
		const hasColumn = row.Column && typeof row.Column === "object";

		if (!hasSimpleFields && !hasColumn)
			return false;
	}

	return true;
}
