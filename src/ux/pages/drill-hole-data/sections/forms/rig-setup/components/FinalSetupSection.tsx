import { Col, Descriptions, InputNumber, Select } from "antd";

import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import SignaturePad from "#src/ui-scaffold/components/signature-pad/index.js";
import TitleCard from "#src/ui-scaffold/components/basic-card/TitleCard.js";

interface FinalSetupSectionProps {
	form: Control<any>
	lookupOptions: {
		person: Array<{ value: string, label: string }>
	}
	drillPlanId: string
}

export function FinalSetupSection({ form, lookupOptions, drillPlanId }: FinalSetupSectionProps) {
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
						<Controller
							name="FinalMagAzimuth"
							control={form}
							render={({ field }) => (
								<InputNumber {...field} style={{ width: "100%" }} placeholder="0.0" />
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Inclination" span="filled">
						<Controller
							name="FinalInclination"
							control={form}
							render={({ field }) => (
								<InputNumber {...field} style={{ width: "100%" }} placeholder="0.0" />
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Final Geologist" span={1}>
						<Controller
							name="FinalGeologist"
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
					<Descriptions.Item label="Geologist Signature" span={1}>
						<Controller
							name="FinalGeologistSignature"
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
							name="FinalGeologistSignatureDt"
							control={form}
							render={({ field }) => field.value || "N/A"}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Final Setup Approved By" span={1}>
						<Controller
							name="FinalSetupApprovedBy"
							control={form}
							render={({ field }) => (
								<Select
									{...field}
									options={lookupOptions.person}
									placeholder="Select approver"
									showSearch
									filterOption={(input, option) =>
										(option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
								/>
							)}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Approval Signature" span={1}>
						<Controller
							name="FinalSetupSignature"
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
							name="FinalSetupSignatureDt"
							control={form}
							render={({ field }) => field.value || "N/A"}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Final Drill Supervisor" span={1}>
						<Controller
							name="FinalSetupDrillSupervisor"
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
					<Descriptions.Item label="Supervisor Signature" span={1}>
						<Controller
							name="FinalSetupDrillSupervisorSignature"
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
							name="FinalSetupDrillSupervisorSignatureDt"
							control={form}
							render={({ field }) => field.value || "N/A"}
						/>
					</Descriptions.Item>
				</Descriptions>
			</TitleCard>
		</Col>
	);
}
