/**
 * ActionBar Type Definitions
 *
 * Type system for the reusable ActionBar component that provides
 * permission-aware, state-aware action buttons for any section.
 *
 * @module ActionBar.types
 */

import type { DrillHoleSection } from "../types/drillhole";
// import type { UserPermissions } from '../hooks/use-drillhole-permissions';
import type { FormActionHandlers } from "../hooks/useFormHook.types";
import type { UserPermissions } from "../types/user";

// ============================================================================
// Button Configuration
// ============================================================================

/**
 * Configuration for a single action button
 */
export interface ButtonItemConfig {
	/**
	 * Button label text
	 * Can be a string or function that returns the label based on section state
	 * @default Varies by action type
	 */
	label?: string | ((section: DrillHoleSection) => string)

	/**
	 * Icon component (from @ant-design/icons)
	 * Can be a ReactNode or function that returns the icon based on section state
	 */
	icon?: React.ReactNode | ((section: DrillHoleSection) => React.ReactNode)

	/**
	 * Ant Design button type
	 * Can be a string or function that returns the type based on section state
	 * @default 'default' for most, 'primary' for Submit/Review/Approve
	 */
	type?: "primary" | "default" | "dashed" | "link" | "text" | ((section: DrillHoleSection) => "primary" | "default" | "dashed" | "link" | "text")

	/**
	 * Apply danger styling (red color)
	 * Can be a boolean or function that returns danger state based on section state
	 * @default false, true for Reject/Exclude
	 */
	danger?: boolean | ((section: DrillHoleSection) => boolean)

	/**
	 * Tooltip text shown on hover
	 * Can be a string or function that generates tooltip based on section state
	 */
	tooltip?: string | ((section: DrillHoleSection, permissions: UserPermissions) => string)

	/**
	 * Custom visibility logic (overrides default)
	 * Return true to show the button
	 *
	 * @param section - Current section state
	 * @param permissions - User permissions
	 * @returns true if button should be visible
	 */
	visible?: (section: DrillHoleSection, permissions: UserPermissions) => boolean

	/**
	 * Custom enabled logic (overrides default)
	 * Return true to enable the button (false = disabled)
	 *
	 * @param section - Current section state
	 * @param permissions - User permissions
	 * @returns true if button should be enabled
	 */
	enabled?: (section: DrillHoleSection, permissions: UserPermissions) => boolean
}

/**
 * Complete button configuration for all action types
 */
export interface ActionButtonConfig {
	save: ButtonItemConfig
	submit: ButtonItemConfig
	review: ButtonItemConfig
	approve: ButtonItemConfig
	reject: ButtonItemConfig
	exclude: ButtonItemConfig
}

// ============================================================================
// Component Props
// ============================================================================

/**
 * Props for ActionBar component
 */
export interface ActionBarProps {
	/**
	 * Section instance with state and metadata
	 * Used to determine button visibility and enabled state
	 */
	section: DrillHoleSection

	/**
	 * Action handlers from useFormHook or useSectionActions
	 * Omit actions you don't want to show (e.g., no onReview = Review button hidden)
	 */
	actions: Partial<FormActionHandlers>

	/**
	 * Loading state during async operations
	 * When true, all buttons are disabled and show loading spinner
	 * @default false
	 */
	loading?: boolean

	/**
	 * Additional custom actions/buttons to render
	 * Useful for section-specific actions (e.g., Import, Export, Bulk Edit)
	 *
	 * @example
	 * ```tsx
	 * extraActions={
	 *   <>
	 *     <Button icon={<ImportOutlined />}>Import</Button>
	 *     <Button icon={<ExportOutlined />}>Export</Button>
	 *   </>
	 * }
	 * ```
	 */
	extraActions?: React.ReactNode

	/**
	 * Button size
	 * @default 'middle'
	 */
	size?: "small" | "middle" | "large"

	/**
	 * Layout direction
	 * @default 'horizontal'
	 */
	direction?: "horizontal" | "vertical"

	/**
	 * Custom CSS class name
	 */
	className?: string

	/**
	 * Custom inline styles
	 */
	style?: React.CSSProperties

	/**
	 * Override default button configurations
	 * Use to customize button appearance, labels, or behavior
	 *
	 * @example
	 * ```tsx
	 * buttonConfig={{
	 *   save: {
	 *     label: 'Save Survey',
	 *     icon: <DatabaseOutlined />,
	 *   },
	 *   submit: {
	 *     label: 'Complete Survey',
	 *     tooltip: 'Submit for geological review'
	 *   }
	 * }}
	 * ```
	 */
	buttonConfig?: Partial<ActionButtonConfig>

	/**
	 * Whether to show read-only indicator for Approved sections
	 * @default true
	 */
	showReadOnlyIndicator?: boolean
}

// ============================================================================
// Internal Types
// ============================================================================

/**
 * Internal button data structure used during rendering
 * Contains resolved values (no functions)
 * @internal
 */
export interface ActionButton {
	/** Unique key for React rendering */
	key: string

	/** Action handler function */
	action: () => void | Promise<void>

	/** Button configuration with resolved values */
	config: {
		/** Resolved button label */
		label?: string

		/** Resolved icon component */
		icon?: React.ReactNode

		/** Resolved button type */
		type?: "primary" | "default" | "dashed" | "link" | "text"

		/** Resolved danger state */
		danger?: boolean
	}

	/** Whether button is enabled */
	enabled: boolean

	/** Tooltip text (resolved) */
	tooltip: string
}
