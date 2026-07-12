import { Breadcrumbs, CommandPalette, type Crumb, Kbd, useCommandPalette } from "@camply/ui";
import { useState } from "react";
import { ComponentPage } from "./components/ComponentPage";
import { HomeView } from "./components/HomeView";
import { RoadmapView } from "./components/RoadmapView";
import { Sidebar } from "./components/Sidebar";
import { TokensView } from "./components/TokensView";
import { BY_ID, COMPONENTS, CSS, HOME, ROADMAP } from "./showcase-data";

export function App() {
	const [active, setActive] = useState<string>(HOME);
	const [paletteOpen, setPaletteOpen] = useCommandPalette();
	const entry = BY_ID[active];

	const go = (id: string) => {
		setActive(id);
		setPaletteOpen(false);
	};

	// Fil d'Ariane : racine "Camply UI" toujours présente et cliquable (→ Accueil),
	// puis le chemin courant. Pour un composant : Camply UI → Famille → Composant.
	const crumbs: Crumb[] = [{ label: "Camply UI", onClick: () => go(HOME) }];
	if (active === CSS) {
		crumbs.push({ label: "CSS par défaut" });
	} else if (active === ROADMAP) {
		crumbs.push({ label: "Roadmap" });
	} else if (entry) {
		const familyFirst = COMPONENTS.find((component) => component.family === entry.family)?.id;
		crumbs.push({ label: entry.family, onClick: familyFirst ? () => go(familyFirst) : undefined });
		crumbs.push({ label: entry.label });
	} else {
		crumbs.push({ label: "Accueil" });
	}

	// La vitrine se pilote avec le CommandPalette de la lib (⌘K) — dogfooding.
	const commands = [
		{ id: HOME, label: "Accueil", group: "Navigation", onRun: () => go(HOME) },
		{ id: CSS, label: "CSS par défaut", group: "Navigation", onRun: () => go(CSS) },
		{ id: ROADMAP, label: "Roadmap", group: "Navigation", onRun: () => go(ROADMAP) },
		...COMPONENTS.map((c) => ({
			id: c.id,
			label: c.label,
			keywords: `${c.family} ${c.subfamily}`,
			group: c.family,
			onRun: () => go(c.id),
		})),
	];

	return (
		<div className="cu-shell">
			<Sidebar active={active} onNavigate={setActive} onOpenPalette={() => setPaletteOpen(true)} />
			<main className="cu-main">
				<header className="cu-topbar">
					<Breadcrumbs items={crumbs} />
					<button
						type="button"
						className="cu-topbar__palette"
						onClick={() => setPaletteOpen(true)}
						aria-label="Ouvrir la palette de commandes"
					>
						Rechercher
						<Kbd keys={["⌘", "K"]} size="sm" />
					</button>
				</header>
				<div className="cu-view">
					{active === HOME && <HomeView onNavigate={setActive} />}
					{active === CSS && <TokensView />}
					{active === ROADMAP && <RoadmapView onNavigate={setActive} />}
					{entry && <ComponentPage entry={entry} onNavigate={setActive} />}
				</div>
			</main>
			<CommandPalette
				open={paletteOpen}
				onClose={() => setPaletteOpen(false)}
				commands={commands}
				placeholder="Aller à un composant…"
			/>
		</div>
	);
}
