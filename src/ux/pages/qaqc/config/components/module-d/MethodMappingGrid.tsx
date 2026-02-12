import { Button, Card, Form, Input, Modal, Select, Space, message } from "antd";
import type { ColDef, GridReadyEvent } from "ag-grid-enterprise";
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import type { AssayLabMethod } from "#src/api/database/data-contracts";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";

/**
 * Method Mapping Grid Component
 *
 * Maps lab-specific method codes to generic method types.
 * Example: Lab method "FA50-ICP" maps to generic "FA" (Fire Assay)
 */
export function MethodMappingGrid(): JSX.Element {
	const { labMappings, saveMethodMapping, deleteMethodMapping, loadLabMappings } = useQaqcConfigStore();
	const [modalOpen, setModalOpen] = useState(false);
	const [editingMapping, setEditingMapping] = useState<AssayLabMethod | undefined>();
	const [form] = Form.useForm();

	const columnDefs = useMemo<any[]>(() => [
		{
			headerName: "Lab Method",
			field: "LabMethod",
			width: 140,
			pinned: "left",
			cellStyle: { fontWeight: 600, fontFamily: "monospace" },
		},
		{
			headerName: "Generic Method",
			field: "GenericMethod",
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
							fontFamily: "monospace",
						}}
					>
						{params.value}
					</span>
				);
			},
		},
		{
			headerName: "Description",
			field: "Description",
			width: 200,
			flex: 1,
			cellStyle: { fontSize: "12px", color: "#8c8c8c" },
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

	const handleEdit = (mapping: AssayLabMethod) => {
		setEditingMapping(mapping);
		form.setFieldsValue({
			LabMethod: mapping.LabMethod,
			GenericMethod: mapping.GenericMethod,
			Description: mapping.Description,
		});
		setModalOpen(true);
	};

	const handleDelete = async (mapping: AssayLabMethod) => {
		if (!mapping.AssayLabMethodId)
			return;

		try {
			await deleteMethodMapping(String(mapping.AssayLabMethodId));
			message.success("Method mapping deleted");
		}
		catch (error) {
			message.error("Failed to delete method mapping");
		}
	};

	const handleCreate = () => {
		setEditingMapping(undefined);
		form.resetFields();
		setModalOpen(true);
	};

	const handleSubmit = async () => {
		if (!labMappings.selectedLab)
			return;

		try {
			const values = await form.validateFields();

			const mappingData: Partial<AssayLabMethod> = {
				...values,
				LabCode: labMappings.selectedLab,
			};

			if (editingMapping?.AssayLabMethodId) {
				mappingData.AssayLabMethodId = editingMapping.AssayLabMethodId;
			}

			await saveMethodMapping(mappingData);
			message.success(editingMapping ? "Method mapping updated" : "Method mapping created");

			setModalOpen(false);
			await loadLabMappings(labMappings.selectedLab);
		}
		catch (error) {
			if (error instanceof Error) {
				message.error(error.message || "Failed to save method mapping");
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
				title="Method Mappings"
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
							Add
						</Button>
					</Space>
				)}
				bodyStyle={{ padding: 0, height: "calc(100% - 57px)" }}
				style={{ height: "100%", display: "flex", flexDirection: "column" }}
			>
				<div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
					<AgGridReact
						rowData={labMappings.methodMappings}
						columnDefs={columnDefs}
						defaultColDef={defaultColDef}
						onGridReady={handleGridReady}
						rowSelection="single"
						animateRows
					/>
				</div>
			</Card>

			<Modal
				title={editingMapping ? "Edit Method Mapping" : "Add Method Mapping"}
				open={modalOpen}
				onCancel={() => setModalOpen(false)}
				onOk={handleSubmit}
				confirmLoading={labMappings.loading}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="LabMethod"
						label="Lab Method Code"
						rules={[{ required: true, message: "Please enter lab method code" }]}
					>
						<Input
							placeholder="e.g., FA50-ICP, 4A-ICP"
							disabled={!!editingMapping}
						/>
					</Form.Item>

					<Form.Item
						name="GenericMethod"
						label="Generic Method"
						rules={[{ required: true, message: "Please select generic method" }]}
					>
						<Select placeholder="Select generic method">
							<Select.Option value="FA">FA - Fire Assay</Select.Option>
							<Select.Option value="4A">4A - 4-Acid Digestion</Select.Option>
							<Select.Option value="AQ">AQ - Aqua Regia</Select.Option>
							<Select.Option value="ME">ME - Multi-Element</Select.Option>
							<Select.Option value="XRF">XRF - X-Ray Fluorescence</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item
						name="Description"
						label="Description"
					>
						<Input.TextArea
							rows={2}
							placeholder="Optional description of the method..."
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
