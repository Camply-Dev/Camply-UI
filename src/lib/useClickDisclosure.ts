import { type MouseEvent, type ReactElement, useCallback, useRef, useState } from "react";
import { type Placement, useAnchor } from "./useAnchor";
import { useDismiss } from "./useDismiss";

interface ClickDisclosureOptions {
	placement?: Placement;
	minHeight?: number;
}

export function useClickDisclosure({
	placement = "bottom-start",
	minHeight,
}: ClickDisclosureOptions = {}) {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLElement>(null);
	const floatRef = useRef<HTMLDivElement>(null);

	const style = useAnchor(anchorRef, floatRef, open, {
		placement,
		gap: 8,
		constrainHeight: true,
		minHeight,
	});
	const close = useCallback(() => setOpen(false), []);
	useDismiss(open, close, [anchorRef, floatRef]);

	const triggerProps = (trigger: ReactElement, extra?: Record<string, unknown>) => ({
		ref: anchorRef,
		"aria-expanded": open,
		...extra,
		onClick: (e: MouseEvent) => {
			(trigger.props as { onClick?: (e: MouseEvent) => void }).onClick?.(e);
			setOpen((o) => !o);
		},
	});

	return { open, close, floatRef, style, triggerProps };
}
