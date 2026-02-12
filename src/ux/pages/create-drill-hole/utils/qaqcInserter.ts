import type { QaqcInsertionRule, SampleData, StandardSequenceEntry } from "../validation/sample-schemas";
import { RowStatus } from "#src/types/drillhole.js";

import { StandardSequenceManager } from "./sampleIdGenerator";

/**
 * QAQC Sample Types
 */
export const QaqcSampleType = {
	BLK: "BLK",
	STD: "STD",
	PREPDUP: "PREPDUP",
	FDUP: "FDUP",
} as const;

export type QaqcSampleTypeKey = keyof typeof QaqcSampleType;

/**
 * QAQC Insertion Algorithm
 * Automatically inserts quality control samples at configured frequencies
 * Based on the CSV template patterns observed in B2Mali SampleTemplate_v6.csv
 */

export interface QaqcInsertionResult {
	samples: SampleData[]
	qaqcCount: {
		blanks: number
		standards: number
		duplicates: number
		total: number
		BLK: number
		STD: number
		PREPDUP: number
		FDUP: number
	}
}

/**
 * Insert QAQC samples into a list of regular samples
 * Algorithm:
 * 1. Sort samples by depth
 * 2. Track sample count for each QAQC type
 * 3. Insert QAQC samples at configured frequencies
 * 4. Position QAQC samples at depth + 0.01
 * 5. Link duplicates to parent samples
 */
export function insertQaqcSamples(
	regularSamples: SampleData[],
	rule: QaqcInsertionRule,
	holeId: string,
	project: string,
	startingSequence?: number,
	standardSequence?: StandardSequenceEntry[],
	existingQaqc?: SampleData[], // For frequency counting without including in result
): QaqcInsertionResult {
	// Initialize StandardSequenceManager if sequence provided (for StandardId rotation)
	const standardSequenceManager = standardSequence && standardSequence.length > 0
		? new StandardSequenceManager(standardSequence)
		: undefined;

	// Build a map of existing QAQC by depth and type for frequency counting
	const existingQaqcByDepth = new Map<string, Set<string>>();
	if (existingQaqc) {
		for (const qaqc of existingQaqc) {
			const depthKey = (qaqc.DepthFrom || 0).toFixed(2);
			if (!existingQaqcByDepth.has(depthKey)) {
				existingQaqcByDepth.set(depthKey, new Set());
			}
			if (qaqc.SampleClassification) {
				existingQaqcByDepth.get(depthKey)!.add(qaqc.SampleClassification);
			}
		}
	}

	// Sort samples by depth then sampleNm
	// const sortedSamples = [...regularSamples].sort((a, b) => (a.DepthFrom || infinity) - (b.DepthFrom || infinity));
	const sortedSamples = [...regularSamples].sort((a, b) => {
		// Handle null / undefined DepthFrom
		const depthA = a.DepthFrom ?? Number.POSITIVE_INFINITY;
		const depthB = b.DepthFrom ?? Number.POSITIVE_INFINITY;

		if (depthA !== depthB) {
			return depthA - depthB;
		}

		// Secondary sort by SampleNm
		return (a.SampleNm ?? "").localeCompare(b.SampleNm ?? "");
	});

	// Result array with mixed regular and QAQC samples
	const result: SampleData[] = [];

	// Track sample counts for frequency calculation
	let regularSampleCount = 0;
	const qaqcCount = {
		total: 0,
		BLK: 0,
		STD: 0,
		PREPDUP: 0,
		FDUP: 0,
	};

	// Track last insertion position for each QAQC type
	const lastInsertionAt = {
		BLK: 0,
		STD: 0,
		PREPDUP: 0,
		FDUP: 0,
	};

	// Process each regular sample
	for (const sample of sortedSamples) {
		// Add the regular sample
		sample.SampleClassification = sample.SampleClassification || "ORIG";
		// sample.ChkType = 'ORIG'; // Keep for backwards compatibility
		result.push(sample);
		regularSampleCount++;

		// Check if existing QAQC samples exist at this sample's depth + 0.01
		// QAQC samples are positioned at parent sample depth + 0.01
		const qaqcDepth = ((sample.DepthFrom || 0) + 0.01).toFixed(2);
		const qaqcTypesAtDepth = existingQaqcByDepth.get(qaqcDepth);

		// Reset frequency counters for each existing QAQC type found at this depth
		if (qaqcTypesAtDepth) {
			for (const qaqcType of qaqcTypesAtDepth) {
				if (qaqcType in lastInsertionAt) {
					lastInsertionAt[qaqcType as keyof typeof QaqcSampleType] = regularSampleCount;
				}
			}
		}

		// Determine which QAQC samples to insert after this sample
		const qaqcToInsert: QaqcSampleTypeKey[] = [];

		// Check Blank frequency
		if (rule.BlankFrequency && regularSampleCount - lastInsertionAt.BLK >= rule.BlankFrequency) {
			qaqcToInsert.push("BLK");
			lastInsertionAt.BLK = regularSampleCount;
		}

		// Check Standard frequency
		if (rule.StandardFrequency && regularSampleCount - lastInsertionAt.STD >= rule.StandardFrequency) {
			qaqcToInsert.push("STD");
			lastInsertionAt.STD = regularSampleCount;
		}

		// Check Prep Duplicate frequency
		if (rule.PrepDupFrequency && regularSampleCount - lastInsertionAt.PREPDUP >= rule.PrepDupFrequency) {
			qaqcToInsert.push("PREPDUP");
			lastInsertionAt.PREPDUP = regularSampleCount;
		}

		// Check Field Duplicate frequency
		if (rule.FDupFrequency && regularSampleCount - lastInsertionAt.FDUP >= rule.FDupFrequency) {
			qaqcToInsert.push("FDUP");
			lastInsertionAt.FDUP = regularSampleCount;
		}

		// Insert QAQC samples in order
		// Order: STD, BLK, FDUP, PREPDUP
		const insertionOrder: QaqcSampleTypeKey[] = ["STD", "BLK", "FDUP", "PREPDUP"];

		for (const qaqcType of insertionOrder) {
			if (qaqcToInsert.includes(qaqcType)) {
				const qaqcSample = createQaqcSample(
					sample,
					qaqcType,
					standardSequenceManager,
				);
				result.push(qaqcSample);
				qaqcCount[qaqcType]++;
				qaqcCount.total++;
			}
		}
	}

	const blanks = qaqcCount.BLK;
	const standards = qaqcCount.STD;
	const duplicates = qaqcCount.PREPDUP + qaqcCount.FDUP;

	return {
		samples: result,
		qaqcCount: {
			blanks,
			standards,
			duplicates,
			...qaqcCount,
		},
	};
}

