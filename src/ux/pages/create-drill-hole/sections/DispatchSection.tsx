/**
 * DispatchSection Component
 *
 * Manages sample dispatches to laboratories with form generation and printing.
 *
 * FEATURES:
 * - List view of all dispatches for current drill hole
 * - Detail view for creating/editing dispatches
 * - Sample selection modal with range selection
 * - Form generation and print preview
 * - Status workflow management
 *
 * PATTERNS:
 * - Follows existing section patterns (SectionWrapper, store integration)
 * - Hybrid form + grid layout
 * - Modal-based sample selection
 */

import { App, Button, Card, Checkbox, Col, Collapse, DatePicker, Descriptions, Form, Input, Modal, Row, Space, Statistic } from "antd";
import {
	ArrowLeftOutlined,
	FileTextOutlined,
	PlusOutlined,
	PrinterOutlined,
} from "@ant-design/icons";
import type { ColDef, SelectionChangedEvent } from "ag-grid-enterprise";
import type { LabDispatchData, SampleDispatchData } from "#src/types/drillhole";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { RowStatus, SectionKey } from "#src/types/drillhole";

import { AgGridReact } from "ag-grid-react";
import { LookupResolver } from "#src/services/lookupResolver";
import type { SampleData } from "../validation";
import { SectionMetadataPanel } from "../components/SectionMetadataPanel";
import { SectionWrapper } from "../components/SectionWrapper";
import { createEmptyLabDispatchData } from "../validation/dispatch-schemas";
import dayjs from "dayjs";
import { getCommonGridProps } from "#src/config/ag-grid-config";
import { useCreateDrillHoleStore } from "../store/create-drillhole-store";
import { useSectionActions } from "../hooks/useSectionActions";

const { Panel } = Collapse;
const { TextArea } = Input;

/**
 * Sample Selector Grid Component
 *
 * Extracted outside parent to prevent recreation on every render (which loses AG Grid state)
 */
interface SampleSelectorGridProps {
	samples: SampleData[]
	selectedSamples: SampleData[]
	onSelectionChange: (samples: SampleData[]) => void
}

