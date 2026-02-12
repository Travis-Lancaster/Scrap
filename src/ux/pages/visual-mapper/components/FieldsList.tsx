import type { ColumnField } from "../types/template";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Empty, List, Popconfirm, Space, Tabs, Tag } from "antd";
import React from "react";
import { useVisualMapperStore } from "../store/visual-mapper-store";
import { isTxtField, isTxtPattern, isXlsxField, isXlsxPattern } from "../types/template";
import { formatLineRange, hasEndSentinel } from "../utils/template-generator";

function getColumnTypeColor(col: ColumnField): string {
	if (col.isEmpty)
		return "default";
	if (col.staticValue !== undefined)
		return "green";
	if (col.repeat === false)
		return "orange";
	return "blue"; // repeating
}

function getColumnTypeLabel(col: ColumnField): string {
	if (col.isEmpty)
		return "Empty";
	if (col.staticValue !== undefined)
		return "Static";
	if (col.repeat === false)
		return `Non-rep:L${col.sourceLine}`;
	return "Repeat";
}

export const FieldsList: React.FC = () => {
	const {
		template,
		removeSimpleField,
		removeRowPattern,
		setSelectedItemId,
		setMode,
	} = useVisualMapperStore();

	const handleEditField = (fieldId: string) => {
		setMode("simple");
		setSelectedItemId(fieldId);
	};

	const handleEditPattern = (patternId: string) => {
		setMode("pattern");
		setSelectedItemId(patternId);
		// Note: Full pattern editing could be added later
	};

	const simpleFieldsTab = (
		<div style={{ maxHeight: "300px", overflow: "auto" }}>
			{template.simpleFields.length === 0
				? (
					<Empty
						description="No simple fields defined"
						image={Empty.PRESENTED_IMAGE_SIMPLE}
					/>
				)
				: (
					<List
						size="small"
						dataSource={template.simpleFields}
						renderItem={(field) => {
							const formatTag = (
								<Tag color={field.format === "TXT" ? "blue" : "green"} style={{ fontSize: "10px" }}>
									{field.format}
								</Tag>
							);

							const fieldInfo = isTxtField(field)
								? (
									<>
										Line:
										{" "}
										{field.line}
										, Start:
										{field.start}
										, Length:
										{field.length}
									</>
								)
								: isXlsxField(field)
									? (
										<>
											<Tag color="purple" style={{ fontSize: "10px", marginRight: 4 }}>
												{field.sheet}
											</Tag>
											Cell:
											{" "}
											{field.cell}
											{" "}
											(R
											{(field.row ?? 0) + 1}
											C
											{(field.col ?? 0) + 1}
											)
										</>
									)
									: null;

							return (
								<List.Item
									actions={[
										<Button
											key="edit"
											type="text"
											size="small"
											icon={<EditOutlined />}
											onClick={() => handleEditField(field.id)}
										/>,
										<Popconfirm
											key="delete"
											title="Delete this field?"
											onConfirm={() => removeSimpleField(field.id)}
											okText="Yes"
											cancelText="No"
										>
											<Button
												type="text"
												danger
												size="small"
												icon={<DeleteOutlined />}
											/>
										</Popconfirm>,
									]}
								>
									<div style={{ flex: 1 }}>
										<div>
											<strong>{field.name}</strong>
											{formatTag}
										</div>
										<div style={{ fontSize: "11px", color: "#888" }}>
											{fieldInfo}
										</div>
									</div>
								</List.Item>
							);
						}}
					/>
				)}
		</div>
	);

	// Group patterns by name to show merged patterns
	const patternGroups = template.rowPatterns.reduce((acc, p) => {
		if (!acc[p.name]) {
			acc[p.name] = [];
		}
		acc[p.name].push(p);
		return acc;
	}, {} as Record<string, typeof template.rowPatterns>);

	const rowPatternsTab = (
		<div style={{ maxHeight: "300px", overflow: "auto" }}>
			{template.rowPatterns.length === 0 ? (
				<Empty
					description="No row patterns defined"
					image={Empty.PRESENTED_IMAGE_SIMPLE}
				/>
			) : (
				<List
					size="small"
					dataSource={Object.entries(patternGroups)}
					renderItem={([patternName, patterns]) => {
						const firstPattern = patterns[0];
						const formatTag = (
							<Tag color={firstPattern.format === "TXT" ? "blue" : "green"} style={{ fontSize: "10px", marginLeft: 8 }}>
								{firstPattern.format}
							</Tag>
						);

						// Calculate total lines/rows
						const totalLines = isTxtPattern(firstPattern)
							? patterns.reduce((sum, p) => sum + (p.appliedToLines?.length || 0), 0)
							: patterns.length; // XLSX: one pattern per sheet typically

						return (
							<List.Item
								actions={
									patterns.length === 1
										? [
											<Popconfirm
												key="delete"
												title="Delete this pattern?"
												description="This will remove all rows using this pattern."
												onConfirm={() => removeRowPattern(patterns[0].id)}
												okText="Yes"
												cancelText="No"
											>
												<Button
													type="text"
													danger
													size="small"
													icon={<DeleteOutlined />}
												/>
											</Popconfirm>,
										]
										: undefined
								}
							>
								<div style={{ flex: 1 }}>
									<div>
										<strong>{patternName}</strong>
										{formatTag}
										<Tag color="cyan" style={{ marginLeft: 4, fontSize: "10px" }}>
											{firstPattern.columns.length}
											{" "}
											cols
										</Tag>
										{patterns.length > 1 && (
											<Tag color="purple" style={{ marginLeft: 4, fontSize: "10px" }}>
												×
												{patterns.length}
												{" "}
												instances
											</Tag>
										)}
										{isTxtPattern(firstPattern) && hasEndSentinel(firstPattern.appliedToLines ?? []) && (
											<Tag color="orange" style={{ marginLeft: 4, fontSize: "10px" }}>to EOF</Tag>
										)}
									</div>

									{/* Line/Row ranges */}
									<div style={{ fontSize: "11px", color: "#888", marginTop: 4 }}>
										{isTxtPattern(firstPattern)
											? (
												patterns.length === 1
													? (
														hasEndSentinel(firstPattern.appliedToLines ?? [])
															? `Applied from line ${firstPattern.appliedToLines?.[0] ?? 0} to end of file`
															: `Applied to: ${formatLineRange(firstPattern.appliedToLines ?? [])} (${totalLines} lines)`
													)
													: (
														`Total: ${totalLines} lines across ${patterns.length} instances`
													)
											)
											: isXlsxPattern(firstPattern)
												? (
													<>
														<Tag color="purple" style={{ fontSize: "10px", marginRight: 4 }}>
															{firstPattern.sheet}
														</Tag>
														Rows:
														{" "}
														{firstPattern.startRow}
														-
														{firstPattern.endRow === "end" ? "EOF" : firstPattern.endRow}
														{firstPattern.headerRow !== undefined && ` (Header: ${firstPattern.headerRow})`}
													</>
												)
												: null}
									</div>

									{/* Show individual instances if multiple */}
									{patterns.length > 1 && (
										<div style={{ fontSize: "10px", color: "#999", marginTop: 4 }}>
											{patterns.map((p, idx) => (
												<div key={p.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
													<span>
														#
														{idx + 1}
														:
														{formatLineRange(p.appliedToLines ?? [])}
													</span>
													<Popconfirm
														title="Delete this instance?"
														onConfirm={() => removeRowPattern(p.id)}
														okText="Yes"
														cancelText="No"
													>
														<Button
															type="text"
															danger
															size="small"
															style={{ fontSize: "10px", padding: 0, height: "auto" }}
														>
															×
														</Button>
													</Popconfirm>
												</div>
											))}
										</div>
									)}

									{/* Column types with badges */}
									<div style={{ marginTop: 6 }}>
										<Space size={[4, 4]} wrap>
											{firstPattern.columns.map((col, idx) => (
												<Tag
													key={idx}
													color={getColumnTypeColor(col)}
													style={{ fontSize: "10px", margin: 0 }}
												>
													{col.name}
													{" "}
													(
													{getColumnTypeLabel(col)}
													)
												</Tag>
											))}
										</Space>
									</div>
								</div>
							</List.Item>
						);
					}}
				/>
			)}
		</div>
	);

	const totalItems = template.simpleFields.length + template.rowPatterns.length;

	return (
		<Card
			title={`Template Items (${totalItems})`}
			size="small"
		>
			<Tabs
				size="small"
				items={[
					{
						key: "simple",
						label: `Simple (${template.simpleFields.length})`,
						children: simpleFieldsTab,
					},
					{
						key: "patterns",
						label: `Patterns (${Object.keys(patternGroups).length})`,
						children: rowPatternsTab,
					},
				]}
			/>
		</Card>
	);
};
