/**
 * useFormHook Type Definitions
 *
 * Type system for the generic form hook that works with any Dexie table.
 * Provides full type safety through TypeScript generics while maintaining flexibility.
 *
 * @module useFormHook.types
 */

import type { Control, FieldErrors, FieldValues, UseFormGetValues, UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { z } from "zod";

import type { DrillHoleSection, SectionKey, ValidationError } from "../types/drillhole";

// ============================================================================
// Generic Constraints
// ============================================================================

/**
 * Base constraint for table types used with useFormHook
 * Relaxed to accept any object type (API contracts may have different field types)
 */
export interface TableWithMetadata {
	[key: string]: any
}

/**
 * Infer the output type from a Zod schema
 */
export type InferSchemaType<TSchema> = TSchema extends z.ZodType<infer T> ? T : never;

// ============================================================================
// Hook Configuration
// ============================================================================

/**
 * Callbacks for form lifecycle events
 *
 * @template TTable - The table record type
 */
export interface FormHookCallbacks<TTable> {
	/**
	 * Called before save operation
	 * Use for custom pre-save logic (e.g., data transformation)
	 */
	beforeSave?: () => void | Promise<void>

	/**
	 * Called after successful save
	 * Use for post-save actions (e.g., showing notifications, navigation)
	 */
	afterSave?: () => void | Promise<void>

	/**
	 * Called when validation errors occur
	 * Use for custom error handling or logging
	 */
	onValidationError?: (errors: ValidationError[]) => void

	/**
	 * Called on successful action completion
	 * @param action - The action that succeeded (e.g., 'Save', 'Submit')
	 * @param message - Success message from the action
	 */
	onActionSuccess?: (action: string, message: string) => void

	/**
	 * Called when an action fails
	 * @param action - The action that failed
	 * @param error - Error message
	 */
	onActionError?: (action: string, error: string) => void
}

/**
 * Configuration options for useFormHook
 *
 * NOTE: TZodSchema validates a subset of TTable fields (business rules).
 * It doesn't need to match TTable exactly - the table may have additional
 * fields like view-specific columns (e.g., DrillHoleId, vwCollarId in VwCollar).
 *
 * @template TTable - The table record type (e.g., VwCollar from API contracts)
 * @template TZodSchema - The Zod schema type for validation (e.g., CollarBusinessSchema)
 */
export interface FormHookOptions<TTable extends TableWithMetadata, TZodSchema extends z.ZodTypeAny> {
	/**
	 * Section key for store operations
	 * Maps to a section in the Zustand store (e.g., SectionKey.Collar)
	 */
	sectionKey: SectionKey

	/**
	 * Zod validation schema for the table
	 * Used by React Hook Form for form-level validation
	 */
	schema: TZodSchema

	/**
	 * Default values for form initialization (optional)
	 * If not provided, uses section data from store
	 */
	defaultValues?: Partial<TTable>

	/**
	 * React Hook Form validation mode
	 * @default 'onChange'
	 */
	mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all"

	/**
	 * Optional callbacks for lifecycle events
	 */
	callbacks?: FormHookCallbacks<TTable>
}

// ============================================================================
// Field Props
// ============================================================================

/**
 * Props for individual form fields
 * Compatible with Ant Design Form.Item
 */
export interface FieldProps {
	/**
	 * Whether this specific field has been modified
	 * Used to show dirty indicators
	 */
	isDirty: boolean

	/**
	 * Validation status for Ant Design Form.Item
	 */
	validateStatus?: "success" | "warning" | "error" | "validating"

	/**
	 * Help text to display (typically error message)
	 */
	help?: string

	/**
	 * Whether the field is read-only
	 * Based on section RowStatus (Approved = read-only)
	 */
	readOnly: boolean
}

// ============================================================================
// Action Handlers
// ============================================================================

/**
 * Action handler functions returned by the hook
 * Compatible with ActionBar component
 */
export interface FormActionHandlers {
	/**
	 * Save current changes
	 * Only available when isDirty === true
	 */
	onSave: () => Promise<void>

	/**
	 * Submit for review (Draft → Complete)
	 * Only available when isDirty === false and validation passes
	 */
	onSubmit: () => Promise<void>

	/**
	 * Reject and return to Draft
	 * Only available when RowStatus is Complete or Reviewed
	 */
	onReject: () => Promise<void>

	/**
	 * Mark as reviewed (Complete → Reviewed)
	 * Requires canReview permission
	 */
	onReview: () => Promise<void>

	/**
	 * Approve (Reviewed → Approved)
	 * Requires canApprove permission
	 */
	onApprove: () => Promise<void>

	/**
	 * Toggle report inclusion
	 * Only available when RowStatus is Approved
	 */
	onExclude: () => Promise<void>
}

// ============================================================================
// Form State
// ============================================================================

/**
 * React Hook Form state exposed by the hook
 *
 * @template TTable - The table record type
 */
export interface FormState<TTable extends FieldValues> {
	/**
	 * Whether the form has unsaved changes
	 * True if any field has been modified since last save/reset
	 */
	isDirty: boolean

	/**
	 * Object mapping field names to dirty status
	 * Useful for showing per-field dirty indicators
	 */
	dirtyFields: Partial<Record<keyof TTable, boolean>>

	/**
	 * React Hook Form validation errors
	 * These are Zod validation errors from the schema
	 */
	errors: FieldErrors<TTable>
}

// ============================================================================
// Hook Return Type
// ============================================================================

/**
 * Complete return type for useFormHook
 *
 * @template TTable - The table record type
 */
export interface FormHookReturn<TTable extends TableWithMetadata> {
	// ============================================================================
	// React Hook Form Integration
	// ============================================================================

	/**
	 * React Hook Form control object
	 * Pass to Controller components for field rendering
	 */
	control: Control<TTable>

	/**
	 * Form state (dirty, errors, etc.)
	 */
	formState: FormState<TTable>

	// ============================================================================
	// Form Methods
	// ============================================================================

	/**
	 * Get current form values
	 * @returns Current form data
	 */
	getValues: UseFormGetValues<TTable>

	/**
	 * Set value for a specific field
	 * @param name - Field name
	 * @param value - New value
	 */
	setValue: UseFormSetValue<TTable>

	/**
	 * Reset form to default or provided values
	 * @param values - Optional values to reset to
	 */
	reset: UseFormReset<TTable>

	/**
	 * Watch field values for reactive updates
	 * @param name - Field name(s) to watch
	 */
	watch: UseFormWatch<TTable>

	// ============================================================================
	// Section State
	// ============================================================================

	/**
	 * DrillHoleSection instance from store
	 * Provides access to section metadata, validation, and state
	 */
	section: DrillHoleSection<TTable>

	/**
	 * Whether the section passes validation
	 * Based on database validation (blocking errors only)
	 */
	isValid: boolean

	/**
	 * Validation errors mapped by field name
	 * Includes database, save, and warning errors
	 */
	validationErrors: Record<string, string>

	// ============================================================================
	// Action Handlers
	// ============================================================================

	/**
	 * Action handlers for Save, Submit, Review, Approve, Reject, Exclude
	 * Compatible with ActionBar component
	 */
	actions: FormActionHandlers

	// ============================================================================
	// Field Helpers
	// ============================================================================

	/**
	 * Get props for a specific field
	 * Combines form state, validation, and section state
	 *
	 * @param fieldName - Name of the field
	 * @returns Props to spread on Form.Item
	 *
	 * @example
	 * ```tsx
	 * const holeIdProps = getFieldProps('HoleId');
	 * <Form.Item label="Hole ID" {...holeIdProps}>
	 *   <Input />
	 * </Form.Item>
	 * ```
	 */
	getFieldProps: (fieldName: keyof TTable) => FieldProps
}

// ============================================================================
// Type Exports
// ============================================================================

/**
 * Re-export for convenience
 */
export type {
	Control,
	FieldErrors,
	GetIsDirty,
	UseFormGetValues,
	UseFormReset,
	UseFormSetValue,
	UseFormWatch,
} from "react-hook-form";
