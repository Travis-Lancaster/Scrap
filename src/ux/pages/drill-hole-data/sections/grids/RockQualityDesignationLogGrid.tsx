/**
 * RockQualityDesignationLog Grid Component
 *
 * AG Grid component for rock quality designation (RQD) logging.
 *
 * @module drill-hole-data/sections/grids
 */

import React, { useMemo } from "react";
import { RockQualityDesignationLog, SectionKey } from "../../types/data-contracts";

import { DataGrid } from "../../components/DataGrid";
import { rockQualityDesignationLogColumns } from "../../column-defs/rockQualityDesignationLogColumns";
import { useGeotechGridOperations } from "../../hooks";

export const RockQualityDesignationLogGrid: React.FC = () => {
	const {
		rows,
		isReadOnly,
		rowMetadata,
		handleCellValueChanged,
		handleEditRow,
	} = useGeotechGridOperations(SectionKey.RockQualityDesignationLog, "RockQualityDesignationLogId");

	console.log("[RockQualityDesignationLogGrid] 📊 Rendering grid", {
		rowCount: rows.length,
		isReadOnly,
	});

	const getRowClass = useMemo(() => {
		return (row: RockQualityDesignationLog) => {
			const rowId = row.RockQualityDesignationLogId;
			const metadata = rowMetadata[rowId];

			if (metadata?.validationStatus === "Invalid") return "bg-red-50 border-l-4 border-red-500";
			if (metadata?.isDirty) return "bg-blue-50 border-l-4 border-blue-500";
			return "";
		};
	}, [rowMetadata]);

	return (
		<div className="h-full w-full">
			<DataGrid<RockQualityDesignationLog>
				columnDefs={rockQualityDesignationLogColumns}
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
