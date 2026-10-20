import { type PointerEvent, useRef } from "react";

/**
 * Glisser au pointeur (Slider, RangeSlider, ColorPicker). `start` capture le
 * pointeur sur l'élément pressé : les mouvements le suivent hors de la piste,
 * sans listener sur `window`. `handlers` se pose sur cet élément ou l'un de ses
 * ancêtres ; `onMove(e, key)` reçoit chaque mouvement avec la clé passée à
 * `start` (la poignée, la surface).
 *
 * Le glisser finit au relâché, mais aussi à `pointercancel` — sur tactile le
 * navigateur reprend le pointeur (défilement, appui long) sans jamais émettre
 * `pointerup` — et à la perte de capture. Un second doigt remplace le premier,
 * dont les mouvements sont dès lors ignorés.
 */
export function usePointerDrag<K = void>(onMove: (e: PointerEvent, key: K) => void) {
	const drag = useRef<{ pointerId: number; key: K; el: Element } | null>(null);
	const onMoveRef = useRef(onMove);
	onMoveRef.current = onMove;

	const end = (e: PointerEvent) => {
		if (drag.current?.pointerId === e.pointerId) drag.current = null;
	};

	return {
		start(e: PointerEvent, key: K) {
			const el = e.target as Element;
			// Absent de jsdom.
			el.setPointerCapture?.(e.pointerId);
			drag.current = { pointerId: e.pointerId, key, el };
		},
		/**
		 * Un glisser est en cours. Faux dès que l'élément pressé quitte le DOM (panneau
		 * refermé pendant le glisser) : son `pointerup` ne nous parviendrait plus.
		 */
		dragging: () => Boolean(drag.current?.el.isConnected),
		handlers: {
			onPointerMove(e: PointerEvent) {
				const d = drag.current;
				if (d && d.pointerId === e.pointerId) onMoveRef.current(e, d.key);
			},
			onPointerUp: end,
			onPointerCancel: end,
			onLostPointerCapture: end,
		},
	};
}
