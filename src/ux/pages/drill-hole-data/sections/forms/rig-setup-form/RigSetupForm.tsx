/**
 * RigSetup Form Component (PRODUCTION)
 *
 * Form-based section for Rig Setup Sheet data entry with subsections.
 * Integrated with drill-hole-data store and validation architecture.
 *
 * ARCHITECTURE:
 * - Uses useRigSetupForm hook for business logic
 * - Integrates with create-drill-hole subsections
 * - Adapter layer for signature pad compatibility
 * - Cached lookups for performance
 * - Two-tier validation display
 * - ReadOnly control based on RowStatus
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Component coordinates subsections only
 * - Open/Closed: Extensible via subsection configuration
 * - Dependency Inversion: Depends on abstractions (hooks, stores)
 */

import "./RigSetupForm.css";

import { Alert, Row, Space } from "antd";
import React, { useEffect, useMemo, useState } from "react";

import { CommentsSection } from "./CommentsSection";
import { DownHoleSurveySection } from "./DownHoleSurveySection";
import { FinalSetupSection } from "./FinalSetupSection";
import { PadInspectionSection } from "./PadInspectionSection";
// Types
import type { RigSetupData as RigSetupFormData } from "../../../validation";
import { useLookups } from "#src/data-layer/hooks/useLookups.js";
// Custom hook
import { useRigSetupForm } from "../../../hooks";

// Components from create-drill-hole (reused subsections)
// import { CommentsSection } from "#src/pages/create-drill-hole/components/CommentsSection";
// import { DownHoleSurveySection } from "#src/pages/create-drill-hole/components/DownHoleSurveySection";
// import { FinalSetupSection } from "#src/pages/create-drill-hole/components/FinalSetupSection";
// import { PadInspectionSection } from "#src/pages/create-drill-hole/components/PadInspectionSection";




// ============================================================================
// Global Store Adapter for Signature Pads
// ============================================================================

declare global {
	interface Window {
		store: {
			updateField: (
				drillPlanId: string,
				sectionKey: string,
				fieldPath: string,
				value: any,
			) => void;
		};
	}
}

// ============================================================================
// Type for subsection compatibility
// ============================================================================

type RigSetupData = RigSetupFormData;

/**
 * RigSetupForm Component
 *
 * Coordinates subsections and integrates with drill-hole-data store.
 * Uses adapter pattern to bridge subsection structure with mock data store.
 */
