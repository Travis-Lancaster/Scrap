/**
 * QaqcFailureLog Component
 *
 * Right sidebar displaying active QC failures with action buttons
 */

import type { QaqcFailure } from "#src/types/qaqc";
import { CheckOutlined, ClockCircleOutlined, ExclamationCircleOutlined, ExperimentOutlined } from "@ant-design/icons";
import { Alert, Avatar, Badge, Button, Card, Divider, Empty, List, message, Modal, Space, Spin, Tag, Typography } from "antd";
import { useQaqcFailures } from "../../hooks/useQaqcFailures";

const { Text } = Typography;

interface QaqcFailureLogProps {
	onReviewFailure?: (failure: QaqcFailure) => void
}

export function QaqcFailureLog({ onReviewFailure }: QaqcFailureLogProps): JSX.Element {
	// Fetch failures with 2-minute polling
	const { failures, loading, error, refetch } = useQaqcFailures({
		enabled: true,
		refetchInterval: 120000, // 2 minutes
	});

	// Separate active and under review
	const activeFailures = failures.filter(f => f.status === "ACTIVE");
	const underReview = failures.filter(f => f.status === "UNDER_REVIEW");

	const handleReview = (failure: QaqcFailure) => {
		if (onReviewFailure) {
			onReviewFailure(failure);
		}
		else {
			// Default behavior
			message.info(`Review failure for Batch ${failure.batchNo}`);
		}
	};

	const handleSignOff = (failure: QaqcFailure) => {
		Modal.confirm({
			title: "Sign-off Failure",
			content: `Sign-off QC failure for Batch ${failure.batchNo} (${failure.labCode})?`,
			okText: "Sign-off",
			cancelText: "Cancel",
			onOk: () => {
				// TODO: Implement sign-off API call
				message.success(`Batch ${failure.batchNo} signed-off`);
			},
		});
	};

	const handleRequestReassay = (failure: QaqcFailure) => {
		Modal.confirm({
			title: "Request Re-assay",
			content: `Request re-assay for ${failure.failCount} failed samples in Batch ${failure.batchNo}?`,
			okText: "Request",
			okType: "danger",
			cancelText: "Cancel",
			onOk: () => {
				// TODO: Implement re-assay request API call
				message.success(`Re-assay requested for Batch ${failure.batchNo}`);
			},
		});
	};

	if (loading && failures.length === 0) {
		return (
			<div style={{ textAlign: "center", padding: "48px 16px" }}>
				<Spin tip="Loading failures..." />
			</div>
		);
	}

	if (error) {
		return (
			<Alert
				message="Error Loading Failures"
				description={error.message}
				type="error"
				showIcon
				style={{ margin: 16 }}
			/>
		);
	}

	return (
		<div className="qaqc-failure-log" style={{ height: "100%", overflow: "auto" }}>
			{/* Active Failures */}
			<Card
				title="Active Failures"
				size="small"
				extra={(
					<Badge
						count={activeFailures.length}
						style={{ backgroundColor: "#f5222d" }}
					/>
				)}
				style={{ marginBottom: 16 }}
			>
				{activeFailures.length === 0
					? (
						<Empty
							description="No active failures"
							image={Empty.PRESENTED_IMAGE_SIMPLE}
						/>
					)
					: (
						<List
							dataSource={activeFailures}
							renderItem={failure => (
								<List.Item
									style={{
										padding: 12,
										background: "#fff1f0",
										marginBottom: 8,
										borderRadius: 4,
										border: "1px solid #ffccc7",
									}}
								>
									<List.Item.Meta
										avatar={(
											<Avatar
												style={{ backgroundColor: "#f5222d" }}
												icon={<ExclamationCircleOutlined />}
											/>
										)}
										title={(
											<Space>
												<Tag color="red">
													Batch
													{failure.batchNo}
												</Tag>
												<Text strong>{failure.labCode}</Text>
											</Space>
										)}
										description={(
											<div>
												<Text type="secondary">{failure.element}</Text>
												<Divider type="vertical" />
												<Text type="danger">
													{failure.failCount}
													{" "}
													failed
													{failure.failCount === 1 ? "sample" : "samples"}
												</Text>
												<div style={{ marginTop: 8 }}>
													{failure.failedStandards.map((std: string) => (
														<Tag key={std} color="red" style={{ marginBottom: 4 }}>
															{std}
														</Tag>
													))}
												</div>
											</div>
										)}
									/>
									<Space direction="vertical" size="small">
										<Button
											size="small"
											type="primary"
											danger
											block
											onClick={() => handleReview(failure)}
										>
											Review
										</Button>
										<Button
											size="small"
											icon={<CheckOutlined />}
											block
											onClick={() => handleSignOff(failure)}
										>
											Sign-off
										</Button>
										<Button
											size="small"
											icon={<ExperimentOutlined />}
											block
											onClick={() => handleRequestReassay(failure)}
										>
											Re-assay
										</Button>
									</Space>
								</List.Item>
							)}
						/>
					)}
			</Card>

			{/* Under Review */}
			<Card
				title="Under Review"
				size="small"
				extra={(
					<Badge
						count={underReview.length}
						style={{ backgroundColor: "#faad14" }}
					/>
				)}
			>
				{underReview.length === 0
					? (
						<Empty
							description="No items under review"
							image={Empty.PRESENTED_IMAGE_SIMPLE}
						/>
					)
					: (
						<List
							dataSource={underReview}
							renderItem={failure => (
								<List.Item
									style={{
										padding: 12,
										background: "#fffbe6",
										marginBottom: 8,
										borderRadius: 4,
										border: "1px solid #ffe58f",
									}}
								>
									<List.Item.Meta
										avatar={(
											<Avatar
												style={{ backgroundColor: "#faad14" }}
												icon={<ClockCircleOutlined />}
											/>
										)}
										title={`Batch ${failure.batchNo} - ${failure.labCode}`}
										description={(
											<div>
												<Text type="secondary">
													Reviewed by:
													{" "}
													{failure.reviewedBy || "Unknown"}
												</Text>
												<br />
												<Text type="secondary">
													{failure.reviewedAt
														? new Date(failure.reviewedAt).toLocaleString()
														: "Date unknown"}
												</Text>
												{failure.comments && (
													<>
														<br />
														<Text type="secondary" italic>
															"
															{failure.comments}
															"
														</Text>
													</>
												)}
											</div>
										)}
									/>
									<Button
										size="small"
										onClick={() => handleReview(failure)}
									>
										View
									</Button>
								</List.Item>
							)}
						/>
					)}
			</Card>
		</div>
	);
}
