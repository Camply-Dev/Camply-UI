import type { ReactNode, SVGProps } from "react";

// Icônes Lucide (https://lucide.dev — licence ISC) : contenu interne copié
// (zéro dépendance). Enveloppe <svg> commune ; lookup par nom.
const ICONS: Record<string, ReactNode> = {
	home: (
		<>
			<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
			<path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
		</>
	),
	book: (
		<>
			<path d="M12 7v14" />
			<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
		</>
	),
	components: (
		<>
			<rect width="7" height="7" x="3" y="3" rx="1" />
			<rect width="7" height="7" x="14" y="3" rx="1" />
			<rect width="7" height="7" x="14" y="14" rx="1" />
			<rect width="7" height="7" x="3" y="14" rx="1" />
		</>
	),
	tokens: (
		<>
			<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
			<circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
			<circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
			<circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
			<circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
		</>
	),
	arrow: (
		<>
			<path d="M5 12h14" />
			<path d="m12 5 7 7-7 7" />
		</>
	),
	chevron: <path d="m9 18 6-6-6-6" />,
	copy: (
		<>
			<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
			<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
		</>
	),
	check: <path d="M20 6 9 17l-5-5" />,
	plus: (
		<>
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</>
	),
	search: (
		<>
			<path d="m21 21-4.34-4.34" />
			<circle cx="11" cy="11" r="8" />
		</>
	),
	download: (
		<>
			<path d="M12 15V3" />
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<path d="m7 10 5 5 5-5" />
		</>
	),
	reset: (
		<>
			<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
			<path d="M3 3v5h5" />
		</>
	),
	clock: (
		<>
			<circle cx="12" cy="12" r="10" />
			<path d="M12 6v6l4 2" />
		</>
	),
	form: (
		<>
			<path d="M21 5H3" />
			<path d="M15 12H3" />
			<path d="M17 19H3" />
		</>
	),
	surface: (
		<>
			<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
			<path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
			<path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
		</>
	),
	nav: (
		<>
			<circle cx="12" cy="12" r="10" />
			<path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
		</>
	),
	feedback: (
		<>
			<path d="M10.268 21a2 2 0 0 0 3.464 0" />
			<path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
		</>
	),
	data: (
		<>
			<ellipse cx="12" cy="5" rx="9" ry="3" />
			<path d="M3 5V19A9 3 0 0 0 21 19V5" />
			<path d="M3 12A9 3 0 0 0 21 12" />
		</>
	),
	shapes: (
		<>
			<path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
			<rect x="3" y="14" width="7" height="7" rx="1" />
			<circle cx="17.5" cy="17.5" r="3.5" />
		</>
	),
};

type IconProps = { name: string; size?: number } & Omit<SVGProps<SVGSVGElement>, "name">;

export function Icon({ name, size = 16, ...rest }: IconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.8}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...rest}
		>
			{ICONS[name] ?? null}
		</svg>
	);
}
