import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Field, idRefs } from "../../lib/Field";
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	hint?: string;
	error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{
			label,
			hint,
			error,
			className,
			style,
			id,
			rows = 4,
			disabled,
			required,
			"aria-describedby": ariaDescribedBy,
			"aria-invalid": ariaInvalid,
			...props
		},
		ref,
	) => {
		return (
			<Field
				label={label}
				hint={hint}
				error={error}
				required={required}
				id={id}
				idPrefix="textarea"
				className={className}
				style={style}
			>
				{({ id: areaId, describedBy, invalid, required: isRequired }) => (
					<textarea
						ref={ref}
						id={areaId}
						rows={rows}
						disabled={disabled}
						required={isRequired}
						className={cn(
							"camply-field-block",
							error && "camply-field-block--error",
							"camply-textarea__area",
						)}
						{...props}
						// Posés APRÈS le spread, mais composés : voir Input.
						aria-describedby={idRefs(describedBy, ariaDescribedBy)}
						aria-invalid={invalid ?? ariaInvalid}
					/>
				)}
			</Field>
		);
	},
);

Textarea.displayName = "Textarea";
