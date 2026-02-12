/**
 * useLookups Hook
 *
 * Provides reactive access to all lookup and classification tables.
 * Uses Dexie's useLiveQuery for automatic updates when data changes.
 *
 * Usage:
 * const { HoleStatus, Organization, DrillType } = useLookups();
 * // All are LookupOption[] arrays ready for dropdowns
 *
 * const { getSubTargets, getMachinery } = useLookups();
 * // Filtered lookups for hierarchical dropdowns
 */

import {
	getFilteredLookupOptions,
	getLookupOptions,
} from "../services/lookupService";

import type { LookupOption } from "../types/lookupTypes";
import { useLiveQuery } from "dexie-react-hooks";

/**
 * Main lookup hook - provides access to all lookup tables
 * Returns reactive lookup data that updates automatically
 */
export function useLookups() {
	// Standard lookup tables

	const OrientationTools = [];

	const HoleStatus = useLiveQuery(
		() => getLookupOptions("Lookup_HoleStatus"),
		[],
	);

	const HoleType = useLiveQuery(
		() => getLookupOptions("Lookup_HoleType"),
		[],
	);

	const HolePurpose = useLiveQuery(
		() => getLookupOptions("Lookup_HolePurpose"),
		[],
	);

	const HolePurposeDetail = useLiveQuery(
		() => getLookupOptions("Lookup_HolePurposeDetail"),
		[],
	);

	const DrillType = useLiveQuery(
		() => getLookupOptions("Lookup_DrillType"),
		[],
	);

	const DrillSize = useLiveQuery(
		() => getLookupOptions("Lookup_DrillSize"),
		[],
	);

	const RigType = useLiveQuery(
		() => getLookupOptions("Lookup_RigType"),
		[],
	);

	const Lithology = useLiveQuery(
		() => getLookupOptions("Lookup_Lithology"),
		[],
	);

	const Weathering = useLiveQuery(
		() => getLookupOptions("Lookup_Weathering"),
		[],
	);

	const AltCode = useLiveQuery(
		() => getLookupOptions("Lookup_AltCode"),
		[],
	);

	const AltInt = useLiveQuery(
		() => getLookupOptions("Lookup_AltInt"),
		[],
	);

	const AltStyle = useLiveQuery(
		() => getLookupOptions("Lookup_AltStyle"),
		[],
	);

	const MinCode = useLiveQuery(
		() => getLookupOptions("Lookup_MinCode"),
		[],
	);

	const MinInt = useLiveQuery(
		() => getLookupOptions("Lookup_MinInt"),
		[],
	);

	const MinStyle = useLiveQuery(
		() => getLookupOptions("Lookup_MinStyle"),
		[],
	);

	const Grid = useLiveQuery(
		() => getLookupOptions("Lookup_Grid"),
		[],
	);

	const DownHoleSurveyMethod = useLiveQuery(
		() => getLookupOptions("Lookup_DownHoleSurveyMethod"),
		[],
	);

	const SampleType = useLiveQuery(
		() => getLookupOptions("Lookup_SampleType"),
		[],
	);

	const SampleMethod = useLiveQuery(
		() => getLookupOptions("Lookup_SampleMethod"),
		[],
	);

	const SampleCondition = useLiveQuery(
		() => getLookupOptions("Lookup_SampleCondition"),
		[],
	);

	const SampleClassification = useLiveQuery(
		() => getLookupOptions("Lookup_SampleClassification"),
		[],
	);

	const RowStatus = useLiveQuery(
		() => getLookupOptions("Lookup_RowStatus"),
		[],
	);

	const ApprovalStatus = useLiveQuery(
		() => getLookupOptions("Lookup_ApprovalStatus"),
		[],
	);

	// Special pattern: Company (filterable by CompanyType)
	const Company = useLiveQuery(
		() => getLookupOptions("Lookup_Company"),
		[],
	);

	// Special pattern: Person (concatenated name)
	const Person = useLiveQuery(
		() => getLookupOptions("Lookup_Person"),
		[],
	);

	// Special pattern: Units (uses UnitCode)
	const Units = useLiveQuery(
		() => getLookupOptions("Lookup_Units"),
		[],
	);

	// Special pattern: Instrument (filterable by InstrumentType)
	const Instrument = useLiveQuery(
		() => getLookupOptions("Lookup_Instrument"),
		[],
	);

	// Special pattern: Machinery (filterable by Company)
	const Machinery = useLiveQuery(
		() => getLookupOptions("Lookup_Machinery"),
		[],
	);

	// Classification tables
	const Organization = useLiveQuery(
		() => getLookupOptions("Classification_Organization"),
		[],
	);

	const Project = useLiveQuery(
		() => getLookupOptions("Classification_Project"),
		[],
	);

	const Target = useLiveQuery(
		() => getLookupOptions("Classification_Target"),
		[],
	);

	const SubTarget = useLiveQuery(
		() => getLookupOptions("Classification_SubTarget"),
		[],
	);

	const Phase = useLiveQuery(
		() => getLookupOptions("Classification_Phase"),
		[],
	);

	const Prospect = useLiveQuery(
		() => getLookupOptions("Classification_Prospect"),
		[],
	);

	const Tenement = useLiveQuery(
		() => getLookupOptions("Classification_Tenement"),
		[],
	);

	const Zone = useLiveQuery(
		() => getLookupOptions("Classification_Zone"),
		[],
	);

	const Pit = useLiveQuery(
		() => getLookupOptions("Classification_Pit"),
		[],
	);

	const Section = useLiveQuery(
		() => getLookupOptions("Classification_Section"),
		[],
	);

	// Filtered lookups for hierarchical dropdowns
	const getCompanies = (companyType?: string) => {
		const companies = useLiveQuery(
			() =>
				companyType
					? getFilteredLookupOptions("Lookup_Company", "CompanyType", companyType)
					: getLookupOptions("Lookup_Company"),
			[companyType],
		);
		return companies || [];
	};

	const getMachinery = (company?: string) => {
		const machinery = useLiveQuery(
			() =>
				company
					? getFilteredLookupOptions("Lookup_Machinery", "Company", company)
					: getLookupOptions("Lookup_Machinery"),
			[company],
		);
		return machinery || [];
	};

	const getSubTargets = (target?: string) => {
		const subTargets = useLiveQuery(
			() =>
				target
					? getFilteredLookupOptions("Classification_SubTarget", "Target", target)
					: getLookupOptions("Classification_SubTarget"),
			[target],
		);
		return subTargets || [];
	};

	const getProspects = (project?: string) => {
		const prospects = useLiveQuery(
			() =>
				project
					? getFilteredLookupOptions("Classification_Prospect", "Project", project)
					: getLookupOptions("Classification_Prospect"),
			[project],
		);
		return prospects || [];
	};

	const getHolePurposeDetails = (holePurpose?: string) => {
		const details = useLiveQuery(
			() =>
				holePurpose
					? getFilteredLookupOptions("Lookup_HolePurposeDetail", "HolePurpose", holePurpose)
					: getLookupOptions("Lookup_HolePurposeDetail"),
			[holePurpose],
		);
		return details || [];
	};

	return {
		// Standard lookups
		OrientationTools: [],
		HoleStatus: HoleStatus || [],
		HoleType: HoleType || [],
		HolePurpose: HolePurpose || [],
		HolePurposeDetail: HolePurposeDetail || [],
		DrillType: DrillType || [],
		DrillSize: DrillSize || [],
		RigType: RigType || [],
		Lithology: Lithology || [],
		Weathering: Weathering || [],
		AltCode: AltCode || [],
		AltInt: AltInt || [],
		AltStyle: AltStyle || [],
		MinCode: MinCode || [],
		MinInt: MinInt || [],
		MinStyle: MinStyle || [],
		Grid: Grid || [],
		DownHoleSurveyMethod: DownHoleSurveyMethod || [],
		SampleType: SampleType || [],
		SampleMethod: SampleMethod || [],
		SampleCondition: SampleCondition || [],
		SampleClassification: SampleClassification || [],
		RowStatus: RowStatus || [],
		ApprovalStatus: ApprovalStatus || [],

		// Special pattern lookups
		Company: Company || [],
		Person: Person || [],
		Units: Units || [],
		Instrument: Instrument || [],
		Machinery: Machinery || [],

		// Classification lookups
		Organization: Organization || [],
		Project: Project || [],
		Target: Target || [],
		SubTarget: SubTarget || [],
		Phase: Phase || [],
		Prospect: Prospect || [],
		Tenement: Tenement || [],
		Zone: Zone || [],
		Pit: Pit || [],
		Section: Section || [],

		// Filtered lookups
		getCompanies,
		getMachinery,
		getSubTargets,
		getProspects,
		getHolePurposeDetails,
	};
}

/**
 * Hook to access a single lookup table by name
 * Useful for dynamic table access
 *
 * @param tableName - Name of the lookup table
 * @returns Array of LookupOption objects
 */
export function useLookup(tableName: string): LookupOption[] {
	const options = useLiveQuery(
		() => getLookupOptions(tableName),
		[tableName],
	);
	return options || [];
}

/**
 * Hook to access filtered lookup options
 * Useful for hierarchical dropdowns
 *
 * @param tableName - Name of the lookup table
 * @param filterField - Field to filter by
 * @param filterValue - Value to match
 * @returns Array of filtered LookupOption objects
 */
export function useFilteredLookup(
	tableName: string,
	filterField: string,
	filterValue: any,
): LookupOption[] {
	const options = useLiveQuery(
		() =>
			filterValue != null
				? getFilteredLookupOptions(tableName, filterField, filterValue)
				: getLookupOptions(tableName),
		[tableName, filterField, filterValue],
	);
	return options || [];
}

console.log("[USE-LOOKUPS] ⚛️ useLookups hook loaded");
