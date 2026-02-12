import type { ColDef } from "ag-grid-enterprise";

export const allSamplesColumns: ColDef[] = [
	{
		headerName: "Action",
		field: "action",
		width: 80,
		pinned: "left",
		cellRenderer: () => '<span class="text-red-500 cursor-pointer">🗑️</span>',
	},
	{
		headerName: "Sample Number",
		field: "SampleNumber",
		width: 180,
		cellClass: "font-mono font-bold",
		pinned: "left",
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
		headerName: "Sample Type",
		field: "SampleType",
		width: 120,
		cellRenderer: (params: any) => {
			const type = params.value;
			if (type === "QAQC") {
				return '<span class="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">QAQC</span>';
			}
			return type || "";
		},
	},
	{
		headerName: "Method",
		field: "SampleMethod",
		width: 140,
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
