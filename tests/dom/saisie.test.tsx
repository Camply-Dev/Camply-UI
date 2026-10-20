import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ColorPicker } from "../../src/components/ColorPicker";
import { Combobox } from "../../src/components/Combobox";
import { DatePicker } from "../../src/components/DatePicker";
import { NumberInput } from "../../src/components/NumberInput";
import { PinInput } from "../../src/components/PinInput";
import { RangeSlider } from "../../src/components/RangeSlider";
import { SegmentedControl } from "../../src/components/SegmentedControl";
import { Slider } from "../../src/components/Slider";
import { TagInput } from "../../src/components/TagInput";

/**
 * Saisie (0.3.0) : NumberInput vidable et sans émissions parasites, libellé de
 * SegmentedControl, Entrée du Combobox, calendrier au clavier, PinInput retapé,
 * TagInput plein, fin d'un glisser au pointeur.
 */

describe("NumberInput", () => {
	it("allowEmpty : vidé, il émet null et reste vide en le quittant", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<NumberInput label="Prix" allowEmpty defaultValue={12} onChange={onChange} />);
		const champ = screen.getByRole("textbox", { name: "Prix" });

		await user.clear(champ);
		expect(onChange).toHaveBeenLastCalledWith(null);
		await user.tab();
		expect(champ).toHaveValue("");
	});

	it("sans allowEmpty, vidé puis quitté, il reprend sa dernière valeur", async () => {
		const user = userEvent.setup();
		render(<NumberInput label="Prix" defaultValue={12} />);
		const champ = screen.getByRole("textbox", { name: "Prix" });

		await user.clear(champ);
		await user.tab();
		expect(champ).toHaveValue("12");
	});

	it("un pas décimal ne cumule pas d'erreur de flottant", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<NumberInput label="Dose" step={0.1} onChange={onChange} />);
		const plus = screen.getByRole("button", { name: "Augmenter" });
		await user.click(plus);
		await user.click(plus);
		await user.click(plus);
		expect(onChange).toHaveBeenLastCalledWith(0.3);
	});

	it("n'émet ni une valeur hors bornes pendant la frappe, ni rien en sortant sans changement", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<NumberInput label="Note" defaultValue={0} max={100} onChange={onChange} />);
		const champ = screen.getByRole("textbox", { name: "Note" });

		await user.clear(champ);
		await user.type(champ, "150");
		expect(onChange).not.toHaveBeenCalledWith(150);
		await user.tab();
		expect(onChange).toHaveBeenLastCalledWith(100);

		onChange.mockClear();
		await user.click(champ);
		await user.tab();
		expect(onChange).not.toHaveBeenCalled();
	});

	it("lit les espaces de milliers (« 1 000,5 »)", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<NumberInput label="Montant" onChange={onChange} />);
		const champ = screen.getByRole("textbox", { name: "Montant" });
		await user.clear(champ);
		await user.type(champ, "1 000,5");
		expect(onChange).toHaveBeenLastCalledWith(1000.5);
	});
});

describe("SegmentedControl", () => {
	it("un libellé visible nomme le groupe, l'aide le décrit", () => {
		render(
			<SegmentedControl
				label="Ajouter comme"
				hint="Le statut de la carte ajoutée."
				options={[
					{ value: "buy", label: "À acheter" },
					{ value: "owned", label: "Possédée" },
				]}
			/>,
		);
		const groupe = screen.getByRole("radiogroup", { name: "Ajouter comme" });
		expect(groupe).toHaveAccessibleDescription("Le statut de la carte ajoutée.");
	});
});

describe("Combobox", () => {
	it("liste fermée, Entrée envoie le formulaire sans changer la valeur", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn((e: { preventDefault: () => void }) => e.preventDefault());
		const onChange = vi.fn();
		render(
			<form onSubmit={onSubmit}>
				<Combobox
					label="Ville"
					onChange={onChange}
					options={[
						{ value: "ams", label: "Amsterdam" },
						{ value: "ber", label: "Berlin" },
						{ value: "par", label: "Paris" },
					]}
				/>
				<button type="submit">Envoyer</button>
			</form>,
		);
		const champ = screen.getByRole("combobox", { name: "Ville" });
		await user.type(champ, "par");
		await user.keyboard("{Enter}");
		expect(onChange).toHaveBeenLastCalledWith("par");

		await user.keyboard("{Enter}");
		// L'ancien index actif désignait « Amsterdam » dans la liste refiltrée.
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onSubmit).toHaveBeenCalledTimes(1);
	});
});

