/**
 * Import Modal Component
 *
 * Lightweight import feature for drillhole sections:
 * 1. Select template from server
 * 2. Upload fixed-width .txt file
 * 3. Process using Visual-Mapper parser
 * 4. Preview in simple HTML table
 * 5. Submit to insert into section
 */

import type { TemplateRow as ParserTemplateRow } from "#src/pages/visual-mapper/types/template";
import type { ImportTemplate, TemplateRow as ImportTemplateRow } from "#src/services/importTemplateService";
import { FixedWidthParser } from "#src/pages/visual-mapper/utils/fixed-width-parser";
import { markSectionDirty } from "#src/services/drillholeService";
import { fetchImportTemplates } from "#src/services/importTemplateService";
import { SectionKey } from "#src/types/drillhole";
import { FileTextOutlined, InboxOutlined } from "@ant-design/icons";
import { Alert, Button, message, Modal, Select, Space, Typography, Upload } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useCreateDrillHoleStore } from "../store/create-drillhole-store";

const { Text, Title } = Typography;
const { Dragger } = Upload;

interface ImportModalProps {
	open: boolean
	onClose: () => void
	targetSection?: SectionKey // Optional: pre-select section
}

/**
 * Map template tableNm to SectionKey
 */
const TABLE_NAME_TO_SECTION: Record<string, SectionKey> = {
	Sample: SectionKey.Sample,
	DrillMethod: SectionKey.DrillMethod,
	Survey: SectionKey.Survey,
	GeologyCombinedLog: SectionKey.GeoCombinedLog,
	ShearLog: SectionKey.ShearLog,
	StructureLog: SectionKey.StructureLog,
};

function getSectionKeyFromTableName(tableNm: string): SectionKey | null {
	return TABLE_NAME_TO_SECTION[tableNm] || null;
}

