import { useState } from "react";
import { ComponentPage } from "./components/ComponentPage";
import { HomeView } from "./components/HomeView";
import { RoadmapView } from "./components/RoadmapView";
import { Sidebar } from "./components/Sidebar";
import { TokensView } from "./components/TokensView";
import { Icon } from "./icons";
import { BY_ID, CSS, HOME, ROADMAP } from "./showcase-data";

export function App() {
	const [active, setActive] = useState<string>(HOME);
	const entry = BY_ID[active];

	let crumbFamily = "Camply UI";
	let crumbName = "Accueil";
	if (active === CSS) {
		crumbFamily = "Fondations";
		crumbName = "CSS par défaut";
	} else if (active === ROADMAP) {
		crumbFamily = "Composants";
		crumbName = "Roadmap";
	} else if (entry) {
		crumbFamily = entry.family;
		crumbName = entry.label;
	}

	return (
		<div className="cu-shell">
			<Sidebar active={active} onNavigate={setActive} />
			<main className="cu-main">
				<header className="cu-topbar">
					<span>{crumbFamily}</span>
					<Icon name="chevron" size={13} />
					<span className="cu-topbar__active">{crumbName}</span>
				</header>
				<div className="cu-view">
					{active === HOME && <HomeView onNavigate={setActive} />}
					{active === CSS && <TokensView />}
					{active === ROADMAP && <RoadmapView onNavigate={setActive} />}
					{entry && <ComponentPage entry={entry} onNavigate={setActive} />}
				</div>
			</main>
		</div>
	);
}
