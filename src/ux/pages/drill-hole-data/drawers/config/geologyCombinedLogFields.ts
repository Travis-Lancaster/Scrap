/**
 * Field Configuration for GeologyCombinedLog Drawer
 *
 * Defines metadata for all geology fields including:
 * - Field name and label
 * - Control type (text, number, select, autocomplete)
 * - Which lenses show the field
 * - Which section it belongs to
 * - Lookup table mapping
 */

import { GeologyCombinedLog } from "../../types/data-contracts";

// import type { GeologyCombinedLog } from "#src/api/database/data-contracts.js";

export type FieldType = "text" | "number" | "select" | "autocomplete" | "area";

export interface FieldConfig {
	name: keyof GeologyCombinedLog;
	label: string;
	type: FieldType;
	lookupTable?: string; // Lookup table name for select/autocomplete fields
	min?: number;
	max?: number;
	lenses: string[]; // Which lenses show this field
	section: string; // Which section it belongs to
}

/**
 * Complete field configuration for GeologyCombinedLog
 * Maps all fields from the database schema to form controls
 */
export const GEOLOGY_FIELD_CONFIGS: FieldConfig[] = [
	// ============================================================================
	// DEPTH SECTION (Always visible)
	// ============================================================================
	{
		name: "DepthFrom",
		label: "From (m)",
		type: "number",
		lenses: ["Litho", "Alteration", "Veins", "Everything"],
		section: "depth",
	},
	{
		name: "DepthTo",
		label: "To (m)",
		type: "number",
		lenses: ["Litho", "Alteration", "Veins", "Everything"],
		section: "depth",
	},

	// ============================================================================
	// LITHOLOGY SECTION
	// ============================================================================
	{
		name: "Lithology",
		label: "Lithology",
		type: "autocomplete",
		lookupTable: "Lithology",
		lenses: ["Litho", "Everything"],
		section: "lithology",
	},
	{
		name: "Protolith",
		label: "Protolith",
		type: "autocomplete",
		lookupTable: "ProtolithCode",
		lenses: ["Litho", "Everything"],
		section: "lithology",
	},
	{
		name: "Weathering",
		label: "Weathering",
		type: "select",
		lookupTable: "Weathering",
		lenses: ["Litho", "Everything"],
		section: "lithology",
	},
	{
		name: "Colour",
		label: "Colour",
		type: "select",
		lookupTable: "ColourCode",
		lenses: ["Litho", "Everything"],
		section: "lithology",
	},
	{
		name: "Structure",
		label: "Structure",
		type: "select",
		lookupTable: "StructType",
		lenses: ["Litho", "Everything"],
		section: "lithology",
	},
	{
		name: "Texture",
		label: "Texture",
		type: "select",
		lookupTable: "LithTexture",
		lenses: ["Litho", "Everything"],
		section: "lithology",
	},

	// ============================================================================
	// BRECCIA SECTION
	// ============================================================================
	{
		name: "ContactRelation",
		label: "Contact Relation",
		type: "select",
		lookupTable: "ContactRelation",
		lenses: ["Litho", "Everything"],
		section: "breccia",
	},
	{
		name: "ClastDistribution",
		label: "Clast Distribution",
		type: "select",
		lookupTable: "ClastDistribution",
		lenses: ["Litho", "Everything"],
		section: "breccia",
	},
	{
		name: "ClastComp",
		label: "Clast Comp",
		type: "select",
		lookupTable: "ClastComp",
		lenses: ["Litho", "Everything"],
		section: "breccia",
	},
	{
		name: "MatrixComp",
		label: "Matrix Comp",
		type: "select",
		lookupTable: "MatrixComp",
		lenses: ["Litho", "Everything"],
		section: "breccia",
	},

	// ============================================================================
	// ALTERATION SECTION
	// ============================================================================
	{
		name: "Mag",
		label: "MAG",
		type: "select",
		lookupTable: "MagInt",
		lenses: ["Alteration", "Everything"],
		section: "alteration",
	},
	{
		name: "CD",
		label: "CD",
		type: "select",
		lookupTable: "AltInt",
		lenses: ["Alteration", "Everything"],
		section: "alteration",
	},
	{
		name: "CF",
		label: "CF",
		type: "select",
		lookupTable: "AltInt",
		lenses: ["Alteration", "Everything"],
		section: "alteration",
	},
	{
		name: "AC",
		label: "AC",
		type: "select",
		lookupTable: "AltInt",
		lenses: ["Alteration", "Everything"],
		section: "alteration",
	},
	{
		name: "CA",
		label: "CA",
		type: "select",
		lookupTable: "AltInt",
		lenses: ["Alteration", "Everything"],
		section: "alteration",
	},
	{
		name: "SI",
		label: "SI",
		type: "select",
		lookupTable: "AltInt",
		lenses: ["Alteration", "Everything"],
		section: "alteration",
	},
	{
		name: "TUR",
		label: "TUR",
		type: "select",
		lookupTable: "AltInt",
		lenses: ["Alteration", "Everything"],
		section: "alteration",
	},
	{
		name: "GR",
		label: "GR",
		type: "select",
		lookupTable: "AltInt",
		lenses: ["Alteration", "Everything"],
		section: "alteration",
	},

	// ============================================================================
	// MINERALIZATION SECTION
	// ============================================================================
	{
		name: "Py",
		label: "Py",
		type: "text",
		lenses: ["Veins", "Everything"],
		section: "mineralization",
	},
	{
		name: "PyMode1",
		label: "Py Mode1",
		type: "select",
		lookupTable: "MinStyle",
		lenses: ["Veins", "Everything"],
		section: "mineralization",
	},
	{
		name: "PyMode",
		label: "Mode",
		type: "select",
		lookupTable: "MinStyle",
		lenses: ["Veins", "Everything"],
		section: "mineralization",
	},
	{
		name: "Cp",
		label: "Cp",
		type: "text",
		lenses: ["Veins", "Everything"],
		section: "mineralization",
	},
	{
		name: "Po",
		label: "Po",
		type: "text",
		lenses: ["Veins", "Everything"],
		section: "mineralization",
	},
	{
		name: "APY",
		label: "APY",
		type: "text",
		lenses: ["Veins", "Everything"],
		section: "mineralization",
	},

	// ============================================================================
	// VEINS SECTION
	// ============================================================================
	{
		name: "VG",
		label: "VG",
		type: "text",
		lenses: ["Veins", "Everything"],
		section: "veins",
	},
	{
		name: "QC",
		label: "QC",
		type: "number",
		lenses: ["Veins", "Everything"],
		section: "veins",
	},
	{
		name: "PQC",
		label: "PQC",
		type: "number",
		lenses: ["Veins", "Everything"],
		section: "veins",
	},
	{
		name: "QPC",
		label: "QPC",
		type: "number",
		lenses: ["Veins", "Everything"],
		section: "veins",
	},
	{
		name: "BQP",
		label: "BQP",
		type: "number",
		lenses: ["Veins", "Everything"],
		section: "veins",
	},
	{
		name: "QT",
		label: "QT",
		type: "number",
		lenses: ["Veins", "Everything"],
		section: "veins",
	},
	{
		name: "Other",
		label: "Other",
		type: "text",
		lenses: ["Veins", "Everything"],
		section: "veins",
	},
	{
		name: "Other_pct",
		label: "Oth PCT",
		type: "number",
		lenses: ["Veins", "Everything"],
		section: "veins",
	},

	// ============================================================================
	// TAG SECTION
	// ============================================================================
	{
		name: "ContactTag",
		label: "Contact TAG",
		type: "text",
		lenses: ["Everything"],
		section: "tag",
	},
	{
		name: "LithoSuperGr",
		label: "LITHOSUPERGR",
		type: "text",
		lenses: ["Everything"],
		section: "tag",
	},
	{
		name: "COMPGRP",
		label: "COMPGRP",
		type: "select",
		lookupTable: "Compgrp",
		lenses: ["Everything"],
		section: "tag",
	},
	{
		name: "Comments",
		label: "Comments",
		type: "area",
		lenses: ["Litho", "Alteration", "Veins", "Everything"],
		section: "tag",
	},
];

/**
 * Section metadata for organizing fields in the drawer
 */
export interface SectionMetadata {
	key: string;
	title: string;
	icon: string;
	description?: string;
}

export const SECTION_METADATA: SectionMetadata[] = [
	{
		key: "depth",
		title: "Depth",
		icon: "📏",
		description: "Interval depth range",
	},
	{
		key: "lithology",
		title: "Lithology",
		icon: "🪨",
		description: "Rock type and characteristics",
	},
	{
		key: "breccia",
		title: "Breccia",
		icon: "💥",
		description: "Breccia characteristics",
	},
	{
		key: "alteration",
		title: "Alteration",
		icon: "⚗️",
		description: "Alteration intensity (0-5)",
	},
	{
		key: "mineralization",
		title: "Mineralization",
		icon: "⚒️",
		description: "Mineral occurrences",
	},
	{
		key: "veins",
		title: "Veins",
		icon: "💎",
		description: "Vein types and percentages",
	},
	{
		key: "tag",
		title: "Tags & Comments",
		icon: "🏷️",
		description: "Additional metadata",
	},
];
