import type { ColDef } from "ag-grid-enterprise";

export const rockQualityDesignationLogColumns: ColDef[] = [
	{
		headerName: "Action",
		field: "action",
		width: 80,
		pinned: "left",
		cellRenderer: () => '<span class="text-red-500 cursor-pointer">🗑️</span>',
	},
	{
		headerName: "From (m)",
		field: "DepthFrom",
		width: 100,
		cellClass: "font-mono bg-slate-100",
		valueFormatter: (params) => params.value?.toFixed(2) || "",
	},
	{
		headerName: "To (m)",
		field: "DepthTo",
		width: 100,
		cellClass: "font-mono bg-slate-100 font-bold text-blue-600",
		valueFormatter: (params) => params.value?.toFixed(2) || "",
	},
	{
		headerName: "RQD %",
		field: "RQD_Percent",
		width: 120,
		cellClass: "text-center font-bold",
		valueFormatter: (params) => params.value + "%" || "",
		cellStyle: (params) => {
			if (params.value >= 90) return { color: "green" };
			if (params.value >= 75) return { color: "blue" };
			if (params.value >= 50) return { color: "orange" };
			return { color: "red" };
		},
	},
	{
		headerName: "Rock Quality",
		field: "RockQuality",
		width: 140,
		cellClass: "text-center font-semibold",
	},
	{
		headerName: "Comments",
		field: "Comments",
		width: 250,
		flex: 1,
	},
	{
		headerName: "",
		field: "actions",
		width: 50,
		pinned: "right",
		cellRenderer: () => '<i class="fa-solid fa-chevron-right text-slate-300"></i>',
	},
];
