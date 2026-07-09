import { Badge } from "@camply/ui";
import { FAMILIES } from "../showcase-data";

interface RoadmapViewProps {
	onNavigate: (id: string) => void;
}

export function RoadmapView({ onNavigate }: RoadmapViewProps) {
	return (
		<div>
			<header className="cu-pagehead">
				<span className="cu-pill">Roadmap</span>
				<h1 className="cu-pagehead__title">Roadmap composants</h1>
				<p className="cu-pagehead__sub">
					Les composants à venir, groupés par famille et sous-famille (même source que la
					navigation). Ils seront ajoutés progressivement à <code>@camply/ui</code>.
				</p>
			</header>

			{FAMILIES.map((family) => {
				const subs = family.subfamilies
					.map((sub) => ({
						title: sub.title,
						items: sub.items.filter((i) => i.status === "upcoming"),
					}))
					.filter((sub) => sub.items.length > 0);
				if (subs.length === 0) return null;
				return (
					<section key={family.title} className="cu-road-fam">
						<h3 className="cu-road-fam__title">{family.title}</h3>
						{subs.map((sub) => (
							<div key={sub.title} className="cu-road-sub">
								<div className="cu-road-sub__title">{sub.title}</div>
								<div className="cu-road">
									{sub.items.map((item) => (
										<button
											key={item.id}
											type="button"
											className="cu-road__card"
											onClick={() => onNavigate(item.id)}
										>
											<div className="cu-road__top">
												<span className="cu-road__name">{item.label}</span>
												<Badge tone="warning" variant="soft" size="sm">
													À venir
												</Badge>
											</div>
											<p className="cu-road__desc">{item.description}</p>
										</button>
									))}
								</div>
							</div>
						))}
					</section>
				);
			})}
		</div>
	);
}
