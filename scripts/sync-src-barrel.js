import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

const components = readdirSync(join(root, "src/components")).sort((a, b) => a.localeCompare(b));

// Le barrel n'importe AUCUN CSS : le CSS est découplé du graphe JS pour qu'importer
// un composant n'embarque pas les feuilles des 57 autres. Le consommateur importe
// une fois "@camply/ui/styles.css" (ou la feuille d'un composant précis).
const srcBarrel = `${components.map((name) => `export * from "./components/${name}";`).join("\n")}

// Provider global (textes + locale) — optionnel : sans lui, tout retombe en français.
export { CamplyProvider, useLabels, useLocale } from "./lib/i18n";
export type { CamplyLabels, CamplyProviderProps } from "./lib/i18n";
`;

writeFileSync(join(root, "src/index.ts"), srcBarrel);

// --- Map "exports" : racine + CSS + icônes + une entrée par composant ---
const pkgPath = join(root, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));

const exportsMap = {
	".": { types: "./dist/index.d.ts", import: "./dist/index.js" },
	"./styles.css": "./dist/styles.css",
	"./icons": { types: "./dist/lib/icons.d.ts", import: "./dist/lib/icons.js" },
};

for (const name of components) {
	// JS + types du composant seul (tree-shaking garanti, sans passer par le barrel)
	exportsMap[`./${name}`] = {
		types: `./dist/components/${name}/index.d.ts`,
		import: `./dist/components/${name}/index.js`,
	};
	// Feuille de style du composant seul, pour ceux qui veulent du CSS granulaire
	exportsMap[`./${name}/styles.css`] = `./dist/components/${name}/${name}.css`;
}

pkg.exports = exportsMap;
writeFileSync(pkgPath, `${JSON.stringify(pkg, null, "\t")}\n`);

console.log(
	`Synced src/index.ts + package.json exports (${components.length} components, ${Object.keys(exportsMap).length} entrées)`,
);
