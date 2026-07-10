import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { useId } from "../../lib/useControllable";
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	hint?: string;
	error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, hint, error, className, id, rows = 4, disabled, ...props }, ref) => {
		const autoId = useId("textarea");
		const areaId = id ?? autoId;
		const describedBy = error || hint ? `${areaId}-desc` : undefined;

		return (
			<div className={cn("camply-textarea__field", className)}>
				{label && (
					<label htmlFor={areaId} className={"camply-textarea__label"}>
						{label}
					</label>
				)}
				<textarea
					ref={ref}
					id={areaId}
					rows={rows}
					disabled={disabled}
					aria-invalid={error ? true : undefined}
					aria-describedby={describedBy}
					className={cn("camply-textarea__area", error && "camply-textarea__hasError")}
					{...props}
				/>
				{(error || hint) && (
					<span
						id={describedBy}
						className={cn("camply-textarea__desc", error && "camply-textarea__descError")}
					>
						{error || hint}
					</span>
				)}
			</div>
		);
	},
);

Textarea.displayName = "Textarea";
