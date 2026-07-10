// Configs playground — famille Données.
import {
	Avatar,
	AvatarGroup,
	Button,
	Carousel,
	CommandPalette,
	DescriptionList,
	Stat,
	Table,
	Tree,
} from "@camply/ui";
import { type CSSProperties, useState } from "react";
import { Icon } from "../icons";
import type { PlaygroundConfig, Values } from "./engine";

const str = (v: unknown) => String(v);
const bool = (v: unknown) => Boolean(v);
const num = (v: unknown) => Number(v);

const TABLE_ROWS = [
	{ id: 1, name: "Alice Martin", role: "Design", projects: 12 },
	{ id: 2, name: "Bob Camply", role: "Développement", projects: 8 },
	{ id: 3, name: "Chloé Nord", role: "Produit", projects: 5 },
];

const slide = (bg: string): CSSProperties => ({
	display: "grid",
	placeItems: "center",
	height: 160,
	borderRadius: 12,
	background: bg,
	color: "#0b1220",
	fontWeight: 600,
	fontSize: 18,
});

function CommandPalettePreview(_p: Values) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button variant="secondary" onClick={() => setOpen(true)}>
				Ouvrir la palette (⌘K)
			</Button>
			<CommandPalette
				open={open}
				onClose={() => setOpen(false)}
				commands={[
					{
						id: "new",
						label: "Nouveau projet",
						group: "Actions",
						shortcut: "⌘N",
						icon: <Icon name="plus" size={15} />,
						onRun: () => setOpen(false),
					},
					{
						id: "copy",
						label: "Dupliquer le projet",
						group: "Actions",
						icon: <Icon name="copy" size={15} />,
						onRun: () => setOpen(false),
					},
					{
						id: "docs",
						label: "Ouvrir la documentation",
						group: "Aide",
						onRun: () => setOpen(false),
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
					status={p.status === "none" ? undefined : (str(p.status) as never)}
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
					layout={str(p.layout) as never}
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
			{ key: "arrows", label: "Flèches", type: "toggle" },
			{ key: "dots", label: "Points", type: "toggle" },
		],
		defaults: { arrows: true, dots: true },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420 }}>
				<Carousel arrows={bool(p.arrows)} dots={bool(p.dots)}>
					<div style={slide("linear-gradient(150deg,#7dd3fc,#38bdf8)")}>Slide 1</div>
					<div style={slide("linear-gradient(150deg,#b79ee0,#8467b0)")}>Slide 2</div>
					<div style={slide("linear-gradient(150deg,#e0c07a,#b0904a)")}>Slide 3</div>
				</Carousel>
			</div>
		),
		code: (p) =>
			`import { Carousel } from "@camply/ui";\n\n<Carousel${p.arrows ? "" : " arrows={false}"}${
				p.dots ? "" : " dots={false}"
			}>\n  <img src="/slide-1.jpg" alt="…" />\n  <img src="/slide-2.jpg" alt="…" />\n</Carousel>`,
		props: [
			["children", "ReactNode[]", "une diapositive par enfant"],
			["arrows / dots", "boolean", "flèches précédent/suivant · points indicateurs"],
			["autoPlay", "number", "défilement auto en ms (0 = désactivé)"],
			["loop", "boolean", "reboucle après la dernière (défaut true)"],
		],
	},

	commandpalette: {
		component: "CommandPalette",
		imports: ["CommandPalette", "useCommandPalette"],
		controls: [],
		defaults: {},
		render: (p) => <CommandPalettePreview {...p} />,
		code: () =>
			`import { CommandPalette, useCommandPalette } from "@camply/ui";\n\nconst [open, setOpen] = useCommandPalette(); // ⌘K / Ctrl+K\n\n<CommandPalette\n  open={open}\n  onClose={() => setOpen(false)}\n  commands={[\n    { id: "new", label: "Nouveau projet", group: "Actions", shortcut: "⌘N", onRun: create },\n    { id: "docs", label: "Documentation", group: "Aide", onRun: openDocs },\n  ]}\n/>`,
		props: [
			["open / onClose", "boolean / fn", "visibilité contrôlée"],
			["commands", "Command[]", "{ id, label, keywords?, group?, icon?, shortcut?, onRun }"],
			["placeholder / emptyMessage", "string", "textes de recherche"],
			["useCommandPalette()", "[open, setOpen]", "hook ⌘K/Ctrl+K prêt à l'emploi"],
		],
	},
};