/**
 * Create a QAQC sample based on the regular sample and type
 * SampleNm will be assigned later by renumberSamplesByDepth
 */
function createQaqcSample(
	parentSample: SampleData,
	qaqcType: QaqcSampleTypeKey,
	standardSequenceManager?: StandardSequenceManager,
): SampleData {
	// Base QAQC sample properties
	const baseSample: Partial<SampleData> = {
		SampleId: crypto.randomUUID(), // UUID for tracking
		SampleNm: "", // Will be assigned by renumberSamplesByDepth
		CollarId: parentSample.CollarId,
		Organization: parentSample.Organization,
		DepthFrom: (parentSample.DepthFrom || 0) + 0.01,
		DepthTo: undefined, // QAQC samples often don't have a DepthTo
		IntervalLength: undefined,
		RodNo: parentSample.RodNo,
		SampledBy: parentSample.SampledBy,
		SampleMethod: parentSample.SampleMethod,
		SampledDt: parentSample.SampledDt,
		Comments: parentSample.Comments,
		RowStatus: 0, // New record
		IsLab: false,
		// SampleRegisterRowStatus: -99,
	};

	// Type-specific properties
	switch (qaqcType) {
		case "BLK": // Blank
			return {
				...baseSample,
				SampleType: "Chips",
				StandardId: "BLANK",
				SampleWeight: 1.5,
				SampleClassification: "BLK",
				SourceTable: "StandardSample",
				ChkType: "BLK",
			} as SampleData;

		case "STD": // Standard
			// Use StandardSequenceManager if available, otherwise use empty string
			const standardId = standardSequenceManager?.getNext() || "";
			return {
				...baseSample,
				SampleType: "Pulp",
				SampleWeight: 0.06,
				StandardId: standardId,
				SampleClassification: "STD",
				SourceTable: "StandardSample",
				ChkType: "STD",
			} as SampleData;

		case "PREPDUP": // Prep Duplicate
			return {
				...baseSample,
				SampleType: parentSample.SampleType,
				OriginalSampleId: parentSample.SampleId, // Link to parent
				OriginalSampleNm: parentSample.SampleNm, // Link to parent
				SampleWeight: parentSample.SampleWeight,
				DepthTo: parentSample.DepthTo,
				SourceTable: "SampleQC",
				SampleClassification: "PREPDUP",
				ChkType: "PREPDUP",
				QCClassification: "PREPDUP",
			} as SampleData;

		case "FDUP": // Field Duplicate
			return {
				...baseSample,
				SampleType: parentSample.SampleType,
				OriginalSampleId: parentSample.SampleId, // Link to parent
				OriginalSampleNm: parentSample.SampleNm, // Link to parent
				SampleWeight: parentSample.SampleWeight,
				DepthTo: parentSample.DepthTo,
				SourceTable: "SampleQC",
				SampleClassification: "FDUP",
				ChkType: "FDUP",
				QCClassification: "FDUP",
			} as SampleData;

		default:
			throw new Error(`Unknown QAQC type: ${qaqcType}`);
	}
}

