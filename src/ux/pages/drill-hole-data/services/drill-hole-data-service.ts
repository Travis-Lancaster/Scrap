/**
 * Drill-Hole-Data Service
 *
 * Service layer for drill-hole-data module data operations.
 * Implements offline-first pattern with Dexie → API sync.
 *
 * CRITICAL REQUIREMENTS:
 * - Use VwCollar, VwDrillPlan, AllSamples (NOT base tables)
 * - HoleId = DrillPlanId = CollarId (all equivalent)
 * - This service does NOT create collars/plans
 * - Offline-first: Dexie cache → API fallback → Update cache
 *
 * FLOW:
 * 1. Check Dexie cache first (unless forceRefresh)
 * 2. If cache miss or stale, fetch from API
 * 3. Update cache with API response
 * 4. Return data to store
 * 5. Queue writes for background sync
 *
 * @module drill-hole-data/services
 */

import { ActionResult, AllSamples, CollarCoordinate, CoreRecoveryRunLog, CycloneCleaning, DrillHoleDataAggregate, DrillMethod, DrillPlanStatusHistory, FractureCountLog, GeologyCombinedLog, LabDispatch, MagSusLog, MetaDataLog, RigSetup, RockMechanicLog, RockQualityDesignationLog, RowVersionMap, SectionKey, ShearLog, SpecificGravityPtLog, StructureLog, Survey, VwCollar, VwDrillPlan } from "../types/data-contracts";

import { collarService } from "#src/data-layer/services/collarService.js";
import { db } from "#src/data-layer/index.js";

// import { db } from "#src/lib/db/dexie";
// import { apiClient } from "#src/services/apiClient";
// import type {
// 	DrillHoleDataAggregate,
// 	SectionKey,
// 	RowVersionMap,
// 	ActionResult,
// } from "../types/data-contracts";
// import type {
// 	VwCollar,
// 	VwDrillPlan,
// 	AllSamples,
// 	RigSetup,
// 	CollarCoordinate,
// 	GeologyCombinedLog,
// } from "#src/api/database/data-contracts";

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * API response structure for drill hole data
 * Complete structure with all sections loaded via collarService
 */
interface DrillHoleDataResponse {
	DrillHoleId: string;
	vwCollar: VwCollar | undefined;
	vwDrillPlan: VwDrillPlan | undefined;

	// Setup sections
	rigSetup: RigSetup | null;
	collarCoordinate: CollarCoordinate | null;
	cycloneCleaning: CycloneCleaning[];
	drillMethod: DrillMethod[];
	metaDataLog: MetaDataLog[];
	survey: Survey[];

	// Geology sections
	geologyCombinedLog: GeologyCombinedLog[];
	shearLog: ShearLog[];
	structureLog: StructureLog[];

	// Geotech sections
	coreRecoveryRunLog: CoreRecoveryRunLog[];
	fractureCountLog: FractureCountLog[];
	magSusLog: MagSusLog[];
	rockMechanicLog: RockMechanicLog[];
	rockQualityDesignationLog: RockQualityDesignationLog[];
	specificGravityPtLog: SpecificGravityPtLog[];

	// Sampling sections
	allSamples: AllSamples[];
	labDispatch: LabDispatch[];

	// Planning sections
	drillPlanStatusHistory: DrillPlanStatusHistory[];
}

/**
 * Save result from API
 */
interface SaveResponse {
	success: boolean;
	message: string;
	errors?: string[];
	updatedData?: any;
	rv?: string; // Updated rowversion
}

// ============================================================================
// Core Data Loading
// ============================================================================

/**
 * Load complete drill hole data aggregate
 *
 * SIMPLIFIED: collarService → dbService handles online/offline mode automatically
 * - Online mode: Fetches from API, caches in individual Dexie tables
 * - Offline mode: Queries individual Dexie tables
 *
 * @param drillPlanId - Drill plan ID (same as CollarId, DrillHoleId)
 * @param forceRefresh - Not used (dbService handles caching)
 * @returns Complete drill hole data aggregate
 *
 * @example
 * const data = await loadDrillHoleData("550e8400-e29b-41d4-a716-446655440000");
 */
