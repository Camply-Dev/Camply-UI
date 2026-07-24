import {
	Alert,
	Badge,
	Banner,
	Button,
	CommandPalette,
	Snippet,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	ToastProvider,
	useToast,
} from "@camply/ui";
import { type CSSProperties, type ReactNode, useState } from "react";
import { Icon } from "../icons";
import { CSS } from "../showcase-data";
import { ClickableCard } from "./ClickableCard";
import { CodeBlock } from "./CodeBlock";

interface GuideViewProps {
	onNavigate: (id: string) => void;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section className="cu-guide__section">
			<h2 className="cu-guide__h2">{title}</h2>
			{children}
		</section>
	);
}

function Preview({ label = "Rendu", children }: { label?: string; children: ReactNode }) {
	return (
		<div className="cu-guide__preview">
			<div className="cu-guide__scope-label">{label}</div>
			<div className="cu-row">{children}</div>
		</div>
	);
}

function ToastDemo() {
	return (
		<ToastProvider position="bottom-right">
			<ToastTrigger />
		</ToastProvider>
	);
}

function ToastTrigger() {
	const { toast } = useToast();
	return (
		<Button
			leftIcon={<Icon name="check" />}
			onClick={() => toast({ title: "Enregistré", tone: "success" })}
		>
			Déclencher un toast
		</Button>
	);
}

function PaletteDemo({ onNavigate }: GuideViewProps) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button variant="secondary" leftIcon={<Icon name="search" />} onClick={() => setOpen(true)}>
				Ouvrir la palette
			</Button>
			<CommandPalette
				open={open}
				onClose={() => setOpen(false)}
				placeholder="Une commande…"
				commands={[
					{ id: "tokens", label: "Tokens CSS", group: "Navigation", onRun: () => onNavigate(CSS) },
					{
						id: "button",
						label: "Composants",
						group: "Navigation",
						onRun: () => onNavigate("button"),
					},
				]}
			/>
		</>
	);
}

const VIOLET_SCOPE = { "--camply-accent": "#8b5cf6" } as CSSProperties;

const INSTALL = [
	["bun", "bun add @camply/ui"],
	["npm", "npm install @camply/ui"],
	["pnpm", "pnpm add @camply/ui"],
	["yarn", "yarn add @camply/ui"],
];

