/**
 * useSectionActions Hook - Dexie-First Architecture
 *
 * Provides consistent action handlers for all DrillHole sections.
 * Eliminates code duplication by centralizing action orchestration.
 *
 * ## Dexie-First Pattern
 *
 * This hook follows dependency injection where Dexie operations are
 * passed as parameters rather than accessing a Zustand store. This ensures:
 * - Single source of truth (Dexie)
 * - Testable (mock operations easily)
 * - Flexible (different sections can use different operations)
 * - Clear dependencies (no hidden store coupling)
 *
 * ## SOLID Principles Applied
 *
 * - Single Responsibility: Only handles action orchestration and messaging
 * - Open/Closed: Extensible via callbacks and operations, closed for modification
 * - Liskov Substitution: Works for any section type
 * - Interface Segregation: Clean, focused interface
 * - Dependency Inversion: Depends on operation abstractions, not concrete implementations
 *
 * ## Benefits
 *
 * - DRY: Single implementation for all 6 actions
 * - KISS: Simple API, pass operations as parameters
 * - Type-safe: Returns properly typed handlers
 * - Testable: Can be tested independently with mock operations
 * - Consistent: Same behavior across all sections
 * - Flexible: Optional callbacks for custom logic
 *
 * @example Form Section with Dexie Operations
 * ```tsx
 * // Parent component with LiveQuery
 * const collar = useLiveQuery(() => db.collar.get(drillHoleId), [drillHoleId]);
 *
 * const actions = useSectionActions({
 *   sectionKey: SectionKey.Collar,
 *   operations: {
 *     save: async () => {
 *       await db.collar.put({ ...collar, ...formData });
 *       return { success: true, message: 'Saved' };
 *     },
 *     submit: async () => {
 *       await db.collar.update(collar.CollarId, { RowStatus: RowStatus.Complete });
 *       return { success: true, message: 'Submitted' };
 *     },
 *   },
 *   callbacks: {
 *     beforeSave: () => updateFormData(),
 *     afterSave: () => resetForm(),
 *   },
 * });
 * ```
 *
 * @example Grid Section with Repository
 * ```tsx
 * const actions = useSectionActions({
 *   sectionKey: SectionKey.Sample,
 *   operations: {
 *     save: () => sampleRepository.save(drillHoleId, samples),
 *     submit: () => sampleRepository.submit(drillHoleId),
 *   },
 * });
 * ```
 */

// import type { SectionKey } from "../features/drill-hole";
import { App } from "antd";
import { SectionKey } from "../types/drillhole";
import { useCallback } from "react";

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Result returned by operation functions
 */
export interface OperationResult {
	success: boolean
	message?: string
	errors?: Array<{ field: string, message: string }>
}

/**
 * Dexie operations for section actions
 * Parent component provides these functions that update Dexie directly
 */
export interface SectionOperations {
	/** Save current section data to Dexie */
	save?: () => Promise<OperationResult>

	/** Mark section as Complete (Draft → Complete) */
	submit?: () => Promise<OperationResult>

	/** Return section to Draft status */
	reject?: () => Promise<OperationResult>

	/** Mark section as Reviewed (Complete → Reviewed) */
	review?: () => Promise<OperationResult>

	/** Mark section as Approved (Reviewed → Approved) */
	approve?: () => Promise<OperationResult>

	/** Toggle ReportIncludeInd for Approved sections */
	exclude?: () => Promise<OperationResult>
}

/**
 * Optional callbacks for lifecycle hooks
 */
export interface SectionActionCallbacks {
	/** Called before save to prepare data (e.g., sync form values) */
	beforeSave?: () => void | Promise<void>

	/** Called after successful save (e.g., reset form, clear selections) */
	afterSave?: () => void | Promise<void>

	/** Called after any successful action */
	onSuccess?: (action: string, message: string) => void

	/** Called on any error */
	onError?: (action: string, error: string) => void
}

/**
 * Configuration for useSectionActions hook
 */
export interface UseSectionActionsConfig {
	/** Section key for logging and identification */
	sectionKey: SectionKey

	/** Dexie operations (dependency injection) */
	operations?: SectionOperations

	/** Optional lifecycle callbacks */
	callbacks?: SectionActionCallbacks
}

/**
 * Action handlers returned by the hook
 */
export interface SectionActionHandlers {
	onSave: () => Promise<void>
	onSubmit: () => Promise<void>
	onReject: () => Promise<void>
	onReview: () => Promise<void>
	onApprove: () => Promise<void>
	onExclude: () => Promise<void>
}

// ============================================================================
// Hook Implementation
// ============================================================================

/**
 * Hook that provides all section action handlers with Dexie-First pattern
 *
 * Uses dependency injection - parent provides Dexie operations as parameters.
 * This ensures single source of truth (Dexie) and makes testing easy.
 *
 * @param config - Configuration with sectionKey, operations, and callbacks
 * @returns Object with all 6 action handlers
 *
 * @example
 * ```tsx
 * const actions = useSectionActions({
 *   sectionKey: SectionKey.Collar,
 *   operations: {
 *     save: async () => {
 *       await db.collar.put(updatedData);
 *       return { success: true };
 *     },
 *   },
 *   callbacks: {
 *     beforeSave: () => syncFormToData(),
 *     onSuccess: (action, msg) => notification.success({ message: msg }),
 *   },
 * });
 * ```
 */
