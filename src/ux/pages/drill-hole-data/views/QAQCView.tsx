import React from "react";

import { QAQCReportsGrid } from "../sections/grids";

export const QAQCView: React.FC = () => {
	return (
		<div className="h-full overflow-hidden bg-white">
			<QAQCReportsGrid />
		</div>
	);
};
