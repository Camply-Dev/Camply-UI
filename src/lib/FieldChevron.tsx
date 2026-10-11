import { cn } from "./cn";
import { ChevronDown } from "./icons";

export interface FieldChevronProps {
	/** État du panneau associé : seul ce qui varie entre les champs est une prop. */
	open: boolean;
}

/**
 * Chevron d'ouverture des champs à panneau (Select, Combobox, MultiSelect,
 * ColorPicker compact) : une seule affordance partout (règle 6). Décoratif :
 * l'icône est `aria-hidden`, l'état est porté par l'`aria-expanded` du déclencheur.
 */
export function FieldChevron({ open }: FieldChevronProps) {
	return <ChevronDown size={16} className={cn("camply-chevron", open && "camply-chevron--open")} />;
}
