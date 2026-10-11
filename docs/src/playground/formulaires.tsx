import {
	Checkbox,
	ColorPicker,
	Combobox,
	DatePicker,
	FileUpload,
	Input,
	MultiSelect,
	NumberInput,
	PinInput,
	Radio,
	RadioGroup,
	RangeSlider,
	Rating,
	Select,
	Slider,
	Switch,
	TagInput,
	Textarea,
} from "@camply/ui";
import { bool, num, type PlaygroundConfig, str } from "./engine";

const COUNTRIES = [
	{ value: "fr", label: "France" },
	{ value: "be", label: "Belgique" },
	{ value: "ch", label: "Suisse" },
	{ value: "ca", label: "Canada" },
	{ value: "de", label: "Allemagne" },
];

const FRAMEWORKS = [
	{ value: "react", label: "React" },
	{ value: "next", label: "Next.js" },
	{ value: "vue", label: "Vue" },
	{ value: "svelte", label: "Svelte" },
];

const optionsCode = (options: { value: string; label: string }[]) =>
	`const options = [\n${options
		.map((o) => `  { value: "${o.value}", label: "${o.label}" },`)
		.join("\n")}\n];`;

export const FORMULAIRES: Record<string, PlaygroundConfig> = {
	input: {
		component: "Input",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			{ key: "placeholder", label: "Placeholder", type: "text" },
			{ key: "state", label: "État", type: "seg", options: ["normal", "error", "disabled"] },
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md", "lg"] },
		],
		defaults: { label: "Nom", placeholder: "Jean Dupont", state: "normal", size: "md" },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 360 }}>
				<Input
					label={str(p.label)}
					placeholder={str(p.placeholder)}
					size={str(p.size)}
					error={p.state === "error" ? "Champ invalide" : undefined}
					disabled={p.state === "disabled"}
				/>
			</div>
		),
		code: (p) => {
			const lines = [
				`  label="${p.label}"`,
				`  placeholder="${p.placeholder}"`,
				`  size="${p.size}"`,
			];
			if (p.state === "error") lines.push('  error="Champ invalide"');
			if (p.state === "disabled") lines.push("  disabled");
			return `import { Input } from "@camply/ui";\n\n<Input\n${lines.join("\n")}\n/>`;
		},
		props: [
			["label", "string", "libellé au-dessus du champ"],
			["hint / error", "string", "texte d'aide / message d'erreur (remplace hint)"],
			["leftIcon / rightIcon", "ReactNode", "icône dans le champ"],
			["size", "enum", "sm · md · lg (défaut md)"],
			["required", "boolean", "astérisque dans le label + validation native"],
			["…input natives", "InputHTMLAttributes", "value, onChange, type, placeholder…"],
		],
	},

	numberinput: {
		component: "NumberInput",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			{ key: "suffix", label: "Suffixe", type: "text" },
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md", "lg"] },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { label: "Quantité", suffix: "", size: "md", disabled: false },
		render: (p) => (
			<div style={{ width: 200 }}>
				<NumberInput
					label={str(p.label)}
					suffix={str(p.suffix) || undefined}
					size={str(p.size)}
					disabled={bool(p.disabled)}
					defaultValue={3}
					min={0}
				/>
			</div>
		),
		extraAttrs: ["defaultValue={3}", "min={0}"],
		props: [
			["value / defaultValue", "number", "valeur contrôlée / initiale (défaut 0)"],
			["onChange", "(value: number) => void", "changement"],
			[
				"min / max / step",
				"number",
				"bornes (aucune par défaut), pas (défaut 1) — ↑/↓, PageUp/Down ×10",
			],
			["precision", "number", "décimales affichées (arrondi au commit)"],
			["prefix / suffix", "string", "texte avant / après la valeur"],
			["label / hint / error", "string", "libellé, aide, erreur"],
			["readOnly", "boolean", "valeur figée : boutons et flèches inertes"],
			["size", "enum", "sm · md · lg (défaut md)"],
		],
	},

	pininput: {
		component: "PinInput",
		controls: [
			{ key: "length", label: "Cases", type: "seg", options: ["4", "5", "6"] },
			{ key: "mask", label: "Masqué", type: "toggle" },
		],
		defaults: { length: "4", mask: false },
		render: (p) => (
			<PinInput
				key={`${p.length}-${p.mask}`}
				length={num(p.length)}
				mask={bool(p.mask)}
				defaultValue="4821"
			/>
		),
		code: (p) =>
			`import { PinInput } from "@camply/ui";\n\n<PinInput\n  length={${p.length}}${p.mask ? "\n  mask" : ""}\n  onComplete={(code) => verify(code)}\n/>`,
		props: [
			["length", "number", "nombre de cases (défaut 6)"],
			["value / defaultValue", "string", "code contrôlé / initial"],
			["onChange", "(value: string) => void", "changement"],
			["onComplete", "(value: string) => void", "appelé quand toutes les cases sont remplies"],
			["type", "enum", "number (défaut) · alphanumeric"],
			["mask", "boolean", "masque les caractères (style mot de passe)"],
			["label / hint / error", "string", "libellé, aide, erreur"],
			[
				"cellLabel",
				"(index: number) => string",
				"nom accessible d'une case (défaut « <label> <position> »)",
			],
			["name", "string", "soumis via un input caché portant le code complet"],
			["required", "boolean", "le code doit être complet pour soumettre"],
			["readOnly / disabled", "boolean", "cases figées (focusables) / inertes (rien n'est soumis)"],
			["autoFocus", "boolean", "focus la première case au montage"],
			["size", "enum", "sm · md · lg (défaut md)"],
		],
	},

	textarea: {
		component: "Textarea",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			{ key: "placeholder", label: "Placeholder", type: "text" },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { label: "Message", placeholder: "Écris ton message…", disabled: false },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420 }}>
				<Textarea
					label={str(p.label)}
					placeholder={str(p.placeholder)}
					disabled={bool(p.disabled)}
				/>
			</div>
		),
		props: [
			["label / hint / error", "string", "libellé, aide, erreur"],
			["rows", "number", "lignes visibles (défaut 4)"],
			["required", "boolean", "astérisque dans le label + validation native"],
			["…textarea natives", "TextareaHTMLAttributes", "value, onChange, placeholder…"],
		],
	},

	taginput: {
		component: "TagInput",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { label: "Technologies", disabled: false },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 360 }}>
				<TagInput
					label={str(p.label)}
					disabled={bool(p.disabled)}
					defaultValue={["design", "web"]}
				/>
			</div>
		),
		extraAttrs: ['defaultValue={["design", "web"]}'],
		props: [
			["value / defaultValue", "string[]", "tags contrôlés / initiaux"],
			["onChange", "(value: string[]) => void", "changement"],
			["placeholder", "string", "texte de la saisie vide (défaut : libellés de la lib)"],
			["max", "number", "nombre maximal de tags"],
			["validate", "(tag: string) => boolean", "rejette un tag candidat"],
			["unique", "boolean", "interdit les doublons (défaut true)"],
			["name", "string", "un input caché par tag — côté serveur FormData.getAll"],
			["required", "boolean", "au moins un tag (validation portée par la saisie)"],
			["readOnly / disabled", "boolean", "tags figés / champ inerte (rien n'est soumis)"],
			["label / hint / error", "string", "libellé, aide, erreur"],
		],
	},

	select: {
		component: "Select",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md", "lg"] },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { label: "Pays", size: "md", disabled: false },
		render: (p) => (
			<div style={{ width: 280 }}>
				<Select
					label={str(p.label)}
					size={str(p.size)}
					disabled={bool(p.disabled)}
					defaultValue="fr"
					options={COUNTRIES}
				/>
			</div>
		),
		code: (p) =>
			`import { Select } from "@camply/ui";\n\n${optionsCode(COUNTRIES)}\n\n<Select\n  label="${p.label}"\n  size="${p.size}"\n  options={options}\n  defaultValue="fr"${
				p.disabled ? "\n  disabled" : ""
			}\n/>`,
		props: [
			["options", "SelectOption[]", "alias de Option — { value, label, disabled? }"],
			["value / defaultValue", "string", "sélection contrôlée / initiale"],
			["onChange", "(value) => void", "changement"],
			["placeholder", "string", "texte avant sélection (défaut : libellés de la lib)"],
			["label / hint / error", "string", "libellé, aide, erreur"],
			["name", "string", "input caché ; un champ désactivé ne soumet rien"],
			["required", "boolean", "astérisque + aria-required (l'erreur passe par error)"],
			["size", "enum", "sm · md · lg (défaut md)"],
			["ref", "Ref<HTMLButtonElement>", "vise le bouton déclencheur (focus après validation)"],
		],
	},

	multiselect: {
		component: "MultiSelect",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { label: "Frameworks", disabled: false },
		render: (p) => (
			<div style={{ width: 320 }}>
				<MultiSelect
					label={str(p.label)}
					disabled={bool(p.disabled)}
					defaultValue={["react", "next"]}
					options={FRAMEWORKS}
				/>
			</div>
		),
		code: (p) =>
			`import { MultiSelect } from "@camply/ui";\n\n${optionsCode(FRAMEWORKS)}\n\n<MultiSelect\n  label="${p.label}"\n  options={options}\n  defaultValue={["react", "next"]}${
				p.disabled ? "\n  disabled" : ""
			}\n/>`,
		props: [
			["options", "MultiSelectOption[]", "alias de Option — { value, label, disabled? }"],
			["value / defaultValue", "string[]", "sélection contrôlée / initiale"],
			["onChange", "(value: string[]) => void", "changement"],
			["placeholder", "string", "texte avant sélection (défaut : libellés de la lib)"],
			["max", "number", "nombre maximal sélectionnable"],
			["label / hint / error", "string", "libellé, aide, erreur"],
			["name", "string", "un input caché par valeur — côté serveur FormData.getAll"],
			["required", "boolean", "astérisque + aria-required (l'erreur passe par error)"],
			["ref", "Ref<HTMLButtonElement>", "vise le bouton déclencheur"],
		],
	},

	combobox: {
		component: "Combobox",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { label: "Pays", disabled: false },
		render: (p) => (
			<div style={{ width: 300 }}>
				<Combobox
					label={str(p.label)}
					disabled={bool(p.disabled)}
					options={COUNTRIES}
					placeholder="Rechercher un pays…"
				/>
			</div>
		),
		code: (p) =>
			`import { Combobox } from "@camply/ui";\n\n${optionsCode(COUNTRIES)}\n\n<Combobox\n  label="${p.label}"\n  options={options}\n  placeholder="Rechercher un pays…"${
				p.disabled ? "\n  disabled" : ""
			}\n/>`,
		props: [
			["options", "ComboboxOption[]", "alias de Option — { value, label, disabled? }"],
			["value / defaultValue", "string", "sélection contrôlée / initiale"],
			["onChange", "(value) => void", "changement"],
			["placeholder", "string", "champ de recherche (défaut : libellés de la lib)"],
			[
				"filter",
				"(option, query) => boolean",
				"filtre personnalisé (défaut : includes insensible à la casse)",
			],
			["emptyMessage", "string", "aucun résultat (défaut : libellés de la lib)"],
			["label / hint / error", "string", "libellé, aide, erreur"],
			["name", "string", "input caché portant la valeur choisie, pas la recherche"],
			["required", "boolean", "astérisque + aria-required (l'erreur passe par error)"],
			["ref", "Ref<HTMLInputElement>", "vise le champ de recherche"],
		],
	},

	colorpicker: {
		component: "ColorPicker",
		controls: [
			{ key: "variant", label: "Variante", type: "seg", options: ["full", "compact", "swatch"] },
			{ key: "label", label: "Label", type: "text" },
		],
		defaults: { variant: "full", label: "" },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 320, display: "flex", justifyContent: "center" }}>
				<ColorPicker
					key={str(p.variant)}
					variant={str(p.variant)}
					label={str(p.label) || undefined}
					defaultValue="#38bdf8"
				/>
			</div>
		),
		code: (p) => {
			const lines = [`  variant="${p.variant}"`];
			if (p.label) lines.push(`  label="${p.label}"`);
			lines.push('  defaultValue="#38bdf8"');
			return `import { ColorPicker } from "@camply/ui";\n\n<ColorPicker\n${lines.join("\n")}\n/>`;
		},
		props: [
			[
				"variant",
				"enum",
				"full (en ligne) · compact (pastille + valeur) · swatch (carré seul) — palette au survol",
			],
			["value / defaultValue", "string", 'hex contrôlé / initial, ex. "#38bdf8"'],
			["onChange", "(hex: string) => void", "changement"],
			["alpha / defaultAlpha", "number", "opacité 0–1 (éditable via HEX #RRGGBBAA ou RGBA)"],
			["onAlphaChange", "(alpha: number) => void", "changement d'opacité"],
			["placeholder", "string", "déclencheur sans couleur (défaut : libellés de la lib)"],
			["label / hint / error", "string", "libellé, aide, erreur"],
			["name", "string", "input caché portant le hex"],
			["required", "boolean", "astérisque dans le label"],
		],
	},

	datepicker: {
		component: "DatePicker",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			{ key: "mode", label: "Mode", type: "seg", options: ["single", "range"] },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { label: "Date", mode: "single", disabled: false },
		// `mode` discrimine l'union de props : les deux branches sont écrites en
		// littéral, faute de quoi TypeScript ne peut pas la réduire.
		render: (p) =>
			p.mode === "range" ? (
				<div style={{ width: 300 }}>
					<DatePicker key="range" mode="range" label={str(p.label)} disabled={bool(p.disabled)} />
				</div>
			) : (
				<div style={{ width: 300 }}>
					<DatePicker key="single" label={str(p.label)} disabled={bool(p.disabled)} />
				</div>
			),
		code: (p) => {
			const lines = [`  label="${p.label}"`];
			if (p.mode === "range") lines.push('  mode="range"');
			if (p.disabled) lines.push("  disabled");
			return `import { DatePicker } from "@camply/ui";\n\n<DatePicker\n${lines.join("\n")}\n/>`;
		},
		props: [
			["mode", "enum", "single (défaut, saisie JJ/MM/AAAA) · range — discrimine les props"],
			[
				"value / defaultValue / onChange",
				"Date | null",
				"date contrôlée / initiale et rappel (mode single)",
			],
			[
				"rangeValue / defaultRangeValue / onRangeChange",
				"[Date|null, Date|null]",
				"plage contrôlée / initiale et rappel (mode range)",
			],
			["min / max", "Date", "bornes sélectionnables (jours et années)"],
			["placeholder", "string", "champ vide (défaut : libellés de la lib)"],
			["label / hint / error", "string", "libellé, aide, erreur"],
			["name", "string", "input caché en YYYY-MM-DD (deux en mode range)"],
			["required", "boolean", "astérisque ; en mode range l'absence se signale via error"],
			["locale", "string", "locale Intl (défaut : celle du CamplyProvider)"],
			["weekStartsOn", "0 … 6", "premier jour de semaine (défaut : déduit de la locale)"],
		],
	},

	checkbox: {
		component: "Checkbox",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			{ key: "checked", label: "Coché", type: "toggle" },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { label: "Recevoir la newsletter", checked: true, disabled: false },
		render: (p) => (
			<Checkbox
				key={String(p.checked)}
				label={str(p.label)}
				defaultChecked={bool(p.checked)}
				disabled={bool(p.disabled)}
			/>
		),
		props: [
			["label", "string", "libellé cliquable"],
			["hint / error", "string", "texte d'aide / message d'erreur (remplace hint)"],
			["required", "boolean", "astérisque après le libellé + validation native"],
			["…input natives", "InputHTMLAttributes", "checked, defaultChecked, onChange, disabled…"],
		],
	},

	radiogroup: {
		component: "RadioGroup",
		imports: ["Radio", "RadioGroup"],
		controls: [{ key: "disabled", label: "Désactivé", type: "toggle" }],
		defaults: { disabled: false },
		render: (p) => (
			<RadioGroup defaultValue="std" disabled={bool(p.disabled)}>
				<Radio value="std" label="Standard" />
				<Radio value="exp" label="Express (+10 €)" hint="Livré le lendemain avant 13 h" />
				<Radio value="eco" label="Économique" />
			</RadioGroup>
		),
		code: (p) =>
			`import { Radio, RadioGroup } from "@camply/ui";\n\n<RadioGroup defaultValue="std"${
				p.disabled ? " disabled" : ""
			}>\n  <Radio value="std" label="Standard" />\n  <Radio value="exp" label="Express (+10 €)" hint="Livré le lendemain avant 13 h" />\n  <Radio value="eco" label="Économique" />\n</RadioGroup>`,
		props: [
			["value / defaultValue", "string", "sélection contrôlée / initiale"],
			["onChange", "(value: string) => void", "changement"],
			["name", "string", "nom du groupe (généré sinon)"],
			["label / hint / error", "string", "libellé, aide, erreur du groupe"],
			["required", "boolean", "une option doit être cochée (validation native + astérisque)"],
			["disabled", "boolean", "désactive tout le groupe"],
			["Radio · value / label / disabled", "—", "props de chaque option"],
			["Radio · hint", "string", "précision sous l'option, annoncée comme sa description"],
		],
	},

	switch: {
		component: "Switch",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			{ key: "checked", label: "Activé", type: "toggle" },
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md"] },
		],
		defaults: { label: "Notifications", checked: true, size: "md" },
		render: (p) => (
			<Switch
				key={String(p.checked)}
				label={str(p.label)}
				defaultChecked={bool(p.checked)}
				size={str(p.size)}
			/>
		),
		props: [
			["label", "string", "libellé cliquable"],
			["hint / error", "string", "texte d'aide / message d'erreur (remplace hint)"],
			["required", "boolean", "astérisque après le libellé + validation native"],
			["spread", "boolean", "label à gauche, interrupteur à droite, pleine largeur"],
			["size", "enum", "sm · md (défaut md)"],
			["…input natives", "InputHTMLAttributes", "checked, defaultChecked, onChange, disabled…"],
		],
	},

	slider: {
		component: "Slider",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			// Un seul axe d'état : `error` remplace `hint`, les deux ensemble n'ont pas
			// de rendu — le contrôle le dit mieux que deux bascules indépendantes.
			{ key: "state", label: "État", type: "seg", options: ["aide", "erreur", "neutre"] },
			{ key: "showValue", label: "Valeur affichée", type: "toggle" },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { label: "Volume", state: "aide", showValue: true, disabled: false },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420 }}>
				<Slider
					label={str(p.label)}
					hint={p.state === "aide" ? "0 = silence, 100 = maximum" : undefined}
					error={p.state === "erreur" ? "Au-dessus du seuil autorisé" : undefined}
					showValue={bool(p.showValue)}
					disabled={bool(p.disabled)}
					defaultValue={64}
				/>
			</div>
		),
		code: (p) => {
			const lines = [`  label="${p.label}"`];
			if (p.state === "aide") lines.push('  hint="0 = silence, 100 = maximum"');
			if (p.state === "erreur") lines.push('  error="Au-dessus du seuil autorisé"');
			if (!p.showValue) lines.push("  showValue={false}");
			if (p.disabled) lines.push("  disabled");
			lines.push("  defaultValue={64}");
			return `import { Slider } from "@camply/ui";\n\n<Slider\n${lines.join("\n")}\n/>`;
		},
		props: [
			["value / defaultValue", "number", "valeur contrôlée / initiale (défaut 50)"],
			["onChange", "(value: number) => void", "changement"],
			["min / max / step", "number", "bornes et pas (défaut 0, 100, 1)"],
			["label", "string", "libellé au-dessus du rail"],
			[
				"hint / error",
				"string",
				"texte d'aide sous la piste / message d'erreur — l'erreur remplace l'aide, teinte la jauge et pose aria-invalid",
			],
			["showValue / formatValue", "boolean / fn", "affichage de la valeur (défaut true)"],
			["name", "string", "input caché ; un slider désactivé ne soumet rien"],
			["required", "boolean", "astérisque seul — ARIA n'admet pas aria-required ici"],
			["readOnly / disabled", "boolean", "valeur figée (poignée focusable) / champ inerte"],
		],
	},

	rangeslider: {
		component: "RangeSlider",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			{ key: "state", label: "État", type: "seg", options: ["aide", "erreur", "neutre"] },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { label: "Budget", state: "aide", disabled: false },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420 }}>
				<RangeSlider
					label={str(p.label)}
					hint={p.state === "aide" ? "Fourchette en milliers d'euros" : undefined}
					error={p.state === "erreur" ? "La fourchette dépasse le budget" : undefined}
					disabled={bool(p.disabled)}
					defaultValue={[25, 75]}
				/>
			</div>
		),
		code: (p) => {
			const lines = [`  label="${p.label}"`];
			if (p.state === "aide") lines.push('  hint="Fourchette en milliers d\'euros"');
			if (p.state === "erreur") lines.push('  error="La fourchette dépasse le budget"');
			if (p.disabled) lines.push("  disabled");
			lines.push("  defaultValue={[25, 75]}");
			return `import { RangeSlider } from "@camply/ui";\n\n<RangeSlider\n${lines.join("\n")}\n/>`;
		},
		props: [
			["value / defaultValue", "[number, number]", "plage contrôlée / initiale (défaut [25, 75])"],
			["onChange", "(value: [number, number]) => void", "changement"],
			["min / max / step", "number", "bornes et pas (défaut 0, 100, 1)"],
			["minGap", "number", "écart minimal entre les deux poignées"],
			["label", "string", "libellé au-dessus du rail"],
			[
				"hint / error",
				"string",
				"texte d'aide sous la piste / message d'erreur — l'erreur remplace l'aide, teinte la jauge et pose aria-invalid",
			],
			["showValue / formatValue", "boolean / fn", "affichage de la plage (défaut true)"],
			[
				"minLabel / maxLabel",
				"string",
				"noms accessibles des poignées (défaut : label + libellés de la lib)",
			],
			["name", "string", "deux inputs cachés, suffixés -min et -max"],
			["required", "boolean", "astérisque seul — ARIA n'admet pas aria-required ici"],
			["readOnly / disabled", "boolean", "plage figée (poignées focusables) / champ inerte"],
		],
	},

	rating: {
		component: "Rating",
		controls: [
			{ key: "max", label: "Étoiles", type: "seg", options: ["3", "5", "7"] },
			{ key: "readOnly", label: "Lecture seule", type: "toggle" },
		],
		defaults: { max: "5", readOnly: false },
		render: (p) => (
			<Rating
				key={str(p.max)}
				label="Qualité"
				max={num(p.max)}
				readOnly={bool(p.readOnly)}
				defaultValue={4}
			/>
		),
		code: (p) =>
			`import { Rating } from "@camply/ui";\n\n<Rating\n  label="Qualité"\n  max={${p.max}}\n  defaultValue={4}${
				p.readOnly ? "\n  readOnly" : ""
			}\n  onChange={(note) => save(note)}\n/>`,
		props: [
			["value / defaultValue", "number", "note contrôlée / initiale (défaut 0)"],
			["onChange", "(value: number) => void", "changement"],
			["max", "number", "nombre d'étoiles (défaut 5)"],
			["size", "number", "taille d'une étoile en px (défaut 24)"],
			["label", "string", "nom accessible du groupe (exigé par ARIA) — préfixe chaque étoile"],
			["formatValue", "(value, max) => string", 'nom d\'une étoile (défaut "3/5")'],
			["readOnly / disabled", "boolean", "non interactif"],
			["allowClear", "boolean", "recliquer la note la remet à 0 (défaut true)"],
			["icon", "ReactNode", "icône personnalisée"],
			["name", "string", "input caché portant la note"],
			["required", "boolean", "aria-required — une note à 0 se rejette côté application"],
		],
	},

	fileupload: {
		component: "FileUpload",
		controls: [
			{ key: "hint", label: "Aide", type: "text" },
			{ key: "multiple", label: "Multiple", type: "toggle" },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { hint: "PNG, PDF · 10 Mo max", multiple: false, disabled: false },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420 }}>
				<FileUpload
					key={String(p.multiple)}
					hint={str(p.hint)}
					multiple={bool(p.multiple)}
					disabled={bool(p.disabled)}
				/>
			</div>
		),
		props: [
			[
				"files / defaultFiles",
				"UploadFile[]",
				"liste contrôlée / initiale — { id, file, status, progress? }",
			],
			["onFilesChange", "(files: UploadFile[]) => void", "changement de la liste complète"],
			["onChange", "(files: File[]) => void", "raccourci : les objets File bruts"],
			[
				"onUpload",
				"(file, onProgress) => Promise<void>",
				"uploader fourni par l'appelant — sans lui, aucun envoi ni barre de progression",
			],
			["accept", "string", 'types acceptés, ex. ".png,.pdf"'],
			["multiple", "boolean", "plusieurs fichiers"],
			["maxSize", "number", "taille max par fichier (octets)"],
			["label / hint / error", "string", "libellé, aide, erreur"],
			["name", "string", "nom du champ pour la soumission native"],
			["required", "boolean", "astérisque + validation native (l'input fichier est réel)"],
		],
	},
};
