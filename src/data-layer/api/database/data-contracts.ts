/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUserDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  UserNm?: string;
  Comments?: string;
  DisplayNm?: string;
  Email?: string;
  FailedLoginAttempts?: number;
  IsLockedInd?: boolean;
  /** @format date-time */
  LastLoginDt?: string;
  /** @format date-time */
  LastPasswordChangeDt?: string;
  /** @format date-time */
  LockedUntilDt?: string;
  MustChangePasswordInd?: boolean;
  PasswordHash?: string;
  UserId?: string;
  UserStatus?: string;
}

export interface CollarType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  CollarTypeId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  collars: Collar[];
}

export interface CompanyType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  CompanyTypeId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  companys: Company[];
}

export interface HoleStatus {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  HoleStatusId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  holes: Hole[];
}

export interface CoreDiameter {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  CoreDiameterId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  coreRecoveryRunLogs: CoreRecoveryRunLog[];
}

export interface PersonType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  PersonTypeId: string;
  SortOrder: number;
  persons: Person[];
}

export interface MachineryClassification {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  MachineryClassificationId: string;
  SortOrder: number;
  machinerys: Machinery[];
}

export interface RigSetup {
  ReportIncludeInd?: boolean;
  ValidationStatus?: RigSetupValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: RigSetupRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  RigSetupId: string;
  Comments?: string;
  DataSource: string;
  DownHoleSurveyDriller: string;
  DownHoleSurveyDrillerSignature?: string;
  /** @format date-time */
  DownHoleSurveyDrillerSignatureDt?: string;
  DownHoleSurveyDrillingContractor: string;
  DownHoleSurveyRigNo: string;
  DrillingCompany: string;
  DrillingSignature?: string;
  /** @format date-time */
  DrillingSignatureDt?: string;
  DrillPlanId: string;
  DrillSupervisor: string;
  FinalGeologist: string;
  FinalGeologistSignature?: string;
  /** @format date-time */
  FinalGeologistSignatureDt?: string;
  FinalInclination?: number;
  FinalMagAzimuth?: number;
  FinalSetupApprovedBy: string;
  FinalSetupDrillSupervisor: string;
  FinalSetupDrillSupervisorSignature?: string;
  /** @format date-time */
  FinalSetupDrillSupervisorSignatureDt?: string;
  FinalSetupSignature?: string;
  /** @format date-time */
  FinalSetupSignatureDt?: string;
  Organization: string;
  PadInspectionCompletedBy: string;
  PadInspectionSignature?: string;
  /** @format date-time */
  PadInspectionSignatureDt?: string;
  RigAlignmentToolDip?: number;
  RigAlignmentToolMagAzi?: number;
  SurveyDepth?: number;
  SurveyDip?: number;
  SurveyMagAzi?: number;
  SurveyReference?: string;
  downHoleSurveyDriller: Person;
  downHoleSurveyDrillingContractor: Company;
  downHoleSurveyRigNo: Machinery;
  drillingCompany: Company;
  drillPlan: DrillPlan;
  drillSupervisor: Person;
  finalGeologist: Person;
  finalSetupApprovedBy: Person;
  finalSetupDrillSupervisor: Person;
  organization: Organization;
  padInspectionCompletedBy: Person;
  rowStatus: RowStatus;
}

export interface Machinery {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Company: string;
  ClassificationCode: string;
  Description: string;
  IsDefaultInd: boolean;
  MachineryId: string;
  SortOrder: number;
  classification: MachineryClassification;
  drillMethods: DrillMethod[];
  rigSetups: RigSetup[];
}

export interface DrillSize {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  DrillSizeId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  drillMethods: DrillMethod[];
}

export interface DrillType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  DrillTypeId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  drillMethods: DrillMethod[];
  drillPlans: DrillPlan[];
}

export interface HoleDiameter {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  Diametercm?: number;
  DiameterIn?: number;
  HoleDiameterId: string;
  Ideallm?: number;
  IsDefaultInd: boolean;
  RodLengthm?: number;
  SortOrder: number;
  magSusLogs: MagSusLog[];
}

export interface InstrumentType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  InstrumentTypeId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  instruments: Instrument[];
}

export interface MagSusFactor {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  MagSusFactorId: string;
  MultiplicationFactor: number;
  SortOrder: number;
  magSusLogs: MagSusLog[];
  ptMagSusLogs: PtMagSusLog[];
}

export interface FractureCountAlignment {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  FractureCountAlignmentId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  fractureCountLogs: FractureCountLog[];
}

export interface FractureCountEmboitement {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  FractureCountEmboitementId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  fractureCountLogs: FractureCountLog[];
}

export interface FractureCountLineQuality {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  FractureCountLineQualityId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  fractureCountLogs: FractureCountLog[];
}

export interface UnitType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  UnitTypeId: string;
  unitss: Units[];
}

export interface AssayClassification {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  AssayClassificationId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  assays: Assay[];
}

export interface AssayBatchStatus {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  AssayBatchStatusId: string;
  Description?: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  assayBatchs: AssayBatch[];
}

export interface AssayElementGroup {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  ElementGroup: string;
  AssayElementGroupId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  assayElements: AssayElement[];
}

export interface AssayLabElementAlias {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  LabCode: string;
  LabElement: string;
  AssayLabElementAliasId: string;
  DataSource: string;
  Element: string;
  Repeat: string;
  element: AssayElement;
  assays: Assay[];
  xrfs: Xrf[];
}

export interface QcReferenceType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description?: string;
  IsDefaultInd: boolean;
  QCReferenceTypeId: string;
  SortOrder: number;
  qcReferences: QcReference[];
}

export interface MeshSize {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  MeshSizeId: string;
  SortOrder: number;
  ptSamples: PtSample[];
}

export interface MapSheet {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  MapSheetId: string;
  SortOrder: number;
  sites: Site[];
}

export interface ProgramCode {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  DefaultProgramType: string;
  Description: string;
  ExampleFormat: string;
  IsDefaultInd: boolean;
  ProgramCodeId: string;
  SortOrder: number;
  defaultProgramType: ProgramType;
  drillPrograms: DrillProgram[];
}

export interface RigType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  DepthCapacity_m?: number;
  Description: string;
  DrillMethod?: string;
  IsDefaultInd: boolean;
  RigTypeId: string;
  SortOrder: number;
  drillPrograms: DrillProgram[];
}

export interface DrillPlanStatusHistory {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  DrillPlanStatusHistoryId: string;
  Comments?: string;
  DrillPlanId: string;
  /** @format date-time */
  ExpectedResumeOnDt?: string;
  FromStatus: string;
  Reason?: string;
  ToStatus: string;
  TransitionBy: string;
  /** @format date-time */
  TransitionOnDt: string;
  drillPlan?: DrillPlan;
  fromStatus?: DrillPlanStatus;
  toStatus?: DrillPlanStatus;
}

export interface DrillPlanStatus {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  DrillPlanStatusId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  drillPlanStatusHistorys: DrillPlanStatusHistory[];
  drillPrograms: DrillProgram[];
}

export interface CostCodes {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  CostCodesId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  tenements: Tenement[];
}

export interface LeaseStatus {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  LeaseStatusId: string;
  SortOrder: number;
  tenements: Tenement[];
}

export interface TenementStatus {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  TenementStatusId: string;
  tenements: Tenement[];
}

export interface DrillPatternCode {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  DrillPatternCodeId: string;
  ExampleFormat: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  TypicalPatternType?: string;
  TypicalSpacing_m?: number;
  drillPatterns: DrillPattern[];
}

export interface DrillPatternType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  DrillPatternTypeId: string;
  GeometryType?: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  drillPatterns: DrillPattern[];
}

export interface DrillPattern {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  DrillPattern: string;
  Comments?: string;
  DrillPatternCode: string;
  DrillPatternId: string;
  DrillPatternType: string;
  DrillProgram: string;
  Organization: string;
  Orientation?: number;
  SpacingX?: number;
  SpacingY?: number;
  Target: string;
  drillPattern2: DrillPatternCode;
  drillPatternType: DrillPatternType;
  drillProgram: DrillProgram;
  organization: Organization;
  target: Target;
  drillPlans: DrillPlan[];
}

export interface SubTarget {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  SubTarget: string;
  Description?: string;
  SortOrder?: number;
  SubTargetId: string;
  Target: string;
  target: Target;
  collars: Collar[];
  drillPlans: DrillPlan[];
}

export interface Target {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Target: string;
  CentroidEasting?: number;
  CentroidNorthing?: number;
  Description?: string;
  Organization: string;
  Priority?: number;
  Project?: string;
  Radius_m?: number;
  SortOrder?: number;
  TargetCode?: string;
  TargetId: string;
  TargetType?: string;
  Tenement: string;
  organization: Organization;
  tenement: Tenement;
  collars: Collar[];
  drillPatterns: DrillPattern[];
  drillPlans: DrillPlan[];
  subTargets: SubTarget[];
}

export interface Tenement {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Tenement: string;
  AnnExpRent: number;
  CostCd: string;
  DataSource: string;
  /** @format date-time */
  EndDt?: string;
  /** @format date-time */
  GrantDt?: string;
  Holder: string;
  LeaseStatus: string;
  Organization: string;
  /** @format date-time */
  RegDt?: string;
  RegStatus: string;
  /** @format date-time */
  StartDt?: string;
  TenementId: string;
  costCd: CostCodes;
  holder: Company;
  leaseStatus: LeaseStatus;
  regStatus: TenementStatus;
  collars: Collar[];
  drillPlans: DrillPlan[];
  drillPrograms: DrillProgram[];
  sites: Site[];
  targets: Target[];
}

export interface DrillProgram {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  DrillProgram: string;
  /** @format date-time */
  ActualEnd?: string;
  /** @format date-time */
  ActualStart?: string;
  Budget?: number;
  Contractor: string;
  DataSource: string;
  DrillProgramId: string;
  Objectives?: string;
  Organization: string;
  /** @format date-time */
  PlannedEnd?: string;
  /** @format date-time */
  PlannedStart?: string;
  ProgramCode: string;
  ProgramType: string;
  Project: string;
  RigType: string;
  Status: string;
  Tenement: string;
  contractor: Company;
  organization: Organization;
  program: ProgramCode;
  programType: ProgramType;
  project: Project;
  rigType: RigType;
  status: DrillPlanStatus;
  tenement: Tenement;
  drillPatterns: DrillPattern[];
}

export interface ProgramType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Category: string;
  Description: string;
  IsDefaultInd: boolean;
  ProgramTypeId: string;
  SortOrder: number;
  drillPrograms: DrillProgram[];
  programCodes: ProgramCode[];
  sites: Site[];
}

export interface PtSiteType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  PTSiteTypeId: string;
  SortOrder: number;
  sites: Site[];
}

export interface SynchStatus {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  SynchStatusId: string;
  sites: Site[];
}

export interface Terrain {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  TerrainId: string;
  sites: Site[];
}

export interface Vegetation {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  VegetationId: string;
  sites: Site[];
}

export interface SampleDispatch {
  ReportIncludeInd?: boolean;
  ValidationStatus?: SampleDispatchValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: SampleDispatchRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleDispatchId: string;
  CollarId: string;
  DepthFrom: number;
  DepthTo: number;
  DispatchSequence: number;
  DispatchStatus: string;
  ElementsOrMethodCodes?: string;
  LabDispatchId: string;
  Organization: string;
  RushInd: boolean;
  SampleId: string;
  SampleNm: string;
  SampleType?: string;
  SampleWeight?: number;
  collar: Collar;
  labDispatch: LabDispatch;
}

export interface LabDispatch {
  ReportIncludeInd?: boolean;
  ValidationStatus?: LabDispatchValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: LabDispatchRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  LabDispatchId: string;
  AuthorizedByName: string;
  AuthorizedBySignature?: string;
  CertificateEmail?: string;
  CertificateFax?: string;
  CertificateInd: boolean;
  ClientCode?: string;
  CollarId: string;
  CopyToAddressLine1?: string;
  CopyToAddressLine2?: string;
  CopyToName?: string;
  CourierName?: string;
  /** @format date-time */
  DateReceived?: string;
  /** @format date-time */
  DispatchedDt: string;
  DispatchNumber: string;
  DispatchStatus: string;
  ElementsOrMethods?: string;
  EmailAddress?: string;
  EmailNotificationInd: boolean;
  FaxNumber?: string;
  HoleNm: string;
  InvoiceToAddressLine1?: string;
  InvoiceToAddressLine2?: string;
  InvoiceToName?: string;
  LabCode: string;
  LabReceivedBy?: string;
  /** @format date-time */
  LabReceivedDt?: string;
  OrderNo?: string;
  Organization: string;
  Priority?: string;
  Project?: string;
  PulpDiscardAfter90Days: boolean;
  PulpPaidStorageAfter90Days: boolean;
  PulpReturnAfter90Days: boolean;
  PulpReturnInd: boolean;
  QuoteNo?: string;
  RejectDiscardAfter90Days: boolean;
  RejectPaidStorageAfter90Days: boolean;
  RejectReturnAfter90Days: boolean;
  RejectReturnInd: boolean;
  ReturnAddressLine1?: string;
  ReturnAddressLine2?: string;
  ReturnAddressLine3?: string;
  SampleTypeDrillCore: boolean;
  SampleTypeOther?: string;
  SampleTypePercussion: boolean;
  SampleTypeRock: boolean;
  SampleTypeSediment: boolean;
  SampleTypeSoil: boolean;
  SpecialInstructions?: string;
  SubmittedBy: string;
  TotalSampleCount: number;
  TotalWeight?: number;
  WaybillNo?: string;
  WebNotificationInd: boolean;
  WorkorderNo?: string;
  collar: Collar;
  sampleDispatchs: SampleDispatch[];
  sampleRegisters: SampleRegister[];
}

export interface Contamination {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  ContaminationId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  samples: Sample[];
}

export interface CoordinateType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  CoordinateTypeId: string;
  DatumCode?: string;
  Description: string;
  IsDefaultInd: boolean;
  ProjectionCode?: string;
  SortOrder: number;
  xrfSamples: XrfSample[];
}

export interface SampleCondition {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SampleConditionId: string;
  SortOrder: number;
  samples: Sample[];
  xrfSamples: XrfSample[];
}

export interface QcGroup {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  QCGroupId: string;
  SortOrder: number;
  qcClassifications: QcClassification[];
}

export interface StandardSampleQc {
  ReportIncludeInd?: boolean;
  ValidationStatus?: StandardSampleQcValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: StandardSampleQcRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId: string;
  AssayDispatchGroup: string;
  CollarId: string;
  Comments?: string;
  DataSource: string;
  HistoricSampleId: string;
  LoggedBy: string;
  Organization: string;
  OriginalSampleId: string;
  QCClassification: string;
  QuartzFlush: boolean;
  /** @format date-time */
  SampledDt?: string;
  StandardId: string;
  assayDispatchGroup: AssayDispatchGroup;
  historicSample: SampleRegister;
  loggedBy: Person;
  organization: Organization;
  originalSample: SampleRegister;
  qcClassification: QcClassification;
  rowStatus: RowStatus;
  standard: QcReference;
}

export interface XrfSampleQc {
  ReportIncludeInd?: boolean;
  ValidationStatus?: XrfSampleQcValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: XrfSampleQcRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId: string;
  CollarId: string;
  DataSource: string;
  DepthFrom: number;
  DepthTo: number;
  IntervalLength?: number;
  LoggedBy: string;
  Organization: string;
  OriginalSampleId: string;
  Priority?: number;
  QCClassification: string;
  SampledBy: string;
  /** @format date-time */
  SampledDt?: string;
  SampleMethod: string;
  SampleType: string;
  loggedBy: Person;
  organization: SampleRegister;
  originalSample: SampleRegister;
  qcClassification: QcClassification;
  rowStatus: RowStatus;
  sampledBy: Person;
  sampleMethod: SampleMethod;
  sampleType: SampleType;
}

export interface QcClassification {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  FullDescription?: string;
  GridColumn: number;
  IsDefaultInd: boolean;
  OrderNo?: number;
  ParentQCClassification?: string;
  Position?: string;
  QCClassificationId: string;
  QCGroup: string;
  QCStage: string;
  QCStageNo: number;
  SortOrder: number;
  qcGroup: QcGroup;
  ptSampleQcs: PtSampleQc[];
  sampleQcs: SampleQc[];
  standardSampleQcs: StandardSampleQc[];
  xrfSampleQcs: XrfSampleQc[];
}

export interface SampleQc {
  ReportIncludeInd?: boolean;
  ValidationStatus?: SampleQcValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: SampleQcRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId: string;
  AssayDispatchGroup: string;
  CollarId: string;
  Comments?: string;
  DataSource: string;
  DepthFrom: number;
  DepthTo: number;
  HistoricSampleId: string;
  Intervallength?: number;
  JsonData?: string;
  LoggedBy?: string;
  Organization: string;
  OriginalSampleId: string;
  Priority?: number;
  QCClassification: string;
  QuartzFlush: boolean;
  RodNo?: number;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleMethod: string;
  SampleType: string;
  SampleWeight?: number;
  SampleWeightUnitCode: string;
  assayDispatchGroup: AssayDispatchGroup;
  collar: Collar;
  historicSample: SampleRegister;
  organization: SampleRegister;
  originalSample: SampleRegister;
  qcClassification: QcClassification;
  rowStatus: RowStatus;
  sampleMethod: SampleMethod;
  sampleType: SampleType;
  sampleWeightUnit: Units;
}

export interface SampleMethod {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SampleMethodId: string;
  SortOrder: number;
  samples: Sample[];
  sampleQcs: SampleQc[];
  xrfSamples: XrfSample[];
  xrfSampleQcs: XrfSampleQc[];
}

export interface XrfSample {
  ReportIncludeInd?: boolean;
  ValidationStatus?: XrfSampleValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: XrfSampleRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId: string;
  CollarId: string;
  Comments?: string;
  DataSource: string;
  DepthFrom: number;
  DepthTo: number;
  Grid: string;
  HasDuplicate: boolean;
  IntervalLength?: number;
  JsonData?: string;
  LoggedBy: string;
  Organization: string;
  Priority?: number;
  SampleClassification: string;
  SampleCondition: string;
  SampledBy: string;
  /** @format date-time */
  SampledDt?: string;
  SampleMethod: string;
  SampleRecovery_Pct?: number;
  SampleType: string;
  SampleWeight?: number;
  SampleWeightUnitCode: string;
  Superseded: boolean;
  collar: Collar;
  gr: CoordinateType;
  loggedBy: Person;
  organization: SampleRegister;
  rowStatus: RowStatus;
  sampleClassification: SampleClassification;
  sampleCondition: SampleCondition;
  sampledBy: Person;
  sampleMethod: SampleMethod;
  sampleType: SampleType;
  sampleWeightUnit: Units;
}

export interface SampleClassification {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  Priority: number;
  SampleClassificationId: string;
  SortOrder: number;
  samples: Sample[];
  xrfSamples: XrfSample[];
}

export interface Shift {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  ShiftId: string;
  SortOrder: number;
  samples: Sample[];
}

export interface SubjRec {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  SubjRecId: string;
  samples: Sample[];
}

export interface Sample {
  ReportIncludeInd?: boolean;
  ValidationStatus?: SampleValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: SampleRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId: string;
  AssayDispatchGroup: string;
  CollarId: string;
  Comments?: string;
  Contamination: string;
  DataSource: string;
  DepthFrom: number;
  DepthTo: number;
  DryFieldSampleWeight?: number;
  DupSpWeight?: string;
  FieldSampleWeight?: number;
  Grid: string;
  HasDuplicate?: boolean;
  IntervalLength?: number;
  LabSpWeight?: number;
  LoggedBy?: string;
  LogSpWeight?: number;
  Organization: string;
  Priority?: number;
  QuartzFlush?: boolean;
  RodNo?: number;
  Sample_Recovery_pct?: number;
  SampleAreaUnitCode: string;
  SampleClassification: string;
  SampleCondition: string;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleMethod: string;
  SampleType: string;
  SampleWeight?: number;
  SampleWeightUnitCode: string;
  Shift: string;
  SubjectiveRecovery: string;
  Superseded?: boolean;
  WitSpWeight?: number;
  assayDispatchGroup: AssayDispatchGroup;
  collar: Collar;
  contamination: Contamination;
  gr: Grid;
  organization: SampleRegister;
  rowStatus: RowStatus;
  sampleAreaUnit: Units;
  sampleClassification: SampleClassification;
  sampleCondition: SampleCondition;
  sampleMethod: SampleMethod;
  sampleType: SampleType;
  sampleWeightUnit: Units;
  shift: Shift;
  subjectiveRecovery: SubjRec;
}

export interface XrfBagType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  XRFBagTypeId: string;
  xrfHeaders: XrfHeader[];
}

export interface XrfHeader {
  ReportIncludeInd?: boolean;
  ValidationStatus?: XrfHeaderValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: XrfHeaderRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization: string;
  XRFHeaderId: string;
  /** @format date-time */
  ActionDt: string;
  BagType: string;
  Collimated: boolean;
  DataSource?: string;
  Inspector?: string;
  InstrumentSN?: string;
  JsonData?: string;
  Mode: string;
  Reading: string;
  Repeat: string;
  SampleId: string;
  SourceRowNumber: number;
  bagType: XrfBagType;
  sample: SampleRegister;
  xrfs: Xrf[];
}

export interface SampleRegister {
  ReportIncludeInd?: boolean;
  ValidationStatus?: SampleRegisterValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: SampleRegisterRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization: string;
  SampleId: string;
  AttributeGroup?: string;
  ChkType?: string;
  DataSource: string;
  DispatchCount: number;
  IsLab: boolean;
  JsonData?: string;
  /** @format date-time */
  LastDispatchedDt?: string;
  LastLabDispatchId: string;
  MigrationPreviousNm?: string;
  SampleNm: string;
  SourceTable?: string;
  lastLabDispatch: LabDispatch;
  rowStatus: RowStatus;
  assays: Assay[];
  ptSampleQcs: PtSampleQc[];
  samples: Sample[];
  sampleQcs: SampleQc[];
  standardSampleQcs: StandardSampleQc[];
  xrfHeaders: XrfHeader[];
  xrfSamples: XrfSample[];
  xrfSampleQcs: XrfSampleQc[];
}

export interface PtSampleQc {
  ReportIncludeInd?: boolean;
  ValidationStatus?: PtSampleQcValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: PtSampleQcRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId: string;
  AssayDispatchGroup: string;
  DataSource: string;
  LoggedBy: string;
  Organization: string;
  OriginalSampleId: string;
  Priority: number;
  QCClassification: string;
  QuartzFlush: boolean;
  SampledBy: string;
  /** @format date-time */
  SampledDt?: string;
  SampleType: string;
  SiteId: string;
  assayDispatchGroup: AssayDispatchGroup;
  loggedBy: Person;
  organization: Site;
  originalSample: SampleRegister;
  qcClassification: QcClassification;
  rowStatus: RowStatus;
  sampledBy: Person;
  sampleType: SampleType;
  site: Site;
}

export interface SurveyMethod {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  Priority: number;
  RLPriority?: number;
  SortOrder: number;
  SurveyMethodId: string;
  Type?: string;
  collarCoordinates: CollarCoordinate[];
  siteCoordinates: SiteCoordinate[];
}

export interface SiteCoordinate {
  ReportIncludeInd?: boolean;
  ValidationStatus?: SiteCoordinateValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: SiteCoordinateRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization: string;
  SiteCoordinateId: string;
  Comments?: string;
  DataSource: string;
  East?: number;
  Grid: string;
  Instrument: string;
  IsDeleted?: boolean;
  North?: number;
  Priority: number;
  PriorityStatus: string;
  RL?: number;
  SiteId: string;
  SurveyBy: string;
  SurveyCompany: string;
  /** @format date-time */
  SurveyDt?: string;
  SurveyMethod: string;
  Validated?: boolean;
  gr: Grid;
  instrument: Instrument;
  site: Site;
  surveyBy: Person;
  surveyCompany: Company;
  surveyMethod: SurveyMethod;
}

export interface Site {
  ReportIncludeInd?: boolean;
  ValidationStatus?: SiteValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: SiteRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization: string;
  SiteId: string;
  Company: string;
  DataSource: string;
  Geologist: string;
  LL_Latitude?: number;
  LL_Longitude?: number;
  LL_RL?: number;
  MapSheet: string;
  OriginalEast?: number;
  OriginalGrid?: string;
  OriginalNorth?: number;
  OriginalRL?: number;
  OriginalSurveyMethod?: string;
  POWId?: string;
  ProgramType: string;
  SiteAreaUnitCode: string;
  SiteNm: string;
  SiteType: string;
  Slope_Dip?: number;
  SynchStatus: string;
  Target?: string;
  Tenement: string;
  Terrain: string;
  Validated: boolean;
  ValidatedBy: string;
  Vegetation: string;
  company: Company;
  geologist: Person;
  mapSheet: MapSheet;
  programType: ProgramType;
  siteAreaUnit: Units;
  siteType: PtSiteType;
  synchStatus: SynchStatus;
  tenement: Tenement;
  terrain: Terrain;
  validatedBy: Person;
  vegetation: Vegetation;
  ptLoggingEvents: PtLoggingEvent[];
  ptSamples: PtSample[];
  ptSampleQcs: PtSampleQc[];
  siteCoordinates: SiteCoordinate[];
}

export interface SoilHorizon {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SoilHorizonId: string;
  SortOrder: number;
  ptSamples: PtSample[];
}

export interface PtSample {
  ReportIncludeInd?: boolean;
  ValidationStatus?: PtSampleValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: PtSampleRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId: string;
  AssayDispatchGroup: string;
  Comments?: string;
  DataSource: string;
  Depth?: number;
  HasDuplicate: boolean;
  LoggedBy: string;
  MeshSize: string;
  Organization: string;
  OrpDepth?: number;
  OrpSTN?: string;
  Priority?: number;
  QuartzFlush: boolean;
  SampledBy: string;
  /** @format date-time */
  SampledDt?: string;
  SampleDescription?: string;
  SampleType: string;
  SampleWeight?: number;
  SampleWeightUnitCode: string;
  SiteId: string;
  SoilHorizon: string;
  Superseded: boolean;
  assayDispatchGroup: AssayDispatchGroup;
  loggedBy: Person;
  meshSize: MeshSize;
  organization: Site;
  rowStatus: RowStatus;
  sampledBy: Person;
  sampleType: SampleType;
  sampleWeightUnit: Units;
  site: Site;
  soilHorizon: SoilHorizon;
}

export interface AssayDispatchGroup {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  AssayDispatchGroupId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  ptSamples: PtSample[];
  ptSampleQcs: PtSampleQc[];
  samples: Sample[];
  sampleQcs: SampleQc[];
  standardSamples: StandardSample[];
  standardSampleQcs: StandardSampleQc[];
}

export interface AuditLog {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  AuditLogId: string;
  Action: string;
  ActionBy: string;
  /** @format date-time */
  ActionOnDt: string;
  EntityId: string;
  EntityTypeId: number;
  JsonData?: string;
  Organization: string;
  entityType: EntityType;
}

export interface Comment {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CommentValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CommentRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CommentId: string;
  Comment: string;
  EntityId: string;
  EntityTypeId: number;
  entityType: EntityType;
}

export interface XrfStandardSample {
  ReportIncludeInd?: boolean;
  ValidationStatus?: XrfStandardSampleValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: XrfStandardSampleRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId: string;
  Comments?: string;
  DataSource: string;
  Entity2Id?: string;
  EntityId?: string;
  EntityTypeId: number;
  HasDuplicate: boolean;
  JsonData?: string;
  LoggedBy?: string;
  Organization: string;
  Priority?: number;
  /** @format date-time */
  SampledDt?: string;
  SampleType: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  StandardId: string;
  entityType: EntityType;
  organization: Organization;
  sampleType: SampleType;
  standard: QcReference;
}

export interface EntityType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: number;
  Description: string;
  EntityTypeId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  auditLogs: AuditLog[];
  comments: Comment[];
  standardSamples: StandardSample[];
  xrfStandardSamples: XrfStandardSample[];
}

export interface StandardSample {
  ReportIncludeInd?: boolean;
  ValidationStatus?: StandardSampleValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: StandardSampleRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId: string;
  AssayDispatchGroup: string;
  Comments?: string;
  DataSource: string;
  Depth?: number;
  Entity2Id?: string;
  EntityId?: string;
  EntityTypeId: number;
  HasDuplicate: boolean;
  JsonData?: string;
  LoggedBy?: string;
  Organization: string;
  Priority?: number;
  QuartzFlush: boolean;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleType: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  StandardId: string;
  assayDispatchGroup: AssayDispatchGroup;
  entityType: EntityType;
  organization: Organization;
  sampleType: SampleType;
  standard: QcReference;
}

export interface QcReference {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  StandardId: string;
  DataSource: string;
  /** @format date-time */
  Date_Received?: string;
  IsDefaultInd: boolean;
  QCReferenceId: string;
  SortOrder: number;
  StandardType: string;
  Supplier?: string;
  standardType: QcReferenceType;
  qcInsertionRuleStandardSequences: QcInsertionRuleStandardSequence[];
  standardSamples: StandardSample[];
  standardSampleQcs: StandardSampleQc[];
  xrfStandardSamples: XrfStandardSample[];
}

export interface QcInsertionRuleStandardSequence {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  QCInsertionRuleStandardSequenceId: string;
  IsDefaultInd: boolean;
  IsRepeatStart: boolean;
  QCInsertionRuleId: string;
  SortOrder: number;
  StandardId: string;
  qcInsertionRule: QcInsertionRule;
  standard: QcReference;
}

export interface QcInsertionRule {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  QCInsertionRuleId: string;
  BlankFrequency?: number;
  Code: string;
  Description: string;
  ETAL4Frequency?: number;
  FDupFrequency?: number;
  IsDefaultInd: boolean;
  Laboratory: string;
  Organization: string;
  PrepDupFrequency?: number;
  RackSize?: number;
  SampleIdPrefix?: string;
  SampleIntervalSize: number;
  SortOrder: number;
  StandardFrequency?: number;
  laboratory: AssayLab;
  qcInsertionRuleStandardSequences: QcInsertionRuleStandardSequence[];
}

export interface AssayLab {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  LabCode: string;
  AssayLabId: string;
  DataSource: string;
  Email?: string;
  IsDefaultInd: boolean;
  LabContact1?: string;
  LabContact2?: string;
  LabContact3?: string;
  LabDescription: string;
  LabLocation?: string;
  RackSize?: number;
  SortOrder: number;
  WebSite?: string;
  qcFilteredsets: QcFilteredset[];
  qcInsertionRules: QcInsertionRule[];
}

export interface QcFilteredset {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  QCFilteredsetId: string;
  /** @format date-time */
  EffectiveDt: string;
  Element: string;
  ElementGroup?: string;
  /** @format date-time */
  ExpiryDt?: string;
  FilterClassification: string;
  FilterDescription?: string;
  FilterType: string;
  FilterValue: string;
  GradeRangeNm?: string;
  LabCode: string;
  LabDescription?: string;
  LabPriority?: number;
  MaxGrade?: number;
  MinGrade?: number;
  Notes?: string;
  StatisticalLimits?: string;
  Target?: string;
  TargetType?: string;
  UnitCode?: string;
  element: AssayElement;
  lab: AssayLab;
}

export interface AssayElement {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Element: string;
  AssayElementId: string;
  Description?: string;
  ElementGroup: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  SystemUnits: string;
  elementGroup: AssayElementGroup;
  systemUnits: Units;
  assayLabElementAliass: AssayLabElementAlias[];
  qcFilteredsets: QcFilteredset[];
  xrfs: Xrf[];
}

export interface AssayMethodGeneric {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  GenericMethod: string;
  AssayMethodGenericId: string;
  DataSource: string;
  Description?: string;
  assayLabMethods: AssayLabMethod[];
}

export interface AssayLabMethod {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  LabCode: string;
  LabMethod: string;
  AssayLabMethodId: string;
  ChargeWeightUnitCode: string;
  DataSource: string;
  Description?: string;
  GenericMethod: string;
  chargeWeightUnit: Units;
  genericMethod: AssayMethodGeneric;
  assays: Assay[];
  xrfs: Xrf[];
}

export interface Xrf {
  ReportIncludeInd?: boolean;
  ValidationStatus?: XrfValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: XrfRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization: string;
  XRFId: string;
  AssayResult: string;
  AssayResultNum?: number;
  BatchNo: string;
  Element: string;
  GenericMethod: string;
  LabCode: string;
  LabElement: string;
  OriginalMethod: string;
  PassFail?: string;
  Preferred: number;
  Reading: string;
  Repeat: string;
  SampleId: string;
  SourceRowNumber: number;
  sysResult?: number;
  UnitCode: string;
  XRFHeaderId: string;
  batchNo: AssayBatch;
  element: AssayElement;
  lab: AssayLabMethod;
  labElement: AssayLabElementAlias;
  originalMethod: AssayLabMethod;
  unit: Units;
  xrfHeader: XrfHeader;
}

export interface AssayBatch {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  BatchNo: string;
  LabCode: string;
  AssayBatchId: string;
  BatchStatus: string;
  Comments?: string;
  ContractId?: string;
  /** @format date-time */
  DispatchedDt?: string;
  DispatchNo?: string;
  /** @format date-time */
  LabFinalDt?: string;
  /** @format date-time */
  LabJobDt?: string;
  /** @format date-time */
  LabPrelimDt?: string;
  /** @format date-time */
  LabReceivedDt?: string;
  LabSamplePrep?: string;
  /** @format date-time */
  MergeDt: string;
  ResultsCount?: number;
  ResultsMerged?: number;
  SampleCount?: number;
  SamplesMerged?: number;
  SourceFile?: string;
  Validated: boolean;
  /** @format date-time */
  ValidatedDt?: string;
  batchStatus: AssayBatchStatus;
  assays: Assay[];
  xrfs: Xrf[];
}

export interface Assay {
  ReportIncludeInd?: boolean;
  ValidationStatus?: AssayValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: AssayRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  AssayId: string;
  Organization: string;
  AssayClassification: string;
  AssayResult: string;
  AssayResultNum?: number;
  BatchNo: string;
  Element: string;
  GenericMethod: string;
  JsonData?: string;
  LabCode: string;
  LabElement: string;
  LabSequence?: number;
  LimitLower?: number;
  LimitUpper?: number;
  OriginalMethod: string;
  PassFail?: string;
  Preferred: number;
  Reading?: string;
  Repeat: string;
  SampleId: string;
  SourceRowNumber: number;
  sysAssayStatus?: string;
  sysResult?: number;
  UnitCode: string;
  assayClassification: AssayClassification;
  batchNo: AssayBatch;
  element: AssayLabElementAlias;
  genericMethod: AssayLabMethod;
  lab: AssayLabMethod;
  labElement: AssayLabElementAlias;
  originalMethod: AssayLabMethod;
  sample: SampleRegister;
  unit: Units;
}

export interface Casing {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  CasingId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  metaDataLogs: MetaDataLog[];
}

export interface CasingClass {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  CasingClassId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  metaDataLogs: MetaDataLog[];
}

export interface MetaDataLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: MetaDataLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: MetaDataLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  MetaDataLogId: string;
  Casing: string;
  CasingClass: string;
  CasingDepth?: number;
  CasingSize: string;
  CollarId: string;
  Comments?: string;
  DataSource: string;
  DepthFrom: number;
  DepthTo: number;
  IntervalLength?: number;
  JsonData?: string;
  LoggingEventId: string;
  Organization: string;
  Priority: number;
  Redox?: string;
  casing: Casing;
  casingClass: CasingClass;
  casingSize: CasingSize;
  collar: Collar;
  loggingEvent: LoggingEvent;
  organization: Collar;
  rowStatus: RowStatus;
}

export interface CasingSize {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Casing_Diameter?: number;
  Casing_Diameter_UnitCode: string;
  CasingSizeId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  casingDiameterUnit: Units;
  metaDataLogs: MetaDataLog[];
}

