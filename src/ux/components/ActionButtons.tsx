/**
 * ActionButtons Component
 *
 * Smart buttons for section actions (Save/Submit/Reject/Review/Approve/Exclude).
 * Uses permission hooks to determine button visibility based on user roles and row status.
 */

import { Button, Space, Tooltip } from "antd";
// import type { DrillHoleSection } from "../features/drill-hole";
import {
	CheckCircleOutlined,
	CheckOutlined,
	CloseOutlined,
	EyeOutlined,
	MinusCircleOutlined,
	SaveOutlined,
} from "@ant-design/icons";
// import { useCanPerformAction } from "../hooks/use-drillhole-permissions";
import { DrillHoleSection, RowStatus } from "../types/drillhole";

import React from "react";
import { useCanPerformAction } from "../hooks/use-drillhole-permissions";

// import { RowStatus, type DrillHoleSection } from '#src/types/drillhole';
// import { useCanPerformAction } from '#src/hooks/use-drillhole-permissions';

interface ActionButtonsProps {
	section: DrillHoleSection
	loading?: boolean
	onSave?: () => void | Promise<void>
	onSubmit?: () => void | Promise<void>
	onReject?: () => void | Promise<void>
	onReview?: () => void | Promise<void>
	onApprove?: () => void | Promise<void>
	onExclude?: () => void | Promise<void>
}

/**
 * ActionButtons Component
 *
 * Renders appropriate action buttons based on user permissions and section state.
 * Uses permission hooks to enforce role-based access control.
 */
export const ActionButtons: React.FC<ActionButtonsProps> = ({
	section,
	loading = false,
	onSave,
	onSubmit,
	onReject,
	onReview,
	onApprove,
	onExclude,
}) => {
	const rowStatus = section.getRowStatus();
	const isValid = section.isValid();
	const isDirty = section.hasUnsavedChanges();
	const validationErrors = section.getValidationErrors();

	// Check permissions for each action using hooks
	const canSave = useCanPerformAction("save", rowStatus);
	const canDelete = useCanPerformAction("delete", rowStatus);
	const canCompleted = useCanPerformAction("completed", rowStatus);
	const canReview = useCanPerformAction("reviewed", rowStatus);
	const canApprove = useCanPerformAction("approved", rowStatus);
	const canReject = useCanPerformAction("reject", rowStatus);
	const canExclude = useCanPerformAction("exclude", rowStatus);

	console.log("🔘 ActionButtons render:", {
		rowStatus,
		isValid,
		isDirty,
		permissions: { canSave, canCompleted, canReview, canApprove, canReject, canExclude },
		validationErrors: validationErrors.length > 0 ? validationErrors : "none",
	});

	return (
		<Space>
			{/* Save button - available for Draft and Complete rows */}
			{isDirty && canSave && onSave && (
				<Tooltip title={!isDirty ? "No unsaved changes" : "Save changes"}>
					<Button
						type="default"
						icon={<SaveOutlined />}
						onClick={() => {
							console.log("💾 ActionButtons: Save clicked");
							onSave();
						}}
						disabled={!isDirty || loading}
						loading={loading}
					>
						Save
					</Button>
				</Tooltip>
			)}

			{/* Submit/Complete button - available for Draft rows */}
			{!isDirty && canCompleted && <div>HERE</div>}
			{!isDirty && canCompleted && onSubmit && (
				<Tooltip title={isDirty ? "Save changes before submitting" : "Mark as complete"}>
					<Button
						type="primary"
						icon={<CheckOutlined />}
						onClick={() => {
							console.log("✅ ActionButtons: Submit clicked");
							onSubmit();
						}}
						disabled={isDirty || loading}
						loading={loading}
					>
						Submit
					</Button>
				</Tooltip>
			)}

			{/* Review button - available for Complete rows with review permission */}
			{canReview && onReview && rowStatus === RowStatus.Complete && (
				<Tooltip title="Mark as reviewed">
					<Button
						type="primary"
						icon={<EyeOutlined />}
						onClick={() => {
							console.log("👁️ ActionButtons: Review clicked");
							onReview();
						}}
						disabled={loading}
						loading={loading}
					>
						Review
					</Button>
				</Tooltip>
			)}

			{/* Approve button - available for Reviewed rows with approve permission */}
			{canApprove && onApprove && (
				<Tooltip title="Final approval">
					<Button
						type="primary"
						icon={<CheckCircleOutlined />}
						onClick={() => {
							console.log("✅ ActionButtons: Approve clicked");
							onApprove();
						}}
						disabled={loading}
						loading={loading}
					>
						Approve
					</Button>
				</Tooltip>
			)}

			{/* Reject button - available for Complete and Reviewed rows with review permission */}
			{canReject && onReject && (
				<Tooltip title="Return to Draft">
					<Button
						type="default"
						danger
						icon={<CloseOutlined />}
						onClick={() => {
							console.log("❌ ActionButtons: Reject clicked");
							onReject();
						}}
						disabled={loading}
						loading={loading}
					>
						Reject
					</Button>
				</Tooltip>
			)}

			{/* Exclude button - available for Approved rows with exclude permission */}
			{canExclude && onExclude && (
				<Tooltip title="Exclude from reports">
					<Button
						type="default"
						danger
						icon={<MinusCircleOutlined />}
						onClick={() => {
							console.log("🚫 ActionButtons: Exclude clicked");
							onExclude();
						}}
						disabled={loading}
						loading={loading}
					>
						Exclude
					</Button>
				</Tooltip>
			)}

			{/* Read-only indicator for Approved status with no exclude permission */}
			{rowStatus === RowStatus.Approved && !canExclude && (
				<Tooltip title="This section has been approved and is read-only">
					<Button
						type="default"
						icon={<CheckCircleOutlined />}
						disabled
					>
						Approved
					</Button>
				</Tooltip>
			)}
		</Space>
	);
};

export default ActionButtons;
