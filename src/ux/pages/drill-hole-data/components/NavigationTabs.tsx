import React from "react";
// import StickyBox from 'react-sticky-box';
import { Tabs } from "antd";
import { useDrillHoleDataStore } from "../store";
import type { TabKey } from "../types/data-contracts";

const TABS: TabKey[] = [
	"Setup",
	"Geology",
	"Geotech",
	"Sampling",
	"QAQC",
	"SignOff",
	"Summary"
];

export const NavigationTabs: React.FC = () => {
	const { activeTab, setActiveTab } = useDrillHoleDataStore();

	const handleTabChange = (key: string) => {
		// Type assertion to ensure the key matches TabKey type
		setActiveTab(key as TabKey);
	};

	return (
		<div className="bg-gray-100 border-none px-6 ">
			<Tabs size='large'
				defaultActiveKey="Setup"
				style={{ marginBottom: 0 }}
				activeKey={activeTab}
				onChange={handleTabChange}
				// Use the theme token to make the active bar thick
				// theme={{
				// 	components: {
				// 		Tabs: {
				// 			lineWidthBold: 4, // This makes the bottom line thick
				// 			inkBarColor: '#1677ff', // Blue-500 equivalent
				// 		},
				// 	},
				// }}
				items={TABS.map((tab) => ({
					key: tab,
					label: tab,
				}))}
			/>
		</div>
	);
};
