import {
	Avatar,
	AvatarGroup,
	Button,
	Card,
	CardDescription,
	CardTitle,
	Carousel,
	CommandPalette,
	DescriptionList,
	Stat,
	Table,
	Tree,
} from "@camply/ui";
import { Icon } from "../icons";
import { useDisclosure } from "../lib/useDisclosure";
import { bool, num, type PlaygroundConfig, str } from "./engine";

const TABLE_ROWS = [
	{ id: 1, name: "Alice Martin", role: "Design", projects: 12 },
	{ id: 2, name: "Bob Camply", role: "Développement", projects: 8 },
	{ id: 3, name: "Chloé Nord", role: "Produit", projects: 5 },
];

const CAROUSEL_SLIDES = ["Rapide", "Accessible", "Thémable", "Léger", "Zéro dépendance"];

function CommandPalettePreview() {
	const { open, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button variant="secondary" onClick={onOpen}>
				Ouvrir la palette (⌘K)
			</Button>
			<CommandPalette
				open={open}
				onClose={onClose}
				commands={[
					{
						id: "new",
						label: "Nouveau projet",
						group: "Actions",
						shortcut: "⌘N",
						icon: <Icon name="plus" size={15} />,
						onRun: onClose,
					},
					{
						id: "copy",
						label: "Dupliquer le projet",
						group: "Actions",
						icon: <Icon name="copy" size={15} />,
						onRun: onClose,
					},
					{
						id: "docs",
						label: "Ouvrir la documentation",
						group: "Aide",
						onRun: onClose,
					},
				]}
			/>
		</>
	);
}

