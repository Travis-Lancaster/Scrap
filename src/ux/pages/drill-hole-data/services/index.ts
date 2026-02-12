/**
 * Drill-Hole-Data Services
 * 
 * Barrel export for all service layer functions.
 * 
 * @module drill-hole-data/services
 */

// Main data service
export {
	loadDrillHoleData,
	saveSectionData,
	saveRowData,
} from "./drill-hole-data-service";

// Removed cache helper exports:
// - drillHoleDataExistsInCache (no separate cache)
// - clearDrillHoleDataCache (no separate cache)
// - getCacheAge (no separate cache)
// Individual Dexie tables ARE the cache

// LiveQuery adapter
export {
	subscribeToDrillHole,
	subscribeToSection,
	subscribeToSyncQueue,
	subscribeToSections,
	isLiveQuerySupported,
	logLiveQueryDiagnostics,
} from "./livequery-adapter";
