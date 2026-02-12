import { FileTextOutlined, TableOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import React from "react";
import { useVisualMapperStore } from "../store/visual-mapper-store";

export const ModeSelector: React.FC = () => {
	const { mode, setMode } = useVisualMapperStore();

	return (
		<div style={{ marginBottom: 16 }}>
			<Segmented
				value={mode}
				onChange={value => setMode(value as "simple" | "pattern")}
				block
				options={[
					{
						label: "Simple Field",
						value: "simple",
						icon: <FileTextOutlined />,
					},
					{
						label: "Row Pattern",
						value: "pattern",
						icon: <TableOutlined />,
					},
				]}
			/>
		</div>
	);
};
