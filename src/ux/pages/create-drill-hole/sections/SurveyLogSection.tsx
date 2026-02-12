/**
 * SurveySection Component
 *
 * Master-detail section for managing down-hole surveys.
 * - Survey form (header) at top - single active survey per collar
 * - SurveyLog grid (detail) at bottom - survey readings at depths
 *
 * OPTIMIZED VERSION using reusable patterns:
 * - useSurveyForm: Form logic with automatic replacement
 * - useSurveyLogOperations: Grid row operations
 * - usePinnedBottomRow: Pinned row pattern for new entries
 * - useRowDirtyState: Visual dirty indicators
 * - COMMON_COLUMNS: Reusable column bundles
 * - createContextMenu: Centralized context menu
 *
 * Pattern: Master-Detail (Survey header + SurveyLog array)
 * Business Rule: Only 1 Survey can be ActiveInd=true per Collar
 */

import { AllEnterpriseModule, ModuleRegistry } from "ag-grid-enterprise";
import { Button, Card, Col, Descriptions, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useCallback, useMemo, useRef } from "react";
import { useCombinedRowClassRules, useRowDirtyState } from "../hooks/useRowDirtyState";

import { AgGridReact } from "ag-grid-react";
import type { ArraySectionKey } from "#src/lib/db/dexie";
// Utilities
import { COMMON_COLUMNS } from "../utils/column-definitions";
import type { ColDef } from "ag-grid-enterprise";
import { SectionKey } from "#src/types/drillhole";
import { SectionMetadataPanel } from "../components/SectionMetadataPanel";
import { SectionWrapper } from "../components/SectionWrapper";
import { SheetFormField } from "#src/components/sheets/SheetFormField";
import type { SurveyLogData } from "../validation/survey-schemas";
import { createContextMenu } from "../utils/grid-context-menu";
// Schemas and types
import {
	createEmptySurveyLogData,
} from "../validation/survey-schemas";
import { getCommonGridProps } from "#src/config/ag-grid-config";
import { getSurveyLookups } from "../lookups/survey-lookups";
import { useCreateDrillHoleStore } from "../store/create-drillhole-store";
import { useGridSection } from "../hooks/useGridSection";
// Hooks
import { usePinnedBottomRow } from "../hooks/usePinnedBottomRow";
import { useSurveyForm } from "../hooks/useSurveyForm";
import { useSurveyLogOperations } from "../hooks/useSurveyLogOperations";

// Register AG Grid modules
ModuleRegistry.registerModules([AllEnterpriseModule]);

/**
 * SurveySection Component
 *
 * Displays Survey header form and SurveyLog grid in master-detail layout
 */
