import { afterAll, beforeAll } from "vitest";

/**
 * jsdom ne calcule aucune mise en page : `offsetWidth`/`offsetHeight` valent
 * toujours 0. Or le piège à focus (`focusEdges`) s'en sert pour écarter ce qui
 * est masqué : sans ce leurre, il croirait TOUT dialogue vide et les cas
 * « entrée du focus » et « Tab bouclé » passeraient sans rien prouver.
 *
 * Le leurre compte aussi ses lectures (`reads`), pour prouver que le piège ne
 * mesure que les bords. À appeler au niveau du fichier : il pose ses propres
 * `beforeAll` / `afterAll` et rend les accesseurs d'origine à la fin.
 */
export function stubLayout() {
	const layout = { reads: 0 };
	const saved = new Map<string, PropertyDescriptor | undefined>();
	beforeAll(() => {
		for (const key of ["offsetWidth", "offsetHeight"] as const) {
			saved.set(key, Object.getOwnPropertyDescriptor(HTMLElement.prototype, key));
			Object.defineProperty(HTMLElement.prototype, key, {
				configurable: true,
				get: () => {
					layout.reads++;
					return 24;
				},
			});
		}
	});
	afterAll(() => {
		for (const [key, descriptor] of saved) {
			if (descriptor) Object.defineProperty(HTMLElement.prototype, key, descriptor);
			else delete (HTMLElement.prototype as unknown as Record<string, unknown>)[key];
		}
	});
	return layout;
}
