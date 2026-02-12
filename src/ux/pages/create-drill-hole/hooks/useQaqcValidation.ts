/**
 * useQaqcValidation Hook
 *
 * Fetches detailed QAQC validation data for a drill hole
 * Used for batch validation drawer
 */

import type { QaqcHoleValidation } from "#src/types/qaqc";
import { qaqcService } from "#src/services/qaqcService";
import { useEffect, useState } from "react";

interface UseQaqcValidationOptions {
	dateFrom?: string
	dateTo?: string
	enabled?: boolean
}

interface UseQaqcValidationReturn {
	validation: QaqcHoleValidation | null
	loading: boolean
	error: Error | null
	refetch: () => Promise<void>
}

/**
 * Hook to fetch detailed QAQC validation for a drill hole
 *
 * @param collarId - Collar ID to fetch validation for
 * @param element - Element to check (e.g., 'Au', 'Ag')
 * @param options - Additional options including date range
 * @returns Validation data, loading state, error, and refetch function
 */
export function useQaqcValidation(
	collarId: string | undefined,
	element: string,
	options: UseQaqcValidationOptions = {},
): UseQaqcValidationReturn {
	const { dateFrom, dateTo, enabled = true } = options;

	const [validation, setValidation] = useState<QaqcHoleValidation | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchValidation = async () => {
		if (!collarId || !enabled) {
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const data = await qaqcService.getHoleValidation({
				collarId,
				element,
				dateFrom,
				dateTo,
			});

			setValidation(data);
		}
		catch (err) {
			const error = err instanceof Error ? err : new Error("Failed to fetch QAQC validation");
			setError(error);
			console.error("[useQaqcValidation] Error fetching validation:", error);
		}
		finally {
			setLoading(false);
		}
	};

	// Fetch when dependencies change
	useEffect(() => {
		fetchValidation();
	}, [collarId, element, dateFrom, dateTo, enabled]);

	return {
		validation,
		loading,
		error,
		refetch: fetchValidation,
	};
}
