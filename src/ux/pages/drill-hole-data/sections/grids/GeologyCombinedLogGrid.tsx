/**
 * GeologyCombinedLog Grid Component
 *
 * AG Grid component for geology logging with integrated validation,
 * editing, and dirty tracking.
 *
 * FEATURES:
 * - Cell editing with lookup autocompletes
 * - Row validation with visual indicators
 * - isDirty row tracking
 * - ReadOnly control based on RowStatus
 * - Always sorted by DepthFrom
 * - Drawer integration for detailed editing
 * - Lens-based column filtering
 *
 * @module drill-hole-data/sections/grids
 */

import React, { useMemo } from "react";

import { DataGrid } from "../../components/DataGrid";
import { GeologyCombinedLog } from "../../types/data-contracts";
import { getGeologyCombinedLogColumns } from "../../column-defs/geologyCombinedLogColumns";
import { useDrillHoleDataStore } from "../../store";
import { useGeologyLogOperations } from "../../hooks";

export const GeologyCombinedLogGrid: React.FC = () => {
	// ========================================================================
	// Store Selectors
	// ========================================================================

	const activeLens = useDrillHoleDataStore(state => state.activeLens["Geology"]);
	const currentLens = activeLens || "Litho";

	// ========================================================================
	// Hook Integration (NEW - Production Architecture)
	// ========================================================================

	const {
		rows,
		isReadOnly,
		isDirty,
		rowMetadata,
		handleEditRow,
	} = useGeologyLogOperations();

	const openDrawer = useDrillHoleDataStore(state => state.openDrawer);

	console.log("[GeologyCombinedLogGrid] 📊 Rendering grid with new architecture", {
		lens: currentLens,
		rowCount: rows.length,
		isReadOnly,
		isDirty,
		dirtyRowCount: Object.values(rowMetadata).filter((m: any) => m.isDirty).length,
	});

	// ========================================================================
	// Column Configuration
	// ========================================================================

	// Get columns based on active lens
	const columns = useMemo(() => {
		const cols = getGeologyCombinedLogColumns(currentLens);

		// Mark columns as readonly if section is readonly
		if (isReadOnly) {
			return cols.map(col => ({
				...col,
				editable: false,
			}));
		}

		return cols;
	}, [currentLens, isReadOnly]);

	// ========================================================================
	// Row Styling
	// ========================================================================

	const getRowClass = useMemo(() => {
		return (row: GeologyCombinedLog) => {
			const rowId = row.GeologyCombinedLogId;
			const metadata = rowMetadata[rowId];

			// Invalid row (validation failed)
			if (metadata?.validationStatus === "Invalid") {
				return "bg-red-50 border-l-4 border-red-500";
			}

			// Dirty row (unsaved changes)
			if (metadata?.isDirty) {
				return "bg-blue-50 border-l-4 border-blue-500";
			}

			return "";
		};
	}, [rowMetadata]);

	// ========================================================================
	// Event Handlers
	// ========================================================================

	const handleRowClick = (row: any) => {
		console.log("[GeologyCombinedLogGrid] 🖱️ Row clicked, opening drawer", {
			rowId: row.GeologyCombinedLogId,
			depthFrom: row.DepthFrom,
			depthTo: row.DepthTo,
		});
		openDrawer("geologyCombinedLog", row);
	};

	// ========================================================================
	// Render
	// ========================================================================

	return (
		<div className="h-full w-full">
			<DataGrid<GeologyCombinedLog>
				columnDefs={columns}
				rowData={rows}
				onRowClick={handleRowClick}
				sortColumn="DepthFrom"
				readOnly={isReadOnly}
				getRowClass={getRowClass}
			/>
		</div>
	);
};
