/**
 * Drill-Hole-Data Store
 * 
 * Barrel export for store and related utilities.
 * 
 * @module drill-hole-data/store
 */

// Main store
export { useDrillHoleDataStore } from "./drill-hole-data-store";
export type { DrillHoleDataState } from "./drill-hole-data-store";

// Section configuration
export {
	SECTION_CONFIGS,
	getSectionConfig,
	getAllSectionConfigs,
	isSingleSection,
	isArraySection,
} from "./section-config";

// Section factory
export {
	createSectionStore,
	createArraySectionStore,
	createAllSections,
	createRowMetadata,
} from "./section-factory";

// Mappers
export {
	mapRigSetupFromApi,
	mapCollarCoordinateFromApi,
	mapGeologyCombinedLogFromApi,
	mapAllSamplesFromApi,
	extractRowMetadataFromApi,
	extractRowVersionsFromApi,
	mapDrillHoleAggregateToStore,
} from "./section-mappers";

// Store modules (for advanced usage)
export * as StoreActions from "./store-actions";
export * as StoreLoaders from "./store-loaders";
export * as StoreRowOps from "./store-row-operations";
