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
