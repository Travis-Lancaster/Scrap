import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { useVisualMapperStore } from "../store/visual-mapper-store";

interface XlsxGridProps {
	worksheet: XLSX.WorkSheet
	sheetName: string
}

const MAX_DISPLAY_ROWS = 100; // Performance optimization

export const XlsxGrid: React.FC<XlsxGridProps> = ({ worksheet, sheetName }) => {
	const { setSelection, selection, currentSheet } = useVisualMapperStore();
	const [localSelection, setLocalSelection] = useState<{
		start: { row: number, col: number }
		end: { row: number, col: number }
	} | null>(null);

	// Parse worksheet to 2D array
	const data = useMemo(() => {
		const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
		// Limit rows for performance
		return jsonData.slice(0, MAX_DISPLAY_ROWS);
	}, [worksheet]);

	// Get max column count
	const maxCols = useMemo(() => {
		return Math.max(...data.map(row => row?.length || 0));
	}, [data]);

	const handleCellMouseDown = (row: number, col: number) => {
		setLocalSelection({ start: { row, col }, end: { row, col } });
	};

	const handleCellMouseEnter = (row: number, col: number) => {
		if (localSelection && localSelection.start) {
			setLocalSelection({ ...localSelection, end: { row, col } });
		}
	};

	const handleMouseUp = () => {
		if (localSelection) {
			// Convert to Excel address
			const cellAddress = XLSX.utils.encode_cell({
				r: localSelection.start.row,
				c: localSelection.start.col,
			});

			setSelection({
				start: { row: localSelection.start.row, col: localSelection.start.col },
				end: { row: localSelection.end.row, col: localSelection.end.col },
				// @ts-ignore - extending SelectionRange with sheet info
				sheet: sheetName,
				cellAddress,
			});

			setLocalSelection(null);
		}
	};

	const isCellSelected = (row: number, col: number) => {
		const sel = localSelection || (selection && currentSheet === sheetName ? selection : null);
		if (!sel)
			return false;

		const minRow = Math.min(sel.start.row, sel.end.row);
		const maxRow = Math.max(sel.start.row, sel.end.row);
		const minCol = Math.min(sel.start.col, sel.end.col);
		const maxCol = Math.max(sel.start.col, sel.end.col);

		return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol;
	};

	const getCellValue = (row: number, col: number): string => {
		const value = data[row]?.[col];
		if (value === null || value === undefined)
			return "";
		return String(value);
	};

	return (
		<div
			style={{
				overflow: "auto",
				border: "1px solid #d9d9d9",
				maxHeight: "500px",
				backgroundColor: "#fff",
			}}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
		>
			<table className="xlsx-grid" style={{ borderCollapse: "collapse", fontSize: "13px" }}>
				<thead>
					<tr>
						<th style={{
							position: "sticky",
							top: 0,
							left: 0,
							background: "#fafafa",
							border: "1px solid #e8e8e8",
							padding: "4px 8px",
							zIndex: 3,
							minWidth: "40px",
						}}
						>
						</th>
						{Array.from({ length: maxCols }).map((_, colIdx) => (
							<th
								key={colIdx}
								style={{
									position: "sticky",
									top: 0,
									background: "#fafafa",
									border: "1px solid #e8e8e8",
									padding: "4px 8px",
									fontWeight: 600,
									textAlign: "center",
									minWidth: "60px",
									zIndex: 2,
								}}
							>
								{XLSX.utils.encode_col(colIdx)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, rowIdx) => (
						<tr key={rowIdx}>
							<td
								style={{
									position: "sticky",
									left: 0,
									background: "#fafafa",
									border: "1px solid #e8e8e8",
									padding: "4px 8px",
									fontWeight: 600,
									textAlign: "center",
									minWidth: "40px",
									zIndex: 1,
								}}
							>
								{rowIdx + 1}
							</td>
							{Array.from({ length: maxCols }).map((_, colIdx) => (
								<td
									key={colIdx}
									onMouseDown={() => handleCellMouseDown(rowIdx, colIdx)}
									onMouseEnter={() => handleCellMouseEnter(rowIdx, colIdx)}
									style={{
										border: "1px solid #e8e8e8",
										padding: "4px 8px",
										minWidth: "60px",
										cursor: "cell",
										backgroundColor: isCellSelected(rowIdx, colIdx)
											? "rgba(24, 144, 255, 0.3)"
											: "transparent",
										userSelect: "none",
									}}
								>
									{getCellValue(rowIdx, colIdx)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			{data.length >= MAX_DISPLAY_ROWS && (
				<div style={{ padding: "10px", textAlign: "center", color: "#999", fontSize: "12px" }}>
					Showing first
					{" "}
					{MAX_DISPLAY_ROWS}
					{" "}
					rows (sheet may contain more)
				</div>
			)}
		</div>
	);
};
