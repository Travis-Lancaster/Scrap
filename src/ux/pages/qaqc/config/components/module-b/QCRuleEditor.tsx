import type { QcRule } from "#src/api/database/data-contracts";
import { Alert, Button, Divider, Form, Input, message, Modal, Select, Switch } from "antd";
import React, { useEffect } from "react";

import { useQaqcConfigStore } from "../../store/qaqc-config-store";

interface QCRuleEditorProps {
	open: boolean
	onClose: () => void
	editingData?: QcRule
}

/**
 * QC Rule Editor Modal
 *
 * Creates and edits QC evaluation rules.
 * Supports Shewhart, Westgard, and custom rule definitions.
 */
export function QCRuleEditor({
	open,
	onClose,
	editingData,
}: QCRuleEditorProps): JSX.Element {
	const [form] = Form.useForm();
	const { saveQCRule, limits } = useQaqcConfigStore();

	const isEditMode = !!editingData;
	const ruleType = Form.useWatch("ruleType", form);

	useEffect(() => {
		if (open && editingData) {
			form.setFieldsValue(editingData);
		}
		else if (open) {
			form.resetFields();
		}
	}, [open, editingData, form]);

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();

			await saveQCRule(values);
			message.success(isEditMode ? "QC rule updated successfully" : "QC rule created successfully");

			onClose();
		}
		catch (error) {
			if (error instanceof Error) {
				message.error(error.message || "Failed to save QC rule");
			}
		}
	};

	const getRuleTypeInfo = () => {
		const info: Record<string, { description: string, examples: string }> = {
			SHEWHART: {
				description: "Classic control chart rules (1-point violations)",
				examples: "1σ2, 1σ3 - Single point exceeds 2σ or 3σ",
			},
			WESTGARD: {
				description: "Multi-rule quality control (pattern detection)",
				examples: "2σ2s, 4σ1s, 10x - Multiple points outside limits or trends",
			},
			CUSTOM: {
				description: "User-defined evaluation logic",
				examples: "Project-specific rules or complex conditions",
			},
		};
		return info[ruleType] || null;
	};

	return (
		<Modal
			title={isEditMode ? "Edit QC Rule" : "Add QC Rule"}
			open={open}
			onCancel={onClose}
			width={700}
			footer={[
				<Button key="cancel" onClick={onClose}>
					Cancel
				</Button>,
				<Button
					key="submit"
					type="primary"
					onClick={handleSubmit}
					loading={limits.loading}
				>
					{isEditMode ? "Update" : "Create"}
				</Button>,
			]}
		>
			<Form
				form={form}
				layout="vertical"
				initialValues={{
					ruleType: "SHEWHART",
					severity: "WARNING",
					isActive: true,
				}}
			>
				<Divider orientation="left">Rule Identification</Divider>

				<Form.Item
					name="ruleCode"
					label="Rule Code"
					rules={[
						{ required: true, message: "Please enter rule code" },
						{ pattern: /^[A-Z0-9_]+$/, message: "Use uppercase letters, numbers, and underscores only" },
					]}
					tooltip="Unique identifier (e.g., 1S3, 2S2S, R4S)"
				>
					<Input placeholder="e.g., 1S3" disabled={isEditMode} style={{ fontFamily: "monospace" }} />
				</Form.Item>

				<Form.Item
					name="ruleName"
					label="Rule Name"
					rules={[{ required: true, message: "Please enter rule name" }]}
				>
					<Input placeholder="e.g., Single Point Beyond 3 Sigma" />
				</Form.Item>

				<Divider orientation="left">Rule Configuration</Divider>

				<Form.Item
					name="ruleType"
					label="Rule Type"
					rules={[{ required: true, message: "Please select rule type" }]}
				>
					<Select placeholder="Select rule type">
						<Select.Option value="SHEWHART">Shewhart (Single Point)</Select.Option>
						<Select.Option value="WESTGARD">Westgard (Multi-Rule)</Select.Option>
						<Select.Option value="CUSTOM">Custom</Select.Option>
					</Select>
				</Form.Item>

				{getRuleTypeInfo() && (
					<Alert
						message={getRuleTypeInfo()!.description}
						description={`Examples: ${getRuleTypeInfo()!.examples}`}
						type="info"
						showIcon
						style={{ marginBottom: 16 }}
					/>
				)}

				<Form.Item
					name="severity"
					label="Severity"
					rules={[{ required: true, message: "Please select severity" }]}
					tooltip="Determines how violations are flagged in reports"
				>
					<Select placeholder="Select severity">
						<Select.Option value="FAIL">FAIL (Critical - Investigation Required)</Select.Option>
						<Select.Option value="WARNING">WARNING (Attention Needed)</Select.Option>
						<Select.Option value="INFO">INFO (Informational Only)</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item
					name="description"
					label="Description"
					rules={[{ required: true, message: "Please enter description" }]}
				>
					<Input.TextArea
						rows={3}
						placeholder="Describe when this rule triggers and what action to take..."
					/>
				</Form.Item>

				<Divider orientation="left">Rule Logic</Divider>

				<Form.Item
					name="evaluationLogic"
					label="Evaluation Logic"
					tooltip="SQL expression or function reference used to evaluate this rule"
				>
					<Input.TextArea
						rows={4}
						placeholder="e.g., ABS(z_score) > 3.0"
						style={{ fontFamily: "monospace", fontSize: "12px" }}
					/>
				</Form.Item>

				<Form.Item
					name="actionRequired"
					label="Required Action"
					tooltip="What should the user do when this rule is violated?"
				>
					<Input placeholder="e.g., Re-assay required, Investigate batch" />
				</Form.Item>

				<Divider orientation="left">Status</Divider>

				<Form.Item
					name="isActive"
					label="Active"
					valuePropName="checked"
					tooltip="Only active rules are used in QC evaluation"
				>
					<Switch checkedChildren="Active" unCheckedChildren="Inactive" />
				</Form.Item>
			</Form>
		</Modal>
	);
}
