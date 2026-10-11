import { type RefObject, useEffect, useRef } from "react";
import { pushDismissLayer } from "./dismissStack";

/**
 * Verrou de défilement + fermeture sur Échap des dialogues modaux.
 *
 * Échap passe par la pile partagée (et non par un écouteur `document` isolé) :
 * sans ça, une seule frappe fermerait à la fois la liste d'un Select ouvert DANS
 * une modale et la modale elle-même. La couche est `escapeOnly` — le clic
 * extérieur reste l'affaire du voile, via `closeOnBackdrop`.
 *
 * `containerRef` désigne ce que le dialogue recouvre (voile et panneau) : la
 * pile y voit l'intérieur de la couche, si bien qu'un clic dans le dialogue ne
 * referme pas le Popover ou le menu dont il est issu — ce qui le démonterait.
 */
export function useEscapeAndScrollLock(
	open: boolean,
	onClose: () => void,
	containerRef: RefObject<HTMLElement | null>,
) {
	// Callback lue au moment de l'événement : la couche reste stable (cf. useDismiss).
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	useEffect(() => {
		if (!open) return;
		const pop = pushDismissLayer({
			refs: [containerRef],
			escapeOnly: true,
			onClose: () => onCloseRef.current(),
		});
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			pop();
			document.body.style.overflow = prev;
		};
	}, [open, containerRef]);
}
