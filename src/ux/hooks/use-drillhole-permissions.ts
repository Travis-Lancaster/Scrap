/**
 * DrillHole Permission Hooks
 *
 * React hooks for permission checking and action authorization.
 * Uses Zustand user store and pure permission calculation functions.
 */

import type { UserPermissions, UserRole } from "#src/ux/types/user";
import { useUserStore } from "#src/ui-scaffold/store/index.js";
import { getUserPermissions } from "#src/ux/types/user";
import { useMemo } from "react";
import { RowStatus } from "../types/drillhole";

// ============================================================================
// Types
// ============================================================================

// /**
//  * User permissions calculated from user roles.
//  * Controls what actions users can perform on drillhole sections.
//  */
// export interface UserPermissions2 {
// 	/** Can review Complete sections (mark as Reviewed) */
// 	canReview: boolean;
// 	/** Can approve Reviewed sections (mark as Approved) */
// 	canApprove: boolean;
// 	/** Can exclude Approved sections from reports */
// 	canExclude: boolean;
// 	/** Is administrator (full access) */
// 	isAdmin: boolean;
// }

// ============================================================================
// Extended Action Types
// ============================================================================

/**
 * Section actions that can be performed on drillhole data.
 * Extends base SectionAction with additional workflow actions.
 */
export type SectionAction
	= | "save" // Save changes (Draft, Complete)
	  | "delete" // Delete row (Draft, Complete)
	  | "completed" // Mark as completed (Draft → Complete)
	  | "reviewed" // Mark as reviewed (Complete → Reviewed)
	  | "approved" // Mark as approved (Reviewed → Approved)
	  | "reject" // Reject review (Reviewed → Draft/Rejected)
	  | "exclude"; // Exclude from reports (Approved)

// ============================================================================
// Permission Calculation Functions
// ============================================================================

/**
 * Calculate user permissions from roles.
 * Pure function for easy testing and reuse.
 *
 * Permission Rules:
 * - Geologist/Logged: Can review (Complete → Reviewed)
 * - Manager: Can approve (Reviewed → Approved)
 * - Administrator: Can exclude (toggle ReportIncludeInd on Approved rows)
 *
 * @param roles - Array of user roles
 * @returns UserPermissions object with calculated flags
 */
// export function getUserPermissions(roles: UserRole[]): UserPermissions {
// 	if (!Array.isArray(roles) || roles.length === 0) {
// 		return {
// 			canReview: false,
// 			canApprove: false,
// 			canExclude: false,
// 			canViewRestrictedSections: false,
// 			canAccessQAQC: false,
// 			canImportAssay: false
// 		};
// 	}

// 	const isAdmin = roles.includes(UserRole.Administrator);
// 	const isManager = roles.includes(UserRole.Manager);
// 	const isGeologist = roles.includes(UserRole.Geologist) || roles.includes(UserRole.Logged);

// 	return {
// 		canReview: isGeologist || isManager || isAdmin,
// 		canApprove: isManager || isAdmin,
// 		canExclude: isAdmin,
// 		isAdmin,
// 	};
// }

// ============================================================================
// Permission Hooks
// ============================================================================

/**
 * Hook to get current user's permissions.
 *
 * Retrieves user roles from the Zustand store and calculates permissions
 * using the pure getUserPermissions function. Result is memoized for performance.
 *
 * @returns UserPermissions object with calculated permission flags
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const permissions = useDrillHolePermissions();
 *
 *   if (permissions.canApprove) {
 *     return <ApproveButton />;
 *   }
 * }
 * ```
 */
export function useDrillHolePermissions(): UserPermissions {
	const userRoles = useUserStore(state => state.roles);
	return useMemo(() => {
		return getUserPermissions(userRoles as UserRole[]);
	}, [userRoles]);
}

