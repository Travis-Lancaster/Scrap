/**
 * CollarCoordinate Validation Schemas
 * 
 * Zod schemas for CollarCoordinate entity validation.
 * 
 * @module drill-hole-data/validation
 */

import { z } from "zod";
import {
	uuid,
	nvarchar,
	stringOptional,
	decimalNumberOptional,
	intNumberOptional,
	booleanOptional,
	isoDateTimeOptional,
	createLookupSchema,
	metadataFields,
} from "./base-schemas";

/**
 * CollarCoordinate Zod Schema
 * 
 * Complete validation schema for CollarCoordinate entity.
 * Note: This should be displayed as a FORM (not grid), showing only most accurate coordinate.
 */
export const collarCoordinateSchema = z.object({
	CollarCoordinateId: uuid,
	Organization: nvarchar(30).min(1, "Organization is required"),
	CollarId: uuid,
	DataSource: nvarchar(50),
	
	// Coordinate fields
	East: decimalNumberOptional,
	North: decimalNumberOptional,
	RL: decimalNumberOptional, // Reduced Level (elevation)
	RLSource: stringOptional,
	
	// Survey details
	Grid: createLookupSchema("Grid", true),
	SurveyMethod: createLookupSchema("SurveyMethod", true),
	SurveyCompany: createLookupSchema("Company", true),
	SurveyBy: createLookupSchema("Person", false), // Optional
	Instrument: createLookupSchema("Instrument", false), // Optional
	SurveyOnDt: isoDateTimeOptional,
	
	// Priority and status
	Priority: z.number().int().min(1).max(100),
	PriorityStatus: nvarchar(50),
	ValidatedStatus: z.number().int().min(0).max(2), // 0=NotValidated, 1=Valid, 2=Invalid
	Validated: booleanOptional,
	IsDeleted: booleanOptional,
	
	// Geometry (stored as JSON/binary - not validated here)
	GeoPoint: z.any().optional(),
	GeoPointWGS: z.any().optional(),
	
	// Comments
	Comments: stringOptional,
}).merge(metadataFields);

/**
 * TypeScript type inferred from schema
 */
export type CollarCoordinateData = z.infer<typeof collarCoordinateSchema>;

/**
 * Factory function for empty CollarCoordinate data
 */
export function createEmptyCollarCoordinateData(): Partial<CollarCoordinateData> {
	return {
		CollarCoordinateId: crypto.randomUUID(),
		Organization: "",
		CollarId: "",
		DataSource: "WEB",
		Priority: 1,
		PriorityStatus: "PRIMARY",
		ValidatedStatus: 0,
		Validated: false,
		IsDeleted: false,
		RowStatus: 0,
		ActiveInd: true,
		ReportIncludeInd: true,
	};
}

/**
 * Validate CollarCoordinate data against schema
 */
export function validateCollarCoordinateSchema(data: unknown): CollarCoordinateData {
	return collarCoordinateSchema.parse(data);
}

/**
 * Safe validate CollarCoordinate data
 */
export function safeValidateCollarCoordinateSchema(data: unknown) {
	return collarCoordinateSchema.safeParse(data);
}
