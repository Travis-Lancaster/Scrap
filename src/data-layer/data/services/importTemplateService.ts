/**
 * Import Template Service
 *
 * Fetches import templates from the server API.
 * Templates define the column mappings for parsing fixed-width text files.
 */

import { Template } from "#src/api/database/data-contracts.js"
import apiClient from "#src/services/apiClient.js"

// import type { Template } from "../api/database/data-contracts";
// import { apiClient } from "./apiClient";
// import type { Template } from '@/api/database/data-contracts';

export interface ImportTemplate {
	templateId: string
	templateName: string
	description?: string
	tableNm: string // Target table: "Sample", "DrillMethod", etc.
	version?: string
	templateRows: TemplateRow[]
}

export interface TemplateRow {
	Name: string
	Line: number | number[]
	start?: number
	length?: number
	Column?: Record<string, any>
}

/**
 * Fetch all import templates from server
 * @param tableNm - Optional filter by table name
 * @returns Array of import templates
 */
export async function fetchImportTemplates(tableNm?: string): Promise<ImportTemplate[]> {
	console.log("📋 [IMPORT] Fetching templates", { tableNm });

	try {
		const params: any = { take: 100 };

		// Filter by table name if provided
		if (tableNm) {
			params.search = tableNm;
		}

		const response = await apiClient.templateControllerFindAll(params);
		const apiTemplates = (response.data?.data || []) as Template[];

		// Map API Template objects to ImportTemplate format
		const templates: ImportTemplate[] = apiTemplates
			.map(t => mapTemplateToImportTemplate(t))
			.filter((t): t is ImportTemplate => t !== null);

		console.log(`✅ [IMPORT] Loaded ${templates.length} templates`);
		return templates;
	}
	catch (error) {
		console.error("❌ [IMPORT] Failed to fetch templates:", error);
		return [];
	}
}

/**
 * Fetch a specific template by ID
 * @param templateId - Template ID
 * @returns Import template or null
 */
export async function fetchTemplateById(templateId: string): Promise<ImportTemplate | null> {
	console.log("📋 [IMPORT] Fetching template:", templateId);

	try {
		const response = await apiClient.templateControllerFindOne(templateId);
		const apiTemplate = response.data as Template;
		const template = mapTemplateToImportTemplate(apiTemplate);

		if (template) {
			console.log("✅ [IMPORT] Template loaded:", template.templateName);
		}
		return template;
	}
	catch (error) {
		console.error("❌ [IMPORT] Failed to fetch template:", error);
		return null;
	}
}

/**
 * Map API Template to ImportTemplate format
 * Parses JsonData field and extracts template rows
 */
function mapTemplateToImportTemplate(apiTemplate: Template): ImportTemplate | null {
	try {
		// Parse JsonData field which contains the template rows
		let templateRows: TemplateRow[] = [];
		if (apiTemplate.JsonData) {
			const parsed = JSON.parse(apiTemplate.JsonData);
			// Handle different JSON structures - could be array directly or nested
			templateRows = Array.isArray(parsed) ? parsed : (parsed.templateRows || []);
		}

		return {
			templateId: apiTemplate.TemplateId,
			templateName: apiTemplate.TemplateNm || "Unnamed Template",
			description: apiTemplate.Description,
			tableNm: apiTemplate.TemplateType || "", // Use TemplateType as tableNm
			templateRows,
		};
	}
	catch (error) {
		console.error("❌ [IMPORT] Failed to parse template:", apiTemplate.TemplateId, error);
		return null;
	}
}