/**
 * Hook to check if user can perform a specific action on a row with given status.
 *
 * Implements the action visibility matrix based on row status and user permissions.
 * Result is memoized for performance.
 *
 * Action Visibility Rules:
 * - save: Available for Draft and Complete rows
 * - delete: Available for Draft and Complete rows
 * - completed: Available for Draft rows only
 * - reviewed: Available for Complete rows if user has review permission
 * - approved: Available for Reviewed rows if user has approve permission
 * - reject: Available for Reviewed rows if user has review permission
 * - exclude: Available for Approved rows if user has exclude permission
 *
 * @param action - The action to check authorization for
 * @param rowStatus - The current row status
 * @returns true if the action is allowed, false otherwise
 *
 * @example
 * ```tsx
 * function DataRow({ rowStatus }: { rowStatus: RowStatus }) {
 *   const canApprove = useCanPerformAction('approved', rowStatus);
 *   const canReview = useCanPerformAction('reviewed', rowStatus);
 *
 *   return (
 *     <div>
 *       {canReview && <Button>Review</Button>}
 *       {canApprove && <Button>Approve</Button>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useCanPerformAction(
	action: SectionAction,
	rowStatus: RowStatus,
): boolean {
	const permissions = useDrillHolePermissions();

	return useMemo(() => {
		switch (action) {
			case "save":
			case "delete":
				// Save and delete are available for Draft (0) and Complete (1) rows
				return rowStatus === RowStatus.Draft || rowStatus === RowStatus.Complete;

			case "completed":
				// Can only mark Draft rows as complete
				return rowStatus === RowStatus.Draft;

			case "reviewed":
				// Can review Complete rows if user has review permission
				return rowStatus === RowStatus.Complete && permissions.canReview;

			case "approved":
				// Can approve Reviewed rows if user has approve permission
				return rowStatus === RowStatus.Reviewed && permissions.canApprove;

			case "reject":
				// Can reject Reviewed rows if user has review permission
				return rowStatus === RowStatus.Reviewed && permissions.canReview;

			case "exclude":
				// Can exclude Approved rows if user has exclude permission
				return rowStatus === RowStatus.Approved && permissions.canExclude;

			default:
				// Unknown action, deny by default
				return false;
		}
	}, [action, rowStatus, permissions]);
}

/**
 * Hook to get all available actions for a row with given status.
 *
 * Returns array of actions that the current user can perform on the row.
 * Useful for dynamically generating action menus.
 *
 * @param rowStatus - The current row status
 * @returns Array of available SectionAction values
 *
 * @example
 * ```tsx
 * function ActionMenu({ rowStatus }: { rowStatus: RowStatus }) {
 *   const availableActions = useAvailableActions(rowStatus);
 *
 *   return (
 *     <Menu>
 *       {availableActions.map(action => (
 *         <MenuItem key={action} onClick={() => handleAction(action)}>
 *           {action}
 *         </MenuItem>
 *       ))}
 *     </Menu>
 *   );
 * }
 * ```
 */
export function useAvailableActions(rowStatus: RowStatus): SectionAction[] {
	const permissions = useDrillHolePermissions();

	return useMemo(() => {
		const actions: SectionAction[] = [];

		// Check each action and add if available
		const allActions: SectionAction[] = [
			"save",
			"delete",
			"completed",
			"reviewed",
			"approved",
			"reject",
			"exclude",
		];

		for (const action of allActions) {
			if (checkActionAvailability(action, rowStatus, permissions)) {
				actions.push(action);
			}
		}

		return actions;
	}, [rowStatus, permissions]);
}

/**
 * Internal helper function to check action availability.
 * Used by useAvailableActions to avoid duplicating logic.
 *
 * @param action - The action to check
 * @param rowStatus - The current row status
 * @param permissions - User permissions object
 * @returns true if action is available
 */
function checkActionAvailability(
	action: SectionAction,
	rowStatus: RowStatus,
	permissions: UserPermissions,
): boolean {
	switch (action) {
		case "save":
		case "delete":
			return RowStatus.Draft || rowStatus === RowStatus.Complete;

		case "completed":
			return rowStatus === RowStatus.Draft;

		case "reviewed":
			return rowStatus === RowStatus.Complete && permissions.canReview;

		case "approved":
			return rowStatus === RowStatus.Reviewed && permissions.canApprove;

		case "reject":
			return rowStatus === RowStatus.Reviewed && permissions.canReview;

		case "exclude":
			return rowStatus === RowStatus.Approved && permissions.canExclude;

		default:
			return false;
	}
}
