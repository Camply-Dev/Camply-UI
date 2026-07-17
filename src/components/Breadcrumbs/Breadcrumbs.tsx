import { Fragment, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useLabels } from "../../lib/i18n";
import { ChevronRight } from "../../lib/icons";

export interface Crumb {
	label: ReactNode;
	href?: string;
	onClick?: () => void;
}

export interface BreadcrumbsProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
	items: Crumb[];
	separator?: ReactNode;
}

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
	({ items, separator, className, ...props }, ref) => {
		const labels = useLabels();

		return (
			<nav
				ref={ref}
				aria-label={labels.breadcrumb}
				className={cn("camply-breadcrumbs__nav", className)}
				{...props}
			>
				<ol className={"camply-breadcrumbs__list"}>
					{items.map((item, i) => {
						const isLast = i === items.length - 1;
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
											className={
												isLast ? "camply-breadcrumbs__current" : "camply-breadcrumbs__link"
											}
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
	},
);

Breadcrumbs.displayName = "Breadcrumbs";
