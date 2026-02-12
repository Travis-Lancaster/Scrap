import type {
	CellValueChangedEvent,
	ColDef,
	ColumnMovedEvent,
	ColumnResizedEvent,
	GridReadyEvent,
	RowClickedEvent,
	SelectionChangedEvent,
	SortChangedEvent,
} from "ag-grid-enterprise";
import React, { useCallback, useMemo } from "react";

import { AgGridReact } from "ag-grid-react";
import { getCommonGridProps } from "#src/ux/config/ag-grid-config.js";

interface DataGridUIState {
	currentPage?: number;
	pageSize?: number;
	searchQuery?: string;
	filters?: Record<string, any>;
	sortBy?: string | null;
	sortOrder?: "asc" | "desc" | null;
	selectedRows?: string[];
	columnVisibility?: Record<string, boolean>;
	columnWidths?: Record<string, number>;
}

interface DataGridProps<T> {
	columnDefs: ColDef[];
	rowData: T[];
	onRowClick?: (row: T) => void;
	onCellValueChanged?: (event: CellValueChangedEvent<T>) => void;
	sortColumn?: string;
	readOnly?: boolean;
	className?: string;
	getRowClass?: (row: T) => string;
	rowIdField?: keyof T | string;
	uiState?: DataGridUIState;
	onUIStateChange?: (partial: Partial<DataGridUIState>) => void;
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
	rowIdField = "id",
	uiState,
	onUIStateChange,
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
			sortable: true,
			filter: true,
			floatingFilter: false,
		}),
		[gridProps.defaultColDef],
	);

	const handleGridReady = useCallback((params: GridReadyEvent<T>) => {
		console.log("[DataGrid] ✅ Grid ready");
		params.api.sizeColumnsToFit();

		if (uiState?.searchQuery) {
			params.api.setGridOption("quickFilterText", uiState.searchQuery);
		}
		if (uiState?.filters) {
			params.api.setFilterModel(uiState.filters);
		}
		if (uiState?.sortBy && uiState.sortOrder) {
			params.api.applyColumnState({
				state: [{ colId: uiState.sortBy, sort: uiState.sortOrder }],
				defaultState: { sort: null },
			});
		}
		if (uiState?.columnWidths && Object.keys(uiState.columnWidths).length > 0) {
			params.api.applyColumnState({
				state: Object.entries(uiState.columnWidths).map(([colId, width]) => ({ colId, width })),
				applyOrder: false,
			});
		}
		if (uiState?.columnVisibility && Object.keys(uiState.columnVisibility).length > 0) {
			params.api.applyColumnState({
				state: Object.entries(uiState.columnVisibility).map(([colId, hidden]) => ({ colId, hide: !hidden })),
				applyOrder: false,
			});
		}
	}, [uiState]);

	const handleRowClicked = useCallback(
		(event: RowClickedEvent<T>) => {
			if (onRowClick && event.data) {
				onRowClick(event.data);
			}
		},
		[onRowClick],
	);

	const handleCellValueChanged = useCallback(
		(event: CellValueChangedEvent<T>) => {
			if (onCellValueChanged) {
				onCellValueChanged(event);
			}
		},
		[onCellValueChanged],
	);

	const handleFilterChanged = useCallback((event: any) => {
		onUIStateChange?.({ filters: event.api.getFilterModel() || {} });
	}, [onUIStateChange]);

	const handleSortChanged = useCallback((event: SortChangedEvent<T>) => {
		const sortedCol = event.api.getColumnState().find(col => !!col.sort);
		onUIStateChange?.({
			sortBy: sortedCol?.colId || null,
			sortOrder: (sortedCol?.sort as "asc" | "desc" | null) || null,
		});
	}, [onUIStateChange]);

	const handleSelectionChanged = useCallback((event: SelectionChangedEvent<T>) => {
		const selectedRows = event.api
			.getSelectedRows()
			.map((row: any) => String(row[rowIdField as string]))
			.filter(Boolean);
		onUIStateChange?.({ selectedRows });
	}, [onUIStateChange, rowIdField]);

	const handleColumnResized = useCallback((event: ColumnResizedEvent<T>) => {
		if (!event.finished) return;
		const state = event.api.getColumnState();
		onUIStateChange?.({
			columnWidths: state.reduce<Record<string, number>>((acc, col) => {
				if (col.width) acc[col.colId] = col.width;
				return acc;
			}, {}),
		});
	}, [onUIStateChange]);

	const handleColumnMoved = useCallback((event: ColumnMovedEvent<T>) => {
		const state = event.api.getColumnState();
		onUIStateChange?.({
			columnVisibility: state.reduce<Record<string, boolean>>((acc, col) => {
				acc[col.colId] = !col.hide;
				return acc;
			}, {}),
		});
	}, [onUIStateChange]);

	const getRowClassCallback = useCallback(
		(params: any) => {
			if (getRowClass && params.data) {
				return getRowClass(params.data);
			}
			return "";
		},
		[getRowClass],
	);

	return (
		<div className={`ag-theme-balham ${className}`} style={{ height: "100%", width: "100%" }}>
			<AgGridReact<T>
				theme={gridProps.theme}
				columnDefs={columnDefs}
				rowData={rowData}
				defaultColDef={defaultColDef}
				animateRows={gridProps.animateRows}
				onGridReady={handleGridReady}
				onRowClicked={handleRowClicked}
				onCellValueChanged={handleCellValueChanged}
				onFilterChanged={handleFilterChanged}
				onSortChanged={handleSortChanged}
				onSelectionChanged={handleSelectionChanged}
				onColumnResized={handleColumnResized}
				onColumnMoved={handleColumnMoved}
				rowSelection="multiple"
				suppressCellFocus={readOnly}
				domLayout="normal"
				getRowClass={getRowClassCallback}
			/>
		</div>
	);
}
