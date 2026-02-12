/**
 * Base Validation Schemas
 * 
 * Shared Zod schemas for common field types used across all entities.
 * These provide consistent validation and type inference.
 * 
 * USAGE:
 * ```typescript
 * import { uuid, nvarchar, createLookupSchema } from "./base-schemas";
 * 
 * export const rigSetupSchema = z.object({
 *   RigSetupId: uuid,
 *   Organization: nvarchar(30).min(1, "Required"),
 *   DrillingCompany: createLookupSchema("Company", true),
 * });
 * ```
 * 
 * @module drill-hole-data/validation
 */

import { z } from "zod";

// ============================================================================
// UUID Validation
// ============================================================================

/**
 * UUID (GUID) field validation
 * 
 * SQL Server uniqueidentifier type
 * Format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 * 
 * @example
 * CollarId: uuid
 */
export const uuid = z
	.string()
	.uuid("Must be a valid UUID")
	.describe("Unique identifier (GUID)");

/**
 * Optional UUID field
 * 
 * @example
 * ParentCollarId: uuidOptional
 */
export const uuidOptional = z
	.string()
	.uuid("Must be a valid UUID")
	.optional()
	.nullable()
	.describe("Optional unique identifier");

// ============================================================================
// String Validation (SQL Server nvarchar)
// ============================================================================

/**
 * Create nvarchar field schema with max length
 * 
 * SQL Server nvarchar(n) type
 * 
 * @param maxLength - Maximum string length (SQL Server nvarchar size)
 * @returns Zod string schema with max length validation
 * 
 * @example
 * Organization: nvarchar(30).min(1, "Organization is required")
 * Comments: nvarchar(500).optional()
 */
export function nvarchar(maxLength: number) {
	return z
		.string()
		.max(maxLength, `Must be ${maxLength} characters or less`)
		.describe(`String field (max ${maxLength} chars)`);
}

/**
 * Optional string field (nvarchar)
 * 
 * @example
 * Comments: stringOptional
 */
export const stringOptional = z
	.string()
	.optional()
	.nullable()
	.describe("Optional string field");

/**
 * Create optional nvarchar field with max length
 * 
 * @param maxLength - Maximum string length
 * @returns Optional Zod string schema
 * 
 * @example
 * Comments: nvarcharOptional(500)
 */
export function nvarcharOptional(maxLength: number) {
	return z
		.string()
		.max(maxLength, `Must be ${maxLength} characters or less`)
		.optional()
		.nullable()
		.describe(`Optional string field (max ${maxLength} chars)`);
}

// ============================================================================
// Number Validation
// ============================================================================

/**
 * Integer field validation
 * 
 * SQL Server int type
 * 
 * @example
 * Priority: intNumber
 */
export const intNumber = z
	.number()
	.int("Must be an integer")
	.describe("Integer field");

/**
 * Optional integer field
 * 
 * @example
 * Priority: intNumberOptional
 */
export const intNumberOptional = z
	.number()
	.int("Must be an integer")
	.optional()
	.nullable()
	.describe("Optional integer field");

/**
 * Decimal/float field validation
 * 
 * SQL Server decimal/float type
 * 
 * @example
 * TotalDepth: decimalNumber
 */
export const decimalNumber = z
	.number()
	.describe("Decimal number field");

/**
 * Optional decimal field
 * 
 * @example
 * TotalDepth: decimalNumberOptional
 */
export const decimalNumberOptional = z
	.number()
	.optional()
	.nullable()
	.describe("Optional decimal field");

/**
 * Create number field with min/max validation
 * 
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Zod number schema with range validation
 * 
 * @example
 * RowStatus: numberRange(0, 255)
 */
export function numberRange(min: number, max: number) {
	return z
		.number()
		.min(min, `Must be at least ${min}`)
		.max(max, `Must be at most ${max}`)
		.describe(`Number between ${min} and ${max}`);
}

// ============================================================================
// Boolean Validation
// ============================================================================

/**
 * Boolean field validation
 * 
 * SQL Server bit type
 * 
 * @example
 * ActiveInd: booleanField
 */
export const booleanField = z
	.boolean()
	.describe("Boolean flag");

/**
 * Optional boolean field
 * 
 * @example
 * Validated: booleanOptional
 */
export const booleanOptional = z
	.boolean()
	.optional()
	.nullable()
	.describe("Optional boolean flag");

// ============================================================================
// Date/Time Validation
// ============================================================================

/**
 * ISO 8601 DateTime field validation
 * 
 * SQL Server datetime2 type
 * Format: YYYY-MM-DDTHH:mm:ss.sssZ
 * 
 * @example
 * StartedOnDt: isoDateTime
 */
export const isoDateTime = z
	.string()
	.datetime({ message: "Must be a valid ISO 8601 datetime" })
	.describe("ISO 8601 datetime field");

/**
 * Optional ISO 8601 DateTime field
 * 
 * @example
 * FinishedOnDt: isoDateTimeOptional
 */
export const isoDateTimeOptional = z
	.string()
	.datetime({ message: "Must be a valid ISO 8601 datetime" })
	.optional()
	.nullable()
	.describe("Optional ISO 8601 datetime field");

// ============================================================================
// Lookup Field Validation
// ============================================================================

