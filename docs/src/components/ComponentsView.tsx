import { Badge, Button } from "@camply/ui";
import { Icon } from "../icons";

export function ComponentsView() {
	return (
		<div>
			<header className="cu-pagehead">
				<span className="cu-pill">
					<span className="cu-dot" />2 composants
				</span>
				<h1 className="cu-pagehead__title">Composants disponibles</h1>
				<p className="cu-pagehead__sub">
					Les composants réellement publiés dans <code>@camply/ui</code>, rendus en direct depuis
					la librairie (dogfooding). Chaque nouvel ajout apparaîtra ici.
				</p>
			</header>

			<section className="cu-panel">
				<div className="cu-panel__head">
					<h3 className="cu-panel__title">Button</h3>
					<Badge tone="success" dot>
						Disponible
					</Badge>
				</div>
				<p className="cu-panel__desc">
					Bouton d'action — 5 variantes, 3 tailles, états loading et disabled, icônes.
				</p>

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
			</section>

			<section className="cu-panel">
				<div className="cu-panel__head">
					<h3 className="cu-panel__title">Badge</h3>
					<Badge tone="success" dot>
						Disponible
					</Badge>
				</div>
				<p className="cu-panel__desc">
					Marqueur de statut — 3 variantes, 6 tons, tailles sm / md, pastille optionnelle.
				</p>

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
			</section>
		</div>
	);
}
