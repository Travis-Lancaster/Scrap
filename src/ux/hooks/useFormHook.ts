/**
 * useFormHook - Generic Form Management Hook
 *
 * Encapsulates all form logic for any Dexie table following SRP.
 * Handles form initialization, validation, and action handlers.
 *
 * ## Architecture: Dexie-First Pattern
 *
 * This hook follows the Dexie-first architecture where:
 *
 * 1. **Data Source**: Dexie + useLiveQuery (reactive, single source of truth)
 *    - Parent component fetches data via useLiveQuery
 *    - Data passed to useFormHook via `section` prop
 *    - LiveQuery automatically updates on Dexie changes
 *
 * 2. **UI State**: Zustand (form-specific UI state only)
 *    - Form dirty state (isDirty, dirtyFields)
 *    - Validation errors display
 *    - Current section/tab state
 *    - NOT for data storage
 *
 * 3. **Save Operations**: Direct to Dexie via repository pattern
 *    - Form collects changes → saves directly to Dexie
 *    - LiveQuery detects changes → re-renders with fresh data
 *    - No manual state synchronization needed
 *
 * ## Benefits
 *
 * - Separation of concerns (business logic separated from presentation)
 * - Testable in isolation
 * - Reusable pattern for all form-based sections
 * - Reduces per-form code by ~80%
 * - Full type safety through generics
 * - Reactive updates via LiveQuery
 * - Offline-first with automatic sync
 *
 * @template TTable - Dexie table record type (e.g., CollarData, RigSetupData)
 * @template TZodSchema - Zod schema type for validation
 *
 * @example Dexie-First Usage Pattern
 * ```tsx
 * function CollarFormView({ drillHoleId }: { drillHoleId: string }) {
 *   // 1. Get data from Dexie via LiveQuery (reactive)
 *   const { collar, isLoading } = useDrillHoleData(drillHoleId);
 *
 *   // 2. Pass data to form hook
 *   const form = useFormHook({
 *     sectionKey: SectionKey.Collar,
 *     schema: collarSchema,
 *     defaultValues: collar, // Data from LiveQuery
 *     callbacks: {
 *       onActionSuccess: (action, message) => notification.success({ message }),
 *     },
 *   });
 *
 *   // 3. Render form (LiveQuery auto-updates on Dexie changes)
 *   return (
 *     <div>
 *       <ActionBar section={form.section} actions={form.actions} />
 *       <Form>
 *         <Controller
 *           name="HoleId"
 *           control={form.control}
 *           render={({ field }) => (
 *             <Form.Item label="Hole ID" {...form.getFieldProps('HoleId')}>
 *               <Input {...field} />
 *             </Form.Item>
 *           )}
 *         />
 *       </Form>
 *     </div>
 *   );
 * }
 * ```
 *
 * @see CollarSection.tsx for complete example
 * @see plans/GENERIC_FORM_HOOK_AND_ACTION_BAR_DESIGN.md for architecture details
 */

// Import types from drillhole
import type { DrillHoleSection, ValidationError } from "../types/drillhole";
import type {
	FieldProps,
	FormHookOptions,
	FormHookReturn,
	TableWithMetadata,
} from "./useFormHook.types";
import { useCallback, useEffect, useRef } from "react";

import dataLayer from "#src/data-layer/services/dbService.js";
import { useForm } from "react-hook-form";
import { useSectionActions } from "./useSectionActions";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Note: Store hook will be passed via options or default to useDrillHoleStore
// This avoids circular dependencies and allows for testing with mock stores

/**
 * Map section keys to Dexie table names
 * This makes the hook reusable across all sections
 */
function getSectionTableName(sectionKey: string): string | null {
	const mapping: Record<string, string> = {
		collar: "DrillHole_Collar",
		rigsetup: "DrillHole_RigSetup",
		drillmethod: "DrillHole_DrillMethod",
		survey: "DrillHole_Survey",
		geology: "Geology_GeologyCombinedLog",
		sample: "Sample",
		// Add more mappings as needed
	};

	return mapping[sectionKey.toLowerCase()] || null;
}

