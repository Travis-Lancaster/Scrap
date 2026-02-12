/**
 * Standard Form Component
 *
 * Modal form for creating or editing reference materials
 */

import type {
	CreateQcReferenceDto,
	CreateQcReferenceValueDto,
	QcReference,
	QcReferenceValue,
} from "#src/api/database/data-contracts";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
	Alert,
	Button,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	message,
	Modal,
	Row,
	Select,
	Table,
} from "antd";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";

// UI-specific type for the editable table
interface ReferenceElementRow {
	element: string
	genericMethod: string
	expectedValue: number
	expectedStDev: number
	units: string
	active: boolean
	valueType?: string
}

// Lookup option type
interface LookupOption {
	value: string
	label: string
}

// TODO: Import and use LookupResolver when ready
// import { useQaqcLookups } from '#src/pages/qaqc/hooks/useQaqcLookups';

const { Option } = Select;

interface StandardFormProps {
	open: boolean
	onClose: () => void
	editingData?: {
		standard: QcReference
		values: QcReferenceValue[]
	} | null
}

export function StandardForm({
	open,
	onClose,
	editingData = null,
}: StandardFormProps): JSX.Element {
	const [form] = Form.useForm();
	const [elementValues, setElementValues] = useState<ReferenceElementRow[]>([]);
	const [submitting, setSubmitting] = useState(false);

	const saveStandard = useQaqcConfigStore(state => state.saveStandard);
	const setDirtyState = useQaqcConfigStore(state => state.setDirtyState);

	// TODO: Load dynamic lookups from LookupResolver
	// For now, use placeholder data until LookupResolver is integrated
	const elements: LookupOption[] = [
		{ value: "Au", label: "Au" },
		{ value: "Ag", label: "Ag" },
		{ value: "Cu", label: "Cu" },
	];
	const methods: LookupOption[] = [
		{ value: "FA50", label: "FA50" },
		{ value: "ICP", label: "ICP" },
	];
	const units: LookupOption[] = [
		{ value: "ppm", label: "ppm" },
		{ value: "%", label: "%" },
		{ value: "g/t", label: "g/t" },
	];
	const standardTypes: LookupOption[] = [
		{ value: "CRM", label: "Certified Reference Material" },
		{ value: "IRM", label: "In-House Reference Material" },
		{ value: "BLK", label: "Blank Material" },
		{ value: "DUP", label: "Duplicate Standard" },
	];
	const lookupsLoading = false;

	const isEdit = !!editingData;

	// Initialize form when editing
	useEffect(() => {
		if (open && editingData) {
			form.setFieldsValue({
				standardId: editingData.standard.StandardId,
				standardType: editingData.standard.StandardType,
				supplier: editingData.standard.Supplier,
				dateReceived: editingData.standard.Date_Received
					? dayjs(editingData.standard.Date_Received)
					: null,
			});

			setElementValues(
				editingData.values.map(v => ({
					element: v.Element || "",
					genericMethod: v.GenericMethod || "",
					expectedValue: v.ExpectedValue || 0,
					expectedStDev: v.ExpectedStDev || 0,
					units: v.Units || "",
					active: v.Preferred === 1,
					valueType: v.ValueType || "NR",
				})),
			);
		}
		else if (open) {
			// Reset for new standard
			form.resetFields();
			setElementValues([]);
		}
	}, [open, editingData, form]);

	const handleAddElement = () => {
		setElementValues([
			...elementValues,
			{
				element: "Au",
				genericMethod: "FA50",
				expectedValue: 0,
				expectedStDev: 0,
				units: "ppm",
				active: true,
			},
		]);
		setDirtyState("A", true);
	};

	const handleRemoveElement = (index: number) => {
		setElementValues(elementValues.filter((_, i) => i !== index));
		setDirtyState("A", true);
	};

	const handleUpdateElement = (index: number, field: keyof ReferenceElementRow, value: any) => {
		const updated = [...elementValues];
		updated[index] = { ...updated[index], [field]: value };
		setElementValues(updated);
		setDirtyState("A", true);
	};

	const handleSubmit = async () => {
		try {
			await form.validateFields();

			if (elementValues.length === 0) {
				message.error("Please add at least one element value");
				return;
			}

			const values = form.getFieldsValue();

			const standard: CreateQcReferenceDto = {
				StandardId: values.standardId,
				StandardType: values.standardType,
				Supplier: values.supplier || undefined,
				Date_Received: values.dateReceived ? values.dateReceived.format("YYYY-MM-DD") : undefined,
			};

			const referenceValues: CreateQcReferenceValueDto[] = elementValues.map(
				(ev): CreateQcReferenceValueDto => ({
					StandardId: values.standardId,
					Element: ev.element,
					GenericMethod: ev.genericMethod,
					Units: ev.units,
					ValueType: ev.valueType || "NR",
					ExpectedValue: ev.expectedValue,
					ExpectedStDev: ev.expectedStDev,
					ExpectedOutlier: undefined,
					Preferred: ev.active ? 1 : 0,
				}),
			);

			setSubmitting(true);

			await saveStandard(standard, referenceValues);

			message.success(
				isEdit
					? `Standard ${standard.StandardId} updated successfully`
					: `Standard ${standard.StandardId} created successfully`,
			);

			onClose();
		}
		catch (error) {
			console.error("Form validation or save failed:", error);
			if (error instanceof Error) {
				message.error(error.message);
			}
		}
		finally {
			setSubmitting(false);
		}
	};

	const elementColumns = [
		{
			title: "Element",
			dataIndex: "element",
			key: "element",
			width: 120,
			render: (_: any, record: ReferenceElementRow, index: number) => (
				<Select
					value={record.element}
					onChange={value => handleUpdateElement(index, "element", value)}
					style={{ width: "100%" }}
					loading={lookupsLoading}
				>
					{elements.map((el: LookupOption) => (
						<Option key={el.value} value={el.value}>{el.label}</Option>
					))}
				</Select>
			),
		},
		{
			title: "Method",
			dataIndex: "genericMethod",
			key: "genericMethod",
			width: 140,
			render: (_: any, record: ReferenceElementRow, index: number) => (
				<Select
					value={record.genericMethod}
					onChange={value => handleUpdateElement(index, "genericMethod", value)}
					style={{ width: "100%" }}
					loading={lookupsLoading}
				>
					{methods.map((method: LookupOption) => (
						<Option key={method.value} value={method.value}>{method.label}</Option>
					))}
				</Select>
			),
		},
		{
			title: "Expected Value",
			dataIndex: "expectedValue",
			key: "expectedValue",
			width: 140,
			render: (_: any, record: ReferenceElementRow, index: number) => (
				<InputNumber
					value={record.expectedValue}
					onChange={value => handleUpdateElement(index, "expectedValue", value || 0)}
					precision={4}
					style={{ width: "100%" }}
					placeholder="0.0000"
				/>
			),
		},
		{
			title: "Std Dev (σ)",
			dataIndex: "expectedStDev",
			key: "expectedStDev",
			width: 140,
			render: (_: any, record: ReferenceElementRow, index: number) => (
				<InputNumber
					value={record.expectedStDev}
					onChange={value => handleUpdateElement(index, "expectedStDev", value || 0)}
					precision={4}
					style={{ width: "100%" }}
					placeholder="0.0000"
				/>
			),
		},
		{
			title: "Units",
			dataIndex: "units",
			key: "units",
			width: 100,
			render: (_: any, record: ReferenceElementRow, index: number) => (
				<Select
					value={record.units}
					onChange={value => handleUpdateElement(index, "units", value)}
					style={{ width: "100%" }}
					loading={lookupsLoading}
				>
					{units.map((unit: LookupOption) => (
						<Option key={unit.value} value={unit.value}>{unit.label}</Option>
					))}
				</Select>
			),
		},
		{
			title: "Action",
			key: "action",
			width: 80,
			render: (_: any, record: ReferenceElementRow, index: number) => (
				<Button
					danger
					size="small"
					icon={<DeleteOutlined />}
					onClick={() => handleRemoveElement(index)}
				/>
			),
		},
	];

	return (
		<Modal
			title={isEdit ? `Edit Standard: ${editingData?.standard.StandardId}` : "Add New Reference Material"}
			open={open}
			onCancel={onClose}
			width={900}
			footer={[
				<Button key="cancel" onClick={onClose}>
					Cancel
				</Button>,
				<Button
					key="submit"
					type="primary"
					loading={submitting}
					onClick={handleSubmit}
				>
					{isEdit ? "Update Standard" : "Create Standard"}
				</Button>,
			]}
		>
			<Form form={form} layout="vertical">
				{/* Basic Information */}
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label="Standard Code"
							name="standardId"
							rules={[
								{ required: true, message: "Standard code is required" },
								{ pattern: /^[A-Z0-9-]+$/, message: "Use uppercase, numbers, and hyphens only" },
							]}
							tooltip="Unique identifier (e.g., OREAS-45e, BLANK-01)"
						>
							<Input placeholder="OREAS-45e" disabled={isEdit} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="Standard Type"
							name="standardType"
							initialValue="CRM"
							rules={[{ required: true }]}
						>
							<Select loading={lookupsLoading}>
								{standardTypes.map((type: LookupOption) => (
									<Option key={type.value} value={type.value}>{type.label}</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label="Supplier" name="supplier">
							<Input placeholder="OREAS Certified Standards" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Date Received" name="dateReceived">
							<DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
						</Form.Item>
					</Col>
				</Row>

				{/* Element Values Section */}
				<Form.Item label="Element Values">
					<Alert
						message="Define expected values for each element and analytical method"
						description="These values will be used to evaluate QC performance and calculate Z-scores"
						type="info"
						showIcon
						style={{ marginBottom: 16 }}
					/>

					<Table
						dataSource={elementValues}
						columns={elementColumns}
						rowKey={(_, index) => String(index)}
						pagination={false}
						size="small"
						locale={{
							emptyText: "No element values added yet",
						}}
					/>

					<Button
						type="dashed"
						block
						icon={<PlusOutlined />}
						onClick={handleAddElement}
						style={{ marginTop: 8 }}
					>
						Add Element Value
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}
