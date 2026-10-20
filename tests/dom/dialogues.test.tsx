import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { Drawer } from "../../src/components/Drawer";
import { DropdownMenu, MenuItem } from "../../src/components/DropdownMenu";
import { Modal } from "../../src/components/Modal";
import { Popover } from "../../src/components/Popover";
import { stubLayout } from "./layout";

/**
 * Focus des dialogues et des couches (0.3.0) : entrée choisie (`initialFocus`,
 * `autoFocus`), retour au déclencheur, piège à focus qui ne mesure que les bords,
 * menu ouvert DEPUIS un dialogue, Popover atteignable au clavier. Chaque cas doit
 * échouer si l'on annule le correctif correspondant.
 */

const layout = stubLayout();
afterEach(() => {
	document.body.style.overflow = "";
});

function ModaleRecherche({ mode }: { mode: "initialFocus" | "autoFocus" }) {
	const [open, setOpen] = useState(false);
	const field = useRef<HTMLInputElement>(null);
	return (
		<>
			<button type="button" onClick={() => setOpen(true)}>
				Ouvrir
			</button>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				title="Extensions"
				initialFocus={mode === "initialFocus" ? field : undefined}
			>
				<input
					ref={field}
					aria-label="Rechercher"
					// biome-ignore lint/a11y/noAutofocus: c'est précisément le cas testé
					autoFocus={mode === "autoFocus"}
				/>
			</Modal>
		</>
	);
}

describe("entrée du focus dans un dialogue", () => {
	it.each([
		"initialFocus",
		"autoFocus",
	] as const)("%s : le champ prend le focus, qui revient au déclencheur à la fermeture", async (mode) => {
		const user = userEvent.setup();
		render(<ModaleRecherche mode={mode} />);
		const declencheur = screen.getByRole("button", { name: "Ouvrir" });
		await user.click(declencheur);

		// Pas le bouton « Fermer », premier focalisable du panneau.
		expect(screen.getByRole("textbox", { name: "Rechercher" })).toHaveFocus();

		await user.keyboard("{Escape}");
		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
		// `autoFocus` prend le focus avant les effets : sans la lecture anticipée du
		// focus d'origine, il serait rendu au champ démonté, donc perdu.
		expect(declencheur).toHaveFocus();
	});
});

describe("piège à focus", () => {
	it("Tab boucle du dernier au premier, Maj+Tab l'inverse, sans mesurer chacun des centaines de boutons", async () => {
		const user = userEvent.setup();
		render(
			<Modal open onClose={() => {}} title="Liste">
				{Array.from({ length: 300 }, (_, i) => `Choix ${i + 1}`).map((nom) => (
					<button key={nom} type="button">
						{nom}
					</button>
				))}
			</Modal>,
		);
		const fermer = screen.getByRole("button", { name: "Fermer" });
		const dernier = screen.getByRole("button", { name: "Choix 300" });
		dernier.focus();
		layout.reads = 0;
		await user.tab();

		// Le Tab boucle bien du dernier au premier…
		expect(fermer).toHaveFocus();
		// …en mesurant une poignée d'éléments, pas les 301 du panneau.
		expect(layout.reads).toBeLessThan(20);

		// Et symétriquement, Maj+Tab depuis le premier retombe sur le dernier.
		await user.tab({ shift: true });
		expect(dernier).toHaveFocus();
	});

	it("laisse un menu ouvert depuis le dialogue gérer Tab : il se referme, le focus reste dans le dialogue", async () => {
		const user = userEvent.setup();
		render(
			<Drawer open onClose={() => {}} title="Panneau">
				<DropdownMenu trigger={<button type="button">Actions</button>}>
					<MenuItem>Renommer</MenuItem>
					<MenuItem>Supprimer</MenuItem>
				</DropdownMenu>
			</Drawer>,
		);
		await user.click(screen.getByRole("button", { name: "Actions" }));
		await waitFor(() => expect(screen.getByRole("menuitem", { name: "Renommer" })).toHaveFocus());

		await user.tab();
		// Le piège du dialogue reprenait le focus (vers « Fermer ») sans laisser le menu
		// se refermer : il restait ouvert, sans focus.
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
		expect(screen.getByRole("dialog", { name: "Panneau" })).toContainElement(
			document.activeElement as HTMLElement,
		);
	});
});

describe("Popover au clavier", () => {
	it("à l'ouverture, le focus entre dans le panneau ; Tab au bout le referme et revient au déclencheur", async () => {
		const user = userEvent.setup();
		render(
			<Popover trigger={<button type="button">Filtres</button>}>
				<button type="button">Appliquer</button>
			</Popover>,
		);
		const declencheur = screen.getByRole("button", { name: "Filtres" });
		declencheur.focus();
		await user.keyboard("{Enter}");

		// Portalisé en fin de page, le panneau était hors d'atteinte : Tab allait à la suite.
		await waitFor(() => expect(screen.getByRole("button", { name: "Appliquer" })).toHaveFocus());

		await user.tab();
		expect(screen.queryByRole("button", { name: "Appliquer" })).not.toBeInTheDocument();
		expect(declencheur).toHaveFocus();
	});
});
