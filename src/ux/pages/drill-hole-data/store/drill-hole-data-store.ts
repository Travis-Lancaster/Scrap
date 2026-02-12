/**
 * Drill-Hole-Data Store
 *
 * Central Zustand store for drill-hole-data module.
 * Coordinates all sections and delegates to module functions.
 *
 * ARCHITECTURE:
 * - Section-factory pattern for consistent section stores
 * - Two-tier validation (database + save)
 * - isDirty tracking at field/row/section levels
 * - ReadOnly control based on RowStatus
 * - Offline-first with Dexie cache
 *
 * @module drill-hole-data/store
 */

import * as StoreActions from "./store-actions";
import * as StoreLoaders from "./store-loaders";
import * as StoreRowOps from "./store-row-operations";

import { ActionResult, SectionKey, TabKey, VwCollar, VwDrillPlan } from "../types/data-contracts";
import { TAB_DEFAULT_LENS } from "../utils/navigation";

import { create } from "zustand";
import { createAllSections } from "./section-factory";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface DrillHoleDataUIState {
	currentPage: number;
	pageSize: number;
	searchQuery: string;
	filters: Record<string, any>;
	sortBy: string | null;
	sortOrder: "asc" | "desc" | null;
	selectedRows: string[];
	columnVisibility: Record<string, boolean>;
	columnWidths: Record<string, number>;
}

const createDefaultUIState = (): DrillHoleDataUIState => ({
	currentPage: 1,
	pageSize: 100,
	searchQuery: "",
	filters: {},
	sortBy: null,
	sortOrder: null,
	selectedRows: [],
	columnVisibility: {},
	columnWidths: {},
});

export const buildUIContextKey = (tab: TabKey, lens?: string): string => `${tab}:${lens || ""}`;

/**
 * Drill-Hole-Data Store State
 */
export interface DrillHoleDataState {
	// ========================================================================
	// Identity & Loading State
	// ========================================================================

	drillPlanId: string | null;
	isLoaded: boolean;
	isLoading: boolean;
	error: string | null;
	loadedAt: Date | null;
	modifiedAt: Date | null;

	// ========================================================================
	// Core Data (from VwCollar, VwDrillPlan)
	// ========================================================================

	vwCollar: VwCollar | null;
	vwDrillPlan: VwDrillPlan | null;

	// ========================================================================
	// Global ReadOnly Control
	// ========================================================================

	/**
	 * Collar-level RowStatus (from VwCollar.RowStatus)
	 * Controls global edit permissions
	 * 0 = Draft (editable), other values = ReadOnly
	 */
	collarRowStatus: number;

	// ========================================================================
	// UI State
	// ========================================================================

	/**
	 * Active tab (Setup, Geology, Geotech, etc.)
	 */
	activeTab: TabKey;

	/**
	 * Active lens per tab
	 * Example: { "Geology": "Litho", "Setup": "RigSetup" }
	 */
	activeLens: Record<string, string>;
	tabInitialized: Record<TabKey, boolean>;
	uiByContext: Record<string, DrillHoleDataUIState>;

	/**
	 * Drawer state
	 */
	isDrawerOpen: boolean;
	selectedRow: any | null;
	selectedSection: string | null;

	// ========================================================================
	// Sections (created by section-factory)
	// ========================================================================

	sections: ReturnType<typeof createAllSections>;

	// ========================================================================
	// Actions - Navigation
	// ========================================================================

	setActiveTab: (tab: TabKey) => void;
	setActiveLens: (tab: string, lens: string) => void;
	markTabInitialized: (tab: TabKey) => void;
	setUIState: (contextKey: string, partial: Partial<DrillHoleDataUIState>) => void;
	resetUIState: (contextKey: string) => void;
	getUIState: (contextKey: string) => DrillHoleDataUIState;
	getViewContextKey: (tab: TabKey, lens?: string) => string;
	getViewUIState: (tab: TabKey, lens?: string) => DrillHoleDataUIState;

	// ========================================================================
	// Actions - Drawer
	// ========================================================================

	openDrawer: (section: string, row: any) => void;
	closeDrawer: () => void;

	// ========================================================================
	// Actions - Data Loading
	// ========================================================================

	loadDrillHole: (drillPlanId: string, forceRefresh?: boolean) => Promise<void>;
	unloadDrillHole: () => void;
	refreshDrillHole: () => Promise<void>;
	refreshSection: (sectionKey: SectionKey) => Promise<void>;

	// ========================================================================
	// Actions - Section Operations
	// ========================================================================

