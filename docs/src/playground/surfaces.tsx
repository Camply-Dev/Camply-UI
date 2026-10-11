import {
	Alert,
	Banner,
	Button,
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Drawer,
	DropdownMenu,
	HoverCard,
	MenuItem,
	MenuLabel,
	MenuSeparator,
	Modal,
	Popover,
	Sheet,
	Tooltip,
} from "@camply/ui";
import { Icon } from "../icons";
import { useDisclosure } from "../lib/useDisclosure";
import { bool, type PlaygroundConfig, str, type Values } from "./engine";

function ModalPreview(p: Values) {
	const { open, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button variant="primary" onClick={onOpen}>
				Ouvrir la modale
			</Button>
			{/* Sans titre, la description reste affichée : d'où le contrôle « Titre ». */}
			<Modal
				open={open}
				onClose={onClose}
				size={str(p.size)}
				title={bool(p.title) ? "Supprimer le projet" : undefined}
				description="Cette action est définitive et supprime toutes les données associées."
				footer={
					<>
						<Button variant="ghost" onClick={onClose}>
							Annuler
						</Button>
						{/* 0.2.0 : la sémantique destructrice passe par `tone`, la forme reste `variant`. */}
						<Button tone="danger" onClick={onClose}>
							Supprimer
						</Button>
					</>
				}
			>
				Es-tu sûr de vouloir continuer ? Tu ne pourras pas revenir en arrière.
			</Modal>
		</>
	);
}

function DrawerPreview(p: Values) {
	const { open, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button onClick={onOpen}>Ouvrir le panneau</Button>
			<Drawer
				open={open}
				onClose={onClose}
				side={str(p.side)}
				title="Filtres"
				footer={
					<Button variant="primary" onClick={onClose}>
						Appliquer
					</Button>
				}
			>
				<p style={{ color: "var(--sc-muted)", margin: 0 }}>
					Panneau latéral coulissant — idéal pour des filtres ou des réglages contextuels.
				</p>
			</Drawer>
		</>
	);
}

function SheetPreview(p: Values) {
	const { open, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button onClick={onOpen}>Ouvrir la feuille</Button>
			<Sheet
				open={open}
				onClose={onClose}
				side={str(p.side)}
				handle={bool(p.handle)}
				title="Partager le projet"
			>
				<p style={{ color: "var(--sc-muted)", margin: 0 }}>
					Feuille montante — parfaite pour des actions rapides sur mobile.
				</p>
			</Sheet>
		</>
	);
}

