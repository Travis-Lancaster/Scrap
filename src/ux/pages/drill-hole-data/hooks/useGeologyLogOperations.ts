/**
 * Geology Log Operations Hook
 *
 * Encapsulates grid operations for GeologyCombinedLog section.
 * Provides row CRUD, validation, and action handlers.
 *
 * @module drill-hole-data/hooks
 */

import { Modal, message } from "antd";
import { useCallback, useMemo } from "react";

import type { GeologyCombinedLogData } from "../validation";
import { SectionKey } from "../types/data-contracts";
import { createEmptyGeologyCombinedLogData } from "../validation";
import { useDrillHoleDataStore } from "../store";

/**
 * Geology Log Operations Hook
 *
 * Provides grid operations for GeologyCombinedLog section.
 *
 * @returns Grid operations and state
 *
 * @example
 * const {
 *   rows,
 *   isReadOnly,
 *   handleAddInterval,
 *   handleCellValueChanged,
 *   handleDeleteRow,
 *   handleSaveAll,
 * } = useGeologyLogOperations();
 */
export function useGeologyLogOperations() {
	console.log(`[useGeologyLogOperations] 🎣 Hook initialized`);

	// ========================================================================
	// Store Selectors
	// ========================================================================

	const section = useDrillHoleDataStore(state => state.sections.geologyCombinedLog);
	const addRow = useDrillHoleDataStore(state => state.addRow);
	const updateRow = useDrillHoleDataStore(state => state.updateRow);
	const deleteRow = useDrillHoleDataStore(state => state.deleteRow);
	const saveSection = useDrillHoleDataStore(state => state.saveSection);
	const canEdit = useDrillHoleDataStore(state => state.canEdit(SectionKey.GeologyCombinedLog));
	const openDrawer = useDrillHoleDataStore(state => state.openDrawer);

	// ========================================================================
	// Grid Data
	// ========================================================================

	const rows = useMemo(() => {
		// Filter out soft-deleted rows
		return section.data.filter((row: any) => {
			const rowId = row.GeologyCombinedLogId;
			const metadata = section.rowMetadata[rowId];
			return !metadata?.isDeleted;
		});
	}, [section.data, section.rowMetadata]);

	console.log(`[useGeologyLogOperations] Grid state:`, {
		rowCount: rows.length,
		canEdit,
		isDirty: section.isDirty,
	});

	// ========================================================================
	// Row Operations
	// ========================================================================

	/**
	 * Add new interval
	 */
	const handleAddInterval = useCallback(() => {
		console.log(`[useGeologyLogOperations] ➕ Adding new interval`);

		if (!canEdit) {
			message.warning("Cannot add interval - data is read-only");
			return;
		}

		// Create new row with default values
		const newRow = createEmptyGeologyCombinedLogData();

		// Set DepthFrom to last row's DepthTo (if exists)
		if (rows.length > 0) {
			const lastRow = rows[rows.length - 1];
			newRow.DepthFrom = lastRow.DepthTo || 0;
			newRow.DepthTo = newRow.DepthFrom;
		}

		addRow(SectionKey.GeologyCombinedLog, newRow);
		message.success("New interval added");
	}, [canEdit, rows, addRow]);

	/**
	 * Handle cell value changed (AG Grid event)
	 */
	const handleCellValueChanged = useCallback((params: any) => {
		const { data, colDef, newValue } = params;
		const rowId = data.GeologyCombinedLogId;
		const fieldName = colDef.field;

		console.log(`[useGeologyLogOperations] 📝 Cell changed:`, {
			rowId,
			field: fieldName,
			newValue,
		});

		if (!canEdit) {
			message.warning("Cannot edit - data is read-only");
			params.api.refreshCells({ force: true }); // Revert change
			return;
		}

		// Update row in store
		updateRow(SectionKey.GeologyCombinedLog, rowId, {
			[fieldName]: newValue,
		});

		// Validate row
		const validation = section.validateRow(rowId);
		if (!validation.canSave) {
			console.warn(`[useGeologyLogOperations] ⚠️ Row validation failed:`, {
				rowId,
				errors: validation.database.errors,
			});

			// Highlight row with error (you can add custom styling)
			params.node.setDataValue("_hasError", true);
		}
	}, [canEdit, updateRow, section]);

	/**
	 * Delete row (soft delete)
	 */
	const handleDeleteRow = useCallback((rowId: string) => {
		console.log(`[useGeologyLogOperations] 🗑️ Deleting row:`, rowId);

		if (!canEdit) {
			message.warning("Cannot delete - data is read-only");
			return;
		}

		Modal.confirm({
			title: "Delete Interval",
			content: "Are you sure you want to delete this interval?",
			okText: "Delete",
			okType: "danger",
			cancelText: "Cancel",
			onOk: () => {
				deleteRow(SectionKey.GeologyCombinedLog, rowId);
				message.success("Interval deleted");
			},
		});
	}, [canEdit, deleteRow]);

	/**
	 * Open row in drawer for editing
	 */
	const handleEditRow = useCallback((row: GeologyCombinedLogData) => {
		console.log(`[useGeologyLogOperations] ✏️ Opening drawer for row:`, row.GeologyCombinedLogId);
		openDrawer("geologyCombinedLog", row);
	}, [openDrawer]);

	/**
	 * Handle "New Log" action
	 *
	 * Soft deletes all existing rows and creates a new logging event.
	 */
	const handleNewLog = useCallback(() => {
		console.log(`[useGeologyLogOperations] 📋 New Log action`);

		if (!canEdit) {
			message.warning("Cannot create new log - data is read-only");
			return;
		}

		Modal.confirm({
			title: "Create New Log",
			content: "This will soft-delete all current rows and start a new log. Please provide a reason for this logging event.",
			okText: "Create New Log",
			okType: "primary",
			cancelText: "Cancel",
			onOk: () => {
				// Soft delete all current rows
				rows.forEach((row: GeologyCombinedLogData) => {
					deleteRow(SectionKey.GeologyCombinedLog, row.GeologyCombinedLogId);
				});

				// Add first row of new log
				const newRow = createEmptyGeologyCombinedLogData();
				newRow.DepthFrom = 0;
				newRow.DepthTo = 0;
				addRow(SectionKey.GeologyCombinedLog, newRow);

				message.success("New log created");
			},
		});
	}, [canEdit, rows, deleteRow, addRow]);

	/**
	 * Save all changes
	 */
	const handleSaveAll = useCallback(async () => {
		console.log(`[useGeologyLogOperations] 💾 Saving all changes`);

		try {
			// Validate all rows first
			const validationResults = section.validateAll();
			const hasErrors = Object.values(validationResults).some((v: any) => !v.canSave);

			if (hasErrors) {
				message.error("Please fix validation errors before saving");
				return;
			}

			const result = await saveSection(SectionKey.GeologyCombinedLog);

			if (result.success) {
				message.success("Geology log saved successfully");
			} else {
				message.error(result.message || "Save failed");
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Save failed";
			message.error(errorMessage);
			console.error(`[useGeologyLogOperations] ❌ Save error:`, error);
		}
	}, [section, saveSection]);

// ========================================================================
// Return Hook API
// ========================================================================

return {
	// Data
	rows,
	rowCount: rows.length,

	// State
	isReadOnly: !canEdit,
	isDirty: section.isDirty,
	hasUnsavedChanges: section.hasUnsavedChanges(),

	// Metadata
	rowMetadata: section.rowMetadata,

	// Operations
	handleAddInterval,
	handleCellValueChanged,
	handleDeleteRow,
	handleEditRow,
	handleNewLog,
	handleSaveAll,

	// Validation
	validateRow: section.validateRow,
	validateAll: section.validateAll,
};
}
