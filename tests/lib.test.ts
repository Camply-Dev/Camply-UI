import { describe, expect, it } from "vitest";
import { clamp } from "../src/lib/clamp";
import { parseHex, rgbToHsv, toHex } from "../src/lib/color";
import { isSameDay, maskDate, parseDate, startOfDay } from "../src/lib/dateField";
import { formatFileSize, isFileAccepted } from "../src/lib/fileUtils";
import { deriveInitials } from "../src/lib/initials";
import { meterTone } from "../src/lib/meter";
import { buildPages, DOTS } from "../src/lib/paginationRange";
import { nextRovingIndex, wrapIndex } from "../src/lib/rovingIndex";
import { ratioToValue, snapToStep, valueToPercent } from "../src/lib/sliderGeometry";
import { nextSortState } from "../src/lib/tableSort";

describe("clamp", () => {
	it("borne des deux côtés", () => {
		expect(clamp(5, 0, 10)).toBe(5);
		expect(clamp(-3, 0, 10)).toBe(0);
		expect(clamp(42, 0, 10)).toBe(10);
	});
});

describe("sliderGeometry", () => {
	// Régression : snapToStep renvoyait 0.30000000000000004 (flottant dérivé)
	// jusque dans l'API publique et le DOM.
	it("ne produit pas de flottant dérivé", () => {
		expect(snapToStep(0.3, 0, 1, 0.1)).toBe(0.3);
		expect(snapToStep(0.7, 0, 1, 0.1)).toBe(0.7);
		expect(snapToStep(0.15, 0, 1, 0.05)).toBe(0.15);
	});

	it("cale sur le pas le plus proche et borne", () => {
		expect(snapToStep(7, 0, 10, 5)).toBe(5);
		expect(snapToStep(8, 0, 10, 5)).toBe(10);
		expect(snapToStep(999, 0, 10, 1)).toBe(10);
		expect(snapToStep(-999, 0, 10, 1)).toBe(0);
	});

	it("survit aux entrées dégénérées (plus de NaN)", () => {
		expect(snapToStep(Number.NaN, 0, 10, 1)).toBe(0);
		expect(snapToStep(5, 0, 10, 0)).toBe(0);
		// Régression : (v-min)/(max-min) donnait NaN quand max === min.
		expect(valueToPercent(5, 5, 5)).toBe(0);
	});

	it("valueToPercent reste dans [0, 100]", () => {
		expect(valueToPercent(0, 0, 200)).toBe(0);
		expect(valueToPercent(100, 0, 200)).toBe(50);
		expect(valueToPercent(999, 0, 200)).toBe(100);
	});

	it("ratioToValue convertit une position en valeur", () => {
		const rect = { left: 0, width: 200 } as DOMRect;
		expect(ratioToValue(100, rect, 0, 10)).toBe(5);
		expect(ratioToValue(0, rect, 0, 10)).toBe(0);
		// Piste de largeur nulle : pas de division par zéro.
		expect(ratioToValue(50, { left: 0, width: 0 } as DOMRect, 3, 9)).toBe(3);
	});
});

describe("fileUtils.isFileAccepted", () => {
	const f = (name: string, type: string) => ({ name, type });

	it("accepte tout si accept est vide", () => {
		expect(isFileAccepted(f("a.png", "image/png"))).toBe(true);
	});

	it("gère les 3 formes de l'attribut accept", () => {
		expect(isFileAccepted(f("photo.PNG", "image/png"), ".png")).toBe(true);
		expect(isFileAccepted(f("doc.pdf", "application/pdf"), ".png")).toBe(false);
		expect(isFileAccepted(f("photo.png", "image/png"), "image/*")).toBe(true);
		expect(isFileAccepted(f("doc.pdf", "application/pdf"), "image/*")).toBe(false);
		expect(isFileAccepted(f("doc.pdf", "application/pdf"), "application/pdf")).toBe(true);
	});

	it("gère une liste séparée par des virgules", () => {
		expect(isFileAccepted(f("a.pdf", "application/pdf"), ".png, .pdf")).toBe(true);
	});

	// Régression : l'accept était compilé en RegExp sans échappement — un "+"
	// (bien réel : image/svg+xml) faisait planter le rendu.
	it("ne plante pas sur les caractères spéciaux des types MIME", () => {
		expect(() => isFileAccepted(f("i.svg", "image/svg+xml"), "image/svg+xml")).not.toThrow();
		expect(isFileAccepted(f("i.svg", "image/svg+xml"), "image/svg+xml")).toBe(true);
		expect(() => isFileAccepted(f("a.txt", "text/plain"), "a(b")).not.toThrow();
	});
});

describe("fileUtils.formatFileSize", () => {
	it("formate en o / Ko / Mo", () => {
		expect(formatFileSize(512)).toBe("512 o");
		expect(formatFileSize(2048)).toBe("2 Ko");
		expect(formatFileSize(5 * 1024 * 1024)).toBe("5.0 Mo");
	});
});

