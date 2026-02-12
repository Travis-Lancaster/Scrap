/**
 * RigSetup Validation Schemas
 * 
 * Zod schemas for RigSetup entity validation.
 * 
 * @module drill-hole-data/validation
 */

import { z } from "zod";
import {
	uuid,
	nvarchar,
	stringOptional,
	decimalNumberOptional,
	isoDateTimeOptional,
	createLookupSchema,
	metadataFields,
} from "./base-schemas";

/**
 * RigSetup Zod Schema
 * 
 * Complete validation schema for RigSetup entity.
 * Includes all required fields, lookups, and optional fields.
 */
export const rigSetupSchema = z.object({
	RigSetupId: uuid,
	Organization: nvarchar(30).min(1, "Organization is required"),
	DrillPlanId: uuid,
	DataSource: nvarchar(50),
	
	// Pad Inspection Section
	PadInspectionCompletedBy: createLookupSchema("Person", true),
	PadInspectionSignature: stringOptional,
	PadInspectionSignatureDt: isoDateTimeOptional,
	
	// Final Setup Section
	FinalSetupApprovedBy: createLookupSchema("Person", true),
	FinalSetupSignature: stringOptional,
	FinalSetupSignatureDt: isoDateTimeOptional,
	FinalSetupDrillSupervisor: createLookupSchema("Person", true),
	FinalSetupDrillSupervisorSignature: stringOptional,
	FinalSetupDrillSupervisorSignatureDt: isoDateTimeOptional,
	FinalGeologist: createLookupSchema("Person", true),
	FinalGeologistSignature: stringOptional,
	FinalGeologistSignatureDt: isoDateTimeOptional,
	FinalInclination: decimalNumberOptional,
	FinalMagAzimuth: decimalNumberOptional,
	
	// Down Hole Survey Section
	DownHoleSurveyDriller: createLookupSchema("Person", true),
	DownHoleSurveyDrillerSignature: stringOptional,
	DownHoleSurveyDrillerSignatureDt: isoDateTimeOptional,
	DownHoleSurveyDrillingContractor: createLookupSchema("Company", true),
	DownHoleSurveyRigNo: createLookupSchema("Machinery", true),
	SurveyDepth: decimalNumberOptional,
	SurveyDip: decimalNumberOptional,
	SurveyMagAzi: decimalNumberOptional,
	SurveyReference: stringOptional,
	RigAlignmentToolDip: decimalNumberOptional,
	RigAlignmentToolMagAzi: decimalNumberOptional,
	
	// Drilling Section
	DrillingCompany: createLookupSchema("Company", true),
	DrillSupervisor: createLookupSchema("Person", true),
	DrillingSignature: stringOptional,
	DrillingSignatureDt: isoDateTimeOptional,
	
	// Comments
	Comments: stringOptional,
}).merge(metadataFields);

/**
 * TypeScript type inferred from schema
 */
export type RigSetupData = z.infer<typeof rigSetupSchema>;

/**
 * Factory function for empty RigSetup data
 * 
 * Used for initialization and reset operations.
 * 
 * @returns Empty RigSetup data with defaults
 */
export function createEmptyRigSetupData(): Partial<RigSetupData> {
	return {
		RigSetupId: crypto.randomUUID(),
		Organization: "",
		DrillPlanId: "",
		DataSource: "WEB",
		RowStatus: 0,
		ActiveInd: true,
		ReportIncludeInd: true,
	};
}

/**
 * Validate RigSetup data against schema
 * 
 * @param data - RigSetup data to validate
 * @returns Validated data or throws ZodError
 * 
 * @example
 * try {
 *   const validData = validateRigSetupSchema(data);
 *   console.log("Valid:", validData);
 * } catch (error) {
 *   console.error("Invalid:", error);
 * }
 */
export function validateRigSetupSchema(data: unknown): RigSetupData {
	return rigSetupSchema.parse(data);
}

/**
 * Safe validate RigSetup data (returns result)
 * 
 * @param data - RigSetup data to validate
 * @returns Safe parse result
 */
export function safeValidateRigSetupSchema(data: unknown) {
	return rigSetupSchema.safeParse(data);
}
