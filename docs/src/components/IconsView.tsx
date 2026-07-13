import { Badge, Input } from "@camply/ui";
import { type ComponentType, useMemo, useState } from "react";
import * as LibIcons from "../../../src/lib/icons";
import { Icon } from "../icons";

type IconComponent = ComponentType<{ size?: number }>;

// Toutes les icônes exportées par la lib, dérivées automatiquement du module :
// on garde les composants (fonctions) et on écarte STATUS_ICONS (un objet).
const ICON_LIST: { name: string; Cmp: IconComponent }[] = (
	Object.entries(LibIcons) as [string, unknown][]
)
	.filter(([, value]) => typeof value === "function")
	.map(([name, value]) => ({ name, Cmp: value as IconComponent }))
	.sort((a, b) => a.name.localeCompare(b.name));

export function IconsView() {
	const [query, setQuery] = useState("");

	const q = query.trim().toLowerCase();
	const shown = useMemo(
		() => (q ? ICON_LIST.filter((i) => i.name.toLowerCase().includes(q)) : ICON_LIST),
		[q],
	);

	return (
		<div>
			<header className="cu-pagehead">
				<Badge tone="accent" icon={<Icon name="shapes" size={12} />}>
					Icônes
				</Badge>
				<h1 className="cu-pagehead__title">Icônes</h1>
				<p className="cu-pagehead__sub">
					Le jeu d'icônes fourni avec Camply UI, basé sur <code>Lucide</code> — {ICON_LIST.length}{" "}
					pictogrammes cohérents (trait 2px, grille 24×24, <code>currentColor</code>).
				</p>
				<div className="cu-icons__toolbar">
					<Input
						size="sm"
						type="search"
						leftIcon={<Icon name="search" size={15} />}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Rechercher une icône…"
						aria-label="Rechercher une icône"
					/>
				</div>
			</header>

			{shown.length === 0 ? (
				<div className="cu-icons__empty">Aucune icône pour « {query.trim()} ».</div>
			) : (
				<div className="cu-icons__grid">
					{shown.map(({ name, Cmp }) => (
						<div key={name} className="cu-icons__cell" title={name}>
							<Cmp size={22} />
						</div>
					))}
				</div>
			)}
		</div>
	);
}
