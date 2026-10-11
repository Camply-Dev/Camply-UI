import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ReactElement, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "../../src/components/Alert";
import { Banner } from "../../src/components/Banner";
import { Button } from "../../src/components/Button";
import { ButtonGroup } from "../../src/components/ButtonGroup";
import { IconButton } from "../../src/components/IconButton";
import { Popover } from "../../src/components/Popover";
import { RangeSlider } from "../../src/components/RangeSlider";
import { Slider } from "../../src/components/Slider";
import { Spoiler } from "../../src/components/Spoiler";

/**
 * Le contrat ouvert/fermé d'Alert, Banner et Spoiler (convention 2), l'état
 * d'erreur des curseurs (convention 8) et la descente de taille d'un
 * ButtonGroup vers ses boutons.
 *
 * Chaque cas est écrit pour tomber si on annule le comportement qu'il protège :
 * ignorer la prop `open` au profit du seul état interne, oublier `aria-invalid`
 * ou laisser l'`aria-describedby` pointer dans le vide, ou faire gagner la
 * taille du groupe sur celle posée par l'enfant.
 */

// --- 1. Bandeaux contrôlés -------------------------------------------------

/** Les props que Alert et Banner partagent mot pour mot : de quoi jouer le même scénario deux fois. */
interface PropsBandeau {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	dismissible?: boolean;
}

const MESSAGE = "Maintenance prévue dimanche";

const BANDEAUX: ReadonlyArray<{ nom: string; rendre: (p: PropsBandeau) => ReactElement }> = [
	{ nom: "Alert", rendre: (p) => <Alert {...p}>{MESSAGE}</Alert> },
	{ nom: "Banner", rendre: (p) => <Banner {...p}>{MESSAGE}</Banner> },
];

describe.each(BANDEAUX)("$nom contrôlé", ({ rendre }) => {
	it("se referme PUIS se rouvre au gré du parent", async () => {
		const user = userEvent.setup();

		function Parent() {
			const [ouvert, setOuvert] = useState(true);
			return (
				<>
					{rendre({ open: ouvert, onOpenChange: setOuvert, dismissible: true })}
					<button type="button" onClick={() => setOuvert(true)}>
						Rouvrir
					</button>
				</>
			);
		}

		render(<Parent />);
		// Les tons non alarmants rendent `role="status"` : c'est le seul nœud du
		// bandeau qu'on puisse désigner sans passer par une classe interne.
		expect(screen.getByRole("status")).toHaveTextContent(MESSAGE);

		await user.click(screen.getByRole("button", { name: "Fermer" }));
		expect(screen.queryByRole("status")).toBeNull();

		await user.click(screen.getByRole("button", { name: "Rouvrir" }));
		// Sans lecture de `open`, l'état interne resterait à `false` et le parent
		// n'aurait plus aucun moyen de faire revenir le bandeau.
		expect(screen.getByRole("status")).toHaveTextContent(MESSAGE);
	});

	it("reste ouvert si le parent ignore la demande de fermeture", async () => {
		const user = userEvent.setup();
		const onOpenChange = vi.fn();

		render(rendre({ open: true, onOpenChange, dismissible: true }));
		await user.click(screen.getByRole("button", { name: "Fermer" }));

		expect(onOpenChange).toHaveBeenCalledTimes(1);
		expect(onOpenChange).toHaveBeenCalledWith(false);
		// `open` fait foi : un état interne qui prendrait la main masquerait le bandeau.
		expect(screen.getByRole("status")).toHaveTextContent(MESSAGE);
	});
});

describe.each(BANDEAUX)("$nom non contrôlé", ({ rendre }) => {
	it("est visible au montage et se referme au bouton", async () => {
		const user = userEvent.setup();
		render(rendre({ dismissible: true }));

		// Défaut inversé, assumé : un bandeau n'a pas de déclencheur, il est là
		// d'emblée. Brancher `useControllable` ne devait rien changer à ça.
		expect(screen.getByRole("status")).toHaveTextContent(MESSAGE);

		await user.click(screen.getByRole("button", { name: "Fermer" }));
		expect(screen.queryByRole("status")).toBeNull();
	});

	it("part fermé si `defaultOpen` vaut false", () => {
		render(rendre({ defaultOpen: false, dismissible: true }));
		expect(screen.queryByRole("status")).toBeNull();
	});
});

