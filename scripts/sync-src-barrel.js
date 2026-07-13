import { readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

const components = readdirSync(join(root, "src/components")).sort((a, b) => a.localeCompare(b));

const srcBarrel = `import "./styles/tokens.css";\n\n${components
	.map((name) => `export * from "./components/${name}";`)
	.join("\n")}\n`;

writeFileSync(join(root, "src/index.ts"), srcBarrel);

console.log(`Synced src/index.ts (${components.length} components)`);
