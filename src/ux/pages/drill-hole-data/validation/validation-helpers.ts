/**
 * Validation Helper Functions
 * 
 * Shared validation utilities used across entity validators.
 * 
 * @module drill-hole-data/validation
 */

import type {
	DatabaseValidationError,
	SaveValidationError,
	ValidationResult,
} from "../types/data-contracts";

// ============================================================================
// Validation Error Builders
// ============================================================================

/**
 * Create a database validation error (Tier 1 - blocking)
 * 
 * @example
 * errors.push(createDatabaseError("Organization", "Organization is required", "REQUIRED_FIELD"));
 */
export function createDatabaseError(
	field: string,
	message: string,
	code: string,
): DatabaseValidationError {
	return {
		field,
		message,
		code,
		type: "Database",
		severity: "error",
		blocking: true,
	};
}

/**
 * Create a save validation warning (Tier 2 - non-blocking)
 * 
 * @example
 * warnings.push(createSaveWarning("Comments", "Adding comments improves data quality", "MISSING_COMMENTS"));
 */
export function createSaveWarning(
	field: string,
	message: string,
	code: string,
): SaveValidationError {
	return {
		field,
		message,
		code,
		type: "Save",
		severity: "warning",
		blocking: false,
	};
}

// ============================================================================
// Validation Result Builders
// ============================================================================

/**
 * Create a validation result from errors and warnings
 * 
 * @param databaseErrors - Tier 1 blocking errors
 * @param saveWarnings - Tier 2 non-blocking warnings
 * @returns Combined validation result
 */
export function createValidationResult(
	databaseErrors: DatabaseValidationError[],
	saveWarnings: SaveValidationError[],
): ValidationResult {
	return {
		database: {
			isValid: databaseErrors.length === 0,
			errors: databaseErrors,
		},
		save: {
			hasWarnings: saveWarnings.length > 0,
			warnings: saveWarnings,
		},
		canSave: databaseErrors.length === 0,
	};
}

/**
 * Create an empty (valid) validation result
 */
export function createEmptyValidationResult(): ValidationResult {
	return createValidationResult([], []);
}

// ============================================================================
// Common Validation Checks
// ============================================================================

/**
 * Validate required field
 * 
 * @param value - Field value
 * @param fieldName - Field name for error message
 * @param fieldLabel - Human-readable label
 * @returns Database error if invalid, null otherwise
 */
export function validateRequired(
	value: any,
	fieldName: string,
	fieldLabel: string,
): DatabaseValidationError | null {
	if (value === null || value === undefined || value === "") {
		return createDatabaseError(
			fieldName,
			`${fieldLabel} is required`,
			"REQUIRED_FIELD",
		);
	}
	return null;
}

/**
 * Validate UUID format
 * 
 * @param value - UUID string
 * @param fieldName - Field name
 * @param fieldLabel - Human-readable label
 * @returns Database error if invalid, null otherwise
 */
export function validateUuid(
	value: string | null | undefined,
	fieldName: string,
	fieldLabel: string,
): DatabaseValidationError | null {
	if (!value) return null; // Allow empty if not required
	
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	if (!uuidRegex.test(value)) {
		return createDatabaseError(
			fieldName,
			`${fieldLabel} must be a valid UUID`,
			"INVALID_UUID",
		);
	}
	return null;
}

/**
 * Validate lookup field (foreign key)
 * 
 * @param value - Lookup code
 * @param fieldName - Field name
 * @param fieldLabel - Human-readable label
 * @param lookupTable - Lookup table name
 * @returns Database error if invalid, null otherwise
 */
export function validateLookup(
	value: string | null | undefined,
	fieldName: string,
	fieldLabel: string,
	lookupTable: string,
): DatabaseValidationError | null {
	if (!value || value.trim() === "") {
		return createDatabaseError(
			fieldName,
			`${fieldLabel} must be selected from ${lookupTable}`,
			"INVALID_LOOKUP",
		);
	}
	return null;
}

/**
 * Validate number range
 * 
 * @param value - Number value
 * @param fieldName - Field name
 * @param fieldLabel - Human-readable label
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Database error if invalid, null otherwise
 */
export function validateNumberRange(
	value: number | null | undefined,
	fieldName: string,
	fieldLabel: string,
	min: number,
	max: number,
): DatabaseValidationError | null {
	if (value === null || value === undefined) return null;
	
	if (value < min || value > max) {
		return createDatabaseError(
			fieldName,
			`${fieldLabel} must be between ${min} and ${max}`,
			"OUT_OF_RANGE",
		);
	}
	return null;
}

/**
 * Validate string length
 * 
 * @param value - String value
 * @param fieldName - Field name
 * @param fieldLabel - Human-readable label
 * @param maxLength - Maximum length
 * @returns Database error if invalid, null otherwise
 */
export function validateStringLength(
	value: string | null | undefined,
	fieldName: string,
	fieldLabel: string,
	maxLength: number,
): DatabaseValidationError | null {
	if (!value) return null;
	
	if (value.length > maxLength) {
		return createDatabaseError(
			fieldName,
			`${fieldLabel} must be ${maxLength} characters or less`,
			"STRING_TOO_LONG",
		);
	}
	return null;
}

/**
 * Validate depth interval
 * 
 * @param depthFrom - Starting depth
 * @param depthTo - Ending depth
 * @returns Database error if invalid, null otherwise
 */
