/** Vocabulaire partagé par toute la librairie (règle 1). */

/** Échelle de taille commune aux champs et aux contrôles. */
export type Size = "sm" | "md" | "lg";

/**
 * Palette sémantique de la librairie. `warn`, jamais `warning` : un seul mot
 * pour un seul ton. Chaque composant en DÉRIVE le sous-ensemble pour lequel il a
 * du CSS (`Extract<Tone, "info" | "danger">`).
 */
export type Tone = "accent" | "neutral" | "success" | "warn" | "danger" | "info";

/**
 * Niveau d'un titre rendu par la lib (`<h2>` à `<h6>`), à caler sur le plan de la
 * page : le `<h1>` reste celui de la page, jamais celui d'un composant.
 */
export type HeadingLevel = 2 | 3 | 4 | 5 | 6;

/** Entrée d'une liste de choix (Select, Combobox, MultiSelect…). */
export interface Option<T extends string = string> {
	value: T;
	label: string;
	disabled?: boolean;
}
