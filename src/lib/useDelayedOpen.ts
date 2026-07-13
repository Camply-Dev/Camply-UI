import { useRef, useState } from "react";

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
