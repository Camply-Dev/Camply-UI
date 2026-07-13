import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 16, children, ...props }: IconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			{children}
		</svg>
	);
}

// Icônes Lucide (https://lucide.dev — licence ISC) : tracés copiés pour rester sans
// dépendance runtime. Enveloppe <Base> commune (viewBox 24, stroke 2, currentColor).
export const Check = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 6 9 17l-5-5" />
	</Base>
);
export const ChevronDown = (p: IconProps) => (
	<Base {...p}>
		<path d="m6 9 6 6 6-6" />
	</Base>
);
export const ChevronUp = (p: IconProps) => (
	<Base {...p}>
		<path d="m18 15-6-6-6 6" />
	</Base>
);
export const ChevronRight = (p: IconProps) => (
	<Base {...p}>
		<path d="m9 18 6-6-6-6" />
	</Base>
);
export const ChevronLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 18-6-6 6-6" />
	</Base>
);
export const X = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	</Base>
);
export const Plus = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 12h14" />
		<path d="M12 5v14" />
	</Base>
);
export const Search = (p: IconProps) => (
	<Base {...p}>
		<path d="m21 21-4.34-4.34" />
		<circle cx="11" cy="11" r="8" />
	</Base>
);
export const Info = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 16v-4" />
		<path d="M12 8h.01" />
	</Base>
);
export const CheckCircle = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="m9 12 2 2 4-4" />
	</Base>
);
export const AlertTriangle = (p: IconProps) => (
	<Base {...p}>
		<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
		<path d="M12 9v4" />
		<path d="M12 17h.01" />
	</Base>
);
export const AlertCircle = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<line x1="12" x2="12" y1="8" y2="12" />
		<line x1="12" x2="12.01" y1="16" y2="16" />
	</Base>
);
export const Copy = (p: IconProps) => (
	<Base {...p}>
		<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
		<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
	</Base>
);
export const TrendUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 7h6v6" />
		<path d="m22 7-8.5 8.5-5-5L2 17" />
	</Base>
);
export const TrendDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 17h6v-6" />
		<path d="m22 17-8.5-8.5-5 5L2 7" />
	</Base>
);
export const Minus = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 12h14" />
	</Base>
);
export const Star = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
	</Base>
);
export const Calendar = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 2v4" />
		<path d="M16 2v4" />
		<rect width="18" height="18" x="3" y="4" rx="2" />
		<path d="M3 10h18" />
	</Base>
);
export const Upload = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3v12" />
		<path d="m17 8-5-5-5 5" />
		<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
	</Base>
);

/** Icône sémantique par tonalité de statut, partagée par Alert, Banner et Toast.
 *  Les composants qui ont des tonalités supplémentaires (accent, default) ajoutent
 *  leur propre alias en local : `{ ...STATUS_ICONS, accent: Info }`. */
export const STATUS_ICONS = {
	info: Info,
	success: CheckCircle,
	warn: AlertTriangle,
	danger: AlertCircle,
} as const;
