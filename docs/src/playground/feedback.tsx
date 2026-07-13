import {
	Button,
	Meter,
	Progress,
	RadialProgress,
	Skeleton,
	Spinner,
	ToastProvider,
	useToast,
} from "@camply/ui";
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
				})
			}
		>
			Afficher un toast
		</Button>
	);
}

export const FEEDBACK: Record<string, PlaygroundConfig> = {
	progress: {
		component: "Progress",
		controls: [
			{ key: "value", label: "Valeur", type: "seg", options: ["0", "25", "64", "100", "∞"] },
			{ key: "tone", label: "Ton", type: "seg", options: ["accent", "info", "warn", "danger"] },
			{ key: "showValue", label: "Afficher %", type: "toggle" },
		],
		defaults: { value: "64", tone: "accent", showValue: true },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420 }}>
				<Progress
					value={p.value === "∞" ? undefined : num(p.value)}
					tone={str(p.tone)}
					label="Téléversement"
					showValue={bool(p.showValue)}
				/>
			</div>
		),
		code: (p) =>
			`import { Progress } from "@camply/ui";\n\n<Progress\n  ${
				p.value === "∞" ? "/* sans value : indéterminée */" : `value={${p.value}}`
			}\n  tone="${p.tone}"\n  label="Téléversement"${p.showValue ? "\n  showValue" : ""}\n/>`,
		props: [
			["value", "number", "0–100 ; absent = barre indéterminée animée"],
			["tone", "enum", "accent · info · warn · danger"],
			["size", "enum", "sm · md"],
			["label / showValue", "string / boolean", "libellé et pourcentage affichés"],
		],
	},

	radialprogress: {
		component: "RadialProgress",
		controls: [
			{ key: "value", label: "Valeur", type: "seg", options: ["25", "50", "72", "100"] },
			{ key: "tone", label: "Ton", type: "seg", options: ["accent", "info", "warn", "danger"] },
		],
		defaults: { value: "72", tone: "accent" },
		render: (p) => <RadialProgress value={num(p.value)} tone={str(p.tone)} />,
		code: (p) =>
			`import { RadialProgress } from "@camply/ui";\n\n<RadialProgress value={${p.value}} tone="${p.tone}" />`,
		props: [
			["value", "number", "0–100"],
			["size / thickness", "number", "diamètre (défaut 96) / épaisseur du trait (défaut 8)"],
			["tone", "enum", "accent · info · warn · danger"],
			[
				"showValue / children",
				"boolean / ReactNode",
				"pourcentage central ou contenu personnalisé",
			],
		],
	},

	meter: {
		component: "Meter",
		controls: [{ key: "value", label: "Valeur", type: "seg", options: ["20", "45", "70", "91"] }],
		defaults: { value: "82" },
		render: (p) => (
			<div style={{ width: "100%", maxWidth: 420 }}>
				<Meter value={num(p.value)} label="Utilisation CPU" />
			</div>
		),
		code: (p) =>
			`import { Meter } from "@camply/ui";\n\n<Meter value={${p.value}} label="Utilisation CPU" />`,
		props: [
			["value", "number", "valeur mesurée — auto-colorée : ≥85 % danger, ≥60 % warn"],
			["min / max", "number", "bornes (défaut 0–100)"],
			["low / high / optimum", "number / enum", "seuils explicites (remplacent l'auto-couleur)"],
			["label / showValue / formatValue", "—", "libellé et affichage de la valeur"],
			["size", "enum", "sm · md"],
		],
	},

	spinner: {
		component: "Spinner",
		controls: [{ key: "size", label: "Taille", type: "seg", options: ["20", "28", "40"] }],
		defaults: { size: "28" },
		render: (p) => <Spinner size={num(p.size)} thickness={num(p.size) >= 40 ? 4 : 3} />,
		code: (p) => `import { Spinner } from "@camply/ui";\n\n<Spinner size={${p.size}} />`,
		props: [
			["size", "number", "diamètre en px (défaut 24)"],
			["thickness", "number", "épaisseur du trait (défaut 3)"],
			["label", "string", "libellé accessible (défaut « Chargement »)"],
			["Dots", "—", "variante à trois points : <Dots size={9} />"],
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
			["variant", "enum", "text · rect · circle"],
			["width / height", "number | string", "dimensions du placeholder"],
			["radius", "number | string", "rayon personnalisé (rect)"],
			["SkeletonText", "—", "raccourci multi-lignes : <SkeletonText lines={3} />"],
		],
	},

	toast: {
		component: "ToastProvider",
		imports: ["ToastProvider", "useToast"],
		controls: [
			{ key: "tone", label: "Ton", type: "seg", options: ["success", "info", "warn", "danger"] },
		],
		defaults: { tone: "success" },
		render: (p) => (
			<ToastProvider position="bottom-right">
				<ToastTrigger {...p} />
			</ToastProvider>
		),
		code: (p) =>
			`import { ToastProvider, useToast } from "@camply/ui";\n\n// 1. Enrober l'app\n<ToastProvider position="bottom-right">\n  <App />\n</ToastProvider>\n\n// 2. Depuis n'importe quel composant\nconst { toast } = useToast();\ntoast({\n  tone: "${p.tone}",\n  title: "Enregistré",\n  description: "Tes modifications ont bien été sauvegardées.",\n});`,
		props: [
			[
				"ToastProvider · position",
				"enum",
				"bottom-right · bottom-left · top-right · top-left · bottom-center",
			],
			["ToastProvider · duration", "number", "auto-fermeture en ms (défaut 4000)"],
			["toast() · title / description", "ReactNode", "contenu de la notification"],
			["toast() · tone", "enum", "default · success · info · warn · danger"],
			["toast() · duration", "number", "0 = reste jusqu'à fermeture manuelle"],
		],
	},
};
