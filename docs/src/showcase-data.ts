// Données de la vitrine (docs uniquement — PAS la librairie).
// Seuls Button et Badge sont réellement publiés ; le reste est de la roadmap.

export type SectionId = "home" | "components" | "roadmap" | "tokens";

export type ComponentStatus = "available" | "soon";

export interface ShowcaseComponent {
	name: string;
	desc: string;
	status: ComponentStatus;
}

export interface Family {
	title: string;
	desc: string;
	components: ShowcaseComponent[];
}

export const FAMILIES: Family[] = [
	{
		title: "Primitifs",
		desc: "Boutons, marqueurs et éléments de base.",
		components: [
			{
				name: "Button",
				desc: "Bouton d'action : 5 variantes, tailles, loading et icônes.",
				status: "available",
			},
			{
				name: "Badge",
				desc: "Marqueur de statut : 6 tons, soft / solid / outline, pastille.",
				status: "available",
			},
			{ name: "ButtonGroup", desc: "Groupe de boutons à bords partagés.", status: "soon" },
			{ name: "IconButton", desc: "Bouton carré ne contenant qu'une icône.", status: "soon" },
			{ name: "Tag", desc: "Étiquette compacte, éventuellement supprimable.", status: "soon" },
			{ name: "Kbd", desc: "Représentation d'une touche clavier.", status: "soon" },
			{ name: "Divider", desc: "Séparateur avec libellé optionnel.", status: "soon" },
		],
	},
	{
		title: "Formulaires",
		desc: "Saisie, sélection et contrôles.",
		components: [
			{ name: "Input", desc: "Champ texte avec label, aide et erreur.", status: "soon" },
			{ name: "Textarea", desc: "Zone de texte multiligne.", status: "soon" },
			{ name: "Select", desc: "Liste déroulante personnalisée.", status: "soon" },
			{ name: "Checkbox", desc: "Case à cocher.", status: "soon" },
			{ name: "Switch", desc: "Interrupteur on / off.", status: "soon" },
			{ name: "Slider", desc: "Curseur de valeur.", status: "soon" },
		],
	},
	{
		title: "Surfaces",
		desc: "Conteneurs et overlays.",
		components: [
			{ name: "Card", desc: "Conteneur de contenu.", status: "soon" },
			{ name: "Alert", desc: "Message contextuel inline.", status: "soon" },
			{ name: "Modal", desc: "Fenêtre modale centrée.", status: "soon" },
			{ name: "Drawer", desc: "Panneau latéral coulissant.", status: "soon" },
			{ name: "Tooltip", desc: "Infobulle au survol.", status: "soon" },
		],
	},
	{
		title: "Navigation",
		desc: "Onglets, fils d'Ariane et étapes.",
		components: [
			{ name: "Tabs", desc: "Onglets accessibles.", status: "soon" },
			{ name: "Breadcrumbs", desc: "Fil d'Ariane.", status: "soon" },
			{ name: "Pagination", desc: "Navigation par pages.", status: "soon" },
			{ name: "Steps", desc: "Indicateur d'étapes.", status: "soon" },
		],
	},
	{
		title: "Feedback",
		desc: "Progression et chargement.",
		components: [
			{ name: "Progress", desc: "Barre de progression.", status: "soon" },
			{ name: "Spinner", desc: "Indicateur de chargement.", status: "soon" },
			{ name: "Skeleton", desc: "Placeholder de chargement.", status: "soon" },
			{ name: "Toast", desc: "Notification éphémère.", status: "soon" },
		],
	},
	{
		title: "Données",
		desc: "Affichage de données.",
		components: [
			{ name: "Avatar", desc: "Image ou initiales d'un utilisateur.", status: "soon" },
			{ name: "Stat", desc: "Statistique mise en avant (KPI).", status: "soon" },
			{ name: "Table", desc: "Tableau de données.", status: "soon" },
			{ name: "Tree", desc: "Arborescence repliable.", status: "soon" },
		],
	},
];

export const FAMILY_ICON: Record<string, string> = {
	Primitifs: "components",
	Formulaires: "form",
	Surfaces: "surface",
	Navigation: "nav",
	Feedback: "feedback",
	Données: "data",
};

export const ALL_COMPONENTS = FAMILIES.flatMap((family) => family.components);
export const AVAILABLE = ALL_COMPONENTS.filter((c) => c.status === "available");
export const SOON = ALL_COMPONENTS.filter((c) => c.status === "soon");

export interface TokenRow {
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
