import type { ColumnField, RowPattern } from "../types/template";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Form, Input, InputNumber, List, message, Modal, Space, Tag, Typography } from "antd";
import React, { useState } from "react";
import { useVisualMapperStore } from "../store/visual-mapper-store";
// import { ColumnFieldForm } from './ColumnFieldForm';
import { hasEndSentinel, parseLineRange } from "../utils/template-generator";
import { ColumnFieldForm } from "./ColumnFieldForm";

const { Text } = Typography;

export const RowPatternForm: React.FC = () => {
	const {
		selection,
		currentPattern,
		setCurrentPattern,
		addRowPattern,
		template,
		fileFormat,
		currentSheet,
	} = useVisualMapperStore();

	const [form] = Form.useForm();
	const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

	// TXT-specific state
	const [lineRangeInput, setLineRangeInput] = useState("");

	// XLSX-specific state
	const [startRowInput, setStartRowInput] = useState<number | null>(null);
	const [endRowInput, setEndRowInput] = useState<number | "end">("end");
	const [headerRowInput, setHeaderRowInput] = useState<number | null>(null);
	const [useHeaderRow, setUseHeaderRow] = useState(false);

	const handleStartPattern = () => {
		form.validateFields(["patternName"]).then((values) => {
			const patternName = values.patternName.trim();

			if (!patternName) {
				message.error("Pattern name is required");
				return;
			}

			if (!selection) {
				message.error("Please select a row in the file first");
				return;
			}

			// Allow duplicate pattern names - they will be merged during template application
			// Useful for files with multiple data sections using the same pattern

			let newPattern: RowPattern;

			if (fileFormat === "TXT") {
				// TXT pattern
				newPattern = {
					id: `pattern-${Date.now()}-${Math.random()}`,
					format: "TXT",
					name: patternName,
					exampleLine: selection.start.row,
					columns: [],
					appliedToLines: [],
				};
			}
			else {
				// XLSX pattern
				newPattern = {
					id: `pattern-${Date.now()}-${Math.random()}`,
					format: "XLSX",
					name: patternName,
					sheet: currentSheet || "",
					startRow: selection.start.row,
					endRow: "end",
					headerRow: useHeaderRow ? 0 : undefined,
					columns: [],
				};

				// Pre-populate form fields
				setStartRowInput(selection.start.row);
				setEndRowInput("end");
			}

			setCurrentPattern(newPattern);
			message.success("Pattern started. Now add columns.");
		});
	};

	const handleAddColumn = () => {
		if (!currentPattern) {
			message.error("Please start a pattern first");
			return;
		}
		setIsColumnModalOpen(true);
	};

	const handleColumnAdded = () => {
		setIsColumnModalOpen(false);
	};

	const handleRemoveColumn = (columnName: string) => {
		if (!currentPattern)
			return;

		setCurrentPattern({
			...currentPattern,
			columns: currentPattern.columns.filter(c => c.name !== columnName),
		});
	};

	const handleApplyToLines = () => {
		if (!currentPattern) {
			message.error("No pattern to apply");
			return;
		}

		if (currentPattern.columns.length === 0) {
			message.error("Please add at least one column to the pattern");
			return;
		}

		if (fileFormat === "TXT") {
			// TXT: Validate line range input
			if (!lineRangeInput.trim()) {
				message.error("Please enter line numbers or range");
				return;
			}

			const lines = parseLineRange(lineRangeInput);

			if (lines.length === 0) {
				message.error("Invalid line range format");
				return;
			}

			const updatedPattern: RowPattern = {
				...currentPattern,
				appliedToLines: lines,
			};

			addRowPattern(updatedPattern);

			const isToEnd = hasEndSentinel(lines);
			if (isToEnd) {
				message.success(`Pattern will be applied from line ${lines[0]} to end of file`);
			}
			else {
				message.success(`Pattern applied to ${lines.length} lines`);
			}

			// Reset form
			form.resetFields();
			setLineRangeInput("");
			setCurrentPattern(null);
		}
		else {
			// XLSX: Use startRow and endRow
			if (startRowInput === null) {
				message.error("Please specify start row");
				return;
			}

			const updatedPattern: RowPattern = {
				...currentPattern,
				startRow: startRowInput,
				endRow: endRowInput,
				headerRow: useHeaderRow ? (headerRowInput ?? 0) : undefined,
			};

			addRowPattern(updatedPattern);

			if (endRowInput === "end") {
				message.success(`Pattern will be applied from row ${startRowInput} to end of sheet`);
			}
			else {
				const rowCount = (endRowInput as number) - startRowInput + 1;
				message.success(`Pattern applied to ${rowCount} rows`);
			}

			// Reset form
			form.resetFields();
			setStartRowInput(null);
			setEndRowInput("end");
			setHeaderRowInput(null);
			setUseHeaderRow(false);
			setCurrentPattern(null);
		}
	};

	const handleCancel = () => {
		Modal.confirm({
			title: "Cancel Pattern Creation?",
			content: "All columns will be lost. Are you sure?",
			onOk: () => {
				setCurrentPattern(null);
				form.resetFields();
				setLineRangeInput("");
				setStartRowInput(null);
				setEndRowInput("end");
				setHeaderRowInput(null);
				setUseHeaderRow(false);
			},
		});
	};

	// Helper to display column info based on format
	const getColumnDescription = (col: ColumnField): string => {
		if (col.isEmpty)
			return "Empty";
		if (col.staticValue !== undefined)
			return `Static: "${col.staticValue}"`;

		if (fileFormat === "TXT") {
			// TXT column
			return `Pos: ${col.start}, Len: ${col.length}`;
		}
		else {
			// XLSX column
			const parts: string[] = [];
			if (col.col !== undefined)
				parts.push(`Col: ${col.col}`);
			if (col.headerName)
				parts.push(`Header: "${col.headerName}"`);
			if (col.sheet)
				parts.push(`Sheet: ${col.sheet}`);
			if (col.repeat === false)
				parts.push("Non-repeating");
			return parts.join(", ") || "Column";
		}
	};

	if (!currentPattern) {
		// Pattern creation start screen
		return (
			<Form form={form} layout="vertical" size="small">
				<Form.Item
					label="Pattern Name"
					name="patternName"
					rules={[{ required: true, message: "Please enter a pattern name" }]}
				>
					<Input placeholder="e.g., assay_data" />
				</Form.Item>

				{selection && (
					<div style={{ marginBottom: 12, padding: 8, background: "#f5f5f5", borderRadius: 4 }}>
						<Text type="secondary" style={{ fontSize: "12px" }}>
							{fileFormat === "TXT" ? "Example Line" : "Start Row"}
							:
							{selection.start.row}
							{fileFormat === "XLSX" && currentSheet && (
								<>
									{" "}
									| Sheet:
									{currentSheet}
								</>
							)}
						</Text>
					</div>
				)}

				{fileFormat === "XLSX" && (
					<Form.Item label="Use Header Row" style={{ marginBottom: 12 }}>
						<Checkbox
							checked={useHeaderRow}
							onChange={e => setUseHeaderRow(e.target.checked)}
						>
							Enable header-based column mapping
						</Checkbox>
						{useHeaderRow && (
							<InputNumber
								min={0}
								placeholder="Header row number"
								value={headerRowInput ?? 0}
								onChange={val => setHeaderRowInput(val)}
								style={{ width: "100%", marginTop: 8 }}
								size="small"
							/>
						)}
					</Form.Item>
				)}

				<Form.Item style={{ marginBottom: 0 }}>
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={handleStartPattern}
						disabled={!selection}
						block
					>
						Start Pattern
					</Button>
				</Form.Item>

				{!selection && (
					<Text type="secondary" style={{ fontSize: "12px" }}>
						{fileFormat === "TXT"
							? "Click on a line in the file to use as an example"
							: "Click on a row in the sheet to set start row"}
					</Text>
				)}
			</Form>
		);
	}

	// Pattern editing screen
	return (
		<div>
			<div style={{ marginBottom: 12 }}>
				<Text strong>Pattern: </Text>
				<Tag color="blue">{currentPattern.name}</Tag>
				{fileFormat === "XLSX" && currentPattern.sheet && (
					<Tag color="green">{currentPattern.sheet}</Tag>
				)}
				<br />
				<Text type="secondary" style={{ fontSize: "12px" }}>
					{fileFormat === "TXT"
						? `Example Line: ${currentPattern.exampleLine}`
						: `Start Row: ${currentPattern.startRow}`}
				</Text>
			</div>

			<Divider style={{ margin: "12px 0" }} />

			<div style={{ marginBottom: 12 }}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
					<Text strong>
						Columns (
						{currentPattern.columns.length}
						)
					</Text>
					<Button size="small" type="link" icon={<PlusOutlined />} onClick={handleAddColumn}>
						Add Column
					</Button>
				</div>

				{currentPattern.columns.length === 0
					? (
						<Text type="secondary" style={{ fontSize: "12px" }}>
							No columns defined yet. Select text and add columns.
						</Text>
					)
					: (
						<List
							size="small"
							dataSource={currentPattern.columns}
							renderItem={(col: ColumnField) => (
								<List.Item
									actions={[
										<Button
											key="delete"
											type="text"
											danger
											size="small"
											icon={<DeleteOutlined />}
											onClick={() => handleRemoveColumn(col.name)}
										/>,
									]}
								>
									<div style={{ flex: 1 }}>
										<Text strong style={{ fontSize: "12px" }}>{col.name}</Text>
										<br />
										<Text type="secondary" style={{ fontSize: "11px" }}>
											{getColumnDescription(col)}
										</Text>
									</div>
								</List.Item>
							)}
						/>
					)}
			</div>

			<Divider style={{ margin: "12px 0" }} />

			{fileFormat === "TXT" ? (
			// TXT: Line range input
				<div style={{ marginBottom: 12 }}>
					<Text strong>Apply to Lines</Text>
					<Input
						placeholder="e.g., 20-266 or 20,25,30-40"
						value={lineRangeInput}
						onChange={e => setLineRangeInput(e.target.value)}
						style={{ marginTop: 8 }}
						size="small"
					/>
					<Text type="secondary" style={{ fontSize: "11px", display: "block", marginTop: 4 }}>
						Enter line numbers, ranges, or comma-separated values
					</Text>
				</div>
			) : (
			// XLSX: Row range inputs
				<div style={{ marginBottom: 12 }}>
					<Text strong>Row Range</Text>
					<Space.Compact style={{ width: "100%", marginTop: 8 }}>
						<InputNumber
							placeholder="Start row"
							value={startRowInput}
							onChange={val => setStartRowInput(val)}
							min={0}
							style={{ width: "50%" }}
							size="small"
						/>
						<Input
							placeholder="End row or 'end'"
							value={endRowInput === "end" ? "end" : endRowInput}
							onChange={(e) => {
								const val = e.target.value.trim().toLowerCase();
								if (val === "end" || val === "") {
									setEndRowInput("end");
								}
								else {
									const num = Number.parseInt(val, 10);
									if (!isNaN(num)) {
										setEndRowInput(num);
									}
								}
							}}
							style={{ width: "50%" }}
							size="small"
						/>
					</Space.Compact>
					<Text type="secondary" style={{ fontSize: "11px", display: "block", marginTop: 4 }}>
						Enter start and end row numbers, or use "end" for last row
					</Text>
				</div>
			)}

			<Space direction="vertical" style={{ width: "100%" }}>
				<Button
					type="primary"
					onClick={handleApplyToLines}
					block
					disabled={currentPattern.columns.length === 0}
				>
					Save Pattern & Apply
				</Button>
				<Button onClick={handleCancel} block>
					Cancel
				</Button>
			</Space>

			<ColumnFieldForm
				open={isColumnModalOpen}
				onClose={() => setIsColumnModalOpen(false)}
				onColumnAdded={handleColumnAdded}
			/>
		</div>
	);
};
