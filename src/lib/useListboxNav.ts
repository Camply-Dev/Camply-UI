import { type RefObject, useEffect, useState } from "react";

/** Navigation clavier partagée d'une listbox (Select, MultiSelect, Combobox) :
 *  garde l'index de l'option active, le déplace en sautant les options
 *  désactivées, et fait défiler l'option active pour qu'elle reste visible. */
export function useListboxNav(
	listRef: RefObject<HTMLElement | null>,
	open: boolean,
	options: { disabled?: boolean }[],
) {
	const [active, setActive] = useState(0);

	// Déplace l'index actif d'un cran (en boucle), en sautant les désactivées.
	const moveActive = (dir: 1 | -1) => {
		setActive((prev) => {
			let next = prev;
			for (let i = 0; i < options.length; i++) {
				next = (next + dir + options.length) % options.length;
				if (!options[next].disabled) break;
			}
			return next;
		});
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: listRef est un RefObject stable
	useEffect(() => {
		if (!open) return;
		const el = listRef.current?.children[active] as HTMLElement | undefined;
		el?.scrollIntoView({ block: "nearest" });
	}, [active, open]);

	return { active, setActive, moveActive };
}
