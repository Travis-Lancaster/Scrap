import { Button, Space } from "#node_modules/antd/es";
import type { ColDef, ColGroupDef } from "ag-grid-enterprise";
import { DeleteOutlined, EditOutlined } from "#node_modules/@ant-design/icons/lib";

import type { CustomCellRendererProps } from "ag-grid-react";
// import { LookupResolver } from "#src/services/lookupResolver";
// import { OpenDrawerComponent } from "#src/pages/_shared/components/Cell/OpenDrawer/OpenDrawerComponent.js";
// import { OpenDrawerComponent } from "#src/pages/_shared/components/Cell/OpenDrawer/OpenDrawerComponent.ts"
import React from "react";
import { useLookup } from "#src/data-layer/hooks/useLookups.js";

/**
 * Delete action cell renderer component
 */
const DeleteActionRenderer = (props: CustomCellRendererProps) => {
	return (
		<span
			className="text-red-500 cursor-pointer hover:text-red-700"
			style={{ cursor: "pointer" }}
			onClick={() => {
				console.log("Delete clicked for row:", props.data);
				// TODO: Implement delete logic
			}}
		>
			🗑️
		</span>
	);
};

/**
 * Chevron action cell renderer component
 */
const ChevronActionRenderer = (props: CustomCellRendererProps) => {
	return (
		<i
			className="fa-solid fa-chevron-right text-slate-300 hover:text-blue-500"
			style={{ cursor: "pointer" }}
		/>
	);
};

/**
 * Get column definitions for GeologyCombinedLog grid with lookup integration
 * Uses LookupResolver to fetch lookup options dynamically
 */
