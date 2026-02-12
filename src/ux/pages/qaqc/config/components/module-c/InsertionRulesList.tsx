import type { QcInsertionRule } from "#src/api/database/data-contracts";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";

import { Badge, Button, Card, Empty, List, message, Space, Typography } from "antd";
import React from "react";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";

const { Text } = Typography;

/**
 * Insertion Rules List Component
 *
 * Displays list of configured QC insertion rules.
 * Allows selection and provides actions for creating new rules.
 */
export function InsertionRulesList(): JSX.Element {
	const {
		insertionRules,
		selectInsertionRule,
		loadInsertionRules,
	} = useQaqcConfigStore();

	const handleRefresh = async () => {
		try {
			await loadInsertionRules();
			message.success("Insertion rules refreshed");
		}
		catch (error) {
			message.error("Failed to refresh insertion rules");
		}
	};

	const handleCreate = () => {
		// TODO: Implement create new insertion rule
		message.info("Create insertion rule not yet implemented");
	};

	const handleSelect = (rule: QcInsertionRule) => {
		selectInsertionRule(rule.QCInsertionRuleId);
	};

	return (
		<Card
			title="Insertion Rules"
			extra={(
				<Space>
					<Button
						icon={<ReloadOutlined />}
						onClick={handleRefresh}
						loading={insertionRules.loading}
						size="small"
					/>
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={handleCreate}
						size="small"
					>
						New Rule
					</Button>
				</Space>
			)}
			bodyStyle={{ padding: 0, height: "calc(100vh - 340px)", overflow: "auto" }}
		>
			{insertionRules.list.length === 0
				? (
					<Empty
						description="No insertion rules configured"
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						style={{ padding: "48px 24px" }}
					>
						<Button type="primary" onClick={handleCreate}>
							Create First Rule
						</Button>
					</Empty>
				)
				: (
					<List
						dataSource={insertionRules.list}
						renderItem={(rule) => {
							const isSelected = insertionRules.selected?.QCInsertionRuleId === rule.QCInsertionRuleId;

							return (
								<List.Item
									onClick={() => handleSelect(rule)}
									style={{
										cursor: "pointer",
										backgroundColor: isSelected ? "#e6f7ff" : "transparent",
										borderLeft: isSelected ? "3px solid #1890ff" : "3px solid transparent",
										padding: "12px 16px",
										transition: "all 0.2s",
									}}
								>
									<List.Item.Meta
										title={(
											<Space>
												<Text strong>{rule.Code}</Text>
												{!rule.ActiveInd && <Badge status="default" text="Inactive" />}
											</Space>
										)}
										description={(
											<Space direction="vertical" size={2} style={{ width: "100%" }}>
												<Text type="secondary" style={{ fontSize: "12px" }}>
													{rule.Description}
												</Text>
												<Text style={{ fontSize: "12px" }}>
													<strong>Lab:</strong>
													{" "}
													{rule.Laboratory}
													{" "}
													•
													{" "}
													<strong>Org:</strong>
													{" "}
													{rule.Organization}
												</Text>
												<Text style={{ fontSize: "12px" }}>
													<strong>Sample Interval:</strong>
													{" "}
													{rule.SampleIntervalSize}
													{rule.RackSize && ` • Rack: ${rule.RackSize}`}
												</Text>
											</Space>
										)}
									/>
								</List.Item>
							);
						}}
					/>
				)}
		</Card>
	);
}
