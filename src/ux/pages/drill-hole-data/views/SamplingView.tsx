/**
 * Sampling View
 * 
 * Main view for Sampling tab with lens-based navigation.
 * Displays samples, dispatch, and lab results based on active lens.
 * 
 * @module drill-hole-data/views
 */

import React from "react";
import { useDrillHoleDataStore } from "../store";
import { SectionKey } from "../types/data-contracts";
import { AllSamplesGrid } from "../sections/grids/AllSamplesGrid";
import { SectionFooter } from "../components/SectionFooter";
import { useSectionActions } from "../hooks";

export const SamplingView: React.FC = () => {
	// ========================================================================
	// Store Selectors
	// ========================================================================

	const activeLens = useDrillHoleDataStore(state => state.activeLens["Sampling"]);
	const currentLens = activeLens || "Sample";

	// Map lens to section key
	const currentSectionKey = 
		currentLens === "Sample" ? SectionKey.AllSamples :
		currentLens === "Dispatch" ? SectionKey.Dispatch :
		SectionKey.AllSamples;

	const section = useDrillHoleDataStore(state => state.sections[currentSectionKey]);

	console.log("[SamplingView] 🔍 Rendering Sampling view", {
		currentLens,
		sectionKey: currentSectionKey,
		isDirty: section?.isDirty,
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
				return (
					<div className="p-6 text-center text-gray-500">
						Dispatch section - Ready for component copy from create-drill-hole
					</div>
				);
			case "LabResults":
				return (
					<div className="p-6 text-center text-gray-500">
						Lab Results Importer - Ready for component copy from visual-mapper/TemplateLibrary
					</div>
				);
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

			{/* Section Footer with integrated actions */}
			{currentLens !== "LabResults" && (
				<SectionFooter
					rowStatus={section?.data?.[0]?.RowStatus || 0}
					isDirty={section?.isDirty || false}
					onSave={onSave}
					onSubmit={onSubmit}
				/>
			)}
		</div>
	);
};
