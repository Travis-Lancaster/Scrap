import type { ColDef } from "ag-grid-enterprise";

export const specificGravityPtLogColumns: ColDef[] = [
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
		width: 120,
		cellClass: "font-mono bg-slate-100 font-bold text-blue-600",
		valueFormatter: (params) => params.value?.toFixed(2) || "",
	},
	{
		headerName: "Specific Gravity",
		field: "SpecificGravity",
		width: 160,
		cellClass: "text-center font-bold",
		valueFormatter: (params) => params.value?.toFixed(3) || "",
		cellStyle: (params) => {
			if (params.value >= 3.0) return { color: "purple", fontWeight: "bold" };
			return undefined;
		},
	},
	{
		headerName: "Method",
		field: "Method",
		width: 180,
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
