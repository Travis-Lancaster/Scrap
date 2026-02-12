import React from "react";

import { DataGrid } from "../../components/DataGrid";
import { qaqcColumns } from "../../column-defs/qaqcColumns";

const QAQC_ROWS = [
	{ ReportName: "Standard Deviation", ReportType: "Accuracy", GeneratedDate: new Date().toISOString(), Status: "Pass", Summary: "All standard samples within acceptable range." },
	{ ReportName: "Duplicate Precision", ReportType: "Precision", GeneratedDate: new Date().toISOString(), Status: "Warning", Summary: "Two duplicates exceed tolerance and require review." },
];

export const QAQCReportsGrid: React.FC = () => {
	console.log("[QAQCReportsGrid] 📊 Rendering QAQC grid", { rowCount: QAQC_ROWS.length });
	return <DataGrid columnDefs={qaqcColumns} rowData={QAQC_ROWS} readOnly />;
};