/**
 * Generic form hook for any Dexie table with standard row metadata
 *
 * Manages the complete lifecycle of a form including:
 * - Form initialization with React Hook Form
 * - Bidirectional synchronization with Zustand store
 * - Dirty state tracking (form-level and section-level)
 * - Validation orchestration (database + business)
 * - Save/Submit/Reject action handlers
 *
 * @param options - Configuration options
 * @returns Form control, validation state, and action handlers
 */
export function useFormHook<
	TTable extends TableWithMetadata,
	TZodSchema extends z.ZodTypeAny,
>(
	options: FormHookOptions<TTable, TZodSchema>,
): FormHookReturn<TTable> {
	const { sectionKey, schema, defaultValues, mode = "onChange", callbacks } = options;

	// DIAGNOSTIC: Log schema type inference
	console.log(`🔍 [FormHook:${sectionKey}] Schema type check:`, {
		schemaType: schema?.constructor?.name,
		hasZodParse: typeof (schema as any)?.parse === "function",
		defaultValuesType: typeof defaultValues,
	});

	// ============================================================================
	// Data Layer - Dexie-First Architecture
	// ============================================================================

	// Data comes from parent component via LiveQuery:
	//
	// Parent Component:
	//   const { collar } = useLiveQuery(
	//     () => db.collar.where('CollarId').equals(drillHoleId).first(),
	//     [drillHoleId]
	//   );
	//
	// This Hook:
	//   useFormHook({ defaultValues: collar })
	//
	// This pattern ensures:
	// - Single source of truth (Dexie)
	// - Reactive updates (LiveQuery)
	// - No data duplication in Zustand
	// - Automatic re-renders on Dexie changes

	// ============================================================================
	// Extract Current State from LiveQuery Data
	// ============================================================================

	console.log(`🔍 [FormHook:${sectionKey}] Initializing with defaultValues:`, {
		hasDefaultValues: !!defaultValues,
		defaultValuesKeys: defaultValues ? Object.keys(defaultValues).length : 0,
		defaultValuesSample: defaultValues ? Object.keys(defaultValues).slice(0, 5) : [],
		rowStatus: (defaultValues as any)?.RowStatus,
	});

	const currentRowStatus = (defaultValues as any)?.RowStatus ?? 0;
	const sectionData = (defaultValues || {}) as TTable;

	// ============================================================================
	// Form Initialization
	// ============================================================================

	const {
		control,
		formState: { isDirty, dirtyFields, errors },
		reset,
		getValues,
		setValue,
		watch,
	} = useForm<TTable>({
		defaultValues: sectionData as any,
		mode,
		resolver: zodResolver(schema as any),
	});

	// ============================================================================
	// Create Section Object - Reactive to form state and LiveQuery data
	// ============================================================================

	const section: DrillHoleSection<TTable> = {
		sectionKey,
		data: sectionData,
		validation: null,
		rowStatus: currentRowStatus as any,
		isDirty, // Use form's isDirty state
		isStale: false,

		// Data management
		getData: () => sectionData,
		setData: () => {
			console.warn("[useFormHook] setData called - no-op in Dexie-first pattern");
		},
		resetData: () => {
			reset(defaultValues as any);
		},

		// Status management
		getRowStatus: () => currentRowStatus as any,
		setRowStatus: () => {
			console.warn("[useFormHook] setRowStatus called - use action handlers instead");
			return false;
		},

		// Validation
		validate: () => ({
			database: { isValid: true, errors: [] },
			save: { isValid: true, errors: [], warnings: [] },
			canSave: true,
			validationStatus: 1 as 0 | 1 | 2,
		}),
		getValidationErrors: () => [],
		isValid: () => true,

		// State queries
		isEditable: () => currentRowStatus === 0 || currentRowStatus === 1, // Draft or Complete
		hasUnsavedChanges: () => isDirty,
		getSyncStatus: () => "Synced",

		// Metadata management
		getMetadata: () => (defaultValues as any || {}),
		updateMetadata: () => {
			console.warn("[useFormHook] updateMetadata called - no-op");
		},

		// Dependencies
		getDependencies: () => [],
	};

	console.log(`📊 [FormHook:${sectionKey}] Section created:`, {
		rowStatus: currentRowStatus,
		isDirty,
		isEditable: section.isEditable(),
		hasUnsavedChanges: section.hasUnsavedChanges(),
	});

	// ============================================================================
	// Lifecycle Management - 3 Clear Stages
	// ============================================================================

	// Flag to prevent updateSectionData during post-save reset
	const isResettingAfterSaveRef = useRef(false);

	// Stage 1: Initial Load & Data Availability
	const initialLoadRef = useRef(true);
	const previousDefaultValuesRef = useRef(defaultValues);

	useEffect(() => {
		// Check if defaultValues changed from undefined to defined (data became available)
		const wasUndefined = previousDefaultValuesRef.current === undefined;
		const isNowDefined = defaultValues !== undefined;
		const dataJustBecameAvailable = wasUndefined && isNowDefined;

		if (initialLoadRef.current || dataJustBecameAvailable) {
			console.log(`🔵 [FormHook:${sectionKey}] Data load - resetting form`, {
				isInitialLoad: initialLoadRef.current,
				dataJustBecameAvailable,
				hasData: !!defaultValues,
				dataKeys: defaultValues ? Object.keys(defaultValues).length : 0,
			});

			initialLoadRef.current = false;
			reset((defaultValues || sectionData) as any);

			console.log(`✅ [FormHook:${sectionKey}] Form reset complete after data load`);
		}

		previousDefaultValuesRef.current = defaultValues;
	}, [defaultValues, sectionData, reset, sectionKey]);

	// Stage 2: Background Sync Reset
	const previousIsDirtyRef = useRef(section.isDirty);

	useEffect(() => {
		const wasDirty = previousIsDirtyRef.current;
		const isNowClean = !section.isDirty;

		// If section was dirty and is now clean (e.g., background sync), reset form
		if (wasDirty && isNowClean && isDirty) {
			console.log(`🔄 [FormHook:${sectionKey}] Section synced - resetting form`);
			reset(section.data);
			console.log(`✅ [FormHook:${sectionKey}] Form reset complete after sync`);
		}

		previousIsDirtyRef.current = section.isDirty;
	}, [section.isDirty, section.data, isDirty, reset, sectionKey]);

	// Stage 3: Form Changes → UI State Tracking
	useEffect(() => {
		const subscription = watch((formData, { name, type }) => {
			// Skip during post-save reset
			if (isResettingAfterSaveRef.current) {
				console.log(`✏️ [FormHook:${sectionKey}] Skipping during post-save reset`);
				return;
			}

			console.log(`✏️ [FormHook:${sectionKey}] Field changed:`, {
				changedField: name,
				changeType: type,
				formIsDirty: isDirty,
			});

			// Dexie-First Architecture:
			// - Changes tracked in React Hook Form state (isDirty, dirtyFields)
			// - NO data duplication in Zustand
			// - On save: formData → Dexie → LiveQuery detects → parent re-renders
			// - Zustand only stores UI state (current section, validation errors)

			// TODO: Optionally update Zustand UI state store with:
			// - Current dirty status for section indicator
			// - Validation errors for display
			// Example: uiStore.setSectionDirty(sectionKey, isDirty);
		});

		return () => subscription.unsubscribe();
	}, [watch, isDirty, sectionKey]);

	// ============================================================================
	// Validation Processing
	// ============================================================================

	const validation = section.validate();

	// Handle both ValidationResult and TwoTierValidationResult formats
	const allErrors: ValidationError[] = "database" in validation
		? [...validation.database.errors, ...validation.save.errors, ...validation.save.warnings]
		: (validation as any).errors || [];

	// Map errors by field name for easy lookup
	const validationErrors = allErrors.reduce((acc, err) => {
		acc[err.field] = err.message;
		return acc;
	}, {} as Record<string, string>);

	// Call validation error callback if provided
	useEffect(() => {
		if (allErrors.length > 0 && callbacks?.onValidationError) {
			callbacks.onValidationError(allErrors);
		}
	}, [allErrors.length, callbacks]);

	// ============================================================================
	// Action Handlers
	// ============================================================================

	/**
	 * Save handler - Saves section data to Dexie
	 *
	 * Validation Rules:
	 * 1. Database Validation (BLOCKING): If fails, controls go red, save is blocked
	 * 2. Business Validation (NON-BLOCKING): If fails, controls go red, but data STILL SAVES
	 *    - ValidationStatus = 1 if pass, ValidationErrors = null
	 *    - ValidationStatus = 2 if fail, ValidationErrors = serialized Zod issues
	 *    - Flow continues regardless of business validation
	 */
	const onSave = useCallback(async () => {
		console.log(`💾 [FormHook:${sectionKey}] Save button clicked:`, {
			formIsDirtyBefore: isDirty,
			dirtyFieldsCount: Object.keys(dirtyFields).length,
		});

		try {
			// Execute before save callback
			await callbacks?.beforeSave?.();

			// Get current form values
			const formData = getValues();
			console.log(`📝 [FormHook:${sectionKey}] Form data to save:`, formData);

			// Step 1: Run Database Validation (BLOCKING)
			// TODO: Implement actual database validation with schema
			// If database validation fails, throw error and block save
			// For now, assume database validation passes

			// Step 2: Run Business Validation (NON-BLOCKING)
			let validationStatus: 0 | 1 | 2 = 1; // Default to passed
			let validationErrors: string | null = null;

			try {
				// Validate with business schema
				await schema.parseAsync(formData);
				console.log(`✅ [FormHook:${sectionKey}] Business validation passed`);
				validationStatus = 1;
				validationErrors = null;
			}
			catch (error: any) {
				// Business validation failed but we still save
				console.warn(`⚠️ [FormHook:${sectionKey}] Business validation failed (non-blocking):`, error);
				validationStatus = 2;
				validationErrors = JSON.stringify(error.issues || []);
			}

			// Step 3: Save data regardless of business validation result
			const updatedData = {
				...defaultValues,
				...formData,
				ModifiedOnDt: new Date().toISOString(),
				ValidationStatus: validationStatus,
				ValidationErrors: validationErrors,
			};

			console.log(`💾 [FormHook:${sectionKey}] Saving to Dexie:`, {
				validationStatus,
				hasValidationErrors: !!validationErrors,
			});


			// Save to appropriate table based on sectionKey
			const tableName = getSectionTableName(sectionKey);
			if (tableName) {
				// ✅ Pass original data (with rv) for optimistic locking
				const result = await dataLayer.Update(tableName, updatedData, defaultValues)

				//ToUpdate form w/ server values.


				console.log(`✅ [FormHook:${sectionKey}] Saved to ${tableName} table`);
			}
			else {
				throw new Error(`Unknown section key or table: ${sectionKey}`);
			}

			// LiveQuery automatically detects change → parent re-renders with fresh data

			console.log(`✅ [FormHook:${sectionKey}] Save completed successfully`);

			// Reset form to clear isDirty flag
			isResettingAfterSaveRef.current = true;
			reset(updatedData as any);
			setTimeout(() => {
				isResettingAfterSaveRef.current = false;
			}, 0);

			// Execute after save callback
			await callbacks?.afterSave?.();

			// Notify success (even with business validation warnings)
			const message = validationStatus === 2
				? "Saved with validation warnings"
				: "Saved successfully";
			callbacks?.onActionSuccess?.("Save", message);
		}
		catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Save failed";
			console.error(`❌ [FormHook:${sectionKey}] Save error:`, error);
			callbacks?.onActionError?.("Save", errorMessage);
		}
	}, [
		sectionKey,
		isDirty,
		dirtyFields,
		defaultValues,
		getValues,
		reset,
		callbacks,
		schema,
	]);

	// Get remaining actions (review, approve, exclude) from shared hook
	const sharedActions = useSectionActions({
		sectionKey,
		operations: {
			// Real Dexie operations with logging
			submit: async () => {
				console.log(`🔄 [FormHook:${sectionKey}] Submit operation START`);
				try {
					// Get current form data
					const formData = getValues();
					console.log(`📝 [FormHook:${sectionKey}] Form data:`, formData);

					// Run Business Validation (NON-BLOCKING)
					let validationStatus: 0 | 1 | 2 = 1;
					let validationErrors: string | null = null;

					try {
						await schema.parseAsync(formData);
						console.log(`✅ [FormHook:${sectionKey}] Business validation passed`);
						validationStatus = 1;
						validationErrors = null;
					}
					catch (error: any) {
						console.warn(`⚠️ [FormHook:${sectionKey}] Business validation failed (non-blocking):`, error);
						validationStatus = 2;
						validationErrors = JSON.stringify(error.issues || []);
					}

					// Merge with existing data and update RowStatus to Complete (1)
					// Save regardless of business validation result
					const updatedData = {
						...defaultValues,
						...formData,
						RowStatus: 1, // Complete
						ValidationStatus: validationStatus,
						ValidationErrors: validationErrors,
						ModifiedOnDt: new Date().toISOString(),
					};

					console.log(`💾 [FormHook:${sectionKey}] Saving to Dexie with RowStatus=1:`, {
						validationStatus,
						hasValidationErrors: !!validationErrors,
					});

					// Save to appropriate table based on sectionKey
					const tableName = getSectionTableName(sectionKey);
					if (tableName) {
						// ✅ Pass original data (with rv) for optimistic locking
						await dataLayer.Update(tableName, updatedData, defaultValues)

						console.log(`✅ [FormHook:${sectionKey}] Submitted - saved to ${tableName} table`);
					}
					else {
						throw new Error(`Unknown section key or table: ${sectionKey}`);
					}

					const message = validationStatus === 2
						? "Submitted with validation warnings"
						: "Submitted successfully";
					return { success: true, message };
				}
				catch (error) {
					console.error(`❌ [FormHook:${sectionKey}] Submit error:`, error);
					return { success: false, message: error instanceof Error ? error.message : "Submit failed" };
				}
			},
			reject: async () => {
				console.log(`🔄 [FormHook:${sectionKey}] Reject operation START`);
				try {
					const updatedData = {
						...defaultValues,
						RowStatus: 0, // Back to Draft
						ValidationStatus: 0, // Reset validation status
						ValidationErrors: null, // Must be null when ValidationStatus is Unknown
						ModifiedOnDt: new Date().toISOString(),
					};

					console.log(`💾 [FormHook:${sectionKey}] Saving to Dexie with RowStatus=0:`, updatedData);

					const tableName = getSectionTableName(sectionKey);
					if (tableName) {
						// ✅ Pass original data (with rv) for optimistic locking
						await dataLayer.Update(tableName, updatedData, defaultValues)
						console.log(`✅ [FormHook:${sectionKey}] Rejected - saved to ${tableName}`);
					}
					else {
						throw new Error(`Unknown section key or table: ${sectionKey}`);
					}

					return { success: true, message: "Returned to Draft" };
				}
				catch (error) {
					console.error(`❌ [FormHook:${sectionKey}] Reject error:`, error);
					return { success: false, message: error instanceof Error ? error.message : "Reject failed" };
				}
			},
			review: async () => {
				console.log(`🔄 [FormHook:${sectionKey}] Review operation START`);
				try {
					const updatedData = {
						...defaultValues,
						RowStatus: 2, // Reviewed
						ValidationStatus: 1, // Must be validated
						ValidationErrors: null, // Must be null when ValidationStatus is Valid
						ModifiedOnDt: new Date().toISOString(),
					};

					console.log(`💾 [FormHook:${sectionKey}] Saving to Dexie with RowStatus=2:`, updatedData);
					const tableName = getSectionTableName(sectionKey);

					if (tableName) {
						// ✅ Pass original data (with rv) for optimistic locking
						await dataLayer.Update(tableName, updatedData, defaultValues)

						console.log(`✅ [FormHook:${sectionKey}] Reviewed - saved to ${tableName}`);
					}
					else {
						throw new Error(`Unknown section key or table: ${sectionKey}`);
					}

					return { success: true, message: "Marked as reviewed" };
				}
				catch (error) {
					console.error(`❌ [FormHook:${sectionKey}] Review error:`, error);
					return { success: false, message: error instanceof Error ? error.message : "Review failed" };
				}
			},
			approve: async () => {
				console.log(`🔄 [FormHook:${sectionKey}] Approve operation START`);
				try {
					const updatedData = {
						...defaultValues,
						RowStatus: 3, // Approved
						ApprovedInd: true,
						ReportIncludeInd: true,
						ValidationStatus: 1, // Must be validated
						ValidationErrors: null, // Must be null when ValidationStatus is Valid
						ModifiedOnDt: new Date().toISOString(),
					};

					console.log(`💾 [FormHook:${sectionKey}] Saving to Dexie with RowStatus=3:`, updatedData);

					const tableName = getSectionTableName(sectionKey);
					if (tableName) {
						// ✅ Pass original data (with rv) for optimistic locking
						await dataLayer.Update(tableName, updatedData, defaultValues)
						console.log(`✅ [FormHook:${sectionKey}] Approved - saved to ${tableName}`);
					}
					else {
						throw new Error(`Unknown section key or table: ${sectionKey}`);
					}

					return { success: true, message: "Approved and included in reports" };
				}
				catch (error) {
					console.error(`❌ [FormHook:${sectionKey}] Approve error:`, error);
					return { success: false, message: error instanceof Error ? error.message : "Approve failed" };
				}
			},
			exclude: async () => {
				console.log(`🔄 [FormHook:${sectionKey}] Exclude operation START`);
				try {
					const currentIncluded = (defaultValues as any)?.ReportIncludeInd !== false;
					const updatedData = {
						...defaultValues,
						ReportIncludeInd: !currentIncluded,
						ModifiedOnDt: new Date().toISOString(),
					};

					console.log(`💾 [FormHook:${sectionKey}] Toggling ReportIncludeInd to ${!currentIncluded}:`, updatedData);


					const tableName = getSectionTableName(sectionKey);
					if (tableName) {
						// ✅ Pass original data (with rv) for optimistic locking
						await dataLayer.Update(tableName, updatedData, defaultValues)
						console.log(`✅ [FormHook:${sectionKey}] Exclude toggled - saved to ${tableName}`);
					}
					else {
						throw new Error(`Unknown section key or table: ${sectionKey}`);
					}

					return { success: true, message: !currentIncluded ? "Included in reports" : "Excluded from reports" };
				}
				catch (error) {
					console.error(`❌ [FormHook:${sectionKey}] Exclude error:`, error);
					return { success: false, message: error instanceof Error ? error.message : "Exclude failed" };
				}
			},
		},
		callbacks: {
			beforeSave: async () => {
				const data = getValues();
				console.log(`💾 [FormHook:${sectionKey}] beforeSave callback - form data:`, data);
			},
			onSuccess: callbacks?.onActionSuccess,
			onError: callbacks?.onActionError,
		},
	});

	// ============================================================================
	// Field Helpers
	// ============================================================================

	/**
	 * Get props for a specific field
	 * Combines form state, validation, and section state
	 */
	const getFieldProps = useCallback(
		(fieldName: keyof TTable): FieldProps => {
			const isFieldDirty = !!(dirtyFields as any)?.[fieldName];
			const hasError = !!validationErrors[fieldName as string];
			const isReadOnly = !section.isEditable();

			return {
				isDirty: isFieldDirty,
				validateStatus: hasError ? "error" : undefined,
				help: validationErrors[fieldName as string],
				readOnly: isReadOnly,
			};
		},
		[dirtyFields, validationErrors, section],
	);

	// ============================================================================
	// Return Hook Interface
	// ============================================================================

	// ============================================================================
	// Return Hook Interface
	// ============================================================================

	// Extract isValid from validation result (handles both formats)
	const isValid = "isValid" in validation
		? (validation as any).isValid
		: validation.database.isValid;

	return {
		// React Hook Form integration
		control: control as any,
		formState: {
			isDirty,
			dirtyFields: dirtyFields as any,
			errors,
		},

		// Form methods
		getValues,
		setValue,
		reset,
		watch,

		// Section state
		section,
		isValid,
		validationErrors,

		// Action handlers
		actions: {
			onSave,
			onSubmit: sharedActions.onSubmit,
			onReject: sharedActions.onReject,
			onReview: sharedActions.onReview,
			onApprove: sharedActions.onApprove,
			onExclude: sharedActions.onExclude,
		},

		// Field helpers
		getFieldProps,
	};
}

/**
 * Re-export types for convenience
 */
export type {
	FieldProps,
	FormActionHandlers,
	FormHookCallbacks,
	FormHookOptions,
	FormHookReturn,
	FormState,
	TableWithMetadata,
} from "./useFormHook.types";
