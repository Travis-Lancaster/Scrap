import React, { useEffect, useMemo } from "react";
import { Button, Drawer, Form, Input, InputNumber, Space } from "antd";

import { useDrillHoleDataStore } from "../store";

const FIELD_ID_CANDIDATES = [
	"GeologyCombinedLogId",
	"ShearLogId",
	"StructureLogId",
	"CoreRecoveryRunLogId",
	"FractureCountLogId",
	"MagSusLogId",
	"RockMechanicLogId",
	"RockQualityDesignationLogId",
	"SpecificGravityPtLogId",
	"SampleId",
];

const HIDDEN_FIELDS = new Set(["createdOnDt", "modifiedOnDt", "rv"]);

function getRowId(row: Record<string, any>): string | null {
	for (const key of FIELD_ID_CANDIDATES) {
		if (row?.[key]) return String(row[key]);
	}
	return null;
}

export const InspectorDrawer: React.FC = () => {
	const [form] = Form.useForm();
	const { isDrawerOpen, closeDrawer, selectedRow, selectedSection, updateRow } = useDrillHoleDataStore();

	useEffect(() => {
		if (selectedRow) {
			form.setFieldsValue(selectedRow);
		}
	}, [form, selectedRow]);

	const visibleFields = useMemo(() => {
		if (!selectedRow) return [] as string[];
		return Object.keys(selectedRow).filter((field) => !HIDDEN_FIELDS.has(field.toLowerCase()));
	}, [selectedRow]);

	const handleSave = () => {
		if (!selectedRow || !selectedSection) {
			closeDrawer();
			return;
		}

		const rowId = getRowId(selectedRow);
		if (!rowId) {
			console.warn("[InspectorDrawer] ⚠️ Unable to resolve row ID", { selectedSection });
			closeDrawer();
			return;
		}

		const values = form.getFieldsValue();
		console.log("[InspectorDrawer] 💾 Saving row updates", { selectedSection, rowId, fieldCount: Object.keys(values).length });
		updateRow(selectedSection as any, rowId, values);
		closeDrawer();
	};

	return (
		<Drawer
			title={`Edit ${selectedSection || "Row"}`}
			placement="right"
			open={isDrawerOpen}
			onClose={closeDrawer}
			width={520}
			destroyOnClose
		>
			<Form form={form} layout="vertical">
				{visibleFields.map((field) => {
					const value = selectedRow?.[field];
					const isNumber = typeof value === "number";
					return (
						<Form.Item key={field} label={field} name={field}>
							{isNumber ? <InputNumber style={{ width: "100%" }} /> : <Input />}
						</Form.Item>
					);
				})}
			</Form>
			<Space style={{ width: "100%", justifyContent: "end" }}>
				<Button onClick={closeDrawer}>Cancel</Button>
				<Button type="primary" onClick={handleSave}>Save Changes</Button>
			</Space>
		</Drawer>
	);
};