describe("DatePicker au clavier", () => {
	it("flèche bas entre dans le calendrier, les flèches déplacent le jour, Entrée choisit et rend le focus au champ", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<DatePicker label="Arrivée" defaultValue={new Date(2026, 6, 14)} onChange={onChange} />);
		const champ = screen.getByRole("textbox", { name: "Arrivée" });
		await user.click(champ);
		await user.keyboard("{ArrowDown}");
		await waitFor(() =>
			expect(screen.getByRole("button", { name: /14 juillet 2026/ })).toHaveFocus(),
		);

		await user.keyboard("{ArrowRight}{ArrowDown}");
		expect(screen.getByRole("button", { name: /22 juillet 2026/ })).toHaveFocus();
		await user.keyboard("{Enter}");

		expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 6, 22));
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		expect(champ).toHaveFocus();
	});

	it("Page suivante change de mois, Échap referme et rend le focus au champ", async () => {
		const user = userEvent.setup();
		render(<DatePicker label="Départ" defaultValue={new Date(2026, 0, 31)} />);
		const champ = screen.getByRole("textbox", { name: "Départ" });
		await user.click(champ);
		await user.keyboard("{ArrowDown}");
		await waitFor(() =>
			expect(screen.getByRole("button", { name: /31 janvier 2026/ })).toHaveFocus(),
		);

		// 31 janvier + 1 mois : le dernier jour de février, pas le 3 mars.
		await user.keyboard("{PageDown}");
		expect(screen.getByRole("button", { name: /28 février 2026/ })).toHaveFocus();

		await user.keyboard("{Escape}");
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		expect(champ).toHaveFocus();
	});

	it("en plage, le bouton annonce son libellé ET les dates choisies", () => {
		render(
			<DatePicker
				mode="range"
				label="Séjour"
				defaultRangeValue={[new Date(2026, 6, 1), new Date(2026, 6, 8)]}
			/>,
		);
		expect(
			screen.getByRole("button", { name: /Séjour.*01 juillet 2026.*08 juillet 2026/ }),
		).toBeVisible();
	});
});

describe("PinInput", () => {
	it("retaper le chiffre déjà présent fait avancer le focus", async () => {
		const user = userEvent.setup();
		render(<PinInput label="Code" length={4} defaultValue="1234" />);
		const cases = screen.getAllByRole("textbox");
		await user.click(cases[0]);
		await user.keyboard("1");
		// React n'émet aucun changement pour une valeur identique : le focus restait sur place.
		expect(cases[1]).toHaveFocus();
	});
});

describe("TagInput", () => {
	it("au tag maximal, la saisie garde le focus (en lecture seule)", async () => {
		const user = userEvent.setup();
		render(<TagInput label="Tags" max={2} />);
		const champ = screen.getByRole("textbox", { name: "Tags" });
		await user.type(champ, "lyon{Enter}nice{Enter}");
		expect(champ).toHaveFocus();
		expect(champ).toHaveAttribute("readonly");
	});
});

/** Surface de 100 px depuis x = 0 : `clientX` se lit directement en pourcentage. */
function poserLargeur(el: Element) {
	el.getBoundingClientRect = () => new DOMRect(0, 0, 100, 10);
}

describe("glisser au pointeur", () => {
	// Sur tactile, le navigateur reprend le pointeur (défilement, appui long) par
	// `pointercancel`, sans `pointerup` : la poignée suivait ensuite le doigt.
	it("Slider : pointercancel termine le glisser", () => {
		render(<Slider label="Budget" defaultValue={50} />);
		const poignee = screen.getByRole("slider", { name: "Budget" });
		poserLargeur(poignee.closest(".camply-slider__track") as Element);

		fireEvent.pointerDown(poignee, { pointerId: 1, clientX: 20 });
		fireEvent.pointerMove(poignee, { pointerId: 1, clientX: 30 });
		expect(poignee).toHaveAttribute("aria-valuenow", "30");

		fireEvent.pointerCancel(poignee, { pointerId: 1 });
		fireEvent.pointerMove(poignee, { pointerId: 1, clientX: 80 });
		expect(poignee).toHaveAttribute("aria-valuenow", "30");
	});

	it("RangeSlider : la perte de capture termine aussi le glisser", () => {
		render(<RangeSlider label="Budget" defaultValue={[20, 60]} />);
		const haute = screen.getByRole("slider", { name: "Budget maximum" });
		poserLargeur(haute.closest(".camply-rangeslider__track") as Element);

		fireEvent.pointerDown(haute, { pointerId: 1, clientX: 60 });
		fireEvent.pointerMove(haute, { pointerId: 1, clientX: 70 });
		expect(haute).toHaveAttribute("aria-valuenow", "70");

		fireEvent.lostPointerCapture(haute, { pointerId: 1 });
		fireEvent.pointerMove(haute, { pointerId: 1, clientX: 90 });
		expect(haute).toHaveAttribute("aria-valuenow", "70");
	});

	it("ColorPicker : pointercancel termine le glisser, un autre doigt est ignoré", () => {
		render(<ColorPicker label="Couleur" defaultValue="#ff0000" />);
		const opacite = screen.getByRole("slider", { name: /opacité/ });
		poserLargeur(opacite);

		fireEvent.pointerDown(opacite, { pointerId: 1, clientX: 40 });
		expect(opacite).toHaveAttribute("aria-valuenow", "40");
		fireEvent.pointerMove(opacite, { pointerId: 2, clientX: 90 });
		expect(opacite).toHaveAttribute("aria-valuenow", "40");

		fireEvent.pointerCancel(opacite, { pointerId: 1 });
		fireEvent.pointerMove(opacite, { pointerId: 1, clientX: 70 });
		expect(opacite).toHaveAttribute("aria-valuenow", "40");
	});
});
