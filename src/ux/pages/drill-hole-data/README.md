# Drill-Hole-Data Module

**Status**: 🚧 In Development  
**Last Updated**: 2026-02-10  
**Architecture**: Feature Blueprint Pattern v1.0

---

## Overview

The drill-hole-data module provides comprehensive data entry and management for active drill holes. It handles all aspects of logging, sampling, and validation for drilling operations.

### Key Characteristics

- **Read/Edit Mode**: Opens existing drill holes (does NOT create new collars/plans)
- **Parameter**: Receives `drillPlanId` via route parameter
- **Data Sources**: Uses `VwCollar`, `VwDrillPlan`, `AllSamples` (view interfaces, not base tables)
- **ID Relationship**: `HoleId = DrillPlanId = CollarId` (all equivalent)
- **Offline-First**: Dexie cache → API sync pattern
- **Two-Tier Validation**: Database (blocking) + Save (warnings)
- **ReadOnly Control**: Based on `RowStatus` (global + section + row levels)

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  DrillHoleDataLayout                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │ TitleBar (Hole Info, Status, Actions)            │  │
│  ├───────────────────────────────────────────────────┤  │
│  │ NavigationTabs (Setup, Geology, Geotech, etc.)   │  │
│  ├───────────────────────────────────────────────────┤  │
│  │ ActionBar (Lens Selector, Section Actions)       │  │
│  ├───────────────────────────────────────────────────┤  │
│  │ Views (Forms & Grids)                             │  │
│  │  - SetupView (RigSetup, CollarCoordinate)        │  │
│  │  - GeologyLogView (GeologyCombinedLog, etc.)     │  │
│  │  - GeotechView (CoreRecovery, MagSus, etc.)      │  │
│  │  - SamplingView (AllSamples, Dispatch, Lab)      │  │
│  │  - QAQCView, SignOffView, SummaryView            │  │
│  ├───────────────────────────────────────────────────┤  │
│  │ InspectorDrawer (Row Editor)                      │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘

Data Flow:
API ────▶ Service ────▶ Store ────▶ Components
         │             │           │
         ▼             ▼           ▼
       Dexie      Validation   React Hook Form
      (cache)     (Zod 2-tier)  (forms only)
