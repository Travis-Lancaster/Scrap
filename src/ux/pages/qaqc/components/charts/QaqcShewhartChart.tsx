/**
 * QaqcShewhartChart Component
 *
 * Shewhart Control Chart for standards accuracy analysis
 * Shows measured values vs expected with ±2σ and ±3σ control limits
 */

import type { ShewhartChartData } from "#src/types/qaqc";
import type { EChartsOption } from "echarts";
import { Card, Empty, Space, Statistic } from "antd";
import ReactECharts from "echarts-for-react";

interface QaqcShewhartChartProps {
	data: ShewhartChartData[]
	title?: string
	onPointClick?: (data: ShewhartChartData) => void
}

export function QaqcShewhartChart({
	data,
	title = "Shewhart Control Chart",
	onPointClick,
}: QaqcShewhartChartProps): JSX.Element {
	if (!data || data.length === 0) {
		return (
			<Card title={title}>
				<Empty description="No data available for the selected filters" />
			</Card>
		);
	}

	// Calculate statistics
	const failureCount = data.filter(d => d.isFailure).length;
	const warningCount = data.filter(d => d.isWarning).length;
	const failureRate = ((failureCount / data.length) * 100).toFixed(1);
	const avgZScore = (data.reduce((sum, d) => sum + d.zScore, 0) / data.length).toFixed(2);

	// Find max value for axis scaling
	const maxValue = Math.max(...data.map(d => Math.max(d.result, d.upper3SD)));
	const minValue = Math.min(...data.map(d => Math.min(d.result, d.lower3SD)));

	const option: EChartsOption = {
		title: {
			text: title,
			left: "center",
			textStyle: {
				fontSize: 16,
				fontWeight: "bold",
			},
		},

		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "cross",
			},
			formatter: (params: any) => {
				if (!params || params.length === 0)
					return "";

				const point = params.find((p: any) => p.seriesName === "Measured");
				if (!point || !point.data)
					return "";

				const d = point.data;
				return `
          <div style="padding: 8px">
            <strong>Date:</strong> ${new Date(d.sampledDt).toLocaleDateString()}<br/>
            <strong>Batch:</strong> ${d.batchNo}<br/>
            <strong>Lab:</strong> ${d.labCode}<br/>
            <strong>Result:</strong> ${d.result.toFixed(4)} ppm<br/>
            <strong>Expected:</strong> ${d.expectedValue.toFixed(4)} ppm<br/>
            <strong>Z-Score:</strong> ${d.zScore.toFixed(2)}<br/>
            <strong>Status:</strong> <span style="color: ${
				d.qcStatus === "FAIL"
					? "#f5222d"
					: d.qcStatus === "WARN" ? "#faad14" : "#52c41a"
			}">${d.qcStatus}</span>
          </div>
        `;
			},
		},

		legend: {
			data: ["Measured", "Expected", "+3σ", "+2σ", "-2σ", "-3σ"],
			bottom: 10,
		},

		grid: {
			left: "10%",
			right: "10%",
			bottom: "15%",
			top: "15%",
			containLabel: true,
		},

		xAxis: {
			type: "time",
			name: "Sample Date",
			nameLocation: "middle",
			nameGap: 30,
			axisLabel: {
				formatter: (value: number) => {
					return new Date(value).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
					});
				},
			},
		},

		yAxis: {
			type: "value",
			name: "Value (ppm)",
			nameLocation: "middle",
			nameGap: 50,
			min: minValue * 0.9,
			max: maxValue * 1.1,
			axisLabel: {
				formatter: (value: number) => value.toFixed(4),
			},
		},

		series: [
			// Measured values (scatter with dynamic colors)
			{
				name: "Measured",
				type: "scatter",
				data: data.map(d => ({
					value: [d.sampledDt, d.result],
					...d,
				})),
				symbolSize: 10,
				itemStyle: {
					color: (params: any) => {
						const status = params.data.qcStatus;
						return status === "FAIL"
							? "#f5222d"
							: status === "WARN" ? "#faad14" : "#1890ff";
					},
				},
				emphasis: {
					scale: 1.5,
				},
				z: 3,
			},

			// Expected value line
			{
				name: "Expected",
				type: "line",
				data: data.map(d => [d.sampledDt, d.expectedValue]),
				lineStyle: {
					color: "#52c41a",
					width: 2,
					type: "dashed",
				},
				symbol: "none",
				z: 1,
			},

			// +3σ line
			{
				name: "+3σ",
				type: "line",
				data: data.map(d => [d.sampledDt, d.upper3SD]),
				lineStyle: {
					color: "#f5222d",
					width: 1,
					type: "dashed",
				},
				symbol: "none",
				z: 0,
			},

			// +2σ line
			{
				name: "+2σ",
				type: "line",
				data: data.map(d => [d.sampledDt, d.upper2SD]),
				lineStyle: {
					color: "#faad14",
					width: 1,
					type: "dashed",
				},
				symbol: "none",
				z: 0,
			},

			// -2σ line
			{
				name: "-2σ",
				type: "line",
				data: data.map(d => [d.sampledDt, d.lower2SD]),
				lineStyle: {
					color: "#faad14",
					width: 1,
					type: "dashed",
				},
				symbol: "none",
				z: 0,
			},

			// -3σ line
			{
				name: "-3σ",
				type: "line",
				data: data.map(d => [d.sampledDt, d.lower3SD]),
				lineStyle: {
					color: "#f5222d",
					width: 1,
					type: "dashed",
				},
				symbol: "none",
				z: 0,
			},
		],

		dataZoom: [
			{
				type: "inside",
				xAxisIndex: 0,
				filterMode: "none",
			},
			{
				type: "slider",
				xAxisIndex: 0,
				filterMode: "none",
				bottom: 60,
			},
		],
	};

	const handleChartClick = (params: any) => {
		if (params.componentType === "series" && params.seriesName === "Measured") {
			if (onPointClick && params.data) {
				onPointClick(params.data);
			}
		}
	};

	return (
		<Card
			title={title}
			extra={(
				<Space size="large">
					<Statistic
						title="Failure Rate"
						value={failureRate}
						suffix="%"
						valueStyle={{
							color: Number.parseFloat(failureRate) > 5 ? "#f5222d" : "#52c41a",
							fontSize: "18px",
						}}
					/>
					<Statistic
						title="Avg Z-Score"
						value={avgZScore}
						precision={2}
						valueStyle={{ fontSize: "18px" }}
					/>
					<Statistic
						title="Samples"
						value={data.length}
						valueStyle={{ fontSize: "18px" }}
					/>
				</Space>
			)}
		>
			<ReactECharts
				option={option}
				style={{ height: "500px", width: "100%" }}
				onEvents={{
					click: handleChartClick,
				}}
			/>
		</Card>
	);
}
