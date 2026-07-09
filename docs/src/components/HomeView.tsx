import { useState } from "react";
import { Button } from "@camply/ui";
import { Icon } from "../icons";
import { AVAILABLE, CSS, FAMILIES, FAMILY_ICON, TOTAL } from "../showcase-data";

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
	onNavigate: (id: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
	const stats = [
		{ v: String(TOTAL), l: "composants" },
		{ v: String(AVAILABLE.length), l: "disponibles" },
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
					<span className="cu-dot" />v0.1.0 · {AVAILABLE.length} / {TOTAL} composants
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
						onClick={() => onNavigate("button")}
					>
						Explorer les composants
					</Button>
					<Button variant="secondary" size="lg" onClick={() => onNavigate(CSS)}>
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
					const available = family.subfamilies
						.flatMap((s) => s.items)
						.filter((i) => i.status === "available").length;
					const firstId = family.subfamilies[0].items[0].id;
					return (
						<button
							key={family.title}
							type="button"
							className="cu-fam"
							onClick={() => onNavigate(firstId)}
						>
							<div className="cu-fam__head">
								<span className="cu-fam__icon">
									<Icon name={FAMILY_ICON[family.title] ?? "components"} size={20} />
								</span>
								<span className="cu-fam__count">
									{available}/{family.count}
								</span>
							</div>
							<div className="cu-fam__name">{family.title}</div>
							<div className="cu-fam__desc">
								{family.subfamilies.map((s) => s.title).join(" · ")}
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
