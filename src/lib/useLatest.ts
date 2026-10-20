import { useRef } from "react";

/**
 * Ref tenue à la dernière valeur rendue : un handler différé (timer, écouteur
 * global, couche de la pile de renvoi) lit la version fraîche sans être recréé,
 * donc sans relancer l'effet qui l'a posé.
 */
export function useLatest<T>(value: T) {
	const ref = useRef(value);
	ref.current = value;
	return ref;
}
