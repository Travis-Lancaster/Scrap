/**
 * useQaqcChartData Hook
 *
 * Fetches chart data for global QAQC dashboard
 */

import { qaqcService } from "#src/services/qaqcService";
import { useEffect } from "react";
import { useQaqcStore } from "../store/qaqc-store";

interface UseQaqcChartDataOptions {
	enabled?: boolean
	standardId?: string
}

/**
 * Hook to fetch QAQC chart data based on current filters
 *
 * @param options - Additional options
 * @returns Chart data from store
 */
export function useQaqcChartData(options: UseQaqcChartDataOptions = {}) {
	const { enabled = true, standardId } = options;

	const filters = useQaqcStore(state => state.filters);
	const chartData = useQaqcStore(state => state.chartData);
	const loading = useQaqcStore(state => state.chartLoading);
	const error = useQaqcStore(state => state.chartError);

	const setChartData = useQaqcStore(state => state.setChartData);
	const setChartLoading = useQaqcStore(state => state.setChartLoading);
	const setChartError = useQaqcStore(state => state.setChartError);

	const fetchChartData = async () => {
		if (!enabled || filters.elements.length === 0) {
			return;
		}

		setChartLoading(true);
		setChartError(null);

		try {
			// Fetch for first selected element (multi-element support can be added later)
			const element = filters.elements[0];
			const labCode = filters.labCodes.length === 1 ? filters.labCodes[0] : undefined;

			const data = await qaqcService.getChartData({
				startDate: filters.dateFrom,
				endDate: filters.dateTo,
				element,
				standardId,
				labCode,
			});

			setChartData(data);
		}
		catch (err) {
			const error = err instanceof Error ? err : new Error("Failed to fetch chart data");
			setChartError(error);
			console.error("[useQaqcChartData] Error fetching chart data:", error);
		}
		finally {
			setChartLoading(false);
		}
	};

	// Fetch when filters change
	useEffect(() => {
		fetchChartData();
	}, [
		filters.dateFrom,
		filters.dateTo,
		filters.elements,
		filters.labCodes,
		standardId,
		enabled,
	]);

	return {
		chartData,
		loading,
		error,
		refetch: fetchChartData,
	};
}
