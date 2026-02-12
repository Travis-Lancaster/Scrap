import type {
	AllSamples,
	CollarCoordinate,
	CoreRecoveryRunLog,
	CycloneCleaning,
	DrillMethod,
	DrillPlanStatusHistory,
	FractureCountLog,
	GeologyCombinedLog,
	LabDispatch,
	MagSusLog,
	MetaDataLog,
	PageDto,
	RigSetup,
	RockMechanicLog,
	RockQualityDesignationLog,
	ShearLog,
	SpecificGravityPtLog,
	StructureLog,
	Survey,
	VwCollar,
	VwDrillPlan
} from "../api/database/data-contracts";

import { WorkMode } from "../types/types";
import apiClient from "../api/apiClient";
import { dataLayer } from "./dbService";
import { db } from "../db/connection";
import { getMode } from "../store/workModeStore";

/**
 * Collar Service
 * Provides convenience functions to query data by CollarId with ActiveInd=true
 * Wraps existing dbService functions to avoid code duplication.
 */
export const collarService = {
	/**
	 * Get Collar by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to find
	 * @returns Promise<VwCollar | undefined>
	 */
	async getCollarByCollarId(collarId: string): Promise<VwCollar | undefined> {
		return (await dataLayer.vwCollarControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true }]) }))[0];
	},

	/**
	 * Get CollarCoordinate records by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<CollarCoordinate[]>
	 */
	async getCollarCoordinateByCollarId(collarId: string): Promise<CollarCoordinate[]> {

		return (await dataLayer.collarCoordinateControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));

	},

	/**
	 * Get CycloneCleaning records by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<CycloneCleaning[]>
	 */
	async getCycloneCleaningByCollarId(collarId: string): Promise<CycloneCleaning[]> {

		return (await dataLayer.cycloneCleaningControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));
	},

	/**
	 * Get DrillMethod records by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<DrillMethod[]>
	 */
	async getDrillMethodByCollarId(collarId: string): Promise<DrillMethod[]> {
		return (await dataLayer.drillMethodControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));
	},

	/**
	 * Get MetaDataLog records by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<MetaDataLog[]>
	 */
	async getMetaDataLogByCollarId(collarId: string): Promise<MetaDataLog[]> {
		return (await dataLayer.metaDataLogControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));

	},

	/**
	 * Get RigSetup records by CollarId with ActiveInd=true
	 * Note: RigSetup links via DrillPlanId, not CollarId directly
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<RigSetup[]>
	 */


	async getRigSetupByCollarId(collarId: string): Promise<RigSetup | null> {

		console.log('---------------------------getRigSetupByCollarId')
		const data = (await dataLayer.rigSetupControllerFindAll({ filters: JSON.stringify([{ field: 'DrillPlanId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true }]) }));

		return data && data.length > 0 ? data[0] : null;
	},

	/**
	 * Get Survey records by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<Survey[]>
	 */
	async getSurveyByCollarId(collarId: string): Promise<Survey[]> {
		return (await dataLayer.surveyControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));

	},

	/**
	 * Get GeologyCombinedLog records by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<GeologyCombinedLog[]>
	 */
	async getGeologyCombinedLogByCollarId(collarId: string): Promise<GeologyCombinedLog[]> {
		return (await dataLayer.geologyCombinedLogControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));
	},

	/**
	 * Get StructureLog records by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<StructureLog[]>
	 */
	async getStructureLogByCollarId(collarId: string): Promise<StructureLog[]> {
		return (await dataLayer.structureLogControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));

	},

	/**
	 * Get ShearLog records by CollarId with ActiveInd=true
	 * TODO: ShearLog doesn't have CollarId yet - will be added in future
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<ShearLog[]>
	 */
	async getShearLogByCollarId(collarId: string): Promise<ShearLog[]> {
		return (await dataLayer.shearLogControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));
	},

	/**
	 * Get CoreRecoveryRunLog records by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<CoreRecoveryRunLog[]>
	 */
	async getCoreRecoveryRunLogByCollarId(collarId: string): Promise<CoreRecoveryRunLog[]> {
		return (await dataLayer.coreRecoveryRunLogControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));
	},

	/**
	 * Get FractureCountLog records by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<FractureCountLog[]>
	 */
	async getFractureCountLogByCollarId(collarId: string): Promise<FractureCountLog[]> {
		return (await dataLayer.fractureCountLogControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));
	},

	/**
	 * Get MagSusLog records by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<MagSusLog[]>
	 */
	async getMagSusLogByCollarId(collarId: string): Promise<MagSusLog[]> {
		return (await dataLayer.magSusLogControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));

	},

	/**
	 * Get RockMechanicLog records by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<RockMechanicLog[]>
	 */
	async getRockMechanicLogByCollarId(collarId: string): Promise<RockMechanicLog[]> {
		return (await dataLayer.rockMechanicLogControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));

	},

	/**
	 * Get RockQualityDesignationLog records by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<RockQualityDesignationLog[]>
	 */
	async getRockQualityDesignationLogByCollarId(collarId: string): Promise<RockQualityDesignationLog[]> {
		return (await dataLayer.rockQualityDesignationLogControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));

	},

	/**
	 * Get SpecificGravityPtLog records by CollarId with ActiveInd=true
	 * TODO: SpecificGravityPtLog doesn't have CollarId yet - will be added in future
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<SpecificGravityPtLog[]>
	 */
	async getSpecificGravityPtLogByCollarId(collarId: string): Promise<SpecificGravityPtLog[]> {
		return (await dataLayer.specificGravityPtLogControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));
	},

	/**
	 * Get LabDispatch records by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<LabDispatch[]>
	 */
	async getLabDispatchByCollarId(collarId: string): Promise<LabDispatch[]> {
		return (await dataLayer.labDispatchControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));

	},

	/**
	 * Get AllSamples records by CollarId with ActiveInd=true
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<AllSamples[]>
	 */
	async getAllSamplesByCollarId(collarId: string): Promise<AllSamples[]> {
		return (await dataLayer.allSamplesControllerFindAll({ filters: JSON.stringify([{ field: 'CollarId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));

	},

	/**
	 * Get DrillPlan records by CollarId with ActiveInd=true
	 * Note: VwDrillPlan links via DrillHoleId, not CollarId directly
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<VwDrillPlan[]>
	 */
	async getDrillPlanByCollarId(collarId: string): Promise<VwDrillPlan[]> {
		return (await dataLayer.vwDrillPlanControllerFindAll({ filters: JSON.stringify([{ field: 'DrillPlanId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));

	},

	/**
	 * Get DrillPlanStatusHistory records by CollarId with ActiveInd=true
	 * Note: DrillPlanStatusHistory links via DrillPlanId, not CollarId directly
	 * @param collarId - The CollarId to filter by
	 * @returns Promise<DrillPlanStatusHistory[]>
	 */
	async getDrillPlanStatusHistoryByCollarId(collarId: string): Promise<DrillPlanStatusHistory[]> {
		return (await dataLayer.drillPlanStatusHistoryControllerFindAll({ filters: JSON.stringify([{ field: 'DrillPlanId', op: "eq", value: collarId }, { field: 'ActiveInd', op: "eq", value: true },]) }));
	}
};
