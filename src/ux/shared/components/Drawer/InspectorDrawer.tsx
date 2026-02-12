/**
 * InspectorDrawer Component
 * Reusable detail view pattern with collapsible sections
 * Used for showing detailed information about selected grid rows
 */

import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";

import { useState } from "react";

export interface InspectorSection {
	key: string
	title: string
	icon?: React.ReactNode
	content: React.ReactNode
	defaultCollapsed?: boolean
}

export interface InspectorDrawerProps {
	open: boolean
	onClose: () => void
	title: string
	sections: InspectorSection[]
	onSave?: () => void
	onCancel?: () => void
	width?: number
}

export function InspectorDrawer({
	open,
	onClose,
	title,
	sections,
	onSave,
	onCancel,
	width = 500,
}: InspectorDrawerProps) {
	console.log("INSPECTOR");
	const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

	const handleCollapse = (sectionKey: string) => {
		const newCollapsed = new Set(collapsedSections);
		if (newCollapsed.has(sectionKey)) {
			newCollapsed.delete(sectionKey);
		}
		else {
			newCollapsed.add(sectionKey);
		}
		setCollapsedSections(newCollapsed);
		console.log("Section collapsed", { section: sectionKey, collapsed: newCollapsed.has(sectionKey) });
	};

	const handleClose = () => {
		console.log("Drawer closed");
		onClose();
	};

	const handleSave = () => {
		console.log("Save clicked");
		if (onSave) {
			onSave();
		}
	};

	const handleCancel = () => {
		console.log("Cancel clicked");
		if (onCancel) {
			onCancel();
		}
		handleClose();
	};

	return (
		<Drawer
			open={open}
			onClose={handleClose}
			width={width}
			title={(
				<div className="flex items-center justify-between">
					<span className="text-lg font-medium">{title}</span>
					<Button
						type="text"
						icon={<CloseOutlined />}
						onClick={handleClose}
						className="ml-4"
					/>
				</div>
			)}
			footer={(
				<div className="flex justify-end gap-3">
					{onCancel && (
						<Button onClick={handleCancel}>
							Cancel
						</Button>
					)}
					{onSave && (
						<Button type="primary" onClick={handleSave}>
							Save Changes
						</Button>
					)}
				</div>
			)}
			className="inspector-drawer"
		>
			<div className="space-y-4">
				{sections.map((section) => {
					const isCollapsed = collapsedSections.has(section.key);
					return (
						<div
							key={section.key}
							className="border border-gray-200 rounded-lg overflow-hidden"
						>
							<div
								className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
								onClick={() => handleCollapse(section.key)}
							>
								<div className="flex items-center gap-2">
									{section.icon}
									<span className="font-medium text-gray-700">{section.title}</span>
								</div>
								{isCollapsed
									? (
										<DownOutlined className="text-gray-500" />
									)
									: (
										<UpOutlined className="text-gray-500" />
									)}
							</div>
							{!isCollapsed && (
								<div className="p-4">
									{section.content}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</Drawer>
	);
}

export default InspectorDrawer;
