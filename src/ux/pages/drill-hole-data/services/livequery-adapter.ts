/**
 * LiveQuery Adapter
 *
 * Provides reactive data subscriptions using Dexie liveQuery.
 * Automatically updates UI when underlying Dexie data changes.
 *
 * CORRECTED: Uses individual Dexie tables (no separate cache)
 * Subscribes to individual tables for real-time updates
 *
 * @module drill-hole-data/services
 */

import { liveQuery, type Subscription } from "dexie";
import { db } from "#src/data-layer/index.js";
import type { DrillHoleDataAggregate, SectionKey } from "../types/data-contracts";
import { collarService } from "#src/data-layer/services/collarService.js";

/**
 * Subscribe to drill hole data changes
 *
 * CORRECTED: Subscribes to individual Dexie tables
 * No separate cache - individual tables ARE the cache
 *
 * @param drillPlanId - Drill plan ID to subscribe to
 * @param onUpdate - Callback when data changes
 * @returns Unsubscribe function
 *
 * @example
 * const unsubscribe = subscribeToDrillHoleData(drillPlanId, (data) => {
 *   console.log('Data updated:', data);
 * });
 *
 * // Later...
 * unsubscribe();
 */
export function subscribeToDrillHoleData(
	drillPlanId: string,
	onUpdate: (data: DrillHoleDataAggregate | null) => void,
): () => void {
	console.log(`🔄 [LiveQuery] Subscribing to drill hole:`, drillPlanId);

	let subscription: Subscription | null = null;

	try {
		// Create liveQuery observable that watches individual tables
		const observable = liveQuery(async () => {
			console.log(`🔍 [LiveQuery] Querying individual tables:`, drillPlanId);

			const collarId = drillPlanId; // CollarId = DrillPlanId

			// Query individual tables (collarService handles online/offline mode)
			const [
				vwCollar,
				vwDrillPlanArray,
				rigSetupArray,
				collarCoordinateArray,
				geologyCombinedLogArray,
				shearLogArray,
				structureLogArray,
				coreRecoveryRunLogArray,
				fractureCountLogArray,
				magSusLogArray,
				rockMechanicLogArray,
				rockQualityDesignationLogArray,
				specificGravityPtLogArray,
				allSamplesArray,
			] = await Promise.all([
				collarService.getCollarByCollarId(collarId),
				collarService.getDrillPlanByCollarId(collarId),
				collarService.getRigSetupByCollarId(collarId),
				collarService.getCollarCoordinateByCollarId(collarId),
				collarService.getGeologyCombinedLogByCollarId(collarId),
				collarService.getShearLogByCollarId(collarId),
				collarService.getStructureLogByCollarId(collarId),
				collarService.getCoreRecoveryRunLogByCollarId(collarId),
				collarService.getFractureCountLogByCollarId(collarId),
				collarService.getMagSusLogByCollarId(collarId),
				collarService.getRockMechanicLogByCollarId(collarId),
				collarService.getRockQualityDesignationLogByCollarId(collarId),
				collarService.getSpecificGravityPtLogByCollarId(collarId),
				collarService.getAllSamplesByCollarId(collarId),
			]);

			if (!vwCollar) {
				console.log(`⚠️ [LiveQuery] No collar found for:`, drillPlanId);
				return null;
			}

			// Build aggregate from individual table data
			return {
				drillPlanId,
				vwCollar,
				vwDrillPlan: vwDrillPlanArray[0] || null,
				rigSetup: rigSetupArray[0] || null,
				collarCoordinate: collarCoordinateArray[0] || null,
				cycloneCleaning: [],
				drillMethod: [],
				metaDataLog: [],
				survey: [],
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
				labDispatch: [],
				drillPlanStatusHistory: [],
				loadedAt: new Date(),
				modifiedAt: new Date(),
				staleSections: [],
				sectionVersions: {},
				rowVersions: {} as any,
			} as DrillHoleDataAggregate;
		});

		subscription = observable.subscribe({
			next: (data) => {
				console.log(`✅ [LiveQuery] Data updated:`, {
					drillPlanId,
					hasData: data !== null,
					timestamp: new Date().toISOString(),
				});
				onUpdate(data);
			},
			error: (error) => {
				console.error(`❌ [LiveQuery] Subscription error:`, {
					drillPlanId,
					error,
				});
			},
		});

		console.log(`✅ [LiveQuery] Subscription active for:`, drillPlanId);
	} catch (error) {
		console.error(`❌ [LiveQuery] Failed to subscribe:`, {
			drillPlanId,
			error,
		});
	}

	// Return unsubscribe function
	return () => {
		console.log(`🔌 [LiveQuery] Unsubscribing from:`, drillPlanId);
		if (subscription) {
			subscription.unsubscribe();
		}
	};
}

