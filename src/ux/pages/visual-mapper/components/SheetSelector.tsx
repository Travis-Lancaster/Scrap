import type { TabsProps } from "antd";
import { Tabs } from "antd";
import React from "react";

interface SheetSelectorProps {
	sheets: string[]
	currentSheet: string
	onSheetChange: (sheetName: string) => void
}

export const SheetSelector: React.FC<SheetSelectorProps> = ({
	sheets,
	currentSheet,
	onSheetChange,
}) => {
	const items: TabsProps["items"] = sheets.map((sheetName, index) => ({
		key: sheetName,
		label: (
			<span>
				{sheetName}
				{sheets.length > 1 && (
					<span style={{ marginLeft: 4, fontSize: "11px", color: "#999" }}>
						(
						{index + 1}
						/
						{sheets.length}
						)
					</span>
				)}
			</span>
		),
	}));

	return (
		<Tabs
			activeKey={currentSheet}
			items={items}
			onChange={onSheetChange}
			size="small"
			type="card"
			style={{ marginBottom: 8 }}
		/>
	);
};
