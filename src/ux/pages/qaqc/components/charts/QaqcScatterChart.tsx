/**
 * QaqcScatterChart Component
 *
 * Duplicate correlation scatter plot
 * Shows original vs duplicate values with 1:1 line and ±10% error bounds
 */

import type { DuplicateScatterData } from "#src/types/qaqc";
import type { EChartsOption } from "echarts";
import { Card, Empty, Space, Statistic } from "antd";
import ReactECharts from "echarts-for-react";

interface QaqcScatterChartProps {
	data: DuplicateScatterData[]
	title?: string
}

export function QaqcScatterChart({
	data,
	title = "Duplicate Correlation Plot",
}: QaqcScatterChartProps): JSX.Element {
	if (!data || data.length === 0) {
		return (
			<Card title={title}>
				<Empty description="No duplicate data available for the selected filters" />
			</Card>
		);
	}

	// Calculate statistics
	const highRPDCount = data.filter(d => d.isHighRPD).length;
	const avgRPD = (data.reduce((sum, d) => sum + d.rpd, 0) / data.length).toFixed(1);
	const maxRPD = Math.max(...data.map(d => d.rpd)).toFixed(1);

	// Find max value for axis scaling
	const maxValue = Math.max(
		...data.map(d => Math.max(d.originalValue, d.duplicateValue)),
	);

	const option: EChartsOption = {
		title: {
			text: title,
			subtext: "1:1 line with ±10% error bounds",
			left: "center",
		},

		tooltip: {
			formatter: (params: any) => {
				if (!params.data)
					return "";
				const d = params.data;
				return `
          <div style="padding: 8px">
            <strong>Date:</strong> ${new Date(d.sampledDt).toLocaleDateString()}<br/>
            <strong>Type:</strong> ${d.duplicateType}<br/>
            <strong>Lab:</strong> ${d.labCode}<br/>
            <strong>Original:</strong> ${d.originalValue.toFixed(4)} ppm<br/>
            <strong>Duplicate:</strong> ${d.duplicateValue.toFixed(4)} ppm<br/>
            <strong>RPD:</strong> ${d.rpd.toFixed(2)}%<br/>
            <strong>Grade:</strong> ${d.gradeCategory}
          </div>
        `;
			},
		},

		legend: {
			data: ["Duplicate Pairs", "1:1 Line", "+10% Bound", "-10% Bound"],
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
			type: "value",
			name: "Original Value (ppm)",
			nameLocation: "middle",
			nameGap: 30,
			min: 0,
			max: maxValue * 1.1,
		},

		yAxis: {
			type: "value",
			name: "Duplicate Value (ppm)",
			nameLocation: "middle",
			nameGap: 50,
			min: 0,
			max: maxValue * 1.1,
		},

		series: [
			// Duplicate pairs
			{
				name: "Duplicate Pairs",
				type: "scatter",
				data: data.map(d => ({
					value: [d.originalValue, d.duplicateValue],
					...d,
				})),
				symbolSize: 8,
				itemStyle: {
					color: (params: any) => {
						return params.data.isHighRPD ? "#f5222d" : "#1890ff";
					},
				},
			},

			// 1:1 line
			{
				name: "1:1 Line",
				type: "line",
				data: [[0, 0], [maxValue * 1.1, maxValue * 1.1]],
				lineStyle: {
					color: "#52c41a",
					width: 2,
				},
				symbol: "none",
				z: 0,
			},

			// +10% bound
			{
				name: "+10% Bound",
				type: "line",
				data: [[0, 0], [maxValue * 1.1, maxValue * 1.1 * 1.1]],
				lineStyle: {
					color: "#faad14",
					width: 1,
					type: "dashed",
				},
				symbol: "none",
				z: 0,
			},

			// -10% bound
			{
				name: "-10% Bound",
				type: "line",
				data: [[0, 0], [maxValue * 1.1, maxValue * 1.1 * 0.9]],
				lineStyle: {
					color: "#faad14",
					width: 1,
					type: "dashed",
				},
				symbol: "none",
				z: 0,
			},
		],
	};

	return (
		<Card
			title={title}
			extra={(
				<Space size="large">
					<Statistic
						title="Avg RPD"
						value={avgRPD}
						suffix="%"
						valueStyle={{ fontSize: "18px" }}
					/>
					<Statistic
						title="Max RPD"
						value={maxRPD}
						suffix="%"
						valueStyle={{
							color: Number.parseFloat(maxRPD) > 20 ? "#f5222d" : "#52c41a",
							fontSize: "18px",
						}}
					/>
					<Statistic
						title="High RPD (>20%)"
						value={highRPDCount}
						valueStyle={{
							color: highRPDCount > 0 ? "#f5222d" : "#52c41a",
							fontSize: "18px",
						}}
					/>
				</Space>
			)}
		>
			<ReactECharts
				option={option}
				style={{ height: "500px", width: "100%" }}
			/>
		</Card>
	);
}