```

---

## Folder Structure

```
src/pages/drill-hole-data/
├── types/                    # Type definitions
│   └── data-contracts.ts    # Core interfaces & enums
│
├── services/                 # Data operations
│   ├── drill-hole-data-service.ts
│   └── livequery-adapter.ts
│
├── validation/               # Zod schemas & validators
│   ├── base-schemas.ts      # Shared schemas
│   ├── *-schemas.ts         # Entity schemas
│   ├── *-database-validator.ts  # Tier 1 (blocking)
│   ├── *-save-validator.ts      # Tier 2 (warnings)
│   └── validation-helpers.ts
│
├── store/                    # Zustand state management
│   ├── drill-hole-data-store.ts  # Main store
│   ├── section-config.ts         # Section definitions
│   ├── section-factory.ts        # Factory pattern
│   ├── section-mappers.ts        # API → Store
│   ├── store-actions.ts          # Business logic
│   ├── store-loaders.ts          # Data loading
│   └── store-row-operations.ts   # Row CRUD
│
├── hooks/                    # Custom React hooks
│   ├── useRigSetupForm.ts
│   ├── useCollarCoordinateForm.ts
│   ├── useGeologyLogOperations.ts
│   └── useSampleOperations.ts
│
├── components/               # UI components
│   ├── TitleBar.tsx
│   ├── NavigationTabs.tsx
│   ├── ActionBar.tsx
│   ├── SectionHeader.tsx
│   ├── SectionFooter.tsx
│   └── InspectorDrawer.tsx
│
├── sections/                 # Section components
│   ├── forms/               # Form sections
│   │   ├── RigSetupForm.tsx
│   │   └── CollarCoordinateForm.tsx
│   └── grids/               # Grid sections
│       ├── GeologyCombinedLogGrid.tsx
│       └── AllSamplesGrid.tsx
│
├── views/                    # Tab views
│   ├── SetupView.tsx
│   ├── GeologyLogView.tsx
│   ├── GeotechView.tsx
│   ├── SamplingView.tsx
│   ├── QAQCView.tsx
│   ├── SignOffView.tsx
│   └── SummaryView.tsx
│
├── column-defs/              # AG Grid columns
│   ├── geologyCombinedLogColumns.tsx
│   └── allSamplesColumns.ts
│
├── drawers/                  # Drawer components
│   └── GeologyCombinedLogDrawer.tsx
│
└── DrillHoleDataLayout.tsx   # Main layout
```

---

## Navigation Structure

### Tabs → Lenses → Sections

| Tab | Lens | Section (Table) | Type |
|-----|------|----------------|------|
| **Setup** | RigSheet | RigSetup | Form |
| | Coordinate | CollarCoordinate | Form |
| **GeoLog** | Litho | GeologyCombinedLog (partial) | Grid |
| | Alteration | GeologyCombinedLog (partial) | Grid |
| | Veins | GeologyCombinedLog (partial) | Grid |
| | Everything | GeologyCombinedLog (all) | Grid |
| | Shear | ShearLog | Grid |
| | Structure | StructureLog | Grid |
| **GeoTech** | CoreRecoveryRun | CoreRecoveryRunLog | Grid |
| | FractureCount | FractureCountLog | Grid |
| | MagSus | MagSusLog | Grid |
| | RockMechanic | RockMechanicLog | Grid |
| | RQD | RockQualityDesignationLog | Grid |
| | SpecificGravity | SpecificGravityPtLog | Grid |
| **Sampling** | Sample | AllSamples | Grid + Modal |
| | Dispatch | Dispatch | Grid |
| | LabResults | File Importer → Assay | Import |
| **QAQC** | (single) | QAQC Reports | Grid |
| **SignOff** | (single) | VwCollar + Progress | Form |
| **Summary** | (single) | Summary Dashboard | View |

---

## Key Concepts

### 1. Two-Tier Validation

**Tier 1: Database Validation** (BLOCKS saves)
- Required fields
- Foreign key integrity
- Data type constraints
- `blocking: true`

**Tier 2: Save Validation** (warnings only)
- Business rules
- Data quality checks
- Best practices
- `blocking: false`

### 2. isDirty Tracking

Tracked at multiple levels:
- **Field-level** (forms): React Hook Form `dirtyFields`
- **Cell-level** (grids): Row metadata
- **Row-level** (grids): Row metadata
- **Section-level**: Aggregate of all changes

### 3. ReadOnly Control

Three levels determine if user can edit:

```typescript
canEdit = isGlobalEditable && isSectionEditable && isRowEditable

// Global: Collar.RowStatus === 0 (Draft)
const isGlobalEditable = collarRowStatus === 0;

// Section: Section.RowStatus === 0 (Draft)
const isSectionEditable = sectionRowStatus === 0;

// Row (arrays only): Row.RowStatus === 0 (Draft)
const isRowEditable = rowStatus === 0;
```

### 4. RowStatus Workflow

```
Draft (0) ──Save──▶ Draft (0)
          │
          ▼
       Submit
          │
          ▼
    Submitted (1) ──Review──▶ Reviewed (2)
          │                       │
          ▼                       ▼
      Rejected (4)           Approved (3)
```

---

## Usage

### Opening a Drill Hole

```typescript
// Route: /drill-hole-data/:drillPlanId
const { drillPlanId } = useParams();

// Store automatically loads data
const store = useDrillHoleDataStore();
useEffect(() => {
  store.loadDrillHole(drillPlanId);
}, [drillPlanId]);
```

### Editing a Form Section

```typescript
// Hook provides all functionality
const {
  control,
  errors,
  isDirty,
  isReadOnly,
  onSave,
  onSubmit,
  getFieldProps,
} = useRigSetupForm();

// Render
<SheetFormField
  name="DrillingCompany"
  control={control}
  type="autocomplete"
  options={lookupOptions.companies}
  disabled={isReadOnly}
  {...getFieldProps("DrillingCompany")}