export interface FilteredSetParameter {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  FilteredSetParameterId: string;
  ConditionalParameterTypeCd: string;
  ConditionalValue?: string;
  Description?: string;
  DisplayName?: string;
  EffectiveValue?: string;
  FilteredSetId: string;
  HasRangeValues?: boolean;
  IsRequired: boolean;
  /** @format date-time */
  MaxValueDate?: string;
  MaxValueDecimal?: number;
  MaxValueInt?: number;
  /** @format date-time */
  MinValueDate?: string;
  MinValueDecimal?: number;
  MinValueInt?: number;
  ParameterGroup?: string;
  ParameterOrder: number;
  ParameterTypeCd: string;
  ParameterValueBit?: boolean;
  /** @format date-time */
  ParameterValueDate?: string;
  ParameterValueDecimal?: number;
  ParameterValueGuid?: string;
  ParameterValueInt?: number;
  ParameterValueText?: string;
  conditionalParameterTypeCd: ParameterType;
  filteredSet: Filteredset;
  parameterTypeCd: ParameterType;
}

export interface ParameterType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  ParameterTypeId: string;
  DataType: string;
  DecimalPrecision?: number;
  DecimalScale?: number;
  DefaultValue?: string;
  Description?: string;
  DisplayFormat?: string;
  ErrorMessage?: string;
  IsRequiredInd: boolean;
  MaxLength?: number;
  MaxValue?: number;
  MinValue?: number;
  ParameterGroup?: string;
  ParameterTypeCd: string;
  ParameterTypeNm: string;
  ParentParameterTypeCd: string;
  SortOrder: number;
  UnitCode: string;
  ValidationRule?: string;
  unit: Units;
  filteredSetParameters: FilteredSetParameter[];
}

export interface QcReferenceValueType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description?: string;
  IsDefaultInd: boolean;
  QCReferenceValueTypeId: string;
  SortOrder: number;
  qcReferenceValues: QcReferenceValue[];
}

export interface QcReferenceValue {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Element: string;
  GenericMethod: string;
  StandardId: string;
  ExpectedOutlier?: number;
  ExpectedStDev?: number;
  ExpectedValue?: number;
  Preferred: number;
  QCReferenceValueId: string;
  Units: string;
  ValueType: string;
  units: Units;
  valueType: QcReferenceValueType;
}

export interface ReportingClassification {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  ReportingClassificationId: string;
  SortOrder: number;
  reportingTypes: ReportingType[];
}

export interface Department {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  DepartmentId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  reportingTypes: ReportingType[];
}

export interface ReportingType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Classification: string;
  CodeGroup: string;
  Description: string;
  IsDefaultInd: boolean;
  IsGrade: boolean;
  ReportingTypeId: string;
  SortOrder: number;
  UnitCode: string;
  classification: ReportingClassification;
  codeGroup: Department;
  unit: Units;
}

export interface CoreQuality {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  CoreQualityId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface StructFillTexture {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  Ja_Rating: number;
  JaRatingMed?: number;
  JaRatingThick?: number;
  JaRatingThin?: number;
  SortOrder: number;
  StructFillTextureId: string;
  rockMechanicLogs: RockMechanicLog[];
}

export interface StructFillThickness {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  StructFillThicknessId: string;
  rockMechanicLogs: RockMechanicLog[];
}

export interface ShearAspect {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  ShearAspectId: string;
  SortOrder: number;
  shearLogs: ShearLog[];
}

export interface AltInt {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  AltIntId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
}

export interface MinInt {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  MinIntId: string;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
}

export interface ClastComp {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  ClastCompId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
}

export interface ClastDistribution {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  ClastDistributionId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
}

export interface ColourCode {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  ColourCodeId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
  ptGeologyLogs: PtGeologyLog[];
}

export interface Compgrp {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  COMPGRPId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
}

export interface ContactRelation {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  ContactRelationId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
}

export interface Glvc3TSource {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  GLVC3TSourceId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
}

export interface LithGrainsize {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  LithGrainsizeId: string;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
  ptGeologyLogs: PtGeologyLog[];
}

export interface CodingSystem {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  CodingSystemId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  lithologys: Lithology[];
}

export interface ParentCode {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  ParentCodeId: string;
  SortOrder: number;
  lithologys: Lithology[];
}

export interface MapSurface {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  CreatedOn: string;
  Description: string;
  IsDefaultInd: boolean;
  MapSurfaceId: string;
  SortOrder: number;
  ptMappingLogs: PtMappingLog[];
}

export interface PtMappingLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: PtMappingLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: PtMappingLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization: string;
  PtMappingLogId: string;
  DataSource: string;
  Dip?: number;
  Dip_Direction?: number;
  DiscoverCd?: string;
  Lith1Cd: string;
  MappedBy: string;
  /** @format date-time */
  MappedDt?: string;
  MapSurface: string;
  PtLoggingEventId: string;
  Strike?: number;
  StructureType: string;
  lith1Cd: Lithology;
  mappedBy: Person;
  mapSurface: MapSurface;
  ptLoggingEvent: PtLoggingEvent;
  structureType: StructType;
}

export interface SgDryMethod {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SGDryMethodId: string;
  SortOrder: number;
  specificGravityPtLogs: SpecificGravityPtLog[];
}

export interface SgMethod {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SGMethodId: string;
  SortOrder: number;
  specificGravityPtLogs: SpecificGravityPtLog[];
}

export interface Weathering {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  WeatheringId: string;
  geologyCombinedLogs: GeologyCombinedLog[];
  ptGeologyLogs: PtGeologyLog[];
  rockMechanicLogs: RockMechanicLog[];
  specificGravityPtLogs: SpecificGravityPtLog[];
}

export interface SpecificGravityPtLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: SpecificGravityPtLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: SpecificGravityPtLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SpecificGravityPtLogId: string;
  CollarId: string;
  Comments?: string;
  DataSource: string;
  Depth: number;
  Diameter?: number;
  DiameterUnitCode: string;
  Dried: string;
  Length?: number;
  LengthUnitCode: string;
  Lithology: string;
  LoggingEventId: string;
  MeasuredBy: string;
  /** @format date-time */
  MeasuredDt?: string;
  Organization: string;
  Priority: number;
  Reading?: number;
  SampleType: string;
  SGMethod: string;
  UnitCode: string;
  Weather: string;
  WeightDry?: number;
  WeightUnitCode: string;
  WeightWet?: number;
  collar: Collar;
  diameterUnit: Units;
  dried: SgDryMethod;
  lengthUnit: Units;
  lithology: Lithology;
  loggingEvent: LoggingEvent;
  measuredBy: Person;
  organization: Organization;
  rowStatus: RowStatus;
  sampleType: SampleType;
  sgMethod: SgMethod;
  unit: Units;
  weather: Weathering;
  weightUnit: Units;
}

export interface Lithology {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  CodingSystem: string;
  COMPGRP?: string;
  Description: string;
  DESDOM?: string;
  GLVC?: number;
  Group?: string;
  IsDefaultInd: boolean;
  LithologyId: string;
  ParentCd: string;
  SortOrder: number;
  codingSystem: CodingSystem;
  parentCd: ParentCode;
  geologyCombinedLogs: GeologyCombinedLog[];
  ptGeologyLogs: PtGeologyLog[];
  ptMappingLogs: PtMappingLog[];
  rockMechanicLogs: RockMechanicLog[];
  specificGravityPtLogs: SpecificGravityPtLog[];
  structurePtLogs: StructurePtLog[];
}

export interface MagInt {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  MagIntId: string;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
}

export interface MatrixComp {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  MatrixCompId: string;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
}

export interface MinCode {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  IsSulphide: boolean;
  MinCodeId: string;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
  ptGeologyLogs: PtGeologyLog[];
  rockMechanicLogs: RockMechanicLog[];
  structurePtLogs: StructurePtLog[];
}

export interface ProtolithCode {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  ProtolithCodeId: string;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
}

export interface MinStyle {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  MinStyleId: string;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
  ptGeologyLogs: PtGeologyLog[];
}

export interface LithTexture {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  LithTextureId: string;
  SortOrder: number;
  geologyCombinedLogs: GeologyCombinedLog[];
  ptGeologyLogs: PtGeologyLog[];
}

export interface VeinStyle {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  VeinStyleId: string;
  geologyCombinedLogs: GeologyCombinedLog[];
  ptGeologyLogs: PtGeologyLog[];
}

export interface GeologyCombinedLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: GeologyCombinedLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: GeologyCombinedLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  GeologyCombinedLogId: string;
  AC: string;
  AltAlbite: string;
  AltBiotite: string;
  AltCarbonate: string;
  AltChlorite: string;
  AltEpidote: string;
  AltHematite: string;
  AltLimonite: string;
  AltMagnetite: string;
  AltPyrite: string;
  AltSericite: string;
  AltSilica: string;
  APY: string;
  BQP?: number;
  CA: string;
  CD: string;
  CF: string;
  ClastComp: string;
  ClastDistribution: string;
  CollarId: string;
  Colour: string;
  Comments?: string;
  COMPGRP: string;
  COMPGRPLookup: string;
  ContactRelation: string;
  ContactTag?: string;
  Cp: string;
  DepthFrom: number;
  DepthTo: number;
  GLVC?: number;
  GLVC3TSource: string;
  GR: string;
  GrainSize: string;
  IntervalLength?: number;
  JsonData?: string;
  Lithology: string;
  LithoSuperGr?: string;
  /** @format date-time */
  LoggedDt: string;
  LoggingEventId: string;
  Mag: string;
  MatrixComp: string;
  MatrixCompSecondary?: string;
  Midpoint?: number;
  MinPot?: number;
  MSVN_Pct?: number;
  MSVN_Thickness_cm?: number;
  Organization: string;
  Other: string;
  Other_pct?: number;
  Po: string;
  Po_MUD?: string;
  PQC?: number;
  Protolith: string;
  Py: string;
  PyGr: string;
  PyMode?: string;
  PyMode1: string;
  PyMode2: string;
  Q: string;
  QC?: number;
  QPC?: number;
  QT?: number;
  QuickLogInd: boolean;
  SC: string;
  SE: string;
  SI: string;
  Structure: string;
  Texture: string;
  TUR: string;
  Type_MSVN?: string;
  Vein1_Pct?: number;
  Vein1_Thickness_cm?: number;
  Vein2_Pct?: number;
  Vein2_Thickness_cm?: number;
  Vein3_Pct?: number;
  Vein3_Thickness_cm?: number;
  Vein4_Pct?: number;
  Vein4_Thickness_cm?: number;
  Vein5_Pct?: number;
  Vein5_Thickness_cm?: number;
  Vein6_Pct?: number;
  Vein6_Thickness_cm?: number;
  VeinMin: string;
  VeinMode: string;
  VeinPct?: number;
  VeinText?: string;
  VG?: boolean;
  Weathering: string;
  ac: AltInt;
  altAlbite: AltInt;
  altBiotite: AltInt;
  altCarbonate: AltInt;
  altChlorite: AltInt;
  altEpidote: AltInt;
  altHematite: AltInt;
  altLimonite: AltInt;
  altMagnetite: AltInt;
  altPyrite: AltInt;
  altSericite: AltInt;
  altSilica: AltInt;
  apy: MinInt;
  ca: AltInt;
  cd: AltInt;
  cf: AltInt;
  clastComp: ClastComp;
  clastDistribution: ClastDistribution;
  collar: Collar;
  colour: ColourCode;
  compgrp: Compgrp;
  compgrpLookup: Compgrp;
  contactRelation: ContactRelation;
  cp: MinInt;
  glvc3TSource: Glvc3TSource;
  gr: MinInt;
  grainSize: LithGrainsize;
  lithology: Lithology;
  loggingEvent: LoggingEvent;
  mag: MagInt;
  matrixComp: MatrixComp;
  organization: LoggingEvent;
  other: MinCode;
  po: MinInt;
  protolith: ProtolithCode;
  py: MinInt;
  pyGr: LithGrainsize;
  pyMode1: MinStyle;
  pyMode2: MinStyle;
  q: MinInt;
  rowStatus: RowStatus;
  sc: AltInt;
  se: MinInt;
  si: AltInt;
  structure: StructType;
  texture: LithTexture;
  tur: MinInt;
  veinMin: MinCode;
  veinMode: VeinStyle;
  weathering: Weathering;
}

export interface FaultId {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  FaultIdId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  structureLogs: StructureLog[];
}

export interface KinematicIndicator {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  KinematicIndicatorId: string;
  SortOrder: number;
  structureLogs: StructureLog[];
}

export interface StructLineationType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  StructLineationTypeId: string;
  structureLogs: StructureLog[];
}

export interface MovementSense {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  MovementSenseId: string;
  SortOrder: number;
  structureLogs: StructureLog[];
  structurePtLogs: StructurePtLog[];
}

export interface StructPlaneType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  StructPlaneTypeId: string;
  structureLogs: StructureLog[];
}

export interface StructClass {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  StructClassId: string;
  structureLogs: StructureLog[];
}

export interface YoungingIndicator {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  YoungingIndicatorId: string;
  structureLogs: StructureLog[];
}

export interface StructureLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: StructureLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: StructureLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarId: string;
  DataSource: string;
  DepthFrom: number;
  DepthTo: number;
  FaultId: string;
  IntervalLength?: number;
  KinematicIndicator: string;
  Lineation_Delta?: number;
  Lineation_Plunge?: number;
  Lineation_Trend?: number;
  LineationType: string;
  LoggingEventId: string;
  MovementSense: string;
  Organization: string;
  Plane_Azimuth?: number;
  Plane_Dip?: number;
  Plane_Intensity: string;
  PlaneType: string;
  Priority: number;
  StructureClass: string;
  StructureLogId: string;
  StructureType: string;
  Validated: boolean;
  ValidatedBy: string;
  YoungingIndicator: string;
  collar: Collar;
  fault: FaultId;
  kinematicIndicator: KinematicIndicator;
  lineationType: StructLineationType;
  loggingEvent: LoggingEvent;
  movementSense: MovementSense;
  organization: Organization;
  planeIntensity: Intensity;
  planeType: StructPlaneType;
  rowStatus: RowStatus;
  structureClass: StructClass;
  structureType: StructType;
  validatedBy: Person;
  youngingIndicator: YoungingIndicator;
}

export interface StructType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  StructTypeId: string;
  geologyCombinedLogs: GeologyCombinedLog[];
  ptGeologyLogs: PtGeologyLog[];
  ptMappingLogs: PtMappingLog[];
  rockMechanicLogs: RockMechanicLog[];
  shearLogs: ShearLog[];
  structureLogs: StructureLog[];
  structurePtLogs: StructurePtLog[];
}

export interface ShearLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: ShearLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: ShearLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  ShearLogId: string;
  CollarId: string;
  Comments?: string;
  DataSource: string;
  DepthFrom: number;
  DepthTo: number;
  IntervalLength?: number;
  LoggingEventId: string;
  Organization: string;
  Priority: number;
  SZ_Alpha?: number;
  SZ_Alt: string;
  SZ_Aspect: string;
  SZ_Dip?: number;
  SZ_Strike?: number;
  SZ_Struc: string;
  collar: Collar;
  loggingEvent: LoggingEvent;
  organization: Organization;
  rowStatus: RowStatus;
  szAlt: AltCode;
  szAspect: ShearAspect;
  szStruc: StructType;
}

export interface AltCode {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  AltCodeId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  ptGeologyLogs: PtGeologyLog[];
  rockMechanicLogs: RockMechanicLog[];
  shearLogs: ShearLog[];
  structurePtLogs: StructurePtLog[];
}

export interface AltStyle {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  AltStyleId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  ptGeologyLogs: PtGeologyLog[];
}

export interface ColourTone {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  ColourToneId: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  ptGeologyLogs: PtGeologyLog[];
}

export interface LithRegOvpt {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  LithRegOvptId: string;
  SortOrder: number;
  ptGeologyLogs: PtGeologyLog[];
}

export interface VeinCode {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  VeinCodeId: string;
  ptGeologyLogs: PtGeologyLog[];
}

export interface PtGeologyLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: PtGeologyLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: PtGeologyLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization: string;
  PtGeologyLogId: string;
  Alt_Code: string;
  Alt_Int: string;
  Alt_Style: string;
  Comments?: string;
  DataSource: string;
  Dip?: number;
  JsonData?: string;
  Lith_Code: string;
  Lith_Colour_1: string;
  Lith_Colour_2: string;
  Lith_Colour_Tone: string;
  Lith_Grainsize: string;
  Lith_Structure: string;
  Lith_Texture: string;
  LoggedBy: string;
  /** @format date-time */
  LoggedDt?: string;
  Min_Code: string;
  Min_pct?: number;
  Min_Style: string;
  Priority: number;
  PtLoggingEventId: string;
  RegoLithologyProfile: string;
  Strike?: number;
  Sulph_Code: string;
  Sulph_pct?: number;
  Sulph_Style: string;
  Vein_Code: string;
  Vein_pct?: number;
  Vein_Style: string;
  Weathering: string;
  alt: AltCode;
  altInt: Intensity;
  altStyle: AltStyle;
  lith: Lithology;
  lithColour_1: ColourCode;
  lithColour_2: ColourCode;
  lithColourTone: ColourTone;
  lithGrainsize: LithGrainsize;
  lithStructure: StructType;
  lithTexture: LithTexture;
  loggedBy: Person;
  min: MinCode;
  minStyle: MinStyle;
  ptLoggingEvent: PtLoggingEvent;
  regoLithologyProfile: LithRegOvpt;
  sulph: MinCode;
  sulphStyle: MinStyle;
  vein: VeinCode;
  veinStyle: VeinStyle;
  weathering: Weathering;
}

export interface Intensity {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Alteration: boolean;
  Description: string;
  IntensityId: string;
  IsDefaultInd: boolean;
  Mineral: boolean;
  Oxidation: boolean;
  Plane: boolean;
  SortOrder: number;
  Structure: boolean;
  Weathering: boolean;
  ptGeologyLogs: PtGeologyLog[];
  rockMechanicLogs: RockMechanicLog[];
  structureLogs: StructureLog[];
  structurePtLogs: StructurePtLog[];
}

export interface FacingDirection {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  FacingDirectionId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  structurePtLogs: StructurePtLog[];
}

export interface FractureStyle {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  FractureStyleId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  structurePtLogs: StructurePtLog[];
}

export interface Glvc {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  GLVCId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  structurePtLogs: StructurePtLog[];
}

export interface StructRoughness {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  StructRoughnessId: string;
  rockMechanicLogs: RockMechanicLog[];
  structurePtLogs: StructurePtLog[];
}

export interface StructShape {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  StructShapeId: string;
  structurePtLogs: StructurePtLog[];
}

export interface LineamentType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  LineamentTypeId: string;
  SortOrder: number;
  structurePtLogs: StructurePtLog[];
}

export interface ParageneticStage {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  ParageneticStageId: string;
  SortOrder: number;
  structurePtLogs: StructurePtLog[];
}

export interface Relog {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  RelogId: string;
  SortOrder: number;
  structurePtLogs: StructurePtLog[];
}

export interface StructPtMethod {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  StructPTMethodId: string;
  structurePtLogs: StructurePtLog[];
}

export interface StructPtQuality {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  StructPTQualityId: string;
  structurePtLogs: StructurePtLog[];
}

export interface VeinTexture {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  VeinTextureId: string;
  structurePtLogs: StructurePtLog[];
}

export interface Vergence {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  VergenceId: string;
  structurePtLogs: StructurePtLog[];
}

export interface StructWallRockCompetency {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  Ja_Rating: number;
  SortOrder: number;
  StructWallRockCompetencyId: string;
  rockMechanicLogs: RockMechanicLog[];
  structurePtLogs: StructurePtLog[];
}

export interface StructZone {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  StructZoneId: string;
  structurePtLogs: StructurePtLog[];
}

export interface StructurePtLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: StructurePtLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: StructurePtLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization: string;
  StructurePtLogId: string;
  Albite: string;
  Alpha?: number;
  Alt1Cd: string;
  Alt2Cd: string;
  Azimuth?: number;
  Beta?: number;
  Biotite: string;
  CarboNationale: string;
  Chlorite: string;
  Comments?: string;
  DataSource: string;
  Depth: number;
  Dip_Calc?: number;
  Dip_Dir_Calc?: number;
  FacingDirection: string;
  FractureStyle: string;
  GLVC: string;
  Hematite: string;
  Intensity: string;
  Joint_Fill_Coating: string;
  JointApertureWidth?: number;
  JointFiLatitudeLongitudeMin: string;
  JointRoughness: string;
  JointShape: string;
  Lineament_Gamma?: number;
  LineamentType: string;
  LithCd: string;
  LoggingEventId: string;
  Magnetite: string;
  Min1Cd: string;
  Min2Cd: string;
  OrientationQuality: string;
  ParageneticStage: string;
  Plunge?: number;
  Priority: number;
  Pyrite: string;
  Relog: string;
  RL_Dip?: number;
  RL_Dip_Dir?: number;
  SelvedgeWidth?: number;
  Sericite: string;
  ShearSense: string;
  Silica: string;
  StructurePointMethod: string;
  StructurePointQuality: string;
  StructureType: string;
  VeinTexture: string;
  VeinWidth?: number;
  Vergence: string;
  WaLatitudeLongitudeRockStrength: string;
  WidthUnitCode: string;
  Zone: string;
  ZoneFrom?: number;
  ZoneTo?: number;
  ZoneWidth?: number;
  albite: Intensity;
  alt1Cd: AltCode;
  alt2Cd: AltCode;
  biotite: Intensity;
  carboNationale: Intensity;
  chlorite: Intensity;
  facingDirection: FacingDirection;
  fractureStyle: FractureStyle;
  glvc: Glvc;
  hematite: Intensity;
  intensity: Intensity;
  jointFillCoating: StructFillType;
  jointFiLatitudeLongitudeMin: MinCode;
  jointRoughness: StructRoughness;
  jointShape: StructShape;
  lineamentType: LineamentType;
  lithCd: Lithology;
  loggingEvent: LoggingEvent;
  magnetite: Intensity;
  min1Cd: MinCode;
  min2Cd: MinCode;
  orientationQuality: OrientationQuality;
  parageneticStage: ParageneticStage;
  pyrite: Intensity;
  relog: Relog;
  rowStatus: RowStatus;
  sericite: Intensity;
  shearSense: MovementSense;
  silica: Intensity;
  structurePointMethod: StructPtMethod;
  structurePointQuality: StructPtQuality;
  structureType: StructType;
  veinTexture: VeinTexture;
  vergence: Vergence;
  waLatitudeLongitudeRockStrength: StructWallRockCompetency;
  widthUnit: Units;
  zone: StructZone;
}

export interface StructFillType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  StructFillTypeId: string;
  rockMechanicLogs: RockMechanicLog[];
  structurePtLogs: StructurePtLog[];
}

