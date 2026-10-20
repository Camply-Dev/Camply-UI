import type { CSSProperties, ReactNode } from "react";
import { cn } from "./cn";
import type { Size } from "./types";
import { useId } from "./useId";

interface FieldRenderProps {
	/** id à poser sur le contrôle (input, ou trigger d'un widget custom). */
	id: string;
	/** id du <label> — pour un widget non-input : aria-labelledby={labelId}. */
	labelId: string | undefined;
	describedBy: string | undefined;
	invalid: true | undefined;
	required: boolean | undefined;
}

export interface FieldProps {
	label?: string;
	hint?: string;
	error?: string;
	/** marque le champ obligatoire (astérisque + required/aria-required). */
	required?: boolean;
	id?: string;
	idPrefix?: string;
	className?: string;
	style?: CSSProperties;
	children: (props: FieldRenderProps) => ReactNode;
}

/**
 * Compose une liste d'IDREF (`aria-describedby`, `aria-labelledby`) : celui du
 * champ ET celui du consommateur (règle 4). Le `|| undefined` évite d'émettre
 * `aria-describedby=""`, un aria-* qui pointe dans le vide (règle 8).
 */
export function idRefs(...ids: Array<string | false | null | undefined>): string | undefined {
	return cn(...ids) || undefined;
}

interface FieldShellState {
	size?: Size;
	/** `wrap` : hauteur libre, contenu sur plusieurs lignes ; `flush` : ni marge ni écart. */
	layout?: "wrap" | "flush";
	error?: string;
	open?: boolean;
	/**
	 * Pour une coque que `:disabled` ne couvre pas (un <div>) : le trigger <button>
	 * de Select ou MultiSelect n'en a pas besoin.
	 */
	disabled?: boolean;
}

/**
 * Classes de la coque de champ (`.camply-field-shell`, tokens.css) : bordure,
 * hauteur et états communs aux champs texte et aux déclencheurs de liste.
 */
export function fieldShell({ size, layout, error, open, disabled }: FieldShellState): string {
	return cn(
		"camply-field-shell",
		size && `camply-field-shell--${size}`,
		layout && `camply-field-shell--${layout}`,
		error && "camply-field-shell--error",
		open && "camply-field-shell--open",
		disabled && "camply-field-shell--disabled",
	);
}

/**
 * Astérisque « champ obligatoire », pour les contrôles qui composent eux-mêmes
 * leur libellé : une seule source garantit qu'elle reste décorative (aria-hidden,
 * l'obligation est portée par `required`/`aria-required`) et stylée pareil partout.
 */
export function RequiredMark() {
	return (
		<span aria-hidden="true" className="camply-field__required">
			*
		</span>
	);
}

/**
 * Enveloppe label / aide / erreur, partagée par tous les champs.
 * `labelId` permet aux widgets qui ne sont PAS un <input> (Select, DatePicker,
 * ColorPicker…) d'être nommés via aria-labelledby, faute de pouvoir s'appuyer
 * sur htmlFor.
 */
export function Field({
	label,
	hint,
	error,
	required,
	id,
	idPrefix = "field",
	className,
	style,
	children,
}: FieldProps) {
	const autoId = useId(idPrefix);
	const controlId = id ?? autoId;
	const labelId = label ? `${controlId}-label` : undefined;
	const describedBy = error || hint ? `${controlId}-desc` : undefined;
	const invalid = error ? (true as const) : undefined;

	return (
		<div className={cn("camply-field", className)} style={style}>
			{label && (
				<label id={labelId} htmlFor={controlId} className="camply-field__label">
					{label}
					{required && <RequiredMark />}
				</label>
			)}
			{children({
				id: controlId,
				labelId,
				describedBy,
				invalid,
				required: required || undefined,
			})}
			{(error || hint) && (
				<span
					id={describedBy}
					className={cn("camply-field__desc", error && "camply-field__desc--error")}
				>
					{error || hint}
				</span>
			)}
		</div>
	);
}