export async function getCombinedLogColumnDefs(
	isEditable: boolean = false,
): Promise<(ColDef | ColGroupDef)[]> {
	// Initialize lookup resolver

	// Get lookup options from LookupResolver
	const lookupOptions = {
		altInt: useLookup("AltInt"),
		lithology: useLookup("Lithology"),
		lithTexture: useLookup("LithTexture"),
		lithGrainsize: useLookup("LithGrainsize"),
		structType: useLookup("StructType"),
		contactRelation: useLookup("ContactRelation"),
		clastDistribution: useLookup("ClastDistribution"),
		clastComp: useLookup("ClastComp"),
		matrixComp: useLookup("MatrixComp"),
		compgrp: useLookup("Compgrp"),
		veinStyle: useLookup("VeinStyle"),
		minCode: useLookup("MinCode"),
		minInt: useLookup("MinInt"),
		magInt: useLookup("MagInt"),
		minStyle: useLookup("MinStyle"),
		protolithCode: useLookup("ProtolithCode"),
		weathering: useLookup("Weathering"),
		colourCode: useLookup("ColourCode"),
	};

	return [
		// DELETE ACTION Column
		{
			headerName: "Delete",
			field: "delete",
			width: 60,
			pinned: "left",
			cellRenderer: DeleteActionRenderer,
			sortable: false,
			filter: false,
		},

		// DEPTH Group
		{
			headerName: "DEPTH",
			children: [
				{
					field: "DepthFrom",
					headerName: "From",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellDataType: "number",
					filter: "agNumberColumnFilter",
					cellStyle: { backgroundColor: "#f0f8ff" },
					sortable: true,
					sort: "asc",
					sortIndex: 0,
				},
				{
					field: "DepthTo",
					headerName: "To",
					minWidth: 120,
					width: 120,
					editable: isEditable,
					cellDataType: "number",
					filter: "agNumberColumnFilter",
					cellStyle: { backgroundColor: "#f0f8ff" },
				},
				{
					headerName: "Length",
					minWidth: 90,
					width: 90,
					editable: false,
					cellDataType: "number",
					cellStyle: { backgroundColor: "#f0f8ff" },
					filter: "agNumberColumnFilter",
					valueGetter: (params) => {
						const from = params.data?.DepthFrom;
						const to = params.data?.DepthTo;
						if (typeof from === "number" && typeof to === "number") {
							return to - from;
						}
						return 0;
					},
					valueFormatter: (params) => {
						const value = params.value;
						return value != null ? `${value.toFixed(2)}` : "";
					},
				},
			],
		},

		// LITHOLOGY Group
		{
			headerName: "LITHOLOGY",
			marryChildren: true,
			headerStyle: { backgroundColor: "#fff8dc" },
			children: [
				{
					field: "Lithology",
					headerName: "Litho",
					minWidth: 150,
					width: 150,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#fff8dc" },
					cellEditorParams: {
						values: lookupOptions.lithology.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.lithology.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.lithology.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.lithology.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					field: "Protolith",
					headerName: "Protolith",
					minWidth: 150,
					width: 150,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#fff8dc" },
					cellEditorParams: {
						values: lookupOptions.protolithCode.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.protolithCode.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.protolithCode.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.protolithCode.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					field: "Weathering",
					headerName: "Weathering",
					minWidth: 150,
					width: 150,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#fff8dc" },
					cellEditorParams: {
						values: lookupOptions.weathering.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.weathering.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.weathering.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.weathering.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					field: "Colour",
					headerName: "Colour",
					minWidth: 150,
					width: 150,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#fff8dc" },
					cellEditorParams: {
						values: lookupOptions.colourCode.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.colourCode.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.colourCode.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.colourCode.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "Structure",
					field: "Structure",
					width: 130,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#fff8dc" },
					cellEditorParams: {
						values: lookupOptions.structType.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.structType.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.structType.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.structType.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "Texture",
					field: "Texture",
					width: 120,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#fff8dc" },
					cellEditorParams: {
						values: lookupOptions.lithTexture.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.lithTexture.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.lithTexture.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.lithTexture.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
			],
		},

		// BRECCIA Group
		{
			headerName: "BRECCIA",
			marryChildren: true,
			headerStyle: { backgroundColor: "#ffe4e1" },
			children: [
				{
					headerName: "Contact Relation",
					field: "ContactRelation",
					width: 150,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#ffe4e1" },
					cellEditorParams: {
						values: lookupOptions.contactRelation.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.contactRelation.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.contactRelation.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.contactRelation.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "Clast Distrib",
					field: "ClastDistribution",
					width: 140,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#ffe4e1" },
					cellEditorParams: {
						values: lookupOptions.clastDistribution.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.clastDistribution.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.clastDistribution.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.clastDistribution.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "Clast Comp",
					field: "ClastComp",
					width: 130,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#ffe4e1" },
					cellEditorParams: {
						values: lookupOptions.clastComp.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.clastComp.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.clastComp.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.clastComp.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "Matrix Comp",
					field: "MatrixComp",
					width: 130,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#ffe4e1" },
					cellEditorParams: {
						values: lookupOptions.matrixComp.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.matrixComp.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.matrixComp.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.matrixComp.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
			],
		},

		// ALTERATION Group
		{
			headerName: "ALTERATION",
			marryChildren: true,
			headerStyle: { backgroundColor: "#e0ffe0" },
			children: [
				{
					headerName: "MAG",
					field: "Mag",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#e0ffe0" },
					cellEditorParams: {
						values: lookupOptions.magInt.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.magInt.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.magInt.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.magInt.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "CD",
					field: "CD",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#e0ffe0" },
					cellEditorParams: {
						values: lookupOptions.altInt.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.altInt.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.altInt.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.altInt.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "CF",
					field: "CF",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#e0ffe0" },
					cellEditorParams: {
						values: lookupOptions.altInt.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.altInt.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.altInt.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.altInt.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "AC",
					field: "AC",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#e0ffe0" },
					cellEditorParams: {
						values: lookupOptions.altInt.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.altInt.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.altInt.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.altInt.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "CA",
					field: "CA",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#e0ffe0" },
					cellEditorParams: {
						values: lookupOptions.altInt.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.altInt.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.altInt.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.altInt.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "SI",
					field: "SI",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#e0ffe0" },
					cellEditorParams: {
						values: lookupOptions.altInt.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.altInt.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.altInt.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.altInt.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "TUR",
					field: "TUR",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#e0ffe0" },
					cellEditorParams: {
						values: lookupOptions.altInt.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.altInt.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.altInt.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.altInt.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "GR",
					field: "GR",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#e0ffe0" },
					cellEditorParams: {
						values: lookupOptions.altInt.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.altInt.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.altInt.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.altInt.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
			],
		},

		// MINERALIZATION Group
		{
			headerName: "MINERALIZATION",
			marryChildren: true,
			headerStyle: { backgroundColor: "#fffacd" },
			children: [
				{
					headerName: "Py",
					field: "Py",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellDataType: "text",
					cellStyle: { backgroundColor: "#fffacd" },
				},
				{
					headerName: "Py Mode1",
					field: "PyMode1",
					width: 110,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#fffacd" },
					cellEditorParams: {
						values: lookupOptions.minStyle.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.minStyle.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.minStyle.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.minStyle.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "Mode",
					field: "PyMode",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#fffacd" },
					cellEditorParams: {
						values: lookupOptions.minStyle.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.minStyle.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.minStyle.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.minStyle.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "Cp",
					field: "Cp",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellDataType: "text",
					cellStyle: { backgroundColor: "#fffacd" },
				},
				{
					headerName: "Po",
					field: "Po",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellDataType: "text",
					cellStyle: { backgroundColor: "#fffacd" },
				},
				{
					headerName: "APY",
					field: "APY",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellDataType: "text",
					cellStyle: { backgroundColor: "#fffacd" },
				},
			],
		},

		// VEINS Group
		{
			headerName: "VEINS",
			marryChildren: true,
			headerStyle: { backgroundColor: "#e6e6fa" },
			children: [
				{
					headerName: "VG",
					field: "VG",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellDataType: "text",
					cellStyle: { backgroundColor: "#e6e6fa" },
				},
				{
					headerName: "QC",
					field: "QC",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellDataType: "number",
					filter: "agNumberColumnFilter",
					cellStyle: { backgroundColor: "#e6e6fa" },
				},
				{
					headerName: "PQC",
					field: "PQC",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellDataType: "number",
					filter: "agNumberColumnFilter",
					cellStyle: { backgroundColor: "#e6e6fa" },
				},
				{
					headerName: "QPC",
					field: "QPC",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellDataType: "number",
					filter: "agNumberColumnFilter",
					cellStyle: { backgroundColor: "#e6e6fa" },
				},
				{
					headerName: "BQP",
					field: "BQP",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellDataType: "number",
					filter: "agNumberColumnFilter",
					cellStyle: { backgroundColor: "#e6e6fa" },
				},
				{
					headerName: "QT",
					field: "QT",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellDataType: "number",
					filter: "agNumberColumnFilter",
					cellStyle: { backgroundColor: "#e6e6fa" },
				},
				{
					headerName: "Other",
					field: "Other",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellDataType: "text",
					cellStyle: { backgroundColor: "#e6e6fa" },
				},
				{
					headerName: "Oth PCT",
					field: "Other_pct",
					minWidth: 100,
					width: 100,
					editable: isEditable,
					cellDataType: "number",
					filter: "agNumberColumnFilter",
					cellStyle: { backgroundColor: "#e6e6fa" },
				},
			],
		},

		// TAG Group
		{
			headerName: "TAG",
			marryChildren: true,
			headerStyle: { backgroundColor: "#fafad2" },
			children: [
				{
					headerName: "Contact TAG",
					field: "ContactTag",
					width: 130,
					editable: isEditable,
					cellDataType: "text",
					cellStyle: { backgroundColor: "#fafad2" },
				},
				{
					headerName: "LITHOSUPERGR",
					field: "LithoSuperGr",
					width: 140,
					editable: isEditable,
					cellDataType: "text",
					cellStyle: { backgroundColor: "#fafad2" },
				},
				{
					headerName: "COMPGRP",
					field: "COMPGRP",
					minWidth: 90,
					width: 90,
					editable: isEditable,
					cellEditor: "agRichSelectCellEditor",
					cellStyle: { backgroundColor: "#fafad2" },
					cellEditorParams: {
						values: lookupOptions.compgrp.map((opt) => opt.value),
						formatValue: (value: string) => {
							const option = lookupOptions.compgrp.find(
								(opt) => opt.value === value,
							);
							return option ? option.label : value;
						},
					},
					filter: "agSetColumnFilter",
					filterParams: {
						excelMode: "windows",
						values: lookupOptions.compgrp.map((opt) => opt.value),
					},
					valueFormatter: (params) => {
						const option = lookupOptions.compgrp.find(
							(opt) => opt.value === params.value,
						);
						return option ? option.label : params.value || "";
					},
				},
				{
					headerName: "Comments",
					field: "Comments",
					width: 200,
					editable: isEditable,
					cellDataType: "text",
					cellStyle: { backgroundColor: "#fafad2" },
				},
			],
		},

		// CHEVRON ACTION Column (pinned right)
		{
			headerName: "",
			field: "chevron",
			width: 50,
			pinned: "right",
			cellRenderer: ChevronActionRenderer,
			sortable: false,
			filter: false,
		},
	];
}

/**
 * Legacy function for backward compatibility
 * Returns columns without lookups for simple views
 */
export function getGeologyCombinedLogColumns(view: string = "Everything"): ColDef[] {
	// Delete action column
	const deleteColumn: ColDef = {
		headerName: "",
		field: "delete",
		width: 60,
		pinned: "left",
		cellRenderer: DeleteActionRenderer,
		sortable: false,
		filter: false,
	};

	// Base columns that appear in all views
	const baseColumns: ColDef[] = [
		{
			headerName: "From (m)",
			field: "DepthFrom",
			width: 100,
			cellClass: "font-mono bg-slate-100",
			valueFormatter: (params) => params.value?.toFixed(2) || "",
		},
		{
			headerName: "To (m)",
			field: "DepthTo",
			width: 100,
			cellClass: "font-mono bg-slate-100 font-bold text-blue-600",
			valueFormatter: (params) => params.value?.toFixed(2) || "",
		},
	];

	// Lithology columns
	const lithoColumns: ColDef[] = [
		{
			headerName: "Lithology",
			field: "Lithology",
			width: 150,
		},
		{
			headerName: "Colour",
			field: "Colour",
			width: 120,
		},
		{
			headerName: "Weathering",
			field: "Weathering",
			width: 120,
		},
		{
			headerName: "Texture",
			field: "Texture",
			width: 120,
		},
		{
			headerName: "Structure",
			field: "Structure",
			width: 120,
		},
	];

	// Alteration columns
	const alterationColumns: ColDef[] = [
		{
			headerName: "MAG",
			field: "Mag",
			width: 80,
			cellClass: "text-center",
		},
		{
			headerName: "CD",
			field: "CD",
			width: 80,
			cellClass: "text-center",
		},
		{
			headerName: "CF",
			field: "CF",
			width: 80,
			cellClass: "text-center",
		},
		{
			headerName: "AC",
			field: "AC",
			width: 80,
			cellClass: "text-center",
		},
	];

	// Vein columns
	const veinColumns: ColDef[] = [
		{
			headerName: "VG",
			field: "VG",
			width: 80,
		},
		{
			headerName: "QC",
			field: "QC",
			width: 80,
			cellClass: "text-center",
		},
		{
			headerName: "QT",
			field: "QT",
			width: 80,
			cellClass: "text-center",
		},
	];

	// Comments column (appears in all views)
	const commentsColumn: ColDef = {
		headerName: "Comments",
		field: "Comments",
		width: 200,
		flex: 1,
	};

	// const actionColumn: ColDef = {
	// 	headerName: "",
	// 	field: "actions",
	// 	width: 50,
	// 	pinned: "right",
	// 	cellRenderer: ChevronActionRenderer,
	// };
	// {
	// 				headerName: "Actions",
	// 				width: 120,
	// 				cellRenderer: (params: any) => (
	// 					<Space>
	// 						<Button
	// 							size="small"
	// 							icon={<EditOutlined />}
	// 							onClick={() => handleEdit(params.data)}
	// 						/>
	// 						<Button
	// 							size="small"
	// 							danger
	// 							icon={<DeleteOutlined />}
	// 							onClick={() => handleDelete(params.data.id)}
	// 						/>
	// 					</Space>
	// 				),
	// 			},
	const actionColumn: ColDef =
	{
		colId: "actions",
		field: "actions",
		headerName: "",
		pinned: "right",
		// cellRenderer: OpenDrawerComponent,
		// cellRenderer: (params: any) => (
		// 	<Space>

		// 		<Button
		// 			size="small"
		// 			danger
		// 			icon={<DeleteOutlined />}
		// 		// onClick={() => handleDelete(params.data.id)}
		// 		/>
		// 	</Space>
		// ),
		minWidth: 50,
	};
	switch (view) {
		case "Litho":
			return [deleteColumn, ...baseColumns, ...lithoColumns, commentsColumn, actionColumn];
		case "Alteration":
			return [deleteColumn, ...baseColumns, ...alterationColumns, commentsColumn, actionColumn];
		case "Veins":
			return [deleteColumn, ...baseColumns, ...veinColumns, commentsColumn, actionColumn];
		case "Everything":
		default:
			return [
				deleteColumn,
				...baseColumns,
				...lithoColumns,
				...alterationColumns,
				...veinColumns,
				commentsColumn,
				actionColumn,
			];
	}
}

export const geologyCombinedLogColumns = getGeologyCombinedLogColumns();
