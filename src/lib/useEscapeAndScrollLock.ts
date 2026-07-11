import { useEffect } from "react";

/** Tant que `open` est vrai : ferme sur Échap et verrouille le défilement de la
 *  page (restauré à la fermeture). Partagé par Modal, Drawer et Sheet. */
export function useEscapeAndScrollLock(open: boolean, onClose: () => void) {
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [open, onClose]);
}
