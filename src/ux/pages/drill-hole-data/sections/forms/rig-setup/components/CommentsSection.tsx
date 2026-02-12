import { Col, Descriptions, Form, Input } from "antd";

import type { FormInstance } from "antd";
import type { RigSetupData } from "../types/RigSetup-types";
import TitleCard from "#src/ui-scaffold/components/basic-card/TitleCard.js";

const { TextArea } = Input;

interface CommentsSectionProps {
	form: FormInstance<RigSetupData>
}

export function CommentsSection({ form }: CommentsSectionProps) {
	return (
		<Col xs={24} md={24}>
			<TitleCard
				title="Comments"
				orientation="horizontal"
				size="small"
				borderColor="#f5222d"
				showToggle={true}
				titleAlign="left"
				style={{ minHeight: "auto" }}
				bodyStyle={{ minHeight: "auto", padding: "12px" }}
			>
				<Descriptions bordered size="small" column={4}>
					<Descriptions.Item label="Comments" span={4}>
						<Form.Item name="Comments" noStyle>
							<TextArea rows={3} placeholder="Enter comments" />
						</Form.Item>
					</Descriptions.Item>
				</Descriptions>
			</TitleCard>
		</Col>
	);
}
