/**
 * Summary View
 * 
 * Dashboard-style summary of drill hole data.
 * 
 * @module drill-hole-data/views
 */

import React from "react";
import { Card, Statistic, Row, Col, Typography, Space } from "antd";
import { CheckCircleOutlined, FileTextOutlined, ExperimentOutlined, BarChartOutlined } from "@ant-design/icons";
import { useDrillHoleDataStore } from "../store";

const { Title, Text } = Typography;

export const SummaryView: React.FC = () => {
	const vwCollar = useDrillHoleDataStore(state => state.vwCollar);
	const vwDrillPlan = useDrillHoleDataStore(state => state.vwDrillPlan);
	const sections = useDrillHoleDataStore(state => state.sections);

	console.log("[SummaryView] 📊 Rendering Summary view");

	// Calculate statistics
	const geologyRowCount = sections.geologyCombinedLog?.data?.length || 0;
	const sampleCount = sections.allSamples?.data?.length || 0;
	const totalDepth = vwCollar?.TotalDepth || 0;
	const plannedDepth = vwCollar?.PlannedTotalDepth || 0;

	const completedSections = Object.values(sections).filter((s: any) => s.data?.RowStatus === 3).length;
	const totalSections = Object.keys(sections).length;

	return (
		<div className="p-6 space-y-6">
			<Title level={3}>Drill Hole Summary</Title>

			{/* Key Metrics */}
			<Row gutter={16}>
				<Col span={6}>
					<Card>
						<Statistic
							title="Current Depth"
							value={totalDepth}
							suffix="m"
							prefix={<BarChartOutlined />}
							valueStyle={{ color: totalDepth >= plannedDepth ? "#52c41a" : "#1890ff" }}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title="Planned Depth"
							value={plannedDepth}
							suffix="m"
							prefix={<BarChartOutlined />}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title="Geology Intervals"
							value={geologyRowCount}
							prefix={<FileTextOutlined />}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title="Samples"
							value={sampleCount}
							prefix={<ExperimentOutlined />}
						/>
					</Card>
				</Col>
			</Row>

			{/* Completion Status */}
			<Row gutter={16}>
				<Col span={12}>
					<Card title="Completion Progress">
						<Statistic
							title="Sections Approved"
							value={completedSections}
							suffix={`/ ${totalSections}`}
							prefix={<CheckCircleOutlined />}
							valueStyle={{ color: completedSections === totalSections ? "#52c41a" : "#1890ff" }}
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card title="Drill Progress">
						<Statistic
							title="Depth Progress"
							value={plannedDepth > 0 ? Math.round((totalDepth / plannedDepth) * 100) : 0}
							suffix="%"
							valueStyle={{ color: totalDepth >= plannedDepth ? "#52c41a" : "#1890ff" }}
						/>
					</Card>
				</Col>
			</Row>

			{/* Drill Hole Info */}
			{vwCollar && (
				<Card title="Drill Hole Information">
					<Space direction="vertical" style={{ width: "100%" }}>
						<Row gutter={16}>
							<Col span={8}>
								<Text strong>Hole Name:</Text> <Text>{vwCollar.HoleNm || "N/A"}</Text>
							</Col>
							<Col span={8}>
								<Text strong>Project:</Text> <Text>{vwCollar.Project || "N/A"}</Text>
							</Col>
							<Col span={8}>
								<Text strong>Status:</Text> <Text>{vwCollar.HoleStatus || "N/A"}</Text>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={8}>
								<Text strong>Started:</Text> <Text>{vwCollar.StartedOnDt ? new Date(vwCollar.StartedOnDt).toLocaleDateString() : "N/A"}</Text>
							</Col>
							<Col span={8}>
								<Text strong>Finished:</Text> <Text>{vwCollar.FinishedOnDt ? new Date(vwCollar.FinishedOnDt).toLocaleDateString() : "N/A"}</Text>
							</Col>
							<Col span={8}>
								<Text strong>Responsible:</Text> <Text>{vwCollar.ResponsiblePerson || "N/A"}</Text>
							</Col>
						</Row>
					</Space>
				</Card>
			)}
		</div>
	);
};
