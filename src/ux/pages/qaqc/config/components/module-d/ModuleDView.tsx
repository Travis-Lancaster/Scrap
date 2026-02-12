import { Col, Row } from "antd";
import React from "react";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";
import { DetectionLimitsGrid } from "./DetectionLimitsGrid";
import { ElementAliasGrid } from "./ElementAliasGrid";
import { LabSelector } from "./LabSelector";
import { MethodMappingGrid } from "./MethodMappingGrid";

/**
 * Module D: Lab & Method Configuration
 *
 * Manages:
 * - Lab-specific element aliases
 * - Lab method to generic method mappings
 * - Detection limits and grade ranges by lab/method
 */
export function ModuleDView(): JSX.Element {
	const { labMappings } = useQaqcConfigStore();

	return (
		<div style={{ height: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
			{/* Top: Lab Selector */}
			<Row>
				<Col span={24}>
					<LabSelector />
				</Col>
			</Row>

			{/* Middle Row: Element Aliases and Method Mappings */}
			<Row gutter={[16, 16]} style={{ flex: "0 0 300px" }}>
				{/* Left: Element Aliases (50%) */}
				<Col span={12} style={{ height: "100%" }}>
					<ElementAliasGrid />
				</Col>

				{/* Right: Method Mappings (50%) */}
				<Col span={12} style={{ height: "100%" }}>
					<MethodMappingGrid />
				</Col>
			</Row>

			{/* Bottom: Detection Limits (full width) */}
			<Row gutter={[16, 16]} style={{ flex: "1 1 auto", minHeight: 0 }}>
				<Col span={24} style={{ height: "100%" }}>
					<DetectionLimitsGrid />
				</Col>
			</Row>
		</div>
	);
}
