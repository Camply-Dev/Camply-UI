// Moteur de playground générique : chaque composant fournit une config
// déclarative (contrôles, rendu, props) et le moteur fait le reste —
// état, panneau de contrôles (composants @camply/ui), code généré, table des props.
import { Input, SegmentedControl, Snippet, Switch, Table } from "@camply/ui";
import { type ReactNode, useState } from "react";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------- Conversions des valeurs de contrôle ----------
// Le défaut `= string` fait que TypeScript infère T depuis la prop cible,
// ce qui évite d'écrire `as never` à chaque appel côté configs.
export const str = <T = string>(v: unknown): T => String(v) as unknown as T;
export const bool = (v: unknown) => Boolean(v);
export const num = (v: unknown) => Number(v);

// ---------- Types ----------
export type ControlValue = string | boolean;
export type Values = Record<string, ControlValue>;

export type Control = { key: string; label: string } & (
	| { type: "text" }
	| { type: "seg"; options: string[] }
	| { type: "toggle" }
);

export type PropRow = [name: string, type: string, description: string];

export interface PlaygroundConfig {
	/** nom du composant dans le code généré, ex. "Button" */
	component: string;
	/** symboles à importer si différents de [component] */
	imports?: string[];
	controls: Control[];
	defaults: Values;
	/** clé du contrôle texte utilisé comme children dans le code généré */
	childrenKey?: string;
	/** lignes d'attributs statiques ajoutées au code généré, ex. 'onClick={…}' */
	extraAttrs?: string[];
	render: (p: Values) => ReactNode;
	/** code sur mesure — sinon généré automatiquement depuis les contrôles */
	code?: (p: Values) => string;
	props: PropRow[];
}

// ---------- Code généré ----------
function genCode(cfg: PlaygroundConfig, p: Values): string {
	if (cfg.code) return cfg.code(p);
	const attrs: string[] = [];
	for (const c of cfg.controls) {
		if (c.key === cfg.childrenKey) continue;
		const v = p[c.key];
		if (c.type === "toggle") {
			if (v) attrs.push(`  ${c.key}`);
		} else if (c.type === "seg" || v) {
			// seg : toujours émis ; texte : seulement s'il est non vide
			attrs.push(`  ${c.key}="${v}"`);
		}
	}
	for (const extra of cfg.extraAttrs ?? []) attrs.push(`  ${extra}`);

	const name = cfg.component;
	const imports = (cfg.imports ?? [name]).join(", ");
	const child = cfg.childrenKey ? String(p[cfg.childrenKey] ?? "") : "";
	const open = attrs.length ? `<${name}\n${attrs.join("\n")}\n` : `<${name}`;
	const jsx = child ? `${open}>\n  ${child}\n</${name}>` : `${open}${attrs.length ? "/>" : " />"}`;
	return `import { ${imports} } from "@camply/ui";\n\n${jsx}`;
}

// ---------- Blocs ----------
function UsageBlock({ code }: { code: string }) {
	return (
		<section className="cu-usage">
			<h2 className="cu-usage__title">Utilisation</h2>
			<Snippet copyText={code} className="cu-usage__snippet">
				{code}
			</Snippet>
		</section>
	);
}

function PropsTable({ rows }: { rows: PropRow[] }) {
	return (
		<section className="cu-perso">
			<h2 className="cu-usage__title">Personnalisation</h2>
			<p className="cu-perso__sub">
				Chaque composant accepte aussi <code>className</code>, <code>style</code> et les tokens{" "}
				<code>--camply-*</code>.
			</p>
			<Table
				rowKey={(r) => r.name}
				data={rows.map(([name, type, description]) => ({ name, type, description }))}
				columns={[
					{
						key: "name",
						header: "Prop",
						width: 190,
						cell: (r) => <code className="cu-props__name">{r.name}</code>,
					},
					{
						key: "type",
						header: "Type",
						width: 150,
						cell: (r) => <code className="cu-props__type">{r.type}</code>,
					},
					{
						key: "description",
						header: "Description",
						cell: (r) => <span className="cu-props__desc">{r.description}</span>,
					},
				]}
			/>
		</section>
	);
}

// ---------- Contrôles (dogfoodés @camply/ui) ----------
function ControlRow({
	control,
	value,
	onChange,
}: {
	control: Control;
	value: ControlValue;
	onChange: (v: ControlValue) => void;
}) {
	return (
		<div className="cu-control">
			<span className="cu-control__label">{control.label}</span>
			<div className="cu-control__field">
				{control.type === "text" && (
					<Input
						size="sm"
						aria-label={control.label}
						value={String(value)}
						onChange={(e) => onChange(e.target.value)}
						style={{ width: 200 }}
					/>
				)}
				{control.type === "seg" && (
					<SegmentedControl
						size="sm"
						options={control.options.map((o) => ({ value: o, label: cap(o) }))}
						value={String(value)}
						onChange={(v) => onChange(v)}
						style={{ minWidth: 0 }}
					/>
				)}
				{control.type === "toggle" && (
					<Switch
						size="sm"
						aria-label={control.label}
						checked={Boolean(value)}
						onChange={(e) => onChange(e.target.checked)}
					/>
				)}
			</div>
		</div>
	);
}

// ---------- Vue ----------
export function PlaygroundView({ config }: { config: PlaygroundConfig }) {
	const [values, setValues] = useState<Values>(config.defaults);
	const set = (key: string) => (v: ControlValue) => setValues((prev) => ({ ...prev, [key]: v }));

	return (
		<div className="cu-pg">
			<div className="cu-pg__preview">{config.render(values)}</div>
			{config.controls.length > 0 && (
				<div className="cu-controls">
					{config.controls.map((c) => (
						<ControlRow key={c.key} control={c} value={values[c.key]} onChange={set(c.key)} />
					))}
				</div>
			)}
			<UsageBlock code={genCode(config, values)} />
			<PropsTable rows={config.props} />
		</div>
	);
}
