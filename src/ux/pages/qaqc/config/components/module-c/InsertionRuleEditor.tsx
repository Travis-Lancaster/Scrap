import { CopyOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Divider, Empty, Form, Input, InputNumber, message, Row, Space, Switch } from "antd";

import React, { useEffect } from "react";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";

/**
 * Insertion Rule Editor Component
 *
 * Form for creating and editing QC insertion rules.
 * Displays in center panel with full configuration options.
 */
export function InsertionRuleEditor(): JSX.Element {
	const [form] = Form.useForm();
	const {
		insertionRules,
		saveInsertionRule,
		deleteInsertionRule,
	} = useQaqcConfigStore();

	const selectedRule = insertionRules.selected;
	const isNewRule = !selectedRule?.QCInsertionRuleId;

	useEffect(() => {
		if (selectedRule) {
			form.setFieldsValue(selectedRule);
		}
		else {
			form.resetFields();
		}
	}, [selectedRule, form]);

	const handleSave = async () => {
		try {
			const values = await form.validateFields();
			await saveInsertionRule(values);
			message.success(isNewRule ? "Insertion rule created" : "Insertion rule updated");
		}
		catch (error) {
			if (error instanceof Error) {
				message.error(error.message || "Failed to save insertion rule");
			}
		}
	};

	const handleDelete = async () => {
		if (!selectedRule?.QCInsertionRuleId)
			return;

		try {
			await deleteInsertionRule(selectedRule.QCInsertionRuleId);
			message.success("Insertion rule deleted");
		}
		catch (error) {
			message.error("Failed to delete insertion rule");
		}
	};

	const handleDuplicate = async () => {
		// TODO: Implement duplicate functionality
		message.info("Duplicate functionality not yet implemented");
	};

	if (!selectedRule) {
		return (
			<Card>
				<Empty
					description="Select a rule or create a new one"
					image={Empty.PRESENTED_IMAGE_SIMPLE}
				/>
			</Card>
		);
	}

	return (
		<Card
			title={isNewRule ? "New Insertion Rule" : "Edit Insertion Rule"}
			extra={(
				<Space>
					{!isNewRule && (
						<>
							<Button
								icon={<CopyOutlined />}
								onClick={handleDuplicate}
								size="small"
							>
								Duplicate
							</Button>
							<Button
								danger
								icon={<DeleteOutlined />}
								onClick={handleDelete}
								size="small"
							>
								Delete
							</Button>
						</>
					)}
					<Button
						type="primary"
						icon={<SaveOutlined />}
						onClick={handleSave}
						loading={insertionRules.loading}
					>
						Save
					</Button>
				</Space>
			)}
			bodyStyle={{ height: "calc(100vh - 340px)", overflow: "auto" }}
		>
			<Form
				form={form}
				layout="vertical"
				initialValues={{
					SampleIntervalSize: 20,
					RackSize: 96,
					ActiveInd: true,
				}}
			>
				<Alert
					message="Configure QC sample insertion rules"
					description="Define how QC samples should be inserted based on laboratory and organization"
					type="info"
					showIcon
					style={{ marginBottom: 16 }}
				/>

				<Divider orientation="left">Basic Information</Divider>

				<Form.Item
					name="Code"
					label="Rule Code"
					rules={[{ required: true, message: "Please enter rule code" }]}
				>
					<Input placeholder="e.g., STD-FREQ-20" />
				</Form.Item>

				<Form.Item
					name="Description"
					label="Description"
					rules={[{ required: true, message: "Please enter description" }]}
				>
					<Input.TextArea rows={2} placeholder="Describe this insertion rule..." />
				</Form.Item>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name="Laboratory"
							label="Laboratory"
							rules={[{ required: true, message: "Please enter laboratory" }]}
						>
							<Input placeholder="e.g., SGS, ALS" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name="Organization"
							label="Organization"
							rules={[{ required: true, message: "Please enter organization" }]}
						>
							<Input placeholder="e.g., B2GOLD" />
						</Form.Item>
					</Col>
				</Row>

				<Divider orientation="left">Insertion Configuration</Divider>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name="SampleIntervalSize"
							label="Sample Interval Size"
							rules={[{ required: true, message: "Please enter interval size" }]}
							tooltip="Number of samples per interval"
						>
							<InputNumber style={{ width: "100%" }} min={1} max={1000} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name="RackSize"
							label="Rack Size"
							tooltip="Optional: Sample rack size"
						>
							<InputNumber style={{ width: "100%" }} min={1} max={200} />
						</Form.Item>
					</Col>
				</Row>

				<Divider orientation="left">QC Frequencies</Divider>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item name="StandardFrequency" label="Standard Frequency">
							<InputNumber style={{ width: "100%" }} min={0} placeholder="Optional" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="BlankFrequency" label="Blank Frequency">
							<InputNumber style={{ width: "100%" }} min={0} placeholder="Optional" />
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item name="FDupFrequency" label="Field Dup Frequency">
							<InputNumber style={{ width: "100%" }} min={0} placeholder="Optional" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="PrepDupFrequency" label="Prep Dup Frequency">
							<InputNumber style={{ width: "100%" }} min={0} placeholder="Optional" />
						</Form.Item>
					</Col>
				</Row>

				<Form.Item name="ETAL4Frequency" label="ETAL4 Frequency">
					<InputNumber style={{ width: "100%" }} min={0} placeholder="Optional" />
				</Form.Item>

				<Form.Item name="SampleIdPrefix" label="Sample ID Prefix">
					<Input placeholder="Optional prefix for generated sample IDs" />
				</Form.Item>

				<Divider orientation="left">Status</Divider>

				<Form.Item
					name="ActiveInd"
					label="Active"
					valuePropName="checked"
					tooltip="Only active rules are applied"
				>
					<Switch checkedChildren="Active" unCheckedChildren="Inactive" />
				</Form.Item>
			</Form>
		</Card>
	);
}
