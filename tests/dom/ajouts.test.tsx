import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../src/components/Button";
import { CardTitle } from "../../src/components/Card";
import { EmptyState } from "../../src/components/EmptyState";
import { IconButton } from "../../src/components/IconButton";
import { Modal } from "../../src/components/Modal";
import { Progress } from "../../src/components/Progress";
import { Radio, RadioGroup } from "../../src/components/Radio";
import { Stack } from "../../src/components/Stack";
import { type ToastOptions, ToastProvider, useToast } from "../../src/components/Toast";
import { type CamplyLabels, useLabels } from "../../src/lib/i18n";

/**
 * Les manques comblés par la 0.2.0, relevés en construisant une application :
 * bouton rendu en lien, action de toast, niveau des titres, balise de `Stack`,
 * état vide, échelle de `Progress`, aide par option de `Radio`, ton des libellés.
 *
 * Chaque cas tombe si on revient en arrière : un lien désactivé qui navigue, un
 * handler de l'enfant écrasé par celui du bouton, une action qui laisse le toast
 * ouvert, un titre figé en `<h3>`, une aide d'option que le lecteur d'écran
 * n'annonce pas.
 */

describe("Button asChild", () => {
	it("donne son apparence, ses icônes et son libellé à un lien", () => {
		render(
			<Button asChild variant="secondary" leftIcon={<svg data-testid="icone" />}>
				<a href="/projets">Projets</a>
			</Button>,
		);
		const lien = screen.getByRole("link", { name: "Projets" });
		expect(lien).toHaveAttribute("href", "/projets");
		expect(lien).toHaveClass("camply-button__btn", "camply-button__secondary");
		// `type` n'a pas de sens sur un lien : il ne doit pas fuir sur l'enfant.
		expect(lien).not.toHaveAttribute("type");
		expect(lien).toContainElement(screen.getByTestId("icone"));
	});

	it("compose handlers, classes et ref avec ceux de l'enfant", async () => {
		const appels: string[] = [];
		const ref = createRef<HTMLButtonElement>();
		render(
			<Button asChild ref={ref} className="a-moi" onClick={() => appels.push("bouton")}>
				<a href="/ancre" className="a-lui" onClick={() => appels.push("lien")}>
					Ancre
				</a>
			</Button>,
		);
		const lien = screen.getByRole("link", { name: "Ancre" });
		await userEvent.click(lien);

		expect(appels).toEqual(["lien", "bouton"]);
		expect(lien).toHaveClass("a-moi", "a-lui", "camply-button__btn");
		expect(ref.current).toBe(lien);
	});

	it("désactivé, n'agit plus : aria-disabled, navigation et handlers coupés", () => {
		const auClic = vi.fn();
		render(
			<Button asChild disabled onClick={auClic}>
				<a href="/supprimer" onClick={auClic}>
					Supprimer
				</a>
			</Button>,
		);
		const lien = screen.getByRole("link", { name: "Supprimer" });
		expect(lien).toHaveAttribute("aria-disabled", "true");
		// `fireEvent` rend `false` quand l'évènement a été annulé : pas de navigation.
		expect(fireEvent.click(lien)).toBe(false);
		expect(auClic).not.toHaveBeenCalled();
	});
});

describe("IconButton asChild", () => {
	it("garde son nom accessible sur le lien qui porte l'icône", () => {
		render(
			<IconButton asChild label="Dépôt GitHub">
				<a href="https://github.com/Camply-Dev">
					<svg />
				</a>
			</IconButton>,
		);
		const lien = screen.getByRole("link", { name: "Dépôt GitHub" });
		expect(lien).toHaveClass("camply-iconbutton__btn");
		expect(lien).toHaveAttribute("title", "Dépôt GitHub");
	});
});

function Declencheur({ options }: { options: ToastOptions }) {
	const { toast } = useToast();
	return (
		<button type="button" onClick={() => toast(options)}>
			Notifier
		</button>
	);
}

describe("Toast : action", () => {
	it("appelle l'action puis ferme le toast", async () => {
		const annuler = vi.fn();
		render(
			<ToastProvider>
				<Declencheur
					options={{ title: "Projet supprimé", action: { label: "Annuler", onClick: annuler } }}
				/>
			</ToastProvider>,
		);
		await userEvent.click(screen.getByRole("button", { name: "Notifier" }));
		await userEvent.click(screen.getByRole("button", { name: "Annuler" }));

		expect(annuler).toHaveBeenCalledOnce();
		expect(screen.queryByText("Projet supprimé")).not.toBeInTheDocument();
	});

	it("reste ouvert si l'action pose son veto", async () => {
		render(
			<ToastProvider>
				<Declencheur
					options={{
						title: "Brouillon enregistré",
						action: { label: "Voir", onClick: (e) => e.preventDefault() },
					}}
				/>
			</ToastProvider>,
		);
		await userEvent.click(screen.getByRole("button", { name: "Notifier" }));
		await userEvent.click(screen.getByRole("button", { name: "Voir" }));

		expect(screen.getByText("Brouillon enregistré")).toBeInTheDocument();
	});
});

