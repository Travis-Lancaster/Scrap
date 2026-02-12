import type { ColDef } from "ag-grid-enterprise";

export const coreRecoveryRunLogColumns: ColDef[] = [
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
		headerName: "Run",
		field: "Run",
		width: 80,
		cellClass: "text-center",
	},
	{
		headerName: "Core Diameter",
		field: "CoreDiameter",
		width: 120,
		cellClass: "text-center",
	},
	{
		headerName: "Drill Length (m)",
		field: "DrillLength",
		width: 120,
		cellClass: "text-center",
		valueFormatter: (params) => params.value?.toFixed(2) || "",
	},
	{
		headerName: "Core Recovered (m)",
		field: "CoreRecovered",
		width: 140,
		cellClass: "text-center",
		valueFormatter: (params) => params.value?.toFixed(2) || "",
	},
	{
		headerName: "Recovery %",
		field: "RecoveryPercent",
		width: 120,
		cellClass: "text-center font-bold",
		valueFormatter: (params) => params.value?.toFixed(1) + "%" || "",
		cellStyle: (params) => {
			if (params.value >= 95) return { color: "green" };
			if (params.value >= 80) return { color: "orange" };
			return { color: "red" };
		},
	},
	{
		headerName: "Comments",
		field: "Comments",
		width: 200,
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
