import type { FixedField, TemplateRow } from "../types/template";

type ExtendedFixedField = FixedField & {
	repeat?: boolean
	sourceLine?: number
};

export function FixedWidthParser(
	template: TemplateRow[],
	rawFileText: string,
) {
	const lines = rawFileText.split(/\r?\n/);
	const output: Record<string, any> = {};

	// Cache for non-repeating field values (extracted once)
	const nonRepeatingCache: Record<string, Record<string, string>> = {};

	// Track line numbers for each pattern array
	const patternLineNumbers: Record<string, number> = {};

	for (const row of template) {
		// Skip rows without a Line number specified
		if (row.Line === undefined)
			continue;

		const lineText = lines[row.Line] ?? "";

		// ─────────────────────────────
		// SIMPLE FIXED FIELD
		// ─────────────────────────────
		if (!row.Column) {
			if (row.start == null || row.length == null)
				continue;

			output[row.Name] = lineText
				.substring(row.start, row.start + row.length)
				.trim();

			continue;
		}

		// ─────────────────────────────
		// COLUMN / REPEATING STRUCTURE
		// ─────────────────────────────
		if (!output[row.Name]) {
			output[row.Name] = [];
			patternLineNumbers[row.Name] = 0; // Initialize line counter for this pattern
		}

		const columnObj: Record<string, any> = {};

		// Auto-add LineNumber field (0-based, incrementing)
		columnObj.LineNumber = patternLineNumbers[row.Name];
		patternLineNumbers[row.Name]++;

		for (const [key, def] of Object.entries(row.Column)) {
			// Check if it's an extended field with repeat/sourceLine
			if (
				typeof def === "object"
				&& def !== null
				&& "start" in def
				&& "length" in def
			) {
				const field = def as ExtendedFixedField;

				// Non-repeating field (extract once from sourceLine)
				if (field.repeat === false && field.sourceLine !== undefined) {
					// Check cache first
					const cacheKey = `${row.Name}_${key}`;
					if (!nonRepeatingCache[cacheKey]) {
						// Extract from source line
						const sourceLine = lines[field.sourceLine] ?? "";
						nonRepeatingCache[cacheKey] = {
							value: sourceLine
								.substring(field.start, field.start + field.length)
								.trim(),
						};
					}
					columnObj[key] = nonRepeatingCache[cacheKey].value;
				}
				else {
					// Repeating field (default behavior - extract from current line)
					columnObj[key] = lineText
						.substring(field.start, field.start + field.length)
						.trim();
				}
			}
			// Literal value
			else if (typeof def === "string" || typeof def === "number") {
				columnObj[key] = def;
			}
			// Empty object or unsupported → null
			else {
				columnObj[key] = null;
			}
		}

		output[row.Name].push(columnObj);
	}

	return output;
}
