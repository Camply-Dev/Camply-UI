import { Badge, Button } from "@camply/ui";
import { Icon } from "../icons";
import { type ComponentEntry, ROADMAP } from "../showcase-data";

function ButtonDemo() {
	return (
		<div className="cu-demo">
			<div className="cu-preview">
				<div className="cu-preview__label">Variantes</div>
				<div className="cu-row">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="soft">Soft</Button>
					<Button variant="danger">Danger</Button>
				</div>
			</div>
			<div className="cu-preview">
				<div className="cu-preview__label">Tailles</div>
				<div className="cu-row">
					<Button size="sm">Small</Button>
					<Button size="md">Medium</Button>
					<Button size="lg">Large</Button>
				</div>
			</div>
			<div className="cu-preview">
				<div className="cu-preview__label">États et icônes</div>
				<div className="cu-row">
					<Button leftIcon={<Icon name="check" />}>Valider</Button>
					<Button rightIcon={<Icon name="arrow" />}>Continuer</Button>
					<Button loading>Chargement</Button>
					<Button disabled>Disabled</Button>
					<Button variant="danger" loading>
						Suppression…
					</Button>
				</div>
			</div>
		</div>
	);
}

function BadgeDemo() {
	return (
		<div className="cu-demo">
			<div className="cu-preview">
				<div className="cu-preview__label">Variantes</div>
				<div className="cu-row">
					<Badge variant="soft">Soft</Badge>
					<Badge variant="solid">Solid</Badge>
					<Badge variant="outline">Outline</Badge>
				</div>
			</div>
			<div className="cu-preview">
				<div className="cu-preview__label">Tons</div>
				<div className="cu-row">
					<Badge tone="accent">Accent</Badge>
					<Badge tone="neutral">Neutral</Badge>
					<Badge tone="success">Success</Badge>
					<Badge tone="warning">Warning</Badge>
					<Badge tone="danger">Danger</Badge>
					<Badge tone="info">Info</Badge>
				</div>
			</div>
			<div className="cu-preview">
				<div className="cu-preview__label">Pastille et tailles</div>
				<div className="cu-row">
					<Badge dot tone="success">
						Online
					</Badge>
					<Badge dot variant="outline" tone="warning">
						Pending
					</Badge>
					<Badge size="sm" tone="info">
						Small
					</Badge>
					<Badge variant="solid" tone="accent">
						Solid
					</Badge>
				</div>
			</div>
		</div>
	);
}

function UpcomingNotice({
	entry,
	onNavigate,
}: {
	entry: ComponentEntry;
	onNavigate: (id: string) => void;
}) {
	return (
		<div className="cu-upcoming">
			<span className="cu-upcoming__icon">
				<Icon name="clock" size={24} />
			</span>
			<h3 className="cu-upcoming__title">Composant à venir</h3>
			<p className="cu-upcoming__text">
				<strong>{entry.label}</strong> ({entry.family} · {entry.subfamily}) — {entry.description} Ce
				composant est prévu dans la roadmap Camply UI mais n'est pas encore implémenté dans{" "}
				<code>@camply/ui</code>. Pour l'instant, seuls <strong>Button</strong> et{" "}
				<strong>Badge</strong> sont réellement disponibles.
			</p>
			<Button variant="secondary" size="sm" onClick={() => onNavigate(ROADMAP)}>
				Voir la roadmap
			</Button>
		</div>
	);
}

interface ComponentPageProps {
	entry: ComponentEntry;
	onNavigate: (id: string) => void;
}

export function ComponentPage({ entry, onNavigate }: ComponentPageProps) {
	const available = entry.status === "available";
	return (
		<div>
			<header className="cu-pagehead">
				<div className="cu-crumbrow">
					<span className="cu-pill">{entry.family}</span>
					<Icon name="chevron" size={12} />
					<span className="cu-crumb">{entry.subfamily}</span>
				</div>
				<div className="cu-titlerow">
					<h1 className="cu-pagehead__title">{entry.label}</h1>
					{available ? (
						<Badge tone="success" dot>
							Disponible
						</Badge>
					) : (
						<Badge tone="warning">À venir</Badge>
					)}
				</div>
				<p className="cu-pagehead__sub">{entry.description}</p>
			</header>

			{available && entry.id === "button" && <ButtonDemo />}
			{available && entry.id === "badge" && <BadgeDemo />}
			{!available && <UpcomingNotice entry={entry} onNavigate={onNavigate} />}
		</div>
	);
}
