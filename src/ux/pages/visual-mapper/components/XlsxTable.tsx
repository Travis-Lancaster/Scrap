import { Typography } from "antd";
import React from "react";

const { Text } = Typography;

/**
 * @deprecated This component is no longer used in the redesigned visual-mapper.
 * The new implementation focuses exclusively on fixed-width text files.
 * XLSX support has been removed in favor of a simpler, more focused tool.
 */
export const XlsxTable: React.FC = () => {
	return (
		<div style={{ padding: "20px", textAlign: "center" }}>
			<Text type="secondary">
				XLSX support has been removed. Please use fixed-width text files (.txt, .csv)
			</Text>
		</div>
	);
};
