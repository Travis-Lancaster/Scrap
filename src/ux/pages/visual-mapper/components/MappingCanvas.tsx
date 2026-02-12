import { Typography } from "antd";
import React from "react";

const { Text } = Typography;

/**
 * @deprecated This component has been replaced by MappingWorkspace.tsx
 * in the redesigned visual-mapper implementation.
 *
 * The new architecture uses:
 * - MappingWorkspace (main layout)
 * - SimpleFieldForm (for simple fields)
 * - RowPatternForm (for row patterns)
 * - FieldsList (to view items)
 * - TemplateActions (export/import/apply)
 *
 * This file is kept for reference only and should not be used.
 */
export const MappingCanvas: React.FC = () => {
	return (
		<div style={{ padding: "20px", textAlign: "center" }}>
			<Text type="secondary">
				This component has been deprecated. Please use the new MappingWorkspace.
			</Text>
		</div>
	);
};
