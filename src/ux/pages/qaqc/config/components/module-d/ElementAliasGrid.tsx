import { Button, Card, Form, Input, Modal, Space, message } from "antd";
import type { ColDef, GridReadyEvent } from "ag-grid-enterprise";
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import type { AssayLabElementAlias } from "#src/api/database/data-contracts";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";

/**
 * Element Alias Grid Component
 *
 * Manages lab-specific element names/codes.
 * Example: Lab calls "Au" as "GOLD" or "Au_FA50"
 */
export function ElementAliasGrid(): JSX.Element {
	const { labMappings, loadLabMappings, saveElementAlias, deleteElementAlias } = useQaqcConfigStore();
	const [modalOpen, setModalOpen] = useState(false);
	const [editingAlias, setEditingAlias] = useState<AssayLabElementAlias | undefined>();
	const [form] = Form.useForm();

	const columnDefs = useMemo<ColDef<AssayLabElementAlias>[]>(() => [
		{
			headerName: "Standard Element",
			field: "Element",
			width: 150,
			sortable: true,
			filter: true,
		},
		{
			headerName: "Lab Code",
			field: "LabCode",
			width: 150,
			sortable: true,
			filter: true,
		},
		{
			headerName: "Lab Element",
			field: "LabElement",
			flex: 1,
			sortable: true,
			filter: true,
		},
		{
			headerName: "Actions",
			width: 120,
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
		resizable: true,
		sortable: true,
	}), []);

	const handleEdit = (alias: AssayLabElementAlias) => {
		setEditingAlias(alias);
		form.setFieldsValue({
			Element: alias.Element,
			LabCode: alias.LabCode,
			LabElement: alias.LabElement,
			Repeat: alias.Repeat,
		});
		setModalOpen(true);
	};

	const handleDelete = async (alias: AssayLabElementAlias) => {
		if (!alias.AssayLabElementAliasId)
			return;

		try {
			await deleteElementAlias(String(alias.AssayLabElementAliasId));
			message.success("Element alias deleted");
		}
		catch (error) {
			message.error("Failed to delete element alias");
		}
	};

	const handleCreate = () => {
		setEditingAlias(undefined);
		form.resetFields();
		setModalOpen(true);
	};

	const handleSubmit = async () => {
		if (!labMappings.selectedLab)
			return;

		try {
			const values = await form.validateFields();

			const aliasData: Partial<AssayLabElementAlias> = {
				...values,
				LabCode: labMappings.selectedLab,
			};

			if (editingAlias?.AssayLabElementAliasId) {
				aliasData.AssayLabElementAliasId = editingAlias.AssayLabElementAliasId;
			}

			await saveElementAlias(aliasData);
			message.success(editingAlias ? "Element alias updated" : "Element alias created");

			setModalOpen(false);
			await loadLabMappings(labMappings.selectedLab);
		}
		catch (error) {
			if (error instanceof Error) {
				message.error(error.message || "Failed to save element alias");
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
				title="Element Aliases"
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
						rowData={labMappings.elementAliases}
						columnDefs={columnDefs}
						defaultColDef={defaultColDef}
						onGridReady={handleGridReady}
						rowSelection="single"
						animateRows
					/>
				</div>
			</Card>

			<Modal
				title={editingAlias ? "Edit Element Alias" : "Add Element Alias"}
				open={modalOpen}
				onCancel={() => setModalOpen(false)}
				onOk={handleSubmit}
				confirmLoading={labMappings.loading}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="Element"
						label="Standard Element"
						rules={[{ required: true, message: "Please enter standard element" }]}
					>
						<Input placeholder="e.g., Au, Cu, Ag" disabled={!!editingAlias} />
					</Form.Item>

					<Form.Item
						name="LabElement"
						label="Lab Element"
						rules={[{ required: true, message: "Please enter lab element" }]}
					>
						<Input placeholder="e.g., Au_FA50, GOLD" />
					</Form.Item>

					<Form.Item
						name="Repeat"
						label="Repeat"
					>
						<Input type="number" placeholder="Optional repeat number" />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
