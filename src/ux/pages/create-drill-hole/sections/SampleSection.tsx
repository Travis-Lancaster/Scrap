/**
 * SampleSection Component
 *
 * Grid-based section for managing drill samples with QAQC integration.
 * Uses AG Grid for inline editing of depth-based sample records.
 *
 * OPTIMIZED VERSION using reusable patterns:
 * - useGridSection: Base grid data management
 * - usePinnedBottomRow: Pinned row pattern for new entries
 * - useRowDirtyState: Visual dirty indicators
 * - SAMPLE_COLUMNS: Reusable column bundles
 * - useSampleOperations: Business logic encapsulation
 * - useSampleRowOperations: Consolidated row operations with cell range support
 * - createContextMenu: Centralized context menu with cell range detection
 */

import { App, Button, Card, Space, Statistic } from "antd";
import {
	CheckCircleOutlined,
	DeleteOutlined,
	PlusOutlined,
	SettingOutlined,
	SyncOutlined,
	ThunderboltOutlined,
} from "@ant-design/icons";
import type { GetContextMenuItemsParams, MenuItemDef } from "ag-grid-enterprise";
import React, { useCallback, useMemo, useRef, useState } from "react";
// Utilities
import { SAMPLE_COLUMNS, isQaqcSample } from "../utils/sample-columns";
import {
	getCellSelectionBounds,
	getRowLabel,
	hasRowsMatching,
} from "../utils/cell-selection-helper";
import { useCombinedRowClassRules, useRowDirtyState } from "../hooks/useRowDirtyState";

import { AgGridReact } from "ag-grid-react";
import { AllEnterpriseModule } from "ag-grid-enterprise";
import { COMMON_COLUMNS } from "../utils/column-definitions";
import type { ColDef } from "ag-grid-enterprise";
import { LookupResolver } from "#src/services/lookupResolver";
import { ModuleRegistry } from "ag-grid-enterprise";
import { QaqcRuleDialog } from "../components/QaqcRuleDialog";
// Schema
import type { SampleData } from "../validation/sample-schemas";
import { SectionKey } from "#src/types/drillhole.js";
// import { SectionKey } from "#src/types/drillhole";
import { SectionMetadataPanel } from "../components/SectionMetadataPanel";
// Components
import { SectionWrapper } from "../components/SectionWrapper";
import { createEmptySampleData } from "../validation/sample-schemas";
import { createLookupColumn } from "../utils/column-factories";
import { getCommonGridProps } from "#src/config/ag-grid-config";
import { useCreateDrillHoleStore } from "../store/create-drillhole-store";
// Hooks
import { useGridSection } from "../hooks/useGridSection";
import { usePinnedBottomRow } from "../hooks/usePinnedBottomRow";
import { useSampleOperations } from "../hooks/useSampleOperations";
import { useSampleRowOperations } from "../hooks/useSampleRowOperations";
import { useSampleStore } from "../store/sample-store";
import { useSectionActions } from "../hooks/useSectionActions";

ModuleRegistry.registerModules([AllEnterpriseModule]);

export interface SampleSectionProps {
	currentDrillHoleId: string
}

