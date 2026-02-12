/**
 * Geotech Grid Operations Hook (Generic)
 * 
 * Generic hook for all Geotech grid sections.
 * Provides common grid operations for CoreRecovery, FractureCount, MagSus, etc.
 * 
 * @module drill-hole-data/hooks
 */

import { useCallback, useMemo } from "react";
import { message, Modal } from "antd";
import { useDrillHoleDataStore } from "../store";
import type { SectionKey } from "../types/data-contracts";

/**
 * Generic Geotech Grid Operations Hook
 * 
 * Works with any Geotech section (CoreRecoveryRun, FractureCount, MagSus, etc.)
 * 
 * @param sectionKey - Section identifier
 * @param idField - Name of ID field (e.g., "CoreRecoveryRunLogId")
 * @returns Grid operations and state
 * 
 * @example
 * const {
 *   rows,
 *   isReadOnly,
 *   handleAddRow,
 *   handleCellValueChanged,
 *   handleDeleteRow,
 * } = useGeotechGridOperations(SectionKey.CoreRecoveryRunLog, "CoreRecoveryRunLogId");
 */
export function useGeotechGridOperations(sectionKey: SectionKey, idField: string) {
	console.log(`[useGeotechGridOperations] 🎣 Hook initialized for:`, sectionKey);

	// ========================================================================
	// Store Selectors
	// ========================================================================

	const section = useDrillHoleDataStore(state => state.sections[sectionKey]);
	const addRow = useDrillHoleDataStore(state => state.addRow);
	const updateRow = useDrillHoleDataStore(state => state.updateRow);
	const deleteRow = useDrillHoleDataStore(state => state.deleteRow);
	const saveSection = useDrillHoleDataStore(state => state.saveSection);
	const canEdit = useDrillHoleDataStore(state => state.canEdit(sectionKey));
	const openDrawer = useDrillHoleDataStore(state => state.openDrawer);

	// ========================================================================
	// Grid Data
	// ========================================================================

	const rows = useMemo(() => {
		// Filter out soft-deleted rows
		return section.data.filter((row: any) => {
			const rowId = row[idField];
			const metadata = section.rowMetadata[rowId];
			return !metadata?.isDeleted;
		});
	}, [section.data, section.rowMetadata, idField]);

	console.log(`[useGeotechGridOperations] Grid state for ${sectionKey}:`, {
		rowCount: rows.length,
		canEdit,
		isDirty: section.isDirty,
	});

	// ========================================================================
	// Row Operations
	// ========================================================================

	/**
	 * Add new row
	 */
	const handleAddRow = useCallback(() => {
		console.log(`[useGeotechGridOperations] ➕ Adding new row to:`, sectionKey);

		if (!canEdit) {
			message.warning("Cannot add row - data is read-only");
			return;
		}

		// Create new row with minimal defaults
		const newRow: any = {
			[idField]: crypto.randomUUID(),
			CollarId: "", // Will be set by parent
			Organization: "",
			DataSource: "WEB",
			LoggedDt: new Date().toISOString(),
			DepthFrom: rows.length > 0 ? rows[rows.length - 1].DepthTo || 0 : 0,
			DepthTo: rows.length > 0 ? rows[rows.length - 1].DepthTo || 0 : 0,
			RowStatus: 0,
			ActiveInd: true,
		};

		addRow(sectionKey, newRow);
		message.success("New row added");
	}, [canEdit, rows, addRow, sectionKey, idField]);

	/**
	 * Handle cell value changed
	 */
	const handleCellValueChanged = useCallback((params: any) => {
		const { data, colDef, newValue } = params;
		const rowId = data[idField];
		const fieldName = colDef.field;

		console.log(`[useGeotechGridOperations] 📝 Cell changed in ${sectionKey}:`, {
			rowId,
			field: fieldName,
			newValue,
		});

		if (!canEdit) {
			message.warning("Cannot edit - data is read-only");
			params.api.refreshCells({ force: true });
			return;
		}

		updateRow(sectionKey, rowId, {
			[fieldName]: newValue,
		});
	}, [canEdit, updateRow, sectionKey, idField]);

	/**
	 * Delete row
	 */
	const handleDeleteRow = useCallback((rowId: string) => {
		console.log(`[useGeotechGridOperations] 🗑️ Deleting row from ${sectionKey}:`, rowId);

		if (!canEdit) {
			message.warning("Cannot delete - data is read-only");
			return;
		}

		Modal.confirm({
			title: "Delete Row",
			content: "Are you sure you want to delete this row?",
			okText: "Delete",
			okType: "danger",
			cancelText: "Cancel",
			onOk: () => {
				deleteRow(sectionKey, rowId);
				message.success("Row deleted");
			},
		});
	}, [canEdit, deleteRow, sectionKey]);

	/**
	 * Edit row in drawer
	 */
	const handleEditRow = useCallback((row: any) => {
		console.log(`[useGeotechGridOperations] ✏️ Editing row from ${sectionKey}:`, row[idField]);
		openDrawer(sectionKey, row);
	}, [openDrawer, sectionKey, idField]);

	/**
	 * Save all changes
	 */
	const handleSaveAll = useCallback(async () => {
		console.log(`[useGeotechGridOperations] 💾 Saving all changes for:`, sectionKey);

		try {
			const result = await saveSection(sectionKey);

			if (result.success) {
				message.success(`${sectionKey} saved successfully`);
			} else {
				message.error(result.message || "Save failed");
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Save failed";
			message.error(errorMessage);
			console.error(`[useGeotechGridOperations] ❌ Save error:`, error);
		}
	}, [sectionKey, saveSection]);

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
		handleAddRow,
		handleCellValueChanged,
		handleDeleteRow,
		handleEditRow,
		handleSaveAll,
		
		// Validation
		validateRow: section.validateRow,
		validateAll: section.validateAll,
	};
}
