import type { ColDef } from "ag-grid-enterprise";

export const vwCollarColumns: ColDef[] = [
	{
		headerName: "Hole ID",
		field: "HoleId",
		width: 150,
		cellClass: "font-mono font-bold text-blue-600",
		pinned: "left",
	},
	{
		headerName: "Project",
		field: "ProjectName",
		width: 200,
	},
	{
		headerName: "Drill Plan",
		field: "DrillPlan",
		width: 150,
	},
	{
		headerName: "Easting",
		field: "Easting",
		width: 120,
		cellClass: "font-mono",
		valueFormatter: (params) => params.value?.toFixed(2) || "",
	},
	{
		headerName: "Northing",
		field: "Northing",
		width: 120,
		cellClass: "font-mono",
		valueFormatter: (params) => params.value?.toFixed(2) || "",
	},
	{
		headerName: "RL",
		field: "RL",
		width: 100,
		cellClass: "font-mono",
		valueFormatter: (params) => params.value?.toFixed(2) || "",
	},
	{
		headerName: "Planned Depth",
		field: "PlannedDepth",
		width: 130,
		cellClass: "text-center",
		valueFormatter: (params) => params.value?.toFixed(1) + "m" || "",
	},
	{
		headerName: "Actual Depth",
		field: "ActualDepth",
		width: 130,
		cellClass: "text-center font-bold",
		valueFormatter: (params) => params.value?.toFixed(1) + "m" || "",
	},
	{
		headerName: "Status",
		field: "HoleStatus",
		width: 140,
		cellRenderer: (params: any) => {
			const status = params.value;
			if (status === "IN_PROGRESS") {
				return '<span class="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">In Progress</span>';
			}
			if (status === "COMPLETED") {
				return '<span class="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">Completed</span>';
			}
			return status || "";
		},
	},
	{
		headerName: "Start Date",
		field: "StartDate",
		width: 120,
		valueFormatter: (params) => {
			if (params.value) {
				return new Date(params.value).toLocaleDateString();
			}
			return "";
		},
	},
	{
		headerName: "Drilling Company",
		field: "DrillingCompany",
		width: 180,
	},
	{
		headerName: "Geologist",
		field: "Geologist",
		width: 150,
	},
];
