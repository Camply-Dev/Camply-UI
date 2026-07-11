import { Badge, Button, Card, Snippet } from "@camply/ui";
import { Icon } from "../icons";
import { AVAILABLE, CSS, FAMILIES, FAMILY_ICON, TOTAL } from "../showcase-data";
import { ClickableCard } from "./ClickableCard";

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
		<div>
			<div className="cu-hero">
				<img
					className="cu-logo cu-logo--lg"
					src="/logo.svg"
					alt="Camply UI"
					width={66}
					height={66}
				/>
				<Badge tone="accent">
					v0.1.0 · {AVAILABLE.length} / {TOTAL} composants
				</Badge>
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
				<div style={{ width: "100%", maxWidth: 420 }}>
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

			<h2 className="cu-h2">Explorer par famille</h2>
			<div className="cu-fams">
				{FAMILIES.map((family) => {
					const available = family.subfamilies
						.flatMap((s) => s.items)
						.filter((i) => i.status === "available").length;
					const firstId = family.subfamilies[0].items[0].id;
					return (
						<ClickableCard
							key={family.title}
							className="cu-fam"
							onActivate={() => onNavigate(firstId)}
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
						</ClickableCard>
					);
				})}
			</div>
		</div>
	);
}
