export function formatFileSize(bytes: number): string {
	if (bytes < 1024) return `${bytes} o`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
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
