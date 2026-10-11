import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Combobox } from "../../src/components/Combobox";
import { type Command, CommandPalette } from "../../src/components/CommandPalette";
import { Select } from "../../src/components/Select";

/**
 * Champs à liste : Select et Combobox partagent leur socle (`src/lib/useListboxField.ts`)
 * — ouverture, navigation clavier, fermeture au Tab — mais pas ses réglages :
 * Select boucle et prend Home/End, Combobox bute aux extrémités et laisse
 * Home/End au caret. La palette de commandes suit le même pattern APG
 * « combobox + listbox » avec sa propre navigation.
 *
 * Le focus reste sur le champ ; l'option active n'est désignée que par
 * `aria-activedescendant`. C'est donc cet IDREF, résolu en option réelle, qui
 * sert de témoin — jamais la classe de surbrillance.
 */

/** Option que le champ désigne comme active, IDREF résolu ; `null` s'il ne désigne rien. */
function optionActive(champ: HTMLElement): HTMLElement | null {
	const id = champ.getAttribute("aria-activedescendant");
	if (!id) return null;
	const option = document.getElementById(id);
	// Un IDREF qui ne résout pas est un bug en soi (règle 8), pas un « rien d'actif ».
	expect(option, `aria-activedescendant désigne l'id inexistant « ${id} »`).not.toBeNull();
	return option;
}

const PAYS = [
	{ value: "fr", label: "France" },
	{ value: "es", label: "Espagne", disabled: true },
	{ value: "it", label: "Italie" },
	{ value: "pt", label: "Portugal" },
];

// --- 1. Select : navigation du socle, réglages par défaut --------------------

describe("Select — navigation clavier", () => {
	it("les flèches sautent les options désactivées et bouclent", async () => {
		const user = userEvent.setup();
		render(<Select label="Pays" options={PAYS} />);
		const champ = screen.getByRole("combobox", { name: "Pays" });

		await user.click(champ);
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "France" }));

		await user.keyboard("{ArrowDown}");
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "Italie" }));

		await user.keyboard("{ArrowDown}{ArrowDown}");
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "France" }));

		await user.keyboard("{ArrowUp}");
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "Portugal" }));
	});

	it("Home et End visent la première et la dernière option sélectionnables", async () => {
		const user = userEvent.setup();
		const options = [...PAYS, { value: "de", label: "Allemagne", disabled: true }];
		render(<Select label="Pays" options={options} defaultValue="it" />);
		const champ = screen.getByRole("combobox", { name: "Pays" });

		await user.click(champ);
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "Italie" }));

		// La dernière option est désactivée : End s'arrête sur la dernière atteignable.
		await user.keyboard("{End}");
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "Portugal" }));

		await user.keyboard("{Home}");
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "France" }));
	});

	it("Tab referme la liste et laisse le focus partir au champ suivant", async () => {
		const user = userEvent.setup();
		render(
			<>
				<Select label="Pays" options={PAYS} />
				<button type="button">Suivant</button>
			</>,
		);
		const champ = screen.getByRole("combobox", { name: "Pays" });

		await user.click(champ);
		expect(screen.getByRole("listbox")).toBeInTheDocument();

		await user.tab();

		// Le trigger n'a pas d'onBlur : sans la touche Tab traitée par le socle, la
		// liste portalisée resterait affichée derrière un focus parti ailleurs.
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
		expect(champ).toHaveAttribute("aria-expanded", "false");
		expect(screen.getByRole("button", { name: "Suivant" })).toHaveFocus();
	});
});

// --- 2. Combobox ------------------------------------------------------------

