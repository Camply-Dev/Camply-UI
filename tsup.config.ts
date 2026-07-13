import { readdirSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "tsup";
import { toSlug } from "./scripts/package-exports";

// Un point d'entrée par composant, nommé par son slug. La règle de slug (toSlug)
// est partagée avec scripts/package-exports (qui bâtit package.json `exports`),
// pour que les `dist/<slug>.js` émis et les `exports` publiés ne divergent jamais.
// Le scan reste relatif au cwd (racine du repo au moment du build) — tsup bundle
// ce fichier, on évite donc toute résolution de chemin par import.meta.
function getComponentEntries(): Record<string, string> {
	const entries: Record<string, string> = {};
	for (const name of readdirSync("src/components")) {
		entries[toSlug(name)] = join("src/components", name, "index.ts");
	}
	return entries;
}

export default defineConfig({
	entry: getComponentEntries(),
	format: ["esm"],
	dts: true,
	minify: true,
	sourcemap: false,
	clean: true,
	external: ["react", "react-dom"],
	treeshake: true,
	esbuildOptions(options) {
		options.loader = { ...options.loader, ".css": "css" };
	},
});
