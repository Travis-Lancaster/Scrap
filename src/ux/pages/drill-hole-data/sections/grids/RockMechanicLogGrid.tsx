/**
 * RockMechanicLog Grid Component
 *
 * AG Grid component for rock mechanic logging.
 *
 * @module drill-hole-data/sections/grids
 */

import React, { useMemo } from "react";
import { RockMechanicLog, SectionKey } from "../../types/data-contracts";

import { DataGrid } from "../../components/DataGrid";
import { rockMechanicLogColumns } from "../../column-defs/rockMechanicLogColumns";
import { useGeotechGridOperations } from "../../hooks";

export const RockMechanicLogGrid: React.FC = () => {
	const {
		rows,
		isReadOnly,
		rowMetadata,
		handleCellValueChanged,
		handleEditRow,
	} = useGeotechGridOperations(SectionKey.RockMechanicLog, "RockMechanicLogId");

	console.log("[RockMechanicLogGrid] 📊 Rendering grid", {
		rowCount: rows.length,
		isReadOnly,
	});

	const getRowClass = useMemo(() => {
		return (row: RockMechanicLog) => {
			const rowId = row.RockMechanicLogId;
			const metadata = rowMetadata[rowId];

			if (metadata?.validationStatus === "Invalid") return "bg-red-50 border-l-4 border-red-500";
			if (metadata?.isDirty) return "bg-blue-50 border-l-4 border-blue-500";
			return "";
		};
	}, [rowMetadata]);

	return (
		<div className="h-full w-full">
			<DataGrid<RockMechanicLog>
				columnDefs={rockMechanicLogColumns}
				rowData={rows}
				onRowClick={handleEditRow}
				onCellValueChanged={handleCellValueChanged}
				sortColumn="DepthFrom"
				readOnly={isReadOnly}
				getRowClass={getRowClass}
			/>
		</div>
	);
};
