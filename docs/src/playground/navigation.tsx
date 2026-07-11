// Configs playground — famille Navigation.
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
		imports: ["Tab", "TabList", "TabPanel", "Tabs"],
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
			["value / defaultValue", "string", "onglet actif contrôlé / initial"],
			["onChange", "(value: string) => void", "changement"],
			["variant", "enum", "line (soulignement) · soft (pilules)"],
			["Tab · value / icon / disabled", "—", "props de chaque onglet"],
			["TabPanel · value", "string", "panneau affiché quand l'onglet est actif"],
		],
	},

	segmentedcontrol: {
		component: "SegmentedControl",
		controls: [
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md"] },
			{ key: "fullWidth", label: "Pleine largeur", type: "toggle" },
		],
		defaults: { size: "md", fullWidth: false },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420, display: "flex", justifyContent: "center" }}>
				<SegmentedControl
					size={str(p.size)}
					fullWidth={bool(p.fullWidth)}
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
			`import { SegmentedControl } from "@camply/ui";\n\n<SegmentedControl\n  size="${p.size}"${
				p.fullWidth ? "\n  fullWidth" : ""
			}\n  defaultValue="semaine"\n  options={[\n    { value: "jour", label: "Jour" },\n    { value: "semaine", label: "Semaine" },\n    { value: "mois", label: "Mois" },\n  ]}\n/>`,
		props: [
			["options", "SegmentOption[]", "{ value, label }"],
			["value / defaultValue", "string", "segment actif contrôlé / initial"],
			["onChange", "(value) => void", "changement"],
			["size", "enum", "sm · md"],
			["fullWidth", "boolean", "occupe toute la largeur"],
		],
	},

	menubar: {
		component: "Menubar",
		controls: [],
		defaults: {},
		render: () => (
			<Menubar
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
			`import { Menubar } from "@camply/ui";\n\n<Menubar\n  menus={[\n    {\n      label: "Fichier",\n      items: [\n        { label: "Nouveau", shortcut: "⌘N", onSelect: createFile },\n        { label: "Enregistrer", shortcut: "⌘S", separatorBefore: true },\n      ],\n    },\n  ]}\n/>`,
		props: [
			["menus", "MenubarMenu[]", "{ label, items }"],
			["items · label / icon / shortcut / onSelect", "—", "props de chaque entrée"],
			["items · danger / disabled / separatorBefore", "—", "état et séparation"],
		],
	},

	accordion: {
		component: "Accordion",
		imports: ["Accordion", "AccordionItem"],
		controls: [{ key: "multiple", label: "Multiple", type: "toggle" }],
		defaults: { multiple: false },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 460 }}>
				<Accordion key={String(p.multiple)} multiple={bool(p.multiple)} defaultValue="a">
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
			`import { Accordion, AccordionItem } from "@camply/ui";\n\n<Accordion defaultValue="a"${
				p.multiple ? " multiple" : ""
			}>\n  <AccordionItem value="a" title="Qu'est-ce que Camply ?">\n    …\n  </AccordionItem>\n  <AccordionItem value="b" title="Est-ce gratuit ?">\n    …\n  </AccordionItem>\n</Accordion>`,
		props: [
			["multiple", "boolean", "plusieurs panneaux ouverts à la fois"],
			["defaultValue", "string | string[]", "panneau(x) ouvert(s) au départ"],
			["AccordionItem · value / title / disabled", "—", "props de chaque panneau"],
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
			["items", "Crumb[]", "{ label, href? } — le dernier est la page courante"],
			["separator", "ReactNode", "séparateur personnalisé (défaut chevron)"],
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
			["page / defaultPage", "number", "page active contrôlée / initiale"],
			["onChange", "(page: number) => void", "changement"],
			["siblings", "number", "pages voisines affichées autour de l'active"],
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
			["current", "number", "index de l'étape en cours (0-based)"],
			["orientation", "enum", "horizontal · vertical"],
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
			["items · tone", "enum", "accent · info · warn · danger · muted"],
		],
	},
};
