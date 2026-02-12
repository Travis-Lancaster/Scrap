/**
 * Standard Detail Component
 *
 * Right panel showing detailed information about a selected standard
 */

import type { QcReference, QcReferenceValue } from "#src/api/database/data-contracts";
import type { ColumnsType } from "antd/es/table";
import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Button, Descriptions, Divider, Space, Table, Tag, Typography } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface StandardDetailProps {
	standard: QcReference
	values: QcReferenceValue[]
	onEdit: (standard: QcReference, values: QcReferenceValue[]) => void
	loading?: boolean
}

export function StandardDetail({
	standard,
	values,
	onEdit,
	loading = false,
}: StandardDetailProps): JSX.Element {
	const columns: ColumnsType<QcReferenceValue> = [
		{
			title: "Element",
			dataIndex: "Element",
			key: "Element",
			width: 100,
			render: (element: string) => (
				<Tag color="blue">{element}</Tag>
			),
		},
		{
			title: "Method",
			dataIndex: "GenericMethod",
			key: "GenericMethod",
			width: 120,
		},
		{
			title: "Expected Value",
			dataIndex: "ExpectedValue",
			key: "ExpectedValue",
			width: 140,
			align: "right",
			render: (value: number, record: QcReferenceValue) => (
				<Text strong>
					{value.toFixed(4)}
					{" "}
					{record.Units}
				</Text>
			),
		},
		{
			title: "Std Dev (σ)",
			dataIndex: "ExpectedStDev",
			key: "ExpectedStDev",
			width: 120,
			align: "right",
			render: (value: number, record: QcReferenceValue) => (
				<Text>
					{value.toFixed(4)}
					{" "}
					{record.Units}
				</Text>
			),
		},
		{
			title: "Units",
			dataIndex: "Units",
			key: "Units",
			width: 80,
		},
		{
			title: "Status",
			dataIndex: "Preferred",
			key: "Preferred",
			width: 80,
			render: (preferred: number) => (
				<Tag color={preferred === 1 ? "green" : "default"}>
					{preferred === 1 ? "Active" : "Inactive"}
				</Tag>
			),
		},
	];

	const getStandardTypeName = (type: QcReference["StandardType"]): string => {
		switch (type) {
			case "CRM":
				return "Certified Reference Material";
			case "IRM":
				return "In-House Reference Material";
			case "BLK":
				return "Blank Material";
			case "DUP":
				return "Duplicate Standard";
			default:
				return type;
		}
	};

	return (
		<div>
			{/* Header */}
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
				<div>
					<Title level={3} style={{ margin: 0 }}>
						{standard.StandardId}
					</Title>
					<Text type="secondary">{getStandardTypeName(standard.StandardType)}</Text>
				</div>
				<Space>
					<Button
						icon={<CopyOutlined />}
						onClick={() => {
							// TODO: Implement duplicate functionality
							console.log("Duplicate standard:", standard.StandardId);
						}}
					>
						Duplicate
					</Button>
					<Button
						type="primary"
						icon={<EditOutlined />}
						onClick={() => onEdit(standard, values)}
					>
						Edit
					</Button>
					<Button
						danger
						icon={<DeleteOutlined />}
						onClick={() => {
							// TODO: Implement delete with confirmation
							console.log("Delete standard:", standard.StandardId);
						}}
					>
						Delete
					</Button>
				</Space>
			</div>

			{/* Standard Information */}
			<Descriptions
				title="Standard Information"
				bordered
				size="small"
				column={2}
				style={{ marginBottom: 24 }}
			>
				<Descriptions.Item label="Standard Code">
					{standard.StandardId}
				</Descriptions.Item>
				<Descriptions.Item label="Standard Type">
					{getStandardTypeName(standard.StandardType)}
				</Descriptions.Item>
				<Descriptions.Item label="Supplier">
					{standard.Supplier || "Not specified"}
				</Descriptions.Item>
				<Descriptions.Item label="Date Received">
					{standard.Date_Received
						? dayjs(standard.Date_Received).format("MMMM DD, YYYY")
						: "Not specified"}
				</Descriptions.Item>
			</Descriptions>

			<Divider />

			{/* Element Values Table */}
			<div>
				<Title level={5}>Element Values</Title>
				<Table
					dataSource={values}
					columns={columns}
					rowKey={record => `${record.Element}-${record.GenericMethod}`}
					pagination={false}
					loading={loading}
					size="small"
					locale={{
						emptyText: "No element values configured",
					}}
				/>
			</div>

			{/* TODO: Certificate Section - Add Certificate_Url to QcReference type when implemented
      {standard.Certificate_Url && (
        <>
          <Divider />
          <div>
            <Title level={5}>Certificate</Title>
            <Space>
              <Button
                type="link"
                onClick={() => window.open(standard.Certificate_Url, '_blank')}
              >
                View Certificate
              </Button>
              <Button
                type="link"
                onClick={() => {
                  console.log('Download certificate');
                }}
              >
                Download
              </Button>
            </Space>
          </div>
        </>
      )}
      */}
		</div>
	);
}
