/**
 * Store Loaders
 *
 * Data loading logic for the store.
 * Handles fetching data from service layer and updating store state.
 *
 * @module drill-hole-data/store
 */

import type { StoreApi } from "zustand";
import { loadDrillHoleData } from "../services/drill-hole-data-service";
import { mapDrillHoleAggregateToStore } from "./section-mappers";
import { SectionKey } from "../types/data-contracts";

function applyArraySection(state: any, key: string, mapped: any) {
	if (!mapped || !state.sections[key]) return;
	state.sections[key].data = mapped.data || [];
	state.sections[key].originalData = mapped.data || [];
	state.sections[key].rowMetadata = mapped.metadata || {};
	state.sections[key].rowVersions = mapped.versions || {};
	state.sections[key].isDirty = false;
}

/**
 * Load drill hole data into store
 *
 * @param set - Zustand set function
 * @param get - Zustand get function
 * @param drillPlanId - Drill plan ID to load
 * @param forceRefresh - Skip cache and fetch from API
 */
export async function loadDrillHole(
	set: any,
	get: any,
	drillPlanId: string,
	forceRefresh: boolean = false,
): Promise<void> {
	console.log(`[StoreLoaders] 📂 Loading drill hole:`, {
		drillPlanId,
		forceRefresh,
		timestamp: new Date().toISOString(),
	});

	// Set loading state
	set({ isLoading: true, error: null });

	try {
		// Fetch data from service
		console.log(`[StoreLoaders] 🔄 Calling loadDrillHoleData service...`);
		const aggregate = await loadDrillHoleData(drillPlanId, forceRefresh);

		console.log(`[StoreLoaders] ✅ Data loaded successfully:`, {
			drillPlanId,
			aggregateKeys: Object.keys(aggregate),
			sections: Object.keys(aggregate).filter(k =>
				!['drillPlanId', 'loadedAt', 'modifiedAt', 'staleSections', 'sectionVersions', 'rowVersions'].includes(k)
			),
		});

		// Map API data to store format
		console.log(`[StoreLoaders] 🗺️ Mapping aggregate to store format...`);
		const mappedSections = mapDrillHoleAggregateToStore(aggregate);

		console.log(`[StoreLoaders] 🗺️ Mapping complete:`, {
			hasRigSetup: !!mappedSections.rigSetup,
			hasCollarCoordinate: !!mappedSections.collarCoordinate,
			hasGeologyCombinedLog: !!mappedSections.geologyCombinedLog,
			hasAllSamples: !!mappedSections.allSamples,
			hasVwCollar: !!mappedSections.vwCollar,
			hasVwDrillPlan: !!mappedSections.vwDrillPlan,
		});

		// Update store state
		console.log(`[StoreLoaders] 📝 Updating store state...`);
		set((state: any) => {
			// Update single-object sections
			// If rigSetup doesn't exist, create default with DrillPlanId
			if (mappedSections.rigSetup) {
				console.log(`[StoreLoaders] 📝 Setting rigSetup data (from API)`);
				state.sections.rigSetup.data = mappedSections.rigSetup;
				state.sections.rigSetup.originalData = mappedSections.rigSetup;
				state.sections.rigSetup.isDirty = false;
			} else {
				console.log(`[StoreLoaders] 📝 Creating default rigSetup (none exists)`);
				// Create default RigSetup with DrillPlanId and Organization from vwDrillPlan
				const defaultRigSetup = {
					RigSetupId: crypto.randomUUID(),
					DrillPlanId: drillPlanId,
					Organization: mappedSections.vwDrillPlan?.Organization || mappedSections.vwCollar?.Organization || 'Exploration',
					RowStatus: 0, // Draft
					ActiveInd: true,
					CreatedOnDt: new Date().toISOString(),
					CreatedBy: 'system',
					ModifiedOnDt: new Date().toISOString(),
					ModifiedBy: 'system',
				};
				state.sections.rigSetup.data = defaultRigSetup;
				state.sections.rigSetup.originalData = defaultRigSetup;
				state.sections.rigSetup.isDirty = true; // Mark as dirty so it gets saved
			}

			// If collarCoordinate doesn't exist, create default
			if (mappedSections.collarCoordinate) {
				console.log(`[StoreLoaders] 📝 Setting collarCoordinate data (from API)`);
				state.sections.collarCoordinate.data = mappedSections.collarCoordinate;
				state.sections.collarCoordinate.originalData = mappedSections.collarCoordinate;
				state.sections.collarCoordinate.isDirty = false;
			} else {
				console.log(`[StoreLoaders] 📝 Creating default collarCoordinate (none exists)`);
				// Create default CollarCoordinate with CollarId
				const defaultCollarCoordinate = {
					CollarId: drillPlanId,
					Organization: mappedSections.vwDrillPlan?.Organization || mappedSections.vwCollar?.Organization || 'Exploration',
					RowStatus: 0, // Draft
					ActiveInd: true,
					CreatedOnDt: new Date().toISOString(),
					CreatedBy: 'system',
					ModifiedOnDt: new Date().toISOString(),
					ModifiedBy: 'system',
				};
				state.sections.collarCoordinate.data = defaultCollarCoordinate;
				state.sections.collarCoordinate.originalData = defaultCollarCoordinate;
				state.sections.collarCoordinate.isDirty = true; // Mark as dirty so it gets saved
			}

			// Update array sections
			applyArraySection(state, "geologyCombinedLog", mappedSections.geologyCombinedLog);
			applyArraySection(state, "shearLog", mappedSections.shearLog);
			applyArraySection(state, "structureLog", mappedSections.structureLog);
			applyArraySection(state, "allSamples", mappedSections.allSamples);
			applyArraySection(state, "coreRecoveryRunLog", mappedSections.coreRecoveryRunLog);
			applyArraySection(state, "fractureCountLog", mappedSections.fractureCountLog);
			applyArraySection(state, "magSusLog", mappedSections.magSusLog);
			applyArraySection(state, "rockMechanicLog", mappedSections.rockMechanicLog);
			applyArraySection(state, "rockQualityDesignationLog", mappedSections.rockQualityDesignationLog);
			applyArraySection(state, "specificGravityPtLog", mappedSections.specificGravityPtLog);

			if (mappedSections.dispatch) {
				state.sections.dispatch.data = mappedSections.dispatch;
				state.sections.dispatch.originalData = mappedSections.dispatch;
				state.sections.dispatch.isDirty = false;
			}

			// Update core data
			console.log(`[StoreLoaders] 📝 Setting core data (vwCollar, vwDrillPlan)`);
			state.vwCollar = mappedSections.vwCollar;
			state.vwDrillPlan = mappedSections.vwDrillPlan;
			state.collarRowStatus = mappedSections.vwCollar?.RowStatus?.Code || 0;

			// Update state flags
			console.log(`[StoreLoaders] 📝 Setting state flags (isLoaded, isLoading, error)`);
			state.drillPlanId = drillPlanId;
			state.isLoaded = true;
			state.isLoading = false;
			state.error = null;
			state.loadedAt = mappedSections.loadedAt;
			state.modifiedAt = mappedSections.modifiedAt;
		});

		console.log(`[StoreLoaders] ✅ Store updated successfully:`, {
			drillPlanId,
			isLoaded: true,
			isLoading: false,
		});
	} catch (error) {
		console.error(`[StoreLoaders] ❌ Failed to load drill hole:`, {
			drillPlanId,
			error,
		});

		set({
			isLoading: false,
			isLoaded: false,
			error: error instanceof Error ? error.message : "Failed to load drill hole data",
		});

		throw error;
	}
}

