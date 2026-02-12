import { Card, Divider, InputNumber, Space, Tag, Typography } from "antd";
import React, { useMemo, useState } from "react";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";

const { Text, Title } = Typography;

/**
 * Insertion Sequence Preview Component
 *
 * Simulates QC sample insertion pattern based on configured rules.
 * Shows visual representation of sample sequence.
 */
export function InsertionSequencePreview(): JSX.Element {
	const { insertionRules } = useQaqcConfigStore();
	const [sampleCount, setSampleCount] = useState(100);

	const selectedRule = insertionRules.selected;

	// Generate sample sequence based on rule
	const sequence = useMemo(() => {
		if (!selectedRule)
			return [];

		const result: Array<{ index: number, type: "REGULAR" | "QC", qcType?: string }> = [];
		const intervalSize = selectedRule.SampleIntervalSize || 20;
		const stdFreq = selectedRule.StandardFrequency || 0;
		const blankFreq = selectedRule.BlankFrequency || 0;

		// Simple visualization: insert QC samples based on StandardFrequency
		const sampleIndex = 0;
		for (let i = 0; i < sampleCount; i++) {
			// Add regular sample
			result.push({
				index: i,
				type: "REGULAR",
			});

			// Insert standard if frequency matches
			if (stdFreq > 0 && (i + 1) % stdFreq === 0) {
				result.push({
					index: i,
					type: "QC",
					qcType: "CRM",
				});
			}

			// Insert blank if frequency matches
			if (blankFreq > 0 && (i + 1) % blankFreq === 0) {
				result.push({
					index: i,
					type: "QC",
					qcType: "BLK",
				});
			}
		}

		return result;
	}, [selectedRule, sampleCount]);

	const stats = useMemo(() => {
		const qcSamples = sequence.filter(s => s.type === "QC").length;
		const regularSamples = sequence.filter(s => s.type === "REGULAR").length;
		const total = sequence.length;
		const qcPercentage = total > 0 ? ((qcSamples / total) * 100).toFixed(1) : "0";

		return { qcSamples, regularSamples, total, qcPercentage };
	}, [sequence]);

	const getQCColor = (qcType: string | undefined) => {
		const colors: Record<string, string> = {
			CRM: "#1890ff",
			IRM: "#52c41a",
			BLK: "#8c8c8c",
			DUP: "#fa8c16",
		};
		return colors[qcType || ""] || "#d9d9d9";
	};

	if (!selectedRule) {
		return (
			<Card title="Sequence Preview">
				<Text type="secondary">Select a rule to preview insertion pattern</Text>
			</Card>
		);
	}

	return (
		<Card
			title="Sequence Preview"
			bodyStyle={{ height: "calc(100vh - 340px)", overflow: "auto" }}
		>
			<Space direction="vertical" style={{ width: "100%" }} size="middle">
				{/* Controls */}
				<div>
					<Text strong>Sample Count: </Text>
					<InputNumber
						min={10}
						max={500}
						value={sampleCount}
						onChange={value => setSampleCount(value || 100)}
						style={{ width: 100 }}
					/>
				</div>

				<Divider style={{ margin: "8px 0" }} />

				{/* Statistics */}
				<div style={{ background: "#f5f5f5", padding: 12, borderRadius: 4 }}>
					<Space direction="vertical" size={4} style={{ width: "100%" }}>
						<Text strong>Insertion Statistics</Text>
						<Text style={{ fontSize: 12 }}>
							Total Samples:
							{" "}
							<strong>{stats.total}</strong>
						</Text>
						<Text style={{ fontSize: 12 }}>
							Regular:
							{" "}
							<strong>{stats.regularSamples}</strong>
						</Text>
						<Text style={{ fontSize: 12 }}>
							QC Samples:
							{" "}
							<strong>{stats.qcSamples}</strong>
						</Text>
						<Text style={{ fontSize: 12 }}>
							QC Percentage:
							{" "}
							<strong>
								{stats.qcPercentage}
								%
							</strong>
						</Text>
					</Space>
				</div>

				<Divider style={{ margin: "8px 0" }} />

				{/* Visual Sequence */}
				<div>
					<Text strong style={{ display: "block", marginBottom: 8 }}>
						Sample Sequence (first 100):
					</Text>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(10, 1fr)",
							gap: 4,
							maxHeight: "400px",
							overflow: "auto",
						}}
					>
						{sequence.slice(0, 100).map((sample, idx) => (
							<div
								key={idx}
								style={{
									width: "100%",
									aspectRatio: "1",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									backgroundColor: sample.type === "QC"
										? getQCColor(sample.qcType)
										: "#f0f0f0",
									color: sample.type === "QC" ? "#fff" : "#8c8c8c",
									borderRadius: 4,
									fontSize: 10,
									fontWeight: sample.type === "QC" ? 600 : 400,
									border: sample.type === "QC" ? "2px solid rgba(0,0,0,0.2)" : "none",
								}}
								title={`Sample ${sample.index + 1}: ${sample.type === "QC" ? sample.qcType : "Regular"}`}
							>
								{sample.type === "QC" ? sample.qcType : idx + 1}
							</div>
						))}
					</div>
				</div>

				{/* Legend */}
				<div style={{ marginTop: 16 }}>
					<Text strong style={{ display: "block", marginBottom: 8 }}>
						Legend:
					</Text>
					<Space wrap>
						<Tag color="default">Regular Sample</Tag>
						<Tag color="blue">CRM</Tag>
						<Tag color="green">IRM</Tag>
						<Tag color="default">BLK</Tag>
						<Tag color="orange">DUP</Tag>
					</Space>
				</div>
			</Space>
		</Card>
	);
}
