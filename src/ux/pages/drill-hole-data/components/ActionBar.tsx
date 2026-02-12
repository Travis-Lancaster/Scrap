import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Button } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { ActionBar as MasterActionBar } from "../../../components/ActionBar";
import type { ActionBarProps } from "../../../components/ActionBar.types";
import { useDrillHoleDataStore } from "../store";
import type { SectionKey } from "../types/data-contracts";
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

const ACTION_BUTTON_CONFIG: ActionBarProps["buttonConfig"] = {
	save: { label: "Save" },
	submit: { label: "Submit" },
	review: { label: "Review" },
	approve: { label: "Approve" },
	reject: { label: "Reject" },
};

function getSectionRowStatus(section: any): number {
	if (!section)
		return 0;

	if (typeof section.data?.RowStatus === "number") {
		return section.data.RowStatus;
	}

	if (Array.isArray(section.data) && section.data.length > 0) {
		const firstRow = section.data[0];
		if (typeof firstRow?.RowStatus === "number") {
			return firstRow.RowStatus;
		}
	}

	return 0;
}

export const ActionBar: React.FC = () => {
	const activeTab = useDrillHoleDataStore(state => state.activeTab);
	const activeLens = useDrillHoleDataStore(state => state.activeLens[activeTab] ?? "");
	const setActiveLens = useDrillHoleDataStore(state => state.setActiveLens);
	const saveSection = useDrillHoleDataStore(state => state.saveSection);
	const submitSection = useDrillHoleDataStore(state => state.submitSection);
	const reviewSection = useDrillHoleDataStore(state => state.reviewSection);
	const approveSection = useDrillHoleDataStore(state => state.approveSection);
	const rejectSection = useDrillHoleDataStore(state => state.rejectSection);
	const refreshSection = useDrillHoleDataStore(state => state.refreshSection);

	const currentLenses = LENSES_BY_TAB[activeTab] || [];
	const currentOtherLogs = OTHER_LOGS_BY_TAB[activeTab] || [];
	const currentViewLens = activeLens || currentLenses[0] || "";
	const showLogActions = ["Geology", "Geotech"].includes(activeTab);

	const currentSectionKey = useMemo(
		() => getSectionKeyForTab(activeTab as any, currentViewLens),
		[activeTab, currentViewLens],
	);

	const sectionKey = currentSectionKey as SectionKey | undefined;

	const isDirty = useDrillHoleDataStore(useCallback((state) => {
		if (!sectionKey)
			return false;
		const section = state.sections[sectionKey as keyof typeof state.sections] as any;
		return Boolean(section?.isDirty ?? section?.hasUnsavedChanges?.());
	}, [sectionKey]));

	const rowStatus = useDrillHoleDataStore(useCallback((state) => {
		if (!sectionKey)
			return 0;
		const section = state.sections[sectionKey as keyof typeof state.sections] as any;
		return getSectionRowStatus(section);
	}, [sectionKey]));

	const handleLensClick = useCallback((lens: string) => {
		setActiveLens(activeTab, lens);
	}, [activeTab, setActiveLens]);

	const handleAddInterval = useCallback(() => {
		console.log("[ActionBar] Add Interval clicked");
	}, []);

	const handleNewLog = useCallback(() => {
		console.log("[ActionBar] New Log clicked");
	}, []);

	const handleRefresh = useCallback(async () => {
		if (!sectionKey)
			return;
		await refreshSection(sectionKey);
	}, [refreshSection, sectionKey]);

	const validate = useCallback(() => {
		if (!sectionKey) {
			return { canSave: false, errors: [], warnings: [] };
		}
		const section = useDrillHoleDataStore.getState().sections[sectionKey as keyof ReturnType<typeof useDrillHoleDataStore.getState>["sections"]] as any;
		if (typeof section?.validate === "function") {
			return section.validate();
		}
		return { canSave: true, errors: [], warnings: [] };
	}, [sectionKey]);

	const getMetadata = useCallback(() => ({
		activeTab,
		activeLens: currentViewLens,
		sectionKey: sectionKey ?? null,
	}), [activeTab, currentViewLens, sectionKey]);

	const masterSection = useMemo<ActionBarProps["section"]>(() => ({
		sectionKey: sectionKey ?? "",
		rowStatus,
		isDirty,
		validate,
		getMetadata,
	} as ActionBarProps["section"]), [sectionKey, rowStatus, isDirty, validate, getMetadata]);

	const onSave = useCallback(async () => {
		if (!sectionKey)
			return;
		await saveSection(sectionKey);
	}, [saveSection, sectionKey]);

	const onSubmit = useCallback(async () => {
		if (!sectionKey)
			return;
		await submitSection(sectionKey);
	}, [sectionKey, submitSection]);

	const onReview = useCallback(async () => {
		if (!sectionKey)
			return;
		await reviewSection(sectionKey);
	}, [reviewSection, sectionKey]);

	const onApprove = useCallback(async () => {
		if (!sectionKey)
			return;
		await approveSection(sectionKey);
	}, [approveSection, sectionKey]);

	const onReject = useCallback(async () => {
		if (!sectionKey)
			return;
		await rejectSection(sectionKey);
	}, [rejectSection, sectionKey]);

	const actions = useMemo<ActionBarProps["actions"]>(() => ({
		onSave,
		onSubmit,
		onReview,
		onApprove,
		onReject,
	}), [onSave, onSubmit, onReview, onApprove, onReject]);

	const extraActions = useMemo(() => (
		<>
			{showLogActions && (
				<>
					<Button size="small" icon={<PlusOutlined />} onClick={handleAddInterval}>Add Interval</Button>
					<Button size="small" onClick={handleNewLog}>New Log</Button>
				</>
			)}
			<Button size="small" icon={<ReloadOutlined />} onClick={handleRefresh}>Refresh</Button>
		</>
	), [showLogActions, handleAddInterval, handleNewLog, handleRefresh]);

	const renderCountRef = useRef(0);
	const prevMasterSectionRef = useRef<ActionBarProps["section"] | null>(null);
	renderCountRef.current += 1;
	const masterSectionRefChanged = prevMasterSectionRef.current !== masterSection;
	console.log("[DrillHoleData.ActionBar][guard]", {
		renderCount: renderCountRef.current,
		sectionKey,
		masterSectionRefChanged,
	});

	useEffect(() => {
		prevMasterSectionRef.current = masterSection;
	}, [masterSection]);

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

			<MasterActionBar
				section={masterSection}
				actions={actions}
				extraActions={extraActions}
				size="small"
				buttonConfig={ACTION_BUTTON_CONFIG}
				showReadOnlyIndicator={false}
			/>
		</div>
	);
};
