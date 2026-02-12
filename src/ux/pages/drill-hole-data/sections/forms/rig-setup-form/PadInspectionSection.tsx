import { AutoComplete, Col, Descriptions, Form, Input } from "antd";
import type { Control, FieldErrors } from "react-hook-form";
import { Controller, useFormState } from "react-hook-form";

import SignaturePad from "#src/ui-scaffold/components/signature-pad/index.js";
import TitleCard from "#src/ui-scaffold/components/basic-card/TitleCard.js";

// Global store adapter for signature pad integration
declare const store: {
	updateField: (
		drillPlanId: string,
		sectionKey: string,
		fieldPath: string,
		value: any,
	) => void
};

interface PadInspectionSectionProps {
	control: Control<any>
	errors?: FieldErrors<any>
	sheetData?: { RigSetup?: any }
	lookupOptions: {
		person: Array<{ value: string, label: string }>
		drillCompanies: Array<{ value: string, label: string }>
	}
	drillPlanId: string
}

const filterOption = (input: string, option?: { label?: string; value?: string }) => {
	return String(option?.label ?? "").toLowerCase().includes(input.toLowerCase());
};

export function PadInspectionSection({ control, errors, lookupOptions, drillPlanId }: PadInspectionSectionProps) {
	const errorValue = errors as any;
	const { dirtyFields } = useFormState({ control });

	console.log("[PadInspectionSection] 🎨 Rendering", {
		dirtyFieldsKeys: dirtyFields ? Object.keys(dirtyFields) : [],
		dirtyFields,
		timestamp: new Date().toISOString(),
	});

	const isDirtyField = (fieldName: string) => {
		const isDirty = dirtyFields?.RigSetup?.[fieldName as keyof typeof dirtyFields.RigSetup];
		console.log("[PadInspectionSection] 🔍 isDirtyField check", {
			fieldName,
			isDirty,
		});
		return isDirty;
	};

	return (
		<Col xs={24} md={24}>
			<TitleCard
				title="Pad Inspection"
				orientation="vertical"
				size="small"
				borderColor="#fa8c16"
				showToggle={true}
				titleAlign="left"
				style={{ minHeight: "auto" }}
				bodyStyle={{ minHeight: "auto", padding: "12px" }}
			>
				<Descriptions bordered size="small" column={4}>
					<Descriptions.Item label="" span={1}>
						<div></div>
					</Descriptions.Item>
					<Descriptions.Item label="Drilling Company" span="filled">
						<Form.Item
							validateStatus={errorValue?.RigSetup?.DrillingCompany ? "error" : ""}
							help={errorValue?.RigSetup?.DrillingCompany?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.DrillingCompany"
								control={control}
								render={({ field }) => {
									console.log("[PadInspectionSection] 🎮 DrillingCompany field render", {
										fieldValue: field.value,
										fieldOnChange: !!field.onChange,
									});
									return (
										<AutoComplete
											{...field}
											onChange={(value) => {
												console.log("[PadInspectionSection] 🔄 DrillingCompany onChange fired", {
													value,
													timestamp: new Date().toISOString(),
												});
												field.onChange(value);
											}}
											options={lookupOptions.drillCompanies}
											filterOption={filterOption}
											style={{ width: "100%" }}
											className={isDirtyField("DrillingCompany") ? "control-dirty" : ""}
										/>
									);
								}}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Completed by Geologist" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.PadInspectionCompletedBy ? "error" : ""}
							help={errorValue?.RigSetup?.PadInspectionCompletedBy?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.PadInspectionCompletedBy"
								control={control}
								render={({ field }) => {
									console.log("[PadInspectionSection] 🎮 PadInspectionCompletedBy field render", {
										fieldValue: field.value,
										fieldOnChange: !!field.onChange,
									});
									return (
										<AutoComplete
											{...field}
											onChange={(value) => {
												console.log("[PadInspectionSection] 🔄 PadInspectionCompletedBy onChange fired", {
													value,
													timestamp: new Date().toISOString(),
												});
												field.onChange(value);
											}}
											options={lookupOptions.person}
											filterOption={filterOption}
											style={{ width: "100%" }}
											className={isDirtyField("PadInspectionCompletedBy") ? "control-dirty" : ""}
										/>
									);
								}}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Drill Supervisor" span="filled">
						<Form.Item
							validateStatus={errorValue?.RigSetup?.DrillSupervisor ? "error" : ""}
							help={errorValue?.RigSetup?.DrillSupervisor?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.DrillSupervisor"
								control={control}
								render={({ field }) => (
									<AutoComplete
										{...field}
										options={lookupOptions.person}
										filterOption={filterOption}
										style={{ width: "100%" }}
										className={isDirtyField("DrillSupervisor") ? "control-dirty" : ""}
									/>
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Pad Inspection Signature" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.PadInspectionSignature ? "error" : ""}
							help={errorValue?.RigSetup?.PadInspectionSignature?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.PadInspectionSignature"
								control={control}
								render={({ field: { value, onChange } }) => (
									<div className={isDirtyField("PadInspectionSignature") ? "control-dirty" : ""}>
										<SignaturePad
											value={value || ""}
											error={!!errorValue?.RigSetup?.PadInspectionSignature}
											onChange={(signature: string) => {
												onChange(signature);
												if (signature) {
													store.updateField(drillPlanId, "RigSetup", "RigSetup.PadInspectionSignatureDt", new Date().toISOString());
												}
												else {
													store.updateField(drillPlanId, "RigSetup", "RigSetup.PadInspectionSignatureDt", null);
												}
											}}
										/>
									</div>
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Drilling Signature" span="filled">
						<Form.Item
							validateStatus={errorValue?.RigSetup?.DrillingSignature ? "error" : ""}
							help={errorValue?.RigSetup?.DrillingSignature?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.DrillingSignature"
								control={control}
								render={({ field: { value, onChange } }) => (
									<div className={isDirtyField("DrillingSignature") ? "control-dirty" : ""}>
										<SignaturePad
											value={value || ""}
											error={!!errorValue?.RigSetup?.DrillingSignature}
											onChange={(signature: string) => {
												onChange(signature);
												if (signature) {
													store.updateField(drillPlanId, "RigSetup", "RigSetup.DrillingSignatureDt", new Date().toISOString());
												}
												else {
													store.updateField(drillPlanId, "RigSetup", "RigSetup.DrillingSignatureDt", null);
												}
											}}
										/>
									</div>
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Date" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.PadInspectionSignatureDt ? "error" : ""}
							help={errorValue?.RigSetup?.PadInspectionSignatureDt?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.PadInspectionSignatureDt"
								control={control}
								render={({ field }) => <Input {...field} type="date" style={{ width: "100%" }} className={isDirtyField("PadInspectionSignatureDt") ? "control-dirty" : ""} />}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Date" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.DrillingSignatureDt ? "error" : ""}
							help={errorValue?.RigSetup?.DrillingSignatureDt?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.DrillingSignatureDt"
								control={control}
								render={({ field }) => <Input {...field} type="date" style={{ width: "100%" }} className={isDirtyField("DrillingSignatureDt") ? "control-dirty" : ""} />}
							/>
						</Form.Item>
					</Descriptions.Item>
				</Descriptions>
			</TitleCard>
		</Col>
	);
}