export const SurveySection: React.FC = () => {
	const gridRef = useRef<AgGridReact<SurveyLogData>>(null);

	// ============================================================================
	// Hook Integration - Survey Form (Header)
	// ============================================================================

	const {
		control,
		errors,
		isNewSurvey,
		canCreateNew,
		handleNewSurvey,
		onSave,
		onSubmit,
		onReject,
		onReview,
		onApprove,
		onExclude,
		getFieldProps,
	} = useSurveyForm();

	// ============================================================================
	// Hook Integration - SurveyLog Grid (Detail)
	// ============================================================================

	// Base grid data management with default sort by Depth
	const { gridData: baseGridData, section, gridProps, updateGridData, getDrillHoleContext }
		= useGridSection<SurveyLogData>(SectionKey.Survey, {
			defaultSort: { field: "Depth", direction: "asc" },
		});

	const isReadOnly = !section.isEditable();

	// SurveyLog row operations
	const { insertRowAt, deleteRows: deleteSurveyLogRows } = useSurveyLogOperations();

	// ============================================================================
	// Store Integration
	// ============================================================================

	const surveyHeader = useCreateDrillHoleStore((state) => {
		const data = state.sections.survey?.data;
		return (data as any)?.header || data;
	});

	const currentDrillHoleId = useCreateDrillHoleStore(state => state.drillHoleId);
	const openImportModal = useCreateDrillHoleStore(state => state.openImportModal);

	// ============================================================================
	// Grid Data Processing
	// ============================================================================

	// Filter out soft-deleted rows (ActiveInd = false)
	const activeGridData = useMemo(
		() => baseGridData.filter(row => row.ActiveInd !== false),
		[baseGridData],
	);

	// Calculate the next Depth for phantom row positioning
	const nextDepth = useMemo(() => {
		if (activeGridData.length === 0)
			return 0;
		// Find the maximum Depth value
		const maxDepth = Math.max(...activeGridData.map(row => row.Depth || 0));
		return maxDepth + 1; // Next depth is max + 1
	}, [activeGridData]);

	// ============================================================================
	// Auto-Add Phantom Row Pattern
	// ============================================================================

	const { pinnedBottomRowData, onPinnedCellEditRequest, isPinnedRow } = usePinnedBottomRow(
		activeGridData,
		(newRow) => {
			// Add new row to grid data
			updateGridData(prev => [...prev, newRow]);
			// Mark as dirty for sync - use 'surveylog' (ArraySectionKey) for row-level tracking
			const { markRowDirty } = useCreateDrillHoleStore.getState();
			markRowDirty("surveylog" as ArraySectionKey, newRow.SurveyLogId);
		},
		{
			createEmptyRow: (depth, ctx) => {
				// Override the depth parameter with our calculated value
				const pinnedDepth = nextDepth;
				console.log("🎯 [SurveyLog] Creating pinned row:", {
					pinnedDepth,
					nextDepth,
					activeGridDataCount: activeGridData.length,
				});
				return {
					...createEmptySurveyLogData(surveyHeader, pinnedDepth),
					SurveyLogId: "", // Empty for pinned row
					SurveyId: surveyHeader?.SurveyId || "",
					CollarId: ctx.drillHoleId || currentDrillHoleId || "",
					Organization: ctx.organization || "",
					Depth: pinnedDepth,
					ActiveInd: true,
				} as SurveyLogData;
			},
			getDrillHoleContext,
			idField: "SurveyLogId",
			onRowAdded: (row) => {
				console.log("🏷️ [SurveyLog] Added and marked new row as dirty:", row.SurveyLogId);
			},
		},
	);

	// ============================================================================
	// Dirty Row Tracking
	// ============================================================================

	const { isDirtyRow } = useRowDirtyState<SurveyLogData>(
		SectionKey.Survey,
		row => row.SurveyLogId || "",
	);

	// Combined row class rules (dirty, deleted)
	const rowClassRules = useCombinedRowClassRules<SurveyLogData>({
		isDirtyRow,
		isDeletedRow: (row: SurveyLogData) => row.ActiveInd === false,
	});

	// ============================================================================
	// Lookups
	// ============================================================================

	const lookupOptions = useMemo(() => getSurveyLookups(), []);

	// ============================================================================
	// Column Definitions
	// ============================================================================

	const columnDefs = useMemo<ColDef<SurveyLogData>[]>(
		() => [
			// Depth (single value, not interval)
			{
				headerName: "Depth (m)",
				field: "Depth",
				editable: !isReadOnly,
				width: 120,
				type: "numericColumn",
				valueFormatter: (params) => {
					const val = params.value;
					return val != null && typeof val === "number" ? val.toFixed(2) : "";
				},
				cellStyle: { textAlign: "right" },
				filter: "agNumberColumnFilter",
			},

			// Dip (-90 to 90 degrees)
			{
				headerName: "Dip (°)",
				field: "Dip",
				editable: !isReadOnly,
				width: 100,
				type: "numericColumn",
				valueFormatter: (params) => {
					const val = params.value;
					return val != null && typeof val === "number" ? val.toFixed(2) : "";
				},
				cellStyle: (params) => {
					const style: any = { textAlign: "right" };
					if (params.value != null && (params.value < -90 || params.value > 90)) {
						style.backgroundColor = "#ffcccc";
					}
					return style;
				},
				filter: "agNumberColumnFilter",
				tooltipValueGetter: params =>
					params.value != null && (params.value < -90 || params.value > 90)
						? "Dip must be between -90° and 90°"
						: null,
			},

			// Azimuth Magnetic
			{
				headerName: "Azimuth Mag (°)",
				field: "AzimuthMagnetic",
				editable: !isReadOnly,
				width: 140,
				type: "numericColumn",
				valueFormatter: params =>
					params.value != null ? params.value.toFixed(2) : "",
				cellStyle: { textAlign: "right" },
			},

			// Azimuth UTM Field
			{
				headerName: "Azimuth UTM Field (°)",
				field: "AzimuthUTMField",
				editable: !isReadOnly,
				width: 170,
				type: "numericColumn",
				valueFormatter: params =>
					params.value != null ? params.value.toFixed(2) : "",
				cellStyle: { textAlign: "right" },
			},

			// Azimuth UTM
			{
				headerName: "Azimuth UTM (°)",
				field: "AzimuthUTM",
				editable: !isReadOnly,
				width: 150,
				type: "numericColumn",
				valueFormatter: params =>
					params.value != null ? params.value.toFixed(2) : "",
				cellStyle: { textAlign: "right" },
			},

			// Magnetic Status
			{
				headerName: "Magnetic Status",
				field: "MagneticStatus",
				editable: !isReadOnly,
				width: 150,
				filter: "agTextColumnFilter",
			},

			// Magnetic Field Strength
			{
				headerName: "Mag Field Strength",
				field: "MagneticFieldStrength",
				editable: !isReadOnly,
				width: 160,
				type: "numericColumn",
				valueFormatter: params =>
					params.value != null ? params.value.toFixed(3) : "",
				cellStyle: { textAlign: "right" },
			},

			// Magnetic Inclination
			{
				headerName: "Mag Inclination (°)",
				field: "MagneticInclination",
				editable: !isReadOnly,
				width: 160,
				type: "numericColumn",
				valueFormatter: params =>
					params.value != null ? params.value.toFixed(2) : "",
				cellStyle: { textAlign: "right" },
			},

			// Azimuth Deviation
			{
				headerName: "Azimuth Dev (°)",
				field: "AzimuthDeviation",
				editable: !isReadOnly,
				width: 140,
				type: "numericColumn",
				valueFormatter: params =>
					params.value != null ? params.value.toFixed(2) : "",
				cellStyle: { textAlign: "right" },
			},

			// Dip Deviation
			{
				headerName: "Dip Dev (°)",
				field: "DipDeviation",
				editable: !isReadOnly,
				width: 120,
				type: "numericColumn",
				valueFormatter: params =>
					params.value != null ? params.value.toFixed(2) : "",
				cellStyle: { textAlign: "right" },
			},

			// Comments - reuse COMMON_COLUMNS
			COMMON_COLUMNS.comments(isReadOnly, 1000),
		],
		[isReadOnly],
	);

	// ============================================================================
	// Grid Handlers
	// ============================================================================

	// Handler: Insert row at index
	const handleInsertRowAt = useCallback(
		(index: number) => {
			insertRowAt(index);
			console.log(`➕ [SurveyLog] Inserted row at index ${index}`);
		},
		[insertRowAt],
	);

	// Handler: Delete selected rows (soft delete)
	const handleDeleteRows = useCallback(async () => {
		const api = gridRef.current?.api;
		if (!api)
			return;

		const selectedRows = api.getSelectedRows();
		if (selectedRows.length === 0)
			return;

		console.log("🗑️ [SurveyLog] Marking rows as inactive:", selectedRows.length);

		// Get indices of selected rows
		const selectedIndices: number[] = [];
		api.forEachNode((node, index) => {
			if (node.isSelected()) {
				selectedIndices.push(index);
			}
		});

		// Delete rows in range
		if (selectedIndices.length > 0) {
			const minIndex = Math.min(...selectedIndices);
			const maxIndex = Math.max(...selectedIndices);
			deleteSurveyLogRows(minIndex, maxIndex);
		}

		api.deselectAll();
	}, [deleteSurveyLogRows]);

	// Context menu using factory
	const contextMenu = useMemo(
		() =>
			createContextMenu<SurveyLogData>(
				{
					allowInsert: !isReadOnly,
					allowDelete: !isReadOnly,
				},
				{
					onInsertRow: handleInsertRowAt,
					onDeleteRows: handleDeleteRows,
				},
			),
		[isReadOnly, handleInsertRowAt, handleDeleteRows],
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
			// NOTE: Use 'surveylog' (ArraySectionKey) for row-level tracking
			if (currentRow && currentRow.SurveyLogId && currentRow.SurveyLogId !== "") {
				const { markRowDirty } = useCreateDrillHoleStore.getState();
				await markRowDirty("surveylog" as ArraySectionKey, currentRow.SurveyLogId);
				console.log("🏷️ [SurveyLog] Marked existing row as dirty:", currentRow.SurveyLogId);
			}
		},
		[onPinnedCellEditRequest],
	);

	// Get row style for pinned row
	const getRowStyle = useCallback((params: any) => {
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
	}, []);

	// Row selection configuration
	const rowSelection = useMemo(
		() => ({
			mode: "multiRow" as const,
			checkboxes: true,
			headerCheckbox: true,
			enableClickSelection: false,
		}),
		[],
	);

	// Cell selection configuration
	const cellSelection = useMemo(
		() => ({
			handle: {
				mode: "fill" as const,
			},
		}),
		[],
	);

	// ============================================================================
	// Render
	// ============================================================================

	return (
		<SectionWrapper
			section={section}
			title="Down-Hole Survey"
			onSave={onSave}
			onSubmit={onSubmit}
			onReject={onReject}
			onReview={onReview}
			onApprove={onApprove}
			onExclude={onExclude}
			onImport={openImportModal}
			extra={
				canCreateNew && !isReadOnly && (
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={handleNewSurvey}
						size="small"
					>
						New Survey
					</Button>
				)
			}
		>
			{/* Survey Form (Header) */}
			<Card
				title="Survey Information"
				size="small"
				style={{ marginBottom: 16 }}
				extra={
					isNewSurvey && (
						<span style={{ color: "#1890ff", fontSize: "12px" }}>
							● New Survey (not saved)
						</span>
					)
				}
			>
				<Col xs={24} md={24}>
					<Descriptions
						bordered
						size="small"
						column={2}
						labelStyle={{
							fontWeight: "bold",
							backgroundColor: "#f0f0f0",
							padding: "2px 8px",
							width: "160px",
						}}
						contentStyle={{ padding: "2px 8px" }}
					>
						{/* Survey Method (Required) */}
						<Descriptions.Item label="Survey Method" span={1}>
							<SheetFormField
								name="DownHoleSurveyMethod"
								control={control}
								type="autocomplete"
								placeholder="Select survey method"
								options={lookupOptions.surveyMethods}
								{...getFieldProps("DownHoleSurveyMethod")}
							/>
						</Descriptions.Item>

						{/* Surveyed Date */}
						<Descriptions.Item label="Surveyed Date" span={1}>
							<SheetFormField
								name="SurveyedOnDt"
								control={control}
								type="date"
								{...getFieldProps("SurveyedOnDt")}
							/>
						</Descriptions.Item>

						{/* Survey Company */}
						<Descriptions.Item label="Survey Company" span={1}>
							<SheetFormField
								name="SurveyCompany"
								control={control}
								type="autocomplete"
								placeholder="Select company"
								options={lookupOptions.surveyCompanies}
								{...getFieldProps("SurveyCompany")}
							/>
						</Descriptions.Item>

						{/* Survey Operator */}
						<Descriptions.Item label="Survey Operator" span={1}>
							<SheetFormField
								name="SurveyOperator"
								control={control}
								type="autocomplete"
								placeholder="Select operator"
								options={lookupOptions.surveyOperators}
								{...getFieldProps("SurveyOperator")}
							/>
						</Descriptions.Item>

						{/* Survey Instrument */}
						<Descriptions.Item label="Survey Instrument" span={1}>
							<SheetFormField
								name="SurveyInstrument"
								control={control}
								type="autocomplete"
								placeholder="Select instrument"
								options={lookupOptions.surveyInstruments}
								{...getFieldProps("SurveyInstrument")}
							/>
						</Descriptions.Item>

						{/* Survey Reliability */}
						<Descriptions.Item label="Survey Reliability" span={1}>
							<SheetFormField
								name="SurveyReliability"
								control={control}
								type="autocomplete"
								placeholder="Select reliability"
								options={lookupOptions.surveyReliabilities}
								{...getFieldProps("SurveyReliability")}
							/>
						</Descriptions.Item>

						{/* Grid */}
						<Descriptions.Item label="Grid" span={1}>
							<SheetFormField
								name="Grid"
								control={control}
								type="autocomplete"
								placeholder="Select grid"
								options={lookupOptions.grids}
								{...getFieldProps("Grid")}
							/>
						</Descriptions.Item>

						{/* Comments */}
						<Descriptions.Item label="Comments" span={2}>
							<SheetFormField
								name="Comments"
								control={control}
								type="area"
								placeholder="Enter comments"
								{...getFieldProps("Comments")}
							/>
						</Descriptions.Item>
					</Descriptions>
				</Col>
			</Card>

			{/* SurveyLog Grid (Detail) */}
			<Card
				title="Survey Readings"
				size="small"
				extra={
					!isReadOnly && (
						<Space>
							<Button
								danger
								icon={<DeleteOutlined />}
								onClick={handleDeleteRows}
								size="small"
							>
								Delete Selected
							</Button>
						</Space>
					)
				}
			>
				<div style={{ width: "100%" }}>
					<AgGridReact<SurveyLogData>
						ref={gridRef}
						rowData={activeGridData}
						pinnedBottomRowData={pinnedBottomRowData}
						columnDefs={columnDefs}
						{...getCommonGridProps()}
						{...gridProps}
						domLayout="autoHeight"
						onCellEditRequest={handleCellEditRequest}
						rowSelection={rowSelection}
						cellSelection={cellSelection}
						rowClassRules={rowClassRules}
						getRowStyle={getRowStyle}
						getContextMenuItems={contextMenu}
						enableCellTextSelection={true}
						stopEditingWhenCellsLoseFocus={true}
						singleClickEdit={false}
						getRowId={params => params.data.SurveyLogId || ""}
					/>
				</div>

				{!isReadOnly && (
					<div className="mt-2 text-sm text-gray-500">
						Double-click cells to edit. Select rows using checkboxes. Gray row at bottom is for
						quick entry - enter Depth to add.
					</div>
				)}
			</Card>

			{/* Metadata Panel */}
			{section && <SectionMetadataPanel section={section} />}
		</SectionWrapper>
	);
};
