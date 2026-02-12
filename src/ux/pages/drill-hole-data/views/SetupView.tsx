import React, { useEffect } from "react";

import { CollarCoordinateForm } from "../sections/forms/CollarCoordinateForm";
import { RigSetupForm } from "../sections/forms";
import { SectionKey } from "../types/data-contracts";
import { useDrillHoleDataStore } from "../store";

export const SetupView: React.FC = () => {
	const activeLens = useDrillHoleDataStore(state => state.activeLens["Setup"]);
	const currentLens = activeLens || "Collar";
	const currentSectionKey = currentLens === "RigSheet" ? SectionKey.RigSetup : SectionKey.CollarCoordinate;
	const section = useDrillHoleDataStore(state => state.sections[currentSectionKey]);

	useEffect(() => {
		console.log("[SetupView] 📊 Section state changed", {
			sectionKey: currentSectionKey,
			isDirty: section?.isDirty,
			rowStatus: section?.data?.RowStatus,
		});
	}, [section?.isDirty, section?.data?.RowStatus, currentSectionKey]);

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-auto p-6 bg-slate-50">
				{currentLens === "RigSheet" && <RigSetupForm />}
				{currentLens === "Collar" && <CollarCoordinateForm />}
				{currentLens === "DrillMethod" && <div className="p-6 bg-white rounded border">DrillMethod form integration placeholder</div>}
				{currentLens === "SurveyLog" && <div className="p-6 bg-white rounded border">Survey/SurveyLog integration placeholder</div>}
			</div>
		</div>
	);
};
