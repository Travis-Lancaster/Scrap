/**
 * RigSetup Database Validator (Tier 1)
 * 
 * Hard validation that BLOCKS saves.
 * Enforces database constraints:
 * - Required fields
 * - Foreign key integrity
 * - Data type constraints
 * 
 * @module drill-hole-data/validation
 */

import type { DatabaseValidationError } from "../types/data-contracts";
import type { RigSetupData } from "./rigsetup-schemas";
import {
	createDatabaseError,
	validateRequired,
	validateUuid,
	validateLookup,
	collectErrors,
} from "./validation-helpers";

/**
 * Create RigSetup database validator
 * 
 * Returns a function that validates RigSetup data against database constraints.
 * Errors from this validator BLOCK saves.
 * 
 * @returns Validator function
 * 
 * @example
 * const validator = createRigSetupDatabaseValidator();
 * const errors = validator(rigSetupData);
 * if (errors.length > 0) {
 *   console.error("Cannot save - database validation failed:", errors);
 * }
 */
export function createRigSetupDatabaseValidator() {
	return (data: RigSetupData): DatabaseValidationError[] => {
		const errors: DatabaseValidationError[] = [];

		// ================================================================
		// Required Fields
		// ================================================================

		errors.push(
			...collectErrors([
				validateRequired(data.Organization, "Organization", "Organization"),
				validateRequired(data.DrillPlanId, "DrillPlanId", "Drill Plan ID"),
				validateRequired(data.DataSource, "DataSource", "Data Source"),
			])
		);

		// ================================================================
		// UUID Fields
		// ================================================================

		errors.push(
			...collectErrors([
				validateUuid(data.RigSetupId, "RigSetupId", "Rig Setup ID"),
				validateUuid(data.DrillPlanId, "DrillPlanId", "Drill Plan ID"),
			])
		);

		// ================================================================
		// Lookup Fields (Foreign Keys) - Required
		// ================================================================

		// Pad Inspection Section
		errors.push(
			...collectErrors([
				validateLookup(
					data.PadInspectionCompletedBy,
					"PadInspectionCompletedBy",
					"Pad Inspection Completed By",
					"Person"
				),
			])
		);

		// Final Setup Section
		errors.push(
			...collectErrors([
				validateLookup(
					data.FinalSetupApprovedBy,
					"FinalSetupApprovedBy",
					"Final Setup Approved By",
					"Person"
				),
				validateLookup(
					data.FinalSetupDrillSupervisor,
					"FinalSetupDrillSupervisor",
					"Final Setup Drill Supervisor",
					"Person"
				),
				validateLookup(
					data.FinalGeologist,
					"FinalGeologist",
					"Final Geologist",
					"Person"
				),
			])
		);

		// Down Hole Survey Section
		errors.push(
			...collectErrors([
				validateLookup(
					data.DownHoleSurveyDriller,
					"DownHoleSurveyDriller",
					"Down Hole Survey Driller",
					"Person"
				),
				validateLookup(
					data.DownHoleSurveyDrillingContractor,
					"DownHoleSurveyDrillingContractor",
					"Down Hole Survey Drilling Contractor",
					"Company"
				),
				validateLookup(
					data.DownHoleSurveyRigNo,
					"DownHoleSurveyRigNo",
					"Down Hole Survey Rig Number",
					"Machinery"
				),
			])
		);

		// Drilling Section
		errors.push(
			...collectErrors([
				validateLookup(
					data.DrillingCompany,
					"DrillingCompany",
					"Drilling Company",
					"Company"
				),
				validateLookup(
					data.DrillSupervisor,
					"DrillSupervisor",
					"Drill Supervisor",
					"Person"
				),
			])
		);

		// ================================================================
		// Numeric Range Validation
		// ================================================================

		// Inclination and azimuth ranges
		if (data.FinalInclination !== null && data.FinalInclination !== undefined) {
			if (data.FinalInclination < -90 || data.FinalInclination > 90) {
				errors.push(
					createDatabaseError(
						"FinalInclination",
						"Final Inclination must be between -90 and 90 degrees",
						"OUT_OF_RANGE"
					)
				);
			}
		}

		if (data.FinalMagAzimuth !== null && data.FinalMagAzimuth !== undefined) {
			if (data.FinalMagAzimuth < 0 || data.FinalMagAzimuth > 360) {
				errors.push(
					createDatabaseError(
						"FinalMagAzimuth",
						"Final Magnetic Azimuth must be between 0 and 360 degrees",
						"OUT_OF_RANGE"
					)
				);
			}
		}

		if (data.SurveyDip !== null && data.SurveyDip !== undefined) {
			if (data.SurveyDip < -90 || data.SurveyDip > 90) {
				errors.push(
					createDatabaseError(
						"SurveyDip",
						"Survey Dip must be between -90 and 90 degrees",
						"OUT_OF_RANGE"
					)
				);
			}
		}

		if (data.SurveyMagAzi !== null && data.SurveyMagAzi !== undefined) {
			if (data.SurveyMagAzi < 0 || data.SurveyMagAzi > 360) {
				errors.push(
					createDatabaseError(
						"SurveyMagAzi",
						"Survey Magnetic Azimuth must be between 0 and 360 degrees",
						"OUT_OF_RANGE"
					)
				);
			}
		}

		// Depth must be positive
		if (data.SurveyDepth !== null && data.SurveyDepth !== undefined) {
			if (data.SurveyDepth < 0) {
				errors.push(
					createDatabaseError(
						"SurveyDepth",
						"Survey Depth must be positive",
						"NEGATIVE_DEPTH"
					)
				);
			}
		}

		console.log(`[RigSetup Database Validator] ${errors.length === 0 ? "✅ PASSED" : "❌ FAILED"}:`, {
			errorCount: errors.length,
			errors: errors.map(e => e.message),
		});

		return errors;
	};
}
