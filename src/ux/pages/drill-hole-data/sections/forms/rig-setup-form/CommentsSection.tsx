import { Col, Descriptions, Form, Input } from "antd";
import type { Control, FieldErrors } from "react-hook-form";
import { Controller, useFormState } from "react-hook-form";

import TitleCard from "#src/ui-scaffold/components/basic-card/TitleCard.js";

interface CommentsSectionProps {
	control: Control<any>
	errors?: FieldErrors<any>
	sheetData?: { RigSetup?: any }
}

export function CommentsSection({ control, errors, sheetData }: CommentsSectionProps) {
	const errorValue = errors as any;
	const { dirtyFields } = useFormState({ control });
	
	const isDirtyField = (fieldName: string) => {
		return dirtyFields?.RigSetup?.[fieldName as keyof typeof dirtyFields.RigSetup];
	};
	
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
						<Form.Item
							validateStatus={errorValue?.RigSetup?.Comments ? "error" : ""}
							help={errorValue?.RigSetup?.Comments?.message}
							style={{ margin: 0 }}
						>
							<Controller
								name="RigSetup.Comments"
								control={control}
								render={({ field }) => (
									<Input.TextArea {...field} autoSize={{ minRows: 2, maxRows: 6 }} className={isDirtyField("Comments") ? "control-dirty" : ""} />
								)}
							/>
						</Form.Item>
					</Descriptions.Item>
				</Descriptions>
			</TitleCard>
		</Col>
	);
}
