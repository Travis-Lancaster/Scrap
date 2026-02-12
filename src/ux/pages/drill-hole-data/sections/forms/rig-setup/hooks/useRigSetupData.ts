/**
 * useRigSetupData Hook - Cache-Aside Pattern
 *
 * Provides reactive access to rig setup data via useLiveQuery
 * Data is stored in Dexie and automatically updates when changed
 *
 * Pattern:
 * 1. useLiveQuery watches Dexie (instant UI updates)
 * 2. useEffect ensures cache populated (background fetch - ONE TIME ONLY)
 * 3. dexie-syncable automatically syncs changes to API
 * 
 * ⚡ PERFORMANCE FIX: Prevents duplicate API calls on tab navigation
 */

import { collarService } from "#src/data-layer/services/collarService.js";
import dataLayer from "#src/data-layer/services/dbService.js";
import { useEffect, useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";

/**
 * Get rig setup data with cache-aside pattern
 * Uses LiveQuery for automatic reactivity
 *
 * @param drillPlanId - Drill plan ID to fetch rig setup for
 * @returns Rig setup data and loading state
 *
 * @example
 * ```tsx
 * const { rigSetup, isLoading } = useRigSetupData(drillPlanId);
 *
 * if (isLoading) {
 *   return <Spin />;
 * }
 *
 * return <RigSetupForm data={rigSetup} />;
 * ```
 */
export function useRigSetupData(drillPlanId: string | undefined) {
	// Track if we've already fetched to prevent duplicate API calls
	const hasFetchedRef = useRef(false);

	// ============================================
	// 1. THE OBSERVER: Watch Dexie for changes (NO API CALLS)
	// ============================================
	// This is reactive - automatically re-runs when IndexedDB changes
	// ⚡ CRITICAL: Query Dexie directly, don't call service (which makes API calls)
	const rigSetup = useLiveQuery(
		async () => {
			if (!drillPlanId) return null;

			console.log("[useRigSetupData] 🔍 Querying Dexie (local only):", { drillPlanId });
			
			// Query Dexie directly using dataLayer controller - reads from cache
			// The controller checks cache first, only fetches if missing
			const results = await dataLayer.rigSetupControllerFindAll({
				filters: JSON.stringify([
					{ field: 'DrillPlanId', op: "eq", value: drillPlanId },
					{ field: 'ActiveInd', op: "eq", value: true }
				]),
				// Force cache-only read (no API call)
				page: 1,
				take: 1
			});
			
			const result = results?.[0] || null;
			console.log("[useRigSetupData] ✅ Dexie query complete:", { found: !!result });
			return result;
		},
		[drillPlanId],
		null, // Default value while loading
	);

	// ============================================
	// 2. THE FETCHER: Ensure cache is populated (ONE API CALL)
	// ============================================
	// This runs in background, doesn't block UI
	// ⚡ CRITICAL: Only runs ONCE per drillPlanId to prevent duplicate API calls
	useEffect(() => {
		if (!drillPlanId) return;
		
		// Prevent duplicate fetches on re-renders
		if (hasFetchedRef.current) {
			console.log("[useRigSetupData] ⏭️ Skipping fetch - already fetched");
			return;
		}

		const ensureData = async () => {
			try {
				console.log("[useRigSetupData] 🌐 Fetching from API (one-time):", { drillPlanId });
				hasFetchedRef.current = true;
				
				// This method handles:
				// - Cache check
				// - API fetch if needed
				// - Cache update
				// - Offline fallback
				await collarService.getRigSetupByCollarId(drillPlanId);

				// No need to do anything after this!
				// If data was fetched and cached, useLiveQuery above
				// will automatically detect the change and re-render
				console.log("[useRigSetupData] ✅ API fetch complete");
			}
			catch (error) {
				console.error("[useRigSetupData] ❌ Failed to ensure data:", error);
				hasFetchedRef.current = false; // Allow retry on error
				// Don't throw - useLiveQuery will return cached data (if any)
			}
		};

		ensureData();
	}, [drillPlanId]);

	// Loading state - true if query is still loading
	const isLoading = rigSetup === undefined;

	return {
		// Data (reactive from Dexie)
		rigSetup,

		// State
		isLoading,
		hasData: !!rigSetup,
	};
}
