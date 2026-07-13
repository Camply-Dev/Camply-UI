// Configs playground — famille Formulaires.
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

// Sérialise un tableau d'options en code copiable, aligné sur l'aperçu.
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
			["size", "enum", "sm · md · lg"],
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
			["min / max / step", "number", "bornes et pas (↑/↓, PageUp/Down)"],
			["precision", "number", "décimales affichées"],
			["prefix / suffix", "string", "texte avant / après la valeur"],
			["label / hint / error", "string", "libellé, aide, erreur"],
			["size", "enum", "sm · md · lg"],
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
			["type", "enum", "number · alphanumeric"],
			["mask", "boolean", "masque les caractères (style mot de passe)"],
			["onComplete", "(value: string) => void", "appelé quand toutes les cases sont remplies"],
			["autoFocus", "boolean", "focus la première case au montage"],
			["size", "enum", "sm · md · lg"],
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
			["max", "number", "nombre maximal de tags"],
			["validate", "(tag: string) => boolean", "rejette un tag candidat"],
			["unique", "boolean", "interdit les doublons (défaut true)"],
			["label / hint", "string", "libellé et aide"],
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
			`import { Select } from "@camply/ui";\n\n${optionsCode(COUNTRIES)}\n\n<Select\n  label="${p.label}"\n  options={options}\n  defaultValue="fr"${
				p.disabled ? "\n  disabled" : ""
			}\n/>`,
		props: [
			["options", "SelectOption[]", "{ value, label, disabled? }"],
			["value / defaultValue", "string", "sélection contrôlée / initiale"],
			["onChange", "(value) => void", "changement"],
			["placeholder", "string", "texte avant sélection"],
			["label", "string", "libellé au-dessus"],
			["size", "enum", "sm · md · lg"],
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
			["options", "MultiSelectOption[]", "{ value, label, disabled? }"],
			["value / defaultValue", "string[]", "sélection contrôlée / initiale"],
			["onChange", "(value: string[]) => void", "changement"],
			["max", "number", "nombre maximal sélectionnable"],
			["placeholder / label", "string", "texte avant sélection / libellé"],
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
			["options", "ComboboxOption[]", "{ value, label, disabled? }"],
			["value / defaultValue", "string", "sélection contrôlée / initiale"],
			["onChange", "(value) => void", "changement"],
			[
				"filter",
				"(option, query) => boolean",
				"filtre personnalisé (défaut : includes insensible à la casse)",
			],
			["emptyMessage", "string", "texte quand aucun résultat"],
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
			["label", "string", "libellé au-dessus"],
		],
	},

	datepicker: {
		component: "DatePicker",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { label: "Date", disabled: false },
		render: (p) => (
			<div style={{ width: 300 }}>
				<DatePicker
					label={str(p.label)}
					disabled={bool(p.disabled)}
					placeholder="Choisir une date"
				/>
			</div>
		),
		props: [
			["mode", "enum", "single (défaut, saisie JJ/MM/AAAA) · range — plage début/fin"],
			["value / defaultValue", "Date | null", "date contrôlée / initiale (mode single)"],
			[
				"rangeValue / defaultRangeValue / onRangeChange",
				"[Date|null, Date|null]",
				"plage contrôlée (mode range)",
			],
			["onChange", "(date: Date | null) => void", "changement"],
			["min / max", "Date", "bornes sélectionnables (jours et années)"],
			["locale", "string", "locale Intl (défaut fr-FR)"],
			["weekStartsOn", "0 | 1", "premier jour de semaine (défaut lundi)"],
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
				<Radio value="exp" label="Express (+10 €)" />
				<Radio value="eco" label="Économique" />
			</RadioGroup>
		),
		code: (p) =>
			`import { Radio, RadioGroup } from "@camply/ui";\n\n<RadioGroup defaultValue="std"${
				p.disabled ? " disabled" : ""
			}>\n  <Radio value="std" label="Standard" />\n  <Radio value="exp" label="Express (+10 €)" />\n  <Radio value="eco" label="Économique" />\n</RadioGroup>`,
		props: [
			["value / defaultValue", "string", "sélection contrôlée / initiale"],
			["onChange", "(value: string) => void", "changement"],
			["name", "string", "nom du groupe (généré sinon)"],
			["disabled", "boolean", "désactive tout le groupe"],
			["Radio · value / label / disabled", "—", "props de chaque option"],
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
			["spread", "boolean", "label à gauche, interrupteur à droite, pleine largeur"],
			["size", "enum", "sm · md"],
			["…input natives", "InputHTMLAttributes", "checked, defaultChecked, onChange, disabled…"],
		],
	},

	slider: {
		component: "Slider",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			{ key: "showValue", label: "Valeur affichée", type: "toggle" },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { label: "Volume", showValue: true, disabled: false },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420 }}>
				<Slider
					label={str(p.label)}
					showValue={bool(p.showValue)}
					disabled={bool(p.disabled)}
					defaultValue={64}
				/>
			</div>
		),
		extraAttrs: ["defaultValue={64}"],
		props: [
			["value / defaultValue", "number", "valeur contrôlée / initiale (défaut 50)"],
			["onChange", "(value: number) => void", "changement"],
			["min / max / step", "number", "bornes et pas"],
			["showValue / formatValue", "boolean / fn", "affichage de la valeur"],
		],
	},

	rangeslider: {
		component: "RangeSlider",
		controls: [
			{ key: "label", label: "Label", type: "text" },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { label: "Budget", disabled: false },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420 }}>
				<RangeSlider label={str(p.label)} disabled={bool(p.disabled)} defaultValue={[25, 75]} />
			</div>
		),
		extraAttrs: ["defaultValue={[25, 75]}"],
		props: [
			["value / defaultValue", "[number, number]", "plage contrôlée / initiale (défaut [25, 75])"],
			["onChange", "(value: [number, number]) => void", "changement"],
			["min / max / step", "number", "bornes et pas"],
			["minGap", "number", "écart minimal entre les deux poignées"],
			["showValue / formatValue", "boolean / fn", "affichage de la plage"],
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
			<Rating key={str(p.max)} max={num(p.max)} readOnly={bool(p.readOnly)} defaultValue={4} />
		),
		code: (p) =>
			`import { Rating } from "@camply/ui";\n\n<Rating\n  max={${p.max}}\n  defaultValue={4}${
				p.readOnly ? "\n  readOnly" : ""
			}\n  onChange={(note) => save(note)}\n/>`,
		props: [
			["value / defaultValue", "number", "note contrôlée / initiale"],
			["onChange", "(value: number) => void", "changement"],
			["max", "number", "nombre d'étoiles (défaut 5)"],
			["size", "number", "taille d'une étoile en px (défaut 24)"],
			["readOnly / disabled", "boolean", "non interactif"],
			["allowClear", "boolean", "recliquer la note la remet à 0 (défaut true)"],
			["icon", "ReactNode", "icône personnalisée"],
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
			["onChange", "(files: File[]) => void", "fichiers acceptés (objets File réels)"],
			["accept", "string", 'types acceptés, ex. ".png,.pdf"'],
			["multiple", "boolean", "plusieurs fichiers"],
			["maxSize", "number", "taille max par fichier (octets)"],
			["hint", "string", "texte d'aide sous le libellé"],
		],
	},
};
