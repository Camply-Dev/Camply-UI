import { useRef, useState } from "react";

/** État ouvert/fermé piloté au survol, avec délais (Tooltip, HoverCard).
 *  `show()` ouvre après `openDelay` ms ; `hide()` ferme après `closeDelay` ms
 *  (ou immédiatement si `closeDelay` vaut 0). */
export function useDelayedOpen(openDelay: number, closeDelay = 0) {
	const [open, setOpen] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const show = () => {
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setOpen(true), openDelay);
	};
	const hide = () => {
		clearTimeout(timer.current);
		if (closeDelay > 0) timer.current = setTimeout(() => setOpen(false), closeDelay);
		else setOpen(false);
	};

	return { open, show, hide };
}
