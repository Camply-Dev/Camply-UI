import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

/** Clone l'élément déclencheur d'un overlay en lui injectant des props (ref,
 *  gestionnaires d'événements, aria-*). Regroupe en un seul endroit le cast un
 *  peu intimidant de cloneElement, réutilisé par DropdownMenu, Popover, Tooltip
 *  et HoverCard. */
export function cloneTrigger(trigger: ReactElement, props: Record<string, unknown>): ReactNode {
	if (!isValidElement(trigger)) return trigger;
	return cloneElement(trigger as ReactElement<Record<string, unknown>>, props);
}