export const RigSetupForm: React.FC = () => {
	// ============================================================================
	// Custom Hook Integration (NEW - Production Architecture)
	// ============================================================================

	const {
		control,
		errors,
		isDirty,
		isReadOnly,
		validation,
		data: rigSetupData,
		handleChange,
		setValue,
	} = useRigSetupForm();

	console.log("[RigSetupForm] 🎨 Rendering with new architecture:", {
		isDirty,
		isReadOnly,
		canSave: validation.canSave,
		errorCount: errors ? Object.keys(errors).length : 0,
		rigSetupDataKeys: rigSetupData ? Object.keys(rigSetupData) : [],
		rigSetupDataValues: rigSetupData,
		hasRigSetupData: !!rigSetupData,
		timestamp: new Date().toISOString(),
	});

	// Log when isDirty changes
	React.useEffect(() => {
		console.log("[RigSetupForm] 🔄 isDirty state changed:", {
			isDirty,
			timestamp: new Date().toISOString(),
		});
	}, [isDirty]);

	// Wrap control for subsection compatibility
	const wrappedControl = control as any;
	const wrappedErrors = errors as any;

	// ============================================================================
	// Cached Lookups - Performance optimization
	// ============================================================================

	const [lookupOptions, setLookupOptions] = useState({
		person: [] as Array<{ value: string; label: string }>,
		drillCompanies: [] as Array<{ value: string; label: string }>,
		machineryAll: [] as Array<{ value: string; label: string }>,
	});

	// Load lookups asynchronously after LookupResolver is initialized
	useEffect(() => {
		const loadLookups = async () => {
			// Ensure LookupResolver is initialized before accessing lookups
			//

			const options = {
				person: useLookups().Person, //useLookup("Person", "Code", "Description"),
				drillCompanies: useLookups().getCompanies("DRILLING"),
				// drillCompanies: LookupResolver.getFilteredLookupOptions(
				// 	"Company",
				// 	"Code",
				// 	"Description",
				// 	"CompanyType",
				// 	"DRILLING",
				// ),
				machineryAll: useLookups().Machinery,
			};

			setLookupOptions(options);

			console.log("[RigSetupForm] 🔍 Lookup options loaded:", {
				persons: options.person.length,
				drillingCompanies: options.drillCompanies.length,
				machineryAll: options.machineryAll.length,
			});
		};

		loadLookups();
	}, []);

	// ============================================================================
	// Filtered Machinery Logic
	// ============================================================================

	const [filteredMachinery, setFilteredMachinery] = useState<
		Array<{ value: string; label: string }>
	>([]);

	// Update filtered machinery when drilling contractor changes
	useEffect(() => {
		const drillingContractor = rigSetupData.DownHoleSurveyDrillingContractor;
		if (drillingContractor) {
			const filtered = useLookups().getMachinery(drillingContractor)
			// LookupResolver.getFilteredLookupOptions(
			// 	"Machinery",
			// 	"Code",
			// 	"Description",
			// 	"Company",
			// 	drillingContractor,
			// );
			setFilteredMachinery(filtered);
			console.log("[RigSetupForm] 🔧 Filtered machinery for contractor:", {
				contractor: drillingContractor,
				count: filtered.length,
			});
		} else {
			setFilteredMachinery(lookupOptions.machineryAll);
		}
	}, [rigSetupData.DownHoleSurveyDrillingContractor, lookupOptions.machineryAll]);

	// ============================================================================
	// Store Adapter for Signature Pads
	// ============================================================================

	const storeAdapter = useMemo(
		() => ({
			updateField: (
				_drillPlanId: string,
				_sectionKey: string,
				fieldPath: string,
				value: any,
			) => {
				// Extract field name from path (e.g., "RigSetup.PadInspectionSignatureDt" -> "PadInspectionSignatureDt")
				const fieldName = fieldPath.split(".").pop() as keyof RigSetupData;
				if (fieldName) {
					console.log("[RigSetupForm] ✍️ Signature field updated:", {
						fieldName,
						value: value ? "signature data" : null,
					});
					// Update via setValue for immediate UI update
					setValue(`RigSetup.${fieldName}` as any, value, { shouldDirty: true });
					// Update store via hook handler
					handleChange(fieldName, value);
				}
			},
		}),
		[rigSetupData, setValue, handleChange],
	);

	// Make store adapter available globally for subsections
	useEffect(() => {
		window.store = storeAdapter;
		(globalThis as any).store = storeAdapter;
		console.log("[RigSetupForm] 🌐 Global store adapter initialized");
		return () => {
			delete (window as any).store;
			delete (globalThis as any).store;
			console.log("[RigSetupForm] 🧹 Global store adapter cleaned up");
		};
	}, [storeAdapter]);

	// ============================================================================
	// Render - Pure presentation with subsections
	// ============================================================================

	return (
		<div className="rig-setup-form">
			{/* Validation Errors Display */}
			{validation.database.errors.length > 0 && (
				<Alert
					type="error"
					message="Validation Errors"
					description={
						<ul>
							{validation.database.errors.map((error: any, idx: number) => (
								<li key={idx}>{error.message}</li>
							))}
						</ul>
					}
					closable
					style={{ marginBottom: 16 }}
				/>
			)}

			{/* Validation Warnings Display */}
			{validation.save.warnings.length > 0 && (
				<Alert
					type="warning"
					message="Data Quality Warnings"
					description={
						<ul>
							{validation.save.warnings.map((warning: any, idx: number) => (
								<li key={idx}>{warning.message}</li>
							))}
						</ul>
					}
					closable
					style={{ marginBottom: 16 }}
				/>
			)}

			{/* ReadOnly Notice */}
			{isReadOnly && (
				<Alert
					type="info"
					message="Read-Only Mode"
					description="This section cannot be edited because it is not in Draft status."
					style={{ marginBottom: 16 }}
				/>
			)}

			<Space direction="vertical" size="small" style={{ width: "100%" }}>
				<Row gutter={[0, 0]}>
					{/* Pad Inspection Subsection */}
					<PadInspectionSection
						control={wrappedControl}
						errors={wrappedErrors}
						sheetData={{ RigSetup: rigSetupData }}
						lookupOptions={{
							person: lookupOptions.person,
							drillCompanies: lookupOptions.drillCompanies,
						}}
						drillPlanId={rigSetupData.DrillPlanId || ""}
					/>

					{/* Final Setup Subsection */}
					<FinalSetupSection
						control={wrappedControl}
						errors={wrappedErrors}
						sheetData={{ RigSetup: rigSetupData }}
						lookupOptions={{
							person: lookupOptions.person,
						}}
						drillPlanId={rigSetupData.DrillPlanId || ""}
					/>

					{/* Down Hole Survey Subsection */}
					<DownHoleSurveySection
						control={wrappedControl}
						errors={wrappedErrors}
						sheetData={{ RigSetup: rigSetupData }}
						lookupOptions={{
							person: lookupOptions.person,
							drillCompanies: lookupOptions.drillCompanies,
							machineryAll: lookupOptions.machineryAll,
						}}
						filteredMachinery={filteredMachinery}
						drillPlanId={rigSetupData.DrillPlanId || ""}
					/>

					{/* Comments Subsection */}
					<CommentsSection
						control={wrappedControl}
						errors={wrappedErrors}
						sheetData={{ RigSetup: rigSetupData }}
					/>
				</Row>
			</Space>
		</div>
	);
};
