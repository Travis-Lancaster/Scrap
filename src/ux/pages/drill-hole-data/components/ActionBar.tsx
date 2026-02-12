import React, { useCallback } from "react";
import { Button } from "antd";
import { PlusOutlined, ReloadOutlined, SaveOutlined } from "@ant-design/icons";
import { useDrillHoleDataStore } from "../store";
import { getSectionKeyForTab } from "../utils/navigation";

const LENSES_BY_TAB: Record<string, string[]> = {
	"Setup": ["RigSetup", "Collar Coordinate"],
	"Geology": ["Litho", "Alteration", "Veins", "Everything"],
	"Geotech": [
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
	const { activeTab, activeLens, setActiveLens, saveSection, refreshSection } = useDrillHoleDataStore();

	const currentLenses = LENSES_BY_TAB[activeTab] || [];
	const currentOtherLogs = OTHER_LOGS_BY_TAB[activeTab] || [];
	const currentViewLens = activeLens[activeTab] || currentLenses[0] || "";

	const currentSectionKey = getSectionKeyForTab(activeTab as any, currentViewLens);
	const showLogActions = ["Geology", "Geotech"].includes(activeTab);

	const handleLensClick = useCallback((lens: string) => {
		console.log("[ActionBar] Lens clicked:", { tab: activeTab, lens });
		setActiveLens(activeTab, lens);
	}, [activeTab, setActiveLens]);

	const handleAddInterval = useCallback(() => {
		console.log("[ActionBar] Add Interval clicked");
	}, []);

	const handleNewLog = useCallback(() => {
		console.log("[ActionBar] New Log clicked");
	}, []);

	const handleRefresh = useCallback(async () => {
		console.log("[ActionBar] Refresh clicked");
		if (currentSectionKey) {
			await refreshSection(currentSectionKey as any);
		}
	}, [currentSectionKey, refreshSection]);

	const handleSave = useCallback(async () => {
		console.log("[ActionBar] Save clicked");
		if (currentSectionKey) {
			await saveSection(currentSectionKey as any);
		}
	}, [currentSectionKey, saveSection]);

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
				{showLogActions && (
					<>
						<Button size="small" icon={<PlusOutlined />} onClick={handleAddInterval}>Add Interval</Button>
						<Button size="small" onClick={handleNewLog}>New Log</Button>
					</>
				)}
				<Button size="small" icon={<ReloadOutlined />} onClick={handleRefresh}>Refresh</Button>
				{currentSectionKey && <Button size="small" type="primary" icon={<SaveOutlined />} onClick={handleSave}>Save</Button>}
			</div>
		</div>
	);
};
