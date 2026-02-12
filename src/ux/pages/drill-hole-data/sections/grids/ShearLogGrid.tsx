/**
 * ShearLog Grid Component
 *
 * AG Grid component for shear zone logging.
 *
 * @module drill-hole-data/sections/grids
 */

import React, { useMemo } from "react";
import { SectionKey, ShearLog } from "../../types/data-contracts";

import { DataGrid } from "../../components/DataGrid";
import { shearLogColumns } from "../../column-defs/shearLogColumns";
import { useDrillHoleDataStore } from "../../store";

export const ShearLogGrid: React.FC = () => {
	// ========================================================================
	// Store Selectors
	// ========================================================================

	const section = useDrillHoleDataStore(state => state.sections.shearLog);
	const openDrawer = useDrillHoleDataStore(state => state.openDrawer);
	const canEdit = useDrillHoleDataStore(state => state.canEdit(SectionKey.ShearLog));

	const rows = section.data || [];
	const rowMetadata = section.rowMetadata || {};

	console.log("[ShearLogGrid] 📊 Rendering grid", {
		rowCount: rows.length,
		isReadOnly: !canEdit,
		isDirty: section.isDirty,
	});

	// ========================================================================
	// Row Styling
	// ========================================================================

	const getRowClass = useMemo(() => {
		return (row: ShearLog) => {
			const rowId = row.ShearLogId;
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

	const handleRowClick = (row: ShearLog) => {
		console.log("[ShearLogGrid] 🖱️ Row clicked:", {
			rowId: row.ShearLogId,
			depthFrom: row.DepthFrom,
		});
		openDrawer("shearLog", row);
	};

	// ========================================================================
	// Render
	// ========================================================================

	return (
		<div className="h-full w-full">
			<DataGrid<ShearLog>
				columnDefs={shearLogColumns}
				rowData={rows}
				onRowClick={handleRowClick}
				sortColumn="DepthFrom"
				readOnly={!canEdit}
				getRowClass={getRowClass}
			/>
		</div>
	);
};
