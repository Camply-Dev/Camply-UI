import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CommandPalette } from "../../src/components/CommandPalette";
import { Drawer } from "../../src/components/Drawer";
import { DropdownMenu, MenuItem } from "../../src/components/DropdownMenu";
import { Modal } from "../../src/components/Modal";
import { Popover } from "../../src/components/Popover";
import { Sheet } from "../../src/components/Sheet";
import { ToastProvider, useToast } from "../../src/components/Toast";
import { Toggle } from "../../src/components/Toggle";
import { CamplyProvider } from "../../src/lib/i18n";

/**
 * Règle 4 du dépôt — « composer, jamais écraser » — et la racine publique des
 * dialogues (ref/id/data-* sur le PANNEAU).
 *
 * Chaque cas est écrit pour tomber si on annule le correctif qu'il protège :
 * remettre `{...props}` APRÈS notre `onClick`, retirer le garde-fou
 * `defaultPrevented`, faire écraser la ref du consommateur par `cloneTrigger`,
 * poser la ref d'un dialogue sur le voile plutôt que sur le panneau, ou
 * réintroduire un « Fermer » en dur — tout cela doit faire rougir ce fichier.
 */

describe("Toggle — l'onClick du consommateur et le nôtre coexistent", () => {
	it("appelle le handler du consommateur ET bascule l'état pressé", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();

		render(
			<Toggle defaultPressed={false} onClick={onClick}>
				Gras
			</Toggle>,
		);

		const bouton = screen.getByRole("button", { name: "Gras" });
		expect(bouton).toHaveAttribute("aria-pressed", "false");

		await user.click(bouton);

		// Écrasé (props étalées après notre onClick) : le compteur reste à 0.
		expect(onClick).toHaveBeenCalledTimes(1);
		// Écrasé dans l'autre sens (le nôtre remplacé) : aria-pressed ne bouge pas.
		expect(bouton).toHaveAttribute("aria-pressed", "true");
	});

	it("laisse preventDefault() du consommateur annuler le basculement", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn((e: { preventDefault: () => void }) => e.preventDefault());

		render(
			<Toggle defaultPressed={false} onClick={onClick}>
				Gras
			</Toggle>,
		);

		const bouton = screen.getByRole("button", { name: "Gras" });
		await user.click(bouton);

		expect(onClick).toHaveBeenCalledTimes(1);
		// Sans le garde-fou `if (e.defaultPrevented) return`, on lirait "true".
		expect(bouton).toHaveAttribute("aria-pressed", "false");
	});
});

describe("cloneTrigger — le déclencheur reste celui du consommateur", () => {
	it("Popover : la ref et l'onClick posés sur le trigger survivent au clonage", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		const triggerRef = createRef<HTMLButtonElement>();

		render(
			<Popover
				trigger={
					<button type="button" ref={triggerRef} onClick={onClick}>
						Ouvrir
					</button>
				}
			>
				<p>Contenu du popover</p>
			</Popover>,
		);

		const trigger = screen.getByRole("button", { name: "Ouvrir" });
		// La ref du consommateur pointe le nœud réel, pas null : sans fusion dans
		// `cloneTrigger`, la nôtre l'aurait remplacée.
		expect(triggerRef.current).toBe(trigger);

		await user.click(trigger);

		expect(onClick).toHaveBeenCalledTimes(1);
		// Et notre propre handler a bien joué lui aussi : la couche est ouverte.
		expect(screen.getByText("Contenu du popover")).toBeInTheDocument();
		expect(trigger).toHaveAttribute("aria-expanded", "true");
	});

	it("DropdownMenu : ref, onClick et id du consommateur traversent le clonage", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		const triggerRef = createRef<HTMLButtonElement>();

		render(
			<DropdownMenu
				trigger={
					<button type="button" id="mon-trigger" ref={triggerRef} onClick={onClick}>
						Actions
					</button>
				}
			>
				<MenuItem>Renommer</MenuItem>
			</DropdownMenu>,
		);

		const trigger = screen.getByRole("button", { name: "Actions" });
		expect(triggerRef.current).toBe(trigger);

		await user.click(trigger);

		expect(onClick).toHaveBeenCalledTimes(1);
		const menu = screen.getByRole("menu");
		expect(screen.getByRole("menuitem", { name: "Renommer" })).toBeInTheDocument();
		// Le menu tire son nom du déclencheur : si l'id du consommateur était écrasé
		// par l'id généré, `aria-labelledby` pointerait dans le vide (règle 8).
		expect(menu).toHaveAttribute("aria-labelledby", "mon-trigger");
		expect(trigger).toHaveAttribute("aria-haspopup", "menu");
	});
});

