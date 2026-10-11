import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		projects: [
			{
				// Helpers purs : aucun DOM nécessaire, donc aucun jsdom -> tests rapides.
				test: {
					name: "unit",
					environment: "node",
					include: ["tests/*.test.ts"],
				},
			},
			{
				// Tests de rendu : tout ce qui ne se démontre qu'avec un DOM — focus,
				// clavier, ARIA, soumission de formulaire, cycle de vie des couches.
				test: {
					name: "dom",
					environment: "jsdom",
					include: ["tests/dom/**/*.test.tsx"],
					setupFiles: ["tests/dom/setup.ts"],
				},
			},
		],
	},
});
