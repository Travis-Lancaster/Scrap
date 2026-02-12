import React, { useMemo } from "react";
import { Button } from "antd";
import { ReloadOutlined, SaveOutlined } from "@ant-design/icons";

import { useDrillHoleDataStore } from "../store";
import { getSectionKeyForTab } from "../utils/navigation";

const LENSES_BY_TAB: Record<string, string[]> = {
	Setup: ["RigSheet", "Coordinate"],
	Geology: ["Litho", "Alteration", "Veins", "Everything"],
	Geotech: [
		"CoreRecoveryRun",
		"FractureCount",
		"MagSus",
		"RockMechanic",
		"RockQualityDesignation",
		"SpecificGravityPt",
		"Structure",
	],
	Sampling: ["Sample", "Dispatch", "LabResults"],
};

const OTHER_LOGS_BY_TAB: Record<string, string[]> = {
	Geology: ["Shear", "Structure"],
};

export const ActionBar: React.FC = () => {
	const { activeTab, activeLens, setActiveLens, saveSection, refreshDrillHole } = useDrillHoleDataStore();

	const currentLenses = LENSES_BY_TAB[activeTab] || [];
	const currentOtherLogs = OTHER_LOGS_BY_TAB[activeTab] || [];
	const currentViewLens = activeLens[activeTab] || currentLenses[0] || "";

	const currentSectionKey = useMemo(() => getSectionKeyForTab(activeTab, currentViewLens), [activeTab, currentViewLens]);

	const handleLensClick = (lens: string) => {
		console.log("[ActionBar] 🔍 Lens click", {
			activeTab,
			lens,
			timestamp: new Date().toISOString(),
		});
		setActiveLens(activeTab, lens);
	};

	const handleSave = async () => {
		if (!currentSectionKey) {
			console.log("[ActionBar] 💾 Save skipped - no section for tab", { activeTab, currentViewLens });
			return;
		}
		console.log("[ActionBar] 💾 Save requested", { activeTab, currentViewLens, currentSectionKey });
		await saveSection(currentSectionKey);
	};

	const handleRefresh = async () => {
		console.log("[ActionBar] 🔄 Refresh requested", { activeTab, currentViewLens });
		await refreshDrillHole();
	};

	if (currentLenses.length === 0 && currentOtherLogs.length === 0) {
		return null;
	}

	return (
		<div className="bg-slate-50 p-3 flex justify-between items-center px-6 border-b">
			<div className="flex items-center space-x-2">
				{currentLenses.length > 0 && (
					<>
						<div className="w-px h-6 bg-slate-300 mx-2"></div>
						<span className="text-[10px] uppercase font-bold text-slate-500 mr-2">View Lens:</span>
						<div className="inline-flex rounded-md shadow-sm">
							{currentLenses.map((lens, index) => {
								const isFirst = index === 0;
								const isLast = index === currentLenses.length - 1;
								const isActive = currentViewLens === lens;
								return (
									<button
										key={lens}
										onClick={() => handleLensClick(lens)}
										className={`px-3 py-1 text-xs font-bold bg-white border border-slate-300 ${isFirst ? "rounded-l-md" : "border-l-0"} ${isLast ? "rounded-r-md" : ""} ${isActive ? "text-blue-600" : "text-slate-500"}`}
									>
										{lens}
									</button>
								);
							})}
						</div>
					</>
				)}

				{currentOtherLogs.length > 0 && (
					<>
						<div className="w-px h-6 bg-slate-300 mx-2"></div>
						<span className="text-[10px] uppercase font-bold text-slate-500 mr-2">Other Logs:</span>
						<div className="inline-flex rounded-md shadow-sm">
							{currentOtherLogs.map((log, index) => {
								const isFirst = index === 0;
								const isLast = index === currentOtherLogs.length - 1;
								const isActive = currentViewLens === log;
								return (
									<button
										key={log}
										onClick={() => handleLensClick(log)}
										className={`px-3 py-1 text-xs font-bold bg-white border border-slate-300 ${isFirst ? "rounded-l-md" : "border-l-0"} ${isLast ? "rounded-r-md" : ""} ${isActive ? "text-blue-600" : "text-slate-500"}`}
									>
										{log}
									</button>
								);
							})}
						</div>
					</>
				)}
				<div className="w-px h-6 bg-slate-300 mx-2"></div>
			</div>

			<div className="flex items-center space-x-2">
				<Button size="small" icon={<ReloadOutlined />} onClick={handleRefresh}>Refresh</Button>
				{currentSectionKey && <Button size="small" type="primary" icon={<SaveOutlined />} onClick={handleSave}>Save</Button>}
			</div>
		</div>
	);
};
