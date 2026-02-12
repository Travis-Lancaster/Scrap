/**
 * QAQC Dashboard Store
 *
 * Zustand store for global QAQC dashboard state management
 */

import type { QaqcChartData, QaqcFailure, QaqcFilters, QaqcFilterSet } from "#src/types/qaqc";
import { create } from "zustand";

interface QaqcStore {
	// Filter State
	filters: QaqcFilters
	activeFilterSetId: string | null
	filterSets: QaqcFilterSet[]

	// Chart Data Cache
	chartData: QaqcChartData | null
	chartLoading: boolean
	chartError: Error | null

	// Failure Log
	failures: QaqcFailure[]
	failuresLoading: boolean
	failuresError: Error | null

	// Actions - Filters
	setFilters: (filters: Partial<QaqcFilters>) => void
	resetFilters: () => void
	setActiveFilterSet: (id: string | null) => void
	setFilterSets: (sets: QaqcFilterSet[]) => void
	addFilterSet: (set: QaqcFilterSet) => void
	removeFilterSet: (id: string) => void

	// Actions - Chart Data
	setChartData: (data: QaqcChartData | null) => void
	setChartLoading: (loading: boolean) => void
	setChartError: (error: Error | null) => void

	// Actions - Failures
	setFailures: (failures: QaqcFailure[]) => void
	setFailuresLoading: (loading: boolean) => void
	setFailuresError: (error: Error | null) => void
}

// Default filters
const defaultFilters: QaqcFilters = {
	dateFrom: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 90 days ago
	dateTo: new Date().toISOString().split("T")[0], // Today
	elements: ["Au"],
	labCodes: [],
	qcTypes: ["STD", "BLK", "FDUP", "PREPDUP"],
	standardIds: [],
};

export const useQaqcStore = create<QaqcStore>(set => ({
	// Initial State
	filters: defaultFilters,
	activeFilterSetId: null,
	filterSets: [],

	chartData: null,
	chartLoading: false,
	chartError: null,

	failures: [],
	failuresLoading: false,
	failuresError: null,

	// Filter Actions
	setFilters: newFilters => set(state => ({
		filters: { ...state.filters, ...newFilters },
	})),

	resetFilters: () => set({
		filters: defaultFilters,
		activeFilterSetId: null,
	}),

	setActiveFilterSet: id => set({ activeFilterSetId: id }),

	setFilterSets: sets => set({ filterSets: sets }),

	addFilterSet: set_ => set(state => ({
		filterSets: [...state.filterSets, set_],
	})),

	removeFilterSet: id => set(state => ({
		filterSets: state.filterSets.filter(set_ => set_.id !== id),
		activeFilterSetId: state.activeFilterSetId === id ? null : state.activeFilterSetId,
	})),

	// Chart Data Actions
	setChartData: data => set({ chartData: data }),
	setChartLoading: loading => set({ chartLoading: loading }),
	setChartError: error => set({ chartError: error }),

	// Failures Actions
	setFailures: failures => set({ failures }),
	setFailuresLoading: loading => set({ failuresLoading: loading }),
	setFailuresError: error => set({ failuresError: error }),
}));
