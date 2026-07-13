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
		<path d="M18 6 6 18M6 6l12 12" />
	</Base>
);
export const Plus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 5v14M5 12h14" />
	</Base>
);
export const Search = (p: IconProps) => (
	<Base {...p}>
		<circle cx="11" cy="11" r="7" />
		<path d="m21 21-4.3-4.3" />
	</Base>
);
export const Info = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="9" />
		<path d="M12 16v-4M12 8h.01" />
	</Base>
);
export const CheckCircle = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="9" />
		<path d="m8.5 12 2.5 2.5 4.5-5" />
	</Base>
);
export const AlertTriangle = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3 2 20h20z" />
		<path d="M12 10v4M12 17h.01" />
	</Base>
);
export const AlertCircle = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="9" />
		<path d="M12 8v5M12 16h.01" />
	</Base>
);
export const Copy = (p: IconProps) => (
	<Base {...p}>
		<rect x="9" y="9" width="11" height="11" rx="2" />
		<path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
	</Base>
);
export const TrendUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 17 17 7M9 7h8v8" />
	</Base>
);
export const TrendDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 7 17 17M17 9v8H9" />
	</Base>
);
export const Minus = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 12h14" />
	</Base>
);
export const Star = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" />
	</Base>
);
export const Calendar = (p: IconProps) => (
	<Base {...p}>
		<rect x="3" y="4.5" width="18" height="17" rx="2.5" />
		<path d="M3 9h18M8 2.5v4M16 2.5v4" />
	</Base>
);
export const Upload = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 15V3M8 7l4-4 4 4M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
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
