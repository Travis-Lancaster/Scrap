/**
 * Module A: Reference Material Manager View
 *
 * Main view for managing certified reference materials (CRMs) and standards
 */

import type { QcReference, QcReferenceValue } from "#src/api/database/data-contracts";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Row, Spin } from "antd";

import { useEffect, useState } from "react";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";
import { StandardDetail } from "./StandardDetail";
import { StandardForm } from "./StandardForm";

import { StandardsList } from "./StandardsList";

export function ModuleAView(): JSX.Element {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingStandard, setEditingStandard] = useState<{
		standard: QcReference
		values: QcReferenceValue[]
	} | null>(null);

	const standards = useQaqcConfigStore(state => state.standards);
	const loadStandards = useQaqcConfigStore(state => state.loadStandards);
	const selectStandard = useQaqcConfigStore(state => state.selectStandard);

	// Load standards on mount
	useEffect(() => {
		loadStandards();
	}, [loadStandards]);

	const handleNewStandard = () => {
		setEditingStandard(null);
		setIsFormOpen(true);
	};

	const handleEditStandard = (standard: QcReference, values: QcReferenceValue[]) => {
		setEditingStandard({ standard, values });
		setIsFormOpen(true);
	};

	const handleCloseForm = () => {
		setIsFormOpen(false);
		setEditingStandard(null);
	};

	const handleSelectStandard = (standardId: string) => {
		selectStandard(standardId);
	};

	return (
		<div style={{ height: "calc(100vh - 200px)" }}>
			<Row gutter={16} style={{ height: "100%" }}>
				{/* Left Panel: Standards List (30%) */}
				<Col span={7} style={{ height: "100%" }}>
					<Card
						title="Standards Library"
						extra={(
							<Button
								type="primary"
								icon={<PlusOutlined />}
								onClick={handleNewStandard}
								size="small"
							>
								New Standard
							</Button>
						)}
						style={{ height: "100%", display: "flex", flexDirection: "column" }}
						bodyStyle={{ flex: 1, overflow: "auto", padding: 0 }}
					>
						{standards.loading && !standards.list.length
							? (
								<div style={{ padding: 48, textAlign: "center" }}>
									<Spin tip="Loading standards..." />
								</div>
							)
							: standards.list.length === 0
								? (
									<Empty
										description="No standards configured"
										style={{ padding: 48 }}
									>
										<Button type="primary" onClick={handleNewStandard}>
											Create First Standard
										</Button>
									</Empty>
								)
								: (
									<StandardsList
										standards={standards.list}
										selectedStandardId={standards.selected?.StandardId || null}
										onSelectStandard={handleSelectStandard}
										loading={standards.loading}
									/>
								)}
					</Card>
				</Col>

				{/* Right Panel: Standard Detail (70%) */}
				<Col span={17} style={{ height: "100%" }}>
					<Card
						style={{ height: "100%", display: "flex", flexDirection: "column" }}
						bodyStyle={{ flex: 1, overflow: "auto" }}
					>
						{!standards.selected
							? (
								<Empty
									description="Select a standard to view details"
									style={{ marginTop: 100 }}
								/>
							)
							: (
								<StandardDetail
									standard={standards.selected}
									values={standards.selectedValues}
									onEdit={handleEditStandard}
									loading={standards.loading}
								/>
							)}
					</Card>
				</Col>
			</Row>

			{/* Standard Form Modal */}
			<StandardForm
				open={isFormOpen}
				onClose={handleCloseForm}
				editingData={editingStandard}
			/>
		</div>
	);
}