/**
 * Create lookup field schema
 * 
 * Lookup fields reference code values from lookup tables.
 * These are typically foreign keys to lookup tables.
 * 
 * @param lookupTable - Name of the lookup table
 * @param required - Whether the field is required
 * @returns Zod string schema for lookup code
 * 
 * @example
 * DrillingCompany: createLookupSchema("Company", true)
 * CollarType: createLookupSchema("CollarType", false)
 */
export function createLookupSchema(lookupTable: string, required: boolean = false) {
	const schema = z
		.string()
		.min(1, `${lookupTable} is required`)
		.describe(`Lookup code from ${lookupTable} table`);
	
	return required ? schema : schema.optional().nullable();
}

// ============================================================================
// Enum Validation
// ============================================================================

/**
 * RowStatus enum validation
 * 
 * @example
 * RowStatus: rowStatusEnum
 */
export const rowStatusEnum = z
	.number()
	.int()
	.min(0)
	.max(255)
	.describe("Row status code (0=Draft, 1=Submitted, 2=Reviewed, 3=Approved, 4=Rejected)");

/**
 * ValidationStatus enum validation
 * 
 * @example
 * ValidationStatus: validationStatusEnum
 */
export const validationStatusEnum = z
	.number()
	.int()
	.min(0)
	.max(2)
	.describe("Validation status (0=NotValidated, 1=Valid, 2=Invalid)");

// ============================================================================
// Metadata Fields
// ============================================================================

/**
 * Common metadata fields present on all entities
 * 
 * Use with z.object().merge() to add to entity schemas
 * 
 * @example
 * export const rigSetupSchema = z.object({
 *   RigSetupId: uuid,
 *   // ... entity-specific fields
 * }).merge(metadataFields);
 */
export const metadataFields = z.object({
	// Status fields
	RowStatus: rowStatusEnum.optional(),
	ValidationStatus: validationStatusEnum.optional(),
	ValidationErrors: stringOptional,
	ActiveInd: booleanOptional,
	ReportIncludeInd: booleanOptional,
	SupersededById: uuidOptional,
	
	// Audit fields
	CreatedOnDt: isoDateTimeOptional,
	CreatedBy: stringOptional,
	ModifiedOnDt: isoDateTimeOptional,
	ModifiedBy: stringOptional,
	
	// Rowversion (optimistic concurrency)
	rv: stringOptional,
	
	// Comments
	Comments: stringOptional,
});

// ============================================================================
// Depth Interval Validation
// ============================================================================

/**
 * Depth interval fields (common in logging tables)
 * 
 * @example
 * export const geologySchema = z.object({
 *   GeologyCombinedLogId: uuid,
 *   // ... other fields
 * }).merge(depthIntervalFields);
 */
export const depthIntervalFields = z.object({
	DepthFrom: decimalNumber,
	DepthTo: decimalNumber,
	IntervalLength: decimalNumberOptional,
	Midpoint: decimalNumberOptional,
});

/**
 * Validate depth interval logic
 * 
 * Refinement: DepthTo must be greater than DepthFrom
 * 
 * @example
 * export const geologySchema = z.object({
 *   // ... fields
 * }).merge(depthIntervalFields)
 *   .refine(validateDepthInterval, {
 *     message: "DepthTo must be greater than DepthFrom",
 *     path: ["DepthTo"],
 *   });
 */
export function validateDepthInterval(data: { DepthFrom: number; DepthTo: number }) {
	return data.DepthTo > data.DepthFrom;
}

// ============================================================================
// Logging Event Fields
// ============================================================================

/**
 * Logging event reference fields (common in log tables)
 * 
 * @example
 * export const geologySchema = z.object({
 *   // ... fields
 * }).merge(loggingEventFields);
 */
export const loggingEventFields = z.object({
	LoggingEventId: uuid,
	LoggedDt: isoDateTime,
	LoggedBy: stringOptional,
	Priority: intNumberOptional,
	DataSource: nvarchar(50),
});

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create empty data factory helper
 * 
 * Generates a function that returns empty/default values for an entity
 * 
 * @example
 * export const createEmptyRigSetupData = (): Partial<RigSetupData> => ({
 *   RigSetupId: crypto.randomUUID(),
 *   Organization: "",
 *   RowStatus: 0,
 *   ActiveInd: true,
 * });
 */

/**
 * Transform Zod validation errors to user-friendly messages
 * 
 * @param error - Zod validation error
 * @returns Array of field-level error messages
 */
export function formatZodErrors(error: z.ZodError): Array<{ field: string; message: string }> {
	return error.issues.map(issue => ({
		field: issue.path.join("."),
		message: issue.message,
	}));
}

/**
 * Safe parse with detailed error logging
 * 
 * @param schema - Zod schema
 * @param data - Data to validate
 * @param context - Context for logging (e.g., "RigSetup")
 * @returns Parsed data or throws with details
 */
export function safeParse<T>(schema: z.ZodSchema<T>, data: unknown, context: string): T {
	const result = schema.safeParse(data);
	
	if (!result.success) {
		console.error(`[Validation] ❌ ${context} validation failed:`, {
			errors: formatZodErrors(result.error),
			data,
		});
		throw result.error;
	}
	
	console.log(`[Validation] ✅ ${context} validation passed`);
	return result.data;
}
