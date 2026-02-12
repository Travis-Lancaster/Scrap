/**
 * useQaqcLookups Hook
 *
 * Provides dynamic lookup data for QAQC components
 * Loads elements and standards from configuration
 */

import { qaqcConfigService } from "#src/services/qaqcConfigService";
import { useEffect, useState } from "react";

export interface QaqcLookups {
	elements: Array<{ value: string, label: string }>
	standards: Array<{ value: string, label: string, type: string }>
	loading: boolean
	error: Error | null
}

/**
 * Hook to load and cache QAQC lookup data
 * @param options.autoLoad - Whether to load data automatically on mount (default: true)
 */
export function useQaqcLookups(options: { autoLoad?: boolean } = {}): QaqcLookups & { refetch: () => Promise<void> } {
	const { autoLoad = true } = options;

	const [lookups, setLookups] = useState<QaqcLookups>({
		elements: [],
		standards: [],
		loading: false,
		error: null,
	});

	const loadLookups = async () => {
		setLookups(prev => ({ ...prev, loading: true, error: null }));

		try {
			// Load standards to get available elements and standards
			const standardsResponse = await qaqcConfigService.getStandards();

			// Extract unique elements from standards values
			const elementSet = new Set<string>();
			standardsResponse.forEach((std) => {
				// Note: We need to fetch individual standard details to get elements
				// For now, using common elements as placeholder
			});

			// Common elements (could be loaded from a lookup service)
			const elements = [
				{ value: "Au", label: "Gold (Au)" },
				{ value: "Ag", label: "Silver (Ag)" },
				{ value: "Cu", label: "Copper (Cu)" },
				{ value: "Pb", label: "Lead (Pb)" },
				{ value: "Zn", label: "Zinc (Zn)" },
				{ value: "Li", label: "Lithium (Li)" },
				{ value: "Fe", label: "Iron (Fe)" },
				{ value: "As", label: "Arsenic (As)" },
				{ value: "Sb", label: "Antimony (Sb)" },
				{ value: "Mo", label: "Molybdenum (Mo)" },
				{ value: "W", label: "Tungsten (W)" },
			];

			// Map standards for selection
			const standards = standardsResponse.map(std => ({
				value: std.StandardId,
				label: `${std.StandardId}${std.Supplier ? ` (${std.Supplier})` : ""}`,
				type: std.StandardType || "CRM",
			}));

			setLookups({
				elements,
				standards,
				loading: false,
				error: null,
			});
		}
		catch (error) {
			setLookups(prev => ({
				...prev,
				loading: false,
				error: error instanceof Error ? error : new Error("Failed to load lookups"),
			}));
		}
	};

	useEffect(() => {
		if (autoLoad) {
			loadLookups();
		}
	}, [autoLoad]);

	return {
		...lookups,
		refetch: loadLookups,
	};
}
