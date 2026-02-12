import React, { useMemo } from "react";
import { Button, message, Modal } from "antd";
import { PlusOutlined, ReloadOutlined, SaveOutlined } from "@ant-design/icons";
import { shallow } from "zustand/shallow";

import { useDrillHoleDataStore } from "../store";
import { canAddRows, createEmptyRow } from "../utils/row-actions";
import { getSectionKeyForTab } from "../utils/navigation";

const LENSES_BY_TAB: Record<string, string[]> = {
	Setup: ["Collar", "RigSheet", "DrillMethod", "SurveyLog"],
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
	const {
		activeTab,
		activeLens,
		setActiveLens,
		saveSection,
		refreshSection,
		addRow,
		deleteRow,
		openDrawer,
		drillPlanId,
		vwCollar,
	} = useDrillHoleDataStore(
		state => ({
			activeTab: state.activeTab,
			activeLens: state.activeLens,
			setActiveLens: state.setActiveLens,
			saveSection: state.saveSection,
			refreshSection: state.refreshSection,
			addRow: state.addRow,
			deleteRow: state.deleteRow,
			openDrawer: state.openDrawer,
			drillPlanId: state.drillPlanId,
			vwCollar: state.vwCollar,
		}),
		shallow,
	);

	const currentLenses = LENSES_BY_TAB[activeTab] || [];
	const currentOtherLogs = OTHER_LOGS_BY_TAB[activeTab] || [];
	const currentViewLens = activeLens[activeTab] || currentLenses[0] || "";
	const currentSectionKey = useMemo(() => getSectionKeyForTab(activeTab, currentViewLens), [activeTab, currentViewLens]);

	const currentSection = useDrillHoleDataStore(
		state => (currentSectionKey ? (state.sections as any)[currentSectionKey] : null),
		shallow,
	);

	const currentRows = useMemo(() => (Array.isArray(currentSection?.data) ? currentSection.data : []), [currentSection]);

	const handleLensClick = (lens: string) => {
		console.log("[ActionBar] 🔍 Lens click", { activeTab, lens, timestamp: new Date().toISOString() });
		setActiveLens(activeTab, lens);
	};

	const handleSave = async () => {
		if (!currentSectionKey) return;
		console.log("[ActionBar] 💾 Save requested", { activeTab, currentViewLens, currentSectionKey });
		await saveSection(currentSectionKey);
	};

	const handleRefresh = async () => {
		if (!currentSectionKey) return;
		console.log("[ActionBar] 🔄 Section refresh requested", { activeTab, currentViewLens, currentSectionKey });
		await refreshSection(currentSectionKey);
	};

	const handleAddInterval = () => {
		if (!canAddRows(currentSectionKey)) {
			message.info("Add Interval is not available in this section");
			return;
		}

		const lastRow = currentRows[currentRows.length - 1] || null;
		const nextDepth = lastRow?.DepthTo || 0;
		const newRow = createEmptyRow(currentSectionKey, {
			drillPlanId,
			organization: vwCollar?.Organization,
			depthFrom: nextDepth,
		});

		console.log("[ActionBar] ➕ Add Interval", { currentSectionKey, newRowId: Object.values(newRow)[0] });
		addRow(currentSectionKey, newRow);
		openDrawer(currentSectionKey, newRow);
	};

	const handleNewLog = () => {
		if (!canAddRows(currentSectionKey)) {
			message.info("New Log is not available in this section");
			return;
		}

		Modal.confirm({
			title: "Start New Log",
			content: "This will soft-delete current rows for this section and create a fresh first row.",
			okText: "Start New Log",
			onOk: () => {
				currentRows.forEach((row: any) => {
					const rowId = row.GeologyCombinedLogId || row.ShearLogId || row.StructureLogId || row.CoreRecoveryRunLogId || row.FractureCountLogId || row.MagSusLogId || row.RockMechanicLogId || row.RockQualityDesignationLogId || row.SpecificGravityPtLogId || row.SampleId;
					if (rowId) {
						deleteRow(currentSectionKey, String(rowId));
					}
				});

				const firstRow = createEmptyRow(currentSectionKey, {
					drillPlanId,
					organization: vwCollar?.Organization,
					depthFrom: 0,
				});

				console.log("[ActionBar] 🆕 New Log created", { currentSectionKey });
				addRow(currentSectionKey, firstRow);
				openDrawer(currentSectionKey, firstRow);
			},
		});
	};

	const showLogActions = canAddRows(currentSectionKey) && activeTab !== "Setup" && activeTab !== "QAQC" && activeTab !== "SignOff" && activeTab !== "Summary";

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
