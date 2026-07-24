import type { CSSProperties, ReactNode } from "react";
import { cn } from "./cn";
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
				<label id={labelId} htmlFor={controlId} className={"camply-field__label"}>
					{label}
					{required && (
						<span aria-hidden="true" className={"camply-field__required"}>
							*
						</span>
					)}
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
