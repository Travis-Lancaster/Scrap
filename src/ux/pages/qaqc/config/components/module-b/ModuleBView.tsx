import { Col, Row, Spin } from "antd";
import React, { useEffect } from "react";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";
import { ControlLimitPreview } from "./ControlLimitPreview";
import { QCRulesGrid } from "./QCRulesGrid";
import { StatisticalLimitsGrid } from "./StatisticalLimitsGrid";

/**
 * Module B: Statistical Limits & Rules Configuration
 *
 * Manages:
 * - Element-level statistical control limits (σ thresholds)
 * - QC evaluation rules (Shewhart, Westgard)
 * - Expected value tolerance ranges
 */
export function ModuleBView(): JSX.Element {
	const {
		limits,
		loadStatisticalLimits,
		loadQCRules,
	} = useQaqcConfigStore();

	useEffect(() => {
		// Load initial data for Module B
		loadStatisticalLimits();
		loadQCRules();
	}, [loadStatisticalLimits, loadQCRules]);

	const isLoading = limits.loading;

	if (isLoading && limits.elements.length === 0) {
		return (
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
				<Spin size="large" tip="Loading statistical configuration..." />
			</div>
		);
	}

	return (
		<div style={{ height: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
			{/* Top Section: Statistical Limits Grid */}
			<Row gutter={[16, 16]} style={{ flex: "0 0 auto" }}>
				<Col span={24}>
					<StatisticalLimitsGrid />
				</Col>
			</Row>

			{/* Bottom Section: Split between Rules and Preview */}
			<Row gutter={[16, 16]} style={{ flex: "1 1 auto", minHeight: 0 }}>
				{/* Left: QC Rules Grid (60%) */}
				<Col span={14} style={{ height: "100%" }}>
					<QCRulesGrid />
				</Col>

				{/* Right: Control Limit Preview (40%) */}
				<Col span={10} style={{ height: "100%" }}>
					<ControlLimitPreview />
				</Col>
			</Row>
		</div>
	);
}
