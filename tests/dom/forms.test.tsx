import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ReactNode, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Input } from "../../src/components/Input";
import { MultiSelect } from "../../src/components/MultiSelect";
import { PinInput } from "../../src/components/PinInput";
import { Rating } from "../../src/components/Rating";
import { Select } from "../../src/components/Select";
import { Slider } from "../../src/components/Slider";

const PAYS = [
	{ value: "fr", label: "France" },
	{ value: "es", label: "Espagne" },
	{ value: "it", label: "Italie" },
];

const HEBERGEMENTS = [
	{ value: "tente", label: "Tente" },
	{ value: "cabane", label: "Cabane" },
	{ value: "van", label: "Van" },
];

/**
 * Vrai <form> : ce qui compte n'est pas ce que le composant rend, mais ce que le
 * navigateur emporte à la soumission. On lit donc le FormData de l'événement
 * `submit` réel, pas un `new FormData(node)` fabriqué à côté.
 */
function Formulaire({ onData, children }: { onData: (d: FormData) => void; children: ReactNode }) {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				onData(new FormData(e.currentTarget));
			}}
		>
			{children}
			<button type="submit">Envoyer</button>
		</form>
	);
}

function monterFormulaire(champ: ReactNode) {
	const user = userEvent.setup();
	// On empile les soumissions plutôt que d'écraser une variable : `envoyer()` lit
	// ainsi SA propre soumission, et un formulaire muet se voit tout de suite.
	const soumissions: FormData[] = [];
	render(
		<Formulaire
			onData={(d) => {
				soumissions.push(d);
			}}
		>
			{champ}
		</Formulaire>,
	);
	return {
		user,
		async envoyer() {
			const rang = soumissions.length;
			await user.click(screen.getByRole("button", { name: "Envoyer" }));
			const data = soumissions[rang];
			if (!data) throw new Error("le <form> n'a pas émis de submit");
			return data;
		},
	};
}

// --- 1. `disabled` + `name` : la sémantique HTML veut qu'un champ désactivé ne
// soit PAS soumis. Les widgets custom soumettent via un <input type="hidden"> :
// désactiver le trigger ne suffit pas, c'est le champ caché qu'il faut désactiver
// (src/lib/HiddenField.tsx).
describe("champ désactivé et soumission", () => {
	it("Select désactivé ne soumet rien, activé soumet sa valeur", async () => {
		const desactive = monterFormulaire(
			<Select label="Pays" name="pays" options={PAYS} defaultValue="fr" disabled />,
		);
		expect((await desactive.envoyer()).has("pays")).toBe(false);

		// Deux montages dans un même cas : le `cleanup` du setup n'agit qu'entre deux `it`.
		cleanup();
		const actif = monterFormulaire(
			<Select label="Pays" name="pays" options={PAYS} defaultValue="fr" />,
		);
		expect((await actif.envoyer()).get("pays")).toBe("fr");
	});

	it("Rating désactivé ne soumet rien, activé soumet sa note", async () => {
		const desactive = monterFormulaire(
			<Rating label="Confort" name="note" defaultValue={3} disabled />,
		);
		expect((await desactive.envoyer()).has("note")).toBe(false);

		cleanup();
		const actif = monterFormulaire(<Rating label="Confort" name="note" defaultValue={3} />);
		expect((await actif.envoyer()).get("note")).toBe("3");
	});

	it("Slider désactivé ne soumet rien, activé soumet sa valeur", async () => {
		const desactive = monterFormulaire(
			<Slider label="Budget" name="budget" defaultValue={40} disabled />,
		);
		expect((await desactive.envoyer()).has("budget")).toBe(false);

		cleanup();
		const actif = monterFormulaire(<Slider label="Budget" name="budget" defaultValue={40} />);
		expect((await actif.envoyer()).get("budget")).toBe("40");
	});
});

// --- 2. MultiSelect : un <select multiple> émet un couple nom/valeur par option
// retenue. Une valeur unique jointe (« tente,van ») passerait `get()` mais casserait
// `getAll()` — c'est `getAll` qui fait foi.
describe("MultiSelect et soumission multiple", () => {
	it("émet un couple nom/valeur par valeur sélectionnée", async () => {
		const { user, envoyer } = monterFormulaire(
			<MultiSelect
				label="Hébergement"
				name="hebergement"
				options={HEBERGEMENTS}
				defaultValue={["tente", "cabane"]}
			/>,
		);

		expect((await envoyer()).getAll("hebergement")).toEqual(["tente", "cabane"]);

		// Une sélection ajoutée à la souris se retrouve dans la soumission suivante.
		await user.click(screen.getByRole("combobox", { name: "Hébergement" }));
		await user.click(screen.getByRole("option", { name: "Van" }));
		expect((await envoyer()).getAll("hebergement")).toEqual(["tente", "cabane", "van"]);
	});
});

