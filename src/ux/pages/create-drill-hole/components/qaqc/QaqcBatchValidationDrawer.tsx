/**
 * QaqcBatchValidationDrawer Component
 *
 * Detailed validation drawer showing batch summary and failed samples
 */

import type { QaqcBatchSummary, QaqcDetailedSample } from "#src/types/qaqc";
import { CheckOutlined, ExclamationCircleOutlined, ExperimentOutlined, ExportOutlined, ReloadOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Drawer, message, Modal, Space, Spin, Tag } from "antd";
import { useState } from "react";
import { useQaqcValidation } from "../../hooks/useQaqcValidation";
import { QaqcBatchSummaryGrid } from "./QaqcBatchSummaryGrid";
import { QaqcFailedSamplesGrid } from "./QaqcFailedSamplesGrid";

interface QaqcBatchValidationDrawerProps {
	open: boolean
	onClose: () => void
	collarId: string | undefined
	element: string
	holeNm?: string
}

export function QaqcBatchValidationDrawer({
	open,
	onClose,
	collarId,
	element,
	holeNm,
}: QaqcBatchValidationDrawerProps): JSX.Element {
	const [selectedBatch, setSelectedBatch] = useState<QaqcBatchSummary | null>(null);

	// Fetch validation data
	const { validation, loading, error, refetch } = useQaqcValidation(
		collarId,
		element,
		{
			enabled: open && Boolean(collarId),
		},
	);

	// Filter failed samples
	const failedSamples = validation?.details.filter(
		sample => sample.qcStatus === "FAIL" || sample.qcStatus === "FAIL_HIGH",
	) || [];

	// Filter failed samples for selected batch
	const batchFailedSamples = selectedBatch
		? failedSamples.filter(sample => sample.batchNo === selectedBatch.batchNo)
		: failedSamples;

	const handleViewChart = (sample: QaqcDetailedSample) => {
		// TODO: Open Shewhart chart modal
		message.info(`View chart for ${sample.sampleNm}`);
	};

	const handleReassaySample = (sample: QaqcDetailedSample) => {
		Modal.confirm({
			title: "Request Re-assay",
			content: `Request re-assay for sample ${sample.sampleNm}?`,
			okText: "Request",
			cancelText: "Cancel",
			onOk: () => {
				// TODO: Implement re-assay request
				message.success(`Re-assay requested for ${sample.sampleNm}`);
			},
		});
	};

	const handleReassayAll = () => {
		Modal.confirm({
			title: "Request Re-assay for All Failed Samples",
			content: `Request re-assay for ${batchFailedSamples.length} failed samples?`,
			okText: "Request All",
			cancelText: "Cancel",
			okType: "danger",
			onOk: () => {
				// TODO: Implement bulk re-assay request
				message.success(`Re-assay requested for ${batchFailedSamples.length} samples`);
			},
		});
	};

	const handleSignOff = () => {
		Modal.confirm({
			title: "Sign-off QAQC Review",
			content: "Sign-off this QAQC validation with comments?",
			okText: "Sign-off",
			cancelText: "Cancel",
			onOk: () => {
				// TODO: Implement sign-off workflow
				message.success("QAQC validation signed-off");
			},
		});
	};

	const handleExport = () => {
		// TODO: Implement export functionality
		message.info("Export functionality coming soon");
	};

	return (
		<Drawer
			title={`QAQC Batch Validation - ${holeNm || "Drill Hole"} (${element})`}
			placement="right"
			width="80%"
			onClose={onClose}
			open={open}
			extra={(
				<Space>
					<Button
						icon={<ExportOutlined />}
						onClick={handleExport}
					>
						Export Report
					</Button>
					<Button
						icon={<ReloadOutlined />}
						onClick={refetch}
						loading={loading}
					>
						Refresh
					</Button>
				</Space>
			)}
		>
			{loading && (
				<div style={{ textAlign: "center", padding: "48px" }}>
					<Spin size="large" tip="Loading validation data..." />
				</div>
			)}

			{error && (
				<Alert
					message="Error Loading Validation Data"
					description={error.message}
					type="error"
					showIcon
					style={{ marginBottom: 24 }}
				/>
			)}

			{validation && !loading && (
				<>
					{/* Summary Alert */}
					{failedSamples.length > 0
						? (
							<Alert
								message="QC Failures Detected"
								description={`${failedSamples.length} QC samples failed validation. Review the details below and determine if re-assay is required.`}
								type="error"
								showIcon
								icon={<ExclamationCircleOutlined />}
								style={{ marginBottom: 24 }}
							/>
						)
						: (
							<Alert
								message="All QC Passed"
								description="All QC samples passed validation. No action required."
								type="success"
								showIcon
								style={{ marginBottom: 24 }}
							/>
						)}

					{/* Batch Summary Section */}
					<Card
						title="Batch Summary"
						style={{ marginBottom: 24 }}
						extra={
							selectedBatch && (
								<Button
									size="small"
									onClick={() => setSelectedBatch(null)}
								>
									Clear Selection
								</Button>
							)
						}
					>
						<QaqcBatchSummaryGrid
							batches={validation.batches}
							onRowClick={setSelectedBatch}
						/>
						{selectedBatch && (
							<Tag
								color="blue"
								style={{ marginTop: 16 }}
							>
								Showing failures for Batch
								{" "}
								{selectedBatch.batchNo}
							</Tag>
						)}
					</Card>

					{/* Failed QC Samples Section */}
					{batchFailedSamples.length > 0 && (
						<Card
							title={`Failed QC Samples (${batchFailedSamples.length})`}
							extra={(
								<Tag color="red">
									Requires Investigation
								</Tag>
							)}
							style={{ marginBottom: 24 }}
						>
							<QaqcFailedSamplesGrid
								samples={batchFailedSamples}
								onViewChart={handleViewChart}
								onReassaySample={handleReassaySample}
							/>
						</Card>
					)}

					{/* Action Buttons */}
					<Space style={{ marginTop: 24 }}>
						{failedSamples.length > 0 && (
							<Button
								type="primary"
								danger
								icon={<ExperimentOutlined />}
								onClick={handleReassayAll}
							>
								Request Re-assay for All Failed Samples
							</Button>
						)}
						<Button
							icon={<CheckOutlined />}
							onClick={handleSignOff}
						>
							Sign-off with Comments
						</Button>
					</Space>
				</>
			)}
		</Drawer>
	);
}
