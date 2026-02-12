/**
 * Sample Generation Utilities
 *
 * Pure functions for generating sample intervals from depth ranges.
 * No side effects - easy to test and reuse.
 */

import type { SampleData, SampleGenerationOptions } from "../validation/sample-schemas";

/**
 * Generate sample intervals from 0 to totalDepth at specified intervals
 * Skips depths where regular samples already exist
 *
 * @param options - Sample generation configuration
 * @returns Array of newly generated samples (does not include existing samples)
 *
 * @example
 * ```typescript
 * const generated = generateSampleIntervals({
 *   totalDepth: 100,
 *   intervalSize: 1.0,
 *   existingSamples: existingRegularSamples,
 *   collarId: 'uuid-123',
 *   organization: 'ORG1',
 *   holeNm: 'DDH-001',
 *   project: 'PROJECT-A',
 * });
 * ```
 */
export function generateSampleIntervals(
	options: SampleGenerationOptions,
): SampleData[] {
	const {
		totalDepth,
		intervalSize,
		existingSamples,
		collarId,
		organization,
		holeNm,
		project,
	} = options;

	// Validate inputs
	if (totalDepth <= 0) {
		throw new Error("Total depth must be greater than 0");
	}
	if (intervalSize <= 0) {
		throw new Error("Interval size must be greater than 0");
	}

	const generatedSamples: SampleData[] = [];

	// Generate samples from 0 to totalDepth
	for (let depth = 0; depth < totalDepth; depth += intervalSize) {
		const fromDepth = Number(depth.toFixed(2));
		const toDepth = Number(Math.min(depth + intervalSize, totalDepth).toFixed(2));

		// Check if a sample already exists at this depth
		const existingSampleAtDepth = existingSamples.find(
			sample => sample.DepthFrom === fromDepth,
		);

		// Skip if sample already exists
		if (existingSampleAtDepth) {
			continue;
		}

		// Create new sample
		generatedSamples.push({
			SampleId: crypto.randomUUID(),
			SampleNm: "", // Will be assigned during renumbering
			CollarId: collarId,
			Organization: organization,
			DepthFrom: fromDepth,
			DepthTo: toDepth,
			IntervalLength: Number((toDepth - fromDepth).toFixed(2)),
			SampleType: undefined,
			SampledDt: undefined,
			SampledBy: undefined,
			OriginalSampleId: undefined,
			OriginalSampleNm: undefined,
			SourceTable: "Sample",
			SampleClassification: undefined, // Will be set to 'ORIG' by insertQaqcSamples
			StandardId: undefined,
			Comments: undefined,
			RowStatus: 0, // New record
			IsLab: false,
			ActiveInd: true,
			rv: "",
		} as SampleData);
	}

	console.log(`✨ [sample-generator] Generated ${generatedSamples.length} new sample intervals`);
	return generatedSamples;
}

/**
 * Filter regular samples (exclude QAQC samples)
 *
 * @param samples - All samples
 * @returns Only regular samples (non-QAQC)
 */
export function filterRegularSamples(samples: SampleData[]): SampleData[] {
	return samples.filter(
		sample =>
			!sample.SampleClassification
			|| !["BLK", "STD", "PREPDUP", "FDUP"].includes(sample.SampleClassification),
	);
}

/**
 * Filter QAQC samples
 *
 * @param samples - All samples
 * @returns Only QAQC samples (BLK, STD, PREPDUP, FDUP)
 */
export function filterQaqcSamples(samples: SampleData[]): SampleData[] {
	return samples.filter(
		sample =>
			sample.SampleClassification
			&& ["BLK", "STD", "PREPDUP", "FDUP"].includes(sample.SampleClassification),
	);
}

/**
 * Filter samples by RowStatus
 *
 * @param samples - All samples
 * @param status - RowStatus to filter by (-99 = new, 0 = draft, 1 = complete, etc.)
 * @returns Filtered samples
 */
export function filterByRowStatus(samples: SampleData[], status: number): SampleData[] {
	return samples.filter(sample => sample.RowStatus === status);
}

/**
 * Sort samples by depth (DepthFrom ascending)
 *
 * @param samples - Samples to sort
 * @returns Sorted samples (new array)
 */
export function sortByDepth(samples: SampleData[]): SampleData[] {
	return [...samples].sort((a, b) => {
		const depthA = a.DepthFrom ?? 0;
		const depthB = b.DepthFrom ?? 0;
		return depthA - depthB;
	});
}

/**
 * Validate sample depth intervals
 * Checks for overlaps and gaps
 *
 * @param samples - Samples to validate
 * @returns Validation result with any errors found
 */
export interface SampleValidationResult {
	isValid: boolean
	errors: string[]
	warnings: string[]
}

export function validateSampleIntervals(samples: SampleData[]): SampleValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];

	// Sort by depth for sequential checking
	const sorted = sortByDepth(samples);

	for (let i = 0; i < sorted.length; i++) {
		const current = sorted[i];

		// Check if DepthTo > DepthFrom
		if (current.DepthTo <= current.DepthFrom) {
			errors.push(
				`Sample ${current.SampleNm || current.SampleId}: DepthTo (${current.DepthTo}) must be greater than DepthFrom (${current.DepthFrom})`,
			);
		}

		// Check for overlaps with next sample
		if (i < sorted.length - 1) {
			const next = sorted[i + 1];

			// Overlapping depths
			if (current.DepthTo > next.DepthFrom) {
				errors.push(
					`Sample overlap: ${current.SampleNm || current.SampleId} (${current.DepthFrom}-${current.DepthTo}) overlaps with ${next.SampleNm || next.SampleId} (${next.DepthFrom}-${next.DepthTo})`,
				);
			}

			// Gap between samples (warning, not error)
			if (current.DepthTo < next.DepthFrom) {
				const gap = next.DepthFrom - current.DepthTo;
				if (gap > 0.01) { // Ignore tiny floating point differences
					warnings.push(
						`Gap of ${gap.toFixed(2)}m between samples: ${current.SampleNm || current.SampleId} ends at ${current.DepthTo}m and ${next.SampleNm || next.SampleId} starts at ${next.DepthFrom}m`,
					);
				}
			}
		}
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
}
