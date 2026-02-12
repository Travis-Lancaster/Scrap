import type { Template } from "#src/api/database/data-contracts";
import type { TemplateRow } from "../types/template";
import { apiClient } from "#src/services/apiClient";

import { DeleteOutlined, FileTextOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Form, Input, List, message, Modal, Popconfirm, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useVisualMapperStore } from "../store/visual-mapper-store";
import { importTemplate } from "../utils/template-importer";

interface TemplateLibraryProps {
	onClose: () => void
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onClose }) => {
	const [templates, setTemplates] = useState<Template[]>([]);
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const { importTemplate: importToStore, setTemplateName, setTemplateId } = useVisualMapperStore();

	// Load templates from database
	useEffect(() => {
		loadTemplates();
	}, []);

	const loadTemplates = async () => {
		setLoading(true);
		try {
			const response = await apiClient.templateControllerFindAll({ take: 100 });
			setTemplates(response.data?.data || []);
		}
		catch (error) {
			console.error("Failed to load templates:", error);
			message.error("Failed to load templates from database");
		}
		finally {
			setLoading(false);
		}
	};

	const handleLoadTemplate = async (template: Template) => {
		try {
			// Parse the JSON template from JsonData field
			const templateRows: TemplateRow[] = JSON.parse(template.JsonData || "[]");

			// Convert to TemplateInProgress format
			const importedTemplate = importTemplate(templateRows);

			// Import to store and set name and ID
			importToStore(importedTemplate);
			setTemplateName(template.TemplateNm || "Untitled");
			setTemplateId(template.TemplateId || null);

			message.success(`Loaded template: ${template.TemplateNm}`);
			onClose();
		}
		catch (error) {
			console.error("Failed to load template:", error);
			message.error("Failed to parse template. The template may be corrupted.");
		}
	};

	const handleDelete = async (templateId: string, templateName: string) => {
		try {
			await apiClient.templateControllerRemove(templateId);
			message.success(`Deleted template: ${templateName}`);
			loadTemplates(); // Reload list
		}
		catch (error) {
			console.error("Failed to delete template:", error);
			message.error("Failed to delete template");
		}
	};

	const handleCreateNew = () => {
		setIsModalOpen(true);
	};

	const handleModalOk = () => {
		form.validateFields().then((values) => {
			// Start with empty template
			importToStore({
				name: values.name,
				format: "TXT",
				simpleFields: [],
				rowPatterns: [],
			});
			setTemplateName(values.name);
			setTemplateId(null); // New template has no ID yet
			setIsModalOpen(false);
			message.success(`Created new template: ${values.name}`);
			onClose();
		});
	};

	return (
		<div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
				<h2>Template Library</h2>
				<Button type="primary" icon={<PlusOutlined />} onClick={handleCreateNew}>
					New Template
				</Button>
			</div>

			<Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} />}>
				{templates.length === 0 && !loading
					? (
						<Empty description="No templates found. Create your first template!" />
					)
					: (
						<List
							grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
							dataSource={templates}
							renderItem={template => (
								<List.Item>
									<Card
										title={template.TemplateNm || "Untitled"}
										extra={(
											<Button
												type="link"
												size="small"
												onClick={() => handleLoadTemplate(template)}
											>
												Load
											</Button>
										)}
										actions={[
											<Popconfirm
												key="delete"
												title="Delete Template"
												description="Are you sure you want to delete this template?"
												onConfirm={() => handleDelete(template.TemplateId, template.TemplateNm || "template")}
												okText="Delete"
												okType="danger"
											>
												<DeleteOutlined />
											</Popconfirm>,
										]}
									>
										{template.FileName && (
											<p>
												<FileTextOutlined />
												{" "}
												Type:
												{" "}
												{template.FileName}
											</p>
										)}
										{template.Description && (
											<p style={{ fontSize: "12px", color: "#888" }}>{template.Description}</p>
										)}
									</Card>
								</List.Item>
							)}
						/>
					)}
			</Spin>

			<Modal
				title="Create New Template"
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onOk={handleModalOk}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="name"
						label="Template Name"
						rules={[{ required: true, message: "Please enter a template name" }]}
					>
						<Input placeholder="e.g., Lab Report V1" />
					</Form.Item>
					<Form.Item
						name="description"
						label="Description"
					>
						<Input.TextArea
							rows={3}
							placeholder="Brief description of this template (optional)"
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};