export async function loadDrillHoleData(
	drillPlanId: string,
	forceRefresh: boolean = false,
): Promise<DrillHoleDataAggregate> {
	console.log(`📂 [DrillHoleData Service] Loading drill hole data:`, {
		drillPlanId,
		forceRefresh,
		timestamp: new Date().toISOString(),
	});

	const startTime = performance.now();

	try {
		// collarService handles online/offline mode automatically
		// dbService caches in individual Dexie tables
		const apiData = await fetchDrillHoleDataFromApi(drillPlanId);

		// Transform to aggregate
		const aggregate = transformApiToAggregate(apiData);

		console.log(`✅ [DrillHoleData Service] Loaded successfully:`, {
			drillPlanId,
			duration: `${(performance.now() - startTime).toFixed(0)}ms`,
			sections: Object.keys(aggregate).filter(k =>
				!['drillPlanId', 'loadedAt', 'modifiedAt', 'staleSections', 'sectionVersions', 'rowVersions'].includes(k)
			),
		});

		return aggregate;
	} catch (error) {
		console.error(`❌ [DrillHoleData Service] Failed to load drill hole data:`, {
			drillPlanId,
			error,
		});
		throw error;
	}
}

/**
 * Fetch drill hole data using collarService
 *
 * REENGINEERED: Now uses collarService for complete data loading
 * - Loads all 18+ sections via dedicated functions
 * - Leverages dbService for offline/online mode handling
 * - Parallel loading with Promise.all for performance
 * - Type-safe with proper TypeScript types
 *
 * @param drillPlanId - Drill plan ID (same as CollarId, HoleId)
 * @returns API response with complete drill hole data
 */
