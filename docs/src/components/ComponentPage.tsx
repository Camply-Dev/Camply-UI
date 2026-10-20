import { Badge } from "@camply/ui";
import { Icon } from "../icons";
import { PLAYGROUNDS, PlaygroundView } from "../playground";
import type { ComponentEntry } from "../showcase-data";

interface ComponentPageProps {
	entry: ComponentEntry;
}

export function ComponentPage({ entry }: ComponentPageProps) {
	const config = PLAYGROUNDS[entry.id];
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
					<Badge tone="success" icon={<Icon name="check" size={12} />}>
						Disponible
					</Badge>
				</div>
				<p className="cu-pagehead__sub">{entry.description}</p>
			</header>

			{config && <PlaygroundView key={entry.id} config={config} />}
		</div>
	);
}
