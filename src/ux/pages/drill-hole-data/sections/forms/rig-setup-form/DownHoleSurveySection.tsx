import { AutoComplete, Col, Descriptions, Form, Input, InputNumber } from "antd";
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

interface DownHoleSurveySectionProps {
	control: Control<any>
	errors?: FieldErrors<any>
	sheetData?: { RigSetup?: any }
	lookupOptions: {
		person: Array<{ value: string, label: string }>
		drillCompanies: Array<{ value: string, label: string }>
		machineryAll: Array<{ value: string, label: string }>
	}
	filteredMachinery: Array<{ value: string, label: string }>
	drillPlanId: string
}

const filterOption = (input: string, option?: { label?: string; value?: string }) => {
	return String(option?.label ?? "").toLowerCase().includes(input.toLowerCase());
};

export function DownHoleSurveySection({ control, errors, lookupOptions, filteredMachinery, drillPlanId }: DownHoleSurveySectionProps) {
	const errorValue = errors as any;
	const { dirtyFields } = useFormState({ control });

	const isDirtyField = (fieldName: string) => {
		return dirtyFields?.RigSetup?.[fieldName as keyof typeof dirtyFields.RigSetup];
	};

	return (
		<Col xs={24} md={24}>
			<TitleCard
				title="Down Hole Survey"
				orientation="vertical"
				size="small"
				borderColor="#13c2c2"
				showToggle={true}
				titleAlign="left"
				style={{ minHeight: "auto" }}
				bodyStyle={{ minHeight: "auto", padding: "12px" }}
			>
				<Descriptions bordered size="small" column={4}>
					<Descriptions.Item label="Drilling Contractor" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.DownHoleSurveyDrillingContractor ? "error" : ""}
							help={errorValue?.RigSetup?.DownHoleSurveyDrillingContractor?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.DownHoleSurveyDrillingContractor"
								control={control}
								render={({ field }) => (
									<AutoComplete
										{...field}
										options={lookupOptions.drillCompanies}
										filterOption={filterOption}
										placeholder="Drilling Contractor"
										style={{ width: "100%" }}
									/>
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Rig No" span="filled">
						<Form.Item
							validateStatus={errorValue?.RigSetup?.DownHoleSurveyRigNo ? "error" : ""}
							help={errorValue?.RigSetup?.DownHoleSurveyRigNo?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.DownHoleSurveyRigNo"
								control={control}
								render={({ field }) => (
									<AutoComplete
										{...field}
										options={filteredMachinery}
										filterOption={filterOption}
										style={{ width: "100%" }}
									/>
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Driller" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.DownHoleSurveyDriller ? "error" : ""}
							help={errorValue?.RigSetup?.DownHoleSurveyDriller?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.DownHoleSurveyDriller"
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
					<Descriptions.Item label="Driller Signature" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.DownHoleSurveyDrillerSignature ? "error" : ""}
							help={errorValue?.RigSetup?.DownHoleSurveyDrillerSignature?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.DownHoleSurveyDrillerSignature"
								control={control}
								render={({ field: { value, onChange } }) => (
									<SignaturePad
										value={value || ""}
										error={!!errorValue?.RigSetup?.DownHoleSurveyDrillerSignature}
										onChange={(signature: string) => {
											onChange(signature);
											if (signature) {
												store.updateField(drillPlanId, "RigSetup", "RigSetup.DownHoleSurveyDrillerSignatureDt", new Date().toISOString());
											}
											else {
												store.updateField(drillPlanId, "RigSetup", "RigSetup.DownHoleSurveyDrillerSignatureDt", null);
											}
										}}
									/>
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Date" span="filled">
						<Form.Item
							validateStatus={errorValue?.RigSetup?.DownHoleSurveyDrillerSignatureDt ? "error" : ""}
							help={errorValue?.RigSetup?.DownHoleSurveyDrillerSignatureDt?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.DownHoleSurveyDrillerSignatureDt"
								control={control}
								render={({ field }) => <Input {...field} type="date" style={{ width: "100%" }} />}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Rig Alignment Tool Mag Azi" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.RigAlignmentToolMagAzi ? "error" : ""}
							help={errorValue?.RigSetup?.RigAlignmentToolMagAzi?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.RigAlignmentToolMagAzi"
								control={control}
								render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} />}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Rig Alignment Tool Dip" span="filled">
						<Form.Item
							validateStatus={errorValue?.RigSetup?.RigAlignmentToolDip ? "error" : ""}
							help={errorValue?.RigSetup?.RigAlignmentToolDip?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.RigAlignmentToolDip"
								control={control}
								render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} />}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Survey Tool" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.SurveyReference ? "error" : ""}
							help={errorValue?.RigSetup?.SurveyReference?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.SurveyReference"
								control={control}
								render={({ field }) => (
									<AutoComplete
										{...field}
										options={filteredMachinery}
										filterOption={filterOption}
										style={{ width: "100%" }}
									/>
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Mag Azi" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.SurveyMagAzi ? "error" : ""}
							help={errorValue?.RigSetup?.SurveyMagAzi?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.SurveyMagAzi"
								control={control}
								render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} />}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Dip" span="filled">
						<Form.Item
							validateStatus={errorValue?.RigSetup?.SurveyDip ? "error" : ""}
							help={errorValue?.RigSetup?.SurveyDip?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.SurveyDip"
								control={control}
								render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} />}
							/>
						</Form.Item>
					</Descriptions.Item>
					<Descriptions.Item label="Survey Depth" span={1}>
						<Form.Item
							validateStatus={errorValue?.RigSetup?.SurveyDepth ? "error" : ""}
							help={errorValue?.RigSetup?.SurveyDepth?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.SurveyDepth"
								control={control}
								render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} />}
							/>
						</Form.Item>
					</Descriptions.Item>
				</Descriptions>
			</TitleCard>
		</Col>
	);
}