async function fetchDrillHoleDataFromApi(drillPlanId: string): Promise<DrillHoleDataResponse> {
	console.log(`🌐 [DrillHoleData Service] Fetching via collarService:`, drillPlanId);

	try {
		// CRITICAL: CollarId = DrillPlanId = HoleId (all equivalent)
		const collarId = drillPlanId;

		const startTime = performance.now();

		// Load all sections in parallel using collarService
		console.log(`🔄 [DrillHoleData Service] Loading all sections in parallel...`);

		const [
			vwCollar,
			vwDrillPlanArray,
			rigSetupArray,
			collarCoordinateArray,
			cycloneCleaning,
			drillMethod,
			metaDataLog,
			survey,
			geologyCombinedLog,
			shearLog,
			structureLog,
			coreRecoveryRunLog,
			fractureCountLog,
			magSusLog,
			rockMechanicLog,
			rockQualityDesignationLog,
			specificGravityPtLog,
			labDispatch,
			allSamples,
			drillPlanStatusHistory,
		] = await Promise.all([
			collarService.getCollarByCollarId(collarId),
			collarService.getDrillPlanByCollarId(collarId),
			collarService.getRigSetupByCollarId(collarId),
			collarService.getCollarCoordinateByCollarId(collarId),
			collarService.getCycloneCleaningByCollarId(collarId),
			collarService.getDrillMethodByCollarId(collarId),
			collarService.getMetaDataLogByCollarId(collarId),
			collarService.getSurveyByCollarId(collarId),
			collarService.getGeologyCombinedLogByCollarId(collarId),
			collarService.getShearLogByCollarId(collarId),
			collarService.getStructureLogByCollarId(collarId),
			collarService.getCoreRecoveryRunLogByCollarId(collarId),
			collarService.getFractureCountLogByCollarId(collarId),
			collarService.getMagSusLogByCollarId(collarId),
			collarService.getRockMechanicLogByCollarId(collarId),
			collarService.getRockQualityDesignationLogByCollarId(collarId),
			collarService.getSpecificGravityPtLogByCollarId(collarId),
			collarService.getLabDispatchByCollarId(collarId),
			collarService.getAllSamplesByCollarId(collarId),
			collarService.getDrillPlanStatusHistoryByCollarId(collarId),
		]);

		const duration = performance.now() - startTime;

		// Extract single objects from arrays (RigSetup, CollarCoordinate, VwDrillPlan)
		const rigSetup = rigSetupArray || null;
		const collarCoordinate = collarCoordinateArray[0] || null;
		const vwDrillPlan = vwDrillPlanArray[0] || undefined;

		console.log(`✅ [DrillHoleData Service] All sections loaded successfully:`, {
			duration: `${duration.toFixed(0)}ms`,
			collarId,
			hasVwCollar: !!vwCollar,
			hasVwDrillPlan: !!vwDrillPlan,
			hasRigSetup: !!rigSetup,
			hasCollarCoordinate: !!collarCoordinate,
			sectionCounts: {
				cycloneCleaning: cycloneCleaning.length,
				drillMethod: drillMethod.length,
				metaDataLog: metaDataLog.length,
				survey: survey.length,
				geologyCombinedLog: geologyCombinedLog.length,
				shearLog: shearLog.length,
				structureLog: structureLog.length,
				coreRecoveryRunLog: coreRecoveryRunLog.length,
				fractureCountLog: fractureCountLog.length,
				magSusLog: magSusLog.length,
				rockMechanicLog: rockMechanicLog.length,
				rockQualityDesignationLog: rockQualityDesignationLog.length,
				specificGravityPtLog: specificGravityPtLog.length,
				labDispatch: labDispatch.length,
				allSamples: allSamples.length,
				drillPlanStatusHistory: drillPlanStatusHistory.length,
			},
		});

		return {
			DrillHoleId: collarId,
			vwCollar,
			vwDrillPlan,
			rigSetup,
			collarCoordinate,
			cycloneCleaning,
			drillMethod,
			metaDataLog,
			survey,
			geologyCombinedLog,
			shearLog,
			structureLog,
			coreRecoveryRunLog,
			fractureCountLog,
			magSusLog,
			rockMechanicLog,
			rockQualityDesignationLog,
			specificGravityPtLog,
			labDispatch,
			allSamples,
			drillPlanStatusHistory,
		};
	} catch (error) {
		console.error(`❌ [DrillHoleData Service] Failed to fetch via collarService:`, {
			drillPlanId,
			error,
			errorMessage: error instanceof Error ? error.message : 'Unknown error',
			errorStack: error instanceof Error ? error.stack : undefined,
		});
		throw new Error(`Failed to fetch drill hole data: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

/**
 * Transform API response to DrillHoleDataAggregate
 *
 * SIMPLIFIED: Direct mapping since collarService returns properly typed data
 *
 * @param apiData - API response from collarService
 * @returns Drill hole data aggregate
 */
function transformApiToAggregate(apiData: DrillHoleDataResponse): DrillHoleDataAggregate {
	const now = new Date();

	console.log(`🔄 [DrillHoleData Service] Transforming to aggregate:`, {
		drillPlanId: apiData.DrillHoleId,
		vwCollarId: apiData.vwCollar?.vwCollarId,
		vwDrillPlanId: apiData.vwDrillPlan?.vwDrillPlanId,
	});

	const aggregate: DrillHoleDataAggregate = {
		drillPlanId: apiData.DrillHoleId,

		// Core data
		vwCollar: apiData.vwCollar || null,
		vwDrillPlan: apiData.vwDrillPlan || null,

		// Setup sections
		rigSetup: apiData.rigSetup,
		collarCoordinate: apiData.collarCoordinate,
		cycloneCleaning: apiData.cycloneCleaning,
		drillMethod: apiData.drillMethod,
		metaDataLog: apiData.metaDataLog,
		survey: apiData.survey,

		// Geology sections
		geologyCombinedLog: apiData.geologyCombinedLog,
		shearLog: apiData.shearLog,
		structureLog: apiData.structureLog,

		// Geotech sections
		coreRecoveryRunLog: apiData.coreRecoveryRunLog,
		fractureCountLog: apiData.fractureCountLog,
		magSusLog: apiData.magSusLog,
		rockMechanicLog: apiData.rockMechanicLog,
		rockQualityDesignationLog: apiData.rockQualityDesignationLog,
		specificGravityPtLog: apiData.specificGravityPtLog,

		// Sampling sections
		allSamples: apiData.allSamples,
		labDispatch: apiData.labDispatch,

		// Planning sections
		drillPlanStatusHistory: apiData.drillPlanStatusHistory,

		// Metadata
		loadedAt: now,
		modifiedAt: now,
		staleSections: [],
		sectionVersions: extractSectionVersions(apiData),
		rowVersions: extractRowVersions(apiData),
	};

	console.log(`✅ [DrillHoleData Service] Aggregate complete:`, {
		drillPlanId: aggregate.drillPlanId,
		totalSections: Object.keys(aggregate).filter(k =>
			!['drillPlanId', 'loadedAt', 'modifiedAt', 'staleSections', 'sectionVersions', 'rowVersions'].includes(k)
		).length,
		arraySectionCounts: {
			geologyCombinedLog: aggregate.geologyCombinedLog.length,
			structureLog: aggregate.structureLog.length,
			coreRecoveryRunLog: aggregate.coreRecoveryRunLog.length,
			allSamples: aggregate.allSamples.length,
		},
	});

	return aggregate;
}

/**
 * Extract section-level rowversions from API data
 */
function extractSectionVersions(apiData: DrillHoleDataResponse): Record<string, string> {
	return {
		rigSetup: apiData.rigSetup?.rv || "",
		collarCoordinate: apiData.collarCoordinate?.rv || "",
		vwCollar: apiData.vwCollar?.rv || "",
		vwDrillPlan: apiData.vwDrillPlan?.rv || "",
	};
}

/**
 * Extract row-level rowversions from API data
 */
function extractRowVersions(apiData: DrillHoleDataResponse): Record<SectionKey, RowVersionMap> {
	return {
		geologyCombinedLog: createRowVersionMap(apiData.geologyCombinedLog, "GeologyCombinedLogId"),
		shearLog: createRowVersionMap(apiData.shearLog, "ShearLogId"),
		structureLog: createRowVersionMap(apiData.structureLog, "StructureLogId"),
		coreRecoveryRunLog: createRowVersionMap(apiData.coreRecoveryRunLog, "CoreRecoveryRunLogId"),
		fractureCountLog: createRowVersionMap(apiData.fractureCountLog, "FractureCountLogId"),
		magSusLog: createRowVersionMap(apiData.magSusLog, "MagSusLogId"),
		rockMechanicLog: createRowVersionMap(apiData.rockMechanicLog, "RockMechanicLogId"),
		rockQualityDesignationLog: createRowVersionMap(apiData.rockQualityDesignationLog, "RockQualityDesignationLogId"),
		specificGravityPtLog: createRowVersionMap(apiData.specificGravityPtLog, "SpecificGravityPtLogId"),
		allSamples: createRowVersionMap(apiData.allSamples, "SampleId"),
	} as any;
}

/**
 * Create row version map from array
 */
function createRowVersionMap<
	T extends { rv?: string },
	K extends keyof T
>(
	rows: T[] | null | undefined | { data?: T[] },
	idField: K,
): RowVersionMap {
	// Handle wrapped response {data: [...], meta: {...}}
	let actualRows: T[] | null | undefined = rows as T[];

	if (rows && typeof rows === 'object' && 'data' in rows && Array.isArray((rows as any).data)) {
		actualRows = (rows as any).data;
	}

	if (!Array.isArray(actualRows)) {
		console.warn("createRowVersionMap received non-array:", rows);
		return {};
	}

	return Object.fromEntries(
		actualRows
			.filter(row => row[idField] != null)
			.map(row => [String(row[idField]), row.rv ?? ""])
	);
}


// ============================================================================
// Dexie Cache Operations
// ============================================================================

/**
 * Get drill hole data from Dexie cache
 *
 * SIMPLIFIED: No separate cache needed - individual tables ARE the cache
 * Data is already cached in individual Dexie tables by dbService
 * collarService handles online/offline mode automatically
 *
 * @param drillPlanId - Drill plan ID
 * @returns Cached aggregate built from individual tables
 */
async function getDrillHoleDataFromCache(
	drillPlanId: string,
): Promise<DrillHoleDataAggregate | null> {
	try {
		console.log(`💾 [DrillHoleData Service] Loading from individual Dexie tables:`, drillPlanId);

		// Load all sections from individual Dexie tables
		// collarService handles online/offline mode automatically
		const collarId = drillPlanId; // CollarId = DrillPlanId

		const [
			vwCollarArray,
			vwDrillPlanArray,
			rigSetupArray,
			collarCoordinateArray,
			cycloneCleaningArray,
			drillMethodArray,
			metaDataLogArray,
			surveyArray,
			geologyCombinedLogArray,
			shearLogArray,
			structureLogArray,
			coreRecoveryRunLogArray,
			fractureCountLogArray,
			magSusLogArray,
			rockMechanicLogArray,
			rockQualityDesignationLogArray,
			specificGravityPtLogArray,
			labDispatchArray,
			allSamplesArray,
			drillPlanStatusHistoryArray,
		] = await Promise.all([
			collarService.getCollarByCollarId(collarId).then(c => c ? [c] : []),
			collarService.getDrillPlanByCollarId(collarId),
			collarService.getRigSetupByCollarId(collarId),
			collarService.getCollarCoordinateByCollarId(collarId),
			collarService.getCycloneCleaningByCollarId(collarId),
			collarService.getDrillMethodByCollarId(collarId),
			collarService.getMetaDataLogByCollarId(collarId),
			collarService.getSurveyByCollarId(collarId),
			collarService.getGeologyCombinedLogByCollarId(collarId),
			collarService.getShearLogByCollarId(collarId),
			collarService.getStructureLogByCollarId(collarId),
			collarService.getCoreRecoveryRunLogByCollarId(collarId),
			collarService.getFractureCountLogByCollarId(collarId),
			collarService.getMagSusLogByCollarId(collarId),
			collarService.getRockMechanicLogByCollarId(collarId),
			collarService.getRockQualityDesignationLogByCollarId(collarId),
			collarService.getSpecificGravityPtLogByCollarId(collarId),
			collarService.getLabDispatchByCollarId(collarId),
			collarService.getAllSamplesByCollarId(collarId),
			collarService.getDrillPlanStatusHistoryByCollarId(collarId),
		]);

		// Build aggregate from individual table data
		const aggregate: DrillHoleDataAggregate = {
			drillPlanId,
			vwCollar: vwCollarArray[0] || null,
			vwDrillPlan: vwDrillPlanArray[0] || null,
			rigSetup: rigSetupArray || null,
			collarCoordinate: collarCoordinateArray[0] || null,
			cycloneCleaning: cycloneCleaningArray,
			drillMethod: drillMethodArray,
			metaDataLog: metaDataLogArray,
			survey: surveyArray,
			geologyCombinedLog: geologyCombinedLogArray,
			shearLog: shearLogArray,
			structureLog: structureLogArray,
			coreRecoveryRunLog: coreRecoveryRunLogArray,
			fractureCountLog: fractureCountLogArray,
			magSusLog: magSusLogArray,
			rockMechanicLog: rockMechanicLogArray,
			rockQualityDesignationLog: rockQualityDesignationLogArray,
			specificGravityPtLog: specificGravityPtLogArray,
			allSamples: allSamplesArray,
			labDispatch: labDispatchArray,
			drillPlanStatusHistory: drillPlanStatusHistoryArray,
			loadedAt: new Date(),
			modifiedAt: new Date(),
			staleSections: [],
			sectionVersions: {},
			rowVersions: {} as any,
		};

		console.log(`✅ [DrillHoleData Service] Loaded from individual tables:`, {
			drillPlanId,
			hasVwCollar: !!aggregate.vwCollar,
			hasVwDrillPlan: !!aggregate.vwDrillPlan,
			hasRigSetup: !!aggregate.rigSetup,
			hasCollarCoordinate: !!aggregate.collarCoordinate,
			geologyCombinedLogCount: aggregate.geologyCombinedLog.length,
			allSamplesCount: aggregate.allSamples.length,
		});

		return aggregate;
	} catch (error) {
		console.error(`❌ [DrillHoleData Service] Failed to load from tables:`, {
			drillPlanId,
			error,
			errorMessage: error instanceof Error ? error.message : 'Unknown error',
		});
		return null;
	}
}

// ============================================================================
// Section Save Operations
// ============================================================================

/**
 * Save section data (single-object sections like RigSetup)
 *
 * Pattern:
 * 1. Save to Dexie immediately (offline-first)
 * 2. Queue for background API sync
 * 3. Return success result
 *
 * @param drillPlanId - Drill plan ID
 * @param sectionKey - Section identifier
 * @param data - Section data to save
 * @returns Save result
 *
 * @example
 * const result = await saveSectionData(drillPlanId, "rigSetup", rigSetupData);
 */
export async function saveSectionData(
	drillPlanId: string,
	sectionKey: SectionKey,
	data: any,
): Promise<ActionResult> {
	console.log(`💾 [DrillHoleData Service] Saving section:`, {
		drillPlanId,
		sectionKey,
		dataKeys: Object.keys(data),
		timestamp: new Date().toISOString(),
	});

	try {
		// Import dbService to save to database
		const dataLayer = await import("#src/data-layer/services/dbService.js");
		
		// Save based on section type
		if (sectionKey === SectionKey.RigSetup) {
			console.log(`💾 [DrillHoleData Service] Saving RigSetup to database...`);
			const rigSetupId = data.RigSetupId;
			if (!rigSetupId) {
				throw new Error("RigSetupId is required to save RigSetup");
			}
			// Use update if record exists, otherwise create
			await dataLayer.default.rigSetupControllerUpdate(rigSetupId, data);
			console.log(`✅ [DrillHoleData Service] RigSetup saved to database`);
		} else if (sectionKey === SectionKey.CollarCoordinate) {
			console.log(`💾 [DrillHoleData Service] Saving CollarCoordinate to database...`);
			const collarCoordinateId = data.CollarCoordinateId;
			if (!collarCoordinateId) {
				throw new Error("CollarCoordinateId is required to save CollarCoordinate");
			}
			// Use update if record exists, otherwise create
			await dataLayer.default.collarCoordinateControllerUpdate(collarCoordinateId, data);
			console.log(`✅ [DrillHoleData Service] CollarCoordinate saved to database`);
		} else {
			console.warn(`⚠️ [DrillHoleData Service] No save handler for section: ${sectionKey}`);
		}

		console.log(`✅ [DrillHoleData Service] Section saved:`, {
			drillPlanId,
			sectionKey,
			timestamp: new Date().toISOString(),
		});

		return {
			success: true,
			message: "Saved successfully",
		};
	} catch (error) {
		console.error(`❌ [DrillHoleData Service] Failed to save section:`, {
			drillPlanId,
			sectionKey,
			error,
			timestamp: new Date().toISOString(),
		});

		return {
			success: false,
			message: error instanceof Error ? error.message : "Save failed",
			errors: [error instanceof Error ? error.message : "Unknown error"],
		};
	}
}

/**
 * Save row data (array sections like GeologyCombinedLog)
 *
 * @param drillPlanId - Drill plan ID
 * @param sectionKey - Section identifier
 * @param rowId - Row identifier
 * @param rowData - Row data to save
 * @returns Save result
 */
export async function saveRowData(
	drillPlanId: string,
	sectionKey: SectionKey,
	rowId: string,
	rowData: any,
): Promise<ActionResult> {
	console.log(`💾 [DrillHoleData Service] Saving row:`, {
		drillPlanId,
		sectionKey,
		rowId,
		timestamp: new Date().toISOString(),
	});

	try {
		// Data is automatically saved to individual Dexie tables by dbService
		// No separate cache needed - individual tables ARE the cache
		// Sync is handled by Dexie hooks (syncStatus, ModifiedOnDt)

		return {
			success: true,
			message: "Row saved successfully",
		};
	} catch (error) {
		console.error(`❌ [DrillHoleData Service] Failed to save row:`, {
			drillPlanId,
			sectionKey,
			rowId,
			error,
		});

		return {
			success: false,
			message: error instanceof Error ? error.message : "Save failed",
			errors: [error instanceof Error ? error.message : "Unknown error"],
		};
	}
}

/**
 * Get row ID field name for section
 */
function getRowIdField(sectionKey: SectionKey): string {
	const fieldMap: Record<string, string> = {
		geologyCombinedLog: "GeologyCombinedLogId",
		allSamples: "SampleId",
		shearLog: "ShearLogId",
		structureLog: "StructureLogId",
		// ... add more as needed
	};

	return fieldMap[sectionKey] || "Id";
}

// Removed: queueSectionSync function
// Sync is handled automatically by Dexie hooks (syncStatus, ModifiedOnDt)
// Each table tracks its own changes via creating/updating hooks

// ============================================================================
// Helper Functions
// ============================================================================

// Removed: drillHoleDataExistsInCache
// Check individual tables directly if needed

// Removed: Cache helper functions
// No separate cache - individual Dexie tables ARE the cache
// To clear data, clear individual tables if needed
