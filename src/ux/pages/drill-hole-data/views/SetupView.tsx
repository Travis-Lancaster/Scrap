import React, { useEffect } from "react";

import { CollarCoordinateForm } from "../sections/forms/CollarCoordinateForm";
import { RigSetupFormView } from "../sections/forms/rig-setup";
import { SectionFooter } from "../components/SectionFooter";
import { SectionKey } from "../types/data-contracts";
import { useDrillHoleDataStore } from "../store";

export const SetupView: React.FC = () => {
	const activeLens = useDrillHoleDataStore(state => state.activeLens["Setup"]);
	const drillPlanId = useDrillHoleDataStore(state => state.drillPlanId);
	const currentLens = activeLens || "RigSheet";

	// Get current section key based on lens
	const currentSectionKey = currentLens === "RigSheet"
		? SectionKey.RigSetup
		: SectionKey.CollarCoordinate;

	// Get section state for footer
	const section = useDrillHoleDataStore(state => state.sections[currentSectionKey]);

	console.log("[SetupView] 🔍 Rendering SetupView", {
		currentLens,
		sectionKey: currentSectionKey,
		hasSection: !!section,
		sectionData: section?.data,
		isDirty: section?.isDirty,
		rowStatus: section?.data?.RowStatus,
		timestamp: new Date().toISOString(),
	});

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
				{currentLens === "RigSheet" && <RigSetupFormView drillPlanId={drillPlanId || ""} />}
				{currentLens === "Coordinate" && <CollarCoordinateForm />}
			</div>
			<SectionFooter sectionKey={currentSectionKey} />
		</div>
	);
};
