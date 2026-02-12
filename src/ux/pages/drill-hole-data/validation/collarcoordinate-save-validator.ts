/**
 * CollarCoordinate Save Validator (Tier 2)
 * 
 * Soft validation that DOES NOT BLOCK saves.
 * 
 * @module drill-hole-data/validation
 */

import type { SaveValidationError } from "../types/data-contracts";
import type { CollarCoordinateData } from "./collarcoordinate-schemas";
import {
	createSaveWarning,
	checkMissingRecommended,
	collectErrors,
} from "./validation-helpers";

/**
 * Create CollarCoordinate save validator
 */
export function createCollarCoordinateSaveValidator() {
	return (data: CollarCoordinateData): SaveValidationError[] => {
		const warnings: SaveValidationError[] = [];

		// Recommended fields
		warnings.push(
			...collectErrors([
				checkMissingRecommended(data.East, "East", "Easting"),
				checkMissingRecommended(data.North, "North", "Northing"),
				checkMissingRecommended(data.RL, "RL", "Reduced Level (Elevation)"),
				checkMissingRecommended(data.SurveyBy, "SurveyBy", "Surveyed By"),
				checkMissingRecommended(data.Instrument, "Instrument", "Instrument"),
				checkMissingRecommended(data.SurveyOnDt, "SurveyOnDt", "Survey Date"),
			])
		);

		// Check if coordinates are complete (all three provided is best)
		const hasEast = data.East !== null && data.East !== undefined;
		const hasNorth = data.North !== null && data.North !== undefined;
		const hasRL = data.RL !== null && data.RL !== undefined;

		if (!hasEast || !hasNorth || !hasRL) {
			warnings.push(
				createSaveWarning(
					"East",
					"Complete 3D coordinates (East, North, RL) recommended for accurate positioning",
					"INCOMPLETE_COORDINATES"
				)
			);
		}

		// Check if validated status matches validated flag
		if (data.Validated && data.ValidatedStatus === 0) {
			warnings.push(
				createSaveWarning(
					"ValidatedStatus",
					"Validated flag is true but status is 'NotValidated' - inconsistent validation state",
					"INCONSISTENT_VALIDATION"
				)
			);
		}

		// Check if RL source is provided when RL is present
		if (hasRL && (!data.RLSource || data.RLSource.trim() === "")) {
			warnings.push(
				createSaveWarning(
					"RLSource",
					"RL Source recommended when elevation is provided",
					"MISSING_RL_SOURCE"
				)
			);
		}

		// Check for unusual coordinate values (assuming typical mining coordinates)
		if (data.East !== null && data.East !== undefined) {
			if (data.East < -180 || data.East > 180000000) {
				warnings.push(
					createSaveWarning(
						"East",
						"Easting value seems unusual - verify coordinate system",
						"UNUSUAL_COORDINATE"
					)
				);
			}
		}

		if (data.North !== null && data.North !== undefined) {
			if (data.North < -90 || data.North > 90000000) {
				warnings.push(
					createSaveWarning(
						"North",
						"Northing value seems unusual - verify coordinate system",
						"UNUSUAL_COORDINATE"
					)
				);
			}
		}

		console.log(`[CollarCoordinate Save Validator] ${warnings.length === 0 ? "✅ NO WARNINGS" : "⚠️ HAS WARNINGS"}:`, {
			warningCount: warnings.length,
		});

		return warnings;
	};
}