/**
 * Validate QAQC insertion result
 * Checks for common issues in QAQC sample generation
 */
export function validateQaqcInsertion(result: QaqcInsertionResult): string[] {
	const errors: string[] = [];

	// Check for duplicate sample IDs
	const sampleIds = new Set<string>();
	for (const sample of result.samples) {
		if (sampleIds.has(sample.SampleNm)) {
			errors.push(`Duplicate sample ID found: ${sample.SampleNm}`);
		}
		sampleIds.add(sample.SampleNm);
	}

	// Check that duplicates have parent IDs
	for (const sample of result.samples) {
		if ((sample.SampleClassification === "PREPDUP" || sample.SampleClassification === "FDUP") && !sample.OriginalSampleId) {
			errors.push(`Duplicate sample ${sample.SampleNm} missing ParentId`);
		}
	}

	// Check that standards have standard IDs (warning, not error, as user fills this in)
	const standardsWithoutId = result.samples.filter(
		s => s.SampleClassification === "STD" && !s.StandardId,
	).length;
	if (standardsWithoutId > 0) {
		errors.push(`${standardsWithoutId} standard samples need StandardId assignment`);
	}

	// Check depth ordering
	let lastDepth: number = -1;
	for (const sample of result.samples) {
		if ((sample.DepthFrom || 0) < lastDepth) {
			errors.push(`Depth ordering issue: ${sample.SampleNm} at ${sample.DepthFrom}m after ${lastDepth}m`);
		}
		lastDepth = sample.DepthFrom || 0;
	}

	return errors;
}

/**
 * Remove all QAQC samples from a sample list
 * Useful for resetting and regenerating QAQC samples
 * Only removes newly generated QAQC (RowStatus === -99), preserves existing QAQC from DB
 */
export function removeQaqcSamples(samples: SampleData[]): SampleData[] {
	return samples.filter(sample =>
		!(sample.SampleClassification
		  && ["BLK", "STD", "PREPDUP", "FDUP"].includes(sample.SampleClassification)
		  && sample.RowStatus === -RowStatus.Imported),
	);
}

/**
 * Get QAQC statistics from a sample list
 */
export interface QaqcStatistics {
	totalSamples: number
	regularSamples: number
	qaqcSamples: number
	qaqcPercentage: number
	byType: {
		BLK: number
		STD: number
		PREPDUP: number
		FDUP: number
	}
}

export function getQaqcStatistics(samples: SampleData[]): QaqcStatistics {
	const stats: QaqcStatistics = {
		totalSamples: samples.length,
		regularSamples: 0,
		qaqcSamples: 0,
		qaqcPercentage: 0,
		byType: {
			BLK: 0,
			STD: 0,
			PREPDUP: 0,
			FDUP: 0,
		},
	};

	for (const sample of samples) {
		// Use SampleClassification as primary field
		if (sample.SampleClassification && ["BLK", "STD", "PREPDUP", "FDUP"].includes(sample.SampleClassification)) {
			stats.qaqcSamples++;
			if (sample.SampleClassification in stats.byType) {
				stats.byType[sample.SampleClassification as keyof typeof stats.byType]++;
			}
		}
		else {
			stats.regularSamples++;
		}
	}

	stats.qaqcPercentage = stats.totalSamples > 0
		? (stats.qaqcSamples / stats.totalSamples) * 100
		: 0;

	return stats;
}

/**
 * Preview QAQC insertion without modifying samples
 * Returns a summary of what would be inserted
 */
export function previewQaqcInsertion(
	regularSampleCount: number,
	rule: QaqcInsertionRule,
): QaqcStatistics {
	// Calculate expected QAQC counts
	const byType = {
		BLK: rule.BlankFrequency ? Math.floor(regularSampleCount / rule.BlankFrequency) : 0,
		STD: rule.StandardFrequency ? Math.floor(regularSampleCount / rule.StandardFrequency) : 0,
		PREPDUP: rule.PrepDupFrequency ? Math.floor(regularSampleCount / rule.PrepDupFrequency) : 0,
		FDUP: rule.FDupFrequency ? Math.floor(regularSampleCount / rule.FDupFrequency) : 0,
	};

	const qaqcSamples = Object.values(byType).reduce((sum, count) => sum + count, 0);
	const totalSamples = regularSampleCount + qaqcSamples;

	return {
		totalSamples,
		regularSamples: regularSampleCount,
		qaqcSamples,
		qaqcPercentage: (qaqcSamples / totalSamples) * 100,
		byType,
	};
}
