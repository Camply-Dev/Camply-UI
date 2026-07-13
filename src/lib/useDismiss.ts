import { type RefObject, useEffect } from "react";

export function useDismiss(
	open: boolean,
	onClose: () => void,
	refs: Array<RefObject<HTMLElement | null>>,
) {
	// biome-ignore lint/correctness/useExhaustiveDependencies: refs sont des RefObject stables ; on ne re-souscrit volontairement que sur open/onClose
	useEffect(() => {
		if (!open) return;

		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		const onPointer = (e: PointerEvent) => {
			const target = e.target as Node;
			const inside = refs.some((r) => r.current?.contains(target));
			if (!inside) onClose();
		};

		document.addEventListener("keydown", onKey);
		document.addEventListener("pointerdown", onPointer, true);
		return () => {
			document.removeEventListener("keydown", onKey);
			document.removeEventListener("pointerdown", onPointer, true);
		};
	}, [open, onClose]);
}
