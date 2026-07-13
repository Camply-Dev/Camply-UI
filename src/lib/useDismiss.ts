import { type RefObject, useEffect, useRef } from "react";

export function useDismiss(
	open: boolean,
	onClose: () => void,
	refs: Array<RefObject<HTMLElement | null>>,
) {
	const refsRef = useRef(refs);
	refsRef.current = refs;

	useEffect(() => {
		if (!open) return;

		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		const onPointer = (e: PointerEvent) => {
			const target = e.target as Node;
			const inside = refsRef.current.some((r) => r.current?.contains(target));
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