export const SampleSection: React.FC<SampleSectionProps> = ({ currentDrillHoleId }) => {
	const gridRef = useRef<AgGridReact<SampleData>>(null);
	const [showQaqcDialog, setShowQaqcDialog] = useState(false);
	const { message } = App.useApp();

	// Get QAQC rule from sample store
	const { qcInsertionRule, fetchQCInsertionRule } = useSampleStore();

	// Get drill hole data for context
	const drillHoleId = useCreateDrillHoleStore(state => state.drillHoleId);
	const Organization = useCreateDrillHoleStore(state => state.Organization);
	const openImportModal = useCreateDrillHoleStore(state => state.openImportModal);
	const sections = useCreateDrillHoleStore(state => state.sections);
	const drillPlanData = sections.drillplan?.data;
	const collarData = sections.collar?.data;

	// Extract info from drill plan
	const holeNm = (drillPlanData as any)?.HoleNm || "";
	const project = (drillPlanData as any)?.Project || "";
	const totalDepth = collarData?.TotalDepth || 0;
	const holeCounter = holeNm ? holeNm.split("_")?.[1] ?? "" : "";
	const qcInsertionRuleId = (drillPlanData as any)?.QCInsertionRuleId;

	// Base grid data management
	const { gridData: baseGridData, section, gridProps, updateGridData, getDrillHoleContext }
		= useGridSection<SampleData>(SectionKey.Sample, {
			defaultSort: { field: "DepthFrom", direction: "asc" },
		});

	const isReadOnly = !section.isEditable();

	// Section actions (save, submit, reject, review, approve, exclude)
	const actions = useSectionActions(SectionKey.Sample);

	// Filter active samples
	const activeGridData = useMemo(
		() => baseGridData.filter(row => row.ActiveInd !== false),
		[baseGridData],
	);

	// Calculate the next DepthFrom for phantom row positioning
	// Since grid is sorted by DepthFrom asc, phantom needs value >= max DepthTo to appear at bottom
	const nextDepthFrom = useMemo(() => {
		if (activeGridData.length === 0)
			return 0;
		// Find the maximum DepthTo value (where the next interval should start)
		const maxDepthTo = Math.max(...activeGridData.map(row => row.DepthTo || 0));
		// If all DepthTo values are 0 (empty), use max DepthFrom + small increment
		if (maxDepthTo === 0) {
			const maxDepthFrom = Math.max(...activeGridData.map(row => row.DepthFrom || 0));
			return maxDepthFrom + 0.01; // Add small increment to sort after existing rows
		}
		return maxDepthTo;
	}, [activeGridData]);

	// Pinned bottom row pattern for new entries
	const { pinnedBottomRowData, onPinnedCellEditRequest, isPinnedRow } = usePinnedBottomRow(
		activeGridData,
		(newRow) => {
			// Add new row to grid data
			updateGridData(prev => [...prev, newRow]);
			// Mark as dirty for sync
			const { markRowDirty } = useCreateDrillHoleStore.getState();
			markRowDirty(SectionKey.Sample, newRow.SampleId);
		},
		{
			createEmptyRow: (depthFrom, ctx) => {
				// Override the depthFrom parameter with our calculated value
				const pinnedDepthFrom = nextDepthFrom;
				console.log("🎯 [Sample] Creating pinned row:", {
					pinnedDepthFrom,
					nextDepthFrom,
					activeGridDataCount: activeGridData.length,
					gridData: activeGridData.map(r => ({ depthFrom: r.DepthFrom, depthTo: r.DepthTo })),
				});
				return {
					...createEmptySampleData(pinnedDepthFrom),
					SampleId: "", // Empty for pinned row
					CollarId: ctx.drillHoleId || currentDrillHoleId,
					Organization: ctx.organization || "",
				} as SampleData;
			},
			getDrillHoleContext,
			idField: "SampleId",
			onRowAdded: (row) => {
				console.log("🏷️ [Sample] Added and marked new row as dirty:", row.SampleId);
			},
		},
	);

	// Combined handler that processes pinned row logic AND marks rows dirty
	const handleCellEditRequest = useCallback(
		async (event: any) => {
			// Check if editing pinned row
			if (event.rowPinned === "bottom") {
				onPinnedCellEditRequest(event);
				return;
			}

			// For existing real rows, mark them dirty for row-level sync
			const currentRow = event.data;

			// Process real rows with IDs
			if (currentRow && currentRow.SampleId && currentRow.SampleId !== "") {
				const { markRowDirty } = useCreateDrillHoleStore.getState();
				await markRowDirty(SectionKey.Sample, currentRow.SampleId);
				console.log("🏷️ [Sample] Marked existing row as dirty:", currentRow.SampleId);
			}
		},
		[onPinnedCellEditRequest],
	);

	// Dirty row tracking
	const { isDirtyRow } = useRowDirtyState<SampleData>(
		SectionKey.Sample,
		row => row.SampleId || "",
	);

	// Row class rules
	const rowClassRules = useCombinedRowClassRules<SampleData>({
		isDirtyRow,
		isDeletedRow: row => row.ActiveInd === false,
		customRules: {
			"qaqc-row": params => isQaqcSample(params.data),
		},
	});

	// Sample operations
	const { generateSamples, insertQaqc, renumberByDepth, removeQaqc, validateSamples, getStats }
		= useSampleOperations();

	// QAQC statistics
	const qaqcStats = useMemo(() => getStats(), [getStats, baseGridData]);

	// Load QAQC rule if needed
	React.useEffect(() => {
		if (qcInsertionRuleId && !qcInsertionRule) {
			fetchQCInsertionRule(qcInsertionRuleId);
		}
	}, [qcInsertionRuleId, qcInsertionRule, fetchQCInsertionRule]);

	// Lookup options
	const lookupOptions = useMemo(
		() => ({
			person: LookupResolver.getLookupOptions("Person", "PersonId", "FullName"),
			sampleType: LookupResolver.getLookupOptions("SampleType", "Code", "Description"),
			sampleMethod: LookupResolver.getLookupOptions("SampleMethod", "Code", "Description"),
			standard: LookupResolver.getFilteredLookupOptions(
				"QCReference",
				"StandardId",
				"StandardId",
				"StandardType",
				"CRM",
			),
			standardBlank: LookupResolver.getFilteredLookupOptions(
				"QCReference",
				"StandardId",
				"StandardId",
				"StandardType",
				"BLANK_CLIENT",
			),
			subjRec: LookupResolver.getLookupOptions("SubjRec", "Code", "Description"),
			contamination: LookupResolver.getLookupOptions("Contamination", "Code", "Description"),
		}),
		[],
	);

	// Column definitions using reusable bundles
	const columnDefs = useMemo<ColDef<SampleData>[]>(
		() => [
			// Sample identification (SampleNm, RodNo)
			...SAMPLE_COLUMNS.identification(isReadOnly),

			// Depth interval (DepthFrom, DepthTo)
			...COMMON_COLUMNS.depthInterval(isReadOnly),

			// Interval length (calculated)
			SAMPLE_COLUMNS.intervalLength(),

			// Sample type
			createLookupColumn("SampleType", "Sample Type", lookupOptions.sampleType, isReadOnly, 110),

			// QAQC classification (read-only, auto-generated)
			SAMPLE_COLUMNS.classification(),

			// QAQC reference (StandardId or OriginalSampleNm)
			SAMPLE_COLUMNS.qaqcReference(
				lookupOptions.standard,
				lookupOptions.standardBlank,
				isReadOnly,
			),

			// Personnel
			COMMON_COLUMNS.person("SampledBy", "Sampled By", lookupOptions.person, isReadOnly),

			// Date
			COMMON_COLUMNS.date("SampledDt", "Sampled Date", isReadOnly),

			// Sample method
			createLookupColumn(
				"SampleMethod",
				"Split Tool",
				lookupOptions.sampleMethod,
				isReadOnly,
				140,
			),

			// Weights (all weight fields)
			...SAMPLE_COLUMNS.weights(isReadOnly),

			// Recovery
			...SAMPLE_COLUMNS.recovery(lookupOptions.subjRec, isReadOnly),

			// Contamination
			createLookupColumn(
				"Contamination",
				"Contamination",
				lookupOptions.contamination,
				isReadOnly,
				140,
			),

			// Comments
			COMMON_COLUMNS.comments(isReadOnly),
		],
		[isReadOnly, lookupOptions],
	);

	// Consolidated row operations using new hook
	const {
		insertRowAt,
		deleteRows,
		unDeleteRows,
		addQaqcSample,
		resample,
		selectRowsInRange,
		getRowsInRange,
	} = useSampleRowOperations({
		gridRef,
		gridData: activeGridData,
		updateGridData,
		getDrillHoleContext,
		qcInsertionRule: qcInsertionRule ?? undefined,
		holeCounter,
		currentDrillHoleId,
		holeNm,
		project,
	});

	// Handler: Add new row at end
	const handleAddRow = useCallback(() => {
		const lastIndex = activeGridData.length;
		insertRowAt(lastIndex);
	}, [activeGridData.length, insertRowAt]);

	// Handler: Delete selected rows (fallback for button)
	const handleDeleteSelectedRows = useCallback(async () => {
		const api = gridRef.current?.api;
		if (!api)
			return;

		const selectedRows = api.getSelectedRows();
		if (selectedRows.length === 0)
			return;

		// Find indices of selected rows
		const indices: number[] = [];
		selectedRows.forEach((row) => {
			const index = activeGridData.findIndex(r => r.SampleId === row.SampleId);
			if (index !== -1)
				indices.push(index);
		});

		if (indices.length === 0)
			return;

		// Delete using index range
		const minIndex = Math.min(...indices);
		const maxIndex = Math.max(...indices);
		await deleteRows(minIndex, maxIndex);

		api.deselectAll();
	}, [activeGridData, deleteRows]);

	// Handler: Resample selected rows (fallback for button)
	const handleResampleSelected = useCallback(async () => {
		const api = gridRef.current?.api;
		if (!api)
			return;

		const selectedRows = api.getSelectedRows();
		if (selectedRows.length === 0) {
			message.warning("Please select rows to resample");
			return;
		}

		// Find indices of selected rows
		const indices: number[] = [];
		selectedRows.forEach((row) => {
			const index = activeGridData.findIndex(r => r.SampleId === row.SampleId);
			if (index !== -1)
				indices.push(index);
		});

		if (indices.length === 0)
			return;

		// Resample using index range
		const minIndex = Math.min(...indices);
		const maxIndex = Math.max(...indices);
		await resample(minIndex, maxIndex);
	}, [activeGridData, resample, message]);

	// Wrapper for QAQC insertion with dialog check
	const handleAddQaqcSampleWithCheck = useCallback(
		async (qaqcType: "BLK" | "STD" | "PREPDUP" | "FDUP", rowIndex: number, standardId?: string) => {
			if (!qcInsertionRule) {
				setShowQaqcDialog(true);
				return;
			}
			await addQaqcSample(qaqcType, rowIndex, standardId);
		},
		[qcInsertionRule, addQaqcSample],
	);

	// Wrapper for resample with dialog check
	const handleResampleWithCheck = useCallback(
		async (startIndex: number, endIndex: number) => {
			if (!qcInsertionRule) {
				setShowQaqcDialog(true);
				return;
			}
			await resample(startIndex, endIndex);
		},
		[qcInsertionRule, resample],
	);

	const handleGenerateSamples = useCallback(() => {
		if (!qcInsertionRule) {
			setShowQaqcDialog(true);
			return;
		}

		generateSamples({
			totalDepth,
			intervalSize: qcInsertionRule.SampleIntervalSize || 1.0,
			qaqcRule: qcInsertionRule,
			holeNm,
			project,
			holeCounter,
		});
	}, [generateSamples, qcInsertionRule, totalDepth, holeNm, project, holeCounter]);

	const handleInsertQaqc = useCallback(() => {
		if (!qcInsertionRule) {
			setShowQaqcDialog(true);
			return;
		}

		insertQaqc(qcInsertionRule, holeNm, project);
	}, [insertQaqc, qcInsertionRule, holeNm, project]);

	const handleRenumber = useCallback(() => {
		if (!qcInsertionRule) {
			setShowQaqcDialog(true);
			return;
		}

		renumberByDepth(qcInsertionRule, holeCounter);
	}, [renumberByDepth, qcInsertionRule, holeCounter]);

	// Enhanced context menu with cell range support
	const getContextMenuItems = useCallback(
		(params: GetContextMenuItemsParams<SampleData>) => {
			// Get selection bounds (cell range or clicked row)
			const { startIndex, endIndex, rowCount } = getCellSelectionBounds(params, gridRef);

			const menuItems: (MenuItemDef | string)[] = [];
			const rowLabel = getRowLabel(rowCount);

			// Get rows in selection
			const rowsInRange = getRowsInRange(startIndex, endIndex);
			const hasInactive = hasRowsMatching(gridRef, startIndex, endIndex, r => r.ActiveInd === false);
			const singleRow = startIndex === endIndex ? rowsInRange[0] : null;

			// QAQC Sample Insertion (only for single row)
			if (!isReadOnly && qcInsertionRule && singleRow) {
				menuItems.push(
					{
						name: "Insert BLK Below",
						action: () => handleAddQaqcSampleWithCheck("BLK", startIndex),
						icon: "<span class=\"ag-icon ag-icon-checkbox-unchecked\"></span>",
					},
					{
						name: "Insert STD Below",
						icon: "<span class=\"ag-icon ag-icon-tick\"></span>",
						subMenu: lookupOptions.standard?.map(std => ({
							name: std.label,
							action: () => handleAddQaqcSampleWithCheck("STD", startIndex, std.value),
						})) || [],
					},
					{
						name: `Insert DUP ${singleRow.SampleNm || ""}`,
						action: () => handleAddQaqcSampleWithCheck("PREPDUP", startIndex),
						icon: "<span class=\"ag-icon ag-icon-copy\"></span>",
					},
					{
						name: `Insert FDUP ${singleRow.SampleNm || ""}`,
						action: () => handleAddQaqcSampleWithCheck("FDUP", startIndex),
						icon: "<span class=\"ag-icon ag-icon-copy\"></span>",
					},
					"separator",
				);
			}

			// Resample option
			if (!isReadOnly && qcInsertionRule && rowsInRange.length > 0) {
				menuItems.push({
					name: singleRow ? `Resample ${singleRow.SampleNm || rowLabel}` : `Resample ${rowLabel}`,
					action: () => handleResampleWithCheck(startIndex, endIndex),
					icon: "<span class=\"ag-icon ag-icon-group\"></span>",
				});
				menuItems.push("separator");
			}

			// Insert row options
			if (!isReadOnly) {
				menuItems.push(
					{
						name: "Insert Row Above",
						action: () => insertRowAt(startIndex),
						icon: "<span class=\"ag-icon ag-icon-plus\"></span>",
					},
					{
						name: "Insert Row Below",
						action: () => insertRowAt(endIndex + 1),
						icon: "<span class=\"ag-icon ag-icon-plus\"></span>",
					},
					"separator",
				);
			}

			// Selection helper
			menuItems.push({
				name: `Select ${rowLabel}`,
				icon: "<span class=\"ag-icon ag-icon-select\"></span>",
				action: () => selectRowsInRange(startIndex, endIndex),
			});

			// Delete option
			if (!isReadOnly) {
				menuItems.push({
					name: `Delete ${rowLabel}`,
					action: () => deleteRows(startIndex, endIndex),
					icon: "<span class=\"ag-icon ag-icon-minus\"></span>",
				});
			}

			// UnDelete if needed
			if (!isReadOnly && hasInactive) {
				menuItems.push({
					name: `UnDelete ${rowLabel}`,
					action: () => unDeleteRows(startIndex, endIndex),
					icon: "<span class=\"ag-icon ag-icon-undo\"></span>",
				});
			}

			// Add separator before default items
			if (menuItems.length > 0) {
				menuItems.push("separator");
			}

			// Include default menu items (copy, paste, export, etc.)
			if (params.defaultItems) {
				menuItems.push(...params.defaultItems);
			}

			return menuItems as MenuItemDef[];
		},
		[
			isReadOnly,
			qcInsertionRule,
			lookupOptions.standard,
			handleAddQaqcSampleWithCheck,
			handleResampleWithCheck,
			insertRowAt,
			deleteRows,
			unDeleteRows,
			selectRowsInRange,
		],
	);

	// Row selection
	const rowSelection = useMemo(
		() => ({
			mode: "multiRow" as const,
			checkboxes: true,
			headerCheckbox: true,
		}),
		[],
	);

	// Cell selection
	const cellSelection = useMemo(
		() => ({
			handle: {
				mode: "fill" as const,
			},
		}),
		[],
	);

	return (
		<>
			<SectionWrapper
				section={section}
				title="Samples"
				{...actions}
				onImport={openImportModal}
				extra={
					!isReadOnly && (
						<Space>
							<Button
								icon={<ThunderboltOutlined />}
								onClick={handleGenerateSamples}
								size="small"
								title="Generate samples from 0 to total depth"
							>
								Generate
							</Button>
							<Button
								icon={<CheckCircleOutlined />}
								onClick={handleInsertQaqc}
								size="small"
								title="Insert QAQC samples"
							>
								Insert QAQC
							</Button>
							<Button
								icon={<SyncOutlined />}
								onClick={handleRenumber}
								size="small"
								title="Renumber samples by depth order"
							>
								Renumber
							</Button>
							<Button
								icon={<SyncOutlined />}
								onClick={handleResampleSelected}
								size="small"
								title="Create resamples from selected rows"
							>
								Resample
							</Button>
							<Button
								icon={<SettingOutlined />}
								onClick={() => setShowQaqcDialog(true)}
								size="small"
								title="Configure QAQC rules"
							>
								QAQC Rules
							</Button>
							<Button type="primary" icon={<PlusOutlined />} onClick={handleAddRow} size="small">
								Add Sample
							</Button>
							<Button danger icon={<DeleteOutlined />} onClick={handleDeleteSelectedRows} size="small">
								Delete Selected
							</Button>
						</Space>
					)
				}
			>
				{/* QAQC Statistics */}
				{qaqcStats.qaqcSamples > 0 && (
					<Card size="small" style={{ marginBottom: "16px" }}>
						<Space size="large">
							<Statistic
								title="Total Samples"
								value={qaqcStats.totalSamples}
								valueStyle={{ fontSize: "16px" }}
							/>
							<Statistic
								title="Regular"
								value={qaqcStats.regularSamples}
								valueStyle={{ fontSize: "16px" }}
							/>
							<Statistic
								title="QAQC"
								value={qaqcStats.qaqcSamples}
								valueStyle={{ fontSize: "16px", color: "#faad14" }}
							/>
							<Statistic
								title="Blanks"
								value={qaqcStats.blanks}
								valueStyle={{ fontSize: "16px" }}
							/>
							<Statistic
								title="Standards"
								value={qaqcStats.standards}
								valueStyle={{ fontSize: "16px" }}
							/>
							<Statistic
								title="Duplicates"
								value={qaqcStats.duplicates}
								valueStyle={{ fontSize: "16px" }}
							/>
							<Statistic
								title="QAQC %"
								value={qaqcStats.qaqcPercentage}
								precision={1}
								suffix="%"
								valueStyle={{ fontSize: "16px" }}
							/>
						</Space>
					</Card>
				)}

				{/* AG Grid */}
				<div style={{ width: "100%" }}>
					<AgGridReact<SampleData>
						ref={gridRef}
						rowData={activeGridData}
						pinnedBottomRowData={pinnedBottomRowData}
						columnDefs={columnDefs}
						{...getCommonGridProps()}
						{...gridProps}
						domLayout="autoHeight"
						rowSelection={rowSelection}
						cellSelection={cellSelection}
						rowClassRules={rowClassRules}
						getRowStyle={(params: any) => {
							// Pinned row styling - make it stand out
							if (params.rowPinned === "bottom") {
								return {
									backgroundColor: "#e6f4ff", // Light blue background
									borderTop: "2px solid #1890ff", // Blue top border
									fontStyle: "italic",
									color: "#8c8c8c", // Lighter text color for placeholder feel
								};
							}
							return undefined;
						}}
						getContextMenuItems={getContextMenuItems}
						onCellEditRequest={handleCellEditRequest}
						suppressRowClickSelection={true}
						enableCellTextSelection={true}
						stopEditingWhenCellsLoseFocus={true}
						singleClickEdit={false}
						suppressHorizontalScroll={false}
						getRowId={params => params.data.SampleId || ""}
					/>
				</div>

				{!isReadOnly && (
					<div className="mt-2 text-sm text-gray-500">
						Double-click cells to edit. Select rows using checkboxes. Gray row at bottom is for
						quick entry - enter DepthTo to add. Yellow rows are QAQC samples.
					</div>
				)}

				{/* Metadata panel at bottom */}
				{section && <SectionMetadataPanel section={section} />}
			</SectionWrapper>

			{/* QAQC Rule Dialog */}
			<QaqcRuleDialog
				open={showQaqcDialog}
				onClose={() => setShowQaqcDialog(false)}
				onRuleSelected={(rule) => {
					// QAQC rule saved via useSampleStore, trigger re-fetch
					fetchQCInsertionRule(rule.QCInsertionRuleId || "");
					setShowQaqcDialog(false);
				}}
				organization={Organization || undefined}
				laboratory={project}
				laboratoryOptions={[]}
			/>
		</>
	);
};
