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
			// L'échelle nommée remplace les diamètres au jugé : md vaut 52 px, le
			// diamètre par défaut d'avant — la démo montre donc la nouveauté sans bouger.
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md", "lg"] },
			{
				key: "status",
				label: "Statut",
				type: "seg",
				options: ["none", "online", "away", "busy", "offline"],
			},
		],
		defaults: { name: "Clara Morel", size: "md", status: "online" },
		render: (p) => (
			<div style={{ display: "flex", alignItems: "center", gap: 20 }}>
				<Avatar
					name={str(p.name)}
					size={str(p.size)}
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
			`import { Avatar, AvatarGroup } from "@camply/ui";\n\n<Avatar name="${p.name}" size="${p.size}"${
				p.status === "none" ? "" : ` status="${p.status}"`
			} />\n\n<AvatarGroup avatars={[{ name: "Alice" }, { name: "Jean" }]} max={3} />`,
		props: [
			["src", "string", "image ; sinon initiales dérivées du nom"],
			["name / initials", "string", "nom accessible + initiales / initiales imposées"],
			[
				"size",
				"Size | number",
				"sm 32 · md 52 · lg 72, ou un diamètre libre en px (défaut md, soit 52)",
			],
			["status", "AvatarStatus", "online · away · busy · offline (pastille de présence)"],
			[
				"AvatarGroup · avatars",
				'Omit<AvatarProps, "size" | "status">[]',
				"pile d'avatars superposés — le groupe impose le diamètre et masque les pastilles",
			],
			[
				"AvatarGroup · max / size",
				"number / Size | number",
				"chip +N au-delà (défaut 4) · diamètre imposé à la pile (défaut 38)",
			],
		],
	},

	stat: {
		component: "Stat",
		controls: [
			{ key: "delta", label: "Variation", type: "seg", options: ["-8", "0", "12.5", "42"] },
			{ key: "invertDelta", label: "Inverser le sens", type: "toggle" },
			{ key: "variant", label: "Variante", type: "seg", options: ["card", "plain"] },
			{ key: "size", label: "Taille", type: "seg", options: ["md", "sm"] },
		],
		defaults: { delta: "12.5", invertDelta: false, variant: "card", size: "md" },
		render: (p) => (
			<Stat
				label="Revenu mensuel"
				value="12 480 €"
				delta={num(p.delta)}
				invertDelta={bool(p.invertDelta)}
				variant={str(p.variant)}
				size={str(p.size)}
			/>
		),
		code: (p) =>
			`import { Stat } from "@camply/ui";\n\n<Stat\n  label="Revenu mensuel"\n  value="12 480 €"\n  delta={${p.delta}}${
				p.invertDelta ? "\n  invertDelta" : ""
			}${p.variant === "plain" ? '\n  variant="plain"' : ""}${p.size === "sm" ? '\n  size="sm"' : ""}\n/>`,
		props: [
			["label / value", "ReactNode", "libellé et valeur mise en avant"],
			[
				"delta / deltaSuffix",
				"number / string",
				"variation signée, mise en forme selon la locale (« +12,5 »), défaut suffixe % — hausse en succès, baisse en danger, zéro neutre",
			],
			["invertDelta", "boolean", "une hausse est mauvaise (ex. churn)"],
			["icon / hint", "ReactNode", "icône en haut à droite / note en bas"],
			["variant", "enum", "card (défaut) · plain — à plat, sans cadre ni fond, dans un panneau"],
			[
				"size",
				"enum",
				"md (défaut) · sm — compacte, sans icône (grille de chiffres sur téléphone)",
			],
		],
	},

	descriptionlist: {
		component: "DescriptionList",
		controls: [
			{ key: "layout", label: "Disposition", type: "seg", options: ["row", "stacked", "split"] },
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
			[
				"layout",
				"enum",
				"row (côte à côte, défaut) · stacked (empilé) · split (montants : valeur à droite, chiffres alignés)",
			],
			["divided", "boolean", "séparateur entre les lignes (défaut true)"],
		],
	},

	table: {
		component: "Table",
		controls: [
			{ key: "striped", label: "Zébrures", type: "toggle" },
			{ key: "selectable", label: "Sélection", type: "toggle" },
			{ key: "loading", label: "Chargement", type: "toggle" },
		],
		defaults: { striped: true, selectable: false, loading: false },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 520 }}>
				<Table
					striped={bool(p.striped)}
					selectable={bool(p.selectable)}
					loading={bool(p.loading)}
					data={TABLE_ROWS}
					rowKey={(r) => r.id}
					// Aucune colonne n'a besoin de `cell` : sans lui, la colonne affiche le champ
					// désigné par `key`, que le compilateur vérifie être rendable sur la ligne.
					columns={[
						{ key: "name", header: "Nom", sortValue: (r) => r.name },
						{ key: "role", header: "Rôle" },
						{
							key: "projects",
							header: "Projets",
							align: "right",
							sortValue: (r) => r.projects,
						},
					]}
				/>
			</div>
		),
		code: (p) => {
			// Les options booléennes ne sont écrites que lorsqu'elles sont activées.
			const flags = [
				p.striped ? "\n  striped" : "",
				p.selectable ? "\n  selectable" : "",
				p.loading ? "\n  loading" : "",
			].join("");
			return `import { Table } from "@camply/ui";\n\n<Table\n  data={rows}\n  rowKey={(r) => r.id}${flags}\n  columns={[\n    { key: "name", header: "Nom", sortValue: (r) => r.name },\n    { key: "role", header: "Rôle" },\n  ]}\n/>`;
		},
		props: [
			[
				"columns",
				"Column<Row>[]",
				"{ key, header, cell?, sortValue?, align?, width? } — union discriminée par cell",
			],
			[
				"columns · key",
				"RenderableKey<Row> | string",
				"champ rendable de la ligne (cell facultatif), ou identifiant libre — cell est alors exigé",
			],
			["data / rowKey", "Row[] / (row, i) => RowKey", "données typées et clé stable par ligne"],
			["sortValue", "(row) => string | number", "active le tri sur la colonne"],
			["sort / defaultSort", "SortState | null", "tri contrôlé / initial ({ key, dir })"],
			["onSortChange", "(sort) => void", "changement de tri (null = tri retiré)"],
			["selectable", "boolean", "case à cocher par ligne + case « tout » dans l'en-tête"],
			["selectedKeys / defaultSelectedKeys", "RowKey[]", "sélection contrôlée / initiale"],
			["onSelectionChange", "(keys: RowKey[]) => void", "clés des lignes cochées"],
			["onRowClick", "(row) => void", "ligne cliquable (aussi Entrée / Espace)"],
			["loading / loadingRows", "boolean / number", "squelettes pendant le chargement (défaut 4)"],
			["stickyHeader", "boolean", "en-tête collant — à combiner avec une hauteur max"],
			[
				"selectAllLabel / rowSelectionLabel",
				"string / (row, i) => string",
				'noms accessibles des cases ("Tout sélectionner" · "Sélectionner la ligne n")',
			],
			["striped / emptyState", "boolean / ReactNode", "zébrures / contenu si vide"],
			["bordered", "boolean", "cadre arrondi (défaut true) ; false : bord à bord, dans une Card"],
			[
				"--camply-table-edge-padding",
				"CSS",
				"marge des colonnes du bord (défaut 16px) — l'aligner sur celle du bloc parent",
			],
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
			`import { Tree } from "@camply/ui";\n\n<Tree${p.guides ? "\n  guides" : ""}\n  defaultExpanded={["src"]}\n  onSelect={(id, node) => open(node.data ?? id)}\n  nodes={[\n    {\n      id: "src",\n      label: "src",\n      children: [{ id: "index", label: "index.ts", data: fileFor("index") }],\n    },\n  ]}\n/>`,
		props: [
			[
				"nodes",
				"TreeNode<T>[]",
				"{ id, label, icon?, data?, children? } — data est la charge utile libre du nœud",
			],
			["selectedId / defaultSelectedId", "string", "sélection contrôlée / initiale"],
			[
				"onSelect",
				"(id: string, node: TreeNode<T>) => void",
				"sélection d'un nœud — le nœud complet arrive en second, plus besoin de le re-chercher",
			],
			[
				"expanded / defaultExpanded / onExpandedChange",
				"string[] / string[] / fn",
				"dépliage contrôlé / ids dépliés au départ / rappel — sans expanded, l'arbre se gère seul",
			],
			["guides", "boolean", "lignes verticales de guidage (défaut false)"],
			[
				"ref + attributs natifs",
				"Ref<HTMLUListElement>",
				'étalés sur la racine <ul> — role="tree", children et dangerouslySetInnerHTML restent réservés',
			],
		],
	},

	carousel: {
		component: "Carousel",
		controls: [
			{ key: "slidesPerView", label: "Visibles", type: "seg", options: ["1", "2", "3"] },
			{ key: "gap", label: "Espace", type: "seg", options: ["0", "12", "24"] },
			{ key: "effect", label: "Effet", type: "seg", options: ["slide", "fade"] },
			{
				key: "indicator",
				label: "Indicateur",
				type: "seg",
				options: ["dots", "lines", "count", "none"],
			},
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
			["slidesPerView / gap", "number", "diapos visibles (défaut 1) · espace en px (défaut 0)"],
			["effect", "CarouselEffect", "slide (défaut) · fade (fondu enchaîné, 1 diapo)"],
			["indicator", "CarouselIndicator", "dots (défaut) · lines · count (n / N) · none"],
			["arrows", "boolean", "flèches précédent/suivant (défaut true)"],
			["autoPlay", "number", "rotation auto en ms (défaut 0 = aucune)"],
			["pauseOnHover", "boolean", "pause au survol (défaut true)"],
			["loop", "boolean", "reboucle après la dernière (défaut true)"],
			["aspectRatio", "string", 'ratio du cadre, ex. "16 / 9"'],
			["index / defaultIndex / onIndexChange", "number / fn", "index contrôlé / initial"],
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
			["placeholder", "string", "texte du champ ; sinon labels.commandPalettePlaceholder"],
			["emptyMessage", "string", "état vide ; sinon labels.noCommands"],
			["aria-label", "string", "nom accessible du dialogue ; sinon labels.commandPalette"],
			["useCommandPalette()", "[open, setOpen]", "hook ⌘K/Ctrl+K prêt à l'emploi"],
		],
	},
};
