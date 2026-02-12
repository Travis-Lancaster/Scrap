/**
 * Data Contracts for Drill-Hole-Data Module
 *
 * Re-exports and documents all required interfaces from API data-contracts.
 *
 * CRITICAL REQUIREMENTS:
 * - Use VwCollar, VwDrillPlan, AllSamples (NOT base Collar, DrillPlan)
 * - HoleId = DrillPlanId = CollarId (they are all the same)
 * - This module does NOT create collars/plans (receives drillPlanId parameter)
 *
 * @module drill-hole-data/types
 */

export type {
	VwCollar,
	VwDrillPlan,
	AllSamples,
	CycloneCleaning,
	DrillMethod,
	MetaDataLog,
	Survey,
	LabDispatch,
	DrillPlanStatusHistory,
} from "#src/data-layer/api/database/data-contracts";

import { AllSamples, CollarCoordinate, CoreRecoveryRunLog, CycloneCleaning, DrillMethod, DrillPlanStatusHistory, FractureCountLog, GeologyCombinedLog, LabDispatch, MagSusLog, MetaDataLog, RigSetup, RockMechanicLog, RockQualityDesignationLog, ShearLog, SpecificGravityPtLog, StructureLog, Survey, VwCollar, VwDrillPlan }
	from "#src/data-layer/api/database/data-contracts";

// ============================================================================
// Core View Interfaces (Primary Data Sources)
// ============================================================================


// ============================================================================
// Section Entity Interfaces
// ============================================================================

export type {
	// Setup Tab
	RigSetup,
	CollarCoordinate,

	// Geology Tab
	GeologyCombinedLog,
	ShearLog,
	StructureLog,

	// Geotech Tab
	CoreRecoveryRunLog,
	FractureCountLog,
	MagSusLog,
	RockMechanicLog,
	RockQualityDesignationLog,
	SpecificGravityPtLog,


	// Common
	LoggingEvent,


} from "#src/data-layer/api/database/data-contracts";

// ============================================================================
// Lookup Reference Types
// ============================================================================

export type {
	Person,
	Company,
	Machinery,
	Organization,
	Grid,
	Instrument,
	SurveyMethod,
	RowStatus,
} from "#src/data-layer/api/database/data-contracts";

// ============================================================================
// Section Key Enum
// ============================================================================

/**
 * Section keys for drill-hole-data module
 * Maps to store sections and API endpoints
 */
export enum SectionKey {
	// Setup Tab
	RigSetup = "rigSetup",
	CollarCoordinate = "collarCoordinate",

	// Geology Tab
	GeologyCombinedLog = "geologyCombinedLog",
	ShearLog = "shearLog",
	StructureLog = "structureLog",

	// Geotech Tab
	CoreRecoveryRunLog = "coreRecoveryRunLog",
	FractureCountLog = "fractureCountLog",
	MagSusLog = "magSusLog",
	RockMechanicLog = "rockMechanicLog",
	RockQualityDesignationLog = "rockQualityDesignationLog",
	SpecificGravityPtLog = "specificGravityPtLog",

	// Sampling Tab
	AllSamples = "allSamples",
	Dispatch = "dispatch",

	// QAQC Tab
	QAQC = "qaqc",

	// SignOff Tab
	VwCollar = "vwCollar",
}

// ============================================================================
// Field Mapping Documentation
// ============================================================================

