import type { CSSProperties } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { ChevronLeft, ChevronRight } from "../../lib/icons";
import { useControllable } from "../../lib/useControllable";
export interface PaginationProps {
	total: number;
	page?: number;
	defaultPage?: number;
	onChange?: (page: number) => void;
	/** how many page buttons to show around the current one */
	siblings?: number;
	className?: string;
	style?: CSSProperties;
}

const DOTS = "…";

function range(start: number, end: number): number[] {
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function buildPages(current: number, total: number, siblings: number): (number | typeof DOTS)[] {
	const totalNumbers = siblings * 2 + 5;
	if (totalNumbers >= total) return range(1, total);

	const leftSibling = Math.max(current - siblings, 1);
	const rightSibling = Math.min(current + siblings, total);
	const showLeftDots = leftSibling > 2;
	const showRightDots = rightSibling < total - 1;

	if (!showLeftDots && showRightDots) {
		return [...range(1, 3 + siblings * 2), DOTS, total];
	}
	if (showLeftDots && !showRightDots) {
		return [1, DOTS, ...range(total - (2 + siblings * 2), total)];
	}
	return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, total];
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
				className={"camply-pagination__arrow"}
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
						className={cn("camply-pagination__page", p === current && "camply-pagination__active")}
						aria-current={p === current ? "page" : undefined}
						onClick={() => go(p)}
					>
						{p}
					</button>
				),
			)}
			<button
				type="button"
				className={"camply-pagination__arrow"}
				aria-label="Page suivante"
				disabled={current === total}
				onClick={() => go(current + 1)}
			>
				<ChevronRight size={15} />
			</button>
		</nav>
	);
}
