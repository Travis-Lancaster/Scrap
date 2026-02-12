/**
 * useSurveyLogOperations Hook
 *
 * Encapsulates SurveyLog grid row operations following SRP.
 * Provides row manipulation functions for the SurveyLog grid.
 *
 * Pattern: Similar to useSampleRowOperations
 * - Insert rows at specific positions
 * - Delete rows (soft delete with ActiveInd=false)
 * - UnDelete rows (restore with ActiveInd=true)
 * - Select rows in range
 *
 * All operations mark rows as dirty for row-level sync tracking.
 */

import type { ArraySectionKey } from "#src/lib/db/dexie";
import type { SurveyLogData } from "../validation/survey-schemas";
import { SectionKey } from "#src/types/drillhole";
import { useCallback } from "react";
import { useCreateDrillHoleStore } from "../store/create-drillhole-store";
import { createEmptySurveyLogData } from "../validation/survey-schemas";

/**
 * Hook return interface
 */
export interface UseSurveyLogOperationsReturn {
	/**
	 * Insert a new SurveyLog row at the specified index
	 * @param index - Position to insert the new row
	 */
	insertRowAt: (index: number) => void

	/**
	 * Soft delete SurveyLog rows in the specified range
	 * Sets ActiveInd=false instead of removing rows
	 * @param startIndex - Starting index (inclusive)
	 * @param endIndex - Ending index (inclusive)
	 */
	deleteRows: (startIndex: number, endIndex: number) => void

	/**
	 * Restore soft-deleted SurveyLog rows in the specified range
	 * Sets ActiveInd=true
	 * @param startIndex - Starting index (inclusive)
	 * @param endIndex - Ending index (inclusive)
	 */
	unDeleteRows: (startIndex: number, endIndex: number) => void

	/**
	 * Select rows in the specified range (for multi-row operations)
	 * @param startIndex - Starting index (inclusive)
	 * @param endIndex - Ending index (inclusive)
	 */
	selectRowsInRange: (startIndex: number, endIndex: number) => void

	/**
	 * Get row data in the specified range
	 * @param startIndex - Starting index (inclusive)
	 * @param endIndex - Ending index (inclusive)
	 * @returns Array of SurveyLogData in the range
	 */
	getRowsInRange: (startIndex: number, endIndex: number) => SurveyLogData[]
}

/**
 * SurveyLog row operations hook
 * Provides row manipulation functions for the SurveyLog grid
 *
 * @returns SurveyLog row operation functions
 *
 * @example
 * ```typescript
 * const {
 *   insertRowAt,
 *   deleteRows,
 *   unDeleteRows,
 * } = useSurveyLogOperations();
 *
 * // In context menu handler
 * const handleInsertRow = (index: number) => {
 *   insertRowAt(index);
 * };
 * ```
 */
