/**
 * Global Lookup Service
 *
 * Provides type-safe, efficient access to all Lookup_* and Classification_* tables.
 * Handles column mapping for different table patterns and provides filtering capabilities.
 *
 * Usage:
 * - getLookupOptions('Lookup_HoleStatus') → LookupOption[]
 * - getFilteredLookupOptions('Lookup_Company', 'CompanyType', 'CONTRACTOR') → LookupOption[]
 */

import type { LookupOption, LookupTableConfig } from "../types/lookupTypes";
import type { SyncRvRequestDto, TableSyncItemDto } from "../api/database/data-contracts";

import Dexie from "dexie";
import apiClient from "../api/apiClient";
import { db } from "../db/connection";

// Build list of all lookUp tables and the largest rv value.
export async function pullLookUpTables() {
	const tableNames = [

		'Auth_Role',
		'Auth_User',
		'Auth_UserRole',

		'Classification_HoleNmPrefix',
		'Classification_Organization',
		'Classification_Phase',
		'Classification_Pit',
		'Classification_Project',
		'Classification_Prospect',
		'Classification_Section',
		'Classification_SubTarget',
		'Classification_Target',
		'Classification_Tenement',
		'Classification_Zone',

		'Filteredset_EntityTypeConfig',
		'Filteredset_EntityTypeRelationship',
		'Filteredset_Filteredset',
		'Filteredset_FilteredSetEntity',
		'Filteredset_FilteredSetParameter',
		'Filteredset_FilteredSetShare',
		'Filteredset_ParameterType',

		'Lookup_AltCode',
		'Lookup_AltInt',
		'Lookup_AltStyle',
		'Lookup_ApprovalStatus',
		'Lookup_AssayClassification',
		'Lookup_AssayDispatchGroup',
		'Lookup_AutoAssayActionTypes',
		'Lookup_AutoAssayImportRuleTypes',
		'Lookup_AutoAssayQAQCType',
		'Lookup_Backfill',
		'Lookup_BitType',
		'Lookup_Casing',
		'Lookup_CasingClass',
		'Lookup_CasingSize',
		'Lookup_ClastComp',
		'Lookup_ClastDistribution',
		'Lookup_CodingSystem',
		'Lookup_CollarType',
		'Lookup_ColourCode',
		'Lookup_ColourTone',
		'Lookup_Company',
		'Lookup_CompanyType',
		'Lookup_COMPGRP',
		'Lookup_ConsignmentDepot',
		'Lookup_ContactRelation',
		'Lookup_Contamination',
		'Lookup_ContractActivityLogStatus',
		'Lookup_ContractItemClassification',
		'Lookup_ContractType',
		'Lookup_CoordinateType',
		'Lookup_CoreDiameter',
		'Lookup_CoreQuality',
		'Lookup_CostCodeReportType',
		'Lookup_CostCodes',
		'Lookup_Country',
		'Lookup_CurrencyCode',
		'Lookup_Department',
		'Lookup_DispatchPrefix',
		'Lookup_DispatchPulpStatus',
		'Lookup_DispatchStatus',
		'Lookup_DomainCode',
		'Lookup_DownHoleSurveyMethod',
		'Lookup_DrillPatternCode',
		'Lookup_DrillPatternType',
		'Lookup_DrillPlanStatus',
		'Lookup_DrillSize',
		'Lookup_DrillType',
		'Lookup_EntityType',
		'Lookup_EventCode',
		'Lookup_FacingDirection',
		'Lookup_FailureType',
		'Lookup_FaultId',
		'Lookup_FractureCountAlignment',
		'Lookup_FractureCountEmboitement',
		'Lookup_FractureCountLineQuality',
		'Lookup_FractureStyle',
		'Lookup_Geomorphology',
		'Lookup_GeotFFRating',
		'Lookup_GeotHardness',
		'Lookup_GeotIRSRating',
		'Lookup_GeotJa',
		'Lookup_GeotJn',
		'Lookup_GeotJr',
		'Lookup_GeotJw',
		'Lookup_GeotMacroRoughness',
		'Lookup_GeotMatrix',
		'Lookup_GeotMicroRoughness',
		'Lookup_GeotPersistence',
		'Lookup_GeotRockMassDomain',
		'Lookup_GeotRockStrengthFailureMode',
		'Lookup_GeotRockStrengthPostTestCondition',
		'Lookup_GeotRockSupport',
		'Lookup_GeotSRF',
		'Lookup_GeotStrength',
		'Lookup_GeotStrengthFailureMode',
		'Lookup_GeotStrengthTestType',
		'Lookup_GLVC',
		'Lookup_GLVC3TSource',
		'Lookup_Grid',
		'Lookup_GroundWaterIndication',
		'Lookup_GroutType',
		'Lookup_HoleDiameter',
		'Lookup_HolePurpose',
		'Lookup_HolePurposeDetail',
		'Lookup_HoleStatus',
		'Lookup_HoleType',
		'Lookup_IncidentAction',
		'Lookup_IncidentSeverity',
		'Lookup_IncidentType',
		'Lookup_Instrument',
		'Lookup_InstrumentType',
		'Lookup_IntactRockStrength',
		'Lookup_Intensity',
		'Lookup_KinematicIndicator',
		'Lookup_LeaseStatus',
		'Lookup_LineamentType',
		'Lookup_LithGrainsize',
		'Lookup_Lithology',
		'Lookup_LithRegOvpt',
		'Lookup_LithTexture',
		'Lookup_LodeCode',
		'Lookup_LoggingEventType',
		'Lookup_Machinery',
		'Lookup_MachineryClassification',
		'Lookup_MachineryStatusClassification',
		'Lookup_MagInt',
		'Lookup_MagSusFactor',
		'Lookup_MapSheet',
		'Lookup_MapSurface',
		'Lookup_MatrixComp',
		'Lookup_MeetingType',
		'Lookup_MeshSize',
		'Lookup_MetamorphicGrade',
		'Lookup_MinCode',
		'Lookup_MinInt',
		'Lookup_MinPotential',
		'Lookup_MinStyle',
		'Lookup_Months',
		'Lookup_MovementSense',
		'Lookup_OpenJointSets',
		'Lookup_OrientationPosition',
		'Lookup_OrientationQuality',
		'Lookup_OrientationType',
		'Lookup_Oxidation',
		'Lookup_OxidationStyle',
		'Lookup_ParageneticStage',
		'Lookup_ParentCode',
		'Lookup_Person',
		'Lookup_PersonType',
		'Lookup_PetrologyType',
		'Lookup_PhotoClassification',
		'Lookup_PhotoLocationType',
		'Lookup_PhotoType',
		'Lookup_PlugMaterial',
		'Lookup_ProgramCode',
		'Lookup_ProgramType',
		'Lookup_ProtolithCode',
		'Lookup_Provenance',
		'Lookup_PTSiteType',
		'Lookup_QCGradeRange',
		'Lookup_Region',
		'Lookup_Relog',
		'Lookup_ReportingClassification',
		'Lookup_ReportingDatePeriod',
		'Lookup_ReportingType',
		'Lookup_RigType',
		'Lookup_RockMassFabric',
		'Lookup_RowStatus',
		'Lookup_SampleClassification',
		'Lookup_SampleCondition',
		'Lookup_SampleMethod',
		'Lookup_SamplePackingType',
		'Lookup_SampleTestType',
		'Lookup_SampleType',
		'Lookup_SGDryMethod',
		'Lookup_SGMethod',
		'Lookup_ShearAspect',
		'Lookup_Shift',
		'Lookup_SiteMonitoringType',
		'Lookup_SitePrep',
		'Lookup_SoilHorizon',
		'Lookup_StandardSampleSourceType',
		'Lookup_StorageActivity',
		'Lookup_StorageLocation',
		'Lookup_Stratigraphy',
		'Lookup_StructAngleSet',
		'Lookup_StructClass',
		'Lookup_StructContinuity',
		'Lookup_StructFillTexture',
		'Lookup_StructFillThickness',
		'Lookup_StructFillType',
		'Lookup_StructLineationType',
		'Lookup_StructPlaneType',
		'Lookup_StructPTMethod',
		'Lookup_StructPTQuality',
		'Lookup_StructRoughness',
		'Lookup_StructShape',
		'Lookup_StructSpacing',
		'Lookup_StructType',
		'Lookup_StructWallContactType',
		'Lookup_StructWallRockCompetency',
		'Lookup_StructZone',
		'Lookup_SubjRec',
		'Lookup_SurveyMethod',
		'Lookup_SurveyReliability',
		'Lookup_SynchStatus',
		'Lookup_TargetCode',
		'Lookup_TargetType',
		'Lookup_TaskPriority',
		'Lookup_TaskStatus',
		'Lookup_TaskType',
		'Lookup_TenementStatus',
		'Lookup_Terrain',
		'Lookup_Units',
		'Lookup_UnitType',
		'Lookup_UserStatusType',
		'Lookup_Validation',
		'Lookup_Vegetation',
		'Lookup_VeinCode',
		'Lookup_VeinStyle',
		'Lookup_VeinTexture',
		'Lookup_Vergence',
		'Lookup_WaterIntersectionType',
		'Lookup_WaterQuality',
		'Lookup_Weathering',
		'Lookup_WeathStyle',
		'Lookup_XRFBagType',
		'Lookup_YoungingIndicator',

		'Planning_DrillPattern',
		'Planning_DrillProgram',

		'Processing_AssayBatchDetail',
		'Processing_AssayBatchStatus',
		'Processing_AssayElement',
		'Processing_AssayElementGroup',
		'Processing_AssayLab',
		'Processing_AssayLabElementAlias',
		'Processing_AssayLabMethod',
		'Processing_AssayMethodGeneric',

		'QAQC_QCAnalysisType',
		'QAQC_QCClassification',
		'QAQC_QCFilteredset',
		'QAQC_QCGroup',
		'QAQC_QCInsertionRule',
		'QAQC_QCInsertionRuleStandardSequence',
		'QAQC_QCReference',
		'QAQC_QCReferenceType',
		'QAQC_QCReferenceValue',
		'QAQC_QCReferenceValueType',
		'QAQC_QCRule',
		'QAQC_QCStatisticalLimits',
		'QAQC_QCType',

		'System_Config',
		'System_LookUpNormalization',
		'System_PickList',
		'System_PickListUser',
		'System_PickListValue',
		'System_Template',

	] as const;

	try {
		// Fetch latest records from each table in parallel
		const syncItems: TableSyncItemDto[] = [];

		await Promise.all(
			tableNames.map(async (tableName) => {
				const table = db[tableName as keyof typeof db] as any;
				if (table && typeof table.orderBy === 'function') {
					const latestRecord = await getLatestRV(table);
					syncItems.push({
						tableName,
						rv: latestRecord,
					});
					//}
				}
			})
		);




		// Send to API for sync
		const syncRequest: SyncRvRequestDto = { tables: syncItems };
		const response = await apiClient.syncControllerSyncRv(syncRequest);

		// API returns new/updated entries - update each table
		if (response?.data?.results && Array.isArray(response.data.results)) {
			for (const result of response.data.results) {
				if (result.records && result.records.length > 0) {
					try {

						const recordsToPut = result.records.map((rec: any) => ({
							...rec,
							rv: convertRv(rec.rv),
							syncStatus: 0
						}));

						// if (recordsToPut.length === 0 && result.records.length > 0) {
						// 	console.warn(`[LOOKUP-SERVICE] ⚠️ All records for ${result.tableName} were filtered out due to missing primary keys`);
						// }

						const table = db[result.tableName as keyof typeof db] as any;
						if (table && typeof table.bulkPut === 'function') {
							// console.log(`[LOOKUP-SERVICE] 🔍 Table schema for ${result.tableName}:`, {
							// 	tableName: result.tableName,
							// 	schema: (table as any).schema,
							// 	primaryKey: (table as any).schema?.primKey?.name,
							// 	indexes: (table as any).schema?.indexes?.map((idx: any) => idx.name)
							// });

							// console.log(`[LOOKUP-SERVICE] 📝 Sample record structure:`, recordsToPut[0]);

							await db.transaction('rw', table, async () => {
								(Dexie.currentTransaction as any).isSyncing = true;
								await table.bulkPut(recordsToPut);
							});
						}
					} catch (e) {
						console.warn(`Lazy sync failed for ${result.tableName}. Using cached data.`, e);
					}
				}
			}
		}

		return syncItems;
	} catch (e) {
		console.error('Failed to pull classification tables:', e);
		throw e;
	}
}

