import { Spin } from "antd";
import React, { useEffect } from "react";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";
import { InsertionRuleEditor } from "./InsertionRuleEditor";
import { InsertionRulesList } from "./InsertionRulesList";
import { InsertionSequencePreview } from "./InsertionSequencePreview";

/**
 * Module C: QC Insertion Patterns Configuration
 *
 * Manages:
 * - QC sample insertion rules (frequency, position)
 * - Insertion patterns by project/phase
 * - Sample sequence simulation
 */
export function ModuleCView(): JSX.Element {
	const {
		insertionRules,
		loadInsertionRules,
	} = useQaqcConfigStore();

	useEffect(() => {
		// Load initial data for Module C
		loadInsertionRules();
	}, [loadInsertionRules]);

	if (insertionRules.loading && insertionRules.list.length === 0) {
		return (
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
				<Spin size="large" tip="Loading insertion rules..." />
			</div>
		);
	}

	return (
		<div style={{ height: "calc(100vh - 240px)", display: "flex", gap: "16px" }}>
			{/* Left: Insertion Rules List (30%) */}
			<div style={{ flex: "0 0 30%", display: "flex", flexDirection: "column", gap: "16px" }}>
				<InsertionRulesList />
			</div>

			{/* Center: Rule Editor (40%) */}
			<div style={{ flex: "0 0 40%", display: "flex", flexDirection: "column" }}>
				<InsertionRuleEditor />
			</div>

			{/* Right: Sequence Preview (30%) */}
			<div style={{ flex: "0 0 30%", display: "flex", flexDirection: "column" }}>
				<InsertionSequencePreview />
			</div>
		</div>
	);
}