export interface GroundWaterIndication {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  GroundWaterIndicationId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface GeotHardness {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  GeotHardnessId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface IntactRockStrength {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IntactRockStrengthId: string;
  IRSValue: number;
  IsDefaultInd: boolean;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface GeotJn {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  GeotJnId: string;
  IsDefaultInd: boolean;
  Jn_Rating: number;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface GeotJr {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  GeotJrId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface GeotJw {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  GeotJwId: string;
  IsDefaultInd: boolean;
  Jw_Rating: number;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface GeotMacroRoughness {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  GeotMacroRoughnessId: string;
  IsDefaultInd: boolean;
  Jr_Rating: number;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface GeotMatrix {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  GeotMatrixId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface GeotMicroRoughness {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  GeotMicroRoughnessId: string;
  IsDefaultInd: boolean;
  Jr_Rating: number;
  JrRatingDry: number;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface OpenJointSets {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  OpenJointSetsId: string;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface GeotPersistence {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  GeotPersistenceId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface GeotJa {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  GeotJaId: string;
  IsDefaultInd: boolean;
  Ja_Rating: number;
  NoWaLatitudeLongitudeContact: boolean;
  SomeWaLatitudeLongitudeContact: boolean;
  SortOrder: number;
  WaLatitudeLongitudeContact: boolean;
  rockMechanicLogs: RockMechanicLog[];
}

export interface GeotSrf {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  GeotSRFId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  SRF_Rating: number;
  StressGT200: boolean;
  StressLT001: boolean;
  rockMechanicLogs: RockMechanicLog[];
}

export interface GeotRockMassDomain {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  GeotRockMassDomainId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface RockMassFabric {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  RockMassFabricId: string;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface GeotStrength {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  GeotStrengthId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  rockMechanicLogs: RockMechanicLog[];
}

export interface StructAngleSet {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  StructAngleSetId: string;
  rockMechanicLogs: RockMechanicLog[];
}

export interface StructSpacing {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  StructSpacingId: string;
  rockMechanicLogs: RockMechanicLog[];
}

export interface StructWallContactType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  StructWallContactTypeId: string;
  rockMechanicLogs: RockMechanicLog[];
}

export interface RockMechanicLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: RockMechanicLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: RockMechanicLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  RockMechanicLogId: string;
  Alpha?: number;
  Beta?: number;
  CollarId: string;
  CoreQuality: string;
  DataSource: string;
  DepthFrom: number;
  DepthTo: number;
  FiLatitudeLongitudeTexture: string;
  FiLatitudeLongitudeThickness: string;
  FiLatitudeLongitudeType: string;
  Fill_Min1: string;
  Fill_Min2: string;
  GroundWaterIndication: string;
  Hardness: string;
  HighAngle_60_90?: number;
  IntactRockStrengthStrong: string;
  IntactRockStrengthWeak?: string;
  IntervalLength?: number;
  Jn: string;
  Jr: string;
  JsonData?: string;
  Jw: string;
  Lithology: string;
  LoggedBy: string;
  /** @format date-time */
  LoggedDt?: string;
  LoggingEventId: string;
  LongestPieceLengthUnitCode: string;
  LowAngle_0_30?: number;
  MacroRoughness: string;
  Matrix_Interval?: number;
  MatrixType: string;
  MicroRoughness: string;
  ModAngle_30_60?: number;
  OJ_Count?: number;
  OpenJointSets: string;
  Organization: string;
  Persistence: string;
  Priority: number;
  QJa: string;
  QJn: string;
  QJr: string;
  QJw: string;
  QSRF: string;
  RC_Weak_pct?: number;
  Recovery_Interval?: number;
  Recovery_pct?: number;
  RockMassDomain: string;
  RockMassFabric: string;
  RQD_Deere_pct?: number;
  RQD_Interval?: number;
  RQD_pct?: number;
  Solid_Recovery_Interval?: number;
  Solid_Recovery_pct?: number;
  Strength: string;
  Struct_Freq_Per_Unit_Adj?: number;
  StructureAngleSet: string;
  StructureInt: string;
  StructureRoughness: string;
  StructureSpacing: string;
  StructureType: string;
  SubSampled: boolean;
  Total_Core_Recovery_pct?: number;
  WaLatitudeLongitudeContactType: string;
  WaLatitudeLongitudeRockAltCd: string;
  WaLatitudeLongitudeRockAltInt: string;
  WaLatitudeLongitudeRockCompetency: string;
  WeatheringStrong: string;
  WeatheringWeak: string;
  collar: Collar;
  coreQuality: CoreQuality;
  fiLatitudeLongitudeTexture: StructFillTexture;
  fiLatitudeLongitudeThickness: StructFillThickness;
  fiLatitudeLongitudeType: StructFillType;
  fillMin1: MinCode;
  fillMin2: MinCode;
  groundWaterIndication: GroundWaterIndication;
  hardness: GeotHardness;
  intactRockStrengthStrong: IntactRockStrength;
  jn: GeotJn;
  jr: GeotJr;
  jw: GeotJw;
  lithology: Lithology;
  loggedBy: Person;
  loggingEvent: LoggingEvent;
  longestPieceLengthUnit: Units;
  macroRoughness: GeotMacroRoughness;
  matrixType: GeotMatrix;
  microRoughness: GeotMicroRoughness;
  openJointSets: OpenJointSets;
  organization: Organization;
  persistence: GeotPersistence;
  qJa: GeotJa;
  qJn: GeotJn;
  qJr: GeotJr;
  qJw: GeotJw;
  qsrf: GeotSrf;
  rockMassDomain: GeotRockMassDomain;
  rockMassFabric: RockMassFabric;
  rowStatus: RowStatus;
  strength: GeotStrength;
  structureAngleSet: StructAngleSet;
  structureInt: Intensity;
  structureRoughness: StructRoughness;
  structureSpacing: StructSpacing;
  structureType: StructType;
  waLatitudeLongitudeContactType: StructWallContactType;
  waLatitudeLongitudeRockAltCd: AltCode;
  waLatitudeLongitudeRockAltInt: Intensity;
  waLatitudeLongitudeRockCompetency: StructWallRockCompetency;
  weatheringStrong: Weathering;
  weatheringWeak: Weathering;
}

export interface Units {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  UnitCode: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  UnitDescription?: string;
  UnitsId: string;
  UnitType: string;
  unitType: UnitType;
  assays: Assay[];
  assayElements: AssayElement[];
  assayLabMethods: AssayLabMethod[];
  casingSizes: CasingSize[];
  parameterTypes: ParameterType[];
  ptSamples: PtSample[];
  qcReferenceValues: QcReferenceValue[];
  reportingTypes: ReportingType[];
  rockMechanicLogs: RockMechanicLog[];
  rockQualityDesignationLogs: RockQualityDesignationLog[];
  samples: Sample[];
  sampleQcs: SampleQc[];
  sites: Site[];
  specificGravityPtLogs: SpecificGravityPtLog[];
  structurePtLogs: StructurePtLog[];
  xrfs: Xrf[];
  xrfSamples: XrfSample[];
}

export interface RockQualityDesignationLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: RockQualityDesignationLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: RockQualityDesignationLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  RockQualityDesignationLogId: string;
  CollarId: string;
  Comments?: string;
  DataSource: string;
  DepthFrom: number;
  DepthTo: number;
  IntervalLength?: number;
  JsonData?: string;
  LoggedBy: string;
  /** @format date-time */
  LoggedDt?: string;
  LoggingEventId: string;
  LongestPieceLengthUnitCode: string;
  Organization: string;
  OrientationQuality: string;
  Priority: number;
  Relog: boolean;
  RQD_Interval?: number;
  RQD_pct?: number;
  StructureCount: number;
  SumSolidCore?: number;
  collar: Collar;
  loggedBy: Person;
  loggingEvent: LoggingEvent;
  longestPieceLengthUnit: Units;
  organization: Organization;
  orientationQuality: OrientationQuality;
  rowStatus: RowStatus;
}

export interface OrientationQuality {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  OrientationQualityId: string;
  SortOrder: number;
  coreRecoveryRunLogs: CoreRecoveryRunLog[];
  fractureCountLogs: FractureCountLog[];
  rockQualityDesignationLogs: RockQualityDesignationLog[];
  structurePtLogs: StructurePtLog[];
}

export interface OrientationType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  OrientationTypeId: string;
  SortOrder: number;
  fractureCountLogs: FractureCountLog[];
}

export interface FractureCountLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: FractureCountLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: FractureCountLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  FractureCountLogId: string;
  Alignment: string;
  CollarId: string;
  Comments?: string;
  DataSource: string;
  DepthFrom: number;
  DepthTo: number;
  Emboitement: string;
  FractureCount?: number;
  IntervalLength?: number;
  JsonData?: string;
  LineQuality: string;
  LoggedBy: string;
  /** @format date-time */
  LoggedDt?: string;
  LoggingEventId: string;
  Method?: string;
  Organization: string;
  OrientationQuality: string;
  OrientationType: string;
  Priority: number;
  alignment: FractureCountAlignment;
  collar: Collar;
  emboitement: FractureCountEmboitement;
  lineQuality: FractureCountLineQuality;
  loggedBy: Person;
  loggingEvent: LoggingEvent;
  organization: Organization;
  orientationQuality: OrientationQuality;
  orientationType: OrientationType;
  rowStatus: RowStatus;
}

export interface DownHoleSurveyMethod {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  DownHoleSurveyMethodId: string;
  IsDefaultInd: boolean;
  Priority: number;
  SortOrder: number;
  surveyLogs: SurveyLog[];
}

export interface Survey {
  ReportIncludeInd?: boolean;
  ValidationStatus?: SurveyValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: SurveyRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SurveyId: string;
  CollarId: string;
  Organization: string;
  SurveyNm?: string;
  collar: Collar;
  organization: Organization;
  rowStatus: RowStatus;
  surveyLogs: SurveyLog[];
}

export interface SurveyReliability {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  SurveyReliabilityId: string;
  surveyLogs: SurveyLog[];
}

export interface SurveyLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: SurveyLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: SurveyLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SurveyLogId: string;
  AzimuthDeviation?: number;
  AzimuthMagnetic?: number;
  AzimuthMagneticReversed?: number;
  AzimuthUTM?: number;
  AzimuthUTMField?: number;
  Comments?: string;
  DataSource: string;
  Depth: number;
  Deviation?: string;
  Dip?: number;
  DipDeviation?: number;
  DownHoleSurveyMethod: string;
  Grid: string;
  LoggingEventId: string;
  MagneticFieldStrength?: number;
  MagneticInclination?: number;
  MagneticStatus?: string;
  Organization: string;
  SurveyCompany: string;
  /** @format date-time */
  SurveyedOnDt?: string;
  SurveyId: string;
  SurveyInstrument: string;
  SurveyOperator: string;
  SurveyReliability: string;
  Validation?: boolean;
  downHoleSurveyMethod: DownHoleSurveyMethod;
  gr: Grid;
  loggingEvent: LoggingEvent;
  rowStatus: RowStatus;
  surveyCompany: Company;
  survey: Survey;
  surveyInstrument: Instrument;
  surveyOperator: Person;
  surveyReliability: SurveyReliability;
}

export interface LoggingEvent {
  ReportIncludeInd?: boolean;
  ValidationStatus?: LoggingEventValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: LoggingEventRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  LoggingEventId: string;
  Organization: string;
  DataSource: string;
  LoggedBy: string;
  /** @format date-time */
  LoggedOnDt: string;
  LoggingEventRef: string;
  LoggingEventType: string;
  LoggingReason?: string;
  PreviousLoggingEventId?: string;
  loggedBy: Person;
  loggingEventType: LoggingEventType;
  coreRecoveryRunLogs: CoreRecoveryRunLog[];
  fractureCountLogs: FractureCountLog[];
  geologyCombinedLogs: GeologyCombinedLog[];
  magSusLogs: MagSusLog[];
  metaDataLogs: MetaDataLog[];
  rockMechanicLogs: RockMechanicLog[];
  rockQualityDesignationLogs: RockQualityDesignationLog[];
  shearLogs: ShearLog[];
  specificGravityPtLogs: SpecificGravityPtLog[];
  structureLogs: StructureLog[];
  structurePtLogs: StructurePtLog[];
  surveyLogs: SurveyLog[];
}

export interface LoggingEventType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  LoggingEventTypeId: string;
  SortOrder: number;
  loggingEvents: LoggingEvent[];
  ptLoggingEvents: PtLoggingEvent[];
}

export interface PtLoggingEvent {
  ReportIncludeInd?: boolean;
  ValidationStatus?: PtLoggingEventValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: PtLoggingEventRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization: string;
  PtLoggingEventId: string;
  DataSource: string;
  LoggedByGeologist?: string;
  /** @format date-time */
  LoggedOn: string;
  LoggingEventRef: string;
  LoggingEventType: string;
  LoggingReason?: string;
  PreviousLoggingEventId?: string;
  PriorityStatus: string;
  SiteId: string;
  loggingEventType: LoggingEventType;
  site: Site;
  ptGeologyLogs: PtGeologyLog[];
  ptMagSusLogs: PtMagSusLog[];
  ptMappingLogs: PtMappingLog[];
}

export interface PtMagSusLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: PtMagSusLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: PtMagSusLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization: string;
  PtMagSusLogId: string;
  Ave_Reading_SI?: number;
  DataSource: string;
  Instrument: string;
  InstrumentFactorCode: string;
  MagSus_SI?: number;
  PtLoggingEventId: string;
  ReadBy: string;
  /** @format date-time */
  ReadDt?: string;
  Reading1_SI?: number;
  Reading2_SI?: number;
  Reading3_SI?: number;
  SampleType: string;
  instrument: Instrument;
  instrumentFactor: MagSusFactor;
  ptLoggingEvent: PtLoggingEvent;
  readBy: Person;
  sampleType: SampleType;
}

export interface Instrument {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  InstrumentId: string;
  InstrumentType: string;
  IsDefaultInd: boolean;
  Priority: number;
  SortOrder: number;
  instrumentType: InstrumentType;
  magSusLogs: MagSusLog[];
  ptMagSusLogs: PtMagSusLog[];
  siteCoordinates: SiteCoordinate[];
  surveyLogs: SurveyLog[];
}

export interface MagSusLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: MagSusLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: MagSusLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  MagSusLogId: string;
  Organization: string;
  Ave_Reading_SI?: number;
  CalibreCheck?: string;
  CollarId: string;
  Comments?: string;
  DataSource: string;
  DepthFrom: number;
  DepthTo: number;
  Duplicate_Reading?: number;
  HoleDiameter: string;
  Instrument: string;
  InstrumentFactorCode: string;
  IntervalLength?: number;
  LoggingEventId: string;
  MagSus_SI?: number;
  Priority?: number;
  ReadBy: string;
  /** @format date-time */
  ReadDt?: string;
  Reading1_SI?: number;
  Reading2_SI?: number;
  Reading3_SI?: number;
  Reading4_SI?: number;
  SampleType: string;
  collar: Collar;
  holeDiameter: HoleDiameter;
  instrument: Instrument;
  instrumentFactor: MagSusFactor;
  loggingEvent: LoggingEvent;
  readBy: Person;
  rowStatus: RowStatus;
  sampleType: SampleType;
}

export interface SampleType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  BULK: boolean;
  Description: string;
  DH: boolean;
  FS: boolean;
  IsDefaultInd: boolean;
  LS: boolean;
  PET: boolean;
  PRO: boolean;
  PT: boolean;
  SampleTypeId: string;
  SortOrder: number;
  XRF: boolean;
  drillMethods: DrillMethod[];
  magSusLogs: MagSusLog[];
  ptMagSusLogs: PtMagSusLog[];
  ptSamples: PtSample[];
  ptSampleQcs: PtSampleQc[];
  samples: Sample[];
  sampleQcs: SampleQc[];
  specificGravityPtLogs: SpecificGravityPtLog[];
  standardSamples: StandardSample[];
  xrfSamples: XrfSample[];
  xrfSampleQcs: XrfSampleQc[];
  xrfStandardSamples: XrfStandardSample[];
}

export interface DrillMethod {
  ReportIncludeInd?: boolean;
  ValidationStatus?: DrillMethodValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: DrillMethodRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillMethodId: string;
  CollarId: string;
  Comments?: string;
  DepthFrom: number;
  DepthTo: number;
  DrillCompany: string;
  Driller1?: string;
  Driller2?: string;
  DrillRigType: string;
  DrillSize: string;
  DrillType: string;
  /** @format date-time */
  EndDt?: string;
  Organization: string;
  SampleType: string;
  /** @format date-time */
  StartDt?: string;
  collar: Collar;
  drillCompany: Machinery;
  drillRigType: Machinery;
  drillSize: DrillSize;
  drillType: DrillType;
  organization: Organization;
  rowStatus: RowStatus;
  sampleType: SampleType;
}

export interface RowStatus {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: number;
  Description: string;
  IsDefaultInd: boolean;
  RowStatusId: string;
  SortOrder: number;
  collars: Collar[];
  collarCoordinates: CollarCoordinate[];
  coreRecoveryRunLogs: CoreRecoveryRunLog[];
  cycloneCleanings: CycloneCleaning[];
  drillMethods: DrillMethod[];
  fractureCountLogs: FractureCountLog[];
  geologyCombinedLogs: GeologyCombinedLog[];
  magSusLogs: MagSusLog[];
  metaDataLogs: MetaDataLog[];
  ptSamples: PtSample[];
  ptSampleQcs: PtSampleQc[];
  rigSetups: RigSetup[];
  rockMechanicLogs: RockMechanicLog[];
  rockQualityDesignationLogs: RockQualityDesignationLog[];
  samples: Sample[];
  sampleQcs: SampleQc[];
  sampleRegisters: SampleRegister[];
  shearLogs: ShearLog[];
  specificGravityPtLogs: SpecificGravityPtLog[];
  standardSampleQcs: StandardSampleQc[];
  structureLogs: StructureLog[];
  structurePtLogs: StructurePtLog[];
  surveys: Survey[];
  surveyLogs: SurveyLog[];
  xrfSamples: XrfSample[];
  xrfSampleQcs: XrfSampleQc[];
}

export interface CycloneCleaning {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CycloneCleaningValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CycloneCleaningRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarId: string;
  Depth: number;
  Organization: string;
  Rod_Number: number;
  Comments?: string;
  CycloneCleaningId: string;
  DataSource: string;
  DriLatitudeLongitudeOperator: string;
  LoggedBy: string;
  /** @format date-time */
  LoggedDt?: string;
  driLatitudeLongitudeOperator: Person;
  loggedBy: Person;
  rowStatus: RowStatus;
}

export interface Person {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Company: string;
  Description: string;
  Email?: string;
  IsDefaultInd: boolean;
  PersonId: string;
  PersonType: string;
  SortOrder: number;
  company: Company;
  personType: PersonType;
  collars: Collar[];
  coreRecoveryRunLogs: CoreRecoveryRunLog[];
  cycloneCleanings: CycloneCleaning[];
  drillPlans: DrillPlan[];
  fractureCountLogs: FractureCountLog[];
  loggingEvents: LoggingEvent[];
  magSusLogs: MagSusLog[];
  ptGeologyLogs: PtGeologyLog[];
  ptMagSusLogs: PtMagSusLog[];
  ptMappingLogs: PtMappingLog[];
  ptSamples: PtSample[];
  ptSampleQcs: PtSampleQc[];
  rigSetups: RigSetup[];
  rockMechanicLogs: RockMechanicLog[];
  rockQualityDesignationLogs: RockQualityDesignationLog[];
  sites: Site[];
  siteCoordinates: SiteCoordinate[];
  specificGravityPtLogs: SpecificGravityPtLog[];
  standardSampleQcs: StandardSampleQc[];
  structureLogs: StructureLog[];
  surveyLogs: SurveyLog[];
  xrfSamples: XrfSample[];
  xrfSampleQcs: XrfSampleQc[];
}

export interface CoreRecoveryRunLog {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CoreRecoveryRunLogValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CoreRecoveryRunLogRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CoreRecoveryRunLogId: string;
  CollarId: string;
  Comments?: string;
  Core_Block_From?: number;
  Core_Block_Interval?: number;
  Core_Block_To?: number;
  Core_Loss_Gain_Interval?: number;
  CoreDiameter: string;
  CoreLoss?: number;
  CoreOrientated: boolean;
  DataSource: string;
  Degree_Of_Offset?: number;
  DepthFrom: number;
  DepthTo: number;
  IntervalLength?: number;
  JsonData?: string;
  LenC?: number;
  LoggedBy: string;
  /** @format date-time */
  LoggedDt?: string;
  LoggingEventId: string;
  Organization: string;
  OrientationQuality: string;
  Priority: number;
  Recovery_Interval?: number;
  Recovery_pct?: number;
  RQD_Interval?: number;
  RQD_pct?: number;
  Solid_Recovery_Interval?: number;
  Solid_Recovery_pct?: number;
  Total_Core_Recovery_Interval?: number;
  Total_Core_Recovery_pct?: number;
  collar: Collar;
  coreDiameter: CoreDiameter;
  loggedBy: Person;
  loggingEvent: LoggingEvent;
  organization: Organization;
  orientationQuality: OrientationQuality;
  rowStatus: RowStatus;
}

export interface Organization {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Organization: string;
  Description?: string;
  OrganizationId: string;
  SortOrder?: number;
  collars: Collar[];
  coreRecoveryRunLogs: CoreRecoveryRunLog[];
  drillMethods: DrillMethod[];
  drillPatterns: DrillPattern[];
  drillPlans: DrillPlan[];
  drillPrograms: DrillProgram[];
  fractureCountLogs: FractureCountLog[];
  geologyCombinedLogs: GeologyCombinedLog[];
  holes: Hole[];
  metaDataLogs: MetaDataLog[];
  ptSamples: PtSample[];
  ptSampleQcs: PtSampleQc[];
  rigSetups: RigSetup[];
  rockMechanicLogs: RockMechanicLog[];
  rockQualityDesignationLogs: RockQualityDesignationLog[];
  samples: Sample[];
  sampleQcs: SampleQc[];
  shearLogs: ShearLog[];
  specificGravityPtLogs: SpecificGravityPtLog[];
  standardSamples: StandardSample[];
  standardSampleQcs: StandardSampleQc[];
  structureLogs: StructureLog[];
  surveys: Survey[];
  targets: Target[];
  xrfSamples: XrfSample[];
  xrfSampleQcs: XrfSampleQc[];
  xrfStandardSamples: XrfStandardSample[];
}

export interface HoleName {
  ReportIncludeInd?: boolean;
  ValidationStatus?: HoleNameValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: HoleNameRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  HoleNameId: string;
  HoleId: string;
  HoleNm?: string;
  IsPrimary: boolean;
  NameType?: string;
  hole: Hole;
}

export interface Hole {
  ReportIncludeInd?: boolean;
  ValidationStatus?: HoleValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: HoleRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  HoleId: string;
  HoleStatus: string;
  Organization: string;
  holeStatus: HoleStatus;
  organization: Organization;
  holeNames: HoleName[];
}

export interface HolePurposeDetail {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  HolePurpose: string;
  HolePurposeDetailId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  holePurpose: HolePurpose;
  drillPlans: DrillPlan[];
}

export interface HolePurpose {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Category?: string;
  Description: string;
  HolePurposeId: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  collars: Collar[];
  drillPlans: DrillPlan[];
  holePurposeDetails: HolePurposeDetail[];
}

export interface HoleType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  CoreSize?: string;
  Description: string;
  HoleTypeId: string;
  IsDefaultInd: boolean;
  Method?: string;
  SortOrder: number;
  collars: Collar[];
  drillPlans: DrillPlan[];
}

export interface Phase {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Phase: string;
  Description?: string;
  PhaseId: string;
  Project: string;
  SortOrder?: number;
  collars: Collar[];
  drillPlans: DrillPlan[];
}

export interface Pit {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Pit: string;
  Description?: string;
  PitId: string;
  Project: string;
  SortOrder?: number;
  collars: Collar[];
  drillPlans: DrillPlan[];
}

export interface Prospect {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Prospect: string;
  Description?: string;
  Project: string;
  ProspectId: string;
  SortOrder?: number;
  project: Project;
  collars: Collar[];
  drillPlans: DrillPlan[];
}

export interface Zone {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  ZoneId: string;
  drillPlans: DrillPlan[];
}

export interface DrillPlan {
  ReportIncludeInd?: boolean;
  ValidationStatus?: DrillPlanValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: DrillPlanRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillPlanId: string;
  DataSource: string;
  DrillPattern: string;
  DrillPriority: number;
  DrillType: string;
  Grid: string;
  HolePurpose: string;
  HolePurposeDetail: string;
  HoleType: string;
  InfillTarget?: string;
  ODSPriority: number;
  Organization: string;
  Phase: string;
  Pit: string;
  PlannedAzimuth?: number;
  PlannedBy: string;
  /** @format date-time */
  PlannedCompleteDt?: string;
  PlannedDip?: number;
  PlannedEasting?: number;
  PlannedNorthing?: number;
  PlannedRL?: number;
  /** @format date-time */
  PlannedStartDt?: string;
  PlannedTotalDepth?: number;
  Priority?: number;
  Project: string;
  Prospect: string;
  QCInsertionRuleId?: string;
  SitePrep?: string;
  SubTarget: string;
  Target: string;
  Tenement: string;
  TWF?: string;
  WaterTableDepth?: number;
  Zone: string;
  hole?: Hole;
  drillPattern: DrillPattern;
  drillType: DrillType;
  gr: Grid;
  holePurpose: HolePurpose;
  holePurposeDetail: HolePurposeDetail;
  holeType: HoleType;
  organization: Organization;
  phase: Phase;
  pit: Pit;
  plannedBy: Person;
  project: Project;
  prospect: Prospect;
  subTarget: SubTarget;
  target: Target;
  tenement: Tenement;
  zone: Zone;
  drillPlanStatusHistorys: DrillPlanStatusHistory[];
  rigSetups: RigSetup[];
}

export interface Grid {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Datum?: string;
  Description: string;
  EPSG?: number;
  GridId: string;
  IsDefaultInd: boolean;
  IsProjected: boolean;
  Proj4Text?: string;
  Projection?: string;
  SortOrder: number;
  SRID: number;
  Units?: string;
  collarCoordinates: CollarCoordinate[];
  drillPlans: DrillPlan[];
  samples: Sample[];
  siteCoordinates: SiteCoordinate[];
  surveyLogs: SurveyLog[];
}

export interface CollarCoordinate {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CollarCoordinateValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CollarCoordinateRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarCoordinateId: string;
  Organization: string;
  CollarId: string;
  Comments?: string;
  DataSource: string;
  East?: number;
  GeoPoint?: object;
  GeoPointWGS?: object;
  Grid: string;
  Instrument?: string;
  IsDeleted?: boolean;
  North?: number;
  Priority: number;
  PriorityStatus: string;
  RL?: number;
  RLSource?: string;
  SurveyBy?: string;
  SurveyCompany: string;
  SurveyMethod: string;
  /** @format date-time */
  SurveyOnDt?: string;
  Validated?: boolean;
  ValidatedStatus: number;
  collar: Collar;
  gr: Grid;
  rowStatus: RowStatus;
  surveyCompany: Company;
  surveyMethod: SurveyMethod;
}

export interface Company {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  CompanyId: string;
  CompanyType: string;
  Description: string;
  IsDefaultInd: boolean;
  SortOrder: number;
  companyType: CompanyType;
  collars: Collar[];
  collarCoordinates: CollarCoordinate[];
  drillPrograms: DrillProgram[];
  persons: Person[];
  rigSetups: RigSetup[];
  sites: Site[];
  siteCoordinates: SiteCoordinate[];
  surveyLogs: SurveyLog[];
  tenements: Tenement[];
}

export interface Section {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description: string;
  IsDefaultInd: boolean;
  SectionId: string;
  SortOrder: number;
  collars: Collar[];
}

export interface ValidationError {
  ReportIncludeInd?: boolean;
  ValidationStatus?: ValidationErrorValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: ValidationErrorRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  ValidationErrorId: string;
  CollarId: string;
  ErrorsJson?: string;
  collar: Collar;
}

export interface Collar {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CollarValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CollarRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarId: string;
  ApprovedInd: boolean;
  CasingDepth?: number;
  CollarType: string;
  Comments?: string;
  DataSource: string;
  ExplorationCompany: string;
  /** @format date-time */
  FinishedOnDt?: string;
  HolePurpose: string;
  HolePurposeDetail?: string;
  HoleType: string;
  LoggingEventId: string;
  ModelUseInd: boolean;
  Organization: string;
  OrientationTool?: string;
  ParentCollarId?: string;
  Phase: string;
  Pit: string;
  PreCollarDepth?: number;
  PreCollarId?: string;
  Priority?: number;
  Project: string;
  Prospect: string;
  Redox?: string;
  ResponsiblePerson: string;
  ResponsiblePerson2: string;
  Section: string;
  StartDepth?: number;
  /** @format date-time */
  StartedOnDt?: string;
  SubTarget: string;
  Target: string;
  Tenement: string;
  TotalDepth?: number;
  WaterTableDepth?: number;
  /** @format date-time */
  WaterTableDepthMeasuredOnDt?: string;
  collarType: CollarType;
  explorationCompany: Company;
  holePurpose: HolePurpose;
  holeType: HoleType;
  organization: Organization;
  phase: Phase;
  pit: Pit;
  project: Project;
  prospect: Prospect;
  responsiblePerson: Person;
  responsiblePerson2: Person;
  rowStatus: RowStatus;
  section: Section;
  subTarget: SubTarget;
  target: Target;
  tenement: Tenement;
  collarCoordinates: CollarCoordinate[];
  coreRecoveryRunLogs: CoreRecoveryRunLog[];
  drillMethods: DrillMethod[];
  fractureCountLogs: FractureCountLog[];
  geologyCombinedLogs: GeologyCombinedLog[];
  labDispatchs: LabDispatch[];
  magSusLogs: MagSusLog[];
  metaDataLogs: MetaDataLog[];
  rockMechanicLogs: RockMechanicLog[];
  rockQualityDesignationLogs: RockQualityDesignationLog[];
  samples: Sample[];
  sampleDispatchs: SampleDispatch[];
  sampleQcs: SampleQc[];
  shearLogs: ShearLog[];
  specificGravityPtLogs: SpecificGravityPtLog[];
  structureLogs: StructureLog[];
  surveys: Survey[];
  validationErrors: ValidationError[];
  xrfSamples: XrfSample[];
}

export interface Project {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Project: string;
  Description?: string;
  Organization: string;
  ProjectId: string;
  SortOrder?: number;
  collars: Collar[];
  drillPlans: DrillPlan[];
  drillPrograms: DrillProgram[];
  filteredsets: Filteredset[];
  prospects: Prospect[];
}

export interface EntityTypeRelationship {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  EntityTypeRelationshipId: string;
  ChildEntityType: string;
  Description?: string;
  JoinCondition: string;
  ParentEntityType: string;
  RelationshipType: string;
  childEntityType: EntityTypeConfig;
  parentEntityType: EntityTypeConfig;
}

export interface EntityTypeConfig {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  EntityTypeConfigId: string;
  ColumnNm: string;
  Description?: string;
  EntityType: string;
  PrimaryKeyColumnNm: string;
  SchemaNm: string;
  TableNm: string;
  entityTypeRelationships: EntityTypeRelationship[];
  filteredSetEntitys: FilteredSetEntity[];
}

export interface FilteredSetEntity {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  FilteredSetEntityId: string;
  EntityId: string;
  EntityType: string;
  FilteredSetId: string;
  entityType: EntityTypeConfig;
  filteredSet: Filteredset;
}

export interface Filteredset {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  FilteredSetId: string;
  Description?: string;
  FilteredSetCd: string;
  FilteredSetNm: string;
  IsSharedInd: boolean;
  Project: string;
  project: Project;
  filteredSetEntitys: FilteredSetEntity[];
  filteredSetParameters: FilteredSetParameter[];
  filteredSetShares: FilteredSetShare[];
}

export interface Role {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Role: string;
  Comments?: string;
  Description?: string;
  Permissions?: string;
  RoleId: string;
  userRoles: UserRole[];
}

export interface UserRole {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  UserRoleId: string;
  Comments?: string;
  /** @format date-time */
  EffectiveEndDt?: string;
  /** @format date-time */
  EffectiveStartDt: string;
  Role: string;
  UserNm: string;
  role: Role;
  userNm: User;
}

export interface User {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  UserNm: string;
  Comments?: string;
  DisplayNm: string;
  Email?: string;
  FailedLoginAttempts: number;
  IsLockedInd: boolean;
  /** @format date-time */
  LastLoginDt?: string;
  /** @format date-time */
  LastPasswordChangeDt?: string;
  /** @format date-time */
  LockedUntilDt?: string;
  MustChangePasswordInd: boolean;
  PasswordHash?: string;
  UserId: string;
  UserStatus: string;
  filteredSetShares: FilteredSetShare[];
  userRoles: UserRole[];
}

export interface FilteredSetShare {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  FilteredSetShareId: string;
  FilteredSetId: string;
  PermissionType: string;
  UserNm: string;
  filteredSet: Filteredset;
  userNm: User;
}

export interface UpdateUserDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  UserNm?: string;
  Comments?: string;
  DisplayNm?: string;
  Email?: string;
  FailedLoginAttempts?: number;
  IsLockedInd?: boolean;
  /** @format date-time */
  LastLoginDt?: string;
  /** @format date-time */
  LastPasswordChangeDt?: string;
  /** @format date-time */
  LockedUntilDt?: string;
  MustChangePasswordInd?: boolean;
  PasswordHash?: string;
  UserId?: string;
  UserStatus?: string;
  filteredSetShares?: FilteredSetShare[];
  userRoles?: UserRole[];
}

export interface LoginDto {
  /**
   * The username of the user
   * @example "johndoe"
   */
  userNm: string;
  /**
   * The password of the user
   * @example "securePassword123"
   */
  password: string;
}

export interface LoginResponseDto {
  /**
   * JWT access token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  accessToken: string;
  /**
   * JWT refresh token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refreshToken: string;
  user: {
    userNm: string;
    displayName: string;
    roles: string[];
  };
}

export interface RefreshTokenDto {
  /**
   * The refresh token issued during login or previous refresh
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refreshToken: string;
}

export interface RefreshResponseDto {
  /**
   * New JWT access token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  accessToken: string;
  /**
   * New JWT refresh token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refreshToken: string;
}

export interface LookupTableResponse {
  /** The lookup sequence number */
  lookupSequence: number;
  /** The lookup table data as a JSON string */
  lookupData: string;
  /** The schema table data as a JSON string */
  schemaData: string;
}

export interface CreateHoleNmPrefixDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  HoleNmPrefixId?: string;
  DrillType?: string;
  HolePurpose?: string;
  Organization?: string;
  Prefix?: string;
  Project?: string;
  Prospect?: string;
  SortOrder?: number;
  Target?: string;
}

export interface HoleNmPrefix {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  HoleNmPrefixId: string;
  DrillType?: string;
  HolePurpose?: string;
  Organization: string;
  Prefix: string;
  Project?: string;
  Prospect?: string;
  SortOrder?: number;
  Target?: string;
}

export interface UpdateHoleNmPrefixDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  HoleNmPrefixId?: string;
  DrillType?: string;
  HolePurpose?: string;
  Organization?: string;
  Prefix?: string;
  Project?: string;
  Prospect?: string;
  SortOrder?: number;
  Target?: string;
}

export interface CreateOrganizationDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization?: string;
  Description?: string;
  OrganizationId?: string;
  SortOrder?: number;
}

export interface UpdateOrganizationDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization?: string;
  Description?: string;
  OrganizationId?: string;
  SortOrder?: number;
  collars?: Collar[];
  coreRecoveryRunLogs?: CoreRecoveryRunLog[];
  drillMethods?: DrillMethod[];
  drillPatterns?: DrillPattern[];
  drillPlans?: DrillPlan[];
  drillPrograms?: DrillProgram[];
  fractureCountLogs?: FractureCountLog[];
  geologyCombinedLogs?: GeologyCombinedLog[];
  holes?: Hole[];
  metaDataLogs?: MetaDataLog[];
  ptSamples?: PtSample[];
  ptSampleQcs?: PtSampleQc[];
  rigSetups?: RigSetup[];
  rockMechanicLogs?: RockMechanicLog[];
  rockQualityDesignationLogs?: RockQualityDesignationLog[];
  samples?: Sample[];
  sampleQcs?: SampleQc[];
  shearLogs?: ShearLog[];
  specificGravityPtLogs?: SpecificGravityPtLog[];
  standardSamples?: StandardSample[];
  standardSampleQcs?: StandardSampleQc[];
  structureLogs?: StructureLog[];
  surveys?: Survey[];
  targets?: Target[];
  xrfSamples?: XrfSample[];
  xrfSampleQcs?: XrfSampleQc[];
  xrfStandardSamples?: XrfStandardSample[];
}

export interface CreatePhaseDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Phase?: string;
  Description?: string;
  PhaseId?: string;
  Project?: string;
  SortOrder?: number;
}

export interface UpdatePhaseDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Phase?: string;
  Description?: string;
  PhaseId?: string;
  Project?: string;
  SortOrder?: number;
  collars?: Collar[];
  drillPlans?: DrillPlan[];
}

export interface CreatePitDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Pit?: string;
  Description?: string;
  PitId?: string;
  Project?: string;
  SortOrder?: number;
}

export interface UpdatePitDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Pit?: string;
  Description?: string;
  PitId?: string;
  Project?: string;
  SortOrder?: number;
  collars?: Collar[];
  drillPlans?: DrillPlan[];
}

export interface CreateProjectDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Project?: string;
  Description?: string;
  Organization?: string;
  ProjectId?: string;
  SortOrder?: number;
}

export interface UpdateProjectDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Project?: string;
  Description?: string;
  Organization?: string;
  ProjectId?: string;
  SortOrder?: number;
  collars?: Collar[];
  drillPlans?: DrillPlan[];
  drillPrograms?: DrillProgram[];
  filteredsets?: Filteredset[];
  prospects?: Prospect[];
}

export interface CreateProspectDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Prospect?: string;
  Description?: string;
  Project?: string;
  ProspectId?: string;
  SortOrder?: number;
}

export interface UpdateProspectDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Prospect?: string;
  Description?: string;
  Project?: string;
  ProspectId?: string;
  SortOrder?: number;
  project?: Project;
  collars?: Collar[];
  drillPlans?: DrillPlan[];
}

export interface CreateSectionDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  SectionId?: string;
  SortOrder?: number;
}

export interface UpdateSectionDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  SectionId?: string;
  SortOrder?: number;
  collars?: Collar[];
}

export interface CreateSubTargetDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SubTarget?: string;
  Description?: string;
  SortOrder?: number;
  SubTargetId?: string;
  Target?: string;
}

export interface UpdateSubTargetDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SubTarget?: string;
  Description?: string;
  SortOrder?: number;
  SubTargetId?: string;
  Target?: string;
  target?: Target;
  collars?: Collar[];
  drillPlans?: DrillPlan[];
}

export interface CreateTargetDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Target?: string;
  CentroidEasting?: number;
  CentroidNorthing?: number;
  Description?: string;
  Organization?: string;
  Priority?: number;
  Project?: string;
  Radius_m?: number;
  SortOrder?: number;
  TargetCode?: string;
  TargetId?: string;
  TargetType?: string;
  Tenement?: string;
}

export interface UpdateTargetDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Target?: string;
  CentroidEasting?: number;
  CentroidNorthing?: number;
  Description?: string;
  Organization?: string;
  Priority?: number;
  Project?: string;
  Radius_m?: number;
  SortOrder?: number;
  TargetCode?: string;
  TargetId?: string;
  TargetType?: string;
  Tenement?: string;
  organization?: Organization;
  tenement?: Tenement;
  collars?: Collar[];
  drillPatterns?: DrillPattern[];
  drillPlans?: DrillPlan[];
  subTargets?: SubTarget[];
}

export interface CreateTenementDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Tenement?: string;
  AnnExpRent?: number;
  CostCd?: string;
  DataSource?: string;
  /** @format date-time */
  EndDt?: string;
  /** @format date-time */
  GrantDt?: string;
  Holder?: string;
  LeaseStatus?: string;
  Organization?: string;
  /** @format date-time */
  RegDt?: string;
  RegStatus?: string;
  /** @format date-time */
  StartDt?: string;
  TenementId?: string;
}

export interface UpdateTenementDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Tenement?: string;
  AnnExpRent?: number;
  CostCd?: string;
  DataSource?: string;
  /** @format date-time */
  EndDt?: string;
  /** @format date-time */
  GrantDt?: string;
  Holder?: string;
  LeaseStatus?: string;
  Organization?: string;
  /** @format date-time */
  RegDt?: string;
  RegStatus?: string;
  /** @format date-time */
  StartDt?: string;
  TenementId?: string;
  costCd?: CostCodes;
  holder?: Company;
  leaseStatus?: LeaseStatus;
  regStatus?: TenementStatus;
  collars?: Collar[];
  drillPlans?: DrillPlan[];
  drillPrograms?: DrillProgram[];
  sites?: Site[];
  targets?: Target[];
}

export interface CreateZoneDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  SortOrder?: number;
  ZoneId?: string;
}

export interface UpdateZoneDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  SortOrder?: number;
  ZoneId?: string;
  drillPlans?: DrillPlan[];
}

export interface CreateCollarDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateCollarDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateCollarDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarId?: string;
  ApprovedInd?: boolean;
  CasingDepth?: number;
  CollarType?: string;
  Comments?: string;
  DataSource?: string;
  ExplorationCompany?: string;
  /** @format date-time */
  FinishedOnDt?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleType?: string;
  LoggingEventId?: string;
  ModelUseInd?: boolean;
  Organization?: string;
  OrientationTool?: string;
  ParentCollarId?: string;
  Phase?: string;
  Pit?: string;
  PreCollarDepth?: number;
  PreCollarId?: string;
  Priority?: number;
  Project?: string;
  Prospect?: string;
  Redox?: string;
  ResponsiblePerson?: string;
  ResponsiblePerson2?: string;
  Section?: string;
  StartDepth?: number;
  /** @format date-time */
  StartedOnDt?: string;
  SubTarget?: string;
  Target?: string;
  Tenement?: string;
  TotalDepth?: number;
  WaterTableDepth?: number;
  /** @format date-time */
  WaterTableDepthMeasuredOnDt?: string;
}

export interface PageMetaDto {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PageDto {
  data: any[][];
  meta: PageMetaDto;
}

export interface UpdateLoggingEventDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateLoggingEventDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateLoggingEventDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  LoggingEventId?: string;
  Organization?: string;
  DataSource?: string;
  LoggedBy?: string;
  /** @format date-time */
  LoggedOnDt?: string;
  LoggingEventRef?: string;
  LoggingEventType?: string;
  LoggingReason?: string;
  PreviousLoggingEventId?: string;
  loggedBy?: Person;
  loggingEventType?: LoggingEventType;
  coreRecoveryRunLogs?: CoreRecoveryRunLog[];
  fractureCountLogs?: FractureCountLog[];
  geologyCombinedLogs?: GeologyCombinedLog[];
  magSusLogs?: MagSusLog[];
  metaDataLogs?: MetaDataLog[];
  rockMechanicLogs?: RockMechanicLog[];
  rockQualityDesignationLogs?: RockQualityDesignationLog[];
  shearLogs?: ShearLog[];
  specificGravityPtLogs?: SpecificGravityPtLog[];
  structureLogs?: StructureLog[];
  structurePtLogs?: StructurePtLog[];
  surveyLogs?: SurveyLog[];
}

export interface UpsertCollarDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpsertCollarDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpsertCollarDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  CollarId?: string;
  ApprovedInd?: boolean;
  CasingDepth?: number;
  CollarType?: string;
  Comments?: string;
  DataSource?: string;
  ExplorationCompany?: string;
  /** @format date-time */
  FinishedOnDt?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleType?: string;
  LoggingEventId?: string;
  ModelUseInd?: boolean;
  Organization?: string;
  OrientationTool?: string;
  ParentCollarId?: string;
  Phase?: string;
  Pit?: string;
  PreCollarDepth?: number;
  PreCollarId?: string;
  Priority?: number;
  Project?: string;
  Prospect?: string;
  Redox?: string;
  ResponsiblePerson?: string;
  ResponsiblePerson2?: string;
  Section?: string;
  StartDepth?: number;
  /** @format date-time */
  StartedOnDt?: string;
  SubTarget?: string;
  Target?: string;
  Tenement?: string;
  TotalDepth?: number;
  WaterTableDepth?: number;
  /** @format date-time */
  WaterTableDepthMeasuredOnDt?: string;
  /** Optional LoggingEvent to be upserted along with the Collar */
  LoggingEvent?: UpdateLoggingEventDto;
}

export interface UpdateCollarDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateCollarDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateCollarDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarId?: string;
  ApprovedInd?: boolean;
  CasingDepth?: number;
  CollarType?: string;
  Comments?: string;
  DataSource?: string;
  ExplorationCompany?: string;
  /** @format date-time */
  FinishedOnDt?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleType?: string;
  LoggingEventId?: string;
  ModelUseInd?: boolean;
  Organization?: string;
  OrientationTool?: string;
  ParentCollarId?: string;
  Phase?: string;
  Pit?: string;
  PreCollarDepth?: number;
  PreCollarId?: string;
  Priority?: number;
  Project?: string;
  Prospect?: string;
  Redox?: string;
  ResponsiblePerson?: string;
  ResponsiblePerson2?: string;
  Section?: string;
  StartDepth?: number;
  /** @format date-time */
  StartedOnDt?: string;
  SubTarget?: string;
  Target?: string;
  Tenement?: string;
  TotalDepth?: number;
  WaterTableDepth?: number;
  /** @format date-time */
  WaterTableDepthMeasuredOnDt?: string;
  collarType?: CollarType;
  explorationCompany?: Company;
  holePurpose?: HolePurpose;
  holeType?: HoleType;
  organization?: Organization;
  phase?: Phase;
  pit?: Pit;
  project?: Project;
  prospect?: Prospect;
  responsiblePerson?: Person;
  responsiblePerson2?: Person;
  rowStatus?: RowStatus;
  section?: Section;
  subTarget?: SubTarget;
  target?: Target;
  tenement?: Tenement;
  collarCoordinates?: CollarCoordinate[];
  coreRecoveryRunLogs?: CoreRecoveryRunLog[];
  drillMethods?: DrillMethod[];
  fractureCountLogs?: FractureCountLog[];
  geologyCombinedLogs?: GeologyCombinedLog[];
  labDispatchs?: LabDispatch[];
  magSusLogs?: MagSusLog[];
  metaDataLogs?: MetaDataLog[];
  rockMechanicLogs?: RockMechanicLog[];
  rockQualityDesignationLogs?: RockQualityDesignationLog[];
  samples?: Sample[];
  sampleDispatchs?: SampleDispatch[];
  sampleQcs?: SampleQc[];
  shearLogs?: ShearLog[];
  specificGravityPtLogs?: SpecificGravityPtLog[];
  structureLogs?: StructureLog[];
  surveys?: Survey[];
  validationErrors?: ValidationError[];
  xrfSamples?: XrfSample[];
}

export interface UpdateSectionStatusDto {
  /**
   * New RowStatus value (tinyint: 0-255)
   * @min 0
   * @max 255
   * @example 2
   */
  RowStatus?: number | null;
  /**
   * New ValidationStatus value (tinyint: 0-255)
   * @min 0
   * @max 255
   * @example 2
   */
  ValidationStatus?: number | null;
  /**
   * New ReportIncludeInd value (boolean: true,false)
   * @min 0
   * @max 255
   * @example 2
   */
  ReportIncludeInd?: boolean | null;
  /**
   * New ActiveInd value (boolean: true,false)
   * @min 0
   * @max 255
   * @example 2
   */
  ActiveInd?: boolean | null;
  /**
   * Validation error messages as JSON string
   * @example "{"field": "error message"}"
   */
  ValidationErrors?: string | null;
}

export interface CreateLoggingEventDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateLoggingEventDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateLoggingEventDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  LoggingEventId?: string;
  Organization?: string;
  DataSource?: string;
  LoggedBy?: string;
  /** @format date-time */
  LoggedOnDt?: string;
  LoggingEventRef?: string;
  LoggingEventType?: string;
  LoggingReason?: string;
  PreviousLoggingEventId?: string;
}

export interface CreateCollarCoordinateDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateCollarCoordinateDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateCollarCoordinateDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarCoordinateId?: string;
  Organization?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  East?: number;
  GeoPoint?: object;
  GeoPointWGS?: object;
  Grid?: string;
  Instrument?: string;
  IsDeleted?: boolean;
  North?: number;
  Priority?: number;
  PriorityStatus?: string;
  RL?: number;
  RLSource?: string;
  SurveyBy?: string;
  SurveyCompany?: string;
  SurveyMethod?: string;
  /** @format date-time */
  SurveyOnDt?: string;
  Validated?: boolean;
  ValidatedStatus?: number;
}

