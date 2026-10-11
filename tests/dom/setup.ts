import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom n'implémente pas `scrollIntoView`, que les listes appellent pour suivre
// l'option active (`useListboxNav`, CommandPalette) : sans ce bouchon, ouvrir une
// liste jette. Chaque fichier de test a son propre jsdom, le bouchon n'en sort pas.
if (typeof Element.prototype.scrollIntoView !== "function") {
	Element.prototype.scrollIntoView = () => {};
}

// Les composants de la lib portalisent dans document.body et posent des écouteurs
// globaux (pile de couches, verrou de défilement) : sans démontage entre deux cas,
// un test hériterait des couches du précédent.
afterEach(cleanup);
