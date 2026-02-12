import type * as XLSX from "xlsx";
import type { SelectionRange } from "../types";
import type {
	ColumnField,
	FileFormat,
	RowPattern,
	SimpleField,
	TemplateInProgress,
} from "../types/template";
import { create } from "zustand";

type Mode = "simple" | "pattern";

interface VisualMapperState {
	// File State
	file: File | null
	fileContent: string | XLSX.WorkBook | null
	fileFormat: FileFormat
	setFile: (file: File) => void
	setFileContent: (content: string | XLSX.WorkBook) => void
	setFileFormat: (format: FileFormat) => void

	// XLSX-specific State
	xlsxWorkbook: XLSX.WorkBook | null
	xlsxSheets: string[]
	currentSheet: string | null
	setXlsxWorkbook: (workbook: XLSX.WorkBook) => void
	setXlsxSheets: (sheets: string[]) => void
	setCurrentSheet: (sheet: string) => void

	// Template State
	template: TemplateInProgress
	setTemplateName: (name: string) => void
	templateId: string | null
	setTemplateId: (id: string | null) => void

	// UI State
	mode: Mode
	setMode: (mode: Mode) => void
	selectedItemId: string | null
	setSelectedItemId: (id: string | null) => void
	selection: SelectionRange | null
	setSelection: (selection: SelectionRange | null) => void
	currentPattern: RowPattern | null
	setCurrentPattern: (pattern: RowPattern | null) => void

	// Simple Field Actions
	addSimpleField: (field: SimpleField) => void
	updateSimpleField: (id: string, updates: Partial<SimpleField>) => void
	removeSimpleField: (id: string) => void

	// Row Pattern Actions
	addRowPattern: (pattern: RowPattern) => void
	updateRowPattern: (id: string, updates: Partial<RowPattern>) => void
	removeRowPattern: (id: string) => void
	addColumnToPattern: (patternId: string, column: ColumnField) => void
	removeColumnFromPattern: (patternId: string, columnName: string) => void
	updateColumnInPattern: (patternId: string, columnName: string, updates: Partial<ColumnField>) => void
	applyPatternToLines: (patternId: string, lines: number[]) => void

	// Template Operations
	importTemplate: (template: TemplateInProgress) => void

	// Reset
	reset: () => void
	clearTemplate: () => void
}

const initialTemplate: TemplateInProgress = {
	name: "New Template",
	format: "TXT",
	simpleFields: [],
	rowPatterns: [],
};

