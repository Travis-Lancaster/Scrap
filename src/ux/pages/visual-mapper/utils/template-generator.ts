import type { ColumnTemplate, TemplateInProgress, TemplateRow } from "../types/template";
import { isTxtField, isTxtPattern, isXlsxField, isXlsxPattern } from "../types/template";

/**
 * Generates a TemplateRow[] from a TemplateInProgress object
 * This is the format used by the FixedWidthParser and XlsxParser
 *
 * @param template - The template being built
 * @param totalLines - Optional total line count for resolving "to end" patterns (TXT or XLSX row count)
 */
export function generateTemplate(template: TemplateInProgress, totalLines?: number): TemplateRow[] {
	const rows: TemplateRow[] = [];

	// Add simple fields
	for (const field of template.simpleFields) {
		if (isTxtField(field)) {
			// TXT simple field
			rows.push({
				Name: field.name,
				Line: field.line,
				start: field.start,
				length: field.length,
			});
		}
		else if (isXlsxField(field)) {
			// XLSX simple field
			rows.push({
				Name: field.name,
				sheet: field.sheet,
				row: field.row,
				col: field.col,
				cell: field.cell,
			});
		}
	}

	// Add row patterns
	for (const pattern of template.rowPatterns) {
		if (isTxtPattern(pattern)) {
			// TXT row pattern
			generateTxtPatternRows(pattern, rows, totalLines);
		}
		else if (isXlsxPattern(pattern)) {
			// XLSX row pattern
			generateXlsxPatternRows(pattern, rows, totalLines);
		}
	}

	// Sort by line/row number for cleaner output
	return rows.sort((a, b) => {
		const aLine = a.Line ?? a.row ?? 0;
		const bLine = b.Line ?? b.row ?? 0;
		return aLine - bLine;
	});
}

/**
 * Generate template rows for TXT row pattern
 */
function generateTxtPatternRows(
	pattern: any,
	rows: TemplateRow[],
	totalLines?: number,
): void {
	const patternRowPattern = pattern;
	{
		// Resolve "to end" patterns if we have totalLines
		let linesToApply = patternRowPattern.appliedToLines;
		if (totalLines !== undefined && hasEndSentinel(linesToApply)) {
			linesToApply = resolveLineRangeToEnd(linesToApply, totalLines);
		}

		for (const lineNum of linesToApply) {
			// Skip sentinel values if not resolved
			if (lineNum === -1)
				continue;

			const columnObj: ColumnTemplate = {};

			for (const col of patternRowPattern.columns) {
				if (col.isEmpty) {
					// Empty object column
					columnObj[col.name] = {};
				}
				else if (col.staticValue !== undefined) {
					// Static/literal value
					columnObj[col.name] = col.staticValue;
				}
				else {
					// Fixed-width extraction - include repeat and sourceLine properties
					const field: any = {
						start: col.start,
						length: col.length,
					};

					// Include repeat flag (default true if not specified)
					if (col.repeat !== undefined) {
						field.repeat = col.repeat;
					}

					// Include sourceLine for non-repeating fields
					if (col.sourceLine !== undefined) {
						field.sourceLine = col.sourceLine;
					}

					columnObj[col.name] = field;
				}
			}

			rows.push({
				Name: patternRowPattern.name,
				Line: lineNum,
				Column: columnObj,
			});
		}
	}
}

/**
 * Generate template rows for XLSX row pattern
 */
function generateXlsxPatternRows(
	pattern: any,
	rows: TemplateRow[],
	totalLines?: number,
): void {
	// Resolve row range (startRow to endRow)
	const rowRange = resolveXlsxRowRange(
		pattern.startRow!,
		pattern.endRow!,
		totalLines,
	);

	for (const rowNum of rowRange) {
		const columnObj: ColumnTemplate = {};

		for (const col of pattern.columns) {
			if (col.isEmpty) {
				// Empty object column
				columnObj[col.name] = {};
			}
			else if (col.staticValue !== undefined) {
				// Static/literal value
				columnObj[col.name] = col.staticValue;
			}
			else {
				// XLSX column definition
				const field: any = {};

				// Add column reference (index or header name)
				if (col.col !== undefined) {
					field.col = col.col;
				}
				if (col.headerName !== undefined) {
					field.headerName = col.headerName;
				}

				// Add cross-sheet reference if specified
				if (col.sheet !== undefined) {
					field.sheet = col.sheet;
				}

				// Add repeat flag (default true if not specified)
				if (col.repeat !== undefined) {
					field.repeat = col.repeat;
				}

				// Add sourceRow for non-repeating fields
				if (col.sourceRow !== undefined) {
					field.sourceRow = col.sourceRow;
				}

				columnObj[col.name] = field;
			}
		}

		rows.push({
			Name: pattern.name,
			sheet: pattern.sheet,
			row: rowNum,
			headerRow: pattern.headerRow,
			Column: columnObj,
		});
	}
}

