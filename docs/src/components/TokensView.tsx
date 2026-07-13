import { Badge, Banner, Button, Card, ColorPicker } from "@camply/ui";
import { useState } from "react";
import tokensRaw from "../../../src/styles/tokens.css?raw";
import { Icon } from "../icons";
import { parseColor, toCss } from "../lib/color";
import { buildTokensCss } from "../lib/tokensFile";
import { TOKEN_GROUPS } from "../showcase-data";

function TokenSwatch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
	const { hex, alpha } = parseColor(value);
	return (
		<ColorPicker
			variant="swatch"
			value={hex}
			alpha={alpha}
			onChange={(h) => onChange(toCss(h, alpha))}
			onAlphaChange={(a) => onChange(toCss(hex, a))}
		/>
	);
}

export function TokensView() {
	const [overrides, setOverrides] = useState<Record<string, string>>(() => {
		if (typeof document === "undefined") return {};
		const init: Record<string, string> = {};
		for (const group of TOKEN_GROUPS) {
			for (const row of group.rows) {
				const v = document.documentElement.style.getPropertyValue(row.name).trim();
				if (v) init[row.name] = v;
			}
		}
		return init;
	});
	const dirty = Object.keys(overrides).length > 0;

	const tokenValue = (name: string, fallback: string) => overrides[name] ?? fallback;

	const setToken = (name: string, value: string) => {
		setOverrides((prev) => ({ ...prev, [name]: value }));
		document.documentElement.style.setProperty(name, value);
	};

	const reset = () => {
		for (const group of TOKEN_GROUPS) {
			for (const row of group.rows) {
				document.documentElement.style.removeProperty(row.name);
			}
		}
		setOverrides({});
	};

	const download = () => {
		const out = buildTokensCss(tokensRaw, overrides);
		const url = URL.createObjectURL(new Blob([out], { type: "text/css" }));
		const a = document.createElement("a");
		a.href = url;
		a.download = "tokens.css";
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div>
			<header className="cu-pagehead">
				<Badge tone="accent" icon={<Icon name="tokens" size={12} />}>
					Fondations
				</Badge>
				<h1 className="cu-pagehead__title">Tokens CSS</h1>
				<p className="cu-pagehead__sub">
					Tous les composants lisent ces variables <code>--camply-*</code>. Modifie une couleur
					ci-dessous : tout le site se met à jour en direct. « Télécharger » génère ton{" "}
					<code>tokens.css</code> prêt à l'emploi.
				</p>
				<div className="cu-tokens__actions">
					<Button
						variant="secondary"
						size="sm"
						leftIcon={<Icon name="reset" size={15} />}
						onClick={reset}
						disabled={!dirty}
					>
						Réinitialiser
					</Button>
					<Button
						variant="primary"
						size="sm"
						leftIcon={<Icon name="download" size={15} />}
						onClick={download}
					>
						Télécharger tokens.css
					</Button>
				</div>
			</header>

			<div className="cu-tokens">
				{TOKEN_GROUPS.map((group) => (
					<Card key={group.title} padding="none" className="cu-tokgroup">
						<div className="cu-tokgroup__head">{group.title}</div>
						<div className="cu-tokgroup__body">
							{group.rows.map((row) => {
								const current = tokenValue(row.name, row.value);
								return (
									<div key={row.name} className="cu-token">
										{row.color ? (
											<TokenSwatch value={current} onChange={(v) => setToken(row.name, v)} />
										) : null}
										<code className="cu-token__name">{row.name}</code>
										<code className="cu-token__val">{current}</code>
									</div>
								);
							})}
						</div>
					</Card>
				))}
			</div>

			<Banner tone="info" className="cu-tokens__hint">
				Astuce : les couleurs éditées sont appliquées via <code>:root</code>. Recharger la page
				repart des valeurs par défaut.
			</Banner>
		</div>
	);
}
