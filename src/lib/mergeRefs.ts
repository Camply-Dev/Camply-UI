import { type Ref, useCallback, useRef } from "react";

function assign<T>(ref: Ref<T> | undefined, value: T | null) {
	if (typeof ref === "function") ref(value);
	else if (ref) (ref as { current: T | null }).current = value;
}

/** Branche plusieurs refs sur un même nœud (callback ou objet, indifféremment). */
export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
	return (value: T | null) => {
		for (const ref of refs) assign(ref, value);
	};
}

/**
 * Version hook de `mergeRefs`, pour le cas courant « j'ai besoin du nœud en
 * interne ET je dois honorer la ref que le parent m'a transmise ».
 */
export function useMergedRefs<T>(...refs: Array<Ref<T> | undefined>) {
	// Les refs sont lues au moment de l'appel, pas capturées : la callback rendue
	// garde une identité stable, sinon React la rappellerait avec `null` à chaque
	// rendu (détachement/rattachement du nœud à chaque fois).
	const latest = useRef(refs);
	latest.current = refs;

	return useCallback((value: T | null) => {
		for (const ref of latest.current) assign(ref, value);
	}, []);
}
