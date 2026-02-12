import type { SimpleField } from "../types/template";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useVisualMapperStore } from "../store/visual-mapper-store";

const { Text } = Typography;

export const SimpleFieldForm: React.FC = () => {
	const {
		selection,
		fileFormat,
		currentSheet,
		addSimpleField,
		updateSimpleField,
		selectedItemId,
		template,
		setSelectedItemId,
	} = useVisualMapperStore();
	const [form] = Form.useForm();
	const [editingField, setEditingField] = useState<SimpleField | null>(null);

	// Check if we're editing an existing field
	useEffect(() => {
		if (selectedItemId) {
			const field = template.simpleFields.find(f => f.id === selectedItemId);
			if (field) {
				setEditingField(field);
				form.setFieldsValue({ fieldName: field.name });
			}
			else {
				setEditingField(null);
				form.resetFields();
			}
		}
		else {
			setEditingField(null);
			form.resetFields();
		}
	}, [selectedItemId, template.simpleFields, form]);

	const handleSubmit = () => {
		form.validateFields().then((values) => {
			const fieldName = values.fieldName.trim();

			if (!fieldName) {
				message.error("Field name is required");
				return;
			}

			if (editingField) {
				// Update existing field
				updateSimpleField(editingField.id, { name: fieldName });
				message.success("Field updated");
				setSelectedItemId(null);
				form.resetFields();
			}
			else {
				// Add new field
				if (!selection) {
					message.error("Please select text/cell in the file first");
					return;
				}

				// Check for duplicate names
				const exists = template.simpleFields.some(f => f.name === fieldName);
				if (exists) {
					message.warning("A field with this name already exists");
					return;
				}

				let newField: SimpleField;

				if (fileFormat === "TXT") {
					// TXT field
					newField = {
						id: `field-${Date.now()}-${Math.random()}`,
						format: "TXT",
						name: fieldName,
						line: selection.start.row,
						start: selection.start.col,
						length: (selection.end.col - selection.start.col) + 1,
					};
				}
				else {
					// XLSX field
					// @ts-ignore - selection has sheet info for XLSX
					const sheet = selection.sheet || currentSheet;
					// @ts-ignore
					const cellAddress = selection.cellAddress;

					if (!sheet) {
						message.error("No sheet selected");
						return;
					}

					newField = {
						id: `field-${Date.now()}-${Math.random()}`,
						format: "XLSX",
						name: fieldName,
						sheet,
						row: selection.start.row,
						col: selection.start.col,
						cell: cellAddress || XLSX.utils.encode_cell({ r: selection.start.row, c: selection.start.col }),
					};
				}

				addSimpleField(newField);
				message.success("Field added");
				form.resetFields();
			}
		});
	};

	const handleCancel = () => {
		setSelectedItemId(null);
		form.resetFields();
	};

	const getSelectionDisplay = () => {
		if (!selection || isEditing)
			return null;

		if (fileFormat === "TXT") {
			return (
				<>
					<Text type="secondary" style={{ fontSize: "12px" }}>
						<strong>TXT Selection:</strong>
						<br />
						Line:
						{" "}
						{selection.start.row}
						<br />
						Start:
						{" "}
						{selection.start.col}
						<br />
						Length:
						{" "}
						{(selection.end.col - selection.start.col) + 1}
					</Text>
				</>
			);
		}
		else {
			// XLSX
			// @ts-ignore
			const sheet = selection.sheet || currentSheet;
			// @ts-ignore
			const cellAddress = selection.cellAddress || XLSX.utils.encode_cell({
				r: selection.start.row,
				c: selection.start.col,
			});

			return (
				<>
					<Text type="secondary" style={{ fontSize: "12px" }}>
						<strong>XLSX Selection:</strong>
						<br />
						Sheet:
						{" "}
						{sheet}
						<br />
						Cell:
						{" "}
						{cellAddress}
						<br />
						Position: Row
						{" "}
						{selection.start.row + 1}
						, Col
						{" "}
						{XLSX.utils.encode_col(selection.start.col)}
					</Text>
				</>
			);
		}
	};

	const hasSelection = !!selection;
	const isEditing = !!editingField;

	return (
		<Form form={form} layout="vertical" size="small">
			<Form.Item
				label="Field Name"
				name="fieldName"
				rules={[{ required: true, message: "Please enter a field name" }]}
			>
				<Input placeholder="e.g., ARS_number" />
			</Form.Item>

			{selection && !isEditing && (
				<div style={{ marginBottom: 12, padding: 8, background: "#f5f5f5", borderRadius: 4 }}>
					{getSelectionDisplay()}
				</div>
			)}

			<Form.Item style={{ marginBottom: 0 }}>
				<Space>
					<Button
						type="primary"
						icon={isEditing ? <EditOutlined /> : <PlusOutlined />}
						onClick={handleSubmit}
						disabled={!isEditing && !hasSelection}
					>
						{isEditing ? "Update Field" : "Add Field"}
					</Button>
					{isEditing && (
						<Button onClick={handleCancel}>Cancel</Button>
					)}
				</Space>
			</Form.Item>

			{!hasSelection && !isEditing && (
				<Text type="secondary" style={{ fontSize: "12px" }}>
					Select
					{" "}
					{fileFormat === "TXT" ? "text" : "a cell"}
					{" "}
					in the file above to define a field
				</Text>
			)}
		</Form>
	);
};
