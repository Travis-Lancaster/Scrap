/**
 * Drill-Hole-Data Validation Layer
 *
 * Barrel export for all validation schemas and validators.
 *
 * TWO-TIER VALIDATION PATTERN:
 * - Tier 1: Database validators (BLOCKING - prevents saves)
 * - Tier 2: Save validators (NON-BLOCKING - warnings only)
 *
 * @module drill-hole-data/validation
 */

// ============================================================================
// Base Schemas & Helpers
// ============================================================================

export * from "./base-schemas";
export { validateDepthInterval } from "./base-schemas";
export * from "./validation-helpers";

// ============================================================================
// RigSetup Validation
// ============================================================================

export {
	rigSetupSchema,
	createEmptyRigSetupData,
	validateRigSetupSchema,
	safeValidateRigSetupSchema,
	type RigSetupData,
} from "./rigsetup-schemas";

export { createRigSetupDatabaseValidator } from "./rigsetup-database-validator";
export { createRigSetupSaveValidator } from "./rigsetup-save-validator";

// ============================================================================
// CollarCoordinate Validation
// ============================================================================

export {
	collarCoordinateSchema,
	createEmptyCollarCoordinateData,
	validateCollarCoordinateSchema,
	safeValidateCollarCoordinateSchema,
	type CollarCoordinateData,
} from "./collarcoordinate-schemas";

export { createCollarCoordinateDatabaseValidator } from "./collarcoordinate-database-validator";
export { createCollarCoordinateSaveValidator } from "./collarcoordinate-save-validator";

// ============================================================================
// GeologyCombinedLog Validation
// ============================================================================

export {
	geologyCombinedLogSchema,
	createEmptyGeologyCombinedLogData,
	validateGeologyCombinedLogSchema,
	safeValidateGeologyCombinedLogSchema,
	type GeologyCombinedLogData,
} from "./geologycombinedlog-schemas";

export { createGeologyCombinedLogDatabaseValidator } from "./geologycombinedlog-database-validator";
export { createGeologyCombinedLogSaveValidator } from "./geologycombinedlog-save-validator";

// ============================================================================
// TODO: Add more entity validators as needed
// ============================================================================

/**
 * Future validators to implement:
 * - ShearLog
 * - StructureLog
 * - CoreRecoveryRunLog
 * - FractureCountLog
 * - MagSusLog
 * - RockMechanicLog
 * - RockQualityDesignationLog
 * - SpecificGravityPtLog
 * - AllSamples
 * - Dispatch
 *
 * Pattern:
 * 1. Create *-schemas.ts (Zod schema + type + factory)
 * 2. Create *-database-validator.ts (Tier 1 - blocking)
 * 3. Create *-save-validator.ts (Tier 2 - warnings)
 * 4. Export all from this index
 */
