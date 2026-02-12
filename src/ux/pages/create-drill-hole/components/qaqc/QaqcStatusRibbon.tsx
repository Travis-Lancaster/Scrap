/**
 * QaqcStatusRibbon Component
 *
 * Traffic light status indicator for drill hole QAQC validation
 * Displays PASS (green), FAIL (red), PENDING (yellow), or NO_DATA states
 */

import type { QaqcHoleStatus } from "#src/types/qaqc";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Descriptions, Space, Spin, Tag, Typography } from "antd";

const { Title, Text } = Typography;

interface QaqcStatusRibbonProps {
	status: QaqcHoleStatus | null
	loading: boolean
	error: Error | null
	element: string
	onViewDetails: () => void
}

export function QaqcStatusRibbon({
	status,
	loading,
	error,
	element,
	onViewDetails,
}: QaqcStatusRibbonProps): JSX.Element {
	// Loading state
	if (loading) {
		return (
			<Card className="qaqc-status-card">
				<div style={{ textAlign: "center", padding: "32px" }}>
					<Spin size="large" tip="Loading QAQC status..." />
				</div>
			</Card>
		);
	}

	// Error state
	if (error) {
		return (
			<Card className="qaqc-status-card">
				<Alert
					message="Error Loading QAQC Status"
					description={error.message}
					type="error"
					showIcon
				/>
			</Card>
		);
	}

	// No data
	if (!status) {
		return (
			<Card className="qaqc-status-card">
				<Alert
					message="No QAQC Data"
					description="No quality control data available for this drill hole"
					type="info"
					showIcon
				/>
			</Card>
		);
	}

	// Render based on status
	switch (status.status) {
		case "PASS":
			return <PassStatus status={status} element={element} onViewDetails={onViewDetails} />;

		case "FAIL":
			return <FailStatus status={status} element={element} onViewDetails={onViewDetails} />;

		case "PENDING":
			return <PendingStatus status={status} element={element} onViewDetails={onViewDetails} />;

		case "NO_QC":
			return <NoQcStatus status={status} element={element} />;

		case "NO_DATA":
		default:
			return <NoDataStatus element={element} />;
	}
}

// Pass Status Component
function PassStatus({ status, element, onViewDetails }: {
	status: QaqcHoleStatus
	element: string
	onViewDetails: () => void
}) {
	return (
		<Card
			className="qaqc-status-card status-pass"
			style={{
				background: "#f6ffed",
				border: "2px solid #52c41a",
			}}
		>
			<Space direction="vertical" size="large" style={{ width: "100%" }}>
				<div style={{ textAlign: "center" }}>
					<CheckCircleOutlined
						style={{
							fontSize: "64px",
							color: "#52c41a",
						}}
					/>
				</div>

				<Title level={4} style={{ textAlign: "center", margin: 0 }}>
					All batches passed QC
				</Title>

				<Text type="secondary" style={{ textAlign: "center", display: "block" }}>
					{status.totalBatchCount}
					{" "}
					{status.totalBatchCount === 1 ? "batch" : "batches"}
					{" "}
					processed, 0 failures
				</Text>

				<Descriptions size="small" column={2} bordered>
					<Descriptions.Item label="Element">
						<Tag color="blue">{element}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Last Validated">
						{status.latestBatchDate ? new Date(status.latestBatchDate).toLocaleString() : "N/A"}
					</Descriptions.Item>
					<Descriptions.Item label="Total QC Samples">
						{status.totalQCSamples}
					</Descriptions.Item>
					<Descriptions.Item label="Failed Samples">
						<Text strong style={{ color: "#52c41a" }}>0</Text>
					</Descriptions.Item>
				</Descriptions>

				<Button block onClick={onViewDetails}>
					View Details
				</Button>
			</Space>
		</Card>
	);
}

// Fail Status Component
function FailStatus({ status, element, onViewDetails }: {
	status: QaqcHoleStatus
	element: string
	onViewDetails: () => void
}) {
	return (
		<Card
			className="qaqc-status-card status-fail"
			style={{
				background: "#fff1f0",
				border: "2px solid #f5222d",
			}}
		>
			<Space direction="vertical" size="large" style={{ width: "100%" }}>
				<div style={{ textAlign: "center" }}>
					<CloseCircleOutlined
						style={{
							fontSize: "64px",
							color: "#f5222d",
							animation: "pulse 2s infinite",
						}}
					/>
				</div>

				<Title level={4} style={{ textAlign: "center", margin: 0, color: "#f5222d" }}>
					QC Failures Detected
				</Title>

				<Text type="danger" style={{ textAlign: "center", display: "block" }}>
					{status.details || `${status.failedBatchCount} ${status.failedBatchCount === 1 ? "batch" : "batches"} failed QC`}
				</Text>

				<Alert
					message="Action Required"
					description="Click 'View Details' to investigate failures and determine if re-assay is needed"
					type="error"
					showIcon
					icon={<ExclamationCircleOutlined />}
				/>

				<Descriptions size="small" column={2} bordered>
					<Descriptions.Item label="Element">
						<Tag color="blue">{element}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Failed Batches">
						<Tag color="red">
							{status.failedBatchCount}
							{" "}
							/
							{" "}
							{status.totalBatchCount}
						</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Failed QC Samples">
						<Text strong style={{ color: "#f5222d" }}>
							{status.totalFailedQC}
							{" "}
							/
							{status.totalQCSamples}
						</Text>
					</Descriptions.Item>
					<Descriptions.Item label="Failure Rate">
						<Tag color="red">
							{((status.totalFailedQC / status.totalQCSamples) * 100).toFixed(1)}
							%
						</Tag>
					</Descriptions.Item>
				</Descriptions>

				<Button
					type="primary"
					danger
					block
					icon={<ExclamationCircleOutlined />}
					onClick={onViewDetails}
					size="large"
				>
					View Details
				</Button>
			</Space>
		</Card>
	);
}

