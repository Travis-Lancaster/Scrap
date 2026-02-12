/**
 * GeologyCombinedLog Drawer Component (REFACTORED)
 *
 * Editable drawer for geology combined log data with:
 * - React Hook Form integration for state management
 * - LookupResolver for dynamic dropdown options
 * - Direct Ant Design form controls
 * - Lens-aware field rendering (Litho, Alteration, Veins, Everything)
 * - Store integration for data persistence
 *
 * ARCHITECTURE:
 * - Follows RigSetupForm pattern for consistency
 * - Field configurations defined in separate config file
 * - Dynamic section rendering based on active lens
 * - Dirty field tracking with visual indicators
 */

import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
// import type { GeologyCombinedLog } from "#src/api/database/data-contracts.js";
import { Form, Input, InputNumber, Select, AutoComplete } from "antd";
// import { InspectorDrawer, InspectorSection } from "../../../ux/shared/components/Drawer/InspectorDrawer";
// import { LookupResolver } from "../../../services/lookupResolver";
import { useDrillHoleDataStore } from "../store";
import {
	GEOLOGY_FIELD_CONFIGS,
	SECTION_METADATA,
	type FieldConfig,
} from "./config/geologyCombinedLogFields";
import { SectionKey } from "../types/data-contracts";
import { InspectorDrawer } from "#src/ux/shared/components/Drawer/InspectorDrawer";
import { useLookup } from "#src/data-layer/hooks/useLookups.js";
import { InspectorSection } from "#src/ux/shared/components/Drawer/InspectorDrawer.js";
// import { SectionKey } from "../types/data-contracts";

// Simplified interface for form to avoid deeply nested type inference issues
interface GeologyCombinedLogFormData {
	GeologyCombinedLogId?: string;
	CollarId?: string;
	DepthFrom?: number;
	DepthTo?: number;
	Lithology?: string;
	ProtolithCode?: string;
	Weathering?: string;
	ColourCode?: string;
	StructType?: string;
	LithTexture?: string;
	ContactRelation?: string;
	ClastDistribution?: string;
	ClastComp?: string;
	MatrixComp?: string;
	AltInt?: string;
	MagInt?: string;
	MinStyle?: string;
	Compgrp?: string;
	VeinType?: string;
	VeinContent?: string;
	VeinThickness?: number;
	StructureDip?: number;
	StructureDipDir?: number;
	Texture?: string;
	Mineralisation?: string;
	Remarks?: string;
	RowStatus?: number;
	ActiveInd?: boolean;
}

interface GeologyCombinedLogDrawerProps {
	open: boolean;
	onClose: () => void;
	rowData: any;
}

