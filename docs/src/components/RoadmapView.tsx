import { Badge } from "@camply/ui";
import { FAMILIES } from "../showcase-data";

export function RoadmapView() {
	return (
		<div>
			<header className="cu-pagehead">
				<span className="cu-pill">
					<span className="cu-dot" />Roadmap
				</span>
				<h1 className="cu-pagehead__title">Roadmap composants</h1>
				<p className="cu-pagehead__sub">
					Les composants à venir, inspirés du design system Camply. Ils seront ajoutés
					progressivement à <code>@camply/ui</code> et remplaceront ces cartes.
				</p>
			</header>

			{FAMILIES.map((family) => {
				const soon = family.components.filter((c) => c.status === "soon");
				if (soon.length === 0) {
					return null;
				}
				return (
					<section key={family.title} className="cu-road-fam">
						<h3 className="cu-road-fam__title">
							{family.title}
							<Badge tone="neutral" size="sm">
								{soon.length}
							</Badge>
						</h3>
						<div className="cu-road">
							{soon.map((component) => (
								<div key={component.name} className="cu-road__card">
									<div className="cu-road__top">
										<span className="cu-road__name">{component.name}</span>
										<Badge tone="warning" variant="soft" size="sm">
											À venir
										</Badge>
									</div>
									<p className="cu-road__desc">{component.desc}</p>
								</div>
							))}
						</div>
					</section>
				);
			})}
		</div>
	);
}