// --- 2. Spoiler contrôlé ---------------------------------------------------

const TEXTE_SPOILER = "Le règlement intérieur du camping tient en douze articles.";

describe("Spoiler contrôlé", () => {
	it("ne se déplie pas de lui-même et prévient le parent au clic", async () => {
		const user = userEvent.setup();
		const onOpenChange = vi.fn();

		render(
			<Spoiler open={false} onOpenChange={onOpenChange}>
				<p>{TEXTE_SPOILER}</p>
			</Spoiler>,
		);

		expect(screen.getByRole("button", { name: "Voir plus" })).toHaveAttribute(
			"aria-expanded",
			"false",
		);

		await user.click(screen.getByRole("button", { name: "Voir plus" }));

		expect(onOpenChange).toHaveBeenCalledTimes(1);
		expect(onOpenChange).toHaveBeenCalledWith(true);
		// Le parent n'a rien accordé : le composant doit rester plié. S'il basculait
		// son état interne malgré `open`, le libellé serait passé à « Voir moins ».
		expect(screen.getByRole("button", { name: "Voir plus" })).toHaveAttribute(
			"aria-expanded",
			"false",
		);
	});

	it("suit l'état du parent, libellé compris, et son `aria-controls` désigne le contenu", async () => {
		function Parent() {
			const [ouvert, setOuvert] = useState(false);
			return (
				<Spoiler open={ouvert} onOpenChange={setOuvert}>
					<p>{TEXTE_SPOILER}</p>
				</Spoiler>
			);
		}

		const user = userEvent.setup();
		render(<Parent />);

		await user.click(screen.getByRole("button", { name: "Voir plus" }));

		const bascule = screen.getByRole("button", { name: "Voir moins" });
		expect(bascule).toHaveAttribute("aria-expanded", "true");

		// Règle 8 : un aria-* qui pointe dans le vide est un bug — on résout l'IDREF
		// au lieu de se contenter de constater la présence de l'attribut.
		const cible = document.getElementById(bascule.getAttribute("aria-controls") ?? "");
		expect(cible).not.toBeNull();
		expect(cible).toHaveTextContent(TEXTE_SPOILER);
	});
});

// --- 3. Curseurs en erreur -------------------------------------------------

/**
 * Résout `aria-describedby` en texte RÉELLEMENT annoncé. Un IDREF orphelin
 * passerait un simple `toHaveAttribute` alors que le message reste muet pour le
 * lecteur d'écran : c'est exactement le bug que la règle 8 proscrit.
 */
function texteDecrit(element: HTMLElement): string {
	const ids = (element.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean);
	expect(ids.length, "aucun aria-describedby sur le contrôle").toBeGreaterThan(0);
	return ids
		.map((id) => {
			const cible = document.getElementById(id);
			expect(cible, `aria-describedby désigne l'id inexistant « ${id} »`).not.toBeNull();
			return cible?.textContent ?? "";
		})
		.join(" ");
}

const ERREUR = "Le budget dépasse le plafond";

describe("Slider en erreur", () => {
	it("rend le message et le relie vraiment à la poignée", () => {
		render(<Slider label="Budget" error={ERREUR} />);

		const poignee = screen.getByRole("slider", { name: "Budget" });
		expect(poignee).toHaveAttribute("aria-invalid", "true");
		expect(texteDecrit(poignee)).toContain(ERREUR);
	});

	it("n'annonce aucune invalidité tant qu'il n'y a pas d'erreur", () => {
		render(<Slider label="Budget" hint="Par nuit et par emplacement" />);

		const poignee = screen.getByRole("slider", { name: "Budget" });
		// `aria-invalid="false"` serait déjà une régression : l'attribut ne doit pas
		// exister du tout hors erreur.
		expect(poignee).not.toHaveAttribute("aria-invalid");
		expect(texteDecrit(poignee)).toContain("Par nuit et par emplacement");
	});

	it("laisse l'erreur remplacer l'aide au lieu de s'y ajouter", () => {
		render(<Slider label="Budget" hint="Par nuit et par emplacement" error={ERREUR} />);

		const decrit = texteDecrit(screen.getByRole("slider", { name: "Budget" }));
		expect(decrit).toContain(ERREUR);
		expect(decrit).not.toContain("Par nuit et par emplacement");
	});
});

