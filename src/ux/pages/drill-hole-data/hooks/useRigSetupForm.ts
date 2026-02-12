import type { RigSetupData } from "../validation";
import { SectionKey } from "../types/data-contracts";
import { message } from "antd";
import { useDrillHoleDataStore } from "../store";
import { useForm } from "react-hook-form";

type FormData = { RigSetup: RigSetupData };

export function useRigSetupForm() {
	const section = useDrillHoleDataStore(state => state.sections.rigSetup);
	const updateSectionData = useDrillHoleDataStore(state => state.updateSectionData);
	const saveSection = useDrillHoleDataStore(state => state.saveSection);
	const submitSection = useDrillHoleDataStore(state => state.submitSection);
	const canEdit = useDrillHoleDataStore(state => state.canEdit(SectionKey.RigSetup));

	const {
		control,
		formState: { isDirty, dirtyFields, errors },
		setValue,
		reset,
	} = useForm<FormData>({
		defaultValues: { RigSetup: section.data as RigSetupData },
		mode: "onChange",
	});

	const handleChange = (fieldName: keyof RigSetupData, value: any) => {
		updateSectionData<RigSetupData>(SectionKey.RigSetup, { [fieldName]: value } as Partial<RigSetupData>);
	};

	const onSave = async () => {
		const result = await saveSection(SectionKey.RigSetup);
		if (result.success) message.success("RigSetup saved successfully");
		else message.error(result.message || "Save failed");
		return result;
	};

	const onSubmit = async () => {
		const result = await submitSection(SectionKey.RigSetup);
		if (result.success) message.success("RigSetup submitted successfully");
		else message.error(result.message || "Submit failed");
		return result;
	};

	const onReset = () => {
		section.reset();
		reset(section.data as any);
		message.info("Form reset to original values");
	};

	const getFieldProps = (fieldName: keyof RigSetupData) => ({
		error: errors.RigSetup?.[fieldName]?.message,
		validateStatus: errors.RigSetup?.[fieldName] ? ("error" as const) : undefined,
		onChange: (value: any) => handleChange(fieldName, value),
	});

	return {
		control,
		errors: errors.RigSetup,
		isDirty: isDirty || section.isDirty,
		dirtyFields,
		isValid: section.isValid(),
		isReadOnly: !canEdit,
		validation: section.validation,
		data: section.data as RigSetupData,
		onSave,
		onSubmit,
		onReset,
		getFieldProps,
		handleChange,
		setValue,
		reset,
	};
}
