/**
 * Cell Selection Helper
 *
 * Reusable utilities for AG Grid cell range and row selection operations.
 * Provides abstractions over AG Grid API for better testability and consistency.
 *
 * Features:
 * - Extract selection bounds from cell ranges or clicked rows
 * - Get row data at specific indices
 * - Select rows programmatically
 * - Works with any grid type via generics
 *
 * @example
 * ```typescript
 * const { startIndex, endIndex, rowCount } = getCellSelectionBounds(params, gridRef);
 * const rowsInRange = getRowsInRange(gridRef, startIndex, endIndex);
 * selectRowsInRange(gridRef, startIndex, endIndex);
 * ```
 */

import type { GetContextMenuItemsParams } from "ag-grid-enterprise";
import type { AgGridReact } from "ag-grid-react";
import type { RefObject } from "react";

/**
 * Selection bounds information
 */
export interface SelectionBounds {
	/** Starting row index (inclusive) */
	startIndex: number
	/** Ending row index (inclusive) */
	endIndex: number
	/** Total number of rows in selection */
	rowCount: number
}

/**
 * Extract selection bounds from cell range or clicked row
 *
 * Supports both cell range selection (click and drag) and single row right-click.
 * Normalizes the selection to always return startIndex <= endIndex regardless of
 * selection direction.
 *
 * @param params - AG Grid context menu parameters
 * @param gridRef - Reference to AG Grid React component
 * @returns Normalized selection bounds
 *
 * @example
 * ```typescript
 * // In context menu handler
 * const { startIndex, endIndex, rowCount } = getCellSelectionBounds(params, gridRef);
 * console.log(`Selected ${rowCount} rows from ${startIndex} to ${endIndex}`);
 * ```
 */
export function getCellSelectionBounds<T>(
	params: GetContextMenuItemsParams<T>,
	gridRef: RefObject<AgGridReact<T>>,
): SelectionBounds {
	const cellRanges = gridRef.current?.api?.getCellRanges?.();

	// Fallback to clicked row if no cell range is selected
	if (!cellRanges?.length || !cellRanges[0]?.startRow || !cellRanges[0]?.endRow) {
		const rowIndex = params.node?.rowIndex ?? 0;
		return { startIndex: rowIndex, endIndex: rowIndex, rowCount: 1 };
	}

	// Extract row indices from the first cell range
	const startIdx = cellRanges[0].startRow.rowIndex;
	const endIdx = cellRanges[0].endRow.rowIndex;

	// Normalize indices (selection can be made in either direction)
	const startIndex = Math.min(startIdx, endIdx);
	const endIndex = Math.max(startIdx, endIdx);
	const rowCount = endIndex - startIndex + 1;

	return { startIndex, endIndex, rowCount };
}

/**
 * Get row data at a specific index
 *
 * @param gridRef - Reference to AG Grid React component
 * @param index - Row index
 * @returns Row data or undefined if not found
 *
 * @example
 * ```typescript
 * const row = getRowDataAtIndex(gridRef, 5);
 * if (row) {
 *   console.log('Row 5:', row);
 * }
 * ```
 */
export function getRowDataAtIndex<T>(
	gridRef: RefObject<AgGridReact<T>>,
	index: number,
): T | undefined {
	return gridRef.current?.api?.getDisplayedRowAtIndex(index)?.data;
}

/**
 * Get all rows in a range (inclusive)
 *
 * @param gridRef - Reference to AG Grid React component
 * @param startIndex - Starting row index (inclusive)
 * @param endIndex - Ending row index (inclusive)
 * @returns Array of row data
 *
 * @example
 * ```typescript
 * const rows = getRowsInRange(gridRef, 0, 4);
 * console.log(`Got ${rows.length} rows`); // 5 rows (0-4 inclusive)
 * ```
 */
export function getRowsInRange<T>(
	gridRef: RefObject<AgGridReact<T>>,
	startIndex: number,
	endIndex: number,
): T[] {
	const rows: T[] = [];

	for (let i = startIndex; i <= endIndex; i++) {
		const data = getRowDataAtIndex(gridRef, i);
		if (data) {
			rows.push(data);
		}
	}

	return rows;
}

/**
 * Select rows in a range (converts cell range to row selection)
 *
 * This is useful for context menu items that convert a cell range selection
 * to row checkbox selection.
 *
 * @param gridRef - Reference to AG Grid React component
 * @param startIndex - Starting row index (inclusive)
 * @param endIndex - Ending row index (inclusive)
 *
 * @example
 * ```typescript
 * // Context menu: "Select 5 Rows"
 * {
 *   name: 'Select Rows',
 *   action: () => selectRowsInRange(gridRef, startIndex, endIndex)
 * }
 * ```
 */
export function selectRowsInRange<T>(
	gridRef: RefObject<AgGridReact<T>>,
	startIndex: number,
	endIndex: number,
): void {
	const api = gridRef.current?.api;
	if (!api)
		return;

	for (let i = startIndex; i <= endIndex; i++) {
		const node = api.getDisplayedRowAtIndex(i);
		if (node) {
			node.setSelected(true);
		}
	}
}

/**
 * Create a pluralized label for row count
 *
 * @param rowCount - Number of rows
 * @returns Formatted label (e.g., "1 Row" or "5 Rows")
 *
 * @example
 * ```typescript
 * const label = getRowLabel(1); // "1 Row"
 * const label = getRowLabel(5); // "5 Rows"
 * ```
 */
export function getRowLabel(rowCount: number): string {
	return `${rowCount} Row${rowCount !== 1 ? "s" : ""}`;
}

/**
 * Check if any rows in range match a predicate
 *
 * @param gridRef - Reference to AG Grid React component
 * @param startIndex - Starting row index (inclusive)
 * @param endIndex - Ending row index (inclusive)
 * @param predicate - Test function for each row
 * @returns True if any row matches the predicate
 *
 * @example
 * ```typescript
 * const hasInactive = hasRowsMatching(gridRef, 0, 5, row => row.ActiveInd === false);
 * ```
 */
export function hasRowsMatching<T>(
	gridRef: RefObject<AgGridReact<T>>,
	startIndex: number,
	endIndex: number,
	predicate: (row: T) => boolean,
): boolean {
	for (let i = startIndex; i <= endIndex; i++) {
		const data = getRowDataAtIndex(gridRef, i);
		if (data && predicate(data)) {
			return true;
		}
	}
	return false;
}
