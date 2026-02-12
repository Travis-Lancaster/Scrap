/**
 * QAQC Configuration Store
 *
 * Zustand store for managing QAQC configuration state
 */

import type {
	AssayLabElementAlias,
	AssayLabMethod,
	CreateQcReferenceDto,
	CreateQcReferenceValueDto,
	QcFilteredset,
	QcInsertionRule,
	QcInsertionRuleStandardSequence,
	QcReference,
	QcReferenceValue,
	QcRule,
	QcStatisticalLimits,
	UpdateQcStatisticalLimitsDto,
} from "#src/api/database/data-contracts";
import { qaqcConfigService } from "#src/services/qaqcConfigService";

import { create } from "zustand";

import { devtools } from "zustand/middleware";

// UI-specific types
type ConfigModule = "A" | "B" | "C" | "D";

interface DirtyState {
	hasUnsavedChanges: boolean
	modulesChanged: Set<ConfigModule>
}

interface QaqcConfigState {
	// ============================================================================
	// Module A: Reference Materials
	// ============================================================================
	standards: {
		list: QcReference[]
		selected: QcReference | null
		selectedValues: QcReferenceValue[]
		loading: boolean
		error: string | null
	}

	// ============================================================================
	// Module B: Statistical Limits & Rules
	// ============================================================================
	limits: {
		elements: QcStatisticalLimits[]
		rules: QcRule[]
		loading: boolean
		error: string | null
	}

	// ============================================================================
	// Module C: Insertion Patterns
	// ============================================================================
	insertionRules: {
		list: QcInsertionRule[]
		selected: QcInsertionRule | null
		sequence: QcInsertionRuleStandardSequence[]
		loading: boolean
		error: string | null
	}

	// ============================================================================
	// Module D: Lab Mappings
	// ============================================================================
	labMappings: {
		selectedLab: string
		elementAliases: AssayLabElementAlias[]
		methodMappings: AssayLabMethod[]
		detectionLimits: QcFilteredset[]
		loading: boolean
		error: string | null
	}

	// ============================================================================
	// Dirty State Tracking
	// ============================================================================
	dirtyState: DirtyState

	// ============================================================================
	// Actions - Module A
	// ============================================================================
	loadStandards: () => Promise<void>
	selectStandard: (standardId: string | null) => Promise<void>
	saveStandard: (
		standard: CreateQcReferenceDto,
		values: CreateQcReferenceValueDto[],
	) => Promise<void>
	deleteStandard: (standardId: string) => Promise<void>

	// ============================================================================
	// Actions - Module B
	// ============================================================================
	loadStatisticalLimits: () => Promise<void>
	updateStatisticalLimit: (element: string, limit: UpdateQcStatisticalLimitsDto) => Promise<void>
	loadQCRules: () => Promise<void>
	saveQCRule: (rule: Partial<QcRule>) => Promise<void>
	deleteQCRule: (code: string) => Promise<void>

	// ============================================================================
	// Actions - Module C
	// ============================================================================
	loadInsertionRules: () => Promise<void>
	selectInsertionRule: (ruleId: string | null) => Promise<void>
	saveInsertionRule: (rule: QcInsertionRule) => Promise<void>
	deleteInsertionRule: (ruleId: string) => Promise<void>

	// ============================================================================
	// Actions - Module D
	// ============================================================================
	setSelectedLab: (labCode: string) => void
	loadLabMappings: (labCode: string) => Promise<void>
	saveElementAlias: (alias: Partial<AssayLabElementAlias>) => Promise<void>
	deleteElementAlias: (id: string) => Promise<void>
	saveMethodMapping: (mapping: Partial<AssayLabMethod>) => Promise<void>
	deleteMethodMapping: (id: string) => Promise<void>
	saveDetectionLimit: (limit: Partial<QcFilteredset>) => Promise<void>
	deleteDetectionLimit: (id: string) => Promise<void>

	// ============================================================================
	// Actions - Dirty State
	// ============================================================================
	setDirtyState: (module: ConfigModule, isDirty: boolean) => void
	clearDirtyState: () => void
}

