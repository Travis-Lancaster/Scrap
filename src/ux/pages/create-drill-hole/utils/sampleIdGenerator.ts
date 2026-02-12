import type { QaqcInsertionRule, SampleData, StandardSequenceEntry } from "../validation/sample-schemas";

/**
 * Sample ID Generator
 * Generates unique sample IDs following the format: {Prefix}_{SequenceNumber}
 * Examples: SORES_F183284, SORES_F183285, etc.
 */

export interface SampleIdGeneratorConfig {
	prefix: string
	// holeCounter: string;
	startingSequence: number
	format?: "standard" // standard: PREFIX_###
}

export class SampleIdGenerator {
	private currentSequence: number;
	private prefix: string;
	private format: "standard";
	// private holeCounter: string

	constructor(config: SampleIdGeneratorConfig) {
		this.prefix = config.prefix;
		this.currentSequence = config.startingSequence;
		this.format = config.format || "standard";
		// this.holeCounter = config.holeCounter;
	}

	/**
	 * Generate next sample ID in sequence
	 */
	public getNextId(holeCounter: string): string {
		const id = `${this.prefix}${holeCounter}${this.currentSequence.toString().padStart(5, "0")}`;
		this.currentSequence++;
		return id;
	}

	/**
	 * Get current sequence without incrementing
	 */
	public getCurrentSequence(): number {
		return this.currentSequence;
	}

	/**
	 * Set the sequence to a specific value
	 */
	public setSequence(sequence: number): void {
		this.currentSequence = sequence;
	}

	/**
	 * Validate sample ID format
	 */
	public static validateSampleId(sampleId: string, prefix: string): boolean {
		// Check if it follows PREFIX_NUMBER format
		const regex = new RegExp(`^${prefix}\\d+$`);
		return regex.test(sampleId);
	}

	/**
	 * Extract sequence number from sample ID
	 */
	public static extractSequence(sampleId: string, prefix: string): number | null {
		const regex = new RegExp(`^${prefix}(\\d+)$`);
		const match = sampleId.match(regex);
		return match ? Number.parseInt(match[1], 10) : null;
	}

	/**
	 * Find the highest sequence number in existing samples
	 * Useful for resuming numbering after loading existing data
	 */
	public static findMaxSequence(samples: SampleData[], prefix: string): number {
		let maxSequence = 0;

		for (const sample of samples) {
			// Use SampleNm (readable name) not SampleId (UUID)
			const sequence = this.extractSequence(sample.SampleNm, prefix);
			if (sequence !== null && sequence > maxSequence) {
				maxSequence = sequence;
			}
		}

		return maxSequence;
	}

	/**
	 * Create generator from QAQC rule
	 * Note: QaqcInsertionRule does not contain a CurrentSequence field,
	 *       so default to starting from 1
	 */
	public static fromQaqcRule(rule: QaqcInsertionRule): SampleIdGenerator {
		return new SampleIdGenerator({
			prefix: rule.SampleIdPrefix,
			startingSequence: 1,
		});
	}

	/**
	 * Create generator with auto-detection from existing samples
	 * If no samples exist, use the rule defaults
	 */
	public static fromExistingSamples(
		samples: SampleData[],
		rule: QaqcInsertionRule,
	): SampleIdGenerator {
		const maxSequence = this.findMaxSequence(samples, rule.SampleIdPrefix);

		return new SampleIdGenerator({
			prefix: rule.SampleIdPrefix,
			startingSequence: maxSequence > 0 ? maxSequence + 1 : 1,
		});
	}

	/**
	 * Renumber sample IDs sequentially by depth order
	 * Preserves existing samples (those loaded from DB with RowStatus !== -99), only renumbers newly generated samples
	 * Returns new samples array with updated IDs, sorted by depth
	 * This ensures sample IDs correspond to depth ordering, not creation order
	 */
	public static renumberSamplesByDepth(
		samples: SampleData[],
		prefix: string,
		startingSequence: number = 1,
		holeCounter: string,
	): SampleData[] {
		// Sort samples by depth (DepthFrom ascending), then by SampleNm, then by SampleClassification
		const sortedSamples = [...samples].sort((a, b) => {
			// Handle null / undefined DepthFrom
			const depthA = a.DepthFrom ?? Number.POSITIVE_INFINITY;
			const depthB = b.DepthFrom ?? Number.POSITIVE_INFINITY;

			if (depthA !== depthB) {
				return depthA - depthB;
			}

			// Secondary sort by SampleNm
			if (a.SampleNm !== b.SampleNm) {
				return (a.SampleNm ?? "").localeCompare(b.SampleNm ?? "");
			}

			// Tertiary sort by SampleClassification
			return (a.SampleClassification ?? "").localeCompare(b.SampleClassification ?? "");
		});

		// Separate existing samples from new samples
		// New samples have RowStatus === -99, existing samples have RowStatus !== -99
		const existingSamples = sortedSamples.filter(s => s.rv);
		const samplesToRenumber = sortedSamples.filter(s => !s.rv);

		// Create a generator for sequential numbering
		const generator = new SampleIdGenerator({
			prefix,
			startingSequence,
			format: "standard",
		});

		// Build a mapping of SampleId to new SampleNm for updating OriginalSampleNm references
		const sampleIdToNewName: Map<string, string> = new Map();

		// First pass: assign new IDs to samples that need renumbering (new samples with RowStatus === -99)
		const renumberedNewSamples = samplesToRenumber.map((sample) => {
			const updatedSample = { ...sample };

			// Assign new sequential ID
			const newSampleNm = generator.getNextId(holeCounter);
			updatedSample.SampleNm = newSampleNm;

			// Track the SampleId -> new SampleNm mapping
			sampleIdToNewName.set(sample.SampleId, newSampleNm);

			return updatedSample;
		});

		// Combine existing samples (preserved as-is) with renumbered new samples
		const allRenumberedSamples = [...existingSamples, ...renumberedNewSamples];

		// Re-sort by depth to maintain order
		const finalSortedSamples = allRenumberedSamples.sort((a, b) => (a.DepthFrom || 0) - (b.DepthFrom || 0));

		// Second pass: update OriginalSampleNm references using the SampleId mapping
		// OriginalSampleId is a UUID and stays the same
		// Only OriginalSampleNm (the readable name) needs to be updated
		finalSortedSamples.forEach((sample) => {
			if (sample.OriginalSampleId && sampleIdToNewName.has(sample.OriginalSampleId)) {
				sample.OriginalSampleNm = sampleIdToNewName.get(sample.OriginalSampleId)!;
			}
		});

		return finalSortedSamples;
	}
}

