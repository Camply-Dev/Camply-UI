import {
	Badge,
	Button,
	ButtonGroup,
	Divider,
	IconButton,
	Kbd,
	Snippet,
	Spoiler,
	Stack,
	type StackGap,
	Tag,
	Toggle,
} from "@camply/ui";
import { Icon } from "../icons";
import { bool, num, type PlaygroundConfig, str } from "./engine";

export const PRIMITIFS: Record<string, PlaygroundConfig> = {
	button: {
		component: "Button",
		controls: [
			{ key: "text", label: "Texte", type: "text" },
			{
				key: "variant",
				label: "Variante",
				type: "seg",
				options: ["primary", "secondary", "ghost", "soft"],
			},
			// Deux axes séparés depuis la 0.2.0 : la variante dit la FORME, le ton la
			// SÉMANTIQUE. L'ancien variant="danger" se lit désormais tone="danger".
			{
				key: "tone",
				label: "Ton",
				type: "seg",
				options: ["accent", "neutral", "success", "warn", "danger", "info"],
			},
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md", "lg"] },
			{ key: "state", label: "État", type: "seg", options: ["normal", "disabled", "loading"] },
			{ key: "icon", label: "Icône", type: "toggle" },
		],
		defaults: {
			text: "Cliquer",
			variant: "primary",
			tone: "accent",
			size: "md",
			state: "normal",
			icon: false,
		},
		render: (p) => (
			<Button
				variant={str(p.variant)}
				tone={str(p.tone)}
				size={str(p.size)}
				disabled={p.state === "disabled"}
				loading={p.state === "loading"}
				leftIcon={p.icon ? <Icon name="plus" size={16} /> : undefined}
			>
				{str(p.text)}
			</Button>
		),
		code: (p) => {
			const lines = [`  variant="${p.variant}"`];
			// Le ton par défaut ne s'écrit pas : l'extrait doit rester le code le plus court
			// qui produit ce rendu.
			if (p.tone !== "accent") lines.push(`  tone="${p.tone}"`);
			lines.push(`  size="${p.size}"`);
			if (p.state === "loading") lines.push("  loading");
			if (p.state === "disabled") lines.push("  disabled");
			if (p.icon) lines.push("  leftIcon={<Plus />}");
			lines.push("  onClick={handleClick}");
			return `import { Button } from "@camply/ui";\n\n<Button\n${lines.join("\n")}\n>\n  ${p.text}\n</Button>`;
		},
		props: [
			["variant", "ButtonVariant", "forme : primary · secondary · ghost · soft (défaut primary)"],
			[
				"tone",
				"ButtonTone",
				'sémantique : accent · neutral · success · warn · danger · info (défaut accent) — l\'ancien variant="danger" s\'écrit tone="danger"',
			],
			["size", "ButtonSize", "sm · md · lg — défaut md, ou celle du ButtonGroup englobant"],
			["loading", "boolean", "affiche un spinner, masque les icônes et désactive"],
			["disabled", "boolean", "désactive le bouton"],
			["leftIcon / rightIcon", "ReactNode", "icône avant / après le label"],
			["fullWidth", "boolean", "occupe toute la largeur"],
			["type", "enum", "button · submit · reset — défaut button, et non submit comme en HTML"],
			[
				"asChild",
				"boolean",
				"rend l'unique enfant (<a>, Link d'un routeur) avec l'apparence du bouton ; désactivé, il reçoit aria-disabled",
			],
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
			// La taille par défaut ne s'écrit pas, mais dès qu'elle bouge l'extrait doit la
			// porter : sinon il ne reproduit plus l'aperçu affiché juste au-dessus.
			const sizeAttr = p.size === "md" ? "" : ` size="${p.size}"`;
			return `import { Badge } from "@camply/ui";\n\n<Badge tone="${p.tone}" variant="${p.variant}"${sizeAttr}${iconAttr}>\n  ${p.text}\n</Badge>`;
		},
		props: [
			["tone", "BadgeTone", "accent · neutral · success · warn · danger · info (défaut accent)"],
			["variant", "enum", "soft · solid · outline (défaut soft)"],
			["size", "enum", "sm · md (défaut md)"],
			["icon", "ReactNode", "icône affichée avant le contenu (masquée aux lecteurs d'écran)"],
		],
	},

	buttongroup: {
		component: "ButtonGroup",
		controls: [
			{ key: "attached", label: "Attachés", type: "toggle" },
			{
				key: "orientation",
				label: "Orientation",
				type: "seg",
				options: ["horizontal", "vertical"],
			},
			// « auto » n'est pas une valeur de `size` : c'est l'ABSENCE de la prop, le cas
			// où le groupe relaie au lieu d'imposer. Le montrer évite de croire que la
			// taille du groupe écrase toujours celle des boutons.
			{ key: "size", label: "Taille", type: "seg", options: ["auto", "sm", "md", "lg"] },
		],
		// « auto » est le VRAI défaut du composant (la prop est absente) : la vitrine
		// s'ouvre donc dessus, et l'extrait ne porte pas une taille que personne n'a
		// demandée.
		defaults: { attached: true, orientation: "horizontal", size: "auto" },
		render: (p) => (
			<ButtonGroup
				attached={bool(p.attached)}
				orientation={str(p.orientation)}
				size={p.size === "auto" ? undefined : str(p.size)}
			>
				<Button variant="secondary">Jour</Button>
				<Button variant="secondary">Semaine</Button>
				<Button variant="secondary">Mois</Button>
			</ButtonGroup>
		),
		code: (p) =>
			`import { Button, ButtonGroup } from "@camply/ui";\n\n<ButtonGroup${p.attached ? "" : " attached={false}"}${
				p.orientation === "vertical" ? ' orientation="vertical"' : ""
			}${p.size === "auto" ? "" : ` size="${p.size}"`}>\n  <Button variant="secondary">Jour</Button>\n  <Button variant="secondary">Semaine</Button>\n  <Button variant="secondary">Mois</Button>\n</ButtonGroup>`,
		props: [
			["attached", "boolean", "bords partagés entre les boutons (défaut true)"],
			["orientation", "enum", "horizontal · vertical (défaut horizontal)"],
			[
				"size",
				"ButtonSize",
				"sm · md · lg imposé à tous les Button / IconButton du groupe ; une size posée sur un enfant l'emporte — le plus précis gagne. Absente, le groupe relaie celle d'un groupe englobant au lieu de l'effacer",
			],
			["children", "ReactNode", "les boutons du groupe (obligatoire)"],
			[
				"ref + attributs natifs",
				"Ref<HTMLDivElement>",
				'étalés sur la racine — role="group" est l\'invariant du composant et reste réservé',
			],
		],
	},

	iconbutton: {
		component: "IconButton",
		controls: [
			{
				key: "variant",
				label: "Variante",
				type: "seg",
				options: ["primary", "secondary", "ghost", "soft"],
			},
			// Mêmes deux axes que Button : forme d'un côté, sémantique de l'autre.
			{
				key: "tone",
				label: "Ton",
				type: "seg",
				options: ["accent", "neutral", "success", "warn", "danger", "info"],
			},
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md", "lg"] },
			{ key: "disabled", label: "Désactivé", type: "toggle" },
		],
		defaults: { variant: "secondary", tone: "accent", size: "md", disabled: false },
		render: (p) => (
			<IconButton
				label="Ajouter"
				variant={str(p.variant)}
				tone={str(p.tone)}
				size={str(p.size)}
				disabled={bool(p.disabled)}
			>
				<Icon name="plus" size={17} />
			</IconButton>
		),
		code: (p) =>
			`import { IconButton } from "@camply/ui";\n\n<IconButton\n  label="Ajouter"\n  variant="${p.variant}"${
				p.tone === "accent" ? "" : `\n  tone="${p.tone}"`
			}\n  size="${p.size}"${p.disabled ? "\n  disabled" : ""}\n>\n  <Plus />\n</IconButton>`,
		props: [
			["label", "string", "libellé accessible et title (obligatoire, pas de texte visible)"],
			["variant", "ButtonVariant", "forme : primary · secondary · ghost · soft (défaut secondary)"],
			[
				"tone",
				"IconButtonTone",
				'sémantique : accent · neutral · success · warn · danger · info (défaut accent) — l\'ancien variant="danger" (fond doux) s\'écrit variant="soft" tone="danger"',
			],
			["size", "ButtonSize", "sm · md · lg — défaut md, ou celle du ButtonGroup englobant"],
			["type", "enum", "button · submit · reset — défaut button, et non submit comme en HTML"],
			["children", "ReactNode", "l'icône affichée (obligatoire)"],
			["asChild", "boolean", "rend l'unique enfant (<a>, Link) qui porte l'icône, nommé par label"],
		],
	},

	toggle: {
		component: "Toggle",
		controls: [
			{ key: "text", label: "Texte", type: "text" },
			// Le contrôle pilote `defaultPressed`, pas `pressed` : le moteur du
			// playground garde l'état des contrôles pour lui seul (`render` ne reçoit
			// que des valeurs, jamais de setter), donc un Toggle contrôlé ne pourrait
			// pas remonter son basculement jusqu'ici et resterait figé. D'où le nom du
			// contrôle — « par défaut » — qui dit qu'il n'agit qu'au montage.
			{ key: "defaultPressed", label: "Activé par défaut", type: "toggle" },
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md", "lg"] },
		],
		defaults: { text: "Gras", defaultPressed: true, size: "md" },
		render: (p) => (
			// `key` = artifice du banc d'essai, pas de l'API : une valeur initiale ne
			// change rien après le montage, donc sans remontage le contrôle serait un
			// bouton qui ne fait RIEN de visible. La clé ne dépend que de lui : cliquer
			// l'aperçu ne remonte pas, le Toggle bascule comme un vrai Toggle non
			// contrôlé. L'extrait ci-dessous, lui, ne montre jamais cette clé.
			<Toggle
				key={String(p.defaultPressed)}
				defaultPressed={bool(p.defaultPressed)}
				size={str(p.size)}
			>
				{str(p.text)}
			</Toggle>
		),
		// La démo est non contrôlée : l'extrait doit montrer defaultPressed, pas pressed
		// (pressed sans onChange figerait le bouton).
		code: (p) =>
			`import { Toggle } from "@camply/ui";\n\n<Toggle${p.defaultPressed ? " defaultPressed" : ""} size="${p.size}">\n  ${p.text}\n</Toggle>`,
		props: [
			[
				"pressed / defaultPressed",
				"boolean",
				"état contrôlé / état initial non contrôlé (défaut false) — avec pressed, seul onChange fait bouger le bouton",
			],
			["onChange", "(pressed: boolean) => void", "changement d'état"],
			["size", "enum", "sm · md · lg (défaut md)"],
			["onClick", "(e) => void", "appelé avant le basculement ; preventDefault() l'annule"],
			["children", "ReactNode", "contenu du bouton (obligatoire)"],
		],
	},

	tag: {
		component: "Tag",
		controls: [
			{ key: "text", label: "Texte", type: "text" },
			{ key: "removable", label: "Supprimable", type: "toggle" },
		],
		defaults: { text: "Design", removable: true },
		render: (p) => <Tag onRemove={p.removable ? () => {} : undefined}>{str(p.text)}</Tag>,
		code: (p) =>
			`import { Tag } from "@camply/ui";\n\n<Tag${p.removable ? " onRemove={handleRemove}" : ""}>${p.text}</Tag>`,
		props: [
			["onRemove", "() => void", "affiche le bouton × et le rend cliquable"],
			[
				"removeLabel",
				"string",
				"libellé accessible du bouton × ; sinon le libellé remove du CamplyProvider",
			],
			["children", "ReactNode", "contenu du tag (obligatoire)"],
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
			["size", "enum", "sm · md (défaut md)"],
			["children", "ReactNode", "alternative à keys : une seule touche"],
		],
	},

	stack: {
		component: "Stack",
		controls: [
			{ key: "direction", label: "Direction", type: "seg", options: ["horizontal", "vertical"] },
			{ key: "gap", label: "Espacement", type: "seg", options: ["1", "2", "4", "6", "8"] },
			{ key: "align", label: "Alignement", type: "seg", options: ["start", "center", "end"] },
		],
		defaults: { direction: "horizontal", gap: "4", align: "center" },
		render: (p) => (
			<Stack direction={str(p.direction)} gap={num(p.gap) as StackGap} align={str(p.align)}>
				<Badge tone="accent">Un</Badge>
				<Badge tone="info" variant="soft">
					Deux
				</Badge>
				<Badge tone="success" variant="soft">
					Trois
				</Badge>
			</Stack>
		),
		code: (p) => `import { Stack, Badge } from "@camply/ui";

<Stack direction="${p.direction}" gap={${p.gap}} align="${p.align}">
  <Badge tone="accent">Un</Badge>
  <Badge tone="info" variant="soft">Deux</Badge>
  <Badge tone="success" variant="soft">Trois</Badge>
</Stack>`,
		props: [
			["direction", "enum", "vertical · horizontal (défaut vertical)"],
			["gap", "StackGap", "0 · 1 · 2 · 3 · 4 · 5 · 6 · 8 — échelle --camply-space-* (défaut 4)"],
			["align", "enum", "start · center · end · stretch · baseline — axe transversal"],
			["justify", "enum", "start · center · end · between · around — axe principal"],
			["wrap", "boolean", "autorise le retour à la ligne"],
			[
				"as",
				"StackElement",
				"div · section · article · aside · header · footer · nav · main · ul · ol · form · fieldset (défaut div)",
			],
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
			["orientation", "enum", "horizontal · vertical (défaut horizontal)"],
			["label", "ReactNode", "libellé lisible par un lecteur d'écran (horizontal uniquement)"],
			["align", "enum", "start · center · end — position du libellé (défaut center)"],
			["variant", "enum", "solid · dashed (défaut solid)"],
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
			["children", "string", "texte affiché et copié (obligatoire)"],
			["prompt", "boolean", "affiche le symbole $ de shell (défaut false)"],
			["wrap", "boolean", "retour à la ligne au lieu du défilement (défaut false)"],
			["copyText", "string", "remplace le texte copié"],
			["label", "ReactNode", "libellé au-dessus du bloc"],
			[
				"copyLabel / copiedLabel",
				"string",
				"libellés du bouton de copie ; sinon ceux du CamplyProvider (copy / copied)",
			],
		],
	},

	spoiler: {
		component: "Spoiler",
		// Même raison que Toggle : `open` + `onOpenChange` exigeraient que l'état
		// remonte dans le moteur, qui ne l'expose pas au rendu. On reste donc sur
		// `defaultOpen`, remonté par une `key` pour que le contrôle reste observable —
		// entre deux montages, c'est le bouton « voir plus » qui mène la danse, comme
		// dans un Spoiler non contrôlé.
		controls: [{ key: "defaultOpen", label: "Ouvert par défaut", type: "toggle" }],
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
			[
				"showLabel / hideLabel",
				"string",
				"libellés du bouton ; sinon ceux du CamplyProvider (showMore / showLess)",
			],
			[
				"open / defaultOpen / onOpenChange",
				"boolean / boolean / fn",
				"dépliage contrôlé / état initial (défaut false) / rappel — sans open, le spoiler se gère seul",
			],
		],
	},
};
