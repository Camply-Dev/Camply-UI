import { readdirSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "tsup";

function getComponentEntries(): Record<string, string> {
	const entries: Record<string, string> = {};

	for (const name of readdirSync("src/components")) {
		entries[name.toLowerCase()] = join("src/components", name, "index.ts");
	}

	return entries;
}

export default defineConfig({
	entry: getComponentEntries(),
	format: ["esm"],
	dts: true,
	minify: true,
	sourcemap: false,
	clean: true,
	external: ["react", "react-dom"],
	treeshake: true,
	esbuildOptions(options) {
		options.loader = { ...options.loader, ".css": "css" };
	},
});
