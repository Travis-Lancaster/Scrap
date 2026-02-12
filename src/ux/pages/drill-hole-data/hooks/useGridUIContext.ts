import { useCallback, useMemo } from "react";

import type { DrillHoleDataUIState } from "../store/drill-hole-data-store";
import type { TabKey } from "../types/data-contracts";
import { useDrillHoleDataStore } from "../store";

export function useGridUIContext(tab: TabKey, lens?: string) {
	const contextKey = useDrillHoleDataStore(state => state.getViewContextKey(tab, lens));
	const uiState = useDrillHoleDataStore(state => state.uiByContext[contextKey]);
	const setUIState = useDrillHoleDataStore(state => state.setUIState);
	const resetUIState = useDrillHoleDataStore(state => state.resetUIState);

	const resolvedUIState = useMemo<DrillHoleDataUIState>(() => (
		uiState || {
			currentPage: 1,
			pageSize: 100,
			searchQuery: "",
			filters: {},
			sortBy: null,
			sortOrder: null,
			selectedRows: [],
			columnVisibility: {},
			columnWidths: {},
		}
	), [uiState]);

	const updateUIState = useCallback((partial: Partial<DrillHoleDataUIState>) => {
		setUIState(contextKey, partial);
	}, [contextKey, setUIState]);

	const clearUIState = useCallback(() => {
		resetUIState(contextKey);
	}, [contextKey, resetUIState]);

	return {
		contextKey,
		uiState: resolvedUIState,
		updateUIState,
		clearUIState,
	};
}
