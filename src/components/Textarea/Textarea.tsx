import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Field } from "../../lib/Field";
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	hint?: string;
	error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, hint, error, className, id, rows = 4, disabled, required, ...props }, ref) => {
		return (
			<Field
				label={label}
				hint={hint}
				error={error}
				required={required}
				id={id}
				idPrefix="textarea"
				className={className}
			>
				{({ id: areaId, describedBy, invalid, required: isRequired }) => (
					<textarea
						ref={ref}
						id={areaId}
						rows={rows}
						disabled={disabled}
						required={isRequired}
						aria-invalid={invalid}
						aria-describedby={describedBy}
						className={cn(
							"camply-field-block",
							error && "camply-field-block--error",
							"camply-textarea__area",
						)}
						{...props}
					/>
				)}
			</Field>
		);
	},
);

Textarea.displayName = "Textarea";
