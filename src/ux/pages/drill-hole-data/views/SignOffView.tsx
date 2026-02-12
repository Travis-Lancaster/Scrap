/**
 * SignOff View
 * 
 * Final sign-off view displaying VwCollar data.
 * 
 * @module drill-hole-data/views
 */

import React from "react";
import { VwCollarGrid } from "../sections/grids";

export const SignOffView: React.FC = () => {
	console.log("[SignOffView] 📋 Rendering SignOff view as VwCollar grid");

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-hidden bg-white">
				<VwCollarGrid />
			</div>
		</div>
	);
};
