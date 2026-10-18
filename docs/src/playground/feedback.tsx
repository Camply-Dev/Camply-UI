import {
	Button,
	EmptyState,
	Meter,
	Progress,
	RadialProgress,
	Skeleton,
	Spinner,
	ToastProvider,
	useToast,
} from "@camply/ui";
import { Icon } from "../icons";
import { bool, num, type PlaygroundConfig, str, type Values } from "./engine";

function ToastTrigger(p: Values) {
	const { toast } = useToast();
	return (
		<Button
			variant="secondary"
			onClick={() =>
				toast({
					tone: str(p.tone),
					title: "Enregistré",
					description: "Tes modifications ont bien été sauvegardées.",
					// Une action laisse le temps de cliquer : durée allongée.
					...(bool(p.action) && {
						duration: 10_000,
						action: { label: "Annuler", onClick: () => {} },
					}),
				})
			}
		>
			Afficher un toast
		</Button>
	);
}

// Extrait montré au lecteur, donc écrit en dur : le `${}` qu'il contient appartient
// au code affiché, pas à cette chaîne-ci.
// biome-ignore lint/suspicious/noTemplateCurlyInString: placeholder du code affiché, à ne pas interpoler ici
const METER_FORMAT_SNIPPET = "\n  formatValue={(v, _min, max) => `${v} / ${max} Go`}";

