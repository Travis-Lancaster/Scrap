import React from "react";

import { DispatchForm } from "../sections/forms/DispatchForm";
import { AllSamplesGrid, LabResultsGrid } from "../sections/grids";
import { useDrillHoleDataStore } from "../store";

export const SamplingView: React.FC = () => {
	const activeLens = useDrillHoleDataStore(state => state.activeLens["Sampling"]);
	const currentLens = activeLens || "Sample";

	const renderContent = () => {
		switch (currentLens) {
			case "Sample": return <AllSamplesGrid />;
			case "Dispatch": return <DispatchForm />;
			case "LabResults": return <LabResultsGrid />;
			default: return <AllSamplesGrid />;
		}
	};

	return <div className="h-full overflow-hidden bg-white">{renderContent()}</div>;
};
