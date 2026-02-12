<<<<<<< HEAD
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
=======
/**
 * Dispatch Form
 *
 * Singular form for managing sample dispatch to laboratories.
 * Shows dispatch details (lab, batch, shipping info) with AntD controls.
 *
 * @module drill-hole-data/sections/forms
 */

import React, { useCallback } from "react";

import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Select,
	Space,
	Table,
	Tag,
	Typography,
} from "antd";
import {
	PlusOutlined,
	SendOutlined,
	PrinterOutlined,
} from "@ant-design/icons";
import { useDrillHoleDataStore } from "../../store";

const { Title, Text } = Typography;

export const DispatchForm: React.FC = () => {
	const [form] = Form.useForm();
	const sections = useDrillHoleDataStore(state => state.sections);

	console.log("[DispatchForm] Rendering");

	// ========================================================================
	// Action Handlers
	// ========================================================================

	const handleCreateDispatch = useCallback(() => {
		console.log("[DispatchForm] Create Dispatch clicked");
		const values = form.getFieldsValue();
		console.log("[DispatchForm] Form values:", values);
	}, [form]);

	const handleSendDispatch = useCallback(() => {
		console.log("[DispatchForm] Send Dispatch clicked");
	}, []);

	const handlePrintLabels = useCallback(() => {
		console.log("[DispatchForm] Print Labels clicked");
	}, []);

	const handleLabChange = useCallback((value: string) => {
		console.log("[DispatchForm] Lab changed:", value);
	}, []);

	// ========================================================================
	// Sample summary for dispatch
	// ========================================================================

	const sampleData = sections?.allSamples?.data || [];
	const dispatchedCount = sampleData.filter((s: any) => s.DispatchId).length;
	const pendingCount = sampleData.length - dispatchedCount;

	// Mock dispatch history columns
	const dispatchHistoryColumns = [
		{ title: "Dispatch ID", dataIndex: "DispatchId", key: "DispatchId", width: 150 },
		{ title: "Laboratory", dataIndex: "Laboratory", key: "Laboratory", width: 150 },
		{ title: "Sample Count", dataIndex: "SampleCount", key: "SampleCount", width: 100, align: "right" as const },
		{ title: "Date Sent", dataIndex: "DateSent", key: "DateSent", width: 130 },
		{
			title: "Status",
			dataIndex: "Status",
			key: "Status",
			width: 100,
			render: (status: string) => (
				<Tag color={status === "Sent" ? "blue" : status === "Received" ? "green" : "default"}>
					{status || "Pending"}
				</Tag>
			),
		},
		{ title: "Tracking", dataIndex: "TrackingNumber", key: "TrackingNumber" },
	];

	return (
		<div className="flex-1 overflow-auto p-6 bg-slate-50">
			<Space direction="vertical" style={{ width: "100%" }} size="large">
				{/* Sample Summary */}
				<Card size="small">
					<Row gutter={24}>
						<Col span={6}>
							<Text type="secondary" className="text-xs block">Total Samples</Text>
							<Text strong className="text-lg">{sampleData.length}</Text>
						</Col>
						<Col span={6}>
							<Text type="secondary" className="text-xs block">Dispatched</Text>
							<Text strong className="text-lg text-green-600">{dispatchedCount}</Text>
						</Col>
						<Col span={6}>
							<Text type="secondary" className="text-xs block">Pending</Text>
							<Text strong className="text-lg text-orange-500">{pendingCount}</Text>
						</Col>
						<Col span={6} className="flex items-center justify-end">
							<Button
								type="primary"
								icon={<PlusOutlined />}
								onClick={handleCreateDispatch}
							>
								New Dispatch
							</Button>
						</Col>
					</Row>
				</Card>

				{/* New Dispatch Form */}
				<Card title="Create Dispatch" size="small">
					<Form form={form} layout="vertical" size="small">
						<Row gutter={16}>
							<Col span={8}>
								<Form.Item label="Laboratory" name="Laboratory">
									<Select
										placeholder="Select laboratory"
										onChange={handleLabChange}
										options={[
											{ label: "ALS Global", value: "ALS" },
											{ label: "SGS", value: "SGS" },
											{ label: "Bureau Veritas", value: "BV" },
											{ label: "Intertek", value: "INTERTEK" },
										]}
									/>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Dispatch Date" name="DispatchDate">
									<DatePicker style={{ width: "100%" }} />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Batch Reference" name="BatchRef">
									<Input placeholder="e.g., BATCH-001" />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={8}>
								<Form.Item label="Shipping Method" name="ShippingMethod">
									<Select
										placeholder="Select method"
										options={[
											{ label: "Courier", value: "Courier" },
											{ label: "Freight", value: "Freight" },
											{ label: "Hand Delivery", value: "Hand" },
										]}
									/>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Tracking Number" name="TrackingNumber">
									<Input placeholder="Tracking #" />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Comments" name="Comments">
									<Input.TextArea rows={1} placeholder="Notes..." />
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={24} className="flex justify-end">
								<Space>
									<Button
										icon={<PrinterOutlined />}
										onClick={handlePrintLabels}
									>
										Print Labels
									</Button>
									<Button
										type="primary"
										icon={<SendOutlined />}
										onClick={handleSendDispatch}
									>
										Send Dispatch
									</Button>
								</Space>
							</Col>
						</Row>
					</Form>
				</Card>

				{/* Dispatch History */}
				<Card title="Dispatch History" size="small">
					<Table
						columns={dispatchHistoryColumns}
						dataSource={[]}
						size="small"
						pagination={false}
						locale={{
							emptyText: (
								<div className="py-8 text-gray-400">
									<div className="text-lg mb-1">No dispatches yet</div>
									<div className="text-xs">Create a dispatch to send samples to a laboratory.</div>
								</div>
							),
						}}
					/>
				</Card>
			</Space>
>>>>>>> main
		</div>
	);
};