describe("Combobox — filtrage", () => {
	it("ne rend que les options dont le libellé contient la saisie", async () => {
		const user = userEvent.setup();
		render(<Combobox label="Pays" options={PAYS} />);
		const champ = screen.getByRole("combobox", { name: "Pays" });

		await user.click(champ);
		await user.keyboard("{ArrowDown}{ArrowDown}");
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "Portugal" }));

		await user.type(champ, "al");

		const options = screen.getAllByRole("option");
		expect(options.map((o) => o.textContent)).toEqual(["Italie", "Portugal"]);
		// L'option active repart en tête de la liste filtrée : l'index 3 qu'elle avait
		// dans la liste complète n'y existe plus.
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "Italie" }));
	});

	it("annonce l'absence de résultat au lieu d'une liste vide", async () => {
		const user = userEvent.setup();
		render(<Combobox label="Pays" options={PAYS} emptyMessage="Aucun pays" />);
		const champ = screen.getByRole("combobox", { name: "Pays" });

		await user.type(champ, "zz");

		expect(screen.queryAllByRole("option")).toHaveLength(0);
		expect(screen.getByRole("listbox")).toHaveTextContent("Aucun pays");
		// Rien à désigner : l'IDREF disparaît plutôt que de pointer dans le vide.
		expect(champ).not.toHaveAttribute("aria-activedescendant");
	});
});

describe("Combobox — navigation clavier", () => {
	it("les flèches butent aux extrémités au lieu de boucler", async () => {
		const user = userEvent.setup();
		render(<Combobox label="Pays" options={PAYS} />);
		const champ = screen.getByRole("combobox", { name: "Pays" });

		await user.click(champ);
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "France" }));

		await user.keyboard("{ArrowUp}");
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "France" }));

		await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "Portugal" }));
	});

	it("laisse Home et End au caret du champ", async () => {
		const user = userEvent.setup();
		render(<Combobox label="Pays" options={PAYS} />);
		const champ = screen.getByRole<HTMLInputElement>("combobox", { name: "Pays" });

		await user.type(champ, "a");
		await user.keyboard("{ArrowDown}");
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "Italie" }));

		await user.keyboard("{Home}");
		// L'option active ne bouge pas, et la touche garde son effet natif.
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "Italie" }));
		expect(champ.selectionStart).toBe(0);

		await user.keyboard("{End}");
		expect(optionActive(champ)).toBe(screen.getByRole("option", { name: "Italie" }));
		expect(champ.selectionStart).toBe(1);
	});

	it("Tab referme la liste, vide la recherche et passe au champ suivant", async () => {
		const user = userEvent.setup();
		render(
			<>
				<Combobox label="Pays" options={PAYS} defaultValue="pt" />
				<button type="button">Suivant</button>
			</>,
		);
		const champ = screen.getByRole("combobox", { name: "Pays" });

		await user.click(champ);
		await user.clear(champ);
		await user.type(champ, "it");
		await user.tab();

		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Suivant" })).toHaveFocus();
		// La recherche abandonnée ne reste pas affichée : le champ reprend la valeur.
		expect(champ).toHaveValue("Portugal");

		// Ni ne ressurgit au retour : la liste rouvre sur une recherche vide, entière.
		await user.tab({ shift: true });
		expect(champ).toHaveValue("");
		expect(screen.getAllByRole("option")).toHaveLength(PAYS.length);
	});
});

describe("Combobox — sélection", () => {
	it("Entrée choisit l'option active, referme la liste et garde le focus", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<Combobox label="Pays" options={PAYS} onChange={onChange} />);
		const champ = screen.getByRole("combobox", { name: "Pays" });

		await user.type(champ, "al");
		await user.keyboard("{ArrowDown}{Enter}");

		expect(onChange).toHaveBeenCalledExactlyOnceWith("pt");
		expect(champ).toHaveValue("Portugal");
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
		expect(champ).toHaveFocus();
	});

	it("un clic sur une option la choisit sans voler le focus au champ", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<Combobox label="Pays" options={PAYS} onChange={onChange} />);
		const champ = screen.getByRole("combobox", { name: "Pays" });

		await user.click(champ);
		await user.click(screen.getByRole("option", { name: "Italie" }));

		expect(onChange).toHaveBeenCalledExactlyOnceWith("it");
		expect(champ).toHaveValue("Italie");
		expect(champ).toHaveFocus();
		// Focus conservé sans nouvel onFocus : la liste ne se rouvre pas d'elle-même.
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
	});

	it("ignore une option désactivée", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<Combobox label="Pays" options={PAYS} onChange={onChange} />);

		await user.click(screen.getByRole("combobox", { name: "Pays" }));
		await user.click(screen.getByRole("option", { name: "Espagne" }));

		expect(onChange).not.toHaveBeenCalled();
		expect(screen.getByRole("listbox")).toBeInTheDocument();
	});
});

