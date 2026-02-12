/**
 * GeologyCombinedLog Save Validator (Tier 2)
 * 
 * Soft validation that DOES NOT BLOCK saves.
 * 
 * @module drill-hole-data/validation
 */

import type { SaveValidationError } from "../types/data-contracts";
import type { GeologyCombinedLogData } from "./geologycombinedlog-schemas";
import {
	createSaveWarning,
	checkMissingRecommended,
	collectErrors,
} from "./validation-helpers";

/**
 * Create GeologyCombinedLog save validator
 */
export function createGeologyCombinedLogSaveValidator() {
	return (data: GeologyCombinedLogData): SaveValidationError[] => {
		const warnings: SaveValidationError[] = [];

		// Recommended core geological fields
		warnings.push(
			...collectErrors([
				checkMissingRecommended(data.Colour, "Colour", "Colour"),
				checkMissingRecommended(data.Weathering, "Weathering", "Weathering"),
				checkMissingRecommended(data.Structure, "Structure", "Structure"),
			])
		);

		// Check for missing grain size (important for clastic rocks)
		if (data.Lithology && data.Lithology.toUpperCase().includes("SAND")) {
			if (!data.GrainSize) {
				warnings.push(
					createSaveWarning(
						"GrainSize",
						"Grain size is recommended for sandstone/sandy lithologies",
						"MISSING_GRAIN_SIZE"
					)
				);
			}
		}

		// Check interval length calculation
		if (data.DepthFrom !== null && data.DepthTo !== null) {
			const calculatedLength = data.DepthTo - data.DepthFrom;
			if (data.IntervalLength && Math.abs(data.IntervalLength - calculatedLength) > 0.01) {
				warnings.push(
					createSaveWarning(
						"IntervalLength",
						`Interval length (${data.IntervalLength}m) doesn't match calculated length (${calculatedLength.toFixed(2)}m)`,
						"INCONSISTENT_INTERVAL_LENGTH"
					)
				);
			}
		}

		// Check for very short intervals (might be logging error)
		if (data.DepthFrom !== null && data.DepthTo !== null) {
			const intervalLength = data.DepthTo - data.DepthFrom;
			if (intervalLength < 0.1) {
				warnings.push(
					createSaveWarning(
						"DepthTo",
						"Very short interval (< 0.1m) - verify this is correct",
						"SHORT_INTERVAL"
					)
				);
			}
			if (intervalLength > 50) {
				warnings.push(
					createSaveWarning(
						"DepthTo",
						"Very long interval (> 50m) - consider breaking into smaller intervals for detail",
						"LONG_INTERVAL"
					)
				);
			}
		}

		// Check if QuickLog flag matches data completeness
		if (data.QuickLogInd && (data.Colour || data.Weathering || data.GrainSize)) {
			warnings.push(
				createSaveWarning(
					"QuickLogInd",
					"Quick Log flag is set but detailed fields are populated - verify intent",
					"INCONSISTENT_QUICK_LOG"
				)
			);
		}

		// Check vein consistency
		if (data.VeinPct && data.VeinPct > 0) {
			if (!data.VeinMode && !data.VeinMin) {
				warnings.push(
					createSaveWarning(
						"VeinMode",
						"Vein percentage specified but vein mode/mineralization not described",
						"INCOMPLETE_VEIN_DATA"
					)
				);
			}
		}

		// Check mineralization consistency
		const hasMineralization = 
			(data.Py && data.Py !== "0") ||
			(data.Po && data.Po !== "0") ||
			(data.Cp && data.Cp !== "0") ||
			(data.APY && data.APY !== "0");

		if (hasMineralization && !data.Comments) {
			warnings.push(
				createSaveWarning(
					"Comments",
					"Mineralization noted - consider adding comments about distribution/significance",
					"MISSING_MIN_COMMENTS"
				)
			);
		}

		// Check for missing alteration description when alteration is present
		const hasAlteration = [
			data.AltSilica, data.AltSericite, data.AltChlorite, data.AltCarbonate,
			data.AltHematite, data.AltPyrite, data.AltMagnetite
		].some(alt => alt && alt !== "0");

		if (hasAlteration && !data.Comments) {
			warnings.push(
				createSaveWarning(
					"Comments",
					"Alteration noted - consider adding comments about intensity/style",
					"MISSING_ALT_COMMENTS"
				)
			);
		}

		console.log(`[GeologyCombinedLog Save Validator] ${warnings.length === 0 ? "✅ NO WARNINGS" : "⚠️ HAS WARNINGS"}:`, {
			warningCount: warnings.length,
			depthInterval: `${data.DepthFrom} - ${data.DepthTo}`,
		});

		return warnings;
	};
}
