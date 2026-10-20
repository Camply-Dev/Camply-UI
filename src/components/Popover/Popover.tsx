import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type ReactElement,
	type ReactNode,
	useEffect,
} from "react";
import { cloneTrigger, compose, markTriggerSlot } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { focusEdges } from "../../lib/focusTrap";
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
			onKeyDown,
			...rest
		},
		ref,
	) => {
		const { open, close, floatRef, style, triggerProps } = useClickDisclosure({
			placement,
			minHeight: 140,
			open: openProp,
			defaultOpen,
			onOpenChange,
		});

		// Le panneau est à la fois notre ancrage interne et la ref publique.
		const setPanelRef = useMergedRefs(floatRef, ref);

		// Portalisé en fin de page, le panneau serait hors d'atteinte au clavier : à
		// l'ouverture, le focus y entre (son premier focalisable, sinon lui-même).
		useEffect(() => {
			if (!open) return;
			const panel = floatRef.current;
			if (!panel || panel.contains(document.activeElement)) return;
			(focusEdges(panel).first ?? panel).focus();
		}, [open, floatRef]);

		/** Tab hors du panneau par l'un ou l'autre bout : il se referme, le focus revient au déclencheur. */
		const onPanelKeyDown = compose(onKeyDown, (e) => {
			const panel = floatRef.current;
			if (e.key !== "Tab" || !panel) return;
			const { first, last } = focusEdges(panel);
			const edge = e.shiftKey ? first : last;
			const active = document.activeElement;
			if (edge && active !== edge && active !== panel) return;
			e.preventDefault();
			close();
		});

		return (
			<>
				{cloneTrigger(trigger, triggerProps)}
				{open && (
					<Portal>
						{/* biome-ignore lint/a11y/noStaticElementInteractions: le Tab pressé sur un contrôle du panneau remonte ici (le panneau n'a le focus que s'il n'a rien de focalisable) ; son rôle reste au choix du consommateur, qui le nomme */}
						<div
							tabIndex={-1}
							{...rest}
							ref={setPanelRef}
							className={cn("camply-floating-surface", "camply-popover__panel", className)}
							style={{ ...style, ...styleProp }}
							onKeyDown={onPanelKeyDown}
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
markTriggerSlot(Popover, "trigger");
