/**
 * Taille lisible. Les appelants passent les unités des libellés
 * (`CamplyLabels.fileSizeUnits`) pour qu'un consommateur anglophone obtienne
 * « 1.2 MB » et non « 1.2 Mo » ; le défaut français ne sert qu'à l'appel direct.
 *
 * Le type exige au moins une unité : une liste vide afficherait « 1024 undefined »,
 * et c'est `tsc` qui l'interdit plutôt qu'un repli invisible à l'exécution.
 */
export function formatFileSize(
	bytes: number,
	units: readonly [string, ...string[]] = ["o", "Ko", "Mo", "Go", "To"],
): string {
	const last = units.length - 1;
	let value = Math.max(0, bytes);
	let rank = 0;
	while (value >= 1024 && rank < last) {
		value /= 1024;
		rank++;
	}
	// Octets et kilo-octets se lisent en entier ; au-delà, une décimale suffit.
	return `${value.toFixed(rank <= 1 ? 0 : 1)} ${units[rank]}`;
}

/**
 * Implémente les 3 formes autorisées par l'attribut HTML `accept`, en simple
 * comparaison de chaînes : `.ext`, `type/*` et `type/subtype`.
 * (Aucune RegExp : un `accept` fourni par l'utilisateur peut contenir `+`, `(`…
 * qui ferait planter une RegExp construite à la volée.)
 */
export function isFileAccepted(file: Pick<File, "name" | "type">, accept?: string): boolean {
	if (!accept) return true;

	const name = file.name.toLowerCase();
	const type = file.type.toLowerCase();

	return accept
		.split(",")
		.map((rule) => rule.trim().toLowerCase())
		.filter(Boolean)
		.some((rule) => {
			if (rule.startsWith(".")) return name.endsWith(rule);
			if (rule.endsWith("/*")) return type.startsWith(`${rule.slice(0, -1)}`);
			return type === rule;
		});
}
