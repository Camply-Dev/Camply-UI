/** Utilitaires fichiers purs (FileUpload), testables sans DOM. */

/** Taille lisible : octets → "N o" / "N Ko" / "N.N Mo". */
export function formatFileSize(bytes: number): string {
	if (bytes < 1024) return `${bytes} o`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

/** Un fichier est-il accepté par la chaîne `accept` (ex. ".png,.pdf,image/*") ?
 *  Règle par extension (".png" → suffixe du nom) ou par type MIME avec wildcard. */
export function isFileAccepted(file: Pick<File, "name" | "type">, accept?: string): boolean {
	if (!accept) return true;
	const rules = accept.split(",").map((s) => s.trim());
	return rules.some((r) =>
		r.startsWith(".")
			? file.name.toLowerCase().endsWith(r.toLowerCase())
			: new RegExp(`^${r.replace("*", ".*")}$`).test(file.type),
	);
}
