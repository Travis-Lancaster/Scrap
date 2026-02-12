import type { ColumnField } from "../types/template";
import { Alert, Checkbox, Form, Input, InputNumber, message, Modal, Radio, Select, Space } from "antd";
import React, { useState } from "react";
import { useVisualMapperStore } from "../store/visual-mapper-store";

interface ColumnFieldFormProps {
	open: boolean
	onClose: () => void
	onColumnAdded: () => void
}

type TxtFieldType = "repeating" | "nonRepeating" | "static" | "empty";
type XlsxFieldType = "columnIndex" | "headerName" | "crossSheet" | "static" | "empty";

export const ColumnFieldForm: React.FC<ColumnFieldFormProps> = ({ open, onClose, onColumnAdded }) => {
	const { selection, currentPattern, setCurrentPattern, fileFormat, xlsxSheets, currentSheet } = useVisualMapperStore();
	const [form] = Form.useForm();

	// TXT-specific state
	const [txtFieldType, setTxtFieldType] = useState<TxtFieldType>("repeating");

	// XLSX-specific state
	const [xlsxFieldType, setXlsxFieldType] = useState<XlsxFieldType>("columnIndex");
	const [isNonRepeating, setIsNonRepeating] = useState(false);

	const handleOk = () => {
		form.validateFields().then((values) => {
			if (!currentPattern) {
				message.error("No pattern selected");
				return;
			}

			const columnName = values.columnName.trim();

			// Check for duplicate column names in current pattern
			const exists = currentPattern.columns.some(c => c.name === columnName);
			if (exists) {
				message.error("A column with this name already exists in this pattern");
				return;
			}

			let newColumn: ColumnField;

			if (fileFormat === "TXT") {
				// TXT column creation
				newColumn = createTxtColumn(values, columnName);
			}
			else {
				// XLSX column creation
				newColumn = createXlsxColumn(values, columnName);
			}

			// Add column to current pattern
			setCurrentPattern({
				...currentPattern,
				columns: [...currentPattern.columns, newColumn],
			});

			message.success("Column added");
			form.resetFields();
			setTxtFieldType("repeating");
			setXlsxFieldType("columnIndex");
			setIsNonRepeating(false);
			onColumnAdded();
		});
	};

	const createTxtColumn = (values: any, columnName: string): ColumnField => {
		if (txtFieldType === "empty") {
			return {
				name: columnName,
				start: 0,
				length: 0,
				isEmpty: true,
			};
		}
		else if (txtFieldType === "static") {
			const staticValue = values.staticValue?.trim();
			if (!staticValue && staticValue !== 0) {
				throw new Error("Please enter a static value");
			}

			const numValue = Number(staticValue);
			return {
				name: columnName,
				start: 0,
				length: 0,
				staticValue: !isNaN(numValue) && staticValue === numValue.toString() ? numValue : staticValue,
			};
		}
		else if (txtFieldType === "nonRepeating") {
			if (!selection) {
				throw new Error("Please select text in the file first");
			}

			return {
				name: columnName,
				start: selection.start.col,
				length: (selection.end.col - selection.start.col) + 1,
				repeat: false,
				sourceLine: selection.start.row,
			};
		}
		else {
			// Repeating fixed-width
			if (!selection) {
				throw new Error("Please select text in the file first");
			}

			return {
				name: columnName,
				start: selection.start.col,
				length: (selection.end.col - selection.start.col) + 1,
				repeat: true,
			};
		}
	};

	const createXlsxColumn = (values: any, columnName: string): ColumnField => {
		if (xlsxFieldType === "empty") {
			return {
				name: columnName,
				isEmpty: true,
			};
		}
		else if (xlsxFieldType === "static") {
			const staticValue = values.staticValue?.trim();
			if (!staticValue && staticValue !== 0) {
				throw new Error("Please enter a static value");
			}

			const numValue = Number(staticValue);
			return {
				name: columnName,
				staticValue: !isNaN(numValue) && staticValue === numValue.toString() ? numValue : staticValue,
			};
		}
		else if (xlsxFieldType === "columnIndex") {
			const colIndex = values.columnIndex;
			if (colIndex === undefined || colIndex === null) {
				throw new Error("Please specify column index");
			}

			const column: ColumnField = {
				name: columnName,
				col: colIndex,
				repeat: !isNonRepeating,
			};

			if (isNonRepeating) {
				column.sourceRow = values.sourceRow ?? 0;
			}

			return column;
		}
		else if (xlsxFieldType === "headerName") {
			const headerName = values.headerName?.trim();
			if (!headerName) {
				throw new Error("Please enter header name");
			}

			return {
				name: columnName,
				headerName,
				repeat: !isNonRepeating,
				sourceRow: isNonRepeating ? (values.sourceRow ?? 0) : undefined,
			};
		}
		else if (xlsxFieldType === "crossSheet") {
			const targetSheet = values.targetSheet;
			const colIndex = values.columnIndex;

			if (!targetSheet) {
				throw new Error("Please select target sheet");
			}
			if (colIndex === undefined || colIndex === null) {
				throw new Error("Please specify column index");
			}

			const column: ColumnField = {
				name: columnName,
				col: colIndex,
				sheet: targetSheet,
				repeat: !isNonRepeating,
			};

			if (isNonRepeating) {
				column.sourceRow = values.sourceRow ?? 0;
			}

			return column;
		}

		throw new Error("Invalid XLSX field type");
	};

	const handleCancel = () => {
		form.resetFields();
		setTxtFieldType("repeating");
		setXlsxFieldType("columnIndex");
		setIsNonRepeating(false);
		onClose();
	};

	return (
		<Modal
			title="Add Column"
			open={open}
			onOk={handleOk}
			onCancel={handleCancel}
			okText="Add Column"
			width={500}
		>
			<Form form={form} layout="vertical">
				<Form.Item
					label="Column Name"
					name="columnName"
					rules={[{ required: true, message: "Please enter a column name" }]}
				>
					<Input placeholder="e.g., GenericMethod, AssayResult" />
				</Form.Item>

				{fileFormat === "TXT" ? (
				// TXT Field Type Selection
					<>
						<Form.Item label="Field Type">
							<Radio.Group value={txtFieldType} onChange={e => setTxtFieldType(e.target.value)}>
								<Space direction="vertical">
									<Radio value="repeating">
										<strong>Repeating</strong>
										{" "}
										- Extract from each data row
									</Radio>
									<Radio value="nonRepeating">
										<strong>Non-Repeating</strong>
										{" "}
										- Extract once from header line, apply to all rows
									</Radio>
									<Radio value="static">
										<strong>Static</strong>
										{" "}
										- Same literal value for all rows
									</Radio>
									<Radio value="empty">
										<strong>Empty</strong>
										{" "}
										- Empty object (
										{"{}"}
										)
									</Radio>
								</Space>
							</Radio.Group>
						</Form.Item>

						{(txtFieldType === "repeating" || txtFieldType === "nonRepeating") && selection && (
							<div style={{ padding: 12, background: "#f5f5f5", borderRadius: 4, marginBottom: 12 }}>
								<div><strong>Selection:</strong></div>
								<div style={{ fontSize: "12px", color: "#666" }}>
									Start:
									{" "}
									{selection.start.col}
									, Length:
									{(selection.end.col - selection.start.col) + 1}
								</div>
							</div>
						)}

						{(txtFieldType === "repeating" || txtFieldType === "nonRepeating") && !selection && (
							<div style={{ padding: 12, background: "#fff7e6", border: "1px solid #ffd591", borderRadius: 4, marginBottom: 12 }}>
								<div style={{ fontSize: "12px", color: "#d46b08" }}>
									⚠️ Please select text in the file to define the column position
								</div>
							</div>
						)}

						{txtFieldType === "nonRepeating" && selection && (
							<Alert
								type="info"
								message={`Will extract from line ${selection.start.row}`}
								description="Value will be taken once from the selected line and applied to all data rows"
								style={{ marginBottom: 12 }}
							/>
						)}

						{txtFieldType === "static" && (
							<Form.Item
								label="Static Value"
								name="staticValue"
								rules={[{ required: true, message: "Please enter a static value" }]}
							>
								<Input placeholder="e.g., Au_FAA505_PPM" />
							</Form.Item>
						)}

						{txtFieldType === "empty" && (
							<div style={{ padding: 12, background: "#f5f5f5", borderRadius: 4, marginBottom: 12 }}>
								<div style={{ fontSize: "12px", color: "#666" }}>
									This column will have an empty object value (
									{}
									) in the output
								</div>
							</div>
						)}
					</>
				) : (
				// XLSX Field Type Selection
					<>
						<Form.Item label="Column Strategy">
							<Radio.Group value={xlsxFieldType} onChange={e => setXlsxFieldType(e.target.value)}>
								<Space direction="vertical">
									<Radio value="columnIndex">
										<strong>Column Index</strong>
										{" "}
										- By column number (A=0, B=1, C=2...)
									</Radio>
									<Radio value="headerName">
										<strong>Header Name</strong>
										{" "}
										- Find column by header text
									</Radio>
									<Radio value="crossSheet">
										<strong>Cross-Sheet</strong>
										{" "}
										- Reference data from another sheet
									</Radio>
									<Radio value="static">
										<strong>Static</strong>
										{" "}
										- Same literal value for all rows
									</Radio>
									<Radio value="empty">
										<strong>Empty</strong>
										{" "}
										- Empty object (
										{"{}"}
										)
									</Radio>
								</Space>
							</Radio.Group>
						</Form.Item>

						{xlsxFieldType === "columnIndex" && (
							<>
								<Form.Item
									label="Column Index"
									name="columnIndex"
									rules={[{ required: true, message: "Please enter column index" }]}
								>
									<InputNumber min={0} placeholder="e.g., 0 (A), 1 (B), 2 (C)..." style={{ width: "100%" }} />
								</Form.Item>
								<Checkbox checked={isNonRepeating} onChange={e => setIsNonRepeating(e.target.checked)}>
									Non-repeating (extract once from specific row)
								</Checkbox>
								{isNonRepeating && (
									<Form.Item label="Source Row" name="sourceRow" style={{ marginTop: 12 }}>
										<InputNumber min={0} placeholder="Row number" style={{ width: "100%" }} />
									</Form.Item>
								)}
							</>
						)}

						{xlsxFieldType === "headerName" && (
							<>
								<Form.Item
									label="Header Name"
									name="headerName"
									rules={[{ required: true, message: "Please enter header name" }]}
								>
									<Input placeholder="e.g., Sample ID, Au (ppm)" />
								</Form.Item>
								<Alert
									type="info"
									message="Column will be found by matching header text"
									description="Pattern must have a header row configured"
									style={{ marginBottom: 12 }}
								/>
								<Checkbox checked={isNonRepeating} onChange={e => setIsNonRepeating(e.target.checked)}>
									Non-repeating (extract once from specific row)
								</Checkbox>
								{isNonRepeating && (
									<Form.Item label="Source Row" name="sourceRow" style={{ marginTop: 12 }}>
										<InputNumber min={0} placeholder="Row number" style={{ width: "100%" }} />
									</Form.Item>
								)}
							</>
						)}

						{xlsxFieldType === "crossSheet" && (
							<>
								<Form.Item
									label="Target Sheet"
									name="targetSheet"
									rules={[{ required: true, message: "Please select target sheet" }]}
								>
									<Select placeholder="Select sheet">
										{xlsxSheets.map(sheet => (
											<Select.Option key={sheet} value={sheet}>{sheet}</Select.Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item
									label="Column Index"
									name="columnIndex"
									rules={[{ required: true, message: "Please enter column index" }]}
								>
									<InputNumber min={0} placeholder="e.g., 0 (A), 1 (B), 2 (C)..." style={{ width: "100%" }} />
								</Form.Item>
								<Alert
									type="info"
									message="Cross-sheet reference"
									description="Data will be extracted from the specified sheet instead of the main data sheet"
									style={{ marginBottom: 12 }}
								/>
								<Checkbox checked={isNonRepeating} onChange={e => setIsNonRepeating(e.target.checked)}>
									Non-repeating (extract once from specific row)
								</Checkbox>
								{isNonRepeating && (
									<Form.Item label="Source Row" name="sourceRow" style={{ marginTop: 12 }}>
										<InputNumber min={0} placeholder="Row number" style={{ width: "100%" }} />
									</Form.Item>
								)}
							</>
						)}

						{xlsxFieldType === "static" && (
							<Form.Item
								label="Static Value"
								name="staticValue"
								rules={[{ required: true, message: "Please enter a static value" }]}
							>
								<Input placeholder="e.g., Au_FAA505_PPM" />
							</Form.Item>
						)}

						{xlsxFieldType === "empty" && (
							<div style={{ padding: 12, background: "#f5f5f5", borderRadius: 4, marginBottom: 12 }}>
								<div style={{ fontSize: "12px", color: "#666" }}>
									This column will have an empty object value (
									{}
									) in the output
								</div>
							</div>
						)}
					</>
				)}
			</Form>
		</Modal>
	);
};