// Pending Status Component
function PendingStatus({ status, element, onViewDetails }: {
	status: QaqcHoleStatus
	element: string
	onViewDetails: () => void
}) {
	const pendingBatchCount = status.totalBatchCount - status.failedBatchCount;
	const completedPercent = status.totalBatchCount > 0
		? Math.round((1 - pendingBatchCount / status.totalBatchCount) * 100)
		: 0;

	return (
		<Card
			className="qaqc-status-card status-pending"
			style={{
				background: "#fffbe6",
				border: "2px solid #faad14",
			}}
		>
			<Space direction="vertical" size="large" style={{ width: "100%" }}>
				<div style={{ textAlign: "center" }}>
					<ClockCircleOutlined
						style={{
							fontSize: "64px",
							color: "#faad14",
						}}
					/>
				</div>

				<Title level={4} style={{ textAlign: "center", margin: 0 }}>
					QC Results Pending
				</Title>

				<Text type="warning" style={{ textAlign: "center", display: "block" }}>
					{status.details || `${pendingBatchCount} ${pendingBatchCount === 1 ? "batch" : "batches"} awaiting laboratory results`}
				</Text>

				<Descriptions size="small" column={2} bordered>
					<Descriptions.Item label="Element">
						<Tag color="blue">{element}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Total Batches">
						{status.totalBatchCount}
					</Descriptions.Item>
					<Descriptions.Item label="Pending Batches" span={2}>
						<Tag color="orange">{pendingBatchCount}</Tag>
					</Descriptions.Item>
				</Descriptions>

				<Button block onClick={onViewDetails}>
					View Details
				</Button>
			</Space>
		</Card>
	);
}

// No QC Status Component
function NoQcStatus({ status, element }: { status: QaqcHoleStatus, element: string }) {
	return (
		<Card
			className="qaqc-status-card status-no-qc"
			style={{
				background: "#fff7e6",
				border: "2px solid #fa8c16",
			}}
		>
			<Space direction="vertical" size="large" style={{ width: "100%" }}>
				<div style={{ textAlign: "center" }}>
					<WarningOutlined
						style={{
							fontSize: "64px",
							color: "#fa8c16",
						}}
					/>
				</div>

				<Title level={4} style={{ textAlign: "center", margin: 0 }}>
					No QC Samples Found
				</Title>

				<Alert
					message="Quality Control Issue"
					description="No QC samples (standards, blanks, or duplicates) were found in the batches for this hole. This may indicate an issue with sample submission."
					type="warning"
					showIcon
				/>

				<Descriptions size="small" column={2} bordered>
					<Descriptions.Item label="Element">
						<Tag color="blue">{element}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Total Batches">
						{status.totalBatchCount}
					</Descriptions.Item>
				</Descriptions>
			</Space>
		</Card>
	);
}

// No Data Status Component
function NoDataStatus({ element }: { element: string }) {
	return (
		<Card className="qaqc-status-card">
			<Space direction="vertical" size="large" style={{ width: "100%" }}>
				<div style={{ textAlign: "center" }}>
					<InfoCircleOutlined
						style={{
							fontSize: "64px",
							color: "#d9d9d9",
						}}
					/>
				</div>

				<Title level={4} style={{ textAlign: "center", margin: 0 }}>
					No Data Available
				</Title>

				<Text type="secondary" style={{ textAlign: "center", display: "block" }}>
					No samples found for this drill hole and element
				</Text>

				<Descriptions size="small" column={1} bordered>
					<Descriptions.Item label="Element">
						<Tag color="blue">{element}</Tag>
					</Descriptions.Item>
				</Descriptions>
			</Space>
		</Card>
	);
}

// Add pulse animation CSS (should be in global CSS or CSS module)
const styles = `
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
`;

// Inject styles
if (typeof document !== "undefined") {
	const styleElement = document.createElement("style");
	styleElement.textContent = styles;
	document.head.appendChild(styleElement);
}