/**
 * Key field mappings between API and UI
 *
 * IDENTITY FIELDS (all are equivalent):
 * - DrillPlanId (VwDrillPlan)
 * - CollarId (VwCollar, CollarCoordinate, AllSamples, GeologyCombinedLog, etc.)
 * - DrillHoleId (VwCollar, VwDrillPlan)
 * - HoleId (legacy, same as above)
 *
 * LOOKUP FIELDS BY SECTION:
 *
 * RigSetup:
 * - DownHoleSurveyDriller: Person.Code
 * - DownHoleSurveyDrillingContractor: Company.Code
 * - DownHoleSurveyRigNo: Machinery.Code
 * - DrillingCompany: Company.Code
 * - DrillSupervisor: Person.Code
 * - FinalGeologist: Person.Code
 * - FinalSetupApprovedBy: Person.Code
 * - FinalSetupDrillSupervisor: Person.Code
 * - PadInspectionCompletedBy: Person.Code
 * - Organization: Organization.Code
 *
 * CollarCoordinate:
 * - Grid: Grid.Code
 * - Instrument: Instrument.Code
 * - SurveyBy: Person.Code
 * - SurveyCompany: Company.Code
 * - SurveyMethod: SurveyMethod.Code
 * - Organization: Organization.Code
 *
 * GeologyCombinedLog:
 * - CollarId: (parent reference)
 * - Organization: Organization.Code
 * - LoggingEventId: LoggingEvent.LoggingEventId
 * - Multiple coded fields (Lithology, Colour, Structure, etc.)
 *
 * AllSamples:
 * - CollarId: (parent reference)
 * - Organization: Organization.Code
 * - SampleType: Lookup
 * - SampleMethod: Lookup
 * - SampledBy: Person.Code
 * - LoggedBy: Person.Code
 * - Grid: Grid.Code
 * - AssayDispatchGroup: Lookup
 */

// ============================================================================
// Row Status Mapping
// ============================================================================

/**
 * RowStatus enum values (mapped from number codes)
 *
 * Used for:
 * - Determining if section/row is editable (only Draft = 0 is editable)
 * - Workflow state transitions
 * - UI display (badges, colors)
 */
export enum RowStatusEnum {
	Draft = 0,
	Submitted = 1,
	Reviewed = 2,
	Approved = 3,
	Rejected = 4,
}

/**
 * Convert RowStatus number to enum
 */
export function mapRowStatus(status?: number): RowStatusEnum {
	switch (status) {
		case 0: return RowStatusEnum.Draft;
		case 1: return RowStatusEnum.Submitted;
		case 2: return RowStatusEnum.Reviewed;
		case 3: return RowStatusEnum.Approved;
		case 4: return RowStatusEnum.Rejected;
		default: return RowStatusEnum.Draft;
	}
}

/**
 * Get human-readable label for RowStatus
 */
export function getRowStatusLabel(status: RowStatusEnum): string {
	switch (status) {
		case RowStatusEnum.Draft: return "Draft";
		case RowStatusEnum.Submitted: return "Submitted";
		case RowStatusEnum.Reviewed: return "Reviewed";
		case RowStatusEnum.Approved: return "Approved";
		case RowStatusEnum.Rejected: return "Rejected";
	}
}

/**
 * Check if section/row is editable based on RowStatus
 */
export function isEditableRowStatus(status: RowStatusEnum): boolean {
	return status === RowStatusEnum.Draft;
}

// ============================================================================
// Validation Status Mapping
// ============================================================================

/**
 * ValidationStatus enum values
 */
export enum ValidationStatusEnum {
	NotValidated = 0,
	Valid = 1,
	Invalid = 2,
}

/**
 * Convert ValidationStatus number to enum
 */
export function mapValidationStatus(status?: number): ValidationStatusEnum {
	switch (status) {
		case 1: return ValidationStatusEnum.Valid;
		case 2: return ValidationStatusEnum.Invalid;
		case 0:
		default: return ValidationStatusEnum.NotValidated;
	}
}

// ============================================================================
// Section Type Classification
// ============================================================================

/**
 * Section types for store factory pattern
 */
export type SectionType = "single" | "array";

/**
 * Single-object sections (forms)
 */
export const SINGLE_SECTIONS: SectionKey[] = [
	SectionKey.RigSetup,
	SectionKey.CollarCoordinate,
	SectionKey.Dispatch,
];

/**
 * Array sections (grids)
 */
export const ARRAY_SECTIONS: SectionKey[] = [
	SectionKey.GeologyCombinedLog,
	SectionKey.ShearLog,
	SectionKey.StructureLog,
	SectionKey.CoreRecoveryRunLog,
	SectionKey.FractureCountLog,
	SectionKey.MagSusLog,
	SectionKey.RockMechanicLog,
	SectionKey.RockQualityDesignationLog,
	SectionKey.SpecificGravityPtLog,
	SectionKey.AllSamples,
	SectionKey.QAQC,
	SectionKey.VwCollar,
];

/**
 * Get section type
 */
export function getSectionType(sectionKey: SectionKey): SectionType {
	return SINGLE_SECTIONS.includes(sectionKey) ? "single" : "array";
}

