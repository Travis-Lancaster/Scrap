import React from "react";
import { Badge, Button } from "antd";
import { CheckOutlined, DownloadOutlined, SyncOutlined } from "@ant-design/icons";

interface TitleBarProps {
	project: string;
	plan: string;
	holeId: string;
	status: string;
	depth: { current: number; planned: number };
	draftStatus: string;
	modifiedTime: string;
	onChangeStatus?: () => void;
	onDownload?: () => void;
	onSync?: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({
	project,
	plan,
	holeId,
	status,
	depth,
	draftStatus,
	modifiedTime,
	onChangeStatus,
	onDownload,
	onSync,
}) => {
	const handleChangeStatus = () => {
		console.log("[TitleBar] 🔄 Change Status clicked");
		onChangeStatus?.();
	};

	const handleDownload = () => {
		console.log("[TitleBar] 📥 Download clicked");
		onDownload?.();
	};

	const handleSync = () => {
		console.log("[TitleBar] ☁️ Sync clicked");
		onSync?.();
	};

	return (
		<header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm z-10">
			<div className="flex items-center space-x-8">
				<div>
					<span className="text-[10px] uppercase font-bold text-slate-400 block">
						Current Project
					</span>
					<span className="font-bold text-slate-700">{project}</span>
				</div>
				<div className="h-8 w-px bg-slate-200"></div>
				<div>
					<span className="text-[10px] uppercase font-bold text-slate-400 block">Plan</span>
					<span className="font-bold text-slate-500">{plan}</span>
				</div>
				<div className="h-8 w-px bg-slate-200"></div>
				<div>
					<span className="text-[10px] uppercase font-bold text-slate-400 block">
						Hole ID
					</span>
					<span className="font-bold text-blue-600 text-lg">{holeId}</span>
				</div>
				<div className="h-8 w-px bg-slate-200"></div>
				<div>
					<span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
					<Badge status="processing" text={status} className="text-lg" />
				</div>
				<div className="h-8 w-px bg-slate-200"></div>
				<div>
					<span className="text-[10px] uppercase font-bold text-slate-400 block">Depth</span>
					<span className="text-slate-400 text-lg">
						{depth.current.toFixed(1)}m / {depth.planned.toFixed(1)}m
					</span>
				</div>
				<div className="h-8 w-px bg-slate-200"></div>
				<div className="flex items-center space-x-2">
					<Badge color="blue" text={draftStatus} />
					<span className="text-slate-400 text-xs italic">Modified: {modifiedTime}</span>
				</div>
			</div>

			<div className="flex items-center space-x-4">
				<Button
					icon={<DownloadOutlined />}
					onClick={handleDownload}
					className="text-orange-500"
				>
					Download
				</Button>
				<Button
					icon={<SyncOutlined />}
					onClick={handleSync}
					className="text-orange-500"
				>
					Sync
				</Button>
				<Button
					type="primary"
					icon={<CheckOutlined />}
					onClick={handleChangeStatus}
					className="bg-blue-600 hover:bg-blue-700"
				>
					Change Status
				</Button>
			</div>
		</header>
	);
};
