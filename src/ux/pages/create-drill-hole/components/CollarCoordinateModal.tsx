import type { Control } from "react-hook-form";

import { SheetFormField } from "#src/components/sheets/SheetFormField.js";
import { Button, Col, Descriptions, Modal } from "antd";

interface CollarCoordinateModalProps {
	open: boolean
	onCancel: () => void
	control: Control<any>
	errors: any
	lookupOptions: any
	handleSubmit: (onSubmit: (values: any) => void) => () => void
	onSave: (values: any, validated?: boolean) => void
	dirtyFields: Record<string, any>
}

export function CollarCoordinateModal({
	open,
	onCancel,
	control,
	errors,
	lookupOptions,
	handleSubmit,
	onSave,
	dirtyFields,
}: CollarCoordinateModalProps) {
	return (
		<Modal
			title="Edit Collar Coordinates"
			open={open}
			onCancel={onCancel}
			width={800}
			footer={[
				<Button key="cancel" onClick={onCancel}>
					Cancel
				</Button>,
				<Button key="save" onClick={handleSubmit(values => onSave(values, false))}>
					Save
				</Button>,
				<Button key="submit" type="primary" onClick={handleSubmit(values => onSave(values, true))}>
					Submit
				</Button>,
			]}
		>
			<Col xs={24} md={24}>
				<Descriptions
					bordered
					size="small"
					column={8}
					labelStyle={{ fontWeight: "bold", backgroundColor: "#f0f0f0", padding: "2px 8px" }}
					contentStyle={{ padding: "2px 8px" }}
				>
					<Descriptions.Item label="Grid" span="filled">
						<SheetFormField
							name="Grid"
							control={control}
							type="autocomplete"
							placeholder="Grid"
							options={lookupOptions.grid}
							validateStatus={errors.Grid ? "error" : ""}
							help={errors.Grid?.message}
							isDirty={!!dirtyFields.Grid}
							displayMode="description"
						/>
					</Descriptions.Item>
					<Descriptions.Item label="East" span={1}>
						<SheetFormField
							name="East"
							control={control}
							type="text"
							placeholder="East"
							validateStatus={errors.East ? "error" : ""}
							help={errors.East?.message}
							isDirty={!!dirtyFields.East}
							displayMode="description"
						/>
					</Descriptions.Item>
					<Descriptions.Item label="North" span={1}>
						<SheetFormField
							name="North"
							control={control}
							type="text"
							placeholder="North"
							validateStatus={errors.North ? "error" : ""}
							help={errors.North?.message}
							isDirty={!!dirtyFields.North}
							displayMode="description"
						/>
					</Descriptions.Item>
					<Descriptions.Item label="RL" span="filled">
						<SheetFormField
							name="RL"
							control={control}
							type="text"
							placeholder="RL"
							validateStatus={errors.RL ? "error" : ""}
							help={errors.RL?.message}
							isDirty={!!dirtyFields.RL}
							displayMode="description"
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Collar Surveyor" span={1}>
						<SheetFormField
							name="SurveyBy"
							control={control}
							type="autocomplete"
							placeholder="Collar Surveyor"
							options={lookupOptions.person}
							validateStatus={errors.SurveyBy ? "error" : ""}
							help={errors.SurveyBy?.message}
							isDirty={!!dirtyFields.SurveyBy}
							displayMode="description"
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Collar Survey Method" span={1}>
						<SheetFormField
							name="SurveyMethod"
							control={control}
							type="select"
							placeholder="Collar Survey Method"
							options={lookupOptions.surveyMethods}
							validateStatus={errors.SurveyMethod ? "error" : ""}
							help={errors.SurveyMethod?.message}
							isDirty={!!dirtyFields.SurveyMethod}
							displayMode="description"
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Collar Survey Date" span={2}>
						<SheetFormField
							name="SurveyOnDt"
							control={control}
							type="date"
							placeholder="Collar Survey Date"
							validateStatus={errors.SurveyOnDt ? "error" : ""}
							help={errors.SurveyOnDt?.message}
							isDirty={!!dirtyFields.SurveyOnDt}
							displayMode="description"
						/>
					</Descriptions.Item>
				</Descriptions>
			</Col>
		</Modal>
	);
}
