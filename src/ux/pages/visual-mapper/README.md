# Visual Mapper - File Parser

A visual tool for creating JSON templates to parse fixed-width text files and Excel spreadsheets.

## Overview

The Visual Mapper allows users to visually select regions in files and define templates for parsing. It supports:

### File Formats
- **TXT** - Fixed-width text files
- **XLSX** - Excel spreadsheets (2007+)

### Field Types
1. **Simple Fields** - Single values at specific positions (TXT) or cells (XLSX)
2. **Row Patterns** - Repeating data structures with multiple columns

## Workflow

### 1. Upload File
- Drag and drop or click to upload a `.txt` or `.xlsx` file
- **TXT**: Displayed in a grid with character-accurate positioning
- **XLSX**: Displayed in spreadsheet format with sheet navigation

### 2. Create Simple Fields
- Switch to "Simple Field" mode
- **TXT**: Select text by clicking and dragging
- **XLSX**: Click on a cell
- Enter a field name
- Click "Add Field"

**Example (TXT)**: Select "012493" on line 0, name it "ARS_number"
**Example (XLSX)**: Click cell B2, name it "LabName"

### 3. Create Row Patterns

#### For TXT Files
- Switch to "Row Pattern" mode
- Enter a pattern name
- Click on an example line
- Click "Start Pattern"
- For each column:
  - Select the text region
  - Click "Add Column"
  - Choose field type:
    - **Repeating**: Extract from each data row (fixed-width position)
    - **Non-Repeating**: Extract once from header line, apply to all rows
    - **Static**: Same literal value for all rows
    - **Empty**: Empty object `{}`
- Enter line range (e.g., "20-266" or "20-end")
- Click "Save Pattern & Apply"

#### For XLSX Files
- Switch to "Row Pattern" mode
- Enter a pattern name
- Click on a data row to set start position
- Optional: Enable header row for column name mapping
- Click "Start Pattern"
- For each column:
  - Click "Add Column"
  - Choose column strategy:
    - **Column Index**: By column number (A=0, B=1, C=2...)
    - **Header Name**: Find column by header text (requires header row)
    - **Cross-Sheet**: Reference data from another sheet
    - **Static**: Same literal value for all rows
    - **Empty**: Empty object `{}`
  - For non-static columns, optionally mark as "Non-Repeating" to extract once
- Enter row range (e.g., "5-100" or "5-end")
- Click "Save Pattern & Apply"

### 4. Export Template
- Click "Export Template"
- Saves as `transformTemplate.json`

### 5. Apply & Preview
- Click "Apply & Preview"
- View parsed results in JSON or table format
- Download parsed JSON if needed

### 6. Import Template
- Click "Import Template"
- Select a previously exported `.json` file
- All fields and patterns are restored

## Template Format

The tool generates templates in this format:

```typescript
interface TemplateRow {
	Name: string // Field or pattern name
	Line: number // 0-based line number
	start?: number // For simple fields: character start position
	length?: number // For simple fields: field length
	Column?: { // For row patterns: column definitions
		[fieldName: string]: string | number | { start: number, length: number } | {}
	}
}
```

### Example Template

```json
[
	{
		"Name": "ARS_number",
		"Line": 0,
		"start": 39,
		"length": 6
	},
	{
		"Name": "assay_data",
		"Line": 20,
		"Column": {
			"SampleId": { "start": 0, "length": 17 },
			"LabSequence": { "start": 40, "length": 6 },
			"WtKg": { "start": 48, "length": 9 },
			"Au": { "start": 58, "length": 10 },
			"GenericMethod": "Au_FAA505_PPM"
		}
	}
]
```

## Component Architecture

```
VisualMapperPage
├── FileDropzone (upload)
└── MappingWorkspace (main UI)
    ├── TxtGrid (file display with selection)
    ├── ModeSelector (Simple/Pattern toggle)
    ├── SimpleFieldForm (add simple fields)
    ├── RowPatternForm (add row patterns)
    │   └── ColumnFieldForm (define columns)
    ├── FieldsList (view all items)
    ├── TemplateActions (export/import/apply)
    └── ResultsModal (preview parsed results)
```

## Store Structure

The application uses Zustand for state management:

