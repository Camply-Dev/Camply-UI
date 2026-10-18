import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { describe, expect, it, vi } from "vitest";
import { Avatar } from "../../src/components/Avatar";
import { Card, CardTitle } from "../../src/components/Card";
import { DescriptionList } from "../../src/components/DescriptionList";
import { DropdownMenu, MenuItem, MenuLabel } from "../../src/components/DropdownMenu";
import { Stat } from "../../src/components/Stat";
import { Table } from "../../src/components/Table";
import { Tab, TabList, TabPanel, Tabs } from "../../src/components/Tabs";
import { ToastProvider, useToast } from "../../src/components/Toast";
import { Tooltip } from "../../src/components/Tooltip";
import { Trash } from "../../src/lib/icons";

/**
 * Données et surfaces (0.3.0) : écarts de Stat, classes de DescriptionList, clics et
 * sélection de Table, balises de Card et CardTitle, MenuLabel, toast persistant,
 * infobulle dans un déclencheur de menu, ids des onglets, statut d'un Avatar.
 */

describe("Stat", () => {
	it("une hausse est un succès, mise en forme selon la locale", () => {
		render(<Stat label="Valeur" value="1 200 €" delta={12.5} />);
		const ecart = screen.getByText(/12,5/);
		expect(ecart).toHaveTextContent("+12,5%");
		expect(ecart).toHaveClass("camply-stat__good");
	});

	it("zéro est neutre ; une baisse est bonne quand elle est inversée", () => {
		const { rerender } = render(<Stat label="Délai" value="3 j" delta={0} />);
		expect(screen.getByText("0%")).toHaveClass("camply-stat__flat");
		rerender(<Stat label="Délai" value="3 j" delta={-3} invertDelta />);
		expect(screen.getByText(/3%/)).toHaveClass("camply-stat__good");
	});

	it("sans écart ni aide, aucune ligne vide sous la valeur", () => {
		const { container } = render(<Stat label="Cartes" value="12" />);
		expect(container.querySelector(".camply-stat__bottom")).toBeNull();
	});
});

describe("DescriptionList", () => {
	it("la mise en page ne donne plus à la liste la classe de ses lignes", () => {
		const { container } = render(
			<DescriptionList items={[{ term: "Total", description: "12 €" }]} />,
		);
		const liste = container.querySelector("dl");
		expect(liste).toHaveClass("camply-descriptionlist__layout-row");
		expect(liste).not.toHaveClass("camply-descriptionlist__row");
	});
});

type Ligne = { id: number; nom: string };
const LIGNES: Ligne[] = [
	{ id: 1, nom: "zoé" },
	{ id: 2, nom: "Émile" },
	{ id: 3, nom: "alice" },
];

describe("Table", () => {
	it("un clic sur l'icône d'un bouton de ligne ne déclenche pas onRowClick", async () => {
		const user = userEvent.setup();
		const onRowClick = vi.fn();
		const supprimer = vi.fn();
		render(
			<Table
				columns={[
					{ key: "nom", header: "Nom" },
					{
						key: "actions",
						header: "Actions",
						cell: () => (
							<button type="button" aria-label="Supprimer" onClick={supprimer}>
								<Trash size={14} data-testid="icone" />
							</button>
						),
					},
				]}
				data={LIGNES}
				rowKey={(r) => r.id}
				onRowClick={onRowClick}
			/>,
		);
		await user.click(screen.getAllByTestId("icone")[0]);
		expect(supprimer).toHaveBeenCalledTimes(1);
		// La cible était le <svg> : `instanceof HTMLElement` la laissait passer.
		expect(onRowClick).not.toHaveBeenCalled();
	});

	it("« Tout sélectionner » garde les lignes sélectionnées hors de l'affichage", async () => {
		const user = userEvent.setup();
		const onSelectionChange = vi.fn();
		render(
			<Table
				columns={[{ key: "nom", header: "Nom" }]}
				data={LIGNES.slice(2)}
				rowKey={(r) => r.id}
				selectable
				selectedKeys={[1, 2]}
				onSelectionChange={onSelectionChange}
			/>,
		);
		await user.click(screen.getByRole("checkbox", { name: "Tout sélectionner" }));
		expect(onSelectionChange).toHaveBeenLastCalledWith([1, 2, 3]);
	});

	it("trie les textes comme on les lit : accents et casse ignorés", async () => {
		const user = userEvent.setup();
		render(
			<Table
				columns={[{ key: "nom", header: "Nom", sortValue: (r) => r.nom }]}
				data={LIGNES}
				rowKey={(r) => r.id}
			/>,
		);
		await user.click(screen.getByRole("button", { name: /Nom/ }));
		const noms = screen.getAllByRole("cell").map((c) => c.textContent);
		expect(noms).toEqual(["alice", "Émile", "zoé"]);
	});
});

