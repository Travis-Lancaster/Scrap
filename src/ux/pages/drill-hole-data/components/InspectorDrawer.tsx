import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useDrillHoleDataStore } from "../store";

export const InspectorDrawer: React.FC = () => {
	const { isDrawerOpen, closeDrawer, selectedRow } = useDrillHoleDataStore();

	return (
		<aside
			className={`fixed right-0 top-0 h-full w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l ${
				isDrawerOpen ? "translate-x-0" : "translate-x-full"
			}`}
		>
			<div className="h-full flex flex-col">
				<div className="p-4 border-b bg-slate-50 flex items-center justify-between">
					<div>
						<h2 className="font-bold text-slate-800">Interval Details</h2>
						<span className="text-xs text-slate-500 mono">
							Depth: {selectedRow?.from || "22.40"}m - {selectedRow?.to || "45.80"}m
						</span>
					</div>
					<button
						onClick={closeDrawer}
						className="text-slate-400 hover:text-slate-700 text-xl px-2"
					>
						<CloseOutlined />
					</button>
				</div>

				<div className="flex-grow overflow-y-auto p-6 space-y-6">
					<section>
						<h3 className="text-[10px] font-bold text-blue-600 uppercase border-b mb-4 pb-1">
							Lithology & Basics
						</h3>
						<div className="space-y-4">
							<div>
								<label className="block text-xs font-bold text-slate-600 mb-1">
									Primary Lithology
								</label>
								<select className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
									<option>BASALT</option>
									<option>QUARTZ VEIN</option>
									<option>GRANITE</option>
								</select>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold text-slate-600 mb-1">Colour</label>
									<input
										type="text"
										defaultValue="DK GREY"
										className="w-full border rounded-md p-2 text-sm outline-none"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-slate-600 mb-1">
										Weathering
									</label>
									<select className="w-full border rounded-md p-2 text-sm outline-none">
										<option>MODERATE</option>
										<option>FRESH</option>
									</select>
								</div>
							</div>
						</div>
					</section>

					<section>
						<h3 className="text-[10px] font-bold text-blue-600 uppercase border-b mb-4 pb-1">
							Alteration (Intensity 0-5)
						</h3>
						<div className="grid grid-cols-2 gap-x-6 gap-y-3 bg-slate-50 p-3 rounded-lg border">
							<div className="flex justify-between items-center">
								<label className="text-xs font-semibold text-slate-600">Albite</label>
								<input
									type="number"
									defaultValue="2"
									className="w-12 border rounded p-1 text-center text-sm font-bold"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-xs font-semibold text-slate-600">Biotite</label>
								<input
									type="number"
									defaultValue="0"
									className="w-12 border rounded p-1 text-center text-sm font-bold"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-xs font-semibold text-slate-600">Sericite</label>
								<input
									type="number"
									defaultValue="4"
									className="w-12 border rounded p-1 text-center text-sm font-bold"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-xs font-semibold text-slate-600">Silica</label>
								<input
									type="number"
									defaultValue="1"
									className="w-12 border rounded p-1 text-center text-sm font-bold"
								/>
							</div>
						</div>
					</section>

					<section>
						<h3 className="text-[10px] font-bold text-blue-600 uppercase border-b mb-4 pb-1">
							Veining / Min
						</h3>
						<div className="space-y-3">
							<div className="flex items-center space-x-4">
								<div className="flex-1">
									<label className="block text-[10px] font-bold text-slate-500">
										Vein Mode
									</label>
									<input type="text" className="w-full border rounded p-2 text-sm" />
								</div>
								<div className="w-20">
									<label className="block text-[10px] font-bold text-slate-500">
										Vein %
									</label>
									<input
										type="number"
										defaultValue="15"
										className="w-full border rounded p-2 text-sm"
									/>
								</div>
							</div>
							<div>
								<label className="block text-[10px] font-bold text-slate-500">Comments</label>
								<textarea
									className="w-full border rounded p-2 text-sm h-20"
									placeholder="Describe interval notes..."
								></textarea>
							</div>
						</div>
					</section>
				</div>

				<div className="p-4 bg-slate-50 border-t flex space-x-3">
					<button
						onClick={closeDrawer}
						className="flex-1 bg-white border border-slate-300 py-2 rounded-lg font-bold text-slate-600 hover:bg-slate-100 transition shadow-sm"
					>
						Cancel
					</button>
					<button
						onClick={closeDrawer}
						className="flex-1 bg-blue-600 py-2 rounded-lg font-bold text-white hover:bg-blue-700 transition shadow-sm"
					>
						Save Changes
					</button>
				</div>
			</div>
		</aside>
	);
};
