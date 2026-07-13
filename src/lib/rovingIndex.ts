export type Orientation = "horizontal" | "vertical";

export function wrapIndex(value: number, length: number): number {
	return ((value % length) + length) % length;
}

export function nextRovingIndex(
	key: string,
	current: number,
	count: number,
	orientation: Orientation = "horizontal",
): number | null {
	const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
	const prevKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
	if (key === nextKey) return wrapIndex(current + 1, count);
	if (key === prevKey) return wrapIndex(current - 1, count);
	if (key === "Home") return 0;
	if (key === "End") return count - 1;
	return null;
}