export interface CreateCollarHistoryDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateCollarHistoryDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateCollarHistoryDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarId?: string;
  ApprovedBy?: string;
  ApprovedInd?: boolean;
  /** @format date-time */
  ApprovedOnDt?: string;
  Azimuth?: number;
  CollarType?: string;
  Comments?: string;
  /** @format date-time */
  CompletedOnDt?: string;
  DataSource?: string;
  Dip?: number;
  ExplorationCompany?: string;
  HoleNm?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleStatus?: string;
  HoleType?: string;
  JsonData?: string;
  LoggingEventId?: string;
  ModelUseInd?: boolean;
  Organization?: string;
  OrientationTool?: string;
  ParentCollarId?: string;
  Phase?: string;
  Pit?: string;
  PreCollarDepth?: number;
  PreCollarId?: string;
  Priority?: number;
  Project?: string;
  Prospect?: string;
  ResponsiblePerson?: string;
  ResponsiblePerson2?: string;
  Section?: string;
  StartDepth?: number;
  /** @format date-time */
  StartedOnDt?: string;
  SubTarget?: string;
  SurveyBy?: string;
  /** @format date-time */
  SurveyOnDt?: string;
  Target?: string;
  Tenement?: string;
  TotalDepth?: number;
  ValidatedBy?: string;
  /** @format date-time */
  ValidatedOnDt?: string;
  ValidatedStatus?: number;
  WaterTableDepth?: number;
  /** @format date-time */
  WaterTableDepthMeasuredOnDt?: string;
}

export interface CollarHistory {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CollarHistoryValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CollarHistoryRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarId: string;
  ApprovedBy?: string;
  ApprovedInd: boolean;
  /** @format date-time */
  ApprovedOnDt?: string;
  Azimuth?: number;
  CollarType?: string;
  Comments?: string;
  /** @format date-time */
  CompletedOnDt?: string;
  DataSource: string;
  Dip?: number;
  ExplorationCompany?: string;
  HoleNm?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleStatus?: string;
  HoleType?: string;
  JsonData?: string;
  LoggingEventId?: string;
  ModelUseInd?: boolean;
  Organization?: string;
  OrientationTool?: string;
  ParentCollarId?: string;
  Phase?: string;
  Pit?: string;
  PreCollarDepth?: number;
  PreCollarId?: string;
  Priority?: number;
  Project?: string;
  Prospect?: string;
  ResponsiblePerson?: string;
  ResponsiblePerson2?: string;
  Section?: string;
  StartDepth?: number;
  /** @format date-time */
  StartedOnDt?: string;
  SubTarget?: string;
  SurveyBy?: string;
  /** @format date-time */
  SurveyOnDt?: string;
  Target?: string;
  Tenement?: string;
  TotalDepth?: number;
  ValidatedBy?: string;
  /** @format date-time */
  ValidatedOnDt?: string;
  ValidatedStatus?: number;
  WaterTableDepth?: number;
  /** @format date-time */
  WaterTableDepthMeasuredOnDt?: string;
}

export interface UpdateCollarHistoryDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateCollarHistoryDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateCollarHistoryDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarId?: string;
  ApprovedBy?: string;
  ApprovedInd?: boolean;
  /** @format date-time */
  ApprovedOnDt?: string;
  Azimuth?: number;
  CollarType?: string;
  Comments?: string;
  /** @format date-time */
  CompletedOnDt?: string;
  DataSource?: string;
  Dip?: number;
  ExplorationCompany?: string;
  HoleNm?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleStatus?: string;
  HoleType?: string;
  JsonData?: string;
  LoggingEventId?: string;
  ModelUseInd?: boolean;
  Organization?: string;
  OrientationTool?: string;
  ParentCollarId?: string;
  Phase?: string;
  Pit?: string;
  PreCollarDepth?: number;
  PreCollarId?: string;
  Priority?: number;
  Project?: string;
  Prospect?: string;
  ResponsiblePerson?: string;
  ResponsiblePerson2?: string;
  Section?: string;
  StartDepth?: number;
  /** @format date-time */
  StartedOnDt?: string;
  SubTarget?: string;
  SurveyBy?: string;
  /** @format date-time */
  SurveyOnDt?: string;
  Target?: string;
  Tenement?: string;
  TotalDepth?: number;
  ValidatedBy?: string;
  /** @format date-time */
  ValidatedOnDt?: string;
  ValidatedStatus?: number;
  WaterTableDepth?: number;
  /** @format date-time */
  WaterTableDepthMeasuredOnDt?: string;
}

export interface CreateCommentDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateCommentDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateCommentDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CommentId?: string;
  Comment?: string;
  EntityId?: string;
  EntityTypeId?: number;
}

export interface UpdateCommentDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateCommentDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateCommentDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CommentId?: string;
  Comment?: string;
  EntityId?: string;
  EntityTypeId?: number;
  entityType?: EntityType;
}

export interface CreateCycloneCleaningDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateCycloneCleaningDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateCycloneCleaningDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarId?: string;
  Depth?: number;
  Organization?: string;
  Rod_Number?: number;
  Comments?: string;
  CycloneCleaningId?: string;
  DataSource?: string;
  DriLatitudeLongitudeOperator?: string;
  LoggedBy?: string;
  /** @format date-time */
  LoggedDt?: string;
}

export interface UpdateCycloneCleaningDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateCycloneCleaningDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateCycloneCleaningDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarId?: string;
  Depth?: number;
  Organization?: string;
  Rod_Number?: number;
  Comments?: string;
  CycloneCleaningId?: string;
  DataSource?: string;
  DriLatitudeLongitudeOperator?: string;
  LoggedBy?: string;
  /** @format date-time */
  LoggedDt?: string;
  driLatitudeLongitudeOperator?: Person;
  loggedBy?: Person;
  rowStatus?: RowStatus;
}

export interface CreateDrillMethodDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateDrillMethodDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateDrillMethodDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillMethodId?: string;
  CollarId?: string;
  Comments?: string;
  DepthFrom?: number;
  DepthTo?: number;
  DrillCompany?: string;
  Driller1?: string;
  Driller2?: string;
  DrillRigType?: string;
  DrillSize?: string;
  DrillType?: string;
  /** @format date-time */
  EndDt?: string;
  Organization?: string;
  SampleType?: string;
  /** @format date-time */
  StartDt?: string;
}

export interface UpdateDrillMethodDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateDrillMethodDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateDrillMethodDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillMethodId?: string;
  CollarId?: string;
  Comments?: string;
  DepthFrom?: number;
  DepthTo?: number;
  DrillCompany?: string;
  Driller1?: string;
  Driller2?: string;
  DrillRigType?: string;
  DrillSize?: string;
  DrillType?: string;
  /** @format date-time */
  EndDt?: string;
  Organization?: string;
  SampleType?: string;
  /** @format date-time */
  StartDt?: string;
  collar?: Collar;
  drillCompany?: Machinery;
  drillRigType?: Machinery;
  drillSize?: DrillSize;
  drillType?: DrillType;
  organization?: Organization;
  rowStatus?: RowStatus;
  sampleType?: SampleType;
}

export interface DrillMethodBase {
  ReportIncludeInd?: boolean;
  ValidationStatus?: DrillMethodBaseValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: DrillMethodBaseRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillMethodId: string;
  CollarId: string;
  Comments?: string;
  DepthFrom: number;
  DepthTo: number;
  DrillCompany: string;
  Driller1?: string;
  Driller2?: string;
  DrillRigType: string;
  DrillSize: string;
  DrillType: string;
  /** @format date-time */
  EndDt?: string;
  Organization: string;
  SampleType: string;
  /** @format date-time */
  StartDt?: string;
}

export interface CreateHoleDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateHoleDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateHoleDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  HoleId?: string;
  HoleStatus?: string;
  Organization?: string;
}

export interface UpdateHoleDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateHoleDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateHoleDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  HoleId?: string;
  HoleStatus?: string;
  Organization?: string;
  holeStatus?: HoleStatus;
  organization?: Organization;
  holeNames?: HoleName[];
}

export interface CreateHoleNameDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateHoleNameDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateHoleNameDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  HoleNameId?: string;
  HoleId?: string;
  HoleNm?: string;
  IsPrimary?: boolean;
  NameType?: string;
}

export interface UpdateHoleNameDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateHoleNameDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateHoleNameDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  HoleNameId?: string;
  HoleId?: string;
  HoleNm?: string;
  IsPrimary?: boolean;
  NameType?: string;
  hole?: Hole;
}

export interface CreateMetaDataLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateMetaDataLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateMetaDataLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  MetaDataLogId?: string;
  Casing?: string;
  CasingClass?: string;
  CasingDepth?: number;
  CasingSize?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  IntervalLength?: number;
  JsonData?: string;
  LoggingEventId?: string;
  Organization?: string;
  Priority?: number;
  Redox?: string;
}

export interface UpdateMetaDataLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateMetaDataLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateMetaDataLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  MetaDataLogId?: string;
  Casing?: string;
  CasingClass?: string;
  CasingDepth?: number;
  CasingSize?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  IntervalLength?: number;
  JsonData?: string;
  LoggingEventId?: string;
  Organization?: string;
  Priority?: number;
  Redox?: string;
  casing?: Casing;
  casingClass?: CasingClass;
  casingSize?: CasingSize;
  collar?: Collar;
  loggingEvent?: LoggingEvent;
  organization?: Collar;
  rowStatus?: RowStatus;
}

export interface CreateRigSetupDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateRigSetupDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateRigSetupDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  RigSetupId?: string;
  Comments?: string;
  DataSource?: string;
  DownHoleSurveyDriller?: string;
  DownHoleSurveyDrillerSignature?: string;
  /** @format date-time */
  DownHoleSurveyDrillerSignatureDt?: string;
  DownHoleSurveyDrillingContractor?: string;
  DownHoleSurveyRigNo?: string;
  DrillingCompany?: string;
  DrillingSignature?: string;
  /** @format date-time */
  DrillingSignatureDt?: string;
  DrillPlanId?: string;
  DrillSupervisor?: string;
  FinalGeologist?: string;
  FinalGeologistSignature?: string;
  /** @format date-time */
  FinalGeologistSignatureDt?: string;
  FinalInclination?: number;
  FinalMagAzimuth?: number;
  FinalSetupApprovedBy?: string;
  FinalSetupDrillSupervisor?: string;
  FinalSetupDrillSupervisorSignature?: string;
  /** @format date-time */
  FinalSetupDrillSupervisorSignatureDt?: string;
  FinalSetupSignature?: string;
  /** @format date-time */
  FinalSetupSignatureDt?: string;
  Organization?: string;
  PadInspectionCompletedBy?: string;
  PadInspectionSignature?: string;
  /** @format date-time */
  PadInspectionSignatureDt?: string;
  RigAlignmentToolDip?: number;
  RigAlignmentToolMagAzi?: number;
  SurveyDepth?: number;
  SurveyDip?: number;
  SurveyMagAzi?: number;
  SurveyReference?: string;
}

export interface UpdateRigSetupDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateRigSetupDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateRigSetupDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  RigSetupId?: string;
  Comments?: string;
  DataSource?: string;
  DownHoleSurveyDriller?: string;
  DownHoleSurveyDrillerSignature?: string;
  /** @format date-time */
  DownHoleSurveyDrillerSignatureDt?: string;
  DownHoleSurveyDrillingContractor?: string;
  DownHoleSurveyRigNo?: string;
  DrillingCompany?: string;
  DrillingSignature?: string;
  /** @format date-time */
  DrillingSignatureDt?: string;
  DrillPlanId?: string;
  DrillSupervisor?: string;
  FinalGeologist?: string;
  FinalGeologistSignature?: string;
  /** @format date-time */
  FinalGeologistSignatureDt?: string;
  FinalInclination?: number;
  FinalMagAzimuth?: number;
  FinalSetupApprovedBy?: string;
  FinalSetupDrillSupervisor?: string;
  FinalSetupDrillSupervisorSignature?: string;
  /** @format date-time */
  FinalSetupDrillSupervisorSignatureDt?: string;
  FinalSetupSignature?: string;
  /** @format date-time */
  FinalSetupSignatureDt?: string;
  Organization?: string;
  PadInspectionCompletedBy?: string;
  PadInspectionSignature?: string;
  /** @format date-time */
  PadInspectionSignatureDt?: string;
  RigAlignmentToolDip?: number;
  RigAlignmentToolMagAzi?: number;
  SurveyDepth?: number;
  SurveyDip?: number;
  SurveyMagAzi?: number;
  SurveyReference?: string;
  downHoleSurveyDriller?: Person;
  downHoleSurveyDrillingContractor?: Company;
  downHoleSurveyRigNo?: Machinery;
  drillingCompany?: Company;
  drillPlan?: DrillPlan;
  drillSupervisor?: Person;
  finalGeologist?: Person;
  finalSetupApprovedBy?: Person;
  finalSetupDrillSupervisor?: Person;
  organization?: Organization;
  padInspectionCompletedBy?: Person;
  rowStatus?: RowStatus;
}

export interface CreateSectionVersionDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateSectionVersionDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateSectionVersionDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  EntityId?: string;
  EntityTypeId?: number;
}

export interface SectionVersion {
  ReportIncludeInd?: boolean;
  ValidationStatus?: SectionVersionValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: SectionVersionRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  EntityId: string;
  EntityTypeId: number;
}

export interface UpdateSectionVersionDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateSectionVersionDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateSectionVersionDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  EntityId?: string;
  EntityTypeId?: number;
}

export interface CreateSurveyDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateSurveyDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateSurveyDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SurveyId?: string;
  CollarId?: string;
  Organization?: string;
  SurveyNm?: string;
  DataSource: string;
  DownHoleSurveyMethod: string;
  LoggingEventId: string;
}

export interface UpdateSurveyDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateSurveyDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateSurveyDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SurveyId?: string;
  CollarId?: string;
  Organization?: string;
  SurveyNm?: string;
  DataSource?: string;
  DownHoleSurveyMethod?: string;
  LoggingEventId?: string;
  collar?: Collar;
  organization?: Organization;
  rowStatus?: RowStatus;
  surveyLogs?: SurveyLog[];
}

export interface CreateSurveyLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateSurveyLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateSurveyLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SurveyLogId?: string;
  AzimuthDeviation?: number;
  AzimuthMagnetic?: number;
  AzimuthMagneticReversed?: number;
  AzimuthUTM?: number;
  AzimuthUTMField?: number;
  Comments?: string;
  DataSource?: string;
  Depth?: number;
  Deviation?: string;
  Dip?: number;
  DipDeviation?: number;
  DownHoleSurveyMethod?: string;
  Grid?: string;
  LoggingEventId?: string;
  MagneticFieldStrength?: number;
  MagneticInclination?: number;
  MagneticStatus?: string;
  Organization?: string;
  SurveyCompany?: string;
  /** @format date-time */
  SurveyedOnDt?: string;
  SurveyId?: string;
  SurveyInstrument?: string;
  SurveyOperator?: string;
  SurveyReliability?: string;
  Validation?: boolean;
}

export interface UpdateSurveyLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateSurveyLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateSurveyLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SurveyLogId?: string;
  AzimuthDeviation?: number;
  AzimuthMagnetic?: number;
  AzimuthMagneticReversed?: number;
  AzimuthUTM?: number;
  AzimuthUTMField?: number;
  Comments?: string;
  DataSource?: string;
  Depth?: number;
  Deviation?: string;
  Dip?: number;
  DipDeviation?: number;
  DownHoleSurveyMethod?: string;
  Grid?: string;
  LoggingEventId?: string;
  MagneticFieldStrength?: number;
  MagneticInclination?: number;
  MagneticStatus?: string;
  Organization?: string;
  SurveyCompany?: string;
  /** @format date-time */
  SurveyedOnDt?: string;
  SurveyId?: string;
  SurveyInstrument?: string;
  SurveyOperator?: string;
  SurveyReliability?: string;
  Validation?: boolean;
  downHoleSurveyMethod?: DownHoleSurveyMethod;
  gr?: Grid;
  loggingEvent?: LoggingEvent;
  rowStatus?: RowStatus;
  surveyCompany?: Company;
  survey?: Survey;
  surveyInstrument?: Instrument;
  surveyOperator?: Person;
  surveyReliability?: SurveyReliability;
}

export interface UpsertSurveyLogDto {
  /** Array of survey log records to upsert */
  surveyLogs: UpdateSurveyLogDto[];
  /** Logging event information */
  loggingEvent?: UpdateLoggingEventDto;
  /** Action to perform: Draft, Completed, Validated, or Approved */
  action: string;
}

export interface CreateValidationErrorDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateValidationErrorDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateValidationErrorDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  ValidationErrorId?: string;
  CollarId?: string;
  ErrorsJson?: string;
}

export interface UpdateValidationErrorDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateValidationErrorDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateValidationErrorDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  ValidationErrorId?: string;
  CollarId?: string;
  ErrorsJson?: string;
  collar?: Collar;
}

export interface CreateDrillPatternDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillPattern?: string;
  Comments?: string;
  DrillPatternCode?: string;
  DrillPatternId?: string;
  DrillPatternType?: string;
  DrillProgram?: string;
  Organization?: string;
  Orientation?: number;
  SpacingX?: number;
  SpacingY?: number;
  Target?: string;
}

export interface UpdateDrillPatternDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillPattern?: string;
  Comments?: string;
  DrillPatternCode?: string;
  DrillPatternId?: string;
  DrillPatternType?: string;
  DrillProgram?: string;
  Organization?: string;
  Orientation?: number;
  SpacingX?: number;
  SpacingY?: number;
  Target?: string;
  drillPattern2?: DrillPatternCode;
  drillPatternType?: DrillPatternType;
  drillProgram?: DrillProgram;
  organization?: Organization;
  target?: Target;
  drillPlans?: DrillPlan[];
}

export interface CreateDrillPlanDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateDrillPlanDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateDrillPlanDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillPlanId?: string;
  DataSource?: string;
  DrillPattern?: string;
  DrillPriority?: number;
  DrillType?: string;
  Grid?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleType?: string;
  InfillTarget?: string;
  ODSPriority?: number;
  Organization?: string;
  Phase?: string;
  Pit?: string;
  PlannedAzimuth?: number;
  PlannedBy?: string;
  /** @format date-time */
  PlannedCompleteDt?: string;
  PlannedDip?: number;
  PlannedEasting?: number;
  PlannedNorthing?: number;
  PlannedRL?: number;
  /** @format date-time */
  PlannedStartDt?: string;
  PlannedTotalDepth?: number;
  Priority?: number;
  Project?: string;
  Prospect?: string;
  QCInsertionRuleId?: string;
  SitePrep?: string;
  SubTarget?: string;
  Target?: string;
  Tenement?: string;
  TWF?: string;
  WaterTableDepth?: number;
  Zone?: string;
  /**
   * Actual hole name (HoleNm type)
   * @example "DDH001"
   */
  HoleNm?: string;
  /**
   * Planned hole name (Planned type)
   * @example "PLAN-001"
   */
  PlannedHoleNm?: string;
  /**
   * Proposed hole name (proposed type)
   * @example "PROP-001"
   */
  ProposedHoleNm?: string;
  /**
   * Proposed hole name (proposed type)
   * @example "PROP-001"
   */
  OtherHoleNm?: string;
}

export interface UiDrillPlanBase {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UiDrillPlanBaseValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UiDrillPlanBaseRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillPattern?: string;
  DataSource: string;
  DrillPlanId?: string;
  DrillPlanStatus?: string;
  DrillPriority: number;
  DrillType?: string;
  Grid?: string;
  HoleNm?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleStatus?: string;
  HoleType?: string;
  InfillTarget?: string;
  ODSPriority: number;
  Organization: string;
  OtherHoleNm?: string;
  Phase?: string;
  Pit?: string;
  PlannedAzimuth?: number;
  PlannedBy?: string;
  /** @format date-time */
  PlannedCompleteDt?: string;
  PlannedDip?: number;
  PlannedEasting?: number;
  PlannedHoleNm?: string;
  PlannedNorthing?: number;
  PlannedRL?: number;
  /** @format date-time */
  PlannedStartDt?: string;
  PlannedTotalDepth?: number;
  Priority?: number;
  Project: string;
  ProposedHoleNm?: string;
  Prospect?: string;
  QCInsertionRuleId?: string;
  SitePrep?: string;
  SubTarget?: string;
  Target?: string;
  Tenement?: string;
  TWF?: string;
  WaterTableDepth?: number;
  Zone?: string;
}

export interface UiDrillPlan {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UiDrillPlanValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UiDrillPlanRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillPattern?: string;
  DataSource: string;
  DrillPlanId?: string;
  DrillPlanStatus?: string;
  DrillPriority: number;
  DrillType?: string;
  Grid?: string;
  HoleNm?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleStatus?: string;
  HoleType?: string;
  InfillTarget?: string;
  ODSPriority: number;
  Organization: string;
  OtherHoleNm?: string;
  Phase?: string;
  Pit?: string;
  PlannedAzimuth?: number;
  PlannedBy?: string;
  /** @format date-time */
  PlannedCompleteDt?: string;
  PlannedDip?: number;
  PlannedEasting?: number;
  PlannedHoleNm?: string;
  PlannedNorthing?: number;
  PlannedRL?: number;
  /** @format date-time */
  PlannedStartDt?: string;
  PlannedTotalDepth?: number;
  Priority?: number;
  Project: string;
  ProposedHoleNm?: string;
  Prospect?: string;
  QCInsertionRuleId?: string;
  SitePrep?: string;
  SubTarget?: string;
  Target?: string;
  Tenement?: string;
  TWF?: string;
  WaterTableDepth?: number;
  Zone?: string;
}

export interface TransitionStatusDto {
  /**
   * Target status to transition to
   * @maxLength 50
   * @example "Planned"
   */
  toStatus: string;
  /**
   * Reason for status change (required for exceptional statuses)
   * @maxLength 500
   * @example "Site access restricted due to weather conditions"
   */
  reason?: string;
  /**
   * Additional comments about the transition
   * @maxLength 1000
   * @example "Will resume once weather clears"
   */
  comments?: string;
  /**
   * Expected resume date (ISO 8601 format) for Suspended/Stopped status
   * @example "2026-02-15T00:00:00Z"
   */
  expectedResumeOnDt?: string;
}

export interface AvailableTransitionsDto {
  /**
   * Current status
   * @example "Draft"
   */
  currentStatus: string;
  /**
   * List of available status transitions
   * @example ["Planned","Cancelled"]
   */
  availableStatuses: string[];
  /**
   * User role making the request
   * @example "Geologist"
   */
  userRole: string;
}

export interface ReadinessCheckDto {
  /** Field being checked */
  field: string;
  /** Human-readable label for the check */
  label: string;
  /** Whether this check is required */
  required: boolean;
  /** Whether the check passed */
  passed: boolean;
}

export interface ReadinessCheckResultDto {
  /** Whether the plan is ready for transition */
  ready: boolean;
  /** List of readiness checks */
  checks: ReadinessCheckDto[];
}

export interface DrillPlanStatusHistoryBase {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  DrillPlanStatusHistoryId: string;
  Comments?: string;
  DrillPlanId: string;
  /** @format date-time */
  ExpectedResumeOnDt?: string;
  FromStatus: string;
  Reason?: string;
  ToStatus: string;
  TransitionBy: string;
  /** @format date-time */
  TransitionOnDt: string;
}

export interface CreateDrillPlanStatusHistoryDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillPlanStatusHistoryId?: string;
  Comments?: string;
  DrillPlanId?: string;
  /** @format date-time */
  ExpectedResumeOnDt?: string;
  FromStatus?: string;
  Reason?: string;
  ToStatus?: string;
  TransitionBy?: string;
  /** @format date-time */
  TransitionOnDt?: string;
}

export interface UpdateDrillPlanStatusHistoryDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillPlanStatusHistoryId?: string;
  Comments?: string;
  DrillPlanId?: string;
  /** @format date-time */
  ExpectedResumeOnDt?: string;
  FromStatus?: string;
  Reason?: string;
  ToStatus?: string;
  TransitionBy?: string;
  /** @format date-time */
  TransitionOnDt?: string;
  drillPlan?: DrillPlan;
  fromStatus?: DrillPlanStatus;
  toStatus?: DrillPlanStatus;
}

export interface CreateDrillProgramDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillProgram?: string;
  /** @format date-time */
  ActualEnd?: string;
  /** @format date-time */
  ActualStart?: string;
  Budget?: number;
  Contractor?: string;
  DataSource?: string;
  DrillProgramId?: string;
  Objectives?: string;
  Organization?: string;
  /** @format date-time */
  PlannedEnd?: string;
  /** @format date-time */
  PlannedStart?: string;
  ProgramCode?: string;
  ProgramType?: string;
  Project?: string;
  RigType?: string;
  Status?: string;
  Tenement?: string;
}

export interface UpdateDrillProgramDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillProgram?: string;
  /** @format date-time */
  ActualEnd?: string;
  /** @format date-time */
  ActualStart?: string;
  Budget?: number;
  Contractor?: string;
  DataSource?: string;
  DrillProgramId?: string;
  Objectives?: string;
  Organization?: string;
  /** @format date-time */
  PlannedEnd?: string;
  /** @format date-time */
  PlannedStart?: string;
  ProgramCode?: string;
  ProgramType?: string;
  Project?: string;
  RigType?: string;
  Status?: string;
  Tenement?: string;
  contractor?: Company;
  organization?: Organization;
  program?: ProgramCode;
  programType?: ProgramType;
  project?: Project;
  rigType?: RigType;
  status?: DrillPlanStatus;
  tenement?: Tenement;
  drillPatterns?: DrillPattern[];
}

export interface CreateGeologyCombinedLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateGeologyCombinedLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateGeologyCombinedLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  GeologyCombinedLogId?: string;
  AC?: string;
  AltAlbite?: string;
  AltBiotite?: string;
  AltCarbonate?: string;
  AltChlorite?: string;
  AltEpidote?: string;
  AltHematite?: string;
  AltLimonite?: string;
  AltMagnetite?: string;
  AltPyrite?: string;
  AltSericite?: string;
  AltSilica?: string;
  APY?: string;
  BQP?: number;
  CA?: string;
  CD?: string;
  CF?: string;
  ClastComp?: string;
  ClastDistribution?: string;
  CollarId?: string;
  Colour?: string;
  Comments?: string;
  COMPGRP?: string;
  COMPGRPLookup?: string;
  ContactRelation?: string;
  ContactTag?: string;
  Cp?: string;
  DepthFrom?: number;
  DepthTo?: number;
  GLVC?: number;
  GLVC3TSource?: string;
  GR?: string;
  GrainSize?: string;
  IntervalLength?: number;
  JsonData?: string;
  Lithology?: string;
  LithoSuperGr?: string;
  /** @format date-time */
  LoggedDt?: string;
  LoggingEventId?: string;
  Mag?: string;
  MatrixComp?: string;
  MatrixCompSecondary?: string;
  Midpoint?: number;
  MinPot?: number;
  MSVN_Pct?: number;
  MSVN_Thickness_cm?: number;
  Organization?: string;
  Other?: string;
  Other_pct?: number;
  Po?: string;
  Po_MUD?: string;
  PQC?: number;
  Protolith?: string;
  Py?: string;
  PyGr?: string;
  PyMode?: string;
  PyMode1?: string;
  PyMode2?: string;
  Q?: string;
  QC?: number;
  QPC?: number;
  QT?: number;
  QuickLogInd?: boolean;
  SC?: string;
  SE?: string;
  SI?: string;
  Structure?: string;
  Texture?: string;
  TUR?: string;
  Type_MSVN?: string;
  Vein1_Pct?: number;
  Vein1_Thickness_cm?: number;
  Vein2_Pct?: number;
  Vein2_Thickness_cm?: number;
  Vein3_Pct?: number;
  Vein3_Thickness_cm?: number;
  Vein4_Pct?: number;
  Vein4_Thickness_cm?: number;
  Vein5_Pct?: number;
  Vein5_Thickness_cm?: number;
  Vein6_Pct?: number;
  Vein6_Thickness_cm?: number;
  VeinMin?: string;
  VeinMode?: string;
  VeinPct?: number;
  VeinText?: string;
  VG?: boolean;
  Weathering?: string;
}

export interface UpdateGeologyCombinedLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateGeologyCombinedLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateGeologyCombinedLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  GeologyCombinedLogId?: string;
  AC?: string;
  AltAlbite?: string;
  AltBiotite?: string;
  AltCarbonate?: string;
  AltChlorite?: string;
  AltEpidote?: string;
  AltHematite?: string;
  AltLimonite?: string;
  AltMagnetite?: string;
  AltPyrite?: string;
  AltSericite?: string;
  AltSilica?: string;
  APY?: string;
  BQP?: number;
  CA?: string;
  CD?: string;
  CF?: string;
  ClastComp?: string;
  ClastDistribution?: string;
  CollarId?: string;
  Colour?: string;
  Comments?: string;
  COMPGRP?: string;
  COMPGRPLookup?: string;
  ContactRelation?: string;
  ContactTag?: string;
  Cp?: string;
  DepthFrom?: number;
  DepthTo?: number;
  GLVC?: number;
  GLVC3TSource?: string;
  GR?: string;
  GrainSize?: string;
  IntervalLength?: number;
  JsonData?: string;
  Lithology?: string;
  LithoSuperGr?: string;
  /** @format date-time */
  LoggedDt?: string;
  LoggingEventId?: string;
  Mag?: string;
  MatrixComp?: string;
  MatrixCompSecondary?: string;
  Midpoint?: number;
  MinPot?: number;
  MSVN_Pct?: number;
  MSVN_Thickness_cm?: number;
  Organization?: string;
  Other?: string;
  Other_pct?: number;
  Po?: string;
  Po_MUD?: string;
  PQC?: number;
  Protolith?: string;
  Py?: string;
  PyGr?: string;
  PyMode?: string;
  PyMode1?: string;
  PyMode2?: string;
  Q?: string;
  QC?: number;
  QPC?: number;
  QT?: number;
  QuickLogInd?: boolean;
  SC?: string;
  SE?: string;
  SI?: string;
  Structure?: string;
  Texture?: string;
  TUR?: string;
  Type_MSVN?: string;
  Vein1_Pct?: number;
  Vein1_Thickness_cm?: number;
  Vein2_Pct?: number;
  Vein2_Thickness_cm?: number;
  Vein3_Pct?: number;
  Vein3_Thickness_cm?: number;
  Vein4_Pct?: number;
  Vein4_Thickness_cm?: number;
  Vein5_Pct?: number;
  Vein5_Thickness_cm?: number;
  Vein6_Pct?: number;
  Vein6_Thickness_cm?: number;
  VeinMin?: string;
  VeinMode?: string;
  VeinPct?: number;
  VeinText?: string;
  VG?: boolean;
  Weathering?: string;
  ac?: AltInt;
  altAlbite?: AltInt;
  altBiotite?: AltInt;
  altCarbonate?: AltInt;
  altChlorite?: AltInt;
  altEpidote?: AltInt;
  altHematite?: AltInt;
  altLimonite?: AltInt;
  altMagnetite?: AltInt;
  altPyrite?: AltInt;
  altSericite?: AltInt;
  altSilica?: AltInt;
  apy?: MinInt;
  ca?: AltInt;
  cd?: AltInt;
  cf?: AltInt;
  clastComp?: ClastComp;
  clastDistribution?: ClastDistribution;
  collar?: Collar;
  colour?: ColourCode;
  compgrp?: Compgrp;
  compgrpLookup?: Compgrp;
  contactRelation?: ContactRelation;
  cp?: MinInt;
  glvc3TSource?: Glvc3TSource;
  gr?: MinInt;
  grainSize?: LithGrainsize;
  lithology?: Lithology;
  loggingEvent?: LoggingEvent;
  mag?: MagInt;
  matrixComp?: MatrixComp;
  organization?: LoggingEvent;
  other?: MinCode;
  po?: MinInt;
  protolith?: ProtolithCode;
  py?: MinInt;
  pyGr?: LithGrainsize;
  pyMode1?: MinStyle;
  pyMode2?: MinStyle;
  q?: MinInt;
  rowStatus?: RowStatus;
  sc?: AltInt;
  se?: MinInt;
  si?: AltInt;
  structure?: StructType;
  texture?: LithTexture;
  tur?: MinInt;
  veinMin?: MinCode;
  veinMode?: VeinStyle;
  weathering?: Weathering;
}

export interface UpsertGeologyCombinedLoggingDto {
  upsertUiGeologyCombinedLogSheetDto: UpdateGeologyCombinedLogDto[];
  /** Optional LoggingEvent to be upserted along with the UpsertGeologyCombined */
  loggingEvent?: UpdateLoggingEventDto;
}

export interface CreateShearLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateShearLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateShearLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  ShearLogId?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  IntervalLength?: number;
  LoggingEventId?: string;
  Organization?: string;
  Priority?: number;
  SZ_Alpha?: number;
  SZ_Alt?: string;
  SZ_Aspect?: string;
  SZ_Dip?: number;
  SZ_Strike?: number;
  SZ_Struc?: string;
}

export interface UpdateShearLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateShearLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateShearLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  ShearLogId?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  IntervalLength?: number;
  LoggingEventId?: string;
  Organization?: string;
  Priority?: number;
  SZ_Alpha?: number;
  SZ_Alt?: string;
  SZ_Aspect?: string;
  SZ_Dip?: number;
  SZ_Strike?: number;
  SZ_Struc?: string;
  collar?: Collar;
  loggingEvent?: LoggingEvent;
  organization?: Organization;
  rowStatus?: RowStatus;
  szAlt?: AltCode;
  szAspect?: ShearAspect;
  szStruc?: StructType;
}

export interface CreateStructureLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateStructureLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateStructureLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarId?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  FaultId?: string;
  IntervalLength?: number;
  KinematicIndicator?: string;
  Lineation_Delta?: number;
  Lineation_Plunge?: number;
  Lineation_Trend?: number;
  LineationType?: string;
  LoggingEventId?: string;
  MovementSense?: string;
  Organization?: string;
  Plane_Azimuth?: number;
  Plane_Dip?: number;
  Plane_Intensity?: string;
  PlaneType?: string;
  Priority?: number;
  StructureClass?: string;
  StructureLogId?: string;
  StructureType?: string;
  Validated?: boolean;
  ValidatedBy?: string;
  YoungingIndicator?: string;
}

export interface UpdateStructureLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateStructureLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateStructureLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarId?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  FaultId?: string;
  IntervalLength?: number;
  KinematicIndicator?: string;
  Lineation_Delta?: number;
  Lineation_Plunge?: number;
  Lineation_Trend?: number;
  LineationType?: string;
  LoggingEventId?: string;
  MovementSense?: string;
  Organization?: string;
  Plane_Azimuth?: number;
  Plane_Dip?: number;
  Plane_Intensity?: string;
  PlaneType?: string;
  Priority?: number;
  StructureClass?: string;
  StructureLogId?: string;
  StructureType?: string;
  Validated?: boolean;
  ValidatedBy?: string;
  YoungingIndicator?: string;
  collar?: Collar;
  fault?: FaultId;
  kinematicIndicator?: KinematicIndicator;
  lineationType?: StructLineationType;
  loggingEvent?: LoggingEvent;
  movementSense?: MovementSense;
  organization?: Organization;
  planeIntensity?: Intensity;
  planeType?: StructPlaneType;
  rowStatus?: RowStatus;
  structureClass?: StructClass;
  structureType?: StructType;
  validatedBy?: Person;
  youngingIndicator?: YoungingIndicator;
}

