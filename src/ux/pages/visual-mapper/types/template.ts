// File format types
export type FileFormat = "TXT" | "XLSX";

// Core template types for fixed-width parsing
export interface FixedField {
	start: number
	length: number
}

export type ColumnTemplate = Record<
	string,
  string | number | FixedField | object
>;

export interface TemplateRow {
	Name: string
	// TXT fields
	Line?: number
	start?: number
	length?: number
	// XLSX fields
	sheet?: string
	row?: number
	col?: number
	cell?: string
	headerRow?: number // Optional header row for XLSX patterns
	Column?: ColumnTemplate
}

// ===== TYPES FOR TEMPLATE CREATION =====

// Simple field (non-repeating single value)
// Uses optional fields - check format to determine which are present
export interface SimpleField {
	id: string
	format: FileFormat
	name: string
	// TXT fields
	line?: number
	start?: number
	length?: number
	// XLSX fields
	sheet?: string
	row?: number
	col?: number
	cell?: string // e.g., "A1"
}

// Column definition within a row pattern
export interface ColumnField {
	name: string
	// TXT fields
	start?: number
	length?: number
	// XLSX fields
	col?: number // Column index
	sheet?: string // For cross-sheet references
	headerName?: string // For header-based mapping
	// Common fields
	staticValue?: string | number
	isEmpty?: boolean
	repeat?: boolean
	sourceLine?: number // TXT: For repeat=false
	sourceRow?: number // XLSX: For non-repeating fields
}

// Row pattern for repeating data structures
// Uses optional fields - check format to determine which are present
export interface RowPattern {
	id: string
	format: FileFormat
	name: string
	// TXT fields
	exampleLine?: number
	appliedToLines?: number[]
	// XLSX fields
	sheet?: string
	startRow?: number
	endRow?: number | "end" // 'end' means to end of sheet
	headerRow?: number // Optional header row for column name resolution
	// Common
	columns: ColumnField[]
}

// Template being constructed in the UI
export interface TemplateInProgress {
	name: string
	format: FileFormat
	simpleFields: SimpleField[]
	rowPatterns: RowPattern[]
}

// Type guards
export function isTxtField(field: SimpleField): boolean {
	return field.format === "TXT";
}

export function isXlsxField(field: SimpleField): boolean {
	return field.format === "XLSX";
}

export function isTxtPattern(pattern: RowPattern): boolean {
	return pattern.format === "TXT";
}

export function isXlsxPattern(pattern: RowPattern): boolean {
	return pattern.format === "XLSX";
}

export function isTxtColumn(column: ColumnField): boolean {
	return column.start !== undefined && column.length !== undefined;
}

export function isXlsxColumn(column: ColumnField): boolean {
	return column.col !== undefined || column.headerName !== undefined;
}
