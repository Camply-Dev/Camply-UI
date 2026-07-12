import {
	forwardRef,
	type HTMLAttributes,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { Check, Copy } from "../../lib/icons";
import { IconButton } from "../IconButton";

export interface SnippetProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
	/** the text to display and copy */
	children: string;
	/** show a shell-style prompt symbol before the text */
	prompt?: boolean;
	/** wrap long content instead of scrolling */
	wrap?: boolean;
	/** override what gets copied (defaults to children) */
	copyText?: string;
	label?: ReactNode;
}

/** Inline/block code with a one-click copy button. */
export const Snippet = forwardRef<HTMLDivElement, SnippetProps>(
	({ children, prompt = false, wrap = false, copyText, label, className, ...props }, ref) => {
		const [copied, setCopied] = useState(false);
		const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

		// Évite un setState après démontage si on part avant la fin des 1400 ms.
		useEffect(() => () => clearTimeout(timer.current), []);

		const copy = async () => {
			try {
				await navigator.clipboard?.writeText(copyText ?? children);
				setCopied(true);
				clearTimeout(timer.current);
				timer.current = setTimeout(() => setCopied(false), 1400);
			} catch {
				/* clipboard unavailable */
			}
		};

		return (
			<div ref={ref} className={cn("camply-snippet__root", className)} {...props}>
				{label && <span className={"camply-snippet__label"}>{label}</span>}
				<div className={"camply-snippet__bar"}>
					<code className={cn("camply-snippet__code", wrap && "camply-snippet__wrap")}>
						{prompt && <span className={"camply-snippet__prompt"}>$</span>}
						{children}
					</code>
					<IconButton label={copied ? "Copié" : "Copier"} variant="ghost" size="sm" onClick={copy}>
						{copied ? <Check size={15} /> : <Copy size={15} />}
					</IconButton>
				</div>
			</div>
		);
	},
);

Snippet.displayName = "Snippet";