// --- 3. CommandPalette ------------------------------------------------------

const COMMANDES: Omit<Command, "onRun">[] = [
	{ id: "new", label: "Nouveau séjour", group: "Séjours" },
	{ id: "dup", label: "Dupliquer le séjour", group: "Séjours" },
	{ id: "profil", label: "Ouvrir le profil", group: "Compte", keywords: "avatar" },
];

function monterPalette() {
	const onClose = vi.fn();
	// Espions neufs à chaque montage : un compteur ne survit pas d'un cas à l'autre.
	const commandes = COMMANDES.map((c) => ({ ...c, onRun: vi.fn() }));
	render(
		<CommandPalette open onClose={onClose} commands={commandes} aria-label="Commandes rapides" />,
	);
	// Le panneau n'a pas de titre : le champ se nomme par son invite.
	const champ = screen.getByRole("combobox");
	return { champ, commandes, onClose };
}

describe("CommandPalette — filtrage", () => {
	it("filtre sur le libellé ET les mots-clés", async () => {
		const user = userEvent.setup();
		const { champ } = monterPalette();
		expect(screen.getAllByRole("option")).toHaveLength(3);

		await user.type(champ, "séjour");
		expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual([
			"Nouveau séjour",
			"Dupliquer le séjour",
		]);

		await user.clear(champ);
		// « avatar » n'apparaît que dans les mots-clés de la commande.
		await user.type(champ, "avatar");
		expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Ouvrir le profil"]);
	});

	it("repart de la première commande à chaque frappe", async () => {
		const user = userEvent.setup();
		const { champ } = monterPalette();

		await user.click(champ);
		await user.keyboard("{ArrowDown}{ArrowDown}");
		await user.type(champ, "profil");

		// Sans remise à zéro, l'index 2 survivrait au filtre et ne désignerait plus rien.
		expect(optionActive(champ)).toBe(screen.getAllByRole("option")[0]);
	});
});

describe("CommandPalette — navigation clavier", () => {
	it("aria-activedescendant suit les flèches, d'un groupe à l'autre, et bute aux bords", async () => {
		const user = userEvent.setup();
		const { champ } = monterPalette();
		const option = (nom: string) => screen.getByRole("option", { name: nom });

		await user.click(champ);
		expect(optionActive(champ)).toBe(option("Nouveau séjour"));
		expect(option("Nouveau séjour")).toHaveAttribute("aria-selected", "true");

		await user.keyboard("{ArrowDown}");
		expect(optionActive(champ)).toBe(option("Dupliquer le séjour"));
		// Une seule option sélectionnée à la fois : l'ancienne rend la main.
		expect(option("Nouveau séjour")).toHaveAttribute("aria-selected", "false");

		await user.keyboard("{ArrowDown}");
		expect(optionActive(champ)).toBe(option("Ouvrir le profil"));

		await user.keyboard("{ArrowDown}");
		expect(optionActive(champ)).toBe(option("Ouvrir le profil"));

		await user.keyboard("{ArrowUp}");
		expect(optionActive(champ)).toBe(option("Dupliquer le séjour"));
		// Le focus n'a jamais quitté le champ : c'est l'IDREF qui porte l'annonce.
		expect(champ).toHaveFocus();
	});

	it("Entrée exécute la commande active et referme la palette", async () => {
		const user = userEvent.setup();
		const { champ, commandes, onClose } = monterPalette();

		await user.click(champ);
		await user.keyboard("{ArrowDown}{Enter}");

		expect(commandes[1].onRun).toHaveBeenCalledTimes(1);
		expect(commandes[0].onRun).not.toHaveBeenCalled();
		expect(onClose).toHaveBeenCalledTimes(1);
	});
});
