import React, { useMemo } from "react";

import { Card } from "antd";
import { CollarCoordinateForm } from "../sections/forms/CollarCoordinateForm";
import { RigSetupForm } from "../sections/forms";
import { SectionKey } from "../types/data-contracts";
import { useDrillHoleDataStore } from "../store";

const SetupPlaceholder: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
	<div className="p-6 bg-slate-50 h-full overflow-auto">
		<Card title={title} bordered={false} className="shadow-sm">
			<div className="text-slate-500">{subtitle}</div>
		</Card>
	</div>
);

export const SetupView: React.FC = () => {
	const activeLens = useDrillHoleDataStore(state => state.activeLens["Setup"]);
	const currentLens = activeLens || "Collar";

	const currentSectionKey = useMemo(() => {
		if (currentLens === "RigSheet") return SectionKey.RigSetup;
		if (currentLens === "Collar") return SectionKey.CollarCoordinate;
		return null;
	}, [currentLens]);

	const section = useDrillHoleDataStore(state => (currentSectionKey ? state.sections[currentSectionKey] : null));

	console.log("[SetupView] 📊 Rendering", {
		currentLens,
		sectionKey: currentSectionKey,
		isDirty: section?.isDirty,
		rowStatus: section?.data?.RowStatus,
	});

	if (currentLens === "RigSheet") return <RigSetupForm />;
	if (currentLens === "Collar") return <CollarCoordinateForm />;
	if (currentLens === "DrillMethod") {
		return <SetupPlaceholder title="Drill Method" subtitle="DrillMethod form integrated into Setup lens navigation slot." />;
	}
	if (currentLens === "SurveyLog") {
		return <SetupPlaceholder title="Survey / SurveyLog" subtitle="Survey and SurveyLog integrated into Setup lens navigation slot." />;
	}

	return <SetupPlaceholder title="Setup" subtitle="Select a setup lens." />;
};
