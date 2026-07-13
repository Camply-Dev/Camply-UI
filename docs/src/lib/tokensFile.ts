/**
 * Injecte les valeurs surchargées dans le tokens.css brut (remplace la valeur de
 * chaque variable présente dans `overrides`). Pur : testable sans déclencher de
 * téléchargement.
 */
export function buildTokensCss(rawCss: string, overrides: Record<string, string>): string {
	let out = rawCss;
	for (const [name, value] of Object.entries(overrides)) {
		out = out.replace(new RegExp(`(${name}\\s*:\\s*)([^;]+)(;)`), `$1${value}$3`);
	}
	return out;
}
