import { type ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
	children: ReactNode;
	/** Optional container; defaults to document.body */
	container?: Element | null;
}

// Layout effect côté client : le portail doit monter AVANT les effets passifs
// du parent (useAnchor mesure le nœud flottant dans son effet — s'il montait
// en useEffect classique, la mesure verrait un ref nul et le popup resterait
// invisible). useEffect en SSR pour éviter le warning.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Renders children into document.body (or a custom container) so overlays
 * escape ancestor `overflow:hidden` / `transform` / `z-index` stacking —
 * this is what prevents dropdowns and menus from being clipped.
 * SSR-safe: renders nothing until mounted on the client.
 */
export function Portal({ children, container }: PortalProps) {
	const [mounted, setMounted] = useState(false);
	useIsoLayoutEffect(() => setMounted(true), []);
	if (!mounted) return null;
	return createPortal(children, container ?? document.body);
}
