/**
 * StructureLog Grid Component
 *
 * AG Grid component for structural feature logging.
 *
 * @module drill-hole-data/sections/grids
 */

// import type { StructureLog } from "#src/api/database/data-contracts";
import React, { useMemo } from "react";
import { SectionKey, StructureLog } from "../../types/data-contracts";

import { DataGrid } from "../../components/DataGrid";
import { structureLogColumns } from "../../column-defs/structureLogColumns";
import { useDrillHoleDataStore } from "../../store";
import { useGridUIContext } from "../../hooks";

// import { SectionKey } from "../../types/data-contracts";

export const StructureLogGrid: React.FC = () => {
	// ========================================================================
	// Store Selectors
	// ========================================================================

	const section = useDrillHoleDataStore(state => state.sections.structureLog);
	const openDrawer = useDrillHoleDataStore(state => state.openDrawer);
	const canEdit = useDrillHoleDataStore(state => state.canEdit(SectionKey.StructureLog));
	const { uiState, updateUIState } = useGridUIContext("Geology", "Structure");

	const rows = section.data || [];
	const rowMetadata = section.rowMetadata || {};

	console.log("[StructureLogGrid] 📊 Rendering grid", {
		rowCount: rows.length,
		isReadOnly: !canEdit,
		isDirty: section.isDirty,
	});

	// ========================================================================
	// Row Styling
	// ========================================================================

	const getRowClass = useMemo(() => {
		return (row: StructureLog) => {
			const rowId = row.StructureLogId;
			const metadata = rowMetadata[rowId];

			if (metadata?.validationStatus === "Invalid") {
				return "bg-red-50 border-l-4 border-red-500";
			}

			if (metadata?.isDirty) {
				return "bg-blue-50 border-l-4 border-blue-500";
			}

			return "";
		};
	}, [rowMetadata]);

	// ========================================================================
	// Event Handlers
	// ========================================================================

	const handleRowClick = (row: StructureLog) => {
		console.log("[StructureLogGrid] 🖱️ Row clicked:", {
			rowId: row.StructureLogId,
			depthFrom: row.DepthFrom,
		});
		openDrawer("structureLog", row);
	};

	// ========================================================================
	// Render
	// ========================================================================

	return (
		<div className="h-full w-full">
			<DataGrid<StructureLog>
				columnDefs={structureLogColumns}
				rowData={rows}
				onRowClick={handleRowClick}
				sortColumn="DepthFrom"
				readOnly={!canEdit}
				getRowClass={getRowClass}
				rowIdField="StructureLogId"
				uiState={uiState}
				onUIStateChange={updateUIState}
			/>
		</div>
	);
};