/**
 * Contrat commun des quatre dialogues : la racine publique est le
 * PANNEAU (`role="dialog"`), pas le voile. `id` et `data-*` y atterrissent sans
 * que le contrat ARIA — rôle, modalité, nom accessible — soit perdu.
 */
function verifiePanneau(panneau: HTMLElement, refCourante: HTMLElement | null) {
	// Posée sur le voile (ou nulle part), la ref ne serait pas le panneau.
	expect(refCourante).toBe(panneau);
	expect(screen.getByTestId("panneau")).toBe(panneau);
	expect(panneau).toHaveAttribute("id", "mon-panneau");
	expect(panneau).toHaveAttribute("aria-modal", "true");
}

describe("Dialogues — ref, id et data-testid atterrissent sur le panneau", () => {
	it("Modal", () => {
		const ref = createRef<HTMLDivElement>();

		render(
			<Modal
				open
				onClose={vi.fn()}
				title="Réglages"
				ref={ref}
				id="mon-panneau"
				data-testid="panneau"
			>
				Corps
			</Modal>,
		);

		const panneau = screen.getByRole("dialog", { name: "Réglages" });
		verifiePanneau(panneau, ref.current);
	});

	it("Drawer", () => {
		const ref = createRef<HTMLElement>();

		render(
			<Drawer
				open
				onClose={vi.fn()}
				title="Filtres"
				ref={ref}
				id="mon-panneau"
				data-testid="panneau"
			>
				Corps
			</Drawer>,
		);

		const panneau = screen.getByRole("dialog", { name: "Filtres" });
		verifiePanneau(panneau, ref.current);
	});

	it("Sheet", () => {
		const ref = createRef<HTMLDivElement>();

		render(
			<Sheet
				open
				onClose={vi.fn()}
				title="Partager"
				ref={ref}
				id="mon-panneau"
				data-testid="panneau"
			>
				Corps
			</Sheet>,
		);

		const panneau = screen.getByRole("dialog", { name: "Partager" });
		verifiePanneau(panneau, ref.current);
	});

	it("CommandPalette", () => {
		const ref = createRef<HTMLDivElement>();

		render(
			<CommandPalette
				open
				onClose={vi.fn()}
				commands={[{ id: "new", label: "Nouveau projet", onRun: vi.fn() }]}
				aria-label="Commandes rapides"
				ref={ref}
				id="mon-panneau"
				data-testid="panneau"
			/>,
		);

		// La palette n'a pas de titre visible : son nom vient de l'aria-label, qui
		// doit survivre au passage par le panneau.
		const panneau = screen.getByRole("dialog", { name: "Commandes rapides" });
		verifiePanneau(panneau, ref.current);
	});
});

/**
 * Nom accessible des dialogues. L'algorithme accname fait passer
 * `aria-labelledby` avant `aria-label` : un cas qui pose les deux et vérifie le
 * nom final réussirait quoi que fasse le composant de l'`aria-label`. Chaque
 * cas ci-dessous place donc le nom attendu sur UN chemin que le composant doit
 * réellement construire — liste composée, repli, source unique.
 */