export const SURFACES: Record<string, PlaygroundConfig> = {
	card: {
		component: "Card",
		imports: ["Card", "CardHeader", "CardTitle", "CardDescription", "CardFooter"],
		controls: [
			{ key: "padding", label: "Padding", type: "seg", options: ["none", "sm", "md", "lg"] },
			{ key: "interactive", label: "Interactive", type: "toggle" },
		],
		defaults: { padding: "md", interactive: false },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 340 }}>
				<Card padding={str(p.padding)} interactive={bool(p.interactive)}>
					<CardHeader>
						<CardTitle>Forfait Pro</CardTitle>
						<CardDescription>Tout ce qu'il faut pour lancer un produit soigné.</CardDescription>
					</CardHeader>
					<CardFooter>
						<Button variant="primary" size="sm">
							Choisir
						</Button>
						<Button variant="ghost" size="sm">
							En savoir plus
						</Button>
					</CardFooter>
				</Card>
			</div>
		),
		code: (p) =>
			`import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@camply/ui";\n\n<Card padding="${p.padding}"${
				p.interactive ? " interactive" : ""
			}>\n  <CardHeader>\n    <CardTitle>Forfait Pro</CardTitle>\n    <CardDescription>…</CardDescription>\n  </CardHeader>\n  <CardFooter>…</CardFooter>\n</Card>`,
		props: [
			["padding", "enum", "none · sm · md · lg (défaut md)"],
			["interactive", "boolean", "élévation + bordure accent au survol"],
			[
				"CardHeader / CardTitle / CardDescription / CardFooter",
				"—",
				"sous-composants de structure",
			],
			[
				"CardTitle · headingLevel",
				"HeadingLevel",
				"2 · 3 · 4 · 5 · 6 — niveau du titre (défaut 3)",
			],
		],
	},

	alert: {
		component: "Alert",
		controls: [
			{ key: "tone", label: "Ton", type: "seg", options: ["info", "success", "warn", "danger"] },
			{ key: "title", label: "Titre", type: "text" },
			{ key: "dismissible", label: "Fermable", type: "toggle" },
		],
		defaults: { tone: "success", title: "Paiement confirmé", dismissible: false },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 460 }}>
				<Alert
					key={`${p.tone}-${p.dismissible}`}
					tone={str(p.tone)}
					title={str(p.title)}
					dismissible={bool(p.dismissible)}
				>
					Ta commande est en cours de préparation.
				</Alert>
			</div>
		),
		code: (p) =>
			`import { Alert } from "@camply/ui";\n\n<Alert\n  tone="${p.tone}"\n  title="${p.title}"${
				p.dismissible ? "\n  dismissible" : ""
			}\n>\n  Ta commande est en cours de préparation.\n</Alert>`,
		props: [
			["tone", "AlertTone", "dérivé de Tone : info · success · warn · danger (défaut info)"],
			["title", "ReactNode", "titre en gras"],
			["dismissible", "boolean", "affiche le bouton fermer"],
			[
				"open / defaultOpen / onOpenChange",
				"boolean / boolean / fn",
				"visibilité contrôlée — defaultOpen vaut true ici : l'alerte est là dès le montage",
			],
			["icon", "ReactNode | null", "icône personnalisée — null pour masquer"],
		],
	},

	banner: {
		component: "Banner",
		controls: [
			{
				key: "tone",
				label: "Ton",
				type: "seg",
				options: ["info", "success", "warn", "danger", "accent"],
			},
			{ key: "dismissible", label: "Fermable", type: "toggle" },
		],
		defaults: { tone: "accent", dismissible: true },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 560 }}>
				<Banner
					key={`${p.tone}-${p.dismissible}`}
					tone={str(p.tone)}
					dismissible={bool(p.dismissible)}
					action={
						<Button size="sm" variant="primary">
							Mettre à niveau
						</Button>
					}
				>
					Passe au forfait Pro pour débloquer tous les composants.
				</Banner>
			</div>
		),
		code: (p) =>
			`import { Banner, Button } from "@camply/ui";\n\n<Banner\n  tone="${p.tone}"${
				p.dismissible ? "\n  dismissible" : ""
			}\n  action={<Button size="sm">Mettre à niveau</Button>}\n>\n  Passe au forfait Pro…\n</Banner>`,
		props: [
			[
				"tone",
				"BannerTone",
				"dérivé de Tone : info · success · warn · danger · accent (défaut accent)",
			],
			["action", "ReactNode", "action(s) à droite, ex. un Button"],
			["dismissible", "boolean", "affiche le bouton fermer"],
			[
				"open / defaultOpen / onOpenChange",
				"boolean / boolean / fn",
				"visibilité contrôlée — defaultOpen vaut true ici : le bandeau est là dès le montage",
			],
			["icon", "ReactNode | null", "icône personnalisée — null pour masquer"],
		],
	},

	modal: {
		component: "Modal",
		controls: [
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md", "lg", "full"] },
			{ key: "title", label: "Titre", type: "toggle" },
		],
		defaults: { size: "md", title: true },
		render: (p) => <ModalPreview {...p} />,
		code: (p) =>
			`import { Modal } from "@camply/ui";\n\n<Modal\n  open={open}\n  onClose={onClose}\n  size="${p.size}"${
				p.title ? `\n  title="Supprimer le projet"` : ""
			}\n  description="Cette action est définitive."\n  footer={<Button tone="danger">Supprimer</Button>}\n>\n  Es-tu sûr de vouloir continuer ?\n</Modal>`,
		props: [
			["open / onClose", "boolean / fn", "visibilité contrôlée — Échap et voile ferment"],
			["title", "ReactNode", "titre de l'en-tête — nomme le dialogue (aria-labelledby)"],
			["description", "ReactNode", "texte sous le titre — rendu même sans titre"],
			["footer", "ReactNode", "actions en pied, alignées à droite"],
			[
				"size",
				"ModalSize",
				"sm · md · lg (échelle partagée Size, défaut md) · full, toute la fenêtre",
			],
			["closeOnBackdrop", "boolean", "fermeture au clic sur le voile (défaut true)"],
			["showClose", "boolean", "bouton × dans l'en-tête (défaut true)"],
			[
				"ref + attributs natifs",
				"Ref<HTMLDivElement>",
				"la racine publique est le panneau, pas le voile — role, aria-modal, tabIndex restent réservés",
			],
		],
	},

	drawer: {
		component: "Drawer",
		controls: [{ key: "side", label: "Côté", type: "seg", options: ["left", "right"] }],
		defaults: { side: "right" },
		render: (p) => <DrawerPreview {...p} />,
		code: (p) =>
			`import { Drawer } from "@camply/ui";\n\n<Drawer\n  open={open}\n  onClose={onClose}\n  side="${p.side}"\n  title="Filtres"\n>\n  …\n</Drawer>`,
		props: [
			["open / onClose", "boolean / fn", "visibilité contrôlée"],
			["side", "enum", "left · right (défaut right)"],
			["width", "number | string", "largeur du panneau (défaut 380)"],
			["title / footer", "ReactNode", "en-tête / pied"],
			["showClose", "boolean", "bouton × dans l'en-tête (défaut true)"],
			["closeOnBackdrop", "boolean", "fermeture au clic sur le voile (défaut true)"],
			[
				"ref + attributs natifs",
				"Ref<HTMLElement>",
				"la racine publique est le panneau <aside> — role, aria-modal, tabIndex restent réservés",
			],
		],
	},

	sheet: {
		component: "Sheet",
		controls: [
			{ key: "side", label: "Côté", type: "seg", options: ["bottom", "top"] },
			{ key: "handle", label: "Poignée", type: "toggle" },
		],
		defaults: { side: "bottom", handle: true },
		render: (p) => <SheetPreview {...p} />,
		code: (p) =>
			`import { Sheet } from "@camply/ui";\n\n<Sheet\n  open={open}\n  onClose={onClose}\n  side="${p.side}"${
				p.handle ? "" : "\n  handle={false}"
			}\n  title="Partager"\n>\n  …\n</Sheet>`,
		props: [
			["open / onClose", "boolean / fn", "visibilité contrôlée"],
			["side", "enum", "bottom · top (défaut bottom)"],
			["height", "number | string", "hauteur du panneau (défaut auto)"],
			["handle", "boolean", "poignée de drag, côté bottom seulement (défaut true)"],
			["title / footer", "ReactNode", "en-tête / pied"],
			["showClose", "boolean", "bouton × dans l'en-tête (défaut true)"],
			["closeOnBackdrop", "boolean", "fermeture au clic sur le voile (défaut true)"],
			[
				"ref + attributs natifs",
				"Ref<HTMLDivElement>",
				"la racine publique est le panneau, pas le voile — role, aria-modal, tabIndex restent réservés",
			],
		],
	},

	dropdownmenu: {
		component: "DropdownMenu",
		imports: ["DropdownMenu", "MenuItem", "MenuLabel", "MenuSeparator"],
		controls: [],
		defaults: {},
		render: () => (
			<DropdownMenu trigger={<Button variant="secondary">Options</Button>}>
				<MenuLabel>Mon compte</MenuLabel>
				<MenuItem icon={<Icon name="check" size={15} />} shortcut="⌘P">
					Profil
				</MenuItem>
				<MenuItem icon={<Icon name="copy" size={15} />}>Dupliquer</MenuItem>
				<MenuSeparator />
				<MenuItem danger>Supprimer</MenuItem>
			</DropdownMenu>
		),
		code: () =>
			`import { DropdownMenu, MenuItem, MenuLabel, MenuSeparator } from "@camply/ui";\n\n<DropdownMenu trigger={<Button variant="secondary">Options</Button>}>\n  <MenuLabel>Mon compte</MenuLabel>\n  <MenuItem shortcut="⌘P" onSelect={openProfile}>Profil</MenuItem>\n  <MenuItem>Dupliquer</MenuItem>\n  <MenuSeparator />\n  <MenuItem danger>Supprimer</MenuItem>\n</DropdownMenu>`,
		props: [
			["trigger", "ReactElement", "élément cliquable qui ouvre le menu"],
			["placement", "Placement", "position du menu (défaut bottom-start)"],
			[
				"open / defaultOpen / onOpenChange",
				"boolean / boolean / fn",
				"mode contrôlé — sans elles, le menu gère son ouverture",
			],
			["MenuItem · icon / shortcut / danger / disabled / onSelect", "—", "props de chaque entrée"],
			["MenuLabel / MenuSeparator", "—", "libellé de section / séparateur"],
		],
	},

	tooltip: {
		component: "Tooltip",
		controls: [
			{ key: "content", label: "Contenu", type: "text" },
			{
				key: "tone",
				label: "Ton",
				type: "seg",
				options: ["default", "plain", "dark", "accent", "success", "warn", "danger", "info"],
			},
			{ key: "icon", label: "Icône", type: "toggle" },
			{
				key: "placement",
				label: "Position",
				type: "seg",
				options: ["top", "bottom", "left", "right"],
			},
		],
		defaults: { content: "Ajouter au projet", tone: "default", icon: false, placement: "top" },
		render: (p) => (
			<Tooltip
				content={str(p.content)}
				tone={str(p.tone)}
				placement={str(p.placement)}
				icon={bool(p.icon) ? <Icon name="check" size={13} /> : undefined}
			>
				<Button variant="secondary">Survole-moi</Button>
			</Tooltip>
		),
		code: (p) => {
			const toneAttr = p.tone === "default" ? "" : ` tone="${p.tone}"`;
			const iconAttr = p.icon ? " icon={<Check size={14} />}" : "";
			return `import { Tooltip } from "@camply/ui";\n\n<Tooltip content="${p.content}"${toneAttr}${iconAttr} placement="${p.placement}">\n  <Button variant="secondary">Survole-moi</Button>\n</Tooltip>`;
		},
		props: [
			["content", "ReactNode", "contenu de l'infobulle"],
			["children", "ReactElement", "élément survolé — reçoit aria-describedby à l'ouverture"],
			["icon", "ReactNode", "icône avant le contenu"],
			[
				"tone",
				"TooltipTone",
				"default (défaut) · plain (sans fond) · dark, plus les tons dérivés accent · success · warn · danger · info",
			],
			["placement", "Placement", "top · bottom · left · right (+ variantes -start/-end)"],
			["delay", "number", "délai avant ouverture au survol en ms (défaut 200)"],
			[
				"closeDelay",
				"number",
				"délai avant fermeture en ms (défaut 150) — laisse le temps d'amener le pointeur sur l'infobulle",
			],
			[
				"open / defaultOpen / onOpenChange",
				"boolean / boolean / fn",
				"mode contrôlé — sans elles, l'infobulle gère son ouverture",
			],
		],
	},

	popover: {
		component: "Popover",
		controls: [
			{
				key: "placement",
				label: "Position",
				type: "seg",
				options: ["bottom-start", "bottom-end", "top-start", "right"],
			},
		],
		defaults: { placement: "bottom-start" },
		render: (p) => (
			<Popover
				trigger={<Button variant="secondary">Ouvrir le popover</Button>}
				placement={str(p.placement)}
			>
				<div style={{ maxWidth: 240 }}>
					<strong style={{ display: "block", marginBottom: 6 }}>Astuce</strong>
					<span style={{ color: "var(--sc-muted)" }}>
						Un panneau flottant ancré au déclencheur, pour du contenu riche.
					</span>
				</div>
			</Popover>
		),
		code: (p) =>
			`import { Popover } from "@camply/ui";\n\n<Popover\n  trigger={<Button>Ouvrir</Button>}\n  placement="${p.placement}"\n>\n  Contenu riche…\n</Popover>`,
		props: [
			["trigger", "ReactElement", "élément cliquable qui ouvre le panneau"],
			["placement", "Placement", "position (défaut bottom-start)"],
			[
				"open / defaultOpen / onOpenChange",
				"boolean / boolean / fn",
				"mode contrôlé — sans elles, le popover gère son ouverture",
			],
		],
	},

	hovercard: {
		component: "HoverCard",
		controls: [],
		defaults: {},
		render: () => (
			<HoverCard trigger={<Button variant="ghost">@camply</Button>}>
				<div style={{ maxWidth: 240 }}>
					<strong style={{ display: "block", marginBottom: 4 }}>Camply</strong>
					<span style={{ color: "var(--sc-muted)" }}>
						Agence & communauté de développeurs — 58 composants livrés.
					</span>
				</div>
			</HoverCard>
		),
		code: () =>
			`import { HoverCard } from "@camply/ui";\n\n<HoverCard trigger={<a href="/team/camply">@camply</a>}>\n  <UserCard … />\n</HoverCard>`,
		props: [
			["trigger", "ReactElement", "élément survolé (hover/focus)"],
			["openDelay / closeDelay", "number", "délais en ms (défaut 250 / 150)"],
			["placement", "Placement", "position (défaut bottom-start)"],
			[
				"open / defaultOpen / onOpenChange",
				"boolean / boolean / fn",
				"mode contrôlé — sans elles, la carte gère son ouverture",
			],
		],
	},
};