export const GeologyCombinedLogDrawer: React.FC<GeologyCombinedLogDrawerProps> = ({
	open,
	onClose,
	rowData,
}) => {
	// ============================================================================
	// Store Integration
	// ============================================================================

	const { updateRow, closeDrawer, activeLens } = useDrillHoleDataStore();
	const currentLens = activeLens["Geology"] || "Litho";

	console.log("[GeologyCombinedLogDrawer] 🎨 Rendering drawer", {
		open,
		lens: currentLens,
		rowData,
	});

	// ============================================================================
	// Form Setup - React Hook Form
	// ============================================================================

	const {
		control,
		formState: { errors, dirtyFields },
		handleSubmit,
		reset,
	} = useForm<GeologyCombinedLogFormData>({
		defaultValues: rowData || {},
		mode: "onChange",
	});

	// Reset form when rowData changes
	useEffect(() => {
		if (rowData) {
			console.log("[GeologyCombinedLogDrawer] 🔄 Resetting form with new data");
			reset(rowData);
		}
	}, [rowData, reset]);

	// ============================================================================
	// Dirty Fields Tracking
	// ============================================================================

	const dirtyFieldsSet = useMemo(() => {
		const set = new Set<string>();
		const addDirtyFields = (obj: any, prefix = "") => {
			Object.keys(obj || {}).forEach((key) => {
				const fullKey = prefix ? `${prefix}.${key}` : key;
				if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
					addDirtyFields(obj[key], fullKey);
				} else {
					set.add(fullKey);
				}
			});
		};
		addDirtyFields(dirtyFields);
		return set;
	}, [dirtyFields]);

	// ============================================================================
	// Lookup Data Integration
	// ============================================================================

	interface LookupOptions {
		lithology: Array<{ value: string; label: string }>;
		protolithCode: Array<{ value: string; label: string }>;
		weathering: Array<{ value: string; label: string }>;
		colourCode: Array<{ value: string; label: string }>;
		structType: Array<{ value: string; label: string }>;
		lithTexture: Array<{ value: string; label: string }>;
		contactRelation: Array<{ value: string; label: string }>;
		clastDistribution: Array<{ value: string; label: string }>;
		clastComp: Array<{ value: string; label: string }>;
		matrixComp: Array<{ value: string; label: string }>;
		altInt: Array<{ value: string; label: string }>;
		magInt: Array<{ value: string; label: string }>;
		minStyle: Array<{ value: string; label: string }>;
		compgrp: Array<{ value: string; label: string }>;
	}

	const [lookupOptions, setLookupOptions] = useState<LookupOptions>({
		lithology: [],
		protolithCode: [],
		weathering: [],
		colourCode: [],
		structType: [],
		lithTexture: [],
		contactRelation: [],
		clastDistribution: [],
		clastComp: [],
		matrixComp: [],
		altInt: [],
		magInt: [],
		minStyle: [],
		compgrp: [],
	});

	// Load lookups asynchronously after LookupResolver is initialized
	useEffect(() => {
		const loadLookups = async () => {
			// Ensure LookupResolver is initialized before accessing lookups


			// Get all lookup options needed for geology fields
			const options = {
				lithology: useLookup("Lithology"),
				protolithCode: useLookup("ProtolithCode"),
				weathering: useLookup("Weathering"),
				colourCode: useLookup("ColourCode"),
				structType: useLookup("StructType"),
				lithTexture: useLookup("LithTexture"),
				contactRelation: useLookup("ContactRelation"),
				clastDistribution: useLookup("ClastDistribution"),
				clastComp: useLookup("ClastComp"),
				matrixComp: useLookup("MatrixComp"),
				altInt: useLookup("AltInt"),
				magInt: useLookup("MagInt"),
				minStyle: useLookup("MinStyle"),
				compgrp: useLookup("Compgrp"),
			};

			setLookupOptions(options);

			console.log("[GeologyCombinedLogDrawer] 📚 Lookup options loaded:", {
				lithology: options.lithology.length,
				altInt: options.altInt.length,
				minStyle: options.minStyle.length,
			});
		};

		loadLookups();
	}, []);

	// ============================================================================
	// Field Configuration with Lookup Options
	// ============================================================================

	const getLookupOptions = (lookupTable: string): Array<{ value: string; label: string }> => {
		switch (lookupTable) {
			case "Lithology": return lookupOptions.lithology;
			case "ProtolithCode": return lookupOptions.protolithCode;
			case "Weathering": return lookupOptions.weathering;
			case "ColourCode": return lookupOptions.colourCode;
			case "StructType": return lookupOptions.structType;
			case "LithTexture": return lookupOptions.lithTexture;
			case "ContactRelation": return lookupOptions.contactRelation;
			case "ClastDistribution": return lookupOptions.clastDistribution;
			case "ClastComp": return lookupOptions.clastComp;
			case "MatrixComp": return lookupOptions.matrixComp;
			case "AltInt": return lookupOptions.altInt;
			case "MagInt": return lookupOptions.magInt;
			case "MinStyle": return lookupOptions.minStyle;
			case "Compgrp": return lookupOptions.compgrp;
			default: return [];
		}
	};

	const enrichedFieldConfigs = useMemo(() => {
		return GEOLOGY_FIELD_CONFIGS.map((config) => {
			const options = config.lookupTable ? getLookupOptions(config.lookupTable) : undefined;
			return { ...config, options };
		});
	}, [lookupOptions]);

	// ============================================================================
	// Lens-Aware Field Filtering
	// ============================================================================

	const visibleFields = useMemo(() => {
		return enrichedFieldConfigs.filter((field) => field.lenses.includes(currentLens));
	}, [enrichedFieldConfigs, currentLens]);

	// ============================================================================
	// Group Fields by Section
	// ============================================================================

	const fieldsBySection = useMemo(() => {
		const grouped: Record<string, FieldConfig[]> = {};

		// Initialize all sections to avoid undefined lookups
		SECTION_METADATA.forEach(section => {
			grouped[section.key] = [];
		});

		visibleFields.forEach((field) => {
			if (grouped[field.section]) {
				grouped[field.section].push(field);
			}
		});

		return grouped;
	}, [visibleFields]);

	// ============================================================================
	// Render Field Component
	// ============================================================================

	const renderFieldComponent = (field: FieldConfig & { options?: any[] }) => {
		const filterSelectOption = (input: string, option?: { label?: string; value?: string | number }) => {
			const labelText = String(option?.label ?? "").toLowerCase();
			return labelText.includes(input.toLowerCase());
		};

		switch (field.type) {
			case "number":
				return (
					<InputNumber
						min={field.min}
						max={field.max}
						style={{ width: "100%" }}
					/>
				);
			case "select":
				return (
					<Select
						options={field.options}
						filterOption={filterSelectOption}
						showSearch
					/>
				);
			case "autocomplete":
				return (
					<AutoComplete
						options={field.options}
						filterOption={filterSelectOption}
						showSearch
					/>
				);
			case "text":
			default:
				return <Input />;
		}
	};

	// ============================================================================
	// Section Rendering
	// ============================================================================

	const renderSection = (sectionKey: string): InspectorSection | null => {
		const fields = fieldsBySection[sectionKey];
		const metadata = SECTION_METADATA.find((s) => s.key === sectionKey);

		if (!fields || fields.length === 0 || !metadata) {
			return null;
		}

		return {
			key: sectionKey,
			title: metadata.title,
			icon: <span className="text-lg">{metadata.icon}</span>,
			content: (
				<div className="space-y-3">
					{fields.map((field) => (
						<Controller
							key={field.name}
							name={field.name as any}
							control={control}
							render={({ field: fieldProps }) => (
								<Form.Item
									label={field.label}
									validateStatus={(errors as any)[field.name] ? "error" : ""}
									help={(errors as any)[field.name]?.message}
									style={{
										marginBottom: 16,
										border: dirtyFieldsSet.has(String(field.name)) ? "2px solid #f1ba05" : undefined,
										padding: dirtyFieldsSet.has(String(field.name)) ? "8px" : undefined,
										borderRadius: dirtyFieldsSet.has(String(field.name)) ? "4px" : undefined,
									}}
								>
									{React.cloneElement(renderFieldComponent(field), {
										...fieldProps,
									})}
								</Form.Item>
							)}
						/>
					))}
				</div>
			),
		};
	};

	// Build sections array dynamically
	const sections: InspectorSection[] = useMemo(() => {
		const allSections = SECTION_METADATA.map((metadata) =>
			renderSection(metadata.key)
		).filter((section): section is InspectorSection => section !== null);

		console.log("[GeologyCombinedLogDrawer] 📋 Sections rendered:", {
			totalSections: allSections.length,
			sectionKeys: allSections.map((s) => s.key),
		});

		return allSections;
	}, [fieldsBySection, control, errors, dirtyFieldsSet]);

	// ============================================================================
	// Save & Cancel Handlers
	// ============================================================================

	const onSave = handleSubmit((data) => {
		console.log("[GeologyCombinedLogDrawer] 💾 Saving data:", {
			originalData: rowData,
			updatedData: data,
			dirtyFields: Array.from(dirtyFieldsSet),
		});

		// Update the row in the store
		// Get the row ID from the rowData
		const rowId = rowData?.GeologyCombinedLogId || rowData?.id;
		if (rowId) {
			updateRow(SectionKey.GeologyCombinedLog, rowId, data);
		} else {
			console.warn("[GeologyCombinedLogDrawer] ⚠️ Row ID not found, cannot save");
		}

		// Close the drawer
		closeDrawer();
	});

	const onCancel = () => {
		console.log("[GeologyCombinedLogDrawer] ❌ Cancel clicked");
		reset(rowData); // Reset form to original values
		closeDrawer();
	};

	// ============================================================================
	// Render
	// ============================================================================

	return (
		<InspectorDrawer
			open={open}
			onClose={onCancel}
			title={`Edit Interval: ${rowData?.DepthFrom?.toFixed(2) || "0.00"}m - ${rowData?.DepthTo?.toFixed(2) || "0.00"}m`}
			sections={sections}
			onSave={onSave}
			onCancel={onCancel}
			width={500}
		/>
	);
};
