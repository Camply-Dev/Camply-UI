import { writeFileSync } from "node:fs";
import { computeExports, getComponents, pkgPath, readPackageJson } from "./package-exports";

// Unique point d'écriture de package.json : régénère `exports` (+ `main`) depuis src/components.
// À lancer manuellement après avoir ajouté, renommé ou supprimé un composant.
const components = getComponents();
const pkg = readPackageJson();

pkg.exports = computeExports(components);
pkg.main = "./dist/index.js";
delete pkg.module;

writeFileSync(pkgPath, `${JSON.stringify(pkg, null, "\t")}\n`);

console.log(
	`Synced package.json exports for ${components.length} component(s): ${components
		.map((c) => c.slug)
		.join(", ")}`,
);
