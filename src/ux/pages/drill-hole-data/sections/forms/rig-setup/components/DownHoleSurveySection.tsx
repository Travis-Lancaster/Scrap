// import SignaturePad from "#src/ux/components/signature-pad/index.js";
import { Col, Descriptions, Select } from "antd";

import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import SignaturePad from "#src/ui-scaffold/components/signature-pad/index.js";
import TitleCard from "#src/ui-scaffold/components/basic-card/TitleCard.js";

interface DownHoleSurveySectionProps {
	form: Control<any>
	lookupOptions: {
		person: Array<{ value: string, label: string }>
		drillCompanies: Array<{ value: string, label: string }>
		machineryAll: Array<{ value: string, label: string }>
	}
	filteredMachinery: Array<{ value: string, label: string }>
	drillPlanId: string
}

export function DownHoleSurveySection({ form, lookupOptions, filteredMachinery, drillPlanId }: DownHoleSurveySectionProps) {
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
						<Controller
							name="DownHoleSurveyDrillingContractor"
							control={form}
							render={({ field }) => (
								<Select
									{...field}
									options={lookupOptions.drillCompanies}
									placeholder="Select contractor"
									showSearch
									filterOption={(input, option) =>
										(option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Driller Name" span="filled">
						<Controller
							name="DownHoleSurveyDriller"
							control={form}
							render={({ field }) => (
								<Select
									{...field}
									options={lookupOptions.person}
									placeholder="Select driller"
									showSearch
									filterOption={(input, option) =>
										(option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Rig Name" span={1}>
						<Controller
							name="DownHoleSurveyRigName"
							control={form}
							render={({ field }) => (
								<Select
									{...field}
									options={filteredMachinery}
									placeholder="Select rig"
									showSearch
									filterOption={(input, option) =>
										(option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Driller Signature" span={1}>
						<Controller
							name="DownHoleSurveyDrillerSignature"
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
					<Descriptions.Item label="Date" span="filled">
						<Controller
							name="DownHoleSurveyDrillerSignatureDt"
							control={form}
							render={({ field }) => field.value || "N/A"}
						/>
					</Descriptions.Item>
				</Descriptions>
			</TitleCard>
		</Col>
	);
}