describe("Card et CardTitle", () => {
	it("rendent la balise demandée", () => {
		render(
			<Card as="article">
				<CardTitle headingLevel={1}>Connexion</CardTitle>
			</Card>,
		);
		expect(screen.getByRole("article")).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 1, name: "Connexion" })).toBeInTheDocument();
	});
});

describe("menus", () => {
	it("MenuLabel uppercase={false} garde le texte tel quel", async () => {
		const user = userEvent.setup();
		render(
			<DropdownMenu trigger={<button type="button">Compte</button>}>
				<MenuLabel uppercase={false}>sacha@exemple.fr</MenuLabel>
				<MenuItem>Se déconnecter</MenuItem>
			</DropdownMenu>,
		);
		await user.click(screen.getByRole("button", { name: "Compte" }));
		expect(screen.getByText("sacha@exemple.fr")).toHaveClass("camply-dropdownmenu__menuLabelText");
	});

	it("une infobulle autour du déclencheur d'un menu ne l'empêche pas de s'ouvrir", async () => {
		const user = userEvent.setup();
		render(
			<DropdownMenu
				trigger={
					<Tooltip content="Plus d'actions">
						<button type="button">Actions</button>
					</Tooltip>
				}
			>
				<MenuItem>Renommer</MenuItem>
			</DropdownMenu>,
		);
		const bouton = screen.getByRole("button", { name: "Actions" });
		await user.click(bouton);
		// Les props du menu allaient à l'infobulle, qui les posait sur sa bulle.
		expect(screen.getByRole("menu")).toBeInTheDocument();
		expect(bouton).toHaveAttribute("aria-expanded", "true");
	});
});

describe("Toast", () => {
	it("duration: Infinity : le toast reste", () => {
		vi.useFakeTimers();
		function Declencheur() {
			const { toast } = useToast();
			useEffect(() => {
				toast({ title: "Synchronisation", duration: Number.POSITIVE_INFINITY });
			}, [toast]);
			return null;
		}
		render(
			<ToastProvider>
				<Declencheur />
			</ToastProvider>,
		);
		act(() => vi.advanceTimersByTime(60_000));
		// `setTimeout(…, Infinity)` partait aussitôt : le toast disparaissait.
		expect(screen.getByText("Synchronisation")).toBeInTheDocument();
		vi.useRealTimers();
	});
});

describe("Tabs", () => {
	it("une valeur avec une espace donne des ids qui se répondent", () => {
		render(
			<Tabs defaultValue="Mes cartes">
				<TabList>
					<Tab value="Mes cartes">Mes cartes</Tab>
				</TabList>
				<TabPanel value="Mes cartes">Contenu</TabPanel>
			</Tabs>,
		);
		const onglet = screen.getByRole("tab", { name: "Mes cartes" });
		const panneau = screen.getByRole("tabpanel", { name: "Mes cartes" });
		expect(onglet.getAttribute("aria-controls")).toBe(panneau.id);
		expect(panneau.id).not.toContain(" ");
	});
});

describe("Avatar", () => {
	it("le statut entre dans le nom accessible (la pastille n'est qu'une couleur)", () => {
		render(<Avatar name="Alice Martin" status="busy" />);
		expect(screen.getByRole("img", { name: "Alice Martin, occupé" })).toBeInTheDocument();
	});
});