describe("Niveaux de titre", () => {
	it("CardTitle suit headingLevel, h3 par défaut", () => {
		render(
			<>
				<CardTitle>Par défaut</CardTitle>
				<CardTitle headingLevel={2}>Section</CardTitle>
			</>,
		);
		expect(screen.getByRole("heading", { level: 3, name: "Par défaut" })).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 2, name: "Section" })).toHaveClass(
			"camply-card__title",
		);
	});
});

describe("Stack as", () => {
	it("rend la balise demandée, et la ref la désigne", () => {
		const ref = createRef<HTMLElement>();
		render(
			<Stack as="ul" ref={ref} aria-label="Étapes">
				<li>Un</li>
				<li>Deux</li>
			</Stack>,
		);
		const liste = screen.getByRole("list", { name: "Étapes" });
		expect(liste.tagName).toBe("UL");
		expect(liste).toHaveClass("camply-stack__root");
		expect(ref.current).toBe(liste);
	});
});

describe("EmptyState", () => {
	it("titre dans le plan de la page, icône décorative, actions rendues", () => {
		render(
			<EmptyState
				headingLevel={2}
				icon={<svg data-testid="icone" />}
				title="Aucun projet"
				description={<p>Créez votre premier projet pour commencer.</p>}
				actions={<button type="button">Créer un projet</button>}
			/>,
		);
		expect(screen.getByRole("heading", { level: 2, name: "Aucun projet" })).toBeInTheDocument();
		expect(screen.getByTestId("icone").parentElement).toHaveAttribute("aria-hidden", "true");
		expect(screen.getByText("Créez votre premier projet pour commencer.")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Créer un projet" })).toBeInTheDocument();
		// Un état vide n'est pas une alerte : rien ne doit être annoncé d'office.
		expect(screen.queryByRole("status")).not.toBeInTheDocument();
		expect(screen.queryByRole("alert")).not.toBeInTheDocument();
	});
});

describe("Progress max", () => {
	it("exprime value dans l'échelle de max", () => {
		render(<Progress value={3} max={12} aria-label="Chapitres lus" />);
		const barre = screen.getByRole("progressbar", { name: "Chapitres lus" });
		expect(barre).toHaveAttribute("aria-valuenow", "3");
		expect(barre).toHaveAttribute("aria-valuemax", "12");
		expect(barre).toHaveAttribute("aria-valuetext", "25%");
		expect(barre.firstElementChild).toHaveStyle({ width: "25%" });
	});

	it("borne une valeur qui dépasse max", () => {
		render(<Progress value={20} max={12} aria-label="Chapitres lus" />);
		expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "12");
	});
});

describe("Modal size full", () => {
	it("pose la classe de la taille pleine fenêtre sur le panneau", () => {
		render(
			<Modal open onClose={() => {}} size="full" title="Éditeur">
				Contenu
			</Modal>,
		);
		expect(screen.getByRole("dialog", { name: "Éditeur" })).toHaveClass("camply-modal__full");
	});
});

describe("Radio hint", () => {
	it("annonce l'aide de l'option comme sa description", () => {
		render(
			<RadioGroup label="Hébergement">
				<Radio value="tente" label="Tente" hint="Matériel fourni" />
				<Radio value="van" label="Van" />
			</RadioGroup>,
		);
		expect(screen.getByRole("radio", { name: "Tente" })).toHaveAccessibleDescription(
			"Matériel fourni",
		);
		expect(screen.getByRole("radio", { name: "Van" })).not.toHaveAttribute("aria-describedby");
	});
});

describe("Libellés par défaut", () => {
	it("ne s'adressent jamais au lecteur (ni « tu » ni « vous »)", () => {
		let labels: CamplyLabels | undefined;
		function Lecteur() {
			labels = useLabels();
			return null;
		}
		render(<Lecteur />);

		// Le ton appartient à l'application : la lib s'en tient à l'infinitif et aux noms.
		const textes = Object.values(labels ?? {}).flatMap((valeur) =>
			typeof valeur === "function" ? [String(valeur(0, "1 Mo"))] : valeur,
		);
		const adresse = /\b(tu|te|toi|tes|ton|ta|vous|votre|vos)\b/i;
		expect(textes.filter((texte) => adresse.test(texte))).toEqual([]);
	});
});
