/**
 * Drill-Hole-Data Layout
 *
 * Main layout component for drill-hole-data module.
 * Coordinates navigation, data loading, and view rendering.
 *
 * ARCHITECTURE:
 * - Loads drill hole data on mount using drillPlanId from route
 * - Manages tab and lens navigation
 * - Renders appropriate view based on active tab
 * - Provides drawer for row editing
 *
 * @module drill-hole-data
 */

import React, { useEffect } from "react";

import { ActionBar } from "./components/ActionBar";
import { GeologyLogView } from "./views/GeologyLogView";
import { GeotechView } from "./views/GeotechView";
import { InspectorDrawer } from "./components/InspectorDrawer";
import { NavigationTabs } from "./components/NavigationTabs";
import { QAQCView } from "./views/QAQCView";
import { SamplingView } from "./views/SamplingView";
// Views
import { SetupView } from "./views/SetupView";
import { SignOffView } from "./views/SignOffView";
import { Spin } from "antd";
import { SummaryView } from "./views/SummaryView";
import { TitleBar } from "./components/TitleBar";
import { useDrillHoleDataStore } from "./store";
import { useParams } from "react-router";

export const DrillHoleDataLayout: React.FC = () => {
	// ========================================================================
	// Route Parameters
	// ========================================================================

	const { drillPlanId } = useParams<{ drillPlanId: string }>();

	console.log("[DrillHoleDataLayout] 🎯 Route params:", { drillPlanId });

	// ========================================================================
	// Store Selectors
	// ========================================================================

	const activeTab = useDrillHoleDataStore(state => state.activeTab);
	const isLoading = useDrillHoleDataStore(state => state.isLoading);
	const isLoaded = useDrillHoleDataStore(state => state.isLoaded);
	const error = useDrillHoleDataStore(state => state.error);
	const vwCollar = useDrillHoleDataStore(state => state.vwCollar);
	const vwDrillPlan = useDrillHoleDataStore(state => state.vwDrillPlan);
	const loadDrillHole = useDrillHoleDataStore(state => state.loadDrillHole);
	const unloadDrillHole = useDrillHoleDataStore(state => state.unloadDrillHole);

	// ========================================================================
	// Data Loading
	// ========================================================================

	// Load drill hole data on mount or when drillPlanId changes
	useEffect(() => {
		if (drillPlanId) {
			console.log("[DrillHoleDataLayout] 🚀 Loading drill hole:", drillPlanId);
			loadDrillHole(drillPlanId);
		}

		// Cleanup on unmount
		return () => {
			console.log("[DrillHoleDataLayout] 🧹 Cleanup: unloading drill hole");
			unloadDrillHole();
		};
	}, [drillPlanId, loadDrillHole, unloadDrillHole]);

	// ========================================================================
	// Loading States
	// ========================================================================

	if (!drillPlanId) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<p className="text-red-500 text-lg font-bold">Missing Drill Plan ID</p>
					<p className="text-gray-500">No drillPlanId parameter in route</p>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Spin size="large" tip="Loading drill hole data..." />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<p className="text-red-500 text-lg font-bold">Error Loading Drill Hole</p>
					<p className="text-gray-500">{error}</p>
				</div>
			</div>
		);
	}

	if (!isLoaded) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<p className="text-gray-500">No data loaded</p>
				</div>
			</div>
		);
	}

	const renderContent = () => {
		console.log(`[DrillHoleData] Rendering view for tab: ${activeTab}`);
		switch (activeTab) {
			case "Setup":
				return <SetupView />;
			case "Geology":
				return <GeologyLogView />;
			case "Geotech":
				return <GeotechView />;
			case "Sampling":
				return <SamplingView />;
			case "QAQC":
				return <QAQCView />;
			case "SignOff":
				return <SignOffView />;
			case "Summary":
				return <SummaryView />;
			default:
				return <div className="p-6">Unknown Tab</div>;
		}
	};

	// ========================================================================
	// Render Main Layout
	// ========================================================================

	return (
		<main className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#f3f4f6]">
			{/* 1. Title Bar - Drill Hole Header (populated from real data) */}
			<TitleBar
				project={vwDrillPlan?.Project || "Unknown Project"}
				plan={vwDrillPlan?.PlannedHoleNm || "Unknown Plan"}
				holeId={vwCollar?.HoleNm || vwCollar?.PlannedHoleNm || drillPlanId}
				status={vwCollar?.HoleStatus || "Unknown"}
				depth={{
					current: vwCollar?.TotalDepth || 0,
					planned: vwCollar?.PlannedTotalDepth || 0,
				}}
				draftStatus={vwCollar?.RowStatus?.Description || "DRAFT"}
				modifiedTime={
					vwCollar?.ModifiedOnDt
						? new Date(vwCollar.ModifiedOnDt).toLocaleString()
						: "Unknown"
				}
				onChangeStatus={() => console.log("[TitleBar] Change Status action")}
				onDownload={() => console.log("[TitleBar] Download action")}
				onSync={() => console.log("[TitleBar] Sync action")}
			/>

			{/* 2. Navigation Tabs */}
			<NavigationTabs />

			{/* 3. Action Bar (Contextual could be dynamic, but static in mock) */}
			<ActionBar />

			{/* 4. Main Content Area */}
			<div className="flex-grow overflow-hidden relative">
				{renderContent()}
			</div>

			{/* 5. Drawer */}
			<InspectorDrawer />
		</main>
	);
};
