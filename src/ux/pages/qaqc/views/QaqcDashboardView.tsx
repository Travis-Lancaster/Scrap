/**
 * QaqcDashboardView Component
 *
 * Main global QAQC dashboard view with three-column layout
 * Left: Filters, Center: Charts, Right: Failure Log
 */

import { PageHeader } from "#node_modules/@ant-design/pro-components/es";
import { ReloadOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Select, Space, Spin, Tabs } from "antd";

import { useState } from "react";
import { QaqcBiasChart, QaqcScatterChart, QaqcShewhartChart } from "../components/charts";
import { QaqcFailureLog } from "../components/failure-log";
import { QaqcFilterPanel } from "../components/filters/QaqcFilterPanel";
import { useQaqcChartData } from "../hooks/useQaqcChartData";
import { useQaqcLookups } from "../hooks/useQaqcLookups";
import { useQaqcStore } from "../store/qaqc-store";

const { Header, Content, Sider } = Layout;
const { Option } = Select;

export function QaqcDashboardView(): JSX.Element {
	const filters = useQaqcStore(state => state.filters);
	const [selectedStandard, setSelectedStandard] = useState<string | undefined>(undefined);

	// Load dynamic lookups
	const { elements, standards, loading: lookupsLoading } = useQaqcLookups();

	// Fetch chart data based on filters
	const { chartData, loading, error, refetch } = useQaqcChartData({
		enabled: true,
		standardId: selectedStandard,
	});

	const handleApplyFilters = () => {
		refetch();
	};

	const handleRefresh = () => {
		refetch();
	};

	// Get selected element for display
	const selectedElement = filters.elements[0] || "Au";

	return (
		<Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
			{/* Header */}
			<Header style={{ background: "#fff", padding: "0 24px", borderBottom: "1px solid #f0f0f0" }}>
				<PageHeader
					title="Global QAQC Dashboard"
					subTitle="Quality Control Analytics"
					extra={[
						<Select
							key="element"
							value={selectedElement}
							onChange={(value) => {
								useQaqcStore.getState().setFilters({ elements: [value] });
							}}
							style={{ width: 120 }}
							loading={lookupsLoading}
						>
							{elements.map((el: { value: string, label: string }) => (
								<Option key={el.value} value={el.value}>{el.label}</Option>
							))}
						</Select>,
						<Button
							key="refresh"
							icon={<ReloadOutlined />}
							onClick={handleRefresh}
							loading={loading}
						>
							Refresh
						</Button>,
						<Button key="settings" icon={<SettingOutlined />}>
							Settings
						</Button>,
					]}
					style={{ padding: "16px 0" }}
				/>
			</Header>

			<Layout>
				{/* Left Sidebar: Filters */}
				<Sider
					width={280}
					theme="light"
					style={{
						padding: 16,
						background: "#fff",
						borderRight: "1px solid #f0f0f0",
						overflow: "auto",
						height: "calc(100vh - 64px)",
					}}
				>
					<QaqcFilterPanel onApply={handleApplyFilters} loading={loading} />
				</Sider>

				{/* Center: Charts */}
				<Content style={{ padding: 24, overflow: "auto", height: "calc(100vh - 64px)" }}>
					{loading && !chartData && (
						<div style={{ textAlign: "center", padding: "48px" }}>
							<Spin size="large" tip="Loading chart data..." />
						</div>
					)}

					{error && (
						<div style={{ textAlign: "center", padding: "48px", color: "#f5222d" }}>
							<p>
								Error loading chart data:
								{error.message}
							</p>
							<Button onClick={refetch}>Retry</Button>
						</div>
					)}

					{chartData && (
						<Tabs
							defaultActiveKey="standards"
							items={[
								{
									key: "standards",
									label: "Standards",
									children: (
										<div>
											<Space style={{ marginBottom: 16 }}>
												<span>Standard:</span>
												<Select
													placeholder="All standards"
													value={selectedStandard}
													onChange={setSelectedStandard}
													style={{ width: 200 }}
													allowClear
													loading={lookupsLoading}
												>
													{standards
														.filter((std: { value: string, label: string, type: string }) => std.type === "CRM" || std.type === "IRM")
														.map((std: { value: string, label: string, type: string }) => (
															<Option key={std.value} value={std.value}>{std.label}</Option>
														))}
												</Select>
											</Space>
											<QaqcShewhartChart
												data={chartData.shewhart}
												title={`Shewhart Control Chart${selectedStandard ? ` - ${selectedStandard}` : ""} (${selectedElement})`}
												onPointClick={data => console.log("Clicked:", data)}
											/>
										</div>
									),
								},
								{
									key: "duplicates",
									label: "Duplicates",
									children: (
										<Row gutter={[16, 16]}>
											<Col span={24}>
												<QaqcScatterChart
													data={chartData.scatter}
													title={`Duplicate Correlation Plot (${selectedElement})`}
												/>
											</Col>
										</Row>
									),
								},
								{
									key: "trends",
									label: "Trends",
									children: (
										<QaqcBiasChart
											data={chartData.bias}
											title={`Laboratory Bias Trends (${selectedElement})`}
										/>
									),
								},
							]}
							size="large"
						/>
					)}
				</Content>

				{/* Right Sidebar: Failure Log */}
				<Sider
					width={320}
					theme="light"
					style={{
						padding: 16,
						background: "#fff",
						borderLeft: "1px solid #f0f0f0",
						overflow: "auto",
						height: "calc(100vh - 64px)",
					}}
				>
					<QaqcFailureLog />
				</Sider>
			</Layout>
		</Layout>
	);
}
