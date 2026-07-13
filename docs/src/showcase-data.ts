import { PLAYGROUNDS } from "./playground";

type ComponentStatus = "available" | "upcoming";

export interface ComponentEntry {
	id: string;
	label: string;
	family: string;
	subfamily: string;
	status: ComponentStatus;
	description: string;
}

export const HOME = "__home";
export const GUIDE = "__guide";
export const ICONS = "__icons";
export const CSS = "__css";
export const ROADMAP = "__roadmap";

const AVAILABLE_IDS = new Set(Object.keys(PLAYGROUNDS));

const c = (
	id: string,
	label: string,
	family: string,
	subfamily: string,
	description: string,
): ComponentEntry => ({
	id,
	label,
	family,
	subfamily,
	status: AVAILABLE_IDS.has(id) ? "available" : "upcoming",
	description,
});

export const COMPONENTS: ComponentEntry[] = [
	c(
		"button",
		"Button",
		"Primitifs",
		"Boutons",
		"Bouton d'action : variantes, tailles, loading et icônes.",
	),
	c("buttongroup", "ButtonGroup", "Primitifs", "Boutons", "Groupe de boutons à bords partagés."),
	c("iconbutton", "IconButton", "Primitifs", "Boutons", "Bouton carré ne contenant qu'une icône."),
	c("toggle", "Toggle", "Primitifs", "Boutons", "Bouton bascule à deux états."),
	c("badge", "Badge", "Primitifs", "Marqueurs", "Marqueur de statut : tons, variantes, icône."),
	c("tag", "Tag", "Primitifs", "Marqueurs", "Étiquette compacte, éventuellement supprimable."),
	c("kbd", "Kbd", "Primitifs", "Marqueurs", "Représentation d'une touche clavier."),
	c("divider", "Divider", "Primitifs", "Mise en forme", "Séparateur avec libellé optionnel."),
	c("snippet", "Snippet", "Primitifs", "Mise en forme", "Bloc de code avec bouton copier."),
	c("spoiler", "Spoiler", "Primitifs", "Mise en forme", "Contenu long tronqué et dépliable."),

	c("input", "Input", "Formulaires", "Saisie", "Champ texte avec label, aide et erreur."),
	c("numberinput", "NumberInput", "Formulaires", "Saisie", "Champ numérique avec steppers."),
	c("pininput", "PinInput", "Formulaires", "Saisie", "Saisie de code à cases séparées."),
	c("textarea", "Textarea", "Formulaires", "Saisie", "Zone de texte multiligne."),
	c("taginput", "TagInput", "Formulaires", "Saisie", "Saisie d'étiquettes à la volée."),
	c("select", "Select", "Formulaires", "Sélection", "Liste déroulante personnalisée."),
	c("multiselect", "MultiSelect", "Formulaires", "Sélection", "Sélection multiple à jetons."),
	c(
		"combobox",
		"Combobox",
		"Formulaires",
		"Sélection",
		"Autocomplétion filtrante et sélectionnable.",
	),
	c("colorpicker", "ColorPicker", "Formulaires", "Sélection", "Sélecteur de couleur HSV complet."),
	c("datepicker", "DatePicker", "Formulaires", "Dates", "Calendrier : date précise ou plage."),
	c("checkbox", "Checkbox", "Formulaires", "Choix", "Case à cocher."),
	c("radiogroup", "RadioGroup", "Formulaires", "Choix", "Groupe de boutons radio exclusifs."),
	c("switch", "Switch", "Formulaires", "Choix", "Interrupteur on / off."),
	c("slider", "Slider", "Formulaires", "Curseurs", "Curseur de valeur continue."),
	c("rangeslider", "RangeSlider", "Formulaires", "Curseurs", "Curseur de plage à deux poignées."),
	c("rating", "Rating", "Formulaires", "Curseurs", "Notation par étoiles cliquables."),
	c("fileupload", "FileUpload", "Formulaires", "Fichiers", "Zone de dépôt de fichiers."),

	c("card", "Card", "Surfaces", "Conteneurs", "Conteneur de contenu."),
	c("alert", "Alert", "Surfaces", "Conteneurs", "Message d'alerte inline."),
	c("banner", "Banner", "Surfaces", "Conteneurs", "Bandeau pleine largeur."),
	c("modal", "Modal", "Surfaces", "Overlays", "Fenêtre modale centrée."),
	c("drawer", "Drawer", "Surfaces", "Overlays", "Panneau latéral coulissant."),
	c("sheet", "Sheet", "Surfaces", "Overlays", "Feuille montante (mobile)."),
	c("dropdownmenu", "DropdownMenu", "Surfaces", "Menus", "Menu déroulant d'actions."),
	c("tooltip", "Tooltip", "Surfaces", "Info-bulles", "Infobulle au survol."),
	c("popover", "Popover", "Surfaces", "Info-bulles", "Bulle ancrée à un déclencheur."),
	c("hovercard", "HoverCard", "Surfaces", "Info-bulles", "Carte riche au survol."),

	c("tabs", "Tabs", "Navigation", "Onglets", "Onglets accessibles."),
	c(
		"segmentedcontrol",
		"SegmentedControl",
		"Navigation",
		"Onglets",
		"Sélecteur segmenté à choix unique.",
	),
	c("menubar", "Menubar", "Navigation", "Onglets", "Barre de menus applicative."),
	c("accordion", "Accordion", "Navigation", "Structure", "Sections repliables."),
	c("breadcrumbs", "Breadcrumbs", "Navigation", "Structure", "Fil d'Ariane."),
	c("pagination", "Pagination", "Navigation", "Structure", "Navigation par pages."),
	c("steps", "Steps", "Navigation", "Progression", "Indicateur d'étapes."),
	c("timeline", "Timeline", "Navigation", "Progression", "Chronologie verticale."),

	c("progress", "Progress", "Feedback", "Progression", "Barre de progression."),
	c("radialprogress", "RadialProgress", "Feedback", "Progression", "Progression circulaire."),
	c("meter", "Meter", "Feedback", "Progression", "Jauge de valeur bornée."),
	c("spinner", "Spinner", "Feedback", "Chargement", "Indicateur de chargement circulaire."),
	c("skeleton", "Skeleton", "Feedback", "Chargement", "Placeholder de chargement."),
	c("toast", "Toast", "Feedback", "Notifications", "Notification éphémère."),

	c("avatar", "Avatar", "Données", "Affichage", "Image ou initiales d'un utilisateur."),
	c("stat", "Stat", "Données", "Affichage", "Statistique mise en avant (KPI)."),
	c("descriptionlist", "DescriptionList", "Données", "Affichage", "Liste clé / valeur."),
	c("table", "Table", "Données", "Affichage", "Tableau de données."),
	c("tree", "Tree", "Données", "Affichage", "Arborescence repliable."),
	c("carousel", "Carousel", "Données", "Média", "Carrousel d'éléments."),
	c("commandpalette", "CommandPalette", "Données", "Commandes", "Palette de commandes (⌘K)."),
];

