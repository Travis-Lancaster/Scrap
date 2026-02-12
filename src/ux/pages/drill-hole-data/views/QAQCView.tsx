/**
 * QAQC View
 * 
 * Quality Assurance / Quality Control view.
 * 
 * @module drill-hole-data/views
 */

import React from "react";
import { Card } from "antd";

export const QAQCView: React.FC = () => {
	console.log("[QAQCView] 📊 Rendering QAQC view");

	return (
		<div className="p-6">
			<Card title="QAQC Reports">
				<div className="text-center text-gray-500 py-12">
					<div className="text-4xl mb-4">📋</div>
					<div className="text-lg font-semibold">QAQC Reports</div>
					<div className="text-sm">Ready for component copy from create-drill-hole/sections/QaqcSection.tsx</div>
				</div>
			</Card>
		</div>
	);
};
