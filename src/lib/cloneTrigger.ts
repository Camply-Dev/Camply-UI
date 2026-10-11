import { cloneElement, isValidElement, type ReactElement, type ReactNode, type Ref } from "react";
import { mergeRefs } from "./mergeRefs";

type Props = Record<string, unknown>;
type Handler = (...args: unknown[]) => void;

/**
 * Vrai si le premier argument est un évènement dont le consommateur a posé le
 * veto. Tous les handlers ne reçoivent pas un évènement : `defaultPrevented`
 * n'est lu que s'il est booléen, sinon un objet quelconque vaudrait veto.
 */
function isVetoed(arg: unknown): boolean {
	if (typeof arg !== "object" || arg === null) return false;
	const flag = (arg as { defaultPrevented?: unknown }).defaultPrevented;
	return typeof flag === "boolean" && flag;
}

/**
 * Appelle le handler du consommateur, puis le nôtre sauf veto (règle 4).
 *
 * Conséquence assumée : sur un `<a href="#">` dont l'onClick appelle
 * `preventDefault()` pour couper la navigation, la couche ne s'ouvre pas. Le
 * déclencheur doit alors être un `<button>`, ou l'ouverture pilotée par `open`.
 */
function chain(theirs: Handler, ours: Handler): Handler {
	return (...args) => {
		theirs(...args);
		if (isVetoed(args[0])) return;
		ours(...args);
	};
}

/**
 * Clone le déclencheur d'un overlay en lui injectant nos props (ref, handlers,
 * aria-*), composées avec sa `ref` et ses `onX` (voir `chain`).
 */
export function cloneTrigger(trigger: ReactElement, props: Props): ReactNode {
	if (!isValidElement(trigger)) return trigger;

	const existing = (trigger.props ?? {}) as Props;
	// React 19 : `ref` est une prop. React 18 : elle vit sur l'élément.
	const existingRef = (existing.ref ?? (trigger as unknown as { ref?: Ref<unknown> }).ref) as
		| Ref<unknown>
		| undefined;

	const merged: Props = { ...props };

	for (const [key, ours] of Object.entries(props)) {
		if (key === "ref") {
			// `merged` porte déjà la nôtre : on ne fusionne que s'il y en a une à
			// préserver, car `mergeRefs` rend une callback neuve à chaque rendu, que
			// React détacherait puis rattacherait à chaque fois.
			if (existingRef) merged.ref = mergeRefs(existingRef, ours as Ref<unknown>);
			continue;
		}
		const theirs = existing[key];
		if (/^on[A-Z]/.test(key) && typeof theirs === "function" && typeof ours === "function") {
			merged[key] = chain(theirs as Handler, ours as Handler);
		}
	}

	return cloneElement(trigger as ReactElement<Props>, merged);
}
