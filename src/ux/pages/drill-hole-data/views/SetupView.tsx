import React, { useEffect } from "react";

import { Card } from "antd";
import { CollarCoordinateForm } from "../sections/forms/CollarCoordinateForm";
import { RigSetupFormView } from "../sections/forms/rig-setup";
import { SectionFooter } from "../components/SectionFooter";
import { SectionKey } from "../types/data-contracts";
import { useDrillHoleDataStore } from "../store";

export const SetupView: React.FC = () => {
	const activeLens = useDrillHoleDataStore(state => state.activeLens["Setup"]);
	const drillPlanId = useDrillHoleDataStore(state => state.drillPlanId);
	const currentLens = activeLens || "RigSetup";

	// Get current section key based on lens
	const currentSectionKey = currentLens === "RigSetup"
		? SectionKey.RigSetup
		: SectionKey.CollarCoordinate;

	// Get section state for footer
	const section = useDrillHoleDataStore(state => state.sections[currentSectionKey]);

	console.log("[SetupView] 📊 Rendering", {
		currentLens,
		sectionKey: currentSectionKey,
		isDirty: section?.isDirty,
		rowStatus: section?.data?.RowStatus,
	});

	// Log when section changes
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
				{currentLens === "RigSetup" && <RigSetupFormView drillPlanId={drillPlanId || ""} />}
				{currentLens === "Collar Coordinate" && <CollarCoordinateForm />}
			</div>
			<SectionFooter sectionKey={currentSectionKey} />
		</div>
	);
};
