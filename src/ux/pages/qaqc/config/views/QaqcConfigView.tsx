/**
 * QAQC Configuration View
 *
 * Main configuration page with tabbed interface for all four modules
 */

import { QuestionCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { Alert, Button, Layout, Space, Tabs } from "antd";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router";
// Module components
import { ModuleAView } from "../components/module-a/ModuleAView";
import { ModuleBView } from "../components/module-b/ModuleBView";
import { ModuleCView } from "../components/module-c/ModuleCView";
import { ModuleDView } from "../components/module-d/ModuleDView";
import { useQaqcConfigStore } from "../store/qaqc-config-store";

const { Header, Content } = Layout;

export function QaqcConfigView(): JSX.Element {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<string>("module-a");

	const dirtyState = useQaqcConfigStore(state => state.dirtyState);
	const clearDirtyState = useQaqcConfigStore(state => state.clearDirtyState);

	// Warn user before leaving with unsaved changes
	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (dirtyState.hasUnsavedChanges) {
				e.preventDefault();
				e.returnValue = "";
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [dirtyState.hasUnsavedChanges]);

	const handleSaveAll = async () => {
		// TODO: Implement save all logic
		console.log("Saving all changes...");
		clearDirtyState();
	};

	const handleHelp = () => {
		// TODO: Open help documentation
		window.open("/docs/qaqc-configuration", "_blank");
	};

	return (
		<Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
			{/* Header */}
			<Header style={{ background: "#fff", padding: "0 24px", borderBottom: "1px solid #f0f0f0" }}>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
					<div>
						<h2 style={{ margin: 0 }}>QAQC Configuration</h2>
						<p style={{ margin: 0, color: "#8c8c8c", fontSize: "14px" }}>
							Manage quality control settings, standards, and rules
						</p>
					</div>
					<Space>
						{dirtyState.hasUnsavedChanges && (
							<Alert
								message={`Unsaved changes in ${dirtyState.modulesChanged.size} module(s)`}
								type="warning"
								showIcon
								style={{ marginBottom: 0 }}
							/>
						)}
						<Button
							type="primary"
							icon={<SaveOutlined />}
							onClick={handleSaveAll}
							disabled={!dirtyState.hasUnsavedChanges}
						>
							Save All Changes
						</Button>
						<Button
							icon={<QuestionCircleOutlined />}
							onClick={handleHelp}
						>
							Help
						</Button>
					</Space>
				</div>
			</Header>

			{/* Main Content */}
			<Content style={{ padding: "24px" }}>
				<Tabs
					activeKey={activeTab}
					onChange={setActiveTab}
					size="large"
					type="card"
					items={[
						{
							key: "module-a",
							label: "Reference Materials",
							children: <ModuleAView />,
						},
						{
							key: "module-b",
							label: "Statistical Limits & Rules",
							children: <ModuleBView />,
						},
						{
							key: "module-c",
							label: "QC Insertion Patterns",
							children: <ModuleCView />,
						},
						{
							key: "module-d",
							label: "Lab & Method Config",
							children: <ModuleDView />,
						},
					]}
				/>
			</Content>
		</Layout>
	);
}
