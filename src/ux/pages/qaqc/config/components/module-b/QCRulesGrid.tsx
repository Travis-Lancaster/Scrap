import { Button, Card, Space, Tag, message } from "antd";
import type { ColDef, GridReadyEvent } from "ag-grid-enterprise";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import type { QcRule } from "#src/api/database/data-contracts";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";

// TODO: Implement QCRuleEditor when needed
// import { QCRuleEditor } from './QCRuleEditor';

/**
 * QC Rules Grid Component
 *
 * Displays configured QC evaluation rules (Shewhart, Westgard, etc.)
 * Allows creating and editing rule definitions.
 */
export function QCRulesGrid(): JSX.Element {
	const { limits, loadQCRules } = useQaqcConfigStore();
	const [editorOpen, setEditorOpen] = useState(false);
	const [editingRule, setEditingRule] = useState<QcRule | undefined>();

	const columnDefs = useMemo<any[]>(() => [
		{
			headerName: "Rule Code",
			field: "Code",
			width: 140,
			pinned: "left",
			cellStyle: { fontFamily: "monospace", fontWeight: 600 },
		},
		{
			headerName: "Description",
			field: "Description",
			width: 300,
			flex: 2,
			cellStyle: { fontSize: "12px" },
		},
		{
			headerName: "QC Type",
			field: "QCType",
			width: 120,
			cellRenderer: (params: any) => {
				return (
					<Tag color="blue">
						{params.value}
					</Tag>
				);
			},
		},
		{
			headerName: "Element",
			field: "Element",
			width: 100,
			valueFormatter: (params: any) => params.value || "All",
		},
		{
			headerName: "Check CRM",
			field: "CheckCRM",
			width: 120,
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

	const handleEdit = (rule: QcRule) => {
		setEditingRule(rule);
		setEditorOpen(true);
	};

	const handleCreate = () => {
		setEditingRule(undefined);
		setEditorOpen(true);
	};

	const handleRefresh = async () => {
		try {
			await loadQCRules();
			message.success("QC rules refreshed");
		}
		catch (error) {
			message.error("Failed to refresh QC rules");
		}
	};

	const handleGridReady = (params: GridReadyEvent) => {
		params.api.sizeColumnsToFit();
	};

	return (
		<>
			<Card
				title="QC Evaluation Rules"
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
							Add Rule
						</Button>
					</Space>
				)}
				bodyStyle={{ padding: 0 }}
				style={{ height: "100%", display: "flex", flexDirection: "column" }}
			>
				<div className="ag-theme-alpine" style={{ height: "100%", width: "100%", minHeight: "400px" }}>
					<AgGridReact
						rowData={limits.rules}
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

			{/* TODO: Implement QCRuleEditor component
      <QCRuleEditor
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        editingData={editingRule}
      />
      */}
		</>
	);
}