/**
 * Subscribe to specific section changes
 *
 * CORRECTED: Subscribes to individual Dexie table for the section
 *
 * @param drillPlanId - Drill plan ID
 * @param sectionKey - Section to subscribe to
 * @param onUpdate - Callback when section data changes
 * @returns Unsubscribe function
 *
 * @example
 * const unsubscribe = subscribeToSection(drillPlanId, 'geologyCombinedLog', (data) => {
 *   console.log('Geology log updated:', data);
 * });
 */
export function subscribeToSection(
	drillPlanId: string,
	sectionKey: SectionKey,
	onUpdate: (data: any) => void,
): () => void {
	console.log(`🔄 [LiveQuery] Subscribing to section:`, {
		drillPlanId,
		sectionKey,
	});

	let subscription: Subscription | null = null;

	try {
		const observable = liveQuery(async () => {
			const collarId = drillPlanId;

			// Query specific section table
			switch (sectionKey) {
				case 'rigSetup':
					return (await collarService.getRigSetupByCollarId(collarId))[0] || null;
				case 'collarCoordinate':
					return (await collarService.getCollarCoordinateByCollarId(collarId))[0] || null;
				case 'geologyCombinedLog':
					return await collarService.getGeologyCombinedLogByCollarId(collarId);
				case 'shearLog':
					return await collarService.getShearLogByCollarId(collarId);
				case 'structureLog':
					return await collarService.getStructureLogByCollarId(collarId);
				case 'coreRecoveryRunLog':
					return await collarService.getCoreRecoveryRunLogByCollarId(collarId);
				case 'fractureCountLog':
					return await collarService.getFractureCountLogByCollarId(collarId);
				case 'magSusLog':
					return await collarService.getMagSusLogByCollarId(collarId);
				case 'rockMechanicLog':
					return await collarService.getRockMechanicLogByCollarId(collarId);
				case 'rockQualityDesignationLog':
					return await collarService.getRockQualityDesignationLogByCollarId(collarId);
				case 'specificGravityPtLog':
					return await collarService.getSpecificGravityPtLogByCollarId(collarId);
				case 'allSamples':
					return await collarService.getAllSamplesByCollarId(collarId);
				default:
					return null;
			}
		});

		subscription = observable.subscribe({
			next: (data) => {
				console.log(`✅ [LiveQuery] Section updated:`, {
					drillPlanId,
					sectionKey,
					hasData: data !== null,
					timestamp: new Date().toISOString(),
				});
				onUpdate(data);
			},
			error: (error) => {
				console.error(`❌ [LiveQuery] Section subscription error:`, {
					drillPlanId,
					sectionKey,
					error,
				});
			},
		});

		console.log(`✅ [LiveQuery] Section subscription active:`, {
			drillPlanId,
			sectionKey,
		});
	} catch (error) {
		console.error(`❌ [LiveQuery] Failed to subscribe to section:`, {
			drillPlanId,
			sectionKey,
			error,
		});
	}

	return () => {
		console.log(`🔌 [LiveQuery] Unsubscribing from section:`, {
			drillPlanId,
			sectionKey,
		});
		if (subscription) {
			subscription.unsubscribe();
		}
	};
}

