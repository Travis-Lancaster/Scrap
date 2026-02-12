/**
 * GeologyCombinedLog Database Validator (Tier 1)
 * 
 * Hard validation that BLOCKS saves.
 * 
 * @module drill-hole-data/validation
 */

import type { DatabaseValidationError } from "../types/data-contracts";
import type { GeologyCombinedLogData } from "./geologycombinedlog-schemas";
import {
	validateRequired,
	validateUuid,
	validateLookup,
	validateDepthInterval,
	collectErrors,
} from "./validation-helpers";

/**
 * Create GeologyCombinedLog database validator
 */
export function createGeologyCombinedLogDatabaseValidator() {
	return (data: GeologyCombinedLogData): DatabaseValidationError[] => {
		const errors: DatabaseValidationError[] = [];

		// Required fields
		errors.push(
			...collectErrors([
				validateRequired(data.Organization, "Organization", "Organization"),
				validateRequired(data.CollarId, "CollarId", "Collar ID"),
				validateRequired(data.Lithology, "Lithology", "Lithology"),
				validateRequired(data.LoggingEventId, "LoggingEventId", "Logging Event ID"),
				validateRequired(data.LoggedDt, "LoggedDt", "Logged Date"),
				validateRequired(data.DataSource, "DataSource", "Data Source"),
			])
		);

		// UUID fields
		errors.push(
			...collectErrors([
				validateUuid(data.GeologyCombinedLogId, "GeologyCombinedLogId", "Geology Log ID"),
				validateUuid(data.CollarId, "CollarId", "Collar ID"),
				validateUuid(data.LoggingEventId, "LoggingEventId", "Logging Event ID"),
			])
		);

		// Primary lookup field (required)
		errors.push(
			...collectErrors([
				validateLookup(data.Lithology, "Lithology", "Lithology", "Lithology"),
			])
		);

		// Depth interval validation (critical for logging)
		const depthError = validateDepthInterval(data.DepthFrom, data.DepthTo);
		if (depthError) {
			errors.push(depthError);
		}

		// Depth must be non-negative
		if (data.DepthFrom < 0) {
			errors.push({
				field: "DepthFrom",
				message: "Depth From cannot be negative",
				code: "NEGATIVE_DEPTH",
				type: "Database",
				severity: "error",
				blocking: true,
			});
		}

		// Percentages must be 0-100
		const percentFields: Array<[keyof GeologyCombinedLogData, string]> = [
			["VeinPct", "Vein Percentage"],
			["Vein1_Pct", "Vein 1 Percentage"],
			["Vein2_Pct", "Vein 2 Percentage"],
			["Vein3_Pct", "Vein 3 Percentage"],
			["MSVN_Pct", "MSVN Percentage"],
			["Other_pct", "Other Percentage"],
		];

		percentFields.forEach(([field, label]) => {
			const value = data[field] as number | null | undefined;
			if (value !== null && value !== undefined) {
				if (value < 0 || value > 100) {
					errors.push({
						field: field as string,
						message: `${label} must be between 0 and 100`,
						code: "INVALID_PERCENTAGE",
						type: "Database",
						severity: "error",
						blocking: true,
					});
				}
			}
		});

		console.log(`[GeologyCombinedLog Database Validator] ${errors.length === 0 ? "✅ PASSED" : "❌ FAILED"}:`, {
			errorCount: errors.length,
			depthInterval: `${data.DepthFrom} - ${data.DepthTo}`,
		});

		return errors;
	};
}
