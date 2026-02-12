/**
 * QAQC View
 *
 * Quality Assurance / Quality Control reports view.
 * Displays QAQC report grid with section footer.
 *
 * @module drill-hole-data/views
 */

import React from "react";

import { DataGrid } from "../components/DataGrid";
import { SectionFooter } from "../components/SectionFooter";
import { SectionKey } from "../types/data-contracts";
import { getQaqcColumns } from "../column-defs";
import { useDrillHoleDataStore } from "../store";
import { useSectionActions } from "../hooks";

export const QAQCView: React.FC = () => {
	const section = useDrillHoleDataStore(state => state.sections[SectionKey.QAQC]);

	console.log("[QAQCView] Rendering QAQC view", {
		rowCount: section?.data?.length || 0,
		isDirty: section?.isDirty,
	});

	const { onSave, onSubmit } = useSectionActions(SectionKey.QAQC);

	const rowData = section?.data || [];
	const columnDefs = getQaqcColumns();

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-hidden bg-white">
				{rowData.length > 0 ? (
					<DataGrid
						columnDefs={columnDefs}
						rowData={rowData}
						sortColumn="GeneratedDate"
						onRowClick={(row: any) => {
							console.log("[QAQCView] Row clicked", { row });
						}}
					/>
				) : (
					<div className="flex items-center justify-center h-full">
						<div className="text-center text-gray-400 py-12">
							<div className="text-5xl mb-4">📋</div>
							<div className="text-lg font-semibold mb-2">No QAQC Reports</div>
							<div className="text-sm">
								QAQC reports will appear here once generated.
							</div>
						</div>
					</div>
				)}
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
