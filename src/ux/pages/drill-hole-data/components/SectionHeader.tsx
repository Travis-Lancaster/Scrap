import React from "react";
import { 
	NodeIndexOutlined, 
	CloudSyncOutlined, 
	CheckSquareOutlined,
	DownloadOutlined
} from "@ant-design/icons";
import { Tag } from "antd";

export const SectionHeader: React.FC = () => {
	return (
		<header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm z-10">
			<div className="flex items-center space-x-8">
				<div>
					<span className="text-[10px] uppercase font-bold text-slate-400 block">Current Project</span>
					<span className="font-bold text-slate-700">Project K64 - Mali</span>
				</div>
				<div className="h-8 w-px bg-slate-200"></div>
				<div>
					<span className="text-[10px] uppercase font-bold text-slate-400 block">Plan</span>
					<span className="font-bold text-slate-500">Plan Xyz</span>
				</div>
				<div className="h-8 w-px bg-slate-200"></div>
				<div>
					<span className="text-[10px] uppercase font-bold text-slate-400 block">Hole ID</span>
					<span className="font-bold text-blue-600 text-lg">FKD_064(PlannedHoleNm)</span>
				</div>
				<div className="h-8 w-px bg-slate-200"></div>

				<div>
					<span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
					<div className="flex items-center gap-2">
						<span className="text-slate-400 italic text-lg">In Progress</span>
						<Tag color="processing">ACTIVE</Tag>
					</div>
				</div>
				<div className="h-8 w-px bg-slate-200"></div>

				<div>
					<span className="text-[10px] uppercase font-bold text-slate-400 block">Depth</span>
					<span className="text-slate-400 italic text-lg">10.0m /170.0m</span>
				</div>
				<div className="h-8 w-px bg-slate-200"></div>


				<div className="flex items-center space-x-2">
					<span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">DRAFT</span>
					<span className="text-slate-400 text-xs italic">Modified: 2 mins ago</span>
				</div>
			</div>

			<div className="flex items-center space-x-4">
				<div className="flex items-center space-x-2 text-orange-500 cursor-pointer">
					<DownloadOutlined className="animate-pulse" />
					<span className="text-xs font-bold uppercase tracking-tighter">DOWNLOAD</span>
				</div>
				<div className="flex items-center space-x-2 text-orange-500 cursor-pointer">
					<CloudSyncOutlined className="animate-pulse" />
					<span className="text-xs font-bold uppercase tracking-tighter">SyncCloud Icon</span>
				</div>
				<button
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition shadow-md flex items-center"
				>
					<CheckSquareOutlined className="mr-2" /> Change Status
				</button>

			</div>
		</header>
	);
};