/**
 * Unload drill hole data from store
 *
 * Resets store to initial state.
 *
 * @param set - Zustand set function
 */
export function unloadDrillHole(set: any): void {
	console.log(`[StoreLoaders] 🔄 Unloading drill hole data`);

	set({
		drillPlanId: null,
		isLoaded: false,
		isLoading: false,
		error: null,
		vwCollar: null,
		vwDrillPlan: null,
		collarRowStatus: 0,
		loadedAt: null,
		modifiedAt: null,
		activeTab: "Setup",
		activeLens: {
			Setup: "Collar",
			Geology: "Litho",
			Geotech: "CoreRecoveryRun",
			Sampling: "Sample",
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
	});

	console.log(`[StoreLoaders] ✅ Store reset to initial state`);
}

/**
 * Refresh drill hole data
 *
 * Forces a refresh from the API, bypassing cache.
 *
 * @param set - Zustand set function
 * @param get - Zustand get function
 */
export async function refreshDrillHole(set: any, get: any): Promise<void> {
	const drillPlanId = get().drillPlanId;

	if (!drillPlanId) {
		console.warn(`[StoreLoaders] ⚠️ Cannot refresh - no drill plan loaded`);
		return;
	}

	console.log(`[StoreLoaders] 🔄 Refreshing drill hole:`, drillPlanId);

	await loadDrillHole(set, get, drillPlanId, true); // forceRefresh = true
}


/**
 * Refresh a single section while preserving unsaved state in other sections.
 */
export async function refreshSection(set: any, get: any, sectionKey: SectionKey): Promise<void> {
	const drillPlanId = get().drillPlanId;

	if (!drillPlanId) {
		console.warn(`[StoreLoaders] ⚠️ Cannot refresh section - no drill plan loaded`, { sectionKey });
		return;
	}

	console.log(`[StoreLoaders] 🔄 Refreshing section`, { sectionKey, drillPlanId });

	const previousSections = get().sections;
	const preservedBySection = Object.entries(previousSections).reduce((acc: any, [key, section]: [string, any]) => {
		acc[key] = {
			data: section.data,
			originalData: section.originalData,
			rowMetadata: section.rowMetadata,
			rowVersions: section.rowVersions,
			isDirty: section.isDirty,
		};
		return acc;
	}, {});

	await loadDrillHole(set, get, drillPlanId, true);

	set((state: any) => {
		Object.entries(preservedBySection).forEach(([key, preserved]: [string, any]) => {
			if (key !== sectionKey) {
				state.sections[key].data = preserved.data;
				state.sections[key].originalData = preserved.originalData;
				state.sections[key].rowMetadata = preserved.rowMetadata;
				state.sections[key].rowVersions = preserved.rowVersions;
				state.sections[key].isDirty = preserved.isDirty;
			}
		});
	});

	console.log(`[StoreLoaders] ✅ Section refresh complete`, { sectionKey });
}
