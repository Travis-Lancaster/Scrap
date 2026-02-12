/**
 * Geotech View
 * 
 * Main view for Geotech tab with lens-based navigation.
 * Displays different geotech logs based on active lens.
 * 
 * @module drill-hole-data/views
 */

import React from "react";
import { useDrillHoleDataStore } from "../store";
import { SectionKey } from "../types/data-contracts";
import {
	CoreRecoveryRunLogGrid,
	FractureCountLogGrid,
	MagSusLogGrid,
	RockMechanicLogGrid,
	RockQualityDesignationLogGrid,
	SpecificGravityPtLogGrid,
	StructureLogGrid,
} from "../sections/grids";
import { SectionFooter } from "../components/SectionFooter";
import { useSectionActions } from "../hooks";

export const GeotechView: React.FC = () => {
	// ========================================================================
	// Store Selectors
	// ========================================================================

	const activeLens = useDrillHoleDataStore(state => state.activeLens["Geotech"]);
	const currentLens = activeLens || "CoreRecoveryRun";

	// Map lens to section key
	const getLensSectionKey = (lens: string): SectionKey => {
		const lensMap: Record<string, SectionKey> = {
			"CoreRecoveryRun": SectionKey.CoreRecoveryRunLog,
			"FractureCount": SectionKey.FractureCountLog,
			"MagSus": SectionKey.MagSusLog,
			"RockMechanic": SectionKey.RockMechanicLog,
			"RockQualityDesignation": SectionKey.RockQualityDesignationLog,
			"SpecificGravityPt": SectionKey.SpecificGravityPtLog,
			"Structure": SectionKey.StructureLog,
		};
		return lensMap[lens] || SectionKey.CoreRecoveryRunLog;
	};

	const currentSectionKey = getLensSectionKey(currentLens);
	const section = useDrillHoleDataStore(state => state.sections[currentSectionKey]);

	console.log("[GeotechView] 🔍 Rendering Geotech view", {
		currentLens,
		sectionKey: currentSectionKey,
		isDirty: section?.isDirty,
	});

	// ========================================================================
	// Section Actions
	// ========================================================================

	const { onSave, onSubmit } = useSectionActions(currentSectionKey);

	// ========================================================================
	// Render Grid Based on Lens
	// ========================================================================

	const renderGrid = () => {
		switch (currentLens) {
			case "CoreRecoveryRun":
				return <CoreRecoveryRunLogGrid />;
			case "FractureCount":
				return <FractureCountLogGrid />;
			case "MagSus":
				return <MagSusLogGrid />;
			case "RockMechanic":
				return <RockMechanicLogGrid />;
			case "RockQualityDesignation":
				return <RockQualityDesignationLogGrid />;
			case "SpecificGravityPt":
				return <SpecificGravityPtLogGrid />;
			case "Structure":
				return <StructureLogGrid />;
			default:
				return <CoreRecoveryRunLogGrid />;
		}
	};

	// ========================================================================
	// Render
	// ========================================================================

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-hidden bg-white">
				{renderGrid()}
			</div>

			{/* Section Footer with integrated actions */}
			<SectionFooter
				rowStatus={section?.data?.[0]?.RowStatus || 0}
				isDirty={section?.isDirty || false}
				onSave={onSave}
				onSubmit={onSubmit}
			/>
		</div>
	);
};
