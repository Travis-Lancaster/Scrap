/**
 * Standards List Component
 *
 * Left panel list of all reference materials
 */

import type { QcReference } from "#src/api/database/data-contracts";
import { SearchOutlined } from "@ant-design/icons";
import { Input, List, Tag, Typography } from "antd";
import dayjs from "dayjs";

import { useState } from "react";

const { Text } = Typography;

interface StandardsListProps {
	standards: QcReference[]
	selectedStandardId: string | null
	onSelectStandard: (standardId: string) => void
	loading?: boolean
}

export function StandardsList({
	standards,
	selectedStandardId,
	onSelectStandard,
	loading = false,
}: StandardsListProps): JSX.Element {
	const [searchText, setSearchText] = useState("");

	// Filter standards based on search
	const filteredStandards = standards.filter(std =>
		std.StandardId.toLowerCase().includes(searchText.toLowerCase())
		|| std.Supplier?.toLowerCase().includes(searchText.toLowerCase()),
	);

	const getStandardTypeColor = (type: string): string => {
		switch (type) {
			case "CRM":
				return "blue";
			case "IRM":
				return "green";
			case "BLK":
				return "purple";
			case "DUP":
				return "orange";
			default:
				return "default";
		}
	};

	const getStandardTypeName = (type: string): string => {
		switch (type) {
			case "CRM":
				return "CRM";
			case "IRM":
				return "IRM";
			case "BLK":
				return "Blank";
			case "DUP":
				return "Duplicate";
			default:
				return type;
		}
	};

	return (
		<div>
			{/* Search Box */}
			<div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
				<Input
					placeholder="Search standards..."
					prefix={<SearchOutlined />}
					value={searchText}
					onChange={e => setSearchText(e.target.value)}
					allowClear
				/>
			</div>

			{/* Standards List */}
			<List
				dataSource={filteredStandards}
				loading={loading}
				renderItem={standard => (
					<List.Item
						onClick={() => onSelectStandard(standard.StandardId)}
						style={{
							cursor: "pointer",
							background: selectedStandardId === standard.StandardId ? "#e6f7ff" : "transparent",
							borderLeft: selectedStandardId === standard.StandardId ? "3px solid #1890ff" : "3px solid transparent",
							padding: "12px 16px",
						}}
					>
						<List.Item.Meta
							title={(
								<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
									<Text strong>{standard.StandardId}</Text>
									<Tag color={getStandardTypeColor(standard.StandardType)} style={{ margin: 0 }}>
										{getStandardTypeName(standard.StandardType)}
									</Tag>
								</div>
							)}
							description={(
								<div>
									{standard.Supplier && (
										<Text type="secondary" style={{ fontSize: 12, display: "block" }}>
											{standard.Supplier}
										</Text>
									)}
									{standard.Date_Received && (
										<Text type="secondary" style={{ fontSize: 12, display: "block" }}>
											Received:
											{" "}
											{dayjs(standard.Date_Received).format("MMM DD, YYYY")}
										</Text>
									)}
								</div>
							)}
						/>
					</List.Item>
				)}
				locale={{
					emptyText: searchText ? "No standards match your search" : "No standards available",
				}}
			/>
		</div>
	);
}
