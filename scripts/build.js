import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

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

const tsc = Bun.spawnSync(["tsc"], {
	cwd: root,
	stdio: ["inherit", "inherit", "inherit"],
});
if (tsc.exitCode !== 0) process.exit(tsc.exitCode ?? 1);

copyCssFiles();
addUseClient();

console.log("Build complete");
