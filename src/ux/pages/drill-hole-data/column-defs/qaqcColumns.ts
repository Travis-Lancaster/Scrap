import type { ColDef } from "ag-grid-enterprise";

export const qaqcColumns: ColDef[] = [
	{
		headerName: "Report Name",
		field: "ReportName",
		width: 250,
		cellClass: "font-semibold",
		pinned: "left",
	},
	{
		headerName: "Report Type",
		field: "ReportType",
		width: 150,
	},
	{
		headerName: "Generated Date",
		field: "GeneratedDate",
		width: 150,
		valueFormatter: (params) => {
			if (params.value) {
				return new Date(params.value).toLocaleDateString();
			}
			return "";
		},
	},
	{
		headerName: "Status",
		field: "Status",
		width: 120,
		cellRenderer: (params: any) => {
			const status = params.value;
			if (status === "Pass") {
				return '<span class="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">✓ Pass</span>';
			}
			if (status === "Warning") {
				return '<span class="px-2 py-1 rounded bg-orange-100 text-orange-700 text-xs font-bold">⚠ Warning</span>';
			}
			if (status === "Fail") {
				return '<span class="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-bold">✗ Fail</span>';
			}
			return status || "";
		},
	},
	{
		headerName: "Summary",
		field: "Summary",
		width: 300,
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
