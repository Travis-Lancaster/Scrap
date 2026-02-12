import type { QcStatisticalLimits } from "#src/api/database/data-contracts";
import { Button, Divider, Drawer, Form, Input, InputNumber, message, Space, Switch } from "antd";
import React, { useEffect } from "react";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";

interface StatisticalLimitEditorProps {
	open: boolean
	onClose: () => void
	editingData?: QcStatisticalLimits
}

/**
 * Statistical Limit Editor Drawer
 *
 * Allows creating and editing element statistical control limits.
 * Provides form validation and preview of limit calculations.
 */
export function StatisticalLimitEditor({
	open,
	onClose,
	editingData,
}: StatisticalLimitEditorProps): JSX.Element {
	const [form] = Form.useForm();
	const { updateStatisticalLimit, limits } = useQaqcConfigStore();

	const isEditMode = !!editingData;

	useEffect(() => {
		if (open && editingData) {
			form.setFieldsValue({
				Element: editingData.Element,
				ElementGroup: editingData.ElementGroup,
				WarningLimitSigma: editingData.WarningLimitSigma,
				FailureLimitSigma: editingData.FailureLimitSigma,
				Description: editingData.Description,
				ActiveInd: editingData.ActiveInd,
			});
		}
		else if (open) {
			form.resetFields();
		}
	}, [open, editingData, form]);

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();

			if (isEditMode && editingData) {
				await updateStatisticalLimit(editingData.Element, {
					...values,
				});
				message.success("Statistical limit updated successfully");
			}
			else {
				// TODO: Implement create when API endpoint is ready
				message.info("Create functionality not yet implemented");
			}

			onClose();
		}
		catch (error) {
			if (error instanceof Error) {
				message.error(error.message || "Failed to save statistical limit");
			}
		}
	};

	return (
		<Drawer
			title={isEditMode ? "Edit Statistical Limit" : "Add Statistical Limit"}
			open={open}
			onClose={onClose}
			width={600}
			extra={(
				<Space>
					<Button onClick={onClose}>Cancel</Button>
					<Button type="primary" onClick={handleSubmit} loading={limits.loading}>
						{isEditMode ? "Update" : "Create"}
					</Button>
				</Space>
			)}
		>
			<Form
				form={form}
				layout="vertical"
				initialValues={{
					WarningLimitSigma: 2.0,
					FailureLimitSigma: 3.0,
					ActiveInd: true,
				}}
			>
				<Divider orientation="left">Element Configuration</Divider>

				<Form.Item
					name="Element"
					label="Element"
					rules={[{ required: true, message: "Please enter element symbol" }]}
				>
					<Input placeholder="e.g., Au, Cu, Ag" disabled={isEditMode} />
				</Form.Item>

				<Form.Item
					name="ElementGroup"
					label="Element Group"
					rules={[{ required: true, message: "Please enter element group" }]}
				>
					<Input placeholder="e.g., GOLD, BASE, TRACE" />
				</Form.Item>

				<Divider orientation="left">Control Limits (Sigma)</Divider>

				<Form.Item
					name="WarningLimitSigma"
					label="Warning Limit (σ)"
					rules={[
						{ required: true, message: "Please enter warning limit" },
						{ type: "number", min: 0, max: 10, message: "Must be between 0 and 10" },
					]}
					tooltip="Typical: 2σ (95% confidence)"
				>
					<InputNumber
						style={{ width: "100%" }}
						step={0.1}
						precision={2}
						placeholder="2.0"
					/>
				</Form.Item>

				<Form.Item
					name="FailureLimitSigma"
					label="Failure Limit (σ)"
					rules={[
						{ required: true, message: "Please enter failure limit" },
						{ type: "number", min: 0, max: 10, message: "Must be between 0 and 10" },
					]}
					tooltip="Typical: 3σ (99.7% confidence)"
				>
					<InputNumber
						style={{ width: "100%" }}
						step={0.1}
						precision={2}
						placeholder="3.0"
					/>
				</Form.Item>

				<Divider orientation="left">Description & Status</Divider>

				<Form.Item name="Description" label="Description">
					<Input.TextArea
						rows={3}
						placeholder="Optional description..."
					/>
				</Form.Item>

				<Form.Item
					name="ActiveInd"
					label="Active"
					valuePropName="checked"
					tooltip="Only active limits are used in QC evaluation"
				>
					<Switch checkedChildren="Active" unCheckedChildren="Inactive" />
				</Form.Item>
			</Form>
		</Drawer>
	);
}
