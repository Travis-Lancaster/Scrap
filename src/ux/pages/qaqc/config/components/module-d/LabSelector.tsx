import { ExperimentOutlined } from "@ant-design/icons";
import { Alert, Card, Select, Space, Typography } from "antd";
import React from "react";
import { useQaqcConfigStore } from "../../store/qaqc-config-store";

const { Text } = Typography;

/**
 * Lab Selector Component
 *
 * Dropdown for selecting which laboratory's configuration to view/edit.
 * All grids below are filtered based on selected lab.
 */
export function LabSelector(): JSX.Element {
	const { labMappings, setSelectedLab, loadLabMappings } = useQaqcConfigStore();

	const handleLabChange = async (labCode: string) => {
		setSelectedLab(labCode);
		await loadLabMappings(labCode);
	};

	// TODO: Integrate with LookupResolver to get lab list from AssayLab table
	const labs = [
		{ code: "SGS_MALI", name: "SGS Bamako", location: "Mali" },
		{ code: "ALS_VANCOUVER", name: "ALS Global - Vancouver", location: "Canada" },
		{ code: "INTERTEK_TARKWA", name: "Intertek Tarkwa", location: "Ghana" },
		{ code: "SGS_JOHANNESBURG", name: "SGS Johannesburg", location: "South Africa" },
	];

	return (
		<Card>
			<Space direction="vertical" style={{ width: "100%" }} size="middle">
				<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
					<ExperimentOutlined style={{ fontSize: 24, color: "#1890ff" }} />
					<div style={{ flex: 1 }}>
						<Text strong style={{ fontSize: 16 }}>Select Laboratory</Text>
						<br />
						<Text type="secondary" style={{ fontSize: 12 }}>
							Configure element aliases, method mappings, and detection limits for the selected lab
						</Text>
					</div>
					<Select
						style={{ width: 300 }}
						placeholder="Select a laboratory"
						value={labMappings.selectedLab || undefined}
						onChange={handleLabChange}
						loading={labMappings.loading}
						size="large"
						showSearch
						optionFilterProp="children"
					>
						{labs.map(lab => (
							<Select.Option key={lab.code} value={lab.code}>
								<div>
									<div style={{ fontWeight: 600 }}>{lab.name}</div>
									<div style={{ fontSize: 12, color: "#8c8c8c" }}>{lab.location}</div>
								</div>
							</Select.Option>
						))}
					</Select>
				</div>

				{!labMappings.selectedLab && (
					<Alert
						message="No Laboratory Selected"
						description="Please select a laboratory from the dropdown to configure its settings"
						type="info"
						showIcon
					/>
				)}
			</Space>
		</Card>
	);
}
