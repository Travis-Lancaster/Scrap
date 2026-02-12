/**
 * Sample Operations Hook
 * 
 * Encapsulates grid operations for AllSamples section.
 * Handles complex sample workflows with modal dialogs.
 * 
 * @module drill-hole-data/hooks
 */

import { useCallback, useMemo } from "react";
import { message, Modal } from "antd";
import { useDrillHoleDataStore } from "../store";
import { SectionKey } from "../types/data-contracts";

/**
 * Sample Operations Hook
 * 
 * Provides grid operations for AllSamples section.
 * 
 * NOTE: AllSamples has complex workflows (modal dialogs, dispatch, lab results)
 * This hook provides the foundation - extend as needed.
 * 
 * @returns Sample operations and state
 */
export function useSampleOperations() {
	console.log(`[useSampleOperations] 🎣 Hook initialized`);

	// ========================================================================
	// Store Selectors
	// ========================================================================

	const section = useDrillHoleDataStore(state => state.sections.allSamples);
	const addRow = useDrillHoleDataStore(state => state.addRow);
	const updateRow = useDrillHoleDataStore(state => state.updateRow);
	const deleteRow = useDrillHoleDataStore(state => state.deleteRow);
	const saveSection = useDrillHoleDataStore(state => state.saveSection);
	const canEdit = useDrillHoleDataStore(state => state.canEdit(SectionKey.AllSamples));
	const openDrawer = useDrillHoleDataStore(state => state.openDrawer);

	// ========================================================================
	// Grid Data
	// ========================================================================

	const samples = useMemo(() => {
		// Filter out soft-deleted samples
		return section.data.filter((sample: any) => {
			const sampleId = sample.SampleId;
			const metadata = section.rowMetadata[sampleId];
			return !metadata?.isDeleted;
		});
	}, [section.data, section.rowMetadata]);

	console.log(`[useSampleOperations] Grid state:`, {
		sampleCount: samples.length,
		canEdit,
		isDirty: section.isDirty,
	});

	// ========================================================================
	// Sample Operations
	// ========================================================================

	/**
	 * Add new sample
	 * 
	 * TODO: Open modal dialog for sample creation with full workflow
	 */
	const handleAddSample = useCallback(() => {
		console.log(`[useSampleOperations] ➕ Adding new sample`);

		if (!canEdit) {
			message.warning("Cannot add sample - data is read-only");
			return;
		}

		// TODO: Open sample creation modal
		// For now, show placeholder message
		message.info("Sample creation modal - to be implemented");
	}, [canEdit]);

	/**
	 * Handle cell value changed
	 */
	const handleCellValueChanged = useCallback((params: any) => {
		const { data, colDef, newValue } = params;
		const sampleId = data.SampleId;
		const fieldName = colDef.field;

		console.log(`[useSampleOperations] 📝 Cell changed:`, {
			sampleId,
			field: fieldName,
			newValue,
		});

		if (!canEdit) {
			message.warning("Cannot edit - data is read-only");
			params.api.refreshCells({ force: true });
			return;
		}

		updateRow(SectionKey.AllSamples, sampleId, {
			[fieldName]: newValue,
		});
	}, [canEdit, updateRow]);

	/**
	 * Delete sample
	 */
	const handleDeleteSample = useCallback((sampleId: string) => {
		console.log(`[useSampleOperations] 🗑️ Deleting sample:`, sampleId);

		if (!canEdit) {
			message.warning("Cannot delete - data is read-only");
			return;
		}

		Modal.confirm({
			title: "Delete Sample",
			content: "Are you sure you want to delete this sample?",
			okText: "Delete",
			okType: "danger",
			cancelText: "Cancel",
			onOk: () => {
				deleteRow(SectionKey.AllSamples, sampleId);
				message.success("Sample deleted");
			},
		});
	}, [canEdit, deleteRow]);

	/**
	 * Edit sample in modal/drawer
	 */
	const handleEditSample = useCallback((sample: any) => {
		console.log(`[useSampleOperations] ✏️ Editing sample:`, sample.SampleId);
		openDrawer("allSamples", sample);
	}, [openDrawer]);

	/**
	 * Dispatch samples to lab
	 * 
	 * TODO: Implement dispatch workflow
	 */
	const handleDispatchSamples = useCallback((sampleIds: string[]) => {
		console.log(`[useSampleOperations] 📤 Dispatching samples:`, sampleIds);

		if (!canEdit) {
			message.warning("Cannot dispatch - data is read-only");
			return;
		}

		// TODO: Open dispatch modal
		message.info(`Dispatch ${sampleIds.length} sample(s) - to be implemented`);
	}, [canEdit]);

	/**
	 * Import lab results
	 * 
	 * TODO: Copy from visual-mapper/TemplateLibrary.tsx
	 */
	const handleImportLabResults = useCallback(() => {
		console.log(`[useSampleOperations] 📥 Importing lab results`);

		// TODO: Implement lab results import
		message.info("Lab results import - to be implemented");
	}, []);

	/**
	 * Save all changes
	 */
	const handleSaveAll = useCallback(async () => {
		console.log(`[useSampleOperations] 💾 Saving all changes`);

		try {
			const result = await saveSection(SectionKey.AllSamples);

			if (result.success) {
				message.success("Samples saved successfully");
			} else {
				message.error(result.message || "Save failed");
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Save failed";
			message.error(errorMessage);
			console.error(`[useSampleOperations] ❌ Save error:`, error);
		}
	}, [saveSection]);

	// ========================================================================
	// Return Hook API
	// ========================================================================

	return {
		// Data
		samples,
		sampleCount: samples.length,
		
		// State
		isReadOnly: !canEdit,
		isDirty: section.isDirty,
		hasUnsavedChanges: section.hasUnsavedChanges(),
		
		// Metadata
		rowMetadata: section.rowMetadata,
		
		// Basic Operations
		handleAddSample,
		handleCellValueChanged,
		handleDeleteSample,
		handleEditSample,
		handleSaveAll,
		
		// Sample-Specific Operations
		handleDispatchSamples,
		handleImportLabResults,
		
		// Validation
		validateRow: section.validateRow,
		validateAll: section.validateAll,
	};
}