export function useSurveyLogOperations(): UseSurveyLogOperationsReturn {
	// ============================================================================
	// Store Integration
	// ============================================================================

	const section = useCreateDrillHoleStore(state => state.sections.survey);
	const updateSectionData = useCreateDrillHoleStore(state => state.updateSectionData);
	const markRowDirty = useCreateDrillHoleStore(state => state.markRowDirty);
	const drillHoleId = useCreateDrillHoleStore(state => state.drillHoleId);
	const organization = useCreateDrillHoleStore(state => state.Organization);

	// Extract Survey header and logs
	const surveyHeader = (section?.data as any)?.header;
	const surveyLogs = (section?.data as any)?.logs || [];

	// ============================================================================
	// Row Operations
	// ============================================================================

	/**
	 * Insert a new row at the specified index
	 */
	const insertRowAt = useCallback(
		(index: number) => {
			console.log(`➕ [useSurveyLogOperations] Inserting row at index ${index}`);

			// Calculate depth for new row
			// Use previous row's depth if available, otherwise use 0
			const prevRow = index > 0 ? surveyLogs[index - 1] : null;
			const newDepth = prevRow?.Depth ? prevRow.Depth + 1 : 0;

			// Create new row with survey header context
			const newRow = {
				...createEmptySurveyLogData(surveyHeader, newDepth),
				SurveyLogId: crypto.randomUUID(),
				SurveyId: surveyHeader?.SurveyId || "",
				CollarId: drillHoleId || "",
				Organization: organization || "",
				ActiveInd: true,
			} as SurveyLogData;

			// Insert row at specified position
			const updatedLogs = [...surveyLogs];
			updatedLogs.splice(index, 0, newRow);

			// Update section data
			updateSectionData(SectionKey.Survey, {
				header: surveyHeader,
				logs: updatedLogs,
			});

			// Mark new row as dirty for sync
			// NOTE: Use 'surveylog' (ArraySectionKey) for row-level tracking
			if (newRow.SurveyLogId) {
				markRowDirty("surveylog" as ArraySectionKey, newRow.SurveyLogId);
			}

			console.log("✅ [useSurveyLogOperations] Row inserted:", newRow);
		},
		[surveyHeader, surveyLogs, drillHoleId, organization, updateSectionData, markRowDirty],
	);

	/**
	 * Soft delete rows in the specified range
	 * Sets ActiveInd=false instead of removing rows
	 */
	const deleteRows = useCallback(
		async (startIndex: number, endIndex: number) => {
			console.log(
				`🗑️ [useSurveyLogOperations] Soft deleting rows ${startIndex} to ${endIndex}`,
			);

			// Validate range
			if (startIndex < 0 || endIndex >= surveyLogs.length || startIndex > endIndex) {
				console.warn("[useSurveyLogOperations] Invalid delete range");
				return;
			}

			// Update rows to set ActiveInd=false
			const updatedLogs = surveyLogs.map((row: SurveyLogData, idx: number) => {
				if (idx >= startIndex && idx <= endIndex) {
					// Mark rows as dirty for sync
					// NOTE: Use 'surveylog' (ArraySectionKey) for row-level tracking
					if (row.SurveyLogId) {
						markRowDirty("surveylog" as ArraySectionKey, row.SurveyLogId);
					}
					return {
						...row,
						ActiveInd: false,
						ModifiedOnDt: new Date().toISOString(),
					};
				}
				return row;
			});

			// Update section data
			updateSectionData(SectionKey.Survey, {
				header: surveyHeader,
				logs: updatedLogs,
			});

			console.log(`✅ [useSurveyLogOperations] Soft deleted ${endIndex - startIndex + 1} rows`);
		},
		[surveyHeader, surveyLogs, updateSectionData, markRowDirty],
	);

	/**
	 * Restore soft-deleted rows in the specified range
	 * Sets ActiveInd=true
	 */
	const unDeleteRows = useCallback(
		async (startIndex: number, endIndex: number) => {
			console.log(
				`♻️ [useSurveyLogOperations] Restoring rows ${startIndex} to ${endIndex}`,
			);

			// Validate range
			if (startIndex < 0 || endIndex >= surveyLogs.length || startIndex > endIndex) {
				console.warn("[useSurveyLogOperations] Invalid restore range");
				return;
			}

			// Update rows to set ActiveInd=true
			const updatedLogs = surveyLogs.map((row: SurveyLogData, idx: number) => {
				if (idx >= startIndex && idx <= endIndex && row.ActiveInd === false) {
					// Mark rows as dirty for sync
					// NOTE: Use 'surveylog' (ArraySectionKey) for row-level tracking
					if (row.SurveyLogId) {
						markRowDirty("surveylog" as ArraySectionKey, row.SurveyLogId);
					}
					return {
						...row,
						ActiveInd: true,
						ModifiedOnDt: new Date().toISOString(),
					};
				}
				return row;
			});

			// Update section data
			updateSectionData(SectionKey.Survey, {
				header: surveyHeader,
				logs: updatedLogs,
			});

			console.log(`✅ [useSurveyLogOperations] Restored ${endIndex - startIndex + 1} rows`);
		},
		[surveyHeader, surveyLogs, updateSectionData, markRowDirty],
	);

	/**
	 * Select rows in the specified range
	 * Note: Actual selection is handled by AG Grid, this is a helper for external use
	 */
	const selectRowsInRange = useCallback(
		(startIndex: number, endIndex: number) => {
			console.log(
				`🎯 [useSurveyLogOperations] Selecting rows ${startIndex} to ${endIndex}`,
			);
			// This is a placeholder - actual selection would be handled by AG Grid API
			// Implementation would be in the component using gridRef
		},
		[],
	);

	/**
	 * Get rows in the specified range
	 */
	const getRowsInRange = useCallback(
		(startIndex: number, endIndex: number): SurveyLogData[] => {
			console.log(
				`📊 [useSurveyLogOperations] Getting rows ${startIndex} to ${endIndex}`,
			);

			// Validate range
			if (startIndex < 0 || endIndex >= surveyLogs.length || startIndex > endIndex) {
				console.warn("[useSurveyLogOperations] Invalid range");
				return [];
			}

			return surveyLogs.slice(startIndex, endIndex + 1);
		},
		[surveyLogs],
	);

	// ============================================================================
	// Return Interface
	// ============================================================================

	return {
		insertRowAt,
		deleteRows,
		unDeleteRows,
		selectRowsInRange,
		getRowsInRange,
	};
}
