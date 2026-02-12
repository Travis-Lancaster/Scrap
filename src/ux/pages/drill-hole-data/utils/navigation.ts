import { SectionKey, TabKey } from "../types/data-contracts";

export const TAB_DEFAULT_LENS: Partial<Record<TabKey, string>> = {
<<<<<<< HEAD
	Setup: "Collar",
=======
	Setup: "RigSheet",
>>>>>>> main
	Geology: "Litho",
	Geotech: "CoreRecoveryRun",
	Sampling: "Sample",
};

export function getSectionKeyForTab(tab: TabKey, lens?: string): SectionKey | null {
	switch (tab) {
		case "Setup":
<<<<<<< HEAD
			if (lens === "RigSheet") return SectionKey.RigSetup;
			if (lens === "Collar") return SectionKey.CollarCoordinate;
			return null;
=======
			return lens === "Coordinate" ? SectionKey.CollarCoordinate : SectionKey.RigSetup;
>>>>>>> main
		case "Geology":
			if (lens === "Shear") return SectionKey.ShearLog;
			if (lens === "Structure") return SectionKey.StructureLog;
			return SectionKey.GeologyCombinedLog;
		case "Geotech": {
			const byLens: Record<string, SectionKey> = {
				CoreRecoveryRun: SectionKey.CoreRecoveryRunLog,
				FractureCount: SectionKey.FractureCountLog,
				MagSus: SectionKey.MagSusLog,
				RockMechanic: SectionKey.RockMechanicLog,
				RockQualityDesignation: SectionKey.RockQualityDesignationLog,
				SpecificGravityPt: SectionKey.SpecificGravityPtLog,
				Structure: SectionKey.StructureLog,
			};
			return byLens[lens || "CoreRecoveryRun"] || SectionKey.CoreRecoveryRunLog;
		}
		case "Sampling":
			if (lens === "Dispatch") return SectionKey.Dispatch;
			return SectionKey.AllSamples;
		case "QAQC":
			return SectionKey.QAQC;
		case "SignOff":
			return SectionKey.VwCollar;
		default:
			return null;
	}
}