// --- 3. Mode contrôlé : `value === undefined` veut dire « aucune sélection », pas
// « reprends la main ». Le mode est figé au premier `value` défini
// (src/lib/useControllable.ts, option allowUndefined).
describe("Select contrôlé", () => {
	it("se vide réellement quand le parent remet `value` à undefined", async () => {
		function Parent() {
			const [pays, setPays] = useState<string | undefined>(undefined);
			return (
				<>
					<Select
						label="Pays"
						placeholder="Aucun pays"
						options={PAYS}
						value={pays}
						onChange={setPays}
					/>
					<button type="button" onClick={() => setPays(undefined)}>
						Réinitialiser
					</button>
				</>
			);
		}

		const user = userEvent.setup();
		render(<Parent />);
		const trigger = screen.getByRole("combobox", { name: "Pays" });

		// La sélection part d'un état non contrôlé (`value` undefined) : c'est ce
		// premier choix qui bascule le composant en contrôlé pour de bon.
		await user.click(trigger);
		await user.click(screen.getByRole("option", { name: "France" }));
		expect(trigger).toHaveTextContent("France");

		await user.click(screen.getByRole("button", { name: "Réinitialiser" }));
		// Sans le gel du mode, l'état interne périmé (« fr ») resurgirait ici.
		expect(trigger).toHaveTextContent("Aucun pays");
		expect(trigger).not.toHaveTextContent("France");
	});

	it("ne change pas de valeur si le parent ignore l'onChange", async () => {
		const user = userEvent.setup();
		render(
			<Select
				label="Pays"
				options={PAYS}
				value="fr"
				onChange={() => {
					/* le parent refuse le changement */
				}}
			/>,
		);
		const trigger = screen.getByRole("combobox", { name: "Pays" });

		await user.click(trigger);
		await user.click(screen.getByRole("option", { name: "Espagne" }));

		expect(trigger).toHaveTextContent("France");
		expect(trigger).not.toHaveTextContent("Espagne");
	});
});

// --- 4. PinInput : les cellules sont POSITIONNELLES. Vider celle du milieu doit
// laisser un trou sur place ; les reprojeter depuis la chaîne compacte décalerait
// « 456 » d'un cran vers la gauche.
describe("PinInput", () => {
	it("vider une cellule du milieu ne décale pas les caractères suivants", async () => {
		const user = userEvent.setup();
		render(<PinInput label="Code" length={6} />);
		const cellule = (n: number) => screen.getByRole("textbox", { name: `Code ${n}` });

		await user.click(cellule(1));
		await user.keyboard("123456");
		expect(cellule(6)).toHaveValue("6");

		await user.click(cellule(3));
		await user.keyboard("{Backspace}");

		expect(cellule(1)).toHaveValue("1");
		expect(cellule(2)).toHaveValue("2");
		expect(cellule(3)).toHaveValue("");
		expect(cellule(4)).toHaveValue("4");
		expect(cellule(5)).toHaveValue("5");
		expect(cellule(6)).toHaveValue("6");
	});
});

// --- 5. Convention « la racine reçoit tout » : `className` et `style` du
// consommateur doivent atterrir sur le MÊME élément, sinon une surcharge qui
// combine les deux (`.ma-classe { … }` + un style calculé) se retrouve scindée.
describe("Input", () => {
	it("pose `className` et `style` sur le même élément", () => {
		const { container } = render(
			<Input label="Nom" className="test-racine" style={{ marginTop: "12px" }} />,
		);

		// On interroge ici par la classe DU CONSOMMATEUR — c'est l'objet même du test,
		// pas une classe interne de la lib.
		const racine = container.querySelector<HTMLElement>(".test-racine");
		expect(racine).not.toBeNull();
		expect(racine).toHaveStyle({ marginTop: "12px" });
		expect(racine).toContainElement(screen.getByRole("textbox", { name: "Nom" }));
		// Un seul nœud stylé : si le style migrait ailleurs, il y en aurait deux.
		expect(container.querySelectorAll("[style]")).toHaveLength(1);
	});
});

describe("remise à zéro d'un formulaire", () => {
	it("un Select non contrôlé revient à sa valeur par défaut, et le formulaire l'emporte", async () => {
		const { user, envoyer } = monterFormulaire(
			<>
				<Select label="Pays" name="pays" defaultValue="fr" options={PAYS} />
				<button type="reset">Effacer</button>
			</>,
		);
		await user.click(screen.getByRole("combobox", { name: "Pays" }));
		await user.click(screen.getByRole("option", { name: "Espagne" }));
		await user.click(screen.getByRole("button", { name: "Effacer" }));
		expect((await envoyer()).get("pays")).toBe("fr");
	});

	it("un composant contrôlé n'est pas touché : sa valeur appartient au parent", async () => {
		const onChange = vi.fn();
		function Controle() {
			const [v, setV] = useState("es");
			return (
				<>
					<Select
						label="Pays"
						value={v}
						onChange={(next) => {
							onChange(next);
							setV(next);
						}}
						options={PAYS}
					/>
					<button type="reset">Effacer</button>
				</>
			);
		}
		const { user } = monterFormulaire(<Controle />);
		await user.click(screen.getByRole("button", { name: "Effacer" }));
		expect(onChange).not.toHaveBeenCalled();
	});
});
