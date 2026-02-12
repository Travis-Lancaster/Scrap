import { AutoComplete, Col, Descriptions, Form, Input, InputNumber } from "antd";
import type { Control, FieldErrors } from "react-hook-form";
import { Controller, useFormState } from "react-hook-form";

import { DirtyFieldWrapper } from "./DirtyFieldWrapper";
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

interface FinalSetupSectionProps {
	control: Control<any>
	errors?: FieldErrors<any>
	sheetData?: { RigSetup?: any }
	lookupOptions: {
		person: Array<{ value: string, label: string }>
	}
	drillPlanId: string
}

const filterOption = (input: string, option?: { label?: string; value?: string }) => {
	return String(option?.label ?? "").toLowerCase().includes(input.toLowerCase());
};

export function FinalSetupSection({ control, errors, lookupOptions, drillPlanId }: FinalSetupSectionProps) {
	const errorValue = errors as any;
	const { dirtyFields } = useFormState({ control });

	const isDirtyField = (fieldName: string) => {
		return dirtyFields?.RigSetup?.[fieldName as keyof typeof dirtyFields.RigSetup];
	};

	return (
		<Col xs={24} md={24}>
			<TitleCard
				title="Final-Setup Details"
				orientation="vertical"
				size="small"
				borderColor="#eb2f96"
				showToggle={true}
				titleAlign="left"
				style={{ minHeight: "auto" }}
				bodyStyle={{ minHeight: "auto", padding: "12px" }}
			>
				<Descriptions bordered size="small" column={4}>
					<Descriptions.Item label="Mag Azimuth" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.FinalMagAzimuth ? "error" : ""}
							help={errorValue?.RigSetup?.FinalMagAzimuth?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.FinalMagAzimuth"
								control={control}
								render={({ field }) => (
									<DirtyFieldWrapper isDirty={isDirtyField("FinalMagAzimuth")}>
										<InputNumber {...field} style={{ width: "100%" }} />
									</DirtyFieldWrapper>
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Inclination" span="filled">
						<Form.Item
							validateStatus={errorValue?.RigSetup?.FinalInclination ? "error" : ""}
							help={errorValue?.RigSetup?.FinalInclination?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.FinalInclination"
								control={control}
								render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} />}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Final Geologist" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.FinalGeologist ? "error" : ""}
							help={errorValue?.RigSetup?.FinalGeologist?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.FinalGeologist"
								control={control}
								render={({ field }) => (
									<AutoComplete
										{...field}
										options={lookupOptions.person}
										filterOption={filterOption}
										style={{ width: "100%" }}
									/>
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Geologist Signature" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.FinalGeologistSignature ? "error" : ""}
							help={errorValue?.RigSetup?.FinalGeologistSignature?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.FinalGeologistSignature"
								control={control}
								render={({ field: { value, onChange } }) => (
									<SignaturePad
										value={value || ""}
										error={!!errorValue?.RigSetup?.FinalGeologistSignature}
										onChange={(signature: string) => {
											onChange(signature);
											if (signature) {
												store.updateField(drillPlanId, "RigSetup", "RigSetup.FinalGeologistSignatureDt", new Date().toISOString());
											}
											else {
												store.updateField(drillPlanId, "RigSetup", "RigSetup.FinalGeologistSignatureDt", null);
											}
										}}
									/>
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Date" span="filled">
						<Form.Item
							validateStatus={errorValue?.RigSetup?.FinalGeologistSignatureDt ? "error" : ""}
							help={errorValue?.RigSetup?.FinalGeologistSignatureDt?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.FinalGeologistSignatureDt"
								control={control}
								render={({ field }) => <Input {...field} type="date" style={{ width: "100%" }} />}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Final Setup Approved By" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.FinalSetupApprovedBy ? "error" : ""}
							help={errorValue?.RigSetup?.FinalSetupApprovedBy?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.FinalSetupApprovedBy"
								control={control}
								render={({ field }) => (
									<AutoComplete
										{...field}
										options={lookupOptions.person}
										filterOption={filterOption}
										style={{ width: "100%" }}
									/>
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Approval Signature" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.FinalSetupSignature ? "error" : ""}
							help={errorValue?.RigSetup?.FinalSetupSignature?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.FinalSetupSignature"
								control={control}
								render={({ field: { value, onChange } }) => (
									<SignaturePad
										value={value || ""}
										error={!!errorValue?.RigSetup?.FinalSetupSignature}
										onChange={(signature: string) => {
											onChange(signature);
											if (signature) {
												store.updateField(drillPlanId, "RigSetup", "RigSetup.FinalSetupSignatureDt", new Date().toISOString());
											}
											else {
												store.updateField(drillPlanId, "RigSetup", "RigSetup.FinalSetupSignatureDt", null);
											}
										}}
									/>
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Date" span="filled">
						<Form.Item
							validateStatus={errorValue?.RigSetup?.FinalSetupSignatureDt ? "error" : ""}
							help={errorValue?.RigSetup?.FinalSetupSignatureDt?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.FinalSetupSignatureDt"
								control={control}
								render={({ field }) => <Input {...field} type="date" style={{ width: "100%" }} />}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Final Drill Supervisor" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.FinalSetupDrillSupervisor ? "error" : ""}
							help={errorValue?.RigSetup?.FinalSetupDrillSupervisor?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.FinalSetupDrillSupervisor"
								control={control}
								render={({ field }) => (
									<AutoComplete
										{...field}
										options={lookupOptions.person}
										filterOption={filterOption}
										style={{ width: "100%" }}
									/>
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Supervisor Signature" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.FinalSetupDrillSupervisorSignature ? "error" : ""}
							help={errorValue?.RigSetup?.FinalSetupDrillSupervisorSignature?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.FinalSetupDrillSupervisorSignature"
								control={control}
								render={({ field: { value, onChange } }) => (
									<SignaturePad
										value={value || ""}
										error={!!errorValue?.RigSetup?.FinalSetupDrillSupervisorSignature}
										onChange={(signature: string) => {
											onChange(signature);
											if (signature) {
												store.updateField(drillPlanId, "RigSetup", "RigSetup.FinalSetupDrillSupervisorSignatureDt", new Date().toISOString());
											}
											else {
												store.updateField(drillPlanId, "RigSetup", "RigSetup.FinalSetupDrillSupervisorSignatureDt", null);
											}
										}}
									/>
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Date" span="filled">
						<Form.Item
							validateStatus={errorValue?.RigSetup?.FinalSetupDrillSupervisorSignatureDt ? "error" : ""}
							help={errorValue?.RigSetup?.FinalSetupDrillSupervisorSignatureDt?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.FinalSetupDrillSupervisorSignatureDt"
								control={control}
								render={({ field }) => <Input {...field} type="date" style={{ width: "100%" }} />}
							/>
						</Form.Item>
					</Descriptions.Item>
				</Descriptions>
			</TitleCard>
		</Col>
	);
}
