import { Badge, Input } from "@camply/ui";
import { type ComponentType, useState } from "react";
import * as LibIcons from "../../../src/lib/icons";
import { Icon } from "../icons";

type IconComponent = ComponentType<{ size?: number }>;

// Le pack complet, dérivé du module (composants) ; STATUS_ICONS (objet) écarté.
const ICON_LIST: { name: string; Cmp: IconComponent }[] = (
	Object.entries(LibIcons) as [string, unknown][]
)
	.filter(([, value]) => typeof value === "function")
	.map(([name, value]) => ({ name, Cmp: value as IconComponent }))
	.sort((a, b) => a.name.localeCompare(b.name));

export function IconsView() {
	const [query, setQuery] = useState("");

	const q = query.trim().toLowerCase();
	const shown = q ? ICON_LIST.filter((i) => i.name.toLowerCase().includes(q)) : ICON_LIST;

	return (
		<div>
			<header className="cu-pagehead">
				<Badge tone="accent" icon={<Icon name="shapes" size={12} />}>
					Icônes
				</Badge>
				<h1 className="cu-pagehead__title">Icônes</h1>
				<p className="cu-pagehead__sub">
					Le pack d'icônes de Camply UI — {ICON_LIST.length} pictogrammes (tracés{" "}
					<code>Lucide</code>, trait 2px, 24×24, <code>currentColor</code>). Réutilisables dans ton
					app : <code>{`import { Home } from "@camply/ui/icons"`}</code>.
				</p>
				<div className="cu-icons__toolbar">
					<Input
						size="sm"
						type="search"
						leftIcon={<Icon name="search" size={15} />}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Rechercher parmi les icônes…"
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