describe("rovingIndex", () => {
	it("wrapIndex boucle dans les deux sens", () => {
		expect(wrapIndex(0, 3)).toBe(0);
		expect(wrapIndex(3, 3)).toBe(0);
		expect(wrapIndex(-1, 3)).toBe(2);
	});

	it("nextRovingIndex suit l'orientation", () => {
		expect(nextRovingIndex("ArrowRight", 0, 3)).toBe(1);
		expect(nextRovingIndex("ArrowLeft", 0, 3)).toBe(2);
		expect(nextRovingIndex("ArrowDown", 0, 3, "vertical")).toBe(1);
		expect(nextRovingIndex("Home", 2, 3)).toBe(0);
		expect(nextRovingIndex("End", 0, 3)).toBe(2);
		expect(nextRovingIndex("a", 0, 3)).toBeNull();
	});
});

describe("paginationRange.buildPages", () => {
	it("liste toutes les pages quand elles tiennent", () => {
		expect(buildPages(1, 5, 1)).toEqual([1, 2, 3, 4, 5]);
	});

	it("insère des points et garde toujours la première et la dernière", () => {
		const pages = buildPages(10, 20, 1);
		expect(pages[0]).toBe(1);
		expect(pages.at(-1)).toBe(20);
		expect(pages).toContain(DOTS);
		expect(pages).toContain(10);
	});

	it("ne met des points qu'à droite au début", () => {
		const pages = buildPages(1, 20, 1);
		expect(pages.filter((p) => p === DOTS)).toHaveLength(1);
		expect(pages.at(-1)).toBe(20);
	});
});

describe("tableSort.nextSortState", () => {
	it("cycle asc -> desc -> aucun tri", () => {
		const a = nextSortState(null, "name");
		expect(a).toEqual({ key: "name", dir: "asc" });
		const b = nextSortState(a, "name");
		expect(b).toEqual({ key: "name", dir: "desc" });
		expect(nextSortState(b, "name")).toBeNull();
	});

	it("repart en asc sur une autre colonne", () => {
		expect(nextSortState({ key: "name", dir: "desc" }, "age")).toEqual({ key: "age", dir: "asc" });
	});
});

describe("color", () => {
	it("parseHex accepte avec et sans #, et rejette le reste", () => {
		expect(parseHex("#38bdf8")).toEqual([56, 189, 248]);
		expect(parseHex("38bdf8")).toEqual([56, 189, 248]);
		expect(parseHex("nope")).toBeNull();
	});

	it("hex -> hsv -> hex est un aller-retour stable", () => {
		const [r, g, b] = parseHex("#38bdf8") as [number, number, number];
		expect(toHex(...rgbToHsv(r, g, b))).toBe("#38bdf8");
	});
});

describe("dateField", () => {
	it("startOfDay remet l'heure à zéro", () => {
		const d = startOfDay(new Date(2026, 6, 14, 23, 45));
		expect(d.getHours()).toBe(0);
		expect(d.getDate()).toBe(14);
	});

	it("isSameDay ignore l'heure", () => {
		expect(isSameDay(new Date(2026, 6, 14, 1), new Date(2026, 6, 14, 23))).toBe(true);
		expect(isSameDay(new Date(2026, 6, 14), new Date(2026, 6, 15))).toBe(false);
	});

	it("maskDate formate la saisie", () => {
		expect(maskDate("14072026")).toBe("14/07/2026");
	});

	it("parseDate lit une date valide et rejette une date absurde", () => {
		expect(parseDate("14/07/2026")?.getFullYear()).toBe(2026);
		expect(parseDate("32/07/2026")).toBeNull();
		expect(parseDate("oups")).toBeNull();
	});
});

describe("meterTone", () => {
	it("colore par niveau quand il n'y a pas de seuils", () => {
		expect(meterTone(90, 90, {})).toBe("danger");
		expect(meterTone(70, 70, {})).toBe("warn");
		expect(meterTone(10, 10, {})).toBe("ok");
	});

	it("respecte optimum high/low avec des seuils", () => {
		expect(meterTone(90, 90, { low: 20, high: 80, optimum: "high" })).toBe("ok");
		expect(meterTone(10, 10, { low: 20, high: 80, optimum: "high" })).toBe("danger");
		expect(meterTone(90, 90, { low: 20, high: 80, optimum: "low" })).toBe("danger");
		expect(meterTone(10, 10, { low: 20, high: 80, optimum: "low" })).toBe("ok");
		expect(meterTone(50, 50, { low: 20, high: 80 })).toBe("warn");
	});
});

describe("initials.deriveInitials", () => {
	it("dérive les initiales d'un nom", () => {
		// Deux mots -> une lettre chacun ; un seul mot -> ses deux premières lettres.
		expect(deriveInitials("Alice Martin")).toBe("AM");
		expect(deriveInitials("Bob")).toBe("BO");
		// Pas de nom -> placeholder "?" (l'Avatar affiche toujours quelque chose).
		expect(deriveInitials("")).toBe("?");
		expect(deriveInitials(undefined)).toBe("?");
	});
});