```typescript
{
  file: File | null;
  fileContent: string | null;
  template: {
    name: string;
    simpleFields: SimpleField[];
    rowPatterns: RowPattern[];
  };
  mode: 'simple' | 'pattern';
  selection: SelectionRange | null;
  currentPattern: RowPattern | null;
}
```

## Utilities

### `template-generator.ts`
- `generateTemplate()` - Convert template to TemplateRow[]
- `parseLineRange()` - Parse "20-266" to [20, 21, ..., 266]
- `formatLineRange()` - Convert [20, 21, 22] to "20-22"

### `template-importer.ts`
- `importTemplate()` - Convert TemplateRow[] back to editable template
- `validateTemplateRows()` - Validate template structure

### `fixed-width-parser.ts`
- `FixedWidthParser()` - Parse file using template (already existed)

## Sample Files

- [`SampleTemplates/BK00026104._W.txt`](../../../SampleTemplates/BK00026104._W.txt) - Sample fixed-width file
- [`SampleTemplates/sample-transformTemplate.json`](../../../SampleTemplates/sample-transformTemplate.json) - Sample template

## Key Features

### Universal
✅ Visual selection with accurate positioning
✅ Two modes for different field types (simple vs. pattern)
✅ Pattern reuse across multiple rows/lines
✅ Static values and empty columns support
✅ Export/import templates as JSON
✅ Live preview of parsed results
✅ Table view for repeating data
✅ Download parsed JSON output
✅ Template library with database storage

### TXT-Specific
✅ Fixed-width field extraction
✅ Character position-based mapping
✅ Line range selection with "to end" support
✅ Non-repeating fields from header lines

### XLSX-Specific
✅ Multi-sheet support with sheet navigation
✅ Cell-based selection (A1, B2, etc.)
✅ Header-based column mapping (dynamic column finding)
✅ Cross-sheet references (data from multiple sheets)
✅ Row range selection with "to end" support
✅ Non-repeating fields from specific rows
✅ Column index and header name strategies

## Tips

### General
- Use **Simple Fields** for unique values (headers, metadata)
- Use **Row Patterns** for repeating tabular data
- Define patterns once, apply to many rows/lines efficiently
- Export templates for reuse with similar files
- Use Template Library to save and share templates

### TXT-Specific
- Line numbers are 0-based (first line = 0)
- Character positions are 0-based (first character = 0)
- Selection length is inclusive (selecting 3 characters = length 3)
- Use "20-end" to apply pattern from line 20 to end of file

### XLSX-Specific
- Row and column numbers are 0-based (first row = 0, column A = 0)
- Use header-based mapping when column order may change
- Use cross-sheet references for metadata stored in separate sheets
- Mark fields as "Non-Repeating" when the same value applies to all rows
- Header row can be any row (not just row 0)
- Use "5-end" to apply pattern from row 5 to end of sheet

## Advanced XLSX Features

### Header-Based Column Mapping
Instead of hardcoding column indices, find columns by their header text:
```json
{
	"Name": "Assays",
	"sheet": "Results",
	"row": 2,
	"headerRow": 1,
	"Column": {
		"SampleID": { "headerName": "Sample ID" },
		"Gold": { "headerName": "Au (ppm)" }
	}
}
```
This works even if the column order changes in the spreadsheet.

### Cross-Sheet References
Pull data from multiple sheets in a single pattern:
```json
{
	"Name": "Samples",
	"sheet": "Assays",
	"row": 2,
	"Column": {
		"SampleID": { "col": 0 },
		"Result": { "col": 1 },
		"ProjectName": {
			"col": 1,
			"sheet": "Metadata",
			"sourceRow": 0,
			"repeat": false
		}
	}
}
```
`ProjectName` is extracted once from the Metadata sheet and applied to all assay rows.

### Non-Repeating Fields
Extract a value once and apply it to all rows:
```json
{
	"LabBatch": {
		"col": 1,
		"sourceRow": 0,
		"repeat": false
	}
}
```
The value from row 0, column 1 will be included in every output row.

## Future Enhancements

- Auto-detect similar rows for pattern suggestion
- Visual overlay showing mapped regions
- Undo/redo functionality
- Pattern editing after creation
- Validation warnings for overlapping fields
- CSV file support
- Formula evaluation in XLSX files
