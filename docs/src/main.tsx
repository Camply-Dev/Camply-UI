/// <reference types="vite/client" />
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import "../../src/styles/tokens.css";

// Le JS de la lib n'importe AUCUN CSS (sinon un seul composant embarquerait les 58
// feuilles). Le site consomme les sources, pas le paquet : ces deux lignes sont donc
// l'équivalent local du `import "@camply/ui/styles.css"` que fait un consommateur.
import.meta.glob("../../src/components/**/*.css", { eager: true });

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
