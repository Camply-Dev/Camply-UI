import {
	Children,
	type CSSProperties,
	cloneElement,
	isValidElement,
	type MouseEvent,
	type ReactNode,
} from "react";
import { cloneTrigger } from "./cloneTrigger";
import { cn } from "./cn";

type Props = Record<string, unknown>;

export interface AsChildOptions {
	/** Nos classes : celles de l'enfant s'y ajoutent. */
	className: string;
	/** Construit le contenu final autour de celui de l'enfant (icônes, libellé…). */
	wrap: (content: ReactNode) => ReactNode;
	/** Désactivé : l'enfant reste focalisable mais n'agit plus (voir plus bas). */
	inert: boolean;
	/** Le reste des props du composant, `ref` comprise. */
	props: Props;
}

/**
 * `asChild` (Button, IconButton) : rend l'UNIQUE enfant — un `<a>`, le `Link`
 * d'un routeur — à la place de notre `<button>`, avec notre apparence. Classes et
 * styles s'additionnent ; handlers et ref se composent, ceux de l'enfant d'abord
 * (règle 4, via `cloneTrigger`).
 *
 * Un lien n'a pas d'attribut `disabled` : désactivé, l'enfant reçoit
 * `aria-disabled` et son clic est annulé AVANT tout handler, le sien compris —
 * sinon un `Link` désactivé naviguerait quand même.
 */
export function renderAsChild(
	children: ReactNode,
	{ className, wrap, inert, props }: AsChildOptions,
): ReactNode {
	const child = Children.only(children);
	if (!isValidElement<Props>(child)) {
		throw new Error("asChild attend un unique élément React (un <a>, un Link…)");
	}
	const theirs = child.props;
	const { style, onClick, ...ours } = props;

	const base = cloneElement(child, {
		className: cn(className, theirs.className as string | undefined),
		style:
			style || theirs.style
				? { ...(style as CSSProperties), ...(theirs.style as CSSProperties) }
				: undefined,
		children: wrap(theirs.children as ReactNode),
		...(inert && {
			"aria-disabled": true,
			onClick: (event: MouseEvent) => event.preventDefault(),
		}),
	});
	// Une prop absente ne doit pas effacer celle de l'enfant (`title={undefined}`…).
	const given = Object.fromEntries(
		Object.entries(inert ? ours : { ...ours, onClick }).filter(([, value]) => value !== undefined),
	);
	return cloneTrigger(base, given);
}
