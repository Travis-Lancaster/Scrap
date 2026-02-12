import type { ColDef } from "ag-grid-enterprise";

export const fractureCountLogColumns: ColDef[] = [
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
		headerName: "Fracture Count",
		field: "FractureCount",
		width: 140,
		cellClass: "text-center font-bold",
	},
	{
		headerName: "Fractures/m",
		field: "FracturesPerMeter",
		width: 120,
		cellClass: "text-center",
		valueFormatter: (params) => params.value?.toFixed(1) || "",
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
