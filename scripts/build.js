import {
	copyFileSync,
	existsSync,
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

/** Bun.Glob renvoie des `\` sur Windows : on normalise TOUJOURS avant de comparer. */
const toPosix = (p) => p.replaceAll("\\", "/");

const TOKENS = "src/styles/tokens.css";

// Un `.d.ts` est une déclaration, pas un module : esbuild en émettrait un `.js`
// vide, publié pour rien (et porteur d'un "use client" qui n'a aucun sens).
const tsEntrypoints = [
	...new Bun.Glob("src/**/*.{ts,tsx}").scanSync({ cwd: root, onlyFiles: true }),
].filter((p) => !/\.d\.tsx?$/.test(p));

function cssSources() {
	return [...new Bun.Glob("src/**/*.css").scanSync({ cwd: root, onlyFiles: true })]
		.map(toPosix)
		.sort();
}

/**
 * Le CSS n'est plus importé par le JS (sinon importer 1 composant embarque les
 * feuilles des 57 autres). On livre donc :
 *  - dist/styles.css : le bundle complet (tokens + tous les composants)
 *  - dist/tokens.css : la couche partagée seule (tokens + utilitaires)
 *  - dist/components/X/X.css : la feuille de chaque composant, pour du granulaire
 */
function emitCss() {
	const componentCss = cssSources().filter((p) => p !== TOKENS);
	mkdirSync(dist, { recursive: true });

	// Sans les tokens livrés seuls, la voie granulaire obligerait à charger
	// styles.css en entier : 84 Ko de feuilles pour un Button qui en pèse 2.
	copyFileSync(join(root, TOKENS), join(dist, "tokens.css"));

	for (const path of componentCss) {
		const out = join(dist, path.slice("src/".length));
		mkdirSync(dirname(out), { recursive: true });
		copyFileSync(join(root, path), out);
	}

	const bundle = [TOKENS, ...componentCss]
		.map((p) => readFileSync(join(root, p), "utf-8"))
		.join("\n");
	writeFileSync(join(dist, "styles.css"), bundle);
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

const RELATIVE_SPECIFIER = /(from\s*|import\s*|export\s*\*\s*from\s*)"(\.\.?\/[^"]*)"/g;

/**
 * Les `.d.ts` émis par tsc souffrent EXACTEMENT du même mal que les `.js` émis
 * par esbuild : `from "./Card"` est invalide sous moduleResolution node16/nodenext,
 * et le consommateur voit alors un `@camply/ui` sans aucun membre exporté. La
 * cible à écrire dans un `.d.ts` est bien `.js` : TypeScript remappe vers `.d.ts`.
 * NE PAS réutiliser ce helper dans addUseClient() : un fichier de déclarations
 * n'a rien à faire d'une directive "use client".
 */
const emittedModules = () => [...collectFiles(dist, ".js"), ...collectFiles(dist, ".d.ts")];

/**
 * esbuild (mode non-bundle) laisse les specifiers tels quels : `from "./Button"`.
 * Extensionless, c'est invalide en ESM Node. On suffixe en `.js` pour que le
 * paquet soit résolvable sans bundler.
 */
function addJsExtensions() {
	for (const file of emittedModules()) {
		const src = readFileSync(file, "utf-8");
		const out = src.replaceAll(RELATIVE_SPECIFIER, (match, head, spec) => {
			const last = spec.split("/").pop();
			if (last.includes(".")) return match; // déjà une extension (.css, .js…)

			const target = resolve(dirname(file), spec);
			// Un dossier (ex. "./components/Button") se résout via son index.
			if (existsSync(target) && statSync(target).isDirectory()) {
				return `${head}"${spec}/index.js"`;
			}
			return `${head}"${spec}.js"`;
		});
		if (out !== src) writeFileSync(file, out);
	}
}

/** La lib est cliente (hooks, events). Les icônes restent neutres (pur SVG). */
function addUseClient() {
	const iconsFile = join(dist, "lib", "icons.js");
	for (const file of collectFiles(dist, ".js")) {
		if (file === iconsFile) continue;
		const content = readFileSync(file, "utf-8");
		if (!content.startsWith('"use client"')) {
			writeFileSync(file, `"use client";\n${content}`);
		}
	}
}

/**
 * GARDE-FOU : résout statiquement chaque import relatif émis dans dist (.js ET
 * .d.ts) et échoue si la cible n'existe pas. C'est ce qui manquait quand
 * dist/index.js importait un ./styles/tokens.css jamais copié — paquet publié
 * cassé, CI verte. Un specifier resté sans extension ne résout rien : le garde-fou
 * attrape donc aussi tout oubli de addJsExtensions().
 */
function verifyEmittedImports() {
	const broken = [];
	for (const file of emittedModules()) {
		const src = readFileSync(file, "utf-8");
		for (const [, , spec] of src.matchAll(RELATIVE_SPECIFIER)) {
			const target = resolve(dirname(file), spec);
			if (!existsSync(target)) {
				broken.push(`${toPosix(file.slice(dist.length + 1))} -> ${spec}`);
			}
		}
	}
	if (broken.length > 0) {
		console.error(`\n✖ ${broken.length} import(s) émis ne résolvent pas :`);
		for (const b of broken) console.error(`   ${b}`);
		process.exit(1);
	}
}

rmSync(dist, { recursive: true, force: true });

// esbuild est lancé en premier et avance en tâche de fond pendant que tsc, appelé
// via spawnSync, bloque le thread : le Promise.all n'attend donc en pratique que
// esbuild, et surtout il ne masque plus le process.exit() d'emitDeclarations().
await Promise.all([emitJavaScript(), emitDeclarations()]);

emitCss();
addJsExtensions();
addUseClient();
verifyEmittedImports();

await minifyCss();

console.log("Build complete");
