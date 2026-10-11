import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Button } from "../../src/components/Button";
import { DropdownMenu, MenuItem } from "../../src/components/DropdownMenu";
import { Tree } from "../../src/components/Tree";

/**
 * Recherche clavier (`src/lib/typeahead.ts`), partagée par le menu et l'arbre.
 *
 * Les deux consommateurs suivent le pattern APG : les frappes rapprochées
 * s'accumulent pour affiner la cible. Ces cas figent le comportement des deux
 * côtés, pour qu'une divergence entre le menu et l'arbre se voie tout de suite.
 */

// Le délai de remise à zéro fait 500 ms : sans horloge simulée, le cas « la
// frappe repart de zéro » exigerait une attente réelle.
beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
afterEach(() => vi.useRealTimers());

const user = () => userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

const NODES = [
	{ id: "alpha", label: "Alpha" },
	{ id: "params", label: "Paramètres" },
	{ id: "profil", label: "Profil" },
];

describe("typeahead — arbre", () => {
	it("saute au nœud dont le libellé commence par la frappe", async () => {
		render(<Tree nodes={NODES} />);
		await user().click(screen.getByRole("treeitem", { name: "Alpha" }));

		await user().keyboard("p");
		expect(screen.getByRole("treeitem", { name: "Paramètres" })).toHaveFocus();
	});

	it("accumule les frappes rapprochées pour affiner la cible", async () => {
		render(<Tree nodes={NODES} />);
		await user().click(screen.getByRole("treeitem", { name: "Alpha" }));

		// « p » viserait Paramètres ; « pr » doit viser Profil.
		await user().keyboard("pr");
		expect(screen.getByRole("treeitem", { name: "Profil" })).toHaveFocus();
	});

	it("repart d'une recherche neuve passé le délai", async () => {
		render(<Tree nodes={NODES} />);
		await user().click(screen.getByRole("treeitem", { name: "Alpha" }));

		await user().keyboard("p");
		expect(screen.getByRole("treeitem", { name: "Paramètres" })).toHaveFocus();

		vi.advanceTimersByTime(600);
		// Frappe isolée : « p » repart de zéro et avance à l'entrée suivante en « p ».
		await user().keyboard("p");
		expect(screen.getByRole("treeitem", { name: "Profil" })).toHaveFocus();
	});

	it("ignore les raccourcis et les touches nommées", async () => {
		render(<Tree nodes={NODES} />);
		const alpha = screen.getByRole("treeitem", { name: "Alpha" });
		await user().click(alpha);

		await user().keyboard("{Control>}p{/Control}");
		expect(alpha).toHaveFocus();
	});

	it("ne bouge pas quand aucun libellé ne correspond", async () => {
		render(<Tree nodes={NODES} />);
		const alpha = screen.getByRole("treeitem", { name: "Alpha" });
		await user().click(alpha);

		await user().keyboard("z");
		expect(alpha).toHaveFocus();
	});
});

describe("typeahead — menu", () => {
	const ouvrirMenu = async () => {
		render(
			<DropdownMenu trigger={<Button>Actions</Button>}>
				<MenuItem>Alpha</MenuItem>
				<MenuItem>Paramètres</MenuItem>
				<MenuItem>Profil</MenuItem>
			</DropdownMenu>,
		);
		await user().click(screen.getByRole("button", { name: "Actions" }));
		return screen.getByRole("menu");
	};

	it("saute à l'entrée dont le libellé commence par la frappe", async () => {
		await ouvrirMenu();

		await user().keyboard("pa");
		expect(screen.getByRole("menuitem", { name: "Paramètres" })).toHaveFocus();
	});

	it("accumule les frappes rapprochées, comme l'arbre", async () => {
		await ouvrirMenu();

		// Un menu qui ne garderait que la dernière lettre chercherait une entrée en
		// « r » et ne bougerait pas : « pr » doit viser Profil.
		await user().keyboard("pr");
		expect(screen.getByRole("menuitem", { name: "Profil" })).toHaveFocus();
	});
});