/**
 * Resolve XLSX row range to array of row numbers
 *
 * @param startRow - Starting row number
 * @param endRow - Ending row number or 'end'
 * @param totalRows - Total rows in sheet (for resolving 'end')
 */
function resolveXlsxRowRange(
	startRow: number,
	endRow: number | "end",
	totalRows?: number,
): number[] {
	const rows: number[] = [];

	if (endRow === "end") {
		if (totalRows !== undefined) {
			// Expand to actual end
			for (let i = startRow; i < totalRows; i++) {
				rows.push(i);
			}
		}
		else {
			// Return start with sentinel (will need to be resolved later)
			rows.push(startRow);
			rows.push(-1); // Sentinel for "end"
		}
	}
	else {
		// Specific range
		for (let i = startRow; i <= endRow; i++) {
			rows.push(i);
		}
	}

	return rows;
}

/**
 * Parse a line range string like "20-266" or "20-end" into an array of line numbers
 * Supports: "20-30", "20-end", "20-eof", "20,25,30-40"
 * Returns -1 as sentinel value for "end"/"eof" which must be resolved later
 */
export function parseLineRange(rangeStr: string, totalLines?: number): number[] {
	const lines: number[] = [];
	const parts = rangeStr.split(",").map(p => p.trim());

	for (const part of parts) {
		if (part.includes("-")) {
			// Range like "20-30" or "20-end"
			const [startStr, endStr] = part.split("-").map(s => s.trim().toLowerCase());
			const start = Number.parseInt(startStr, 10);

			if (isNaN(start))
				continue;

			// Check if end is "end", "eof", or empty (means end)
			const isEndMarker = endStr === "end" || endStr === "eof" || endStr === "";

			if (isEndMarker) {
				// If totalLines is provided, expand to actual end
				if (totalLines !== undefined) {
					for (let i = start; i < totalLines; i++) {
						lines.push(i);
					}
				}
				else {
					// Return sentinel value -1 to indicate "to end"
					// This will be handled later when we know the file length
					lines.push(start);
					lines.push(-1); // Sentinel for "end"
				}
			}
			else {
				const end = Number.parseInt(endStr, 10);
				if (!isNaN(end) && start <= end) {
					for (let i = start; i <= end; i++) {
						lines.push(i);
					}
				}
			}
		}
		else {
			// Single line like "25"
			const line = Number.parseInt(part, 10);
			if (!isNaN(line)) {
				lines.push(line);
			}
		}
	}

	return lines;
}

/**
 * Check if a line array contains the "to end" sentinel (-1)
 */
export function hasEndSentinel(lines: number[]): boolean {
	return lines.includes(-1);
}

/**
 * Resolve line ranges with "end" sentinel to actual line numbers
 */
export function resolveLineRangeToEnd(lines: number[], totalLines: number): number[] {
	if (!hasEndSentinel(lines))
		return lines;

	// Find the start line (the number before -1)
	const sentinelIndex = lines.indexOf(-1);
	if (sentinelIndex === 0)
		return lines.filter(l => l !== -1); // No start, just filter out sentinel

	const start = lines[sentinelIndex - 1];
	const result = lines.slice(0, sentinelIndex - 1); // Everything before start

	// Add range from start to end
	for (let i = start; i < totalLines; i++) {
		result.push(i);
	}

	// Add anything after the sentinel
	result.push(...lines.slice(sentinelIndex + 1).filter(l => l !== -1));

	return result;
}

/**
 * Format line numbers array back to a compact range string
 */
export function formatLineRange(lines: number[]): string {
	if (lines.length === 0)
		return "";

	const sorted = [...lines].sort((a, b) => a - b);
	const ranges: string[] = [];
	let start = sorted[0];
	let end = sorted[0];

	for (let i = 1; i <= sorted.length; i++) {
		if (i < sorted.length && sorted[i] === end + 1) {
			end = sorted[i];
		}
		else {
			if (start === end) {
				ranges.push(`${start}`);
			}
			else {
				ranges.push(`${start}-${end}`);
			}
			if (i < sorted.length) {
				start = sorted[i];
				end = sorted[i];
			}
		}
	}

	return ranges.join(", ");
}
