/// <reference types="vite/client" />
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
// Styles de la lib (consommée via l'alias source) : tokens une fois, puis tous les
// CSS de composants via import.meta.glob (évite le tree-shaking des imports side-effect).
import "../../src/styles/tokens.css";

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