export interface CreateStructurePtLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateStructurePtLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateStructurePtLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization?: string;
  StructurePtLogId?: string;
  Albite?: string;
  Alpha?: number;
  Alt1Cd?: string;
  Alt2Cd?: string;
  Azimuth?: number;
  Beta?: number;
  Biotite?: string;
  CarboNationale?: string;
  Chlorite?: string;
  Comments?: string;
  DataSource?: string;
  Depth?: number;
  Dip_Calc?: number;
  Dip_Dir_Calc?: number;
  FacingDirection?: string;
  FractureStyle?: string;
  GLVC?: string;
  Hematite?: string;
  Intensity?: string;
  Joint_Fill_Coating?: string;
  JointApertureWidth?: number;
  JointFiLatitudeLongitudeMin?: string;
  JointRoughness?: string;
  JointShape?: string;
  Lineament_Gamma?: number;
  LineamentType?: string;
  LithCd?: string;
  LoggingEventId?: string;
  Magnetite?: string;
  Min1Cd?: string;
  Min2Cd?: string;
  OrientationQuality?: string;
  ParageneticStage?: string;
  Plunge?: number;
  Priority?: number;
  Pyrite?: string;
  Relog?: string;
  RL_Dip?: number;
  RL_Dip_Dir?: number;
  SelvedgeWidth?: number;
  Sericite?: string;
  ShearSense?: string;
  Silica?: string;
  StructurePointMethod?: string;
  StructurePointQuality?: string;
  StructureType?: string;
  VeinTexture?: string;
  VeinWidth?: number;
  Vergence?: string;
  WaLatitudeLongitudeRockStrength?: string;
  WidthUnitCode?: string;
  Zone?: string;
  ZoneFrom?: number;
  ZoneTo?: number;
  ZoneWidth?: number;
}

export interface UpdateStructurePtLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateStructurePtLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateStructurePtLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization?: string;
  StructurePtLogId?: string;
  Albite?: string;
  Alpha?: number;
  Alt1Cd?: string;
  Alt2Cd?: string;
  Azimuth?: number;
  Beta?: number;
  Biotite?: string;
  CarboNationale?: string;
  Chlorite?: string;
  Comments?: string;
  DataSource?: string;
  Depth?: number;
  Dip_Calc?: number;
  Dip_Dir_Calc?: number;
  FacingDirection?: string;
  FractureStyle?: string;
  GLVC?: string;
  Hematite?: string;
  Intensity?: string;
  Joint_Fill_Coating?: string;
  JointApertureWidth?: number;
  JointFiLatitudeLongitudeMin?: string;
  JointRoughness?: string;
  JointShape?: string;
  Lineament_Gamma?: number;
  LineamentType?: string;
  LithCd?: string;
  LoggingEventId?: string;
  Magnetite?: string;
  Min1Cd?: string;
  Min2Cd?: string;
  OrientationQuality?: string;
  ParageneticStage?: string;
  Plunge?: number;
  Priority?: number;
  Pyrite?: string;
  Relog?: string;
  RL_Dip?: number;
  RL_Dip_Dir?: number;
  SelvedgeWidth?: number;
  Sericite?: string;
  ShearSense?: string;
  Silica?: string;
  StructurePointMethod?: string;
  StructurePointQuality?: string;
  StructureType?: string;
  VeinTexture?: string;
  VeinWidth?: number;
  Vergence?: string;
  WaLatitudeLongitudeRockStrength?: string;
  WidthUnitCode?: string;
  Zone?: string;
  ZoneFrom?: number;
  ZoneTo?: number;
  ZoneWidth?: number;
  albite?: Intensity;
  alt1Cd?: AltCode;
  alt2Cd?: AltCode;
  biotite?: Intensity;
  carboNationale?: Intensity;
  chlorite?: Intensity;
  facingDirection?: FacingDirection;
  fractureStyle?: FractureStyle;
  glvc?: Glvc;
  hematite?: Intensity;
  intensity?: Intensity;
  jointFillCoating?: StructFillType;
  jointFiLatitudeLongitudeMin?: MinCode;
  jointRoughness?: StructRoughness;
  jointShape?: StructShape;
  lineamentType?: LineamentType;
  lithCd?: Lithology;
  loggingEvent?: LoggingEvent;
  magnetite?: Intensity;
  min1Cd?: MinCode;
  min2Cd?: MinCode;
  orientationQuality?: OrientationQuality;
  parageneticStage?: ParageneticStage;
  pyrite?: Intensity;
  relog?: Relog;
  rowStatus?: RowStatus;
  sericite?: Intensity;
  shearSense?: MovementSense;
  silica?: Intensity;
  structurePointMethod?: StructPtMethod;
  structurePointQuality?: StructPtQuality;
  structureType?: StructType;
  veinTexture?: VeinTexture;
  vergence?: Vergence;
  waLatitudeLongitudeRockStrength?: StructWallRockCompetency;
  widthUnit?: Units;
  zone?: StructZone;
}

export interface CreateCoreRecoveryRunLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateCoreRecoveryRunLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateCoreRecoveryRunLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CoreRecoveryRunLogId?: string;
  CollarId?: string;
  Comments?: string;
  Core_Block_From?: number;
  Core_Block_Interval?: number;
  Core_Block_To?: number;
  Core_Loss_Gain_Interval?: number;
  CoreDiameter?: string;
  CoreLoss?: number;
  CoreOrientated?: boolean;
  DataSource?: string;
  Degree_Of_Offset?: number;
  DepthFrom?: number;
  DepthTo?: number;
  IntervalLength?: number;
  JsonData?: string;
  LenC?: number;
  LoggedBy?: string;
  /** @format date-time */
  LoggedDt?: string;
  LoggingEventId?: string;
  Organization?: string;
  OrientationQuality?: string;
  Priority?: number;
  Recovery_Interval?: number;
  Recovery_pct?: number;
  RQD_Interval?: number;
  RQD_pct?: number;
  Solid_Recovery_Interval?: number;
  Solid_Recovery_pct?: number;
  Total_Core_Recovery_Interval?: number;
  Total_Core_Recovery_pct?: number;
}

export interface UpdateCoreRecoveryRunLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateCoreRecoveryRunLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateCoreRecoveryRunLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CoreRecoveryRunLogId?: string;
  CollarId?: string;
  Comments?: string;
  Core_Block_From?: number;
  Core_Block_Interval?: number;
  Core_Block_To?: number;
  Core_Loss_Gain_Interval?: number;
  CoreDiameter?: string;
  CoreLoss?: number;
  CoreOrientated?: boolean;
  DataSource?: string;
  Degree_Of_Offset?: number;
  DepthFrom?: number;
  DepthTo?: number;
  IntervalLength?: number;
  JsonData?: string;
  LenC?: number;
  LoggedBy?: string;
  /** @format date-time */
  LoggedDt?: string;
  LoggingEventId?: string;
  Organization?: string;
  OrientationQuality?: string;
  Priority?: number;
  Recovery_Interval?: number;
  Recovery_pct?: number;
  RQD_Interval?: number;
  RQD_pct?: number;
  Solid_Recovery_Interval?: number;
  Solid_Recovery_pct?: number;
  Total_Core_Recovery_Interval?: number;
  Total_Core_Recovery_pct?: number;
  collar?: Collar;
  coreDiameter?: CoreDiameter;
  loggedBy?: Person;
  loggingEvent?: LoggingEvent;
  organization?: Organization;
  orientationQuality?: OrientationQuality;
  rowStatus?: RowStatus;
}

export interface CreateFractureCountLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateFractureCountLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateFractureCountLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  FractureCountLogId?: string;
  Alignment?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  Emboitement?: string;
  FractureCount?: number;
  IntervalLength?: number;
  JsonData?: string;
  LineQuality?: string;
  LoggedBy?: string;
  /** @format date-time */
  LoggedDt?: string;
  LoggingEventId?: string;
  Method?: string;
  Organization?: string;
  OrientationQuality?: string;
  OrientationType?: string;
  Priority?: number;
}

export interface UpdateFractureCountLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateFractureCountLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateFractureCountLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  FractureCountLogId?: string;
  Alignment?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  Emboitement?: string;
  FractureCount?: number;
  IntervalLength?: number;
  JsonData?: string;
  LineQuality?: string;
  LoggedBy?: string;
  /** @format date-time */
  LoggedDt?: string;
  LoggingEventId?: string;
  Method?: string;
  Organization?: string;
  OrientationQuality?: string;
  OrientationType?: string;
  Priority?: number;
  alignment?: FractureCountAlignment;
  collar?: Collar;
  emboitement?: FractureCountEmboitement;
  lineQuality?: FractureCountLineQuality;
  loggedBy?: Person;
  loggingEvent?: LoggingEvent;
  organization?: Organization;
  orientationQuality?: OrientationQuality;
  orientationType?: OrientationType;
  rowStatus?: RowStatus;
}

export interface CreateMagSusLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateMagSusLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateMagSusLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  MagSusLogId?: string;
  Organization?: string;
  Ave_Reading_SI?: number;
  CalibreCheck?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  Duplicate_Reading?: number;
  HoleDiameter?: string;
  Instrument?: string;
  InstrumentFactorCode?: string;
  IntervalLength?: number;
  LoggingEventId?: string;
  MagSus_SI?: number;
  Priority?: number;
  ReadBy?: string;
  /** @format date-time */
  ReadDt?: string;
  Reading1_SI?: number;
  Reading2_SI?: number;
  Reading3_SI?: number;
  Reading4_SI?: number;
  SampleType?: string;
}

export interface UpdateMagSusLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateMagSusLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateMagSusLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  MagSusLogId?: string;
  Organization?: string;
  Ave_Reading_SI?: number;
  CalibreCheck?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  Duplicate_Reading?: number;
  HoleDiameter?: string;
  Instrument?: string;
  InstrumentFactorCode?: string;
  IntervalLength?: number;
  LoggingEventId?: string;
  MagSus_SI?: number;
  Priority?: number;
  ReadBy?: string;
  /** @format date-time */
  ReadDt?: string;
  Reading1_SI?: number;
  Reading2_SI?: number;
  Reading3_SI?: number;
  Reading4_SI?: number;
  SampleType?: string;
  collar?: Collar;
  holeDiameter?: HoleDiameter;
  instrument?: Instrument;
  instrumentFactor?: MagSusFactor;
  loggingEvent?: LoggingEvent;
  readBy?: Person;
  rowStatus?: RowStatus;
  sampleType?: SampleType;
}

export interface CreateRockMechanicLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateRockMechanicLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateRockMechanicLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  RockMechanicLogId?: string;
  Alpha?: number;
  Beta?: number;
  CollarId?: string;
  CoreQuality?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  FiLatitudeLongitudeTexture?: string;
  FiLatitudeLongitudeThickness?: string;
  FiLatitudeLongitudeType?: string;
  Fill_Min1?: string;
  Fill_Min2?: string;
  GroundWaterIndication?: string;
  Hardness?: string;
  HighAngle_60_90?: number;
  IntactRockStrengthStrong?: string;
  IntactRockStrengthWeak?: string;
  IntervalLength?: number;
  Jn?: string;
  Jr?: string;
  JsonData?: string;
  Jw?: string;
  Lithology?: string;
  LoggedBy?: string;
  /** @format date-time */
  LoggedDt?: string;
  LoggingEventId?: string;
  LongestPieceLengthUnitCode?: string;
  LowAngle_0_30?: number;
  MacroRoughness?: string;
  Matrix_Interval?: number;
  MatrixType?: string;
  MicroRoughness?: string;
  ModAngle_30_60?: number;
  OJ_Count?: number;
  OpenJointSets?: string;
  Organization?: string;
  Persistence?: string;
  Priority?: number;
  QJa?: string;
  QJn?: string;
  QJr?: string;
  QJw?: string;
  QSRF?: string;
  RC_Weak_pct?: number;
  Recovery_Interval?: number;
  Recovery_pct?: number;
  RockMassDomain?: string;
  RockMassFabric?: string;
  RQD_Deere_pct?: number;
  RQD_Interval?: number;
  RQD_pct?: number;
  Solid_Recovery_Interval?: number;
  Solid_Recovery_pct?: number;
  Strength?: string;
  Struct_Freq_Per_Unit_Adj?: number;
  StructureAngleSet?: string;
  StructureInt?: string;
  StructureRoughness?: string;
  StructureSpacing?: string;
  StructureType?: string;
  SubSampled?: boolean;
  Total_Core_Recovery_pct?: number;
  WaLatitudeLongitudeContactType?: string;
  WaLatitudeLongitudeRockAltCd?: string;
  WaLatitudeLongitudeRockAltInt?: string;
  WaLatitudeLongitudeRockCompetency?: string;
  WeatheringStrong?: string;
  WeatheringWeak?: string;
}

export interface UpdateRockMechanicLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateRockMechanicLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateRockMechanicLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  RockMechanicLogId?: string;
  Alpha?: number;
  Beta?: number;
  CollarId?: string;
  CoreQuality?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  FiLatitudeLongitudeTexture?: string;
  FiLatitudeLongitudeThickness?: string;
  FiLatitudeLongitudeType?: string;
  Fill_Min1?: string;
  Fill_Min2?: string;
  GroundWaterIndication?: string;
  Hardness?: string;
  HighAngle_60_90?: number;
  IntactRockStrengthStrong?: string;
  IntactRockStrengthWeak?: string;
  IntervalLength?: number;
  Jn?: string;
  Jr?: string;
  JsonData?: string;
  Jw?: string;
  Lithology?: string;
  LoggedBy?: string;
  /** @format date-time */
  LoggedDt?: string;
  LoggingEventId?: string;
  LongestPieceLengthUnitCode?: string;
  LowAngle_0_30?: number;
  MacroRoughness?: string;
  Matrix_Interval?: number;
  MatrixType?: string;
  MicroRoughness?: string;
  ModAngle_30_60?: number;
  OJ_Count?: number;
  OpenJointSets?: string;
  Organization?: string;
  Persistence?: string;
  Priority?: number;
  QJa?: string;
  QJn?: string;
  QJr?: string;
  QJw?: string;
  QSRF?: string;
  RC_Weak_pct?: number;
  Recovery_Interval?: number;
  Recovery_pct?: number;
  RockMassDomain?: string;
  RockMassFabric?: string;
  RQD_Deere_pct?: number;
  RQD_Interval?: number;
  RQD_pct?: number;
  Solid_Recovery_Interval?: number;
  Solid_Recovery_pct?: number;
  Strength?: string;
  Struct_Freq_Per_Unit_Adj?: number;
  StructureAngleSet?: string;
  StructureInt?: string;
  StructureRoughness?: string;
  StructureSpacing?: string;
  StructureType?: string;
  SubSampled?: boolean;
  Total_Core_Recovery_pct?: number;
  WaLatitudeLongitudeContactType?: string;
  WaLatitudeLongitudeRockAltCd?: string;
  WaLatitudeLongitudeRockAltInt?: string;
  WaLatitudeLongitudeRockCompetency?: string;
  WeatheringStrong?: string;
  WeatheringWeak?: string;
  collar?: Collar;
  coreQuality?: CoreQuality;
  fiLatitudeLongitudeTexture?: StructFillTexture;
  fiLatitudeLongitudeThickness?: StructFillThickness;
  fiLatitudeLongitudeType?: StructFillType;
  fillMin1?: MinCode;
  fillMin2?: MinCode;
  groundWaterIndication?: GroundWaterIndication;
  hardness?: GeotHardness;
  intactRockStrengthStrong?: IntactRockStrength;
  jn?: GeotJn;
  jr?: GeotJr;
  jw?: GeotJw;
  lithology?: Lithology;
  loggedBy?: Person;
  loggingEvent?: LoggingEvent;
  longestPieceLengthUnit?: Units;
  macroRoughness?: GeotMacroRoughness;
  matrixType?: GeotMatrix;
  microRoughness?: GeotMicroRoughness;
  openJointSets?: OpenJointSets;
  organization?: Organization;
  persistence?: GeotPersistence;
  qJa?: GeotJa;
  qJn?: GeotJn;
  qJr?: GeotJr;
  qJw?: GeotJw;
  qsrf?: GeotSrf;
  rockMassDomain?: GeotRockMassDomain;
  rockMassFabric?: RockMassFabric;
  rowStatus?: RowStatus;
  strength?: GeotStrength;
  structureAngleSet?: StructAngleSet;
  structureInt?: Intensity;
  structureRoughness?: StructRoughness;
  structureSpacing?: StructSpacing;
  structureType?: StructType;
  waLatitudeLongitudeContactType?: StructWallContactType;
  waLatitudeLongitudeRockAltCd?: AltCode;
  waLatitudeLongitudeRockAltInt?: Intensity;
  waLatitudeLongitudeRockCompetency?: StructWallRockCompetency;
  weatheringStrong?: Weathering;
  weatheringWeak?: Weathering;
}

export interface CreateRockQualityDesignationLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateRockQualityDesignationLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateRockQualityDesignationLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  RockQualityDesignationLogId?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  IntervalLength?: number;
  JsonData?: string;
  LoggedBy?: string;
  /** @format date-time */
  LoggedDt?: string;
  LoggingEventId?: string;
  LongestPieceLengthUnitCode?: string;
  Organization?: string;
  OrientationQuality?: string;
  Priority?: number;
  Relog?: boolean;
  RQD_Interval?: number;
  RQD_pct?: number;
  StructureCount?: number;
  SumSolidCore?: number;
}

export interface UpdateRockQualityDesignationLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateRockQualityDesignationLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateRockQualityDesignationLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  RockQualityDesignationLogId?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  IntervalLength?: number;
  JsonData?: string;
  LoggedBy?: string;
  /** @format date-time */
  LoggedDt?: string;
  LoggingEventId?: string;
  LongestPieceLengthUnitCode?: string;
  Organization?: string;
  OrientationQuality?: string;
  Priority?: number;
  Relog?: boolean;
  RQD_Interval?: number;
  RQD_pct?: number;
  StructureCount?: number;
  SumSolidCore?: number;
  collar?: Collar;
  loggedBy?: Person;
  loggingEvent?: LoggingEvent;
  longestPieceLengthUnit?: Units;
  organization?: Organization;
  orientationQuality?: OrientationQuality;
  rowStatus?: RowStatus;
}

export interface CreateSpecificGravityPtLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateSpecificGravityPtLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateSpecificGravityPtLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SpecificGravityPtLogId?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  Depth?: number;
  Diameter?: number;
  DiameterUnitCode?: string;
  Dried?: string;
  Length?: number;
  LengthUnitCode?: string;
  Lithology?: string;
  LoggingEventId?: string;
  MeasuredBy?: string;
  /** @format date-time */
  MeasuredDt?: string;
  Organization?: string;
  Priority?: number;
  Reading?: number;
  SampleType?: string;
  SGMethod?: string;
  UnitCode?: string;
  Weather?: string;
  WeightDry?: number;
  WeightUnitCode?: string;
  WeightWet?: number;
}

export interface UpdateSpecificGravityPtLogDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateSpecificGravityPtLogDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateSpecificGravityPtLogDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SpecificGravityPtLogId?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  Depth?: number;
  Diameter?: number;
  DiameterUnitCode?: string;
  Dried?: string;
  Length?: number;
  LengthUnitCode?: string;
  Lithology?: string;
  LoggingEventId?: string;
  MeasuredBy?: string;
  /** @format date-time */
  MeasuredDt?: string;
  Organization?: string;
  Priority?: number;
  Reading?: number;
  SampleType?: string;
  SGMethod?: string;
  UnitCode?: string;
  Weather?: string;
  WeightDry?: number;
  WeightUnitCode?: string;
  WeightWet?: number;
  collar?: Collar;
  diameterUnit?: Units;
  dried?: SgDryMethod;
  lengthUnit?: Units;
  lithology?: Lithology;
  loggingEvent?: LoggingEvent;
  measuredBy?: Person;
  organization?: Organization;
  rowStatus?: RowStatus;
  sampleType?: SampleType;
  sgMethod?: SgMethod;
  unit?: Units;
  weather?: Weathering;
  weightUnit?: Units;
}

export interface CreateLabDispatchDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateLabDispatchDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateLabDispatchDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  LabDispatchId?: string;
  AuthorizedByName?: string;
  AuthorizedBySignature?: string;
  CertificateEmail?: string;
  CertificateFax?: string;
  CertificateInd?: boolean;
  ClientCode?: string;
  CollarId?: string;
  CopyToAddressLine1?: string;
  CopyToAddressLine2?: string;
  CopyToName?: string;
  CourierName?: string;
  /** @format date-time */
  DateReceived?: string;
  /** @format date-time */
  DispatchedDt?: string;
  DispatchNumber?: string;
  DispatchStatus?: string;
  ElementsOrMethods?: string;
  EmailAddress?: string;
  EmailNotificationInd?: boolean;
  FaxNumber?: string;
  HoleNm?: string;
  InvoiceToAddressLine1?: string;
  InvoiceToAddressLine2?: string;
  InvoiceToName?: string;
  LabCode?: string;
  LabReceivedBy?: string;
  /** @format date-time */
  LabReceivedDt?: string;
  OrderNo?: string;
  Organization?: string;
  Priority?: string;
  Project?: string;
  PulpDiscardAfter90Days?: boolean;
  PulpPaidStorageAfter90Days?: boolean;
  PulpReturnAfter90Days?: boolean;
  PulpReturnInd?: boolean;
  QuoteNo?: string;
  RejectDiscardAfter90Days?: boolean;
  RejectPaidStorageAfter90Days?: boolean;
  RejectReturnAfter90Days?: boolean;
  RejectReturnInd?: boolean;
  ReturnAddressLine1?: string;
  ReturnAddressLine2?: string;
  ReturnAddressLine3?: string;
  SampleTypeDrillCore?: boolean;
  SampleTypeOther?: string;
  SampleTypePercussion?: boolean;
  SampleTypeRock?: boolean;
  SampleTypeSediment?: boolean;
  SampleTypeSoil?: boolean;
  SpecialInstructions?: string;
  SubmittedBy?: string;
  TotalSampleCount?: number;
  TotalWeight?: number;
  WaybillNo?: string;
  WebNotificationInd?: boolean;
  WorkorderNo?: string;
}

export interface UpdateLabDispatchDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateLabDispatchDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateLabDispatchDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  LabDispatchId?: string;
  AuthorizedByName?: string;
  AuthorizedBySignature?: string;
  CertificateEmail?: string;
  CertificateFax?: string;
  CertificateInd?: boolean;
  ClientCode?: string;
  CollarId?: string;
  CopyToAddressLine1?: string;
  CopyToAddressLine2?: string;
  CopyToName?: string;
  CourierName?: string;
  /** @format date-time */
  DateReceived?: string;
  /** @format date-time */
  DispatchedDt?: string;
  DispatchNumber?: string;
  DispatchStatus?: string;
  ElementsOrMethods?: string;
  EmailAddress?: string;
  EmailNotificationInd?: boolean;
  FaxNumber?: string;
  HoleNm?: string;
  InvoiceToAddressLine1?: string;
  InvoiceToAddressLine2?: string;
  InvoiceToName?: string;
  LabCode?: string;
  LabReceivedBy?: string;
  /** @format date-time */
  LabReceivedDt?: string;
  OrderNo?: string;
  Organization?: string;
  Priority?: string;
  Project?: string;
  PulpDiscardAfter90Days?: boolean;
  PulpPaidStorageAfter90Days?: boolean;
  PulpReturnAfter90Days?: boolean;
  PulpReturnInd?: boolean;
  QuoteNo?: string;
  RejectDiscardAfter90Days?: boolean;
  RejectPaidStorageAfter90Days?: boolean;
  RejectReturnAfter90Days?: boolean;
  RejectReturnInd?: boolean;
  ReturnAddressLine1?: string;
  ReturnAddressLine2?: string;
  ReturnAddressLine3?: string;
  SampleTypeDrillCore?: boolean;
  SampleTypeOther?: string;
  SampleTypePercussion?: boolean;
  SampleTypeRock?: boolean;
  SampleTypeSediment?: boolean;
  SampleTypeSoil?: boolean;
  SpecialInstructions?: string;
  SubmittedBy?: string;
  TotalSampleCount?: number;
  TotalWeight?: number;
  WaybillNo?: string;
  WebNotificationInd?: boolean;
  WorkorderNo?: string;
  collar?: Collar;
  sampleDispatchs?: SampleDispatch[];
  sampleRegisters?: SampleRegister[];
}

export interface CreatePtSampleDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreatePtSampleDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreatePtSampleDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  AssayDispatchGroup?: string;
  Comments?: string;
  DataSource?: string;
  Depth?: number;
  HasDuplicate?: boolean;
  LoggedBy?: string;
  MeshSize?: string;
  Organization?: string;
  OrpDepth?: number;
  OrpSTN?: string;
  Priority?: number;
  QuartzFlush?: boolean;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleDescription?: string;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  SiteId?: string;
  SoilHorizon?: string;
  Superseded?: boolean;
}

export interface UpdatePtSampleDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdatePtSampleDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdatePtSampleDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  AssayDispatchGroup?: string;
  Comments?: string;
  DataSource?: string;
  Depth?: number;
  HasDuplicate?: boolean;
  LoggedBy?: string;
  MeshSize?: string;
  Organization?: string;
  OrpDepth?: number;
  OrpSTN?: string;
  Priority?: number;
  QuartzFlush?: boolean;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleDescription?: string;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  SiteId?: string;
  SoilHorizon?: string;
  Superseded?: boolean;
  assayDispatchGroup?: AssayDispatchGroup;
  loggedBy?: Person;
  meshSize?: MeshSize;
  organization?: Site;
  rowStatus?: RowStatus;
  sampledBy?: Person;
  sampleType?: SampleType;
  sampleWeightUnit?: Units;
  site?: Site;
  soilHorizon?: SoilHorizon;
}

export interface CreatePtSampleQcDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreatePtSampleQcDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreatePtSampleQcDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  AssayDispatchGroup?: string;
  DataSource?: string;
  LoggedBy?: string;
  Organization?: string;
  OriginalSampleId?: string;
  Priority?: number;
  QCClassification?: string;
  QuartzFlush?: boolean;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleType?: string;
  SiteId?: string;
}

export interface UpdatePtSampleQcDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdatePtSampleQcDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdatePtSampleQcDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  AssayDispatchGroup?: string;
  DataSource?: string;
  LoggedBy?: string;
  Organization?: string;
  OriginalSampleId?: string;
  Priority?: number;
  QCClassification?: string;
  QuartzFlush?: boolean;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleType?: string;
  SiteId?: string;
  assayDispatchGroup?: AssayDispatchGroup;
  loggedBy?: Person;
  organization?: Site;
  originalSample?: SampleRegister;
  qcClassification?: QcClassification;
  rowStatus?: RowStatus;
  sampledBy?: Person;
  sampleType?: SampleType;
  site?: Site;
}

export interface CreateSampleDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateSampleDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateSampleDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  AssayDispatchGroup?: string;
  CollarId?: string;
  Comments?: string;
  Contamination?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  DryFieldSampleWeight?: number;
  DupSpWeight?: string;
  FieldSampleWeight?: number;
  Grid?: string;
  HasDuplicate?: boolean;
  IntervalLength?: number;
  LabSpWeight?: number;
  LoggedBy?: string;
  LogSpWeight?: number;
  Organization?: string;
  Priority?: number;
  QuartzFlush?: boolean;
  RodNo?: number;
  Sample_Recovery_pct?: number;
  SampleAreaUnitCode?: string;
  SampleClassification?: string;
  SampleCondition?: string;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleMethod?: string;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  Shift?: string;
  SubjectiveRecovery?: string;
  Superseded?: boolean;
  WitSpWeight?: number;
}

export interface UpdateSampleDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateSampleDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateSampleDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  AssayDispatchGroup?: string;
  CollarId?: string;
  Comments?: string;
  Contamination?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  DryFieldSampleWeight?: number;
  DupSpWeight?: string;
  FieldSampleWeight?: number;
  Grid?: string;
  HasDuplicate?: boolean;
  IntervalLength?: number;
  LabSpWeight?: number;
  LoggedBy?: string;
  LogSpWeight?: number;
  Organization?: string;
  Priority?: number;
  QuartzFlush?: boolean;
  RodNo?: number;
  Sample_Recovery_pct?: number;
  SampleAreaUnitCode?: string;
  SampleClassification?: string;
  SampleCondition?: string;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleMethod?: string;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  Shift?: string;
  SubjectiveRecovery?: string;
  Superseded?: boolean;
  WitSpWeight?: number;
  assayDispatchGroup?: AssayDispatchGroup;
  collar?: Collar;
  contamination?: Contamination;
  gr?: Grid;
  organization?: SampleRegister;
  rowStatus?: RowStatus;
  sampleAreaUnit?: Units;
  sampleClassification?: SampleClassification;
  sampleCondition?: SampleCondition;
  sampleMethod?: SampleMethod;
  sampleType?: SampleType;
  sampleWeightUnit?: Units;
  shift?: Shift;
  subjectiveRecovery?: SubjRec;
}

export interface CreateSampleDispatchDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateSampleDispatchDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateSampleDispatchDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleDispatchId?: string;
  CollarId?: string;
  DepthFrom?: number;
  DepthTo?: number;
  DispatchSequence?: number;
  DispatchStatus?: string;
  ElementsOrMethodCodes?: string;
  LabDispatchId?: string;
  Organization?: string;
  RushInd?: boolean;
  SampleId?: string;
  SampleNm?: string;
  SampleType?: string;
  SampleWeight?: number;
}

export interface UpdateSampleDispatchDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateSampleDispatchDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateSampleDispatchDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleDispatchId?: string;
  CollarId?: string;
  DepthFrom?: number;
  DepthTo?: number;
  DispatchSequence?: number;
  DispatchStatus?: string;
  ElementsOrMethodCodes?: string;
  LabDispatchId?: string;
  Organization?: string;
  RushInd?: boolean;
  SampleId?: string;
  SampleNm?: string;
  SampleType?: string;
  SampleWeight?: number;
  collar?: Collar;
  labDispatch?: LabDispatch;
}

export interface CreateSampleIndexDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateSampleIndexDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateSampleIndexDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization?: string;
  OriginId?: string;
  SampleId?: string;
  CollarSampleIndexId?: string;
  DepthFrom?: number;
  DepthTo?: number;
  Interval?: number;
  OriginNm?: string;
  OriginType?: string;
  SampleNm?: string;
  SampleTable?: string;
  SampleType?: string;
}

export interface SampleIndex {
  ReportIncludeInd?: boolean;
  ValidationStatus?: SampleIndexValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: SampleIndexRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization: string;
  OriginId: string;
  SampleId: string;
  CollarSampleIndexId: string;
  DepthFrom?: number;
  DepthTo?: number;
  Interval?: number;
  OriginNm: string;
  OriginType: string;
  SampleNm: string;
  SampleTable: string;
  SampleType?: string;
}

export interface UpdateSampleIndexDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateSampleIndexDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateSampleIndexDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization?: string;
  OriginId?: string;
  SampleId?: string;
  CollarSampleIndexId?: string;
  DepthFrom?: number;
  DepthTo?: number;
  Interval?: number;
  OriginNm?: string;
  OriginType?: string;
  SampleNm?: string;
  SampleTable?: string;
  SampleType?: string;
}

export interface CreateSampleQcDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateSampleQcDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateSampleQcDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  AssayDispatchGroup?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  HistoricSampleId?: string;
  Intervallength?: number;
  JsonData?: string;
  LoggedBy?: string;
  Organization?: string;
  OriginalSampleId?: string;
  Priority?: number;
  QCClassification?: string;
  QuartzFlush?: boolean;
  RodNo?: number;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleMethod?: string;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
}

export interface UpdateSampleQcDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateSampleQcDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateSampleQcDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  AssayDispatchGroup?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  HistoricSampleId?: string;
  Intervallength?: number;
  JsonData?: string;
  LoggedBy?: string;
  Organization?: string;
  OriginalSampleId?: string;
  Priority?: number;
  QCClassification?: string;
  QuartzFlush?: boolean;
  RodNo?: number;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleMethod?: string;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  assayDispatchGroup?: AssayDispatchGroup;
  collar?: Collar;
  historicSample?: SampleRegister;
  organization?: SampleRegister;
  originalSample?: SampleRegister;
  qcClassification?: QcClassification;
  rowStatus?: RowStatus;
  sampleMethod?: SampleMethod;
  sampleType?: SampleType;
  sampleWeightUnit?: Units;
}

export interface CreateSampleRegisterDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateSampleRegisterDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateSampleRegisterDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization?: string;
  SampleId?: string;
  AttributeGroup?: string;
  ChkType?: string;
  DataSource?: string;
  DispatchCount?: number;
  IsLab?: boolean;
  JsonData?: string;
  /** @format date-time */
  LastDispatchedDt?: string;
  LastLabDispatchId?: string;
  MigrationPreviousNm?: string;
  SampleNm?: string;
  SourceTable?: string;
}

export interface UpdateSampleRegisterDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateSampleRegisterDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateSampleRegisterDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization?: string;
  SampleId?: string;
  AttributeGroup?: string;
  ChkType?: string;
  DataSource?: string;
  DispatchCount?: number;
  IsLab?: boolean;
  JsonData?: string;
  /** @format date-time */
  LastDispatchedDt?: string;
  LastLabDispatchId?: string;
  MigrationPreviousNm?: string;
  SampleNm?: string;
  SourceTable?: string;
  lastLabDispatch?: LabDispatch;
  rowStatus?: RowStatus;
  assays?: Assay[];
  ptSampleQcs?: PtSampleQc[];
  samples?: Sample[];
  sampleQcs?: SampleQc[];
  standardSampleQcs?: StandardSampleQc[];
  xrfHeaders?: XrfHeader[];
  xrfSamples?: XrfSample[];
  xrfSampleQcs?: XrfSampleQc[];
}

export interface CreateStandardSampleDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateStandardSampleDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateStandardSampleDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  AssayDispatchGroup?: string;
  Comments?: string;
  DataSource?: string;
  Depth?: number;
  Entity2Id?: string;
  EntityId?: string;
  EntityTypeId?: number;
  HasDuplicate?: boolean;
  JsonData?: string;
  LoggedBy?: string;
  Organization?: string;
  Priority?: number;
  QuartzFlush?: boolean;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  StandardId?: string;
}

export interface UpdateStandardSampleDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateStandardSampleDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateStandardSampleDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  AssayDispatchGroup?: string;
  Comments?: string;
  DataSource?: string;
  Depth?: number;
  Entity2Id?: string;
  EntityId?: string;
  EntityTypeId?: number;
  HasDuplicate?: boolean;
  JsonData?: string;
  LoggedBy?: string;
  Organization?: string;
  Priority?: number;
  QuartzFlush?: boolean;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  StandardId?: string;
  assayDispatchGroup?: AssayDispatchGroup;
  entityType?: EntityType;
  organization?: Organization;
  sampleType?: SampleType;
  standard?: QcReference;
}

export interface CreateStandardSampleQcDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateStandardSampleQcDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateStandardSampleQcDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  AssayDispatchGroup?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  HistoricSampleId?: string;
  LoggedBy?: string;
  Organization?: string;
  OriginalSampleId?: string;
  QCClassification?: string;
  QuartzFlush?: boolean;
  /** @format date-time */
  SampledDt?: string;
  StandardId?: string;
}

export interface UpdateStandardSampleQcDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateStandardSampleQcDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateStandardSampleQcDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  AssayDispatchGroup?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  HistoricSampleId?: string;
  LoggedBy?: string;
  Organization?: string;
  OriginalSampleId?: string;
  QCClassification?: string;
  QuartzFlush?: boolean;
  /** @format date-time */
  SampledDt?: string;
  StandardId?: string;
  assayDispatchGroup?: AssayDispatchGroup;
  historicSample?: SampleRegister;
  loggedBy?: Person;
  organization?: Organization;
  originalSample?: SampleRegister;
  qcClassification?: QcClassification;
  rowStatus?: RowStatus;
  standard?: QcReference;
}

export interface CreateXrfSampleDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateXrfSampleDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateXrfSampleDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  Grid?: string;
  HasDuplicate?: boolean;
  IntervalLength?: number;
  JsonData?: string;
  LoggedBy?: string;
  Organization?: string;
  Priority?: number;
  SampleClassification?: string;
  SampleCondition?: string;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleMethod?: string;
  SampleRecovery_Pct?: number;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  Superseded?: boolean;
}

