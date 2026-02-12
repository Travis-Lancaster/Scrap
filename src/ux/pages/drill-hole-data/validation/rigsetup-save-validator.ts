/**
 * RigSetup Save Validator (Tier 2)
 * 
 * Soft validation that DOES NOT BLOCK saves.
 * Provides business rule warnings:
 * - Best practices
 * - Data quality checks
 * - Unusual value warnings
 * 
 * @module drill-hole-data/validation
 */

import type { SaveValidationError } from "../types/data-contracts";
import type { RigSetupData } from "./rigsetup-schemas";
import {
	createSaveWarning,
	checkMissingRecommended,
	collectErrors,
} from "./validation-helpers";

/**
 * Create RigSetup save validator
 * 
 * Returns a function that validates RigSetup data against business rules.
 * Warnings from this validator DO NOT BLOCK saves.
 * 
 * @returns Validator function
 * 
 * @example
 * const validator = createRigSetupSaveValidator();
 * const warnings = validator(rigSetupData);
 * if (warnings.length > 0) {
 *   console.warn("Data quality warnings:", warnings);
 *   // Can still save, but show warnings to user
 * }
 */
export function createRigSetupSaveValidator() {
	return (data: RigSetupData): SaveValidationError[] => {
		const warnings: SaveValidationError[] = [];

		// ================================================================
		// Missing Recommended Fields
		// ================================================================

		// Signatures and dates (recommended for audit trail)
		warnings.push(
			...collectErrors([
				checkMissingRecommended(
					data.PadInspectionSignatureDt,
					"PadInspectionSignatureDt",
					"Pad Inspection Signature Date"
				),
				checkMissingRecommended(
					data.FinalSetupSignatureDt,
					"FinalSetupSignatureDt",
					"Final Setup Signature Date"
				),
				checkMissingRecommended(
					data.FinalGeologistSignatureDt,
					"FinalGeologistSignatureDt",
					"Final Geologist Signature Date"
				),
			])
		);

		// Survey data (recommended for quality control)
		warnings.push(
			...collectErrors([
				checkMissingRecommended(
					data.SurveyDepth,
					"SurveyDepth",
					"Survey Depth"
				),
				checkMissingRecommended(
					data.SurveyDip,
					"SurveyDip",
					"Survey Dip"
				),
				checkMissingRecommended(
					data.SurveyMagAzi,
					"SurveyMagAzi",
					"Survey Magnetic Azimuth"
				),
			])
		);

		// Final measurements (important for accuracy)
		warnings.push(
			...collectErrors([
				checkMissingRecommended(
					data.FinalInclination,
					"FinalInclination",
					"Final Inclination"
				),
				checkMissingRecommended(
					data.FinalMagAzimuth,
					"FinalMagAzimuth",
					"Final Magnetic Azimuth"
				),
			])
		);

		// ================================================================
		// Data Quality Checks
		// ================================================================

		// Check for missing comments (recommended for complex setups)
		if (!data.Comments || data.Comments.trim() === "") {
			warnings.push(
				createSaveWarning(
					"Comments",
					"Adding comments about rig setup improves data quality and traceability",
					"MISSING_COMMENTS"
				)
			);
		}

		// Check if survey data is consistent
		if (
			data.SurveyDip !== null && data.SurveyDip !== undefined &&
			data.FinalInclination !== null && data.FinalInclination !== undefined
		) {
			const diff = Math.abs(data.SurveyDip - data.FinalInclination);
			if (diff > 5) {
				warnings.push(
					createSaveWarning(
						"FinalInclination",
						`Large difference (${diff.toFixed(1)}°) between Survey Dip and Final Inclination - verify measurements`,
						"INCONSISTENT_MEASUREMENTS"
					)
				);
			}
		}

		if (
			data.SurveyMagAzi !== null && data.SurveyMagAzi !== undefined &&
			data.FinalMagAzimuth !== null && data.FinalMagAzimuth !== undefined
		) {
			let diff = Math.abs(data.SurveyMagAzi - data.FinalMagAzimuth);
			// Handle wrap-around for azimuth (0-360)
			if (diff > 180) {
				diff = 360 - diff;
			}
			if (diff > 10) {
				warnings.push(
					createSaveWarning(
						"FinalMagAzimuth",
						`Large difference (${diff.toFixed(1)}°) between Survey Azimuth and Final Azimuth - verify measurements`,
						"INCONSISTENT_MEASUREMENTS"
					)
				);
			}
		}

		// ================================================================
		// Signature Consistency Checks
		// ================================================================

		// Check if signature exists without date (unusual)
		if (data.PadInspectionSignature && !data.PadInspectionSignatureDt) {
			warnings.push(
				createSaveWarning(
					"PadInspectionSignatureDt",
					"Signature date missing - should be recorded when signature is captured",
					"SIGNATURE_WITHOUT_DATE"
				)
			);
		}

		if (data.FinalSetupSignature && !data.FinalSetupSignatureDt) {
			warnings.push(
				createSaveWarning(
					"FinalSetupSignatureDt",
					"Signature date missing - should be recorded when signature is captured",
					"SIGNATURE_WITHOUT_DATE"
				)
			);
		}

		if (data.FinalGeologistSignature && !data.FinalGeologistSignatureDt) {
			warnings.push(
				createSaveWarning(
					"FinalGeologistSignatureDt",
					"Signature date missing - should be recorded when signature is captured",
					"SIGNATURE_WITHOUT_DATE"
				)
			);
		}

		// ================================================================
		// Unusual Value Checks
		// ================================================================

		// Check for very shallow survey depth (might be error)
		if (data.SurveyDepth !== null && data.SurveyDepth !== undefined) {
			if (data.SurveyDepth < 5) {
				warnings.push(
					createSaveWarning(
						"SurveyDepth",
						"Survey depth is very shallow (< 5m) - verify this is correct",
						"UNUSUAL_VALUE"
					)
				);
			}
		}

		// Check for near-vertical hole with azimuth (azimuth irrelevant if vertical)
		if (
			data.FinalInclination !== null && data.FinalInclination !== undefined &&
			data.FinalMagAzimuth !== null && data.FinalMagAzimuth !== undefined
		) {
			if (Math.abs(data.FinalInclination) < 5 && data.FinalMagAzimuth > 0) {
				warnings.push(
					createSaveWarning(
						"FinalMagAzimuth",
						"Azimuth is specified for near-vertical hole - azimuth may not be meaningful",
						"AZIMUTH_ON_VERTICAL"
					)
				);
			}
		}

		console.log(`[RigSetup Save Validator] ${warnings.length === 0 ? "✅ NO WARNINGS" : "⚠️ HAS WARNINGS"}:`, {
			warningCount: warnings.length,
			warnings: warnings.map(w => w.message),
		});

		return warnings;
	};
}