const SampleSelectorGrid: React.FC<SampleSelectorGridProps> = React.memo(({ samples, selectedSamples, onSelectionChange }) => {
	const { message } = App.useApp();
	console.log("[DispatchSection] SampleSelectorGrid rendered - samples:", samples);
	console.log("[DispatchSection] SampleSelectorGrid rendered - samples.length:", samples.length);
	console.log("[DispatchSection] SampleSelectorGrid rendered - first 5 samples:", samples.slice(0, 5));

	const gridRef = useRef<AgGridReact<SampleData>>(null);
	const [rangeFrom, setRangeFrom] = useState<number | undefined>();
	const [rangeTo, setRangeTo] = useState<number | undefined>();

	// Column definitions for sample selector
	const columnDefs = useMemo<ColDef<SampleData>[]>(
		() => [
			{
				headerName: "Sample Name",
				field: "SampleNm",
				flex: 2,
				filter: "agTextColumnFilter",
				checkboxSelection: true,
				headerCheckboxSelection: true,
			},
			{
				headerName: "Depth From (m)",
				field: "DepthFrom",
				flex: 1,
				filter: "agNumberColumnFilter",
				valueFormatter: params =>
					params.value != null ? params.value.toFixed(2) : "",
			},
			{
				headerName: "Depth To (m)",
				field: "DepthTo",
				flex: 1,
				filter: "agNumberColumnFilter",
				valueFormatter: params =>
					params.value != null ? params.value.toFixed(2) : "",
			},
			{
				headerName: "Weight (kg)",
				field: "SampleWeight",
				flex: 1,
				filter: "agNumberColumnFilter",
				valueFormatter: params =>
					params.value != null ? params.value.toFixed(3) : "",
			},
			{
				headerName: "Sample Type",
				field: "SampleType",
				flex: 1,
				filter: "agTextColumnFilter",
			},
			{
				headerName: "Status",
				field: "RowStatus" as any,
				flex: 1,
				filter: "agTextColumnFilter",
			},
		],
		[],
	);

	// Handle selection change
	const handleSelectionChanged = useCallback(
		(event: SelectionChangedEvent<SampleData>) => {
			const selected = event.api.getSelectedRows();
			console.log("[SampleSelectorGrid] Selection changed:", selected);
			onSelectionChange(selected);
		},
		[onSelectionChange],
	);

	// Handle range selection
	const handleSelectRange = useCallback(() => {
		if (rangeFrom == null || rangeTo == null) {
			message.warning("Please enter both From and To depths");
			return;
		}

		if (rangeFrom >= rangeTo) {
			message.warning("From depth must be less than To depth");
			return;
		}

		const grid = gridRef.current;
		if (!grid?.api)
			return;

		// Select all samples in range
		grid.api.forEachNode((node) => {
			const sample = node.data;
			if (
				sample
				&& sample.DepthFrom >= rangeFrom
				&& sample.DepthTo <= rangeTo
			) {
				node.setSelected(true, false, "api");
			}
		});

		message.success(
			`Selected samples between ${rangeFrom}m and ${rangeTo}m`,
		);
	}, [rangeFrom, rangeTo, message]);

	// Calculate selection summary
	const selectionSummary = useMemo(() => {
		const count = selectedSamples.length;
		const totalWeight = selectedSamples.reduce(
			(sum, s) => sum + (s.SampleWeight || 0),
			0,
		);
		return { count, totalWeight };
	}, [selectedSamples]);

	return (
		<div>
			{/* Range Selection Controls */}
			<Card size="small" style={{ marginBottom: 8 }}>
				<Space>
					<span>Quick Select:</span>
					<Input
						type="number"
						placeholder="From Depth"
						value={rangeFrom}
						onChange={e => setRangeFrom(Number(e.target.value))}
						style={{ width: 120 }}
					/>
					<span>to</span>
					<Input
						type="number"
						placeholder="To Depth"
						value={rangeTo}
						onChange={e => setRangeTo(Number(e.target.value))}
						style={{ width: 120 }}
					/>
					<Button onClick={handleSelectRange}>Select Range</Button>
					<Button
						onClick={() => gridRef.current?.api.deselectAll()}
					>
						Clear Selection
					</Button>
				</Space>
			</Card>

			{/* Selection Summary */}
			<Card size="small" style={{ marginBottom: 8 }}>
				<Space size="large">
					<Statistic
						title="Available Samples"
						value={samples.length}
						valueStyle={{ fontSize: 16 }}
					/>
					<Statistic
						title="Selected Samples"
						value={selectionSummary.count}
						valueStyle={{ fontSize: 16, color: "#1890ff" }}
					/>
					<Statistic
						title="Total Weight"
						value={selectionSummary.totalWeight.toFixed(2)}
						suffix="kg"
						valueStyle={{ fontSize: 16, color: "#1890ff" }}
					/>
				</Space>
			</Card>

			{/* AG Grid */}
			<div style={{ height: 400, width: "100%" }}>
				{samples.length === 0
					? (
						<div
							style={{
								height: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								background: "#fafafa",
								border: "1px solid #d9d9d9",
								color: "#999",
							}}
						>
							No samples available for dispatch. Samples must be in Complete status.
						</div>
					)
					: (
						<AgGridReact<SampleData>
							ref={gridRef}
							rowData={samples}
							columnDefs={columnDefs}
							{...getCommonGridProps()}
							rowSelection="multiple"
							suppressRowClickSelection={true}
							onSelectionChanged={handleSelectionChanged}
							getRowId={params => params.data.SampleId}
							domLayout="normal"
						/>
					)}
			</div>
		</div>
	);
});

SampleSelectorGrid.displayName = "SampleSelectorGrid";

/**
 * DispatchSection Component
 *
 * Main dispatch management interface with list/detail views
 */