export const FEEDBACK: Record<string, PlaygroundConfig> = {
	progress: {
		component: "Progress",
		controls: [
			{ key: "value", label: "Valeur", type: "seg", options: ["0", "25", "64", "100", "∞"] },
			{ key: "max", label: "Max", type: "seg", options: ["100", "256"] },
			{ key: "tone", label: "Ton", type: "seg", options: ["accent", "info", "warn", "danger"] },
			{ key: "size", label: "Taille", type: "seg", options: ["sm", "md"] },
			{ key: "showValue", label: "Afficher %", type: "toggle" },
		],
		defaults: { value: "64", max: "100", tone: "accent", size: "md", showValue: true },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420 }}>
				<Progress
					value={p.value === "∞" ? undefined : num(p.value)}
					max={num(p.max)}
					tone={str(p.tone)}
					size={str(p.size)}
					label="Téléversement"
					showValue={bool(p.showValue)}
				/>
			</div>
		),
		code: (p) =>
			`import { Progress } from "@camply/ui";\n\n<Progress\n  ${
				p.value === "∞" ? "/* sans value : indéterminée */" : `value={${p.value}}`
			}${p.max === "100" ? "" : `\n  max={${p.max}}`}\n  tone="${p.tone}"\n  size="${p.size}"\n  label="Téléversement"${
				p.showValue ? "\n  showValue" : ""
			}\n/>`,
		props: [
			["value", "number", "0–max ; absent = barre indéterminée animée"],
			["max", "number", "valeur d'une barre pleine (défaut 100) ; le % affiché en découle"],
			["tone", "ProgressTone", "accent · info · warn · danger (défaut accent)"],
			["size", "enum", "sm · md (défaut md)"],
			["label", "string", "libellé affiché au-dessus de la barre, qui la nomme pour l'a11y"],
			["showValue", "boolean", "affiche le pourcentage ; ignoré quand la barre est indéterminée"],
			[
				"--camply-progress-height / -track",
				"CSS",
				"hauteur de la barre (défaut 7px, 5px en sm) et fond de la piste",
			],
		],
	},

	radialprogress: {
		component: "RadialProgress",
		controls: [
			{ key: "value", label: "Valeur", type: "seg", options: ["25", "50", "72", "100"] },
			{ key: "tone", label: "Ton", type: "seg", options: ["accent", "info", "warn", "danger"] },
			{ key: "showValue", label: "Afficher %", type: "toggle" },
		],
		defaults: { value: "72", tone: "accent", showValue: true },
		render: (p) => (
			<RadialProgress
				value={num(p.value)}
				tone={str(p.tone)}
				showValue={bool(p.showValue)}
				label="Objectif mensuel"
			/>
		),
		code: (p) =>
			`import { RadialProgress } from "@camply/ui";\n\n<RadialProgress\n  value={${p.value}}\n  tone="${p.tone}"\n  label="Objectif mensuel"${
				p.showValue ? "" : "\n  showValue={false}"
			}\n/>`,
		props: [
			["value", "number", "0–100 (requis)"],
			["size / thickness", "number", "diamètre (défaut 96) / épaisseur du trait (défaut 8)"],
			["tone", "RadialProgressTone", "accent · info · warn · danger (défaut accent)"],
			["showValue", "boolean", "pourcentage au centre (défaut true)"],
			["children", "ReactNode", "contenu central personnalisé — prend la place de showValue"],
			["label", "string", "nom accessible ; le contenu du centre reste décoratif"],
		],
	},

	meter: {
		component: "Meter",
		controls: [
			{ key: "value", label: "Valeur", type: "seg", options: ["64", "256", "384", "486"] },
			{ key: "format", label: "Format", type: "seg", options: ["pourcentage", "absolu"] },
		],
		// Une échelle qui ne va pas de 0 à 100 : c'est elle qui rend visible que le
		// formateur par défaut a besoin des DEUX bornes pour calculer son pourcentage.
		defaults: { value: "384", format: "pourcentage" },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420 }}>
				<Meter
					value={num(p.value)}
					min={0}
					max={512}
					label="Stockage"
					formatValue={p.format === "absolu" ? (v, _min, max) => `${v} / ${max} Go` : undefined}
				/>
			</div>
		),
		code: (p) => {
			const fmt = p.format === "absolu" ? METER_FORMAT_SNIPPET : "";
			return `import { Meter } from "@camply/ui";\n\n<Meter\n  value={${p.value}}\n  min={0}\n  max={512}\n  label="Stockage"${fmt}\n/>`;
		},
		props: [
			["value", "number", "valeur mesurée (requis) — auto-colorée : ≥85 % danger, ≥60 % warn"],
			["min / max", "number", "bornes (défaut 0–100)"],
			["low / high", "number", "seuils à fournir ENSEMBLE : remplacent l'auto-couleur"],
			["optimum", "enum", "high · low — le côté où la valeur est bonne (défaut high)"],
			["label", "ReactNode", "libellé affiché, qui nomme la jauge pour l'a11y"],
			["showValue", "boolean", "affiche la valeur formatée (défaut true)"],
			[
				"formatValue",
				"(value, min, max) => string",
				"valeur affichée et lue (aria-valuetext) — les deux bornes arrivent, le défaut étant le pourcentage parcouru entre elles",
			],
			["size", "enum", "sm · md (défaut md)"],
		],
	},

	spinner: {
		component: "Spinner",
		controls: [{ key: "size", label: "Taille", type: "seg", options: ["20", "28", "40"] }],
		defaults: { size: "28" },
		render: (p) => <Spinner size={num(p.size)} thickness={num(p.size) >= 40 ? 4 : 3} />,
		code: (p) =>
			`import { Spinner } from "@camply/ui";\n\n<Spinner size={${p.size}}${
				num(p.size) >= 40 ? " thickness={4}" : ""
			} />`,
		props: [
			["size", "number", "diamètre en px (défaut 24)"],
			["thickness", "number", "épaisseur du trait (défaut 3)"],
			["label", "string", "nom accessible ; sans label le spinner est décoratif (aria-hidden)"],
			["Dots", "—", "variante à trois points, mêmes props size (défaut 9) et label"],
		],
	},

	skeleton: {
		component: "Skeleton",
		controls: [
			{ key: "variant", label: "Forme", type: "seg", options: ["text", "rect", "circle"] },
		],
		defaults: { variant: "text" },
		render: (p) => {
			const v = str(p.variant);
			if (v === "circle") return <Skeleton variant="circle" width={64} height={64} />;
			if (v === "rect") return <Skeleton variant="rect" width={220} height={90} />;
			return (
				<div
					style={{ display: "flex", gap: 14, alignItems: "center", width: "100%", maxWidth: 360 }}
				>
					<Skeleton variant="circle" width={48} height={48} />
					<div style={{ flex: 1, display: "grid", gap: 8 }}>
						<Skeleton variant="text" width="70%" />
						<Skeleton variant="text" width="45%" />
					</div>
				</div>
			);
		},
		code: (p) => {
			if (p.variant === "circle")
				return `import { Skeleton } from "@camply/ui";\n\n<Skeleton variant="circle" width={64} height={64} />`;
			if (p.variant === "rect")
				return `import { Skeleton } from "@camply/ui";\n\n<Skeleton variant="rect" width={220} height={90} />`;
			return `import { Skeleton } from "@camply/ui";\n\n<Skeleton variant="text" width="70%" />\n<Skeleton variant="text" width="45%" />`;
		},
		props: [
			["variant", "enum", "text · rect · circle (défaut text)"],
			["width / height", "number | string", "dimensions du placeholder"],
			["radius", "number | string", "rayon personnalisé (rect)"],
			["SkeletonText", "—", "raccourci multi-lignes : <SkeletonText lines={3} /> (défaut 3)"],
			["a11y", "—", "le placeholder est toujours aria-hidden : le conteneur porte l'état"],
		],
	},

	toast: {
		component: "ToastProvider",
		imports: ["ToastProvider", "useToast"],
		controls: [
			{
				key: "tone",
				label: "Ton",
				type: "seg",
				options: ["default", "success", "info", "warn", "danger"],
			},
			{ key: "action", label: "Action", type: "toggle" },
		],
		defaults: { tone: "success", action: false },
		render: (p) => (
			<ToastProvider position="bottom-right">
				<ToastTrigger {...p} />
			</ToastProvider>
		),
		code: (p) =>
			`import { ToastProvider, useToast } from "@camply/ui";\n\n// 1. Enrober l'app\n<ToastProvider position="bottom-right">\n  <App />\n</ToastProvider>\n\n// 2. Depuis n'importe quel composant\nconst { toast } = useToast();\ntoast({\n  tone: "${p.tone}",\n  title: "Enregistré",\n  description: "Tes modifications ont bien été sauvegardées.",${
				p.action ? `\n  duration: 10_000,\n  action: { label: "Annuler", onClick: annuler },` : ""
			}\n});`,
		props: [
			[
				"ToastProvider · position",
				"enum",
				"bottom-right (défaut) · bottom-left · top-right · top-left · bottom-center",
			],
			[
				"ToastProvider · duration",
				"number",
				"auto-fermeture en ms (défaut 4000) — suspendue au survol et au focus",
			],
			[
				"ToastProvider · aria-label",
				"string",
				"nom de la région live (défaut : labels.notifications, « Notifications »)",
			],
			["toast() · title / description", "ReactNode", "contenu de la notification"],
			["toast() · tone", "ToastTone", "default (défaut) · success · info · warn · danger"],
			[
				"toast() · duration",
				"number",
				"surcharge le provider ; 0 ou Infinity = fermeture manuelle seulement",
			],
			[
				"--camply-toast-offset-x / -y",
				"CSS",
				"écart au bord de l'écran (défaut 22px), zone sûre des écrans à encoche ajoutée",
			],
			[
				"toast() · action",
				"{ label, onClick }",
				"bouton sous le texte ; ferme le toast après onClick, sauf preventDefault() — allonger duration",
			],
			["useToast()", "{ toast, dismiss }", "toast() renvoie un id ; dismiss(id) ferme le toast"],
		],
	},

	emptystate: {
		component: "EmptyState",
		controls: [
			{ key: "align", label: "Alignement", type: "seg", options: ["center", "start"] },
			{ key: "headingLevel", label: "Titre", type: "seg", options: ["2", "3", "4"] },
			{ key: "icon", label: "Icône", type: "toggle" },
			{ key: "actions", label: "Actions", type: "toggle" },
		],
		defaults: { align: "center", headingLevel: "3", icon: true, actions: true },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 460 }}>
				<EmptyState
					align={str(p.align)}
					headingLevel={num(p.headingLevel) as 2 | 3 | 4}
					icon={bool(p.icon) ? <Icon name="search" size={22} /> : undefined}
					title="Aucun résultat"
					description="Aucun projet ne correspond à cette recherche. Essaie un autre mot-clé ou retire un filtre."
					actions={
						bool(p.actions) ? (
							<>
								<Button size="sm">Nouveau projet</Button>
								<Button size="sm" variant="ghost">
									Effacer les filtres
								</Button>
							</>
						) : undefined
					}
				/>
			</div>
		),
		code: (p) =>
			`import { EmptyState } from "@camply/ui";\n\n<EmptyState${
				p.align === "center" ? "" : `\n  align="${p.align}"`
			}${p.headingLevel === "3" ? "" : `\n  headingLevel={${p.headingLevel}}`}${
				p.icon ? "\n  icon={<Search size={22} />}" : ""
			}\n  title="Aucun résultat"\n  description="Aucun projet ne correspond à cette recherche."${
				p.actions ? '\n  actions={<Button size="sm">Nouveau projet</Button>}' : ""
			}\n/>`,
		props: [
			["title", "ReactNode", "ce qui manque, en une phrase (obligatoire)"],
			[
				"description",
				"ReactNode",
				"pourquoi c'est vide et comment le remplir — plusieurs paragraphes possibles",
			],
			[
				"icon",
				"ReactNode",
				"icône ou illustration au-dessus du titre, masquée aux lecteurs d'écran",
			],
			["actions", "ReactNode", "boutons ou liens à proposer"],
			[
				"headingLevel",
				"HeadingLevel",
				"2 · 3 · 4 · 5 · 6 — niveau du titre dans la page (défaut 3)",
			],
			["align", "EmptyStateAlign", "center (défaut) · start, dans un flux de contenu"],
		],
	},
};
