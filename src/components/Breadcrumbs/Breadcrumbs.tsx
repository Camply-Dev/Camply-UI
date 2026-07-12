import { type CSSProperties, Fragment, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { ChevronRight } from "../../lib/icons";
export interface Crumb {
	label: ReactNode;
	href?: string;
	/** Navigation applicative (SPA) : rend le crumb cliquable sans URL. Ignoré sur le dernier crumb. */
	onClick?: () => void;
}

export interface BreadcrumbsProps {
	items: Crumb[];
	separator?: ReactNode;
	className?: string;
	style?: CSSProperties;
}

export function Breadcrumbs({ items, separator, className, style }: BreadcrumbsProps) {
	return (
		<nav
			aria-label="Fil d'Ariane"
			className={cn("camply-breadcrumbs__nav", className)}
			style={style}
		>
			<ol className={"camply-breadcrumbs__list"}>
				{items.map((item, i) => {
					const isLast = i === items.length - 1;
					// href ou label textuel comme clé ; repli positionnel pour les crumbs purement visuels
					const key = item.href ?? (typeof item.label === "string" ? item.label : i);
					return (
						<Fragment key={key}>
							<li className={"camply-breadcrumbs__crumb"}>
								{!isLast && item.href ? (
									<a href={item.href} className={"camply-breadcrumbs__link"}>
										{item.label}
									</a>
								) : !isLast && item.onClick ? (
									<button
										type="button"
										className={"camply-breadcrumbs__link camply-breadcrumbs__button"}
										onClick={item.onClick}
									>
										{item.label}
									</button>
								) : (
									<span
										className={isLast ? "camply-breadcrumbs__current" : "camply-breadcrumbs__link"}
										aria-current={isLast ? "page" : undefined}
									>
										{item.label}
									</span>
								)}
							</li>
							{!isLast && (
								<li className={"camply-breadcrumbs__sep"} aria-hidden="true">
									{separator ?? <ChevronRight size={14} />}
								</li>
							)}
						</Fragment>
					);
				})}
			</ol>
		</nav>
	);
}
