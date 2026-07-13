import {
	copyFileSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import * as esbuild from "esbuild";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");

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

function collectJsFiles(dir) {
	const files = [];
	for (const name of readdirSync(dir)) {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) {
			files.push(...collectJsFiles(path));
			continue;
		}
		if (name.endsWith(".js")) files.push(path);
	}
	return files;
}

async function minifyJsFiles() {
	const files = collectJsFiles(dist);
	if (files.length === 0) return;

	await esbuild.build({
		entryPoints: files,
		outdir: dist,
		outbase: dist,
		allowOverwrite: true,
		minify: true,
		format: "esm",
		platform: "neutral",
		target: "es2022",
	});
}

const tsc = Bun.spawnSync(["tsc"], {
	cwd: root,
	stdio: ["inherit", "inherit", "inherit"],
});
if (tsc.exitCode !== 0) process.exit(tsc.exitCode ?? 1);

copyCssFiles();
addUseClient();
await minifyJsFiles();

console.log("Build complete");
