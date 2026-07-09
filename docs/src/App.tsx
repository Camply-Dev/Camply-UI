import { useState } from "react";
import { ComponentsView } from "./components/ComponentsView";
import { HomeView } from "./components/HomeView";
import { RoadmapView } from "./components/RoadmapView";
import { Sidebar } from "./components/Sidebar";
import { TokensView } from "./components/TokensView";
import { Icon } from "./icons";
import type { SectionId } from "./showcase-data";

const LABELS: Record<SectionId, string> = {
	home: "Accueil",
	components: "Composants disponibles",
	roadmap: "Roadmap",
	tokens: "Tokens CSS",
};

export function App() {
	const [section, setSection] = useState<SectionId>("home");

	return (
		<div className="cu-shell">
			<Sidebar active={section} onNavigate={setSection} />
			<main className="cu-main">
				<header className="cu-topbar">
					<span>Camply UI</span>
					<Icon name="chevron" size={13} />
					<span className="cu-topbar__active">{LABELS[section]}</span>
				</header>
				<div className="cu-view">
					{section === "home" && <HomeView onNavigate={setSection} />}
					{section === "components" && <ComponentsView />}
					{section === "roadmap" && <RoadmapView />}
					{section === "tokens" && <TokensView />}
				</div>
			</main>
		</div>
	);
}
