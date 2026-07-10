import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";
export interface DescriptionItem {
	term: ReactNode;
	description: ReactNode;
}

export interface DescriptionListProps {
	items: DescriptionItem[];
	/** side-by-side (default) or stacked term-over-description */
	layout?: "row" | "stacked";
	/** draw a divider between rows */
	divided?: boolean;
	className?: string;
	style?: CSSProperties;
}

/** Key/value pairs for detail panels, profiles and summaries. */
export function DescriptionList({
	items,
	layout = "row",
	divided = true,
	className,
	style,
}: DescriptionListProps) {
	return (
		<dl
			className={cn(
				"camply-descriptionlist__list",
				`camply-descriptionlist__${layout}`,
				divided && "camply-descriptionlist__divided",
				className,
			)}
			style={style}
		>
			{items.map((item, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: paires clé/valeur déclaratives — la position est l'identité
					key={i}
					className={"camply-descriptionlist__row"}
				>
					<dt className={"camply-descriptionlist__term"}>{item.term}</dt>
					<dd className={"camply-descriptionlist__desc"}>{item.description}</dd>
				</div>
			))}
		</dl>
	);
}