function convertRv(rv: string) {
	let binaryRv: Uint8Array;

	try {
		// Check if rv exists and is a valid string
		if (rv && typeof rv === 'string') {
			binaryRv = Uint8Array.from(atob(rv), c => c.charCodeAt(0));
		} else {
			// Fallback for missing/null RV
			binaryRv = new Uint8Array(8);
		}
	} catch (e) {
		console.error(`Failed to decode RV `, rv);
		binaryRv = new Uint8Array(8);
	}

	return binaryRv;
}

/**
 * Configuration map for all lookup and classification tables
 * Maps table names to their column structures
 */
const LOOKUP_CONFIG_MAP: Record<string, LookupTableConfig> = {
	// Standard pattern tables (Code + Description + SortOrder)
	Lookup_HoleStatus: {
		tableName: "Lookup_HoleStatus",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_HoleType: {
		tableName: "Lookup_HoleType",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_HolePurpose: {
		tableName: "Lookup_HolePurpose",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_DrillType: {
		tableName: "Lookup_DrillType",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_DrillSize: {
		tableName: "Lookup_DrillSize",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_RigType: {
		tableName: "Lookup_RigType",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_Lithology: {
		tableName: "Lookup_Lithology",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
		filterFields: ["CodingSystem", "ParentCd"],
	},
	Lookup_Weathering: {
		tableName: "Lookup_Weathering",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_AltCode: {
		tableName: "Lookup_AltCode",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_AltInt: {
		tableName: "Lookup_AltInt",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_AltStyle: {
		tableName: "Lookup_AltStyle",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_MinCode: {
		tableName: "Lookup_MinCode",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_MinInt: {
		tableName: "Lookup_MinInt",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_MinStyle: {
		tableName: "Lookup_MinStyle",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_Grid: {
		tableName: "Lookup_Grid",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_DownHoleSurveyMethod: {
		tableName: "Lookup_DownHoleSurveyMethod",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_SampleType: {
		tableName: "Lookup_SampleType",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_SampleMethod: {
		tableName: "Lookup_SampleMethod",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_SampleCondition: {
		tableName: "Lookup_SampleCondition",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_SampleClassification: {
		tableName: "Lookup_SampleClassification",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_RowStatus: {
		tableName: "Lookup_RowStatus",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},
	Lookup_ApprovalStatus: {
		tableName: "Lookup_ApprovalStatus",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	},

	// Special pattern: Company (filterable by CompanyType)
	Lookup_Company: {
		tableName: "Lookup_Company",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
		filterFields: ["CompanyType"],
	},

	// Special pattern: Person (concatenate FirstName + LastName)
	Lookup_Person: {
		tableName: "Lookup_Person",
		valueField: "Code",
		labelField: ["FirstName", "LastName"],
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
		filterFields: ["Company", "PersonType"],
	},

	// Special pattern: Units (uses UnitCode instead of Code)
	Lookup_Units: {
		tableName: "Lookup_Units",
		valueField: "UnitCode",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
		filterFields: ["UnitType"],
	},

	// Special pattern: Instrument (filterable by InstrumentType)
	Lookup_Instrument: {
		tableName: "Lookup_Instrument",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
		filterFields: ["InstrumentType"],
	},

	// Special pattern: Machinery (filterable by Company + ClassificationCode)
	Lookup_Machinery: {
		tableName: "Lookup_Machinery",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
		filterFields: ["Company", "ClassificationCode"],
	},

	// Special pattern: HolePurposeDetail (filterable by HolePurpose)
	Lookup_HolePurposeDetail: {
		tableName: "Lookup_HolePurposeDetail",
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
		filterFields: ["HolePurpose"],
	},

	// Classification tables
	Classification_Organization: {
		tableName: "Classification_Organization",
		valueField: "Organization",
		labelField: "Description",
		sortField: "SortOrder",
	},
	Classification_Project: {
		tableName: "Classification_Project",
		valueField: "Project",
		labelField: "Project",
	},
	Classification_Target: {
		tableName: "Classification_Target",
		valueField: "Target",
		labelField: "Description",
		sortField: "SortOrder",
	},
	Classification_SubTarget: {
		tableName: "Classification_SubTarget",
		valueField: "SubTarget",
		labelField: "Description",
		sortField: "SortOrder",
		filterFields: ["Target"],
	},
	Classification_Phase: {
		tableName: "Classification_Phase",
		valueField: "Phase",
		labelField: "Phase",
	},
	Classification_Prospect: {
		tableName: "Classification_Prospect",
		valueField: "Prospect",
		labelField: "Prospect",
		filterFields: ["Project"],
	},
	Classification_Tenement: {
		tableName: "Classification_Tenement",
		valueField: "Tenement",
		labelField: "Tenement",
	},
	Classification_Zone: {
		tableName: "Classification_Zone",
		valueField: "Code",
		labelField: "Code",
	},
	Classification_Pit: {
		tableName: "Classification_Pit",
		valueField: "Pit",
		labelField: "Pit",
	},
	Classification_Section: {
		tableName: "Classification_Section",
		valueField: "Code",
		labelField: "Code",
	},
	Classification_HoleNmPrefix: {
		tableName: "Classification_HoleNmPrefix",
		valueField: "HoleNmPrefixId",
		labelField: "HoleNmPrefixId",
	},
};

/**
 * Get default configuration for a table
 * Used for tables not explicitly configured (assumes standard pattern)
 */
function getDefaultConfig(tableName: string): LookupTableConfig {
	return {
		tableName,
		valueField: "Code",
		labelField: "Description",
		sortField: "SortOrder",
		defaultField: "IsDefaultInd",
	};
}

/**
 * Get configuration for a lookup table
 * Returns explicit config if available, otherwise returns default pattern
 */
function getTableConfig(tableName: string): LookupTableConfig {
	return LOOKUP_CONFIG_MAP[tableName] || getDefaultConfig(tableName);
}

/**
 * Convert a database record to a LookupOption
 * Handles different column naming patterns
 */
function recordToLookupOption(record: any, config: LookupTableConfig): LookupOption {
	// Get value
	const value = record[config.valueField];

	// Get label (may be single field or concatenated fields)
	let label: string;
	if (Array.isArray(config.labelField)) {
		label = config.labelField
			.map(field => record[field])
			.filter(v => v != null)
			.join(" ");
	}
	else {
		label = String(record[config.labelField] || "");
	}

	// Build option
	const option: LookupOption = {
		value,
		label,
	};

	// Add optional fields
	if (config.sortField && record[config.sortField] != null) {
		option.sortOrder = record[config.sortField];
	}

	if (config.defaultField && record[config.defaultField] != null) {
		option.isDefault = record[config.defaultField];
	}

	// Add extra fields for filtering
	if (config.filterFields) {
		const extra: Record<string, any> = {};
		for (const field of config.filterFields) {
			if (record[field] != null) {
				extra[field] = record[field];
			}
		}
		if (Object.keys(extra).length > 0) {
			option.extra = extra;
		}
	}

	return option;
}

/**
 * Get lookup options from a table
 * Automatically handles column mapping and sorting
 *
 * @param tableName - Name of the lookup table (e.g., 'Lookup_HoleStatus')
 * @returns Array of LookupOption objects
 */
export async function getLookupOptions(tableName: string): Promise<LookupOption[]> {
	try {
		const config = getTableConfig(tableName);
		const table = (db as any)[tableName];

		if (!table) {
			console.warn(`[LOOKUP-SERVICE] ⚠️ Table ${tableName} not found in database`);
			return [];
		}

		// Fetch all records
		const records = await table.toArray();

		// Sort if sort field is configured
		if (config.sortField) {
			records.sort((a: { [x: string]: number }, b: { [x: string]: number }) => {
				const aVal = a[config.sortField!] ?? 0;
				const bVal = b[config.sortField!] ?? 0;
				return aVal - bVal;
			});
		}

		// Convert to lookup options
		const options = records.map((record: any) => recordToLookupOption(record, config));

		console.log(`[LOOKUP-SERVICE] ✅ Loaded ${tableName}: ${options.length} options`);
		return options;
	}
	catch (error) {
		console.error(`[LOOKUP-SERVICE] ❌ Error loading ${tableName}:`, error);
		return [];
	}
}

/**
 * Get filtered lookup options
 * Filters by a specific field value
 *
 * @param tableName - Name of the lookup table
 * @param filterField - Field to filter by
 * @param filterValue - Value to match
 * @returns Array of filtered LookupOption objects
 */
export async function getFilteredLookupOptions(
	tableName: string,
	filterField: string,
	filterValue: any,
): Promise<LookupOption[]> {
	try {
		const config = getTableConfig(tableName);
		const table = (db as any)[tableName];

		if (!table) {
			console.warn(`[LOOKUP-SERVICE] ⚠️ Table ${tableName} not found in database`);
			return [];
		}

		// Fetch and filter records
		const records = await table.where(filterField).equals(filterValue).toArray();

		// Sort if sort field is configured
		if (config.sortField) {
			records.sort((a: { [x: string]: number }, b: { [x: string]: number }) => {
				const aVal = a[config.sortField!] ?? 0;
				const bVal = b[config.sortField!] ?? 0;
				return aVal - bVal;
			});
		}

		// Convert to lookup options
		const options = records.map((record: any) => recordToLookupOption(record, config));

		console.log(
			`[LOOKUP-SERVICE] ✅ Loaded ${tableName} (filtered by ${filterField}=${filterValue}): ${options.length} options`,
		);
		return options;
	}
	catch (error) {
		console.error(
			`[LOOKUP-SERVICE] ❌ Error loading filtered ${tableName}:`,
			error,
		);
		return [];
	}
}

/**
 * Get a single lookup option by value
 *
 * @param tableName - Name of the lookup table
 * @param value - Value to find
 * @returns LookupOption or undefined
 */
export async function getLookupOption(
	tableName: string,
	value: string | number,
): Promise<LookupOption | undefined> {
	try {
		const config = getTableConfig(tableName);
		const table = (db as any)[tableName];

		if (!table) {
			return undefined;
		}

		const record = await table.where(config.valueField).equals(value).first();
		return record ? recordToLookupOption(record, config) : undefined;
	}
	catch (error) {
		console.error(`[LOOKUP-SERVICE] ❌ Error loading option from ${tableName}:`, error);
		return undefined;
	}
}

/**
 * Get all configured lookup tables
 * Useful for debugging and verification
 */
export function getConfiguredTables(): string[] {
	return Object.keys(LOOKUP_CONFIG_MAP);
}

/**
 * Check if a table is configured
 */
export function isTableConfigured(tableName: string): boolean {
	return tableName in LOOKUP_CONFIG_MAP;
}

/**
 * Get configuration for a table
 * Useful for advanced use cases
 */
export function getTableConfiguration(tableName: string): LookupTableConfig {
	return getTableConfig(tableName);
}

async function getLatestRV<T extends { rv: Uint8Array }>(table: Dexie.Table<T, any>): Promise<string> {
	const record = await table.orderBy('rv').reverse().first();

	if (!record) return "";//"AAAAAAAAAAA=";

	return btoa(String.fromCharCode(...record.rv));
}

console.log("[LOOKUP-SERVICE] 🚀 Lookup service initialized");
