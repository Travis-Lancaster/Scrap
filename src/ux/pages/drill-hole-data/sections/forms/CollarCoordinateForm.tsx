/**
 * CollarCoordinate Form Component
 *
 * Form-based section for Collar Coordinate data entry.
 * Displays the most accurate coordinate (form, NOT grid).
 *
 * ARCHITECTURE:
 * - Uses useCollarCoordinateForm hook for business logic
 * - Direct AntD form components (Input, InputNumber, Select, DatePicker, AutoComplete)
 * - Lookup integration for Grid, Instrument, SurveyBy, SurveyCompany, SurveyMethod
 * - Two-tier validation display
 * - ReadOnly control based on RowStatus
 *
 * @module drill-hole-data/sections/forms
 */

import { Alert, AutoComplete, Badge, Card, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useLookup, useLookups } from "#src/data-layer/hooks/useLookups.js";

import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { useCollarCoordinateForm } from "../../hooks";

const { Text } = Typography;
const { TextArea } = Input;

/**
 * CollarCoordinate Form Component
 *
 * Single form displaying the most accurate collar coordinate.
 */
export const CollarCoordinateForm: React.FC = () => {
	// ============================================================================
	// Custom Hook Integration
	// ============================================================================

	const {
		control,
		errors,
		isDirty,
		isReadOnly,
		validation,
		data,
	} = useCollarCoordinateForm();

	console.log("[CollarCoordinateForm] 🎨 Rendering:", {
		isDirty,
		isReadOnly,
		canSave: validation.canSave,
		priority: data.Priority,
		validated: data.Validated,
	});

	// ============================================================================
	// Cached Lookups
	// ============================================================================

	const [lookupOptions, setLookupOptions] = useState({
		grid: [] as Array<{ value: string; label: string }>,
		surveyMethod: [] as Array<{ value: string; label: string }>,
		company: [] as Array<{ value: string; label: string }>,
		person: [] as Array<{ value: string; label: string }>,
		instrument: [] as Array<{ value: string; label: string }>,
	});

	// Load lookups asynchronously after useLookup is initialized
	useEffect(() => {
		const loadLookups = async () => {
			// Ensure useLookup is initialized before accessing lookups


			const options = {
				grid: useLookup("Grid"),
				surveyMethod: useLookup("SurveyMethod"),
				company: useLookups().getCompanies("SURVEY"),
				person: useLookup("Person"),
				instrument: useLookup("Instrument"),
			};

			setLookupOptions(options);

			console.log("[CollarCoordinateForm] 🔍 Lookup options loaded:", {
				grids: options.grid.length,
				surveyMethods: options.surveyMethod.length,
				companies: options.company.length,
			});
		};

		loadLookups();
	}, []);

	// ============================================================================
	// Render
	// ============================================================================

	return (
		<div className="collar-coordinate-form">
			{/* Validation Errors Display */}
			{validation.database.errors.length > 0 && (
				<Alert
					type="error"
					message="Validation Errors"
					description={
						<ul style={{ marginBottom: 0 }}>
							{validation.database.errors.map((error: any, idx: number) => (
								<li key={idx}>{error.message}</li>
							))}
						</ul>
					}
					closable
					style={{ marginBottom: 16 }}
				/>
			)}

			{/* Validation Warnings Display */}
			{validation.save.warnings.length > 0 && (
				<Alert
					type="warning"
					message="Data Quality Warnings"
					description={
						<ul style={{ marginBottom: 0 }}>
							{validation.save.warnings.map((warning: any, idx: number) => (
								<li key={idx}>{warning.message}</li>
							))}
						</ul>
					}
					closable
					style={{ marginBottom: 16 }}
				/>
			)}

			{/* ReadOnly Notice */}
			{isReadOnly && (
				<Alert
					type="info"
					message="Read-Only Mode"
					description="This coordinate cannot be edited because it is not in Draft status."
					style={{ marginBottom: 16 }}
				/>
			)}

			<Card
				title={
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<span>Collar Coordinate - Most Accurate</span>
						<Space>
							{data.Validated && (
								<Badge status="success" text="Validated" />
							)}
							{isDirty && (
								<Badge status="processing" text="Unsaved Changes" />
							)}
							<Text type="secondary">
								Priority: {data.Priority || "N/A"}
							</Text>
						</Space>
					</div>
				}
			>
				<Space direction="vertical" size="large" style={{ width: "100%" }}>
					{/* Coordinate Section */}
					<Row gutter={16}>
						<Col span={8}>
							<Controller
								name="East"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="Easting (m)"
										validateStatus={errors.East ? "error" : ""}
										help={errors.East?.message}
									>
										<InputNumber
											{...field}
											disabled={isReadOnly}
											placeholder="Enter easting coordinate"
											style={{ width: "100%" }}
										/>
									</Form.Item>
								)}
							/>
						</Col>
						<Col span={8}>
							<Controller
								name="North"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="Northing (m)"
										validateStatus={errors.North ? "error" : ""}
										help={errors.North?.message}
									>
										<InputNumber
											{...field}
											disabled={isReadOnly}
											placeholder="Enter northing coordinate"
											style={{ width: "100%" }}
										/>
									</Form.Item>
								)}
							/>
						</Col>
						<Col span={8}>
							<Controller
								name="RL"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="RL / Elevation (m)"
										validateStatus={errors.RL ? "error" : ""}
										help={errors.RL?.message}
									>
										<InputNumber
											{...field}
											disabled={isReadOnly}
											placeholder="Enter elevation"
											style={{ width: "100%" }}
										/>
									</Form.Item>
								)}
							/>
						</Col>
					</Row>

					{/* Grid & Survey Details */}
					<Row gutter={16}>
						<Col span={12}>
							<Controller
								name="Grid"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="Grid System *"
										validateStatus={errors.Grid ? "error" : ""}
										help={errors.Grid?.message}
										required
									>
										<AutoComplete
											{...field}
											disabled={isReadOnly}
											placeholder="Select grid system"
											options={lookupOptions.grid}
											filterOption={(inputValue, option) =>
												(option?.label ?? "").toLowerCase().includes(inputValue.toLowerCase())
											}
										/>
									</Form.Item>
								)}
							/>
						</Col>
						<Col span={12}>
							<Controller
								name="SurveyMethod"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="Survey Method *"
										validateStatus={errors.SurveyMethod ? "error" : ""}
										help={errors.SurveyMethod?.message}
										required
									>
										<AutoComplete
											{...field}
											disabled={isReadOnly}
											placeholder="Select survey method"
											options={lookupOptions.surveyMethod}
											filterOption={(inputValue, option) =>
												(option?.label ?? "").toLowerCase().includes(inputValue.toLowerCase())
											}
										/>
									</Form.Item>
								)}
							/>
						</Col>
					</Row>

					{/* Survey Company & Personnel */}
					<Row gutter={16}>
						<Col span={12}>
							<Controller
								name="SurveyCompany"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="Survey Company *"
										validateStatus={errors.SurveyCompany ? "error" : ""}
										help={errors.SurveyCompany?.message}
										required
									>
										<AutoComplete
											{...field}
											disabled={isReadOnly}
											placeholder="Select survey company"
											options={lookupOptions.company}
											filterOption={(inputValue, option) =>
												(option?.label ?? "").toLowerCase().includes(inputValue.toLowerCase())
											}
										/>
									</Form.Item>
								)}
							/>
						</Col>
						<Col span={12}>
							<Controller
								name="SurveyBy"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="Surveyed By"
										validateStatus={errors.SurveyBy ? "error" : ""}
										help={errors.SurveyBy?.message}
									>
										<AutoComplete
											{...field}
											disabled={isReadOnly}
											placeholder="Select surveyor"
											options={lookupOptions.person}
											filterOption={(inputValue, option) =>
												(option?.label ?? "").toLowerCase().includes(inputValue.toLowerCase())
											}
										/>
									</Form.Item>
								)}
							/>
						</Col>
					</Row>

					{/* Instrument & Survey Date */}
					<Row gutter={16}>
						<Col span={12}>
							<Controller
								name="Instrument"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="Instrument"
										validateStatus={errors.Instrument ? "error" : ""}
										help={errors.Instrument?.message}
									>
										<AutoComplete
											{...field}
											disabled={isReadOnly}
											placeholder="Select instrument"
											options={lookupOptions.instrument}
											filterOption={(inputValue, option) =>
												(option?.label ?? "").toLowerCase().includes(inputValue.toLowerCase())
											}
										/>
									</Form.Item>
								)}
							/>
						</Col>
						<Col span={12}>
							<Controller
								name="SurveyOnDt"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="Survey Date"
										validateStatus={errors.SurveyOnDt ? "error" : ""}
										help={errors.SurveyOnDt?.message}
									>
										<DatePicker
											{...field}
											value={field.value ? dayjs(field.value) : null}
											onChange={(date) => field.onChange(date?.toISOString())}
											disabled={isReadOnly}
											format="YYYY-MM-DD"
											style={{ width: "100%" }}
										/>
									</Form.Item>
								)}
							/>
						</Col>
					</Row>

					{/* RL Source & Data Source */}
					<Row gutter={16}>
						<Col span={12}>
							<Controller
								name="RLSource"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="RL Source"
										validateStatus={errors.RLSource ? "error" : ""}
										help={errors.RLSource?.message}
									>
										<Input
											{...field}
											value={field.value == null ? "" : field.value}
											disabled={isReadOnly}
											placeholder="e.g., GPS, Total Station"
										/>
									</Form.Item>
								)}
							/>
						</Col>
						<Col span={12}>
							<Controller
								name="DataSource"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="Data Source *"
										validateStatus={errors.DataSource ? "error" : ""}
										help={errors.DataSource?.message}
										required
									>
										<Input
											{...field}
											disabled={isReadOnly}
										/>
									</Form.Item>
								)}
							/>
						</Col>
					</Row>

					{/* Priority & Status */}
					<Row gutter={16}>
						<Col span={8}>
							<Controller
								name="Priority"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="Priority *"
										validateStatus={errors.Priority ? "error" : ""}
										help={errors.Priority?.message}
										required
									>
										<InputNumber
											{...field}
											disabled={isReadOnly}
											placeholder="1-100"
											style={{ width: "100%" }}
										/>
									</Form.Item>
								)}
							/>
						</Col>
						<Col span={8}>
							<Controller
								name="PriorityStatus"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="Priority Status"
										validateStatus={errors.PriorityStatus ? "error" : ""}
										help={errors.PriorityStatus?.message}
									>
										<Input
											{...field}
											disabled={isReadOnly}
											placeholder="e.g., PRIMARY, SECONDARY"
										/>
									</Form.Item>
								)}
							/>
						</Col>
						<Col span={8}>
							<Controller
								name="ValidatedStatus"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="Validation Status"
										validateStatus={errors.ValidatedStatus ? "error" : ""}
										help={errors.ValidatedStatus?.message}
									>
										<Select
											{...field}
											disabled={isReadOnly}
											options={[
												{ value: 0, label: "Not Validated" },
												{ value: 1, label: "Valid" },
												{ value: 2, label: "Invalid" },
											]}
										/>
									</Form.Item>
								)}
							/>
						</Col>
					</Row>

					{/* Comments */}
					<Row gutter={16}>
						<Col span={24}>
							<Controller
								name="Comments"
								control={control}
								render={({ field }) => (
									<Form.Item
										label="Comments"
										validateStatus={errors.Comments ? "error" : ""}
										help={errors.Comments?.message}
									>
										<TextArea
											{...field}
											value={field.value == null ? "" : field.value}
											disabled={isReadOnly}
											placeholder="Add any relevant notes about this coordinate"
											rows={3}
										/>
									</Form.Item>
								)}
							/>
						</Col>
					</Row>

					{/* Metadata Display (Read-Only) */}
					<Row gutter={16}>
						<Col span={24}>
							<Card size="small" type="inner" title="Metadata">
								<Row gutter={8}>
									<Col span={6}>
										<Text type="secondary">Created: </Text>
										<Text>{data.CreatedOnDt ? new Date(data.CreatedOnDt).toLocaleDateString() : "N/A"}</Text>
									</Col>
									<Col span={6}>
										<Text type="secondary">Created By: </Text>
										<Text>{data.CreatedBy || "N/A"}</Text>
									</Col>
									<Col span={6}>
										<Text type="secondary">Modified: </Text>
										<Text>{data.ModifiedOnDt ? new Date(data.ModifiedOnDt).toLocaleDateString() : "N/A"}</Text>
									</Col>
									<Col span={6}>
										<Text type="secondary">Modified By: </Text>
										<Text>{data.ModifiedBy || "N/A"}</Text>
									</Col>
								</Row>
							</Card>
						</Col>
					</Row>
				</Space>
			</Card>
		</div>
	);
};
