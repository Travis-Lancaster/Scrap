import type * as XLSX from "xlsx";

import { Card, Col, Row, Tag, Typography } from "antd";

import React from "react";
// import { SimpleFieldForm } from './SimpleFieldForm';
// import { RowPatternForm } from './RowPatternForm';
// import { FieldsList } from './FieldsList';
// import { TemplateActions } from './TemplateActions';
import { useVisualMapperStore } from "../store/visual-mapper-store";
import { FieldsList } from "./FieldsList";
import { ModeSelector } from "./ModeSelector";
import { RowPatternForm } from "./RowPatternForm";
import { SimpleFieldForm } from "./SimpleFieldForm";
import { TemplateActions } from "./TemplateActions";
import { TxtGrid } from "./TxtGrid";
import { XlsxViewer } from "./XlsxViewer";

const { Text } = Typography;

export const MappingWorkspace: React.FC = () => {
	const { fileContent, fileFormat, selection, mode, xlsxSheets } = useVisualMapperStore();

	const getPreviewValue = () => {
		if (!selection || !fileContent)
			return null;

		if (fileFormat === "TXT" && typeof fileContent === "string") {
			const lines = fileContent.split("\n");
			const row = selection.start.row;
			if (lines[row]) {
				const start = selection.start.col;
				const end = selection.end.col;
				return lines[row].substring(start, end + 1);
			}
		}
		else if (fileFormat === "XLSX") {
			// @ts-ignore - selection extended with sheet info
			const sheetName = selection.sheet;
			// @ts-ignore
			const cellAddress = selection.cellAddress;

			if (sheetName && cellAddress && fileContent && typeof fileContent !== "string") {
				const workbook = fileContent as XLSX.WorkBook;
				const worksheet = workbook.Sheets[sheetName];
				if (worksheet) {
					const cell = worksheet[cellAddress];
					return cell ? String(cell.v || "") : "";
				}
			}
		}

		return null;
	};

	const getPreviewLabel = () => {
		if (!selection)
			return null;

		if (fileFormat === "TXT") {
			return `Line: ${selection.start.row}, Start: ${selection.start.col}, Length: ${(selection.end.col - selection.start.col) + 1}`;
		}
		else {
			// @ts-ignore
			const sheetName = selection.sheet;
			// @ts-ignore
			const cellAddress = selection.cellAddress;
			return sheetName && cellAddress ? `${sheetName}!${cellAddress}` : "";
		}
	};

	const previewValue = getPreviewValue();
	const previewLabel = getPreviewLabel();

	const formatBadge = (
		<Tag color={fileFormat === "TXT" ? "blue" : "green"}>
			{fileFormat}
			{fileFormat === "XLSX" && xlsxSheets.length > 0 && ` (${xlsxSheets.length} sheet${xlsxSheets.length > 1 ? "s" : ""})`}
		</Tag>
	);

	return (
		<div style={{ height: "100%", padding: "10px" }}>
			<Row gutter={16} style={{ height: "100%" }}>
				{/* Left Panel - File Display */}
				<Col span={16} style={{ height: "100%", overflow: "hidden" }}>
					<Card
						title={(
							<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
								<span>Source File</span>
								{formatBadge}
							</div>
						)}
						style={{ height: "100%", display: "flex", flexDirection: "column" }}
						bodyStyle={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}
					>
						<div style={{ flex: 1, overflow: "hidden" }}>
							{fileFormat === "TXT"
								? (
									<TxtGrid content={typeof fileContent === "string" ? fileContent : ""} />
								)
								: (
									fileContent && typeof fileContent !== "string" && (
										<XlsxViewer workbook={fileContent as XLSX.WorkBook} />
									)
								)}
						</div>

						{selection && (
							<div style={{ marginTop: 10, padding: 10, background: "#f0f0f0", borderRadius: 4 }}>
								<Text strong>Selection: </Text>
								<Text code>{previewValue || "(empty)"}</Text>
								<div style={{ fontSize: "12px", color: "#888", marginTop: 4 }}>
									{previewLabel}
								</div>
							</div>
						)}
					</Card>
				</Col>

				{/* Right Panel - Controls */}
				<Col span={8} style={{ height: "100%", overflow: "auto" }}>
					<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
						<Card title="Mode" size="small">
							<ModeSelector />
						</Card>

						<Card title={mode === "simple" ? "Add Simple Field" : "Add Row Pattern"} size="small">
							{mode === "simple" ? <SimpleFieldForm /> : <RowPatternForm />}
						</Card>

						<FieldsList />

						<TemplateActions />
					</div>
				</Col>
			</Row>
		</div>
	);
};
