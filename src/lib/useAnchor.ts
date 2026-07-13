import {
	type CSSProperties,
	type RefObject,
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";

export type Placement = "bottom-start" | "bottom" | "bottom-end" | "top-start" | "top" | "top-end";

interface AnchorOptions {
	placement?: Placement;
	gap?: number;
	matchWidth?: boolean;
	padding?: number;
	constrainHeight?: boolean;
	minHeight?: number;
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const STYLE_KEYS = [
	"top",
	"left",
	"opacity",
	"pointerEvents",
	"position",
	"width",
	"maxHeight",
	"overflowY",
] as const;

function styleEqual(a: CSSProperties, b: CSSProperties): boolean {
	return STYLE_KEYS.every((k) => a[k] === b[k]);
}

export function useAnchor(
	anchorRef: RefObject<HTMLElement | null>,
	floatRef: RefObject<HTMLElement | null>,
	open: boolean,
	options: AnchorOptions = {},
): CSSProperties {
	const {
		placement = "bottom-start",
		gap = 8,
		matchWidth = false,
		padding = 8,
		constrainHeight = false,
		minHeight = 120,
	} = options;

	const [style, setStyle] = useState<CSSProperties>({
		position: "fixed",
		top: 0,
		left: 0,
		opacity: 0,
		pointerEvents: "none",
	});

	const update = useCallback(() => {
		const anchor = anchorRef.current;
		const floater = floatRef.current;
		if (!anchor || !floater) return;

		const a = anchor.getBoundingClientRect();
		const fw = floater.offsetWidth;
		const fh = floater.offsetHeight;
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		const [requested, align] = placement.split("-") as [
			"top" | "bottom",
			"start" | "end" | undefined,
		];

		const spaceBelow = vh - a.bottom - gap - padding;
		const spaceAbove = a.top - gap - padding;

		let side = requested;
		if (requested === "bottom" && fh > spaceBelow && spaceAbove > spaceBelow) {
			side = "top";
		} else if (requested === "top" && fh > spaceAbove && spaceBelow > spaceAbove) {
			side = "bottom";
		}

		const avail = side === "bottom" ? spaceBelow : spaceAbove;
		const usedH = constrainHeight ? Math.min(fh, Math.max(minHeight, avail)) : fh;

		let top = side === "bottom" ? a.bottom + gap : a.top - gap - usedH;

		let left: number;
		if (align === "end") left = a.right - fw;
		else if (align === "start") left = a.left;
		else left = a.left + a.width / 2 - fw / 2;

		left = Math.max(padding, Math.min(left, vw - fw - padding));
		top = Math.max(padding, Math.min(top, vh - usedH - padding));

		const next: CSSProperties = {
			position: "fixed",
			top: Math.round(top),
			left: Math.round(left),
			opacity: 1,
			pointerEvents: "auto",
		};
		if (matchWidth) next.width = Math.round(a.width);
		if (constrainHeight) {
			next.maxHeight = Math.round(Math.max(minHeight, avail));
			next.overflowY = "auto";
		}
		setStyle((prev) => (styleEqual(prev, next) ? prev : next));
	}, [anchorRef, floatRef, placement, gap, matchWidth, padding, constrainHeight, minHeight]);

	useIsoLayoutEffect(() => {
		if (open) update();
	});

	useEffect(() => {
		if (!open) return;
		update();

		window.addEventListener("scroll", update, true);
		window.addEventListener("resize", update);

		let ro: ResizeObserver | undefined;
		if (typeof ResizeObserver !== "undefined") {
			ro = new ResizeObserver(() => update());
			if (floatRef.current) ro.observe(floatRef.current);
			if (anchorRef.current) ro.observe(anchorRef.current);
		}

		return () => {
			window.removeEventListener("scroll", update, true);
			window.removeEventListener("resize", update);
			ro?.disconnect();
		};
	}, [open, update, floatRef, anchorRef]);

	return style;
}
