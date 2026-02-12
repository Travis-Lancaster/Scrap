import React from "react";

import {
	CoreRecoveryRunLogGrid,
	FractureCountLogGrid,
	MagSusLogGrid,
	RockMechanicLogGrid,
	RockQualityDesignationLogGrid,
	SpecificGravityPtLogGrid,
	StructureLogGrid,
} from "../sections/grids";
import { useDrillHoleDataStore } from "../store";

export const GeotechView: React.FC = () => {
	const activeLens = useDrillHoleDataStore(state => state.activeLens["Geotech"]);
	const currentLens = activeLens || "CoreRecoveryRun";

	const renderGrid = () => {
		switch (currentLens) {
			case "CoreRecoveryRun": return <CoreRecoveryRunLogGrid />;
			case "FractureCount": return <FractureCountLogGrid />;
			case "MagSus": return <MagSusLogGrid />;
			case "RockMechanic": return <RockMechanicLogGrid />;
			case "RockQualityDesignation": return <RockQualityDesignationLogGrid />;
			case "SpecificGravityPt": return <SpecificGravityPtLogGrid />;
			case "Structure": return <StructureLogGrid />;
			default: return <CoreRecoveryRunLogGrid />;
		}
	};

	return <div className="h-full overflow-hidden bg-white">{renderGrid()}</div>;
};