describe("Modal — nom accessible", () => {
	it("compose l'aria-labelledby du consommateur avec le titre au lieu de l'écraser", () => {
		render(
			<>
				<p id="contexte-compte">Compte courant</p>
				<Modal open onClose={vi.fn()} title="Réglages" aria-labelledby="contexte-compte">
					Corps
				</Modal>
			</>,
		);

		// Titre seul : l'IDREF du consommateur perdu. « Compte courant » seul : le
		// titre visible débranché. Seule la liste composée donne ce nom.
		expect(screen.getByRole("dialog")).toHaveAccessibleName("Réglages Compte courant");
	});

	it("se replie sur l'aria-label du consommateur quand aucun titre n'est rendu", () => {
		render(
			<Modal open onClose={vi.fn()} aria-label="Confirmation de départ">
				Corps
			</Modal>,
		);

		// Sans ce repli, le panneau serait un dialogue anonyme.
		expect(screen.getByRole("dialog")).toHaveAccessibleName("Confirmation de départ");
	});

	it("n'expose qu'une source de nom quand un titre existe", () => {
		render(
			<Modal open onClose={vi.fn()} title="Réglages" aria-label="Autre chose">
				Corps
			</Modal>,
		);

		const dialogue = screen.getByRole("dialog");
		expect(dialogue).toHaveAccessibleName("Réglages");
		// Le nom passe par le titre VISIBLE : l'IDREF résout vers l'en-tête rendu.
		const titre = document.getElementById(dialogue.getAttribute("aria-labelledby") ?? "");
		expect(titre).toBe(screen.getByRole("heading", { name: "Réglages" }));
		// Un aria-label laissé à côté serait un second nom, invisible à l'écran, que
		// l'accname ignore : le composant le retire au lieu de le laisser traîner.
		expect(dialogue).not.toHaveAttribute("aria-label");
	});
});

describe("CamplyProvider — la clé `close` pilote vraiment le bouton de fermeture", () => {
	it("nomme le bouton de fermeture d'une Modal avec le libellé surchargé", async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();

		render(
			<CamplyProvider labels={{ close: "Quitter" }}>
				<Modal open onClose={onClose} title="Réglages">
					Corps
				</Modal>
			</CamplyProvider>,
		);

		// Le libellé par défaut ne doit plus apparaître nulle part : la clé est lue.
		const fermer = screen.getByRole("button", { name: "Quitter" });
		expect(screen.queryByRole("button", { name: "Fermer" })).toBeNull();

		// Et c'est bien le bouton de fermeture, pas un homonyme.
		await user.click(fermer);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it("retombe sur le français par défaut sans provider", () => {
		render(
			<Modal open onClose={vi.fn()} title="Réglages">
				Corps
			</Modal>,
		);

		expect(screen.getByRole("button", { name: "Fermer" })).toBeInTheDocument();
	});
});

describe("ToastProvider — la pause au focus compose avec l'onFocus du consommateur", () => {
	// Minuterie simulée : on avance l'horloge au lieu d'attendre la durée du toast.
	beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
	afterEach(() => vi.useRealTimers());

	function Declencheur() {
		const { toast } = useToast();
		return (
			<button type="button" onClick={() => toast({ title: "Séjour enregistré", duration: 1000 })}>
				Enregistrer
			</button>
		);
	}

	it("suspend la disparition tant que le focus est dans la pile, puis la reprend", async () => {
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
		const onFocus = vi.fn();

		render(
			<ToastProvider onFocus={onFocus}>
				<Declencheur />
			</ToastProvider>,
		);

		await user.click(screen.getByRole("button", { name: "Enregistrer" }));
		expect(screen.getByRole("status")).toHaveTextContent("Séjour enregistré");

		// Au clavier et non à la souris : le survol suspend aussi, il masquerait le focus.
		await user.tab();
		expect(screen.getByRole("button", { name: "Fermer" })).toHaveFocus();
		expect(onFocus).toHaveBeenCalled();

		act(() => vi.advanceTimersByTime(5000));
		// Le gestionnaire du consommateur a joué ET la pause aussi : le toast est resté.
		expect(screen.getByRole("status")).toHaveTextContent("Séjour enregistré");

		// Témoin : le focus sorti de la pile, la minuterie repart et le toast s'en va.
		await user.tab({ shift: true });
		expect(screen.getByRole("button", { name: "Enregistrer" })).toHaveFocus();
		act(() => vi.advanceTimersByTime(1000));
		expect(screen.queryByRole("status")).not.toBeInTheDocument();
	});
});
