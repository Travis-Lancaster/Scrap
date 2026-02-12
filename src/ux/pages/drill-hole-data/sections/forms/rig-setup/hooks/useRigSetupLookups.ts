/**
 * useRigSetupLookups Hook
 *
 * Provides reactive lookup data for the Rig Setup Sheet form.
 * Uses Dexie LiveQuery for automatic updates when lookup data changes.
 * 
 * ⚡ PERFORMANCE: Calls useLookups() once at top level (not inside useMemo)
 */

import { useLookups } from "#src/data-layer/hooks/useLookups.js";
import { useMemo } from "react";

import type { RigSetupLookups } from "../types/RigSetup-types";

/**
 * Get all lookup options needed for the Rig Sheet form
 *
 * @returns {RigSetupLookups} Lookup data and loading state
 *
 * @example
 * ```tsx
 * const lookups = useRigSetupLookups();
 *
 * if (lookups.isLoading) {
 *   return <Spin />;
 * }
 *
 * <Select options={lookups.person} />
 * ```
 */
export function useRigSetupLookups(): RigSetupLookups {
	// ⚡ PERFORMANCE FIX: Call useLookups() ONCE at top level
	// This is a hook, so it must be called at the top level, not inside useMemo
	const allLookups = useLookups();
	
	// Extract the values we need (these are already reactive from useLiveQuery)
	const person = allLookups.Person;
	const drillCompanies = allLookups.getCompanies?.("DRILLING");
	const machinery = allLookups.getMachinery?.("DRILLING");

	// Memoize the result object to prevent unnecessary re-renders
	// Note: We're memoizing the RESULT, not calling hooks inside useMemo
	return useMemo(() => {
		// Loading state - true if any query is still loading (undefined)
		const isLoading
			= person === undefined
			|| drillCompanies === undefined
			|| machinery === undefined;

		return {
			person: person || [],
			drillCompanies: drillCompanies || [],
			machinery: machinery || [],
			isLoading,
		};
	}, [person, drillCompanies, machinery]);
}

/**
 * Get filtered machinery options based on drilling contractor
 *
 * @param {string | undefined} drillingContractor - Company code to filter by
 * @returns {Array<{value: string, label: string}>} Filtered machinery options
 *
 * @example
 * ```tsx
 * const filteredMachinery = useFilteredMachinery(form.getFieldValue('DrillingCompany'));
 * ```
 */
export function useFilteredMachinery(drillingContractor: string | undefined) {
	// ⚡ PERFORMANCE FIX: Call useLookups() ONCE at top level
	const allLookups = useLookups();
	
	// Extract values at top level
	const allMachinery = allLookups.Machinery;
	const getMachineryFn = allLookups.getMachinery;
	
	// Memoize the filtered result
	return useMemo(() => {
		if (!drillingContractor) {
			return allMachinery || [];
		}
		return getMachineryFn?.(drillingContractor) || [];
	}, [drillingContractor, allMachinery, getMachineryFn]);
}
