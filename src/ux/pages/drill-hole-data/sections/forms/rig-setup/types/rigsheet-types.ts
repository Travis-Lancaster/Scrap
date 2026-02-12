/**
 * Rig Sheet Types
 * Type definitions for the Rig Setup Sheet feature
 */

import type { Control } from "react-hook-form";

/**
 * Rig Sheet Data Interface
 * Represents all fields in the rig setup sheet
 */
export interface RigSetupData {
	// Pad Inspection Section
	DrillingCompany?: string
	PadInspectionCompletedBy?: string
	DrillSupervisor?: string
	PadInspectionSignature?: string
	PadInspectionSignatureDt?: string | Date
	DrillingSignature?: string
	DrillingSignatureDt?: string | Date

	// Final Setup Section
	FinalMagAzimuth?: number
	FinalInclination?: number
	FinalGeologist?: string
	FinalGeologistSignature?: string
	FinalGeologistSignatureDt?: string | Date
	FinalSetupApprovedBy?: string
	FinalSetupSignature?: string
	FinalSetupSignatureDt?: string | Date
	FinalSetupDrillSupervisor?: string
	FinalSetupDrillSupervisorSignature?: string
	FinalSetupDrillSupervisorSignatureDt?: string | Date

	// Down Hole Survey Section
	DownHoleSurveyDrillingContractor?: string
	DownHoleSurveyDriller?: string
	DownHoleSurveyRigName?: string
	DownHoleSurveyDrillerSignature?: string
	DownHoleSurveyDrillerSignatureDt?: string | Date

	// Comments Section
	Comments?: string

	// Standard Row Metadata (if using StandardRowMetadata pattern)
	CreatedOnDt?: Date | string
	CreatedBy?: string
	ModifiedOnDt?: Date | string
	ModifiedBy?: string
	RowStatus?: number
	ActiveInd?: boolean
	DeletedOnDt?: Date | string | null
	DeletedBy?: string | null
}

/**
 * Lookup Options Interface
 * Standard format for lookup dropdown data
 */
export interface LookupOption {
	value: string
	label: string
}

/**
 * Rig Sheet Lookups Interface
 * All lookup data needed for the rig sheet form
 */
export interface RigSetupLookups {
	person: LookupOption[]
	drillCompanies: LookupOption[]
	machinery: LookupOption[]
	isLoading: boolean
}

/**
 * Return type for useRigSetupForm hook
 */
export interface UseRigSetupFormReturn {
	control: Control<RigSetupData>
	isDirty: boolean
	errors: Record<string, string>
	isValid: boolean
	onSave: () => Promise<void>
	onSubmit: () => Promise<void>
	onReject: () => Promise<void>
	onReview: () => Promise<void>
	onApprove: () => Promise<void>
	onExclude: () => Promise<void>
	getFieldProps: (fieldName: keyof RigSetupData) => RigSetupFieldProps
}

/**
 * Field-level props for rig sheet form fields
 */
export interface RigSetupFieldProps {
	isDirty: boolean
	validateStatus?: "error" | undefined
	readOnly: boolean
}
