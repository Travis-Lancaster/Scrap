import React from "react";
import { Card, Col, DatePicker, Form, Input, Row, Select } from "antd";

import { useRigSetupForm } from "../../../hooks";

const { TextArea } = Input;

export const RigSetupForm: React.FC = () => {
	const { data, handleChange, isReadOnly } = useRigSetupForm();

	return (
		<div className="p-6 bg-slate-50 h-full overflow-auto">
			<Card title="Rig Setup" bordered={false} className="shadow-sm">
				<Form layout="vertical" disabled={isReadOnly} initialValues={data as any}>
					<Row gutter={16}>
						<Col span={8}>
							<Form.Item label="Drilling Company">
								<Input value={data?.DrillingCompany} onChange={e => handleChange("DrillingCompany" as any, e.target.value)} />
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="Drill Type">
								<Select value={data?.DrillType} onChange={v => handleChange("DrillType" as any, v)} options={[]} />
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="Rig Type">
								<Select value={data?.RigType} onChange={v => handleChange("RigType" as any, v)} options={[]} />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={8}>
							<Form.Item label="Pad Inspected By">
								<Input value={data?.PadInspectionCompletedBy} onChange={e => handleChange("PadInspectionCompletedBy" as any, e.target.value)} />
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="Pad Inspection Date">
								<DatePicker className="w-full" onChange={d => handleChange("PadInspectionCompletedDt" as any, d?.toISOString())} />
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="Supervisor">
								<Input value={data?.DrillSupervisor} onChange={e => handleChange("DrillSupervisor" as any, e.target.value)} />
							</Form.Item>
						</Col>
					</Row>
					<Form.Item label="Comments">
						<TextArea rows={5} value={data?.Comments} onChange={e => handleChange("Comments" as any, e.target.value)} />
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};