export function useSectionActions(
	config: UseSectionActionsConfig,
): SectionActionHandlers {
	const { message } = App.useApp();

	// ============================================================================
	// Destructure Configuration
	// ============================================================================

	const { sectionKey, operations = {}, callbacks = {} } = config;
	const {
		beforeSave,
		afterSave,
		onSuccess,
		onError,
	} = callbacks;

	// ============================================================================
	// Generic Action Handler Wrapper
	// ============================================================================

	/**
	 * Generic wrapper that handles action execution, success/error messaging,
	 * and optional callback invocation.
	 *
	 * @param actionName - Human-readable action name (e.g., "Save", "Submit")
	 * @param actionFn - Store action function to execute
	 * @param successMessage - Default success message if action doesn't provide one
	 */
	const handleAction = useCallback(
		async (
			actionName: string,
			actionFn: (() => Promise<OperationResult>) | undefined,
			successMessage: string,
		) => {
			console.log(`🎯 [useSectionActions:${sectionKey}] handleAction START:`, { actionName, hasActionFn: !!actionFn });

			// Check if operation is provided
			if (!actionFn) {
				const errMsg = `${actionName} operation not provided`;
				console.warn(`⚠️ [useSectionActions:${sectionKey}] ${errMsg}`);
				message.warning(errMsg);
				onError?.(actionName, errMsg);
				return;
			}

			try {
				// Execute the Dexie operation
				console.log(`🔄 [useSectionActions:${sectionKey}] Executing actionFn for ${actionName}...`);
				const result = await actionFn();
				console.log(`✅ [useSectionActions:${sectionKey}] ${actionName} actionFn complete, result:`, result);

				if (result.success) {
					// Success: Show message and call optional callback
					const msg = result.message || successMessage;
					console.log(`✅ [useSectionActions:${sectionKey}] ${actionName} SUCCESS:`, msg);
					message.success(msg);
					onSuccess?.(actionName, msg);
				}
				else {
					// Failure: Show error and call optional callback
					const errMsg = result.message || `Failed to ${actionName.toLowerCase()}`;
					console.error(`❌ [useSectionActions:${sectionKey}] ${actionName} FAILED:`, errMsg);
					message.error(errMsg);
					onError?.(actionName, errMsg);

					if (result.errors) {
						console.error(`❌ [useSectionActions:${sectionKey}] ${actionName} validation errors:`, result.errors);
					}
				}
			}
			catch (error) {
				// Exception: Show error and call optional callback
				const errMsg = error instanceof Error ? error.message : `${actionName} failed`;
				console.error(`❌ [useSectionActions:${sectionKey}] ${actionName} EXCEPTION:`, error);
				message.error(errMsg);
				onError?.(actionName, errMsg);
			}
		},
		[sectionKey, message, onSuccess, onError],
	);

	// ============================================================================
	// Action Handlers - One for each action type
	// ============================================================================

	/**
	 * Save handler - Saves section data
	 * Calls beforeSave → save → afterSave
	 */
	const onSave = useCallback(async () => {
		try {
			await beforeSave?.();
			await handleAction("Save", operations.save, "Section saved successfully");
			await afterSave?.();
		}
		catch (error) {
			console.error(`❌ [${sectionKey}] beforeSave/afterSave error:`, error);
			const errMsg = error instanceof Error ? error.message : "Save callback failed";
			message.error(errMsg);
		}
	}, [beforeSave, afterSave, handleAction, operations.save, sectionKey, message]);

	/**
	 * Submit handler - Transitions Draft → Complete (with validation)
	 * Validates before transitioning, rejects if validation fails
	 */
	const onSubmit = useCallback(async () => {
		console.log(`🎯 [useSectionActions:${sectionKey}] onSubmit clicked - START`);
		try {
			console.log(`🔄 [useSectionActions:${sectionKey}] Calling beforeSave...`);
			await beforeSave?.();
			console.log(`✅ [useSectionActions:${sectionKey}] beforeSave complete`);

			console.log(`🔄 [useSectionActions:${sectionKey}] Calling handleAction with operations.submit...`);
			await handleAction(
				"Submit",
				operations.submit,
				"Section submitted successfully",
			);
			console.log(`✅ [useSectionActions:${sectionKey}] handleAction complete`);
		}
		catch (error) {
			console.error(`❌ [useSectionActions:${sectionKey}] Submit error:`, error);
			const errMsg = error instanceof Error ? error.message : "Submit callback failed";
			message.error(errMsg);
		}
	}, [beforeSave, handleAction, operations.submit, sectionKey, message]);

	/**
	 * Reject handler - Returns section back to Draft status
	 * Available from Complete or Reviewed status
	 */
	const onReject = useCallback(async () => {
		await handleAction(
			"Reject",
			operations.reject,
			"Section rejected - moved back to Draft",
		);
	}, [handleAction, operations.reject, sectionKey]);

	/**
	 * Review handler - Transitions Complete → Reviewed
	 * Requires review permission (checked by ActionButtons component)
	 */
	const onReview = useCallback(async () => {
		await handleAction(
			"Review",
			operations.review,
			"Section marked as reviewed",
		);
	}, [handleAction, operations.review, sectionKey]);

	/**
	 * Approve handler - Transitions Reviewed → Approved
	 * Sets ReportIncludeInd to true by default
	 * Requires approve permission (checked by ActionButtons component)
	 */
	const onApprove = useCallback(async () => {
		await handleAction(
			"Approve",
			operations.approve,
			"Section approved and included in reports",
		);
	}, [handleAction, operations.approve, sectionKey]);

	/**
	 * Exclude handler - Toggles ReportIncludeInd for Approved sections
	 * Section remains in Approved status, just excluded from reports
	 * Requires exclude permission (checked by ActionButtons component)
	 */
	const onExclude = useCallback(async () => {
		await handleAction(
			"Exclude",
			operations.exclude,
			"Section excluded from reports",
		);
	}, [handleAction, operations.exclude, sectionKey]);

	// ============================================================================
	// Return All Handlers
	// ============================================================================

	return {
		onSave,
		onSubmit,
		onReject,
		onReview,
		onApprove,
		onExclude,
	};
}
