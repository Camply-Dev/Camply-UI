import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Modal } from "../../src/components/Modal";
import { Popover } from "../../src/components/Popover";
import { Select } from "../../src/components/Select";

/**
 * Couches flottantes : pile de renvoi, piège de focus, voile, verrou de
 * défilement. Chaque cas protège une régression réelle — il doit ÉCHOUER si on
 * annule le correctif correspondant (cf. `src/lib/dismissStack.ts`,
 * `src/lib/OverlayDialog.tsx`, `src/lib/focusTrap.ts`).
 */

// --- Leurres jsdom -------------------------------------------------------
// jsdom ne calcule aucune mise en page : `offsetWidth`/`offsetHeight` valent
// toujours 0. Or `focusableWithin` s'en sert pour écarter ce qui est masqué :
// sans ce leurre, le piège de focus croirait TOUT dialogue vide et les cas
// « entrée du focus » et « Tab bouclé » passeraient sans rien prouver.
const LAYOUT_KEYS = ["offsetWidth", "offsetHeight"] as const;
const savedLayout = new Map<string, PropertyDescriptor | undefined>();

beforeAll(() => {
	for (const key of LAYOUT_KEYS) {
		savedLayout.set(key, Object.getOwnPropertyDescriptor(HTMLElement.prototype, key));
		Object.defineProperty(HTMLElement.prototype, key, {
			configurable: true,
			get: () => 24,
		});
	}
});

afterAll(() => {
	for (const key of LAYOUT_KEYS) {
		const descriptor = savedLayout.get(key);
		if (descriptor) Object.defineProperty(HTMLElement.prototype, key, descriptor);
		else delete (HTMLElement.prototype as unknown as Record<string, unknown>)[key];
	}
});

// Le verrou de défilement écrit sur `document.body` : un cas qui échoue en
// cours de route laisserait la page suivante avec un `overflow` parasite.
afterEach(() => {
	document.body.style.overflow = "";
});

// --- Montages d'essai ----------------------------------------------------

const VILLES = [
	{ value: "lyon", label: "Lyon" },
	{ value: "nice", label: "Nice" },
];

/** Modale pilotée par un vrai déclencheur : indispensable au test de restitution du focus. */
function ModaleAvecDeclencheur({ closeOnBackdrop }: { closeOnBackdrop?: boolean }) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<button type="button" onClick={() => setOpen(true)}>
				Ouvrir
			</button>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				title="Réservation"
				closeOnBackdrop={closeOnBackdrop}
				footer={
					<>
						<button type="button">Annuler</button>
						<button type="button">Confirmer</button>
					</>
				}
			>
				<p>Corps du dialogue.</p>
			</Modal>
		</>
	);
}

/** Deux couches empilées : la liste du Select se superpose au dialogue modal. */
function ModaleAvecSelect() {
	const [open, setOpen] = useState(true);
	return (
		<Modal open={open} onClose={() => setOpen(false)} title="Filtres">
			<Select label="Ville" options={VILLES} />
		</Modal>
	);
}

/**
 * Parent renvoyable au clic extérieur (Popover) + enfant portalisé (la liste du
 * Select). Une modale seule, `escapeOnly`, est insensible au pointeur : il faut
 * un parent qui, lui, se ferme au clic extérieur pour exposer la régression.
 */
function PopoverAvecSelect() {
	return (
		<>
			<Popover trigger={<button type="button">Filtres</button>}>
				<h2>Filtres avancés</h2>
				<Select label="Ville" options={VILLES} />
			</Popover>
			{/* Témoin : une cible vraiment extérieure, qui doit, elle, refermer. */}
			<button type="button">Ailleurs</button>
		</>
	);
}

/**
 * Dialogue modal ouvert DEPUIS un Popover : il est portalisé hors du panneau du
 * Popover, mais c'est une couche au-dessus de lui. Le dialogue est `escapeOnly`
 * — le pointeur ne le ferme jamais — ce qui ne doit pas le rendre transparent :
 * un clic dans le dialogue n'est pas un clic « extérieur » pour le Popover.
 */
function PopoverAvecModale({ onConfirm }: { onConfirm: () => void }) {
	const [open, setOpen] = useState(false);
	return (
		<Popover trigger={<button type="button">Actions</button>}>
			<h2>Actions du séjour</h2>
			<button type="button" onClick={() => setOpen(true)}>
				Supprimer
			</button>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				title="Supprimer le séjour ?"
				footer={
					<button type="button" onClick={onConfirm}>
						Confirmer
					</button>
				}
			/>
		</Popover>
	);
}

// --- Cas -----------------------------------------------------------------

describe("pile de renvoi (Échap)", () => {
	it("ne ferme qu'une couche par frappe", async () => {
		const user = userEvent.setup();
		render(<ModaleAvecSelect />);

		await user.click(screen.getByRole("combobox", { name: "Ville" }));
		expect(screen.getByRole("listbox")).toBeInTheDocument();

		// Première frappe : seule la couche du SOMMET part.
		await user.keyboard("{Escape}");
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
		expect(screen.getByRole("dialog", { name: "Filtres" })).toBeInTheDocument();
	});

	it("ferme la couche suivante à la frappe suivante", async () => {
		const user = userEvent.setup();
		render(<ModaleAvecSelect />);

		await user.click(screen.getByRole("combobox", { name: "Ville" }));
		await user.keyboard("{Escape}");
		await user.keyboard("{Escape}");

		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
	});
});

