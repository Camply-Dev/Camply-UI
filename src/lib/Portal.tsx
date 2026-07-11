import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
	children: ReactNode;
	/** Optional container; defaults to document.body */
	container?: Element | null;
}

/**
 * Renders children into document.body (or a custom container) so overlays
 * escape ancestor `overflow:hidden` / `transform` / `z-index` stacking —
 * this is what prevents dropdowns and menus from being clipped.
 *
 * The portal is created SYNCHRONOUSLY on the client (no post-mount `mounted`
 * flag). This is essential: `useAnchor` measures the floating node in the
 * parent's layout effect, which runs right after this commit — so the node
 * must already be in the DOM. A deferred mount left the anchor measuring a
 * null ref, and the overlay stayed stuck at `opacity:0` in the top-left
 * corner. SSR-safe: renders nothing when there is no document.
 */
export function Portal({ children, container }: PortalProps) {
	if (typeof document === "undefined") return null;
	return createPortal(children, container ?? document.body);
}
