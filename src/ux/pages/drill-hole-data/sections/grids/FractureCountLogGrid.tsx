/**
 * FractureCountLog Grid Component
 *
 * AG Grid component for fracture count logging.
 *
 * @module drill-hole-data/sections/grids
 */

import { FractureCountLog, SectionKey } from "../../types/data-contracts";
import React, { useMemo } from "react";

import { DataGrid } from "../../components/DataGrid";
import { fractureCountLogColumns } from "../../column-defs/fractureCountLogColumns";
import { useGeotechGridOperations } from "../../hooks";

export const FractureCountLogGrid: React.FC = () => {
	const {
		rows,
		isReadOnly,
		rowMetadata,
		handleCellValueChanged,
		handleEditRow,
	} = useGeotechGridOperations(SectionKey.FractureCountLog, "FractureCountLogId");

	console.log("[FractureCountLogGrid] 📊 Rendering grid", {
		rowCount: rows.length,
		isReadOnly,
	});

	const getRowClass = useMemo(() => {
		return (row: FractureCountLog) => {
			const rowId = row.FractureCountLogId;
			const metadata = rowMetadata[rowId];

			if (metadata?.validationStatus === "Invalid") return "bg-red-50 border-l-4 border-red-500";
			if (metadata?.isDirty) return "bg-blue-50 border-l-4 border-blue-500";
			return "";
		};
	}, [rowMetadata]);

	return (
		<div className="h-full w-full">
			<DataGrid<FractureCountLog>
				columnDefs={fractureCountLogColumns}
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
