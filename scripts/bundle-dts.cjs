/**
 * Fusionne les .d.ts émis par tsc en un seul index.d.ts.
 * tsc fait le typage (rapide, TS 7) ; rollup-plugin-dts ne fait que recoller les
 * fichiers déjà générés. icons.d.ts reste tel quel (un seul fichier source).
 */
const Module = require("node:module");
const { readdirSync, statSync, unlinkSync, writeFileSync } = require("node:fs");
const { join, resolve } = require("node:path");

const root = resolve(__dirname, "..");
const dist = join(root, "dist");
const keep = new Set([join(dist, "index.d.ts"), join(dist, "lib", "icons.d.ts")]);

const ts5Entry = require.resolve("typescript-dts");
const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
	if (request === "typescript") return ts5Entry;
	return resolveFilename.call(this, request, parent, isMain, options);
};

const { rollup } = require("rollup");
const dts = require("rollup-plugin-dts").default;

function collectDts(dir) {
	const files = [];
	for (const name of readdirSync(dir)) {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) {
			files.push(...collectDts(path));
			continue;
		}
		if (name.endsWith(".d.ts")) files.push(path);
	}
	return files;
}

async function main() {
	const bundle = await rollup({
		input: join(dist, "index.d.ts"),
		plugins: [
			{
				name: "css-stub",
				resolveId(source) {
					if (source.endsWith(".css")) return source;
				},
				load(id) {
					if (id.endsWith(".css")) return "";
				},
			},
			dts(),
		],
	});
	const { output } = await bundle.generate({ format: "es" });
	const code = output[0].code;
	writeFileSync(join(dist, "index.d.ts"), code);

	for (const file of collectDts(dist)) {
		if (!keep.has(file)) unlinkSync(file);
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
