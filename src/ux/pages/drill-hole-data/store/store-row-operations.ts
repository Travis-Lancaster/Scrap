/**
 * Store Row Operations
 *
 * Row CRUD operations for array sections (grids).
 *
 * @module drill-hole-data/store
 */

import type { SectionKey } from "../types/data-contracts";
import { createRowMetadata } from "./section-factory";
// import { saveRowData } from "../services/drill-hole-data-service";
// import type { SectionKey } from "../types/data-contracts";
import { saveRowData } from "../services/drill-hole-data-service";

/**
 * Add row to array section
 *
 * @param set - Zustand set function
 * @param get - Zustand get function
 * @param sectionKey - Section identifier
 * @param row - Row data to add
 */
export function addRow(
	set: any,
	get: any,
	sectionKey: SectionKey,
	row: any,
): void {
	console.log(`[StoreRowOps] ➕ Adding row:`, {
		sectionKey,
		rowId: row.id || "unknown",
		timestamp: new Date().toISOString(),
	});

	set((state: any) => {
		const section = state.sections[sectionKey];
		if (section && Array.isArray(section.data)) {
			// Add row to data
			section.data.push(row);

			// Create metadata for new row
			const rowId = getRowId(row, sectionKey);
			if (rowId) {
				section.rowMetadata[rowId] = {
					...createRowMetadata(rowId, row.RowStatus || 0),
					isNew: true,
					isDirty: true,
				};
			}

			// Mark section as dirty
			section.isDirty = true;

			console.log(`[StoreRowOps] ✅ Row added:`, {
				sectionKey,
				rowId,
				totalRows: section.data.length,
			});
		}
	});
}

/**
 * Update row in array section
 *
 * @param set - Zustand set function
 * @param get - Zustand get function
 * @param sectionKey - Section identifier
 * @param rowId - Row identifier
 * @param partialData - Partial row data to update
 */
export function updateRow(
	set: any,
	get: any,
	sectionKey: SectionKey,
	rowId: string,
	partialData: any,
): void {
	console.log(`[StoreRowOps] 📝 Updating row:`, {
		sectionKey,
		rowId,
		fields: Object.keys(partialData),
		timestamp: new Date().toISOString(),
	});

	set((state: any) => {
		const section = state.sections[sectionKey];
		if (section && Array.isArray(section.data)) {
			const idField = getRowIdField(sectionKey);
			const index = section.data.findIndex((r: any) => String(r[idField]) === rowId);

			if (index >= 0) {
				// Update row data
				section.data[index] = {
					...section.data[index],
					...partialData,
				};

				// Update metadata
				if (section.rowMetadata[rowId]) {
					section.rowMetadata[rowId].isDirty = true;
					section.rowMetadata[rowId].validationStatus = "NotValidated";
				}

				// Mark section as dirty
				section.isDirty = true;

				console.log(`[StoreRowOps] ✅ Row updated:`, {
					sectionKey,
					rowId,
					isDirty: section.rowMetadata[rowId]?.isDirty,
				});
			} else {
				console.warn(`[StoreRowOps] ⚠️ Row not found:`, { sectionKey, rowId });
			}
		}
	});
}

/**
 * Delete row from array section (soft delete)
 *
 * @param set - Zustand set function
 * @param get - Zustand get function
 * @param sectionKey - Section identifier
 * @param rowId - Row identifier
 */
export function deleteRow(
	set: any,
	get: any,
	sectionKey: SectionKey,
	rowId: string,
): void {
	console.log(`[StoreRowOps] 🗑️ Deleting row:`, {
		sectionKey,
		rowId,
		timestamp: new Date().toISOString(),
	});

	set((state: any) => {
		const section = state.sections[sectionKey];
		if (section && Array.isArray(section.data)) {
			const idField = getRowIdField(sectionKey);
			const index = section.data.findIndex((r: any) => String(r[idField]) === rowId);

			if (index >= 0) {
				// Soft delete: mark as deleted in metadata
				if (section.rowMetadata[rowId]) {
					section.rowMetadata[rowId].isDeleted = true;
					section.rowMetadata[rowId].isDirty = true;
				}

				// Optionally set ActiveInd = false
				if (section.data[index].ActiveInd !== undefined) {
					section.data[index].ActiveInd = false;
				}

				// Mark section as dirty
				section.isDirty = true;

				console.log(`[StoreRowOps] ✅ Row deleted (soft):`, {
					sectionKey,
					rowId,
				});
			} else {
				console.warn(`[StoreRowOps] ⚠️ Row not found:`, { sectionKey, rowId });
			}
		}
	});
}

/**
 * Save specific row
 *
 * @param get - Zustand get function
 * @param sectionKey - Section identifier
 * @param rowId - Row identifier
 */
export async function saveRow(
	get: any,
	sectionKey: SectionKey,
	rowId: string,
): Promise<boolean> {
	console.log(`[StoreRowOps] 💾 Saving row:`, {
		sectionKey,
		rowId,
		timestamp: new Date().toISOString(),
	});

	try {
		const state = get();
		const section = state.sections[sectionKey];
		const drillPlanId = state.drillPlanId;

		if (!drillPlanId || !section) {
			return false;
		}

		// Find row
		const idField = getRowIdField(sectionKey);
		const row = section.data.find((r: any) => String(r[idField]) === rowId);

		if (!row) {
			console.warn(`[StoreRowOps] ⚠️ Row not found:`, { sectionKey, rowId });
			return false;
		}

		// Validate row
		const validation = section.validateRow(rowId);

		if (!validation.canSave) {
			console.error(`[StoreRowOps] ❌ Row validation failed:`, {
				sectionKey,
				rowId,
				errors: validation.database.errors,
			});
			return false;
		}

		// Save via service
		const result = await saveRowData(drillPlanId, sectionKey, rowId, row);

		if (result.success) {
			// Update metadata
			if (section.rowMetadata[rowId]) {
				section.rowMetadata[rowId].isDirty = false;
				section.rowMetadata[rowId].isNew = false;
			}

			console.log(`[StoreRowOps] ✅ Row saved successfully:`, { sectionKey, rowId });
			return true;
		}

		return false;
	} catch (error) {
		console.error(`[StoreRowOps] ❌ Save row failed:`, {
			sectionKey,
			rowId,
			error,
		});
		return false;
	}
}

/**
 * Get row ID field name for section
 */
function getRowIdField(sectionKey: SectionKey): string {
	const fieldMap: Record<string, string> = {
		geologyCombinedLog: "GeologyCombinedLogId",
		shearLog: "ShearLogId",
		structureLog: "StructureLogId",
		allSamples: "SampleId",
		// ... add more as needed
	};

	return fieldMap[sectionKey] || "Id";
}

/**
 * Get row ID from row data
 */
function getRowId(row: any, sectionKey: SectionKey): string | null {
	const idField = getRowIdField(sectionKey);
	return row[idField] || null;
}
