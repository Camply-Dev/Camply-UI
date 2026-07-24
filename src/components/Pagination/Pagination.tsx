import { forwardRef, type HTMLAttributes } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { useLabels } from "../../lib/i18n";
import { ChevronLeft, ChevronRight } from "../../lib/icons";
import { buildPages, DOTS } from "../../lib/paginationRange";
import { useControllable } from "../../lib/useControllable";

/** `onChange` maison (numéro de page) : on retire le `onChange` DOM pour éviter le conflit. */
export interface PaginationProps
	extends Omit<HTMLAttributes<HTMLElement>, "onChange" | "children"> {
	total: number;
	page?: number;
	defaultPage?: number;
	onChange?: (page: number) => void;
	siblings?: number;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
	({ total, page, defaultPage = 1, onChange, siblings = 1, className, ...props }, ref) => {
		const labels = useLabels();
		const [current, setCurrent] = useControllable<number>(page, defaultPage, onChange);
		const go = (p: number) => setCurrent(clamp(p, 1, total));
		const pages = buildPages(current, total, siblings);

		return (
			<nav
				ref={ref}
				aria-label={labels.pagination}
				className={cn("camply-pagination__nav", className)}
				{...props}
			>
				<button
					type="button"
					className={"camply-pagination__arrow camply-focus-ring"}
					aria-label={labels.previousPage}
					disabled={current === 1}
					onClick={() => go(current - 1)}
				>
					<ChevronLeft size={15} />
				</button>
				{pages.map((p, i) =>
					p === DOTS ? (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: séparateurs "…" à position fixe — l'index EST l'identité
							key={`dots-${i}`}
							aria-hidden="true"
							className={"camply-pagination__dots"}
						>
							{DOTS}
						</span>
					) : (
						<button
							key={p}
							type="button"
							className={cn(
								"camply-pagination__page",
								"camply-focus-ring",
								p === current && "camply-pagination__active",
							)}
							aria-current={p === current ? "page" : undefined}
							onClick={() => go(p)}
						>
							{p}
						</button>
					),
				)}
				<button
					type="button"
					className={"camply-pagination__arrow camply-focus-ring"}
					aria-label={labels.nextPage}
					disabled={current === total}
					onClick={() => go(current + 1)}
				>
					<ChevronRight size={15} />
				</button>
			</nav>
		);
	},
);

Pagination.displayName = "Pagination";
