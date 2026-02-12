import React from "react";

import { DataGrid } from "../../components/DataGrid";
import { useDrillHoleDataStore } from "../../store";
import { vwCollarColumns } from "../../column-defs/vwCollarColumns";

export const VwCollarGrid: React.FC = () => {
	const vwCollar = useDrillHoleDataStore(state => state.vwCollar);

	const rowData = vwCollar
		? [{
			HoleId: vwCollar.HoleNm || vwCollar.PlannedHoleNm,
			ProjectName: vwCollar.Project,
			DrillPlan: vwCollar.PlannedHoleNm,
			Easting: 0,
			Northing: 0,
			RL: 0,
			PlannedDepth: vwCollar.PlannedTotalDepth,
			ActualDepth: vwCollar.TotalDepth,
			HoleStatus: vwCollar.HoleStatus,
			StartDate: vwCollar.StartedOnDt,
			DrillingCompany: vwCollar.ExplorationCompany,
			Geologist: vwCollar.ResponsiblePerson,
		}] : [];

	console.log("[VwCollarGrid] 📋 Rendering collar sign-off grid", { rowCount: rowData.length });

	return <DataGrid columnDefs={vwCollarColumns} rowData={rowData} readOnly />;
};