// ============================================================================
// Action Result Types
// ============================================================================

/**
 * Result from store actions (save, submit, etc.)
 */
export interface ActionResult {
	success: boolean;
	message: string;
	errors?: string[];
	warnings?: string[];
	data?: any;
}

// ============================================================================
// Row Metadata (for array sections)
// ============================================================================

/**
 * Metadata tracked for each row in array sections
 * Used for dirty tracking, validation display, and readonly control
 */
export interface RowMetadata {
	isDirty: boolean;
	isNew: boolean;
	isDeleted: boolean;
	isStale: boolean;
	validationStatus: "Valid" | "Invalid" | "NotValidated";
	validationErrors?: string[];
	rowStatus: "Draft" | "Submitted" | "Reviewed" | "Approved" | "Rejected";
}

/**
 * Row version map for conflict detection
 * Format: { [rowId]: rowversion }
 */
export type RowVersionMap = Record<string, string>;

// ============================================================================
// Section Configuration Type
// ============================================================================

/**
 * Configuration for each section (used by section-factory)
 */
export interface SectionConfig<TData = any> {
	key: SectionKey;
	type: SectionType;
	validators: {
		database: (data: TData) => DatabaseValidationError[];
		save: (data: TData) => SaveValidationError[];
	};
	initialData: () => Partial<TData>;
	dependencies?: SectionKey[];
}

// ============================================================================
// Validation Error Types
// ============================================================================

/**
 * Database validation error (Tier 1 - BLOCKS saves)
 */
export interface DatabaseValidationError {
	field: string;
	message: string;
	code: string;
	type: "Database";
	severity: "error";
	blocking: true;
}

/**
 * Save validation error (Tier 2 - warnings only)
 */
export interface SaveValidationError {
	field: string;
	message: string;
	code: string;
	type: "Save";
	severity: "warning";
	blocking: false;
}

/**
 * Combined validation result
 */
export interface ValidationResult {
	database: {
		isValid: boolean;
		errors: DatabaseValidationError[];
	};
	save: {
		hasWarnings: boolean;
		warnings: SaveValidationError[];
	};
	canSave: boolean;
}

// ============================================================================
// Store Types
// ============================================================================

/**
 * Base section store for single-object sections (forms)
 */
export interface SectionStore<TData> {
	data: TData;
	originalData: TData;
	isDirty: boolean;
	validation: ValidationResult;
	isValid: () => boolean;
	hasUnsavedChanges: () => boolean;
	validate: () => ValidationResult;
	reset: () => void;
}

/**
 * Array section store for grid sections
 */
export interface ArraySectionStore<TData> {
	data: TData[];
	originalData: TData[];
	rowMetadata: Record<string, RowMetadata>;
	rowVersions: RowVersionMap;
	isDirty: boolean;
	getDirtyRows: () => string[];
	hasUnsavedChanges: () => boolean;
	validateRow: (rowId: string) => ValidationResult;
	validateAll: () => Record<string, ValidationResult>;
	reset: () => void;
}

// ============================================================================
// Tab and Lens Types
// ============================================================================

/**
 * Available tabs in drill-hole-data
 */
export type TabKey = "Setup" | "Geology" | "Geotech" | "Sampling" | "QAQC" | "SignOff" | "Summary";

/**
 * Lens configuration for tabs with multiple views
 */
export interface LensConfig {
	key: string;
	label: string;
	section: SectionKey;
	description?: string;
}

/**
 * Tab configuration
 */
export interface TabConfig {
	key: TabKey;
	label: string;
	lenses?: LensConfig[];
	defaultLens?: string;
}

// ============================================================================
// Drill Hole Data Aggregate
// ============================================================================

/**
 * Complete drill hole data aggregate
 * Loaded from API and stored in Dexie
 */
export interface DrillHoleDataAggregate {
	drillPlanId: string;

	// Core data
	vwCollar: VwCollar | null;
	vwDrillPlan: VwDrillPlan | null;

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

	// Metadata
	loadedAt: Date;
	modifiedAt: Date;
	staleSections: SectionKey[];
	sectionVersions: Record<string, string>;
	rowVersions: Record<SectionKey, RowVersionMap>;
}
