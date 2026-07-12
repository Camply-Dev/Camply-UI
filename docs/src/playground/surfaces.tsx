// Configs playground — famille Surfaces.
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
import { useState } from "react";
import { Icon } from "../icons";
import { bool, type PlaygroundConfig, str, type Values } from "./engine";

// ---------- Aperçus à état (overlays) ----------
function ModalPreview(p: Values) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button variant="primary" onClick={() => setOpen(true)}>
				Ouvrir la modale
			</Button>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				size={str(p.size)}
				title="Supprimer le projet"
				description="Cette action est définitive et supprime toutes les données associées."
				footer={
					<>
						<Button variant="ghost" onClick={() => setOpen(false)}>
							Annuler
						</Button>
						<Button variant="danger" onClick={() => setOpen(false)}>
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
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Ouvrir le panneau</Button>
			<Drawer
				open={open}
				onClose={() => setOpen(false)}
				side={str(p.side)}
				title="Filtres"
				footer={
					<Button variant="primary" onClick={() => setOpen(false)}>
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
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Ouvrir la feuille</Button>
			<Sheet
				open={open}
				onClose={() => setOpen(false)}
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
			{ key: "padding", label: "Padding", type: "seg", options: ["sm", "md", "lg"] },
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
			["padding", "enum", "none · sm · md · lg"],
			["interactive", "boolean", "élévation + bordure accent au survol"],
			[
				"CardHeader / CardTitle / CardDescription / CardFooter",
				"—",
				"sous-composants de structure",
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
			["tone", "enum", "info · success · warn · danger"],
			["title", "ReactNode", "titre en gras"],
			["dismissible / onDismiss", "boolean / fn", "bouton fermer"],
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
				options: ["accent", "info", "success", "warn", "danger"],
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
			["tone", "enum", "info · success · warn · danger · accent"],
			["action", "ReactNode", "action(s) à droite, ex. un Button"],
			["dismissible / onDismiss", "boolean / fn", "bouton fermer"],
			["icon", "ReactNode | null", "icône personnalisée — null pour masquer"],
		],
	},

	modal: {
		component: "Modal",
		controls: [{ key: "size", label: "Taille", type: "seg", options: ["sm", "md", "lg"] }],
		defaults: { size: "md" },
		render: (p) => <ModalPreview {...p} />,
		code: (p) =>
			`import { Modal } from "@camply/ui";\n\n<Modal\n  open={open}\n  onClose={() => setOpen(false)}\n  size="${p.size}"\n  title="Supprimer le projet"\n  footer={<Button variant="danger">Supprimer</Button>}\n>\n  Es-tu sûr de vouloir continuer ?\n</Modal>`,
		props: [
			["open / onClose", "boolean / fn", "visibilité contrôlée — Échap et backdrop ferment"],
			["title / description", "ReactNode", "en-tête de la boîte"],
			["footer", "ReactNode", "actions en pied, alignées à droite"],
			["size", "enum", "sm · md · lg"],
			["closeOnBackdrop / showClose", "boolean", "fermeture au clic dehors / bouton ×"],
		],
	},

	drawer: {
		component: "Drawer",
		controls: [{ key: "side", label: "Côté", type: "seg", options: ["left", "right"] }],
		defaults: { side: "right" },
		render: (p) => <DrawerPreview {...p} />,
		code: (p) =>
			`import { Drawer } from "@camply/ui";\n\n<Drawer\n  open={open}\n  onClose={() => setOpen(false)}\n  side="${p.side}"\n  title="Filtres"\n>\n  …\n</Drawer>`,
		props: [
			["open / onClose", "boolean / fn", "visibilité contrôlée"],
			["side", "enum", "left · right"],
			["width", "number | string", "largeur du panneau (défaut 380)"],
			["title / footer", "ReactNode", "en-tête / pied"],
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
			`import { Sheet } from "@camply/ui";\n\n<Sheet\n  open={open}\n  onClose={() => setOpen(false)}\n  side="${p.side}"${
				p.handle ? "" : "\n  handle={false}"
			}\n  title="Partager"\n>\n  …\n</Sheet>`,
		props: [
			["open / onClose", "boolean / fn", "visibilité contrôlée"],
			["side", "enum", "bottom · top"],
			["height", "number | string", "hauteur maximale"],
			["handle", "boolean", "poignée de drag (bottom, défaut true)"],
			["title / footer", "ReactNode", "en-tête / pied"],
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
				options: ["default", "plain", "dark", "accent", "success", "warning", "danger", "info"],
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
			["icon", "ReactNode", "icône avant le contenu"],
			["tone", "enum", "default · plain (sans fond) · dark · accent · success · warning · danger · info"],
			["placement", "Placement", "top · bottom · left · right (+ variantes -start/-end)"],
			["delay", "number", "délai d'apparition en ms (défaut 200)"],
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
		],
	},
};