export interface Subfamily {
	title: string;
	count: number;
	items: ComponentEntry[];
}

export interface Family {
	title: string;
	count: number;
	subfamilies: Subfamily[];
}

export const FAMILIES: Family[] = (() => {
	const families: Family[] = [];
	for (const entry of COMPONENTS) {
		let family = families.find((f) => f.title === entry.family);
		if (!family) {
			family = { title: entry.family, count: 0, subfamilies: [] };
			families.push(family);
		}
		let sub = family.subfamilies.find((s) => s.title === entry.subfamily);
		if (!sub) {
			sub = { title: entry.subfamily, count: 0, items: [] };
			family.subfamilies.push(sub);
		}
		sub.items.push(entry);
		sub.count += 1;
		family.count += 1;
	}
	return families;
})();

export const BY_ID: Record<string, ComponentEntry> = Object.fromEntries(
	COMPONENTS.map((entry) => [entry.id, entry]),
);

export const TOTAL = COMPONENTS.length;
export const AVAILABLE = COMPONENTS.filter((entry) => entry.status === "available");

interface TokenRow {
	name: string;
	value: string;
	color?: boolean;
}

export interface TokenGroup {
	title: string;
	rows: TokenRow[];
}

export const TOKEN_GROUPS: TokenGroup[] = [
	{
		title: "Fond & surfaces",
		rows: [
			{ name: "--camply-bg", value: "#070b12", color: true },
			{ name: "--camply-surface", value: "#0a1019", color: true },
			{ name: "--camply-surface-2", value: "#0f1a29", color: true },
			{ name: "--camply-elevated", value: "#111b2a", color: true },
		],
	},
	{
		title: "Texte",
		rows: [
			{ name: "--camply-text", value: "#e7edf5", color: true },
			{ name: "--camply-text-strong", value: "#f5f9ff", color: true },
			{ name: "--camply-text-muted", value: "#93a4bd", color: true },
			{ name: "--camply-text-muted-2", value: "#6b7d95", color: true },
		],
	},
	{
		title: "Accent",
		rows: [
			{ name: "--camply-accent", value: "#38bdf8", color: true },
			{ name: "--camply-accent-hover", value: "#7dd3fc", color: true },
			{ name: "--camply-accent-soft", value: "rgba(56,189,248,.12)", color: true },
		],
	},
	{
		title: "Sémantique",
		rows: [
			{ name: "--camply-success", value: "#5bd6a5", color: true },
			{ name: "--camply-warning", value: "#fbbf5c", color: true },
			{ name: "--camply-danger", value: "#f4796e", color: true },
			{ name: "--camply-info", value: "#a5b4fc", color: true },
		],
	},
	{
		title: "Films & élévation",
		rows: [
			{ name: "--camply-fill-1", value: "rgba(255,255,255,.02)", color: true },
			{ name: "--camply-fill-2", value: "rgba(255,255,255,.05)", color: true },
			{ name: "--camply-fill-3", value: "rgba(255,255,255,.1)", color: true },
			{ name: "--camply-fill-4", value: "rgba(255,255,255,.2)", color: true },
		],
	},
	{
		title: "Contrôles & tooltip",
		rows: [
			{ name: "--camply-field-bg", value: "rgba(0,0,0,.25)", color: true },
			{ name: "--camply-border-hover", value: "rgba(148,176,216,.32)", color: true },
			{ name: "--camply-neutral-solid", value: "#cdd9e6", color: true },
			{ name: "--camply-knob", value: "#e8eef5", color: true },
			{ name: "--camply-tooltip-bg", value: "#e8eef5", color: true },
			{ name: "--camply-tooltip-dark", value: "#1a2636", color: true },
		],
	},
	{
		title: "Rayons",
		rows: [
			{ name: "--camply-radius-sm", value: "8px" },
			{ name: "--camply-radius", value: "10px" },
			{ name: "--camply-radius-lg", value: "14px" },
			{ name: "--camply-radius-pill", value: "999px" },
		],
	},
	{
		title: "Typographie",
		rows: [
			{ name: "--camply-font-display", value: "Space Grotesk" },
			{ name: "--camply-font-sans", value: "Manrope" },
			{ name: "--camply-font-mono", value: "JetBrains Mono" },
		],
	},
];
