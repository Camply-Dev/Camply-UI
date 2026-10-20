import { readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

const components = readdirSync(join(root, "src/components")).sort((a, b) => a.localeCompare(b));

// Le barrel n'importe AUCUN CSS : le CSS est découplé du graphe JS pour qu'importer
// un composant n'embarque pas les feuilles des 57 autres. Le consommateur importe
// une fois "@camply/ui/styles.css" (ou la feuille d'un composant précis).
// L'ordre ci-dessous est celui que produit l'assist `organizeImports` de biome :
// sans ça, `bun run sync` puis `bun run fix` ne convergent pas et la garde de
// fraîcheur en CI serait rouge en permanence.
// Les sous-chemins par composant (`@camply/ui/Button`, `@camply/ui/Button/styles.css`)
// ne se génèrent plus : deux motifs de la map `exports` (package.json) les couvrent
// tous, et `scripts/build.js` vérifie que chaque composant a les fichiers qu'ils visent.
const srcBarrel = `${components.map((name) => `export * from "./components/${name}";`).join("\n")}
export type { CamplyLabels, CamplyProviderProps } from "./lib/i18n";
// Provider global (textes + locale) — optionnel : sans lui, tout retombe en français.
export { CamplyProvider, useLabels, useLocale } from "./lib/i18n";
`;

writeFileSync(join(root, "src/index.ts"), srcBarrel);

console.log(`Synced src/index.ts (${components.length} components)`);
