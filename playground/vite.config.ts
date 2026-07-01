import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@camply/ui": resolve(__dirname, "../src/index.ts"),
		},
	},
	server: {
		port: 5173,
	},
});
