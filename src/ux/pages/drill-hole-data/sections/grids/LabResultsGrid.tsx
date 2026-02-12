import React from "react";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { ColDef } from "ag-grid-enterprise";

import { DataGrid } from "../../components/DataGrid";

interface LabResultRow {
	AssayId: string;
	SampleNm: string;
	ElementCode: string;
	AssayMethod: string;
	ResultValue: number;
	Unit: string;
	ResultStatus: string;
}

const LAB_RESULT_COLUMNS: ColDef[] = [
	{ headerName: "Assay ID", field: "AssayId", width: 140, pinned: "left", cellClass: "font-mono" },
	{ headerName: "Sample", field: "SampleNm", width: 180, cellClass: "font-semibold" },
	{ headerName: "Element", field: "ElementCode", width: 120 },
	{ headerName: "Method", field: "AssayMethod", width: 180 },
	{ headerName: "Result", field: "ResultValue", width: 120, cellClass: "font-mono" },
	{ headerName: "Unit", field: "Unit", width: 100 },
	{ headerName: "Status", field: "ResultStatus", width: 120 },
];

const MOCK_ROWS: LabResultRow[] = [
	{ AssayId: "AS-001", SampleNm: "FKD064-0001", ElementCode: "AU", AssayMethod: "FA-AA", ResultValue: 0.52, Unit: "g/t", ResultStatus: "Imported" },
	{ AssayId: "AS-002", SampleNm: "FKD064-0002", ElementCode: "CU", AssayMethod: "ICP-MS", ResultValue: 0.12, Unit: "%", ResultStatus: "Pending" },
];

export const LabResultsGrid: React.FC = () => {
	return (
		<div className="h-full w-full flex flex-col bg-white">
			<div className="border-b px-6 py-3 flex items-center justify-between bg-slate-50">
				<div className="text-xs uppercase font-bold tracking-wide text-slate-500">File Importer → Assay</div>
				<Upload
					beforeUpload={(file) => {
						console.log("[LabResultsGrid] 📥 Import requested", { fileName: file.name, size: file.size });
						return false;
					}}
				>
					<Button icon={<UploadOutlined />}>Import Assay File</Button>
				</Upload>
			</div>
			<div className="flex-1 overflow-hidden">
				<DataGrid<LabResultRow> columnDefs={LAB_RESULT_COLUMNS} rowData={MOCK_ROWS} readOnly />
			</div>
		</div>
	);
};
