import { useState } from "react";

/** État « fermable » local partagé par Alert et Banner : `open` passe à false au
 *  clic sur « Fermer », après avoir notifié `onDismiss`. Le composant se contente
 *  de retourner `null` quand `open` est faux. */
export function useDismissible(onDismiss?: () => void): { open: boolean; dismiss: () => void } {
	const [open, setOpen] = useState(true);
	const dismiss = () => {
		setOpen(false);
		onDismiss?.();
	};
	return { open, dismiss };
}
