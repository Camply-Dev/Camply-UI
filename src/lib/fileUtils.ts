export function formatFileSize(bytes: number): string {
	if (bytes < 1024) return `${bytes} o`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function isFileAccepted(file: Pick<File, "name" | "type">, accept?: string): boolean {
	if (!accept) return true;
	const rules = accept.split(",").map((s) => s.trim());
	return rules.some((r) =>
		r.startsWith(".")
			? file.name.toLowerCase().endsWith(r.toLowerCase())
			: new RegExp(`^${r.replace("*", ".*")}$`).test(file.type),
	);
}
