// import SignaturePad from "#src/ux/components/signature-pad/index.js";
import { Col, Descriptions, Select } from "antd";

import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import SignaturePad from "#src/ui-scaffold/components/signature-pad/index.js";
import TitleCard from "#src/ui-scaffold/components/basic-card/TitleCard.js";

interface PadInspectionSectionProps {
	form: Control<any>
	lookupOptions: {
		person: Array<{ value: string, label: string }>
		drillCompanies: Array<{ value: string, label: string }>
	}
	drillPlanId: string
}

export function PadInspectionSection({ form, lookupOptions, drillPlanId }: PadInspectionSectionProps) {
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
						<Controller
							name="DrillingCompany"
							control={form}
							render={({ field }) => (
								<Select
									{...field}
									options={lookupOptions.drillCompanies}
									placeholder="Select drilling company"
									showSearch
									filterOption={(input, option) =>
										(option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Completed by Geologist" span={1}>
						<Controller
							name="PadInspectionCompletedBy"
							control={form}
							render={({ field }) => (
								<Select
									{...field}
									options={lookupOptions.person}
									placeholder="Select geologist"
									showSearch
									filterOption={(input, option) =>
										(option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Drill Supervisor" span="filled">
						<Controller
							name="DrillSupervisor"
							control={form}
							render={({ field }) => (
								<Select
									{...field}
									options={lookupOptions.person}
									placeholder="Select supervisor"
									showSearch
									filterOption={(input, option) =>
										(option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Pad Inspection Signature" span={1}>
						<Controller
							name="PadInspectionSignature"
							control={form}
							render={({ field }) => (
								<SignaturePad
									value={field.value || ""}
									onChange={(signature: string) => {
										field.onChange(signature);
									}}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Drilling Signature" span="filled">
						<Controller
							name="DrillingSignature"
							control={form}
							render={({ field }) => (
								<SignaturePad
									value={field.value || ""}
									onChange={(signature: string) => {
										field.onChange(signature);
									}}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Date" span={1}>
						<Controller
							name="PadInspectionSignatureDt"
							control={form}
							render={({ field }) => field.value || "N/A"}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Date" span={1}>
						<Controller
							name="DrillingSignatureDt"
							control={form}
							render={({ field }) => field.value || "N/A"}
						/>
					</Descriptions.Item>
				</Descriptions>
			</TitleCard>
		</Col>
	);
}
