import type * as XLSX from "xlsx";
import React from "react";
import { useVisualMapperStore } from "../store/visual-mapper-store";
import { SheetSelector } from "./SheetSelector";
import { XlsxGrid } from "./XlsxGrid";

interface XlsxViewerProps {
	workbook: XLSX.WorkBook
}

export const XlsxViewer: React.FC<XlsxViewerProps> = ({ workbook }) => {
	const { xlsxSheets, currentSheet, setCurrentSheet } = useVisualMapperStore();

	const currentWorksheet = currentSheet ? workbook.Sheets[currentSheet] : null;

	if (!currentSheet || !currentWorksheet) {
		return <div style={{ padding: "20px", textAlign: "center" }}>No sheet selected</div>;
	}

	return (
		<div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
			<SheetSelector
				sheets={xlsxSheets}
				currentSheet={currentSheet}
				onSheetChange={setCurrentSheet}
			/>
			<div style={{ flex: 1, overflow: "hidden" }}>
				<XlsxGrid worksheet={currentWorksheet} sheetName={currentSheet} />
			</div>
		</div>
	);
};
