import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Menubar, type MenubarMenu } from "../../src/components/Menubar";

/**
 * Menubar rend les mêmes `MenuItem` et `MenuSeparator` que DropdownMenu : ces cas
 * figent ce que la barre en hérite — l'ordre « onSelect, puis fermeture », le
 * séparateur, l'inertie d'une entrée désactivée et le veto `preventDefault` —
 * pour qu'elle ne devienne pas une seconde implémentation d'une entrée de menu.
 */

const menus = (onSelect: () => void, onSupprimer = vi.fn()): MenubarMenu[] => [
	{
		label: "Fichier",
		items: [
			{ label: "Nouveau", onSelect },
			{ label: "Supprimer", separatorBefore: true, disabled: true, onSelect: onSupprimer },
		],
	},
];

describe("Menubar — entrée de menu partagée", () => {
	it("appelle onSelect, referme le menu et rend le focus au déclencheur", async () => {
		const user = userEvent.setup();
		const onSelect = vi.fn();
		render(<Menubar aria-label="Principal" menus={menus(onSelect)} />);

		const trigger = screen.getByRole("menuitem", { name: "Fichier" });
		await user.click(trigger);
		await user.click(screen.getByRole("menuitem", { name: "Nouveau" }));

		expect(onSelect).toHaveBeenCalledTimes(1);
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
		expect(trigger).toHaveFocus();
	});

	it("appelle onSelect AVANT de fermer : le focus qu'il déplace est conservé", async () => {
		const user = userEvent.setup();
		// Où est le focus quand onSelect joue : encore sur l'entrée choisie. Fermer
		// d'abord l'aurait déjà renvoyé au déclencheur — onSelect verrait « Fichier ».
		const focusVuParOnSelect: (string | null)[] = [];
		const onSelect = () => {
			focusVuParOnSelect.push(document.activeElement?.textContent ?? null);
			screen.getByRole("textbox", { name: "Nom du fichier" }).focus();
		};
		render(
			<>
				<Menubar aria-label="Principal" menus={menus(onSelect)} />
				<input aria-label="Nom du fichier" />
			</>,
		);

		await user.click(screen.getByRole("menuitem", { name: "Fichier" }));
		await user.click(screen.getByRole("menuitem", { name: "Nouveau" }));

		expect(focusVuParOnSelect).toEqual(["Nouveau"]);
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
		// La fermeture ne rend le focus au déclencheur que s'il était resté dans le
		// menu : ici onSelect l'a envoyé ailleurs, et c'est là qu'il doit rester.
		expect(screen.getByRole("textbox", { name: "Nom du fichier" })).toHaveFocus();
	});

	it("rend le séparateur à sa place, entre les deux entrées", async () => {
		const user = userEvent.setup();
		render(<Menubar aria-label="Principal" menus={menus(vi.fn())} />);

		await user.click(screen.getByRole("menuitem", { name: "Fichier" }));

		const menu = screen.getByRole("menu");
		const separateur = within(menu).getByRole("separator");
		const nouveau = within(menu).getByRole("menuitem", { name: "Nouveau" });
		const supprimer = within(menu).getByRole("menuitem", { name: "Supprimer" });
		// Ordre du document : Nouveau, puis le séparateur, puis Supprimer.
		expect(nouveau.compareDocumentPosition(separateur)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
		expect(separateur.compareDocumentPosition(supprimer)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
	});

	it("rend l'entrée désactivée inerte : ni onSelect, ni fermeture", async () => {
		const user = userEvent.setup();
		const onSupprimer = vi.fn();
		render(<Menubar aria-label="Principal" menus={menus(vi.fn(), onSupprimer)} />);

		await user.click(screen.getByRole("menuitem", { name: "Fichier" }));
		const supprimer = screen.getByRole("menuitem", { name: "Supprimer" });
		expect(supprimer).toBeDisabled();

		await user.click(supprimer);

		expect(onSupprimer).not.toHaveBeenCalled();
		expect(screen.getByRole("menu")).toBeInTheDocument();
	});

	it("laisse le consommateur opposer son veto par preventDefault (règle 4)", async () => {
		const user = userEvent.setup();
		const onSelect = vi.fn();
		render(
			<Menubar
				aria-label="Principal"
				menus={[
					{
						label: "Fichier",
						items: [{ label: "Nouveau", onSelect, onClick: (e) => e.preventDefault() }],
					},
				]}
			/>,
		);

		await user.click(screen.getByRole("menuitem", { name: "Fichier" }));
		await user.click(screen.getByRole("menuitem", { name: "Nouveau" }));

		expect(onSelect).not.toHaveBeenCalled();
		expect(screen.getByRole("menu")).toBeInTheDocument();
	});
});
