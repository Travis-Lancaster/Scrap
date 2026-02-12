/**
 * GeologyCombinedLog Validation Schemas
 * 
 * Zod schemas for GeologyCombinedLog entity validation.
 * This is a complex entity with many optional coded fields.
 * 
 * @module drill-hole-data/validation
 */

import { z } from "zod";
import {
	uuid,
	nvarchar,
	stringOptional,
	decimalNumber,
	decimalNumberOptional,
	intNumberOptional,
	booleanField,
	isoDateTime,
	createLookupSchema,
	metadataFields,
	depthIntervalFields,
	loggingEventFields,
	validateDepthInterval,
} from "./base-schemas";

/**
 * GeologyCombinedLog Zod Schema
 * 
 * Complete validation schema for GeologyCombinedLog entity.
 * Grid display with optional drawer editor.
 */
export const geologyCombinedLogSchema = z.object({
	GeologyCombinedLogId: uuid,
	CollarId: uuid,
	Organization: nvarchar(30).min(1, "Organization is required"),
	
	// Core lithology fields (most important)
	Lithology: createLookupSchema("Lithology", true),
	Colour: createLookupSchema("ColourCode", false),
	Weathering: createLookupSchema("Weathering", false),
	GrainSize: createLookupSchema("LithGrainsize", false),
	Structure: createLookupSchema("StructType", false),
	Texture: createLookupSchema("LithTexture", false),
	
	// Alteration fields
	AltSilica: createLookupSchema("AltInt", false),
	AltSericite: createLookupSchema("AltInt", false),
	AltChlorite: createLookupSchema("AltInt", false),
	AltCarbonate: createLookupSchema("AltInt", false),
	AltHematite: createLookupSchema("AltInt", false),
	AltPyrite: createLookupSchema("AltInt", false),
	AltMagnetite: createLookupSchema("AltInt", false),
	AltEpidote: createLookupSchema("AltInt", false),
	AltBiotite: createLookupSchema("AltInt", false),
	AltAlbite: createLookupSchema("AltInt", false),
	AltLimonite: createLookupSchema("AltInt", false),
	
	// Mineralization fields
	Py: createLookupSchema("MinInt", false),
	Po: createLookupSchema("MinInt", false),
	Cp: createLookupSchema("MinInt", false),
	Mag: createLookupSchema("MagInt", false),
	APY: createLookupSchema("MinInt", false),
	
	// Vein fields
	VeinMode: createLookupSchema("VeinMode", false),
	VeinMin: createLookupSchema("VeinMin", false),
	VeinPct: decimalNumberOptional,
	VeinText: stringOptional,
	Vein1_Pct: decimalNumberOptional,
	Vein1_Thickness_cm: decimalNumberOptional,
	Vein2_Pct: decimalNumberOptional,
	Vein2_Thickness_cm: decimalNumberOptional,
	Vein3_Pct: decimalNumberOptional,
	Vein3_Thickness_cm: decimalNumberOptional,
	
	// Percentages
	MSVN_Pct: decimalNumberOptional,
	MSVN_Thickness_cm: decimalNumberOptional,
	Other_pct: decimalNumberOptional,
	
	// Codes and classifications
	COMPGRP: createLookupSchema("Compgrp", false),
	COMPGRPLookup: createLookupSchema("Compgrp", false),
	ContactRelation: createLookupSchema("ContactRelation", false),
	ContactTag: stringOptional,
	
	// Quality indicators
	BQP: intNumberOptional, // Biotite Quality Percentage
	GLVC: intNumberOptional, // Geology Validation Code
	GLVC3TSource: createLookupSchema("Glvc3TSource", false),
	QuickLogInd: booleanField,
	
	// Optional JSON data for extended fields
	JsonData: stringOptional,
	
	// Comments
	Comments: stringOptional,
})
	.merge(depthIntervalFields)
	.merge(loggingEventFields)
	.merge(metadataFields)
	.refine(validateDepthInterval, {
		message: "DepthTo must be greater than DepthFrom",
		path: ["DepthTo"],
	});

/**
 * TypeScript type inferred from schema
 */
export type GeologyCombinedLogData = z.infer<typeof geologyCombinedLogSchema>;

/**
 * Factory function for empty GeologyCombinedLog data
 */
export function createEmptyGeologyCombinedLogData(): Partial<GeologyCombinedLogData> {
	return {
		GeologyCombinedLogId: crypto.randomUUID(),
		Organization: "",
		CollarId: "",
		LoggingEventId: crypto.randomUUID(),
		DataSource: "WEB",
		LoggedDt: new Date().toISOString(),
		Priority: 1,
		QuickLogInd: false,
		DepthFrom: 0,
		DepthTo: 0,
		RowStatus: 0,
		ActiveInd: true,
		ReportIncludeInd: true,
	};
}

/**
 * Validate GeologyCombinedLog data against schema
 */
export function validateGeologyCombinedLogSchema(data: unknown): GeologyCombinedLogData {
	return geologyCombinedLogSchema.parse(data);
}

/**
 * Safe validate GeologyCombinedLog data
 */
export function safeValidateGeologyCombinedLogSchema(data: unknown) {
	return geologyCombinedLogSchema.safeParse(data);
}
