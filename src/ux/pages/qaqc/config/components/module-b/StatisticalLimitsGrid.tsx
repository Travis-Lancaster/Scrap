import { Button, Card, Space, message } from "antd";
import type { ColDef, GridReadyEvent } from "ag-grid-enterprise";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import type { QcStatisticalLimits } from "#src/api/database/data-contracts";
import { StatisticalLimitEditor } from "./StatisticalLimitEditor";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";

/**
 * Statistical Limits Grid Component
 *
 * Displays element-level statistical control limits in a table format.
 * Allows inline editing and provides actions for bulk operations.
 */
export function StatisticalLimitsGrid(): JSX.Element {
	const { limits, loadStatisticalLimits } = useQaqcConfigStore();
	const [editorOpen, setEditorOpen] = useState(false);
	const [editingLimit, setEditingLimit] = useState<QcStatisticalLimits | undefined>();

	const columnDefs = useMemo<any[]>(() => [
		{
			headerName: "Element",
			field: "Element",
			width: 120,
			pinned: "left",
			cellStyle: { fontWeight: 600 },
		},
		{
			headerName: "Element Group",
			field: "ElementGroup",
			width: 140,
		},
		{
			headerName: "Warning Limit (σ)",
			field: "WarningLimitSigma",
			width: 160,
			type: "numericColumn",
			valueFormatter: (params: any) => params.value?.toFixed(2) || "-",
		},
		{
			headerName: "Failure Limit (σ)",
			field: "FailureLimitSigma",
			width: 160,
			type: "numericColumn",
			valueFormatter: (params: any) => params.value?.toFixed(2) || "-",
			cellStyle: { fontWeight: 600, color: "#cf1322" },
		},
		{
			headerName: "Description",
			field: "Description",
			width: 200,
			valueFormatter: (params: any) => params.value || "-",
		},
		{
			headerName: "Active",
			field: "ActiveInd",
			width: 100,
			cellRenderer: (params: any) => {
				return params.value
					? (
						<span style={{ color: "#52c41a", fontWeight: 600 }}>✓</span>
					)
					: (
						<span style={{ color: "#d9d9d9" }}>✗</span>
					);
			},
		},
		{
			headerName: "Actions",
			width: 100,
			pinned: "right",
			cellRenderer: (params: any) => {
				return (
					<Button
						type="link"
						size="small"
						onClick={() => handleEdit(params.data)}
					>
						Edit
					</Button>
				);
			},
		},
	], []);

	const defaultColDef = useMemo<ColDef>(() => ({
		sortable: true,
		filter: true,
		resizable: true,
	}), []);

	const handleEdit = (limit: QcStatisticalLimits) => {
		setEditingLimit(limit);
		setEditorOpen(true);
	};

	const handleCreate = () => {
		setEditingLimit(undefined);
		setEditorOpen(true);
	};

	const handleRefresh = async () => {
		try {
			await loadStatisticalLimits();
			message.success("Statistical limits refreshed");
		}
		catch (error) {
			message.error("Failed to refresh statistical limits");
		}
	};

	const handleGridReady = (params: GridReadyEvent) => {
		params.api.sizeColumnsToFit();
	};

	return (
		<>
			<Card
				title="Statistical Control Limits"
				extra={(
					<Space>
						<Button
							icon={<ReloadOutlined />}
							onClick={handleRefresh}
							loading={limits.loading}
						>
							Refresh
						</Button>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={handleCreate}
						>
							Add Limit
						</Button>
					</Space>
				)}
				bodyStyle={{ padding: 0 }}
			>
				<div className="ag-theme-alpine" style={{ height: "300px", width: "100%" }}>
					<AgGridReact
						rowData={limits.elements}
						columnDefs={columnDefs}
						defaultColDef={defaultColDef}
						onGridReady={handleGridReady}
						rowSelection="single"
						animateRows
						pagination
						paginationPageSize={10}
					/>
				</div>
			</Card>

			<StatisticalLimitEditor
				open={editorOpen}
				onClose={() => setEditorOpen(false)}
				editingData={editingLimit}
			/>
		</>
	);
}
