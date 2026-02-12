/**
 * AG Grid Context Menu Factory
 *
 * Centralized context menu logic for drill hole grids.
 * Provides consistent menu options across all sections.
 *
 * Features:
 * - Insert row above/below
 * - Delete selected rows or single row
 * - Multi-cell selection and delete
 * - Extensible with custom menu items
 * - Automatically respects read-only state
 *
 * @example
 * ```typescript
 * const contextMenu = createContextMenu<DrillMethodData>(
 *   {
 *     allowInsert: !isReadOnly,
 *     allowDelete: !isReadOnly,
 *   },
 *   {
 *     onInsertRow: handleInsertRowAt,
 *     onDeleteRows: handleDeleteRows,
 *   }
 * );
 *
 * <AgGridReact
 *   getContextMenuItems={contextMenu}
 *   ...
 * />
 * ```
 */

import type { DefaultMenuItem, GetContextMenuItemsParams, MenuItemDef } from "ag-grid-enterprise";

import type { ContextMenuConfig } from "./grid-context-menu";

export interface ContextMenuSampleConfig {
	/**
	 * Enable insert row above/below options
	 * @default true
	 */
	allowInsert?: boolean

	/**
	 * Enable delete rows option
	 * @default true
	 */
	allowDelete?: boolean

	/**
	 * Enable multi-cell selection and delete
	 * @default false
	 */
	allowMultiCellDelete?: boolean

	/**
	 * Custom menu items to append
	 * Function receives params and returns array of menu items
	 */
	customItems?: <T>(params: GetContextMenuItemsParams<T>) => (MenuItemDef | string)[]

	/**
	 * Insert menu items before default items
	 * @default false
	 */
	customItemsFirst?: boolean
}

export interface ContextMenuHandlers {
	/**
	 * Handler for inserting a row at specific index
	 * @param index - Index where row should be inserted
	 */
	onInsertRow?: (index: number) => void

	/**
	 * Handler for deleting selected rows
	 */
	onDeleteRows?: () => void

	/**
	 * Handler for deleting multi-cell selection range
	 */
	onDeleteCellRange?: () => void
}

/**
 * Create a context menu function for AG Grid
 *
 * @param config - Configuration for menu options
 * @param handlers - Event handlers for menu actions
 * @returns Context menu function for AG Grid
 */
export function createContextMenu<T>(
	config: ContextMenuConfig = {},
	handlers: ContextMenuHandlers = {},
): (params: GetContextMenuItemsParams<T>) => (DefaultMenuItem | MenuItemDef)[] {
	const {
		allowInsert = true,
		allowDelete = true,
		allowMultiCellDelete = false,
		customItems,
		customItemsFirst = false,
	} = config;

	const { onInsertRow, onDeleteRows, onDeleteCellRange } = handlers;

	return (params: GetContextMenuItemsParams<T>) => {
		const menuItems: (DefaultMenuItem | MenuItemDef | string)[] = [];
		const rowIndex = params.node?.rowIndex ?? 0;

		// Get number of selected rows from grid API
		const selectedRowCount = params.api?.getSelectedRows?.()?.length || 0;

		// Custom items first if requested
		if (customItemsFirst && customItems) {
			const custom = customItems(params);
			if (custom.length > 0) {
				menuItems.push(...custom, "separator");
			}
		}

		// Insert row options
		if (allowInsert && onInsertRow) {
			menuItems.push(
				{
					name: "Insert Row Above",
					action: () => onInsertRow(rowIndex),
					icon: "<span class=\"ag-icon ag-icon-plus\"></span>",
					disabled: !params.node,
				},
				{
					name: "Insert Row Below",
					action: () => onInsertRow(rowIndex + 1),
					icon: "<span class=\"ag-icon ag-icon-plus\"></span>",
					disabled: !params.node,
				},
			);
		}

		// Add separator if we have insert options
		if (allowInsert && onInsertRow) {
			menuItems.push("separator");
		}

		// Delete options
		if (allowDelete && onDeleteRows) {
			// Multiple rows selected
			if (selectedRowCount > 1) {
				menuItems.push({
					name: `Delete Selected Rows (${selectedRowCount})`,
					action: onDeleteRows,
					icon: "<span class=\"ag-icon ag-icon-cross\"></span>",
				});
			}
			// Single row (from context menu on a row)
			else if (params.node) {
				menuItems.push({
					name: "Delete This Row",
					action: onDeleteRows,
					icon: "<span class=\"ag-icon ag-icon-cross\"></span>",
				});
			}
		}

		// Multi-cell delete option
		if (allowMultiCellDelete && onDeleteCellRange) {
			const cellRanges = params.api?.getCellRanges?.();
			if (cellRanges && cellRanges.length > 0) {
				menuItems.push({
					name: "Clear Selected Cells",
					action: onDeleteCellRange,
					icon: "<span class=\"ag-icon ag-icon-cancel\"></span>",
				});
			}
		}

		// Add separator before default items if we added custom items
		if (menuItems.length > 0) {
			menuItems.push("separator");
		}

		// Custom items last if not first
		if (!customItemsFirst && customItems) {
			const custom = customItems(params);
			if (custom.length > 0) {
				menuItems.push("separator", ...custom);
			}
		}

		// Include default AG Grid menu items (copy, paste, export, etc.)
		if (params.defaultItems) {
			menuItems.push(...params.defaultItems);
		}

		return menuItems as (DefaultMenuItem | MenuItemDef)[];
	};
}

/**
 * Create a simple context menu with only default items and custom additions
 *
 * @param customItems - Custom menu items to add
 * @returns Context menu function
 */
export function createSimpleContextMenu<T>(
	customItems?: (params: GetContextMenuItemsParams<T>) => (MenuItemDef | string)[],
): (params: GetContextMenuItemsParams<T>) => (DefaultMenuItem | MenuItemDef)[] {
	return (params: GetContextMenuItemsParams<T>) => {
		const menuItems: (DefaultMenuItem | MenuItemDef | string)[] = [];

		// Add custom items
		if (customItems) {
			const custom = customItems(params);
			if (custom.length > 0) {
				menuItems.push(...custom, "separator");
			}
		}

		// Include default items
		if (params.defaultItems) {
			menuItems.push(...params.defaultItems);
		}

		return menuItems as (DefaultMenuItem | MenuItemDef)[];
	};
}

/**
 * Create a read-only context menu (only default items, no modifications)
 *
 * @returns Context menu function with default items only
 */
export function createReadOnlyContextMenu<T>(): (
	params: GetContextMenuItemsParams<T>,
) => (DefaultMenuItem | MenuItemDef)[] {
	return (params: GetContextMenuItemsParams<T>) => {
		return (params.defaultItems ?? []) as (DefaultMenuItem | MenuItemDef)[];
	};
}