export const DispatchSection: React.FC = () => {
	// ============================================================================
	// Store Integration
	// ============================================================================

	const dispatchSection = useCreateDrillHoleStore(state => state.sections.dispatch);
	const sampleSection = useCreateDrillHoleStore(state => state.sections.sample);
	const updateSection = useCreateDrillHoleStore(state => state.updateSection);

	// Section actions (save, submit, reject, review, approve, exclude)
	const actions = useSectionActions(SectionKey.Dispatch);

	// Extract drill hole context
	const drillHoleId = useCreateDrillHoleStore(state => state.drillHoleId);
	const holeNm = useCreateDrillHoleStore(state => state.HoleNm);
	const organization = useCreateDrillHoleStore(state => state.Organization);

	const collarData = useCreateDrillHoleStore(state => state.sections.collar?.data);
	const drillPlanData = useCreateDrillHoleStore(state => state.sections.drillplan?.data);

	const { message } = App.useApp();

	// ============================================================================
	// Local State
	// ============================================================================

	const [viewMode, setViewMode] = useState<"list" | "detail">("list");
	const [currentDispatchId, setCurrentDispatchId] = useState<string | null>(null);
	const [showSampleSelector, setShowSampleSelector] = useState(false);
	const [selectedSamples, setSelectedSamples] = useState<SampleData[]>([]);
	const [showPrintPreview, setShowPrintPreview] = useState(false);

	// ============================================================================
	// Data Preparation
	// ============================================================================

	// Get all dispatches for this drill hole (dispatch data is array)
	const dispatches = useMemo(() => {
		const data = dispatchSection.data;
		if (!data)
			return [];
		return Array.isArray(data) ? data : [data];
	}, [dispatchSection.data]);

	// Get current dispatch being edited
	const currentDispatch = useMemo(() => {
		if (!currentDispatchId)
			return null;
		return dispatches.find(d => d.LabDispatchId === currentDispatchId);
	}, [currentDispatchId, dispatches]);

	// Get available samples (Complete status, not already in current dispatch)
	const availableSamples = useMemo(() => {
		const sampleData = sampleSection.data;
		console.log("[DispatchSection] availableSamples - sampleData:", sampleData);
		console.log("[DispatchSection] availableSamples - is array?", Array.isArray(sampleData));
		console.log("[DispatchSection] availableSamples - length:", sampleData?.length);

		if (!sampleData || !Array.isArray(sampleData)) {
			console.log("[DispatchSection] availableSamples - returning empty (no data or not array)");
			return [];
		}

		// Filter: Complete status, active, not in current dispatch
		const currentDispatchSampleIds = new Set(
			currentDispatch?.samples?.map((s: SampleDispatchData) => s.SampleId) || [],
		);
		console.log("[DispatchSection] availableSamples - currentDispatchSampleIds:", currentDispatchSampleIds);

		// Debug: Check sample statuses
		const samplesByStatus = sampleData.reduce((acc, s) => {
			const status = s.RowStatus || "undefined";
			acc[status] = (acc[status] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);
		console.log("[DispatchSection] availableSamples - samples by RowStatus:", samplesByStatus);

		const filtered = sampleData.filter(
			(sample) => {
				const isActive = sample.ActiveInd !== false;
				const isComplete = sample.RowStatus === RowStatus.Complete;
				const notInDispatch = !currentDispatchSampleIds.has(sample.SampleId);

				if (!isActive || !isComplete || !notInDispatch) {
					console.log(`[DispatchSection] Sample ${sample.SampleNm} filtered out:`, {
						isActive,
						isComplete,
						notInDispatch,
						actualStatus: sample.RowStatus,
					});
				}

				return isActive && isComplete && notInDispatch;
			},
		);

		console.log("[DispatchSection] availableSamples - filtered result count:", filtered.length);
		return filtered;
	}, [sampleSection.data, currentDispatch]);

	// ============================================================================
	// Handlers - Navigation
	// ============================================================================

	const handleBackToList = useCallback(() => {
		setCurrentDispatchId(null);
		setViewMode("list");
		setSelectedSamples([]);
	}, []);

	const handleSelectDispatch = useCallback((dispatchId: string) => {
		setCurrentDispatchId(dispatchId);
		setViewMode("detail");
	}, []);

	// ============================================================================
	// Handlers - Dispatch Operations
	// ============================================================================

	const handleCreateNewDispatch = useCallback(() => {
		console.log("[DispatchSection] handleCreateNewDispatch - clicked");
		console.log("[DispatchSection] handleCreateNewDispatch - sampleSection:", sampleSection);
		console.log("[DispatchSection] handleCreateNewDispatch - availableSamples count:", availableSamples.length);
		// Open sample selector for new dispatch
		setShowSampleSelector(true);
		setSelectedSamples([]);
	}, [sampleSection, availableSamples]);

	const handleSampleSelectionConfirm = useCallback(() => {
		if (selectedSamples.length === 0) {
			message.warning("Please select at least one sample");
			return;
		}

		// Create new dispatch with selected samples
		const newDispatch = {
			...createEmptyLabDispatchData(),
			CollarId: drillHoleId || "",
			HoleNm: holeNm || "",
			Organization: organization || "",
			TotalSampleCount: selectedSamples.length,
			TotalWeight: selectedSamples.reduce((sum, s) => sum + (s.SampleWeight || 0), 0),
			samples: selectedSamples.map((sample, index) => ({
				SampleDispatchId: crypto.randomUUID(),
				SampleId: sample.SampleId,
				LabDispatchId: "", // Will be set after dispatch save
				CollarId: drillHoleId || "",
				Organization: organization || "",
				SampleNm: sample.SampleNm,
				DepthFrom: sample.DepthFrom,
				DepthTo: sample.DepthTo,
				SampleWeight: sample.SampleWeight ?? undefined,
				SampleType: sample.SampleType ?? undefined,
				DispatchSequence: index + 1,
				ElementsOrMethodCodes: "",
				RushInd: false,
				DispatchStatus: "Pending",
				// Standard metadata
				ReportIncludeInd: true,
				ValidationStatus: 0 as 0 | 1 | 2,
				ValidationErrors: null,
				RowStatus: 0,
				SupersededById: null,
				ActiveInd: true,
				CreatedOnDt: new Date(),
				CreatedBy: "system",
				ModifiedOnDt: new Date(),
				ModifiedBy: "system",
				rv: "1",
			})),
		} as Partial<LabDispatchData>;

		// Add to dispatches array
		const updatedDispatches = [...dispatches, newDispatch as LabDispatchData];
		updateSection(SectionKey.Dispatch, updatedDispatches);

		// Switch to detail view
		setCurrentDispatchId(newDispatch.LabDispatchId!);
		setViewMode("detail");
		setShowSampleSelector(false);
		setSelectedSamples([]);

		message.success(`Created dispatch with ${selectedSamples.length} samples`);
	}, [
		selectedSamples,
		drillHoleId,
		holeNm,
		organization,
		dispatches,
		updateSection,
		message,
	]);

	// ============================================================================
	// Handlers - Print & Preview
	// ============================================================================

	const handleViewForm = useCallback(() => {
		if (!currentDispatch) {
			message.warning("No dispatch selected");
			return;
		}
		setShowPrintPreview(true);
	}, [currentDispatch, message]);

	const handlePrint = useCallback(() => {
		if (!currentDispatch) {
			message.warning("No dispatch selected");
			return;
		}
		// Will implement print service in Phase 5
		message.info("Print functionality coming in Phase 5");
	}, [currentDispatch, message]);

	// ============================================================================
	// Render - List View
	// ============================================================================

	const renderListView = () => (
		<Card
			title="Dispatch History"
			extra={(
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={handleCreateNewDispatch}
				>
					New Dispatch
				</Button>
			)}
		>
			{dispatches.length === 0
				? (
					<div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
						No dispatches found. Click "New Dispatch" to create one.
					</div>
				)
				: (
					<div>
						{dispatches.map(dispatch => (
							<Card
								key={dispatch.LabDispatchId}
								size="small"
								hoverable
								onClick={() => handleSelectDispatch(dispatch.LabDispatchId)}
								style={{ marginBottom: 8, cursor: "pointer" }}
							>
								<Descriptions column={4} size="small">
									<Descriptions.Item label="Dispatch #">
										{dispatch.DispatchNumber || "Auto-generated"}
									</Descriptions.Item>
									<Descriptions.Item label="Date">
										{dispatch.DispatchedDt}
									</Descriptions.Item>
									<Descriptions.Item label="Lab">
										{dispatch.LabCode}
									</Descriptions.Item>
									<Descriptions.Item label="Samples">
										{dispatch.TotalSampleCount || 0}
									</Descriptions.Item>
									<Descriptions.Item label="Status">
										{dispatch.DispatchStatus}
									</Descriptions.Item>
									<Descriptions.Item label="Submitted By">
										{dispatch.SubmittedBy}
									</Descriptions.Item>
								</Descriptions>
							</Card>
						))}
					</div>
				)}
		</Card>
	);

	// ============================================================================
	// Handlers - Form Updates
	// ============================================================================

	const handleDispatchFieldChange = useCallback(
		(field: keyof LabDispatchData, value: any) => {
			if (!currentDispatch)
				return;

			const updatedDispatch = {
				...currentDispatch,
				[field]: value,
			};

			// Update in dispatches array
			const updatedDispatches = dispatches.map(d =>
				d.LabDispatchId === currentDispatchId ? updatedDispatch : d,
			);

			updateSection(SectionKey.Dispatch, updatedDispatches);
		},
		[currentDispatch, currentDispatchId, dispatches, updateSection],
	);

	// ============================================================================
	// Render - Dispatch Form Card Component (Phase 3.3)
	// ============================================================================

	const DispatchFormCard: React.FC<{ data: LabDispatchData }> = ({ data }) => {
		const [form] = Form.useForm();

		// Get lab options from LookupResolver
		const labOptions = useMemo(() => {
			try {
				return LookupResolver.getOptions("Lab") || [];
			}
			catch {
				return [];
			}
		}, []);

		return (
			<Form form={form} layout="vertical" initialValues={data}>
				<Collapse defaultActiveKey={["header", "sampleTypes"]} bordered={false}>
					{/* Dispatch Header */}
					<Panel header="Dispatch Header" key="header">
						<Row gutter={16}>
							<Col span={8}>
								<Form.Item label="Dispatch Number">
									<Input value={data.DispatchNumber || "Auto-generated"} disabled />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Dispatched Date" required>
									<DatePicker
										value={data.DispatchedDt ? dayjs(data.DispatchedDt) : null}
										onChange={date =>
											handleDispatchFieldChange(
												"DispatchedDt",
												date?.format("YYYY-MM-DD"),
											)}
										style={{ width: "100%" }}
									/>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Lab" required>
									<Input
										value={data.LabCode}
										onChange={e =>
											handleDispatchFieldChange("LabCode", e.target.value)}
										placeholder="Lab code"
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={8}>
								<Form.Item label="Submitted By" required>
									<Input
										value={data.SubmittedBy}
										onChange={e =>
											handleDispatchFieldChange("SubmittedBy", e.target.value)}
									/>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Project">
									<Input
										value={String(data.ProjectNm || "")}
										onChange={e =>
											handleDispatchFieldChange("ProjectNm", e.target.value)}
									/>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Company">
									<Input value={data.Organization} disabled />
								</Form.Item>
							</Col>
						</Row>
					</Panel>

					{/* Sample Types */}
					<Panel header="Sample Types" key="sampleTypes">
						<Row gutter={16}>
							<Col span={8}>
								<Checkbox
									checked={data.SampleTypeRock}
									onChange={e =>
										handleDispatchFieldChange("SampleTypeRock", e.target.checked)}
								>
									Rock
								</Checkbox>
							</Col>
							<Col span={8}>
								<Checkbox
									checked={data.SampleTypeSediment}
									onChange={e =>
										handleDispatchFieldChange("SampleTypeSediment", e.target.checked)}
								>
									Sediment
								</Checkbox>
							</Col>
							<Col span={8}>
								<Checkbox
									checked={data.SampleTypeDrillCore}
									onChange={e =>
										handleDispatchFieldChange("SampleTypeDrillCore", e.target.checked)}
								>
									Drill Core
								</Checkbox>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={8}>
								<Checkbox
									checked={data.SampleTypeSoil}
									onChange={e =>
										handleDispatchFieldChange("SampleTypeSoil", e.target.checked)}
								>
									Soil
								</Checkbox>
							</Col>
							<Col span={8}>
								<Checkbox
									checked={data.SampleTypePercussion}
									onChange={e =>
										handleDispatchFieldChange("SampleTypePercussion", e.target.checked)}
								>
									Percussion
								</Checkbox>
							</Col>
							<Col span={8}>
								<Checkbox
									checked={!!data.SampleTypeOther}
									onChange={e =>
										handleDispatchFieldChange("SampleTypeOther", e.target.checked)}
								>
									Other
								</Checkbox>
							</Col>
						</Row>
					</Panel>

					{/* Analysis Details */}
					<Panel header="Analysis Details" key="analysis">
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label="Elements / Methods">
									<TextArea
										value={data.ElementsOrMethods}
										onChange={e =>
											handleDispatchFieldChange("ElementsOrMethods", e.target.value)}
										rows={2}
										placeholder="Enter analysis methods and elements"
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label="Special Instructions">
									<TextArea
										value={data.SpecialInstructions}
										onChange={e =>
											handleDispatchFieldChange("SpecialInstructions", e.target.value)}
										rows={2}
										placeholder="Any special handling or analysis instructions"
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={8}>
								<Checkbox
									checked={data.RushInd}
									onChange={e =>
										handleDispatchFieldChange("RushInd", e.target.checked)}
								>
									Rush / Priority Analysis
								</Checkbox>
							</Col>
						</Row>
					</Panel>

					{/* Pulp Instructions */}
					<Panel header="Pulp Instructions" key="pulp">
						<Row gutter={16}>
							<Col span={8}>
								<Checkbox
									checked={data.PulpReturnAllInd}
									onChange={e =>
										handleDispatchFieldChange("PulpReturnAllInd", e.target.checked)}
								>
									Return All Pulps
								</Checkbox>
							</Col>
							<Col span={8}>
								<Checkbox
									checked={data.PulpReturnAnomalousInd}
									onChange={e =>
										handleDispatchFieldChange(
											"PulpReturnAnomalousInd",
											e.target.checked,
										)}
								>
									Return Anomalous Only
								</Checkbox>
							</Col>
							<Col span={8}>
								<Checkbox
									checked={data.PulpReturnNoneInd}
									onChange={e =>
										handleDispatchFieldChange("PulpReturnNoneInd", e.target.checked)}
								>
									Return No Pulps
								</Checkbox>
							</Col>
						</Row>
					</Panel>

					{/* Reject Instructions */}
					<Panel header="Reject Instructions" key="reject">
						<Row gutter={16}>
							<Col span={8}>
								<Checkbox
									checked={data.RejectReturnAllInd}
									onChange={e =>
										handleDispatchFieldChange("RejectReturnAllInd", e.target.checked)}
								>
									Return All Rejects
								</Checkbox>
							</Col>
							<Col span={8}>
								<Checkbox
									checked={data.RejectReturnAnomalousInd}
									onChange={e =>
										handleDispatchFieldChange(
											"RejectReturnAnomalousInd",
											e.target.checked,
										)}
								>
									Return Anomalous Only
								</Checkbox>
							</Col>
							<Col span={8}>
								<Checkbox
									checked={data.RejectReturnNoneInd}
									onChange={e =>
										handleDispatchFieldChange("RejectReturnNoneInd", e.target.checked)}
								>
									Return No Rejects
								</Checkbox>
							</Col>
						</Row>
					</Panel>

					{/* Addresses */}
					<Panel header="Return & Invoice Addresses" key="addresses">
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label="Return Address">
									<TextArea
										value={data.ReturnAddress}
										onChange={e =>
											handleDispatchFieldChange("ReturnAddress", e.target.value)}
										rows={3}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item label="Copy To Address">
									<TextArea
										value={data.CopyToAddress}
										onChange={e =>
											handleDispatchFieldChange("CopyToAddress", e.target.value)}
										rows={2}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="Invoice To Address">
									<TextArea
										value={data.InvoiceToAddress}
										onChange={e =>
											handleDispatchFieldChange("InvoiceToAddress", e.target.value)}
										rows={2}
									/>
								</Form.Item>
							</Col>
						</Row>
					</Panel>

					{/* Authorization */}
					<Panel header="Authorization" key="authorization">
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item label="Authorized By" required>
									<Input
										value={data.AuthorizedByName}
										onChange={e =>
											handleDispatchFieldChange("AuthorizedByName", e.target.value)}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="Signature">
									<Input
										value={String(data.AuthorizedSignature || "")}
										onChange={e =>
											handleDispatchFieldChange(
												"AuthorizedSignature",
												e.target.value,
											)}
										placeholder="Electronic signature"
									/>
								</Form.Item>
							</Col>
						</Row>
					</Panel>

					{/* Certificates & Notifications */}
					<Panel header="Certificates & Notifications" key="notifications">
						<Row gutter={16}>
							<Col span={8}>
								<Checkbox
									checked={data.CertificateInd}
									onChange={e =>
										handleDispatchFieldChange("CertificateInd", e.target.checked)}
								>
									Request Certificate
								</Checkbox>
							</Col>
							<Col span={16}>
								<Form.Item label="Certificate Email">
									<Input
										value={data.CertificateEmail}
										onChange={e =>
											handleDispatchFieldChange("CertificateEmail", e.target.value)}
										type="email"
										placeholder="email@example.com"
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={8}>
								<Checkbox
									checked={data.WebNotificationInd}
									onChange={e =>
										handleDispatchFieldChange("WebNotificationInd", e.target.checked)}
								>
									Web Notification
								</Checkbox>
							</Col>
							<Col span={8}>
								<Checkbox
									checked={data.EmailNotificationInd}
									onChange={e =>
										handleDispatchFieldChange(
											"EmailNotificationInd",
											e.target.checked,
										)}
								>
									Email Notification
								</Checkbox>
							</Col>
							<Col span={8}>
								<Checkbox
									checked={data.FaxNotificationInd}
									onChange={e =>
										handleDispatchFieldChange("FaxNotificationInd", e.target.checked)}
								>
									Fax Notification
								</Checkbox>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item label="Email Address">
									<Input
										value={data.EmailAddress}
										onChange={e =>
											handleDispatchFieldChange("EmailAddress", e.target.value)}
										type="email"
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="Fax Number">
									<Input
										value={data.FaxNumber}
										onChange={e =>
											handleDispatchFieldChange("FaxNumber", e.target.value)}
									/>
								</Form.Item>
							</Col>
						</Row>
					</Panel>

					{/* Summary */}
					<Panel header="Dispatch Summary" key="summary">
						<Descriptions bordered column={2} size="small">
							<Descriptions.Item label="Total Samples">
								{data.TotalSampleCount || 0}
							</Descriptions.Item>
							<Descriptions.Item label="Total Weight">
								{(data.TotalWeight || 0).toFixed(2)}
								{" "}
								kg
							</Descriptions.Item>
							<Descriptions.Item label="Status">
								{data.DispatchStatus}
							</Descriptions.Item>
							<Descriptions.Item label="Hole Name">
								{data.HoleNm}
							</Descriptions.Item>
						</Descriptions>

						{/* Sample List */}
						{data.samples && data.samples.length > 0 && (
							<div style={{ marginTop: 16 }}>
								<h4>
									Selected Samples (
									{data.samples.length}
									)
								</h4>
								<div style={{ maxHeight: 200, overflow: "auto" }}>
									{data.samples.map((sample, index) => (
										<div
											key={sample.SampleId}
											style={{
												padding: "4px 8px",
												borderBottom: "1px solid #f0f0f0",
											}}
										>
											{index + 1}
											.
											{sample.SampleNm}
											{" "}
											(
											{sample.DepthFrom}
											m -
											{" "}
											{sample.DepthTo}
											m) -
											{sample.SampleWeight}
											kg
										</div>
									))}
								</div>
							</div>
						)}
					</Panel>
				</Collapse>
			</Form>
		);
	};

	// ============================================================================
	// Render - Detail View (With Form)
	// ============================================================================

	const renderDetailView = () => (
		<Card
			title={`Dispatch: ${currentDispatch?.DispatchNumber || "New Dispatch"}`}
			extra={(
				<Space>
					<Button icon={<ArrowLeftOutlined />} onClick={handleBackToList}>
						Back to List
					</Button>
					<Button icon={<FileTextOutlined />} onClick={handleViewForm}>
						View Form
					</Button>
					<Button icon={<PrinterOutlined />} onClick={handlePrint}>
						Print
					</Button>
				</Space>
			)}
		>
			{currentDispatch
				? (
					<DispatchFormCard data={currentDispatch} />
				)
				: (
					<div style={{ textAlign: "center", padding: 40, color: "#999" }}>
						No dispatch selected
					</div>
				)}
		</Card>
	);

	// ============================================================================
	// Render - Sample Selector Modal (With Grid)
	// ============================================================================

	const renderSampleSelectorModal = () => {
		console.log("[DispatchSection] renderSampleSelectorModal - showSampleSelector:", showSampleSelector);
		console.log("[DispatchSection] renderSampleSelectorModal - availableSamples:", availableSamples);
		console.log("[DispatchSection] renderSampleSelectorModal - availableSamples.length:", availableSamples.length);

		return (
			<Modal
				title="Select Samples for Dispatch"
				open={showSampleSelector}
				onOk={handleSampleSelectionConfirm}
				onCancel={() => {
					setShowSampleSelector(false);
					setSelectedSamples([]);
				}}
				width="90%"
				okText={`Create Dispatch (${selectedSamples.length} samples)`}
				cancelText="Cancel"
				okButtonProps={{ disabled: selectedSamples.length === 0 }}
			>
				<SampleSelectorGrid
					samples={availableSamples}
					selectedSamples={selectedSamples}
					onSelectionChange={setSelectedSamples}
				/>
			</Modal>
		);
	};

	// ============================================================================
	// Main Render
	// ============================================================================

	return (
		<SectionWrapper
			section={dispatchSection}
			title="Sample Dispatch"
			{...actions}
		>
			{viewMode === "list" ? renderListView() : renderDetailView()}

			{/* Sample Selector Modal */}
			{renderSampleSelectorModal()}

			{/* Print Preview Modal - Placeholder for Phase 5.3 */}
			<Modal
				title="Dispatch Form Preview"
				open={showPrintPreview}
				onCancel={() => setShowPrintPreview(false)}
				width="90%"
				footer={[
					<Button key="close" onClick={() => setShowPrintPreview(false)}>
						Close
					</Button>,
					<Button key="print" type="primary" icon={<PrinterOutlined />} onClick={handlePrint}>
						Print
					</Button>,
				]}
			>
				<div style={{ padding: 16, background: "#f5f5f5" }}>
					<p>
						<strong>Note:</strong>
						{" "}
						Print preview will be implemented in Phase 5
					</p>
					<p>Will include full dispatch form matching Excel template</p>
				</div>
			</Modal>

			{/* Metadata Panel */}
			{dispatchSection && <SectionMetadataPanel section={dispatchSection} />}
		</SectionWrapper>
	);
};
