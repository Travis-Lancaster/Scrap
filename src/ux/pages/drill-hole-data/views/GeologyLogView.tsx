/**
 * Geology Log View
 *
 * Main view for Geology Log tab with lens-based navigation.
 * Displays different geology logs based on active lens.
 *
 * @module drill-hole-data/views
 */

import { GeologyCombinedLogDrawer } from "../drawers/GeologyCombinedLogDrawer";
import { GeologyCombinedLogGrid } from "../sections/grids/GeologyCombinedLogGrid";
import React from "react";
import { SectionFooter } from "../components/SectionFooter";
import { ShearLogGrid } from "../sections/grids/ShearLogGrid";
import { StructureLogGrid } from "../sections/grids/StructureLogGrid";
import { useDrillHoleDataStore } from "../store";
import { SectionKey } from "../types/data-contracts";
import { useSectionActions } from "../hooks";

export const GeologyLogView: React.FC = () => {
	// ========================================================================
	// Store Selectors
	// ========================================================================

	const activeLens = useDrillHoleDataStore(state => state.activeLens["Geology"]);
	const isDrawerOpen = useDrillHoleDataStore(state => state.isDrawerOpen);
	const selectedRow = useDrillHoleDataStore(state => state.selectedRow);
	const selectedSection = useDrillHoleDataStore(state => state.selectedSection);
	const closeDrawer = useDrillHoleDataStore(state => state.closeDrawer);
	
	const currentLens = activeLens || "Litho";

	// Get current section key based on lens
	const currentSectionKey =
		["Litho", "Alteration", "Veins", "Everything"].includes(currentLens)
			? SectionKey.GeologyCombinedLog
			: currentLens === "Shear"
			? SectionKey.ShearLog
			: SectionKey.StructureLog;

	// Get section state for footer
	const section = useDrillHoleDataStore(state => state.sections[currentSectionKey]);

	console.log("[GeologyLogView] 🔍 Rendering GeologyLogView", {
		currentLens,
		sectionKey: currentSectionKey,
		drawerOpen: isDrawerOpen,
		isDirty: section?.isDirty,
	});

	// ========================================================================
	// Section Actions
	// ========================================================================

	const { onSave, onSubmit } = useSectionActions(currentSectionKey);

	// ========================================================================
	// Grid Rendering
	// ========================================================================

	// Determine which grid to show
	const renderGrid = () => {
		// Main lens views (Litho, Alteration, Veins, Everything)
		if (["Litho", "Alteration", "Veins", "Everything"].includes(currentLens)) {
			return <GeologyCombinedLogGrid />;
		}
		// Other logs
		if (currentLens === "Shear") {
			return <ShearLogGrid />;
		}
		if (currentLens === "Structure") {
			return <StructureLogGrid />;
		}
		return <GeologyCombinedLogGrid />;
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

			{/* Drawer - only show for GeologyCombinedLog for now */}
			{isDrawerOpen && selectedSection === "geologyCombinedLog" && (
				<GeologyCombinedLogDrawer
					open={isDrawerOpen}
					onClose={closeDrawer}
					rowData={selectedRow}
				/>
			)}
		</div>
	);
};
