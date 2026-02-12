import React from "react";
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch } from "antd";

const { TextArea } = Input;

const DISPATCH_STATUS_OPTIONS = ["Draft", "Ready", "Dispatched", "Received"];
const PRIORITY_OPTIONS = ["Routine", "Rush", "Urgent"];

export const DispatchForm: React.FC = () => {
	const [form] = Form.useForm();

	const dirtyStyle = (fieldName: string) => (
		form.isFieldTouched(fieldName)
			? { borderColor: "#2563eb", backgroundColor: "#eff6ff" }
			: undefined
	);

	const handleFormChange = () => {
		console.log("[DispatchForm] ✏️ Form changed", {
			values: form.getFieldsValue(),
			isDirty: form.isFieldsTouched(true),
			timestamp: new Date().toISOString(),
		});
	};

	const handleReset = () => {
		console.log("[DispatchForm] 🔄 Reset clicked");
		form.resetFields();
	};

	return (
		<div className="p-6 bg-slate-50 h-full overflow-auto">
			<Card title="Dispatch" bordered={false} className="shadow-sm">
				<Form
					layout="vertical"
					form={form}
					onValuesChange={handleFormChange}
					initialValues={{
						DispatchStatus: "Draft",
						Priority: "Routine",
						CertificateInd: true,
						EmailNotificationInd: true,
						WebNotificationInd: false,
					}}
				>
					<Row gutter={16}>
						<Col span={8}><Form.Item label="Dispatch Number" name="DispatchNumber"><Input style={dirtyStyle("DispatchNumber")} /></Form.Item></Col>
						<Col span={8}><Form.Item label="Lab Code" name="LabCode"><Input style={dirtyStyle("LabCode")} /></Form.Item></Col>
						<Col span={8}><Form.Item label="Dispatch Status" name="DispatchStatus"><Select style={dirtyStyle("DispatchStatus")} options={DISPATCH_STATUS_OPTIONS.map(v => ({ value: v, label: v }))} /></Form.Item></Col>
					</Row>
					<Row gutter={16}>
						<Col span={8}><Form.Item label="Dispatched Date" name="DispatchedDt"><DatePicker className="w-full" style={dirtyStyle("DispatchedDt")} /></Form.Item></Col>
						<Col span={8}><Form.Item label="Priority" name="Priority"><Select style={dirtyStyle("Priority")} options={PRIORITY_OPTIONS.map(v => ({ value: v, label: v }))} /></Form.Item></Col>
						<Col span={8}><Form.Item label="Total Sample Count" name="TotalSampleCount"><InputNumber className="w-full" style={dirtyStyle("TotalSampleCount")} min={0} /></Form.Item></Col>
					</Row>
					<Row gutter={16}>
						<Col span={8}><Form.Item label="Submitted By" name="SubmittedBy"><Input style={dirtyStyle("SubmittedBy")} /></Form.Item></Col>
						<Col span={8}><Form.Item label="Authorized By" name="AuthorizedByName"><Input style={dirtyStyle("AuthorizedByName")} /></Form.Item></Col>
						<Col span={8}><Form.Item label="Courier Name" name="CourierName"><Input style={dirtyStyle("CourierName")} /></Form.Item></Col>
					</Row>
					<Row gutter={16}>
						<Col span={8}><Form.Item label="Certificate Required" name="CertificateInd" valuePropName="checked"><Switch /></Form.Item></Col>
						<Col span={8}><Form.Item label="Email Notification" name="EmailNotificationInd" valuePropName="checked"><Switch /></Form.Item></Col>
						<Col span={8}><Form.Item label="Web Notification" name="WebNotificationInd" valuePropName="checked"><Switch /></Form.Item></Col>
					</Row>
					<Form.Item label="Special Instructions" name="SpecialInstructions"><TextArea rows={4} style={dirtyStyle("SpecialInstructions")} /></Form.Item>
					<div className="flex justify-end">
						<Button onClick={handleReset}>Reset</Button>
					</div>
				</Form>
			</Card>
		</div>
	);
};