/**
 * Helper function to generate a batch of sample IDs
 */
export function generateSampleIdBatch(
	generator: SampleIdGenerator,
	count: number,
	holeCounter: string,

): string[] {
	const ids: string[] = [];
	for (let i = 0; i < count; i++) {
		ids.push(generator.getNextId(holeCounter));
	}
	return ids;
}

/**
 * Helper function to check if a sample ID is a QAQC sample
 * QAQC samples may have special naming (like ETAL4) or follow standard numbering
 */
// export function isQaqcSampleId(sampleId: string): boolean {
// 	// Check for ETAL4 format
// 	if (sampleId.includes('_ETAL4')) {
// 		return true;
// 	}

// 	// Other QAQC samples use standard numbering but are identified by SampleClassification field
// 	return false;
// }

/**
 * Parse sample ID into components
 */
export interface ParsedSampleId {
	prefix: string
	sequence: number | null
	isValid: boolean
	type: "standard" | "unknown"
}

export function parseSampleId(sampleId: string): ParsedSampleId {
	// Try to parse as standard format
	// Find the last underscore
	const lastUnderscore = sampleId.lastIndexOf("_");
	if (lastUnderscore === -1) {
		return {
			prefix: "",
			sequence: null,
			isValid: false,
			type: "unknown",
		};
	}

	const prefix = sampleId.substring(0, lastUnderscore + 1);
	const sequencePart = sampleId.substring(lastUnderscore + 1);
	const sequence = Number.parseInt(sequencePart, 10);

	if (isNaN(sequence)) {
		return {
			prefix,
			sequence: null,
			isValid: false,
			type: "unknown",
		};
	}

	return {
		prefix,
		sequence,
		isValid: true,
		type: "standard",
	};
}

/**
	* Manages cycling through ordered standard sequence with repeat section
	*/
export class StandardSequenceManager {
	private sequence: StandardSequenceEntry[];
	private repeatStartIndex: number;
	private currentIndex: number;
	private hasCompletedFullCycle: boolean;

	constructor(sequence: StandardSequenceEntry[]) {
		this.sequence = [...sequence].sort((a, b) => a.SortOrder - b.SortOrder);
		this.repeatStartIndex = sequence.findIndex(s => s.IsRepeatStart);
		this.currentIndex = 0;
		this.hasCompletedFullCycle = false;
	}

	/**
	 * Get next standard ID in sequence
	 * Cycles through full list once, then repeats from RepeatStart to end
	 */
	public getNext(): string | null {
		if (this.sequence.length === 0)
			return null;

		const currentStandard = this.sequence[this.currentIndex];
		const standardId = currentStandard.StandardId;

		// Move to next position
		this.currentIndex++;

		// Check if we've reached the end
		if (this.currentIndex >= this.sequence.length) {
			if (!this.hasCompletedFullCycle && this.repeatStartIndex >= 0) {
				// First time at end - go to repeat start
				this.hasCompletedFullCycle = true;
				this.currentIndex = this.repeatStartIndex;
			}
			else {
				// Already cycled once or no repeat marker - go to beginning
				this.currentIndex = 0;
			}
		}

		return standardId;
	}

	/**
	 * Reset to beginning of sequence
	 */
	public reset(): void {
		this.currentIndex = 0;
		this.hasCompletedFullCycle = false;
	}

	/**
	 * Get current position in sequence (for debugging/testing)
	 */
	public getCurrentIndex(): number {
		return this.currentIndex;
	}

	/**
	 * Get total number of standards in sequence
	 */
	public getLength(): number {
		return this.sequence.length;
	}
}