describe("RangeSlider en erreur", () => {
	it("décrit les DEUX poignées par le message", () => {
		render(<RangeSlider label="Budget" error={ERREUR} />);

		// Une plage sans erreur sur la poignée haute laisserait passer la moitié du
		// problème : les deux sont invalides ensemble ou pas du tout.
		for (const nom of ["Budget minimum", "Budget maximum"]) {
			const poignee = screen.getByRole("slider", { name: nom });
			expect(poignee).toHaveAttribute("aria-invalid", "true");
			expect(texteDecrit(poignee)).toContain(ERREUR);
		}
	});
});

// --- 4. ButtonGroup : descente de taille -----------------------------------

/**
 * La taille n'a pas d'autre témoin observable ici : jsdom ne charge aucune
 * feuille, et la classe `camply-button__<taille>` EST le contrat entre le
 * composant et son CSS. On désigne quand même chaque bouton par son rôle et son
 * nom accessible — la classe n'est lue qu'en assertion.
 */
describe("ButtonGroup — la taille descend, la plus précise gagne", () => {
	it("impose sa taille aux enfants qui n'en portent pas", () => {
		render(
			<ButtonGroup size="sm">
				<Button>Jour</Button>
				<Button size="lg">Semaine</Button>
				<IconButton label="Ajouter une période">+</IconButton>
			</ButtonGroup>,
		);

		const jour = screen.getByRole("button", { name: "Jour" });
		expect(jour).toHaveClass("camply-button__sm");
		// Sans le contexte, le bouton retomberait sur son défaut `md`.
		expect(jour).not.toHaveClass("camply-button__md");

		// Même relais pour IconButton, qui lit le même contexte.
		expect(screen.getByRole("button", { name: "Ajouter une période" })).toHaveClass(
			"camply-iconbutton__sm",
		);

		const semaine = screen.getByRole("button", { name: "Semaine" });
		// Le plus précis gagne : la `size` de l'enfant n'est pas écrasée par le groupe.
		expect(semaine).toHaveClass("camply-button__lg");
		expect(semaine).not.toHaveClass("camply-button__sm");
	});

	it("laisse chaque enfant à son défaut quand le groupe n'impose rien", () => {
		render(
			<ButtonGroup>
				<Button>Jour</Button>
				<Button size="lg">Semaine</Button>
			</ButtonGroup>,
		);

		expect(screen.getByRole("button", { name: "Jour" })).toHaveClass("camply-button__md");
		expect(screen.getByRole("button", { name: "Semaine" })).toHaveClass("camply-button__lg");
	});

	it("relaie la taille d'un groupe englobant au lieu de l'effacer", () => {
		render(
			<ButtonGroup size="sm">
				<ButtonGroup attached={false}>
					<Button>Jour</Button>
				</ButtonGroup>
			</ButtonGroup>,
		);

		// Un groupe sans `size` est transparent : il ne réinitialise pas à `md`.
		expect(screen.getByRole("button", { name: "Jour" })).toHaveClass("camply-button__sm");
	});

	it("s'arrête à la frontière d'une couche flottante déclarée dans le groupe", async () => {
		const user = userEvent.setup();
		render(
			<ButtonGroup size="sm">
				<Button>Jour</Button>
				<Popover trigger={<Button>Plus</Button>}>
					<Button>Exporter</Button>
				</Popover>
			</ButtonGroup>,
		);

		// Le déclencheur est rendu DANS le groupe : il en prend la taille.
		const plus = screen.getByRole("button", { name: "Plus" });
		expect(plus).toHaveClass("camply-button__sm");

		await user.click(plus);
		// Le panneau, lui, est portalisé ailleurs : ses boutons ne font pas partie de
		// l'ensemble visuel du groupe et gardent leur propre défaut.
		const exporter = screen.getByRole("button", { name: "Exporter" });
		expect(exporter).toHaveClass("camply-button__md");
		expect(exporter).not.toHaveClass("camply-button__sm");
	});
});
