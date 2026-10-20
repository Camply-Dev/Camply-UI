import {
	Accordion,
	AccordionItem,
	Breadcrumbs,
	Menubar,
	Pagination,
	SegmentedControl,
	Steps,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	Timeline,
} from "@camply/ui";
import { bool, num, type PlaygroundConfig, str } from "./engine";

export const NAVIGATION: Record<string, PlaygroundConfig> = {
	tabs: {
		component: "Tabs",
		controls: [{ key: "variant", label: "Variante", type: "seg", options: ["line", "soft"] }],
		defaults: { variant: "line" },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 460 }}>
				<Tabs defaultValue="apercu" variant={str(p.variant)}>
					<TabList>
						<Tab value="apercu">Aperçu</Tab>
						<Tab value="specs">Spécifications</Tab>
						<Tab value="avis">Avis</Tab>
					</TabList>
					<TabPanel value="apercu">Vue d'ensemble du produit et de ses points forts.</TabPanel>
					<TabPanel value="specs">Détails techniques, dimensions et compatibilité.</TabPanel>
					<TabPanel value="avis">Ce que les clients pensent, en toute transparence.</TabPanel>
				</Tabs>
			</div>
		),
		code: (p) =>
			`import { Tab, TabList, TabPanel, Tabs } from "@camply/ui";\n\n<Tabs defaultValue="apercu"${
				p.variant === "soft" ? ' variant="soft"' : ""
			}>\n  <TabList>\n    <Tab value="apercu">Aperçu</Tab>\n    <Tab value="specs">Spécifications</Tab>\n  </TabList>\n  <TabPanel value="apercu">…</TabPanel>\n  <TabPanel value="specs">…</TabPanel>\n</Tabs>`,
		props: [
			["defaultValue", "string", "onglet ouvert au montage — requis, même en mode contrôlé"],
			["value", "string", "onglet actif piloté par le parent"],
			["onChange", "(value: string) => void", "changement d'onglet"],
			["variant", "enum", "line (soulignement, défaut) · soft (pilules)"],
			["Tab · value / icon / disabled", "—", "props de chaque onglet"],
			["TabPanel · value", "string", "panneau monté uniquement quand l'onglet est actif"],
		],
	},

	segmentedcontrol: {
		component: "SegmentedControl",
		controls: [
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md"] },
			{ key: "fullWidth", label: "Pleine largeur", type: "toggle" },
			{ key: "readOnly", label: "Lecture seule", type: "toggle" },
		],
		defaults: { size: "md", fullWidth: false, readOnly: false },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420, display: "flex", justifyContent: "center" }}>
				<SegmentedControl
					aria-label="Période"
					size={str(p.size)}
					fullWidth={bool(p.fullWidth)}
					readOnly={bool(p.readOnly)}
					style={bool(p.fullWidth) ? undefined : { minWidth: 300 }}
					defaultValue="semaine"
					options={[
						{ value: "jour", label: "Jour" },
						{ value: "semaine", label: "Semaine" },
						{ value: "mois", label: "Mois" },
					]}
				/>
			</div>
		),
		code: (p) =>
			`import { SegmentedControl } from "@camply/ui";\n\n<SegmentedControl\n  aria-label="Période"\n  size="${
				p.size
			}"${p.fullWidth ? "\n  fullWidth" : ""}${
				p.readOnly ? "\n  readOnly" : ""
			}\n  defaultValue="semaine"\n  options={[\n    { value: "jour", label: "Jour" },\n    { value: "semaine", label: "Semaine" },\n    { value: "mois", label: "Mois" },\n  ]}\n/>`,
		props: [
			["options", "SegmentOption[]", "{ value, label }"],
			["value / defaultValue", "string", "segment actif contrôlé / initial (défaut : 1re option)"],
			["onChange", "(value) => void", "changement"],
			["aria-label", "string", "nom accessible d'un sélecteur de vue — ARIA l'exige sur un groupe"],
			["label / hint", "string", "champ de formulaire : libellé visible et aide, comme RadioGroup"],
			[
				"--camply-segmented-*",
				"CSS",
				"rail, rail-border, thumb, thumb-shadow, thumb-ink — couleurs du rail et du curseur",
			],
			["size", "enum", "sm · md (défaut md)"],
			["fullWidth", "boolean", "occupe toute la largeur"],
			["readOnly", "boolean", "sélection figée : le segment actif reste focusable"],
			["name", "string", "valeur soumise avec le formulaire via un input caché"],
			["required", "boolean", "aria-required — indicatif, un segment est toujours choisi"],
		],
	},

	menubar: {
		component: "Menubar",
		controls: [],
		defaults: {},
		render: () => (
			<Menubar
				aria-label="Menu principal"
				menus={[
					{
						label: "Fichier",
						items: [
							{ label: "Nouveau", shortcut: "⌘N" },
							{ label: "Ouvrir…", shortcut: "⌘O" },
							{ label: "Enregistrer", shortcut: "⌘S", separatorBefore: true },
						],
					},
					{
						label: "Édition",
						items: [
							{ label: "Annuler", shortcut: "⌘Z" },
							{ label: "Rétablir", shortcut: "⇧⌘Z" },
							{ label: "Supprimer", danger: true, separatorBefore: true },
						],
					},
					{ label: "Affichage", items: [{ label: "Zoom avant" }, { label: "Zoom arrière" }] },
				]}
			/>
		),
		code: () =>
			`import { Menubar } from "@camply/ui";\n\n<Menubar\n  aria-label="Menu principal"\n  menus={[\n    {\n      label: "Fichier",\n      items: [\n        { label: "Nouveau", shortcut: "⌘N", onSelect: createFile },\n        { label: "Enregistrer", shortcut: "⌘S", separatorBefore: true },\n      ],\n    },\n  ]}\n/>`,
		props: [
			["menus", "MenubarMenu[]", "{ label, items }"],
			["items · label / icon / shortcut / onSelect", "—", "props de chaque entrée"],
			["items · danger / disabled / separatorBefore", "—", "état et séparation"],
			[
				"openIndex / defaultOpenIndex",
				"number | null",
				"index du menu ouvert, contrôlé / au montage (null = aucun)",
			],
			["onOpenIndexChange", "(index: number | null) => void", "ouverture ou fermeture d'un menu"],
			["aria-label", "string", "nom accessible de la barre — ARIA l'exige sur un menubar"],
		],
	},

	accordion: {
		component: "Accordion",
		controls: [
			{ key: "multiple", label: "Multiple", type: "toggle" },
			{ key: "expanded", label: "Tout déplier", type: "toggle" },
		],
		defaults: { multiple: false, expanded: false },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 460 }}>
				{/* « Tout déplier » implique le mode multiple : un seul panneau ne peut pas tout ouvrir. */}
				<Accordion
					key={`${p.multiple}-${p.expanded}`}
					multiple={bool(p.multiple) || bool(p.expanded)}
					defaultValue={bool(p.expanded) ? ["a", "b", "c"] : "a"}
				>
					<AccordionItem value="a" title="Qu'est-ce que Camply ?">
						Une librairie de composants React soignés, pensée pour le dogfooding.
					</AccordionItem>
					<AccordionItem value="b" title="Est-ce gratuit ?">
						Le cœur de la librairie est open-source et le restera.
					</AccordionItem>
					<AccordionItem value="c" title="Comment l'installer ?">
						npm i @camply/ui, puis importe les composants dont tu as besoin.
					</AccordionItem>
				</Accordion>
			</div>
		),
		code: (p) =>
			`import { Accordion, AccordionItem } from "@camply/ui";\n\n<Accordion defaultValue={${
				p.expanded ? '["a", "b"]' : '"a"'
			}}${
				p.multiple || p.expanded ? " multiple" : ""
			}>\n  <AccordionItem value="a" title="Qu'est-ce que Camply ?">\n    …\n  </AccordionItem>\n  <AccordionItem value="b" title="Est-ce gratuit ?">\n    …\n  </AccordionItem>\n</Accordion>`,
		props: [
			["multiple", "boolean", "plusieurs panneaux ouverts à la fois"],
			[
				"defaultValue",
				"AccordionValue",
				"panneau(x) ouvert(s) au montage (défaut : [] si multiple, sinon null)",
			],
			[
				"value",
				"AccordionValue",
				"panneau(x) ouverts pilotés par le parent — string | string[] | null, null ferme tout",
			],
			[
				"onChange",
				"(value: AccordionValue) => void",
				"reçoit un tableau si multiple, sinon la valeur ouverte ou null",
			],
			["AccordionItem · value / title / disabled", "—", "props de chaque panneau"],
			[
				"AccordionItem · headingLevel",
				"2 | 3 | 4 | 5 | 6",
				"niveau du titre qui enveloppe l'en-tête (défaut 3)",
			],
		],
	},

	breadcrumbs: {
		component: "Breadcrumbs",
		controls: [],
		defaults: {},
		render: () => (
			<Breadcrumbs
				items={[
					{ label: "Accueil", href: "#" },
					{ label: "Composants", href: "#" },
					{ label: "Navigation" },
				]}
			/>
		),
		code: () =>
			`import { Breadcrumbs } from "@camply/ui";\n\n<Breadcrumbs\n  items={[\n    { label: "Accueil", href: "/" },\n    { label: "Composants", href: "/composants" },\n    { label: "Navigation" },\n  ]}\n/>`,
		props: [
			["items", "Crumb[]", "{ label, href?, onClick? } — le dernier est la page courante"],
			[
				"items · href / onClick",
				"—",
				"href rend un <a>, onClick seul rend un <button> ; ignorés sur le dernier crumb",
			],
			["separator", "ReactNode", "séparateur personnalisé (défaut : chevron)"],
			[
				"nom accessible",
				"—",
				"le <nav> reprend le libellé breadcrumb du CamplyProvider (« Fil d'Ariane »)",
			],
		],
	},

	pagination: {
		component: "Pagination",
		controls: [{ key: "total", label: "Pages", type: "seg", options: ["5", "10", "20"] }],
		defaults: { total: "10" },
		render: (p) => <Pagination key={str(p.total)} total={num(p.total)} defaultPage={3} />,
		code: (p) =>
			`import { Pagination } from "@camply/ui";\n\n<Pagination\n  total={${p.total}}\n  defaultPage={3}\n  onChange={(page) => load(page)}\n/>`,
		props: [
			["total", "number", "nombre de pages"],
			["page / defaultPage", "number", "page active contrôlée / initiale (défaut 1)"],
			["onChange", "(page: number) => void", "changement"],
			["siblings", "number", "pages voisines affichées autour de l'active (défaut 1)"],
			[
				"noms accessibles",
				"—",
				"nav et flèches reprennent pagination / previousPage / nextPage du CamplyProvider",
			],
		],
	},

	steps: {
		component: "Steps",
		controls: [
			{ key: "current", label: "Étape", type: "seg", options: ["0", "1", "2"] },
			{
				key: "orientation",
				label: "Orientation",
				type: "seg",
				options: ["horizontal", "vertical"],
			},
		],
		defaults: { current: "1", orientation: "horizontal" },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 520 }}>
				<Steps
					current={num(p.current)}
					orientation={str(p.orientation)}
					steps={[
						{ label: "Compte", description: "Tes identifiants" },
						{ label: "Profil", description: "Quelques infos" },
						{ label: "Confirmation", description: "C'est parti" },
					]}
				/>
			</div>
		),
		code: (p) =>
			`import { Steps } from "@camply/ui";\n\n<Steps\n  current={${p.current}}${
				p.orientation === "vertical" ? '\n  orientation="vertical"' : ""
			}\n  steps={[\n    { label: "Compte", description: "Tes identifiants" },\n    { label: "Profil" },\n    { label: "Confirmation" },\n  ]}\n/>`,
		props: [
			["steps", "Step[]", "{ label, description? }"],
			["current", "number", "index de l'étape en cours, 0-based — requis"],
			["orientation", "enum", "horizontal (défaut) · vertical"],
			["nom accessible", "—", "la liste reprend le libellé steps du CamplyProvider"],
		],
	},

	timeline: {
		component: "Timeline",
		controls: [],
		defaults: {},
		render: () => (
			<div style={{ width: "100%", maxWidth: 460 }}>
				<Timeline
					items={[
						{
							title: "Projet créé",
							time: "09:00",
							tone: "accent",
							description: "Initialisation du dépôt et des dépendances.",
						},
						{
							title: "Composants livrés",
							time: "11:30",
							tone: "info",
							description: "Une première salve de composants intégrés.",
						},
						{ title: "En attente de review", time: "14:00", tone: "muted" },
					]}
				/>
			</div>
		),
		code: () =>
			`import { Timeline } from "@camply/ui";\n\n<Timeline\n  items={[\n    { title: "Projet créé", time: "09:00", tone: "accent", description: "…" },\n    { title: "Composants livrés", time: "11:30", tone: "info" },\n    { title: "En attente de review", time: "14:00", tone: "muted" },\n  ]}\n/>`,
		props: [
			["items", "TimelineItem[]", "{ title, time?, description?, icon?, tone? }"],
			["items · tone", "enum", "accent (défaut) · info · warn · danger · muted"],
			["items · icon", "ReactNode", "contenu de la pastille (décorative, aria-hidden)"],
		],
	},
};
