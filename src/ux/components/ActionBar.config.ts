/**
 * ActionBar Default Configuration
 *
 * Default button configurations for all action types.
 * Defines visibility rules, enabled states, styling, and tooltips.
 *
 * @module ActionBar.config
 */

import type { ActionButtonConfig } from "./ActionBar.types";
import {
	CheckCircleOutlined,
	CheckOutlined,
	CloseOutlined,
	EyeOutlined,
	MinusCircleOutlined,
	SaveOutlined,
} from "@ant-design/icons";

import React from "react";
import { RowStatus } from "../types/drillhole";

/**
 * Default button configuration for all actions
 *
 * Each action has sensible defaults for:
 * - Label and icon
 * - Button styling (type, danger)
 * - Tooltip text
 * - Visibility logic (when to show button)
 * - Enabled logic (when button is clickable)
 *
 * These can be overridden via ActionBarProps.buttonConfig
 */
export const DEFAULT_BUTTON_CONFIG: ActionButtonConfig = {
	// ==========================================================================
	// Save Button
	// ==========================================================================
	save: {
		label: "Save",
		icon: React.createElement(SaveOutlined),
		type: "default",
		danger: false,
		tooltip: section =>
			section.isDirty
				? "Save changes to local database"
				: "No unsaved changes",
		visible: (section, permissions) => {
			// RULE: If isDirty, ONLY Save button shows
			// Only show Save when form has unsaved changes AND in Draft status
			const isDraft = section.rowStatus === RowStatus.Draft;
			return section.isDirty && isDraft;
		},
		enabled: (section) => {
			// Enable only if dirty and valid
			const validation = section.validate();
			const isValid = "database" in validation
				? validation.database.isValid
				: validation.isValid;
			return section.isDirty && isValid;
		},
	},

	// ==========================================================================
	// Submit Button
	// ==========================================================================
	submit: {
		label: "Submit",
		icon: React.createElement(CheckOutlined),
		type: "primary",
		danger: false,
		tooltip: section =>
			section.isDirty
				? "Save changes before submitting"
				: "Mark as complete and ready for review",
		visible: (section, permissions) => {
			// RULE: Draft & Clean → Submit
			// Only show Submit when NOT dirty, in Draft status, and valid
			const isDraft = section.rowStatus === RowStatus.Draft;
			return !section.isDirty && isDraft;
		},
		enabled: (section) => {
			// Enable only if not dirty and valid
			const validation = section.validate();
			const isValid = "database" in validation
				? validation.database.isValid
				: validation.isValid;
			return !section.isDirty && isValid;
		},
	},

	// ==========================================================================
	// Review Button
	// ==========================================================================
	review: {
		label: "Review",
		icon: React.createElement(EyeOutlined),
		type: "primary",
		danger: false,
		tooltip: "Mark as reviewed",
		visible: (section, permissions) => {
			// RULE: Complete (readonly) → Review, Reject (with permissions)
			// Only show if NOT dirty, Complete status, AND has review permission
			const isComplete = section.rowStatus === RowStatus.Complete;
			return !section.isDirty && isComplete && permissions.canReview;
		},
		enabled: () => true, // Always enabled when visible
	},

	// ==========================================================================
	// Approve Button
	// ==========================================================================
	approve: {
		label: "Approve",
		icon: React.createElement(CheckCircleOutlined),
		type: "primary",
		danger: false,
		tooltip: "Final approval - locks data",
		visible: (section, permissions) => {
			// RULE: Reviewed (readonly) → Approve, Reject, Exclude (with permissions)
			// Only show if NOT dirty, Reviewed status, AND has approve permission
			const isReviewed = section.rowStatus === RowStatus.Reviewed;
			return !section.isDirty && isReviewed && permissions.canApprove;
		},
		enabled: () => true, // Always enabled when visible
	},

	// ==========================================================================
	// Reject Button
	// ==========================================================================
	reject: {
		label: "Reject",
		icon: React.createElement(CloseOutlined),
		type: "default",
		danger: true,
		tooltip: "Return to Draft for corrections",
		visible: (section, permissions) => {
			// RULE: Show Reject from Complete, Reviewed, or Approved (with permissions)
			// Only show if NOT dirty AND has review permission
			const isRejectableStatus
				= section.rowStatus === RowStatus.Complete
				  || section.rowStatus === RowStatus.Reviewed
				  || section.rowStatus === RowStatus.Approved;
			return !section.isDirty && isRejectableStatus && permissions.canReview;
		},
		enabled: () => true, // Always enabled when visible
	},

	// ==========================================================================
	// Exclude/Include Button (Toggles)
	// ==========================================================================
	exclude: {
		label: (section) => {
			const metadata = section.getMetadata?.() || {};
			const isIncluded = metadata.ReportIncludeInd !== false;
			return isIncluded ? "Exclude" : "Include";
		},
		icon: (section) => {
			const metadata = section.getMetadata?.() || {};
			const isIncluded = metadata.ReportIncludeInd !== false;
			return isIncluded
				? React.createElement(MinusCircleOutlined)
				: React.createElement(CheckCircleOutlined);
		},
		type: (section) => {
			const metadata = section.getMetadata?.() || {};
			const isIncluded = metadata.ReportIncludeInd !== false;
			return isIncluded ? "default" : "primary";
		},
		danger: (section) => {
			const metadata = section.getMetadata?.() || {};
			const isIncluded = metadata.ReportIncludeInd !== false;
			return isIncluded; // Red when excluding, not red when including
		},
		tooltip: (section) => {
			const metadata = section.getMetadata?.() || {};
			const isIncluded = metadata.ReportIncludeInd !== false;
			return isIncluded
				? "Exclude from reports"
				: "Include in reports";
		},
		visible: (section, permissions) => {
			// RULE: Reviewed or Approved → Exclude/Include toggle (with permissions)
			// Only show if NOT dirty AND (Reviewed or Approved) AND has exclude permission
			const canShowExclude
				= section.rowStatus === RowStatus.Reviewed
				  || section.rowStatus === RowStatus.Approved;
			return !section.isDirty && canShowExclude && permissions.canExclude;
		},
		enabled: () => true, // Always enabled when visible
	},
};

/**
 * Deep merge utility for combining default and custom configs
 * Preserves default values while applying custom overrides
 *
 * @param defaults - Default configuration
 * @param overrides - Custom overrides
 * @returns Merged configuration
 */
export function mergeButtonConfig(
	defaults: ActionButtonConfig,
	overrides?: Partial<ActionButtonConfig>,
): ActionButtonConfig {
	if (!overrides)
		return defaults;

	return {
		save: { ...defaults.save, ...overrides.save },
		submit: { ...defaults.submit, ...overrides.submit },
		review: { ...defaults.review, ...overrides.review },
		approve: { ...defaults.approve, ...overrides.approve },
		reject: { ...defaults.reject, ...overrides.reject },
		exclude: { ...defaults.exclude, ...overrides.exclude },
	};
}
