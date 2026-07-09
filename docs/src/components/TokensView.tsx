import { TOKEN_GROUPS } from "../showcase-data";

export function TokensView() {
	return (
		<div>
			<header className="cu-pagehead">
				<span className="cu-pill">
					<span className="cu-dot" />Fondations
				</span>
				<h1 className="cu-pagehead__title">Tokens CSS</h1>
				<p className="cu-pagehead__sub">
					Tous les composants lisent ces variables <code>--camply-*</code>. Thémer, c'est changer
					ces valeurs (globalement ou sur un scope).
				</p>
			</header>

			<div className="cu-tokens">
				{TOKEN_GROUPS.map((group) => (
					<div key={group.title} className="cu-tokgroup">
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
					</div>
				))}
			</div>
		</div>
	);
}
