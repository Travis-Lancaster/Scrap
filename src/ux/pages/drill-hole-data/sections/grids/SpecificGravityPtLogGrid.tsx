/**
 * SpecificGravityPtLog Grid Component
 *
 * AG Grid component for specific gravity point logging.
 *
 * @module drill-hole-data/sections/grids
 */

import React, { useMemo } from "react";
import { SectionKey, SpecificGravityPtLog } from "../../types/data-contracts";

import { DataGrid } from "../../components/DataGrid";
import { specificGravityPtLogColumns } from "../../column-defs/specificGravityPtLogColumns";
import { useGeotechGridOperations } from "../../hooks";

export const SpecificGravityPtLogGrid: React.FC = () => {
	const {
		rows,
		isReadOnly,
		rowMetadata,
		handleCellValueChanged,
		handleEditRow,
	} = useGeotechGridOperations(SectionKey.SpecificGravityPtLog, "SpecificGravityPtLogId");

	console.log("[SpecificGravityPtLogGrid] 📊 Rendering grid", {
		rowCount: rows.length,
		isReadOnly,
	});

	const getRowClass = useMemo(() => {
		return (row: SpecificGravityPtLog) => {
			const rowId = row.SpecificGravityPtLogId;
			const metadata = rowMetadata[rowId];

			if (metadata?.validationStatus === "Invalid") return "bg-red-50 border-l-4 border-red-500";
			if (metadata?.isDirty) return "bg-blue-50 border-l-4 border-blue-500";
			return "";
		};
	}, [rowMetadata]);

	return (
		<div className="h-full w-full">
			<DataGrid<SpecificGravityPtLog>
				columnDefs={specificGravityPtLogColumns}
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