export interface UpdateXrfSampleDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateXrfSampleDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateXrfSampleDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  CollarId?: string;
  Comments?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  Grid?: string;
  HasDuplicate?: boolean;
  IntervalLength?: number;
  JsonData?: string;
  LoggedBy?: string;
  Organization?: string;
  Priority?: number;
  SampleClassification?: string;
  SampleCondition?: string;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleMethod?: string;
  SampleRecovery_Pct?: number;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  Superseded?: boolean;
  collar?: Collar;
  gr?: CoordinateType;
  loggedBy?: Person;
  organization?: SampleRegister;
  rowStatus?: RowStatus;
  sampleClassification?: SampleClassification;
  sampleCondition?: SampleCondition;
  sampledBy?: Person;
  sampleMethod?: SampleMethod;
  sampleType?: SampleType;
  sampleWeightUnit?: Units;
}

export interface CreateXrfSampleQcDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateXrfSampleQcDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateXrfSampleQcDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  CollarId?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  IntervalLength?: number;
  LoggedBy?: string;
  Organization?: string;
  OriginalSampleId?: string;
  Priority?: number;
  QCClassification?: string;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleMethod?: string;
  SampleType?: string;
}

export interface UpdateXrfSampleQcDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateXrfSampleQcDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateXrfSampleQcDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  CollarId?: string;
  DataSource?: string;
  DepthFrom?: number;
  DepthTo?: number;
  IntervalLength?: number;
  LoggedBy?: string;
  Organization?: string;
  OriginalSampleId?: string;
  Priority?: number;
  QCClassification?: string;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleMethod?: string;
  SampleType?: string;
  loggedBy?: Person;
  organization?: SampleRegister;
  originalSample?: SampleRegister;
  qcClassification?: QcClassification;
  rowStatus?: RowStatus;
  sampledBy?: Person;
  sampleMethod?: SampleMethod;
  sampleType?: SampleType;
}

export interface CreateXrfStandardSampleDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateXrfStandardSampleDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateXrfStandardSampleDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  Comments?: string;
  DataSource?: string;
  Entity2Id?: string;
  EntityId?: string;
  EntityTypeId?: number;
  HasDuplicate?: boolean;
  JsonData?: string;
  LoggedBy?: string;
  Organization?: string;
  Priority?: number;
  /** @format date-time */
  SampledDt?: string;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  StandardId?: string;
}

export interface UpdateXrfStandardSampleDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateXrfStandardSampleDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateXrfStandardSampleDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SampleId?: string;
  Comments?: string;
  DataSource?: string;
  Entity2Id?: string;
  EntityId?: string;
  EntityTypeId?: number;
  HasDuplicate?: boolean;
  JsonData?: string;
  LoggedBy?: string;
  Organization?: string;
  Priority?: number;
  /** @format date-time */
  SampledDt?: string;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  StandardId?: string;
  entityType?: EntityType;
  organization?: Organization;
  sampleType?: SampleType;
  standard?: QcReference;
}

export interface AllSamples {
  ReportIncludeInd?: boolean;
  ValidationStatus?: AllSamplesValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: AllSamplesRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  uiAllSamplesId: string;
  SampleNm: string;
  SampleId: string;
  CollarId: string;
  Organization: string;
  DepthFrom?: number;
  DepthTo?: number;
  IntervalLength?: number;
  RodNo?: number;
  SampleType?: string;
  Priority?: number;
  SampleMethod?: string;
  SampleClassification?: string;
  SampleCondition?: string;
  Sample_Recovery_pct?: number;
  SubjectiveRecovery?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  DryFieldSampleWeight?: number;
  FieldSampleWeight?: number;
  LabSpWeight?: number;
  LogSpWeight?: number;
  WitSpWeight?: number;
  SampleAreaUnitCode?: string;
  Contamination?: string;
  Superseded?: boolean;
  /** @format date-time */
  SampledDt?: string;
  SampledBy?: string;
  HasDuplicate?: boolean;
  Grid?: string;
  Shift?: string;
  LoggedBy?: string;
  Comments?: string;
  DupSpWeight?: string;
  QuartzFlush?: boolean;
  AssayDispatchGroup?: string;
  StandardId?: string;
  EntityId?: string;
  Entity2Id?: string;
  EntityTypeId: number;
  SampleRecovery_Pct?: number;
  OriginalSampleId?: string;
  OriginalSampleNm?: string;
  ChkType?: string;
  SourceTable?: string;
  IsLab: boolean;
  SampleRegisterRowStatus: number;
}

export interface UpdateAllSamplesDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateAllSamplesDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateAllSamplesDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  uiAllSamplesId?: string;
  SampleNm?: string;
  SampleId?: string;
  CollarId?: string;
  Organization?: string;
  DepthFrom?: number;
  DepthTo?: number;
  IntervalLength?: number;
  RodNo?: number;
  SampleType?: string;
  Priority?: number;
  SampleMethod?: string;
  SampleClassification?: string;
  SampleCondition?: string;
  Sample_Recovery_pct?: number;
  SubjectiveRecovery?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  DryFieldSampleWeight?: number;
  FieldSampleWeight?: number;
  LabSpWeight?: number;
  LogSpWeight?: number;
  WitSpWeight?: number;
  SampleAreaUnitCode?: string;
  Contamination?: string;
  Superseded?: boolean;
  /** @format date-time */
  SampledDt?: string;
  SampledBy?: string;
  HasDuplicate?: boolean;
  Grid?: string;
  Shift?: string;
  LoggedBy?: string;
  Comments?: string;
  DupSpWeight?: string;
  QuartzFlush?: boolean;
  AssayDispatchGroup?: string;
  StandardId?: string;
  EntityId?: string;
  Entity2Id?: string;
  EntityTypeId?: number;
  SampleRecovery_Pct?: number;
  OriginalSampleId?: string;
  OriginalSampleNm?: string;
  ChkType?: string;
  SourceTable?: string;
  IsLab?: boolean;
  SampleRegisterRowStatus?: number;
  AllSamplesId?: string;
  CompletedBy?: string;
  /** @format date-time */
  CompletedOnDt?: string;
  ValidatedBy?: string;
  /** @format date-time */
  ValidatedOnDt?: string;
  ApprovedBy?: string;
  /** @format date-time */
  ApprovedOnDt?: string;
}

export interface NotificationResponseDto {
  /**
   * Unique identifier for the notification
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  notificationId: string;
  /**
   * Notification title
   * @example "Tom replied to you"
   */
  title: string;
  /**
   * Notification message content
   * @example "Your message has been replied to."
   */
  message: string;
  /**
   * Avatar URL for the notification sender
   * @example "https://avatar.vercel.sh/1"
   */
  avatar: string;
  /**
   * Whether the notification has been read
   * @example false
   */
  isRead: boolean;
  /**
   * Formatted date string (e.g., "3 hours ago", "just now", "2024-10-10")
   * @example "just now"
   */
  date: string;
  /**
   * Notification type/category
   * @example "comment"
   */
  type?: string;
  /**
   * Related entity ID
   * @example "550e8400-e29b-41d4-a716-446655440002"
   */
  relatedEntityId?: string;
  /**
   * Related entity type
   * @example "DrillPlan"
   */
  relatedEntityType?: string;
}

export interface Notification {
  /**
   * Unique identifier for the notification
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  notificationId: string;
  /**
   * Notification title
   * @example "Tom replied to you"
   */
  title: string;
  /**
   * Notification message content
   * @example "Your message has been replied to."
   */
  message: string;
  /**
   * Avatar URL for the notification sender
   * @example "https://avatar.vercel.sh/1"
   */
  avatar?: string | null;
  /**
   * Whether the notification has been read
   * @default false
   * @example false
   */
  isRead: boolean;
  /**
   * User ID to whom the notification belongs
   * @example "550e8400-e29b-41d4-a716-446655440001"
   */
  userId?: string | null;
  /**
   * Notification type/category
   * @example "comment"
   */
  type?: string | null;
  /**
   * Related entity ID (e.g., drill hole, sample)
   * @example "550e8400-e29b-41d4-a716-446655440002"
   */
  relatedEntityId?: string | null;
  /**
   * Related entity type
   * @example "DrillPlan"
   */
  relatedEntityType?: string | null;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2026-02-04T15:30:00.000Z"
   */
  createdAt: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2026-02-04T15:30:00.000Z"
   */
  updatedAt: string;
}

export interface CreateNotificationDto {
  /**
   * Notification title
   * @maxLength 255
   * @example "Tom replied to you"
   */
  title: string;
  /**
   * Notification message content
   * @maxLength 1000
   * @example "Your message has been replied to."
   */
  message: string;
  /**
   * Avatar URL for the notification sender
   * @maxLength 500
   * @example "https://avatar.vercel.sh/1"
   */
  avatar?: string;
  /**
   * Whether the notification has been read
   * @default false
   * @example false
   */
  isRead?: boolean;
  /**
   * User ID to whom the notification belongs
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440001"
   */
  userId?: string;
  /**
   * Notification type/category
   * @maxLength 50
   * @example "comment"
   */
  type?: string;
  /**
   * Related entity ID (e.g., drill hole, sample)
   * @maxLength 255
   * @example "550e8400-e29b-41d4-a716-446655440002"
   */
  relatedEntityId?: string;
  /**
   * Related entity type
   * @maxLength 100
   * @example "DrillPlan"
   */
  relatedEntityType?: string;
}

export interface UpdateNotificationDto {
  /**
   * Notification title
   * @maxLength 255
   * @example "Tom replied to you"
   */
  title?: string;
  /**
   * Notification message content
   * @maxLength 1000
   * @example "Your message has been replied to."
   */
  message?: string;
  /**
   * Avatar URL for the notification sender
   * @maxLength 500
   * @example "https://avatar.vercel.sh/1"
   */
  avatar?: string;
  /**
   * Whether the notification has been read
   * @default false
   * @example false
   */
  isRead?: boolean;
  /**
   * User ID to whom the notification belongs
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440001"
   */
  userId?: string;
  /**
   * Notification type/category
   * @maxLength 50
   * @example "comment"
   */
  type?: string;
  /**
   * Related entity ID (e.g., drill hole, sample)
   * @maxLength 255
   * @example "550e8400-e29b-41d4-a716-446655440002"
   */
  relatedEntityId?: string;
  /**
   * Related entity type
   * @maxLength 100
   * @example "DrillPlan"
   */
  relatedEntityType?: string;
}

export interface DexieChangeDto {
  /**
   * Change type: 1=CREATE, 2=UPDATE, 3=DELETE
   * @example 2
   */
  type: DexieChangeDtoTypeEnum;
  /**
   * Table name
   * @example "collars"
   */
  table: string;
  /**
   * Primary key value
   * @example "COL-123-456"
   */
  key: string;
  /** Full object for CREATE/UPDATE */
  obj?: object;
  /** Only modified fields for UPDATE */
  mods?: object;
  /** Previous state for UPDATE */
  oldObj?: object;
}

export interface SyncContextDto {
  /**
   * Selected drill program IDs for offline sync
   * @example ["PROG-001","PROG-002"]
   */
  selectedProgramIds: string[];
  /**
   * Selected collar IDs for offline sync
   * @example ["COL-123-456","COL-789-012"]
   */
  selectedCollarIds: string[];
}

export interface SyncRequestDto {
  /** Client changes to apply on server */
  clientChanges: DexieChangeDto[];
  /**
   * Last revision ID received from server (null for first sync)
   * @example "12345"
   */
  lastRevision: string | null;
  /** Sync context defining what data to sync */
  syncContext: SyncContextDto;
}

export interface ConflictInfoDto {
  /**
   * Table name
   * @example "collars"
   */
  table: string;
  /**
   * Record key
   * @example "COL-123-456"
   */
  key: string;
  /**
   * Client rowversion
   * @example "0x0000000000AB12CD"
   */
  clientVersion: string;
  /**
   * Server rowversion
   * @example "0x0000000000AB34EF"
   */
  serverVersion: string;
  /** Human-readable conflict reason */
  reason: string;
  /** Server data */
  serverData?: object;
}

export interface SyncResponseDto {
  /** Server changes to apply on client */
  changes: object[];
  /**
   * Current revision ID (for next sync)
   * @example "12346"
   */
  currentRevision: string;
  /**
   * Whether this is a partial response (more data available)
   * @example false
   */
  partial: boolean;
  /** Conflicts detected */
  conflicts?: ConflictInfoDto[];
  /** Optional message */
  message?: string;
}

export interface TableSyncItemDto {
  /**
   * Table name in format Schema_TableName (e.g., DrillHole_Collar)
   * @example "DrillHole_Collar"
   */
  tableName: string;
  /**
   * Last known rowversion in base64 format. Use empty string, "0", or omit to get all active records.
   * @example "AAAAAAAAB9A="
   */
  rv?: string;
}

export interface SyncRvRequestDto {
  /**
   * Array of tables to sync with their last known rowversions
   * @example [{"tableName":"DrillHole_Collar","rv":"AAAAAAAAB9A="},{"tableName":"Geology_GeologyCombinedLog","rv":"AAAAAAAACDE="}]
   */
  tables: TableSyncItemDto[];
}

export interface TableSyncResultDto {
  /**
   * Table name in format Schema_TableName
   * @example "DrillHole_Collar"
   */
  tableName: string;
  /**
   * Number of records returned
   * @example 15
   */
  count: number;
  /** Array of updated records */
  records: object[];
  /** Error message if table sync failed */
  error?: string;
}

export interface SyncRvResponseDto {
  /** Sync results for each table */
  results: TableSyncResultDto[];
  /**
   * Total number of records across all tables
   * @example 42
   */
  totalRecords: number;
  /**
   * Timestamp of sync operation
   * @example "2026-02-11T00:00:00.000Z"
   */
  timestamp: string;
}

export interface CreateAssayBatchDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  BatchNo?: string;
  LabCode?: string;
  AssayBatchId?: string;
  BatchStatus?: string;
  Comments?: string;
  ContractId?: string;
  /** @format date-time */
  DispatchedDt?: string;
  DispatchNo?: string;
  /** @format date-time */
  LabFinalDt?: string;
  /** @format date-time */
  LabJobDt?: string;
  /** @format date-time */
  LabPrelimDt?: string;
  /** @format date-time */
  LabReceivedDt?: string;
  LabSamplePrep?: string;
  /** @format date-time */
  MergeDt?: string;
  ResultsCount?: number;
  ResultsMerged?: number;
  SampleCount?: number;
  SamplesMerged?: number;
  SourceFile?: string;
  Validated?: boolean;
  /** @format date-time */
  ValidatedDt?: string;
}

export interface UpdateAssayBatchDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  BatchNo?: string;
  LabCode?: string;
  AssayBatchId?: string;
  BatchStatus?: string;
  Comments?: string;
  ContractId?: string;
  /** @format date-time */
  DispatchedDt?: string;
  DispatchNo?: string;
  /** @format date-time */
  LabFinalDt?: string;
  /** @format date-time */
  LabJobDt?: string;
  /** @format date-time */
  LabPrelimDt?: string;
  /** @format date-time */
  LabReceivedDt?: string;
  LabSamplePrep?: string;
  /** @format date-time */
  MergeDt?: string;
  ResultsCount?: number;
  ResultsMerged?: number;
  SampleCount?: number;
  SamplesMerged?: number;
  SourceFile?: string;
  Validated?: boolean;
  /** @format date-time */
  ValidatedDt?: string;
  batchStatus?: AssayBatchStatus;
  assays?: Assay[];
  xrfs?: Xrf[];
}

export interface CreateAssayBatchDetailDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  BatchNo?: string;
  LabCode?: string;
  LabElement?: string;
  OriginalMethod?: string;
  AssayBatchDetailId?: string;
  Element?: string;
  GenericMethod?: string;
  Repeat?: string;
  UnitCode?: string;
}

export interface AssayBatchDetail {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  BatchNo: string;
  LabCode: string;
  LabElement: string;
  OriginalMethod: string;
  AssayBatchDetailId: string;
  Element?: string;
  GenericMethod?: string;
  Repeat?: string;
  UnitCode?: string;
}

export interface UpdateAssayBatchDetailDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  BatchNo?: string;
  LabCode?: string;
  LabElement?: string;
  OriginalMethod?: string;
  AssayBatchDetailId?: string;
  Element?: string;
  GenericMethod?: string;
  Repeat?: string;
  UnitCode?: string;
}

export interface CreateAssayBatchStatusDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  AssayBatchStatusId?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  SortOrder?: number;
}

export interface UpdateAssayBatchStatusDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  AssayBatchStatusId?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  SortOrder?: number;
  assayBatchs?: AssayBatch[];
}

export interface CreateAssayBatchStatusLogDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  AssayBatchStatusLogId?: string;
  BatchNo?: string;
  BatchStatus?: string;
  Comments?: string;
  LabCode?: string;
  /** @format date-time */
  LogDt?: string;
  Validated?: boolean;
}

export interface AssayBatchStatusLog {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  AssayBatchStatusLogId: string;
  BatchNo: string;
  BatchStatus?: string;
  Comments?: string;
  LabCode: string;
  /** @format date-time */
  LogDt: string;
  Validated: boolean;
}

export interface UpdateAssayBatchStatusLogDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  AssayBatchStatusLogId?: string;
  BatchNo?: string;
  BatchStatus?: string;
  Comments?: string;
  LabCode?: string;
  /** @format date-time */
  LogDt?: string;
  Validated?: boolean;
}

export interface CreateAssayElementDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Element?: string;
  AssayElementId?: string;
  Description?: string;
  ElementGroup?: string;
  IsDefaultInd?: boolean;
  SortOrder?: number;
  SystemUnits?: string;
}

export interface UpdateAssayElementDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Element?: string;
  AssayElementId?: string;
  Description?: string;
  ElementGroup?: string;
  IsDefaultInd?: boolean;
  SortOrder?: number;
  SystemUnits?: string;
  elementGroup?: AssayElementGroup;
  systemUnits?: Units;
  assayLabElementAliass?: AssayLabElementAlias[];
  qcFilteredsets?: QcFilteredset[];
  xrfs?: Xrf[];
}

export interface CreateAssayElementGroupDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  ElementGroup?: string;
  AssayElementGroupId?: string;
  IsDefaultInd?: boolean;
  SortOrder?: number;
}

export interface UpdateAssayElementGroupDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  ElementGroup?: string;
  AssayElementGroupId?: string;
  IsDefaultInd?: boolean;
  SortOrder?: number;
  assayElements?: AssayElement[];
}

export interface CreateAssayLabDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  LabCode?: string;
  AssayLabId?: string;
  DataSource?: string;
  Email?: string;
  IsDefaultInd?: boolean;
  LabContact1?: string;
  LabContact2?: string;
  LabContact3?: string;
  LabDescription?: string;
  LabLocation?: string;
  RackSize?: number;
  SortOrder?: number;
  WebSite?: string;
}

export interface UpdateAssayLabDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  LabCode?: string;
  AssayLabId?: string;
  DataSource?: string;
  Email?: string;
  IsDefaultInd?: boolean;
  LabContact1?: string;
  LabContact2?: string;
  LabContact3?: string;
  LabDescription?: string;
  LabLocation?: string;
  RackSize?: number;
  SortOrder?: number;
  WebSite?: string;
  qcFilteredsets?: QcFilteredset[];
  qcInsertionRules?: QcInsertionRule[];
}

export interface CreateAssayLabElementAliasDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  LabCode?: string;
  LabElement?: string;
  AssayLabElementAliasId?: string;
  DataSource?: string;
  Element?: string;
  Repeat?: string;
}

export interface UpdateAssayLabElementAliasDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  LabCode?: string;
  LabElement?: string;
  AssayLabElementAliasId?: string;
  DataSource?: string;
  Element?: string;
  Repeat?: string;
  element?: AssayElement;
  assays?: Assay[];
  xrfs?: Xrf[];
}

export interface CreateAssayLabMethodDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  LabCode?: string;
  LabMethod?: string;
  AssayLabMethodId?: string;
  ChargeWeightUnitCode?: string;
  DataSource?: string;
  Description?: string;
  GenericMethod?: string;
}

export interface UpdateAssayLabMethodDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  LabCode?: string;
  LabMethod?: string;
  AssayLabMethodId?: string;
  ChargeWeightUnitCode?: string;
  DataSource?: string;
  Description?: string;
  GenericMethod?: string;
  chargeWeightUnit?: Units;
  genericMethod?: AssayMethodGeneric;
  assays?: Assay[];
  xrfs?: Xrf[];
}

export interface CreateAssayMethodGenericDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  GenericMethod?: string;
  AssayMethodGenericId?: string;
  DataSource?: string;
  Description?: string;
}

export interface UpdateAssayMethodGenericDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  GenericMethod?: string;
  AssayMethodGenericId?: string;
  DataSource?: string;
  Description?: string;
  assayLabMethods?: AssayLabMethod[];
}

export interface CreateQcAnalysisTypeDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  QCAnalysisTypeId?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  SortOrder?: number;
}

export interface QcAnalysisType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  QCAnalysisTypeId: string;
  Description?: string;
  IsDefaultInd: boolean;
  SortOrder: number;
}

export interface UpdateQcAnalysisTypeDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  QCAnalysisTypeId?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  SortOrder?: number;
}

export interface CreateQcClassificationDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  Description?: string;
  FullDescription?: string;
  GridColumn?: number;
  IsDefaultInd?: boolean;
  OrderNo?: number;
  ParentQCClassification?: string;
  Position?: string;
  QCClassificationId?: string;
  QCGroup?: string;
  QCStage?: string;
  QCStageNo?: number;
  SortOrder?: number;
}

export interface UpdateQcClassificationDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  Description?: string;
  FullDescription?: string;
  GridColumn?: number;
  IsDefaultInd?: boolean;
  OrderNo?: number;
  ParentQCClassification?: string;
  Position?: string;
  QCClassificationId?: string;
  QCGroup?: string;
  QCStage?: string;
  QCStageNo?: number;
  SortOrder?: number;
  qcGroup?: QcGroup;
  ptSampleQcs?: PtSampleQc[];
  sampleQcs?: SampleQc[];
  standardSampleQcs?: StandardSampleQc[];
  xrfSampleQcs?: XrfSampleQc[];
}

export interface CreateQcFilteredsetDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  QCFilteredsetId?: string;
  /** @format date-time */
  EffectiveDt?: string;
  Element?: string;
  ElementGroup?: string;
  /** @format date-time */
  ExpiryDt?: string;
  FilterClassification?: string;
  FilterDescription?: string;
  FilterType?: string;
  FilterValue?: string;
  GradeRangeNm?: string;
  LabCode?: string;
  LabDescription?: string;
  LabPriority?: number;
  MaxGrade?: number;
  MinGrade?: number;
  Notes?: string;
  StatisticalLimits?: string;
  Target?: string;
  TargetType?: string;
  UnitCode?: string;
}

export interface UpdateQcFilteredsetDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  QCFilteredsetId?: string;
  /** @format date-time */
  EffectiveDt?: string;
  Element?: string;
  ElementGroup?: string;
  /** @format date-time */
  ExpiryDt?: string;
  FilterClassification?: string;
  FilterDescription?: string;
  FilterType?: string;
  FilterValue?: string;
  GradeRangeNm?: string;
  LabCode?: string;
  LabDescription?: string;
  LabPriority?: number;
  MaxGrade?: number;
  MinGrade?: number;
  Notes?: string;
  StatisticalLimits?: string;
  Target?: string;
  TargetType?: string;
  UnitCode?: string;
  element?: AssayElement;
  lab?: AssayLab;
}

export interface CreateQcGroupDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  QCGroupId?: string;
  SortOrder?: number;
}

export interface UpdateQcGroupDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  QCGroupId?: string;
  SortOrder?: number;
  qcClassifications?: QcClassification[];
}

export interface CreateQcInsertionRuleDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  QCInsertionRuleId?: string;
  BlankFrequency?: number;
  Code?: string;
  Description?: string;
  ETAL4Frequency?: number;
  FDupFrequency?: number;
  IsDefaultInd?: boolean;
  Laboratory?: string;
  Organization?: string;
  PrepDupFrequency?: number;
  RackSize?: number;
  SampleIdPrefix?: string;
  SampleIntervalSize?: number;
  SortOrder?: number;
  StandardFrequency?: number;
}

export interface UpdateQcInsertionRuleDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  QCInsertionRuleId?: string;
  BlankFrequency?: number;
  Code?: string;
  Description?: string;
  ETAL4Frequency?: number;
  FDupFrequency?: number;
  IsDefaultInd?: boolean;
  Laboratory?: string;
  Organization?: string;
  PrepDupFrequency?: number;
  RackSize?: number;
  SampleIdPrefix?: string;
  SampleIntervalSize?: number;
  SortOrder?: number;
  StandardFrequency?: number;
  laboratory?: AssayLab;
  qcInsertionRuleStandardSequences?: QcInsertionRuleStandardSequence[];
}

export interface CreateQcInsertionRuleStandardSequenceDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  QCInsertionRuleStandardSequenceId?: string;
  IsDefaultInd?: boolean;
  IsRepeatStart?: boolean;
  QCInsertionRuleId?: string;
  SortOrder?: number;
  StandardId?: string;
}

export interface UpdateQcInsertionRuleStandardSequenceDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  QCInsertionRuleStandardSequenceId?: string;
  IsDefaultInd?: boolean;
  IsRepeatStart?: boolean;
  QCInsertionRuleId?: string;
  SortOrder?: number;
  StandardId?: string;
  qcInsertionRule?: QcInsertionRule;
  standard?: QcReference;
}

export interface CreateQcReferenceDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  StandardId?: string;
  DataSource?: string;
  /** @format date-time */
  Date_Received?: string;
  IsDefaultInd?: boolean;
  QCReferenceId?: string;
  SortOrder?: number;
  StandardType?: string;
  Supplier?: string;
}

export interface UpdateQcReferenceDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  StandardId?: string;
  DataSource?: string;
  /** @format date-time */
  Date_Received?: string;
  IsDefaultInd?: boolean;
  QCReferenceId?: string;
  SortOrder?: number;
  StandardType?: string;
  Supplier?: string;
  standardType?: QcReferenceType;
  qcInsertionRuleStandardSequences?: QcInsertionRuleStandardSequence[];
  standardSamples?: StandardSample[];
  standardSampleQcs?: StandardSampleQc[];
  xrfStandardSamples?: XrfStandardSample[];
}

export interface CreateQcReferenceTypeDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  QCReferenceTypeId?: string;
  SortOrder?: number;
}

export interface UpdateQcReferenceTypeDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  QCReferenceTypeId?: string;
  SortOrder?: number;
  qcReferences?: QcReference[];
}

export interface CreateQcReferenceValueDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Element?: string;
  GenericMethod?: string;
  StandardId?: string;
  ExpectedOutlier?: number;
  ExpectedStDev?: number;
  ExpectedValue?: number;
  Preferred?: number;
  QCReferenceValueId?: string;
  Units?: string;
  ValueType?: string;
}

export interface UpdateQcReferenceValueDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Element?: string;
  GenericMethod?: string;
  StandardId?: string;
  ExpectedOutlier?: number;
  ExpectedStDev?: number;
  ExpectedValue?: number;
  Preferred?: number;
  QCReferenceValueId?: string;
  Units?: string;
  ValueType?: string;
  units?: Units;
  valueType?: QcReferenceValueType;
}

export interface CreateQcReferenceValueTypeDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  QCReferenceValueTypeId?: string;
  SortOrder?: number;
}

export interface UpdateQcReferenceValueTypeDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  QCReferenceValueTypeId?: string;
  SortOrder?: number;
  qcReferenceValues?: QcReferenceValue[];
}

export interface CreateQcRuleDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  CheckCRM?: string;
  CheckValue1?: number;
  CheckValue2?: number;
  Description?: string;
  Element?: string;
  ExcludeBDLRepeat?: boolean;
  ExcludeBDLStandard?: boolean;
  ExcludeORRepeat?: boolean;
  ExcludeORStandard?: boolean;
  ExcludeUPRepeat?: boolean;
  ExcludeUPScreenTest?: boolean;
  ExcludeUPStandard?: boolean;
  Pass_Pct?: number;
  QCCodesSQL?: string;
  QCRuleId?: string;
  QCType?: string;
  SortOrder?: number;
}

export interface QcRule {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  CheckCRM?: string;
  CheckValue1?: number;
  CheckValue2?: number;
  Description: string;
  Element?: string;
  ExcludeBDLRepeat: boolean;
  ExcludeBDLStandard: boolean;
  ExcludeORRepeat: boolean;
  ExcludeORStandard: boolean;
  ExcludeUPRepeat: boolean;
  ExcludeUPScreenTest: boolean;
  ExcludeUPStandard: boolean;
  Pass_Pct?: number;
  QCCodesSQL?: string;
  QCRuleId: string;
  QCType: string;
  SortOrder: number;
  qcType: QcType;
}

export interface QcType {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Code: string;
  Description?: string;
  IsDefaultInd: boolean;
  QCCodesSQL?: string;
  QCTypeId: string;
  SortOrder: number;
  qcRules: QcRule[];
}

export interface UpdateQcRuleDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  CheckCRM?: string;
  CheckValue1?: number;
  CheckValue2?: number;
  Description?: string;
  Element?: string;
  ExcludeBDLRepeat?: boolean;
  ExcludeBDLStandard?: boolean;
  ExcludeORRepeat?: boolean;
  ExcludeORStandard?: boolean;
  ExcludeUPRepeat?: boolean;
  ExcludeUPScreenTest?: boolean;
  ExcludeUPStandard?: boolean;
  Pass_Pct?: number;
  QCCodesSQL?: string;
  QCRuleId?: string;
  QCType?: string;
  SortOrder?: number;
  qcType?: QcType;
}

export interface CreateQcStatisticalLimitsDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Element?: string;
  Description?: string;
  ElementGroup?: string;
  FailureLimitSigma?: number;
  QCStatisticalLimitsId?: string;
  WarningLimitSigma?: number;
}

export interface QcStatisticalLimits {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  Element: string;
  Description?: string;
  ElementGroup: string;
  FailureLimitSigma: number;
  QCStatisticalLimitsId: string;
  WarningLimitSigma: number;
}

export interface UpdateQcStatisticalLimitsDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Element?: string;
  Description?: string;
  ElementGroup?: string;
  FailureLimitSigma?: number;
  QCStatisticalLimitsId?: string;
  WarningLimitSigma?: number;
}

export interface CreateQcTypeDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  QCCodesSQL?: string;
  QCTypeId?: string;
  SortOrder?: number;
}

export interface UpdateQcTypeDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Code?: string;
  Description?: string;
  IsDefaultInd?: boolean;
  QCCodesSQL?: string;
  QCTypeId?: string;
  SortOrder?: number;
  qcRules?: QcRule[];
}

export interface CreateAssayDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateAssayDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateAssayDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  AssayId?: string;
  Organization?: string;
  AssayClassification?: string;
  AssayResult?: string;
  AssayResultNum?: number;
  BatchNo?: string;
  Element?: string;
  GenericMethod?: string;
  JsonData?: string;
  LabCode?: string;
  LabElement?: string;
  LabSequence?: number;
  LimitLower?: number;
  LimitUpper?: number;
  OriginalMethod?: string;
  PassFail?: string;
  Preferred?: number;
  Reading?: string;
  Repeat?: string;
  SampleId?: string;
  SourceRowNumber?: number;
  sysAssayStatus?: string;
  sysResult?: number;
  UnitCode?: string;
}

export interface UpdateAssayDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateAssayDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateAssayDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  AssayId?: string;
  Organization?: string;
  AssayClassification?: string;
  AssayResult?: string;
  AssayResultNum?: number;
  BatchNo?: string;
  Element?: string;
  GenericMethod?: string;
  JsonData?: string;
  LabCode?: string;
  LabElement?: string;
  LabSequence?: number;
  LimitLower?: number;
  LimitUpper?: number;
  OriginalMethod?: string;
  PassFail?: string;
  Preferred?: number;
  Reading?: string;
  Repeat?: string;
  SampleId?: string;
  SourceRowNumber?: number;
  sysAssayStatus?: string;
  sysResult?: number;
  UnitCode?: string;
  assayClassification?: AssayClassification;
  batchNo?: AssayBatch;
  element?: AssayLabElementAlias;
  genericMethod?: AssayLabMethod;
  lab?: AssayLabMethod;
  labElement?: AssayLabElementAlias;
  originalMethod?: AssayLabMethod;
  sample?: SampleRegister;
  unit?: Units;
}

export interface CreatePivotedAssayResultsDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  PivotedAssayResultsId?: string;
  Au_AR452_ppbT?: number;
  Au_ARE145_ppbT?: number;
  Au_ARE155_ppmT?: number;
  Au_FA001_ppmT?: number;
  Au_FA51AAS_ppmT?: number;
  Au_FA450_ppmT?: number;
  Au_FA550_ppmT?: number;
  Au_FAA505_ppmT?: number;
  Au_FAE505_ppbT?: number;
  Au_FAG505_ppmT?: number;
  Au_UNK_ppbT?: number;
  Organization?: string;
  Preferred?: boolean;
  Repeat?: number;
  SampleId?: string;
  Wt_FAG505_gT?: number;
  Wt_WGH79_kgT?: number;
}

export interface PivotedAssayResults {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  PivotedAssayResultsId: string;
  Au_AR452_ppbT?: number;
  Au_ARE145_ppbT?: number;
  Au_ARE155_ppmT?: number;
  Au_FA001_ppmT?: number;
  Au_FA51AAS_ppmT?: number;
  Au_FA450_ppmT?: number;
  Au_FA550_ppmT?: number;
  Au_FAA505_ppmT?: number;
  Au_FAE505_ppbT?: number;
  Au_FAG505_ppmT?: number;
  Au_UNK_ppbT?: number;
  Organization?: string;
  Preferred?: boolean;
  Repeat?: number;
  SampleId?: string;
  Wt_FAG505_gT?: number;
  Wt_WGH79_kgT?: number;
}

export interface UpdatePivotedAssayResultsDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  PivotedAssayResultsId?: string;
  Au_AR452_ppbT?: number;
  Au_ARE145_ppbT?: number;
  Au_ARE155_ppmT?: number;
  Au_FA001_ppmT?: number;
  Au_FA51AAS_ppmT?: number;
  Au_FA450_ppmT?: number;
  Au_FA550_ppmT?: number;
  Au_FAA505_ppmT?: number;
  Au_FAE505_ppbT?: number;
  Au_FAG505_ppmT?: number;
  Au_UNK_ppbT?: number;
  Organization?: string;
  Preferred?: boolean;
  Repeat?: number;
  SampleId?: string;
  Wt_FAG505_gT?: number;
  Wt_WGH79_kgT?: number;
}

export interface CreatePivotedXrfResultDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  PivotedXRFResultId?: string;
  Organization?: string;
  Preferred?: boolean;
  Repeat?: number;
  SampleId?: string;
}

export interface PivotedXrfResult {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  PivotedXRFResultId: string;
  Organization?: string;
  Preferred?: boolean;
  Repeat?: number;
  SampleId?: string;
}

export interface UpdatePivotedXrfResultDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  PivotedXRFResultId?: string;
  Organization?: string;
  Preferred?: boolean;
  Repeat?: number;
  SampleId?: string;
}

export interface CreateXrfDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateXrfDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateXrfDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization?: string;
  XRFId?: string;
  AssayResult?: string;
  AssayResultNum?: number;
  BatchNo?: string;
  Element?: string;
  GenericMethod?: string;
  LabCode?: string;
  LabElement?: string;
  OriginalMethod?: string;
  PassFail?: string;
  Preferred?: number;
  Reading?: string;
  Repeat?: string;
  SampleId?: string;
  SourceRowNumber?: number;
  sysResult?: number;
  UnitCode?: string;
  XRFHeaderId?: string;
}

