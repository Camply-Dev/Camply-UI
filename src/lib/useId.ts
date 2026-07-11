import { useId as useReactId } from "react";

/** Id stable et unique pour l'accessibilité (label/htmlFor/aria-controls),
 *  préfixé pour rester lisible. S'appuie sur le useId natif de React
 *  (stable en SSR et sous StrictMode). */
export function useId(prefix: string): string {
	return `${prefix}-${useReactId()}`;
}
