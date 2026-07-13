import { Badge, Banner, Button, Card, ColorPicker } from "@camply/ui";
import { useState } from "react";
import tokensRaw from "../../../src/styles/tokens.css?raw";
import { Icon } from "../icons";
import { TOKEN_GROUPS } from "../showcase-data";

/* ---- couleur : parse (#hex / rgb / rgba) → hex + alpha, et retour ---- */
function parseColor(v: string): { hex: string; alpha: number } {
	const s = v.trim();
	const hex6 = /^#([0-9a-f]{6})$/i.exec(s);
	if (hex6) return { hex: `#${hex6[1].toLowerCase()}`, alpha: 1 };
	const hex3 = /^#([0-9a-f]{3})$/i.exec(s);
	if (hex3) {
		const full = hex3[1]
			.split("")
			.map((c) => c + c)
			.join("");
		return { hex: `#${full.toLowerCase()}`, alpha: 1 };
	}
	const rgb = /^rgba?\(([^)]+)\)$/i.exec(s);
	if (rgb) {
		const parts = rgb[1].split(",").map((p) => p.trim());
		const [r, g, b] = parts.map(Number);
		const a = parts[3] != null ? Number(parts[3]) : 1;
		const hex = `#${[r, g, b].map((n) => Math.round(n).toString(16).padStart(2, "0")).join("")}`;
		return { hex, alpha: Number.isNaN(a) ? 1 : a };
	}
	return { hex: "#000000", alpha: 1 };
}

function toCss(hex: string, alpha: number): string {
	if (alpha >= 1) return hex.toLowerCase();
	const int = parseInt(hex.slice(1), 16);
	const rounded = Math.round(alpha * 100) / 100;
	return `rgba(${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}, ${rounded})`;
}

/** Swatch ColorPicker piloté par la valeur du token (entièrement contrôlé). */
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
	// Surcharges appliquées : token → valeur. Vide = valeurs par défaut du thème.
	// Source de vérité = les variables inline sur :root (elles persistent après
	// navigation) ; on les relit au montage pour que les swatches et le bouton
	// Réinitialiser reflètent l'état réel du site (et non un état React perdu).
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

	// Écrit la variable sur :root (inline > feuille de styles) → tout le site suit en direct.
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

	// Génère un tokens.css complet = le vrai fichier avec les valeurs surchargées injectées.
	const download = () => {
		let out = tokensRaw;
		for (const [name, value] of Object.entries(overrides)) {
			out = out.replace(new RegExp(`(${name}\\s*:\\s*)([^;]+)(;)`), `$1${value}$3`);
		}
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
