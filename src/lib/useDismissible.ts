import { useState } from "react";

export function useDismissible(onDismiss?: () => void): { open: boolean; dismiss: () => void } {
	const [open, setOpen] = useState(true);
	const dismiss = () => {
		setOpen(false);
		onDismiss?.();
	};
	return { open, dismiss };
}
