import {
	copyFileSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	rmSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import * as esbuild from "esbuild";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");

const tsEntrypoints = [
	...new Bun.Glob("src/**/*.{ts,tsx}").scanSync({ cwd: root, onlyFiles: true }),
];

function copyCssFiles() {
	for (const path of new Bun.Glob("src/**/*.css").scanSync({ cwd: root, onlyFiles: true })) {
		if (path === "src/styles/tokens.css") continue;
		const out = join(dist, path.slice("src/".length));
		mkdirSync(dirname(out), { recursive: true });
		copyFileSync(join(root, path), out);
	}
	copyFileSync(join(root, "src/styles/tokens.css"), join(dist, "styles.css"));
}

function addUseClient() {
	for (const name of readdirSync(join(root, "src/components"))) {
		const file = join(dist, "components", name, `${name}.js`);
		try {
			const content = readFileSync(file, "utf-8");
			if (!content.startsWith('"use client"')) {
				writeFileSync(file, `"use client";\n${content}`);
			}
		} catch {
			// pas de fichier racine pour ce composant
		}
	}
}

function collectFiles(dir, suffix) {
	const files = [];
	for (const name of readdirSync(dir)) {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) {
			files.push(...collectFiles(path, suffix));
			continue;
		}
		if (path.endsWith(suffix)) files.push(path);
	}
	return files;
}

async function minifyCss() {
	const files = collectFiles(dist, ".css");
	if (files.length === 0) return;

	await esbuild.build({
		entryPoints: files,
		outdir: dist,
		outbase: dist,
		allowOverwrite: true,
		minify: true,
	});
}

/** JS : esbuild (rapide, imports préservés). Types : tsc --emitDeclarationOnly (un .d.ts par module). */
async function emitJavaScript() {
	await esbuild.build({
		entryPoints: tsEntrypoints,
		outdir: dist,
		outbase: join(root, "src"),
		format: "esm",
		platform: "neutral",
		target: "es2022",
		minify: true,
		packages: "external",
		jsx: "automatic",
	});
}

function emitDeclarations() {
	const tsc = Bun.spawnSync(["tsc", "--emitDeclarationOnly"], {
		cwd: root,
		stdio: ["inherit", "inherit", "inherit"],
	});
	if (tsc.exitCode !== 0) process.exit(tsc.exitCode ?? 1);
}

rmSync(dist, { recursive: true, force: true });

await Promise.all([emitJavaScript(), Promise.resolve().then(emitDeclarations)]);

copyCssFiles();
addUseClient();

await minifyCss();

console.log("Build complete");
