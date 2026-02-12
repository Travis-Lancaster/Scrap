import { Button, Card, Form, Input, InputNumber, Modal, Space, message } from "antd";
import type { ColDef, GridReadyEvent } from "ag-grid-enterprise";
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import type { QcFilteredset } from "#src/api/database/data-contracts";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";

/**
 * Detection Limits Grid Component
 *
 * Manages element-specific detection limits and grade ranges by lab/method.
 * Critical for blank evaluation and determining reportable values.
 * Uses QcFilteredset with FilterType to store different limit types.
 */
export function DetectionLimitsGrid(): JSX.Element {
	const { labMappings, saveDetectionLimit, deleteDetectionLimit, loadLabMappings } = useQaqcConfigStore();
	const [modalOpen, setModalOpen] = useState(false);
	const [editingLimit, setEditingLimit] = useState<QcFilteredset | undefined>();
	const [form] = Form.useForm();

	const columnDefs = useMemo<ColDef<QcFilteredset>[]>(() => [
		{
			headerName: "Element",
			field: "Element",
			width: 100,
			pinned: "left",
			cellStyle: { fontWeight: 600 },
		},
		{
			headerName: "Filter Type",
			field: "FilterType",
			width: 120,
			cellRenderer: (params: any) => {
				const methodColors: Record<string, string> = {
					"FA": "#1890ff",
					"4A": "#52c41a",
					"AQ": "#faad14",
					"ME": "#9254de",
					"XRF": "#eb2f96",
				};
				const color = methodColors[params.value] || "#d9d9d9";
				return (
					<span
						style={{
							padding: "2px 8px",
							borderRadius: "4px",
							backgroundColor: color,
							color: "#fff",
							fontSize: "12px",
							fontWeight: 600,
						}}
					>
						{params.value}
					</span>
				);
			},
		},
		{
			headerName: "Filter Value",
			field: "FilterValue",
			width: 140,
			type: "numericColumn",
			valueFormatter: params => params.value?.toFixed(4) || "-",
		},
		{
			headerName: "Min Grade",
			field: "MinGrade",
			width: 120,
			type: "numericColumn",
			valueFormatter: params => params.value?.toFixed(4) || "-",
		},
		{
			headerName: "Max Grade",
			field: "MaxGrade",
			width: 120,
			type: "numericColumn",
			valueFormatter: params => params.value?.toFixed(4) || "-",
		},
		{
			headerName: "Actions",
			width: 120,
			pinned: "right",
			cellRenderer: (params: any) => {
				return (
					<Space size="small">
						<Button
							type="link"
							size="small"
							icon={<EditOutlined />}
							onClick={() => handleEdit(params.data)}
						/>
						<Button
							type="link"
							size="small"
							danger
							icon={<DeleteOutlined />}
							onClick={() => handleDelete(params.data)}
						/>
					</Space>
				);
			},
		},
	], []);

	const defaultColDef = useMemo<ColDef>(() => ({
		sortable: true,
		filter: true,
		resizable: true,
	}), []);

	const handleEdit = (limit: QcFilteredset) => {
		setEditingLimit(limit);
		form.setFieldsValue({
			Element: limit.Element,
			FilterType: limit.FilterType,
			FilterValue: limit.FilterValue,
			MinGrade: limit.MinGrade,
			MaxGrade: limit.MaxGrade,
		});
		setModalOpen(true);
	};

	const handleDelete = async (limit: QcFilteredset) => {
		if (!limit.QCFilteredsetId)
			return;

		try {
			await deleteDetectionLimit(String(limit.QCFilteredsetId));
			message.success("Detection limit deleted");
		}
		catch (error) {
			message.error("Failed to delete detection limit");
		}
	};

	const handleCreate = () => {
		setEditingLimit(undefined);
		form.resetFields();
		setModalOpen(true);
	};

	const handleSubmit = async () => {
		if (!labMappings.selectedLab)
			return;

		try {
			const values = await form.validateFields();

			const limitData: Partial<QcFilteredset> = {
				...values,
				LabCode: labMappings.selectedLab,
			};

			if (editingLimit?.QCFilteredsetId) {
				limitData.QCFilteredsetId = editingLimit.QCFilteredsetId;
			}

			await saveDetectionLimit(limitData);
			message.success(editingLimit ? "Detection limit updated" : "Detection limit created");

			setModalOpen(false);
			await loadLabMappings(labMappings.selectedLab);
		}
		catch (error) {
			if (error instanceof Error) {
				message.error(error.message || "Failed to save detection limit");
			}
		}
	};

	const handleRefresh = async () => {
		if (!labMappings.selectedLab)
			return;

		try {
			await loadLabMappings(labMappings.selectedLab);
			message.success("Configuration refreshed");
		}
		catch (error) {
			message.error("Failed to refresh configuration");
		}
	};

	const handleGridReady = (params: GridReadyEvent) => {
		params.api.sizeColumnsToFit();
	};

	const isLabSelected = !!labMappings.selectedLab;

	return (
		<>
			<Card
				title="Detection Limits & Grade Ranges"
				extra={(
					<Space>
						<Button
							icon={<ReloadOutlined />}
							onClick={handleRefresh}
							loading={labMappings.loading}
							size="small"
							disabled={!isLabSelected}
						/>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={handleCreate}
							size="small"
							disabled={!isLabSelected}
						>
							Add Limit
						</Button>
					</Space>
				)}
				bodyStyle={{ padding: 0, height: "calc(100% - 57px)" }}
				style={{ height: "100%", display: "flex", flexDirection: "column" }}
			>
				<div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
					<AgGridReact
						rowData={labMappings.detectionLimits}
						columnDefs={columnDefs}
						defaultColDef={defaultColDef}
						onGridReady={handleGridReady}
						rowSelection="single"
						animateRows
						pagination
						paginationPageSize={20}
					/>
				</div>
			</Card>

			<Modal
				title={editingLimit ? "Edit Detection Limit" : "Add Detection Limit"}
				open={modalOpen}
				onCancel={() => setModalOpen(false)}
				onOk={handleSubmit}
				confirmLoading={labMappings.loading}
				width={600}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="Element"
						label="Element"
						rules={[{ required: true, message: "Please enter element" }]}
					>
						<Input placeholder="e.g., Au, Cu, Ag" disabled={!!editingLimit} />
					</Form.Item>

					<Form.Item
						name="FilterType"
						label="Filter Type"
						rules={[{ required: true, message: "Please enter filter type" }]}
						tooltip="Type of filter/limit (e.g., 'lower_detection', 'upper_detection', 'over_limit')"
					>
						<Input placeholder="e.g., lower_detection" />
					</Form.Item>

					<Space style={{ width: "100%" }} direction="vertical">
						<Form.Item
							name="FilterValue"
							label="Filter Value"
							rules={[{ type: "number", min: 0 }]}
						>
							<InputNumber style={{ width: "100%" }} step={0.0001} precision={4} placeholder="0.0001" />
						</Form.Item>

						<Form.Item
							name="MinGrade"
							label="Minimum Grade Range"
							rules={[{ type: "number", min: 0 }]}
						>
							<InputNumber style={{ width: "100%" }} step={0.0001} precision={4} placeholder="0.0001" />
						</Form.Item>

						<Form.Item
							name="MaxGrade"
							label="Maximum Grade Range"
							rules={[{ type: "number", min: 0 }]}
						>
							<InputNumber style={{ width: "100%" }} step={0.0001} precision={4} placeholder="100.0000" />
						</Form.Item>
					</Space>
				</Form>
			</Modal>
		</>
	);
}
