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
import { AllSamplesGrid, LabResultsGrid } from "../sections/grids";
import { SectionFooter } from "../components/SectionFooter";
import { useSectionActions } from "../hooks";
import { DispatchForm } from "../sections/forms/DispatchForm";

export const SamplingView: React.FC = () => {
	const activeLens = useDrillHoleDataStore(state => state.activeLens["Sampling"]);
	const currentLens = activeLens || "Sample";

	const currentSectionKey = 
		currentLens === "Sample" ? SectionKey.AllSamples :
		currentLens === "Dispatch" ? SectionKey.Dispatch :
		SectionKey.AllSamples;

	const section = useDrillHoleDataStore(state => state.sections[currentSectionKey]);

	console.log("[SamplingView] 🔍 Rendering Sampling view", {
		currentLens,
		sectionKey: currentSectionKey,
		isDirty: section?.isDirty,
		timestamp: new Date().toISOString(),
	});

	const { onSave, onSubmit } = useSectionActions(currentSectionKey);

	const renderContent = () => {
		switch (currentLens) {
			case "Sample":
				return <AllSamplesGrid />;
			case "Dispatch":
				return <DispatchForm />;
			case "LabResults":
				return <LabResultsGrid />;
			default:
				return <AllSamplesGrid />;
		}
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-hidden bg-white">{renderContent()}</div>

			{currentLens !== "LabResults" && (
				<SectionFooter
					rowStatus={section?.data?.[0]?.RowStatus || section?.data?.RowStatus || 0}
					isDirty={section?.isDirty || false}
					onSave={onSave}
					onSubmit={onSubmit}
				/>
			)}
		</div>
	);
};
