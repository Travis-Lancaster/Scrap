import React from "react";

import { GeologyCombinedLogDrawer } from "../drawers/GeologyCombinedLogDrawer";
import { GeologyCombinedLogGrid } from "../sections/grids/GeologyCombinedLogGrid";
import { ShearLogGrid } from "../sections/grids/ShearLogGrid";
import { StructureLogGrid } from "../sections/grids/StructureLogGrid";
import { useDrillHoleDataStore } from "../store";

export const GeologyLogView: React.FC = () => {
	const activeLens = useDrillHoleDataStore(state => state.activeLens["Geology"]);
	const isDrawerOpen = useDrillHoleDataStore(state => state.isDrawerOpen);
	const selectedRow = useDrillHoleDataStore(state => state.selectedRow);
	const selectedSection = useDrillHoleDataStore(state => state.selectedSection);
	const closeDrawer = useDrillHoleDataStore(state => state.closeDrawer);
	const currentLens = activeLens || "Litho";

	const renderGrid = () => {
		if (["Litho", "Alteration", "Veins", "Everything"].includes(currentLens)) return <GeologyCombinedLogGrid />;
		if (currentLens === "Shear") return <ShearLogGrid />;
		if (currentLens === "Structure") return <StructureLogGrid />;
		return <GeologyCombinedLogGrid />;
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-hidden bg-white">{renderGrid()}</div>
			{isDrawerOpen && selectedSection === "geologyCombinedLog" && (
				<GeologyCombinedLogDrawer open={isDrawerOpen} onClose={closeDrawer} rowData={selectedRow} />
			)}
		</div>
	);
};
