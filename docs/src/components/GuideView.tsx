import {
	Alert,
	Badge,
	Banner,
	Button,
	CommandPalette,
	Snippet,
	Steps,
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
					{
						id: "tokens",
						label: "Tokens CSS",
						group: "Navigation",
						onRun: () => onNavigate(CSS),
					},
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

export function GuideView({ onNavigate }: GuideViewProps) {
	return (
		<div>
			<header className="cu-pagehead">
				<Badge tone="accent" icon={<Icon name="book" size={12} />}>
					Prise en main
				</Badge>
				<h1 className="cu-pagehead__title">Guide d'utilisation</h1>
				<p className="cu-pagehead__sub">
					De zéro à un composant à l'écran, puis tout le reste : installez <code>@camply/ui</code>,
					importez les styles <strong>une seule fois</strong>, rendez votre premier composant — et
					poursuivez avec les imports, les types, le thème et les providers. Chaque étape est
					illustrée par de <strong>vrais composants rendus</strong> : la page se sert elle-même de
					la librairie.
				</p>
			</header>

			<Section title="Le parcours en 4 étapes">
				<p className="cu-guide__p">
					Tout ce qu'il faut faire, dans l'ordre. Aucune étape n'est optionnelle pour voir un
					composant s'afficher — comptez moins de deux minutes.
				</p>
				<div className="cu-guide__steps">
					<Steps
						current={3}
						steps={[
							{ label: "Prérequis", description: "React 18+" },
							{ label: "Installer", description: "bun add @camply/ui" },
							{ label: "Importer les styles", description: "styles.css, une fois" },
							{ label: "Premier rendu", description: "un Button à l'écran" },
						]}
					/>
				</div>
			</Section>

			<Section title="1 · Prérequis">
				<p className="cu-guide__p">
					<code>@camply/ui</code> est une librairie React ESM-only sans aucune dépendance runtime.
					Il vous faut seulement React et React-DOM en version 18 ou supérieure — ce sont des{" "}
					<code>peerDependencies</code>, déjà présentes dans la plupart des projets (Vite, Next.js,
					Remix…).
				</p>
				<ul className="cu-guide__list">
					<li>
						<code>react &gt;= 18</code> et <code>react-dom &gt;= 18</code> (peer dependencies, à
						fournir côté app).
					</li>
					<li>Un bundler qui gère l'ESM et l'import de CSS : Vite, Next.js, Remix, Rspack…</li>
					<li>
						TypeScript est facultatif : les types (<code>.d.ts</code>) sont livrés, mais la lib
						marche aussi en JavaScript pur.
					</li>
					<li>Zéro autre dépendance : pas de provider de style, pas de runtime CSS-in-JS.</li>
				</ul>
			</Section>

			<Section title="2 · Installation">
				<p className="cu-guide__p">
					Ajoutez le paquet avec votre gestionnaire préféré. Une seule commande suffit —
					React/React-DOM ne sont pas réinstallés puisqu'ils sont attendus en peer.
				</p>
				<div className="cu-guide__snippets">
					<Snippet prompt>bun add @camply/ui</Snippet>
					<Snippet prompt>npm i @camply/ui</Snippet>
				</div>
			</Section>

			<Section title="3 · Importer les styles (le piège n°1)">
				<p className="cu-guide__p">
					C'est l'étape qu'on oublie le plus souvent. Les composants ne portent aucun style inline :
					toute l'apparence vient d'une feuille unique, <code>@camply/ui/styles.css</code>.
					Importez-la <strong>une seule fois</strong>, tout en haut du point d'entrée de votre
					application (<code>main.tsx</code> avec Vite, <code>app/layout.tsx</code> avec Next.js).
				</p>
				<CodeBlock lang="ts" title="main.tsx">{`// Une seule fois, à l'entrée de l'app
import "@camply/ui/styles.css";`}</CodeBlock>
				<Banner tone="warn" className="cu-guide__banner">
					Sans cette ligne, vos composants s'affichent mais totalement non stylés. Si un composant
					paraît cassé, vérifiez-la en premier.
				</Banner>
				<ul className="cu-guide__list">
					<li>Un seul import global, jamais répété : c'est du CSS, il s'applique à toute l'app.</li>
					<li>
						<code>styles.css</code> contient les tokens <code>--camply-*</code> et le style de tous
						les composants.
					</li>
					<li>C'est le seul side-effect de la librairie — le reste du code reste tree-shakable.</li>
					<li>
						Importez <code>styles.css</code> avant vos propres feuilles pour pouvoir surcharger les
						tokens.
					</li>
				</ul>
			</Section>

			<Section title="4 · Votre premier composant">
				<p className="cu-guide__p">
					Vous avez tout ce qu'il faut. Voici une application minimale et complète qui affiche un
					bouton stylé. Copiez-la telle quelle.
				</p>
				<div className="cu-guide__split">
					<Preview>
						<Button variant="primary">Enregistrer</Button>
						<Button variant="secondary">Annuler</Button>
						<Button variant="ghost">Plus tard</Button>
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
				<ul className="cu-guide__list">
					<li>
						<code>variant</code> : primary · secondary · ghost · soft · danger. <code>size</code> :
						sm · md · lg. <code>leftIcon</code> / <code>rightIcon</code> / <code>loading</code>{" "}
						disponibles.
					</li>
					<li>
						Tout composant accepte <code>className</code> et <code>style</code>.
					</li>
				</ul>
			</Section>

			<Section title="Importer">
				<p className="cu-guide__p">
					Import nommé depuis la racine du paquet. Le tree-shaking du bundler de ton app élimine ce
					que tu n'utilises pas.
				</p>
				<CodeBlock lang="ts">{`import { Button, Badge, ColorPicker } from "@camply/ui";`}</CodeBlock>
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
						Slug du sous-chemin = nom du composant en minuscules : <code>button</code>,{" "}
						<code>colorpicker</code>, <code>dropdownmenu</code>, <code>commandpalette</code>…
					</li>
					<li>
						Les types (<code>ButtonProps</code>…) sont exportés depuis la racine comme depuis chaque
						sous-chemin.
					</li>
					<li>Les deux formes cohabitent dans un même projet.</li>
				</ul>
			</Section>

			<Section title="Types TypeScript">
				<p className="cu-guide__p">
					Les définitions de types complètes sont livrées dans le paquet. Les props de chaque
					composant sont exportées via <code>import type</code>, pour typer vos wrappers ou vos
					objets de configuration. Aucune config TS supplémentaire.
				</p>
				<CodeBlock lang="ts">{`import { Button } from "@camply/ui";
import type { ButtonProps } from "@camply/ui";

const cta: ButtonProps = { variant: "primary", size: "sm" };
type MonBouton = Pick<ButtonProps, "variant" | "leftIcon">;`}</CodeBlock>
				<ul className="cu-guide__list">
					<li>
						Convention : <code>&lt;NomDuComposant&gt;Props</code> (<code>ButtonProps</code>,{" "}
						<code>BadgeProps</code>…).
					</li>
					<li>
						Autocomplétion sur <code>variant</code>, <code>tone</code>, <code>size</code> et les
						attributs HTML natifs (les composants étendent leurs props DOM).
					</li>
				</ul>
			</Section>

			<Section title="Thématiser via les tokens --camply-*">
				<p className="cu-guide__p">
					Tous les composants lisent des variables CSS <code>--camply-*</code> fournies par
					styles.css. Re-thémer ne demande aucune prop ni configuration JS : surchargez ces
					variables — globalement sur <code>:root</code>, ou localement sur un scope. Le rendu suit
					immédiatement, c'est de la cascade CSS native.
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
				<CodeBlock lang="css">{`/* Globalement, sur toute l'app */
:root {
  --camply-accent: #8b5cf6;
}

.zone-promo {
  --camply-accent: #f97316;
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

			<Section title="className & style sur chaque composant">
				<p className="cu-guide__p">
					Chaque composant accepte <code>className</code> et <code>style</code>, fusionnés avec ses
					classes internes. Pratique pour l'espacement, la largeur ou une surcharge ponctuelle, sans
					casser le style de base.
				</p>
				<div className="cu-guide__split">
					<Preview>
						<Button style={{ borderRadius: 999 }}>Continuer</Button>
					</Preview>
					<CodeBlock lang="tsx">{`<Button className="w-full" style={{ borderRadius: 999 }}>
  Continuer
</Button>`}</CodeBlock>
				</div>
				<ul className="cu-guide__list">
					<li>
						<code>className</code> s'ajoute aux classes du composant (il ne les remplace pas).
					</li>
					<li>
						Pour un re-thème structurel, préférez les tokens aux surcharges <code>style</code>{" "}
						ponctuelles.
					</li>
				</ul>
			</Section>

			<Section title="Providers & APIs impératives (Toast, CommandPalette)">
				<p className="cu-guide__p">
					Deux fonctionnalités s'appuient sur un provider ou un hook : les toasts (
					<code>ToastProvider</code> + <code>useToast</code>) et la palette de commandes (
					<code>CommandPalette</code> + <code>useCommandPalette</code>). Englobez l'app une fois,
					puis pilotez depuis n'importe quel composant client.
				</p>
				<CodeBlock lang="tsx">{`"use client";
import { ToastProvider, useToast, Button } from "@camply/ui";

function App() {
  return (
    <ToastProvider position="bottom-right">
      <Page />
    </ToastProvider>
  );
}

function Page() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ title: "Enregistré", tone: "success" })}>
      Sauvegarder
    </Button>
  );
}`}</CodeBlock>
				<div className="cu-guide__demo">
					<ToastDemo />
					<PaletteDemo onNavigate={onNavigate} />
				</div>
				<Alert tone="info" className="cu-guide__banner">
					Ces deux APIs sont interactives : dans Next.js App Router, le fichier qui les utilise doit
					commencer par <code>"use client"</code>.
				</Alert>
			</Section>

			<Section title="Next.js (App Router)">
				<p className="cu-guide__p">
					Les composants purement présentiels (Badge, Card, Divider…) rendent sans souci côté
					serveur. Les composants interactifs (Toast, CommandPalette, inputs contrôlés…) sont des
					Client Components : ajoutez <code>"use client"</code> en tête du fichier qui les utilise,
					et gardez l'import des styles dans <code>app/layout.tsx</code>.
				</p>
				<CodeBlock lang="tsx">{`"use client";
