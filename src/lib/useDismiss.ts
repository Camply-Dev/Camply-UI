import { type RefObject, useEffect, useRef } from "react";
import { pushDismissLayer } from "./dismissStack";

/**
 * Ferme une couche flottante sur Échap ou clic extérieur.
 * S'appuie sur une pile partagée : Échap ne ferme QUE la couche du dessus, et un
 * clic dans une couche enfant (même portalisée) ne referme pas le parent.
 */
export function useDismiss(
	open: boolean,
	onClose: () => void,
	refs: Array<RefObject<HTMLElement | null>>,
) {
	// Refs et callback lus au moment de l'événement : la couche reste stable.
	const refsRef = useRef(refs);
	refsRef.current = refs;
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	useEffect(() => {
		if (!open) return;
		return pushDismissLayer({
			get refs() {
				return refsRef.current;
			},
			onClose: () => onCloseRef.current(),
		});
	}, [open]);
}
