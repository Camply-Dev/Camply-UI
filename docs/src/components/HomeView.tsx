import { useState } from "react";
import { Button } from "@camply/ui";
import { Icon } from "../icons";
import { ALL_COMPONENTS, AVAILABLE, FAMILIES, FAMILY_ICON, type SectionId } from "../showcase-data";

function Snippet() {
	const [copied, setCopied] = useState(false);
	const copy = () => {
		navigator.clipboard?.writeText("npm i @camply/ui");
		setCopied(true);
		setTimeout(() => setCopied(false), 1400);
	};
	return (
		<div className="cu-snippet">
			<code className="cu-snippet__code">
				<span className="cu-snippet__prompt">$</span>npm i @camply/ui
			</code>
			<button type="button" className="cu-snippet__copy" aria-label="Copier" onClick={copy}>
				<Icon name={copied ? "check" : "copy"} size={15} />
			</button>
		</div>
	);
}

interface HomeViewProps {
	onNavigate: (section: SectionId) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
	const stats = [
		{ v: String(AVAILABLE.length), l: "disponibles" },
		{ v: String(ALL_COMPONENTS.length), l: "au total" },
		{ v: String(FAMILIES.length), l: "familles" },
		{ v: "ESM", l: "tree-shakable" },
	];

	return (
		<div>
			<div className="cu-hero">
				<span className="cu-logo cu-logo--lg" aria-hidden="true">
					C
				</span>
				<span className="cu-pill">
					<span className="cu-dot" />v0.1.0 · {AVAILABLE.length} composants disponibles
				</span>
				<h1 className="cu-hero__title">
					La librairie UI
					<br />
					de Camply
				</h1>
				<p className="cu-hero__sub">
					Des composants React soignés, accessibles et <strong>customisables de A à Z</strong>.
					Pensés pour le web et les apps modernes — TypeScript, tokens CSS et tree-shaking.
				</p>
				<div className="cu-hero__cta">
					<Button
						variant="primary"
						size="lg"
						rightIcon={<Icon name="arrow" />}
						onClick={() => onNavigate("components")}
					>
						Explorer les composants
					</Button>
					<Button variant="secondary" size="lg" onClick={() => onNavigate("tokens")}>
						Voir le CSS par défaut
					</Button>
				</div>
				<Snippet />
			</div>

			<div className="cu-stats">
				{stats.map((stat) => (
					<div key={stat.l} className="cu-stat">
						<div className="cu-stat__v">{stat.v}</div>
						<div className="cu-stat__l">{stat.l}</div>
					</div>
				))}
			</div>

			<h2 className="cu-h2">Explorer par famille</h2>
			<div className="cu-fams">
				{FAMILIES.map((family) => {
					const available = family.components.filter((c) => c.status === "available").length;
					return (
						<button
							key={family.title}
							type="button"
							className="cu-fam"
							onClick={() => onNavigate(available > 0 ? "components" : "roadmap")}
						>
							<div className="cu-fam__head">
								<span className="cu-fam__icon">
									<Icon name={FAMILY_ICON[family.title] ?? "components"} size={20} />
								</span>
								<span className="cu-fam__count">
									{available}/{family.components.length} dispo
								</span>
							</div>
							<div className="cu-fam__name">{family.title}</div>
							<div className="cu-fam__desc">{family.desc}</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
