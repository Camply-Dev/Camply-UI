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
	/** distance between anchor and floating element, px */
	gap?: number;
	/** force floating element width to match the anchor width (selects, combobox) */
	matchWidth?: boolean;
	/** viewport padding kept when clamping, px */
	padding?: number;
	/** cap the floating element's height to the space available on-screen and
	 *  let it scroll — prevents long lists/menus from being cut off */
	constrainHeight?: boolean;
	/** minimum height to keep when constraining (so it never collapses) */
	minHeight?: number;
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Fields useAnchor writes into the floating style. Comparing them lets us skip
// redundant setState calls — which keeps repeated measurement from looping.
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

/**
 * Positions a floating element (rendered in a Portal, position:fixed) relative
 * to an anchor. Chooses the side with the most room, clamps to the viewport,
 * and — with `constrainHeight` — caps the height to the available space so
 * content is never cropped (it scrolls instead). Recomputes on scroll, resize,
 * and whenever the floating element changes size (ResizeObserver).
 */
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

		// Room available on each side, between the anchor and the viewport edge.
		const spaceBelow = vh - a.bottom - gap - padding;
		const spaceAbove = a.top - gap - padding;

		// Prefer the requested side; flip only if the other side has more room
		// and the requested side can't fit the content.
		let side = requested;
		if (requested === "bottom" && fh > spaceBelow && spaceAbove > spaceBelow) {
			side = "top";
		} else if (requested === "top" && fh > spaceAbove && spaceBelow > spaceAbove) {
			side = "bottom";
		}

		const avail = side === "bottom" ? spaceBelow : spaceAbove;
		// Height actually used for positioning (capped when constraining).
		const usedH = constrainHeight ? Math.min(fh, Math.max(minHeight, avail)) : fh;

		let top = side === "bottom" ? a.bottom + gap : a.top - gap - usedH;

		let left: number;
		if (align === "end") left = a.right - fw;
		else if (align === "start") left = a.left;
		else left = a.left + a.width / 2 - fw / 2;

		// Clamp to the viewport.
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
		// Only update state when the computed style actually changed. Bailing on
		// equal values is what makes measuring-on-every-commit (below) safe: it
		// can never spin into an infinite render loop.
		setStyle((prev) => (styleEqual(prev, next) ? prev : next));
	}, [anchorRef, floatRef, placement, gap, matchWidth, padding, constrainHeight, minHeight]);

	// Measure after every commit while open. Deliberately dependency-free: the
	// floating node may mount a beat after `open` flips, and the anchor itself
	// can change under us (a menubar switching which item is open) without any
	// of our other signals firing. `setStyle` bails when nothing moved, so this
	// converges in a render or two instead of looping.
	useIsoLayoutEffect(() => {
		if (open) update();
	});

	useEffect(() => {
		if (!open) return;
		update();

		window.addEventListener("scroll", update, true);
		window.addEventListener("resize", update);

		// Reposition when either element changes size (async content, filtering a
		// list, fonts loading, the anchor reflowing…).
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
