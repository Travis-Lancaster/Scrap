/**
 * QaqcSection Component
 *
 * Main QAQC tab content for drill hole view
 * Displays traffic light status and provides access to detailed validation
 */

import { useQaqcLookups } from "#src/pages/qaqc/hooks/useQaqcLookups";
import {
	ReloadOutlined,
} from "@ant-design/icons";

import { Alert, Button, Card, Select, Space } from "antd";
import React, { useState } from "react";
import { QaqcBatchValidationDrawer } from "../components/qaqc/QaqcBatchValidationDrawer";
import { QaqcStatusRibbon } from "../components/qaqc/QaqcStatusRibbon";
import { useQaqcStatus } from "../hooks/useQaqcStatus";
import { useCreateDrillHoleStore } from "../store/create-drillhole-store";

const { Option } = Select;

/**
 * QAQC Section for drill hole validation
 * Shows quality control status and allows drilling into details
 */
export function QaqcSection(): JSX.Element {
	const drillHoleId = useCreateDrillHoleStore(state => state.drillHoleId);
	const HoleNm = useCreateDrillHoleStore(state => state.HoleNm);
	const [selectedElement, setSelectedElement] = useState<string>("Au");
	const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

	// Load dynamic lookups
	const { elements, loading: lookupsLoading } = useQaqcLookups();

	// Fetch QAQC status
	const { status, loading, error, refetch } = useQaqcStatus(
		drillHoleId ?? undefined,
		selectedElement,
		{
			enabled: Boolean(drillHoleId),
			refetchInterval: 60000, // Refetch every minute
		},
	);

	const handleViewDetails = () => {
		setDetailsOpen(true);
	};

	return (
		<div className="qaqc-section" style={{ padding: "24px" }}>
			{/* Header with element selector */}
			<Card
				title="QAQC Validation Status"
				extra={(
					<Space>
						<Select
							value={selectedElement}
							onChange={setSelectedElement}
							style={{ width: 120 }}
							disabled={loading || lookupsLoading}
							loading={lookupsLoading}
						>
							{elements.map((el: { value: string, label: string }) => (
								<Option key={el.value} value={el.value}>{el.label}</Option>
							))}
						</Select>
						<Button
							icon={<ReloadOutlined />}
							onClick={refetch}
							loading={loading}
						>
							Refresh
						</Button>
					</Space>
				)}
				style={{ marginBottom: "24px" }}
			>
				<Alert
					message="QAQC Validation"
					description="This tab shows the quality control status for this drill hole based on the performance of laboratory batches that processed its samples. Quality is assessed using standards, blanks, and duplicates according to NI 43-101 and JORC standards."
					type="info"
					showIcon
					closable
					style={{ marginBottom: "16px" }}
				/>
			</Card>

			{/* Status Ribbon */}
			<QaqcStatusRibbon
				status={status}
				loading={loading}
				error={error}
				element={selectedElement}
				onViewDetails={handleViewDetails}
			/>

			{/* Batch Validation Drawer */}
			<QaqcBatchValidationDrawer
				open={detailsOpen}
				onClose={() => setDetailsOpen(false)}
				collarId={drillHoleId ?? undefined}
				element={selectedElement}
				holeNm={HoleNm || undefined}
			/>
		</div>
	);
}
