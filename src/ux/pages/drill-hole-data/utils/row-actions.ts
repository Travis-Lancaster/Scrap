import { SectionKey } from "../types/data-contracts";

const ID_FIELD_BY_SECTION: Partial<Record<SectionKey, string>> = {
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
};

export const LOGGABLE_SECTIONS = new Set<SectionKey>([
	SectionKey.GeologyCombinedLog,
	SectionKey.ShearLog,
	SectionKey.StructureLog,
	SectionKey.CoreRecoveryRunLog,
	SectionKey.FractureCountLog,
	SectionKey.MagSusLog,
	SectionKey.RockMechanicLog,
	SectionKey.RockQualityDesignationLog,
	SectionKey.SpecificGravityPtLog,
	SectionKey.AllSamples,
]);

export function canAddRows(sectionKey: SectionKey | null): sectionKey is SectionKey {
	return !!sectionKey && LOGGABLE_SECTIONS.has(sectionKey);
}

export function createEmptyRow(sectionKey: SectionKey, context: { drillPlanId?: string | null; organization?: string | null; depthFrom?: number }): Record<string, any> {
	const idField = ID_FIELD_BY_SECTION[sectionKey] || "Id";
	const depthFrom = context.depthFrom || 0;
	const base: Record<string, any> = {
		[idField]: crypto.randomUUID(),
		CollarId: context.drillPlanId || "",
		Organization: context.organization || "",
		RowStatus: 0,
		ValidationStatus: 0,
		ActiveInd: true,
		CreatedOnDt: new Date().toISOString(),
		ModifiedOnDt: new Date().toISOString(),
		DepthFrom: depthFrom,
		DepthTo: depthFrom,
	};

	if (sectionKey === SectionKey.AllSamples) {
		base.SampleNm = "";
		base.EntityTypeId = 0;
		base.IsLab = false;
		base.SampleRegisterRowStatus = 0;
	}

	return base;
}
