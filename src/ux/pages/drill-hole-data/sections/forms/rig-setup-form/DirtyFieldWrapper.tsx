import React from "react";

interface DirtyFieldWrapperProps {
	isDirty: boolean;
	children: React.ReactNode;
}

/**
 * Wraps form controls to apply dirty state styling
 * Adds the "control-dirty" class when field is dirty
 */
export const DirtyFieldWrapper: React.FC<DirtyFieldWrapperProps> = ({ isDirty, children }) => {
	return <div className={isDirty ? "control-dirty" : ""}>{children}</div>;
};
