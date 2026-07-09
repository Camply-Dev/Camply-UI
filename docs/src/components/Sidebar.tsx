import { Icon } from "../icons";
import type { SectionId } from "../showcase-data";

const NAV: { id: SectionId; label: string; icon: string }[] = [
	{ id: "home", label: "Accueil", icon: "home" },
	{ id: "components", label: "Composants disponibles", icon: "components" },
	{ id: "roadmap", label: "Roadmap", icon: "roadmap" },
	{ id: "tokens", label: "Tokens CSS", icon: "tokens" },
];

interface SidebarProps {
	active: SectionId;
	onNavigate: (section: SectionId) => void;
}

export function Sidebar({ active, onNavigate }: SidebarProps) {
	return (
		<aside className="cu-side">
			<div className="cu-brand">
				<span className="cu-logo" aria-hidden="true">
					C
				</span>
				<div>
					<div className="cu-brand__name">Camply UI</div>
					<div className="cu-brand__meta">2 composants · React</div>
				</div>
			</div>

			<nav className="cu-nav">
				<div className="cu-nav__label">Navigation</div>
				{NAV.map((item) => (
					<button
						key={item.id}
						type="button"
						className={item.id === active ? "cu-nav__item cu-nav__item--active" : "cu-nav__item"}
						onClick={() => onNavigate(item.id)}
					>
						<Icon name={item.icon} size={16} />
						{item.label}
					</button>
				))}
			</nav>

			<div className="cu-side__foot">
				Installer la lib :<br />
				<code>bun add @camply/ui</code>
			</div>
		</aside>
	);
}