export const ImportModal: React.FC<ImportModalProps> = ({ open, onClose, targetSection }) => {
	// State
	const [templates, setTemplates] = useState<ImportTemplate[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectedTemplate, setSelectedTemplate] = useState<ImportTemplate | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [fileContent, setFileContent] = useState<string>("");
	const [parsedData, setParsedData] = useState<any[]>([]);
	const [errors, setErrors] = useState<string[]>([]);
	const [processing, setProcessing] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	// Store
	const store = useCreateDrillHoleStore();
	const drillHoleId = store.drillHoleId;
	const collarData = store.sections.collar?.data;

	// Load templates on open
	useEffect(() => {
		if (open) {
			setLoading(true);
			fetchImportTemplates()
				.then((data) => {
					setTemplates(data);
					console.log(`📋 [IMPORT] Loaded ${data.length} templates`);
				})
				.catch((error) => {
					console.error("❌ [IMPORT] Failed to load templates:", error);
					message.error("Failed to load templates");
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [open]);

	// Reset state when modal closes
	useEffect(() => {
		if (!open) {
			setSelectedTemplate(null);
			setFile(null);
			setFileContent("");
			setParsedData([]);
			setErrors([]);
		}
	}, [open]);

	/**
	 * Convert ImportTemplateRow to ParserTemplateRow format
	 * The parser expects Line to be a single number, not an array
	 */
	const convertTemplateRows = useCallback((rows: ImportTemplateRow[]): ParserTemplateRow[] => {
		return rows.map(row => ({
			Name: row.Name,
			Line: Array.isArray(row.Line) ? row.Line[0] : row.Line,
			start: row.start,
			length: row.length,
			Column: row.Column,
		}));
	}, []);

	// Handle file upload
	const handleFileChange = useCallback((file: File) => {
		console.log("📁 [IMPORT] File selected:", file.name);
		setFile(file);
		setParsedData([]); // Clear previous results
		setErrors([]);

		// Read file content
		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target?.result as string;
			setFileContent(content);
			console.log(`📄 [IMPORT] File loaded: ${content.length} characters`);
		};
		reader.onerror = () => {
			message.error("Failed to read file");
			console.error("❌ [IMPORT] File read error");
		};
		reader.readAsText(file);

		return false; // Prevent auto upload
	}, []);

	// Process file with Visual-Mapper parser
	const handleProcess = useCallback(() => {
		if (!selectedTemplate) {
			message.warning("Please select a template");
			return;
		}

		if (!fileContent) {
			message.warning("Please upload a file");
			return;
		}

		setProcessing(true);
		setErrors([]);

		try {
			console.log("⚙️ [IMPORT] Processing file with template:", selectedTemplate.templateName);

			// Convert template rows to parser format (Line must be number, not array)
			const parserTemplateRows = convertTemplateRows(selectedTemplate.templateRows);

			// Use existing Visual-Mapper parser!
			const results = FixedWidthParser(parserTemplateRows, fileContent);

			console.log("📊 [IMPORT] Parser results:", results);

			// Extract data array from results
			// Results structure depends on template, typically: { PatternName: [...rows] }
			let dataArray: any[] = [];

			// If results is already an array, use it
			if (Array.isArray(results)) {
				dataArray = results;
			}
			else {
				// Otherwise, get the first array property
				const firstKey = Object.keys(results).find(key => Array.isArray(results[key]));
				if (firstKey) {
					dataArray = results[firstKey];
				}
				else {
					throw new Error("No data arrays found in parse results");
				}
			}

			// Enrich data with context fields
			const enrichedData = dataArray.map(row => ({
				...row,
				CollarId: collarData?.CollarId || "",
				DrillHoleId: drillHoleId || "",
				RowStatus: -99, // New/Draft
				ValidationStatus: 0, // Not validated
				CreatedOnDt: new Date().toISOString(),
				ModifiedOnDt: new Date().toISOString(),
			}));

			setParsedData(enrichedData);
			message.success(`Parsed ${enrichedData.length} rows successfully`);
			console.log(`✅ [IMPORT] Parsed ${enrichedData.length} rows`);
		}
		catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Unknown error";
			console.error("❌ [IMPORT] Parse error:", error);
			setErrors([errorMessage]);
			message.error(`Failed to parse file: ${errorMessage}`);
		}
		finally {
			setProcessing(false);
		}
	}, [selectedTemplate, fileContent, collarData, drillHoleId]);

	// Submit import
	const handleSubmit = useCallback(async () => {
		if (parsedData.length === 0) {
			message.warning("No data to import");
			return;
		}

		if (!selectedTemplate) {
			message.error("No template selected");
			return;
		}

		setSubmitting(true);

		try {
			// Get target section from template
			const sectionKey = getSectionKeyFromTableName(selectedTemplate.tableNm);
			if (!sectionKey) {
				throw new Error(`Unknown table: ${selectedTemplate.tableNm}`);
			}

			console.log(`💾 [IMPORT] Inserting ${parsedData.length} rows into ${sectionKey}`);

			// Get current section data
			const section = store.sections[sectionKey];
			if (!section) {
				throw new Error(`Section not found: ${sectionKey}`);
			}

			const currentData = Array.isArray(section.data) ? section.data : [];

			// Merge: Append imported data to existing data
			const mergedData = [...currentData, ...parsedData];

			// Update section data
			store.updateSectionData(sectionKey, mergedData);

			// Mark section as dirty
			if (drillHoleId) {
				await markSectionDirty(drillHoleId, sectionKey);
			}

			message.success(`Imported ${parsedData.length} rows into ${sectionKey}`);
			console.log("✅ [IMPORT] Import complete");

			// Close modal
			onClose();
		}
		catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Unknown error";
			console.error("❌ [IMPORT] Submit error:", error);
			message.error(`Failed to submit import: ${errorMessage}`);
		}
		finally {
			setSubmitting(false);
		}
	}, [parsedData, selectedTemplate, store, drillHoleId, onClose]);

	// Get table headers for preview
	const getTableHeaders = (): string[] => {
		if (parsedData.length === 0)
			return [];
		return Object.keys(parsedData[0]);
	};

	return (
		<Modal
			title={(
				<Space>
					<FileTextOutlined />
					<span>Import Data</span>
				</Space>
			)}
			open={open}
			onCancel={onClose}
			width={1000}
			footer={null}
			destroyOnClose
		>
			<Space direction="vertical" style={{ width: "100%" }} size="large">
				{/* Step 1: Select Template */}
				<div>
					<Text strong>1. Select Import Template</Text>
					<Select
						style={{ width: "100%", marginTop: 8 }}
						placeholder="Choose a template..."
						loading={loading}
						value={selectedTemplate?.templateId}
						onChange={(templateId) => {
							const template = templates.find(t => t.templateId === templateId);
							setSelectedTemplate(template || null);
							console.log("📋 [IMPORT] Template selected:", template?.templateName);
						}}
						options={templates.map(t => ({
							label: `${t.templateName} (${t.tableNm})`,
							value: t.templateId,
						}))}
						notFoundContent={loading ? "Loading..." : "No templates available"}
					/>
					{selectedTemplate?.description && (
						<Text type="secondary" style={{ marginTop: 4, display: "block", fontSize: 12 }}>
							{selectedTemplate.description}
						</Text>
					)}
				</div>

				{/* Step 2: Upload File */}
				<div>
					<Text strong>2. Upload Fixed-Width Text File</Text>
					<Dragger
						beforeUpload={handleFileChange}
						showUploadList={false}
						accept=".txt"
						style={{ marginTop: 8 }}
						disabled={!selectedTemplate}
					>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">
							{file ? `📄 ${file.name}` : "Click or drag .txt file here to upload"}
						</p>
						<p className="ant-upload-hint">Fixed-width text files only (.txt)</p>
					</Dragger>
				</div>

				{/* Step 3: Process Button */}
				<Button
					type="primary"
					onClick={handleProcess}
					disabled={!selectedTemplate || !file}
					loading={processing}
					block
					size="large"
				>
					{processing ? "Processing..." : "⚙️ Process Import"}
				</Button>

				{/* Errors */}
				{errors.length > 0 && (
					<Alert
						type="error"
						message="Parsing Errors"
						description={(
							<ul style={{ margin: 0, paddingLeft: 20 }}>
								{errors.map((err, idx) => (
									<li key={idx}>{err}</li>
								))}
							</ul>
						)}
						showIcon
					/>
				)}

				{/* Step 4: Preview Table */}
				{parsedData.length > 0 && (
					<div>
						<Space style={{ marginBottom: 8 }}>
							<Text strong>4. Review Data</Text>
							<Text type="secondary">
								(
								{parsedData.length}
								{" "}
								rows)
							</Text>
						</Space>

						<div
							style={{
								maxHeight: 400,
								overflow: "auto",
								border: "1px solid #d9d9d9",
								borderRadius: 4,
							}}
						>
							<table
								style={{
									width: "100%",
									borderCollapse: "collapse",
									fontSize: 12,
								}}
							>
								<thead>
									<tr style={{ background: "#fafafa", position: "sticky", top: 0 }}>
										{getTableHeaders().map(header => (
											<th
												key={header}
												style={{
													padding: "8px 12px",
													borderBottom: "2px solid #d9d9d9",
													textAlign: "left",
													fontWeight: 600,
													whiteSpace: "nowrap",
												}}
											>
												{header}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{parsedData.slice(0, 100).map((row, idx) => (
										<tr
											key={idx}
											style={{
												borderBottom: "1px solid #f0f0f0",
												backgroundColor: idx % 2 === 0 ? "#fff" : "#fafafa",
											}}
										>
											{getTableHeaders().map(header => (
												<td
													key={header}
													style={{
														padding: "6px 12px",
														whiteSpace: "nowrap",
													}}
												>
													{String(row[header] ?? "")}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>

							{parsedData.length > 100 && (
								<div
									style={{
										padding: 12,
										textAlign: "center",
										background: "#fafafa",
										borderTop: "1px solid #d9d9d9",
										fontSize: 12,
										color: "#666",
									}}
								>
									... and
									{" "}
									{parsedData.length - 100}
									{" "}
									more row(s) (first 100 shown)
								</div>
							)}
						</div>

						<Alert
							type="info"
							message="Preview shows first 100 rows. All rows will be imported."
							style={{ marginTop: 8 }}
							showIcon
						/>
					</div>
				)}

				{/* Actions */}
				<div style={{ display: "flex", justifyContent: "flex-end", gap: 8, paddingTop: 8 }}>
					<Button onClick={onClose} disabled={submitting}>
						Cancel
					</Button>
					<Button
						type="primary"
						onClick={handleSubmit}
						disabled={parsedData.length === 0}
						loading={submitting}
					>
						Submit Import (
						{parsedData.length}
						{" "}
						rows)
					</Button>
				</div>
			</Space>
		</Modal>
	);
};
