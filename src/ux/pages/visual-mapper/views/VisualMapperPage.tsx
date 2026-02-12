import { ArrowLeftOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Button, Layout, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { FileDropzone } from "../components/FileDropzone";
import { MappingWorkspace } from "../components/MappingWorkspace";
import { useVisualMapperStore } from "../store/visual-mapper-store";
import { TemplateLibrary } from "./TemplateLibrary";

const { Content } = Layout;

const VisualMapperPage: React.FC = () => {
	const { file, reset, template } = useVisualMapperStore();
	const [isLibraryOpen, setIsLibraryOpen] = useState(false);

	// Reset store on unmount to ensure fresh state
	useEffect(() => {
		return () => {
			reset();
		};
	}, [reset]);

	const handleReset = () => {
		reset();
	};

	const handleOpenLibrary = () => {
		setIsLibraryOpen(true);
	};

	const handleCloseLibrary = () => {
		setIsLibraryOpen(false);
	};

	const totalItems = template.simpleFields.length + template.rowPatterns.length;

	return (
		<Layout style={{ height: "100vh", background: "#fff" }}>
			<div style={{
				padding: "16px",
				borderBottom: "1px solid #f0f0f0",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
					<h2 style={{ margin: 0 }}>Visual Mapper - Fixed Width Parser</h2>
					{!file && (
						<Button
							icon={<FolderOpenOutlined />}
							onClick={handleOpenLibrary}
						>
							Template Library
						</Button>
					)}
				</div>
				<div>
					{file && (
						<>
							<span style={{ marginRight: 16, color: "#666" }}>
								{file.name}
								{" "}
								|
								{totalItems}
								{" "}
								items
							</span>
							<Button
								icon={<FolderOpenOutlined />}
								onClick={handleOpenLibrary}
								style={{ marginRight: 8 }}
							>
								Library
							</Button>
							<Button
								icon={<ArrowLeftOutlined />}
								onClick={handleReset}
							>
								New File
							</Button>
						</>
					)}
				</div>
			</div>
			<Content style={{ height: "calc(100vh - 64px)", overflow: "hidden" }}>
				{!file
					? (
						<FileDropzone />
					)
					: (
						<MappingWorkspace />
					)}
			</Content>

			<Modal
				title="Template Library"
				open={isLibraryOpen}
				onCancel={handleCloseLibrary}
				footer={null}
				width={1200}
				style={{ top: 20 }}
			>
				<TemplateLibrary onClose={handleCloseLibrary} />
			</Modal>
		</Layout>
	);
};

export default VisualMapperPage;
