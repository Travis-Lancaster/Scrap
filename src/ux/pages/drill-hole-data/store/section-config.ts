/**
 * Section Configuration
 *
 * Defines all sections with their validators and metadata.
 * Used by section-factory to create section store instances.
 *
 * @module drill-hole-data/store
 */

import {
	createCollarCoordinateDatabaseValidator,
	createCollarCoordinateSaveValidator,
	createEmptyCollarCoordinateData,
	createEmptyGeologyCombinedLogData,
	createEmptyRigSetupData,
	createGeologyCombinedLogDatabaseValidator,
	createGeologyCombinedLogSaveValidator,
	createRigSetupDatabaseValidator,
	createRigSetupSaveValidator,
} from "../validation";

import { type SectionConfig, SectionKey } from "../types/data-contracts";

/**
 * Section configurations for all drill-hole-data sections
 *
 * Each configuration defines:
 * - key: Section identifier
 * - type: "single" (form) or "array" (grid)
 * - validators: Database (Tier 1) and Save (Tier 2) validators
 * - initialData: Factory function for empty data
 * - dependencies: Optional array of dependent sections
 */
export const SECTION_CONFIGS: SectionConfig[] = [
	// ========================================================================
	// Setup Tab
	// ========================================================================

	{
		key: SectionKey.RigSetup,
		type: "single",
		validators: {
			database: createRigSetupDatabaseValidator(),
			save: createRigSetupSaveValidator(),
		},
		initialData: createEmptyRigSetupData,
	},

	{
		key: SectionKey.CollarCoordinate,
		type: "single",
		validators: {
			database: createCollarCoordinateDatabaseValidator(),
			save: createCollarCoordinateSaveValidator(),
		},
		initialData: createEmptyCollarCoordinateData,
	},

	// ========================================================================
	// Geology Tab
	// ========================================================================

	{
		key: SectionKey.GeologyCombinedLog,
		type: "array",
		validators: {
			database: createGeologyCombinedLogDatabaseValidator(),
			save: createGeologyCombinedLogSaveValidator(),
		},
		initialData: createEmptyGeologyCombinedLogData,
	},

	{
		key: SectionKey.ShearLog,
		type: "array",
		validators: {
			// TODO: Implement ShearLog validators
			database: () => [],
			save: () => [],
		},
		initialData: () => ({}),
	},

	{
		key: SectionKey.StructureLog,
		type: "array",
		validators: {
			// TODO: Implement StructureLog validators
			database: () => [],
			save: () => [],
		},
		initialData: () => ({}),
	},

	// ========================================================================
	// Geotech Tab
	// ========================================================================

	{
		key: SectionKey.CoreRecoveryRunLog,
		type: "array",
		validators: {
			// TODO: Implement validators
			database: () => [],
			save: () => [],
		},
		initialData: () => ({}),
	},

	{
		key: SectionKey.FractureCountLog,
		type: "array",
		validators: {
			// TODO: Implement validators
			database: () => [],
			save: () => [],
		},
		initialData: () => ({}),
	},

	{
		key: SectionKey.MagSusLog,
		type: "array",
		validators: {
			// TODO: Implement validators
			database: () => [],
			save: () => [],
		},
		initialData: () => ({}),
	},

	{
		key: SectionKey.RockMechanicLog,
		type: "array",
		validators: {
			// TODO: Implement validators
			database: () => [],
			save: () => [],
		},
		initialData: () => ({}),
	},

	{
		key: SectionKey.RockQualityDesignationLog,
		type: "array",
		validators: {
			// TODO: Implement validators
			database: () => [],
			save: () => [],
		},
		initialData: () => ({}),
	},

	{
		key: SectionKey.SpecificGravityPtLog,
		type: "array",
		validators: {
			// TODO: Implement validators
			database: () => [],
			save: () => [],
		},
		initialData: () => ({}),
	},

	// ========================================================================
	// Sampling Tab
	// ========================================================================

	{
		key: SectionKey.AllSamples,
		type: "array",
		validators: {
			// TODO: Implement AllSamples validators
			database: () => [],
			save: () => [],
		},
		initialData: () => ({}),
	},

	{
		key: SectionKey.Dispatch,
		type: "single",
		validators: {
			// TODO: Implement Dispatch validators
			database: () => [],
			save: () => [],
		},
		initialData: () => ({}),
	},

	// ========================================================================
	// QAQC Tab
	// ========================================================================

	{
		key: SectionKey.QAQC,
		type: "array",
		validators: {
			// TODO: Implement QAQC validators
			database: () => [],
			save: () => [],
		},
		initialData: () => ({}),
	},

	// ========================================================================
	// SignOff Tab
	// ========================================================================

	{
		key: SectionKey.VwCollar,
		type: "array",
		validators: {
			// VwCollar is read-only, no validation needed
			database: () => [],
			save: () => [],
		},
		initialData: () => ({}),
	},
];

/**
 * Get section configuration by key
 *
 * @param sectionKey - Section identifier
 * @returns Section configuration or undefined if not found
 */
export function getSectionConfig(sectionKey: SectionKey): SectionConfig | undefined {
	return SECTION_CONFIGS.find(config => config.key === sectionKey);
}

/**
 * Get all section configurations
 *
 * @returns Array of all section configurations
 */
export function getAllSectionConfigs(): SectionConfig[] {
	return SECTION_CONFIGS;
}

/**
 * Check if section is a single-object section (form)
 *
 * @param sectionKey - Section identifier
 * @returns True if single-object section
 */
export function isSingleSection(sectionKey: SectionKey): boolean {
	const config = getSectionConfig(sectionKey);
	return config?.type === "single";
}

/**
 * Check if section is an array section (grid)
 *
 * @param sectionKey - Section identifier
 * @returns True if array section
 */
export function isArraySection(sectionKey: SectionKey): boolean {
	const config = getSectionConfig(sectionKey);
	return config?.type === "array";
}
