/**
 * AllSamples Grid Component
 *
 * AG Grid component for sample logging with complex workflows.
 *
 * @module drill-hole-data/sections/grids
 */

// import type { AllSamples } from "#src/api/database/data-contracts";
import React, { useMemo } from "react";

import { AllSamples } from "../../types/data-contracts";
import { DataGrid } from "../../components/DataGrid";
import { allSamplesColumns } from "../../column-defs/allSamplesColumns";
import { useSampleOperations } from "../../hooks";

export const AllSamplesGrid: React.FC = () => {
	const {
		samples,
		isReadOnly,
		rowMetadata,
		handleCellValueChanged,
		handleEditSample,
		uiState,
		updateUIState,
	} = useSampleOperations("Sample");

	console.log("[AllSamplesGrid] 📊 Rendering grid", {
		sampleCount: samples.length,
		isReadOnly,
	});

	const getRowClass = useMemo(() => {
		return (row: AllSamples) => {
			const sampleId = row.SampleId;
			const metadata = rowMetadata[sampleId];

			if (metadata?.validationStatus === "Invalid") return "bg-red-50 border-l-4 border-red-500";
			if (metadata?.isDirty) return "bg-blue-50 border-l-4 border-blue-500";
			return "";
		};
	}, [rowMetadata]);

	return (
		<div className="h-full w-full">
			<DataGrid<AllSamples>
				columnDefs={allSamplesColumns}
				rowData={samples}
				onRowClick={handleEditSample}
				onCellValueChanged={handleCellValueChanged}
				sortColumn="DepthFrom"
				readOnly={isReadOnly}
				getRowClass={getRowClass}
				rowIdField="SampleId"
				uiState={uiState}
				onUIStateChange={updateUIState}
			/>
		</div>
	);
};
