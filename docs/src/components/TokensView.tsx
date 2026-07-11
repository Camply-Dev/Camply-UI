import { Badge, Card } from "@camply/ui";
import { Icon } from "../icons";
import { TOKEN_GROUPS } from "../showcase-data";

export function TokensView() {
	return (
		<div>
			<header className="cu-pagehead">
				<Badge tone="accent" icon={<Icon name="tokens" size={12} />}>
					Fondations
				</Badge>
				<h1 className="cu-pagehead__title">Tokens CSS</h1>
				<p className="cu-pagehead__sub">
					Tous les composants lisent ces variables <code>--camply-*</code>. Thémer, c'est changer
					ces valeurs (globalement ou sur un scope).
				</p>
			</header>

			<div className="cu-tokens">
				{TOKEN_GROUPS.map((group) => (
					<Card key={group.title} padding="none" className="cu-tokgroup">
						<div className="cu-tokgroup__head">{group.title}</div>
						<div className="cu-tokgroup__body">
							{group.rows.map((row) => (
								<div key={row.name} className="cu-token">
									{row.color ? (
										<span className="cu-swatch" style={{ background: row.value }} />
									) : null}
									<code className="cu-token__name">{row.name}</code>
									<code className="cu-token__val">{row.value}</code>
								</div>
							))}
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
