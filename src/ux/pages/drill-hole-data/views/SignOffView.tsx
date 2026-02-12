/**
 * SignOff View
 * 
 * Final sign-off view displaying VwCollar data and section completion status.
 * 
 * @module drill-hole-data/views
 */

import React from "react";
import { Card, Descriptions, Badge, Progress, Space, Typography } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useDrillHoleDataStore } from "../store";
import { SectionKey } from "../types/data-contracts";

const { Title, Text } = Typography;

export const SignOffView: React.FC = () => {
	const vwCollar = useDrillHoleDataStore(state => state.vwCollar);
	const sections = useDrillHoleDataStore(state => state.sections);

	console.log("[SignOffView] 📋 Rendering SignOff view");

	// Calculate section completion
	const sectionStatus = Object.entries(sections).map(([key, section]: [string, any]) => ({
		name: key,
		isDirty: section.isDirty || false,
		rowStatus: section.data?.RowStatus || 0,
		isComplete: section.data?.RowStatus === 3, // Approved
	}));

	const completedCount = sectionStatus.filter(s => s.isComplete).length;
	const totalCount = sectionStatus.length;
	const completionPercent = Math.round((completedCount / totalCount) * 100);

	return (
		<div className="p-6 space-y-6">
			{/* Drill Hole Summary */}
			<Card title={<Title level={4}>Drill Hole Summary</Title>}>
				{vwCollar ? (
					<Descriptions bordered column={2}>
						<Descriptions.Item label="Hole ID">{vwCollar.HoleNm || vwCollar.PlannedHoleNm}</Descriptions.Item>
						<Descriptions.Item label="Organization">{vwCollar.Organization}</Descriptions.Item>
						<Descriptions.Item label="Project">{vwCollar.Project}</Descriptions.Item>
						<Descriptions.Item label="Status">{vwCollar.HoleStatus}</Descriptions.Item>
						<Descriptions.Item label="Total Depth">{vwCollar.TotalDepth || 0} m</Descriptions.Item>
						<Descriptions.Item label="Planned Depth">{vwCollar.PlannedTotalDepth || 0} m</Descriptions.Item>
						<Descriptions.Item label="Started">{vwCollar.StartedOnDt ? new Date(vwCollar.StartedOnDt).toLocaleDateString() : "N/A"}</Descriptions.Item>
						<Descriptions.Item label="Finished">{vwCollar.FinishedOnDt ? new Date(vwCollar.FinishedOnDt).toLocaleDateString() : "N/A"}</Descriptions.Item>
						<Descriptions.Item label="Validation Status">
							<Badge status={vwCollar.ValidationStatus === 1 ? "success" : "default"} 
								   text={vwCollar.ValidationStatus === 1 ? "Valid" : "Not Validated"} />
						</Descriptions.Item>
						<Descriptions.Item label="Approved">
							<Badge status={vwCollar.ApprovedInd ? "success" : "default"} 
								   text={vwCollar.ApprovedInd ? "Yes" : "No"} />
						</Descriptions.Item>
					</Descriptions>
				) : (
					<Text type="secondary">No collar data available</Text>
				)}
			</Card>

			{/* Section Completion Progress */}
			<Card title={<Title level={4}>Section Completion Status</Title>}>
				<Space direction="vertical" style={{ width: "100%" }} size="large">
					<div>
						<Text strong>Overall Progress</Text>
						<Progress 
							percent={completionPercent} 
							status={completionPercent === 100 ? "success" : "active"}
							format={() => `${completedCount}/${totalCount} sections approved`}
						/>
					</div>

					<Space direction="vertical" style={{ width: "100%" }}>
						{sectionStatus.map(section => (
							<div key={section.name} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
								<Text>{section.name}</Text>
								<Space>
									{section.isDirty && <Badge status="processing" text="Unsaved" />}
									{section.isComplete ? (
										<CheckCircleOutlined style={{ color: "#52c41a" }} />
									) : section.rowStatus === 1 ? (
										<ClockCircleOutlined style={{ color: "#1890ff" }} />
									) : (
										<CloseCircleOutlined style={{ color: "#d9d9d9" }} />
									)}
									<Text type="secondary">
										{section.rowStatus === 0 ? "Draft" :
										 section.rowStatus === 1 ? "Submitted" :
										 section.rowStatus === 2 ? "Reviewed" :
										 section.rowStatus === 3 ? "Approved" : "Rejected"}
									</Text>
								</Space>
							</div>
						))}
					</Space>
				</Space>
			</Card>
		</div>
	);
};
