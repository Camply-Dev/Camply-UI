import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { wrapIndex } from "./rovingIndex";
import { useAnchor } from "./useAnchor";
import { useDismiss } from "./useDismiss";
import { useId } from "./useId";

type OptionLike = { disabled?: boolean };

export const firstEnabledIndex = (options: OptionLike[]): number =>
	options.findIndex((o) => !o.disabled);
const lastEnabledIndex = (options: OptionLike[]): number => {
	for (let i = options.length - 1; i >= 0; i--) if (!options[i].disabled) return i;
	return -1;
};

/**
 * Ancrage commun aux trois champs à liste : juste sous le champ, aligné sur son
 * bord gauche, à sa largeur, écrêté par la hauteur du viewport.
 */
const ANCHOR = {
	placement: "bottom-start",
	gap: 6,
	matchWidth: true,
	constrainHeight: true,
} as const;

/**
 * Attributs que le contrat « combobox » se réserve sur le champ, calculés depuis
 * l'état interne (règle 3) : un `aria-expanded` fourni mentirait sur la liste.
 * `aria-required` en fait partie parce qu'il dérive de `required` (règle 1).
 *
 * `aria-labelledby`, `aria-describedby` et `aria-invalid` restent ouverts : les
 * champs les composent (règle 4), via `idRefs` et `invalid ?? ariaInvalid`, pour
 * qu'un validateur externe garde la main tant qu'aucune `error` n'est rendue.
 */
export type ReservedListboxAttr =
	| "role"
	| "aria-expanded"
	| "aria-haspopup"
	| "aria-controls"
	| "aria-activedescendant"
	| "aria-required";

interface ListboxFieldConfig<O extends OptionLike> {
	/** Préfixe de l'id de liste ; les ids d'options en dérivent. */
	idPrefix: string;
	/** Liste RÉELLEMENT rendue — Combobox y passe ses options filtrées. */
	items: O[];
	/** Les flèches bouclent (défaut) ou butent aux extrémités. */
	wrap?: boolean;
	/**
	 * Home/End déplacent l'option active. Faux quand le champ est un input : ces
	 * deux touches y appartiennent au caret.
	 */
	homeEnd?: boolean;
	/** Nettoyage joint à TOUTE fermeture — Combobox y vide sa recherche. */
	onClose?: () => void;
}

/**
 * Socle « champ + liste ancrée » de Select, Combobox et MultiSelect : état
 * d'ouverture, ancrage, renvoi (Échap / clic extérieur), navigation clavier et
 * identifiants ARIA. La sélection reste propre à chacun.
 */
export function useListboxField<E extends HTMLElement, O extends OptionLike>({
	idPrefix,
	items,
	wrap = true,
	homeEnd = true,
	onClose,
}: ListboxFieldConfig<O>) {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState(0);
	const anchorRef = useRef<E>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const listId = useId(idPrefix);
	const { style: floatStyle } = useAnchor(anchorRef, listRef, open, ANCHOR);

	// Lu au moment de la fermeture : `close` reste stable, donc la couche de renvoi aussi.
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;
	const close = useCallback(() => {
		setOpen(false);
		onCloseRef.current?.();
	}, []);
	useDismiss(open, close, [anchorRef, listRef]);

	const optionId = (index: number) => `${listId}-opt-${index}`;

	/** Option active suivante ou précédente, options désactivées sautées. */
	const moveActive = (dir: 1 | -1) => {
		setActive((prev) => {
			if (!wrap) {
				for (let next = prev + dir; next >= 0 && next < items.length; next += dir) {
					if (!items[next].disabled) return next;
				}
				return prev;
			}
			let next = prev;
			for (let i = 0; i < items.length; i++) {
				next = wrapIndex(next + dir, items.length);
				if (!items[next].disabled) break;
			}
			return next;
		});
	};

	// L'option active reste visible dans une liste qui défile.
	useEffect(() => {
		if (!open) return;
		const el = listRef.current?.children[active] as HTMLElement | undefined;
		el?.scrollIntoView({ block: "nearest" });
	}, [active, open]);

	/**
	 * Touches de navigation pure. Renvoie `true` si la touche est consommée, à
	 * charge de l'appelant de traiter ensuite ce qui lui est propre (validation,
	 * bascule, effacement…).
	 */
	const handleNavKey = (e: KeyboardEvent): boolean => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				moveActive(1);
				return true;
			case "ArrowUp":
				e.preventDefault();
				moveActive(-1);
				return true;
			case "Home":
			case "End": {
				if (!homeEnd) return false;
				e.preventDefault();
				const index = e.key === "Home" ? firstEnabledIndex(items) : lastEnabledIndex(items);
				// -1 si tout est désactivé : on ne vise que des index réels.
				if (index >= 0) setActive(index);
				return true;
			}
			// Pas de preventDefault : le focus doit bien partir au champ suivant.
			case "Tab":
				close();
				return true;
			default:
				return false;
		}
	};

	return {
		open,
		/** Ouverture seulement : toute fermeture passe par `close`, qui joint `onClose`. */
		setOpen,
		close,
		anchorRef,
		listRef,
		active,
		setActive,
		handleNavKey,
		optionId,
		/**
		 * Attributs ARIA pointant dans la liste : omis tant qu'elle n'est pas dans le
		 * DOM, sans quoi les IDREF pointeraient dans le vide (axe-core
		 * `aria-valid-attr-value`).
		 */
		aria: {
			"aria-controls": open ? listId : undefined,
			"aria-activedescendant": open && items[active] ? optionId(active) : undefined,
		},
		/** À étaler sur `<Listbox>`, qui ajoute la classe propre à chaque composant. */
		props: { listRef, id: listId, style: floatStyle },
	};
}
