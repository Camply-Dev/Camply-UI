import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// Helpers purs : aucun DOM nécessaire, donc aucun jsdom -> tests rapides.
		environment: "node",
		include: ["tests/**/*.test.ts"],
	},
});
