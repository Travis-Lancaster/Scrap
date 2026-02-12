/**
 * Section Factory
 * 
 * Factory pattern for creating section store instances.
 * Creates SectionStore for single-object sections and ArraySectionStore for array sections.
 * 
 * @module drill-hole-data/store
 */

import type {
	SectionStore,
	ArraySectionStore,
	SectionConfig,
	ValidationResult,
	RowMetadata,
	RowVersionMap,
} from "../types/data-contracts";
import { SectionKey } from "../types/data-contracts";
import { createValidationResult } from "../validation";
import { SECTION_CONFIGS } from "./section-config";

/**
 * Create a single-object section store
 * 
 * @param config - Section configuration
 * @returns Section store instance
 */
export function createSectionStore<TData>(config: SectionConfig<TData>): SectionStore<TData> {
	const initialData = config.initialData() as TData;
	
	let data = initialData;
	let originalData = initialData;
	let isDirty = false;
	let validation = createValidationResult([], []);
	
	return {
		get data() {
			return data;
		},
		set data(value: TData) {
			data = value;
		},
		get originalData() {
			return originalData;
		},
		set originalData(value: TData) {
			originalData = value;
		},
		get isDirty() {
			return isDirty;
		},
		set isDirty(value: boolean) {
			isDirty = value;
		},
		get validation() {
			return validation;
		},
		set validation(value: ValidationResult) {
			validation = value;
		},
		
		isValid(): boolean {
			return this.validation.canSave;
		},
		
		hasUnsavedChanges(): boolean {
			return this.isDirty;
		},
		
		validate(): ValidationResult {
			console.log(`[SectionFactory] 🔍 Validating section:`, config.key);
			
			const databaseErrors = config.validators.database(this.data);
			const saveWarnings = config.validators.save(this.data);
			
			validation = createValidationResult(databaseErrors, saveWarnings);
			
			console.log(`[SectionFactory] ${this.validation.canSave ? "✅" : "❌"} Validation result:`, {
				section: config.key,
				canSave: this.validation.canSave,
				errorCount: databaseErrors.length,
				warningCount: saveWarnings.length,
			});
			
			return this.validation;
		},
		
		reset(): void {
			console.log(`[SectionFactory] 🔄 Resetting section:`, config.key);
			data = originalData;
			isDirty = false;
			validation = createValidationResult([], []);
		},
	};
}

/**
 * Create an array section store (for grid sections)
 * 
 * @param config - Section configuration
 * @returns Array section store instance
 */
export function createArraySectionStore<TData>(
	config: SectionConfig<TData>
): ArraySectionStore<TData> {
	let data: TData[] = [];
	let originalData: TData[] = [];
	let rowMetadata: Record<string, RowMetadata> = {};
	let rowVersions: RowVersionMap = {};
	let isDirty = false;
	
	return {
		get data() {
			return data;
		},
		set data(value: TData[]) {
			data = value;
		},
		get originalData() {
			return originalData;
		},
		set originalData(value: TData[]) {
			originalData = value;
		},
		get rowMetadata() {
			return rowMetadata;
		},
		set rowMetadata(value: Record<string, RowMetadata>) {
			rowMetadata = value;
		},
		get rowVersions() {
			return rowVersions;
		},
		set rowVersions(value: RowVersionMap) {
			rowVersions = value;
		},
		get isDirty() {
			return isDirty;
		},
		set isDirty(value: boolean) {
			isDirty = value;
		},
		
		getDirtyRows(): string[] {
			return Object.entries(this.rowMetadata)
				.filter(([_, metadata]) => metadata.isDirty)
				.map(([rowId]) => rowId);
		},
		
		hasUnsavedChanges(): boolean {
			return this.isDirty || this.getDirtyRows().length > 0;
		},
		
		validateRow(rowId: string): ValidationResult {
			console.log(`[SectionFactory] 🔍 Validating row:`, { section: config.key, rowId });
			
			const row = this.data.find((r: any) => {
				// Find row by ID (need to determine ID field name)
				const idField = getRowIdField(config.key);
				return r[idField] === rowId;
			});
			
			if (!row) {
				console.warn(`[SectionFactory] ⚠️ Row not found:`, { section: config.key, rowId });
				return createValidationResult([], []);
			}
			
			const databaseErrors = config.validators.database(row);
			const saveWarnings = config.validators.save(row);
			
			const result = createValidationResult(databaseErrors, saveWarnings);
			
			// Update row metadata
			if (this.rowMetadata[rowId]) {
				this.rowMetadata[rowId].validationStatus = result.canSave ? "Valid" : "Invalid";
				this.rowMetadata[rowId].validationErrors = databaseErrors.map(e => e.message);
			}
			
			console.log(`[SectionFactory] ${result.canSave ? "✅" : "❌"} Row validation:`, {
				section: config.key,
				rowId,
				canSave: result.canSave,
				errorCount: databaseErrors.length,
			});
			
			return result;
		},
		
		validateAll(): Record<string, ValidationResult> {
			console.log(`[SectionFactory] 🔍 Validating all rows:`, config.key);
			
			const results: Record<string, ValidationResult> = {};
			
			this.data.forEach((row: any) => {
				const idField = getRowIdField(config.key);
				const rowId = row[idField];
				if (rowId) {
					results[rowId] = this.validateRow(rowId);
				}
			});
			
			console.log(`[SectionFactory] Validated ${Object.keys(results).length} rows`);
			
			return results;
		},
		
		reset(): void {
			console.log(`[SectionFactory] 🔄 Resetting array section:`, config.key);
			data = [...originalData];
			rowMetadata = {};
			isDirty = false;
		},
	};
}

