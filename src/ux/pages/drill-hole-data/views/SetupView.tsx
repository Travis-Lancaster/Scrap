/**
 * Setup View
 *
 * Main view for Setup tab with lens-based navigation.
 * Displays RigSetup or CollarCoordinate based on active lens.
 *
 * @module drill-hole-data/views
 */

import React, { useEffect } from "react";

import { CollarCoordinateForm } from "../sections/forms/CollarCoordinateForm";
import { RigSetupForm } from "../sections/forms/rig-setup-form/RigSetupForm";
import { RigSetupFormView } from "../sections/forms/rig-setup";
import { SectionFooter } from "../components/SectionFooter";
import { SectionKey } from "../types/data-contracts";
import { useDrillHoleDataStore } from "../store";
import { useSectionActions } from "../hooks";

export const SetupView: React.FC = () => {
	// ========================================================================
	// Store Selectors
	// ========================================================================

	const activeLens = useDrillHoleDataStore(state => state.activeLens["Setup"]);
	const currentLens = activeLens || "RigSetup";

	// Get current section key based on lens
	const currentSectionKey = currentLens === "RigSetup"
		? SectionKey.RigSetup
		: SectionKey.CollarCoordinate;

	// Get section state for footer
	const section = useDrillHoleDataStore(state => state.sections[currentSectionKey]);
	const canEdit = useDrillHoleDataStore(state => state.canEdit(currentSectionKey));

	console.log("[SetupView] 🔍 Rendering SetupView", {
		currentLens,
		sectionKey: currentSectionKey,
		hasSection: !!section,
		sectionData: section?.data,
		isDirty: section?.isDirty,
		canEdit,
		rowStatus: section?.data?.RowStatus,
		timestamp: new Date().toISOString(),
	});

	// Log when section changes
	useEffect(() => {
		console.log("[SetupView] 📊 Section state changed", {
			sectionKey: currentSectionKey,
			isDirty: section?.isDirty,
			rowStatus: section?.data?.RowStatus,
			timestamp: new Date().toISOString(),
		});
	}, [section?.isDirty, section?.data?.RowStatus, currentSectionKey]);

	// ========================================================================
	// Section Actions
	// ========================================================================

	const { onSave, onSubmit } = useSectionActions(currentSectionKey);

	// ========================================================================
	// Render
	// ========================================================================

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-auto p-6 bg-slate-50">
				{/* {currentLens === "RigSetup" && <RigSetupForm />} */}
				{currentLens === "RigSetup" && <RigSetupFormView drillPlanId={"1C766C87-3130-47F8-90F3-00064B535136"} />}

				{currentLens === "Coordinate" && <CollarCoordinateForm />}
			</div>

			{/* Section Footer with integrated actions */}
			<SectionFooter
				rowStatus={section?.data?.RowStatus || 0}
				isDirty={section?.isDirty || false}
				onSave={onSave}
				onSubmit={onSubmit}
			/>
		</div>
	);
};
