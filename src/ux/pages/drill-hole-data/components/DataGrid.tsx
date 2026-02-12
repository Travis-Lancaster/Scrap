import type { CellValueChangedEvent, ColDef, GridReadyEvent, RowClickedEvent } from "ag-grid-enterprise";
import React, { useCallback, useMemo } from "react";

import { AgGridReact } from "ag-grid-react";
import { getCommonGridProps } from "#src/ux/config/ag-grid-config.js";

interface DataGridProps<T> {
	columnDefs: ColDef[];
	rowData: T[];
	onRowClick?: (row: T) => void;
	onCellValueChanged?: (event: CellValueChangedEvent<T>) => void;
	sortColumn?: string;
	readOnly?: boolean;
	className?: string;
	getRowClass?: (row: T) => string;
}

export function DataGrid<T extends Record<string, any>>({
	columnDefs,
	rowData,
	onRowClick,
	onCellValueChanged,
	sortColumn = "DepthFrom",
	readOnly = false,
	className = "",
	getRowClass,
}: DataGridProps<T>) {
	console.log("[DataGrid] 📊 Rendering grid:", {
		rowCount: rowData.length,
		columnCount: columnDefs.length,
		sortColumn,
		readOnly,
	});

	const gridProps = useMemo(() => getCommonGridProps(), []);

	const defaultColDef = useMemo<ColDef>(
		() => ({
			...gridProps.defaultColDef,
			sortable: false, // Disable sorting UI as per requirements
			filter: false, // Disable filters for simplicity
			floatingFilter: false,
		}),
		[gridProps.defaultColDef],
	);

	const handleGridReady = useCallback((params: GridReadyEvent) => {
		console.log("[DataGrid] ✅ Grid ready");
		// Auto-size all columns to fit content
		params.api.sizeColumnsToFit();
	}, []);

	const handleRowClicked = useCallback(
		(event: RowClickedEvent<T>) => {
			console.log("[DataGrid] 🖱️ Row clicked:", {
				rowIndex: event.rowIndex,
				data: event.data,
			});
			if (onRowClick && event.data) {
				onRowClick(event.data);
			}
		},
		[onRowClick],
	);

	const handleCellValueChanged = useCallback(
		(event: CellValueChangedEvent<T>) => {
			console.log("[DataGrid] ✏️ Cell value changed:", {
				rowIndex: event.rowIndex,
				column: event.column?.getColId(),
				oldValue: event.oldValue,
				newValue: event.newValue,
			});
			if (onCellValueChanged) {
				onCellValueChanged(event);
			}
		},
		[onCellValueChanged],
	);

	const getRowClassCallback = useCallback(
		(params: any) => {
			if (getRowClass && params.data) {
				return getRowClass(params.data);
			}
			return "";
		},
		[getRowClass],
	);
	// lightGridTheme
	return (
		<div
			className={`ag-theme-balham ${className}`}
			style={{ height: "100%", width: "100%" }}
		>
			<AgGridReact<T>
				theme={gridProps.theme}
				columnDefs={columnDefs}
				rowData={rowData}
				defaultColDef={defaultColDef}
				animateRows={gridProps.animateRows}
				onGridReady={handleGridReady}
				onRowClicked={handleRowClicked}
				onCellValueChanged={handleCellValueChanged}
				rowSelection="single"
				suppressCellFocus={readOnly}
				domLayout="normal"
				getRowClass={getRowClassCallback}
			/>
		</div>
	);
}
