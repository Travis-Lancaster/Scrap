# RigSetup Feature

Rig Setup Sheet data entry for drill holes with offline-first capability.

## Architecture

Follows the **Feature Blueprint & Style Guide v2** pattern with:

- **Data Layer**: `src/data/domain/rig-setup/`
  - Repository: Pure Dexie data access
  - Service: Cache-aside pattern with API fallback
  - Schemas: Two-tier validation (Database + Business)

- **Feature Layer**: `src/ux/features/rig-setup/`
  - Views: Form view with useFormHook
  - Components: Section components (Pad Inspection, Final Setup, Down Hole Survey, Comments)
  - Hooks: Data and lookup hooks with LiveQuery
  - Types: Feature-specific TypeScript types

## Data Flow

```
User Input → useFormHook → ActionBar (Save/Submit/Approve)
         ↓
rigSetupService.save() → Dexie → dexie-syncable → API
         ↓
useLiveQuery detects change → Form updates automatically
```

## Usage

```typescript
import { RigSetupFormView } from '@/ux/features/rig-setup';

<RigSetupFormView drillPlanId={collarId} />
```

## Validation

### Database Schema (Tier 1 - BLOCKING)
- Required fields: Organization, RigSetupId
- Type validation: Azimuth (0-360), Inclination (-90 to 90)
- Format validation: ISO dates, GUIDs

### Business Schema (Tier 2 - NON-BLOCKING)
- Cross-field rules: Signature requires person
- Warnings: Unusual azimuth/inclination values
- Saves with warnings - doesn't block user

## Key Features

✅ **Offline-First**: Works without network connection
✅ **Reactive UI**: LiveQuery auto-updates on data changes
✅ **Type-Safe**: Full TypeScript with Zod validation
✅ **Cache-Aside**: Instant rendering + always-fresh data
✅ **Smart Actions**: ActionBar manages Save/Submit/Approve buttons
✅ **Reusable Hooks**: useFormHook eliminates code duplication

## Files

### Data Layer
- `src/data/domain/rig-setup/rig-setup.repo.ts` - Dexie queries
- `src/data/domain/rig-setup/rig-setup.service.ts` - Cache-aside service
- `src/data/domain/rig-setup/rig-setup.db.schema.ts` - Database validation
- `src/data/domain/rig-setup/rig-setup.business.schema.ts` - Business validation
- `src/data/domain/rig-setup/index.ts` - Barrel exports

### Feature Layer
- `src/ux/features/rig-setup/views/RigSetupFormView.tsx` - Main form view
- `src/ux/features/rig-setup/components/PadInspectionSection.tsx` - Pad inspection fields
- `src/ux/features/rig-setup/components/FinalSetupSection.tsx` - Final setup fields
- `src/ux/features/rig-setup/components/DownHoleSurveySection.tsx` - Down hole survey fields
- `src/ux/features/rig-setup/components/CommentsSection.tsx` - Comments textarea
- `src/ux/features/rig-setup/hooks/useRigSetupData.ts` - Cache-aside data hook
- `src/ux/features/rig-setup/hooks/useRigSheetLookups.ts` - Lookup data hook
- `src/ux/features/rig-setup/types/rigsheet-types.ts` - Type definitions

## Testing

### Manual Testing Steps

1. **Create New Rig Setup**
   - Navigate to drill hole details
   - Open RigSetup tab
   - Fill in fields
   - Click "Save"
   - Verify success message

2. **Edit Existing Rig Setup**
   - Open existing rig setup
   - Modify fields
   - Verify "Save" button enables (isDirty)
   - Click "Save"
   - Verify changes saved

3. **Offline Mode**
   - Open DevTools → Network → Offline
   - Try to save changes
   - Verify optimistic update works
   - Go back online
   - Verify sync occurs automatically

4. **Validation Testing**
   - Try to save with invalid azimuth (e.g., 400)
   - Verify database validation blocks save
   - Fix error, save successfully
   - Add signature without "Completed By"
   - Verify business validation warns but allows save

5. **Lookup Testing**
   - Verify Person dropdown populated
   - Verify Drilling Company dropdown populated
   - Select a drilling contractor
   - Verify Machinery dropdown filters correctly
   - Change contractor
   - Verify Machinery updates

## Related Documentation

- [Feature Blueprint & Style Guide v2](../../../../plans/FEATURE_BLUEPRINT_AND_STYLE_GUIDE_V2.md)
- [RigSetup Migration Plan](../../../../plans/RIG_SETUP_MIGRATION_PLAN.md)
- [RigSetup Architecture Diagram](../../../../plans/RIG_SETUP_ARCHITECTURE_DIAGRAM.md)
- [useFormHook Documentation](../../hooks/USE_FORM_HOOK_README.md)

## Migration Status

✅ **Phase 1**: Structural Analysis & Gap Assessment - COMPLETE
✅ **Phase 2**: Data Layer Implementation - COMPLETE
✅ **Phase 3**: Feature Layer Restructuring - COMPLETE
✅ **Phase 4**: Validation & Testing - COMPLETE
✅ **Phase 5**: Documentation & Cleanup - COMPLETE

**Migration Date**: 2026-02-09
**Compliance**: 100% aligned with Feature Blueprint v2
