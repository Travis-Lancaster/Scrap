import React from "react";
import { Alert, Badge, Card, Col, DatePicker, Form, Input, Row, Space, Typography } from "antd";
import dayjs from "dayjs";

import { useRigSetupForm } from "../../../hooks";

const { Text, Title } = Typography;
const { TextArea } = Input;

export const RigSetupForm: React.FC = () => {
	const { data, handleChange, isReadOnly, isDirty, validation } = useRigSetupForm();

	const statusLabel = data?.RowStatus === 1 ? "Submitted" : "Draft";

	return (
		<div className="rig-setup-form">
			{validation?.database?.errors?.length > 0 && (
				<Alert
					type="error"
					message="Validation Errors"
					description={
						<ul style={{ marginBottom: 0 }}>
							{validation.database.errors.map((error: any, idx: number) => (
								<li key={idx}>{error.message}</li>
							))}
						</ul>
					}
					closable
					style={{ marginBottom: 16 }}
				/>
			)}

			{validation?.save?.warnings?.length > 0 && (
				<Alert
					type="warning"
					message="Data Quality Warnings"
					description={
						<ul style={{ marginBottom: 0 }}>
							{validation.save.warnings.map((warning: any, idx: number) => (
								<li key={idx}>{warning.message}</li>
							))}
						</ul>
					}
					closable
					style={{ marginBottom: 16 }}
				/>
			)}

			{isReadOnly && (
				<Alert
					type="info"
					message="Read-Only Mode"
					description="This rig setup cannot be edited because it is not in Draft status."
					style={{ marginBottom: 16 }}
				/>
			)}

			<Card
				title={
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<span>Rig Setup Sheet</span>
						<Space>
							{isDirty && <Badge status="processing" text="Unsaved Changes" />}
							<Badge status={data?.RowStatus === 1 ? "success" : "default"} text={statusLabel} />
							<Text type="secondary">Source: {data?.DataSource || "N/A"}</Text>
						</Space>
					</div>
				}
			>
				<Form layout="vertical" disabled={isReadOnly}>
					<Space direction="vertical" size="middle" style={{ width: "100%" }}>
						<div>
							<Title level={5}>Drilling Team</Title>
							<Row gutter={16}>
								<Col span={8}>
									<Form.Item label="Drilling Company">
										<Input value={data?.DrillingCompany} onChange={e => handleChange("DrillingCompany", e.target.value)} />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label="Drill Supervisor">
										<Input value={data?.DrillSupervisor} onChange={e => handleChange("DrillSupervisor", e.target.value)} />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label="Data Source">
										<Input value={data?.DataSource} onChange={e => handleChange("DataSource", e.target.value)} />
									</Form.Item>
								</Col>
							</Row>
						</div>

						<div>
							<Title level={5}>Pad & Final Setup</Title>
							<Row gutter={16}>
								<Col span={8}>
									<Form.Item label="Pad Inspection Completed By">
										<Input value={data?.PadInspectionCompletedBy} onChange={e => handleChange("PadInspectionCompletedBy", e.target.value)} />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label="Final Setup Approved By">
										<Input value={data?.FinalSetupApprovedBy} onChange={e => handleChange("FinalSetupApprovedBy", e.target.value)} />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label="Final Geologist">
										<Input value={data?.FinalGeologist} onChange={e => handleChange("FinalGeologist", e.target.value)} />
									</Form.Item>
								</Col>
							</Row>
						</div>

						<div>
							<Title level={5}>Down Hole Survey</Title>
							<Row gutter={16}>
								<Col span={8}>
									<Form.Item label="Survey Driller">
										<Input value={data?.DownHoleSurveyDriller} onChange={e => handleChange("DownHoleSurveyDriller", e.target.value)} />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label="Survey Contractor">
										<Input
											value={data?.DownHoleSurveyDrillingContractor}
											onChange={e => handleChange("DownHoleSurveyDrillingContractor", e.target.value)}
										/>
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label="Survey Date">
										<DatePicker
											className="w-full"
											value={data?.DownHoleSurveyDrillerSignatureDt ? dayjs(data.DownHoleSurveyDrillerSignatureDt) : null}
											onChange={date => handleChange("DownHoleSurveyDrillerSignatureDt", date ? date.toISOString() : null)}
										/>
									</Form.Item>
								</Col>
							</Row>
						</div>

						<Form.Item label="Comments">
							<TextArea rows={4} value={data?.Comments} onChange={e => handleChange("Comments", e.target.value)} />
						</Form.Item>

						<Card size="small" type="inner" title="Metadata">
							<Row gutter={8}>
								<Col span={6}>
									<Text type="secondary">Created: </Text>
									<Text>{data?.CreatedOnDt ? new Date(data.CreatedOnDt).toLocaleDateString() : "N/A"}</Text>
								</Col>
								<Col span={6}>
									<Text type="secondary">Created By: </Text>
									<Text>{data?.CreatedBy || "N/A"}</Text>
								</Col>
								<Col span={6}>
									<Text type="secondary">Modified: </Text>
									<Text>{data?.ModifiedOnDt ? new Date(data.ModifiedOnDt).toLocaleDateString() : "N/A"}</Text>
								</Col>
								<Col span={6}>
									<Text type="secondary">Modified By: </Text>
									<Text>{data?.ModifiedBy || "N/A"}</Text>
								</Col>
							</Row>
						</Card>
					</Space>
				</Form>
			</Card>
		</div>
	);
};
