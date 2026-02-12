/**
 * QaqcFailedSamplesGrid Component
 *
 * AG Grid displaying failed QC samples with details and actions
 */

import { Button, Space, Tag } from "antd";
import type { CellStyle, ColDef, GridOptions } from "ag-grid-enterprise";
import {
	ExperimentOutlined,
	LineChartOutlined,
} from "@ant-design/icons";

import { AgGridReact } from "ag-grid-react";
import type { QaqcDetailedSample } from "#src/types/qaqc.js";

interface QaqcFailedSamplesGridProps {
	samples: QaqcDetailedSample[]
	onViewChart?: (sample: QaqcDetailedSample) => void
	onReassaySample?: (sample: QaqcDetailedSample) => void
}

export function QaqcFailedSamplesGrid({
	samples,
	onViewChart,
	onReassaySample,
}: QaqcFailedSamplesGridProps): JSX.Element {
	const columnDefs: ColDef<QaqcDetailedSample>[] = [
		{
			headerName: "Sample ID",
			field: "sampleNm",
			width: 150,
			pinned: "left",
			cellRenderer: (params: any) => (
				<Button
					type="link"
					onClick={(e) => {
						e.stopPropagation();
						if (onViewChart && params.data) {
							onViewChart(params.data);
						}
					}}
					style={{ padding: 0 }}
				>
					{params.value}
				</Button>
			),
		},
		{
			headerName: "Type",
			field: "qcType",
			width: 100,
			cellRenderer: (params: any) => {
				const colors: Record<string, string> = {
					STD: "blue",
					BLK: "purple",
					FDUP: "orange",
					PREPDUP: "cyan",
				};
				return <Tag color={colors[params.value] || "default"}>{params.value}</Tag>;
			},
		},
		{
			headerName: "Standard ID",
			field: "standardId",
			width: 140,
			valueFormatter: params => params.value || "-",
		},
		{
			headerName: "Result",
			field: "result",
			width: 120,
			type: "numericColumn",
			valueFormatter: params => params.value.toFixed(4),
			cellStyle: { textAlign: "right" },
		},
		{
			headerName: "Expected",
			field: "expectedValue",
			width: 120,
			type: "numericColumn",
			valueFormatter: params => params.value?.toFixed(4) || "-",
			cellStyle: { textAlign: "right" },
		},
		{
			headerName: "Z-Score",
			field: "zScore",
			width: 120,
			type: "numericColumn",
			valueFormatter: params => params.value?.toFixed(2) || "-",
			cellStyle: (params): CellStyle => {
				if (!params.value)
					return { textAlign: "right" };
				const abs = Math.abs(params.value);
				if (abs > 3)
					return { color: "#f5222d", fontWeight: "bold", textAlign: "right" };
				if (abs > 2)
					return { color: "#faad14", fontWeight: "bold", textAlign: "right" };
				return { textAlign: "right" };
			},
		},
		{
			headerName: "Status",
			field: "qcStatus",
			width: 120,
			cellRenderer: (params: any) => {
				const colors: Record<string, string> = {
					PASS: "success",
					WARN: "warning",
					FAIL: "error",
					FAIL_HIGH: "error",
				};
				return <Tag color={colors[params.value] || "default"}>{params.value}</Tag>;
			},
		},
		{
			headerName: "Actions",
			width: 180,
			pinned: "right",
			cellRenderer: (params: any) => (
				<Space size="small">
					<Button
						size="small"
						icon={<LineChartOutlined />}
						onClick={(e) => {
							e.stopPropagation();
							if (onViewChart && params.data) {
								onViewChart(params.data);
							}
						}}
					>
						Chart
					</Button>
					<Button
						size="small"
						icon={<ExperimentOutlined />}
						onClick={(e) => {
							e.stopPropagation();
							if (onReassaySample && params.data) {
								onReassaySample(params.data);
							}
						}}
					>
						Re-assay
					</Button>
				</Space>
			),
		},
	];

	const gridOptions: GridOptions<QaqcDetailedSample> = {
		defaultColDef: {
			sortable: true,
			filter: true,
			resizable: true,
		},
		domLayout: "autoHeight",
		suppressCellFocus: true,
		pagination: true,
		paginationPageSize: 10,
		paginationPageSizeSelector: [10, 20, 50],
	};

	return (
		<div style={{ width: "100%" }}>
			<AgGridReact<QaqcDetailedSample>
				columnDefs={columnDefs}
				rowData={samples}
				gridOptions={gridOptions}
			/>
		</div>
	);
}
