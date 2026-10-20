import type { CSSProperties, ReactNode, Ref } from "react";
import { cn } from "./cn";
import { Portal } from "./Portal";

interface ListboxProps {
	listRef: Ref<HTMLDivElement>;
	id: string;
	style?: CSSProperties;
	/** Classe propre au composant (`camply-select__list`…), après celles de la surface. */
	className?: string;
	multiselectable?: boolean;
	children: ReactNode;
}

/** Liste flottante, portalisée, des champs à liste (Select, MultiSelect, Combobox). */
export function Listbox({
	listRef,
	id,
	style,
	className,
	multiselectable,
	children,
}: ListboxProps) {
	return (
		<Portal>
			<div
				ref={listRef}
				id={id}
				role="listbox"
				// La liste ne prend jamais le focus : il reste sur le trigger ou l'input,
				// qui pilote l'option active par aria-activedescendant.
				tabIndex={-1}
				aria-multiselectable={multiselectable ? "true" : undefined}
				className={cn("camply-floating-surface camply-floating-list", className)}
				style={style}
			>
				{children}
			</div>
		</Portal>
	);
}

interface ListboxOptionProps {
	id: string;
	active?: boolean;
	selected?: boolean;
	/** Option désactivée : annoncée comme telle, ni survol ni sélection. */
	disabled?: boolean;
	/**
	 * Option annoncée désactivée mais encore survolable : MultiSelect arrivé à `max`
	 * bloque les options non cochées sans les retirer du parcours.
	 */
	blocked?: boolean;
	className?: string;
	/** Rend l'option active ; appelé au survol, sauf option désactivée. */
	onActivate: () => void;
	onClick?: () => void;
	children: ReactNode;
}

export function ListboxOption({
	id,
	active,
	selected,
	disabled,
	blocked,
	className,
	onActivate,
	onClick,
	children,
}: ListboxOptionProps) {
	const unavailable = disabled || blocked;
	return (
		// biome-ignore lint/a11y/useFocusableInteractive: les options ne prennent pas le focus — piloté par aria-activedescendant
		// biome-ignore lint/a11y/useKeyWithClickEvents: clavier géré au niveau du trigger ou de l'input
		<div
			id={id}
			role="option"
			aria-selected={selected}
			aria-disabled={unavailable || undefined}
			className={cn(
				"camply-listbox-option",
				active && "camply-listbox-option--active",
				unavailable && "camply-listbox-option--disabled",
				className,
			)}
			onMouseEnter={() => !disabled && onActivate()}
			// Le focus ne quitte jamais le champ : un aller-retour body → champ émettrait
			// un onBlur/onFocus parasite au clic, et dans une liste qui reste ouverte
			// (MultiSelect) les flèches ne piloteraient plus rien.
			onMouseDown={(e) => e.preventDefault()}
			onClick={onClick}
		>
			{children}
		</div>
	);
}
