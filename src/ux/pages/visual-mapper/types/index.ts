export type FileType = "LabReport" | "SurveyResults" | "Collar" | "Geolog" | "Other";
export type FileFormat = "TXT" | "XLSX" | "CSV";

export interface MappingLocation {
	sheet?: string // For XLSX
	row?: number // Y or X1 (0-based)
	col?: number // X or Y1 (0-based)
	length?: number // For TXT fixed-width
	range?: string // e.g., "A1:B10" for tables
}

export type MappingStrategy = "coordinate" | "anchor" | "header" | "table";

export interface AnchorDefinition {
	id: string
	text: string
	occurrence: number // 1-based index of occurrence
	location: { r: number, c: number } // Original location in sample
}

export interface RelativeLocation {
	anchorId: string
	dx: number // Char offset from anchor end
	dy: number // Line offset
	length: number
}

export interface TableColumn {
	jsonKey: string
	label: string
	// Column mapping strategies
	col?: number // Absolute index
	headerName?: string // For XLSX/CSV
	length?: number
	transform?: string
}

export interface MappingField {
	jsonKey: string
	label: string
	required?: boolean
	sourceType: MappingStrategy // coordinate, anchor, header, table

	// Strategies
	location?: MappingLocation // Absolute coordinate
	relativeLocation?: RelativeLocation // Anchor-based
	headerName?: string // Header-based

	transform?: string
	defaultValue?: any

	// For Table type
	startRowPattern?: string // Anchor logic for table start?
	endRowPattern?: string
	columns?: TableColumn[]
}

export interface MappingConfig {
	id: string
	name: string
	version: string
	fileType: FileType
	format: FileFormat
	fields: MappingField[]
	anchors?: AnchorDefinition[] // Defined anchors for this template
	headerRow?: number // For XLSX/CSV, which row is header
}

export interface CellCoordinate {
	row: number
	col: number
}

export interface SelectionRange {
	start: CellCoordinate
	end: CellCoordinate
}
