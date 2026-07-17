import { cloneElement, isValidElement, type ReactElement, type ReactNode, type Ref } from "react";
import { mergeRefs } from "./mergeRefs";

type Props = Record<string, unknown>;
type Handler = (...args: unknown[]) => void;

/** Appelle d'abord le handler du consommateur, puis le nôtre. */
function chain(theirs: Handler, ours: Handler): Handler {
	return (...args) => {
		theirs(...args);
		ours(...args);
	};
}

/**
 * Clone l'élément déclencheur d'un overlay en lui injectant nos props (ref,
 * handlers, aria-*). On COMPOSE au lieu d'écraser : la `ref` et les `onX` déjà
 * posés par le consommateur sur son trigger continuent de fonctionner.
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
			merged.ref = mergeRefs(existingRef, ours as Ref<unknown>);
			continue;
		}
		const theirs = existing[key];
		if (/^on[A-Z]/.test(key) && typeof theirs === "function" && typeof ours === "function") {
			merged[key] = chain(theirs as Handler, ours as Handler);
		}
	}

	return cloneElement(trigger as ReactElement<Props>, merged);
}
