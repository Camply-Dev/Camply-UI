import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Check, Copy } from "../../lib/icons";
import { useCopyFeedback } from "../../lib/useCopyFeedback";
import { IconButton } from "../IconButton";

export interface SnippetProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
	children: string;
	prompt?: boolean;
	wrap?: boolean;
	copyText?: string;
	label?: ReactNode;
	copyLabel?: string;
	copiedLabel?: string;
}

export const Snippet = forwardRef<HTMLDivElement, SnippetProps>(
	(
		{
			children,
			prompt = false,
			wrap = false,
			copyText,
			label,
			copyLabel = "Copier",
			copiedLabel = "Copié",
			className,
			...props
		},
		ref,
	) => {
		const { copied, copy } = useCopyFeedback();

		return (
			<div ref={ref} className={cn("camply-snippet__root", className)} {...props}>
				{label && <span className={"camply-snippet__label"}>{label}</span>}
				<div className={"camply-snippet__bar"}>
					<code className={cn("camply-snippet__code", wrap && "camply-snippet__wrap")}>
						{prompt && (
							<span aria-hidden="true" className={"camply-snippet__prompt"}>
								$
							</span>
						)}
						{children}
					</code>
					<IconButton
						label={copied ? copiedLabel : copyLabel}
						variant="ghost"
						size="sm"
						onClick={() => copy(copyText ?? children)}
					>
						{copied ? <Check size={15} /> : <Copy size={15} />}
					</IconButton>
				</div>
			</div>
		);
	},
);

Snippet.displayName = "Snippet";
