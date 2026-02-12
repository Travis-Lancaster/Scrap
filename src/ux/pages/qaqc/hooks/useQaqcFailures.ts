/**
 * useQaqcFailures Hook
 *
 * Fetches active QAQC failures for failure log
 */

import { qaqcService } from "#src/services/qaqcService";
import { useEffect } from "react";
import { useQaqcStore } from "../store/qaqc-store";

interface UseQaqcFailuresOptions {
	enabled?: boolean
	refetchInterval?: number
}

/**
 * Hook to fetch active QAQC failures
 *
 * @param options - Additional options
 * @returns Failures from store
 */
export function useQaqcFailures(options: UseQaqcFailuresOptions = {}) {
	const { enabled = true, refetchInterval } = options;

	const filters = useQaqcStore(state => state.filters);
	const failures = useQaqcStore(state => state.failures);
	const loading = useQaqcStore(state => state.failuresLoading);
	const error = useQaqcStore(state => state.failuresError);

	const setFailures = useQaqcStore(state => state.setFailures);
	const setFailuresLoading = useQaqcStore(state => state.setFailuresLoading);
	const setFailuresError = useQaqcStore(state => state.setFailuresError);

	const fetchFailures = async () => {
		if (!enabled) {
			return;
		}

		setFailuresLoading(true);
		setFailuresError(null);

		try {
			const element = filters.elements.length === 1 ? filters.elements[0] : undefined;
			const labCode = filters.labCodes.length === 1 ? filters.labCodes[0] : undefined;

			const data = await qaqcService.getActiveFailures(element, labCode);
			setFailures(data);
		}
		catch (err) {
			const error = err instanceof Error ? err : new Error("Failed to fetch failures");
			setFailuresError(error);
			console.error("[useQaqcFailures] Error fetching failures:", error);
		}
		finally {
			setFailuresLoading(false);
		}
	};

	// Fetch when filters change
	useEffect(() => {
		fetchFailures();
	}, [filters.elements, filters.labCodes, enabled]);

	// Optional refetch interval
	useEffect(() => {
		if (!refetchInterval || !enabled) {
			return;
		}

		const interval = setInterval(fetchFailures, refetchInterval);
		return () => clearInterval(interval);
	}, [filters.elements, filters.labCodes, enabled, refetchInterval]);

	return {
		failures,
		loading,
		error,
		refetch: fetchFailures,
	};
}
