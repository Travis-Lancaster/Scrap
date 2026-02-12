import type { UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import React from "react";
import * as XLSX from "xlsx";
import { useVisualMapperStore } from "../store/visual-mapper-store";

const { Dragger } = Upload;

export const FileDropzone: React.FC = () => {
	const {
		setFile,
		setFileContent,
		setFileFormat,
		setXlsxWorkbook,
		setXlsxSheets,
		setCurrentSheet,
	} = useVisualMapperStore();

	const processFile = (file: File) => {
		const fileExtension = file.name.split(".").pop()?.toLowerCase();

		if (fileExtension === "xlsx") {
			// Process XLSX file
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const data = e.target?.result;
					if (!data)
						return;

					const workbook = XLSX.read(data, { type: "array" });
					const sheetNames = workbook.SheetNames;

					if (sheetNames.length === 0) {
						message.error("No sheets found in the workbook");
						return;
					}

					setFileFormat("XLSX");
					setXlsxWorkbook(workbook);
					setXlsxSheets(sheetNames);
					setCurrentSheet(sheetNames[0]);
					message.success(`Loaded XLSX file with ${sheetNames.length} sheet(s)`);
				}
				catch (error) {
					message.error("Failed to parse XLSX file");
					console.error("XLSX parsing error:", error);
				}
			};
			reader.readAsArrayBuffer(file);
		}
		else {
			// Process TXT/CSV file
			const reader = new FileReader();
			reader.onload = (e) => {
				const content = e.target?.result;
				if (!content)
					return;

				setFileFormat("TXT");
				setFileContent(content as string);
				message.success("Loaded text file");
			};
			reader.readAsText(file);
		}
	};

	const props: UploadProps = {
		name: "file",
		multiple: false,
		accept: ".txt,.csv,.xlsx",
		showUploadList: false, // We handle display elsewhere
		beforeUpload: (file) => {
			setFile(file);
			processFile(file);
			return false; // Prevent auto upload
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};

	return (
		<div style={{ padding: "20px" }}>
			<Dragger {...props}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
				<p className="ant-upload-hint">
					Supports fixed-width text files (.txt, .csv) and Excel spreadsheets (.xlsx)
				</p>
			</Dragger>
		</div>
	);
};