/**
 * Get row ID field name for section
 * 
 * @param sectionKey - Section identifier
 * @returns ID field name
 */
function getRowIdField(sectionKey: SectionKey): string {
	const fieldMap: Record<string, string> = {
		[SectionKey.GeologyCombinedLog]: "GeologyCombinedLogId",
		[SectionKey.ShearLog]: "ShearLogId",
		[SectionKey.StructureLog]: "StructureLogId",
		[SectionKey.CoreRecoveryRunLog]: "CoreRecoveryRunLogId",
		[SectionKey.FractureCountLog]: "FractureCountLogId",
		[SectionKey.MagSusLog]: "MagSusLogId",
		[SectionKey.RockMechanicLog]: "RockMechanicLogId",
		[SectionKey.RockQualityDesignationLog]: "RockQualityDesignationLogId",
		[SectionKey.SpecificGravityPtLog]: "SpecificGravityPtLogId",
		[SectionKey.AllSamples]: "SampleId",
		[SectionKey.QAQC]: "QaqcId",
		[SectionKey.VwCollar]: "vwCollarId",
	};
	
	return fieldMap[sectionKey] || "Id";
}

/**
 * Create initial row metadata
 * 
 * @param rowId - Row identifier
 * @param rowStatus - Row status code
 * @returns Row metadata
 */
export function createRowMetadata(rowId: string, rowStatus: number = 0): RowMetadata {
	return {
		isDirty: false,
		isNew: false,
		isDeleted: false,
		isStale: false,
		validationStatus: "NotValidated",
		validationErrors: undefined,
		rowStatus: mapRowStatusToString(rowStatus),
	};
}

/**
 * Map row status number to string
 */
function mapRowStatusToString(status: number): RowMetadata["rowStatus"] {
	switch (status) {
		case 0: return "Draft";
		case 1: return "Submitted";
		case 2: return "Reviewed";
		case 3: return "Approved";
		case 4: return "Rejected";
		default: return "Draft";
	}
}

/**
 * Create all section stores from configurations
 * 
 * @returns Object with all section stores
 */
export function createAllSections() {
	console.log(`[SectionFactory] 🏭 Creating all section stores...`);
	
	const sections: any = {};
	
	SECTION_CONFIGS.forEach(config => {
		if (config.type === "single") {
			sections[config.key] = createSectionStore(config);
		} else {
			sections[config.key] = createArraySectionStore(config);
		}
	});
	
	console.log(`[SectionFactory] ✅ Created ${Object.keys(sections).length} section stores`);
	
	return sections;
}
