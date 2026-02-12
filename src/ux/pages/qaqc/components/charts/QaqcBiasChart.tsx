/**
 * QaqcBiasChart Component
 *
 * Laboratory bias trend chart
 * Shows average Z-Score by month for each laboratory
 */

import type { BiasTrendData } from "#src/types/qaqc";
import type { EChartsOption } from "echarts";
import { Card, Empty, Tag } from "antd";
import ReactECharts from "echarts-for-react";

interface QaqcBiasChartProps {
	data: BiasTrendData[]
	title?: string
}

export function QaqcBiasChart({
	data,
	title = "Laboratory Bias Trends",
}: QaqcBiasChartProps): JSX.Element {
	if (!data || data.length === 0) {
		return (
			<Card title={title}>
				<Empty description="No bias data available for the selected filters" />
			</Card>
		);
	}

	// Get unique labs and months
	const labCodes = [...new Set(data.map(d => d.labCode))];
	const months = [...new Set(data.map(d => d.yearMonth))].sort();

	// Check for significant bias
	const significantBiasCount = data.filter(d => d.hasSignificantBias).length;

	const option: EChartsOption = {
		title: {
			text: title,
			subtext: "Average Z-Score by Month",
			left: "center",
		},

		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
			formatter: (params: any) => {
				if (!params || params.length === 0)
					return "";

				let result = `<div style="padding: 8px"><strong>${params[0].axisValue}</strong><br/>`;
				params.forEach((p: any) => {
					if (p.data) {
						result += `${p.seriesName}: ${p.data.avgZScore.toFixed(2)} (${p.data.standardCount} samples)<br/>`;
						result += `Failure Rate: ${p.data.failureRate_Pct.toFixed(1)}%<br/>`;
						result += `Category: ${p.data.biasCategory}<br/><br/>`;
					}
				});
				result += "</div>";
				return result;
			},
		},

		legend: {
			data: labCodes,
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
			type: "category",
			data: months,
			name: "Month",
			axisLabel: {
				rotate: 45,
			},
		},

		yAxis: {
			type: "value",
			name: "Average Z-Score",
			min: -3,
			max: 3,
			axisLabel: {
				formatter: (value: number) => value.toFixed(1),
			},
		},

		series: labCodes.map(lab => ({
			name: lab,
			type: "bar",
			data: months.map((month) => {
				const point = data.find(d => d.labCode === lab && d.yearMonth === month);
				if (!point)
					return null;

				return {
					value: point.avgZScore,
					itemStyle: {
						color: Math.abs(point.avgZScore) > 1 ? "#f5222d" : "#1890ff",
					},
					...point,
				};
			}),
			barMaxWidth: 30,
		})),

		markLine: {
			silent: true,
			data: [
				{
					yAxis: 0,
					lineStyle: { color: "#52c41a", width: 2 },
					label: { show: true, position: "end", formatter: "No Bias" },
				},
				{
					yAxis: 1,
					lineStyle: { color: "#faad14", type: "dashed" },
					label: { show: true, position: "end", formatter: "+1σ" },
				},
				{
					yAxis: -1,
					lineStyle: { color: "#faad14", type: "dashed" },
					label: { show: true, position: "end", formatter: "-1σ" },
				},
			],
		},
	};

	return (
		<Card
			title={title}
			extra={
				significantBiasCount > 0
					? (
						<Tag color="red">
							{significantBiasCount}
							{" "}
							months with significant bias
						</Tag>
					)
					: (
						<Tag color="green">
							No significant bias detected
						</Tag>
					)
			}
		>
			<ReactECharts
				option={option}
				style={{ height: "500px", width: "100%" }}
			/>
		</Card>
	);
}
