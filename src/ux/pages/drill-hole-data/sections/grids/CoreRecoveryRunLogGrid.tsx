/**
 * CoreRecoveryRunLog Grid Component
 *
 * AG Grid component for core recovery run logging.
 *
 * @module drill-hole-data/sections/grids
 */

import { CoreRecoveryRunLog, SectionKey } from "../../types/data-contracts";
import React, { useMemo } from "react";

import { DataGrid } from "../../components/DataGrid";
import { coreRecoveryRunLogColumns } from "../../column-defs/coreRecoveryRunLogColumns";
import { useGeotechGridOperations } from "../../hooks";

export const CoreRecoveryRunLogGrid: React.FC = () => {
	const {
		rows,
		isReadOnly,
		rowMetadata,
		handleCellValueChanged,
		handleEditRow,
	} = useGeotechGridOperations(SectionKey.CoreRecoveryRunLog, "CoreRecoveryRunLogId");

	console.log("[CoreRecoveryRunLogGrid] 📊 Rendering grid", {
		rowCount: rows.length,
		isReadOnly,
	});

	const getRowClass = useMemo(() => {
		return (row: CoreRecoveryRunLog) => {
			const rowId = row.CoreRecoveryRunLogId;
			const metadata = rowMetadata[rowId];

			if (metadata?.validationStatus === "Invalid") return "bg-red-50 border-l-4 border-red-500";
			if (metadata?.isDirty) return "bg-blue-50 border-l-4 border-blue-500";
			return "";
		};
	}, [rowMetadata]);

	return (
		<div className="h-full w-full">
			<DataGrid<CoreRecoveryRunLog>
				columnDefs={coreRecoveryRunLogColumns}
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
