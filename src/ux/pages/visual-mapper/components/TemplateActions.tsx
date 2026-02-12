import type { CreateTemplateDto, UpdateTemplateDto } from "#src/api/database/data-contracts";
// import { ResultsModal } from './ResultsModal';
import type { UploadProps } from "antd";
import { apiClient } from "#src/services/apiClient";
import { DownloadOutlined, EyeOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, Modal, Space, Upload } from "antd";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useVisualMapperStore } from "../store/visual-mapper-store";
import { FixedWidthParser } from "../utils/fixed-width-parser";
import { generateTemplate } from "../utils/template-generator";
import { importTemplate, validateTemplateRows } from "../utils/template-importer";
import { XlsxParser } from "../utils/xlsx-parser";
import { ResultsModal } from "./ResultsModal";

export const TemplateActions: React.FC = () => {
	const {
		template,
		fileContent,
		fileFormat,
		xlsxWorkbook,
		currentSheet,
		importTemplate: importToStore,
		templateId,
		setTemplateId,
	} = useVisualMapperStore();
	const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
	const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
	const [parsedResults, setParsedResults] = useState<any>(null);
	const [saveForm] = Form.useForm();

	const getTotalLines = (): number | undefined => {
		if (!fileContent)
			return undefined;

		if (fileFormat === "TXT" && typeof fileContent === "string") {
			return fileContent.split("\n").length;
		}
		else if (fileFormat === "XLSX" && xlsxWorkbook && currentSheet) {
			// For XLSX, get row count from current sheet
			const worksheet = xlsxWorkbook.Sheets[currentSheet];
			if (worksheet) {
				const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
				return range.e.r + 1; // +1 because it's 0-based
			}
		}

		return undefined;
	};

	const handleExport = () => {
		const totalItems = template.simpleFields.length + template.rowPatterns.length;

		if (totalItems === 0) {
			message.warning("No fields or patterns to export");
			return;
		}

		// Calculate total lines for "to end" pattern resolution
		const totalLines = getTotalLines();
		const templateRows = generateTemplate(template, totalLines);
		const jsonStr = JSON.stringify(templateRows, null, 2);
		const blob = new Blob([jsonStr], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "transformTemplate.json";
		link.click();
		URL.revokeObjectURL(url);

		message.success(`Exported ${templateRows.length} template rows`);
	};

	const handleImport: UploadProps["beforeUpload"] = (file) => {
		const reader = new FileReader();

		reader.onload = (e) => {
			try {
				const content = e.target?.result as string;
				const data = JSON.parse(content);

				if (!validateTemplateRows(data)) {
					message.error("Invalid template format");
					return;
				}

				const importedTemplate = importTemplate(data);
				importToStore(importedTemplate);

				const totalItems = importedTemplate.simpleFields.length + importedTemplate.rowPatterns.length;
				message.success(`Imported ${totalItems} items successfully`);
			}
			catch (error) {
				console.error("Import error:", error);
				message.error("Failed to import template. Please check the file format.");
			}
		};

		reader.readAsText(file);
		return false; // Prevent upload
	};

	const handleApplyTemplate = () => {
		if (!fileContent) {
			message.error("No file loaded");
			return;
		}

		const totalItems = template.simpleFields.length + template.rowPatterns.length;

		if (totalItems === 0) {
			message.warning("No fields or patterns to apply");
			return;
		}

		try {
			// Calculate total lines/rows for "to end" pattern resolution
			const totalLines = getTotalLines();
			const templateRows = generateTemplate(template, totalLines);

			let results;

			if (fileFormat === "TXT" && typeof fileContent === "string") {
				// Parse TXT file
				results = FixedWidthParser(templateRows, fileContent);
			}
			else if (fileFormat === "XLSX" && xlsxWorkbook) {
				// Parse XLSX file
				results = XlsxParser(templateRows, xlsxWorkbook);
			}
			else {
				message.error("Unsupported file format or invalid file content");
				return;
			}

			setParsedResults(results);
			setIsResultsModalOpen(true);
			message.success("Template applied successfully");
		}
		catch (error) {
			console.error("Parse error:", error);
			message.error("Failed to apply template. Please check your field definitions.");
		}
	};

	const handleSaveToLibrary = () => {
		// Pre-fill form with current template name
		saveForm.setFieldsValue({
			name: template.name || "Untitled Template",
			description: "",
			fileType: "",
		});
		setIsSaveModalOpen(true);
	};

	const handleSaveConfirm = async () => {
		try {
			const values = await saveForm.validateFields();

			// Generate the template JSON
			const totalLines = getTotalLines();
			const templateRows = generateTemplate(template, totalLines);
			const templateJson = JSON.stringify(templateRows);

			if (templateId) {
				// Update existing template
				const updateDto: UpdateTemplateDto = {
					TemplateNm: values.name,
					Description: values.description,
					TemplateType: values.fileType,
					JsonData: templateJson,
				};
				await apiClient.templateControllerUpdate(templateId, updateDto);
				message.success(`Updated template: ${values.name}`);
			}
			else {
				// Create new template
				const createDto: CreateTemplateDto = {
					TemplateNm: values.name,
					Description: values.description,
					TemplateType: values.fileType,
					JsonData: templateJson,
					Organization: "default", // Required field
				};
				const response = await apiClient.templateControllerCreate(createDto);

				// Store the new template ID
				if (response.data?.TemplateId) {
					setTemplateId(response.data.TemplateId);
				}

				message.success(`Saved template: ${values.name} to library`);
			}

			setIsSaveModalOpen(false);
			saveForm.resetFields();
		}
		catch (error) {
			console.error("Save error:", error);
			message.error("Failed to save template to database");
		}
	};

	const totalItems = template.simpleFields.length + template.rowPatterns.length;
	const hasFile = !!fileContent;

	return (
		<>
			<Card title="Actions" size="small">
				<Space direction="vertical" style={{ width: "100%" }}>
					<Button
						icon={<SaveOutlined />}
						onClick={handleSaveToLibrary}
						disabled={totalItems === 0}
						type="primary"
						block
					>
						{templateId ? "Update in Library" : "Save to Library"}
					</Button>

					<Button
						icon={<DownloadOutlined />}
						onClick={handleExport}
						disabled={totalItems === 0}
						block
					>
						Export JSON
					</Button>

					<Upload
						accept=".json"
						showUploadList={false}
						beforeUpload={handleImport}
					>
						<Button icon={<UploadOutlined />} block>
							Import JSON
						</Button>
					</Upload>

					<Button
						icon={<EyeOutlined />}
						onClick={handleApplyTemplate}
						disabled={!hasFile || totalItems === 0}
						block
					>
						Apply & Preview
					</Button>
				</Space>

				{totalItems === 0 && (
					<div style={{ marginTop: 8, fontSize: "11px", color: "#888" }}>
						Add fields or patterns to enable actions
					</div>
				)}
			</Card>

			<ResultsModal
				open={isResultsModalOpen}
				results={parsedResults}
				onClose={() => setIsResultsModalOpen(false)}
			/>

			<Modal
				title={templateId ? "Update Template" : "Save Template to Library"}
				open={isSaveModalOpen}
				onCancel={() => setIsSaveModalOpen(false)}
				onOk={handleSaveConfirm}
				okText="Save"
			>
				<Form form={saveForm} layout="vertical">
					<Form.Item
						name="name"
						label="Template Name"
						rules={[{ required: true, message: "Please enter a template name" }]}
					>
						<Input placeholder="e.g., Lab Report V1" />
					</Form.Item>

					<Form.Item
						name="description"
						label="Description"
					>
						<Input.TextArea
							rows={3}
							placeholder="Brief description of this template (optional)"
						/>
					</Form.Item>

					<Form.Item
						name="fileType"
						label="File Type"
					>
						<Input placeholder="e.g., Lab Report, Survey Results (optional)" />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
