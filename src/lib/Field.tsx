import type { CSSProperties, ReactNode } from "react";
import { cn } from "./cn";
import { useId } from "./useId";

interface FieldRenderProps {
	/** id à poser sur le contrôle (lié au <label htmlFor>) */
	id: string;
	/** valeur d'aria-describedby (undefined s'il n'y a ni hint ni erreur) */
	describedBy: string | undefined;
	/** valeur d'aria-invalid (true si erreur, sinon undefined) */
	invalid: true | undefined;
}

export interface FieldProps {
	label?: string;
	hint?: string;
	/** message d'erreur — prioritaire sur hint, colore le texte d'aide */
	error?: string;
	/** id explicite du contrôle (sinon généré) */
	id?: string;
	/** préfixe de l'id auto-généré */
	idPrefix?: string;
	className?: string;
	style?: CSSProperties;
	children: (props: FieldRenderProps) => ReactNode;
}

/**
 * Ossature d'un champ de formulaire : libellé + texte d'aide/erreur + câblage
 * ARIA (htmlFor / id / aria-describedby / aria-invalid). Le contrôle lui-même est
 * rendu par la fonction enfant, qui reçoit l'id, le describedBy et l'état invalide
 * à appliquer — ce qui préserve la structure propre de chaque contrôle. Partagé
 * par Input, Textarea et NumberInput.
 */
export function Field({
	label,
	hint,
	error,
	id,
	idPrefix = "field",
	className,
	style,
	children,
}: FieldProps) {
	const autoId = useId(idPrefix);
	const controlId = id ?? autoId;
	const describedBy = error || hint ? `${controlId}-desc` : undefined;
	const invalid = error ? (true as const) : undefined;

	return (
		<div className={cn("camply-field", className)} style={style}>
			{label && (
				<label htmlFor={controlId} className={"camply-field__label"}>
					{label}
				</label>
			)}
			{children({ id: controlId, describedBy, invalid })}
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