/**
 * Subscribe to sync status changes
 *
 * CORRECTED: Uses Dexie hooks (syncStatus, ModifiedOnDt) instead of separate queue
 * Monitors tables for unsaved changes (syncStatus = 1)
 *
 * @param drillPlanId - Drill plan ID
 * @param onUpdate - Callback when sync status changes
 * @returns Unsubscribe function
 */
export function subscribeToSyncStatus(
	drillPlanId: string,
	onUpdate: (status: { hasPendingChanges: boolean; changeCount: number }) => void,
): () => void {
	console.log(`🔄 [LiveQuery] Subscribing to sync status:`, drillPlanId);

	let subscription: Subscription | null = null;

	try {
		const observable = liveQuery(async () => {
			const collarId = drillPlanId;

			// Check for unsaved changes across all tables (syncStatus = 1)
			const [
				rigSetupChanges,
				geologyCombinedLogChanges,
				allSamplesChanges,
			] = await Promise.all([
				db.DrillHole_RigSetup.where('DrillPlanId').equals(collarId).and(r => r.syncStatus === 1).count(),
				db.Geology_GeologyCombinedLog.where('CollarId').equals(collarId).and(r => r.syncStatus === 1).count(),
				db.Sample.where('CollarId').equals(collarId).and(r => r.syncStatus === 1).count(),
			]);

			const changeCount = rigSetupChanges + geologyCombinedLogChanges + allSamplesChanges;

			return {
				hasPendingChanges: changeCount > 0,
				changeCount,
			};
		});

		subscription = observable.subscribe({
			next: (status) => {
				console.log(`✅ [LiveQuery] Sync status updated:`, {
					drillPlanId,
					...status,
					timestamp: new Date().toISOString(),
				});
				onUpdate(status);
			},
			error: (error) => {
				console.error(`❌ [LiveQuery] Sync status error:`, {
					drillPlanId,
					error,
				});
			},
		});

		console.log(`✅ [LiveQuery] Sync status subscription active:`, drillPlanId);
	} catch (error) {
		console.error(`❌ [LiveQuery] Failed to subscribe to sync status:`, {
			drillPlanId,
			error,
		});
	}

	return () => {
		console.log(`🔌 [LiveQuery] Unsubscribing from sync status:`, drillPlanId);
		if (subscription) {
			subscription.unsubscribe();
		}
	};
}

/**
 * Diagnostics: Log current state of drill hole data
 *
 * CORRECTED: Checks individual tables instead of cache
 *
 * @param drillPlanId - Drill plan ID
 */
export async function logDrillHoleDataDiagnostics(drillPlanId: string): Promise<void> {
	console.log(`📊 [LiveQuery] Diagnostics for:`, {
		drillPlanId,
		tables: db.tables.map(t => t.name),
		timestamp: new Date().toISOString(),
	});

	try {
		const collarId = drillPlanId;

		// Check individual tables
		const [
			vwCollar,
			rigSetupCount,
			geologyCombinedLogCount,
			allSamplesCount,
		] = await Promise.all([
			collarService.getCollarByCollarId(collarId),
			db.DrillHole_RigSetup.where('DrillPlanId').equals(collarId).count(),
			db.Geology_GeologyCombinedLog.where('CollarId').equals(collarId).count(),
			db.Sample.where('CollarId').equals(collarId).count(),
		]);

		console.log(`📊 [LiveQuery] Table status:`, {
			hasCollar: !!vwCollar,
			rigSetupRecords: rigSetupCount,
			geologyCombinedLogRecords: geologyCombinedLogCount,
			allSamplesRecords: allSamplesCount,
		});
	} catch (error) {
		console.error(`❌ [LiveQuery] Diagnostics error:`, error);
	}
}
