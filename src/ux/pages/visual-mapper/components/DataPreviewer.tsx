import React from "react";
import { useVisualMapperStore } from "../store/visual-mapper-store";
import { TxtGrid } from "./TxtGrid";

/**
 * @deprecated This component is no longer used in the redesigned visual-mapper.
 * The MappingWorkspace component now directly uses TxtGrid.
 * Kept for backwards compatibility only.
 */
export const DataPreviewer: React.FC = () => {
	const { fileContent } = useVisualMapperStore();

	if (!fileContent)
		return null;

	return <TxtGrid content={fileContent as string} />;
};