export const useVisualMapperStore = create<VisualMapperState>(set => ({
	// File State
	file: null,
	fileContent: null,
	fileFormat: "TXT",
	setFile: file => set({ file }),
	setFileContent: fileContent => set({ fileContent }),
	setFileFormat: fileFormat => set(state => ({
		fileFormat,
		template: { ...state.template, format: fileFormat },
	})),

	// XLSX-specific State
	xlsxWorkbook: null,
	xlsxSheets: [],
	currentSheet: null,
	setXlsxWorkbook: xlsxWorkbook => set({ xlsxWorkbook, fileContent: xlsxWorkbook }),
	setXlsxSheets: xlsxSheets => set({ xlsxSheets }),
	setCurrentSheet: currentSheet => set({ currentSheet }),

	// Template State
	template: initialTemplate,
	setTemplateName: name => set(state => ({
		template: { ...state.template, name },
	})),
	templateId: null,
	setTemplateId: templateId => set({ templateId }),

	// UI State
	mode: "simple",
	setMode: mode => set({ mode }),
	selectedItemId: null,
	setSelectedItemId: selectedItemId => set({ selectedItemId }),
	selection: null,
	setSelection: selection => set({ selection }),
	currentPattern: null,
	setCurrentPattern: currentPattern => set({ currentPattern }),

	// Simple Field Actions
	addSimpleField: field => set(state => ({
		template: {
			...state.template,
			simpleFields: [...state.template.simpleFields, field],
		},
	})),

	updateSimpleField: (id, updates) => set(state => ({
		template: {
			...state.template,
			simpleFields: state.template.simpleFields.map(f =>
				f.id === id ? { ...f, ...updates } : f,
			),
		},
	})),

	removeSimpleField: id => set(state => ({
		template: {
			...state.template,
			simpleFields: state.template.simpleFields.filter(f => f.id !== id),
		},
	})),

	// Row Pattern Actions
	addRowPattern: pattern => set(state => ({
		template: {
			...state.template,
			rowPatterns: [...state.template.rowPatterns, pattern],
		},
		currentPattern: null, // Clear current pattern after adding
	})),

	updateRowPattern: (id, updates) => set(state => ({
		template: {
			...state.template,
			rowPatterns: state.template.rowPatterns.map(p =>
				p.id === id ? { ...p, ...updates } : p,
			),
		},
	})),

	removeRowPattern: id => set(state => ({
		template: {
			...state.template,
			rowPatterns: state.template.rowPatterns.filter(p => p.id !== id),
		},
	})),

	addColumnToPattern: (patternId, column) => set((state) => {
		// If patternId is in template, update template
		const existingPattern = state.template.rowPatterns.find(p => p.id === patternId);
		if (existingPattern) {
			return {
				template: {
					...state.template,
					rowPatterns: state.template.rowPatterns.map(p =>
						p.id === patternId
							? { ...p, columns: [...p.columns, column] }
							: p,
					),
				},
			};
		}

		// Otherwise update currentPattern
		if (state.currentPattern?.id === patternId) {
			return {
				currentPattern: {
					...state.currentPattern,
					columns: [...state.currentPattern.columns, column],
				},
			};
		}

		return {};
	}),

	removeColumnFromPattern: (patternId, columnName) => set((state) => {
		const existingPattern = state.template.rowPatterns.find(p => p.id === patternId);
		if (existingPattern) {
			return {
				template: {
					...state.template,
					rowPatterns: state.template.rowPatterns.map(p =>
						p.id === patternId
							? { ...p, columns: p.columns.filter(c => c.name !== columnName) }
							: p,
					),
				},
			};
		}

		if (state.currentPattern?.id === patternId) {
			return {
				currentPattern: {
					...state.currentPattern,
					columns: state.currentPattern.columns.filter(c => c.name !== columnName),
				},
			};
		}

		return {};
	}),

	updateColumnInPattern: (patternId, columnName, updates) => set((state) => {
		const existingPattern = state.template.rowPatterns.find(p => p.id === patternId);
		if (existingPattern) {
			return {
				template: {
					...state.template,
					rowPatterns: state.template.rowPatterns.map(p =>
						p.id === patternId
							? {
								...p,
								columns: p.columns.map(c =>
									c.name === columnName ? { ...c, ...updates } : c,
								),
							}
							: p,
					),
				},
			};
		}

		if (state.currentPattern?.id === patternId) {
			return {
				currentPattern: {
					...state.currentPattern,
					columns: state.currentPattern.columns.map(c =>
						c.name === columnName ? { ...c, ...updates } : c,
					),
				},
			};
		}

		return {};
	}),

	applyPatternToLines: (patternId, lines) => set(state => ({
		template: {
			...state.template,
			rowPatterns: state.template.rowPatterns.map(p =>
				p.id === patternId ? { ...p, appliedToLines: lines } : p,
			),
		},
	})),

	// Template Operations
	importTemplate: template => set({
		template,
		mode: "simple",
		selectedItemId: null,
		selection: null,
		currentPattern: null,
	}),

	// Reset
	reset: () => set({
		file: null,
		fileContent: null,
		fileFormat: "TXT",
		xlsxWorkbook: null,
		xlsxSheets: [],
		currentSheet: null,
		template: initialTemplate,
		templateId: null,
		mode: "simple",
		selectedItemId: null,
		selection: null,
		currentPattern: null,
	}),

	clearTemplate: () => set({
		template: initialTemplate,
		templateId: null,
		mode: "simple",
		selectedItemId: null,
		selection: null,
		currentPattern: null,
	}),
}));
