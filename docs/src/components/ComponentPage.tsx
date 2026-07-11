import { Badge, Button } from "@camply/ui";
import { Icon } from "../icons";
import { PLAYGROUNDS, PlaygroundView } from "../playground";
import { type ComponentEntry, ROADMAP } from "../showcase-data";

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
				<code>@camply/ui</code>.
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
	const config = entry.status === "available" ? PLAYGROUNDS[entry.id] : undefined;
	return (
		<div>
			<header className="cu-pagehead">
				<div className="cu-crumbrow">
					<Badge tone="accent">{entry.family}</Badge>
					<Icon name="chevron" size={12} />
					<span className="cu-crumb">{entry.subfamily}</span>
				</div>
				<div className="cu-titlerow">
					<h1 className="cu-pagehead__title">{entry.label}</h1>
					{config ? (
						<Badge tone="success" icon={<Icon name="check" size={12} />}>
							Disponible
						</Badge>
					) : (
						<Badge tone="warning">À venir</Badge>
					)}
				</div>
				<p className="cu-pagehead__sub">{entry.description}</p>
			</header>

			{config ? (
				<PlaygroundView key={entry.id} config={config} />
			) : (
				<UpcomingNotice entry={entry} onNavigate={onNavigate} />
			)}
		</div>
	);
}