export function GuideView({ onNavigate }: GuideViewProps) {
	return (
		<div>
			<header className="cu-pagehead">
				<Badge tone="accent" icon={<Icon name="book" size={12} />}>
					Prise en main
				</Badge>
				<h1 className="cu-pagehead__title">Guide d'utilisation</h1>
				<p className="cu-pagehead__sub">
					Installez, importez les styles <strong>une seule fois</strong>, rendez votre premier
					composant. Chaque étape est illustrée par de vrais composants : la page se sert elle-même
					de la librairie.
				</p>
			</header>

			<Section title="Installation">
				<p className="cu-guide__p">
					Il vous faut React 18+ (<code>react</code> et <code>react-dom</code> sont des{" "}
					<code>peerDependencies</code>) et un bundler qui gère l'ESM et le CSS — Vite, Next.js,
					Remix…
				</p>
				<div className="cu-guide__install">
					<Tabs defaultValue="bun" variant="soft">
						<TabList>
							{INSTALL.map(([manager]) => (
								<Tab key={manager} value={manager}>
									{manager}
								</Tab>
							))}
						</TabList>
						{INSTALL.map(([manager, command]) => (
							<TabPanel key={manager} value={manager}>
								<Snippet prompt>{command}</Snippet>
							</TabPanel>
						))}
					</Tabs>
				</div>
				<p className="cu-guide__p">
					Puis importez la feuille de styles <strong>une seule fois</strong>, à l'entrée de
					l'application :
				</p>
				<CodeBlock lang="ts" title="main.tsx">{`import "@camply/ui/styles.css";`}</CodeBlock>
				<Banner tone="warn" className="cu-guide__banner">
					Sans cette ligne, les composants s'affichent sans aucun style. C'est l'oubli n°1 : si un
					composant paraît cassé, vérifiez-la en premier.
				</Banner>
			</Section>

			<Section title="Votre premier composant">
				<p className="cu-guide__p">
					Vous avez tout ce qu'il faut. Voici une application minimale et complète.
				</p>
				<div className="cu-guide__split">
					<Preview>
						<Button variant="primary">Enregistrer</Button>
						<Button variant="secondary">Annuler</Button>
						<Button variant="primary" leftIcon={<Icon name="plus" />}>
							Nouveau
						</Button>
						<Button variant="primary" loading>
							Envoi…
						</Button>
					</Preview>
					<CodeBlock lang="tsx">{`import "@camply/ui/styles.css";
import { Button } from "@camply/ui";

export default function App() {
  return <Button variant="primary">Bonjour Camply</Button>;
}`}</CodeBlock>
				</div>
			</Section>

			<Section title="Importer">
				<p className="cu-guide__p">
					Tout vient de la racine du paquet. Les icônes ont leur propre entrée, et les types sont
					exportés à côté des composants.
				</p>
				<CodeBlock lang="ts">{`import { Button, Badge } from "@camply/ui";
import { Home, BrandGithub } from "@camply/ui/icons";
import type { ButtonProps } from "@camply/ui";`}</CodeBlock>
				<Preview label="Garanties du paquet">
					<Badge tone="accent">ESM</Badge>
					<Badge tone="info" variant="soft">
						tree-shakable
					</Badge>
					<Badge tone="success" variant="soft">
						0 dépendance
					</Badge>
					<Badge tone="neutral" variant="soft">
						58 composants
					</Badge>
				</Preview>
				<ul className="cu-guide__list">
					<li>
						Il n'existe pas de sous-chemin par composant : <code>@camply/ui/button</code> n'existe
						pas.
					</li>
					<li>
						Le paquet est publié en ESM non bundlé : votre bundler ne garde que ce que vous rendez.
					</li>
					<li>
						Chaque composant accepte <code>className</code> et <code>style</code>.
					</li>
				</ul>
			</Section>

			<Section title="Thémer">
				<p className="cu-guide__p">
					Tous les composants lisent des variables <code>--camply-*</code>. Surchargez-les sur{" "}
					<code>:root</code> ou sur un scope isolé : aucun rebuild, c'est de la cascade CSS.
				</p>
				<div className="cu-guide__split">
					<Preview label="Thème par défaut">
						<Button variant="primary">Action</Button>
						<Badge tone="accent">accent</Badge>
					</Preview>
					<div className="cu-guide__scope" style={VIOLET_SCOPE}>
						<div className="cu-guide__scope-label">Scope re-thématisé</div>
						<div className="cu-row">
							<Button variant="primary">Action</Button>
							<Badge tone="accent">accent</Badge>
						</div>
					</div>
				</div>
				<CodeBlock lang="css">{`:root {
  --camply-accent: #8b5cf6;
}`}</CodeBlock>
				<div className="cu-guide__inline-cta">
					<Button
						variant="ghost"
						size="sm"
						rightIcon={<Icon name="arrow" />}
						onClick={() => onNavigate(CSS)}
					>
						Voir tous les tokens
					</Button>
				</div>
			</Section>

			<Section title="Providers">
				<p className="cu-guide__p">
					Deux fonctionnalités demandent un câblage : les toasts (<code>ToastProvider</code> +{" "}
					<code>useToast</code>) et la palette de commandes (<code>CommandPalette</code> +{" "}
					<code>useCommandPalette</code>). Englobez l'app une fois, puis pilotez de partout.
				</p>
				<CodeBlock lang="tsx">{`import { ToastProvider, useToast, Button } from "@camply/ui";

function App() {
  return <ToastProvider><Page /></ToastProvider>;
}

function Page() {
  const { toast } = useToast();
  return <Button onClick={() => toast({ title: "Enregistré", tone: "success" })}>Sauvegarder</Button>;
}`}</CodeBlock>
				<div className="cu-guide__demo">
					<ToastDemo />
					<PaletteDemo onNavigate={onNavigate} />
				</div>
				<Alert tone="info" className="cu-guide__banner">
					Dans Next.js (App Router), le fichier qui utilise ces APIs doit commencer par{" "}
					<code>"use client"</code>. Les styles restent importés une fois dans{" "}
					<code>app/layout.tsx</code>.
				</Alert>
			</Section>

			<Section title="Où aller ensuite">
				<div className="cu-guide__next">
					<ClickableCard className="cu-guide__nextcard" onActivate={() => onNavigate("button")}>
						<div className="cu-guide__nextcard-title">
							<Icon name="components" size={16} />
							Explorer les composants
						</div>
						<p className="cu-guide__nextcard-desc">
							58 composants groupés par famille, avec playground interactif.
						</p>
					</ClickableCard>
					<ClickableCard className="cu-guide__nextcard" onActivate={() => onNavigate(CSS)}>
						<div className="cu-guide__nextcard-title">
							<Icon name="tokens" size={16} />
							Personnaliser les tokens
						</div>
						<p className="cu-guide__nextcard-desc">
							Éditez les couleurs en direct et téléchargez votre <code>tokens.css</code>.
						</p>
					</ClickableCard>
				</div>
			</Section>
		</div>
	);
}
