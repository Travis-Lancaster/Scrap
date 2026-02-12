/**
 * QAQC View
 * 
 * Quality Assurance / Quality Control view.
 * 
 * @module drill-hole-data/views
 */

import React from "react";
import { QAQCReportsGrid } from "../sections/grids";
import { SectionFooter } from "../components/SectionFooter";
import { useSectionActions } from "../hooks";
import { useDrillHoleDataStore } from "../store";
import { SectionKey } from "../types/data-contracts";

export const QAQCView: React.FC = () => {
	const section = useDrillHoleDataStore(state => state.sections[SectionKey.QAQC]);
	const { onSave, onSubmit } = useSectionActions(SectionKey.QAQC);

	console.log("[QAQCView] 📊 Rendering QAQC view", {
		isDirty: section?.isDirty,
		rowCount: section?.data?.length || 0,
	});

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-hidden bg-white">
				<QAQCReportsGrid />
			</div>
			<SectionFooter
				rowStatus={section?.data?.[0]?.RowStatus || 0}
				isDirty={section?.isDirty || false}
				onSave={onSave}
				onSubmit={onSubmit}
			/>
		</div>
	);
};
