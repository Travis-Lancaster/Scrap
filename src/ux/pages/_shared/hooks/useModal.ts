/**
 * useModal Hook
 *
 * Manages modal/dialog open/close state with data passing
 *
 * @example
 * ```typescript
 * const { isOpen, data, open, close } = useModal<DrillPlan>();
 *
 * // Open modal with data
 * open(drillPlan);
 *
 * // In modal component
 * <Modal open={isOpen} onCancel={close}>
 *   {data && <DrillPlanForm plan={data} />}
 * </Modal>
 * ```
 */

import { useCallback, useState } from "react";

export interface UseModalResult<T = any> {
	isOpen: boolean
	data: T | null
	open: (data?: T) => void
	close: () => void
	toggle: () => void
	setData: (data: T | null) => void
}

export function useModal<T = any>(initialOpen = false): UseModalResult<T> {
	const [isOpen, setIsOpen] = useState(initialOpen);
	const [data, setData] = useState<T | null>(null);

	const open = useCallback((newData?: T) => {
		console.log("[FLOW:modal] [ACTION] Opening modal", { hasData: !!newData });
		setIsOpen(true);
		if (newData !== undefined) {
			setData(newData);
		}
	}, []);

	const close = useCallback(() => {
		console.log("[FLOW:modal] [ACTION] Closing modal");
		setIsOpen(false);
		// Clear data when closing to avoid stale data
		setData(null);
	}, []);

	const toggle = useCallback(() => {
		console.log("[FLOW:modal] [ACTION] Toggling modal", { currentState: isOpen });
		setIsOpen(prev => !prev);
	}, [isOpen]);

	const setModalData = useCallback((newData: T | null) => {
		console.log("[FLOW:modal] [STATE] Setting modal data", { hasData: !!newData });
		setData(newData);
	}, []);

	return {
		isOpen,
		data,
		open,
		close,
		toggle,
		setData: setModalData,
	};
}
