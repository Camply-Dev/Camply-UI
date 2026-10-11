import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { ButtonGroupSizeContext } from "./buttonGroupSize";

interface PortalProps {
	children: ReactNode;
}

/**
 * Seule sortie vers `document.body` de la librairie. Le contexte React traverse
 * les portails : sans cette remise à zéro, un bouton du panneau d'un Popover
 * déclaré dans un `ButtonGroup` prendrait la taille d'un groupe dont il ne fait
 * pas partie.
 */
export function Portal({ children }: PortalProps) {
	if (typeof document === "undefined") return null;
	return createPortal(
		<ButtonGroupSizeContext.Provider value={undefined}>{children}</ButtonGroupSizeContext.Provider>,
		document.body,
	);
}