export function validateDepthInterval(
	depthFrom: number | null | undefined,
	depthTo: number | null | undefined,
): DatabaseValidationError | null {
	if (depthFrom === null || depthFrom === undefined) {
		return createDatabaseError("DepthFrom", "Depth From is required", "REQUIRED_FIELD");
	}
	
	if (depthTo === null || depthTo === undefined) {
		return createDatabaseError("DepthTo", "Depth To is required", "REQUIRED_FIELD");
	}
	
	if (depthTo <= depthFrom) {
		return createDatabaseError(
			"DepthTo",
			"Depth To must be greater than Depth From",
			"INVALID_DEPTH_INTERVAL",
		);
	}
	
	return null;
}

/**
 * Validate date range
 * 
 * @param startDate - Start date (ISO string)
 * @param endDate - End date (ISO string)
 * @param startFieldName - Start field name
 * @param endFieldName - End field name
 * @returns Save warning if invalid, null otherwise
 */
export function validateDateRange(
	startDate: string | null | undefined,
	endDate: string | null | undefined,
	startFieldName: string = "StartDate",
	endFieldName: string = "EndDate",
): SaveValidationError | null {
	if (!startDate || !endDate) return null;
	
	const start = new Date(startDate);
	const end = new Date(endDate);
	
	if (end < start) {
		return createSaveWarning(
			endFieldName,
			"End date should be after start date",
			"INVALID_DATE_RANGE",
		);
	}
	
	return null;
}

// ============================================================================
// Data Quality Checks (Save Warnings)
// ============================================================================

/**
 * Check for missing optional but recommended field
 * 
 * @param value - Field value
 * @param fieldName - Field name
 * @param fieldLabel - Human-readable label
 * @returns Save warning if missing, null otherwise
 */
export function checkMissingRecommended(
	value: any,
	fieldName: string,
	fieldLabel: string,
): SaveValidationError | null {
	if (value === null || value === undefined || value === "") {
		return createSaveWarning(
			fieldName,
			`${fieldLabel} is recommended for data quality`,
			"MISSING_RECOMMENDED",
		);
	}
	return null;
}

/**
 * Check for suspiciously short text
 * 
 * @param value - String value
 * @param fieldName - Field name
 * @param fieldLabel - Human-readable label
 * @param minLength - Minimum recommended length
 * @returns Save warning if too short, null otherwise
 */
export function checkShortText(
	value: string | null | undefined,
	fieldName: string,
	fieldLabel: string,
	minLength: number = 3,
): SaveValidationError | null {
	if (!value) return null;
	
	if (value.trim().length < minLength) {
		return createSaveWarning(
			fieldName,
			`${fieldLabel} seems too short (should be at least ${minLength} characters)`,
			"SHORT_TEXT",
		);
	}
	return null;
}

/**
 * Check for unusual numeric value
 * 
 * @param value - Number value
 * @param fieldName - Field name
 * @param fieldLabel - Human-readable label
 * @param expectedMin - Expected minimum value
 * @param expectedMax - Expected maximum value
 * @returns Save warning if unusual, null otherwise
 */
export function checkUnusualValue(
	value: number | null | undefined,
	fieldName: string,
	fieldLabel: string,
	expectedMin: number,
	expectedMax: number,
): SaveValidationError | null {
	if (value === null || value === undefined) return null;
	
	if (value < expectedMin || value > expectedMax) {
		return createSaveWarning(
			fieldName,
			`${fieldLabel} is outside typical range (${expectedMin}-${expectedMax})`,
			"UNUSUAL_VALUE",
		);
	}
	return null;
}

// ============================================================================
// Batch Validation Helpers
// ============================================================================

/**
 * Collect non-null errors from validation checks
 * 
 * @param checks - Array of validation check results
 * @returns Array of errors (nulls filtered out)
 * 
 * @example
 * const errors = collectErrors([
 *   validateRequired(data.Organization, "Organization", "Organization"),
 *   validateLookup(data.DrillingCompany, "DrillingCompany", "Drilling Company", "Company"),
 * ]);
 */
export function collectErrors<T extends DatabaseValidationError | SaveValidationError>(
	checks: Array<T | null>,
): T[] {
	return checks.filter((error): error is T => error !== null);
}

/**
 * Validate all required fields in an object
 * 
 * @param data - Data object
 * @param requiredFields - Array of [fieldKey, fieldLabel] pairs
 * @returns Array of database errors
 * 
 * @example
 * const errors = validateRequiredFields(data, [
 *   ["Organization", "Organization"],
 *   ["DrillingCompany", "Drilling Company"],
 * ]);
 */
export function validateRequiredFields<T extends Record<string, any>>(
	data: T,
	requiredFields: Array<[keyof T, string]>,
): DatabaseValidationError[] {
	return collectErrors(
		requiredFields.map(([field, label]) =>
			validateRequired(data[field], field as string, label),
		),
	);
}

// ============================================================================
// Logging Helpers
// ============================================================================

/**
 * Log validation result with details
 * 
 * @param context - Validation context (e.g., "RigSetup")
 * @param result - Validation result
 */
export function logValidationResult(context: string, result: ValidationResult): void {
	if (result.canSave) {
		if (result.save.hasWarnings) {
			console.warn(`[Validation] ⚠️ ${context} has warnings:`, {
				warnings: result.save.warnings,
			});
		} else {
			console.log(`[Validation] ✅ ${context} validation passed`);
		}
	} else {
		console.error(`[Validation] ❌ ${context} validation failed:`, {
			errors: result.database.errors,
			canSave: false,
		});
	}
}

/**
 * Format validation errors for display
 * 
 * @param errors - Array of validation errors
 * @returns Formatted error messages
 */
export function formatValidationErrors(
	errors: Array<DatabaseValidationError | SaveValidationError>,
): string[] {
	return errors.map(error => `${error.field}: ${error.message}`);
}
