import { useId as useReactId } from "react";

export function useId(prefix: string): string {
	return `${prefix}-${useReactId()}`;
}
