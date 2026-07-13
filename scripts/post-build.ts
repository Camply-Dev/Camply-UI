import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
	type Component,
	computeExports,
	distDir,
	exportsMatch,
	getComponents,
	readPackageJson,
	root,
} from "./package-exports";

function prependToFile(path: string, prefix: string) {
	const content = readFileSync(path, "utf-8");
	if (content.startsWith(prefix)) {
		return;
	}
	writeFileSync(path, `${prefix}${content}`);
}

function patchComponentBundles(components: Component[]) {
	for (const { slug } of components) {
		prependToFile(join(distDir, `${slug}.js`), `"use client";import"./${slug}.css";`);
	}
}

// Les deux barrels réexportent chaque composant via `export *` — même mécanisme
// pour le runtime (.js) et les types (.d.ts). Les bundles n'ont que des exports
// nommés (aucun `default`), donc `export *` équivaut à les lister un par un, sans
// le parsing regex fragile des `index.ts` (qui casserait sur `export { X, type Y }`).
function writeBarrel(components: Component[]) {
	const js = components.map((c) => `export*from"./${c.slug}.js";`).join("");
	const dts = components.map((c) => `export*from"./${c.slug}";`).join("");
	writeFileSync(join(distDir, "index.js"), `${js}\n`);
	writeFileSync(join(distDir, "index.d.ts"), `${dts}\n`);
}

// Le build ne réécrit plus package.json. Il vérifie seulement que le champ `exports` est
// synchronisé avec src/components ; sinon il échoue et invite à lancer le script de sync dédié.
function verifyPackageExports(components: Component[]) {
	const expected = computeExports(components);
	const pkg = readPackageJson();

	if (exportsMatch(pkg.exports, expected)) {
		return;
	}

	console.error(
		[
			"",
			"✖ package.json `exports` est désynchronisé des composants de src/components.",
			"",
			"  Le build ne modifie plus package.json automatiquement.",
			"  Régénère les exports (met aussi `main` à jour) avec :",
			"",
			"      bun scripts/sync-package-exports.ts",
			"",
			"  puis relance `bun run build`. (Ou édite le champ `exports` à la main.)",
			"",
		].join("\n"),
	);
	process.exit(1);
}

// Garde le barrel dev/docs (src/index.ts, cible de l'alias @camply/ui) aligné sur
// src/components : échoue si un composant y manque (sinon dérive silencieuse entre
// la lib publiée et la surface dev/docs). Miroir de verifyPackageExports.
function verifySrcBarrel(components: Component[]) {
	const src = readFileSync(join(root, "src/index.ts"), "utf-8");
	const missing = components.filter((c) => !src.includes(`export * from "./components/${c.name}"`));
	if (missing.length === 0) return;

	console.error(
		[
			"",
			"✖ src/index.ts (alias @camply/ui pour dev/docs) est désynchronisé de src/components.",
			`  Manquant(s) : ${missing.map((c) => c.name).join(", ")}`,
			"",
			"  Régénère-le avec :  bun scripts/sync-package-exports.ts",
			"",
		].join("\n"),
	);
	process.exit(1);
}

// Copie les tokens dans dist et les expose en @camply/ui/styles.css (import unique côté consommateur).
function copyTokens() {
	copyFileSync(join(root, "src/styles/tokens.css"), join(distDir, "styles.css"));
}

const components = getComponents();
patchComponentBundles(components);
copyTokens();
writeBarrel(components);
verifyPackageExports(components);
verifySrcBarrel(components);

console.log(`Built ${components.length} component(s): ${components.map((c) => c.name).join(", ")}`);