export const useQaqcConfigStore = create<QaqcConfigState>()(
	devtools(
		(set, get) => ({
			// ========================================================================
			// Initial State
			// ========================================================================
			standards: {
				list: [],
				selected: null,
				selectedValues: [],
				loading: false,
				error: null,
			},

			limits: {
				elements: [],
				rules: [],
				loading: false,
				error: null,
			},

			insertionRules: {
				list: [],
				selected: null,
				sequence: [],
				loading: false,
				error: null,
			},

			labMappings: {
				selectedLab: "ALS",
				elementAliases: [],
				methodMappings: [],
				detectionLimits: [],
				loading: false,
				error: null,
			},

			dirtyState: {
				hasUnsavedChanges: false,
				modulesChanged: new Set(),
			},

			// ========================================================================
			// Module A Actions
			// ========================================================================
			loadStandards: async () => {
				set(state => ({
					standards: { ...state.standards, loading: true, error: null },
				}));

				try {
					const list = await qaqcConfigService.getStandards();
					set(state => ({
						standards: {
							...state.standards,
							list,
							loading: false,
						},
					}));
				}
				catch (error) {
					set(state => ({
						standards: {
							...state.standards,
							loading: false,
							error: error instanceof Error ? error.message : "Failed to load standards",
						},
					}));
				}
			},

			selectStandard: async (standardId) => {
				if (!standardId) {
					set(state => ({
						standards: { ...state.standards, selected: null, selectedValues: [] },
					}));
					return;
				}

				set(state => ({
					standards: { ...state.standards, loading: true, error: null },
				}));

				try {
					const { standard, values } = await qaqcConfigService.getStandardDetail(standardId);
					set(state => ({
						standards: {
							...state.standards,
							selected: standard,
							selectedValues: values,
							loading: false,
						},
					}));
				}
				catch (error) {
					set(state => ({
						standards: {
							...state.standards,
							loading: false,
							error: error instanceof Error ? error.message : "Failed to load standard",
						},
					}));
				}
			},

			saveStandard: async (standard, values) => {
				set(state => ({
					standards: { ...state.standards, loading: true, error: null },
				}));

				try {
					// Check if this is an update or create
					const exists = get().standards.list.some(s => s.StandardId === standard.StandardId);

					if (exists && standard.StandardId) {
						// Find QCReferenceId from the list
						const existing = get().standards.list.find(s => s.StandardId === standard.StandardId);
						if (existing) {
							await qaqcConfigService.updateStandard(existing.QCReferenceId, standard, values);
						}
					}
					else {
						await qaqcConfigService.createStandard(standard, values);
					}

					// Reload standards list
					await get().loadStandards();

					// Clear dirty on successful save
					get().setDirtyState("A", false);
				}
				catch (error) {
					set(state => ({
						standards: {
							...state.standards,
							loading: false,
							error: error instanceof Error ? error.message : "Failed to save standard",
						},
					}));
					throw error;
				}
			},

			deleteStandard: async (standardId) => {
				set(state => ({
					standards: { ...state.standards, loading: true, error: null },
				}));

				try {
					await qaqcConfigService.deleteStandard(standardId);
					await get().loadStandards();
				}
				catch (error) {
					set(state => ({
						standards: {
							...state.standards,
							loading: false,
							error: error instanceof Error ? error.message : "Failed to delete standard",
						},
					}));
					throw error;
				}
			},

			// ========================================================================
			// Module B Actions
			// ========================================================================
			loadStatisticalLimits: async () => {
				set(state => ({
					limits: { ...state.limits, loading: true, error: null },
				}));

				try {
					const elements = await qaqcConfigService.getStatisticalLimits();
					set(state => ({
						limits: {
							...state.limits,
							elements,
							loading: false,
						},
					}));
				}
				catch (error) {
					set(state => ({
						limits: {
							...state.limits,
							loading: false,
							error: error instanceof Error ? error.message : "Failed to load limits",
						},
					}));
				}
			},

			updateStatisticalLimit: async (element, limit) => {
				try {
					await qaqcConfigService.updateStatisticalLimit(element, limit);
					await get().loadStatisticalLimits();
					get().setDirtyState("B", false);
				}
				catch (error) {
					throw error;
				}
			},

			loadQCRules: async () => {
				set(state => ({
					limits: { ...state.limits, loading: true, error: null },
				}));

				try {
					const rules = await qaqcConfigService.getQCRules();
					set(state => ({
						limits: {
							...state.limits,
							rules,
							loading: false,
						},
					}));
				}
				catch (error) {
					set(state => ({
						limits: {
							...state.limits,
							loading: false,
							error: error instanceof Error ? error.message : "Failed to load rules",
						},
					}));
				}
			},

			saveQCRule: async (rule) => {
				try {
					const exists = rule.Code && get().limits.rules.some(r => r.Code === rule.Code);

					if (exists && rule.Code) {
						// Find QCRuleId
						const existing = get().limits.rules.find(r => r.Code === rule.Code);
						if (existing) {
							await qaqcConfigService.updateQCRule(existing.QCRuleId, rule);
						}
					}
					else {
						await qaqcConfigService.createQCRule(rule);
					}

					await get().loadQCRules();
					get().setDirtyState("B", false);
				}
				catch (error) {
					throw error;
				}
			},

			deleteQCRule: async (code) => {
				try {
					await qaqcConfigService.deleteQCRule(code);
					await get().loadQCRules();
				}
				catch (error) {
					throw error;
				}
			},

			// ========================================================================
			// Module C Actions
			// ========================================================================
			loadInsertionRules: async () => {
				set(state => ({
					insertionRules: { ...state.insertionRules, loading: true, error: null },
				}));

				try {
					const list = await qaqcConfigService.getInsertionRules();
					set(state => ({
						insertionRules: {
							...state.insertionRules,
							list,
							loading: false,
						},
					}));
				}
				catch (error) {
					set(state => ({
						insertionRules: {
							...state.insertionRules,
							loading: false,
							error: error instanceof Error ? error.message : "Failed to load insertion rules",
						},
					}));
				}
			},

			selectInsertionRule: async (ruleId) => {
				if (!ruleId) {
					set(state => ({
						insertionRules: { ...state.insertionRules, selected: null, sequence: [] },
					}));
					return;
				}

				try {
					const { rule, sequence } = await qaqcConfigService.getInsertionRuleDetail(ruleId);
					set(state => ({
						insertionRules: {
							...state.insertionRules,
							selected: rule,
							sequence,
						},
					}));
				}
				catch (error) {
					set(state => ({
						insertionRules: {
							...state.insertionRules,
							error: error instanceof Error ? error.message : "Failed to load rule details",
						},
					}));
				}
			},

			saveInsertionRule: async (rule) => {
				try {
					// Note: Save/update methods for insertion rules would need to be added to service
					// For now, this is a placeholder
					console.warn("saveInsertionRule not yet implemented in service");
					await get().loadInsertionRules();
					get().setDirtyState("C", false);
				}
				catch (error) {
					throw error;
				}
			},

			deleteInsertionRule: async (ruleId) => {
				try {
					// Note: Delete method for insertion rules would need to be added to service
					// For now, this is a placeholder
					console.warn("deleteInsertionRule not yet implemented in service");
					await get().loadInsertionRules();
				}
				catch (error) {
					throw error;
				}
			},

			// ========================================================================
			// Module D Actions
			// ========================================================================
			setSelectedLab: (labCode) => {
				set(state => ({
					labMappings: { ...state.labMappings, selectedLab: labCode },
				}));
				get().loadLabMappings(labCode);
			},

			loadLabMappings: async (labCode) => {
				set(state => ({
					labMappings: { ...state.labMappings, loading: true, error: null },
				}));

				try {
					const [elementAliases, methodMappings, detectionLimits] = await Promise.all([
						qaqcConfigService.getElementAliases(labCode),
						qaqcConfigService.getMethodMappings(labCode),
						qaqcConfigService.getDetectionLimits(labCode),
					]);

					set(state => ({
						labMappings: {
							...state.labMappings,
							elementAliases,
							methodMappings,
							detectionLimits,
							loading: false,
						},
					}));
				}
				catch (error) {
					set(state => ({
						labMappings: {
							...state.labMappings,
							loading: false,
							error: error instanceof Error ? error.message : "Failed to load lab mappings",
						},
					}));
				}
			},

			saveElementAlias: async (alias) => {
				try {
					await qaqcConfigService.saveElementAlias(alias);
					const labCode = alias.LabCode || get().labMappings.selectedLab;
					await get().loadLabMappings(labCode);
					get().setDirtyState("D", false);
				}
				catch (error) {
					throw error;
				}
			},

			deleteElementAlias: async (id) => {
				try {
					await qaqcConfigService.deleteElementAlias(id);
					const labCode = get().labMappings.selectedLab;
					if (labCode) {
						await get().loadLabMappings(labCode);
					}
				}
				catch (error) {
					throw error;
				}
			},

			saveMethodMapping: async (mapping) => {
				try {
					await qaqcConfigService.saveMethodMapping(mapping);
					const labCode = mapping.LabCode || get().labMappings.selectedLab;
					await get().loadLabMappings(labCode);
					get().setDirtyState("D", false);
				}
				catch (error) {
					throw error;
				}
			},

			deleteMethodMapping: async (id) => {
				try {
					await qaqcConfigService.deleteMethodMapping(id);
					const labCode = get().labMappings.selectedLab;
					if (labCode) {
						await get().loadLabMappings(labCode);
					}
				}
				catch (error) {
					throw error;
				}
			},

			saveDetectionLimit: async (limit) => {
				try {
					await qaqcConfigService.saveDetectionLimit(limit);
					// Detection limits don't have LabCode, use selected lab
					const labCode = get().labMappings.selectedLab;
					await get().loadLabMappings(labCode);
					get().setDirtyState("D", false);
				}
				catch (error) {
					throw error;
				}
			},

			deleteDetectionLimit: async (id) => {
				try {
					await qaqcConfigService.deleteDetectionLimit(id);
					const labCode = get().labMappings.selectedLab;
					if (labCode) {
						await get().loadLabMappings(labCode);
					}
				}
				catch (error) {
					throw error;
				}
			},

			// ========================================================================
			// Dirty State Actions
			// ========================================================================
			setDirtyState: (module, isDirty) => {
				set((state) => {
					const newModulesChanged = new Set(state.dirtyState.modulesChanged);

					if (isDirty) {
						newModulesChanged.add(module);
					}
					else {
						newModulesChanged.delete(module);
					}

					return {
						dirtyState: {
							hasUnsavedChanges: newModulesChanged.size > 0,
							modulesChanged: newModulesChanged,
						},
					};
				});
			},

			clearDirtyState: () => {
				set({
					dirtyState: {
						hasUnsavedChanges: false,
						modulesChanged: new Set(),
					},
				});
			},
		}),
		{ name: "QaqcConfigStore" },
	),
);