import { CommandPalette, useCommandPalette } from "@camply/ui";

export function Palette() {
  const [open, setOpen] = useCommandPalette();
  return (
    <CommandPalette
      open={open}
      onClose={() => setOpen(false)}
      commands={[{ id: "home", label: "Accueil", onRun: () => {} }]}
    />
  );
}`}</CodeBlock>
				<ul className="cu-guide__list">
					<li>
						<code>styles.css</code> → toujours dans le layout racine, une seule fois.
					</li>
					<li>
						<code>"use client"</code> → uniquement sur les fichiers qui rendent des composants
						interactifs.
					</li>
					<li>Providers : englobez votre app dans un Client Component dédié.</li>
				</ul>
			</Section>

			<Section title="ESM & tree-shaking">
				<p className="cu-guide__p">
					Le paquet est distribué en ESM pur et déclare précisément ses effets de bord, ce qui
					laisse votre bundler éliminer tout code non utilisé.
				</p>
				<ul className="cu-guide__list">
					<li>
						<code>"type": "module"</code> — ESM uniquement, pas de build CommonJS.
					</li>
					<li>
						<code>sideEffects</code> limité au CSS : les composants JS non importés sont retirés du
						bundle.
					</li>
					<li>Aucune dépendance runtime : votre bundle final ne porte que @camply/ui + React.</li>
				</ul>
				<Banner tone="info" className="cu-guide__banner">
					Vous pouvez importer 58 composants depuis la racine sans craindre d'alourdir le bundle —
					seul ce que vous rendez compte.
				</Banner>
			</Section>

			<Section title="Où aller ensuite">
				<p className="cu-guide__p">
					Votre premier composant est à l'écran et vous maîtrisez les surfaces d'usage. Pour aller
					plus loin :
				</p>
				<div className="cu-guide__next">
					<ClickableCard className="cu-guide__nextcard" onActivate={() => onNavigate("button")}>
						<div className="cu-guide__nextcard-title">
							<Icon name="components" size={16} />
							Explorer les composants
						</div>
						<p className="cu-guide__nextcard-desc">
							58 composants groupés par famille et sous-famille, avec playground interactif.
						</p>
					</ClickableCard>
					<ClickableCard className="cu-guide__nextcard" onActivate={() => onNavigate(CSS)}>
						<div className="cu-guide__nextcard-title">
							<Icon name="tokens" size={16} />
							Personnaliser les tokens
						</div>
						<p className="cu-guide__nextcard-desc">
							Éditez les couleurs en direct et téléchargez votre <code>tokens.css</code> prêt à
							l'emploi.
						</p>
					</ClickableCard>
				</div>
			</Section>
		</div>
	);
}
