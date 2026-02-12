import type { ColDef } from "ag-grid-enterprise";

export const structureLogColumns: ColDef[] = [
	{
		headerName: "Action",
		field: "action",
		width: 80,
		pinned: "left",
		cellRenderer: () => '<span class="text-red-500 cursor-pointer">🗑️</span>',
	},
	{
		headerName: "Depth (m)",
		field: "Depth",
		width: 100,
		cellClass: "font-mono bg-slate-100 font-bold text-blue-600",
		valueFormatter: (params) => params.value?.toFixed(2) || "",
	},
	{
		headerName: "Structure Type",
		field: "StructureType",
		width: 150,
	},
	{
		headerName: "Dip",
		field: "Dip",
		width: 80,
		cellClass: "text-center",
	},
	{
		headerName: "Dip Direction",
		field: "DipDirection",
		width: 120,
		cellClass: "text-center",
	},
	{
		headerName: "Roughness",
		field: "Roughness",
		width: 120,
	},
	{
		headerName: "Infill",
		field: "Infill",
		width: 100,
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
