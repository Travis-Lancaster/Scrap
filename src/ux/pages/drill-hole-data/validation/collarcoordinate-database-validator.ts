/**
 * CollarCoordinate Database Validator (Tier 1)
 * 
 * Hard validation that BLOCKS saves.
 * 
 * @module drill-hole-data/validation
 */

import type { DatabaseValidationError } from "../types/data-contracts";
import type { CollarCoordinateData } from "./collarcoordinate-schemas";
import {
	createDatabaseError,
	validateRequired,
	validateUuid,
	validateLookup,
	validateNumberRange,
	collectErrors,
} from "./validation-helpers";

/**
 * Create CollarCoordinate database validator
 */
export function createCollarCoordinateDatabaseValidator() {
	return (data: CollarCoordinateData): DatabaseValidationError[] => {
		const errors: DatabaseValidationError[] = [];

		// Required fields
		errors.push(
			...collectErrors([
				validateRequired(data.Organization, "Organization", "Organization"),
				validateRequired(data.CollarId, "CollarId", "Collar ID"),
				validateRequired(data.DataSource, "DataSource", "Data Source"),
				validateRequired(data.Grid, "Grid", "Grid"),
				validateRequired(data.SurveyMethod, "SurveyMethod", "Survey Method"),
				validateRequired(data.SurveyCompany, "SurveyCompany", "Survey Company"),
			])
		);

		// UUID fields
		errors.push(
			...collectErrors([
				validateUuid(data.CollarCoordinateId, "CollarCoordinateId", "Collar Coordinate ID"),
				validateUuid(data.CollarId, "CollarId", "Collar ID"),
			])
		);

		// Lookup fields
		errors.push(
			...collectErrors([
				validateLookup(data.Grid, "Grid", "Grid", "Grid"),
				validateLookup(data.SurveyMethod, "SurveyMethod", "Survey Method", "SurveyMethod"),
				validateLookup(data.SurveyCompany, "SurveyCompany", "Survey Company", "Company"),
			])
		);

		// Priority range
		if (data.Priority !== null && data.Priority !== undefined) {
			const rangeError = validateNumberRange(data.Priority, "Priority", "Priority", 1, 100);
			if (rangeError) errors.push(rangeError);
		}

		// ValidatedStatus range
		if (data.ValidatedStatus !== null && data.ValidatedStatus !== undefined) {
			const rangeError = validateNumberRange(data.ValidatedStatus, "ValidatedStatus", "Validated Status", 0, 2);
			if (rangeError) errors.push(rangeError);
		}

		// At least one coordinate must be provided
		if (
			(data.East === null || data.East === undefined) &&
			(data.North === null || data.North === undefined) &&
			(data.RL === null || data.RL === undefined)
		) {
			errors.push(
				createDatabaseError(
					"East",
					"At least one coordinate (East, North, or RL) must be provided",
					"MISSING_COORDINATES"
				)
			);
		}

		console.log(`[CollarCoordinate Database Validator] ${errors.length === 0 ? "✅ PASSED" : "❌ FAILED"}:`, {
			errorCount: errors.length,
		});

		return errors;
	};
}
