/**
 * QAQC Module Index
 *
 * Main entry point for QAQC dashboard module
 */

import { ErrorBoundary } from "#src/pages/_shared/components";
import { QaqcDashboardView } from "./views";

export default function QaqcDashboard() {
	console.log("[FLOW:qaqc-dashboard] [ACTION] Rendering QaqcDashboardView");
	return (
		<ErrorBoundary moduleName="QAQC Dashboard">
			<QaqcDashboardView />
		</ErrorBoundary>
	);
}
