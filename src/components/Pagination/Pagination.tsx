import type { CSSProperties } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { ChevronLeft, ChevronRight } from "../../lib/icons";
import { buildPages, DOTS } from "../../lib/paginationRange";
import { useControllable } from "../../lib/useControllable";
export interface PaginationProps {
	total: number;
	page?: number;
	defaultPage?: number;
	onChange?: (page: number) => void;
	siblings?: number;
	className?: string;
	style?: CSSProperties;
}

export function Pagination({
	total,
	page,
	defaultPage = 1,
	onChange,
	siblings = 1,
	className,
	style,
}: PaginationProps) {
	const [current, setCurrent] = useControllable<number>(page, defaultPage, onChange);
	const go = (p: number) => setCurrent(clamp(p, 1, total));
	const pages = buildPages(current, total, siblings);

	return (
		<nav aria-label="Pagination" className={cn("camply-pagination__nav", className)} style={style}>
			<button
				type="button"
				className={"camply-pagination__arrow camply-focus-ring"}
				aria-label="Page précédente"
				disabled={current === 1}
				onClick={() => go(current - 1)}
			>
				<ChevronLeft size={15} />
			</button>
			{pages.map((p, i) =>
				p === DOTS ? (
					// biome-ignore lint/suspicious/noArrayIndexKey: séparateurs "…" à position fixe — l'index EST l'identité
					<span key={`dots-${i}`} className={"camply-pagination__dots"}>
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
				aria-label="Page suivante"
				disabled={current === total}
				onClick={() => go(current + 1)}
			>
				<ChevronRight size={15} />
			</button>
		</nav>
	);
}