/>
```

### Editing a Grid Section

```typescript
// Hook provides grid operations
const {
  rows,
  columnDefs,
  isReadOnly,
  handleAddRow,
  handleCellValueChanged,
  handleDeleteRow,
} = useGeologyLogOperations();

// Render
<AgGridReact
  rowData={rows}
  columnDefs={columnDefs}
  onCellValueChanged={handleCellValueChanged}
  readOnlyEdit={isReadOnly}
/>
```

---

## Best Practices

### DO ✅

1. **Always use service layer** for data operations
   ```typescript
   import { loadDrillHoleData } from "../services/drill-hole-data-service";
   const data = await loadDrillHoleData(drillPlanId);
   ```

2. **Use granular store selectors**
   ```typescript
   const name = useDrillHoleDataStore(state => state.sections.rigSetup.data.Name);
   ```

3. **Extract logic to custom hooks**
   ```typescript
   export function useRigSetupForm() {
     // All business logic here
     return { control, onSave, isDirty };
   }
   ```

4. **Implement two-tier validation**
   ```typescript
   validators: {
     database: createRigSetupDatabaseValidator(),  // Blocking
     save: createRigSetupSaveValidator(),          // Warnings
   }
   ```

5. **Add detailed console logging**
   ```typescript
   console.log("[DrillHoleData] 💾 Saving section:", { section, timestamp });
   ```

### DON'T ❌

1. **Never call Dexie directly from components**
   ```typescript
   // ❌ WRONG
   const data = await db.drillHoleData.get(id);
   ```

2. **Never call API directly from components**
   ```typescript
   // ❌ WRONG
   const response = await apiClient.get(`/api/drillhole/${id}`);
   ```

3. **Never select entire store**
   ```typescript
   // ❌ WRONG - causes re-renders on any change
   const store = useDrillHoleDataStore();
   ```

4. **Never put UI state in Zustand**
   ```typescript
   // ❌ WRONG - use local useState
   const isModalOpen = useDrillHoleDataStore(state => state.isModalOpen);
   ```

5. **Never skip validation**
   ```typescript
   // ❌ WRONG
   await service.save(data); // No validation check!
   
   // ✅ CORRECT
   const validation = section.validate();
   if (validation.canSave) {
     await service.save(data);
   }
   ```

---

## Troubleshooting

### Data not loading

**Check**:
1. Is `drillPlanId` parameter present?
2. Is service layer called correctly?
3. Check Dexie cache: DevTools → Application → IndexedDB
4. Check API response in Network tab

**Solution**:
```typescript
console.log("[DrillHoleData] 🔍 Debugging load:", {
  drillPlanId,
  storeState: store.getState(),
  cacheExists: await db.drillHoleData.get(drillPlanId),
});
```

### Validation not working

**Check**:
1. Are Zod schemas defined?
2. Are validators registered in section-config?
3. Is validation called before save?

**Solution**:
```typescript
const validation = section.validate();
console.log("[DrillHoleData] ✅ Validation result:", validation);
```

### ReadOnly issues

**Check**:
1. Collar RowStatus
2. Section RowStatus
3. Row RowStatus (if grid)

**Solution**:
```typescript
console.log("[DrillHoleData] 🔒 ReadOnly check:", {
  collarRowStatus: store.collarRowStatus,
  sectionRowStatus: section.data.RowStatus,
  canEdit: store.canEdit("rigSetup"),
});
```

---

## Related Documentation

- [Feature Blueprint Style Guide](../../../plans/feature-blueprint-style-guide.md)
- [Implementation Plan](../../../plans/drill-hole-data-implementation-plan.md)
- [Data Contracts](./types/data-contracts.ts)
- [Create Drill Hole Module](../create-drill-hole/README.md) (reference)

---

## Change Log

| Date | Version | Changes |
|------|---------|---------|
| 2026-02-10 | 1.0 | Initial architecture and foundation |

---

## Contributors

- Roo (Senior Frontend Engineer)
