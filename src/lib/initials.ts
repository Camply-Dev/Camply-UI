/** Dérivation d'initiales et hash de chaîne déterministe (purs, testables). */

/** Initiales d'un nom : vide → "?", un seul mot → 2 premières lettres, sinon
 *  première + dernière initiale (en majuscules). */
export function deriveInitials(name?: string): string {
	if (!name) return "?";
	const parts = name.trim().split(/\s+/);
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Hash déterministe d'une chaîne (h·31 + charCode) — sert à piocher une couleur
 *  stable par nom. */
export function hashString(seed: string): number {
	let h = 0;
	for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
	return h;
}
