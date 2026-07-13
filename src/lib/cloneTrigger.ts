import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

export function cloneTrigger(trigger: ReactElement, props: Record<string, unknown>): ReactNode {
	if (!isValidElement(trigger)) return trigger;
	return cloneElement(trigger as ReactElement<Record<string, unknown>>, props);
}
