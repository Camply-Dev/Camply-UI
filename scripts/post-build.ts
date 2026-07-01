import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const distDir = join(root, "dist");
const pkgPath = join(root, "package.json");

type Component = {
	name: string;
	slug: string;
};

function getComponents(): Component[] {
	return readdirSync(join(root, "src/components")).map((name) => ({
		name,
		slug: name.toLowerCase(),
	}));
}

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

function syncPackageExports(components: Component[]) {
	const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as {
		exports: Record<string, unknown>;
		main?: string;
		module?: string;
	};

	const exports: Record<string, unknown> = {
		".": {
			types: "./dist/index.d.ts",
			import: "./dist/index.js",
		},
	};

	for (const { slug } of components) {
		exports[`./${slug}`] = {
			types: `./dist/${slug}.d.ts`,
			import: `./dist/${slug}.js`,
		};
	}

	pkg.exports = exports;
	pkg.main = "./dist/index.js";
	delete pkg.module;

	writeFileSync(pkgPath, `${JSON.stringify(pkg, null, "\t")}\n`);
}

const components = getComponents();
patchComponentBundles(components);
writeBarrel(components);
syncPackageExports(components);

console.log(`Built ${components.length} component(s): ${components.map((c) => c.name).join(", ")}`);
