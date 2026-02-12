/**
 * QAQC Type Definitions
 *
 * Application-specific QAQC types that extend or supplement API data contracts.
 *
 * NOTE: Many QAQC types already exist in #src/api/database/data-contracts.ts including:
 * - QcReference, QcReferenceValue, QcReferenceType
 * - SpGetHoleValidation, SpGetHoleValidationEnhanced
 * - SpGlobalDashboardRequestDto, SpGlobalDashboardResponseDto, TimeSeriesDataDto
 * - ShewhartChartDataDto, DuplicateCorrelationDataDto, BiasTrendDataDto
 *
 * Only add types here that do NOT exist in data-contracts.ts
 */

// ============================================================================
// Re-exports from data-contracts for convenience
// ============================================================================

export type {
	BiasTrendDataDto,
	DuplicateCorrelationDataDto,
	QcReference,
	QcReferenceType,
	QcReferenceValue,
	ShewhartChartDataDto,
	SpGetHoleValidation,
	SpGetHoleValidationEnhanced,
	TimeSeriesDataDto,
} from "#src/api/database/data-contracts";

// ============================================================================
// Request Types (not in data-contracts)
// ============================================================================

export interface GetHoleStatusRequest {
	collarId: string
	organization?: string
	element?: string
}

export interface GetHoleValidationRequest {
	collarId: string
	includeDetails?: boolean
	element?: string
	dateFrom?: string
	dateTo?: string
}

export interface GetChartDataRequest {
	startDate?: string
	endDate?: string
	element?: string
	labCode?: string
	standardId?: string
}

export interface ReassayRequest {
	sampleIds: string[]
	reason: string
	priority?: "NORMAL" | "RUSH"
	requestedBy: string
	comments?: string
}

// ============================================================================
// Response Types (not in data-contracts)
// ============================================================================

export interface QaqcHoleStatus {
	status: "PASS" | "FAIL" | "WARN" | "PENDING" | "NO_QC" | "NO_DATA"
	details: string
	failedBatchCount: number
	totalBatchCount: number
	latestBatchDate: string | null
	totalQCSamples: number
	totalFailedQC: number
}

export interface QaqcBatchSummary {
	batchNo: string
	labCode: string
	labFinalDt: string
	totalQCSamples: number
	passCount: number
	failCount: number
	warnCount: number
	failureRate_Pct: number
	batchStatus: "PASS" | "FAIL" | "WARN"
}

export interface QaqcDetailedSample {
	batchNo: string
	sampleId: string
	sampleNm: string
	element: string
	labCode: string
	qcType: QCType
	standardId: string
	result: number
	expectedValue: number | null
	expectedStDev: number | null
	zScore: number
	sampledDt: string
	detectionLimit: number | null
	qcStatus: "PASS" | "FAIL" | "FAIL_HIGH" | "FAIL_LOW" | "WARN"
}

export interface QaqcHoleValidation {
	batches: QaqcBatchSummary[]
	details: QaqcDetailedSample[]
}

// ============================================================================
// Chart Data Types (transformed for UI consumption)
// ============================================================================

export interface ShewhartChartData {
	sampledDt: string
	standardId: string
	sampleId: string
	labCode: string
	batchNo: string
	element: string
	result: number
	expectedValue: number
	expectedStDev: number
	zScore: number
	upper3SD: number
	upper2SD: number
	lower2SD: number
	lower3SD: number
	qcStatus: "PASS" | "WARN" | "FAIL"
	isFailure: boolean
	isWarning: boolean
}

export interface DuplicateScatterData {
	sampledDt: string
	duplicateType: "DUP" | "FDUP" | "PREPDUP"
	element: string
	labCode: string
	batchNo: string
	originalValue: number
	duplicateValue: number
	absDifference: number
	avgGrade: number
	gradeCategory: "Low Grade" | "Medium Grade" | "High Grade"
	rpd: number
	isHighRPD: boolean
}

export interface BiasTrendData {
	year: number
	month: number
	yearMonth: string
	monthStart: string
	labCode: string
	element: string
	standardCount: number
	avgZScore: number
	stDevZScore: number
	failureRate_Pct: number
	biasCategory: "High Bias" | "Slight Bias" | "Low Bias" | "No Bias"
	hasSignificantBias: boolean
}

export interface QaqcChartData {
	shewhart: ShewhartChartData[]
	scatter: DuplicateScatterData[]
	bias: BiasTrendData[]
}

// ============================================================================
// Failure Log Types
// ============================================================================

export interface QaqcFailure {
	id: string
	batchNo: string
	labCode: string
	element: string
	qcType: "STANDARD" | "BLANK" | "DUPLICATE"
	failCount: number
	totalSamples: number
	failureRate: number
	detectedDate: string
	status: "ACTIVE" | "REVIEWING" | "UNDER_REVIEW" | "RESOLVED" | "SIGNED_OFF"
	assignedTo?: string
	comments?: string
	reviewedBy?: string
	reviewedAt?: string
	failedStandards: string[]
	failedSamples: string[]
}

// ============================================================================
// Filter Types
// ============================================================================

export type QCType = "STD" | "BLK" | "DUP" | "FDUP" | "PREPDUP";

export interface QaqcFilters {
	dateFrom: string
	dateTo: string
	elements: string[]
	labCodes: string[]
	qcTypes: QCType[]
	standardIds: string[]
}

export interface QaqcFilterSet {
	id: string
	name: string
	description?: string
	filters: QaqcFilters
	organization: string
	createdBy?: string
	createdDate: string
	isDefault?: boolean
}
