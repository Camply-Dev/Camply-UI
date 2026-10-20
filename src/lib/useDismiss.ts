import { type RefObject, useEffect } from "react";
import { pushDismissLayer } from "./dismissStack";
import { useLatest } from "./useLatest";

interface DismissOptions {
	/**
	 * Seule Échap referme : le clic extérieur reste l'affaire du voile d'un dialogue,
	 * ou de `mouseleave` pour une couche de survol (voir `DismissLayer.escapeOnly`).
	 */
	escapeOnly?: boolean;
}

/**
 * Ferme une couche flottante sur Échap ou clic extérieur.
 * S'appuie sur une pile partagée : Échap ne ferme QUE la couche du dessus, et un
 * clic dans une couche enfant (même portalisée) ne referme pas le parent.
 */
export function useDismiss(
	open: boolean,
	onClose: () => void,
	refs: Array<RefObject<HTMLElement | null>>,
	{ escapeOnly = false }: DismissOptions = {},
) {
	// Refs et callback lus au moment de l'événement : la couche reste stable.
	const refsRef = useLatest(refs);
	const onCloseRef = useLatest(onClose);

	useEffect(() => {
		if (!open) return;
		return pushDismissLayer({
			get refs() {
				return refsRef.current;
			},
			escapeOnly,
			onClose: () => onCloseRef.current(),
		});
	}, [open, escapeOnly]);
}
