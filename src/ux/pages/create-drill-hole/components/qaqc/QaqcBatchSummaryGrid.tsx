/**
 * QaqcBatchSummaryGrid Component
 *
 * AG Grid displaying batch summary with QC pass/fail statistics
 */

import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from "@ant-design/icons";
import type { ColDef, GridOptions } from "ag-grid-enterprise";
import { Space, Tag, Typography } from "antd";

import { AgGridReact } from "ag-grid-react";
import type { QaqcBatchSummary } from "#src/types/qaqc";

const { Text } = Typography;

interface QaqcBatchSummaryGridProps {
	batches: QaqcBatchSummary[]
	onRowClick?: (batch: QaqcBatchSummary) => void
}

export function QaqcBatchSummaryGrid({
	batches,
	onRowClick,
}: QaqcBatchSummaryGridProps): JSX.Element {
	const columnDefs: ColDef<QaqcBatchSummary>[] = [
		{
			headerName: "Batch #",
			field: "batchNo",
			width: 120,
			pinned: "left",
			cellClass: "font-semibold",
			cellStyle: { fontWeight: 600 },
		},
		{
			headerName: "Lab",
			field: "labCode",
			width: 100,
			cellRenderer: (params: any) => (
				<Tag color="blue">{params.value}</Tag>
			),
		},
		{
			headerName: "Date",
			field: "labFinalDt",
			width: 140,
			valueFormatter: (params) => {
				if (!params.value)
					return "N/A";
				return new Date(params.value).toLocaleDateString();
			},
		},
		{
			headerName: "Total QC",
			field: "totalQCSamples",
			width: 100,
			type: "numericColumn",
			cellStyle: { textAlign: "right" },
		},
		{
			headerName: "Passed",
			field: "passCount",
			width: 100,
			type: "numericColumn",
			cellStyle: { color: "#52c41a", fontWeight: "bold", textAlign: "right" },
		},
		{
			headerName: "Failed",
			field: "failCount",
			width: 100,
			type: "numericColumn",
			cellStyle: params => ({
				color: params.value > 0 ? "#f5222d" : "#52c41a",
				fontWeight: "bold",
				textAlign: "right",
			}),
		},
		{
			headerName: "Failure Rate",
			field: "failureRate_Pct",
			width: 130,
			valueFormatter: params => `${params.value.toFixed(1)}%`,
			cellRenderer: (params: any) => {
				const rate = params.value;
				let color = "green";
				if (rate > 10)
					color = "red";
				else if (rate > 5)
					color = "orange";

				return <Tag color={color}>{params.valueFormatted}</Tag>;
			},
		},
		{
			headerName: "Status",
			field: "batchStatus",
			width: 120,
			cellRenderer: (params: any) => {
				const status = params.value;
				let icon: JSX.Element;
				let color: string;

				switch (status) {
					case "PASS":
						icon = <CheckCircleOutlined style={{ color: "#52c41a" }} />;
						color = "#52c41a";
						break;
					case "WARN":
						icon = <WarningOutlined style={{ color: "#faad14" }} />;
						color = "#faad14";
						break;
					case "FAIL":
						icon = <CloseCircleOutlined style={{ color: "#f5222d" }} />;
						color = "#f5222d";
						break;
					default:
						icon = <></>;
						color = "#000";
				}

				return (
					<Space>
						{icon}
						<Text style={{ color }}>{status}</Text>
					</Space>
				);
			},
		},
	];

	const gridOptions: GridOptions<QaqcBatchSummary> = {
		defaultColDef: {
			sortable: true,
			filter: false,
			resizable: true,
		},
		domLayout: "autoHeight",
		suppressCellFocus: true,
		rowSelection: "single",
		onRowClicked: (event) => {
			if (event.data && onRowClick) {
				onRowClick(event.data);
			}
		},
	};

	return (
		<div style={{ width: "100%" }}>
			<AgGridReact<QaqcBatchSummary>
				columnDefs={columnDefs}
				rowData={batches}
				gridOptions={gridOptions}
			/>
		</div>
	);
}