export interface UpdateXrfDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateXrfDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateXrfDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization?: string;
  XRFId?: string;
  AssayResult?: string;
  AssayResultNum?: number;
  BatchNo?: string;
  Element?: string;
  GenericMethod?: string;
  LabCode?: string;
  LabElement?: string;
  OriginalMethod?: string;
  PassFail?: string;
  Preferred?: number;
  Reading?: string;
  Repeat?: string;
  SampleId?: string;
  SourceRowNumber?: number;
  sysResult?: number;
  UnitCode?: string;
  XRFHeaderId?: string;
  batchNo?: AssayBatch;
  element?: AssayElement;
  lab?: AssayLabMethod;
  labElement?: AssayLabElementAlias;
  originalMethod?: AssayLabMethod;
  unit?: Units;
  xrfHeader?: XrfHeader;
}

export interface CreateXrfHeaderDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateXrfHeaderDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateXrfHeaderDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization?: string;
  XRFHeaderId?: string;
  /** @format date-time */
  ActionDt?: string;
  BagType?: string;
  Collimated?: boolean;
  DataSource?: string;
  Inspector?: string;
  InstrumentSN?: string;
  JsonData?: string;
  Mode?: string;
  Reading?: string;
  Repeat?: string;
  SampleId?: string;
  SourceRowNumber?: number;
}

export interface UpdateXrfHeaderDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateXrfHeaderDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateXrfHeaderDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  Organization?: string;
  XRFHeaderId?: string;
  /** @format date-time */
  ActionDt?: string;
  BagType?: string;
  Collimated?: boolean;
  DataSource?: string;
  Inspector?: string;
  InstrumentSN?: string;
  JsonData?: string;
  Mode?: string;
  Reading?: string;
  Repeat?: string;
  SampleId?: string;
  SourceRowNumber?: number;
  bagType?: XrfBagType;
  sample?: SampleRegister;
  xrfs?: Xrf[];
}

export interface CreateVwQuickDrillPlanDto {
  DrillHoleId?: string;
  DrillPriority?: number;
  HoleNm?: string;
  HolePurpose?: string;
  HoleStatus?: string;
  HoleType?: string;
  ODSPriority?: number;
  Organization?: string;
  OtherHoleNm?: string;
  PlannedBy?: string;
  PlannedHoleNm?: string;
  /** @format date-time */
  PlannedStartDt?: string;
  PlannedTotalDepth?: number;
  Project?: string;
  ProposedHoleNm?: string;
  Prospect?: string;
  Target?: string;
  vwQuickDrillPlanId?: string;
}

export interface VwQuickDrillPlan {
  DrillHoleId: string;
  DrillPriority: number;
  HoleNm?: string;
  HolePurpose?: string;
  HoleStatus?: string;
  HoleType?: string;
  ODSPriority: number;
  Organization: string;
  OtherHoleNm?: string;
  PlannedBy?: string;
  PlannedHoleNm?: string;
  /** @format date-time */
  PlannedStartDt?: string;
  PlannedTotalDepth?: number;
  Project: string;
  ProposedHoleNm?: string;
  Prospect?: string;
  Target?: string;
  vwQuickDrillPlanId: string;
}

export interface UpdateVwQuickDrillPlanDto {
  DrillHoleId?: string;
  DrillPriority?: number;
  HoleNm?: string;
  HolePurpose?: string;
  HoleStatus?: string;
  HoleType?: string;
  ODSPriority?: number;
  Organization?: string;
  OtherHoleNm?: string;
  PlannedBy?: string;
  PlannedHoleNm?: string;
  /** @format date-time */
  PlannedStartDt?: string;
  PlannedTotalDepth?: number;
  Project?: string;
  ProposedHoleNm?: string;
  Prospect?: string;
  Target?: string;
  vwQuickDrillPlanId?: string;
}

export interface CreateVwCollarDto {
  ActiveInd?: boolean;
  ApprovedInd?: boolean;
  CasingDepth?: number;
  CollarId?: string;
  CollarType?: string;
  Comments?: string;
  CreatedBy?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  DataSource?: string;
  DrillHoleId?: string;
  ExplorationCompany?: string;
  /** @format date-time */
  FinishedOnDt?: string;
  HoleNm?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleStatus?: string;
  HoleType?: string;
  LoggingEventId?: string;
  ModelUseInd?: boolean;
  ModifiedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  Organization?: string;
  OrientationTool?: string;
  OtherHoleNm?: string;
  ParentCollarId?: string;
  Phase?: string;
  Pit?: string;
  PlannedHoleNm?: string;
  PlannedTotalDepth?: number;
  PreCollarDepth?: number;
  PreCollarId?: string;
  Priority?: number;
  Project?: string;
  ProposedHoleNm?: string;
  Prospect?: string;
  Redox?: string;
  ReportIncludeInd?: boolean;
  ResponsiblePerson?: string;
  ResponsiblePerson2?: string;
  Section?: string;
  StartDepth?: number;
  /** @format date-time */
  StartedOnDt?: string;
  SubTarget?: string;
  SupersededById?: string;
  Target?: string;
  Tenement?: string;
  TotalDepth?: number;
  ValidationErrors?: string;
  ValidationStatus?: number;
  vwCollarId?: string;
  WaterTableDepth?: number;
  /** @format date-time */
  WaterTableDepthMeasuredOnDt?: string;
  RowStatus?: RowStatus;
  rv?: string;
}

export interface VwCollar {
  ActiveInd: boolean;
  ApprovedInd: boolean;
  CasingDepth?: number;
  CollarId: string;
  CollarType?: string;
  Comments?: string;
  CreatedBy: string;
  /** @format date-time */
  CreatedOnDt: string;
  DataSource: string;
  DrillHoleId: string;
  ExplorationCompany?: string;
  /** @format date-time */
  FinishedOnDt?: string;
  HoleNm?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleStatus?: string;
  HoleType?: string;
  LoggingEventId: string;
  ModelUseInd: boolean;
  ModifiedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  Organization: string;
  OrientationTool?: string;
  OtherHoleNm?: string;
  ParentCollarId?: string;
  Phase?: string;
  Pit?: string;
  PlannedHoleNm?: string;
  PlannedTotalDepth?: number;
  PreCollarDepth?: number;
  PreCollarId?: string;
  Priority?: number;
  Project?: string;
  ProposedHoleNm?: string;
  Prospect?: string;
  Redox?: string;
  ReportIncludeInd: boolean;
  ResponsiblePerson?: string;
  ResponsiblePerson2?: string;
  Section?: string;
  StartDepth?: number;
  /** @format date-time */
  StartedOnDt?: string;
  SubTarget?: string;
  SupersededById?: string;
  Target?: string;
  Tenement?: string;
  TotalDepth?: number;
  ValidationErrors?: string;
  ValidationStatus: number;
  vwCollarId: string;
  WaterTableDepth?: number;
  /** @format date-time */
  WaterTableDepthMeasuredOnDt?: string;
  RowStatus?: RowStatus;
  rv?: string;
}

export interface UpdateVwCollarDto {
  ActiveInd?: boolean;
  ApprovedInd?: boolean;
  CasingDepth?: number;
  CollarId?: string;
  CollarType?: string;
  Comments?: string;
  CreatedBy?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  DataSource?: string;
  DrillHoleId?: string;
  ExplorationCompany?: string;
  /** @format date-time */
  FinishedOnDt?: string;
  HoleNm?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleStatus?: string;
  HoleType?: string;
  LoggingEventId?: string;
  ModelUseInd?: boolean;
  ModifiedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  Organization?: string;
  OrientationTool?: string;
  OtherHoleNm?: string;
  ParentCollarId?: string;
  Phase?: string;
  Pit?: string;
  PlannedHoleNm?: string;
  PlannedTotalDepth?: number;
  PreCollarDepth?: number;
  PreCollarId?: string;
  Priority?: number;
  Project?: string;
  ProposedHoleNm?: string;
  Prospect?: string;
  Redox?: string;
  ReportIncludeInd?: boolean;
  ResponsiblePerson?: string;
  ResponsiblePerson2?: string;
  Section?: string;
  StartDepth?: number;
  /** @format date-time */
  StartedOnDt?: string;
  SubTarget?: string;
  SupersededById?: string;
  Target?: string;
  Tenement?: string;
  TotalDepth?: number;
  ValidationErrors?: string;
  ValidationStatus?: number;
  vwCollarId?: string;
  WaterTableDepth?: number;
  /** @format date-time */
  WaterTableDepthMeasuredOnDt?: string;
  RowStatus?: RowStatus;
  rv?: string;
}

export interface CreateVwQuickDrillHoleDto {
  CollarId?: string;
  DrillHoleId?: string;
  /** @format date-time */
  FinishedOnDt?: string;
  HoleNm?: string;
  HolePurpose?: string;
  HoleStatus?: string;
  HoleType?: string;
  Organization?: string;
  OtherHoleNm?: string;
  PlannedHoleNm?: string;
  PlannedTotalDepth?: number;
  Project?: string;
  ProposedHoleNm?: string;
  Prospect?: string;
  ResponsiblePerson?: string;
  /** @format date-time */
  StartedOnDt?: string;
  Tenement?: string;
  TotalDepth?: number;
  vwQuickDrillHoleId?: string;
  ReportIncludeInd: boolean;
  RowStatus: number;
  ValidationStatus: number;
}

export interface VwQuickDrillHole {
  CollarId: string;
  DrillHoleId: string;
  /** @format date-time */
  FinishedOnDt?: string;
  HoleNm?: string;
  HolePurpose?: string;
  HoleStatus?: string;
  HoleType?: string;
  Organization: string;
  OtherHoleNm?: string;
  PlannedHoleNm?: string;
  PlannedTotalDepth?: number;
  Project?: string;
  ProposedHoleNm?: string;
  Prospect?: string;
  ResponsiblePerson?: string;
  /** @format date-time */
  StartedOnDt?: string;
  Tenement?: string;
  TotalDepth?: number;
  vwQuickDrillHoleId: string;
}

export interface UpdateVwQuickDrillHoleDto {
  CollarId?: string;
  DrillHoleId?: string;
  /** @format date-time */
  FinishedOnDt?: string;
  HoleNm?: string;
  HolePurpose?: string;
  HoleStatus?: string;
  HoleType?: string;
  Organization?: string;
  OtherHoleNm?: string;
  PlannedHoleNm?: string;
  PlannedTotalDepth?: number;
  Project?: string;
  ProposedHoleNm?: string;
  Prospect?: string;
  ResponsiblePerson?: string;
  /** @format date-time */
  StartedOnDt?: string;
  Tenement?: string;
  TotalDepth?: number;
  vwQuickDrillHoleId?: string;
  ReportIncludeInd?: boolean;
  RowStatus?: number;
  ValidationStatus?: number;
}

export interface CreateVwDrillPlanDto {
  ActiveInd?: boolean;
  CreatedBy?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  DataSource?: string;
  DrillHoleId?: string;
  DrillPattern?: string;
  DrillPlanId?: string;
  DrillPriority?: number;
  DrillType?: string;
  Grid?: string;
  HoleNm?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleStatus?: string;
  HoleType?: string;
  InfillTarget?: string;
  ModifiedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ODSPriority?: number;
  Organization?: string;
  OtherHoleNm?: string;
  Phase?: string;
  Pit?: string;
  PlannedAzimuth?: number;
  PlannedBy?: string;
  /** @format date-time */
  PlannedCompleteDt?: string;
  PlannedDip?: number;
  PlannedEasting?: number;
  PlannedHoleNm?: string;
  PlannedNorthing?: number;
  PlannedRL?: number;
  /** @format date-time */
  PlannedStartDt?: string;
  PlannedTotalDepth?: number;
  Priority?: number;
  Project?: string;
  ProposedHoleNm?: string;
  Prospect?: string;
  QCInsertionRuleId?: string;
  ReportIncludeInd?: boolean;
  SitePrep?: string;
  SubTarget?: string;
  SupersededById?: string;
  Target?: string;
  Tenement?: string;
  TWF?: string;
  ValidationErrors?: string;
  ValidationStatus?: number;
  vwDrillPlanId?: string;
  WaterTableDepth?: number;
  Zone?: string;
  RowStatus?: CreateVwDrillPlanDtoRowStatusEnum;
  rv?: string;
}

export interface VwDrillPlan {
  ActiveInd: boolean;
  CreatedBy: string;
  /** @format date-time */
  CreatedOnDt: string;
  DataSource: string;
  DrillHoleId: string;
  DrillPattern?: string;
  DrillPlanId: string;
  DrillPriority: number;
  DrillType?: string;
  Grid?: string;
  HoleNm?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleStatus?: string;
  HoleType?: string;
  InfillTarget?: string;
  ModifiedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ODSPriority: number;
  Organization: string;
  OtherHoleNm?: string;
  Phase?: string;
  Pit?: string;
  PlannedAzimuth?: number;
  PlannedBy?: string;
  /** @format date-time */
  PlannedCompleteDt?: string;
  PlannedDip?: number;
  PlannedEasting?: number;
  PlannedHoleNm?: string;
  PlannedNorthing?: number;
  PlannedRL?: number;
  /** @format date-time */
  PlannedStartDt?: string;
  PlannedTotalDepth?: number;
  Priority?: number;
  Project: string;
  ProposedHoleNm?: string;
  Prospect?: string;
  QCInsertionRuleId?: string;
  ReportIncludeInd: boolean;
  SitePrep?: string;
  SubTarget?: string;
  SupersededById?: string;
  Target?: string;
  Tenement?: string;
  TWF?: string;
  ValidationErrors?: string;
  ValidationStatus: number;
  vwDrillPlanId: string;
  WaterTableDepth?: number;
  Zone?: string;
  RowStatus?: VwDrillPlanRowStatusEnum;
  rv?: string;
}

export interface UpdateVwDrillPlanDto {
  ActiveInd?: boolean;
  CreatedBy?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  DataSource?: string;
  DrillHoleId?: string;
  DrillPattern?: string;
  DrillPlanId?: string;
  DrillPriority?: number;
  DrillType?: string;
  Grid?: string;
  HoleNm?: string;
  HolePurpose?: string;
  HolePurposeDetail?: string;
  HoleStatus?: string;
  HoleType?: string;
  InfillTarget?: string;
  ModifiedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ODSPriority?: number;
  Organization?: string;
  OtherHoleNm?: string;
  Phase?: string;
  Pit?: string;
  PlannedAzimuth?: number;
  PlannedBy?: string;
  /** @format date-time */
  PlannedCompleteDt?: string;
  PlannedDip?: number;
  PlannedEasting?: number;
  PlannedHoleNm?: string;
  PlannedNorthing?: number;
  PlannedRL?: number;
  /** @format date-time */
  PlannedStartDt?: string;
  PlannedTotalDepth?: number;
  Priority?: number;
  Project?: string;
  ProposedHoleNm?: string;
  Prospect?: string;
  QCInsertionRuleId?: string;
  ReportIncludeInd?: boolean;
  SitePrep?: string;
  SubTarget?: string;
  SupersededById?: string;
  Target?: string;
  Tenement?: string;
  TWF?: string;
  ValidationErrors?: string;
  ValidationStatus?: number;
  vwDrillPlanId?: string;
  WaterTableDepth?: number;
  Zone?: string;
  RowStatus?: UpdateVwDrillPlanDtoRowStatusEnum;
  rv?: string;
}

export interface DrillPlanBase {
  ReportIncludeInd?: boolean;
  ValidationStatus?: DrillPlanBaseValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: DrillPlanBaseRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  DrillPlanId: string;
  DataSource: string;
  DrillPattern: string;
  DrillPriority: number;
  DrillType: string;
  Grid: string;
  HolePurpose: string;
  HolePurposeDetail: string;
  HoleType: string;
  InfillTarget?: string;
  ODSPriority: number;
  Organization: string;
  Phase: string;
  Pit: string;
  PlannedAzimuth?: number;
  PlannedBy: string;
  /** @format date-time */
  PlannedCompleteDt?: string;
  PlannedDip?: number;
  PlannedEasting?: number;
  PlannedNorthing?: number;
  PlannedRL?: number;
  /** @format date-time */
  PlannedStartDt?: string;
  PlannedTotalDepth?: number;
  Priority?: number;
  Project: string;
  Prospect: string;
  QCInsertionRuleId?: string;
  SitePrep?: string;
  SubTarget: string;
  Target: string;
  Tenement: string;
  TWF?: string;
  WaterTableDepth?: number;
  Zone: string;
}

export interface CollarBase {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CollarBaseValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CollarBaseRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarId: string;
  ApprovedInd: boolean;
  CasingDepth?: number;
  CollarType: string;
  Comments?: string;
  DataSource: string;
  ExplorationCompany: string;
  /** @format date-time */
  FinishedOnDt?: string;
  HolePurpose: string;
  HolePurposeDetail?: string;
  HoleType: string;
  LoggingEventId: string;
  ModelUseInd: boolean;
  Organization: string;
  OrientationTool?: string;
  ParentCollarId?: string;
  Phase: string;
  Pit: string;
  PreCollarDepth?: number;
  PreCollarId?: string;
  Priority?: number;
  Project: string;
  Prospect: string;
  Redox?: string;
  ResponsiblePerson: string;
  ResponsiblePerson2: string;
  Section: string;
  StartDepth?: number;
  /** @format date-time */
  StartedOnDt?: string;
  SubTarget: string;
  Target: string;
  Tenement: string;
  TotalDepth?: number;
  WaterTableDepth?: number;
  /** @format date-time */
  WaterTableDepthMeasuredOnDt?: string;
}

export interface CollarCoordinateBase {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CollarCoordinateBaseValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CollarCoordinateBaseRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  CollarCoordinateId: string;
  Organization: string;
  CollarId: string;
  Comments?: string;
  DataSource: string;
  East?: number;
  GeoPoint?: object;
  GeoPointWGS?: object;
  Grid: string;
  Instrument?: string;
  IsDeleted?: boolean;
  North?: number;
  Priority: number;
  PriorityStatus: string;
  RL?: number;
  RLSource?: string;
  SurveyBy?: string;
  SurveyCompany: string;
  SurveyMethod: string;
  /** @format date-time */
  SurveyOnDt?: string;
  Validated?: boolean;
  ValidatedStatus: number;
}

export interface RigSetupBase {
  ReportIncludeInd?: boolean;
  ValidationStatus?: RigSetupBaseValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: RigSetupBaseRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  RigSetupId: string;
  Comments?: string;
  DataSource: string;
  DownHoleSurveyDriller: string;
  DownHoleSurveyDrillerSignature?: string;
  /** @format date-time */
  DownHoleSurveyDrillerSignatureDt?: string;
  DownHoleSurveyDrillingContractor: string;
  DownHoleSurveyRigNo: string;
  DrillingCompany: string;
  DrillingSignature?: string;
  /** @format date-time */
  DrillingSignatureDt?: string;
  DrillPlanId: string;
  DrillSupervisor: string;
  FinalGeologist: string;
  FinalGeologistSignature?: string;
  /** @format date-time */
  FinalGeologistSignatureDt?: string;
  FinalInclination?: number;
  FinalMagAzimuth?: number;
  FinalSetupApprovedBy: string;
  FinalSetupDrillSupervisor: string;
  FinalSetupDrillSupervisorSignature?: string;
  /** @format date-time */
  FinalSetupDrillSupervisorSignatureDt?: string;
  FinalSetupSignature?: string;
  /** @format date-time */
  FinalSetupSignatureDt?: string;
  Organization: string;
  PadInspectionCompletedBy: string;
  PadInspectionSignature?: string;
  /** @format date-time */
  PadInspectionSignatureDt?: string;
  RigAlignmentToolDip?: number;
  RigAlignmentToolMagAzi?: number;
  SurveyDepth?: number;
  SurveyDip?: number;
  SurveyMagAzi?: number;
  SurveyReference?: string;
}

export interface GeologyCombinedLogBase {
  ReportIncludeInd?: boolean;
  ValidationStatus?: GeologyCombinedLogBaseValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: GeologyCombinedLogBaseRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  GeologyCombinedLogId: string;
  AC: string;
  AltAlbite: string;
  AltBiotite: string;
  AltCarbonate: string;
  AltChlorite: string;
  AltEpidote: string;
  AltHematite: string;
  AltLimonite: string;
  AltMagnetite: string;
  AltPyrite: string;
  AltSericite: string;
  AltSilica: string;
  APY: string;
  BQP?: number;
  CA: string;
  CD: string;
  CF: string;
  ClastComp: string;
  ClastDistribution: string;
  CollarId: string;
  Colour: string;
  Comments?: string;
  COMPGRP: string;
  COMPGRPLookup: string;
  ContactRelation: string;
  ContactTag?: string;
  Cp: string;
  DepthFrom: number;
  DepthTo: number;
  GLVC?: number;
  GLVC3TSource: string;
  GR: string;
  GrainSize: string;
  IntervalLength?: number;
  JsonData?: string;
  Lithology: string;
  LithoSuperGr?: string;
  /** @format date-time */
  LoggedDt: string;
  LoggingEventId: string;
  Mag: string;
  MatrixComp: string;
  MatrixCompSecondary?: string;
  Midpoint?: number;
  MinPot?: number;
  MSVN_Pct?: number;
  MSVN_Thickness_cm?: number;
  Organization: string;
  Other: string;
  Other_pct?: number;
  Po: string;
  Po_MUD?: string;
  PQC?: number;
  Protolith: string;
  Py: string;
  PyGr: string;
  PyMode?: string;
  PyMode1: string;
  PyMode2: string;
  Q: string;
  QC?: number;
  QPC?: number;
  QT?: number;
  QuickLogInd: boolean;
  SC: string;
  SE: string;
  SI: string;
  Structure: string;
  Texture: string;
  TUR: string;
  Type_MSVN?: string;
  Vein1_Pct?: number;
  Vein1_Thickness_cm?: number;
  Vein2_Pct?: number;
  Vein2_Thickness_cm?: number;
  Vein3_Pct?: number;
  Vein3_Thickness_cm?: number;
  Vein4_Pct?: number;
  Vein4_Thickness_cm?: number;
  Vein5_Pct?: number;
  Vein5_Thickness_cm?: number;
  Vein6_Pct?: number;
  Vein6_Thickness_cm?: number;
  VeinMin: string;
  VeinMode: string;
  VeinPct?: number;
  VeinText?: string;
  VG?: boolean;
  Weathering: string;
}

export interface SurveyBase {
  ReportIncludeInd?: boolean;
  ValidationStatus?: SurveyBaseValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: SurveyBaseRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SurveyId: string;
  CollarId: string;
  Organization: string;
  SurveyNm?: string;
}

export interface SurveyLogBase {
  ReportIncludeInd?: boolean;
  ValidationStatus?: SurveyLogBaseValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: SurveyLogBaseRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  SurveyLogId: string;
  AzimuthDeviation?: number;
  AzimuthMagnetic?: number;
  AzimuthMagneticReversed?: number;
  AzimuthUTM?: number;
  AzimuthUTMField?: number;
  Comments?: string;
  DataSource: string;
  Depth: number;
  Deviation?: string;
  Dip?: number;
  DipDeviation?: number;
  DownHoleSurveyMethod: string;
  Grid: string;
  LoggingEventId: string;
  MagneticFieldStrength?: number;
  MagneticInclination?: number;
  MagneticStatus?: string;
  Organization: string;
  SurveyCompany: string;
  /** @format date-time */
  SurveyedOnDt?: string;
  SurveyId: string;
  SurveyInstrument: string;
  SurveyOperator: string;
  SurveyReliability: string;
  Validation?: boolean;
}

export interface UiDrillHole {
  uiDrillHoleId: string;
  DrillHoleId: string;
  Organization: string;
  HoleNm?: string;
  OtherHoleNm?: string;
  PlannedHoleNm?: string;
  ProposedHoleNm?: string;
  DrillPlanStatus: number;
  DrillPlan?: DrillPlanBase;
  CollarRowStatus: number;
  Collar?: CollarBase;
  CollarCoordinate?: CollarCoordinateBase;
  DrillMethod?: DrillMethodBase[];
  RigSetupRowStatus: number;
  RigSetup?: RigSetupBase;
  GeologyCombinedLogRowStatus: number;
  GeologyCombinedLog?: GeologyCombinedLogBase[];
  SurveyRowStatus: number;
  Survey?: SurveyBase;
  SurveyLogRowStatus: number;
  SurveyLog?: SurveyLogBase[];
  SampleRowStatus: number;
  Sample?: AllSamples[];
}

export interface UpdateUiDrillHoleDto {
  uiDrillHoleId?: string;
  DrillHoleId?: string;
  Organization?: string;
  HoleNm?: string;
  OtherHoleNm?: string;
  PlannedHoleNm?: string;
  ProposedHoleNm?: string;
  DrillPlanStatus?: number;
  DrillPlan?: DrillPlanBase;
  CollarRowStatus?: number;
  Collar?: CollarBase;
  CollarCoordinate?: CollarCoordinateBase;
  DrillMethod?: DrillMethodBase[];
  RigSetupRowStatus?: number;
  RigSetup?: RigSetupBase;
  GeologyCombinedLogRowStatus?: number;
  GeologyCombinedLog?: GeologyCombinedLogBase[];
  SurveyRowStatus?: number;
  Survey?: SurveyBase;
  SurveyLogRowStatus?: number;
  SurveyLog?: SurveyLogBase[];
  SampleRowStatus?: number;
  Sample?: AllSamples[];
  DrillPlanRowStatus?: number;
}

export interface SectionVersionDto {
  /**
   * Entity type description from Lookup.EntityType
   * @example "Collar"
   */
  Description: string;
  /**
   * Entity ID (UUID)
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  EntityId: string;
  /**
   * Entity type code (TinyInt)
   * @example 1
   */
  EntityTypeId: number;
  /**
   * ModifiedOnDt
   * @format date-time
   * @example ""
   */
  ModifiedOnDt: string;
  /**
   * ModifiedBy
   * @example ""
   */
  ModifiedBy: string;
  /**
   * Row version (timestamp) as base64 string
   * @example "AAAAAAAAA+E="
   */
  rv?: string;
}

export interface CreateUiAllSamplesDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: CreateUiAllSamplesDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: CreateUiAllSamplesDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  AssayDispatchGroup?: string;
  AttributeGroup?: string;
  ChkType?: string;
  CollarId?: string;
  Comments?: string;
  Contamination?: string;
  DepthFrom?: number;
  DepthTo?: number;
  DispatchCount?: number;
  DryFieldSampleWeight?: number;
  DupSpWeight?: string;
  Entity2Id?: string;
  EntityId?: string;
  EntityTypeId?: number;
  FieldSampleWeight?: number;
  Grid?: string;
  HasDuplicate?: boolean;
  IntervalLength?: number;
  IsLab?: boolean;
  LabSpWeight?: number;
  /** @format date-time */
  LastDispatchedDt?: string;
  LastLabDispatchId?: string;
  LoggedBy?: string;
  LogSpWeight?: number;
  Organization?: string;
  OriginalSampleId?: string;
  OriginalSampleNm?: string;
  Priority?: number;
  QuartzFlush?: boolean;
  RodNo?: number;
  Sample_Recovery_pct?: number;
  SampleAreaUnitCode?: string;
  SampleClassification?: string;
  SampleCondition?: string;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleId?: string;
  SampleMethod?: string;
  SampleNm?: string;
  SampleRecovery_Pct?: number;
  SampleRegisterRowStatus?: number;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  Shift?: string;
  SourceTable?: string;
  StandardId?: string;
  SubjectiveRecovery?: string;
  Superseded?: boolean;
  uiAllSamplesId?: string;
  WitSpWeight?: number;
}

export interface UiAllSamples {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UiAllSamplesValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UiAllSamplesRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  AssayDispatchGroup?: string;
  AttributeGroup?: string;
  ChkType?: string;
  CollarId?: string;
  Comments?: string;
  Contamination?: string;
  DepthFrom?: number;
  DepthTo?: number;
  DispatchCount: number;
  DryFieldSampleWeight?: number;
  DupSpWeight?: string;
  Entity2Id?: string;
  EntityId?: string;
  EntityTypeId?: number;
  FieldSampleWeight?: number;
  Grid?: string;
  HasDuplicate?: boolean;
  IntervalLength?: number;
  IsLab: boolean;
  LabSpWeight?: number;
  /** @format date-time */
  LastDispatchedDt?: string;
  LastLabDispatchId?: string;
  LoggedBy?: string;
  LogSpWeight?: number;
  Organization: string;
  OriginalSampleId?: string;
  OriginalSampleNm?: string;
  Priority?: number;
  QuartzFlush?: boolean;
  RodNo?: number;
  Sample_Recovery_pct?: number;
  SampleAreaUnitCode?: string;
  SampleClassification?: string;
  SampleCondition?: string;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleId: string;
  SampleMethod?: string;
  SampleNm: string;
  SampleRecovery_Pct?: number;
  SampleRegisterRowStatus: number;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  Shift?: string;
  SourceTable?: string;
  StandardId?: string;
  SubjectiveRecovery?: string;
  Superseded?: boolean;
  uiAllSamplesId: string;
  WitSpWeight?: number;
}

export interface UpdateUiAllSamplesDto {
  ReportIncludeInd?: boolean;
  ValidationStatus?: UpdateUiAllSamplesDtoValidationStatusEnum;
  ValidationErrors?: string | null;
  RowStatus?: UpdateUiAllSamplesDtoRowStatusEnum;
  SupersededById?: string;
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  AssayDispatchGroup?: string;
  AttributeGroup?: string;
  ChkType?: string;
  CollarId?: string;
  Comments?: string;
  Contamination?: string;
  DepthFrom?: number;
  DepthTo?: number;
  DispatchCount?: number;
  DryFieldSampleWeight?: number;
  DupSpWeight?: string;
  Entity2Id?: string;
  EntityId?: string;
  EntityTypeId?: number;
  FieldSampleWeight?: number;
  Grid?: string;
  HasDuplicate?: boolean;
  IntervalLength?: number;
  IsLab?: boolean;
  LabSpWeight?: number;
  /** @format date-time */
  LastDispatchedDt?: string;
  LastLabDispatchId?: string;
  LoggedBy?: string;
  LogSpWeight?: number;
  Organization?: string;
  OriginalSampleId?: string;
  OriginalSampleNm?: string;
  Priority?: number;
  QuartzFlush?: boolean;
  RodNo?: number;
  Sample_Recovery_pct?: number;
  SampleAreaUnitCode?: string;
  SampleClassification?: string;
  SampleCondition?: string;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleId?: string;
  SampleMethod?: string;
  SampleNm?: string;
  SampleRecovery_Pct?: number;
  SampleRegisterRowStatus?: number;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  Shift?: string;
  SourceTable?: string;
  StandardId?: string;
  SubjectiveRecovery?: string;
  Superseded?: boolean;
  uiAllSamplesId?: string;
  WitSpWeight?: number;
}

export interface SpCalculateDuplicateRsd {
  /** Duplicate sample identifier */
  DuplicateSampleId: string;
  /** Original sample identifier */
  OriginalSampleId: string;
  /** Duplicate sample name */
  DuplicateSampleNm?: string;
  /** Original sample name */
  OriginalSampleNm?: string;
  /** Duplicate type (FDUP, PrepDUP, DUP) */
  DuplicateType?: string;
  /** Lab code */
  LabCode?: string;
  /** Batch number */
  BatchNo?: string;
  /**
   * Sample date
   * @format date-time
   */
  SampledDt?: string;
}

export interface SpGetGradeRange {
  /** Element symbol (e.g., Au, Cu, Ag) */
  Element: string;
  /** Grade range classification (e.g., Low, Medium, High) */
  GradeRange: string;
  /** Minimum grade value for this range */
  MinGrade: number;
  /** Maximum grade value for this range */
  MaxGrade: number;
  /** Unit of measurement (e.g., ppm, %, g/t) */
  UnitCode?: string;
  /** Lab code filter (NULL = applies to all labs) */
  LabCode?: string;
  /** Filter type classification */
  FilterType?: string;
  /** Filter classification detail */
  FilterClassification?: string;
  /** Filter description */
  FilterDescription?: string;
  /**
   * Effective date for this grade range configuration
   * @format date-time
   */
  EffectiveDt?: string;
  /**
   * Expiry date for this grade range configuration
   * @format date-time
   */
  ExpiryDt?: string;
  /** Sort order for display */
  SortOrder?: number;
}

export interface SpGetHoleValidation {
  BatchNo?: string;
  BatchStatus: string;
  Element?: string;
  FailCount?: number;
  FailureRate_Pct?: number;
  LabCode?: string;
  /** @format date-time */
  LabFinalDt?: string;
  PassCount?: number;
  TotalQCSamples?: number;
  WarnCount?: number;
}

export interface SpGlobalDashboardRequestDto {
  /**
   * Start date for data retrieval (ISO 8601 format)
   * @example "2025-01-01T00:00:00Z"
   */
  dateFrom: string;
  /**
   * End date for data retrieval (ISO 8601 format)
   * @example "2025-12-31T23:59:59Z"
   */
  dateTo: string;
  /**
   * Laboratory code filter
   * @maxLength 20
   * @example "ALS"
   */
  labCode?: string;
  /**
   * Element filter
   * @maxLength 50
   * @example "Au"
   */
  element?: string;
  /**
   * QC type filter
   * @maxLength 50
   * @example "STD"
   */
  qcType?: SpGlobalDashboardRequestDtoQcTypeEnum;
  /**
   * Standard ID filter
   * @maxLength 50
   * @example "OREAS-101"
   */
  standardId?: string;
  /**
   * Aggregation level for time series data
   * @default "DAILY"
   * @example "DAILY"
   */
  aggregationLevel?: SpGlobalDashboardRequestDtoAggregationLevelEnum;
}

export interface TimeSeriesDataDto {
  /**
   * Time period identifier (date string or batch number)
   * @example "2025-01-15"
   */
  period: string;
  /**
   * Element analyzed
   * @example "Au"
   */
  element: string;
  /**
   * QC sample type
   * @example "STD"
   */
  qcType: TimeSeriesDataDtoQcTypeEnum;
  /**
   * Laboratory code
   * @example "ALS"
   */
  labCode?: string;
  /**
   * Total number of QC samples
   * @example 45
   */
  totalSamples: number;
  /**
   * Number of samples that passed QC
   * @example 42
   */
  passCount: number;
  /**
   * Number of samples with warnings
   * @example 2
   */
  warnCount: number;
  /**
   * Number of samples that failed QC
   * @example 1
   */
  failCount: number;
  /**
   * Failure rate percentage
   * @example 2.22
   */
  failureRate_Pct: number;
  /**
   * Average Z-Score for standards
   * @example 0.15
   */
  avgZScore?: number;
  /**
   * Standard deviation of Z-Scores
   * @example 0.85
   */
  stDevZScore?: number;
  /**
   * Average RPD for duplicates
   * @example 5.2
   */
  avgRPD?: number;
  /**
   * Standard deviation of RPD
   * @example 3.1
   */
  stDevRPD?: number;
  /**
   * Average blank value
   * @example 0.002
   */
  avgBlankValue?: number;
  /**
   * Maximum blank value
   * @example 0.005
   */
  maxBlankValue?: number;
}

export interface SummaryStatisticsDto {
  /**
   * Metric name
   * @example "Overall"
   */
  metric: string;
  /**
   * Metric value
   * @example 1245
   */
  value: number;
  /**
   * Description of the metric
   * @example "Total QC Samples"
   */
  description: string;
}

export interface SpGlobalDashboardResponseDto {
  /** Time series aggregated QC data by period, element, and QC type */
  timeSeriesData: TimeSeriesDataDto[];
  /** Summary statistics including totals, averages, and counts */
  summaryStatistics: SummaryStatisticsDto[];
}

export interface SpGetHoleValidationEnhanced {
  AvgZScore?: number;
  /** @format date-time */
  BatchDate?: string;
  BatchNo: string;
  BlankCount?: number;
  DuplicateCount?: number;
  Element?: string;
  ElementMethodQCStatus: string;
  FailCount?: number;
  FailureRate_Pct?: number;
  GenericMethod?: string;
  LabCode: string;
  PassCount?: number;
  StandardCount?: number;
  TotalQC?: number;
  WarnCount?: number;
}

