/**
 * RigSetupFormView - Rig Setup Sheet Form
 *
 * Uses useFormHook for form management and ActionBar for actions
 * Follows cache-aside pattern with LiveQuery for reactive data
 *
 * ARCHITECTURE:
 * - Data Layer: Dexie + LiveQuery for reactive data
 * - Form Layer: useFormHook for generic form management
 * - Action Layer: ActionBar for smart action buttons
 * - Lookups: Custom hook (useRigSetupLookups)
 * - Offline-first with automatic sync
 *
 * PATTERN ALIGNMENT:
 * - Follows DrillPlanForm.tsx pattern (useFormHook)
 * - Follows DrillMethodSection.tsx pattern (LiveQuery for data)
 * - Consistent with other drill-hole sections
 */

// import { ActionBar } from "../../collar-workspace";
// import { SectionKey } from "../../drill-hole";
// Section Components
import {
	CommentsSection,
	DownHoleSurveySection,
	FinalSetupSection,
	PadInspectionSection,
} from "../components";
import { Form, Space, Spin } from "antd";
// import { useFormHook } from '@/ux/hooks';
// import { ActionBar } from '@/ux/features/collar-workspace/components';
import { useFilteredMachinery, useRigSetupData, useRigSetupLookups } from "../hooks";

// import { ActionBar } from "#src/ux/pages/drill-hole-data/components/ActionBar.js";
import React from "react";
import { RigSetupBusinessSchema } from "#src/data-layer/domain/extensions/rigsetup.business.js";
import { SectionKey } from "#src/ux/types/drillhole.js";
// import { RigSetupBusinessSchema } from "#src/data/domain/extensions/rigsetup.business.js";
import { useFormHook } from "#src/ux/hooks/useFormHook.js";

// import { RigSetupBusinessSchema } from '@/data/domain/rig-setup';
// import { SectionKey } from '@/ux/features/drill-hole/constants/section-keys';

interface RigSetupFormViewProps {
	/** Drill plan ID (CollarId) */
	drillPlanId: string
}

/**
 * RigSetupFormView Component
 *
 * Main component for the Rig Setup Sheet.
 * Coordinates subsections and manages form state.
 *
 * @param {RigSetupFormViewProps} props - Component props
 */
export const RigSetupFormView: React.FC<RigSetupFormViewProps> = ({ drillPlanId }) => {
	// ============================================
	// 1. FETCH DATA: Cache-aside pattern
	// ============================================
	const { rigSetup, isLoading } = useRigSetupData(drillPlanId);

	// ============================================
	// 2. LOOKUPS: Load FIRST to prevent cascade re-renders
	// ============================================
	const lookups = useRigSetupLookups();

	// ============================================
	// 3. FORM HOOK: Generic form management (memoized)
	// ============================================
	const form = useFormHook({
		sectionKey: SectionKey.RigSetup,
		schema: RigSetupBusinessSchema,
		defaultValues: rigSetup || undefined,
	});

	// ============================================
	// 4. FILTERED MACHINERY: Watch drilling contractor
	// ============================================
	// Type assertion to avoid React Hook Form deep type instantiation errors
	// React Hook Form's watch with complex Zod schemas causes deep type instantiation
	const watchFn = form.watch as any;
	const drillingContractor = watchFn("DownHoleSurveyDrillingContractor") as string | undefined;
	const filteredMachinery = useFilteredMachinery(drillingContractor);

	// ============================================
	// 5. TYPE ASSERTIONS: Avoid deep type instantiation
	// ============================================
	// Type assertion to avoid React Hook Form deep type instantiation errors
	// This is safe because Controller components handle the actual type checking
	const formControl = form.control as any;

	// ============================================
	// 6. LOADING STATE
	// ============================================
	if (isLoading || lookups.isLoading || !formControl) {
		return (
			<div style={{ padding: "24px", textAlign: "center" }}>
				<Spin size="large" tip="Loading rig setup..." />
			</div>
		);
	}

	// ============================================
	// 7. RENDER FORM
	// ============================================
	return (
		<div style={{ padding: "24px" }}>
			{/* Actions are handled by the page-level drill-hole ActionBar (top-right of lens bar). */}

			<Form layout="vertical">
				<Space direction="vertical" size="large" style={{ width: "100%" }}>
					<PadInspectionSection
						form={formControl}
						lookupOptions={{
							person: lookups.person,
							drillCompanies: lookups.drillCompanies,
						}}
						drillPlanId={drillPlanId}
					/>

					<FinalSetupSection
						form={formControl}
						lookupOptions={{
							person: lookups.person,
						}}
						drillPlanId={drillPlanId}
					/>

					<DownHoleSurveySection
						form={formControl}
						lookupOptions={{
							person: lookups.person,
							drillCompanies: lookups.drillCompanies,
							machineryAll: lookups.machinery,
						}}
						filteredMachinery={filteredMachinery}
						drillPlanId={drillPlanId}
					/>

					<CommentsSection
						form={formControl}
					/>
				</Space>
			</Form>
		</div>
	);
};

export default RigSetupFormView;
