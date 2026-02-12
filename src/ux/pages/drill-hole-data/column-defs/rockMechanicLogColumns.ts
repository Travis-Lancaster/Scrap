import type { ColDef } from "ag-grid-enterprise";

export const rockMechanicLogColumns: ColDef[] = [
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
		headerName: "UCS (MPa)",
		field: "UCS_MPa",
		width: 120,
		cellClass: "text-center",
		valueFormatter: (params) => params.value?.toFixed(1) || "",
	},
	{
		headerName: "Tensile Strength (MPa)",
		field: "TensileStrength_MPa",
		width: 160,
		cellClass: "text-center",
		valueFormatter: (params) => params.value?.toFixed(1) || "",
	},
	{
		headerName: "Young's Modulus (GPa)",
		field: "YoungsModulus_GPa",
		width: 160,
		cellClass: "text-center",
		valueFormatter: (params) => params.value?.toFixed(1) || "",
	},
	{
		headerName: "Poisson's Ratio",
		field: "PoissonsRatio",
		width: 140,
		cellClass: "text-center",
		valueFormatter: (params) => params.value?.toFixed(2) || "",
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
