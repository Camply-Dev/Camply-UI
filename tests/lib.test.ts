import { describe, expect, it } from "vitest";
import { clamp } from "../src/lib/clamp";
import { cn } from "../src/lib/cn";
import {
	hsvToRgb,
	maskRgb,
	parseColorInput,
	parseHex,
	parseRgbInput,
	rgbToHsv,
	toHex,
} from "../src/lib/color";
import { filterCommands, groupCommands } from "../src/lib/commandPalette";
import {
	buildMonthGrid,
	formatInput,
	isSameDay,
	maskDate,
	parseDate,
	startOfDay,
	weekdayNames,
	yearPageStart,
} from "../src/lib/dateField";
import { formatFileSize, isFileAccepted } from "../src/lib/fileUtils";
import { deriveInitials, hashString } from "../src/lib/initials";
import { meterTone } from "../src/lib/meter";
import { buildPages, DOTS } from "../src/lib/paginationRange";
import { nextRovingIndex, wrapIndex } from "../src/lib/rovingIndex";
import { ratioToValue, snapToStep, valueToPercent } from "../src/lib/sliderGeometry";
import { nextSliderValue } from "../src/lib/sliderKeys";
import { nextSortState, sortRows } from "../src/lib/tableSort";

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

	it("survit aux entrées dégénérées (jamais de NaN)", () => {
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
	it("formate en o / Ko / Mo par défaut", () => {
		expect(formatFileSize(512)).toBe("512 o");
		expect(formatFileSize(2048)).toBe("2 Ko");
		expect(formatFileSize(5 * 1024 * 1024)).toBe("5.0 Mo");
	});

	// Les unités viennent des libellés : un consommateur anglophone doit pouvoir
	// obtenir « MB » sans réimplémenter le formatage.
	it("prend les unités en argument", () => {
		const EN = ["B", "KB", "MB", "GB", "TB"] as const;
		expect(formatFileSize(512, EN)).toBe("512 B");
		expect(formatFileSize(1.5 * 1024 * 1024, EN)).toBe("1.5 MB");
	});

	it("monte jusqu'à la dernière unité disponible sans déborder", () => {
		// Régression : la taille plafonnait à Mo et affichait « 3072.0 Mo ».
		expect(formatFileSize(3 * 1024 ** 3)).toBe("3.0 Go");
		// Deux unités seulement : tout ce qui dépasse reste exprimé en Ko.
		expect(formatFileSize(5 * 1024 * 1024, ["o", "Ko"])).toBe("5120 Ko");
	});

	it("ne produit jamais de taille négative", () => {
		expect(formatFileSize(-42)).toBe("0 o");
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

	it("hsvToRgb place les primaires sur les bons secteurs de teinte", () => {
		expect(hsvToRgb(0, 1, 1)).toEqual([255, 0, 0]);
		expect(hsvToRgb(120, 1, 1)).toEqual([0, 255, 0]);
		expect(hsvToRgb(240, 1, 1)).toEqual([0, 0, 255]);
		expect(hsvToRgb(0, 0, 1)).toEqual([255, 255, 255]);
	});

	it("parseColorInput accepte 3, 6 et 8 chiffres hexadécimaux", () => {
		expect(parseColorInput("#f0a")?.rgb).toEqual([255, 0, 170]);
		expect(parseColorInput("38BDF8")?.rgb).toEqual([56, 189, 248]);
		expect(parseColorInput("#38bdf880")?.alpha).toBeCloseTo(128 / 255, 5);
		expect(parseColorInput("#12345")).toBeNull();
	});

	it("parseRgbInput valide les bornes et tolère la frappe en cours", () => {
		expect(parseRgbInput("255, 0, 0")?.rgb).toEqual([255, 0, 0]);
		expect(parseRgbInput("1, 2, 3, 0.5")?.alpha).toBe(0.5);
		// Virgule finale : l'utilisateur est en train de taper l'alpha.
		expect(parseRgbInput("1,2,3,")?.rgb).toEqual([1, 2, 3]);
		expect(parseRgbInput("256,0,0")).toBeNull();
		expect(parseRgbInput("1,2")).toBeNull();
		expect(parseRgbInput("1,2,3,2")).toBeNull();
		expect(parseRgbInput("a,b,c")).toBeNull();
	});

	// maskRgb réécrit la saisie à chaque frappe : c'est la fonction la plus dense
	// du dépôt et la seule exposée directement aux doigts de l'utilisateur.
	it("maskRgb normalise une saisie libre en 3 canaux + alpha", () => {
		expect(maskRgb("1,2,3,0.55")).toBe("1, 2, 3, 0.55");
		// Un seul point décimal survit dans l'alpha.
		expect(maskRgb("1,2,3,0.5.5")).toBe("1, 2, 3, 0.55");
		// Sans séparateur, les chiffres sont répartis sans jamais dépasser 255.
		expect(maskRgb("2555")).toBe("255, 5");
		expect(maskRgb("999,0,0")).toBe("255, 0, 0");
		// La virgule tapée est conservée tant que les 3 canaux ne sont pas remplis.
		expect(maskRgb("12,")).toBe("12, ");
		// Tout ce qui n'est pas un chiffre est ignoré.
		expect(maskRgb("a1,b2,c3")).toBe("1, 2, 3");
		expect(maskRgb("")).toBe("");
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

	it("formatInput et parseDate font un aller-retour", () => {
		expect(formatInput(new Date(2026, 6, 4))).toBe("04/07/2026");
		const d = new Date(2026, 0, 31);
		expect(parseDate(formatInput(d))).toEqual(d);
	});

	it("buildMonthGrid rend toujours 6 semaines pleines", () => {
		// 42 cases quel que soit le mois : la hauteur du calendrier ne saute pas
		// d'un mois à l'autre.
		const grid = buildMonthGrid(new Date(2024, 1, 1), 1);
		expect(grid).toHaveLength(42);
		// Semaine commençant le lundi -> la grille démarre un lundi.
		expect(grid[0].getDay()).toBe(1);
		// Février 2024 commence un jeudi : la grille déborde sur le 29 janvier.
		expect(grid[0]).toEqual(new Date(2024, 0, 29));
		expect(grid.some((d) => isSameDay(d, new Date(2024, 1, 29)))).toBe(true);

		// Semaine commençant le dimanche -> la grille démarre un dimanche.
		expect(buildMonthGrid(new Date(2024, 1, 1), 0)[0].getDay()).toBe(0);
	});

	it("weekdayNames suit weekStartsOn", () => {
		const sunFirst = weekdayNames("fr-FR", 0);
		const monFirst = weekdayNames("fr-FR", 1);
		expect(monFirst).toHaveLength(7);
		// Décaler d'un jour revient à faire tourner la liste d'un cran.
		expect(monFirst[0]).toBe(sunFirst[1]);
		expect(monFirst.at(-1)).toBe(sunFirst[0]);
		// Les abréviations sont nettoyées de leur point final.
		expect(monFirst.every((n) => !n.includes("."))).toBe(true);
	});

	it("yearPageStart cale sur une page de 12 ans et est idempotent", () => {
		expect(yearPageStart(2026)).toBe(2016);
		expect(yearPageStart(yearPageStart(2026))).toBe(2016);
		expect(yearPageStart(2016)).toBe(2016);
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

describe("initials.hashString", () => {
	// La couleur d'un Avatar est dérivée du hash : il doit rester stable d'un
	// rendu à l'autre, sinon l'avatar change de couleur à chaque montage.
	it("est déterministe", () => {
		expect(hashString("Alice Martin")).toBe(hashString("Alice Martin"));
		expect(hashString("Alice")).not.toBe(hashString("Bob"));
		expect(hashString("")).toBe(0);
	});

	it("reste un entier signé 32 bits", () => {
		// `| 0` est l'identité sur un entier 32 bits et sur lui seul : la valeur
		// sert d'index de palette, elle ne doit jamais déborder en flottant.
		const h = hashString("une chaîne assez longue pour déborder l'entier");
		expect(h).toBe(h | 0);
	});
});

describe("cn", () => {
	it("ignore les valeurs fausses", () => {
		expect(cn("a", false, null, undefined, "b")).toBe("a b");
		expect(cn()).toBe("");
		expect(cn(undefined)).toBe("");
	});
});

describe("tableSort.sortRows", () => {
	const rows = [{ n: "b" }, { n: "a" }, { n: "c" }];

	it("trie dans les deux sens sans muter la source", () => {
		expect(sortRows(rows, (r) => r.n, "asc").map((r) => r.n)).toEqual(["a", "b", "c"]);
		expect(sortRows(rows, (r) => r.n, "desc").map((r) => r.n)).toEqual(["c", "b", "a"]);
		// La table reçoit ses lignes en props : les muter réécrirait l'état du parent.
		expect(rows.map((r) => r.n)).toEqual(["b", "a", "c"]);
	});

	it("trie les nombres numériquement, pas alphabétiquement", () => {
		const nums = [{ v: 10 }, { v: 9 }, { v: 100 }];
		expect(sortRows(nums, (r) => r.v, "asc").map((r) => r.v)).toEqual([9, 10, 100]);
	});
});

describe("commandPalette", () => {
	const commands = [
		{ label: "Ouvrir", group: "Fichier" },
		{ label: "Enregistrer", keywords: "sauver", group: "Fichier" },
		{ label: "Copier", group: "Édition" },
		{ label: "Aide" },
	];

	it("filterCommands cherche dans le label, les mots-clés et le groupe", () => {
		expect(filterCommands(commands, "")).toHaveLength(4);
		expect(filterCommands(commands, "   ")).toHaveLength(4);
		expect(filterCommands(commands, "ouvr").map((c) => c.label)).toEqual(["Ouvrir"]);
		expect(filterCommands(commands, "SAUVER").map((c) => c.label)).toEqual(["Enregistrer"]);
		expect(filterCommands(commands, "édition").map((c) => c.label)).toEqual(["Copier"]);
		expect(filterCommands(commands, "zzz")).toEqual([]);
	});

	// `index` sert à piloter le curseur clavier : il doit désigner exactement la
	// position dans `flat`, qui est l'ordre réellement affiché (groupes regroupés).
	it("groupCommands garde flat et index cohérents", () => {
		const { byGroup, flat, index } = groupCommands(commands);
		expect([...byGroup.keys()]).toEqual(["Fichier", "Édition", ""]);
		expect(flat.map((c) => c.label)).toEqual(["Ouvrir", "Enregistrer", "Copier", "Aide"]);
		for (const cmd of commands) expect(flat[index.get(cmd) as number]).toBe(cmd);
	});
});

describe("sliderKeys.nextSliderValue", () => {
	it("suit le pattern APG", () => {
		expect(nextSliderValue("ArrowRight", 5, 0, 100, 1)).toBe(6);
		expect(nextSliderValue("ArrowUp", 5, 0, 100, 1)).toBe(6);
		expect(nextSliderValue("ArrowLeft", 5, 0, 100, 1)).toBe(4);
		expect(nextSliderValue("ArrowDown", 5, 0, 100, 1)).toBe(4);
		// Page± = un dixième de plage, pas un pas.
		expect(nextSliderValue("PageUp", 50, 0, 100, 1)).toBe(60);
		expect(nextSliderValue("PageDown", 50, 0, 100, 1)).toBe(40);
		expect(nextSliderValue("Home", 50, 10, 90, 1)).toBe(10);
		expect(nextSliderValue("End", 50, 10, 90, 1)).toBe(90);
	});

	it("laisse filer les touches qui ne le concernent pas", () => {
		expect(nextSliderValue("Tab", 5, 0, 100, 1)).toBeNull();
		expect(nextSliderValue("a", 5, 0, 100, 1)).toBeNull();
	});

	// Contrat volontaire : le helper ne borne pas, c'est snapToStep qui cale et
	// borne ensuite — une seule fonction responsable des bornes.
	it("ne borne pas lui-même", () => {
		const raw = nextSliderValue("ArrowRight", 100, 0, 100, 1) as number;
		expect(raw).toBe(101);
		expect(snapToStep(raw, 0, 100, 1)).toBe(100);
	});
});
