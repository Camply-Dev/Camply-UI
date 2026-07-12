// Configs playground — famille Primitifs.
import {
	Badge,
	Button,
	ButtonGroup,
	Divider,
	IconButton,
	Kbd,
	Snippet,
	Spoiler,
	Tag,
	Toggle,
} from "@camply/ui";
import { Icon } from "../icons";
import { bool, type PlaygroundConfig, str } from "./engine";

export const PRIMITIFS: Record<string, PlaygroundConfig> = {
	button: {
		component: "Button",
		controls: [
			{ key: "text", label: "Texte", type: "text" },
			{
				key: "variant",
				label: "Variante",
				type: "seg",
				options: ["primary", "secondary", "ghost", "soft", "danger"],
			},
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md", "lg"] },
			{ key: "state", label: "État", type: "seg", options: ["normal", "disabled", "loading"] },
			{ key: "icon", label: "Icône", type: "toggle" },
		],
		defaults: { text: "Cliquer", variant: "primary", size: "md", state: "normal", icon: false },
		render: (p) => (
			<Button
				variant={str(p.variant)}
				size={str(p.size)}
				disabled={p.state === "disabled"}
				loading={p.state === "loading"}
				leftIcon={p.icon ? <Icon name="plus" size={16} /> : undefined}
			>
				{str(p.text)}
			</Button>
		),
		code: (p) => {
			const lines = [`  variant="${p.variant}"`, `  size="${p.size}"`];
			if (p.state === "loading") lines.push("  loading");
			if (p.state === "disabled") lines.push("  disabled");
			if (p.icon) lines.push("  leftIcon={<Plus />}");
			lines.push("  onClick={handleClick}");
			return `import { Button } from "@camply/ui";\n\n<Button\n${lines.join("\n")}\n>\n  ${p.text}\n</Button>`;
		},
		props: [
			["variant", "enum", "primary · secondary · ghost · soft · danger"],
			["size", "enum", "sm · md · lg"],
			["loading", "boolean", "affiche un spinner et désactive"],
			["disabled", "boolean", "désactive le bouton"],
			["leftIcon / rightIcon", "ReactNode", "icône avant / après le label"],
			["fullWidth", "boolean", "occupe toute la largeur"],
		],
	},

	badge: {
		component: "Badge",
		controls: [
			{ key: "text", label: "Texte", type: "text" },
			{
				key: "tone",
				label: "Ton",
				type: "seg",
				options: ["accent", "neutral", "success", "warn", "danger", "info"],
			},
			{ key: "variant", label: "Variante", type: "seg", options: ["soft", "solid", "outline"] },
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md"] },
			{ key: "icon", label: "Icône", type: "seg", options: ["aucune", "check", "clock", "plus"] },
		],
		defaults: { text: "Actif", tone: "accent", variant: "soft", size: "md", icon: "check" },
		render: (p) => (
			<Badge
				tone={str(p.tone)}
				variant={str(p.variant)}
				size={str(p.size)}
				icon={p.icon !== "aucune" ? <Icon name={str(p.icon)} size={13} /> : undefined}
			>
				{str(p.text)}
			</Badge>
		),
		code: (p) => {
			const name = str(p.icon);
			const iconAttr =
				name === "aucune" ? "" : `\n  icon={<${name.charAt(0).toUpperCase() + name.slice(1)} />}`;
			return `import { Badge } from "@camply/ui";\n\n<Badge tone="${p.tone}" variant="${p.variant}"${iconAttr}>\n  ${p.text}\n</Badge>`;
		},
		props: [
			["tone", "enum", "accent · neutral · success · warn · danger · info"],
			["variant", "enum", "soft · solid · outline"],
			["size", "enum", "sm · md"],
			["icon", "ReactNode", "icône affichée avant le contenu"],
		],
	},

	buttongroup: {
		component: "ButtonGroup",
		imports: ["Button", "ButtonGroup"],
		controls: [
			{ key: "attached", label: "Attachés", type: "toggle" },
			{
				key: "orientation",
				label: "Orientation",
				type: "seg",
				options: ["horizontal", "vertical"],
			},
		],
		defaults: { attached: true, orientation: "horizontal" },
		render: (p) => (
			<ButtonGroup attached={bool(p.attached)} orientation={str(p.orientation)}>
				<Button variant="secondary">Jour</Button>
				<Button variant="secondary">Semaine</Button>
				<Button variant="secondary">Mois</Button>
			</ButtonGroup>
		),
		code: (p) =>
			`import { Button, ButtonGroup } from "@camply/ui";\n\n<ButtonGroup${p.attached ? "" : " attached={false}"}${
				p.orientation === "vertical" ? ' orientation="vertical"' : ""
			}>\n  <Button variant="secondary">Jour</Button>\n  <Button variant="secondary">Semaine</Button>\n  <Button variant="secondary">Mois</Button>\n</ButtonGroup>`,
		props: [
			["attached", "boolean", "bords partagés entre les boutons (défaut true)"],
			["orientation", "enum", "horizontal · vertical"],
			["size", "enum", "sm · md · lg — appliquée au groupe"],
		],
	},

	iconbutton: {
		component: "IconButton",
		controls: [
			{
				key: "variant",
				label: "Variante",
				type: "seg",
				options: ["primary", "secondary", "ghost", "soft", "danger"],
			},
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md", "lg"] },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { variant: "secondary", size: "md", disabled: false },
		render: (p) => (
			<IconButton
				label="Ajouter"
				variant={str(p.variant)}
				size={str(p.size)}
				disabled={bool(p.disabled)}
			>
				<Icon name="plus" size={17} />
			</IconButton>
		),
		extraAttrs: ['label="Ajouter"'],
		code: (p) =>
			`import { IconButton } from "@camply/ui";\n\n<IconButton\n  label="Ajouter"\n  variant="${p.variant}"\n  size="${p.size}"${
				p.disabled ? "\n  disabled" : ""
			}\n>\n  <Plus />\n</IconButton>`,
		props: [
			["label", "string", "libellé accessible (obligatoire, pas de texte visible)"],
			["variant", "enum", "primary · secondary · ghost · soft · danger"],
			["size", "enum", "sm · md · lg"],
		],
	},

	toggle: {
		component: "Toggle",
		controls: [
			{ key: "text", label: "Texte", type: "text" },
			{ key: "pressed", label: "Activé", type: "toggle" },
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md", "lg"] },
		],
		defaults: { text: "Gras", pressed: true, size: "md" },
		childrenKey: "text",
		render: (p) => (
			<Toggle key={String(p.pressed)} defaultPressed={bool(p.pressed)} size={str(p.size)}>
				{str(p.text)}
			</Toggle>
		),
		props: [
			["pressed / defaultPressed", "boolean", "état contrôlé / initial"],
			["onChange", "(pressed: boolean) => void", "changement d'état"],
			["size", "enum", "sm · md · lg"],
		],
	},

	tag: {
		component: "Tag",
		controls: [
			{ key: "text", label: "Texte", type: "text" },
			{ key: "removable", label: "Supprimable", type: "toggle" },
		],
		defaults: { text: "Design", removable: true },
		childrenKey: "text",
		render: (p) => <Tag onRemove={p.removable ? () => {} : undefined}>{str(p.text)}</Tag>,
		code: (p) =>
			`import { Tag } from "@camply/ui";\n\n<Tag${p.removable ? " onRemove={handleRemove}" : ""}>${p.text}</Tag>`,
		props: [
			["onRemove", "() => void", "affiche le bouton × et le rend cliquable"],
			["removeLabel", "string", "libellé accessible du bouton × (défaut « Retirer »)"],
		],
	},

	kbd: {
		component: "Kbd",
		controls: [
			{ key: "keys", label: "Touches", type: "text" },
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md"] },
		],
		defaults: { keys: "⌘ K", size: "md" },
		render: (p) => <Kbd keys={str(p.keys).split(" ").filter(Boolean)} size={str(p.size)} />,
		code: (p) => {
			const keys = str(p.keys).split(" ").filter(Boolean);
			return `import { Kbd } from "@camply/ui";\n\n<Kbd keys={${JSON.stringify(keys)}}${
				p.size === "sm" ? ' size="sm"' : ""
			} />`;
		},
		props: [
			["keys", "string[]", 'séquence de touches, ex. ["⌘", "K"]'],
			["size", "enum", "sm · md"],
			["children", "ReactNode", "alternative à keys : une seule touche"],
		],
	},

	divider: {
		component: "Divider",
		controls: [
			{ key: "label", label: "Libellé", type: "text" },
			{ key: "variant", label: "Style", type: "seg", options: ["solid", "dashed"] },
		],
		defaults: { label: "OU", variant: "solid" },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420 }}>
				<Divider label={str(p.label) || undefined} variant={str(p.variant)} />
			</div>
		),
		props: [
			["orientation", "enum", "horizontal · vertical"],
			["label", "ReactNode", "libellé centré (horizontal uniquement)"],
			["align", "enum", "start · center · end — position du libellé"],
			["variant", "enum", "solid · dashed"],
		],
	},

	snippet: {
		component: "Snippet",
		controls: [
			{ key: "text", label: "Commande", type: "text" },
			{ key: "prompt", label: "Prompt $", type: "toggle" },
		],
		defaults: { text: "npm i @camply/ui", prompt: true },
		childrenKey: "text",
		render: (p) => <Snippet prompt={bool(p.prompt)}>{str(p.text)}</Snippet>,
		props: [
			["children", "string", "texte affiché et copié"],
			["prompt", "boolean", "affiche le symbole $ de shell"],
			["wrap", "boolean", "retour à la ligne au lieu du défilement"],
			["copyText", "string", "remplace le texte copié"],
			["label", "ReactNode", "libellé au-dessus du bloc"],
		],
	},

	spoiler: {
		component: "Spoiler",
		controls: [{ key: "defaultOpen", label: "Ouvert", type: "toggle" }],
		defaults: { defaultOpen: false },
		render: (p) => (
			<div style={{ maxWidth: 520 }}>
				<Spoiler key={String(p.defaultOpen)} maxHeight={64} defaultOpen={bool(p.defaultOpen)}>
					Camply réunit une communauté de développeurs passionnés autour du web et des applications
					modernes. Notre agence livre des produits soignés, du site vitrine à l'application métier
					complète, avec une exigence constante sur le détail et l'expérience.
				</Spoiler>
			</div>
		),
		code: (p) =>
			`import { Spoiler } from "@camply/ui";\n\n<Spoiler maxHeight={64}${p.defaultOpen ? " defaultOpen" : ""}>\n  Texte long…\n</Spoiler>`,
		props: [
			["maxHeight", "number", "hauteur repliée en px (défaut 120)"],
			["showLabel / hideLabel", "string", "libellés du bouton (Voir plus / Voir moins)"],
			["defaultOpen", "boolean", "déplié au premier rendu"],
		],
	},
};
