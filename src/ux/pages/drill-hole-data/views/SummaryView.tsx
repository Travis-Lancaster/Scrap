/**
 * Summary View
 * 
 * Dashboard-style summary of drill hole data.
 * 
 * @module drill-hole-data/views
 */

import React, { useMemo } from "react";
import { Card, Statistic, Row, Col, Typography, Space, Progress, Table, Tag } from "antd";
import { CheckCircleOutlined, FileTextOutlined, ExperimentOutlined, BarChartOutlined } from "@ant-design/icons";
import { useDrillHoleDataStore } from "../store";

const { Title, Text } = Typography;

export const SummaryView: React.FC = () => {
	const vwCollar = useDrillHoleDataStore(state => state.vwCollar);
	const sections = useDrillHoleDataStore(state => state.sections);

	console.log("[SummaryView] 📊 Rendering Summary view");

	const sectionProgress = useMemo(() => {
		return Object.entries(sections).map(([key, section]: [string, any]) => {
			const isArray = Array.isArray(section.data);
			const rows = isArray ? section.data : section.data ? [section.data] : [];
			const activeRows = rows.filter((r: any) => r?.ActiveInd !== false);
			const approvedRows = activeRows.filter((r: any) => Number(r?.RowStatus ?? 0) >= 3);
			const submittedRows = activeRows.filter((r: any) => Number(r?.RowStatus ?? 0) >= 1);
			const percent = activeRows.length > 0 ? Math.round((approvedRows.length / activeRows.length) * 100) : 0;
			return {
				key,
				section: key,
				rows: activeRows.length,
				submitted: submittedRows.length,
				approved: approvedRows.length,
				percent,
				isDirty: !!section.isDirty,
			};
		});
	}, [sections]);

	const totalRows = sectionProgress.reduce((acc, s) => acc + s.rows, 0);
	const totalApproved = sectionProgress.reduce((acc, s) => acc + s.approved, 0);
	const totalSubmitted = sectionProgress.reduce((acc, s) => acc + s.submitted, 0);
	const completionPercent = totalRows > 0 ? Math.round((totalApproved / totalRows) * 100) : 0;

	const geologyRowCount = sections.geologyCombinedLog?.data?.length || 0;
	const sampleCount = sections.allSamples?.data?.length || 0;
	const totalDepth = vwCollar?.TotalDepth || 0;
	const plannedDepth = vwCollar?.PlannedTotalDepth || 0;

	return (
		<div className="p-6 space-y-6">
			<Title level={3}>Drill Hole Summary</Title>

			<Row gutter={16}>
				<Col span={6}><Card><Statistic title="Current Depth" value={totalDepth} suffix="m" prefix={<BarChartOutlined />} valueStyle={{ color: totalDepth >= plannedDepth ? "#52c41a" : "#1890ff" }} /></Card></Col>
				<Col span={6}><Card><Statistic title="Planned Depth" value={plannedDepth} suffix="m" prefix={<BarChartOutlined />} /></Card></Col>
				<Col span={6}><Card><Statistic title="Geology Intervals" value={geologyRowCount} prefix={<FileTextOutlined />} /></Card></Col>
				<Col span={6}><Card><Statistic title="Samples" value={sampleCount} prefix={<ExperimentOutlined />} /></Card></Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Card title="Overall Completion">
						<Space direction="vertical" style={{ width: "100%" }}>
							<Statistic title="Approved Rows" value={totalApproved} suffix={`/ ${totalRows}`} prefix={<CheckCircleOutlined />} />
							<Progress percent={completionPercent} status={completionPercent === 100 ? "success" : "active"} />
							<Text type="secondary">Submitted: {totalSubmitted} rows</Text>
						</Space>
					</Card>
				</Col>
				<Col span={12}>
					<Card title="Drill Progress">
						<Statistic title="Depth Progress" value={plannedDepth > 0 ? Math.round((totalDepth / plannedDepth) * 100) : 0} suffix="%" valueStyle={{ color: totalDepth >= plannedDepth ? "#52c41a" : "#1890ff" }} />
					</Card>
				</Col>
			</Row>

			<Card title="Section Progress (Live)">
				<Table
					pagination={false}
					size="small"
					rowKey="key"
					dataSource={sectionProgress}
					columns={[
						{ title: "Section", dataIndex: "section", key: "section" },
						{ title: "Rows", dataIndex: "rows", key: "rows", width: 90 },
						{ title: "Submitted", dataIndex: "submitted", key: "submitted", width: 110 },
						{ title: "Approved", dataIndex: "approved", key: "approved", width: 110 },
						{ title: "Progress", key: "progress", render: (_: any, row: any) => <Progress percent={row.percent} size="small" style={{ width: 160 }} /> },
						{ title: "State", key: "state", render: (_: any, row: any) => row.isDirty ? <Tag color="blue">Dirty</Tag> : <Tag color="green">Clean</Tag> },
					]}
				/>
			</Card>

			{vwCollar && (
				<Card title="Drill Hole Information">
					<Space direction="vertical" style={{ width: "100%" }}>
						<Row gutter={16}>
							<Col span={8}><Text strong>Hole Name:</Text> <Text>{vwCollar.HoleNm || "N/A"}</Text></Col>
							<Col span={8}><Text strong>Project:</Text> <Text>{vwCollar.Project || "N/A"}</Text></Col>
							<Col span={8}><Text strong>Status:</Text> <Text>{vwCollar.HoleStatus || "N/A"}</Text></Col>
						</Row>
					</Space>
				</Card>
			)}
		</div>
	);
};
