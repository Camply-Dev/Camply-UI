import { IconButton } from "@camply/ui";
import { useState } from "react";
import { Icon } from "../icons";
import { highlight, type Lang } from "../lib/highlight";

interface CodeBlockProps {
	children: string;
	lang?: Lang;
	title?: string;
}

export function CodeBlock({ children, lang = "text", title }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);
	const code = children.replace(/\n+$/, "");
	const tokens = highlight(code, lang);

	const copy = () => {
		navigator.clipboard?.writeText(code);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1400);
	};

	return (
		<div className="cu-code">
			<div className="cu-code__bar">
				<span className="cu-code__lang">{lang}</span>
				{title && <span className="cu-code__title">{title}</span>}
				<IconButton
					label={copied ? "Copié" : "Copier"}
					variant="ghost"
					size="sm"
					className="cu-code__copy"
					onClick={copy}
				>
					<Icon name={copied ? "check" : "copy"} size={14} />
				</IconButton>
			</div>
			<pre className="cu-code__pre">
				<code>
					{tokens.map((t) => (
						<span key={`${t.start}:${t.type}`} className={`cu-tok cu-tok--${t.type}`}>
							{t.value}
						</span>
					))}
				</code>
			</pre>
		</div>
	);
}
