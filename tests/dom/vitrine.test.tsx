import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Avatar } from "../../src/components/Avatar";
import { Breadcrumbs } from "../../src/components/Breadcrumbs";
import { Table } from "../../src/components/Table";
import { Tree } from "../../src/components/Tree";

/**
 * Contrats sur lesquels la vitrine (docs/src/playground) s'appuie : ses démos et
 * les extraits qu'elle affiche. Chaque cas casse si l'API ne tenait plus ce que
 * la vitrine montre — la démo correspondante deviendrait alors fausse.
 */

/** Diamètre rendu, lu sur le style inline que pose le composant. */
const diametre = (nom: string) =>
	Number.parseFloat(screen.getByRole("img", { name: nom }).style.width);

describe("Avatar : échelle nommée", () => {
	it("prend l'échelon md par défaut, entre sm et lg", () => {
		// La démo propose sm · md · lg et annonce md comme défaut : un avatar sans
		// `size` doit donc être rendu comme `size="md"`, et l'échelle croître.
		render(
			<>
				<Avatar name="Sans taille" />
				<Avatar name="Petit" size="sm" />
				<Avatar name="Moyen" size="md" />
				<Avatar name="Grand" size="lg" />
			</>,
		);

		expect(diametre("Sans taille")).toBe(diametre("Moyen"));
		expect(diametre("Petit")).toBeLessThan(diametre("Moyen"));
		expect(diametre("Moyen")).toBeLessThan(diametre("Grand"));
	});

	it("accepte un diamètre libre en pixels", () => {
		render(<Avatar name="Clara Morel" size={68} />);
		expect(screen.getByRole("img", { name: "Clara Morel" })).toHaveStyle({
			width: "68px",
			height: "68px",
		});
	});
});

describe("Breadcrumbs : deux crumbs au même href", () => {
	it("les rend tous deux, sans clé React en double", () => {
		// La démo pose `href: "#"` sur deux crumbs : une clé tirée du href les faisait
		// entrer en collision (avertissement de React, et un crumb risquait d'être omis).
		const erreur = vi.spyOn(console, "error").mockImplementation(() => {});
		render(
			<Breadcrumbs
				items={[
					{ label: "Accueil", href: "#" },
					{ label: "Composants", href: "#" },
					{ label: "Navigation" },
				]}
			/>,
		);
		const avertissements = erreur.mock.calls.map(([message]) => String(message));
		erreur.mockRestore();

		expect(screen.getByRole("link", { name: "Accueil" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Composants" })).toBeInTheDocument();
		expect(avertissements).toEqual([]);
	});
});

describe("Table : colonne adossée à un champ", () => {
	const rows = [{ id: 1, name: "Alice Martin", role: "Design" }];

	it("affiche la valeur du champ désigné par key quand cell est absent", () => {
		// La colonne « Rôle » de la vitrine n'a pas de `cell` : sans cette lecture du
		// champ, la cellule serait vide.
		render(
			<Table
				data={rows}
				rowKey={(r) => r.id}
				columns={[
					{ key: "name", header: "Nom", cell: (r) => r.name },
					{ key: "role", header: "Rôle" },
				]}
			/>,
		);
		expect(screen.getByRole("cell", { name: "Design" })).toBeInTheDocument();
	});
});

describe("Tree : charge utile du nœud", () => {
	it("passe le nœud complet en second argument de onSelect", async () => {
		// La vitrine documente `onSelect={(id, node) => …}` : le second argument doit
		// exister et porter `data`, sinon l'extrait affiché ne fonctionne pas.
		const onSelect = vi.fn();
		render(
			<Tree
				onSelect={onSelect}
				defaultExpanded={["src"]}
				nodes={[
					{
						id: "src",
						label: "src",
						children: [{ id: "index", label: "index.ts", data: "/src/index.ts" }],
					},
				]}
			/>,
		);

		await userEvent.click(screen.getByRole("treeitem", { name: "index.ts" }));

		expect(onSelect).toHaveBeenCalledWith(
			"index",
			expect.objectContaining({ id: "index", data: "/src/index.ts" }),
		);
	});
});
