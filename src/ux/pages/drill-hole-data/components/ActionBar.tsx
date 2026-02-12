import React from "react";
import { useDrillHoleDataStore } from "../store";

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
	"Sampling": ["Samples", "Dispatch", "LabResults"],
};

const OTHER_LOGS_BY_TAB: Record<string, string[]> = {
	"Geology": ["Shear", "Structure"],
};

export const ActionBar: React.FC = () => {
	const { activeTab, activeLens, setActiveLens } = useDrillHoleDataStore();

	const currentLenses = LENSES_BY_TAB[activeTab] || [];
	const currentOtherLogs = OTHER_LOGS_BY_TAB[activeTab] || [];
	const currentViewLens = activeLens[activeTab] || currentLenses[0] || "";

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
										onClick={() => {
											console.log(`[ActionBar] 🔍 Lens changed to: ${lens}`);
											setActiveLens(activeTab, lens);
										}}
										className={`px-3 py-1 text-xs font-bold bg-white border border-slate-300 ${isFirst ? "rounded-l-md" : "border-l-0"
											} ${isLast ? "rounded-r-md" : ""} ${isActive ? "text-blue-600" : "text-slate-500"
											}`}
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
										onClick={() => {
											console.log(`[ActionBar] 🔍 Other log changed to: ${log}`);
											setActiveLens(activeTab, log);
										}}
										className={`px-3 py-1 text-xs font-bold bg-white border border-slate-300 ${isFirst ? "rounded-l-md" : "border-l-0"
											} ${isLast ? "rounded-r-md" : ""} ${isActive ? "text-blue-600" : "text-slate-500"
											}`}
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
			<div className="text-slate-400 hover:text-slate-600 cursor-pointer flex items-center space-x-3">
				{activeTab !== 'Setup' && <>
					<button className="bg-white border px-3 py-1.5 rounded text-xs font-bold shadow-sm hover:bg-slate-50">
						+ Add Interval
					</button>
					<button className="bg-white border px-3 py-1.5 rounded text-xs font-bold shadow-sm hover:bg-slate-50">
						New Log
					</button>
				</>}
				<span className="text-xs font-bold">Import</span>
				<span className="text-xs font-bold">export</span>
				<span className="text-xs font-bold">Print</span>
			</div>
		</div>
	);
};
