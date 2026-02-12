/**
 * SectionMetadataPanel Component
 *
 * Displays section metadata information at the bottom of drill hole sections.
 * Shows row status, sync status, validation status, and timestamps.
 */

import type { DrillHoleSection } from "#src/types/drillhole";

import { RowStatus } from "#src/types/drillhole";
import { Card, Descriptions, Tag } from "antd";
import dayjs from "dayjs";
import React from "react";

export interface SectionMetadataPanelProps {
	section: DrillHoleSection
}

/**
 * Get color for row status tag
 */
function getRowStatusColor(status: RowStatus): string {
	switch (status) {
		case RowStatus.Draft:
			return "default";
		case RowStatus.Complete:
			return "blue";
		case RowStatus.Reviewed:
			return "cyan";
		case RowStatus.Approved:
			return "green";
		case RowStatus.Superseded:
			return "orange";
		case RowStatus.Imported:
			return "purple";
		case RowStatus.Rejected:
			return "red";
		default:
			return "default";
	}
}

/**
 * Get display text for row status
 */
function getRowStatusText(status: RowStatus): string {
	switch (status) {
		case RowStatus.Draft:
			return "Draft";
		case RowStatus.Complete:
			return "Complete";
		case RowStatus.Reviewed:
			return "Reviewed";
		case RowStatus.Approved:
			return "Approved";
		case RowStatus.Superseded:
			return "Superseded";
		case RowStatus.Imported:
			return "Imported";
		case RowStatus.Rejected:
			return "Rejected";
		default:
			return "Unknown";
	}
}

/**
 * Format date for display
 */
function formatDate(date: Date | string | null | undefined): string {
	if (!date)
		return "N/A";
	try {
		return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
	}
	catch {
		return "Invalid date";
	}
}

/**
 * SectionMetadataPanel Component
 */
export const SectionMetadataPanel: React.FC<SectionMetadataPanelProps> = ({ section }) => {
	const data = section.data;
	const rowStatus = section.getRowStatus?.() ?? RowStatus.Draft;
	const syncStatus = section.getSyncStatus?.() ?? "Synced";

	// Extract metadata from section data (if it follows StandardRowMetadata)
	const metadata = (data as any) || {};

	return (
		<Card
			size="small"
			title="Section Metadata"
			style={{ marginTop: "16px" }}
			bodyStyle={{ padding: "8px 16px" }}
		>
			<Descriptions
				size="small"
				column={{ xs: 1, sm: 2, md: 3, lg: 4 }}
				labelStyle={{ fontWeight: "bold", width: "120px" }}
			>
				<Descriptions.Item label="Row Status">
					<Tag color={getRowStatusColor(rowStatus)}>
						{getRowStatusText(rowStatus)}
					</Tag>
				</Descriptions.Item>

				<Descriptions.Item label="Sync Status">
					<Tag color={syncStatus === "Synced" ? "green" : syncStatus === "Pending" ? "orange" : "red"}>
						{syncStatus}
					</Tag>
				</Descriptions.Item>

				<Descriptions.Item label="Validation Status">
					<Tag color={
						metadata.ValidationStatus === 1
							? "green"
							: metadata.ValidationStatus === 2
								? "red"
								: "default"
					}
					>
						{metadata.ValidationStatus === 1
							? "Passed"
							: metadata.ValidationStatus === 2
								? "Failed"
								: "Unknown"}
					</Tag>
				</Descriptions.Item>

				<Descriptions.Item label="Include in Report">
					<Tag color={metadata.ReportIncludeInd ? "green" : "default"}>
						{metadata.ReportIncludeInd ? "Yes" : "No"}
					</Tag>
				</Descriptions.Item>

				<Descriptions.Item label="Active">
					<Tag color={metadata.ActiveInd !== false ? "green" : "red"}>
						{metadata.ActiveInd !== false ? "Yes" : "No"}
					</Tag>
				</Descriptions.Item>

				<Descriptions.Item label="Created">
					{formatDate(metadata.CreatedOnDt)}
				</Descriptions.Item>

				<Descriptions.Item label="Created By">
					{metadata.CreatedBy || "N/A"}
				</Descriptions.Item>

				<Descriptions.Item label="Modified">
					{formatDate(metadata.ModifiedOnDt)}
				</Descriptions.Item>

				<Descriptions.Item label="Modified By">
					{metadata.ModifiedBy || "N/A"}
				</Descriptions.Item>

				<Descriptions.Item label="Row Version">
					{metadata.rv || "N/A"}
				</Descriptions.Item>

				{metadata.SupersededById && (
					<Descriptions.Item label="Superseded By">
						{metadata.SupersededById}
					</Descriptions.Item>
				)}

				{metadata.ValidationErrors && (
					<Descriptions.Item label="Validation Errors" span={2}>
						<span style={{ color: "red", fontSize: "12px" }}>
							{metadata.ValidationErrors}
						</span>
					</Descriptions.Item>
				)}
			</Descriptions>
		</Card>
	);
};
