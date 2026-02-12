/**
 * useSelection Hook
 *
 * Manages multi-select state for data tables and lists
 *
 * @example
 * ```typescript
 * const {
 *   selectedIds,
 *   isSelected,
 *   select,
 *   deselect,
 *   toggle,
 *   selectAll,
 *   clearSelection,
 *   selectedCount
 * } = useSelection<string>();
 *
 * // Select an item
 * select(item.id);
 *
 * // Check if selected
 * if (isSelected(item.id)) { ... }
 *
 * // Select all
 * selectAll(items.map(i => i.id));
 * ```
 */

import { useCallback, useMemo, useState } from "react";

export interface UseSelectionOptions<T = string> {
	initialSelection?: T[]
	maxSelection?: number
}

export interface UseSelectionResult<T = string> {
	selectedIds: T[]
	selectedCount: number
	isSelected: (id: T) => boolean
	select: (id: T) => void
	deselect: (id: T) => void
	toggle: (id: T) => void
	selectAll: (ids: T[]) => void
	clearSelection: () => void
	selectMultiple: (ids: T[]) => void
	deselectMultiple: (ids: T[]) => void
	isAllSelected: (allIds: T[]) => boolean
	isSomeSelected: (allIds: T[]) => boolean
}

export function useSelection<T = string>(
	options: UseSelectionOptions<T> = {},
): UseSelectionResult<T> {
	const { initialSelection = [], maxSelection } = options;

	const [selectedIds, setSelectedIds] = useState<T[]>(initialSelection);

	const selectedCount = useMemo(() => selectedIds.length, [selectedIds]);

	const isSelected = useCallback(
		(id: T): boolean => {
			return selectedIds.includes(id);
		},
		[selectedIds],
	);

	const select = useCallback(
		(id: T) => {
			if (isSelected(id)) {
				return; // Already selected
			}

			if (maxSelection && selectedIds.length >= maxSelection) {
				console.warn("[FLOW:selection] [DECISION] Max selection reached", {
					max: maxSelection,
					current: selectedIds.length,
				});
				return;
			}

			console.log("[FLOW:selection] [ACTION] Item selected", {
				id,
				totalSelected: selectedIds.length + 1,
			});

			setSelectedIds(prev => [...prev, id]);
		},
		[selectedIds, isSelected, maxSelection],
	);

	const deselect = useCallback((id: T) => {
		console.log("[FLOW:selection] [ACTION] Item deselected", { id });
		setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
	}, []);

	const toggle = useCallback(
		(id: T) => {
			if (isSelected(id)) {
				deselect(id);
			}
			else {
				select(id);
			}
		},
		[isSelected, select, deselect],
	);

	const selectAll = useCallback(
		(ids: T[]) => {
			const idsToSelect = maxSelection ? ids.slice(0, maxSelection) : ids;

			console.log("[FLOW:selection] [ACTION] Select all", {
				totalItems: ids.length,
				selectedCount: idsToSelect.length,
				limited: !!maxSelection,
			});

			setSelectedIds(idsToSelect);
		},
		[maxSelection],
	);

	const clearSelection = useCallback(() => {
		console.log("[FLOW:selection] [ACTION] Clear selection", {
			previousCount: selectedIds.length,
		});
		setSelectedIds([]);
	}, [selectedIds.length]);

	const selectMultiple = useCallback(
		(ids: T[]) => {
			const newIds = ids.filter(id => !isSelected(id));

			if (maxSelection && selectedIds.length + newIds.length > maxSelection) {
				const remaining = maxSelection - selectedIds.length;
				console.warn("[FLOW:selection] [DECISION] Max selection would be exceeded", {
					max: maxSelection,
					current: selectedIds.length,
					attempting: newIds.length,
					allowed: remaining,
				});

				setSelectedIds(prev => [...prev, ...newIds.slice(0, remaining)]);
				return;
			}

			console.log("[FLOW:selection] [ACTION] Multiple items selected", {
				count: newIds.length,
				totalSelected: selectedIds.length + newIds.length,
			});

			setSelectedIds(prev => [...prev, ...newIds]);
		},
		[selectedIds, isSelected, maxSelection],
	);

	const deselectMultiple = useCallback((ids: T[]) => {
		console.log("[FLOW:selection] [ACTION] Multiple items deselected", {
			count: ids.length,
		});
		setSelectedIds(prev => prev.filter(id => !ids.includes(id)));
	}, []);

	const isAllSelected = useCallback(
		(allIds: T[]): boolean => {
			if (allIds.length === 0)
				return false;
			return allIds.every(id => isSelected(id));
		},
		[isSelected],
	);

	const isSomeSelected = useCallback(
		(allIds: T[]): boolean => {
			if (allIds.length === 0)
				return false;
			return allIds.some(id => isSelected(id)) && !isAllSelected(allIds);
		},
		[isSelected, isAllSelected],
	);

	return {
		selectedIds,
		selectedCount,
		isSelected,
		select,
		deselect,
		toggle,
		selectAll,
		clearSelection,
		selectMultiple,
		deselectMultiple,
		isAllSelected,
		isSomeSelected,
	};
}