export const DONNEES: Record<string, PlaygroundConfig> = {
	avatar: {
		component: "Avatar",
		controls: [
			{ key: "name", label: "Nom", type: "text" },
			{ key: "size", label: "Taille", type: "seg", options: ["40", "52", "68"] },
			{ key: "status", label: "Statut", type: "seg", options: ["none", "online", "away", "busy"] },
		],
		defaults: { name: "Clara Morel", size: "52", status: "online" },
		render: (p) => (
			<div style={{ display: "flex", alignItems: "center", gap: 20 }}>
				<Avatar
					name={str(p.name)}
					size={num(p.size)}
					status={p.status === "none" ? undefined : str(p.status)}
				/>
				<AvatarGroup
					avatars={[
						{ name: "Alice Martin" },
						{ name: "Jean Dupont" },
						{ name: "Chloé Nord" },
						{ name: "Bob" },
						{ name: "Zoé" },
					]}
					max={3}
				/>
			</div>
		),
		code: (p) =>
			`import { Avatar, AvatarGroup } from "@camply/ui";\n\n<Avatar name="${p.name}" size={${p.size}}${
				p.status === "none" ? "" : ` status="${p.status}"`
			} />\n\n<AvatarGroup avatars={[{ name: "Alice" }, { name: "Jean" }]} max={3} />`,
		props: [
			["src", "string", "image ; sinon initiales dérivées du nom"],
			["name / initials", "string", "alt + initiales / initiales imposées"],
			["size", "number", "diamètre en px (défaut 52)"],
			["status", "enum", "online · away · busy · offline"],
			["AvatarGroup · avatars / max", "AvatarProps[] / number", "pile d'avatars avec chip +N"],
		],
	},

	stat: {
		component: "Stat",
		controls: [
			{ key: "delta", label: "Variation", type: "seg", options: ["-8", "0", "18", "42"] },
			{ key: "invertDelta", label: "Inverser le sens", type: "toggle" },
		],
		defaults: { delta: "18", invertDelta: false },
		render: (p) => (
			<Stat
				label="Revenu mensuel"
				value="12 480 €"
				delta={num(p.delta)}
				invertDelta={bool(p.invertDelta)}
			/>
		),
		code: (p) =>
			`import { Stat } from "@camply/ui";\n\n<Stat\n  label="Revenu mensuel"\n  value="12 480 €"\n  delta={${p.delta}}${
				p.invertDelta ? "\n  invertDelta" : ""
			}\n/>`,
		props: [
			["label / value", "ReactNode", "libellé et valeur mise en avant"],
			["delta / deltaSuffix", "number / string", "variation signée (défaut suffixe %)"],
			["invertDelta", "boolean", "une hausse est mauvaise (ex. churn)"],
			["icon / hint", "ReactNode", "icône en haut à droite / note en bas"],
		],
	},

	descriptionlist: {
		component: "DescriptionList",
		controls: [
			{ key: "layout", label: "Disposition", type: "seg", options: ["row", "stacked"] },
			{ key: "divided", label: "Séparateurs", type: "toggle" },
		],
		defaults: { layout: "row", divided: true },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420 }}>
				<DescriptionList
					layout={str(p.layout)}
					divided={bool(p.divided)}
					items={[
						{ term: "Forfait", description: "Pro" },
						{ term: "Membres", description: "12 / 20" },
						{ term: "Renouvellement", description: "10 juillet 2026" },
						{ term: "Statut", description: "Actif" },
					]}
				/>
			</div>
		),
		code: (p) =>
			`import { DescriptionList } from "@camply/ui";\n\n<DescriptionList\n  layout="${p.layout}"${
				p.divided ? "" : "\n  divided={false}"
			}\n  items={[\n    { term: "Forfait", description: "Pro" },\n    { term: "Membres", description: "12 / 20" },\n  ]}\n/>`,
		props: [
			["items", "DescriptionItem[]", "{ term, description }"],
			["layout", "enum", "row (côte à côte) · stacked (empilé)"],
			["divided", "boolean", "séparateur entre les lignes (défaut true)"],
		],
	},

	table: {
		component: "Table",
		controls: [{ key: "striped", label: "Zébrures", type: "toggle" }],
		defaults: { striped: true },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 520 }}>
				<Table
					striped={bool(p.striped)}
					data={TABLE_ROWS}
					rowKey={(r) => r.id}
					columns={[
						{ key: "name", header: "Nom", cell: (r) => r.name, sortValue: (r) => r.name },
						{ key: "role", header: "Rôle", cell: (r) => r.role },
						{
							key: "projects",
							header: "Projets",
							align: "right",
							cell: (r) => r.projects,
							sortValue: (r) => r.projects,
						},
					]}
				/>
			</div>
		),
		code: (p) =>
			`import { Table } from "@camply/ui";\n\n<Table\n  data={rows}\n  rowKey={(r) => r.id}${
				p.striped ? "\n  striped" : ""
			}\n  columns={[\n    { key: "name", header: "Nom", cell: (r) => r.name, sortValue: (r) => r.name },\n    { key: "role", header: "Rôle", cell: (r) => r.role },\n  ]}\n/>`,
		props: [
			["columns", "Column<Row>[]", "{ key, header, cell?, sortValue?, align?, width? }"],
			["data / rowKey", "Row[] / fn", "données typées et clé stable par ligne"],
			["sortValue", "(row) => string | number", "active le tri sur la colonne"],
			["onRowClick", "(row) => void", "ligne cliquable"],
			["striped / emptyState", "boolean / ReactNode", "zébrures / contenu si vide"],
		],
	},

	tree: {
		component: "Tree",
		controls: [{ key: "guides", label: "Guides", type: "toggle" }],
		defaults: { guides: true },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 320 }}>
				<Tree
					guides={bool(p.guides)}
					defaultSelectedId="button"
					defaultExpanded={["src", "components"]}
					nodes={[
						{
							id: "src",
							label: "src",
							children: [
								{
									id: "components",
									label: "components",
									children: [
										{ id: "button", label: "Button.tsx" },
										{ id: "badge", label: "Badge.tsx" },
									],
								},
								{ id: "index", label: "index.ts" },
							],
						},
						{ id: "readme", label: "README.md" },
					]}
				/>
			</div>
		),
		code: (p) =>
			`import { Tree } from "@camply/ui";\n\n<Tree${p.guides ? "\n  guides" : ""}\n  defaultExpanded={["src"]}\n  onSelect={(id) => open(id)}\n  nodes={[\n    {\n      id: "src",\n      label: "src",\n      children: [{ id: "index", label: "index.ts" }],\n    },\n  ]}\n/>`,
		props: [
			["nodes", "TreeNode[]", "{ id, label, icon?, children? }"],
			["selectedId / defaultSelectedId", "string", "sélection contrôlée / initiale"],
			["onSelect", "(id: string) => void", "sélection d'un nœud"],
			["defaultExpanded", "string[]", "ids dépliés au départ"],
			["guides", "boolean", "lignes verticales de guidage"],
		],
	},

	carousel: {
		component: "Carousel",
		controls: [
			{ key: "slidesPerView", label: "Visibles", type: "seg", options: ["1", "2", "3"] },
			{ key: "gap", label: "Espace", type: "seg", options: ["0", "12", "24"] },
			{ key: "effect", label: "Effet", type: "seg", options: ["slide", "fade"] },
			{ key: "indicator", label: "Indicateur", type: "seg", options: ["dots", "lines", "count"] },
			{ key: "arrows", label: "Flèches", type: "toggle" },
		],
		defaults: {
			slidesPerView: "1",
			gap: "0",
			effect: "slide",
			indicator: "dots",
			arrows: true,
		},
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 460 }}>
				<Carousel
					slidesPerView={num(p.slidesPerView)}
					gap={num(p.gap)}
					effect={str(p.effect)}
					indicator={str(p.indicator)}
					arrows={bool(p.arrows)}
				>
					{CAROUSEL_SLIDES.map((title, i) => (
						<Card
							key={title}
							padding="lg"
							style={{
								height: 150,
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<CardTitle>{title}</CardTitle>
							<CardDescription>Diapositive {i + 1}</CardDescription>
						</Card>
					))}
				</Carousel>
			</div>
		),
		code: (p) => {
			const lines: string[] = [];
			if (num(p.slidesPerView) !== 1) lines.push(`  slidesPerView={${num(p.slidesPerView)}}`);
			if (num(p.gap) !== 0) lines.push(`  gap={${num(p.gap)}}`);
			if (p.effect !== "slide") lines.push(`  effect="${p.effect}"`);
			if (p.indicator !== "dots") lines.push(`  indicator="${p.indicator}"`);
			if (!p.arrows) lines.push("  arrows={false}");
			const attrs = lines.length ? `\n${lines.join("\n")}\n` : "";
			return `import { Carousel, Card } from "@camply/ui";\n\n<Carousel${attrs}>\n  <Card>Diapositive 1</Card>\n  <Card>Diapositive 2</Card>\n</Carousel>`;
		},
		props: [
			["children", "ReactNode[]", "une diapositive par enfant"],
			["slidesPerView / gap", "number", "diapos visibles à la fois · espace (px)"],
			["effect", "enum", "slide (défaut) · fade (fondu enchaîné)"],
			["indicator", "enum", "dots (défaut) · lines · count (n / N)"],
			["arrows / dots", "boolean", "flèches précédent/suivant · indicateur visible"],
			["autoPlay / pauseOnHover", "number / boolean", "défilement auto (ms) · pause au survol"],
			["loop", "boolean", "reboucle après la dernière (défaut true)"],
			["aspectRatio", "string", 'ratio du cadre, ex. "16 / 9"'],
			["index / defaultIndex / onIndexChange", "number / fn", "index contrôlé"],
		],
	},

	commandpalette: {
		component: "CommandPalette",
		imports: ["CommandPalette", "useCommandPalette"],
		controls: [],
		defaults: {},
		render: () => <CommandPalettePreview />,
		code: () =>
			`import { CommandPalette, useCommandPalette } from "@camply/ui";\n\nconst [open, setOpen] = useCommandPalette(); // ⌘K / Ctrl+K\n\n<CommandPalette\n  open={open}\n  onClose={onClose}\n  commands={[\n    { id: "new", label: "Nouveau projet", group: "Actions", shortcut: "⌘N", onRun: create },\n    { id: "docs", label: "Documentation", group: "Aide", onRun: openDocs },\n  ]}\n/>`,
		props: [
			["open / onClose", "boolean / fn", "visibilité contrôlée"],
			["commands", "Command[]", "{ id, label, keywords?, group?, icon?, shortcut?, onRun }"],
			["placeholder / emptyMessage", "string", "textes de recherche"],
			["useCommandPalette()", "[open, setOpen]", "hook ⌘K/Ctrl+K prêt à l'emploi"],
		],
	},
};
