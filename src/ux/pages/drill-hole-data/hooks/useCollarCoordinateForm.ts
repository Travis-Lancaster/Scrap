/**
 * CollarCoordinate Form Hook
 * 
 * Encapsulates form logic for CollarCoordinate section.
 * 
 * @module drill-hole-data/hooks
 */

import { useForm } from "react-hook-form";
import { message } from "antd";
import { useDrillHoleDataStore } from "../store";
import { SectionKey } from "../types/data-contracts";
import type { CollarCoordinateData } from "../validation";

/**
 * CollarCoordinate Form Hook
 * 
 * Provides form state, validation, and action handlers for CollarCoordinate form.
 * 
 * NOTE: This should display as a FORM (not grid), showing only the most accurate coordinate.
 */
export function useCollarCoordinateForm() {
	console.log(`[useCollarCoordinateForm] 🎣 Hook initialized`);

	// ========================================================================
	// Store Selectors
	// ========================================================================

	const section = useDrillHoleDataStore(state => state.sections.collarCoordinate);
	const updateSectionData = useDrillHoleDataStore(state => state.updateSectionData);
	const saveSection = useDrillHoleDataStore(state => state.saveSection);
	const submitSection = useDrillHoleDataStore(state => state.submitSection);
	const canEdit = useDrillHoleDataStore(state => state.canEdit(SectionKey.CollarCoordinate));

	// ========================================================================
	// React Hook Form Setup
	// ========================================================================

	const {
		control,
		formState: { isDirty, errors },
		watch,
		setValue,
		reset,
	} = useForm<CollarCoordinateData>({
		defaultValues: section.data as CollarCoordinateData,
		mode: "onChange",
	});

	console.log(`[useCollarCoordinateForm] Form state:`, {
		isDirty,
		canEdit,
		errorCount: Object.keys(errors).length,
	});

	// ========================================================================
	// Field Change Handler
	// ========================================================================

	const handleChange = (fieldName: keyof CollarCoordinateData, value: any) => {
		console.log(`[useCollarCoordinateForm] 📝 Field changed:`, { fieldName, value });
		updateSectionData<CollarCoordinateData>(
			SectionKey.CollarCoordinate,
			{ [fieldName]: value } as Partial<CollarCoordinateData>
		);
	};

	// ========================================================================
	// Action Handlers
	// ========================================================================

	const onSave = async () => {
		console.log(`[useCollarCoordinateForm] 💾 Save clicked`);

		try {
			const result = await saveSection(SectionKey.CollarCoordinate);
			
			if (result.success) {
				message.success("Collar coordinate saved successfully");
				console.log(`[useCollarCoordinateForm] ✅ Save successful`);
			} else {
				message.error(result.message || "Save failed");
				console.error(`[useCollarCoordinateForm] ❌ Save failed:`, result.errors);
			}

			return result;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Save failed";
			message.error(errorMessage);
			console.error(`[useCollarCoordinateForm] ❌ Save error:`, error);
			throw error;
		}
	};

	const onSubmit = async () => {
		console.log(`[useCollarCoordinateForm] ✅ Submit clicked`);

		try {
			const result = await submitSection(SectionKey.CollarCoordinate);
			
			if (result.success) {
				message.success("Collar coordinate submitted successfully");
				console.log(`[useCollarCoordinateForm] ✅ Submit successful`);
			} else {
				message.error(result.message || "Submit failed");
				console.error(`[useCollarCoordinateForm] ❌ Submit failed:`, result.errors);
			}

			return result;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Submit failed";
			message.error(errorMessage);
			console.error(`[useCollarCoordinateForm] ❌ Submit error:`, error);
			throw error;
		}
	};

	const onReset = () => {
		console.log(`[useCollarCoordinateForm] 🔄 Reset clicked`);
		section.reset();
		reset(section.data as CollarCoordinateData);
		message.info("Form reset to original values");
	};

	// ========================================================================
	// Field Props Helper
	// ========================================================================

	const getFieldProps = (fieldName: keyof CollarCoordinateData) => ({
		error: errors[fieldName]?.message,
		validateStatus: errors[fieldName] ? ("error" as const) : undefined,
		onChange: (value: any) => handleChange(fieldName, value),
	});

	// ========================================================================
	// Validation State
	// ========================================================================

	const validation = section.validation;
	const isValid = section.isValid();

	console.log(`[useCollarCoordinateForm] Validation state:`, {
		isValid,
		canSave: validation.canSave,
		databaseErrors: validation.database.errors.length,
		saveWarnings: validation.save.warnings.length,
	});

	// ========================================================================
	// Return Hook API
	// ========================================================================

	return {
		// Form state
		control,
		errors,
		isDirty: isDirty || section.isDirty,
		isValid,
		isReadOnly: !canEdit,
		
		// Validation
		validation,
		
		// Data
		data: section.data as CollarCoordinateData,
		
		// Actions
		onSave,
		onSubmit,
		onReset,
		
		// Helpers
		getFieldProps,
		handleChange,
		
		// Direct form methods
		watch,
		setValue,
		reset,
	};
}