describe("focus du dialogue modal", () => {
	it("entre dans le dialogue à l'ouverture et revient au déclencheur à la fermeture", async () => {
		const user = userEvent.setup();
		render(<ModaleAvecDeclencheur />);

		const declencheur = screen.getByRole("button", { name: "Ouvrir" });
		await user.click(declencheur);

		const dialogue = screen.getByRole("dialog", { name: "Réservation" });
		// Premier focalisable du panneau, pas le panneau par défaut.
		expect(document.activeElement).toBe(screen.getByRole("button", { name: "Fermer" }));
		expect(dialogue).toContainElement(document.activeElement as HTMLElement);

		await user.keyboard("{Escape}");
		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
		expect(document.activeElement).toBe(declencheur);
	});

	it("piège Tab : du dernier focalisable on revient au premier", async () => {
		const user = userEvent.setup();
		render(<ModaleAvecDeclencheur />);
		await user.click(screen.getByRole("button", { name: "Ouvrir" }));

		const fermer = screen.getByRole("button", { name: "Fermer" });
		const confirmer = screen.getByRole("button", { name: "Confirmer" });

		confirmer.focus();
		await user.tab();
		expect(document.activeElement).toBe(fermer);

		// Et symétriquement, Shift+Tab depuis le premier retombe sur le dernier.
		await user.tab({ shift: true });
		expect(document.activeElement).toBe(confirmer);
	});
});

describe("voile du dialogue modal", () => {
	it("un clic sur le voile ferme, un clic dans le panneau non", async () => {
		const user = userEvent.setup();
		render(<ModaleAvecDeclencheur />);
		await user.click(screen.getByRole("button", { name: "Ouvrir" }));

		const dialogue = screen.getByRole("dialog", { name: "Réservation" });
		// Le voile est le parent du panneau : on le vise par la structure, jamais
		// par sa classe (il n'a ni rôle ni nom accessible — c'est voulu).
		const voile = dialogue.parentElement as HTMLElement;

		await user.click(dialogue);
		expect(screen.getByRole("dialog", { name: "Réservation" })).toBeInTheDocument();

		await user.click(voile);
		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
	});

	it("closeOnBackdrop={false} ne ferme jamais au voile", async () => {
		const user = userEvent.setup();
		render(<ModaleAvecDeclencheur closeOnBackdrop={false} />);
		await user.click(screen.getByRole("button", { name: "Ouvrir" }));

		const voile = screen.getByRole("dialog", { name: "Réservation" }).parentElement as HTMLElement;
		await user.click(voile);
		await user.click(voile);

		expect(screen.getByRole("dialog", { name: "Réservation" })).toBeInTheDocument();
		// Échap reste la sortie clavier : le dialogue n'est pas une impasse.
		await user.keyboard("{Escape}");
		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
	});
});

describe("verrou de défilement", () => {
	it("verrouille le body à l'ouverture et RESTAURE la valeur d'origine", async () => {
		const user = userEvent.setup();
		// Valeur non vide : prouve qu'on restaure l'ancienne, pas qu'on efface.
		document.body.style.overflow = "scroll";
		render(<ModaleAvecDeclencheur />);

		await user.click(screen.getByRole("button", { name: "Ouvrir" }));
		expect(document.body.style.overflow).toBe("hidden");

		await user.keyboard("{Escape}");
		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
		expect(document.body.style.overflow).toBe("scroll");
	});
});

describe("couche enfant portalisée", () => {
	it("un clic dans la liste du Select ne referme pas le Popover parent", async () => {
		const user = userEvent.setup();
		render(<PopoverAvecSelect />);

		const declencheur = screen.getByRole("button", { name: "Filtres" });
		await user.click(declencheur);
		expect(screen.getByRole("heading", { name: "Filtres avancés" })).toBeInTheDocument();

		await user.click(screen.getByRole("combobox", { name: "Ville" }));
		// La liste est portalisée dans <body> : hors du panneau du Popover au sens
		// du DOM, mais AU-DESSUS de lui au sens de la pile.
		await user.click(screen.getByRole("option", { name: "Nice" }));

		expect(screen.getByRole("heading", { name: "Filtres avancés" })).toBeInTheDocument();
		expect(declencheur).toHaveAttribute("aria-expanded", "true");
		expect(screen.getByRole("combobox", { name: "Ville" })).toHaveTextContent("Nice");
	});

	it("mais un clic réellement extérieur referme bien le Popover", async () => {
		const user = userEvent.setup();
		render(<PopoverAvecSelect />);

		// Témoin du cas précédent : sans lui, un Popover qui ne se refermerait
		// JAMAIS au clic passerait le test ci-dessus sans rien démontrer.
		await user.click(screen.getByRole("button", { name: "Filtres" }));
		expect(screen.getByRole("heading", { name: "Filtres avancés" })).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Ailleurs" }));
		await waitFor(() =>
			expect(screen.queryByRole("heading", { name: "Filtres avancés" })).not.toBeInTheDocument(),
		);
	});
});

describe("dialogue ouvert depuis une couche renvoyable", () => {
	it("un clic dans la modale déclenche son bouton sans refermer le Popover d'origine", async () => {
		const user = userEvent.setup();
		const onConfirm = vi.fn();
		render(<PopoverAvecModale onConfirm={onConfirm} />);

		const declencheur = screen.getByRole("button", { name: "Actions" });
		await user.click(declencheur);
		await user.click(screen.getByRole("button", { name: "Supprimer" }));
		expect(screen.getByRole("dialog", { name: "Supprimer le séjour ?" })).toBeInTheDocument();

		// Si le Popover se refermait au pointerdown, il démonterait la modale — qu'il
		// porte dans son arbre React — avant le click : le bouton ne recevrait rien.
		await user.click(screen.getByRole("button", { name: "Confirmer" }));

		expect(onConfirm).toHaveBeenCalledTimes(1);
		expect(screen.getByRole("heading", { name: "Actions du séjour" })).toBeInTheDocument();
		expect(declencheur).toHaveAttribute("aria-expanded", "true");
	});
});
