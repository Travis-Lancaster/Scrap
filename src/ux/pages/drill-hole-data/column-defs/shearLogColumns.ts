import type { ColDef } from "ag-grid-enterprise";

export const shearLogColumns: ColDef[] = [
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
		headerName: "Shear Type",
		field: "ShearType",
		width: 120,
	},
	{
		headerName: "Intensity",
		field: "ShearIntensity",
		width: 120,
	},
	{
		headerName: "Orientation",
		field: "ShearOrientation",
		width: 120,
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
