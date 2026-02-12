/**
 * MagSusLog Grid Component
 *
 * AG Grid component for magnetic susceptibility logging.
 *
 * @module drill-hole-data/sections/grids
 */

import { MagSusLog, SectionKey } from "../../types/data-contracts";
import React, { useMemo } from "react";

import { DataGrid } from "../../components/DataGrid";
import { magSusLogColumns } from "../../column-defs/magSusLogColumns";
import { useGeotechGridOperations } from "../../hooks";

export const MagSusLogGrid: React.FC = () => {
	const {
		rows,
		isReadOnly,
		rowMetadata,
		handleCellValueChanged,
		handleEditRow,
	} = useGeotechGridOperations(SectionKey.MagSusLog, "MagSusLogId");

	console.log("[MagSusLogGrid] 📊 Rendering grid", {
		rowCount: rows.length,
		isReadOnly,
	});

	const getRowClass = useMemo(() => {
		return (row: MagSusLog) => {
			const rowId = row.MagSusLogId;
			const metadata = rowMetadata[rowId];

			if (metadata?.validationStatus === "Invalid") return "bg-red-50 border-l-4 border-red-500";
			if (metadata?.isDirty) return "bg-blue-50 border-l-4 border-blue-500";
			return "";
		};
	}, [rowMetadata]);

	return (
		<div className="h-full w-full">
			<DataGrid<MagSusLog>
				columnDefs={magSusLogColumns}
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
