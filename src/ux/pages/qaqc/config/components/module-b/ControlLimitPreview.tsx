import type { EChartsOption } from "echarts";
import { Card, Empty, Select, Space, Typography } from "antd";
import ReactECharts from "echarts-for-react";
import React, { useMemo, useState } from "react";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";

const { Text } = Typography;

/**
 * Control Limit Preview Component
 *
 * Visualizes statistical control limits for selected element/method combination.
 * Shows warning and control limit bands on a simulated control chart.
 */
export function ControlLimitPreview(): JSX.Element {
	const { limits } = useQaqcConfigStore();
	const [selectedElement, setSelectedElement] = useState<string | undefined>();

	// Get unique elements for filters
	const elements = useMemo(() => {
		const unique = new Set(limits.elements.map(l => l.Element));
		return Array.from(unique).sort();
	}, [limits.elements]);

	// Get selected limit configuration (QcStatisticalLimits doesn't have method, just element)
	const selectedLimit = useMemo(() => {
		if (!selectedElement)
			return null;
		return limits.elements.find(
			l => l.Element === selectedElement,
		);
	}, [limits.elements, selectedElement]);

	// Generate preview chart
	const chartOption = useMemo<EChartsOption>(() => {
		if (!selectedLimit) {
			return {};
		}

		const warningLimit = selectedLimit.WarningLimitSigma;
		const controlLimit = selectedLimit.FailureLimitSigma;

		// Generate simulated data points (for visualization)
		const dataPoints = Array.from({ length: 30 }, (_, i) => {
			// Simulate z-scores with some variation
			const baseValue = (Math.random() - 0.5) * 2.5;
			const variation = Math.random() * 0.3;
			return baseValue + variation;
		});

		return {
			title: {
				text: "Control Limit Preview",
				subtext: selectedElement || "",
				left: "center",
				textStyle: { fontSize: 14, fontWeight: 600 },
			},
			tooltip: {
				trigger: "axis",
				formatter: (params: any) => {
					const point = params[0];
					return `Sample ${point.dataIndex + 1}<br/>Z-Score: ${point.value.toFixed(2)}σ`;
				},
			},
			grid: {
				left: 50,
				right: 20,
				top: 70,
				bottom: 40,
			},
			xAxis: {
				type: "category",
				name: "Sample Sequence",
				data: dataPoints.map((_, i) => i + 1),
				boundaryGap: false,
			},
			yAxis: {
				type: "value",
				name: "Z-Score (σ)",
				axisLabel: {
					formatter: "{value}σ",
				},
			},
			series: [
				// Control limit lines
				{
					name: "+3σ Control",
					type: "line",
					markLine: {
						silent: true,
						symbol: "none",
						lineStyle: { color: "#cf1322", width: 2, type: "solid" },
						label: { formatter: `+${controlLimit}σ Control`, position: "end" },
						data: [{ yAxis: controlLimit }],
					},
				},
				{
					name: "-3σ Control",
					type: "line",
					markLine: {
						silent: true,
						symbol: "none",
						lineStyle: { color: "#cf1322", width: 2, type: "solid" },
						label: { formatter: `-${controlLimit}σ Control`, position: "end" },
						data: [{ yAxis: -controlLimit }],
					},
				},
				// Warning limit lines
				{
					name: "+2σ Warning",
					type: "line",
					markLine: {
						silent: true,
						symbol: "none",
						lineStyle: { color: "#faad14", width: 2, type: "dashed" },
						label: { formatter: `+${warningLimit}σ Warning`, position: "end" },
						data: [{ yAxis: warningLimit }],
					},
				},
				{
					name: "-2σ Warning",
					type: "line",
					markLine: {
						silent: true,
						symbol: "none",
						lineStyle: { color: "#faad14", width: 2, type: "dashed" },
						label: { formatter: `-${warningLimit}σ Warning`, position: "end" },
						data: [{ yAxis: -warningLimit }],
					},
				},
				// Mean line
				{
					name: "Mean",
					type: "line",
					markLine: {
						silent: true,
						symbol: "none",
						lineStyle: { color: "#52c41a", width: 1, type: "solid" },
						label: { formatter: "Mean", position: "end" },
						data: [{ yAxis: 0 }],
					},
				},
				// Actual data points
				{
					name: "Z-Score",
					type: "line",
					data: dataPoints,
					symbol: "circle",
					symbolSize: 6,
					lineStyle: { width: 2 },
					itemStyle: {
						color: (params: any) => {
							const value = Math.abs(params.value);
							if (value > controlLimit)
								return "#cf1322"; // Red - out of control
							if (value > warningLimit)
								return "#faad14"; // Orange - warning
							return "#1890ff"; // Blue - in control
						},
					},
				},
			],
		};
	}, [selectedLimit, selectedElement]);

	const hasData = !!selectedLimit;

	return (
		<Card
			title="Control Limit Preview"
			bodyStyle={{ padding: hasData ? 12 : 24, height: "calc(100% - 57px)" }}
			style={{ height: "100%", display: "flex", flexDirection: "column" }}
		>
			<Space direction="vertical" style={{ width: "100%", marginBottom: hasData ? 12 : 0 }}>
				<Space>
					<Text strong>Element:</Text>
					<Select
						style={{ width: 120 }}
						placeholder="Select element"
						value={selectedElement}
						onChange={value => setSelectedElement(value)}
						options={elements.map(e => ({ label: e, value: e }))}
					/>
				</Space>
			</Space>

			{hasData
				? (
					<div style={{ flex: 1, minHeight: 0 }}>
						<ReactECharts
							option={chartOption}
							style={{ height: "100%", width: "100%" }}
							opts={{ renderer: "canvas" }}
						/>

						{selectedLimit && (
							<div style={{ marginTop: 8, padding: "8px 12px", background: "#f5f5f5", borderRadius: 4 }}>
								<Space direction="vertical" size={4}>
									<Text type="secondary" style={{ fontSize: 12 }}>
										<strong>Warning Limit:</strong>
										{" "}
										±
										{selectedLimit.WarningLimitSigma}
										σ
									</Text>
									<Text type="secondary" style={{ fontSize: 12 }}>
										<strong>Control Limit:</strong>
										{" "}
										±
										{selectedLimit.FailureLimitSigma}
										σ
									</Text>
									{selectedLimit.Description && (
										<Text type="secondary" style={{ fontSize: 12 }}>
											<strong>Description:</strong>
											{" "}
											{selectedLimit.Description}
										</Text>
									)}
								</Space>
							</div>
						)}
					</div>
				)
				: (
					<Empty
						description="Select element to preview control limits"
						image={Empty.PRESENTED_IMAGE_SIMPLE}
					/>
				)}
		</Card>
	);
}
