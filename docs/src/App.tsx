import { Breadcrumbs, CommandPalette, type Crumb, Kbd, useCommandPalette } from "@camply/ui";
import { useState } from "react";
import { ComponentPage } from "./components/ComponentPage";
import { Sidebar } from "./components/Sidebar";
import { PAGES } from "./pages";
import { BY_ID, COMPONENTS, HOME } from "./showcase-data";

export function App() {
	const [active, setActive] = useState<string>(HOME);
	const [paletteOpen, setPaletteOpen] = useCommandPalette();
	const entry = BY_ID[active];
	const page = PAGES.find((p) => p.id === active);

	const go = (id: string) => {
		setActive(id);
		setPaletteOpen(false);
	};

	const crumbs: Crumb[] = [{ label: "Camply UI", onClick: () => go(HOME) }];
	if (entry) {
		const familyFirst = COMPONENTS.find((component) => component.family === entry.family)?.id;
		crumbs.push({ label: entry.family, onClick: familyFirst ? () => go(familyFirst) : undefined });
		crumbs.push({ label: entry.label });
	} else {
		crumbs.push({ label: page?.label ?? "Accueil" });
	}

	const commands = [
		...PAGES.map((p) => ({ id: p.id, label: p.label, group: "Pages", onRun: () => go(p.id) })),
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
			<Sidebar active={active} onNavigate={setActive} />
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
					{page && <page.View onNavigate={setActive} />}
					{entry && <ComponentPage entry={entry} />}
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