	updateSectionData: <TData>(sectionKey: SectionKey, partialData: Partial<TData>) => void;
	saveSection: (sectionKey: SectionKey) => Promise<ActionResult>;
	submitSection: (sectionKey: SectionKey) => Promise<ActionResult>;
	rejectSection: (sectionKey: SectionKey) => Promise<ActionResult>;
	reviewSection: (sectionKey: SectionKey) => Promise<ActionResult>;
	approveSection: (sectionKey: SectionKey) => Promise<ActionResult>;

	// ========================================================================
	// Actions - Row Operations (for grid sections)
	// ========================================================================

	addRow: (sectionKey: SectionKey, row: any) => void;
	updateRow: (sectionKey: SectionKey, rowId: string, partialData: any) => void;
	deleteRow: (sectionKey: SectionKey, rowId: string) => void;
	saveRow: (sectionKey: SectionKey, rowId: string) => Promise<boolean>;

	// ========================================================================
	// Utilities
	// ========================================================================

	/**
	 * Check if any section has unsaved changes
	 */
	hasUnsavedChanges: () => boolean;

	/**
	 * Get list of sections with unsaved changes
	 */
	getDirtySections: () => SectionKey[];

	/**
	 * Check if user can edit section/row based on RowStatus
	 *
	 * @param sectionKey - Section to check
	 * @param rowId - Optional row ID for row-level check
	 * @returns True if editable
	 */
	canEdit: (sectionKey: SectionKey, rowId?: string) => boolean;
}

/**
 * Create Drill-Hole-Data Store
 */
