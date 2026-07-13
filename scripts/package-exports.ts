import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

export const root = resolve(import.meta.dirname, "..");
export const distDir = join(root, "dist");
export const pkgPath = join(root, "package.json");

export type Component = {
	name: string;
	slug: string;
};

export type PackageExports = Record<string, unknown>;

export type Pkg = {
	exports?: PackageExports;
	main?: string;
	module?: string;
	[key: string]: unknown;
};

/** Règle unique de slug d'un composant (nom de dossier → nom de fichier `dist`).
 *  Partagée avec tsup.config pour que les bundles émis et les `exports` s'accordent. */
export const toSlug = (name: string): string => name.toLowerCase();

export function getComponents(): Component[] {
	return readdirSync(join(root, "src/components")).map((name) => ({
		name,
		slug: toSlug(name),
	}));
}

export function readPackageJson(): Pkg {
	return JSON.parse(readFileSync(pkgPath, "utf-8")) as Pkg;
}

// Source de vérité unique de la map `exports` attendue, à partir de src/components.
// Partagée par le build (vérification) et par sync-package-exports.ts (écriture).
export function computeExports(components: Component[]): PackageExports {
	const exports: PackageExports = {
		".": {
			types: "./dist/index.d.ts",
			import: "./dist/index.js",
		},
		"./styles.css": "./dist/styles.css",
		// Pack d'icônes réutilisable, indépendant des composants (@camply/ui/icons).
		"./icons": {
			types: "./dist/icons.d.ts",
			import: "./dist/icons.js",
		},
	};

	for (const { slug } of components) {
		exports[`./${slug}`] = {
			types: `./dist/${slug}.d.ts`,
			import: `./dist/${slug}.js`,
		};
	}

	return exports;
}

// Comparaison stable (ordre des clés ignoré) entre les exports du package.json et ceux attendus.
export function exportsMatch(
	actual: PackageExports | undefined,
	expected: PackageExports,
): boolean {
	return stableStringify(actual ?? {}) === stableStringify(expected);
}

function stableStringify(exports: PackageExports): string {
	const sorted: PackageExports = {};
	for (const key of Object.keys(exports).sort()) {
		const value = exports[key];
		sorted[key] =
			value && typeof value === "object" && !Array.isArray(value)
				? Object.fromEntries(Object.entries(value as Record<string, unknown>).sort())
				: value;
	}
	return JSON.stringify(sorted);
}
