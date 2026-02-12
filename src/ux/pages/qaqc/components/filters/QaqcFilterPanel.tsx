/**
 * QaqcFilterPanel Component
 *
 * Left sidebar filter panel for global QAQC dashboard
 */

import type { QCType } from "#src/types/qaqc";
import { ClearOutlined, FilterOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";

import { Button, Card, Checkbox, DatePicker, Radio, Select, Space } from "antd";
import dayjs from "dayjs";
import { useQaqcLookups } from "../../hooks/useQaqcLookups";
import { useQaqcStore } from "../../store/qaqc-store";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface QaqcFilterPanelProps {
	onApply: () => void
	loading?: boolean
}

export function QaqcFilterPanel({ onApply, loading }: QaqcFilterPanelProps): JSX.Element {
	const filters = useQaqcStore(state => state.filters);
	const setFilters = useQaqcStore(state => state.setFilters);
	const resetFilters = useQaqcStore(state => state.resetFilters);

	const activeFilterSetId = useQaqcStore(state => state.activeFilterSetId);
	const filterSets = useQaqcStore(state => state.filterSets);
	const setActiveFilterSet = useQaqcStore(state => state.setActiveFilterSet);

	// Load dynamic lookups
	const { elements, standards, loading: lookupsLoading } = useQaqcLookups();

	// Date range handlers
	const handleDateChange = (dates: any) => {
		if (dates && dates[0] && dates[1]) {
			setFilters({
				dateFrom: dates[0].format("YYYY-MM-DD"),
				dateTo: dates[1].format("YYYY-MM-DD"),
			});
		}
	};

	const handleQuickDate = (days: number) => {
		const dateTo = new Date();
		const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

		setFilters({
			dateFrom: dateFrom.toISOString().split("T")[0],
			dateTo: dateTo.toISOString().split("T")[0],
		});
	};

	// Element handlers
	const handleElementChange = (elements: string[]) => {
		setFilters({ elements });
	};

	// Lab handlers
	const handleLabChange = (labCodes: string[]) => {
		setFilters({ labCodes });
	};

	// QC Type handlers
	const handleQCTypeChange = (qcTypes: QCType[]) => {
		setFilters({ qcTypes });
	};

	// Standard handlers
	const handleStandardChange = (standardIds: string[]) => {
		setFilters({ standardIds });
	};

	// Filter set handlers
	const handleFilterSetChange = (id: string) => {
		setActiveFilterSet(id);
		// TODO: Apply filter set to filters
	};

	const handleSaveFilterSet = () => {
		// TODO: Open save filter set modal
		console.log("Save filter set");
	};

	const handleNewFilterSet = () => {
		// TODO: Open new filter set modal
		console.log("New filter set");
	};

	const handleReset = () => {
		resetFilters();
	};

	return (
		<div className="qaqc-filter-panel">
			{/* Filter Set Selector */}
			<Card title="Filter Sets" size="small" style={{ marginBottom: 16 }}>
				<Select
					placeholder="Select filter set..."
					value={activeFilterSetId}
					onChange={handleFilterSetChange}
					style={{ width: "100%", marginBottom: 8 }}
					allowClear
				>
					{filterSets.map(set => (
						<Option key={set.id} value={set.id}>
							{set.name}
						</Option>
					))}
				</Select>
				<Space size="small">
					<Button
						size="small"
						icon={<SaveOutlined />}
						onClick={handleSaveFilterSet}
					>
						Save
					</Button>
					<Button
						size="small"
						icon={<PlusOutlined />}
						onClick={handleNewFilterSet}
					>
						New
					</Button>
				</Space>
			</Card>

			{/* Date Range */}
			<Card title="Date Range" size="small" style={{ marginBottom: 16 }}>
				<RangePicker
					value={[
						dayjs(filters.dateFrom),
						dayjs(filters.dateTo),
					]}
					onChange={handleDateChange}
					style={{ width: "100%", marginBottom: 8 }}
					format="YYYY-MM-DD"
				/>
				<Radio.Group
					value={null}
					onChange={e => handleQuickDate(e.target.value)}
					size="small"
					buttonStyle="solid"
					style={{ width: "100%" }}
				>
					<Radio.Button value={30} style={{ width: "33.33%" }}>30d</Radio.Button>
					<Radio.Button value={90} style={{ width: "33.33%" }}>90d</Radio.Button>
					<Radio.Button value={365} style={{ width: "33.33%" }}>1yr</Radio.Button>
				</Radio.Group>
			</Card>

			{/* Element Selection */}
			<Card title="Elements" size="small" style={{ marginBottom: 16 }}>
				<Checkbox.Group
					value={filters.elements}
					onChange={handleElementChange}
					style={{ display: "flex", flexDirection: "column", gap: 8 }}
				>
					{lookupsLoading
						? (
							<div style={{ padding: "8px", color: "#8c8c8c" }}>Loading elements...</div>
						)
						: (
							elements.map((el: { value: string, label: string }) => (
								<Checkbox key={el.value} value={el.value}>{el.label}</Checkbox>
							))
						)}
				</Checkbox.Group>
			</Card>

			{/* Laboratory Selection */}
			<Card title="Laboratories" size="small" style={{ marginBottom: 16 }}>
				<Checkbox.Group
					value={filters.labCodes}
					onChange={handleLabChange}
					style={{ display: "flex", flexDirection: "column", gap: 8 }}
				>
					<Checkbox value="ALS">ALS Minerals</Checkbox>
					<Checkbox value="SGS">SGS Laboratories</Checkbox>
					<Checkbox value="Bureau">Bureau Veritas</Checkbox>
				</Checkbox.Group>
			</Card>

			{/* QC Type Selection */}
			<Card title="QC Types" size="small" style={{ marginBottom: 16 }}>
				<Checkbox.Group
					value={filters.qcTypes}
					onChange={handleQCTypeChange}
					style={{ display: "flex", flexDirection: "column", gap: 8 }}
				>
					<Checkbox value="STD">Standards</Checkbox>
					<Checkbox value="BLK">Blanks</Checkbox>
					<Checkbox value="FDUP">Field Duplicates</Checkbox>
					<Checkbox value="PREPDUP">Prep Duplicates</Checkbox>
				</Checkbox.Group>
			</Card>

			{/* Standard Selection */}
			<Card title="Standards" size="small" style={{ marginBottom: 16 }}>
				<Select
					mode="multiple"
					placeholder="Select standards..."
					value={filters.standardIds}
					onChange={handleStandardChange}
					style={{ width: "100%" }}
					maxTagCount="responsive"
					loading={lookupsLoading}
				>
					{standards
						.filter((std: { value: string, label: string, type: string }) => std.type === "CRM" || std.type === "IRM")
						.map((std: { value: string, label: string, type: string }) => (
							<Option key={std.value} value={std.value}>{std.label}</Option>
						))}
				</Select>
			</Card>

			{/* Apply Button */}
			<Button
				type="primary"
				block
				icon={<FilterOutlined />}
				onClick={onApply}
				loading={loading}
			>
				Apply Filters
			</Button>

			<Button
				block
				icon={<ClearOutlined />}
				onClick={handleReset}
				style={{ marginTop: 8 }}
			>
				Reset to Defaults
			</Button>
		</div>
	);
}
