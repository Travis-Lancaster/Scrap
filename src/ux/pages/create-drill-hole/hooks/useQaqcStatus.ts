/**
 * useQaqcStatus Hook
 *
 * Fetches and manages QAQC status for a drill hole
 * Used for traffic light display in drill hole view
 */

import type { QaqcHoleStatus } from "#src/types/qaqc";
import { qaqcService } from "#src/services/qaqcService";
import { useEffect, useState } from "react";

interface UseQaqcStatusOptions {
	enabled?: boolean
	refetchInterval?: number
}

interface UseQaqcStatusReturn {
	status: QaqcHoleStatus | null
	loading: boolean
	error: Error | null
	refetch: () => Promise<void>
}

/**
 * Hook to fetch QAQC status for a drill hole
 *
 * @param collarId - Collar ID to fetch status for
 * @param element - Element to check (e.g., 'Au', 'Ag')
 * @param options - Additional options
 * @returns Status data, loading state, error, and refetch function
 */
export function useQaqcStatus(
	collarId: string | undefined,
	element: string,
	options: UseQaqcStatusOptions = {},
): UseQaqcStatusReturn {
	const { enabled = true, refetchInterval } = options;

	const [status, setStatus] = useState<QaqcHoleStatus | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchStatus = async () => {
		if (!collarId || !enabled) {
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const data = await qaqcService.getHoleStatus({
				collarId,
				element,
			});

			setStatus(data);
		}
		catch (err) {
			const error = err instanceof Error ? err : new Error("Failed to fetch QAQC status");
			setError(error);
			console.error("[useQaqcStatus] Error fetching status:", error);
		}
		finally {
			setLoading(false);
		}
	};

	// Initial fetch
	useEffect(() => {
		fetchStatus();
	}, [collarId, element, enabled]);

	// Optional refetch interval
	useEffect(() => {
		if (!refetchInterval || !enabled) {
			return;
		}

		const interval = setInterval(fetchStatus, refetchInterval);
		return () => clearInterval(interval);
	}, [collarId, element, enabled, refetchInterval]);

	return {
		status,
		loading,
		error,
		refetch: fetchStatus,
	};
}
