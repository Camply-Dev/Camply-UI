import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { computeExports, getComponents, pkgPath, readPackageJson, root } from "./package-exports";

// Unique point d'écriture de package.json ET de src/index.ts : régénère les deux
// barrels depuis src/components. À lancer manuellement après avoir ajouté, renommé
// ou supprimé un composant.
const components = getComponents();
const pkg = readPackageJson();

pkg.exports = computeExports(components);
pkg.main = "./dist/index.js";
delete pkg.module;

writeFileSync(pkgPath, `${JSON.stringify(pkg, null, "\t")}\n`);

// Barrel dev/docs (cible de l'alias @camply/ui), trié par nom pour un diff stable.
const srcBarrel = `import "./styles/tokens.css";\n\n${[...components]
	.sort((a, b) => a.name.localeCompare(b.name))
	.map((c) => `export * from "./components/${c.name}";`)
	.join("\n")}\n`;
writeFileSync(join(root, "src/index.ts"), srcBarrel);

console.log(
	`Synced package.json exports for ${components.length} component(s): ${components
		.map((c) => c.slug)
		.join(", ")}`,
);