export const useDrillHoleDataStore = create<DrillHoleDataState>()(
	devtools(
		immer((set, get) => ({
			// ================================================================
			// Initial State
			// ================================================================

			drillPlanId: null,
			isLoaded: false,
			isLoading: false,
			error: null,
			loadedAt: null,
			modifiedAt: null,

			vwCollar: null,
			vwDrillPlan: null,
			collarRowStatus: 0,

			activeTab: "Setup",
			activeLens: {
				"Setup": TAB_DEFAULT_LENS.Setup || "RigSheet",
				"Geology": TAB_DEFAULT_LENS.Geology || "Litho",
				"Geotech": TAB_DEFAULT_LENS.Geotech || "CoreRecoveryRun",
				"Sampling": TAB_DEFAULT_LENS.Sampling || "Sample",
			},
			tabInitialized: {
				Setup: true,
				Geology: false,
				Geotech: false,
				Sampling: false,
				QAQC: false,
				SignOff: false,
				Summary: false,
			},
			uiByContext: {},

			isDrawerOpen: false,
			selectedRow: null,
			selectedSection: null,

			// Initialize sections with factory
			sections: createAllSections(),

			// ================================================================
			// Navigation Actions
			// ================================================================

			setActiveTab: (tab) => {
				console.log(`[Store] 📑 Tab changed:`, {
					from: get().activeTab,
					to: tab,
					timestamp: new Date().toISOString(),
				});

				set((state) => {
					state.activeTab = tab;
					if (!state.tabInitialized[tab]) {
						console.log("[Store] 🚀 Initializing tab for first time", { tab });
						state.tabInitialized[tab] = true;
					}
				});
			},

			setActiveLens: (tab, lens) => {
				console.log(`[Store] 🔍 Lens changed:`, {
					tab,
					from: get().activeLens[tab],
					to: lens,
					timestamp: new Date().toISOString(),
				});

				set((state) => {
					state.activeLens[tab] = lens;
				});
			},

			markTabInitialized: (tab: TabKey) => {
				set((state) => {
					if (!state.tabInitialized[tab]) {
						console.log("[Store] ✅ Tab marked initialized", { tab, timestamp: new Date().toISOString() });
						state.tabInitialized[tab] = true;
					}
				});
			},

			setUIState: (contextKey, partial) => {
				set((state) => {
					state.uiByContext[contextKey] = {
						...(state.uiByContext[contextKey] || createDefaultUIState()),
						...partial,
					};
				});
			},

			resetUIState: (contextKey) => {
				set((state) => {
					state.uiByContext[contextKey] = createDefaultUIState();
				});
			},

			getUIState: (contextKey) => {
				return get().uiByContext[contextKey] || createDefaultUIState();
			},

			getViewContextKey: (tab: TabKey, lens?: string) => {
				const resolvedLens = lens ?? get().activeLens[tab] ?? TAB_DEFAULT_LENS[tab] ?? "";
				return buildUIContextKey(tab, resolvedLens);
			},

			getViewUIState: (tab: TabKey, lens?: string) => {
				const contextKey = get().getViewContextKey(tab, lens);
				return get().uiByContext[contextKey] || createDefaultUIState();
			},

			// ================================================================
			// Drawer Actions
			// ================================================================

			openDrawer: (section, row) => {
				console.log(`[Store] 📂 Drawer opened:`, {
					section,
					rowId: row?.id,
					timestamp: new Date().toISOString(),
				});

				set({
					isDrawerOpen: true,
					selectedRow: row,
					selectedSection: section,
				});
			},

			closeDrawer: () => {
				console.log(`[Store] ❌ Drawer closed`);

				set({
					isDrawerOpen: false,
					selectedRow: null,
					selectedSection: null,
				});
			},

			// ================================================================
			// Data Loading Actions
			// ================================================================

			loadDrillHole: async (drillPlanId: string, forceRefresh = false) => {
				return StoreLoaders.loadDrillHole(set, get, drillPlanId, forceRefresh);
			},

			unloadDrillHole: () => {
				StoreLoaders.unloadDrillHole(set);
			},

			refreshDrillHole: async () => {
				return StoreLoaders.refreshDrillHole(set, get);
			},

			refreshSection: async (sectionKey: SectionKey) => {
				return StoreLoaders.refreshSection(set, get, sectionKey);
			},

			// ================================================================
			// Section Operations
			// ================================================================

			updateSectionData: <TData>(sectionKey: SectionKey, partialData: Partial<TData>) => {
				StoreActions.updateSectionData(set, get, sectionKey, partialData);
			},

			saveSection: async (sectionKey: SectionKey) => {
				return StoreActions.saveSection(set, get, sectionKey);
			},

			submitSection: async (sectionKey: SectionKey) => {
				return StoreActions.submitSection(set, get, sectionKey);
			},

			rejectSection: async (sectionKey: SectionKey) => {
				return StoreActions.rejectSection(set, get, sectionKey);
			},

			reviewSection: async (sectionKey: SectionKey) => {
				return StoreActions.reviewSection(set, get, sectionKey);
			},

			approveSection: async (sectionKey: SectionKey) => {
				return StoreActions.approveSection(set, get, sectionKey);
			},

			// ================================================================
			// Row Operations
			// ================================================================

			addRow: (sectionKey: SectionKey, row: any) => {
				StoreRowOps.addRow(set, get, sectionKey, row);
			},

			updateRow: (sectionKey: SectionKey, rowId: string, partialData: any) => {
				StoreRowOps.updateRow(set, get, sectionKey, rowId, partialData);
			},

			deleteRow: (sectionKey: SectionKey, rowId: string) => {
				StoreRowOps.deleteRow(set, get, sectionKey, rowId);
			},

			saveRow: async (sectionKey: SectionKey, rowId: string) => {
				return StoreRowOps.saveRow(get, sectionKey, rowId);
			},

			// ================================================================
			// Utilities
			// ================================================================

			hasUnsavedChanges: (): boolean => {
				const sections = get().sections;
				return Object.values(sections).some((section: any) =>
					section.hasUnsavedChanges && section.hasUnsavedChanges()
				);
			},

			getDirtySections: (): SectionKey[] => {
				const sections = get().sections;
				return Object.entries(sections)
					.filter(([_, section]: [string, any]) =>
						section.hasUnsavedChanges && section.hasUnsavedChanges()
					)
					.map(([key]) => key as SectionKey);
			},

			canEdit: (sectionKey: SectionKey, rowId?: string): boolean => {
				const state = get();

				// Global check: Collar RowStatus must be 0 (Draft)
				if (state.collarRowStatus !== 0) {
					console.log("[Store] 🔒 canEdit = false (Global check failed)", {
						sectionKey,
						collarRowStatus: state.collarRowStatus,
						reason: "Collar is not in Draft status",
						timestamp: new Date().toISOString(),
					});
					return false;
				}

				// Section check: Section RowStatus must be 0 (Draft)
				const section = state.sections[sectionKey];
				if (!section) {
					console.log("[Store] 🔒 canEdit = false (Section not found)", {
						sectionKey,
						timestamp: new Date().toISOString(),
					});
					return false;
				}

				if (section.data && typeof section.data === "object" && "RowStatus" in section.data) {
					const sectionRowStatus = (section.data as any).RowStatus;
					if (sectionRowStatus !== 0) {
						return false;
					}
				}

				// Row check (for array sections): Row RowStatus must be 0 (Draft)
				if (rowId && section.rowMetadata) {
					const metadata = section.rowMetadata[rowId];
					if (metadata && metadata.rowStatus !== "Draft") {
						return false;
					}
				}

				return true;
			},
		})),
		{ name: "DrillHoleDataStore" }
	)
);
