import { useEffect, useRef } from "react";
import { useLatest } from "./useLatest";

export interface HiddenFieldProps {
	/** Absent = rien n'est rendu : le champ ne participe pas au formulaire. */
	name?: string;
	value: string | number;
	/**
	 * Un champ désactivé ne doit RIEN soumettre (sémantique HTML). Les widgets
	 * custom ne peuvent pas s'appuyer sur le `disabled` de leur trigger : la
	 * valeur part d'un input caché, c'est donc lui qu'il faut désactiver.
	 */
	disabled?: boolean;
}

/**
 * Valeur soumise par un `<form>` natif pour les widgets dont le contrôle visible
 * n'est pas un champ de formulaire (Select, DatePicker, Rating, Slider…).
 */
export function HiddenField({ name, value, disabled }: HiddenFieldProps) {
	if (!name) return null;
	return <input type="hidden" name={name} value={value} disabled={disabled} />;
}

/**
 * Remet un widget à sa valeur par défaut au `reset` du formulaire qui le contient,
 * comme un champ natif (`<button type="reset">`). Un champ caché SANS nom, qui ne
 * soumet rien, sert de point d'attache au formulaire : il existe même quand le
 * widget n'a aucune valeur à soumettre (une liste vide). `onReset` absent (widget
 * contrôlé : sa valeur appartient au parent) : rien n'est rendu.
 */
export function FormReset({ onReset }: { onReset?: () => void }) {
	const ref = useRef<HTMLInputElement>(null);
	const latest = useLatest(onReset);
	const active = Boolean(onReset);
	useEffect(() => {
		const form = active ? ref.current?.form : null;
		if (!form) return;
		const handler = () => latest.current?.();
		form.addEventListener("reset", handler);
		return () => form.removeEventListener("reset", handler);
	}, [active]);
	return active ? <input ref={ref} type="hidden" /> : null;
}
