export const DOTS = "…";

function range(start: number, end: number): number[] {
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function buildPages(
	current: number,
	total: number,
	siblings: number,
): (number | typeof DOTS)[] {
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
