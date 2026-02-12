/**
 * Lab Results Importer
 *
 * File importer for laboratory assay results.
 * Allows uploading lab result files and mapping to Assay data.
 *
 * @module drill-hole-data/sections/forms
 */

import React, { useCallback, useState } from "react";

import {
	Button,
	Card,
	Col,
	Row,
	Select,
	Space,
	Table,
	Tag,
	Typography,
	Upload,
} from "antd";
import {
	CloudUploadOutlined,
	FileExcelOutlined,
	CheckCircleOutlined,
	WarningOutlined,
	InboxOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Dragger } = Upload;

export const LabResultsImporter: React.FC = () => {
	const [importedFiles, setImportedFiles] = useState<any[]>([]);
	const [selectedLab, setSelectedLab] = useState<string>("");

	console.log("[LabResultsImporter] Rendering", {
		importedFileCount: importedFiles.length,
		selectedLab,
	});

	// ========================================================================
	// Action Handlers
	// ========================================================================

	const handleLabSelect = useCallback((value: string) => {
		console.log("[LabResultsImporter] Lab selected:", value);
		setSelectedLab(value);
	}, []);

	const handleFileUpload = useCallback((info: any) => {
		console.log("[LabResultsImporter] File upload:", {
			fileName: info.file?.name,
			status: info.file?.status,
		});
		// UI-only: track uploaded files
		if (info.file?.status === "done" || info.file?.originFileObj) {
			setImportedFiles(prev => [...prev, {
				key: Date.now(),
				fileName: info.file.name || info.file.originFileObj?.name,
				lab: selectedLab,
				status: "Pending",
				records: 0,
				uploadedAt: new Date().toLocaleString(),
			}]);
		}
	}, [selectedLab]);

	const handleProcessFile = useCallback(() => {
		console.log("[LabResultsImporter] Process file clicked");
	}, []);

	const handlePreviewResults = useCallback(() => {
		console.log("[LabResultsImporter] Preview results clicked");
	}, []);

	// Import history columns
	const importHistoryColumns = [
		{ title: "File Name", dataIndex: "fileName", key: "fileName", width: 200 },
		{ title: "Laboratory", dataIndex: "lab", key: "lab", width: 120 },
		{ title: "Records", dataIndex: "records", key: "records", width: 80, align: "right" as const },
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			width: 120,
			render: (status: string) => {
				const color = status === "Imported" ? "green" : status === "Error" ? "red" : "blue";
				const icon = status === "Imported" ? <CheckCircleOutlined /> :
					status === "Error" ? <WarningOutlined /> : <CloudUploadOutlined />;
				return <Tag color={color} icon={icon}>{status}</Tag>;
			},
		},
		{ title: "Uploaded", dataIndex: "uploadedAt", key: "uploadedAt" },
	];

	return (
		<div className="flex-1 overflow-auto p-6 bg-slate-50">
			<Space direction="vertical" style={{ width: "100%" }} size="large">
				{/* Lab Selection & Upload */}
				<Card title="Import Lab Results" size="small">
					<Row gutter={16}>
						<Col span={8}>
							<div className="mb-2">
								<Text strong className="text-xs">Laboratory</Text>
							</div>
							<Select
								style={{ width: "100%" }}
								placeholder="Select laboratory"
								value={selectedLab || undefined}
								onChange={handleLabSelect}
								options={[
									{ label: "ALS Global", value: "ALS" },
									{ label: "SGS", value: "SGS" },
									{ label: "Bureau Veritas", value: "BV" },
									{ label: "Intertek", value: "INTERTEK" },
								]}
							/>
						</Col>
						<Col span={16}>
							<div className="mb-2">
								<Text strong className="text-xs">File Upload</Text>
							</div>
							<Dragger
								name="file"
								multiple={false}
								accept=".csv,.xlsx,.xls"
								onChange={handleFileUpload}
								beforeUpload={() => false}
								style={{ padding: "8px" }}
							>
								<p className="ant-upload-drag-icon">
									<InboxOutlined />
								</p>
								<p className="ant-upload-text text-sm">
									Click or drag lab result file here
								</p>
								<p className="ant-upload-hint text-xs">
									Supports CSV, XLSX formats. Max 50MB.
								</p>
							</Dragger>
						</Col>
					</Row>

					<Row className="mt-4">
						<Col span={24} className="flex justify-end">
							<Space>
								<Button
									icon={<FileExcelOutlined />}
									onClick={handlePreviewResults}
									disabled={importedFiles.length === 0}
								>
									Preview Results
								</Button>
								<Button
									type="primary"
									icon={<CloudUploadOutlined />}
									onClick={handleProcessFile}
									disabled={importedFiles.length === 0}
								>
									Process & Import
								</Button>
							</Space>
						</Col>
					</Row>
				</Card>

				{/* Import History */}
				<Card title="Import History" size="small">
					<Table
						columns={importHistoryColumns}
						dataSource={importedFiles}
						size="small"
						pagination={false}
						locale={{
							emptyText: (
								<div className="py-8 text-gray-400">
									<div className="text-lg mb-1">No imports yet</div>
									<div className="text-xs">
										Upload a lab result file to begin importing assay data.
									</div>
								</div>
							),
						}}
					/>
				</Card>
			</Space>
		</div>
	);
};
