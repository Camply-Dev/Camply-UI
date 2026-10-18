import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface DescriptionItem {
	term: ReactNode;
	description: ReactNode;
}

export interface DescriptionListProps extends Omit<HTMLAttributes<HTMLDListElement>, "children"> {
	items: DescriptionItem[];
	/**
	 * `row` (défaut) : libellé et valeur côte à côte, le libellé sur un tiers.
	 * `stacked` : la valeur sous son libellé. `split` : le libellé prend la place, la
	 * valeur se range à droite en chiffres alignés — des montants, un total.
	 */
	layout?: "row" | "stacked" | "split";
	divided?: boolean;
}

export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
	({ items, layout = "row", divided = true, className, ...props }, ref) => {
		return (
			<dl
				ref={ref}
				className={cn(
					"camply-descriptionlist__list",
					// `layout-` : sans lui, `row` donnait à la liste la classe de ses lignes.
					`camply-descriptionlist__layout-${layout}`,
					divided && "camply-descriptionlist__divided",
					className,
				)}
				{...props}
			>
				{items.map((item, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: paires clé/valeur déclaratives — la position est l'identité
						key={i}
						className="camply-descriptionlist__row"
					>
						<dt className="camply-descriptionlist__term">{item.term}</dt>
						<dd className="camply-descriptionlist__desc">{item.description}</dd>
					</div>
				))}
			</dl>
		);
	},
);

DescriptionList.displayName = "DescriptionList";
