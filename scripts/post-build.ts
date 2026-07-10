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

function getExportNames(component: Component): string[] {
	const indexPath = join(root, "src/components", component.name, "index.ts");
	const source = readFileSync(indexPath, "utf-8");
	const names = new Set<string>();

	for (const match of source.matchAll(/export\s*\{([^}]+)\}/g)) {
		for (const part of match[1].split(",")) {
			const name = part
				.trim()
				.split(/\s+as\s+/)
				.pop()
				?.trim();
			if (name) {
				names.add(name);
			}
		}
	}

	if (names.size === 0) {
		names.add(component.name);
	}

	return [...names];
}

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

function writeBarrel(components: Component[]) {
	const exports = components.flatMap((component) => {
		const names = getExportNames(component);
		return names.map((name) => ({ name, slug: component.slug }));
	});

	const esmLines = exports.map(({ name, slug }) => `export{${name}}from"./${slug}.js";`);

	writeFileSync(join(distDir, "index.js"), `${esmLines.join("")}\n`);
	writeFileSync(
		join(distDir, "index.d.ts"),
		`${components.map((c) => `export*from"./${c.slug}";`).join("")}\n`,
	);
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

// Copie les tokens dans dist et les expose en @camply/ui/styles.css (import unique côté consommateur).
function copyTokens() {
	copyFileSync(join(root, "src/styles/tokens.css"), join(distDir, "styles.css"));
}

const components = getComponents();
patchComponentBundles(components);
copyTokens();
writeBarrel(components);
verifyPackageExports(components);

console.log(`Built ${components.length} component(s): ${components.map((c) => c.name).join(", ")}`);
