/**
 * Sampling View
 *
 * Main view for Sampling tab with lens-based navigation.
 *
 * Lenses: Sample -> AllSamples grid, Dispatch -> Dispatch form,
 *         LabResults -> File Importer placeholder
 *
 * @module drill-hole-data/views
 */

import React from "react";

import { AllSamplesGrid } from "../sections/grids/AllSamplesGrid";
import { DispatchForm } from "../sections/forms/DispatchForm";
import { GenericGridDrawer } from "../drawers/GenericGridDrawer";
import { LabResultsImporter } from "../sections/forms/LabResultsImporter";
import { SectionFooter } from "../components/SectionFooter";
import { SectionKey } from "../types/data-contracts";
import { useDrillHoleDataStore } from "../store";
import { useSectionActions } from "../hooks";

export const SamplingView: React.FC = () => {
	// ========================================================================
	// Store Selectors
	// ========================================================================

	const activeLens = useDrillHoleDataStore(state => state.activeLens["Sampling"]);
	const isDrawerOpen = useDrillHoleDataStore(state => state.isDrawerOpen);
	const selectedRow = useDrillHoleDataStore(state => state.selectedRow);
	const closeDrawer = useDrillHoleDataStore(state => state.closeDrawer);

	const currentLens = activeLens || "Sample";

	// Map lens to section key
	const currentSectionKey =
		currentLens === "Sample" ? SectionKey.AllSamples :
			currentLens === "Dispatch" ? SectionKey.Dispatch :
				SectionKey.AllSamples;

	const section = useDrillHoleDataStore(state => state.sections[currentSectionKey]);

	console.log("[SamplingView] Rendering", {
		currentLens,
		sectionKey: currentSectionKey,
		isDirty: section?.isDirty,
		drawerOpen: isDrawerOpen,
	});

	// ========================================================================
	// Section Actions
	// ========================================================================

	const { onSave, onSubmit } = useSectionActions(currentSectionKey);

	// ========================================================================
	// Render Content Based on Lens
	// ========================================================================

	const renderContent = () => {
		switch (currentLens) {
			case "Sample":
				return <AllSamplesGrid />;
			case "Dispatch":
				return <DispatchForm />;
			case "LabResults":
				return <LabResultsImporter />;
			default:
				return <AllSamplesGrid />;
		}
	};

	// ========================================================================
	// Render
	// ========================================================================

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-hidden bg-white">
				{renderContent()}
			</div>

			{/* Footer for Sample and Dispatch (not for LabResults) */}
			{currentLens !== "LabResults" && (
				<SectionFooter
					rowStatus={
						Array.isArray(section?.data)
							? section?.data?.[0]?.RowStatus || 0
							: section?.data?.RowStatus || 0
					}
					isDirty={section?.isDirty || false}
					onSave={onSave}
					onSubmit={onSubmit}
				/>
			)}

			{/* Drawer for Sample grid */}
			{isDrawerOpen && currentLens === "Sample" && (
				<GenericGridDrawer
					open={isDrawerOpen}
					onClose={closeDrawer}
					rowData={selectedRow}
					sectionKey={SectionKey.AllSamples}
					title="Sample Details"
				/>
			)}
		</div>
	);
};
