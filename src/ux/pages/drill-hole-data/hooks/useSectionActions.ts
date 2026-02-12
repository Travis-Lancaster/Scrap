/**
 * Section Actions Hook
 * 
 * Generic hook for section-level actions (save, submit, review, approve, reject).
 * Can be used by any section (form or grid).
 * 
 * @module drill-hole-data/hooks
 */

import { useCallback } from "react";
import { message } from "antd";
import { useDrillHoleDataStore } from "../store";
import type { SectionKey } from "../types/data-contracts";

/**
 * Section Actions Hook
 * 
 * Provides action handlers for any section.
 * 
 * @param sectionKey - Section identifier
 * @returns Action handlers
 * 
 * @example
 * const { onSave, onSubmit, onReview } = useSectionActions("rigSetup");
 */
export function useSectionActions(sectionKey: SectionKey) {
	console.log(`[useSectionActions] 🎣 Hook initialized for:`, sectionKey);

	// ========================================================================
	// Store Selectors
	// ========================================================================

	const saveSection = useDrillHoleDataStore(state => state.saveSection);
	const submitSection = useDrillHoleDataStore(state => state.submitSection);
	const rejectSection = useDrillHoleDataStore(state => state.rejectSection);
	const reviewSection = useDrillHoleDataStore(state => state.reviewSection);
	const approveSection = useDrillHoleDataStore(state => state.approveSection);
	const canEdit = useDrillHoleDataStore(state => state.canEdit(sectionKey));

	// ========================================================================
	// Action Handlers
	// ========================================================================

	const onSave = useCallback(async () => {
		console.log(`[useSectionActions] 💾 Save:`, sectionKey);

		try {
			const result = await saveSection(sectionKey);
			
			if (result.success) {
				message.success(`${sectionKey} saved successfully`);
			} else {
				message.error(result.message || "Save failed");
				if (result.errors) {
					console.error(`[useSectionActions] Validation errors:`, result.errors);
				}
			}

			return result;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Save failed";
			message.error(errorMessage);
			throw error;
		}
	}, [sectionKey, saveSection]);

	const onSubmit = useCallback(async () => {
		console.log(`[useSectionActions] ✅ Submit:`, sectionKey);

		try {
			const result = await submitSection(sectionKey);
			
			if (result.success) {
				message.success(`${sectionKey} submitted successfully`);
			} else {
				message.error(result.message || "Submit failed");
			}

			return result;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Submit failed";
			message.error(errorMessage);
			throw error;
		}
	}, [sectionKey, submitSection]);

	const onReject = useCallback(async () => {
		console.log(`[useSectionActions] ❌ Reject:`, sectionKey);

		try {
			const result = await rejectSection(sectionKey);
			
			if (result.success) {
				message.success(`${sectionKey} rejected`);
			} else {
				message.error(result.message || "Reject failed");
			}

			return result;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Reject failed";
			message.error(errorMessage);
			throw error;
		}
	}, [sectionKey, rejectSection]);

	const onReview = useCallback(async () => {
		console.log(`[useSectionActions] 👁️ Review:`, sectionKey);

		try {
			const result = await reviewSection(sectionKey);
			
			if (result.success) {
				message.success(`${sectionKey} marked as reviewed`);
			} else {
				message.error(result.message || "Review failed");
			}

			return result;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Review failed";
			message.error(errorMessage);
			throw error;
		}
	}, [sectionKey, reviewSection]);

	const onApprove = useCallback(async () => {
		console.log(`[useSectionActions] ✔️ Approve:`, sectionKey);

		try {
			const result = await approveSection(sectionKey);
			
			if (result.success) {
				message.success(`${sectionKey} approved`);
			} else {
				message.error(result.message || "Approve failed");
			}

			return result;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Approve failed";
			message.error(errorMessage);
			throw error;
		}
	}, [sectionKey, approveSection]);

	// ========================================================================
	// Return Hook API
	// ========================================================================

	return {
		// State
		canEdit,
		
		// Actions
		onSave,
		onSubmit,
		onReject,
		onReview,
		onApprove,
	};
}
