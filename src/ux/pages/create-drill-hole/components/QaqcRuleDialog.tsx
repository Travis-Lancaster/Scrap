import type {
	QaqcInsertionRule,
	StandardSequenceEntry,
} from "../validation/sample-schemas";
import { SheetFormField } from "#src/components/sheets/SheetFormField.js";
import { LookupResolver } from "#src/services/lookupResolver.js";
import { DeleteOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";

import { zodResolver } from "@hookform/resolvers/zod";
import { App, Button, Card, Descriptions, Form, List, Modal, Select, Space, Switch, Typography } from "antd";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCreateDrillHoleStore } from "../store/create-drillhole-store";
import {
	qaqcInsertionRuleSchema,
} from "../validation/sample-schemas";
import styles from "./QaqcRuleDialog.module.css";

const { Title, Text } = Typography;

interface QaqcRuleDialogProps {
	open: boolean
	onClose: () => void
	onRuleSelected: (rule: QaqcInsertionRule) => void
	organization?: string
	laboratory?: string
	laboratoryOptions: Array<{ value: string, label: string }>
}

export function QaqcRuleDialog({
	open,
	onClose,
	onRuleSelected,
	organization,
	laboratory,
	laboratoryOptions,
}: QaqcRuleDialogProps) {
	const navigate = useNavigate();
	const { message } = App.useApp();
	// TODO: Implement QAQC methods in create-drillhole-store
	const fetchAllQCInsertionRules = async (org: string) => {
		// Placeholder - will be implemented when QAQC is integrated
		return [];
	};
	const saveQCInsertionRule = async (rule: QaqcInsertionRule) => {
		// Placeholder - will be implemented when QAQC is integrated
		console.log("Save QAQC rule:", rule);
	};
	const loading = false; // Since QAQC operations don't use drill-plan-specific loading, use false

	const [isEditMode, setIsEditMode] = useState(false);
	const [availableRules, setAvailableRules] = useState<QaqcInsertionRule[]>([]);
	const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);

	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<QaqcInsertionRule>({
		resolver: zodResolver(qaqcInsertionRuleSchema),
		defaultValues: {
			Code: "",
			Description: "",
			Organization: organization || "",
			Laboratory: laboratory || "",
			SampleIdPrefix: "",
			SampleIntervalSize: 1.0,
			BlankFrequency: 25,
			StandardFrequency: 25,
			PrepDupFrequency: 50,
			FDupFrequency: 50,
			IsDefaultInd: false,
			StandardSequence: [],
			// ActiveInd: true,
			// SortOrder: 0,
		},
	});

	// Manage StandardSequence array
	const { fields, append, remove, move, update } = useFieldArray({
		control,
		name: "StandardSequence",
	});

	// State for adding new standards
	const [selectedStandardId, setSelectedStandardId] = useState<string>("");
	const [standardOptions, setStandardOptions] = useState<Array<{ value: string, label: string }>>([]);

	// Watch for StandardSequence changes to validate repeat markers
	const currentSequence = watch("StandardSequence");

	// Get standard options from LookupResolver
	useEffect(() => {
		const loadStandards = async () => {
			await LookupResolver.initialize();
			const options = LookupResolver.getLookupOptions("QCReference", "StandardId", "StandardId");
			setStandardOptions(options);
		};
		loadStandards();
	}, []);

	// Handler to add standard to sequence
	const handleAddStandard = () => {
		if (selectedStandardId) {
			// Calculate the next SortOrder based on current fields length
			const nextSortOrder = fields.length + 1;
			append({
				StandardId: selectedStandardId,
				SortOrder: nextSortOrder,
				IsRepeatStart: false,
			});
			setSelectedStandardId(""); // Reset selection
		}
	};

	// Handler to move item up
	const handleMoveUp = (index: number) => {
		if (index > 0) {
			move(index, index - 1);
		}
	};

	// Handler to move item down
	const handleMoveDown = (index: number) => {
		if (index < fields.length - 1) {
			move(index, index + 1);
		}
	};

	// Handler to toggle repeat start
	const handleToggleRepeatStart = (index: number) => {
		const currentField = fields[index];
		const newIsRepeatStart = !currentField.IsRepeatStart;

		// If setting to true, unset all other repeat start markers
		if (newIsRepeatStart) {
			// Collect all updates and apply them together
			const updates: Array<{ index: number, field: StandardSequenceEntry }> = [];
			fields.forEach((field, i) => {
				if (i !== index && field.IsRepeatStart) {
					updates.push({ index: i, field: { ...field, IsRepeatStart: false } });
				}
			});

			// Apply all updates
			updates.forEach(({ index: i, field }) => {
				update(i, field);
			});
		}

		update(index, { ...currentField, IsRepeatStart: newIsRepeatStart });
	};

	// Fetch available rules when dialog opens
	useEffect(() => {
		if (open && organization) {
			fetchAllQCInsertionRules(organization)
				.then((rules: QaqcInsertionRule[]) => {
					setAvailableRules(rules);
				})
				.catch((error: Error) => {
					console.error("Failed to fetch QAQC rules:", error);
					message.error("Failed to load QAQC rules");
					setAvailableRules([]); // Set empty array on error
				});
		}
	}, [open, organization, fetchAllQCInsertionRules, message]);

	// Selection Mode Handlers
	const handleCancel = () => {
		onClose();
		// Note: Navigation should be handled by parent component
	};

	const handleEdit = () => {
		const selectedRule = availableRules.find(r => r.QCInsertionRuleId === selectedRuleId);
		if (selectedRule) {
			reset(selectedRule);
			setIsEditMode(true);
		}
		else {
			message.warning("Please select a rule to edit");
		}
	};

	const handleNew = () => {
		reset({
			Code: "",
			Description: "",
			Organization: organization || "",
			Laboratory: laboratory || "",
			SampleIdPrefix: "",
			SampleIntervalSize: 1.0,
			BlankFrequency: 25,
			StandardFrequency: 25,
			PrepDupFrequency: 50,
			FDupFrequency: 50,
			IsDefaultInd: false,
			StandardSequence: [],
			// ActiveInd: true,
			// SortOrder: 0,
		});
		setIsEditMode(true);
	};

	const handleOk = () => {
		const selectedRule = availableRules.find(r => r.QCInsertionRuleId === selectedRuleId);
		if (selectedRule) {
			onRuleSelected(selectedRule);
			onClose();
		}
		else {
			message.warning("Please select a rule");
		}
	};

	// Edit/Create Mode Handlers
	const handleFormCancel = () => {
		setIsEditMode(false);
		reset({
			Code: "",
			Description: "",
			Organization: organization || "",
			Laboratory: laboratory || "",
			SampleIdPrefix: "",
			SampleIntervalSize: 1.0,
			BlankFrequency: 25,
			StandardFrequency: 25,
			PrepDupFrequency: 50,
			FDupFrequency: 50,
			IsDefaultInd: false,
			StandardSequence: [],
		});
	};

	const handleSave = async (data: QaqcInsertionRule) => {
		try {
			// Normalize SortOrder values based on array index before saving
			const normalizedData = {
				...data,
				StandardSequence: data.StandardSequence.map((item: StandardSequenceEntry, index: number) => ({
					...item,
					SortOrder: index + 1,
				})),
			};

			await saveQCInsertionRule(normalizedData);
			message.success("QAQC rule saved successfully");

			// Refresh available rules
			const rules = await fetchAllQCInsertionRules(organization || "");
			setAvailableRules(rules);

			// Get the saved rule (it will be the last one or find by code)
			const savedRule = rules.find((r: QaqcInsertionRule) => r.Code === normalizedData.Code);
			if (savedRule) {
				onRuleSelected(savedRule);
			}

			setIsEditMode(false);
			onClose();
		}
		catch (error) {
			console.error("Failed to save QAQC rule:", error);
			message.error("Failed to save QAQC rule");
		}
	};

	// Selection Mode UI
	const renderSelectionMode = () => (
		<>
			<Form layout="vertical">
				<Form.Item label="Select Existing QAQC Insertion Rules">
					<Select
						placeholder="Choose a rule"
						value={selectedRuleId}
						onChange={setSelectedRuleId}
						options={availableRules.map(rule => ({
							value: rule.QCInsertionRuleId,
							label: rule.Code,
						}))}
						style={{ width: "100%" }}
					/>
				</Form.Item>
			</Form>
		</>
	);

	// Edit/Create Mode UI
	const renderEditMode = () => (
		<>
			<Form layout="vertical">
				<div className={styles.sheetContainer}>
					<Card size="small" style={{ marginBottom: "16px" }}>
						<div style={{ display: "flex", marginBottom: "12px" }}>
							<div style={{
								writingMode: "vertical-rl",
								transform: "rotate(180deg)",
								borderRight: "4px solid #1890ff",
								paddingRight: "8px",
								marginRight: "8px",
								display: "flex",
								alignItems: "center",
							}}
							>
								<Title level={5} style={{ margin: 0, fontSize: "13px", color: "#1890ff", whiteSpace: "nowrap" }}>
									Rule Information
								</Title>
							</div>

							<Descriptions
								bordered
								size="small"
								column={2}
								labelStyle={{ fontWeight: "bold", backgroundColor: "#f0f0f0", padding: "2px 8px", width: "140px" }}
								contentStyle={{ padding: "2px 8px" }}
							>
								<Descriptions.Item label="Name" span={2}>
									<SheetFormField
										name="Code"
										control={control}
										type="text"
										placeholder="e.g., SORES_RULE"
										readOnly={false}
										validateStatus={errors.Code ? "error" : ""}
										help={errors.Code?.message}
									/>
								</Descriptions.Item>

								<Descriptions.Item label="Description" span={2}>
									<SheetFormField
										name="Description"
										control={control}
										type="area"
										placeholder="Rule description"
										readOnly={false}
										validateStatus={errors.Description ? "error" : ""}
										help={errors.Description?.message}
									/>
								</Descriptions.Item>

								{/* <Descriptions.Item label="Rack Size" span={1}>
									<SheetFormField
										name="RackSize"
										control={control}
										type="number"
										placeholder="Rack Size"
										readOnly={false}
										min={1}
										validateStatus={errors.RackSize ? 'error' : ''}
										help={errors.RackSize?.message}
									/>
								</Descriptions.Item> */}

								<Descriptions.Item label="Prefix" span={1}>
									<SheetFormField
										name="SampleIdPrefix"
										control={control}
										type="text"
										placeholder="e.g., SORES_F"
										readOnly={false}
										validateStatus={errors.SampleIdPrefix ? "error" : ""}
										help={errors.SampleIdPrefix?.message}
									/>
								</Descriptions.Item>

								<Descriptions.Item label="Interval (m)" span={1}>
									<SheetFormField
										name="SampleIntervalSize"
										control={control}
										type="number"
										placeholder="Sample Interval Size"
										readOnly={false}
										min={0.1}
										validateStatus={errors.SampleIntervalSize ? "error" : ""}
										help={errors.SampleIntervalSize?.message}
									/>
								</Descriptions.Item>
							</Descriptions>
						</div>
					</Card>

					<Card size="small" style={{ marginBottom: "16px" }}>
						<div style={{ display: "flex", marginBottom: "12px" }}>
							<div style={{
								writingMode: "vertical-rl",
								transform: "rotate(180deg)",
								borderRight: "4px solid #722ed1",
								paddingRight: "8px",
								marginRight: "8px",
								display: "flex",
								alignItems: "center",
							}}
							>
								<Title level={5} style={{ margin: 0, fontSize: "13px", color: "#722ed1", whiteSpace: "nowrap" }}>
									QAQC Frequencies
								</Title>
							</div>

							<div style={{ flex: 1 }}>
								<Descriptions
									bordered
									size="small"
									column={1}
									labelStyle={{ fontWeight: "bold", backgroundColor: "#f0f0f0", padding: "2px 8px", width: "140px" }}
									contentStyle={{ padding: "2px 8px" }}
								>
									<Descriptions.Item label="Blank" span={1}>
										<SheetFormField
											name="BlankFrequency"
											control={control}
											type="number"
											placeholder="Blank Frequency"
											readOnly={false}
											min={1}
											validateStatus={errors.BlankFrequency ? "error" : ""}
											help={errors.BlankFrequency?.message}
										/>
									</Descriptions.Item>

									<Descriptions.Item label="Field Dup" span={1}>
										<SheetFormField
											name="FDupFrequency"
											control={control}
											type="number"
											placeholder="Field Duplicate Frequency"
											readOnly={false}
											min={1}
											validateStatus={errors.FDupFrequency ? "error" : ""}
											help={errors.FDupFrequency?.message}
										/>
									</Descriptions.Item>

									<Descriptions.Item label="Prep Dup" span={1}>
										<SheetFormField
											name="PrepDupFrequency"
											control={control}
											type="number"
											placeholder="Prep Duplicate Frequency"
											readOnly={false}
											min={1}
											validateStatus={errors.PrepDupFrequency ? "error" : ""}
											help={errors.PrepDupFrequency?.message}
										/>
									</Descriptions.Item>

									<Descriptions.Item label="Standard" span={1}>
										<SheetFormField
											name="StandardFrequency"
											control={control}
											type="number"
											placeholder="Standard Frequency"
											readOnly={false}
											min={1}
											validateStatus={errors.StandardFrequency ? "error" : ""}
											help={errors.StandardFrequency?.message}
										/>
									</Descriptions.Item>

									<Card size="small" style={{ marginTop: "16px" }}>
										<Title level={5}>Standard Sequence</Title>
										<Text type="secondary" style={{ display: "block", marginBottom: "16px" }}>
											Define ordered sequence of standards with optional repeat section
										</Text>

										{/* Sequence List */}
										{fields.length > 0
											? (
												<List
													dataSource={fields}
													renderItem={(field, index) => (
														<List.Item
															actions={[
																<Button
																	key="up"
																	size="small"
																	icon={<UpOutlined />}
																	onClick={() => handleMoveUp(index)}
																	disabled={index === 0}
																/>,
																<Button
																	key="down"
																	size="small"
																	icon={<DownOutlined />}
																	onClick={() => handleMoveDown(index)}
																	disabled={index === fields.length - 1}
																/>,
																<Button
																	key="delete"
																	size="small"
																	danger
																	icon={<DeleteOutlined />}
																	onClick={() => remove(index)}
																/>,
															]}
														>
															<Space>
																<Text strong>
																	#
																	{index + 1}
																</Text>
																<Text>{field.StandardId}</Text>
																<Switch
																	checkedChildren="Repeat Start"
																	unCheckedChildren="No Repeat"
																	checked={field.IsRepeatStart}
																	onChange={() => handleToggleRepeatStart(index)}
																/>
															</Space>
														</List.Item>
													)}
												/>
											)
											: (
												<Text type="secondary">No standards in sequence. Add standards above.</Text>
											)}
										{/* Add Standard Section */}
										<Space style={{ marginBottom: 16 }}>
											<Select
												placeholder="Select Standard"
												value={selectedStandardId}
												onChange={setSelectedStandardId}
												options={standardOptions}
												style={{ width: 200 }}
											/>
											<Button onClick={handleAddStandard} disabled={!selectedStandardId}>
												Add to Sequence
											</Button>
										</Space>
										{errors.StandardSequence && (
											<div style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>
												{errors.StandardSequence.message || "Invalid standard sequence"}
											</div>
										)}
									</Card>
								</Descriptions>
							</div>
						</div>

					</Card>

				</div>
			</Form>
		</>
	);

	// Modal footer buttons - changes based on mode
	const footer = isEditMode
		? (
			<Space>
				<Button onClick={handleFormCancel}>Cancel</Button>
				<Button
					type="primary"
					onClick={handleSubmit((data) => {
						console.log("Form validation passed, saving data:", data);
						handleSave(data);
					}, (errors) => {
						console.log("Validation failed with errors:", errors);
					})}
					loading={loading}
				>
					Save
				</Button>
			</Space>
		)
		: (
			<Space>
				<Button onClick={handleCancel}>Cancel</Button>
				<Button onClick={handleEdit} disabled={!selectedRuleId}>
					Edit
				</Button>
				<Button onClick={handleNew} type="default">
					New
				</Button>
				<Button onClick={handleOk} type="primary" disabled={!selectedRuleId}>
					Ok
				</Button>
			</Space>
		);

	return (
		<Modal
			open={open}
			onCancel={onClose}
			footer={footer}
			width={600}
			title={isEditMode ? "QAQC Insertion Rule" : "Select QAQC Insertion Rule"}
		>
			{isEditMode ? renderEditMode() : renderSelectionMode()}
		</Modal>
	);
}
