import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type ReactElement,
	type ReactNode,
} from "react";
import { cloneTrigger } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { useMergedRefs } from "../../lib/mergeRefs";
import { Portal } from "../../lib/Portal";
import type { Placement } from "../../lib/useAnchor";
import { useClickDisclosure } from "../../lib/useClickDisclosure";
import type { Controllable } from "../../lib/useControllable";

export interface PopoverProps extends ComponentPropsWithoutRef<"div">, Controllable {
	trigger: ReactElement;
	children: ReactNode;
	placement?: Placement;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
	(
		{
			trigger,
			children,
			placement = "bottom-start",
			open: openProp,
			defaultOpen,
			onOpenChange,
			className,
			style: styleProp,
			...rest
		},
		ref,
	) => {
		const { open, floatRef, style, triggerProps } = useClickDisclosure({
			placement,
			minHeight: 140,
			open: openProp,
			defaultOpen,
			onOpenChange,
		});

		// Le panneau est à la fois notre ancrage interne et la ref publique.
		const setPanelRef = useMergedRefs(floatRef, ref);

		return (
			<>
				{cloneTrigger(trigger, triggerProps)}
				{open && (
					<Portal>
						<div
							{...rest}
							ref={setPanelRef}
							className={cn("camply-floating-surface", "camply-popover__panel", className)}
							style={{ ...style, ...styleProp }}
						>
							{children}
						</div>
					</Portal>
				)}
			</>
		);
	},
);

Popover.displayName = "Popover";