export interface SpGetGlobalChartsRequestDto {
  /**
   * Start date for chart data
   * @format date-time
   * @example "2024-01-01T00:00:00Z"
   */
  startDate: string;
  /**
   * End date for chart data
   * @format date-time
   * @example "2024-12-31T23:59:59Z"
   */
  endDate: string;
  /**
   * Optional standard ID to filter results
   * @maxLength 50
   * @example "STD-001"
   */
  standardId?: string;
  /**
   * Element to analyze (defaults to Au - Gold)
   * @maxLength 50
   * @default "Au"
   * @example "Au"
   */
  element?: string;
  /**
   * Laboratory code to filter results
   * @maxLength 20
   * @example "LAB-01"
   */
  labCode?: string;
}

export interface ShewhartChartDataDto {
  /**
   * Date and time of the sample
   * @format date-time
   * @example "2024-06-15T10:30:00Z"
   */
  sampleDate?: string;
  /**
   * Standard reference ID
   * @example "STD-001"
   */
  standardId?: string;
  /**
   * Element being analyzed
   * @example "Au"
   */
  element?: string;
  /**
   * Measured value for the element
   * @example 5.42
   */
  measuredValue?: number;
  /**
   * Expected (certified) value for the standard
   * @example 5.5
   */
  expectedValue?: number;
  /**
   * Upper control limit (UCL) - 3 standard deviations above mean
   * @example 6.2
   */
  upperControlLimit?: number;
  /**
   * Upper warning limit (UWL) - 2 standard deviations above mean
   * @example 5.9
   */
  upperWarningLimit?: number;
  /**
   * Lower warning limit (LWL) - 2 standard deviations below mean
   * @example 5.1
   */
  lowerWarningLimit?: number;
  /**
   * Lower control limit (LCL) - 3 standard deviations below mean
   * @example 4.8
   */
  lowerControlLimit?: number;
  /**
   * Laboratory code
   * @example "LAB-01"
   */
  labCode?: string;
  /**
   * Batch number
   * @example "BATCH-2024-001"
   */
  batchNumber?: string;
  /**
   * Control status: In Control, Warning, Out of Control
   * @example "In Control"
   */
  controlStatus?: string;
}

export interface DuplicateCorrelationDataDto {
  /**
   * Element being analyzed
   * @example "Au"
   */
  element?: string;
  /**
   * Original sample value
   * @example 3.45
   */
  originalValue?: number;
  /**
   * Duplicate sample value
   * @example 3.52
   */
  duplicateValue?: number;
  /**
   * Absolute difference between original and duplicate
   * @example 0.07
   */
  absoluteDifference?: number;
  /**
   * Relative difference as percentage
   * @example 2.03
   */
  relativeDifference?: number;
  /**
   * Average of original and duplicate values
   * @example 3.485
   */
  averageValue?: number;
  /**
   * Sample identifier
   * @example "SAMPLE-001"
   */
  sampleId?: string;
  /**
   * Duplicate sample identifier
   * @example "SAMPLE-001-DUP"
   */
  duplicateId?: string;
  /**
   * Laboratory code
   * @example "LAB-01"
   */
  labCode?: string;
  /**
   * Date and time of the sample
   * @format date-time
   * @example "2024-06-15T10:30:00Z"
   */
  sampleDate?: string;
  /**
   * Precision status: Acceptable, Warning, Failed
   * @example "Acceptable"
   */
  precisionStatus?: string;
}

export interface BiasTrendDataDto {
  /**
   * Year-month of the data point
   * @example "2024-06"
   */
  yearMonth?: string;
  /**
   * Laboratory code
   * @example "LAB-01"
   */
  labCode?: string;
  /**
   * Element being analyzed
   * @example "Au"
   */
  element?: string;
  /**
   * Average bias for the month (measured - expected)
   * @example -0.05
   */
  averageBias?: number;
  /**
   * Standard deviation of bias values
   * @example 0.12
   */
  standardDeviation?: number;
  /**
   * Number of samples used in calculation
   * @example 45
   */
  sampleCount?: number;
  /**
   * Average percent bias ((measured - expected) / expected * 100)
   * @example -0.91
   */
  averagePercentBias?: number;
  /**
   * Minimum bias value for the period
   * @example -0.35
   */
  minBias?: number;
  /**
   * Maximum bias value for the period
   * @example 0.25
   */
  maxBias?: number;
  /**
   * Standard reference ID used for bias calculation
   * @example "STD-001"
   */
  standardId?: string;
  /**
   * Bias status: Acceptable, Warning, Unacceptable
   * @example "Acceptable"
   */
  biasStatus?: string;
}

export interface SpGetGlobalChartsResponseDto {
  /**
   * Shewhart control chart data (Result Set 1)
   * @example [{"sampleDate":"2024-06-15T10:30:00Z","standardId":"STD-001","element":"Au","measuredValue":5.42,"expectedValue":5.5,"upperControlLimit":6.2,"upperWarningLimit":5.9,"lowerWarningLimit":5.1,"lowerControlLimit":4.8,"labCode":"LAB-01","batchNumber":"BATCH-2024-001","controlStatus":"In Control"}]
   */
  shewhartChartData: ShewhartChartDataDto[];
  /**
   * Duplicate correlation scatter plot data (Result Set 2)
   * @example [{"element":"Au","originalValue":3.45,"duplicateValue":3.52,"absoluteDifference":0.07,"relativeDifference":2.03,"averageValue":3.485,"sampleId":"SAMPLE-001","duplicateId":"SAMPLE-001-DUP","labCode":"LAB-01","sampleDate":"2024-06-15T10:30:00Z","precisionStatus":"Acceptable"}]
   */
  duplicateCorrelationData: DuplicateCorrelationDataDto[];
  /**
   * Monthly bias trend data by laboratory (Result Set 3)
   * @example [{"yearMonth":"2024-06","labCode":"LAB-01","element":"Au","averageBias":-0.05,"standardDeviation":0.12,"sampleCount":45,"averagePercentBias":-0.91,"minBias":-0.35,"maxBias":0.25,"standardId":"STD-001","biasStatus":"Acceptable"}]
   */
  biasTrendData: BiasTrendDataDto[];
}

export interface GenerateDispatchNumberRequestDto {
  /**
   * Laboratory code for dispatch number generation
   * @maxLength 50
   * @example "ALS"
   */
  labCode: string;
}

export interface GenerateDispatchNumberResponseDto {
  /**
   * Generated dispatch number in format: {LabCode}_{Year}_{SequenceNo}
   * @example "ALS_2025_0001"
   */
  dispatchNumber: string;
}

export interface CreateLabDispatchRequestDto {
  /**
   * Unique identifier for the lab dispatch
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  labDispatchId: string;
  /**
   * Organization code
   * @maxLength 30
   * @example "B2GOLD"
   */
  organization: string;
  /**
   * Collar/Drill hole unique identifier
   * @format uuid
   * @example "660e8400-e29b-41d4-a716-446655440001"
   */
  collarId: string;
  /**
   * Drill hole name
   * @maxLength 100
   * @example "FDH-001"
   */
  holeNm: string;
  /**
   * Project name
   * @maxLength 100
   * @example "Fekola North"
   */
  project: string;
  /**
   * Laboratory code
   * @maxLength 50
   * @example "ALS"
   */
  labCode: string;
  /**
   * Dispatch date (ISO 8601 format)
   * @format date
   * @example "2025-02-01"
   */
  dispatchedDt: string;
  /**
   * Name of person submitting the dispatch
   * @maxLength 100
   * @example "John Smith"
   */
  submittedBy: string;
  /**
   * Name of person authorizing the dispatch
   * @maxLength 100
   * @example "Jane Doe"
   */
  authorizedByName: string;
  /**
   * Username of person creating the dispatch
   * @maxLength 50
   * @example "jsmith"
   */
  createdBy: string;
}

export interface CreateLabDispatchResponseDto {
  /**
   * Auto-generated dispatch number in format: {LabCode}_{Year}_{SequenceNo}
   * @example "ALS_2025_0001"
   */
  dispatchNumber: string;
  /**
   * Row version for optimistic concurrency control (base64 encoded)
   * @example "AAAAAAAAB9E="
   */
  rowVersion: string;
  /**
   * Lab dispatch ID (echoed from request)
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  labDispatchId: string;
}

export interface GetLabDispatchByCollarRequestDto {
  /**
   * Collar/Drill hole unique identifier
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  collarId: string;
  /**
   * Organization code
   * @maxLength 30
   * @example "B2GOLD"
   */
  organization: string;
}

export interface SpGetLabDispatchByCollar {
  ActiveInd: boolean;
  AuthorizedByName: string;
  AuthorizedBySignature?: string;
  CertificateEmail?: string;
  CertificateFax?: string;
  CertificateInd: boolean;
  ClientCode?: string;
  CollarId: string;
  CopyToAddressLine1?: string;
  CopyToAddressLine2?: string;
  CopyToName?: string;
  CourierName?: string;
  CreatedBy: string;
  /** @format date-time */
  CreatedOnDt: string;
  /** @format date-time */
  DateReceived?: string;
  /** @format date-time */
  DispatchedDt: string;
  DispatchNumber: string;
  DispatchStatus: string;
  ElementsOrMethods?: string;
  EmailAddress?: string;
  EmailNotificationInd: boolean;
  FaxNumber?: string;
  HoleNm: string;
  InvoiceToAddressLine1?: string;
  InvoiceToAddressLine2?: string;
  InvoiceToName?: string;
  LabCode: string;
  LabDispatchId: string;
  LabReceivedBy?: string;
  /** @format date-time */
  LabReceivedDt?: string;
  ModifiedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  OrderNo?: string;
  Organization: string;
  Priority?: string;
  Project?: string;
  PulpDiscardAfter90Days: boolean;
  PulpPaidStorageAfter90Days: boolean;
  PulpReturnAfter90Days: boolean;
  PulpReturnInd: boolean;
  QuoteNo?: string;
  RejectDiscardAfter90Days: boolean;
  RejectPaidStorageAfter90Days: boolean;
  RejectReturnAfter90Days: boolean;
  RejectReturnInd: boolean;
  ReportIncludeInd: boolean;
  ReturnAddressLine1?: string;
  ReturnAddressLine2?: string;
  ReturnAddressLine3?: string;
  rv: string;
  SamplesJson?: string;
  SampleTypeDrillCore: boolean;
  SampleTypeOther?: string;
  SampleTypePercussion: boolean;
  SampleTypeRock: boolean;
  SampleTypeSediment: boolean;
  SampleTypeSoil: boolean;
  SpecialInstructions?: string;
  SubmittedBy: string;
  SupersededById?: string;
  TotalSampleCount: number;
  TotalWeight?: number;
  ValidationErrors?: string;
  ValidationStatus: number;
  WaybillNo?: string;
  WebNotificationInd: boolean;
  WorkorderNo?: string;
}

export interface UpdateLabDispatchStatusRequestDto {
  /**
   * Lab dispatch ID
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  labDispatchId: string;
  /**
   * New status for the dispatch
   * @example "Received"
   */
  newStatus: UpdateLabDispatchStatusRequestDtoNewStatusEnum;
  /**
   * Username of person updating the status
   * @maxLength 50
   * @example "jsmith"
   */
  modifiedBy: string;
  /**
   * Current row version for optimistic concurrency control (base64 encoded)
   * @example "AAAAAAAAB9E="
   */
  rowVersion: string;
}

export interface UpdateLabDispatchStatusResponseDto {
  /**
   * New row version after update (base64 encoded)
   * @example "AAAAAAAAB9F="
   */
  newRowVersion: string;
  /**
   * Updated status (echoed from request)
   * @example "Received"
   */
  status: UpdateLabDispatchStatusResponseDtoStatusEnum;
  /**
   * Lab dispatch ID (echoed from request)
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  labDispatchId: string;
}

export interface DeleteLabDispatchRequestDto {
  /**
   * Lab dispatch ID to delete
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  labDispatchId: string;
  /**
   * Username of person deleting the dispatch
   * @maxLength 50
   * @example "jsmith"
   */
  modifiedBy: string;
  /**
   * Current row version for optimistic concurrency control (base64 encoded)
   * @example "AAAAAAAAB9E="
   */
  rowVersion: string;
}

export interface GetSamplesForDispatchRequestDto {
  /**
   * Collar/Drill hole unique identifier
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  collarId: string;
  /**
   * Organization code
   * @maxLength 30
   * @example "B2GOLD"
   */
  organization: string;
  /**
   * Include samples that have already been dispatched
   * @default false
   * @example false
   */
  includeAlreadyDispatched?: boolean;
}

export interface SpGetSamplesForDispatch {
  ActiveInd: boolean;
  AssayDispatchGroup?: string;
  AttributeGroup?: string;
  ChkType?: string;
  CollarId?: string;
  Comments?: string;
  Contamination?: string;
  CreatedBy: string;
  /** @format date-time */
  CreatedOnDt: string;
  DepthFrom?: number;
  DepthTo?: number;
  DispatchCount: number;
  DryFieldSampleWeight?: number;
  DupSpWeight?: string;
  Entity2Id?: string;
  EntityId?: string;
  EntityTypeId?: number;
  FieldSampleWeight?: number;
  Grid?: string;
  HasDuplicate?: boolean;
  IntervalLength?: number;
  IsLab: boolean;
  jsonData?: string;
  LabSpWeight?: number;
  /** @format date-time */
  LastDispatchedDt?: string;
  LastDispatchNumber?: string;
  LastLabDispatchId?: string;
  LoggedBy?: string;
  LogSpWeight?: number;
  ModifiedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  Organization: string;
  OriginalSampleId?: string;
  OriginalSampleNm?: string;
  Priority?: number;
  QuartzFlush?: boolean;
  ReportIncludeInd: boolean;
  RodNo?: number;
  rv: string;
  Sample_Recovery_pct?: number;
  SampleAreaUnitCode?: string;
  SampleClassification?: string;
  SampleCondition?: string;
  SampledBy?: string;
  /** @format date-time */
  SampledDt?: string;
  SampleId: string;
  SampleMethod?: string;
  SampleNm: string;
  SampleRecovery_Pct?: number;
  SampleRegisterRowStatus: number;
  SampleType?: string;
  SampleWeight?: number;
  SampleWeightUnitCode?: string;
  Shift?: string;
  SourceTable?: string;
  StandardId?: string;
  SubjectiveRecovery?: string;
  Superseded?: boolean;
  SupersededById?: string;
  uiAllSamplesId: string;
  ValidationErrors?: string;
  ValidationStatus: number;
  WitSpWeight?: number;
}

export interface AddSamplesToDispatchRequestDto {
  /**
   * Lab dispatch ID to add samples to
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  labDispatchId: string;
  /**
   * Comma-separated list of sample IDs (UUIDs)
   * @maxLength 8000
   * @pattern /^[a-fA-F0-9-]+(,[a-fA-F0-9-]+)*$/
   * @example "660e8400-e29b-41d4-a716-446655440001,770e8400-e29b-41d4-a716-446655440002,880e8400-e29b-41d4-a716-446655440003"
   */
  sampleIds: string;
  /**
   * Username of person adding the samples
   * @maxLength 50
   * @example "jsmith"
   */
  createdBy: string;
}

export interface CreateApplicationLogDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  ApplicationLogId?: number;
  Application?: string;
  Environment?: string;
  ExceptionMessage?: string;
  Host?: string;
  /** @format date-time */
  LogDt?: string;
  LogLevel?: string;
  Message?: string;
  Payload?: string;
  RequestId?: string;
  Source?: string;
  StackTrace?: string;
  UserNm?: string;
}

export interface ApplicationLog {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  ApplicationLogId: number;
  Application?: string;
  Environment?: string;
  ExceptionMessage?: string;
  Host?: string;
  /** @format date-time */
  LogDt: string;
  LogLevel: string;
  Message: string;
  Payload?: string;
  RequestId?: string;
  Source?: string;
  StackTrace?: string;
  UserNm?: string;
}

export interface UpdateApplicationLogDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  ApplicationLogId?: number;
  Application?: string;
  Environment?: string;
  ExceptionMessage?: string;
  Host?: string;
  /** @format date-time */
  LogDt?: string;
  LogLevel?: string;
  Message?: string;
  Payload?: string;
  RequestId?: string;
  Source?: string;
  StackTrace?: string;
  UserNm?: string;
}

export interface CreateConfigDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  ConfigId?: string;
  ConfigTypeCd?: string;
  ConfigTypeValue?: string;
  MineId?: number;
}

export interface Config {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  ConfigId: string;
  ConfigTypeCd: string;
  ConfigTypeValue: string;
  MineId?: number;
}

export interface UpdateConfigDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  ConfigId?: string;
  ConfigTypeCd?: string;
  ConfigTypeValue?: string;
  MineId?: number;
}

export interface CreateLookUpNormalizationDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  LookUpNormalizationId?: string;
  CanonicalTerm?: string;
  Domain?: string;
  IsDefaultInd?: boolean;
  MatchPriority?: number;
  MatchType?: string;
  Organization?: string;
  SortOrder?: number;
  VariantTerm?: string;
}

export interface LookUpNormalization {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  LookUpNormalizationId: string;
  CanonicalTerm: string;
  Domain?: string;
  IsDefaultInd: boolean;
  MatchPriority?: number;
  MatchType?: string;
  Organization?: string;
  SortOrder: number;
  VariantTerm: string;
}

export interface UpdateLookUpNormalizationDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  LookUpNormalizationId?: string;
  CanonicalTerm?: string;
  Domain?: string;
  IsDefaultInd?: boolean;
  MatchPriority?: number;
  MatchType?: string;
  Organization?: string;
  SortOrder?: number;
  VariantTerm?: string;
}

export interface CreatePickListDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  PickListId?: string;
  Description?: string;
  PickListIndex?: number;
  PickListName?: string;
}

export interface PickListValue {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  PickListValueId: string;
  LookupId: string;
  LookupType: string;
  PickListId: string;
  pickList: PickList;
}

export interface PickList {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  PickListId: string;
  Description?: string;
  PickListIndex: number;
  PickListName: string;
  pickListUsers: PickListUser[];
  pickListValues: PickListValue[];
}

export interface PickListUser {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  PickListUserId: string;
  PickListId: string;
  PickListType: string;
  PickListTypeValue: string;
  pickList: PickList;
}

export interface UpdatePickListDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  PickListId?: string;
  Description?: string;
  PickListIndex?: number;
  PickListName?: string;
  pickListUsers?: PickListUser[];
  pickListValues?: PickListValue[];
}

export interface CreatePickListUserDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  PickListUserId?: string;
  PickListId?: string;
  PickListType?: string;
  PickListTypeValue?: string;
}

export interface UpdatePickListUserDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  PickListUserId?: string;
  PickListId?: string;
  PickListType?: string;
  PickListTypeValue?: string;
  pickList?: PickList;
}

export interface CreatePickListValueDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  PickListValueId?: string;
  LookupId?: string;
  LookupType?: string;
  PickListId?: string;
}

export interface UpdatePickListValueDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  PickListValueId?: string;
  LookupId?: string;
  LookupType?: string;
  PickListId?: string;
  pickList?: PickList;
}

export interface CreateTemplateDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  TemplateId?: string;
  Description?: string;
  EnitiyTypeId?: number;
  FileName?: string;
  JsonData?: string;
  Organization?: string;
  TemplateNm?: string;
  TemplateType?: string;
}

export interface Template {
  ActiveInd: boolean;
  rv: string;
  /** @format date-time */
  CreatedOnDt: string;
  CreatedBy: string;
  /** @format date-time */
  ModifiedOnDt: string;
  ModifiedBy: string;
  TemplateId: string;
  Description?: string;
  EnitiyTypeId?: number;
  FileName?: string;
  JsonData?: string;
  Organization: string;
  TemplateNm?: string;
  TemplateType?: string;
}

export interface UpdateTemplateDto {
  ActiveInd?: boolean;
  rv?: string;
  /** @format date-time */
  CreatedOnDt?: string;
  CreatedBy?: string;
  /** @format date-time */
  ModifiedOnDt?: string;
  ModifiedBy?: string;
  TemplateId?: string;
  Description?: string;
  EnitiyTypeId?: number;
  FileName?: string;
  JsonData?: string;
  Organization?: string;
  TemplateNm?: string;
  TemplateType?: string;
}

export type RigSetupValidationStatusEnum = 0 | 1 | 2;

export type RigSetupRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type SampleDispatchValidationStatusEnum = 0 | 1 | 2;

export type SampleDispatchRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type LabDispatchValidationStatusEnum = 0 | 1 | 2;

export type LabDispatchRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type StandardSampleQcValidationStatusEnum = 0 | 1 | 2;

export type StandardSampleQcRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type XrfSampleQcValidationStatusEnum = 0 | 1 | 2;

export type XrfSampleQcRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type SampleQcValidationStatusEnum = 0 | 1 | 2;

export type SampleQcRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type XrfSampleValidationStatusEnum = 0 | 1 | 2;

export type XrfSampleRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type SampleValidationStatusEnum = 0 | 1 | 2;

export type SampleRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type XrfHeaderValidationStatusEnum = 0 | 1 | 2;

export type XrfHeaderRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type SampleRegisterValidationStatusEnum = 0 | 1 | 2;

export type SampleRegisterRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type PtSampleQcValidationStatusEnum = 0 | 1 | 2;

export type PtSampleQcRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type SiteCoordinateValidationStatusEnum = 0 | 1 | 2;

export type SiteCoordinateRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type SiteValidationStatusEnum = 0 | 1 | 2;

export type SiteRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type PtSampleValidationStatusEnum = 0 | 1 | 2;

export type PtSampleRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CommentValidationStatusEnum = 0 | 1 | 2;

export type CommentRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type XrfStandardSampleValidationStatusEnum = 0 | 1 | 2;

export type XrfStandardSampleRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type StandardSampleValidationStatusEnum = 0 | 1 | 2;

export type StandardSampleRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type XrfValidationStatusEnum = 0 | 1 | 2;

export type XrfRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type AssayValidationStatusEnum = 0 | 1 | 2;

export type AssayRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type MetaDataLogValidationStatusEnum = 0 | 1 | 2;

export type MetaDataLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type PtMappingLogValidationStatusEnum = 0 | 1 | 2;

export type PtMappingLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type SpecificGravityPtLogValidationStatusEnum = 0 | 1 | 2;

export type SpecificGravityPtLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type GeologyCombinedLogValidationStatusEnum = 0 | 1 | 2;

export type GeologyCombinedLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type StructureLogValidationStatusEnum = 0 | 1 | 2;

export type StructureLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type ShearLogValidationStatusEnum = 0 | 1 | 2;

export type ShearLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type PtGeologyLogValidationStatusEnum = 0 | 1 | 2;

export type PtGeologyLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type StructurePtLogValidationStatusEnum = 0 | 1 | 2;

export type StructurePtLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type RockMechanicLogValidationStatusEnum = 0 | 1 | 2;

export type RockMechanicLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type RockQualityDesignationLogValidationStatusEnum = 0 | 1 | 2;

export type RockQualityDesignationLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type FractureCountLogValidationStatusEnum = 0 | 1 | 2;

export type FractureCountLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type SurveyValidationStatusEnum = 0 | 1 | 2;

export type SurveyRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type SurveyLogValidationStatusEnum = 0 | 1 | 2;

export type SurveyLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type LoggingEventValidationStatusEnum = 0 | 1 | 2;

export type LoggingEventRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type PtLoggingEventValidationStatusEnum = 0 | 1 | 2;

export type PtLoggingEventRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type PtMagSusLogValidationStatusEnum = 0 | 1 | 2;

export type PtMagSusLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type MagSusLogValidationStatusEnum = 0 | 1 | 2;

export type MagSusLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type DrillMethodValidationStatusEnum = 0 | 1 | 2;

export type DrillMethodRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CycloneCleaningValidationStatusEnum = 0 | 1 | 2;

export type CycloneCleaningRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CoreRecoveryRunLogValidationStatusEnum = 0 | 1 | 2;

export type CoreRecoveryRunLogRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type HoleNameValidationStatusEnum = 0 | 1 | 2;

export type HoleNameRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type HoleValidationStatusEnum = 0 | 1 | 2;

export type HoleRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type DrillPlanValidationStatusEnum = 0 | 1 | 2;

export type DrillPlanRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CollarCoordinateValidationStatusEnum = 0 | 1 | 2;

export type CollarCoordinateRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type ValidationErrorValidationStatusEnum = 0 | 1 | 2;

export type ValidationErrorRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CollarValidationStatusEnum = 0 | 1 | 2;

export type CollarRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateCollarDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateCollarDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateLoggingEventDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateLoggingEventDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpsertCollarDtoValidationStatusEnum = 0 | 1 | 2;

export type UpsertCollarDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateCollarDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateCollarDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateLoggingEventDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateLoggingEventDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateCollarCoordinateDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateCollarCoordinateDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateCollarHistoryDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateCollarHistoryDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CollarHistoryValidationStatusEnum = 0 | 1 | 2;

export type CollarHistoryRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateCollarHistoryDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateCollarHistoryDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateCommentDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateCommentDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateCommentDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateCommentDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateCycloneCleaningDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateCycloneCleaningDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateCycloneCleaningDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateCycloneCleaningDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateDrillMethodDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateDrillMethodDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateDrillMethodDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateDrillMethodDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type DrillMethodBaseValidationStatusEnum = 0 | 1 | 2;

export type DrillMethodBaseRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateHoleDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateHoleDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateHoleDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateHoleDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateHoleNameDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateHoleNameDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateHoleNameDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateHoleNameDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateMetaDataLogDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateMetaDataLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateMetaDataLogDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateMetaDataLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateRigSetupDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateRigSetupDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateRigSetupDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateRigSetupDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateSectionVersionDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateSectionVersionDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type SectionVersionValidationStatusEnum = 0 | 1 | 2;

export type SectionVersionRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateSectionVersionDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateSectionVersionDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateSurveyDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateSurveyDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateSurveyDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateSurveyDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateSurveyLogDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateSurveyLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateSurveyLogDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateSurveyLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateValidationErrorDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateValidationErrorDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateValidationErrorDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateValidationErrorDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateDrillPlanDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateDrillPlanDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UiDrillPlanBaseValidationStatusEnum = 0 | 1 | 2;

export type UiDrillPlanBaseRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UiDrillPlanValidationStatusEnum = 0 | 1 | 2;

export type UiDrillPlanRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateGeologyCombinedLogDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateGeologyCombinedLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateGeologyCombinedLogDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateGeologyCombinedLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateShearLogDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateShearLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateShearLogDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateShearLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateStructureLogDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateStructureLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateStructureLogDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateStructureLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateStructurePtLogDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateStructurePtLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateStructurePtLogDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateStructurePtLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateCoreRecoveryRunLogDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateCoreRecoveryRunLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateCoreRecoveryRunLogDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateCoreRecoveryRunLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateFractureCountLogDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateFractureCountLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateFractureCountLogDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateFractureCountLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateMagSusLogDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateMagSusLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateMagSusLogDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateMagSusLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateRockMechanicLogDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateRockMechanicLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateRockMechanicLogDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateRockMechanicLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateRockQualityDesignationLogDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateRockQualityDesignationLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateRockQualityDesignationLogDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateRockQualityDesignationLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateSpecificGravityPtLogDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateSpecificGravityPtLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateSpecificGravityPtLogDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateSpecificGravityPtLogDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateLabDispatchDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateLabDispatchDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateLabDispatchDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateLabDispatchDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreatePtSampleDtoValidationStatusEnum = 0 | 1 | 2;

export type CreatePtSampleDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdatePtSampleDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdatePtSampleDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreatePtSampleQcDtoValidationStatusEnum = 0 | 1 | 2;

export type CreatePtSampleQcDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdatePtSampleQcDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdatePtSampleQcDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateSampleDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateSampleDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateSampleDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateSampleDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateSampleDispatchDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateSampleDispatchDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateSampleDispatchDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateSampleDispatchDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateSampleIndexDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateSampleIndexDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type SampleIndexValidationStatusEnum = 0 | 1 | 2;

export type SampleIndexRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateSampleIndexDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateSampleIndexDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateSampleQcDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateSampleQcDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateSampleQcDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateSampleQcDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateSampleRegisterDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateSampleRegisterDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateSampleRegisterDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateSampleRegisterDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateStandardSampleDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateStandardSampleDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateStandardSampleDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateStandardSampleDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateStandardSampleQcDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateStandardSampleQcDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateStandardSampleQcDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateStandardSampleQcDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateXrfSampleDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateXrfSampleDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateXrfSampleDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateXrfSampleDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateXrfSampleQcDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateXrfSampleQcDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateXrfSampleQcDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateXrfSampleQcDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateXrfStandardSampleDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateXrfStandardSampleDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateXrfStandardSampleDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateXrfStandardSampleDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type AllSamplesValidationStatusEnum = 0 | 1 | 2;

export type AllSamplesRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateAllSamplesDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateAllSamplesDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

/**
 * Change type: 1=CREATE, 2=UPDATE, 3=DELETE
 * @example 2
 */
export type DexieChangeDtoTypeEnum = 1 | 2 | 3;

export type CreateAssayDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateAssayDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateAssayDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateAssayDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateXrfDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateXrfDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateXrfDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateXrfDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateXrfHeaderDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateXrfHeaderDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateXrfHeaderDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateXrfHeaderDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateVwDrillPlanDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type VwDrillPlanRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateVwDrillPlanDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type DrillPlanBaseValidationStatusEnum = 0 | 1 | 2;

export type DrillPlanBaseRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CollarBaseValidationStatusEnum = 0 | 1 | 2;

export type CollarBaseRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CollarCoordinateBaseValidationStatusEnum = 0 | 1 | 2;

export type CollarCoordinateBaseRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type RigSetupBaseValidationStatusEnum = 0 | 1 | 2;

export type RigSetupBaseRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type GeologyCombinedLogBaseValidationStatusEnum = 0 | 1 | 2;

export type GeologyCombinedLogBaseRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type SurveyBaseValidationStatusEnum = 0 | 1 | 2;

export type SurveyBaseRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type SurveyLogBaseValidationStatusEnum = 0 | 1 | 2;

export type SurveyLogBaseRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type CreateUiAllSamplesDtoValidationStatusEnum = 0 | 1 | 2;

export type CreateUiAllSamplesDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UiAllSamplesValidationStatusEnum = 0 | 1 | 2;

export type UiAllSamplesRowStatusEnum = 0 | 1 | 2 | 3 | 4;

export type UpdateUiAllSamplesDtoValidationStatusEnum = 0 | 1 | 2;

export type UpdateUiAllSamplesDtoRowStatusEnum = 0 | 1 | 2 | 3 | 4;

/**
 * QC type filter
 * @maxLength 50
 * @example "STD"
 */
export type SpGlobalDashboardRequestDtoQcTypeEnum = "STD" | "BLK" | "DUP";

/**
 * Aggregation level for time series data
 * @default "DAILY"
 * @example "DAILY"
 */
export type SpGlobalDashboardRequestDtoAggregationLevelEnum =
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "BATCH";

/**
 * QC sample type
 * @example "STD"
 */
export type TimeSeriesDataDtoQcTypeEnum = "STD" | "BLK" | "DUP";

/**
 * New status for the dispatch
 * @example "Received"
 */
export type UpdateLabDispatchStatusRequestDtoNewStatusEnum =
  | "Draft"
  | "Submitted"
  | "Received"
  | "Cancelled"
  | "Complete";

/**
 * Updated status (echoed from request)
 * @example "Received"
 */
export type UpdateLabDispatchStatusResponseDtoStatusEnum =
  | "Draft"
  | "Submitted"
  | "Received"
  | "Cancelled"
  | "Complete";

export type UserControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type HoleNmPrefixControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type OrganizationControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type PhaseControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type PitControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type ProjectControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type ProspectControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type SectionControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type SubTargetControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type TargetControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type TenementControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type ZoneControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type CollarControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type LoggingEventControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type CollarCoordinateControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type CollarHistoryControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type CommentControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type CycloneCleaningControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type DrillMethodControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type HoleControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type HoleNameControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type MetaDataLogControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type RigSetupControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type SectionVersionControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type SurveyControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type SurveyLogControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type SurveyLogControllerFindAllAuditLogsParamsOrderEnum = "ASC" | "DESC";

export type ValidationErrorControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type DrillPatternControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type DrillPlanControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type DrillPlanStatusHistoryControllerFindAllParamsOrderEnum =
  | "ASC"
  | "DESC";

export type DrillProgramControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type GeologyCombinedLogControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type ShearLogControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type StructureLogControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type StructurePtLogControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type CoreRecoveryRunLogControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type FractureCountLogControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type MagSusLogControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type RockMechanicLogControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type RockQualityDesignationLogControllerFindAllParamsOrderEnum =
  | "ASC"
  | "DESC";

export type SpecificGravityPtLogControllerFindAllParamsOrderEnum =
  | "ASC"
  | "DESC";

export type LabDispatchControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type PtSampleControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type PtSampleQcControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type SampleControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type SampleDispatchControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type SampleIndexControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type SampleQcControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type SampleRegisterControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type StandardSampleControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type StandardSampleQcControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type XrfSampleControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type XrfSampleQcControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type XrfStandardSampleControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type SamplesAllControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type NotificationControllerFindAllParamsOrderEnum = "ASC" | "DESC";

/** @example "healthy" */
export type SyncControllerHealthStatusEnum = "healthy" | "warning" | "error";

export type AssayBatchControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type AssayBatchDetailControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type AssayBatchStatusControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type AssayBatchStatusLogControllerFindAllParamsOrderEnum =
  | "ASC"
  | "DESC";

export type AssayElementControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type AssayElementGroupControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type AssayLabControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type AssayLabElementAliasControllerFindAllParamsOrderEnum =
  | "ASC"
  | "DESC";

export type AssayLabMethodControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type AssayMethodGenericControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type QcAnalysisTypeControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type QcClassificationControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type QcFilteredsetControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type QcGroupControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type QcInsertionRuleControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type QcInsertionRuleStandardSequenceControllerFindAllParamsOrderEnum =
  | "ASC"
  | "DESC";

export type QcReferenceControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type QcReferenceTypeControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type QcReferenceValueControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type QcReferenceValueTypeControllerFindAllParamsOrderEnum =
  | "ASC"
  | "DESC";

export type QcRuleControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type QcStatisticalLimitsControllerFindAllParamsOrderEnum =
  | "ASC"
  | "DESC";

export type QcTypeControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type AssayControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type PivotedAssayResultsControllerFindAllParamsOrderEnum =
  | "ASC"
  | "DESC";

export type PivotedXrfResultControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type XrfControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type XrfHeaderControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type VwQuickDrillPlanControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type VwCollarControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type VwQuickDrillHoleControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type VwDrillPlanControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type UiDrillHoleControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type UiAllSamplesControllerFindAllParamsOrderEnum = "ASC" | "DESC";

/** @default "ASC" */
export type SpCalculateDuplicateRsdControllerFindAllParamsOrderEnum =
  | "ASC"
  | "DESC";

/** @default "ASC" */
export type SpGetGradeRangeControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type SpGetHoleValidationControllerFindAllParamsOrderEnum =
  | "ASC"
  | "DESC";

export type SpGetHoleValidationEnhancedControllerFindAllParamsOrderEnum =
  | "ASC"
  | "DESC";

export type ApplicationLogControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type ConfigControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type LookUpNormalizationControllerFindAllParamsOrderEnum =
  | "ASC"
  | "DESC";

export type PickListControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type PickListUserControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type PickListValueControllerFindAllParamsOrderEnum = "ASC" | "DESC";

export type TemplateControllerFindAllParamsOrderEnum = "ASC" | "DESC";
