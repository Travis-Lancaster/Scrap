import React, { useEffect, useRef, useState } from "react";
import { useVisualMapperStore } from "../store/visual-mapper-store";

interface TxtGridProps {
	content: string
}

const LINE_HEIGHT = 20;
const FONT_SIZE = 13;
const FONT_FAMILY = "Consolas, Monaco, \"Courier New\", monospace";

const TextLayer = React.memo(({ content }: { content: string }) => (
	<div style={{ pointerEvents: "none", userSelect: "none" }}>{content}</div>
));

export const TxtGrid: React.FC<TxtGridProps> = ({ content }) => {
	const { setSelection, selection } = useVisualMapperStore();
	const [localSelection, setLocalSelection] = useState<{ start: { r: number, c: number }, end: { r: number, c: number } } | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const rectRef = useRef<DOMRect | null>(null);
	const [charWidth, setCharWidth] = useState(8);

	// Measure char width
	useEffect(() => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (ctx) {
			ctx.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
			const metrics = ctx.measureText("M");
			setCharWidth(metrics.width);
		}
	}, []);

	const getCoords = (e: React.MouseEvent) => {
		if (!containerRef.current)
			return { r: 0, c: 0 };

		// Use cached rect if available (during drag), else measure
		const rect = rectRef.current || containerRef.current.getBoundingClientRect();

		const x = e.clientX - rect.left + containerRef.current.scrollLeft;
		const y = e.clientY - rect.top + containerRef.current.scrollTop;

		const effectiveX = x - 10;
		const effectiveY = y - 10;

		const r = Math.floor(effectiveY / LINE_HEIGHT);
		const c = Math.floor(effectiveX / charWidth);
		return { r: Math.max(0, r), c: Math.max(0, c) };
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		if (containerRef.current) {
			rectRef.current = containerRef.current.getBoundingClientRect();
		}
		const { r, c } = getCoords(e);
		setLocalSelection({ start: { r, c }, end: { r, c } });
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!localSelection)
			return;
		if (e.buttons !== 1) {
			if (localSelection)
				handleMouseUp();
			return;
		}

		// RequestAnimationFrame could be used here for further throttling if needed
		const { r, c } = getCoords(e);
		setLocalSelection((prev) => {
			if (!prev)
				return null;
			// Only update if changed
			if (prev.end.r === r && prev.end.c === c)
				return prev;
			return { ...prev, end: { r, c } };
		});
	};

	const handleMouseUp = () => {
		if (localSelection) {
			setSelection({
				start: { row: localSelection.start.r, col: localSelection.start.c },
				end: { row: localSelection.end.r, col: localSelection.end.c },
			});
			setLocalSelection(null);
			rectRef.current = null; // Clear cache
		}
	};

	const displaySel = localSelection
		? {
			start: { row: localSelection.start.r, col: localSelection.start.c },
			end: { row: localSelection.end.r, col: localSelection.end.c },
		}
		: selection;

	const highlightStyle: React.CSSProperties | null = displaySel
		? {
			position: "absolute",
			left: Math.min(displaySel.start.col, displaySel.end.col) * charWidth + 10,
			top: Math.min(displaySel.start.row, displaySel.end.row) * LINE_HEIGHT + 10,
			width: (Math.abs(displaySel.end.col - displaySel.start.col) + 1) * charWidth,
			height: (Math.abs(displaySel.end.row - displaySel.start.row) + 1) * LINE_HEIGHT,
			backgroundColor: "rgba(24, 144, 255, 0.3)",
			border: "1px solid #1890ff",
			pointerEvents: "none",
		}
		: null;

	return (
		<div
			ref={containerRef}
			style={{
				fontFamily: FONT_FAMILY,
				fontSize: FONT_SIZE,
				lineHeight: `${LINE_HEIGHT}px`,
				whiteSpace: "pre",
				overflow: "auto",
				border: "1px solid #d9d9d9",
				height: "500px",
				position: "relative",
				backgroundColor: "#fafafa",
				cursor: "text",
				padding: "10px",
			}}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
		>
			<TextLayer content={content} />
			{highlightStyle && <div style={highlightStyle} />}
		</div>
	);
};
