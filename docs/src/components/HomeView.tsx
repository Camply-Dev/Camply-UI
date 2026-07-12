import { Badge, Button, Card, Snippet } from "@camply/ui";
import { Icon } from "../icons";
import { AVAILABLE, CSS, FAMILIES, TOTAL } from "../showcase-data";

interface HomeViewProps {
	onNavigate: (id: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
	const stats = [
		{ value: String(TOTAL), label: "composants" },
		{ value: String(AVAILABLE.length), label: "disponibles" },
		{ value: String(FAMILIES.length), label: "familles" },
		{ value: "ESM", label: "tree-shakable" },
	];

	return (
		<div className="cu-home">
			<div className="cu-hero">
				<img
					className="cu-logo cu-logo--lg"
					src="/logo.svg"
					alt="Camply UI"
					width={58}
					height={58}
				/>
				<Badge tone="accent">
					v0.1.0 · {AVAILABLE.length} / {TOTAL} composants
				</Badge>
				<h1 className="cu-hero__title">La librairie UI de Camply</h1>
				<p className="cu-hero__sub">
					Des composants React soignés, accessibles et <strong>customisables de A à Z</strong> —
					TypeScript, tokens CSS et tree-shaking.
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
				<div className="cu-hero__install">
					<Snippet prompt>npm i @camply/ui</Snippet>
				</div>
			</div>

			<div className="cu-stats">
				{stats.map((stat) => (
					<Card key={stat.label} className="cu-stat">
						<div className="cu-stat__v">{stat.value}</div>
						<div className="cu-stat__l">{stat.label}</div>
					</Card>
				))}
			</div>
		</div>
	);
}
