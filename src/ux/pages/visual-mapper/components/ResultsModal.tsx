import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, message, Modal, Table, Tabs, Typography } from "antd";
import React, { useState } from "react";

const { Text } = Typography;

interface ResultsModalProps {
	open: boolean
	results: any
	onClose: () => void
}

export const ResultsModal: React.FC<ResultsModalProps> = ({ open, results, onClose }) => {
	const [activeTab, setActiveTab] = useState("json");

	const handleCopy = () => {
		const jsonStr = JSON.stringify(results, null, 2);
		navigator.clipboard.writeText(jsonStr);
		message.success("Copied to clipboard");
	};

	const handleDownload = () => {
		const jsonStr = JSON.stringify(results, null, 2);
		const blob = new Blob([jsonStr], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "parsed_results.json";
		link.click();
		URL.revokeObjectURL(url);
		message.success("Downloaded");
	};

	const renderJsonView = () => {
		const jsonStr = JSON.stringify(results, null, 2);

		return (
			<div>
				<div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
					<Button icon={<CopyOutlined />} onClick={handleCopy} size="small">
						Copy
					</Button>
					<Button icon={<DownloadOutlined />} onClick={handleDownload} size="small">
						Download
					</Button>
				</div>
				<pre style={{
					background: "#f5f5f5",
					padding: "12px",
					borderRadius: "4px",
					maxHeight: "500px",
					overflow: "auto",
					fontSize: "12px",
				}}
				>
					{jsonStr}
				</pre>
			</div>
		);
	};

	const renderTableView = () => {
		if (!results)
			return null;

		// Find arrays in results
		const arrays = Object.entries(results).filter(([_, value]) => Array.isArray(value));

		if (arrays.length === 0) {
			return (
				<div style={{ padding: "20px", textAlign: "center" }}>
					<Text type="secondary">No array data to display in table format</Text>
					<div style={{ marginTop: 12 }}>
						<Text type="secondary" style={{ fontSize: "12px" }}>
							Simple fields:
							{" "}
							{Object.keys(results).length}
						</Text>
					</div>
				</div>
			);
		}

		return (
			<div>
				{/* Show simple fields first */}
				{Object.entries(results)
					.filter(([_, value]) => !Array.isArray(value))
					.map(([key, value]) => (
						<div key={key} style={{ marginBottom: 8 }}>
							<Text strong>
								{key}
								:
								{" "}
							</Text>
							<Text code>{String(value)}</Text>
						</div>
					))}

				{/* Show arrays as tables */}
				{arrays.map(([key, value]) => {
					const data = value as any[];
					if (data.length === 0)
						return null;

					// Extract columns from first item
					const columns = Object.keys(data[0]).map(colKey => ({
						title: colKey,
						dataIndex: colKey,
						key: colKey,
						ellipsis: true,
						render: (val: any) => String(val ?? ""),
					}));

					return (
						<div key={key} style={{ marginTop: 16 }}>
							<Text strong style={{ fontSize: "14px" }}>
								{key}
								{" "}
								(
								{data.length}
								{" "}
								rows)
							</Text>
							<Table
								dataSource={data.map((row, idx) => ({ ...row, key: idx }))}
								columns={columns}
								size="small"
								scroll={{ x: true, y: 400 }}
								pagination={{ pageSize: 50, showSizeChanger: true }}
								style={{ marginTop: 8 }}
							/>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<Modal
			title="Parsed Results"
			open={open}
			onCancel={onClose}
			width={900}
			footer={[
				<Button key="close" onClick={onClose}>
					Close
				</Button>,
			]}
		>
			<Tabs
				activeKey={activeTab}
				onChange={setActiveTab}
				items={[
					{
						key: "json",
						label: "JSON Output",
						children: renderJsonView(),
					},
					{
						key: "table",
						label: "Table View",
						children: renderTableView(),
					},
				]}
			/>
		</Modal>
	);
};
