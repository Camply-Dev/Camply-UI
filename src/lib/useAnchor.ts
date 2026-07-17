import {
	type CSSProperties,
	type RefObject,
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import { clamp } from "./clamp";

type Side = "top" | "bottom" | "left" | "right";
type Align = "start" | "end";
/** "bottom", "bottom-start"… — le côté, éventuellement aligné sur un bord de l'ancre. */
export type Placement = Side | `${Side}-${Align}`;

interface AnchorOptions {
	placement?: Placement;
	gap?: number;
	matchWidth?: boolean;
	padding?: number;
	constrainHeight?: boolean;
	minHeight?: number;
}

export interface AnchorResult {
	style: CSSProperties;
	/** Placement RÉELLEMENT appliqué (après flip) — pour orienter une flèche. */
	placement: Placement;
	side: Side;
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

const styleEqual = (a: CSSProperties, b: CSSProperties) => STYLE_KEYS.every((k) => a[k] === b[k]);

const OPPOSITE: Record<Side, Side> = { top: "bottom", bottom: "top", left: "right", right: "left" };

const HIDDEN: CSSProperties = {
	position: "fixed",
	top: 0,
	left: 0,
	opacity: 0,
	pointerEvents: "none",
};

export function useAnchor(
	anchorRef: RefObject<HTMLElement | null>,
	floatRef: RefObject<HTMLElement | null>,
	open: boolean,
	options: AnchorOptions = {},
): AnchorResult {
	const {
		placement = "bottom-start",
		gap = 8,
		matchWidth = false,
		padding = 8,
		constrainHeight = false,
		minHeight = 120,
	} = options;

	const [state, setState] = useState<{ style: CSSProperties; placement: Placement }>({
		style: HIDDEN,
		placement,
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

		const [requested, align] = placement.split("-") as [Side, Align | undefined];

		// Place disponible de chaque côté de l'ancre.
		const room: Record<Side, number> = {
			top: a.top - gap - padding,
			bottom: vh - a.bottom - gap - padding,
			left: a.left - gap - padding,
			right: vw - a.right - gap - padding,
		};
		// Taille du flottant sur l'axe principal du côté demandé.
		const needed = (s: Side) => (s === "top" || s === "bottom" ? fh : fw);

		// Flip : on bascule seulement si ça ne rentre pas ET que l'autre côté est mieux.
		let side = requested;
		const opposite = OPPOSITE[requested];
		if (needed(requested) > room[requested] && room[opposite] > room[requested]) {
			side = opposite;
		}

		const vertical = side === "top" || side === "bottom";
		const avail = room[side];
		const usedH = constrainHeight && vertical ? Math.min(fh, Math.max(minHeight, avail)) : fh;

		let top: number;
		let left: number;

		if (vertical) {
			top = side === "bottom" ? a.bottom + gap : a.top - gap - usedH;
			if (align === "start") left = a.left;
			else if (align === "end") left = a.right - fw;
			else left = a.left + a.width / 2 - fw / 2;
		} else {
			left = side === "right" ? a.right + gap : a.left - gap - fw;
			if (align === "start") top = a.top;
			else if (align === "end") top = a.bottom - fh;
			else top = a.top + a.height / 2 - fh / 2;
		}

		// Recadrage dans le viewport.
		left = clamp(left, padding, Math.max(padding, vw - fw - padding));
		top = clamp(top, padding, Math.max(padding, vh - usedH - padding));

		const style: CSSProperties = {
			position: "fixed",
			top: Math.round(top),
			left: Math.round(left),
			opacity: 1,
			pointerEvents: "auto",
		};
		if (matchWidth) style.width = Math.round(a.width);
		if (constrainHeight && vertical) {
			style.maxHeight = Math.round(Math.max(minHeight, avail));
			style.overflowY = "auto";
		}

		const resolved = (align ? `${side}-${align}` : side) as Placement;

		setState((prev) =>
			styleEqual(prev.style, style) && prev.placement === resolved
				? prev
				: { style, placement: resolved },
		);
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

	return {
		style: state.style,
		placement: state.placement,
		side: state.placement.split("-")[0] as Side,
	};
}
