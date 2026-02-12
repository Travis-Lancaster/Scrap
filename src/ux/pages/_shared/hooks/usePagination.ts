/**
 * usePagination Hook
 *
 * Manages pagination state for data tables and lists
 *
 * @example
 * ```typescript
 * const {
 *   page,
 *   pageSize,
 *   setPage,
 *   setPageSize,
 *   getTotalPages,
 *   hasNextPage,
 *   hasPrevPage,
 *   nextPage,
 *   prevPage,
 *   reset
 * } = usePagination({ initialPage: 1, initialPageSize: 20 });
 * ```
 */

import { useCallback, useMemo, useState } from "react";

export interface UsePaginationOptions {
	initialPage?: number
	initialPageSize?: number
	pageSizeOptions?: number[]
}

export interface UsePaginationResult {
	page: number
	pageSize: number
	setPage: (page: number) => void
	setPageSize: (size: number) => void
	getTotalPages: (totalItems: number) => number
	hasNextPage: (totalItems: number) => boolean
	hasPrevPage: () => boolean
	nextPage: () => void
	prevPage: () => void
	reset: () => void
	getPageInfo: (totalItems: number) => PageInfo
}

export interface PageInfo {
	page: number
	pageSize: number
	totalPages: number
	totalItems: number
	startItem: number
	endItem: number
	hasNextPage: boolean
	hasPrevPage: boolean
}

export function usePagination(options: UsePaginationOptions = {}): UsePaginationResult {
	const {
		initialPage = 1,
		initialPageSize = 20,
		pageSizeOptions = [10, 20, 50, 100],
	} = options;

	const [page, setPageState] = useState(initialPage);
	const [pageSize, setPageSizeState] = useState(initialPageSize);

	// Ensure page size is valid
	const normalizedPageSize = useMemo(() => {
		if (pageSizeOptions.includes(pageSize)) {
			return pageSize;
		}
		return pageSizeOptions[0] || 20;
	}, [pageSize, pageSizeOptions]);

	const setPage = useCallback((newPage: number) => {
		console.log("[FLOW:pagination] [STATE] Page changed", { from: page, to: newPage });
		setPageState(Math.max(1, newPage));
	}, [page]);

	const setPageSize = useCallback((newSize: number) => {
		console.log("[FLOW:pagination] [STATE] Page size changed", { from: pageSize, to: newSize });
		setPageSizeState(newSize);
		// Reset to page 1 when page size changes
		setPageState(1);
	}, [pageSize]);

	const getTotalPages = useCallback((totalItems: number): number => {
		if (totalItems === 0)
			return 1;
		return Math.ceil(totalItems / normalizedPageSize);
	}, [normalizedPageSize]);

	const hasNextPage = useCallback((totalItems: number): boolean => {
		const totalPages = getTotalPages(totalItems);
		return page < totalPages;
	}, [page, getTotalPages]);

	const hasPrevPage = useCallback((): boolean => {
		return page > 1;
	}, [page]);

	const nextPage = useCallback(() => {
		console.log("[FLOW:pagination] [ACTION] Next page");
		setPageState(prev => prev + 1);
	}, []);

	const prevPage = useCallback(() => {
		console.log("[FLOW:pagination] [ACTION] Previous page");
		setPageState(prev => Math.max(1, prev - 1));
	}, []);

	const reset = useCallback(() => {
		console.log("[FLOW:pagination] [ACTION] Reset pagination");
		setPageState(initialPage);
		setPageSizeState(initialPageSize);
	}, [initialPage, initialPageSize]);

	const getPageInfo = useCallback((totalItems: number): PageInfo => {
		const totalPages = getTotalPages(totalItems);
		const startItem = totalItems === 0 ? 0 : (page - 1) * normalizedPageSize + 1;
		const endItem = Math.min(page * normalizedPageSize, totalItems);

		return {
			page,
			pageSize: normalizedPageSize,
			totalPages,
			totalItems,
			startItem,
			endItem,
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1,
		};
	}, [page, normalizedPageSize, getTotalPages]);

	return {
		page,
		pageSize: normalizedPageSize,
		setPage,
		setPageSize,
		getTotalPages,
		hasNextPage,
		hasPrevPage,
		nextPage,
		prevPage,
		reset,
		getPageInfo,
	};
}
