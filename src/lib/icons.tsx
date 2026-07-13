import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

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

// Pack d'icônes Camply : tracés copiés pour rester sans dépendance runtime.
// Enveloppe <Base> commune (viewBox 24, stroke 2, currentColor). Licences : THIRD-PARTY-LICENSES.md.
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

// --- Icônes de navigation / UI (pack unifié, ex-icônes de la vitrine) ---
export const Home = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
		<path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
	</Base>
);
export const Book = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 7v14" />
		<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
	</Base>
);
export const ArrowRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 12h14" />
		<path d="m12 5 7 7-7 7" />
	</Base>
);
export const Compass = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
	</Base>
);
export const LayoutGrid = (p: IconProps) => (
	<Base {...p}>
		<rect width="7" height="7" x="3" y="3" rx="1" />
		<rect width="7" height="7" x="14" y="3" rx="1" />
		<rect width="7" height="7" x="14" y="14" rx="1" />
		<rect width="7" height="7" x="3" y="14" rx="1" />
	</Base>
);
export const Palette = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
		<circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
		<circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
		<circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
		<circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
	</Base>
);
export const Shapes = (p: IconProps) => (
	<Base {...p}>
		<path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
		<rect x="3" y="14" width="7" height="7" rx="1" />
		<circle cx="17.5" cy="17.5" r="3.5" />
	</Base>
);
export const Layers = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
		<path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
		<path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
	</Base>
);
export const Download = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 15V3" />
		<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
		<path d="m7 10 5 5 5-5" />
	</Base>
);
export const RotateCcw = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
		<path d="M3 3v5h5" />
	</Base>
);
export const Clock = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 6v6l4 2" />
	</Base>
);
export const AlignLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 5H3" />
		<path d="M15 12H3" />
		<path d="M17 19H3" />
	</Base>
);
export const Bell = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.268 21a2 2 0 0 0 3.464 0" />
		<path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
	</Base>
);
export const Database = (p: IconProps) => (
	<Base {...p}>
		<ellipse cx="12" cy="5" rx="9" ry="3" />
		<path d="M3 5V19A9 3 0 0 0 21 19V5" />
		<path d="M3 12A9 3 0 0 0 21 12" />
	</Base>
);

// --- Pack d'icônes (tracés copiés — voir THIRD-PARTY-LICENSES.md) ---
export const AArrowDown = (p: IconProps) => (
	<Base {...p}>
		<path d="m14 12 4 4 4-4" />
		<path d="M18 16V7" />
		<path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" />
		<path d="M3.304 13h6.392" />
	</Base>
);
export const AArrowUp = (p: IconProps) => (
	<Base {...p}>
		<path d="m14 11 4-4 4 4" />
		<path d="M18 16V7" />
		<path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" />
		<path d="M3.304 13h6.392" />
	</Base>
);
export const ALargeSmall = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16" />
		<path d="M15.697 14h5.606" />
		<path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" />
		<path d="M3.304 13h6.392" />
	</Base>
);
export const Accessibility = (p: IconProps) => (
	<Base {...p}>
		<circle cx="16" cy="4" r="1" />
		<path d="m18 19 1-7-6 1" />
		<path d="m5 8 3-3 5.5 3-2.36 3.5" />
		<path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
		<path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
	</Base>
);
export const Activity = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
	</Base>
);
export const Ad = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 13H6" />
		<path d="M10 15v-4a2 2 0 0 0-4 0v4" />
		<path d="M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z" />
		<rect x="2" y="5" width="20" height="14" rx="2" />
	</Base>
);
export const AirVent = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 17.5a2.5 2.5 0 1 1-4 2.03V12" />
		<path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
		<path d="M6 8h12" />
		<path d="M6.6 15.572A2 2 0 1 0 10 17v-5" />
	</Base>
);
export const Airplay = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
		<path d="m12 15 5 6H7Z" />
	</Base>
);
export const AlarmClock = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="13" r="8" />
		<path d="M12 9v4l2 2" />
		<path d="M5 3 2 6" />
		<path d="m22 6-3-3" />
		<path d="M6.38 18.7 4 21" />
		<path d="M17.64 18.67 20 21" />
	</Base>
);
export const AlarmClockCheck = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="13" r="8" />
		<path d="M5 3 2 6" />
		<path d="m22 6-3-3" />
		<path d="M6.38 18.7 4 21" />
		<path d="M17.64 18.67 20 21" />
		<path d="m9 13 2 2 4-4" />
	</Base>
);
export const AlarmClockMinus = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="13" r="8" />
		<path d="M5 3 2 6" />
		<path d="m22 6-3-3" />
		<path d="M6.38 18.7 4 21" />
		<path d="M17.64 18.67 20 21" />
		<path d="M9 13h6" />
	</Base>
);
export const AlarmClockOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.87 6.87a8 8 0 1 0 11.26 11.26" />
		<path d="M19.9 14.25a8 8 0 0 0-9.15-9.15" />
		<path d="m22 6-3-3" />
		<path d="M6.26 18.67 4 21" />
		<path d="m2 2 20 20" />
		<path d="M4 4 2 6" />
	</Base>
);
export const AlarmClockPlus = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="13" r="8" />
		<path d="M5 3 2 6" />
		<path d="m22 6-3-3" />
		<path d="M6.38 18.7 4 21" />
		<path d="M17.64 18.67 20 21" />
		<path d="M12 10v6" />
		<path d="M9 13h6" />
	</Base>
);
export const AlarmSmoke = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 21c0-2.5 2-2.5 2-5" />
		<path d="M16 21c0-2.5 2-2.5 2-5" />
		<path d="m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8" />
		<path d="M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z" />
		<path d="M6 21c0-2.5 2-2.5 2-5" />
	</Base>
);
export const Album = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
		<polyline points="11 3 11 11 14 8 17 11 17 3" />
	</Base>
);
export const AlignCenterHorizontal = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 12h20" />
		<path d="M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" />
		<path d="M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4" />
		<path d="M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1" />
		<path d="M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1" />
	</Base>
);
export const AlignCenterVertical = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v20" />
		<path d="M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4" />
		<path d="M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4" />
		<path d="M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1" />
		<path d="M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1" />
	</Base>
);
export const AlignEndHorizontal = (p: IconProps) => (
	<Base {...p}>
		<rect width="6" height="16" x="4" y="2" rx="2" />
		<rect width="6" height="9" x="14" y="9" rx="2" />
		<path d="M22 22H2" />
	</Base>
);
export const AlignEndVertical = (p: IconProps) => (
	<Base {...p}>
		<rect width="16" height="6" x="2" y="4" rx="2" />
		<rect width="9" height="6" x="9" y="14" rx="2" />
		<path d="M22 22V2" />
	</Base>
);
export const AlignHorizontalDistributeCenter = (p: IconProps) => (
	<Base {...p}>
		<rect width="6" height="14" x="4" y="5" rx="2" />
		<rect width="6" height="10" x="14" y="7" rx="2" />
		<path d="M17 22v-5" />
		<path d="M17 7V2" />
		<path d="M7 22v-3" />
		<path d="M7 5V2" />
	</Base>
);
export const AlignHorizontalDistributeEnd = (p: IconProps) => (
	<Base {...p}>
		<rect width="6" height="14" x="4" y="5" rx="2" />
		<rect width="6" height="10" x="14" y="7" rx="2" />
		<path d="M10 2v20" />
		<path d="M20 2v20" />
	</Base>
);
export const AlignHorizontalDistributeStart = (p: IconProps) => (
	<Base {...p}>
		<rect width="6" height="14" x="4" y="5" rx="2" />
		<rect width="6" height="10" x="14" y="7" rx="2" />
		<path d="M4 2v20" />
		<path d="M14 2v20" />
	</Base>
);
export const AlignHorizontalJustifyCenter = (p: IconProps) => (
	<Base {...p}>
		<rect width="6" height="14" x="2" y="5" rx="2" />
		<rect width="6" height="10" x="16" y="7" rx="2" />
		<path d="M12 2v20" />
	</Base>
);
export const AlignHorizontalJustifyEnd = (p: IconProps) => (
	<Base {...p}>
		<rect width="6" height="14" x="2" y="5" rx="2" />
		<rect width="6" height="10" x="12" y="7" rx="2" />
		<path d="M22 2v20" />
	</Base>
);
export const AlignHorizontalJustifyStart = (p: IconProps) => (
	<Base {...p}>
		<rect width="6" height="14" x="6" y="5" rx="2" />
		<rect width="6" height="10" x="16" y="7" rx="2" />
		<path d="M2 2v20" />
	</Base>
);
export const AlignHorizontalSpaceAround = (p: IconProps) => (
	<Base {...p}>
		<rect width="6" height="10" x="9" y="7" rx="2" />
		<path d="M4 22V2" />
		<path d="M20 22V2" />
	</Base>
);
export const AlignHorizontalSpaceBetween = (p: IconProps) => (
	<Base {...p}>
		<rect width="6" height="14" x="3" y="5" rx="2" />
		<rect width="6" height="10" x="15" y="7" rx="2" />
		<path d="M3 2v20" />
		<path d="M21 2v20" />
	</Base>
);
export const AlignStartHorizontal = (p: IconProps) => (
	<Base {...p}>
		<rect width="6" height="16" x="4" y="6" rx="2" />
		<rect width="6" height="9" x="14" y="6" rx="2" />
		<path d="M22 2H2" />
	</Base>
);
export const AlignStartVertical = (p: IconProps) => (
	<Base {...p}>
		<rect width="9" height="6" x="6" y="14" rx="2" />
		<rect width="16" height="6" x="6" y="4" rx="2" />
		<path d="M2 2v20" />
	</Base>
);
export const AlignVerticalDistributeCenter = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17h-3" />
		<path d="M22 7h-5" />
		<path d="M5 17H2" />
		<path d="M7 7H2" />
		<rect x="5" y="14" width="14" height="6" rx="2" />
		<rect x="7" y="4" width="10" height="6" rx="2" />
	</Base>
);
export const AlignVerticalDistributeEnd = (p: IconProps) => (
	<Base {...p}>
		<rect width="14" height="6" x="5" y="14" rx="2" />
		<rect width="10" height="6" x="7" y="4" rx="2" />
		<path d="M2 20h20" />
		<path d="M2 10h20" />
	</Base>
);
export const AlignVerticalDistributeStart = (p: IconProps) => (
	<Base {...p}>
		<rect width="14" height="6" x="5" y="14" rx="2" />
		<rect width="10" height="6" x="7" y="4" rx="2" />
		<path d="M2 14h20" />
		<path d="M2 4h20" />
	</Base>
);
export const AlignVerticalJustifyCenter = (p: IconProps) => (
	<Base {...p}>
		<rect width="14" height="6" x="5" y="16" rx="2" />
		<rect width="10" height="6" x="7" y="2" rx="2" />
		<path d="M2 12h20" />
	</Base>
);
export const AlignVerticalJustifyEnd = (p: IconProps) => (
	<Base {...p}>
		<rect width="14" height="6" x="5" y="12" rx="2" />
		<rect width="10" height="6" x="7" y="2" rx="2" />
		<path d="M2 22h20" />
	</Base>
);
export const AlignVerticalJustifyStart = (p: IconProps) => (
	<Base {...p}>
		<rect width="14" height="6" x="5" y="16" rx="2" />
		<rect width="10" height="6" x="7" y="6" rx="2" />
		<path d="M2 2h20" />
	</Base>
);
export const AlignVerticalSpaceAround = (p: IconProps) => (
	<Base {...p}>
		<rect width="10" height="6" x="7" y="9" rx="2" />
		<path d="M22 20H2" />
		<path d="M22 4H2" />
	</Base>
);
export const AlignVerticalSpaceBetween = (p: IconProps) => (
	<Base {...p}>
		<rect width="14" height="6" x="5" y="15" rx="2" />
		<rect width="10" height="6" x="7" y="3" rx="2" />
		<path d="M2 21h20" />
		<path d="M2 3h20" />
	</Base>
);
export const Ambulance = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 10H6" />
		<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
		<path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" />
		<path d="M8 8v4" />
		<path d="M9 18h6" />
		<circle cx="17" cy="18" r="2" />
		<circle cx="7" cy="18" r="2" />
	</Base>
);
export const Ampersand = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 12h3" />
		<path d="M17.5 12a8 8 0 0 1-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13" />
	</Base>
);
export const Ampersands = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5" />
		<path d="M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5" />
	</Base>
);
export const Amphora = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8" />
		<path d="M10 5H8a2 2 0 0 0 0 4h.68" />
		<path d="M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8" />
		<path d="M14 5h2a2 2 0 0 1 0 4h-.68" />
		<path d="M18 22H6" />
		<path d="M9 2h6" />
	</Base>
);
export const Anchor = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6v16" />
		<path d="m19 13 2-1a9 9 0 0 1-18 0l2 1" />
		<path d="M9 11h6" />
		<circle cx="12" cy="4" r="2" />
	</Base>
);
export const Angry = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M16 16s-1.5-2-4-2-4 2-4 2" />
		<path d="M7.5 8 10 9" />
		<path d="m14 9 2.5-1" />
		<path d="M9 10h.01" />
		<path d="M15 10h.01" />
	</Base>
);
export const Annoyed = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M8 15h8" />
		<path d="M8 9h2" />
		<path d="M14 9h2" />
	</Base>
);
export const Antenna = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 12 7 2" />
		<path d="m7 12 5-10" />
		<path d="m12 12 5-10" />
		<path d="m17 12 5-10" />
		<path d="M4.5 7h15" />
		<path d="M12 16v6" />
	</Base>
);
export const Anvil = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4" />
		<path d="M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z" />
		<path d="M9 12v5" />
		<path d="M15 12v5" />
		<path d="M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1" />
	</Base>
);
export const Aperture = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="m14.31 8 5.74 9.94" />
		<path d="M9.69 8h11.48" />
		<path d="m7.38 12 5.74-9.94" />
		<path d="M9.69 16 3.95 6.06" />
		<path d="M14.31 16H2.83" />
		<path d="m16.62 12-5.74 9.94" />
	</Base>
);
export const AppWindow = (p: IconProps) => (
	<Base {...p}>
		<rect x="2" y="4" width="20" height="16" rx="2" />
		<path d="M10 4v4" />
		<path d="M2 8h20" />
		<path d="M6 4v4" />
	</Base>
);
export const AppWindowMac = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="16" x="2" y="4" rx="2" />
		<path d="M6 8h.01" />
		<path d="M10 8h.01" />
		<path d="M14 8h.01" />
	</Base>
);
export const Apple = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6.528V3a1 1 0 0 1 1-1h0" />
		<path d="M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21" />
	</Base>
);
export const Archive = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="5" x="2" y="3" rx="1" />
		<path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
		<path d="M10 12h4" />
	</Base>
);
export const ArchiveRestore = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="5" x="2" y="3" rx="1" />
		<path d="M4 8v11a2 2 0 0 0 2 2h2" />
		<path d="M20 8v11a2 2 0 0 1-2 2h-2" />
		<path d="m9 15 3-3 3 3" />
		<path d="M12 12v9" />
	</Base>
);
export const ArchiveX = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="5" x="2" y="3" rx="1" />
		<path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
		<path d="m9.5 17 5-5" />
		<path d="m9.5 12 5 5" />
	</Base>
);
export const Armchair = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
		<path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
		<path d="M5 18v2" />
		<path d="M19 18v2" />
	</Base>
);
export const ArrowBigDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-7.086 7.086a1 1 0 0 1-1.414 0l-7.086-7.086a.707.707 0 0 1 .5-1.207H8a1 1 0 0 0 1-1z" />
	</Base>
);
export const ArrowBigDownDash = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-6.939 6.939a1.207 1.207 0 0 1-1.708 0l-6.94-6.94a.707.707 0 0 1 .5-1.206H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1z" />
		<path d="M9 4h6" />
	</Base>
);
export const ArrowBigLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.793 19.793a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707z" />
	</Base>
);
export const ArrowBigLeftDash = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 9a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707l6.94 6.94a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z" />
		<path d="M20 9v6" />
	</Base>
);
export const ArrowBigRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.207 19.793a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707z" />
	</Base>
);
export const ArrowBigRightDash = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 9a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707l-6.94 6.94a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" />
		<path d="M4 9v6" />
	</Base>
);
export const ArrowBigUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z" />
	</Base>
);
export const ArrowBigUpDash = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 16a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-6.939-6.939a1.207 1.207 0 0 0-1.708 0l-6.94 6.94a.707.707 0 0 0 .5 1.206H8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1z" />
		<path d="M9 20h6" />
	</Base>
);
export const ArrowDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 5v14" />
		<path d="m19 12-7 7-7-7" />
	</Base>
);
export const ArrowDown01 = (p: IconProps) => (
	<Base {...p}>
		<path d="m3 16 4 4 4-4" />
		<path d="M7 20V4" />
		<rect x="15" y="4" width="4" height="6" ry="2" />
		<path d="M17 20v-6h-2" />
		<path d="M15 20h4" />
	</Base>
);
export const ArrowDown10 = (p: IconProps) => (
	<Base {...p}>
		<path d="m3 16 4 4 4-4" />
		<path d="M7 20V4" />
		<path d="M17 10V4h-2" />
		<path d="M15 10h4" />
		<rect x="15" y="14" width="4" height="6" ry="2" />
	</Base>
);
export const ArrowDownAZ = (p: IconProps) => (
	<Base {...p}>
		<path d="m3 16 4 4 4-4" />
		<path d="M7 20V4" />
		<path d="M20 8h-5" />
		<path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10" />
		<path d="M15 14h5l-5 6h5" />
	</Base>
);
export const ArrowDownFromLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 3H5" />
		<path d="M12 21V7" />
		<path d="m6 15 6 6 6-6" />
	</Base>
);
export const ArrowDownLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 7 7 17" />
		<path d="M17 17H7V7" />
	</Base>
);
export const ArrowDownNarrowWide = (p: IconProps) => (
	<Base {...p}>
		<path d="m3 16 4 4 4-4" />
		<path d="M7 20V4" />
		<path d="M11 4h4" />
		<path d="M11 8h7" />
		<path d="M11 12h10" />
	</Base>
);
export const ArrowDownRight = (p: IconProps) => (
	<Base {...p}>
		<path d="m7 7 10 10" />
		<path d="M17 7v10H7" />
	</Base>
);
export const ArrowDownToDot = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v14" />
		<path d="m19 9-7 7-7-7" />
		<circle cx="12" cy="21" r="1" />
	</Base>
);
export const ArrowDownToLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 17V3" />
		<path d="m6 11 6 6 6-6" />
		<path d="M19 21H5" />
	</Base>
);
export const ArrowDownUp = (p: IconProps) => (
	<Base {...p}>
		<path d="m3 16 4 4 4-4" />
		<path d="M7 20V4" />
		<path d="m21 8-4-4-4 4" />
		<path d="M17 4v16" />
	</Base>
);
export const ArrowDownWideNarrow = (p: IconProps) => (
	<Base {...p}>
		<path d="m3 16 4 4 4-4" />
		<path d="M7 20V4" />
		<path d="M11 4h10" />
		<path d="M11 8h7" />
		<path d="M11 12h4" />
	</Base>
);
export const ArrowDownZA = (p: IconProps) => (
	<Base {...p}>
		<path d="m3 16 4 4 4-4" />
		<path d="M7 4v16" />
		<path d="M15 4h5l-5 6h5" />
		<path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" />
		<path d="M20 18h-5" />
	</Base>
);
export const ArrowLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="m12 19-7-7 7-7" />
		<path d="M19 12H5" />
	</Base>
);
export const ArrowLeftFromLine = (p: IconProps) => (
	<Base {...p}>
		<path d="m9 6-6 6 6 6" />
		<path d="M3 12h14" />
		<path d="M21 19V5" />
	</Base>
);
export const ArrowLeftRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 3 4 7l4 4" />
		<path d="M4 7h16" />
		<path d="m16 21 4-4-4-4" />
		<path d="M20 17H4" />
	</Base>
);
export const ArrowLeftToLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 19V5" />
		<path d="m13 6-6 6 6 6" />
		<path d="M7 12h14" />
	</Base>
);
export const ArrowRightFromLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 5v14" />
		<path d="M21 12H7" />
		<path d="m15 18 6-6-6-6" />
	</Base>
);
export const ArrowRightLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 3 4 4-4 4" />
		<path d="M20 7H4" />
		<path d="m8 21-4-4 4-4" />
		<path d="M4 17h16" />
	</Base>
);
export const ArrowRightToLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 12H3" />
		<path d="m11 18 6-6-6-6" />
		<path d="M21 5v14" />
	</Base>
);
export const ArrowUp = (p: IconProps) => (
	<Base {...p}>
		<path d="m5 12 7-7 7 7" />
		<path d="M12 19V5" />
	</Base>
);
export const ArrowUp01 = (p: IconProps) => (
	<Base {...p}>
		<path d="m3 8 4-4 4 4" />
		<path d="M7 4v16" />
		<rect x="15" y="4" width="4" height="6" ry="2" />
		<path d="M17 20v-6h-2" />
		<path d="M15 20h4" />
	</Base>
);
export const ArrowUp10 = (p: IconProps) => (
	<Base {...p}>
		<path d="m3 8 4-4 4 4" />
		<path d="M7 4v16" />
		<path d="M17 10V4h-2" />
		<path d="M15 10h4" />
		<rect x="15" y="14" width="4" height="6" ry="2" />
	</Base>
);
export const ArrowUpAZ = (p: IconProps) => (
	<Base {...p}>
		<path d="m3 8 4-4 4 4" />
		<path d="M7 4v16" />
		<path d="M20 8h-5" />
		<path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10" />
		<path d="M15 14h5l-5 6h5" />
	</Base>
);
export const ArrowUpDown = (p: IconProps) => (
	<Base {...p}>
		<path d="m21 16-4 4-4-4" />
		<path d="M17 20V4" />
		<path d="m3 8 4-4 4 4" />
		<path d="M7 4v16" />
	</Base>
);
export const ArrowUpFromDot = (p: IconProps) => (
	<Base {...p}>
		<path d="m5 9 7-7 7 7" />
		<path d="M12 16V2" />
		<circle cx="12" cy="21" r="1" />
	</Base>
);
export const ArrowUpFromLine = (p: IconProps) => (
	<Base {...p}>
		<path d="m18 9-6-6-6 6" />
		<path d="M12 3v14" />
		<path d="M5 21h14" />
	</Base>
);
export const ArrowUpLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 17V7h10" />
		<path d="M17 17 7 7" />
	</Base>
);
export const ArrowUpNarrowWide = (p: IconProps) => (
	<Base {...p}>
		<path d="m3 8 4-4 4 4" />
		<path d="M7 4v16" />
		<path d="M11 12h4" />
		<path d="M11 16h7" />
		<path d="M11 20h10" />
	</Base>
);
export const ArrowUpRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 7h10v10" />
		<path d="M7 17 17 7" />
	</Base>
);
export const ArrowUpToLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 3h14" />
		<path d="m18 13-6-6-6 6" />
		<path d="M12 7v14" />
	</Base>
);
export const ArrowUpWideNarrow = (p: IconProps) => (
	<Base {...p}>
		<path d="m3 8 4-4 4 4" />
		<path d="M7 4v16" />
		<path d="M11 12h10" />
		<path d="M11 16h7" />
		<path d="M11 20h4" />
	</Base>
);
export const ArrowUpZA = (p: IconProps) => (
	<Base {...p}>
		<path d="m3 8 4-4 4 4" />
		<path d="M7 4v16" />
		<path d="M15 4h5l-5 6h5" />
		<path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" />
		<path d="M20 18h-5" />
	</Base>
);
export const ArrowsUpFromLine = (p: IconProps) => (
	<Base {...p}>
		<path d="m4 6 3-3 3 3" />
		<path d="M7 17V3" />
		<path d="m14 6 3-3 3 3" />
		<path d="M17 17V3" />
		<path d="M4 21h16" />
	</Base>
);
export const Asterisk = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6v12" />
		<path d="M17.196 9 6.804 15" />
		<path d="m6.804 9 10.392 6" />
	</Base>
);
export const Astroid = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.983 21.186a1 1 0 0 1-1.966 0 10 10 0 0 0-8.203-8.203 1 1 0 0 1 0-1.966 10 10 0 0 0 8.203-8.203 1 1 0 0 1 1.966 0 10 10 0 0 0 8.203 8.203 1 1 0 0 1 0 1.966 10 10 0 0 0-8.203 8.203" />
	</Base>
);
export const AtSign = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="4" />
		<path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
	</Base>
);
export const Atom = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="1" />
		<path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
		<path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
	</Base>
);
export const AudioLines = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 10v3" />
		<path d="M6 6v11" />
		<path d="M10 3v18" />
		<path d="M14 8v7" />
		<path d="M18 5v13" />
		<path d="M22 10v3" />
	</Base>
);
export const AudioWaveform = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" />
	</Base>
);
export const Award = (p: IconProps) => (
	<Base {...p}>
		<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
		<circle cx="12" cy="8" r="6" />
	</Base>
);
export const Axe = (p: IconProps) => (
	<Base {...p}>
		<path d="m14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9" />
		<path d="M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z" />
	</Base>
);
export const Axis3d = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.5 10.5 15 9" />
		<path d="M4 4v15a1 1 0 0 0 1 1h15" />
		<path d="M4.293 19.707 6 18" />
		<path d="m9 15 1.5-1.5" />
	</Base>
);
export const Baby = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
		<path d="M15 12h.01" />
		<path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
		<path d="M9 12h.01" />
	</Base>
);
export const Backpack = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
		<path d="M8 10h8" />
		<path d="M8 18h8" />
		<path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6" />
		<path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
	</Base>
);
export const Badge = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
	</Base>
);
export const BadgeAlert = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<line x1="12" x2="12" y1="8" y2="12" />
		<line x1="12" x2="12.01" y1="16" y2="16" />
	</Base>
);
export const BadgeCent = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<path d="M12 7v10" />
		<path d="M15.4 10a4 4 0 1 0 0 4" />
	</Base>
);
export const BadgeCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<path d="m9 12 2 2 4-4" />
	</Base>
);
export const BadgeDollarSign = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
		<path d="M12 18V6" />
	</Base>
);
export const BadgeEuro = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<path d="M7 12h5" />
		<path d="M15 9.4a4 4 0 1 0 0 5.2" />
	</Base>
);
export const BadgeIndianRupee = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<path d="M8 8h8" />
		<path d="M8 12h8" />
		<path d="m13 17-5-1h1a4 4 0 0 0 0-8" />
	</Base>
);
export const BadgeInfo = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<line x1="12" x2="12" y1="16" y2="12" />
		<line x1="12" x2="12.01" y1="8" y2="8" />
	</Base>
);
export const BadgeJapaneseYen = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<path d="m9 8 3 3v7" />
		<path d="m12 11 3-3" />
		<path d="M9 12h6" />
		<path d="M9 16h6" />
	</Base>
);
export const BadgeMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<line x1="8" x2="16" y1="12" y2="12" />
	</Base>
);
export const BadgePercent = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<path d="m15 9-6 6" />
		<path d="M9 9h.01" />
		<path d="M15 15h.01" />
	</Base>
);
export const BadgePlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<line x1="12" x2="12" y1="8" y2="16" />
		<line x1="8" x2="16" y1="12" y2="12" />
	</Base>
);
export const BadgePoundSterling = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<path d="M8 12h4" />
		<path d="M10 16V9.5a2.5 2.5 0 0 1 5 0" />
		<path d="M8 16h7" />
	</Base>
);
export const BadgeQuestionMark = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
		<line x1="12" x2="12.01" y1="17" y2="17" />
	</Base>
);
export const BadgeRussianRuble = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<path d="M9 16h5" />
		<path d="M9 12h5a2 2 0 1 0 0-4h-3v9" />
	</Base>
);
export const BadgeSwissFranc = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<path d="M11 17V8h4" />
		<path d="M11 12h3" />
		<path d="M9 16h4" />
	</Base>
);
export const BadgeTurkishLira = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 7v10a5 5 0 0 0 5-5" />
		<path d="m15 8-6 3" />
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76" />
	</Base>
);
export const BadgeX = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		<line x1="15" x2="9" y1="9" y2="15" />
		<line x1="9" x2="15" y1="9" y2="15" />
	</Base>
);
export const BaggageClaim = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2" />
		<path d="M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10" />
		<rect width="13" height="8" x="8" y="6" rx="1" />
		<circle cx="18" cy="20" r="2" />
		<circle cx="9" cy="20" r="2" />
	</Base>
);
export const Balloon = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1" />
		<path d="M12 6a2 2 0 0 1 2 2" />
		<path d="M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0" />
	</Base>
);
export const Ban = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M4.929 4.929 19.07 19.071" />
	</Base>
);
export const Banana = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5" />
		<path d="M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z" />
	</Base>
);
export const Bandage = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 10.01h.01" />
		<path d="M10 14.01h.01" />
		<path d="M14 10.01h.01" />
		<path d="M14 14.01h.01" />
		<path d="M18 6v12" />
		<path d="M6 6v12" />
		<rect x="2" y="6" width="20" height="12" rx="2" />
	</Base>
);
export const Banknote = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="12" x="2" y="6" rx="2" />
		<circle cx="12" cy="12" r="2" />
		<path d="M6 12h.01M18 12h.01" />
	</Base>
);
export const BanknoteArrowDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
		<path d="m16 19 3 3 3-3" />
		<path d="M18 12h.01" />
		<path d="M19 16v6" />
		<path d="M6 12h.01" />
		<circle cx="12" cy="12" r="2" />
	</Base>
);
export const BanknoteArrowUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
		<path d="M18 12h.01" />
		<path d="M19 22v-6" />
		<path d="m22 19-3-3-3 3" />
		<path d="M6 12h.01" />
		<circle cx="12" cy="12" r="2" />
	</Base>
);
export const BanknoteCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.748 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4.875" />
		<path d="m16 19 2 2 4-4" />
		<path d="M18 12h.01" />
		<path d="M6 12h.01" />
		<circle cx="12" cy="12" r="2" />
	</Base>
);
export const BanknoteX = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
		<path d="m17 17 5 5" />
		<path d="M18 12h.01" />
		<path d="m22 17-5 5" />
		<path d="M6 12h.01" />
		<circle cx="12" cy="12" r="2" />
	</Base>
);
export const Barcode = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 5v14" />
		<path d="M8 5v14" />
		<path d="M12 5v14" />
		<path d="M17 5v14" />
		<path d="M21 5v14" />
	</Base>
);
export const Barrel = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 3a41 41 0 0 0 0 18" />
		<path d="M14 3a41 41 0 0 1 0 18" />
		<path d="M17 3a2 2 0 0 1 1.68.92 15.25 15.25 0 0 1 0 16.16A2 2 0 0 1 17 21H7a2 2 0 0 1-1.68-.92 15.25 15.25 0 0 1 0-16.16A2 2 0 0 1 7 3z" />
		<path d="M3.84 17h16.32" />
		<path d="M3.84 7h16.32" />
	</Base>
);
export const Baseline = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 20h16" />
		<path d="m6 16 6-12 6 12" />
		<path d="M8 12h8" />
	</Base>
);
export const Bath = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 4 8 6" />
		<path d="M17 19v2" />
		<path d="M2 12h20" />
		<path d="M7 19v2" />
		<path d="M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
	</Base>
);
export const Battery = (p: IconProps) => (
	<Base {...p}>
		<path d="M 22 14 L 22 10" />
		<rect x="2" y="6" width="16" height="12" rx="2" />
	</Base>
);
export const BatteryCharging = (p: IconProps) => (
	<Base {...p}>
		<path d="m11 7-3 5h4l-3 5" />
		<path d="M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935" />
		<path d="M22 14v-4" />
		<path d="M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936" />
	</Base>
);
export const BatteryFull = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 10v4" />
		<path d="M14 10v4" />
		<path d="M22 14v-4" />
		<path d="M6 10v4" />
		<rect x="2" y="6" width="16" height="12" rx="2" />
	</Base>
);
export const BatteryLow = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 14v-4" />
		<path d="M6 14v-4" />
		<rect x="2" y="6" width="16" height="12" rx="2" />
	</Base>
);
export const BatteryMedium = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 14v-4" />
		<path d="M22 14v-4" />
		<path d="M6 14v-4" />
		<rect x="2" y="6" width="16" height="12" rx="2" />
	</Base>
);
export const BatteryPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 9v6" />
		<path d="M12.543 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.605" />
		<path d="M22 14v-4" />
		<path d="M7 12h6" />
		<path d="M7.606 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.606" />
	</Base>
);
export const BatteryWarning = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 17h.01" />
		<path d="M10 7v6" />
		<path d="M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2" />
		<path d="M22 14v-4" />
		<path d="M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
	</Base>
);
export const Beaker = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.5 3h15" />
		<path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
		<path d="M6 14h12" />
	</Base>
);
export const Bean = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z" />
		<path d="M5.341 10.62a4 4 0 1 0 5.279-5.28" />
	</Base>
);
export const BeanOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1" />
		<path d="M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66" />
		<path d="M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04" />
		<line x1="2" x2="22" y1="2" y2="22" />
	</Base>
);
export const Bed = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 4v16" />
		<path d="M2 8h18a2 2 0 0 1 2 2v10" />
		<path d="M2 17h20" />
		<path d="M6 8v9" />
	</Base>
);
export const BedDouble = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
		<path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
		<path d="M12 4v6" />
		<path d="M2 18h20" />
	</Base>
);
export const BedSingle = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
		<path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
		<path d="M3 18h18" />
	</Base>
);
export const Beef = (p: IconProps) => (
	<Base {...p}>
		<path d="M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3" />
		<path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1-2.29 7.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5" />
		<circle cx="12.5" cy="8.5" r="2.5" />
	</Base>
);
export const BeefOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.771 6.109a2.5 2.5 0 0 1 3.12 3.12" />
		<path d="M17.852 12.185a6.5 6.5 0 0 0-9.035-9.04" />
		<path d="M18.013 18.013C15.029 20.349 10.831 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5" />
		<path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1-.139 4.393" />
		<path d="m2 2 20 20" />
		<path d="M6.355 6.37a7 7 0 0 0-.075.23c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c3.356 0 6.993-1.267 9.85-3.151" />
	</Base>
);
export const Beer = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 11h1a3 3 0 0 1 0 6h-1" />
		<path d="M9 12v6" />
		<path d="M13 12v6" />
		<path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z" />
		<path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
	</Base>
);
export const BeerOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 13v5" />
		<path d="M17 11.47V8" />
		<path d="M17 11h1a3 3 0 0 1 2.745 4.211" />
		<path d="m2 2 20 20" />
		<path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" />
		<path d="M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268" />
		<path d="M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12" />
		<path d="M9 14.6V18" />
	</Base>
);
export const BellCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.268 21a2 2 0 0 0 3.464 0" />
		<path d="m15 8 2 2 4-4" />
		<path d="M16.8607 4.4824A6 6 0 0 0 6 8C6 12.499 4.589 13.956 3.262 15.326" />
		<path d="M3.262 15.326A1 1 0 0 0 4 17H20A1 1 0 0 0 20.74 15.327C20.209 14.779 19.665 14.218 19.203 13.454" />
	</Base>
);
export const BellDot = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.268 21a2 2 0 0 0 3.464 0" />
		<path d="M11.68 2.009A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673c-.824-.85-1.678-1.731-2.21-3.348" />
		<circle cx="18" cy="5" r="3" />
	</Base>
);
export const BellElectric = (p: IconProps) => (
	<Base {...p}>
		<path d="M18.518 17.347A7 7 0 0 1 14 19" />
		<path d="M18.8 4A11 11 0 0 1 20 9" />
		<path d="M9 9h.01" />
		<circle cx="20" cy="16" r="2" />
		<circle cx="9" cy="9" r="7" />
		<rect x="4" y="16" width="10" height="6" rx="2" />
	</Base>
);
export const BellMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.268 21a2 2 0 0 0 3.464 0" />
		<path d="M15 8h6" />
		<path d="M16.243 3.757A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673A9.4 9.4 0 0 1 18.667 12" />
	</Base>
);
export const BellOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.268 21a2 2 0 0 0 3.464 0" />
		<path d="M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742" />
		<path d="m2 2 20 20" />
		<path d="M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05" />
	</Base>
);
export const BellPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.268 21a2 2 0 0 0 3.464 0" />
		<path d="M15 8h6" />
		<path d="M18 5v6" />
		<path d="M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332" />
	</Base>
);
export const BellRing = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.268 21a2 2 0 0 0 3.464 0" />
		<path d="M22 8c0-2.3-.8-4.3-2-6" />
		<path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
		<path d="M4 2C2.8 3.7 2 5.7 2 8" />
	</Base>
);
export const BetweenHorizontalEnd = (p: IconProps) => (
	<Base {...p}>
		<rect width="13" height="7" x="3" y="3" rx="1" />
		<path d="m22 15-3-3 3-3" />
		<rect width="13" height="7" x="3" y="14" rx="1" />
	</Base>
);
export const BetweenHorizontalStart = (p: IconProps) => (
	<Base {...p}>
		<rect width="13" height="7" x="8" y="3" rx="1" />
		<path d="m2 9 3 3-3 3" />
		<rect width="13" height="7" x="8" y="14" rx="1" />
	</Base>
);
export const BetweenVerticalEnd = (p: IconProps) => (
	<Base {...p}>
		<rect width="7" height="13" x="3" y="3" rx="1" />
		<path d="m9 22 3-3 3 3" />
		<rect width="7" height="13" x="14" y="3" rx="1" />
	</Base>
);
export const BetweenVerticalStart = (p: IconProps) => (
	<Base {...p}>
		<rect width="7" height="13" x="3" y="8" rx="1" />
		<path d="m15 2-3 3-3-3" />
		<rect width="7" height="13" x="14" y="8" rx="1" />
	</Base>
);
export const BicepsFlexed = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1" />
		<path d="M15 14a5 5 0 0 0-7.584 2" />
		<path d="M9.964 6.825C8.019 7.977 9.5 13 8 15" />
	</Base>
);
export const Bike = (p: IconProps) => (
	<Base {...p}>
		<circle cx="18.5" cy="17.5" r="3.5" />
		<circle cx="5.5" cy="17.5" r="3.5" />
		<circle cx="15" cy="5" r="1" />
		<path d="M12 17.5V14l-3-3 4-3 2 3h2" />
	</Base>
);
export const Binary = (p: IconProps) => (
	<Base {...p}>
		<rect x="14" y="14" width="4" height="6" rx="2" />
		<rect x="6" y="4" width="4" height="6" rx="2" />
		<path d="M6 20h4" />
		<path d="M14 10h4" />
		<path d="M6 14h2v6" />
		<path d="M14 4h2v6" />
	</Base>
);
export const Binoculars = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 10h4" />
		<path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
		<path d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z" />
		<path d="M 22 16 L 2 16" />
		<path d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z" />
		<path d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3" />
	</Base>
);
export const Biohazard = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="11.9" r="2" />
		<path d="M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6" />
		<path d="m8.9 10.1 1.4.8" />
		<path d="M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5" />
		<path d="m15.1 10.1-1.4.8" />
		<path d="M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2" />
		<path d="M12 13.9v1.6" />
		<path d="M13.5 5.4c-1-.2-2-.2-3 0" />
		<path d="M17 16.4c.7-.7 1.2-1.6 1.5-2.5" />
		<path d="M5.5 13.9c.3.9.8 1.8 1.5 2.5" />
	</Base>
);
export const Bird = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 7h.01" />
		<path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
		<path d="m20 7 2 .5-2 .5" />
		<path d="M10 18v3" />
		<path d="M14 17.75V21" />
		<path d="M7 18a6 6 0 0 0 3.84-10.61" />
	</Base>
);
export const Birdhouse = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 18v4" />
		<path d="m17 18 1.956-11.468" />
		<path d="m3 8 7.82-5.615a2 2 0 0 1 2.36 0L21 8" />
		<path d="M4 18h16" />
		<path d="M7 18 5.044 6.532" />
		<circle cx="12" cy="10" r="2" />
	</Base>
);
export const Bitcoin = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
	</Base>
);
export const Blend = (p: IconProps) => (
	<Base {...p}>
		<circle cx="9" cy="9" r="7" />
		<circle cx="15" cy="15" r="7" />
	</Base>
);
export const Blender = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 14a2 2 0 0 0-1.963 1.615l-1.018 5.193A1 1 0 0 0 6 22h12a1 1 0 0 0 .981-1.192l-1.018-5.193A2 2 0 0 0 16 14z" />
		<path d="m17 2-1 12" />
		<path d="M8.006 14 7 2" />
		<path d="M7.565 8.787A5 5 0 0 0 12 8a5 5 0 0 1 4.56-.75" />
		<path d="M19 2H5a2 2 0 0 0-2 2v5a2 2 0 0 0 .688 1.5" />
		<path d="M12 18h.01" />
	</Base>
);
export const Blinds = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 3h18" />
		<path d="M20 7H8" />
		<path d="M20 11H8" />
		<path d="M10 19h10" />
		<path d="M8 15h12" />
		<path d="M4 3v14" />
		<circle cx="4" cy="19" r="2" />
	</Base>
);
export const Blocks = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" />
		<rect x="14" y="2" width="8" height="8" rx="1" />
	</Base>
);
export const Bluetooth = (p: IconProps) => (
	<Base {...p}>
		<path d="m7 7 10 10-5 5V2l5 5L7 17" />
	</Base>
);
export const BluetoothConnected = (p: IconProps) => (
	<Base {...p}>
		<path d="m7 7 10 10-5 5V2l5 5L7 17" />
		<line x1="18" x2="21" y1="12" y2="12" />
		<line x1="3" x2="6" y1="12" y2="12" />
	</Base>
);
export const BluetoothOff = (p: IconProps) => (
	<Base {...p}>
		<path d="m17 17-5 5V12l-5 5" />
		<path d="m2 2 20 20" />
		<path d="M14.5 9.5 17 7l-5-5v4.5" />
	</Base>
);
export const BluetoothSearching = (p: IconProps) => (
	<Base {...p}>
		<path d="m7 7 10 10-5 5V2l5 5L7 17" />
		<path d="M20.83 14.83a4 4 0 0 0 0-5.66" />
		<path d="M18 12h.01" />
	</Base>
);
export const Bold = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
	</Base>
);
export const Bolt = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
		<circle cx="12" cy="12" r="4" />
	</Base>
);
export const Bomb = (p: IconProps) => (
	<Base {...p}>
		<circle cx="11" cy="13" r="9" />
		<path d="M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95" />
		<path d="m22 2-1.5 1.5" />
	</Base>
);
export const Bone = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
	</Base>
);
export const BoneFracture = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 4.5a1 1 0 0 1 5 0 .5.5 0 0 0 .5.5 1 1 0 0 1 0 5c-.81 0-1.8-.7-2.5 0l-1.958 1.957a.15.15 0 0 1-.252-.072l-.493-2.07a.15.15 0 0 0-.111-.112l-2.072-.494a.15.15 0 0 1-.072-.252L14 7c.7-.7 0-1.69 0-2.5" />
		<path d="m16 20-1-2" />
		<path d="m20 16-2-1" />
		<path d="m4 8 2 1" />
		<path d="m8 4 1 2" />
		<path d="M9.698 14.19a.15.15 0 0 0 .112.112l2.074.489a.15.15 0 0 1 .072.252L10 17c-.7.7 0 1.69 0 2.5a1 1 0 0 1-5 0 .495.495 0 0 0-.5-.5 1 1 0 0 1 0-5c.81 0 1.8.7 2.5 0l1.956-1.957a.15.15 0 0 1 .252.072z" />
	</Base>
);
export const BookA = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<path d="m8 13 4-7 4 7" />
		<path d="M9.1 11h5.7" />
	</Base>
);
export const BookAlert = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 13h.01" />
		<path d="M12 6v3" />
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
	</Base>
);
export const BookAudio = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6v7" />
		<path d="M16 8v3" />
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<path d="M8 8v3" />
	</Base>
);
export const BookCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<path d="m9 9.5 2 2 4-4" />
	</Base>
);
export const BookCopy = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 7a2 2 0 0 0-2 2v11" />
		<path d="M5.803 18H5a2 2 0 0 0 0 4h9.5a.5.5 0 0 0 .5-.5V21" />
		<path d="M9 15V4a2 2 0 0 1 2-2h9.5a.5.5 0 0 1 .5.5v14a.5.5 0 0 1-.5.5H11a2 2 0 0 1 0-4h10" />
	</Base>
);
export const BookDashed = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 17h1.5" />
		<path d="M12 22h1.5" />
		<path d="M12 2h1.5" />
		<path d="M17.5 22H19a1 1 0 0 0 1-1" />
		<path d="M17.5 2H19a1 1 0 0 1 1 1v1.5" />
		<path d="M20 14v3h-2.5" />
		<path d="M20 8.5V10" />
		<path d="M4 10V8.5" />
		<path d="M4 19.5V14" />
		<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H8" />
		<path d="M8 22H6.5a1 1 0 0 1 0-5H8" />
	</Base>
);
export const BookDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 13V7" />
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<path d="m9 10 3 3 3-3" />
	</Base>
);
export const BookHeadphones = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<path d="M8 12v-2a4 4 0 0 1 8 0v2" />
		<circle cx="15" cy="12" r="1" />
		<circle cx="9" cy="12" r="1" />
	</Base>
);
export const BookHeart = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<path d="M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" />
	</Base>
);
export const BookImage = (p: IconProps) => (
	<Base {...p}>
		<path d="m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17" />
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<circle cx="10" cy="8" r="2" />
	</Base>
);
export const BookKey = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 2H6.5A2.5 2.5 0 0 0 4 4.5v15" />
		<path d="M17 2v6" />
		<path d="M17 4h2" />
		<path d="M20 15.2V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<circle cx="17" cy="10" r="2" />
	</Base>
);
export const BookLock = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 6V4a2 2 0 1 0-4 0v2" />
		<path d="M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10" />
		<rect x="12" y="6" width="8" height="5" rx="1" />
	</Base>
);
export const BookMarked = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 2v8l3-3 3 3V2" />
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
	</Base>
);
export const BookMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<path d="M9 10h6" />
	</Base>
);
export const BookOpen = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 7v14" />
		<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
	</Base>
);
export const BookOpenCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 21V7" />
		<path d="m16 12 2 2 4-4" />
		<path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3" />
	</Base>
);
export const BookOpenText = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 7v14" />
		<path d="M16 12h2" />
		<path d="M16 8h2" />
		<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
		<path d="M6 12h2" />
		<path d="M6 8h2" />
	</Base>
);
export const BookPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 7v6" />
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<path d="M9 10h6" />
	</Base>
);
export const BookSearch = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 22H5.5a1 1 0 0 1 0-5h4.501" />
		<path d="m21 22-1.879-1.878" />
		<path d="M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8" />
		<circle cx="17" cy="18" r="3" />
	</Base>
);
export const BookText = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<path d="M8 11h8" />
		<path d="M8 7h6" />
	</Base>
);
export const BookType = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 13h4" />
		<path d="M12 6v7" />
		<path d="M16 8V6H8v2" />
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
	</Base>
);
export const BookUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 13V7" />
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<path d="m9 10 3-3 3 3" />
	</Base>
);
export const BookUp2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 13V7" />
		<path d="M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2" />
		<path d="m9 10 3-3 3 3" />
		<path d="m9 5 3-3 3 3" />
	</Base>
);
export const BookUser = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 13a3 3 0 1 0-6 0" />
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<circle cx="12" cy="8" r="2" />
	</Base>
);
export const BookX = (p: IconProps) => (
	<Base {...p}>
		<path d="m14.5 7-5 5" />
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
		<path d="m9.5 7 5 5" />
	</Base>
);
export const Bookmark = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
	</Base>
);
export const BookmarkCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
		<path d="m9 10 2 2 4-4" />
	</Base>
);
export const BookmarkMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 10H9" />
		<path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
	</Base>
);
export const BookmarkOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 19v1a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5" />
		<path d="m2 2 20 20" />
		<path d="M8.656 3H17a2 2 0 0 1 2 2v8.344" />
	</Base>
);
export const BookmarkPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 7v6" />
		<path d="M15 10H9" />
		<path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
	</Base>
);
export const BookmarkX = (p: IconProps) => (
	<Base {...p}>
		<path d="m14.5 7.5-5 5" />
		<path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
		<path d="m9.5 7.5 5 5" />
	</Base>
);
export const BoomBox = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
		<path d="M8 8v1" />
		<path d="M12 8v1" />
		<path d="M16 8v1" />
		<rect width="20" height="12" x="2" y="9" rx="2" />
		<circle cx="8" cy="15" r="2" />
		<circle cx="16" cy="15" r="2" />
	</Base>
);
export const Bot = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 8V4H8" />
		<rect width="16" height="12" x="4" y="8" rx="2" />
		<path d="M2 14h2" />
		<path d="M20 14h2" />
		<path d="M15 13v2" />
		<path d="M9 13v2" />
	</Base>
);
export const BotMessageSquare = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6V2H8" />
		<path d="M15 11v2" />
		<path d="M2 12h2" />
		<path d="M20 12h2" />
		<path d="M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
		<path d="M9 11v2" />
	</Base>
);
export const BotOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.67 8H18a2 2 0 0 1 2 2v4.33" />
		<path d="M2 14h2" />
		<path d="M20 14h2" />
		<path d="M22 22 2 2" />
		<path d="M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586" />
		<path d="M9 13v2" />
		<path d="M9.67 4H12v2.33" />
	</Base>
);
export const BottleWine = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a6 6 0 0 0 1.2 3.6l.6.8A6 6 0 0 1 17 13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a6 6 0 0 1 1.2-3.6l.6-.8A6 6 0 0 0 10 5z" />
		<path d="M17 13h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4" />
	</Base>
);
export const BowArrow = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 3h4v4" />
		<path d="M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17" />
		<path d="M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05" />
		<path d="M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z" />
		<path d="M9.707 14.293 21 3" />
	</Base>
);
export const Box = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
		<path d="m3.3 7 8.7 5 8.7-5" />
		<path d="M12 22V12" />
	</Base>
);
export const Boxes = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
		<path d="m7 16.5-4.74-2.85" />
		<path d="m7 16.5 5-3" />
		<path d="M7 16.5v5.17" />
		<path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
		<path d="m17 16.5-5-3" />
		<path d="m17 16.5 4.74-2.85" />
		<path d="M17 16.5v5.17" />
		<path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
		<path d="M12 8 7.26 5.15" />
		<path d="m12 8 4.74-2.85" />
		<path d="M12 13.5V8" />
	</Base>
);
export const Braces = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
		<path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
	</Base>
);
export const Brackets = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3" />
		<path d="M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3" />
	</Base>
);
export const Brain = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 18V5" />
		<path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
		<path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
		<path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
		<path d="M18 18a4 4 0 0 0 2-7.464" />
		<path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
		<path d="M6 18a4 4 0 0 1-2-7.464" />
		<path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
	</Base>
);
export const BrainCircuit = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
		<path d="M9 13a4.5 4.5 0 0 0 3-4" />
		<path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
		<path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
		<path d="M6 18a4 4 0 0 1-1.967-.516" />
		<path d="M12 13h4" />
		<path d="M12 18h6a2 2 0 0 1 2 2v1" />
		<path d="M12 8h8" />
		<path d="M16 8V5a2 2 0 0 1 2-2" />
		<circle cx="16" cy="13" r=".5" />
		<circle cx="18" cy="3" r=".5" />
		<circle cx="20" cy="21" r=".5" />
		<circle cx="20" cy="8" r=".5" />
	</Base>
);
export const BrainCog = (p: IconProps) => (
	<Base {...p}>
		<path d="m10.852 14.772-.383.923" />
		<path d="m10.852 9.228-.383-.923" />
		<path d="m13.148 14.772.382.924" />
		<path d="m13.531 8.305-.383.923" />
		<path d="m14.772 10.852.923-.383" />
		<path d="m14.772 13.148.923.383" />
		<path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771" />
		<path d="M17.998 5.125a4 4 0 0 1 2.525 5.771" />
		<path d="M19.505 10.294a4 4 0 0 1-1.5 7.706" />
		<path d="M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516" />
		<path d="M4.5 10.291A4 4 0 0 0 6 18" />
		<path d="M6.002 5.125a3 3 0 0 0 .4 1.375" />
		<path d="m9.228 10.852-.923-.383" />
		<path d="m9.228 13.148-.923.383" />
		<circle cx="12" cy="12" r="3" />
	</Base>
);
export const BrickWall = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M12 9v6" />
		<path d="M16 15v6" />
		<path d="M16 3v6" />
		<path d="M3 15h18" />
		<path d="M3 9h18" />
		<path d="M8 15v6" />
		<path d="M8 3v6" />
	</Base>
);
export const BrickWallFire = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 3v2.107" />
		<path d="M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9" />
		<path d="M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938" />
		<path d="M3 15h5.253" />
		<path d="M3 9h8.228" />
		<path d="M8 15v6" />
		<path d="M8 3v6" />
	</Base>
);
export const BrickWallShield = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 9v1.258" />
		<path d="M16 3v5.46" />
		<path d="M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75" />
		<path d="M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z" />
		<path d="M3 15h7" />
		<path d="M3 9h12.142" />
		<path d="M8 15v6" />
		<path d="M8 3v6" />
	</Base>
);
export const Briefcase = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
		<rect width="20" height="14" x="2" y="6" rx="2" />
	</Base>
);
export const BriefcaseBusiness = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 12h.01" />
		<path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
		<path d="M22 13a18.15 18.15 0 0 1-20 0" />
		<rect width="20" height="14" x="2" y="6" rx="2" />
	</Base>
);
export const BriefcaseConveyorBelt = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 20v2" />
		<path d="M14 20v2" />
		<path d="M18 20v2" />
		<path d="M21 20H3" />
		<path d="M6 20v2" />
		<path d="M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12" />
		<rect x="4" y="6" width="16" height="10" rx="2" />
	</Base>
);
export const BriefcaseMedical = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 11v4" />
		<path d="M14 13h-4" />
		<path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
		<path d="M18 6v14" />
		<path d="M6 6v14" />
		<rect width="20" height="14" x="2" y="6" rx="2" />
	</Base>
);
export const BringToFront = (p: IconProps) => (
	<Base {...p}>
		<rect x="8" y="8" width="8" height="8" rx="2" />
		<path d="M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2" />
		<path d="M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2" />
	</Base>
);
export const Broccoli = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 13a3 3 0 0 1-2.121-5.121" />
		<path d="M15.606 14.204c-3.5 1.5-5.899 4.503-8.899 7.503A1 1 0 0 1 6 22c-2 0-4-2-4-4a1 1 0 0 1 .293-.707c1.911-1.911 3.823-3.578 5.347-5.441" />
		<path d="M16.573 14.737A4 4 0 0 1 14 11" />
		<path d="M7.14 10.907a4 4 0 1 1 2.756-7.43A4 4 0 0 1 16.7 4.48a2 2 0 0 1 2.82 2.82 4 4 0 0 1 1.002 6.805A4 4 0 1 1 13 16" />
	</Base>
);
export const Brush = (p: IconProps) => (
	<Base {...p}>
		<path d="m11 10 3 3" />
		<path d="M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z" />
		<path d="M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031" />
	</Base>
);
export const BrushCleaning = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 22-1-4" />
		<path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1" />
		<path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z" />
		<path d="m8 22 1-4" />
	</Base>
);
export const Bubbles = (p: IconProps) => (
	<Base {...p}>
		<path d="M7.001 15.085A1.5 1.5 0 0 1 9 16.5" />
		<circle cx="18.5" cy="8.5" r="3.5" />
		<circle cx="7.5" cy="16.5" r="5.5" />
		<circle cx="7.5" cy="4.5" r="2.5" />
	</Base>
);
export const Bug = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 20v-9" />
		<path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" />
		<path d="M14.12 3.88 16 2" />
		<path d="M21 21a4 4 0 0 0-3.81-4" />
		<path d="M21 5a4 4 0 0 1-3.55 3.97" />
		<path d="M22 13h-4" />
		<path d="M3 21a4 4 0 0 1 3.81-4" />
		<path d="M3 5a4 4 0 0 0 3.55 3.97" />
		<path d="M6 13H2" />
		<path d="m8 2 1.88 1.88" />
		<path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" />
	</Base>
);
export const BugOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 20v-8" />
		<path d="M12.656 7H14a4 4 0 0 1 4 4v1.344" />
		<path d="M14.12 3.88 16 2" />
		<path d="M17.123 17.123A6 6 0 0 1 6 14v-3a4 4 0 0 1 1.72-3.287" />
		<path d="m2 2 20 20" />
		<path d="M21 5a4 4 0 0 1-3.55 3.97" />
		<path d="M22 13h-3.344" />
		<path d="M3 21a4 4 0 0 1 3.81-4" />
		<path d="M3 5a4 4 0 0 0 3.55 3.97" />
		<path d="M6 13H2" />
		<path d="m8 2 1.88 1.88" />
		<path d="M9.712 4.06A3 3 0 0 1 15 6v1.13" />
	</Base>
);
export const BugPlay = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97" />
		<path d="M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z" />
		<path d="M14.12 3.88 16 2" />
		<path d="M21 5a4 4 0 0 1-3.55 3.97" />
		<path d="M3 21a4 4 0 0 1 3.81-4" />
		<path d="M3 5a4 4 0 0 0 3.55 3.97" />
		<path d="M6 13H2" />
		<path d="m8 2 1.88 1.88" />
		<path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" />
	</Base>
);
export const Building = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 10h.01" />
		<path d="M12 14h.01" />
		<path d="M12 6h.01" />
		<path d="M16 10h.01" />
		<path d="M16 14h.01" />
		<path d="M16 6h.01" />
		<path d="M8 10h.01" />
		<path d="M8 14h.01" />
		<path d="M8 6h.01" />
		<path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
		<rect x="4" y="2" width="16" height="20" rx="2" />
	</Base>
);
export const Building2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 12h4" />
		<path d="M10 8h4" />
		<path d="M14 21v-3a2 2 0 0 0-4 0v3" />
		<path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
		<path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
	</Base>
);
export const Bus = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 6v6" />
		<path d="M15 6v6" />
		<path d="M2 12h19.6" />
		<path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
		<circle cx="7" cy="18" r="2" />
		<path d="M9 18h5" />
		<circle cx="16" cy="18" r="2" />
	</Base>
);
export const BusFront = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 6 2 7" />
		<path d="M10 6h4" />
		<path d="m22 7-2-1" />
		<rect width="16" height="16" x="4" y="3" rx="2" />
		<path d="M4 11h16" />
		<path d="M8 15h.01" />
		<path d="M16 15h.01" />
		<path d="M6 19v2" />
		<path d="M18 21v-2" />
	</Base>
);
export const Cable = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z" />
		<path d="M17 21v-2" />
		<path d="M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10" />
		<path d="M21 21v-2" />
		<path d="M3 5V3" />
		<path d="M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z" />
		<path d="M7 5V3" />
	</Base>
);
export const CableCar = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 3h.01" />
		<path d="M14 2h.01" />
		<path d="m2 9 20-5" />
		<path d="M12 12V6.5" />
		<rect width="16" height="10" x="4" y="12" rx="3" />
		<path d="M9 12v5" />
		<path d="M15 12v5" />
		<path d="M4 17h16" />
	</Base>
);
export const Cake = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
		<path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
		<path d="M2 21h20" />
		<path d="M7 8v3" />
		<path d="M12 8v3" />
		<path d="M17 8v3" />
		<path d="M7 4h.01" />
		<path d="M12 4h.01" />
		<path d="M17 4h.01" />
	</Base>
);
export const CakeSlice = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 13H3" />
		<path d="M16 17H3" />
		<path d="m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6" />
		<circle cx="9" cy="7" r="2" />
	</Base>
);
export const Calculator = (p: IconProps) => (
	<Base {...p}>
		<rect width="16" height="20" x="4" y="2" rx="2" />
		<line x1="8" x2="16" y1="6" y2="6" />
		<line x1="16" x2="16" y1="14" y2="18" />
		<path d="M16 10h.01" />
		<path d="M12 10h.01" />
		<path d="M8 10h.01" />
		<path d="M12 14h.01" />
		<path d="M8 14h.01" />
		<path d="M12 18h.01" />
		<path d="M8 18h.01" />
	</Base>
);
export const Calendar1 = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 14h1v4" />
		<path d="M16 2v4" />
		<path d="M3 10h18" />
		<path d="M8 2v4" />
		<rect x="3" y="4" width="18" height="18" rx="2" />
	</Base>
);
export const CalendarArrowDown = (p: IconProps) => (
	<Base {...p}>
		<path d="m14 18 4 4 4-4" />
		<path d="M16 2v4" />
		<path d="M18 14v8" />
		<path d="M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343" />
		<path d="M3 10h18" />
		<path d="M8 2v4" />
	</Base>
);
export const CalendarArrowUp = (p: IconProps) => (
	<Base {...p}>
		<path d="m14 18 4-4 4 4" />
		<path d="M16 2v4" />
		<path d="M18 22v-8" />
		<path d="M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9" />
		<path d="M3 10h18" />
		<path d="M8 2v4" />
	</Base>
);
export const CalendarCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 2v4" />
		<path d="M16 2v4" />
		<rect width="18" height="18" x="3" y="4" rx="2" />
		<path d="M3 10h18" />
		<path d="m9 16 2 2 4-4" />
	</Base>
);
export const CalendarCheck2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 2v4" />
		<path d="M16 2v4" />
		<path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
		<path d="M3 10h18" />
		<path d="m16 20 2 2 4-4" />
	</Base>
);
export const CalendarClock = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 14v2.2l1.6 1" />
		<path d="M16 2v4" />
		<path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
		<path d="M3 10h5" />
		<path d="M8 2v4" />
		<circle cx="16" cy="16" r="6" />
	</Base>
);
export const CalendarCog = (p: IconProps) => (
	<Base {...p}>
		<path d="m15.228 16.852-.923-.383" />
		<path d="m15.228 19.148-.923.383" />
		<path d="M16 2v4" />
		<path d="m16.47 14.305.382.923" />
		<path d="m16.852 20.772-.383.924" />
		<path d="m19.148 15.228.383-.923" />
		<path d="m19.53 21.696-.382-.924" />
		<path d="m20.772 16.852.924-.383" />
		<path d="m20.772 19.148.924.383" />
		<path d="M21 10.592V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
		<path d="M3 10h18" />
		<path d="M8 2v4" />
		<circle cx="18" cy="18" r="3" />
	</Base>
);
export const CalendarDays = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 2v4" />
		<path d="M16 2v4" />
		<rect width="18" height="18" x="3" y="4" rx="2" />
		<path d="M3 10h18" />
		<path d="M8 14h.01" />
		<path d="M12 14h.01" />
		<path d="M16 14h.01" />
		<path d="M8 18h.01" />
		<path d="M12 18h.01" />
		<path d="M16 18h.01" />
	</Base>
);
export const CalendarFold = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 20a2 2 0 0 0 2 2h10a2.4 2.4 0 0 0 1.706-.706l3.588-3.588A2.4 2.4 0 0 0 21 16V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
		<path d="M15 22v-5a1 1 0 0 1 1-1h5" />
		<path d="M8 2v4" />
		<path d="M16 2v4" />
		<path d="M3 10h18" />
	</Base>
);
export const CalendarHeart = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.127 22H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.125" />
		<path d="M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" />
		<path d="M16 2v4" />
		<path d="M3 10h18" />
		<path d="M8 2v4" />
	</Base>
);
export const CalendarMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 19h6" />
		<path d="M16 2v4" />
		<path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5" />
		<path d="M3 10h18" />
		<path d="M8 2v4" />
	</Base>
);
export const CalendarMinus2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 2v4" />
		<path d="M16 2v4" />
		<rect width="18" height="18" x="3" y="4" rx="2" />
		<path d="M3 10h18" />
		<path d="M10 16h4" />
	</Base>
);
export const CalendarOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18" />
		<path d="M21 15.5V6a2 2 0 0 0-2-2H9.5" />
		<path d="M16 2v4" />
		<path d="M3 10h7" />
		<path d="M21 10h-5.5" />
		<path d="m2 2 20 20" />
	</Base>
);
export const CalendarPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 19h6" />
		<path d="M16 2v4" />
		<path d="M19 16v6" />
		<path d="M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5" />
		<path d="M3 10h18" />
		<path d="M8 2v4" />
	</Base>
);
export const CalendarPlus2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 2v4" />
		<path d="M16 2v4" />
		<rect width="18" height="18" x="3" y="4" rx="2" />
		<path d="M3 10h18" />
		<path d="M10 16h4" />
		<path d="M12 14v4" />
	</Base>
);
export const CalendarRange = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="4" rx="2" />
		<path d="M16 2v4" />
		<path d="M3 10h18" />
		<path d="M8 2v4" />
		<path d="M17 14h-6" />
		<path d="M13 18H7" />
		<path d="M7 14h.01" />
		<path d="M17 18h.01" />
	</Base>
);
export const CalendarSearch = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 2v4" />
		<path d="M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25" />
		<path d="m22 22-1.875-1.875" />
		<path d="M3 10h18" />
		<path d="M8 2v4" />
		<circle cx="18" cy="18" r="3" />
	</Base>
);
export const CalendarSync = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 10v4h4" />
		<path d="m11 14 1.535-1.605a5 5 0 0 1 8 1.5" />
		<path d="M16 2v4" />
		<path d="m21 18-1.535 1.605a5 5 0 0 1-8-1.5" />
		<path d="M21 22v-4h-4" />
		<path d="M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3" />
		<path d="M3 10h4" />
		<path d="M8 2v4" />
	</Base>
);
export const CalendarX = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 2v4" />
		<path d="M16 2v4" />
		<rect width="18" height="18" x="3" y="4" rx="2" />
		<path d="M3 10h18" />
		<path d="m14 14-4 4" />
		<path d="m10 14 4 4" />
	</Base>
);
export const CalendarX2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 2v4" />
		<path d="M16 2v4" />
		<path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
		<path d="M3 10h18" />
		<path d="m17 22 5-5" />
		<path d="m17 17 5 5" />
	</Base>
);
export const Calendars = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v2" />
		<path d="M15.726 21.01A2 2 0 0 1 14 22H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2" />
		<path d="M18 2v2" />
		<path d="M2 13h2" />
		<path d="M8 8h14" />
		<rect x="8" y="3" width="14" height="14" rx="2" />
	</Base>
);
export const Camera = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
		<circle cx="12" cy="13" r="3" />
	</Base>
);
export const CameraOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M14.564 14.558a3 3 0 1 1-4.122-4.121" />
		<path d="m2 2 20 20" />
		<path d="M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175" />
		<path d="M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344" />
	</Base>
);
export const Candy = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 7v10.9" />
		<path d="M14 6.1V17" />
		<path d="M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4" />
		<path d="M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07" />
		<path d="M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4" />
	</Base>
);
export const CandyCane = (p: IconProps) => (
	<Base {...p}>
		<path d="m10.8 5 2.111 4.223" />
		<path d="M17.75 7 15 2.1" />
		<path d="m4.874 14.647 2.12 4.24" />
		<path d="M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2z" />
		<path d="m7.906 9.712 2.005 4.411" />
	</Base>
);
export const CandyOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 10v7.9" />
		<path d="M11.802 6.145a5 5 0 0 1 6.053 6.053" />
		<path d="M14 6.1v2.243" />
		<path d="m15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965" />
		<path d="M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4" />
		<path d="m2 2 20 20" />
		<path d="M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4" />
	</Base>
);
export const Cannabis = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22v-4" />
		<path d="M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6" />
	</Base>
);
export const CannabisOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22v-4c1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5" />
		<path d="M13.988 8.327C13.902 6.054 13.365 3.82 12 2a9.3 9.3 0 0 0-1.445 2.9" />
		<path d="M17.375 11.725C18.882 10.53 21 7.841 21 6c-2.324 0-5.08 1.296-6.662 2.684" />
		<path d="m2 2 20 20" />
		<path d="M21.024 15.378A15 15 0 0 0 22 15c-.426-1.279-2.67-2.557-4.25-2.907" />
		<path d="M6.995 6.992C5.714 6.4 4.29 6 3 6c0 2 2.5 5 4 6-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3" />
	</Base>
);
export const Captions = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="14" x="3" y="5" rx="2" ry="2" />
		<path d="M7 15h4M15 15h2M7 11h2M13 11h4" />
	</Base>
);
export const CaptionsOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.5 5H19a2 2 0 0 1 2 2v8.5" />
		<path d="M17 11h-.5" />
		<path d="M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2" />
		<path d="m2 2 20 20" />
		<path d="M7 11h4" />
		<path d="M7 15h2.5" />
	</Base>
);
export const Car = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
		<circle cx="7" cy="17" r="2" />
		<path d="M9 17h6" />
		<circle cx="17" cy="17" r="2" />
	</Base>
);
export const CarFront = (p: IconProps) => (
	<Base {...p}>
		<path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
		<path d="M7 14h.01" />
		<path d="M17 14h.01" />
		<rect width="18" height="8" x="3" y="10" rx="2" />
		<path d="M5 18v2" />
		<path d="M19 18v2" />
	</Base>
);
export const CarTaxiFront = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 2h4" />
		<path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
		<path d="M7 14h.01" />
		<path d="M17 14h.01" />
		<rect width="18" height="8" x="3" y="10" rx="2" />
		<path d="M5 18v2" />
		<path d="M19 18v2" />
	</Base>
);
export const Caravan = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2" />
		<path d="M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2" />
		<path d="M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9" />
		<circle cx="8" cy="19" r="2" />
	</Base>
);
export const CardSim = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 14v4" />
		<path d="M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
		<path d="M8 14h8" />
		<rect x="8" y="10" width="8" height="8" rx="1" />
	</Base>
);
export const Carrot = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 16a1 1 0 0 0-7-7q-4 4-5.987 12.385a.5.5 0 0 0 .602.602Q11 20 15 16l-3-3" />
		<path d="M15 9q4 4 7 0-3-4-7 0 4-4 0-7-4 3 0 7" />
		<path d="m8 15-2.58-2.58" />
	</Base>
);
export const CaseLower = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 9v7" />
		<path d="M14 6v10" />
		<circle cx="17.5" cy="12.5" r="3.5" />
		<circle cx="6.5" cy="12.5" r="3.5" />
	</Base>
);
export const CaseSensitive = (p: IconProps) => (
	<Base {...p}>
		<path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" />
		<path d="M22 9v7" />
		<path d="M3.304 13h6.392" />
		<circle cx="18.5" cy="12.5" r="3.5" />
	</Base>
);
export const CaseUpper = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 11h4.5a1 1 0 0 1 0 5h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h3a1 1 0 0 1 0 5" />
		<path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" />
		<path d="M3.304 13h6.392" />
	</Base>
);
export const CassetteTape = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="16" x="2" y="4" rx="2" />
		<circle cx="8" cy="10" r="2" />
		<path d="M8 12h8" />
		<circle cx="16" cy="10" r="2" />
		<path d="m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3" />
	</Base>
);
export const Cast = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
		<path d="M2 12a9 9 0 0 1 8 8" />
		<path d="M2 16a5 5 0 0 1 4 4" />
		<line x1="2" x2="2.01" y1="20" y2="20" />
	</Base>
);
export const Castle = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 5V3" />
		<path d="M14 5V3" />
		<path d="M15 21v-3a3 3 0 0 0-6 0v3" />
		<path d="M18 3v8" />
		<path d="M18 5H6" />
		<path d="M22 11H2" />
		<path d="M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9" />
		<path d="M6 3v8" />
	</Base>
);
export const Cat = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
		<path d="M8 14v.5" />
		<path d="M16 14v.5" />
		<path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
	</Base>
);
export const Cctv = (p: IconProps) => (
	<Base {...p}>
		<path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" />
		<path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" />
		<path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" />
		<path d="M2 21v-4" />
		<path d="M7 9h.01" />
	</Base>
);
export const CctvOff = (p: IconProps) => (
	<Base {...p}>
		<path d="m12.309 6.652 4.797 2.401a1 1 0 0 1 .447 1.341l-.501 1.001.605.605h2.725a1 1 0 0 1 .894 1.447l-.724 1.448" />
		<path d="m15.166 15.166-.719 1.439a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.9 2.9 0 0 1 .873-1.037" />
		<path d="M2 19h3.76a2 2 0 0 0 1.8-1.1l1.441-2.902" />
		<path d="m2 2 20 20" />
		<path d="M2 21v-4" />
		<path d="M7 9h.01" />
	</Base>
);
export const ChartArea = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" />
	</Base>
);
export const ChartBar = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<path d="M7 16h8" />
		<path d="M7 11h12" />
		<path d="M7 6h3" />
	</Base>
);
export const ChartBarBig = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<rect x="7" y="13" width="9" height="4" rx="1" />
		<rect x="7" y="5" width="12" height="4" rx="1" />
	</Base>
);
export const ChartBarDecreasing = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<path d="M7 11h8" />
		<path d="M7 16h3" />
		<path d="M7 6h12" />
	</Base>
);
export const ChartBarIncreasing = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<path d="M7 11h8" />
		<path d="M7 16h12" />
		<path d="M7 6h3" />
	</Base>
);
export const ChartBarStacked = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 13v4" />
		<path d="M15 5v4" />
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<rect x="7" y="13" width="9" height="4" rx="1" />
		<rect x="7" y="5" width="12" height="4" rx="1" />
	</Base>
);
export const ChartCandlestick = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 5v4" />
		<rect width="4" height="6" x="7" y="9" rx="1" />
		<path d="M9 15v2" />
		<path d="M17 3v2" />
		<rect width="4" height="8" x="15" y="5" rx="1" />
		<path d="M17 13v3" />
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
	</Base>
);
export const ChartColumn = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<path d="M18 17V9" />
		<path d="M13 17V5" />
		<path d="M8 17v-3" />
	</Base>
);
export const ChartColumnBig = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<rect x="15" y="5" width="4" height="12" rx="1" />
		<rect x="7" y="8" width="4" height="9" rx="1" />
	</Base>
);
export const ChartColumnDecreasing = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 17V9" />
		<path d="M18 17v-3" />
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<path d="M8 17V5" />
	</Base>
);
export const ChartColumnIncreasing = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 17V9" />
		<path d="M18 17V5" />
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<path d="M8 17v-3" />
	</Base>
);
export const ChartColumnStacked = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 13H7" />
		<path d="M19 9h-4" />
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<rect x="15" y="5" width="4" height="12" rx="1" />
		<rect x="7" y="8" width="4" height="9" rx="1" />
	</Base>
);
export const ChartGantt = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 6h8" />
		<path d="M12 16h6" />
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<path d="M8 11h7" />
	</Base>
);
export const ChartLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<path d="m19 9-5 5-4-4-3 3" />
	</Base>
);
export const ChartNetwork = (p: IconProps) => (
	<Base {...p}>
		<path d="m13.11 7.664 1.78 2.672" />
		<path d="m14.162 12.788-3.324 1.424" />
		<path d="m20 4-6.06 1.515" />
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<circle cx="12" cy="6" r="2" />
		<circle cx="16" cy="12" r="2" />
		<circle cx="9" cy="15" r="2" />
	</Base>
);
export const ChartNoAxesColumn = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 21v-6" />
		<path d="M12 21V3" />
		<path d="M19 21V9" />
	</Base>
);
export const ChartNoAxesColumnDecreasing = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 21V3" />
		<path d="M12 21V9" />
		<path d="M19 21v-6" />
	</Base>
);
export const ChartNoAxesColumnIncreasing = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 21v-6" />
		<path d="M12 21V9" />
		<path d="M19 21V3" />
	</Base>
);
export const ChartNoAxesCombined = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 16v5" />
		<path d="M16 14.639V21" />
		<path d="M20 10.656V21" />
		<path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
		<path d="M4 18.463V21" />
		<path d="M8 14.656V21" />
	</Base>
);
export const ChartNoAxesGantt = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 5h12" />
		<path d="M4 12h10" />
		<path d="M12 19h8" />
	</Base>
);
export const ChartPie = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
		<path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
	</Base>
);
export const ChartScatter = (p: IconProps) => (
	<Base {...p}>
		<circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
		<circle cx="18.5" cy="5.5" r=".5" fill="currentColor" />
		<circle cx="11.5" cy="11.5" r=".5" fill="currentColor" />
		<circle cx="7.5" cy="16.5" r=".5" fill="currentColor" />
		<circle cx="17.5" cy="14.5" r=".5" fill="currentColor" />
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
	</Base>
);
export const ChartSpline = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 3v16a2 2 0 0 0 2 2h16" />
		<path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" />
	</Base>
);
export const CheckCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 6 7 17l-5-5" />
		<path d="m22 10-7.5 7.5L13 16" />
	</Base>
);
export const CheckLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 4L9 15" />
		<path d="M21 19L3 19" />
		<path d="M9 15L4 10" />
	</Base>
);
export const ChefHat = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
		<path d="M6 17h12" />
	</Base>
);
export const Cherry = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" />
		<path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" />
		<path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12" />
		<path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z" />
	</Base>
);
export const ChessBishop = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
		<path d="M15 18c1.5-.615 3-2.461 3-4.923C18 8.769 14.5 4.462 12 2 9.5 4.462 6 8.77 6 13.077 6 15.539 7.5 17.385 9 18" />
		<path d="m16 7-2.5 2.5" />
		<path d="M9 2h6" />
	</Base>
);
export const ChessKing = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
		<path d="m6.7 18-1-1C4.35 15.682 3 14.09 3 12a5 5 0 0 1 4.95-5c1.584 0 2.7.455 4.05 1.818C13.35 7.455 14.466 7 16.05 7A5 5 0 0 1 21 12c0 2.082-1.359 3.673-2.7 5l-1 1" />
		<path d="M10 4h4" />
		<path d="M12 2v6.818" />
	</Base>
);
export const ChessKnight = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
		<path d="M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456" />
		<path d="m15 5 1.425-1.425" />
		<path d="m17 8 1.53-1.53" />
		<path d="M9.713 12.185 7 18" />
	</Base>
);
export const ChessPawn = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
		<path d="m14.5 10 1.5 8" />
		<path d="M7 10h10" />
		<path d="m8 18 1.5-8" />
		<circle cx="12" cy="6" r="4" />
	</Base>
);
export const ChessQueen = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
		<path d="m12.474 5.943 1.567 5.34a1 1 0 0 0 1.75.328l2.616-3.402" />
		<path d="m20 9-3 9" />
		<path d="m5.594 8.209 2.615 3.403a1 1 0 0 0 1.75-.329l1.567-5.34" />
		<path d="M7 18 4 9" />
		<circle cx="12" cy="4" r="2" />
		<circle cx="20" cy="7" r="2" />
		<circle cx="4" cy="7" r="2" />
	</Base>
);
export const ChessRook = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
		<path d="M10 2v2" />
		<path d="M14 2v2" />
		<path d="m17 18-1-9" />
		<path d="M6 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2" />
		<path d="M6 4h12" />
		<path d="m7 18 1-9" />
	</Base>
);
export const ChevronFirst = (p: IconProps) => (
	<Base {...p}>
		<path d="m17 18-6-6 6-6" />
		<path d="M7 6v12" />
	</Base>
);
export const ChevronLast = (p: IconProps) => (
	<Base {...p}>
		<path d="m7 18 6-6-6-6" />
		<path d="M17 6v12" />
	</Base>
);
export const ChevronsDown = (p: IconProps) => (
	<Base {...p}>
		<path d="m7 6 5 5 5-5" />
		<path d="m7 13 5 5 5-5" />
	</Base>
);
export const ChevronsDownUp = (p: IconProps) => (
	<Base {...p}>
		<path d="m7 20 5-5 5 5" />
		<path d="m7 4 5 5 5-5" />
	</Base>
);
export const ChevronsLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="m11 17-5-5 5-5" />
		<path d="m18 17-5-5 5-5" />
	</Base>
);
export const ChevronsLeftRight = (p: IconProps) => (
	<Base {...p}>
		<path d="m9 7-5 5 5 5" />
		<path d="m15 7 5 5-5 5" />
	</Base>
);
export const ChevronsLeftRightEllipsis = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 12h.01" />
		<path d="M16 12h.01" />
		<path d="m17 7 5 5-5 5" />
		<path d="m7 7-5 5 5 5" />
		<path d="M8 12h.01" />
	</Base>
);
export const ChevronsRight = (p: IconProps) => (
	<Base {...p}>
		<path d="m6 17 5-5-5-5" />
		<path d="m13 17 5-5-5-5" />
	</Base>
);
export const ChevronsRightLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="m20 17-5-5 5-5" />
		<path d="m4 17 5-5-5-5" />
	</Base>
);
export const ChevronsUp = (p: IconProps) => (
	<Base {...p}>
		<path d="m17 11-5-5-5 5" />
		<path d="m17 18-5-5-5 5" />
	</Base>
);
export const ChevronsUpDown = (p: IconProps) => (
	<Base {...p}>
		<path d="m7 15 5 5 5-5" />
		<path d="m7 9 5-5 5 5" />
	</Base>
);
export const Church = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 9h4" />
		<path d="M12 7v5" />
		<path d="M14 21v-3a2 2 0 0 0-4 0v3" />
		<path d="m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9" />
		<path d="M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14" />
	</Base>
);
export const Cigarette = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14" />
		<path d="M18 8c0-2.5-2-2.5-2-5" />
		<path d="M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
		<path d="M22 8c0-2.5-2-2.5-2-5" />
		<path d="M7 12v4" />
	</Base>
);
export const CigaretteOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13" />
		<path d="M18 8c0-2.5-2-2.5-2-5" />
		<path d="m2 2 20 20" />
		<path d="M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866" />
		<path d="M22 8c0-2.5-2-2.5-2-5" />
		<path d="M7 12v4" />
	</Base>
);
export const Circle = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
	</Base>
);
export const CircleAlert = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<line x1="12" x2="12" y1="8" y2="12" />
		<line x1="12" x2="12.01" y1="16" y2="16" />
	</Base>
);
export const CircleArrowDown = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 8v8" />
		<path d="m8 12 4 4 4-4" />
	</Base>
);
export const CircleArrowLeft = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="m12 8-4 4 4 4" />
		<path d="M16 12H8" />
	</Base>
);
export const CircleArrowOutDownLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 12a10 10 0 1 1 10 10" />
		<path d="m2 22 10-10" />
		<path d="M8 22H2v-6" />
	</Base>
);
export const CircleArrowOutDownRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22a10 10 0 1 1 10-10" />
		<path d="M22 22 12 12" />
		<path d="M22 16v6h-6" />
	</Base>
);
export const CircleArrowOutUpLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 8V2h6" />
		<path d="m2 2 10 10" />
		<path d="M12 2A10 10 0 1 1 2 12" />
	</Base>
);
export const CircleArrowOutUpRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 12A10 10 0 1 1 12 2" />
		<path d="M22 2 12 12" />
		<path d="M16 2h6v6" />
	</Base>
);
export const CircleArrowRight = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="m12 16 4-4-4-4" />
		<path d="M8 12h8" />
	</Base>
);
export const CircleArrowUp = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="m16 12-4-4-4 4" />
		<path d="M12 16V8" />
	</Base>
);
export const CircleCheck = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="m9 12 2 2 4-4" />
	</Base>
);
export const CircleCheckBig = (p: IconProps) => (
	<Base {...p}>
		<path d="M21.801 10A10 10 0 1 1 17 3.335" />
		<path d="m9 11 3 3L22 4" />
	</Base>
);
export const CircleChevronDown = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="m16 10-4 4-4-4" />
	</Base>
);
export const CircleChevronLeft = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="m14 16-4-4 4-4" />
	</Base>
);
export const CircleChevronRight = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="m10 8 4 4-4 4" />
	</Base>
);
export const CircleChevronUp = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="m8 14 4-4 4 4" />
	</Base>
);
export const CircleDashed = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.1 2.182a10 10 0 0 1 3.8 0" />
		<path d="M13.9 21.818a10 10 0 0 1-3.8 0" />
		<path d="M17.609 3.721a10 10 0 0 1 2.69 2.7" />
		<path d="M2.182 13.9a10 10 0 0 1 0-3.8" />
		<path d="M20.279 17.609a10 10 0 0 1-2.7 2.69" />
		<path d="M21.818 10.1a10 10 0 0 1 0 3.8" />
		<path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" />
		<path d="M6.391 20.279a10 10 0 0 1-2.69-2.7" />
	</Base>
);
export const CircleDivide = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<line x1="8" x2="16" y1="12" y2="12" />
		<line x1="12" x2="12" y1="16" y2="16" />
		<line x1="12" x2="12" y1="8" y2="8" />
	</Base>
);
export const CircleDollarSign = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
		<path d="M12 18V6" />
	</Base>
);
export const CircleDot = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<circle cx="12" cy="12" r="1" />
	</Base>
);
export const CircleDotDashed = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.1 2.18a9.93 9.93 0 0 1 3.8 0" />
		<path d="M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7" />
		<path d="M21.82 10.1a9.93 9.93 0 0 1 0 3.8" />
		<path d="M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69" />
		<path d="M13.9 21.82a9.94 9.94 0 0 1-3.8 0" />
		<path d="M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7" />
		<path d="M2.18 13.9a9.93 9.93 0 0 1 0-3.8" />
		<path d="M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69" />
		<circle cx="12" cy="12" r="1" />
	</Base>
);
export const CircleEllipsis = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M17 12h.01" />
		<path d="M12 12h.01" />
		<path d="M7 12h.01" />
	</Base>
);
export const CircleEqual = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M7 10h10" />
		<path d="M7 14h10" />
	</Base>
);
export const CircleEuroSign = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 9.4a4 4 0 1 0 0 5.2" />
		<path d="M7 12h5" />
		<circle cx="12" cy="12" r="10" />
	</Base>
);
export const CircleFadingArrowUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2a10 10 0 0 1 7.38 16.75" />
		<path d="m16 12-4-4-4 4" />
		<path d="M12 16V8" />
		<path d="M2.5 8.875a10 10 0 0 0-.5 3" />
		<path d="M2.83 16a10 10 0 0 0 2.43 3.4" />
		<path d="M4.636 5.235a10 10 0 0 1 .891-.857" />
		<path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />
	</Base>
);
export const CircleFadingPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2a10 10 0 0 1 7.38 16.75" />
		<path d="M12 8v8" />
		<path d="M16 12H8" />
		<path d="M2.5 8.875a10 10 0 0 0-.5 3" />
		<path d="M2.83 16a10 10 0 0 0 2.43 3.4" />
		<path d="M4.636 5.235a10 10 0 0 1 .891-.857" />
		<path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />
	</Base>
);
export const CircleGauge = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
		<circle cx="12" cy="12" r="2" />
		<path d="M13.4 10.6 19 5" />
	</Base>
);
export const CircleMinus = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M8 12h8" />
	</Base>
);
export const CircleOff = (p: IconProps) => (
	<Base {...p}>
		<path d="m2 2 20 20" />
		<path d="M8.35 2.69A10 10 0 0 1 21.3 15.65" />
		<path d="M19.08 19.08A10 10 0 1 1 4.92 4.92" />
	</Base>
);
export const CircleParking = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
	</Base>
);
export const CircleParkingOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.656 7H13a3 3 0 0 1 2.984 3.307" />
		<path d="M13 13H9" />
		<path d="M19.071 19.071A1 1 0 0 1 4.93 4.93" />
		<path d="m2 2 20 20" />
		<path d="M8.357 2.687a10 10 0 0 1 12.956 12.956" />
		<path d="M9 17V9" />
	</Base>
);
export const CirclePause = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<line x1="10" x2="10" y1="15" y2="9" />
		<line x1="14" x2="14" y1="15" y2="9" />
	</Base>
);
export const CirclePercent = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="m15 9-6 6" />
		<path d="M9 9h.01" />
		<path d="M15 15h.01" />
	</Base>
);
export const CirclePile = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="19" r="2" />
		<circle cx="12" cy="5" r="2" />
		<circle cx="16" cy="12" r="2" />
		<circle cx="20" cy="19" r="2" />
		<circle cx="4" cy="19" r="2" />
		<circle cx="8" cy="12" r="2" />
	</Base>
);
export const CirclePlay = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" />
		<circle cx="12" cy="12" r="10" />
	</Base>
);
export const CirclePlus = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M8 12h8" />
		<path d="M12 8v8" />
	</Base>
);
export const CirclePoundSterling = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M10 16V9.5a1 1 0 0 1 5 0" />
		<path d="M8 12h4" />
		<path d="M8 16h7" />
	</Base>
);
export const CirclePower = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 7v4" />
		<path d="M7.998 9.003a5 5 0 1 0 8-.005" />
	</Base>
);
export const CircleQuestionMark = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
		<path d="M12 17h.01" />
	</Base>
);
export const CircleSlash = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<line x1="9" x2="15" y1="15" y2="9" />
	</Base>
);
export const CircleSlash2 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M22 2 2 22" />
	</Base>
);
export const CircleSmall = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="6" />
	</Base>
);
export const CircleStar = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
	</Base>
);
export const CircleStop = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<rect x="9" y="9" width="6" height="6" rx="1" />
	</Base>
);
export const CircleUser = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<circle cx="12" cy="10" r="3" />
		<path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
	</Base>
);
export const CircleUserRound = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.925 20.056a6 6 0 0 0-11.851.001" />
		<circle cx="12" cy="11" r="4" />
		<circle cx="12" cy="12" r="10" />
	</Base>
);
export const CircleX = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="m15 9-6 6" />
		<path d="m9 9 6 6" />
	</Base>
);
export const CircuitBoard = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M11 9h4a2 2 0 0 0 2-2V3" />
		<circle cx="9" cy="9" r="2" />
		<path d="M7 21v-4a2 2 0 0 1 2-2h4" />
		<circle cx="15" cy="15" r="2" />
	</Base>
);
export const Citrus = (p: IconProps) => (
	<Base {...p}>
		<path d="M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z" />
		<path d="M19.65 15.66A8 8 0 0 1 8.35 4.34" />
		<path d="m14 10-5.5 5.5" />
		<path d="M14 17.85V10H6.15" />
	</Base>
);
export const Clapperboard = (p: IconProps) => (
	<Base {...p}>
		<path d="m12.296 3.464 3.02 3.956" />
		<path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z" />
		<path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
		<path d="m6.18 5.276 3.1 3.899" />
	</Base>
);
export const Clipboard = (p: IconProps) => (
	<Base {...p}>
		<rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
		<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
	</Base>
);
export const ClipboardCheck = (p: IconProps) => (
	<Base {...p}>
		<rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
		<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
		<path d="m9 14 2 2 4-4" />
	</Base>
);
export const ClipboardClock = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 14v2.2l1.6 1" />
		<path d="M16 4h2a2 2 0 0 1 2 2v.832" />
		<path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" />
		<circle cx="16" cy="16" r="6" />
		<rect x="8" y="2" width="8" height="4" rx="1" />
	</Base>
);
export const ClipboardCopy = (p: IconProps) => (
	<Base {...p}>
		<rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
		<path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
		<path d="M16 4h2a2 2 0 0 1 2 2v4" />
		<path d="M21 14H11" />
		<path d="m15 10-4 4 4 4" />
	</Base>
);
export const ClipboardList = (p: IconProps) => (
	<Base {...p}>
		<rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
		<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
		<path d="M12 11h4" />
		<path d="M12 16h4" />
		<path d="M8 11h.01" />
		<path d="M8 16h.01" />
	</Base>
);
export const ClipboardMinus = (p: IconProps) => (
	<Base {...p}>
		<rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
		<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
		<path d="M9 14h6" />
	</Base>
);
export const ClipboardPaste = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 14h10" />
		<path d="M16 4h2a2 2 0 0 1 2 2v1.344" />
		<path d="m17 18 4-4-4-4" />
		<path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113" />
		<rect x="8" y="2" width="8" height="4" rx="1" />
	</Base>
);
export const ClipboardPen = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 4h2a2 2 0 0 1 2 2v2" />
		<path d="M21.34 15.664a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
		<path d="M8 22H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
		<rect x="8" y="2" width="8" height="4" rx="1" />
	</Base>
);
export const ClipboardPenLine = (p: IconProps) => (
	<Base {...p}>
		<rect width="8" height="4" x="8" y="2" rx="1" />
		<path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" />
		<path d="M16 4h2a2 2 0 0 1 1.73 1" />
		<path d="M8 18h1" />
		<path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
	</Base>
);
export const ClipboardPlus = (p: IconProps) => (
	<Base {...p}>
		<rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
		<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
		<path d="M9 14h6" />
		<path d="M12 17v-6" />
	</Base>
);
export const ClipboardType = (p: IconProps) => (
	<Base {...p}>
		<rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
		<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
		<path d="M9 12v-1h6v1" />
		<path d="M11 17h2" />
		<path d="M12 11v6" />
	</Base>
);
export const ClipboardX = (p: IconProps) => (
	<Base {...p}>
		<rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
		<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
		<path d="m15 11-6 6" />
		<path d="m9 11 6 6" />
	</Base>
);
export const Clock1 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 6v6l2-4" />
	</Base>
);
export const Clock10 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 6v6l-4-2" />
	</Base>
);
export const Clock11 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 6v6l-2-4" />
	</Base>
);
export const Clock12 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 6v6" />
	</Base>
);
export const Clock2 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 6v6l4-2" />
	</Base>
);
export const Clock3 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 6v6h4" />
	</Base>
);
export const Clock4 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 6v6l4 2" />
	</Base>
);
export const Clock5 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 6v6l2 4" />
	</Base>
);
export const Clock6 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 6v10" />
	</Base>
);
export const Clock7 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 6v6l-2 4" />
	</Base>
);
export const Clock8 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 6v6l-4 2" />
	</Base>
);
export const Clock9 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 6v6H8" />
	</Base>
);
export const ClockAlert = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6v6l4 2" />
		<path d="M20 12v5" />
		<path d="M20 21h.01" />
		<path d="M21.25 8.2A10 10 0 1 0 16 21.16" />
	</Base>
);
export const ClockArrowDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6v6l2 1" />
		<path d="M12.337 21.994a10 10 0 1 1 9.588-8.767" />
		<path d="m14 18 4 4 4-4" />
		<path d="M18 14v8" />
	</Base>
);
export const ClockArrowLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6v6l1.5.8" />
		<path d="M12.338 21.994a10 10 0 1 1 9.587-8.767" />
		<path d="M14 18h8" />
		<path d="m18 22-4-4 4-4" />
	</Base>
);
export const ClockArrowRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6v6l2 1" />
		<path d="M13.5 21.885A10 10 0 1 1 22 12" />
		<path d="M14 18h8" />
		<path d="m18 22 4-4-4-4" />
	</Base>
);
export const ClockArrowUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6v6l1.56.78" />
		<path d="M13.227 21.925a10 10 0 1 1 8.767-9.588" />
		<path d="m14 18 4-4 4 4" />
		<path d="M18 22v-8" />
	</Base>
);
export const ClockCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6v6l4 2" />
		<path d="M22 12a10 10 0 1 0-11 9.95" />
		<path d="m22 16-5.5 5.5L14 19" />
	</Base>
);
export const ClockFading = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2a10 10 0 0 1 7.38 16.75" />
		<path d="M12 6v6l4 2" />
		<path d="M2.5 8.875a10 10 0 0 0-.5 3" />
		<path d="M2.83 16a10 10 0 0 0 2.43 3.4" />
		<path d="M4.636 5.235a10 10 0 0 1 .891-.857" />
		<path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />
	</Base>
);
export const ClockPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6v6l3.644 1.822" />
		<path d="M16 19h6" />
		<path d="M19 16v6" />
		<path d="M21.92 13.267a10 10 0 1 0-8.653 8.653" />
	</Base>
);
export const ClosedCaption = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 9.17a3 3 0 1 0 0 5.66" />
		<path d="M17 9.17a3 3 0 1 0 0 5.66" />
		<rect x="2" y="5" width="20" height="14" rx="2" />
	</Base>
);
export const Cloud = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
	</Base>
);
export const CloudAlert = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 12v4" />
		<path d="M12 20h.01" />
		<path d="M8.128 16.949A7 7 0 1 1 15.71 8h1.79a1 1 0 0 1 0 9h-1.642" />
	</Base>
);
export const CloudBackup = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 15.251A4.5 4.5 0 0 0 17.5 8h-1.79A7 7 0 1 0 3 13.607" />
		<path d="M7 11v4h4" />
		<path d="M8 19a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5 4.82 4.82 0 0 0-3.41 1.41L7 15" />
	</Base>
);
export const CloudCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="m17 15-5.5 5.5L9 18" />
		<path d="M5.516 16.07A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 3.501 7.327" />
	</Base>
);
export const CloudCog = (p: IconProps) => (
	<Base {...p}>
		<path d="m10.852 19.772-.383.924" />
		<path d="m13.148 14.228.383-.923" />
		<path d="M13.148 19.772a3 3 0 1 0-2.296-5.544l-.383-.923" />
		<path d="m13.53 20.696-.382-.924a3 3 0 1 1-2.296-5.544" />
		<path d="m14.772 15.852.923-.383" />
		<path d="m14.772 18.148.923.383" />
		<path d="M4.2 15.1a7 7 0 1 1 9.93-9.858A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2" />
		<path d="m9.228 15.852-.923-.383" />
		<path d="m9.228 18.148-.923.383" />
	</Base>
);
export const CloudDownload = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 13v8l-4-4" />
		<path d="m12 21 4-4" />
		<path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" />
	</Base>
);
export const CloudDrizzle = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
		<path d="M8 19v1" />
		<path d="M8 14v1" />
		<path d="M16 19v1" />
		<path d="M16 14v1" />
		<path d="M12 21v1" />
		<path d="M12 16v1" />
	</Base>
);
export const CloudFog = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
		<path d="M16 17H7" />
		<path d="M17 21H9" />
	</Base>
);
export const CloudHail = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
		<path d="M16 14v2" />
		<path d="M8 14v2" />
		<path d="M16 20h.01" />
		<path d="M8 20h.01" />
		<path d="M12 16v2" />
		<path d="M12 22h.01" />
	</Base>
);
export const CloudLightning = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
		<path d="m13 12-3 5h4l-3 5" />
	</Base>
);
export const CloudMoon = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z" />
		<path d="M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36" />
	</Base>
);
export const CloudMoonRain = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 20v2" />
		<path d="M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36" />
		<path d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24" />
		<path d="M7 19v2" />
	</Base>
);
export const CloudOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057" />
		<path d="M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78" />
		<path d="m2 2 20 20" />
	</Base>
);
export const CloudRain = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
		<path d="M16 14v6" />
		<path d="M8 14v6" />
		<path d="M12 16v6" />
	</Base>
);
export const CloudRainWind = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
		<path d="m9.2 22 3-7" />
		<path d="m9 13-3 7" />
		<path d="m17 13-3 7" />
	</Base>
);
export const CloudSnow = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
		<path d="M8 15h.01" />
		<path d="M8 19h.01" />
		<path d="M12 17h.01" />
		<path d="M12 21h.01" />
		<path d="M16 15h.01" />
		<path d="M16 19h.01" />
	</Base>
);
export const CloudSun = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v2" />
		<path d="m4.93 4.93 1.41 1.41" />
		<path d="M20 12h2" />
		<path d="m19.07 4.93-1.41 1.41" />
		<path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
		<path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
	</Base>
);
export const CloudSunRain = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v2" />
		<path d="m4.93 4.93 1.41 1.41" />
		<path d="M20 12h2" />
		<path d="m19.07 4.93-1.41 1.41" />
		<path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
		<path d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24" />
		<path d="M11 20v2" />
		<path d="M7 19v2" />
	</Base>
);
export const CloudSync = (p: IconProps) => (
	<Base {...p}>
		<path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5" />
		<path d="M17 22v-4h-4" />
		<path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607" />
		<path d="M7 10v4h4" />
		<path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5" />
	</Base>
);
export const CloudUpload = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 13v8" />
		<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
		<path d="m8 17 4-4 4 4" />
	</Base>
);
export const Cloudy = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z" />
		<path d="M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61" />
	</Base>
);
export const Clover = (p: IconProps) => (
	<Base {...p}>
		<path d="M16.17 7.83 2 22" />
		<path d="M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12" />
		<path d="m7.83 7.83 8.34 8.34" />
	</Base>
);
export const Club = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z" />
		<path d="M12 17.66L12 22" />
	</Base>
);
export const Code = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 18 6-6-6-6" />
		<path d="m8 6-6 6 6 6" />
	</Base>
);
export const CodeXml = (p: IconProps) => (
	<Base {...p}>
		<path d="m18 16 4-4-4-4" />
		<path d="m6 8-4 4 4 4" />
		<path d="m14.5 4-5 16" />
	</Base>
);
export const Coffee = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 2v2" />
		<path d="M14 2v2" />
		<path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
		<path d="M6 2v2" />
	</Base>
);
export const Cog = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 10.27 7 3.34" />
		<path d="m11 13.73-4 6.93" />
		<path d="M12 22v-2" />
		<path d="M12 2v2" />
		<path d="M14 12h8" />
		<path d="m17 20.66-1-1.73" />
		<path d="m17 3.34-1 1.73" />
		<path d="M2 12h2" />
		<path d="m20.66 17-1.73-1" />
		<path d="m20.66 7-1.73 1" />
		<path d="m3.34 17 1.73-1" />
		<path d="m3.34 7 1.73 1" />
		<circle cx="12" cy="12" r="2" />
		<circle cx="12" cy="12" r="8" />
	</Base>
);
export const Coins = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.744 17.736a6 6 0 1 1-7.48-7.48" />
		<path d="M15 6h1v4" />
		<path d="m6.134 14.768.866-.5 2 3.464" />
		<circle cx="16" cy="8" r="6" />
	</Base>
);
export const Columns2 = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M12 3v18" />
	</Base>
);
export const Columns3 = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M9 3v18" />
		<path d="M15 3v18" />
	</Base>
);
export const Columns3Cog = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5" />
		<path d="m14.3 19.6 1-.4" />
		<path d="M15 3v7.5" />
		<path d="m15.2 16.9-.9-.3" />
		<path d="m16.6 21.7.3-.9" />
		<path d="m16.8 15.3-.4-1" />
		<path d="m19.1 15.2.3-.9" />
		<path d="m19.6 21.7-.4-1" />
		<path d="m20.7 16.8 1-.4" />
		<path d="m21.7 19.4-.9-.3" />
		<path d="M9 3v18" />
		<circle cx="18" cy="18" r="3" />
	</Base>
);
export const Columns4 = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M7.5 3v18" />
		<path d="M12 3v18" />
		<path d="M16.5 3v18" />
	</Base>
);
export const Combine = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" />
		<path d="M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" />
		<path d="m7 15 3 3" />
		<path d="m7 21 3-3H5a2 2 0 0 1-2-2v-2" />
		<rect x="14" y="14" width="7" height="7" rx="1" />
		<rect x="3" y="3" width="7" height="7" rx="1" />
	</Base>
);
export const Command = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
	</Base>
);
export const Component = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z" />
		<path d="M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z" />
		<path d="M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z" />
		<path d="M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z" />
	</Base>
);
export const Computer = (p: IconProps) => (
	<Base {...p}>
		<rect width="14" height="8" x="5" y="2" rx="2" />
		<rect width="20" height="8" x="2" y="14" rx="2" />
		<path d="M6 18h2" />
		<path d="M12 18h6" />
	</Base>
);
export const ConciergeBell = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z" />
		<path d="M20 16a8 8 0 1 0-16 0" />
		<path d="M12 4v4" />
		<path d="M10 4h4" />
	</Base>
);
export const Cone = (p: IconProps) => (
	<Base {...p}>
		<path d="m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98" />
		<ellipse cx="12" cy="19" rx="9" ry="3" />
	</Base>
);
export const Construction = (p: IconProps) => (
	<Base {...p}>
		<rect x="2" y="6" width="20" height="8" rx="1" />
		<path d="M17 14v7" />
		<path d="M7 14v7" />
		<path d="M17 3v3" />
		<path d="M7 3v3" />
		<path d="M10 14 2.3 6.3" />
		<path d="m14 6 7.7 7.7" />
		<path d="m8 6 8 8" />
	</Base>
);
export const Contact = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 2v2" />
		<path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
		<path d="M8 2v2" />
		<circle cx="12" cy="11" r="3" />
		<rect x="3" y="4" width="18" height="18" rx="2" />
	</Base>
);
export const ContactRound = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 2v2" />
		<path d="M17.915 22a6 6 0 0 0-12 0" />
		<path d="M8 2v2" />
		<circle cx="12" cy="12" r="4" />
		<rect x="3" y="4" width="18" height="18" rx="2" />
	</Base>
);
export const Container = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z" />
		<path d="M10 21.9V14L2.1 9.1" />
		<path d="m10 14 11.9-6.9" />
		<path d="M14 19.8v-8.1" />
		<path d="M18 17.5V9.4" />
	</Base>
);
export const Contrast = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 18a6 6 0 0 0 0-12v12z" />
	</Base>
);
export const Cookie = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
		<path d="M8.5 8.5v.01" />
		<path d="M16 15.5v.01" />
		<path d="M12 12v.01" />
		<path d="M11 17v.01" />
		<path d="M7 14v.01" />
	</Base>
);
export const CookingPot = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 12h20" />
		<path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
		<path d="m4 8 16-4" />
		<path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" />
	</Base>
);
export const CopyCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="m12 15 2 2 4-4" />
		<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
		<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
	</Base>
);
export const CopyMinus = (p: IconProps) => (
	<Base {...p}>
		<line x1="12" x2="18" y1="15" y2="15" />
		<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
		<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
	</Base>
);
export const CopyPlus = (p: IconProps) => (
	<Base {...p}>
		<line x1="15" x2="15" y1="12" y2="18" />
		<line x1="12" x2="18" y1="15" y2="15" />
		<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
		<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
	</Base>
);
export const CopySlash = (p: IconProps) => (
	<Base {...p}>
		<line x1="12" x2="18" y1="18" y2="12" />
		<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
		<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
	</Base>
);
export const CopyX = (p: IconProps) => (
	<Base {...p}>
		<line x1="12" x2="18" y1="12" y2="18" />
		<line x1="12" x2="18" y1="18" y2="12" />
		<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
		<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
	</Base>
);
export const Copyleft = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M9.17 14.83a4 4 0 1 0 0-5.66" />
	</Base>
);
export const Copyright = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
	</Base>
);
export const CornerDownLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 4v7a4 4 0 0 1-4 4H4" />
		<path d="m9 10-5 5 5 5" />
	</Base>
);
export const CornerDownRight = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 10 5 5-5 5" />
		<path d="M4 4v7a4 4 0 0 0 4 4h12" />
	</Base>
);
export const CornerLeftDown = (p: IconProps) => (
	<Base {...p}>
		<path d="m14 15-5 5-5-5" />
		<path d="M20 4h-7a4 4 0 0 0-4 4v12" />
	</Base>
);
export const CornerLeftUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 9 9 4 4 9" />
		<path d="M20 20h-7a4 4 0 0 1-4-4V4" />
	</Base>
);
export const CornerRightDown = (p: IconProps) => (
	<Base {...p}>
		<path d="m10 15 5 5 5-5" />
		<path d="M4 4h7a4 4 0 0 1 4 4v12" />
	</Base>
);
export const CornerRightUp = (p: IconProps) => (
	<Base {...p}>
		<path d="m10 9 5-5 5 5" />
		<path d="M4 20h7a4 4 0 0 0 4-4V4" />
	</Base>
);
export const CornerUpLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 20v-7a4 4 0 0 0-4-4H4" />
		<path d="M9 14 4 9l5-5" />
	</Base>
);
export const CornerUpRight = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 14 5-5-5-5" />
		<path d="M4 20v-7a4 4 0 0 1 4-4h12" />
	</Base>
);
export const Cpu = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 20v2" />
		<path d="M12 2v2" />
		<path d="M17 20v2" />
		<path d="M17 2v2" />
		<path d="M2 12h2" />
		<path d="M2 17h2" />
		<path d="M2 7h2" />
		<path d="M20 12h2" />
		<path d="M20 17h2" />
		<path d="M20 7h2" />
		<path d="M7 20v2" />
		<path d="M7 2v2" />
		<rect x="4" y="4" width="16" height="16" rx="2" />
		<rect x="8" y="8" width="8" height="8" rx="1" />
	</Base>
);
export const CreativeCommons = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1" />
		<path d="M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1" />
	</Base>
);
export const CreditCard = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="14" x="2" y="5" rx="2" />
		<line x1="2" x2="22" y1="10" y2="10" />
	</Base>
);
export const Croissant = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487" />
		<path d="M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132" />
		<path d="M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42" />
		<path d="M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14" />
		<path d="M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676" />
	</Base>
);
export const Crop = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 2v14a2 2 0 0 0 2 2h14" />
		<path d="M18 22V8a2 2 0 0 0-2-2H2" />
	</Base>
);
export const Cross = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z" />
	</Base>
);
export const Crosshair = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<line x1="22" x2="18" y1="12" y2="12" />
		<line x1="6" x2="2" y1="12" y2="12" />
		<line x1="12" x2="12" y1="6" y2="2" />
		<line x1="12" x2="12" y1="22" y2="18" />
	</Base>
);
export const Crown = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
		<path d="M5 21h14" />
	</Base>
);
export const Cuboid = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 22v-8" />
		<path d="M2.336 8.89 10 14l11.715-7.029" />
		<path d="M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z" />
	</Base>
);
export const CupSoda = (p: IconProps) => (
	<Base {...p}>
		<path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" />
		<path d="M5 8h14" />
		<path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
		<path d="m12 8 1-6h2" />
	</Base>
);
export const Currency = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="8" />
		<line x1="3" x2="6" y1="3" y2="6" />
		<line x1="21" x2="18" y1="3" y2="6" />
		<line x1="3" x2="6" y1="21" y2="18" />
		<line x1="21" x2="18" y1="21" y2="18" />
	</Base>
);
export const Cylinder = (p: IconProps) => (
	<Base {...p}>
		<ellipse cx="12" cy="5" rx="9" ry="3" />
		<path d="M3 5v14a9 3 0 0 0 18 0V5" />
	</Base>
);
export const Dam = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
		<path d="M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
		<path d="M2 10h4" />
		<path d="M2 14h4" />
		<path d="M2 18h4" />
		<path d="M2 6h4" />
		<path d="M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z" />
	</Base>
);
export const DatabaseArrowDown = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 19 3 3 3-3" />
		<path d="M19 16v6" />
		<path d="M21 12.536V5" />
		<path d="M3 12A9 3 0 0 0 15.182 14.806" />
		<path d="M3 5V19A9 3 0 0 0 13.318 21.968" />
		<ellipse cx="12" cy="5" rx="9" ry="3" />
	</Base>
);
export const DatabaseArrowUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 22v-6" />
		<path d="M21 12.536V5" />
		<path d="m22 19-3-3-3 3" />
		<path d="M3 12A9 3 0 0 0 14.457 14.886" />
		<path d="M3 5V19A9 3 0 0 0 13.318 21.968" />
		<ellipse cx="12" cy="5" rx="9" ry="3" />
	</Base>
);
export const DatabaseBackup = (p: IconProps) => (
	<Base {...p}>
		<ellipse cx="12" cy="5" rx="9" ry="3" />
		<path d="M3 12a9 3 0 0 0 5 2.69" />
		<path d="M21 9.3V5" />
		<path d="M3 5v14a9 3 0 0 0 6.47 2.88" />
		<path d="M12 12v4h4" />
		<path d="M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16" />
	</Base>
);
export const DatabaseCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 19 2 2 4-4" />
		<path d="M21 13.127V5" />
		<path d="M3 12A9 3 0 0 0 21 12" />
		<path d="M3 5V19A9 3 0 0 0 13.318 21.968" />
		<ellipse cx="12" cy="5" rx="9" ry="3" />
	</Base>
);
export const DatabaseMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 15V5" />
		<path d="M22 19h-6" />
		<path d="M3 12A9 3 0 0 0 21 12" />
		<path d="M3 5V19A9 3 0 0 0 13.318 21.968" />
		<ellipse cx="12" cy="5" rx="9" ry="3" />
	</Base>
);
export const DatabasePlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 16v6" />
		<path d="M21 12.536V5" />
		<path d="M22 19h-6" />
		<path d="M3 12A9 3 0 0 0 15.1824 14.8061" />
		<path d="M3 5V19A9 3 0 0 0 13.318 21.968" />
		<ellipse cx="12" cy="5" rx="9" ry="3" />
	</Base>
);
export const DatabaseSearch = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 11.693V5" />
		<path d="m22 22-1.875-1.875" />
		<path d="M3 12a9 3 0 0 0 8.697 2.998" />
		<path d="M3 5v14a9 3 0 0 0 9.28 2.999" />
		<circle cx="18" cy="18" r="3" />
		<ellipse cx="12" cy="5" rx="9" ry="3" />
	</Base>
);
export const DatabaseX = (p: IconProps) => (
	<Base {...p}>
		<path d="m17 17 5 5" />
		<path d="M19.323 13.744A9 3 0 0 0 21 12" />
		<path d="M21 13.127V5" />
		<path d="m22 17-5 5" />
		<path d="M3 12A9 3 0 0 0 13.563 14.954" />
		<path d="M3 5V19A9 3 0 0 0 13 21.981" />
		<ellipse cx="12" cy="5" rx="9" ry="3" />
	</Base>
);
export const DatabaseZap = (p: IconProps) => (
	<Base {...p}>
		<ellipse cx="12" cy="5" rx="9" ry="3" />
		<path d="M3 5V19A9 3 0 0 0 15 21.84" />
		<path d="M21 5V8" />
		<path d="M21 12L18 17H22L19 22" />
		<path d="M3 12A9 3 0 0 0 14.59 14.87" />
	</Base>
);
export const DecimalsArrowLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="m13 21-3-3 3-3" />
		<path d="M20 18H10" />
		<path d="M3 11h.01" />
		<rect x="6" y="3" width="5" height="8" rx="2.5" />
	</Base>
);
export const DecimalsArrowRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 18h10" />
		<path d="m17 21 3-3-3-3" />
		<path d="M3 11h.01" />
		<rect x="15" y="3" width="5" height="8" rx="2.5" />
		<rect x="6" y="3" width="5" height="8" rx="2.5" />
	</Base>
);
export const Delete = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
		<path d="m12 9 6 6" />
		<path d="m18 9-6 6" />
	</Base>
);
export const Dessert = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826" />
		<path d="M20.804 14.869a9 9 0 0 1-17.608 0" />
		<circle cx="12" cy="4" r="2" />
	</Base>
);
export const Diameter = (p: IconProps) => (
	<Base {...p}>
		<circle cx="19" cy="19" r="2" />
		<circle cx="5" cy="5" r="2" />
		<path d="M6.48 3.66a10 10 0 0 1 13.86 13.86" />
		<path d="m6.41 6.41 11.18 11.18" />
		<path d="M3.66 6.48a10 10 0 0 0 13.86 13.86" />
	</Base>
);
export const Diamond = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
	</Base>
);
export const DiamondMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" />
		<path d="M8 12h8" />
	</Base>
);
export const DiamondPercent = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z" />
		<path d="M9.2 9.2h.01" />
		<path d="m14.5 9.5-5 5" />
		<path d="M14.7 14.8h.01" />
	</Base>
);
export const DiamondPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 8v8" />
		<path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" />
		<path d="M8 12h8" />
	</Base>
);
export const Dice1 = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
		<path d="M12 12h.01" />
	</Base>
);
export const Dice2 = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
		<path d="M15 9h.01" />
		<path d="M9 15h.01" />
	</Base>
);
export const Dice3 = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
		<path d="M16 8h.01" />
		<path d="M12 12h.01" />
		<path d="M8 16h.01" />
	</Base>
);
export const Dice4 = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
		<path d="M16 8h.01" />
		<path d="M8 8h.01" />
		<path d="M8 16h.01" />
		<path d="M16 16h.01" />
	</Base>
);
export const Dice5 = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
		<path d="M16 8h.01" />
		<path d="M8 8h.01" />
		<path d="M8 16h.01" />
		<path d="M16 16h.01" />
		<path d="M12 12h.01" />
	</Base>
);
export const Dice6 = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
		<path d="M16 8h.01" />
		<path d="M16 12h.01" />
		<path d="M16 16h.01" />
		<path d="M8 8h.01" />
		<path d="M8 12h.01" />
		<path d="M8 16h.01" />
	</Base>
);
export const Dices = (p: IconProps) => (
	<Base {...p}>
		<rect width="12" height="12" x="2" y="10" rx="2" ry="2" />
		<path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" />
		<path d="M6 18h.01" />
		<path d="M10 14h.01" />
		<path d="M15 6h.01" />
		<path d="M18 9h.01" />
	</Base>
);
export const Diff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3v14" />
		<path d="M5 10h14" />
		<path d="M5 21h14" />
	</Base>
);
export const Disc = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<circle cx="12" cy="12" r="2" />
	</Base>
);
export const Disc2 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<circle cx="12" cy="12" r="4" />
		<path d="M12 12h.01" />
	</Base>
);
export const Disc3 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M6 12c0-1.7.7-3.2 1.8-4.2" />
		<circle cx="12" cy="12" r="2" />
		<path d="M18 12c0 1.7-.7 3.2-1.8 4.2" />
	</Base>
);
export const DiscAlbum = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<circle cx="12" cy="12" r="5" />
		<path d="M12 12h.01" />
	</Base>
);
export const Divide = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="6" r="1" />
		<line x1="5" x2="19" y1="12" y2="12" />
		<circle cx="12" cy="18" r="1" />
	</Base>
);
export const Dna = (p: IconProps) => (
	<Base {...p}>
		<path d="m10 16 1.5 1.5" />
		<path d="m14 8-1.5-1.5" />
		<path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
		<path d="m16.5 10.5 1 1" />
		<path d="m17 6-2.891-2.891" />
		<path d="M2 15c6.667-6 13.333 0 20-6" />
		<path d="m20 9 .891.891" />
		<path d="M3.109 14.109 4 15" />
		<path d="m6.5 12.5 1 1" />
		<path d="m7 18 2.891 2.891" />
		<path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
	</Base>
);
export const DnaOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8" />
		<path d="m17 6-2.891-2.891" />
		<path d="M2 15c3.333-3 6.667-3 10-3" />
		<path d="m2 2 20 20" />
		<path d="m20 9 .891.891" />
		<path d="M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1" />
		<path d="M3.109 14.109 4 15" />
		<path d="m6.5 12.5 1 1" />
		<path d="m7 18 2.891 2.891" />
		<path d="M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16" />
	</Base>
);
export const Dock = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 8h20" />
		<rect width="20" height="16" x="2" y="4" rx="2" />
		<path d="M6 16h12" />
	</Base>
);
export const Dog = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.25 16.25h1.5L12 17z" />
		<path d="M16 14v.5" />
		<path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309" />
		<path d="M8 14v.5" />
		<path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
	</Base>
);
export const DollarSign = (p: IconProps) => (
	<Base {...p}>
		<line x1="12" x2="12" y1="2" y2="22" />
		<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
	</Base>
);
export const Donut = (p: IconProps) => (
	<Base {...p}>
		<path d="M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3" />
		<circle cx="12" cy="12" r="3" />
	</Base>
);
export const DoorClosed = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 12h.01" />
		<path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
		<path d="M2 20h20" />
	</Base>
);
export const DoorClosedLocked = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 12h.01" />
		<path d="M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
		<path d="M2 20h8" />
		<path d="M20 17v-2a2 2 0 1 0-4 0v2" />
		<rect x="14" y="17" width="8" height="5" rx="1" />
	</Base>
);
export const DoorOpen = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 20H2" />
		<path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z" />
		<path d="M11 4H8a2 2 0 0 0-2 2v14" />
		<path d="M14 12h.01" />
		<path d="M22 20h-3" />
	</Base>
);
export const Dot = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="1" />
	</Base>
);
export const DraftingCompass = (p: IconProps) => (
	<Base {...p}>
		<path d="m12.99 6.74 1.93 3.44" />
		<path d="M19.136 12a10 10 0 0 1-14.271 0" />
		<path d="m21 21-2.16-3.84" />
		<path d="m3 21 8.02-14.26" />
		<circle cx="12" cy="5" r="2" />
	</Base>
);
export const Drama = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 11h.01" />
		<path d="M14 6h.01" />
		<path d="M18 6h.01" />
		<path d="M6.5 13.1h.01" />
		<path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3" />
		<path d="M17.4 9.9c-.8.8-2 .8-2.8 0" />
		<path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7" />
		<path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4" />
	</Base>
);
export const Drill = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z" />
		<path d="M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8" />
		<path d="M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3" />
		<path d="M18 6h4" />
		<path d="m5 10-2 8" />
		<path d="m7 18 2-8" />
	</Base>
);
export const Drone = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 10 7 7" />
		<path d="m10 14-3 3" />
		<path d="m14 10 3-3" />
		<path d="m14 14 3 3" />
		<path d="M14.205 4.139a4 4 0 1 1 5.439 5.863" />
		<path d="M19.637 14a4 4 0 1 1-5.432 5.868" />
		<path d="M4.367 10a4 4 0 1 1 5.438-5.862" />
		<path d="M9.795 19.862a4 4 0 1 1-5.429-5.873" />
		<rect x="10" y="8" width="4" height="8" rx="1" />
	</Base>
);
export const Droplet = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
	</Base>
);
export const DropletOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M18.715 13.186C18.29 11.858 17.384 10.607 16 9.5c-2-1.6-3.5-4-4-6.5a10.7 10.7 0 0 1-.884 2.586" />
		<path d="m2 2 20 20" />
		<path d="M8.795 8.797A11 11 0 0 1 8 9.5C6 11.1 5 13 5 15a7 7 0 0 0 13.222 3.208" />
	</Base>
);
export const Droplets = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
		<path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
	</Base>
);
export const Drum = (p: IconProps) => (
	<Base {...p}>
		<path d="m2 2 8 8" />
		<path d="m22 2-8 8" />
		<ellipse cx="12" cy="9" rx="10" ry="5" />
		<path d="M7 13.4v7.9" />
		<path d="M12 14v8" />
		<path d="M17 13.4v7.9" />
		<path d="M2 9v8a10 5 0 0 0 20 0V9" />
	</Base>
);
export const Drumstick = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23" />
		<path d="m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59" />
	</Base>
);
export const Dumbbell = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
		<path d="m2.5 21.5 1.4-1.4" />
		<path d="m20.1 3.9 1.4-1.4" />
		<path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
		<path d="m9.6 14.4 4.8-4.8" />
	</Base>
);
export const Ear = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" />
		<path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" />
	</Base>
);
export const EarOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46" />
		<path d="M6 8.5c0-.75.13-1.47.36-2.14" />
		<path d="M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76" />
		<path d="M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18" />
		<line x1="2" x2="22" y1="2" y2="22" />
	</Base>
);
export const Earth = (p: IconProps) => (
	<Base {...p}>
		<path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
		<path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
		<path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
		<circle cx="12" cy="12" r="10" />
	</Base>
);
export const EarthLock = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 3.34V5a3 3 0 0 0 3 3" />
		<path d="M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
		<path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
		<path d="M12 2a10 10 0 1 0 9.54 13" />
		<path d="M20 6V4a2 2 0 1 0-4 0v2" />
		<rect width="8" height="5" x="14" y="6" rx="1" />
	</Base>
);
export const Eclipse = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 2a7 7 0 1 0 10 10" />
	</Base>
);
export const Egg = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12" />
	</Base>
);
export const EggFried = (p: IconProps) => (
	<Base {...p}>
		<circle cx="11.5" cy="12.5" r="3.5" />
		<path d="M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z" />
	</Base>
);
export const EggOff = (p: IconProps) => (
	<Base {...p}>
		<path d="m2 2 20 20" />
		<path d="M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19" />
		<path d="M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568" />
	</Base>
);
export const Ellipse = (p: IconProps) => (
	<Base {...p}>
		<ellipse cx="12" cy="12" rx="10" ry="6" />
	</Base>
);
export const Ellipsis = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="1" />
		<circle cx="19" cy="12" r="1" />
		<circle cx="5" cy="12" r="1" />
	</Base>
);
export const EllipsisVertical = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="1" />
		<circle cx="12" cy="5" r="1" />
		<circle cx="12" cy="19" r="1" />
	</Base>
);
export const Equal = (p: IconProps) => (
	<Base {...p}>
		<line x1="5" x2="19" y1="9" y2="9" />
		<line x1="5" x2="19" y1="15" y2="15" />
	</Base>
);
export const EqualApproximately = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0" />
		<path d="M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0" />
	</Base>
);
export const EqualNot = (p: IconProps) => (
	<Base {...p}>
		<line x1="5" x2="19" y1="9" y2="9" />
		<line x1="5" x2="19" y1="15" y2="15" />
		<line x1="19" x2="5" y1="5" y2="19" />
	</Base>
);
export const Eraser = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21" />
		<path d="m5.082 11.09 8.828 8.828" />
	</Base>
);
export const EthernetPort = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 20 3-3h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2l3 3z" />
		<path d="M6 8v1" />
		<path d="M10 8v1" />
		<path d="M14 8v1" />
		<path d="M18 8v1" />
	</Base>
);
export const Euro = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 10h12" />
		<path d="M4 14h9" />
		<path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
	</Base>
);
export const EvCharger = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5" />
		<path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16" />
		<path d="M2 21h13" />
		<path d="M3 7h11" />
		<path d="m9 11-2 3h3l-2 3" />
	</Base>
);
export const Expand = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 15 6 6" />
		<path d="m15 9 6-6" />
		<path d="M21 16v5h-5" />
		<path d="M21 8V3h-5" />
		<path d="M3 16v5h5" />
		<path d="m3 21 6-6" />
		<path d="M3 8V3h5" />
		<path d="M9 9 3 3" />
	</Base>
);
export const ExternalLink = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 3h6v6" />
		<path d="M10 14 21 3" />
		<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
	</Base>
);
export const Eye = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
		<circle cx="12" cy="12" r="3" />
	</Base>
);
export const EyeClosed = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 18-.722-3.25" />
		<path d="M2 8a10.645 10.645 0 0 0 20 0" />
		<path d="m20 15-1.726-2.05" />
		<path d="m4 15 1.726-2.05" />
		<path d="m9 18 .722-3.25" />
	</Base>
);
export const EyeDashed = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.054 18.946a11 11 0 0 1-2.11 0" />
		<path d="M13.054 5.054a11 11 0 0 0-2.11-.001" />
		<path d="M17.072 6.274a11 11 0 0 1 1.753 1.173" />
		<path d="M18.825 16.552a11 11 0 0 1-1.753 1.174" />
		<path d="M2.514 13.303a11 11 0 0 1-.452-.954 1 1 0 0 1 0-.697 11 11 0 0 1 .45-.955" />
		<path d="M21.485 10.697a11 11 0 0 1 .453.955 1 1 0 0 1 0 .697 11 11 0 0 1-.453.954" />
		<path d="M5.173 7.448a11 11 0 0 1 1.753-1.174" />
		<path d="M6.926 17.726a11 11 0 0 1-1.753-1.174" />
		<circle cx="12" cy="12" r="3" />
	</Base>
);
export const EyeOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
		<path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
		<path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
		<path d="m2 2 20 20" />
	</Base>
);
export const Factory = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 16h.01" />
		<path d="M16 16h.01" />
		<path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
		<path d="M8 16h.01" />
	</Base>
);
export const Fan = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z" />
		<path d="M12 12v.01" />
	</Base>
);
export const FastForward = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z" />
		<path d="M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z" />
	</Base>
);
export const Feather = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
		<path d="M16 8 2 22" />
		<path d="M17.5 15H9" />
	</Base>
);
export const Fence = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" />
		<path d="M6 8h4" />
		<path d="M6 18h4" />
		<path d="m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" />
		<path d="M14 8h4" />
		<path d="M14 18h4" />
		<path d="m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" />
	</Base>
);
export const FerrisWheel = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="2" />
		<path d="M12 2v4" />
		<path d="m6.8 15-3.5 2" />
		<path d="m20.7 7-3.5 2" />
		<path d="M6.8 9 3.3 7" />
		<path d="m20.7 17-3.5-2" />
		<path d="m9 22 3-8 3 8" />
		<path d="M8 22h8" />
		<path d="M18 18.7a9 9 0 1 0-12 0" />
	</Base>
);
export const File = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
	</Base>
);
export const FileArchive = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M8 12v-1" />
		<path d="M8 18v-2" />
		<path d="M8 7V6" />
		<circle cx="8" cy="20" r="2" />
	</Base>
);
export const FileAxis3d = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="m8 18 4-4" />
		<path d="M8 10v8h8" />
	</Base>
);
export const FileBadge = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="m7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88" />
		<circle cx="6" cy="14" r="3" />
	</Base>
);
export const FileBox = (p: IconProps) => (
	<Base {...p}>
		<path d="M14.5 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.8" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M11.7 14.2 7 17l-4.7-2.8" />
		<path d="M3 13.1a2 2 0 0 0-.999 1.76v3.24a2 2 0 0 0 .969 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01z" />
		<path d="M7 17v5" />
	</Base>
);
export const FileBraces = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1" />
		<path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" />
	</Base>
);
export const FileBracesCorner = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 22h4a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M5 14a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1 1 1 0 0 1 1 1v2a1 1 0 0 0 1 1" />
		<path d="M9 22a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1" />
	</Base>
);
export const FileChartColumn = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M8 18v-1" />
		<path d="M12 18v-6" />
		<path d="M16 18v-3" />
	</Base>
);
export const FileChartColumnIncreasing = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M8 18v-2" />
		<path d="M12 18v-4" />
		<path d="M16 18v-6" />
	</Base>
);
export const FileChartLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="m16 13-3.5 3.5-2-2L8 17" />
	</Base>
);
export const FileChartPie = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.941 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.512" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M4.017 11.512a6 6 0 1 0 8.466 8.475" />
		<path d="M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z" />
	</Base>
);
export const FileCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="m9 15 2 2 4-4" />
	</Base>
);
export const FileCheckCorner = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="m14 20 2 2 4-4" />
	</Base>
);
export const FileClock = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M8 14v2.2l1.6 1" />
		<circle cx="8" cy="16" r="6" />
	</Base>
);
export const FileCode = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M10 12.5 8 15l2 2.5" />
		<path d="m14 12.5 2 2.5-2 2.5" />
	</Base>
);
export const FileCodeCorner = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="m5 16-3 3 3 3" />
		<path d="m9 22 3-3-3-3" />
	</Base>
);
export const FileCog = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 8a1 1 0 0 1-1-1V2a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8z" />
		<path d="M20 8v12a2 2 0 0 1-2 2h-4.182" />
		<path d="m3.305 19.53.923-.382" />
		<path d="M4 10.592V4a2 2 0 0 1 2-2h8" />
		<path d="m4.228 16.852-.924-.383" />
		<path d="m5.852 15.228-.383-.923" />
		<path d="m5.852 20.772-.383.924" />
		<path d="m8.148 15.228.383-.923" />
		<path d="m8.53 21.696-.382-.924" />
		<path d="m9.773 16.852.922-.383" />
		<path d="m9.773 19.148.922.383" />
		<circle cx="7" cy="18" r="3" />
	</Base>
);
export const FileDiff = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M9 10h6" />
		<path d="M12 13V7" />
		<path d="M9 17h6" />
	</Base>
);
export const FileDigit = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M10 16h2v6" />
		<path d="M10 22h4" />
		<rect x="2" y="16" width="4" height="6" rx="2" />
	</Base>
);
export const FileDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M12 18v-6" />
		<path d="m9 15 3 3 3-3" />
	</Base>
);
export const FileExclamationPoint = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M12 9v4" />
		<path d="M12 17h.01" />
	</Base>
);
export const FileHeadphone = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0" />
	</Base>
);
export const FileHeart = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v7" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M3.62 18.8A2.25 2.25 0 1 1 7 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a1 1 0 0 1-1.507 0z" />
	</Base>
);
export const FileImage = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<circle cx="10" cy="12" r="2" />
		<path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22" />
	</Base>
);
export const FileInput = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M2 15h10" />
		<path d="m9 18 3-3-3-3" />
	</Base>
);
export const FileKey = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M4 12v6" />
		<path d="M4 14h2" />
		<path d="M9.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v4" />
		<circle cx="4" cy="20" r="2" />
	</Base>
);
export const FileLock = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M9 17v-2a2 2 0 0 0-4 0v2" />
		<rect width="8" height="5" x="3" y="17" rx="1" />
	</Base>
);
export const FileMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M9 15h6" />
	</Base>
);
export const FileMinusCorner = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 14V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M14 18h6" />
	</Base>
);
export const FileMusic = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v10.35" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M8 20v-7l3 1.474" />
		<circle cx="6" cy="20" r="2" />
	</Base>
);
export const FileOutput = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="m5 11-3 3" />
		<path d="m5 17-3-3h10" />
	</Base>
);
export const FilePen = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z" />
	</Base>
);
export const FilePenLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z" />
		<path d="M14.487 7.858A1 1 0 0 1 14 7V2" />
		<path d="M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516" />
		<path d="M8 18h1" />
	</Base>
);
export const FilePlay = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z" />
	</Base>
);
export const FilePlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M9 15h6" />
		<path d="M12 18v-6" />
	</Base>
);
export const FilePlusCorner = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M14 19h6" />
		<path d="M17 16v6" />
	</Base>
);
export const FileQuestionMark = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M12 17h.01" />
		<path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
	</Base>
);
export const FileScan = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 10V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.35" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M16 14a2 2 0 0 0-2 2" />
		<path d="M16 22a2 2 0 0 1-2-2" />
		<path d="M20 14a2 2 0 0 1 2 2" />
		<path d="M20 22a2 2 0 0 0 2-2" />
	</Base>
);
export const FileSearch = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<circle cx="11.5" cy="14.5" r="2.5" />
		<path d="M13.3 16.3 15 18" />
	</Base>
);
export const FileSearchCorner = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="m21 22-2.88-2.88" />
		<circle cx="16" cy="17" r="3" />
	</Base>
);
export const FileSignal = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M8 15h.01" />
		<path d="M11.5 13.5a2.5 2.5 0 0 1 0 3" />
		<path d="M15 12a5 5 0 0 1 0 6" />
	</Base>
);
export const FileSliders = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M8 12h8" />
		<path d="M10 11v2" />
		<path d="M8 17h8" />
		<path d="M14 16v2" />
	</Base>
);
export const FileSpreadsheet = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M8 13h2" />
		<path d="M14 13h2" />
		<path d="M8 17h2" />
		<path d="M14 17h2" />
	</Base>
);
export const FileStack = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1" />
		<path d="M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1" />
		<path d="M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z" />
	</Base>
);
export const FileSymlink = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="m10 18 3-3-3-3" />
	</Base>
);
export const FileTerminal = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="m8 16 2-2-2-2" />
		<path d="M12 18h4" />
	</Base>
);
export const FileText = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M10 9H8" />
		<path d="M16 13H8" />
		<path d="M16 17H8" />
	</Base>
);
export const FileType = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M11 18h2" />
		<path d="M12 12v6" />
		<path d="M9 13v-.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v.5" />
	</Base>
);
export const FileTypeCorner = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22h6a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M3 16v-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V16" />
		<path d="M6 22h2" />
		<path d="M7 14v8" />
	</Base>
);
export const FileUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M12 12v6" />
		<path d="m15 15-3-3-3 3" />
	</Base>
);
export const FileUser = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M16 22a4 4 0 0 0-8 0" />
		<circle cx="12" cy="15" r="3" />
	</Base>
);
export const FileVideoCamera = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="m10 17.843 3.033-1.755a.64.64 0 0 1 .967.56v4.704a.65.65 0 0 1-.967.56L10 20.157" />
		<rect width="7" height="6" x="3" y="16" rx="1" />
	</Base>
);
export const FileVolume = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 11.55V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-1.95" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M12 15a5 5 0 0 1 0 6" />
		<path d="M8 14.502a.5.5 0 0 0-.826-.381l-1.893 1.631a1 1 0 0 1-.651.243H3.5a.5.5 0 0 0-.5.501v3.006a.5.5 0 0 0 .5.501h1.129a1 1 0 0 1 .652.243l1.893 1.633a.5.5 0 0 0 .826-.38z" />
	</Base>
);
export const FileX = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="m14.5 12.5-5 5" />
		<path d="m9.5 12.5 5 5" />
	</Base>
);
export const FileXCorner = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="m15 17 5 5" />
		<path d="m20 17-5 5" />
	</Base>
);
export const Files = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
		<path d="M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z" />
		<path d="M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1" />
	</Base>
);
export const Film = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M7 3v18" />
		<path d="M3 7.5h4" />
		<path d="M3 12h18" />
		<path d="M3 16.5h4" />
		<path d="M17 3v18" />
		<path d="M17 7.5h4" />
		<path d="M17 16.5h4" />
	</Base>
);
export const FingerprintPattern = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
		<path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
		<path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
		<path d="M2 12a10 10 0 0 1 18-6" />
		<path d="M2 16h.01" />
		<path d="M21.8 16c.2-2 .131-5.354 0-6" />
		<path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
		<path d="M8.65 22c.21-.66.45-1.32.57-2" />
		<path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
	</Base>
);
export const FireExtinguisher = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5" />
		<path d="M9 18h8" />
		<path d="M18 3h-3" />
		<path d="M11 3a6 6 0 0 0-6 6v11" />
		<path d="M5 13h4" />
		<path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z" />
	</Base>
);
export const Fish = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
		<path d="M18 12v.5" />
		<path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
		<path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
		<path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
		<path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
	</Base>
);
export const FishOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058" />
		<path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618" />
		<path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20" />
	</Base>
);
export const FishSymbol = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 16s9-15 20-4C11 23 2 8 2 8" />
	</Base>
);
export const FishingHook = (p: IconProps) => (
	<Base {...p}>
		<path d="m17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10" />
		<path d="M20.414 8.586 22 7" />
		<circle cx="19" cy="10" r="2" />
	</Base>
);
export const FishingRod = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 11h1" />
		<path d="M8 15a2 2 0 0 1-4 0V3a1 1 0 0 1 1-1h.5C14 2 20 9 20 18v4" />
		<circle cx="18" cy="18" r="2" />
	</Base>
);
export const Flag = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />
	</Base>
);
export const FlagOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />
		<path d="m2 2 20 20" />
		<path d="M4 22V4" />
		<path d="M7.656 2H8c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10.347" />
	</Base>
);
export const FlagTriangleLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5" />
	</Base>
);
export const FlagTriangleRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 22V2.8a.8.8 0 0 1 1.17-.71l11.38 5.69a.8.8 0 0 1 0 1.44L6 15.5" />
	</Base>
);
export const Flame = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
	</Base>
);
export const FlameKindling = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z" />
		<path d="m5 22 14-4" />
		<path d="m5 18 14 4" />
	</Base>
);
export const Flashlight = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 13v1" />
		<path d="M17 2a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8A4 4 0 0 0 16 12v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V3a1 1 0 0 1 1-1z" />
		<path d="M6 6h12" />
	</Base>
);
export const FlashlightOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.652 6H18" />
		<path d="M12 13v1" />
		<path d="M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V6" />
		<path d="m2 2 20 20" />
		<path d="M7.649 2H17a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8a4 4 0 0 0-.55 1.007" />
	</Base>
);
export const FlaskConical = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
		<path d="M6.453 15h11.094" />
		<path d="M8.5 2h7" />
	</Base>
);
export const FlaskConicalOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 2v2.343" />
		<path d="M14 2v6.343" />
		<path d="m2 2 20 20" />
		<path d="M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-1.755-2.96l5.227-9.563" />
		<path d="M6.453 15H15" />
		<path d="M8.5 2h7" />
	</Base>
);
export const FlaskRound = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 2v6.292a7 7 0 1 0 4 0V2" />
		<path d="M5 15h14" />
		<path d="M8.5 2h7" />
	</Base>
);
export const FlipHorizontal2 = (p: IconProps) => (
	<Base {...p}>
		<path d="m3 7 5 5-5 5V7" />
		<path d="m21 7-5 5 5 5V7" />
		<path d="M12 20v2" />
		<path d="M12 14v2" />
		<path d="M12 8v2" />
		<path d="M12 2v2" />
	</Base>
);
export const FlipVertical2 = (p: IconProps) => (
	<Base {...p}>
		<path d="m17 3-5 5-5-5h10" />
		<path d="m17 21-5-5-5 5h10" />
		<path d="M4 12H2" />
		<path d="M10 12H8" />
		<path d="M16 12h-2" />
		<path d="M22 12h-2" />
	</Base>
);
export const Flower = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="3" />
		<path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" />
		<path d="M12 7.5V9" />
		<path d="M7.5 12H9" />
		<path d="M16.5 12H15" />
		<path d="M12 16.5V15" />
		<path d="m8 8 1.88 1.88" />
		<path d="M14.12 9.88 16 8" />
		<path d="m8 16 1.88-1.88" />
		<path d="M14.12 14.12 16 16" />
	</Base>
);
export const Flower2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1" />
		<circle cx="12" cy="8" r="2" />
		<path d="M12 10v12" />
		<path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" />
		<path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" />
	</Base>
);
export const Focus = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="3" />
		<path d="M3 7V5a2 2 0 0 1 2-2h2" />
		<path d="M17 3h2a2 2 0 0 1 2 2v2" />
		<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
		<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
	</Base>
);
export const FoldHorizontal = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 12h6" />
		<path d="M22 12h-6" />
		<path d="M12 2v2" />
		<path d="M12 8v2" />
		<path d="M12 14v2" />
		<path d="M12 20v2" />
		<path d="m19 9-3 3 3 3" />
		<path d="m5 15 3-3-3-3" />
	</Base>
);
export const FoldVertical = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22v-6" />
		<path d="M12 8V2" />
		<path d="M4 12H2" />
		<path d="M10 12H8" />
		<path d="M16 12h-2" />
		<path d="M22 12h-2" />
		<path d="m15 19-3-3-3 3" />
		<path d="m15 5-3 3-3-3" />
	</Base>
);
export const Folder = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
	</Base>
);
export const FolderArchive = (p: IconProps) => (
	<Base {...p}>
		<circle cx="15" cy="19" r="2" />
		<path d="M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1" />
		<path d="M15 11v-1" />
		<path d="M15 17v-2" />
	</Base>
);
export const FolderBookmark = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6v8l3-3 3 3V6" />
		<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
	</Base>
);
export const FolderCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
		<path d="m9 13 2 2 4-4" />
	</Base>
);
export const FolderClock = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 14v2.2l1.6 1" />
		<path d="M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2" />
		<circle cx="16" cy="16" r="6" />
	</Base>
);
export const FolderClosed = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
		<path d="M2 10h20" />
	</Base>
);
export const FolderCode = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 10.5 8 13l2 2.5" />
		<path d="m14 10.5 2 2.5-2 2.5" />
		<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
	</Base>
);
export const FolderCog = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3" />
		<path d="m14.305 19.53.923-.382" />
		<path d="m15.228 16.852-.923-.383" />
		<path d="m16.852 15.228-.383-.923" />
		<path d="m16.852 20.772-.383.924" />
		<path d="m19.148 15.228.383-.923" />
		<path d="m19.53 21.696-.382-.924" />
		<path d="m20.772 16.852.924-.383" />
		<path d="m20.772 19.148.924.383" />
		<circle cx="18" cy="18" r="3" />
	</Base>
);
export const FolderDot = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
		<circle cx="12" cy="13" r="1" />
	</Base>
);
export const FolderDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
		<path d="M12 10v6" />
		<path d="m15 13-3 3-3-3" />
	</Base>
);
export const FolderGit = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="13" r="2" />
		<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
		<path d="M14 13h3" />
		<path d="M7 13h3" />
	</Base>
);
export const FolderGit2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 19a5 5 0 0 1-5-5v8" />
		<path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5" />
		<circle cx="13" cy="12" r="2" />
		<circle cx="20" cy="19" r="2" />
	</Base>
);
export const FolderHeart = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.638 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.417" />
		<path d="M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" />
	</Base>
);
export const FolderInput = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1" />
		<path d="M2 13h10" />
		<path d="m9 16 3-3-3-3" />
	</Base>
);
export const FolderKanban = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
		<path d="M8 10v4" />
		<path d="M12 10v2" />
		<path d="M16 10v6" />
	</Base>
);
export const FolderKey = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.36" />
		<path d="M19 12v6" />
		<path d="M19 14h2" />
		<circle cx="19" cy="20" r="2" />
	</Base>
);
export const FolderLock = (p: IconProps) => (
	<Base {...p}>
		<rect width="8" height="5" x="14" y="17" rx="1" />
		<path d="M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5" />
		<path d="M20 17v-2a2 2 0 1 0-4 0v2" />
	</Base>
);
export const FolderMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 13h6" />
		<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
	</Base>
);
export const FolderOpen = (p: IconProps) => (
	<Base {...p}>
		<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
	</Base>
);
export const FolderOpenDot = (p: IconProps) => (
	<Base {...p}>
		<path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
		<circle cx="14" cy="15" r="1" />
	</Base>
);
export const FolderOutput = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5" />
		<path d="M2 13h10" />
		<path d="m5 10-3 3 3 3" />
	</Base>
);
export const FolderPen = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5" />
		<path d="M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
	</Base>
);
export const FolderPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 10v6" />
		<path d="M9 13h6" />
		<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
	</Base>
);
export const FolderRoot = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
		<circle cx="12" cy="13" r="2" />
		<path d="M12 15v5" />
	</Base>
);
export const FolderSearch = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1" />
		<path d="m21 21-1.9-1.9" />
		<circle cx="17" cy="17" r="3" />
	</Base>
);
export const FolderSearch2 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="11.5" cy="12.5" r="2.5" />
		<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
		<path d="M13.3 14.3 15 16" />
	</Base>
);
export const FolderSymlink = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 9.35V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7" />
		<path d="m8 16 3-3-3-3" />
	</Base>
);
export const FolderSync = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5" />
		<path d="M12 10v4h4" />
		<path d="m12 14 1.535-1.605a5 5 0 0 1 8 1.5" />
		<path d="M22 22v-4h-4" />
		<path d="m22 18-1.535 1.605a5 5 0 0 1-8-1.5" />
	</Base>
);
export const FolderTree = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z" />
		<path d="M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z" />
		<path d="M3 5a2 2 0 0 0 2 2h3" />
		<path d="M3 3v13a2 2 0 0 0 2 2h3" />
	</Base>
);
export const FolderUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
		<path d="M12 10v6" />
		<path d="m9 13 3-3 3 3" />
	</Base>
);
export const FolderX = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
		<path d="m9.5 10.5 5 5" />
		<path d="m14.5 10.5-5 5" />
	</Base>
);
export const Folders = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2.5a1.5 1.5 0 0 1 1.2.6l.6.8a1.5 1.5 0 0 0 1.2.6z" />
		<path d="M3 8.268a2 2 0 0 0-1 1.738V19a2 2 0 0 0 2 2h11a2 2 0 0 0 1.732-1" />
	</Base>
);
export const Footprints = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
		<path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
		<path d="M16 17h4" />
		<path d="M4 13h4" />
	</Base>
);
export const Forklift = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 12H5a2 2 0 0 0-2 2v5" />
		<path d="M15 19h7" />
		<path d="M16 19V2" />
		<path d="M6 12V7a2 2 0 0 1 2-2h2.172a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 16 10.828" />
		<path d="M7 19h4" />
		<circle cx="13" cy="19" r="2" />
		<circle cx="5" cy="19" r="2" />
	</Base>
);
export const Form = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 14h6" />
		<path d="M4 2h10" />
		<rect x="4" y="18" width="16" height="4" rx="1" />
		<rect x="4" y="6" width="16" height="4" rx="1" />
	</Base>
);
export const Forward = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 17 5-5-5-5" />
		<path d="M4 18v-2a4 4 0 0 1 4-4h12" />
	</Base>
);
export const Frame = (p: IconProps) => (
	<Base {...p}>
		<line x1="22" x2="2" y1="6" y2="6" />
		<line x1="22" x2="2" y1="18" y2="18" />
		<line x1="6" x2="6" y1="2" y2="22" />
		<line x1="18" x2="18" y1="2" y2="22" />
	</Base>
);
export const Frown = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M16 16s-1.5-2-4-2-4 2-4 2" />
		<line x1="9" x2="9.01" y1="9" y2="9" />
		<line x1="15" x2="15.01" y1="9" y2="9" />
	</Base>
);
export const Fuel = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5" />
		<path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16" />
		<path d="M2 21h13" />
		<path d="M3 9h11" />
	</Base>
);
export const Fullscreen = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 7V5a2 2 0 0 1 2-2h2" />
		<path d="M17 3h2a2 2 0 0 1 2 2v2" />
		<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
		<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
		<rect width="10" height="8" x="7" y="8" rx="1" />
	</Base>
);
export const Funnel = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
	</Base>
);
export const FunnelPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348" />
		<path d="M16 6h6" />
		<path d="M19 3v6" />
	</Base>
);
export const FunnelX = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473" />
		<path d="m16.5 3.5 5 5" />
		<path d="m21.5 3.5-5 5" />
	</Base>
);
export const GalleryHorizontal = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 3v18" />
		<rect width="12" height="18" x="6" y="3" rx="2" />
		<path d="M22 3v18" />
	</Base>
);
export const GalleryHorizontalEnd = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 7v10" />
		<path d="M6 5v14" />
		<rect width="12" height="18" x="10" y="3" rx="2" />
	</Base>
);
export const GalleryThumbnails = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="14" x="3" y="3" rx="2" />
		<path d="M4 21h1" />
		<path d="M9 21h1" />
		<path d="M14 21h1" />
		<path d="M19 21h1" />
	</Base>
);
export const GalleryVertical = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 2h18" />
		<rect width="18" height="12" x="3" y="6" rx="2" />
		<path d="M3 22h18" />
	</Base>
);
export const GalleryVerticalEnd = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 2h10" />
		<path d="M5 6h14" />
		<rect width="18" height="12" x="3" y="10" rx="2" />
	</Base>
);
export const Gamepad = (p: IconProps) => (
	<Base {...p}>
		<line x1="6" x2="10" y1="12" y2="12" />
		<line x1="8" x2="8" y1="10" y2="14" />
		<line x1="15" x2="15.01" y1="13" y2="13" />
		<line x1="18" x2="18.01" y1="11" y2="11" />
		<rect width="20" height="12" x="2" y="6" rx="2" />
	</Base>
);
export const Gamepad2 = (p: IconProps) => (
	<Base {...p}>
		<line x1="6" x2="10" y1="11" y2="11" />
		<line x1="8" x2="8" y1="9" y2="13" />
		<line x1="15" x2="15.01" y1="12" y2="12" />
		<line x1="18" x2="18.01" y1="10" y2="10" />
		<path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
	</Base>
);
export const GamepadDirectional = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.146 15.854a1.207 1.207 0 0 1 1.708 0l1.56 1.56A2 2 0 0 1 15 18.828V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.172a2 2 0 0 1 .586-1.414z" />
		<path d="M18.828 15a2 2 0 0 1-1.414-.586l-1.56-1.56a1.207 1.207 0 0 1 0-1.708l1.56-1.56A2 2 0 0 1 18.828 9H21a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" />
		<path d="M6.586 14.414A2 2 0 0 1 5.172 15H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2.172a2 2 0 0 1 1.414.586l1.56 1.56a1.207 1.207 0 0 1 0 1.708z" />
		<path d="M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.172a2 2 0 0 1-.586 1.414l-1.56 1.56a1.207 1.207 0 0 1-1.708 0l-1.56-1.56A2 2 0 0 1 9 5.172z" />
	</Base>
);
export const Gauge = (p: IconProps) => (
	<Base {...p}>
		<path d="m12 14 4-4" />
		<path d="M3.34 19a10 10 0 1 1 17.32 0" />
	</Base>
);
export const Gavel = (p: IconProps) => (
	<Base {...p}>
		<path d="m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381" />
		<path d="m16 16 6-6" />
		<path d="m21.5 10.5-8-8" />
		<path d="m8 8 6-6" />
		<path d="m8.5 7.5 8 8" />
	</Base>
);
export const Gem = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.5 3 8 9l4 13 4-13-2.5-6" />
		<path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z" />
		<path d="M2 9h20" />
	</Base>
);
export const GeorgianLari = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.5 21a7.5 7.5 0 1 1 7.35-9" />
		<path d="M13 12V3" />
		<path d="M4 21h16" />
		<path d="M9 12V3" />
	</Base>
);
export const Ghost = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 10h.01" />
		<path d="M15 10h.01" />
		<path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />
	</Base>
);
export const Gift = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 7v14" />
		<path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
		<path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" />
		<rect x="3" y="7" width="18" height="4" rx="1" />
	</Base>
);
export const GitBranch = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 6a9 9 0 0 0-9 9V3" />
		<circle cx="18" cy="6" r="3" />
		<circle cx="6" cy="18" r="3" />
	</Base>
);
export const GitBranchMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 6a9 9 0 0 0-9 9V3" />
		<path d="M21 18h-6" />
		<circle cx="18" cy="6" r="3" />
		<circle cx="6" cy="18" r="3" />
	</Base>
);
export const GitBranchPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 3v12" />
		<path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
		<path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
		<path d="M15 6a9 9 0 0 0-9 9" />
		<path d="M18 15v6" />
		<path d="M21 18h-6" />
	</Base>
);
export const GitCommitHorizontal = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="3" />
		<line x1="3" x2="9" y1="12" y2="12" />
		<line x1="15" x2="21" y1="12" y2="12" />
	</Base>
);
export const GitCommitVertical = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3v6" />
		<circle cx="12" cy="12" r="3" />
		<path d="M12 15v6" />
	</Base>
);
export const GitCompare = (p: IconProps) => (
	<Base {...p}>
		<circle cx="18" cy="18" r="3" />
		<circle cx="6" cy="6" r="3" />
		<path d="M13 6h3a2 2 0 0 1 2 2v7" />
		<path d="M11 18H8a2 2 0 0 1-2-2V9" />
	</Base>
);
export const GitCompareArrows = (p: IconProps) => (
	<Base {...p}>
		<circle cx="5" cy="6" r="3" />
		<path d="M12 6h5a2 2 0 0 1 2 2v7" />
		<path d="m15 9-3-3 3-3" />
		<circle cx="19" cy="18" r="3" />
		<path d="M12 18H7a2 2 0 0 1-2-2V9" />
		<path d="m9 15 3 3-3 3" />
	</Base>
);
export const GitFork = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="18" r="3" />
		<circle cx="6" cy="6" r="3" />
		<circle cx="18" cy="6" r="3" />
		<path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
		<path d="M12 12v3" />
	</Base>
);
export const GitGraph = (p: IconProps) => (
	<Base {...p}>
		<circle cx="5" cy="6" r="3" />
		<path d="M5 9v6" />
		<circle cx="5" cy="18" r="3" />
		<path d="M12 3v18" />
		<circle cx="19" cy="6" r="3" />
		<path d="M16 15.7A9 9 0 0 0 19 9" />
	</Base>
);
export const GitMerge = (p: IconProps) => (
	<Base {...p}>
		<circle cx="18" cy="18" r="3" />
		<circle cx="6" cy="6" r="3" />
		<path d="M6 21V9a9 9 0 0 0 9 9" />
	</Base>
);
export const GitMergeConflict = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6h4a2 2 0 0 1 2 2v7" />
		<path d="M6 12v9" />
		<path d="M9 3 3 9" />
		<path d="M9 9 3 3" />
		<circle cx="18" cy="18" r="3" />
	</Base>
);
export const GitPullRequest = (p: IconProps) => (
	<Base {...p}>
		<circle cx="18" cy="18" r="3" />
		<circle cx="6" cy="6" r="3" />
		<path d="M13 6h3a2 2 0 0 1 2 2v7" />
		<line x1="6" x2="6" y1="9" y2="21" />
	</Base>
);
export const GitPullRequestArrow = (p: IconProps) => (
	<Base {...p}>
		<circle cx="5" cy="6" r="3" />
		<path d="M5 9v12" />
		<circle cx="19" cy="18" r="3" />
		<path d="m15 9-3-3 3-3" />
		<path d="M12 6h5a2 2 0 0 1 2 2v7" />
	</Base>
);
export const GitPullRequestClosed = (p: IconProps) => (
	<Base {...p}>
		<circle cx="6" cy="6" r="3" />
		<path d="M6 9v12" />
		<path d="m21 3-6 6" />
		<path d="m21 9-6-6" />
		<path d="M18 11.5V15" />
		<circle cx="18" cy="18" r="3" />
	</Base>
);
export const GitPullRequestCreate = (p: IconProps) => (
	<Base {...p}>
		<circle cx="6" cy="6" r="3" />
		<path d="M6 9v12" />
		<path d="M13 6h3a2 2 0 0 1 2 2v3" />
		<path d="M18 15v6" />
		<path d="M21 18h-6" />
	</Base>
);
export const GitPullRequestCreateArrow = (p: IconProps) => (
	<Base {...p}>
		<circle cx="5" cy="6" r="3" />
		<path d="M5 9v12" />
		<path d="m15 9-3-3 3-3" />
		<path d="M12 6h5a2 2 0 0 1 2 2v3" />
		<path d="M19 15v6" />
		<path d="M22 18h-6" />
	</Base>
);
export const GitPullRequestDraft = (p: IconProps) => (
	<Base {...p}>
		<circle cx="18" cy="18" r="3" />
		<circle cx="6" cy="6" r="3" />
		<path d="M18 6V5" />
		<path d="M18 11v-1" />
		<line x1="6" x2="6" y1="9" y2="21" />
	</Base>
);
export const GlassWater = (p: IconProps) => (
	<Base {...p}>
		<path d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z" />
		<path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0" />
	</Base>
);
export const Glasses = (p: IconProps) => (
	<Base {...p}>
		<circle cx="6" cy="15" r="4" />
		<circle cx="18" cy="15" r="4" />
		<path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
		<path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2" />
		<path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2" />
	</Base>
);
export const Globe = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
		<path d="M2 12h20" />
	</Base>
);
export const GlobeCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 6 2 2 4-4" />
		<path d="M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10" />
	</Base>
);
export const GlobeLock = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13" />
		<path d="M2 12h8.5" />
		<path d="M20 6V4a2 2 0 1 0-4 0v2" />
		<rect width="8" height="5" x="14" y="6" rx="1" />
	</Base>
);
export const GlobeOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.114 4.462A14.5 14.5 0 0 1 12 2a10 10 0 0 1 9.313 13.643" />
		<path d="M15.557 15.556A14.5 14.5 0 0 1 12 22 10 10 0 0 1 4.929 4.929" />
		<path d="M15.892 10.234A14.5 14.5 0 0 0 12 2a10 10 0 0 0-3.643.687" />
		<path d="M17.656 12H22" />
		<path d="M19.071 19.071A10 10 0 0 1 12 22 14.5 14.5 0 0 1 8.44 8.45" />
		<path d="M2 12h10" />
		<path d="m2 2 20 20" />
	</Base>
);
export const GlobeX = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 3 5 5" />
		<path d="M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10" />
		<path d="m21 3-5 5" />
	</Base>
);
export const Goal = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 13V2l8 4-8 4" />
		<path d="M20.561 10.222a9 9 0 1 1-12.55-5.29" />
		<path d="M8.002 9.997a5 5 0 1 0 8.9 2.02" />
	</Base>
);
export const Gpu = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 17h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2" />
		<path d="M2 21V3" />
		<path d="M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3" />
		<circle cx="16" cy="11" r="2" />
		<circle cx="8" cy="11" r="2" />
	</Base>
);
export const GraduationCap = (p: IconProps) => (
	<Base {...p}>
		<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
		<path d="M22 10v6" />
		<path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
	</Base>
);
export const Grape = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 5V2l-5.89 5.89" />
		<circle cx="16.6" cy="15.89" r="3" />
		<circle cx="8.11" cy="7.4" r="3" />
		<circle cx="12.35" cy="11.65" r="3" />
		<circle cx="13.91" cy="5.85" r="3" />
		<circle cx="18.15" cy="10.09" r="3" />
		<circle cx="6.56" cy="13.2" r="3" />
		<circle cx="10.8" cy="17.44" r="3" />
		<circle cx="5" cy="19" r="3" />
	</Base>
);
export const Grid2x2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3v18" />
		<path d="M3 12h18" />
		<rect x="3" y="3" width="18" height="18" rx="2" />
	</Base>
);
export const Grid2x2Check = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3" />
		<path d="m16 19 2 2 4-4" />
	</Base>
);
export const Grid2x2Plus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3" />
		<path d="M16 19h6" />
		<path d="M19 22v-6" />
	</Base>
);
export const Grid2x2X = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3" />
		<path d="m16 16 5 5" />
		<path d="m16 21 5-5" />
	</Base>
);
export const Grid3x2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 3v18" />
		<path d="M3 12h18" />
		<path d="M9 3v18" />
		<rect x="3" y="3" width="18" height="18" rx="2" />
	</Base>
);
export const Grid3x3 = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M3 9h18" />
		<path d="M3 15h18" />
		<path d="M9 3v18" />
		<path d="M15 3v18" />
	</Base>
);
export const Grip = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="5" r="1" />
		<circle cx="19" cy="5" r="1" />
		<circle cx="5" cy="5" r="1" />
		<circle cx="12" cy="12" r="1" />
		<circle cx="19" cy="12" r="1" />
		<circle cx="5" cy="12" r="1" />
		<circle cx="12" cy="19" r="1" />
		<circle cx="19" cy="19" r="1" />
		<circle cx="5" cy="19" r="1" />
	</Base>
);
export const GripHorizontal = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="9" r="1" />
		<circle cx="19" cy="9" r="1" />
		<circle cx="5" cy="9" r="1" />
		<circle cx="12" cy="15" r="1" />
		<circle cx="19" cy="15" r="1" />
		<circle cx="5" cy="15" r="1" />
	</Base>
);
export const GripVertical = (p: IconProps) => (
	<Base {...p}>
		<circle cx="9" cy="12" r="1" />
		<circle cx="9" cy="5" r="1" />
		<circle cx="9" cy="19" r="1" />
		<circle cx="15" cy="12" r="1" />
		<circle cx="15" cy="5" r="1" />
		<circle cx="15" cy="19" r="1" />
	</Base>
);
export const Group = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 7V5c0-1.1.9-2 2-2h2" />
		<path d="M17 3h2c1.1 0 2 .9 2 2v2" />
		<path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
		<path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
		<rect width="7" height="5" x="7" y="7" rx="1" />
		<rect width="7" height="5" x="10" y="12" rx="1" />
	</Base>
);
export const Guitar = (p: IconProps) => (
	<Base {...p}>
		<path d="m11.9 12.1 4.514-4.514" />
		<path d="M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z" />
		<path d="m6 16 2 2" />
		<path d="M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z" />
	</Base>
);
export const Ham = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856" />
		<path d="M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288" />
		<path d="M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025" />
		<path d="m8.5 16.5-1-1" />
	</Base>
);
export const Hamburger = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25" />
		<path d="M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2" />
		<path d="M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0" />
		<path d="m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" />
	</Base>
);
export const Hammer = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9" />
		<path d="m18 15 4-4" />
		<path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" />
	</Base>
);
export const Hand = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
		<path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
		<path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
		<path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
	</Base>
);
export const HandCoins = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
		<path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
		<path d="m2 16 6 6" />
		<circle cx="16" cy="9" r="2.9" />
		<circle cx="6" cy="5" r="3" />
	</Base>
);
export const HandFist = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0" />
		<path d="M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5" />
		<path d="M9 5A2 2 0 1 0 5 5V10" />
		<path d="M9 7V4A2 2 0 1 1 13 4V7.268" />
	</Base>
);
export const HandGrab = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" />
		<path d="M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
		<path d="M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5" />
		<path d="M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
		<path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0" />
	</Base>
);
export const HandHeart = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
		<path d="m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95" />
		<path d="m2 15 6 6" />
		<path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91" />
	</Base>
);
export const HandHelping = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" />
		<path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
		<path d="m2 13 6 6" />
	</Base>
);
export const HandMetal = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" />
		<path d="M14 11V9a2 2 0 1 0-4 0v2" />
		<path d="M10 10.5V5a2 2 0 1 0-4 0v9" />
		<path d="m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5" />
	</Base>
);
export const HandPlatter = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3V2" />
		<path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5" />
		<path d="M2 14h12a2 2 0 0 1 0 4h-2" />
		<path d="M4 10h16" />
		<path d="M5 10a7 7 0 0 1 14 0" />
		<path d="M5 14v6a1 1 0 0 1-1 1H2" />
	</Base>
);
export const Handbag = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
		<path d="M8 11V6a4 4 0 0 1 8 0v5" />
	</Base>
);
export const Handshake = (p: IconProps) => (
	<Base {...p}>
		<path d="m11 17 2 2a1 1 0 1 0 3-3" />
		<path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
		<path d="m21 3 1 11h-2" />
		<path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
		<path d="M3 4h8" />
	</Base>
);
export const HardDrive = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 16h.01" />
		<path d="M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
		<path d="M21.946 12.013H2.054" />
		<path d="M6 16h.01" />
	</Base>
);
export const HardDriveDownload = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v8" />
		<path d="m16 6-4 4-4-4" />
		<rect width="20" height="8" x="2" y="14" rx="2" />
		<path d="M6 18h.01" />
		<path d="M10 18h.01" />
	</Base>
);
export const HardDriveUpload = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 6-4-4-4 4" />
		<path d="M12 2v8" />
		<rect width="20" height="8" x="2" y="14" rx="2" />
		<path d="M6 18h.01" />
		<path d="M10 18h.01" />
	</Base>
);
export const HardHat = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
		<path d="M14 6a6 6 0 0 1 6 6v3" />
		<path d="M4 15v-3a6 6 0 0 1 6-6" />
		<rect x="2" y="15" width="20" height="4" rx="1" />
	</Base>
);
export const Hash = (p: IconProps) => (
	<Base {...p}>
		<line x1="4" x2="20" y1="9" y2="9" />
		<line x1="4" x2="20" y1="15" y2="15" />
		<line x1="10" x2="8" y1="3" y2="21" />
		<line x1="16" x2="14" y1="3" y2="21" />
	</Base>
);
export const HatGlasses = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 18a2 2 0 0 0-4 0" />
		<path d="m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11" />
		<path d="M2 11h20" />
		<circle cx="17" cy="18" r="3" />
		<circle cx="7" cy="18" r="3" />
	</Base>
);
export const Haze = (p: IconProps) => (
	<Base {...p}>
		<path d="m5.2 6.2 1.4 1.4" />
		<path d="M2 13h2" />
		<path d="M20 13h2" />
		<path d="m17.4 7.6 1.4-1.4" />
		<path d="M22 17H2" />
		<path d="M22 21H2" />
		<path d="M16 13a4 4 0 0 0-8 0" />
		<path d="M12 5V2.5" />
	</Base>
);
export const Hd = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 12H6" />
		<path d="M10 15V9" />
		<path d="M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z" />
		<path d="M6 15V9" />
		<rect x="2" y="5" width="20" height="14" rx="2" />
	</Base>
);
export const HdmiPort = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z" />
		<path d="M7.5 12h9" />
	</Base>
);
export const Heading = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 12h12" />
		<path d="M6 20V4" />
		<path d="M18 20V4" />
	</Base>
);
export const Heading1 = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 12h8" />
		<path d="M4 18V6" />
		<path d="M12 18V6" />
		<path d="m17 12 3-2v8" />
	</Base>
);
export const Heading2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 12h8" />
		<path d="M4 18V6" />
		<path d="M12 18V6" />
		<path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1" />
	</Base>
);
export const Heading3 = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 12h8" />
		<path d="M4 18V6" />
		<path d="M12 18V6" />
		<path d="M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2" />
		<path d="M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2" />
	</Base>
);
export const Heading4 = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 18V6" />
		<path d="M17 10v3a1 1 0 0 0 1 1h3" />
		<path d="M21 10v8" />
		<path d="M4 12h8" />
		<path d="M4 18V6" />
	</Base>
);
export const Heading5 = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 12h8" />
		<path d="M4 18V6" />
		<path d="M12 18V6" />
		<path d="M17 13v-3h4" />
		<path d="M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17" />
	</Base>
);
export const Heading6 = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 12h8" />
		<path d="M4 18V6" />
		<path d="M12 18V6" />
		<circle cx="19" cy="16" r="2" />
		<path d="M20 10c-2 2-3 3.5-3 6" />
	</Base>
);
export const HeadphoneOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 14h-1.343" />
		<path d="M9.128 3.47A9 9 0 0 1 21 12v3.343" />
		<path d="m2 2 20 20" />
		<path d="M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3" />
		<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364" />
	</Base>
);
export const Headphones = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
	</Base>
);
export const Headset = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
		<path d="M21 16v2a4 4 0 0 1-4 4h-5" />
	</Base>
);
export const Heart = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
	</Base>
);
export const HeartCrack = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.409 5.824c-.702.792-1.15 1.496-1.415 2.166l2.153 2.156a.5.5 0 0 1 0 .707l-2.293 2.293a.5.5 0 0 0 0 .707L12 15" />
		<path d="M13.508 20.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.677.6.6 0 0 0 .818.001A5.5 5.5 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5z" />
	</Base>
);
export const HeartHandshake = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762" />
	</Base>
);
export const HeartMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="m14.876 18.99-1.368 1.323a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.244 1.572" />
		<path d="M15 15h6" />
	</Base>
);
export const HeartOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.5 4.893a5.5 5.5 0 0 1 1.091.931.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 1.872-1.002 3.356-2.187 4.655" />
		<path d="m16.967 16.967-3.459 3.346a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 2.747-4.761" />
		<path d="m2 2 20 20" />
	</Base>
);
export const HeartPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49" />
		<path d="M15 15h6" />
		<path d="M18 12v6" />
	</Base>
);
export const HeartPulse = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
		<path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
	</Base>
);
export const HeartX = (p: IconProps) => (
	<Base {...p}>
		<path d="m15.5 12.5 5 5" />
		<path d="m20.5 12.5-5 5" />
		<path d="M21.955 8.774a5.5 5.5 0 0 0-9.546-2.95.6.6 0 0 1-.818 0A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.508 5.332a2 2 0 0 0 2.57.352" />
	</Base>
);
export const Heater = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 8c2-3-2-3 0-6" />
		<path d="M15.5 8c2-3-2-3 0-6" />
		<path d="M6 10h.01" />
		<path d="M6 14h.01" />
		<path d="M10 16v-4" />
		<path d="M14 16v-4" />
		<path d="M18 16v-4" />
		<path d="M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3" />
		<path d="M5 20v2" />
		<path d="M19 20v2" />
	</Base>
);
export const Helicopter = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 17v4" />
		<path d="M14 3v8a2 2 0 0 0 2 2h5.865" />
		<path d="M17 17v4" />
		<path d="M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z" />
		<path d="M2 10v5" />
		<path d="M6 3h16" />
		<path d="M7 21h14" />
		<path d="M8 13H2" />
	</Base>
);
export const Hexagon = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
	</Base>
);
export const Highlighter = (p: IconProps) => (
	<Base {...p}>
		<path d="m9 11-6 6v3h9l3-3" />
		<path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
	</Base>
);
export const History = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
		<path d="M3 3v5h5" />
		<path d="M12 7v5l4 2" />
	</Base>
);
export const Hop = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18" />
		<path d="M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88" />
		<path d="M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36" />
		<path d="M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87" />
		<path d="M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08" />
		<path d="M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57" />
		<path d="M4.93 4.93 3 3a.7.7 0 0 1 0-1" />
		<path d="M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15" />
	</Base>
);
export const HopOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27" />
		<path d="M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28" />
		<path d="M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26" />
		<path d="M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25" />
		<path d="M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75" />
		<path d="M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24" />
		<path d="M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28" />
		<path d="M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05" />
		<path d="m2 2 20 20" />
	</Base>
);
export const Hospital = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 7v4" />
		<path d="M14 21v-3a2 2 0 0 0-4 0v3" />
		<path d="M14 9h-4" />
		<path d="M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
		<path d="M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16" />
	</Base>
);
export const Hotel = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 22v-6.57" />
		<path d="M12 11h.01" />
		<path d="M12 7h.01" />
		<path d="M14 15.43V22" />
		<path d="M15 16a5 5 0 0 0-6 0" />
		<path d="M16 11h.01" />
		<path d="M16 7h.01" />
		<path d="M8 11h.01" />
		<path d="M8 7h.01" />
		<rect x="4" y="2" width="16" height="20" rx="2" />
	</Base>
);
export const Hourglass = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 22h14" />
		<path d="M5 2h14" />
		<path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
		<path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
	</Base>
);
export const House = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
		<path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
	</Base>
);
export const HouseHeart = (p: IconProps) => (
	<Base {...p}>
		<path d="M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" />
		<path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
	</Base>
);
export const HousePlug = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 12V8.964" />
		<path d="M14 12V8.964" />
		<path d="M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z" />
		<path d="M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2" />
	</Base>
);
export const HousePlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.35 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v2.35" />
		<path d="M14.8 12.4A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8" />
		<path d="M15 18h6" />
		<path d="M18 15v6" />
	</Base>
);
export const HouseWifi = (p: IconProps) => (
	<Base {...p}>
		<path d="M9.5 13.866a4 4 0 0 1 5 .01" />
		<path d="M12 17h.01" />
		<path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
		<path d="M7 10.754a8 8 0 0 1 10 0" />
	</Base>
);
export const IceCreamBowl = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0" />
		<path d="M12.14 11a3.5 3.5 0 1 1 6.71 0" />
		<path d="M15.5 6.5a3.5 3.5 0 1 0-7 0" />
	</Base>
);
export const IceCreamCone = (p: IconProps) => (
	<Base {...p}>
		<path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11" />
		<path d="M17 7A5 5 0 0 0 7 7" />
		<path d="M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4" />
	</Base>
);
export const IdCard = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 10h2" />
		<path d="M16 14h2" />
		<path d="M6.17 15a3 3 0 0 1 5.66 0" />
		<circle cx="9" cy="11" r="2" />
		<rect x="2" y="5" width="20" height="14" rx="2" />
	</Base>
);
export const IdCardLanyard = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.5 8h-3" />
		<path d="m15 2-1 2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3" />
		<path d="M16.899 22A5 5 0 0 0 7.1 22" />
		<path d="m9 2 3 6" />
		<circle cx="12" cy="15" r="3" />
	</Base>
);
export const Image = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
		<circle cx="9" cy="9" r="2" />
		<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
	</Base>
);
export const ImageDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
		<path d="m14 19 3 3v-5.5" />
		<path d="m17 22 3-3" />
		<circle cx="9" cy="9" r="2" />
	</Base>
);
export const ImageMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
		<line x1="16" x2="22" y1="5" y2="5" />
		<circle cx="9" cy="9" r="2" />
		<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
	</Base>
);
export const ImageOff = (p: IconProps) => (
	<Base {...p}>
		<line x1="2" x2="22" y1="2" y2="22" />
		<path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" />
		<line x1="13.5" x2="6" y1="13.5" y2="21" />
		<line x1="18" x2="21" y1="12" y2="15" />
		<path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59" />
		<path d="M21 15V5a2 2 0 0 0-2-2H9" />
	</Base>
);
export const ImagePlay = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z" />
		<path d="M21 12.17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
		<path d="m6 21 5-5" />
		<circle cx="9" cy="9" r="2" />
	</Base>
);
export const ImagePlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 5h6" />
		<path d="M19 2v6" />
		<path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
		<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
		<circle cx="9" cy="9" r="2" />
	</Base>
);
export const ImageUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
		<path d="m14 19.5 3-3 3 3" />
		<path d="M17 22v-5.5" />
		<circle cx="9" cy="9" r="2" />
	</Base>
);
export const ImageUpscale = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 3h5v5" />
		<path d="M17 21h2a2 2 0 0 0 2-2" />
		<path d="M21 12v3" />
		<path d="m21 3-5 5" />
		<path d="M3 7V5a2 2 0 0 1 2-2" />
		<path d="m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19" />
		<path d="M9 3h3" />
		<rect x="3" y="11" width="10" height="10" rx="1" />
	</Base>
);
export const Images = (p: IconProps) => (
	<Base {...p}>
		<path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16" />
		<path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2" />
		<circle cx="13" cy="7" r="1" fill="currentColor" />
		<rect x="8" y="2" width="14" height="14" rx="2" />
	</Base>
);
export const Import = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3v12" />
		<path d="m8 11 4 4 4-4" />
		<path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
	</Base>
);
export const Inbox = (p: IconProps) => (
	<Base {...p}>
		<polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
		<path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
	</Base>
);
export const IndianRupee = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 3h12" />
		<path d="M6 8h12" />
		<path d="m6 13 8.5 8" />
		<path d="M6 13h3" />
		<path d="M9 13c6.667 0 6.667-10 0-10" />
	</Base>
);
// biome-ignore lint/suspicious/noShadowRestrictedNames: nom d'icône du pack conservé
export const Infinity = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8" />
	</Base>
);
export const InspectionPanel = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M7 7h.01" />
		<path d="M17 7h.01" />
		<path d="M7 17h.01" />
		<path d="M17 17h.01" />
	</Base>
);
export const Italic = (p: IconProps) => (
	<Base {...p}>
		<line x1="19" x2="10" y1="4" y2="4" />
		<line x1="14" x2="5" y1="20" y2="20" />
		<line x1="15" x2="9" y1="4" y2="20" />
	</Base>
);
export const IterationCcw = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 14 4 4-4 4" />
		<path d="M20 10a8 8 0 1 0-8 8h8" />
	</Base>
);
export const IterationCw = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 10a8 8 0 1 1 8 8H4" />
		<path d="m8 22-4-4 4-4" />
	</Base>
);
export const JapaneseYen = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 9.5V21m0-11.5L6 3m6 6.5L18 3" />
		<path d="M6 15h12" />
		<path d="M6 11h12" />
	</Base>
);
export const Joystick = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z" />
		<path d="M6 15v-2" />
		<path d="M12 15V9" />
		<circle cx="12" cy="6" r="3" />
	</Base>
);
export const Kanban = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 3v14" />
		<path d="M12 3v8" />
		<path d="M19 3v18" />
	</Base>
);
export const Kayak = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z" />
		<path d="M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61" />
		<path d="m6.707 6.707 10.586 10.586" />
		<path d="M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z" />
	</Base>
);
export const Key = (p: IconProps) => (
	<Base {...p}>
		<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
		<path d="m21 2-9.6 9.6" />
		<circle cx="7.5" cy="15.5" r="5.5" />
	</Base>
);
export const KeyRound = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
		<circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
	</Base>
);
export const KeySquare = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z" />
		<path d="m14 7 3 3" />
		<path d="m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814" />
	</Base>
);
export const Keyboard = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 8h.01" />
		<path d="M12 12h.01" />
		<path d="M14 8h.01" />
		<path d="M16 12h.01" />
		<path d="M18 8h.01" />
		<path d="M6 8h.01" />
		<path d="M7 16h10" />
		<path d="M8 12h.01" />
		<rect width="20" height="16" x="2" y="4" rx="2" />
	</Base>
);
export const KeyboardMusic = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="16" x="2" y="4" rx="2" />
		<path d="M6 8h4" />
		<path d="M14 8h.01" />
		<path d="M18 8h.01" />
		<path d="M2 12h20" />
		<path d="M6 12v4" />
		<path d="M10 12v4" />
		<path d="M14 12v4" />
		<path d="M18 12v4" />
	</Base>
);
export const KeyboardOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M 20 4 A2 2 0 0 1 22 6" />
		<path d="M 22 6 L 22 16.41" />
		<path d="M 7 16 L 16 16" />
		<path d="M 9.69 4 L 20 4" />
		<path d="M14 8h.01" />
		<path d="M18 8h.01" />
		<path d="m2 2 20 20" />
		<path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
		<path d="M6 8h.01" />
		<path d="M8 12h.01" />
	</Base>
);
export const Lamp = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 12v6" />
		<path d="M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z" />
		<path d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" />
	</Base>
);
export const LampCeiling = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v5" />
		<path d="M14.829 15.998a3 3 0 1 1-5.658 0" />
		<path d="M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z" />
	</Base>
);
export const LampDesk = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z" />
		<path d="m14.207 4.793-3.414 3.414" />
		<path d="M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
		<path d="m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18" />
	</Base>
);
export const LampFloor = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 10v12" />
		<path d="M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z" />
		<path d="M9 22h6" />
	</Base>
);
export const LampWallDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.929 18.629A1 1 0 0 1 19 20H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 13h6a1 1 0 0 1 .928.629z" />
		<path d="M6 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
		<path d="M8 6h4a2 2 0 0 1 2 2v5" />
	</Base>
);
export const LampWallUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.929 9.629A1 1 0 0 1 19 11H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 4h6a1 1 0 0 1 .928.629z" />
		<path d="M6 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" />
		<path d="M8 18h4a2 2 0 0 0 2-2v-5" />
	</Base>
);
export const LandPlot = (p: IconProps) => (
	<Base {...p}>
		<path d="m12 8 6-3-6-3v10" />
		<path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12" />
		<path d="m6.49 12.85 11.02 6.3" />
		<path d="M17.51 12.85 6.5 19.15" />
	</Base>
);
export const Landmark = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 18v-7" />
		<path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z" />
		<path d="M14 18v-7" />
		<path d="M18 18v-7" />
		<path d="M3 22h18" />
		<path d="M6 18v-7" />
	</Base>
);
export const Languages = (p: IconProps) => (
	<Base {...p}>
		<path d="m5 8 6 6" />
		<path d="m4 14 6-6 2-3" />
		<path d="M2 5h12" />
		<path d="M7 2h1" />
		<path d="m22 22-5-10-5 10" />
		<path d="M14 18h6" />
	</Base>
);
export const Laptop = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z" />
		<path d="M20.054 15.987H3.946" />
	</Base>
);
export const LaptopMinimal = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
		<line x1="2" x2="22" y1="20" y2="20" />
	</Base>
);
export const LaptopMinimalCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 20h20" />
		<path d="m9 10 2 2 4-4" />
		<rect x="3" y="4" width="18" height="12" rx="2" />
	</Base>
);
export const Lasso = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.704 14.467a10 8 0 1 1 3.115 2.375" />
		<path d="M7 22a5 5 0 0 1-2-3.994" />
		<circle cx="5" cy="16" r="2" />
	</Base>
);
export const LassoSelect = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 22a5 5 0 0 1-2-4" />
		<path d="M7 16.93c.96.43 1.96.74 2.99.91" />
		<path d="M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2" />
		<path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
		<path d="M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z" />
	</Base>
);
export const Laugh = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z" />
		<line x1="9" x2="9.01" y1="9" y2="9" />
		<line x1="15" x2="15.01" y1="9" y2="9" />
	</Base>
);
export const Layers2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z" />
		<path d="m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845" />
	</Base>
);
export const LayersMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.832z" />
		<path d="M16 17h6" />
		<path d="M2.003 11.995a1 1 0 0 0 .597.915l8.58 3.91a2 2 0 0 0 .83.18" />
		<path d="M2.003 16.995a1 1 0 0 0 .597.915l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l2.11-.96" />
		<path d="M22.018 12.004a1 1 0 0 1-.598.916l-.177.08" />
	</Base>
);
export const LayersPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z" />
		<path d="M16 17h6" />
		<path d="M19 14v6" />
		<path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178" />
		<path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962" />
	</Base>
);
export const LayoutDashboard = (p: IconProps) => (
	<Base {...p}>
		<rect width="7" height="9" x="3" y="3" rx="1" />
		<rect width="7" height="5" x="14" y="3" rx="1" />
		<rect width="7" height="9" x="14" y="12" rx="1" />
		<rect width="7" height="5" x="3" y="16" rx="1" />
	</Base>
);
export const LayoutList = (p: IconProps) => (
	<Base {...p}>
		<rect width="7" height="7" x="3" y="3" rx="1" />
		<rect width="7" height="7" x="3" y="14" rx="1" />
		<path d="M14 4h7" />
		<path d="M14 9h7" />
		<path d="M14 15h7" />
		<path d="M14 20h7" />
	</Base>
);
export const LayoutPanelLeft = (p: IconProps) => (
	<Base {...p}>
		<rect width="7" height="18" x="3" y="3" rx="1" />
		<rect width="7" height="7" x="14" y="3" rx="1" />
		<rect width="7" height="7" x="14" y="14" rx="1" />
	</Base>
);
export const LayoutPanelTop = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="7" x="3" y="3" rx="1" />
		<rect width="7" height="7" x="3" y="14" rx="1" />
		<rect width="7" height="7" x="14" y="14" rx="1" />
	</Base>
);
export const LayoutTemplate = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="7" x="3" y="3" rx="1" />
		<rect width="9" height="7" x="3" y="14" rx="1" />
		<rect width="5" height="7" x="16" y="14" rx="1" />
	</Base>
);
export const Leaf = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
		<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
	</Base>
);
export const LeafyGreen = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22" />
		<path d="M2 22 17 7" />
	</Base>
);
export const Lectern = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3" />
		<path d="M18 6V3a1 1 0 0 0-1-1h-3" />
		<rect width="8" height="12" x="8" y="10" rx="1" />
	</Base>
);
export const LensConcave = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 2a1 1 0 0 0-.8 1.6 14 14 0 0 1 0 16.8A1 1 0 0 0 7 22h10a1 1 0 0 0 .8-1.6 14 14 0 0 1 0-16.8A1 1 0 0 0 17 2z" />
	</Base>
);
export const LensConvex = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.433 2a1 1 0 0 1 .824.448 18 18 0 0 1 0 19.104 1 1 0 0 1-.824.448h-2.866a1 1 0 0 1-.824-.448 18 18 0 0 1 0-19.104A1 1 0 0 1 10.567 2z" />
	</Base>
);
export const Library = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 6 4 14" />
		<path d="M12 6v14" />
		<path d="M8 8v12" />
		<path d="M4 4v16" />
	</Base>
);
export const LibraryBig = (p: IconProps) => (
	<Base {...p}>
		<rect width="8" height="18" x="3" y="3" rx="1" />
		<path d="M7 3v18" />
		<path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z" />
	</Base>
);
export const LifeBuoy = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="m4.93 4.93 4.24 4.24" />
		<path d="m14.83 9.17 4.24-4.24" />
		<path d="m14.83 14.83 4.24 4.24" />
		<path d="m9.17 14.83-4.24 4.24" />
		<circle cx="12" cy="12" r="4" />
	</Base>
);
export const Ligature = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 12h2v8" />
		<path d="M14 20h4" />
		<path d="M6 12h4" />
		<path d="M6 20h4" />
		<path d="M8 20V8a4 4 0 0 1 7.464-2" />
	</Base>
);
export const Lightbulb = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
		<path d="M9 18h6" />
		<path d="M10 22h4" />
	</Base>
);
export const LightbulbOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5" />
		<path d="m2 2 20 20" />
		<path d="M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5" />
		<path d="M9 18h6" />
		<path d="M10 22h4" />
	</Base>
);
export const LineDotRightHorizontal = (p: IconProps) => (
	<Base {...p}>
		<path d="M 3 12 L 15 12" />
		<circle cx="18" cy="12" r="3" />
	</Base>
);
export const LineSquiggle = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2" />
	</Base>
);
export const LineStyle = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 5h2" />
		<path d="M15 12h6" />
		<path d="M19 5h2" />
		<path d="M3 12h6" />
		<path d="M3 19h18" />
		<path d="M3 5h2" />
	</Base>
);
export const Link = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
		<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
	</Base>
);
export const Link2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 17H7A5 5 0 0 1 7 7h2" />
		<path d="M15 7h2a5 5 0 1 1 0 10h-2" />
		<line x1="8" x2="16" y1="12" y2="12" />
	</Base>
);
export const Link2Off = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 17H7A5 5 0 0 1 7 7" />
		<path d="M15 7h2a5 5 0 0 1 4 8" />
		<line x1="8" x2="12" y1="12" y2="12" />
		<line x1="2" x2="22" y1="2" y2="22" />
	</Base>
);
export const List = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 5h.01" />
		<path d="M3 12h.01" />
		<path d="M3 19h.01" />
		<path d="M8 5h13" />
		<path d="M8 12h13" />
		<path d="M8 19h13" />
	</Base>
);
export const ListCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 5H3" />
		<path d="M16 12H3" />
		<path d="M11 19H3" />
		<path d="m15 18 2 2 4-4" />
	</Base>
);
export const ListChecks = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 5h8" />
		<path d="M13 12h8" />
		<path d="M13 19h8" />
		<path d="m3 17 2 2 4-4" />
		<path d="m3 7 2 2 4-4" />
	</Base>
);
export const ListChevronsDownUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 5h8" />
		<path d="M3 12h8" />
		<path d="M3 19h8" />
		<path d="m15 5 3 3 3-3" />
		<path d="m15 19 3-3 3 3" />
	</Base>
);
export const ListChevronsUpDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 5h8" />
		<path d="M3 12h8" />
		<path d="M3 19h8" />
		<path d="m15 8 3-3 3 3" />
		<path d="m15 16 3 3 3-3" />
	</Base>
);
export const ListCollapse = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 5h11" />
		<path d="M10 12h11" />
		<path d="M10 19h11" />
		<path d="m3 10 3-3-3-3" />
		<path d="m3 20 3-3-3-3" />
	</Base>
);
export const ListEnd = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 5H3" />
		<path d="M16 12H3" />
		<path d="M9 19H3" />
		<path d="m16 16-3 3 3 3" />
		<path d="M21 5v12a2 2 0 0 1-2 2h-6" />
	</Base>
);
export const ListFilter = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 5h20" />
		<path d="M6 12h12" />
		<path d="M9 19h6" />
	</Base>
);
export const ListFilterPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 5H2" />
		<path d="M6 12h12" />
		<path d="M9 19h6" />
		<path d="M16 5h6" />
		<path d="M19 8V2" />
	</Base>
);
export const ListIndentDecrease = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 5H11" />
		<path d="M21 12H11" />
		<path d="M21 19H11" />
		<path d="m7 8-4 4 4 4" />
	</Base>
);
export const ListIndentIncrease = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 5H11" />
		<path d="M21 12H11" />
		<path d="M21 19H11" />
		<path d="m3 8 4 4-4 4" />
	</Base>
);
export const ListMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 5H3" />
		<path d="M11 12H3" />
		<path d="M16 19H3" />
		<path d="M21 12h-6" />
	</Base>
);
export const ListMusic = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 5H3" />
		<path d="M11 12H3" />
		<path d="M11 19H3" />
		<path d="M21 16V5" />
		<circle cx="18" cy="16" r="3" />
	</Base>
);
export const ListOrdered = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 5h10" />
		<path d="M11 12h10" />
		<path d="M11 19h10" />
		<path d="M4 4h1v5" />
		<path d="M4 9h2" />
		<path d="M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02" />
	</Base>
);
export const ListPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 5H3" />
		<path d="M11 12H3" />
		<path d="M16 19H3" />
		<path d="M18 9v6" />
		<path d="M21 12h-6" />
	</Base>
);
export const ListRestart = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 5H3" />
		<path d="M7 12H3" />
		<path d="M7 19H3" />
		<path d="M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14" />
		<path d="M11 10v4h4" />
	</Base>
);
export const ListSortAscending = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 19h18" />
		<path d="M15 12H3" />
		<path d="M9 5H3" />
	</Base>
);
export const ListSortDescending = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 12H3" />
		<path d="M3 5h18" />
		<path d="M9 19H3" />
	</Base>
);
export const ListStart = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 5h6" />
		<path d="M3 12h13" />
		<path d="M3 19h13" />
		<path d="m16 8-3-3 3-3" />
		<path d="M21 19V7a2 2 0 0 0-2-2h-6" />
	</Base>
);
export const ListTodo = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 5h8" />
		<path d="M13 12h8" />
		<path d="M13 19h8" />
		<path d="m3 17 2 2 4-4" />
		<rect x="3" y="4" width="6" height="6" rx="1" />
	</Base>
);
export const ListTree = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 5h13" />
		<path d="M13 12h8" />
		<path d="M13 19h8" />
		<path d="M3 10a2 2 0 0 0 2 2h3" />
		<path d="M3 5v12a2 2 0 0 0 2 2h3" />
	</Base>
);
export const ListVideo = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 5H3" />
		<path d="M10 12H3" />
		<path d="M10 19H3" />
		<path d="M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z" />
	</Base>
);
export const ListX = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 5H3" />
		<path d="M11 12H3" />
		<path d="M16 19H3" />
		<path d="m15.5 9.5 5 5" />
		<path d="m20.5 9.5-5 5" />
	</Base>
);
export const Loader = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v4" />
		<path d="m16.2 7.8 2.9-2.9" />
		<path d="M18 12h4" />
		<path d="m16.2 16.2 2.9 2.9" />
		<path d="M12 18v4" />
		<path d="m4.9 19.1 2.9-2.9" />
		<path d="M2 12h4" />
		<path d="m4.9 4.9 2.9 2.9" />
	</Base>
);
export const LoaderCircle = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 12a9 9 0 1 1-6.219-8.56" />
	</Base>
);
export const LoaderPinwheel = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" />
		<path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
		<path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
		<circle cx="12" cy="12" r="10" />
	</Base>
);
export const Locate = (p: IconProps) => (
	<Base {...p}>
		<line x1="2" x2="5" y1="12" y2="12" />
		<line x1="19" x2="22" y1="12" y2="12" />
		<line x1="12" x2="12" y1="2" y2="5" />
		<line x1="12" x2="12" y1="19" y2="22" />
		<circle cx="12" cy="12" r="7" />
	</Base>
);
export const LocateFixed = (p: IconProps) => (
	<Base {...p}>
		<line x1="2" x2="5" y1="12" y2="12" />
		<line x1="19" x2="22" y1="12" y2="12" />
		<line x1="12" x2="12" y1="2" y2="5" />
		<line x1="12" x2="12" y1="19" y2="22" />
		<circle cx="12" cy="12" r="7" />
		<circle cx="12" cy="12" r="3" />
	</Base>
);
export const LocateOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 19v3" />
		<path d="M12 2v3" />
		<path d="M18.89 13.24a7 7 0 0 0-8.13-8.13" />
		<path d="M19 12h3" />
		<path d="M2 12h3" />
		<path d="m2 2 20 20" />
		<path d="M7.05 7.05a7 7 0 0 0 9.9 9.9" />
	</Base>
);
export const Lock = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
		<path d="M7 11V7a5 5 0 0 1 10 0v4" />
	</Base>
);
export const LockKeyhole = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="16" r="1" />
		<rect x="3" y="10" width="18" height="12" rx="2" />
		<path d="M7 10V7a5 5 0 0 1 10 0v3" />
	</Base>
);
export const LockKeyholeOpen = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="16" r="1" />
		<rect width="18" height="12" x="3" y="10" rx="2" />
		<path d="M7 10V7a5 5 0 0 1 9.33-2.5" />
	</Base>
);
export const LockOpen = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
		<path d="M7 11V7a5 5 0 0 1 9.9-1" />
	</Base>
);
export const LogIn = (p: IconProps) => (
	<Base {...p}>
		<path d="m10 17 5-5-5-5" />
		<path d="M15 12H3" />
		<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
	</Base>
);
export const LogOut = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 17 5-5-5-5" />
		<path d="M21 12H9" />
		<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
	</Base>
);
export const Logs = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 5h1" />
		<path d="M3 12h1" />
		<path d="M3 19h1" />
		<path d="M8 5h1" />
		<path d="M8 12h1" />
		<path d="M8 19h1" />
		<path d="M13 5h8" />
		<path d="M13 12h8" />
		<path d="M13 19h8" />
	</Base>
);
export const Lollipop = (p: IconProps) => (
	<Base {...p}>
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.3-4.3" />
		<path d="M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0" />
	</Base>
);
export const Luggage = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
		<path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
		<path d="M10 20h4" />
		<circle cx="16" cy="20" r="2" />
		<circle cx="8" cy="20" r="2" />
	</Base>
);
export const Magnet = (p: IconProps) => (
	<Base {...p}>
		<path d="m12 15 4 4" />
		<path d="M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z" />
		<path d="m5 8 4 4" />
	</Base>
);
export const Mail = (p: IconProps) => (
	<Base {...p}>
		<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
		<rect x="2" y="4" width="20" height="16" rx="2" />
	</Base>
);
export const MailCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
		<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		<path d="m16 19 2 2 4-4" />
	</Base>
);
export const MailMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
		<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		<path d="M16 19h6" />
	</Base>
);
export const MailOpen = (p: IconProps) => (
	<Base {...p}>
		<path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
		<path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
	</Base>
);
export const MailPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
		<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		<path d="M19 16v6" />
		<path d="M16 19h6" />
	</Base>
);
export const MailQuestionMark = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" />
		<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		<path d="M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2" />
		<path d="M20 22v.01" />
	</Base>
);
export const MailSearch = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5" />
		<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		<path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
		<circle cx="18" cy="18" r="3" />
		<path d="m22 22-1.5-1.5" />
	</Base>
);
export const MailWarning = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" />
		<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		<path d="M20 14v4" />
		<path d="M20 22v.01" />
	</Base>
);
export const MailX = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" />
		<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		<path d="m17 17 4 4" />
		<path d="m21 17-4 4" />
	</Base>
);
export const Mailbox = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
		<polyline points="15,9 18,9 18,11" />
		<path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2" />
		<line x1="6" x2="7" y1="10" y2="10" />
	</Base>
);
export const Mails = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732" />
		<path d="m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5" />
		<rect x="7" y="3" width="15" height="12" rx="2" />
	</Base>
);
// biome-ignore lint/suspicious/noShadowRestrictedNames: nom d'icône du pack conservé
export const Map = (p: IconProps) => (
	<Base {...p}>
		<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
		<path d="M15 5.764v15" />
		<path d="M9 3.236v15" />
	</Base>
);
export const MapMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V14" />
		<path d="M15 5.764V14" />
		<path d="M21 18h-6" />
		<path d="M9 3.236v15" />
	</Base>
);
export const MapPin = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
		<circle cx="12" cy="10" r="3" />
	</Base>
);
export const MapPinCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728" />
		<circle cx="12" cy="10" r="3" />
		<path d="m16 18 2 2 4-4" />
	</Base>
);
export const MapPinCheckInside = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
		<path d="m9 10 2 2 4-4" />
	</Base>
);
export const MapPinHouse = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" />
		<path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" />
		<path d="M18 22v-3" />
		<circle cx="10" cy="10" r="3" />
	</Base>
);
export const MapPinMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738" />
		<circle cx="12" cy="10" r="3" />
		<path d="M16 18h6" />
	</Base>
);
export const MapPinMinusInside = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
		<path d="M9 10h6" />
	</Base>
);
export const MapPinOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.75 7.09a3 3 0 0 1 2.16 2.16" />
		<path d="M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568" />
		<path d="m2 2 20 20" />
		<path d="M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533" />
		<path d="M9.13 9.13a3 3 0 0 0 3.74 3.74" />
	</Base>
);
export const MapPinPen = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468" />
		<path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
		<circle cx="10" cy="10" r="3" />
	</Base>
);
export const MapPinPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738" />
		<circle cx="12" cy="10" r="3" />
		<path d="M16 18h6" />
		<path d="M19 15v6" />
	</Base>
);
export const MapPinPlusInside = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
		<path d="M12 7v6" />
		<path d="M9 10h6" />
	</Base>
);
export const MapPinSearch = (p: IconProps) => (
	<Base {...p}>
		<path d="M 12.248 21.969 a 1 1 0 0 1 -0.849 -0.17 C 9.539 20.193 4 14.993 4 10 a 8 8 0 0 1 16 0 C 20 10.42 19.961 10.841 19.888 11.262" />
		<path d="m22 22-1.88-1.88" />
		<circle cx="12" cy="10" r="3" />
		<circle cx="18" cy="18" r="3" />
	</Base>
);
export const MapPinX = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077" />
		<circle cx="12" cy="10" r="3" />
		<path d="m21.5 15.5-5 5" />
		<path d="m21.5 20.5-5-5" />
	</Base>
);
export const MapPinXInside = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
		<path d="m14.5 7.5-5 5" />
		<path d="m9.5 7.5 5 5" />
	</Base>
);
export const MapPinned = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" />
		<circle cx="12" cy="8" r="2" />
		<path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" />
	</Base>
);
export const MapPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12" />
		<path d="M15 5.764V12" />
		<path d="M18 15v6" />
		<path d="M21 18h-6" />
		<path d="M9 3.236v15" />
	</Base>
);
export const Mars = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 3h5v5" />
		<path d="m21 3-6.75 6.75" />
		<circle cx="10" cy="14" r="6" />
	</Base>
);
export const MarsStroke = (p: IconProps) => (
	<Base {...p}>
		<path d="m14 6 4 4" />
		<path d="M17 3h4v4" />
		<path d="m21 3-7.75 7.75" />
		<circle cx="9" cy="15" r="6" />
	</Base>
);
export const Martini = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 12 4.207 4.207A.707.707 0 0 1 4.707 3h14.586a.707.707 0 0 1 .5 1.207z" />
		<path d="M12 12v10" />
		<path d="M7 22h10" />
	</Base>
);
export const Maximize = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 3H5a2 2 0 0 0-2 2v3" />
		<path d="M21 8V5a2 2 0 0 0-2-2h-3" />
		<path d="M3 16v3a2 2 0 0 0 2 2h3" />
		<path d="M16 21h3a2 2 0 0 0 2-2v-3" />
	</Base>
);
export const Maximize2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 3h6v6" />
		<path d="m21 3-7 7" />
		<path d="m3 21 7-7" />
		<path d="M9 21H3v-6" />
	</Base>
);
export const Medal = (p: IconProps) => (
	<Base {...p}>
		<path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
		<path d="M11 12 5.12 2.2" />
		<path d="m13 12 5.88-9.8" />
		<path d="M8 7h8" />
		<circle cx="12" cy="17" r="5" />
		<path d="M12 18v-2h-.5" />
	</Base>
);
export const Megaphone = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
		<path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
		<path d="M8 6v8" />
	</Base>
);
export const MegaphoneOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.636 6A13 13 0 0 0 19.4 3.2 1 1 0 0 1 21 4v11.344" />
		<path d="M14.378 14.357A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1" />
		<path d="m2 2 20 20" />
		<path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
		<path d="M8 8v6" />
	</Base>
);
export const Meh = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<line x1="8" x2="16" y1="15" y2="15" />
		<line x1="9" x2="9.01" y1="9" y2="9" />
		<line x1="15" x2="15.01" y1="9" y2="9" />
	</Base>
);
export const MemoryStick = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 12v-2" />
		<path d="M12 18v-2" />
		<path d="M16 12v-2" />
		<path d="M16 18v-2" />
		<path d="M2 11h1.5" />
		<path d="M20 18v-2" />
		<path d="M20.5 11H22" />
		<path d="M4 18v-2" />
		<path d="M8 12v-2" />
		<path d="M8 18v-2" />
		<rect x="2" y="6" width="20" height="10" rx="2" />
	</Base>
);
export const Menu = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 5h16" />
		<path d="M4 12h16" />
		<path d="M4 19h16" />
	</Base>
);
export const Merge = (p: IconProps) => (
	<Base {...p}>
		<path d="m8 6 4-4 4 4" />
		<path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
		<path d="m20 22-5-5" />
	</Base>
);
export const MessageCircle = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
	</Base>
);
export const MessageCircleCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
		<path d="m9 12 2 2 4-4" />
	</Base>
);
export const MessageCircleCode = (p: IconProps) => (
	<Base {...p}>
		<path d="m10 9-3 3 3 3" />
		<path d="m14 15 3-3-3-3" />
		<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
	</Base>
);
export const MessageCircleDashed = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.1 2.182a10 10 0 0 1 3.8 0" />
		<path d="M13.9 21.818a10 10 0 0 1-3.8 0" />
		<path d="M17.609 3.72a10 10 0 0 1 2.69 2.7" />
		<path d="M2.182 13.9a10 10 0 0 1 0-3.8" />
		<path d="M20.28 17.61a10 10 0 0 1-2.7 2.69" />
		<path d="M21.818 10.1a10 10 0 0 1 0 3.8" />
		<path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" />
		<path d="m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98" />
	</Base>
);
export const MessageCircleHeart = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
		<path d="M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 5.004 2.224 3 3 0 0 1-.832 2.083l-3.447 3.62a1 1 0 0 1-1.45-.001z" />
	</Base>
);
export const MessageCircleMore = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
		<path d="M8 12h.01" />
		<path d="M12 12h.01" />
		<path d="M16 12h.01" />
	</Base>
);
export const MessageCircleOff = (p: IconProps) => (
	<Base {...p}>
		<path d="m2 2 20 20" />
		<path d="M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989" />
		<path d="M8.35 2.69A10 10 0 0 1 21.3 15.65" />
	</Base>
);
export const MessageCirclePlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
		<path d="M8 12h8" />
		<path d="M12 8v8" />
	</Base>
);
export const MessageCircleQuestionMark = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
		<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
		<path d="M12 17h.01" />
	</Base>
);
export const MessageCircleReply = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
		<path d="m10 15-3-3 3-3" />
		<path d="M7 12h8a2 2 0 0 1 2 2v1" />
	</Base>
);
export const MessageCircleWarning = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
		<path d="M12 8v4" />
		<path d="M12 16h.01" />
	</Base>
);
export const MessageCircleX = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
		<path d="m15 9-6 6" />
		<path d="m9 9 6 6" />
	</Base>
);
export const MessageSquare = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
	</Base>
);
export const MessageSquareCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
		<path d="m9 11 2 2 4-4" />
	</Base>
);
export const MessageSquareCode = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
		<path d="m10 8-3 3 3 3" />
		<path d="m14 14 3-3-3-3" />
	</Base>
);
export const MessageSquareDashed = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 3h2" />
		<path d="M16 19h-2" />
		<path d="M2 12v-2" />
		<path d="M2 16v5.286a.71.71 0 0 0 1.212.502l1.149-1.149" />
		<path d="M20 19a2 2 0 0 0 2-2v-1" />
		<path d="M22 10v2" />
		<path d="M22 6V5a2 2 0 0 0-2-2" />
		<path d="M4 3a2 2 0 0 0-2 2v1" />
		<path d="M8 19h2" />
		<path d="M8 3h2" />
	</Base>
);
export const MessageSquareDiff = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
		<path d="M10 15h4" />
		<path d="M10 9h4" />
		<path d="M12 7v4" />
	</Base>
);
export const MessageSquareDot = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.7 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4.7" />
		<circle cx="19" cy="6" r="3" />
	</Base>
);
export const MessageSquareHeart = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
		<path d="M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5" />
	</Base>
);
export const MessageSquareLock = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 8.5V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H10" />
		<path d="M20 15v-2a2 2 0 0 0-4 0v2" />
		<rect x="14" y="15" width="8" height="5" rx="1" />
	</Base>
);
export const MessageSquareMore = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
		<path d="M12 11h.01" />
		<path d="M16 11h.01" />
		<path d="M8 11h.01" />
	</Base>
);
export const MessageSquareOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826" />
		<path d="m2 2 20 20" />
		<path d="M8.656 3H20a2 2 0 0 1 2 2v11.344" />
	</Base>
);
export const MessageSquarePlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
		<path d="M12 8v6" />
		<path d="M9 11h6" />
	</Base>
);
export const MessageSquareQuote = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 14a2 2 0 0 0 2-2V8h-2" />
		<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
		<path d="M8 14a2 2 0 0 0 2-2V8H8" />
	</Base>
);
export const MessageSquareReply = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
		<path d="m10 8-3 3 3 3" />
		<path d="M17 14v-1a2 2 0 0 0-2-2H7" />
	</Base>
);
export const MessageSquareShare = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4" />
		<path d="M16 3h6v6" />
		<path d="m16 9 6-6" />
	</Base>
);
export const MessageSquareText = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
		<path d="M7 11h10" />
		<path d="M7 15h6" />
		<path d="M7 7h8" />
	</Base>
);
export const MessageSquareWarning = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
		<path d="M12 15h.01" />
		<path d="M12 7v4" />
	</Base>
);
export const MessageSquareX = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
		<path d="m14.5 8.5-5 5" />
		<path d="m9.5 8.5 5 5" />
	</Base>
);
export const MessagesSquare = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
		<path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" />
	</Base>
);
export const Metronome = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 11.4V9.1" />
		<path d="m12 17 6.59-6.59" />
		<path d="m15.05 5.7-.218-.691a3 3 0 0 0-5.663 0L4.418 19.695A1 1 0 0 0 5.37 21h13.253a1 1 0 0 0 .951-1.31L18.45 16.2" />
		<circle cx="20" cy="9" r="2" />
	</Base>
);
export const Mic = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 19v3" />
		<path d="M19 10v2a7 7 0 0 1-14 0v-2" />
		<rect x="9" y="2" width="6" height="13" rx="3" />
	</Base>
);
export const MicOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 19v3" />
		<path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
		<path d="M16.95 16.95A7 7 0 0 1 5 12v-2" />
		<path d="M18.89 13.23A7 7 0 0 0 19 12v-2" />
		<path d="m2 2 20 20" />
		<path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
	</Base>
);
export const MicVocal = (p: IconProps) => (
	<Base {...p}>
		<path d="m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12" />
		<path d="M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5" />
		<circle cx="16" cy="7" r="5" />
	</Base>
);
export const Microchip = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 12h4" />
		<path d="M10 17h4" />
		<path d="M10 7h4" />
		<path d="M18 12h2" />
		<path d="M18 18h2" />
		<path d="M18 6h2" />
		<path d="M4 12h2" />
		<path d="M4 18h2" />
		<path d="M4 6h2" />
		<rect x="6" y="2" width="12" height="20" rx="2" />
	</Base>
);
export const Microscope = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 18h8" />
		<path d="M3 22h18" />
		<path d="M14 22a7 7 0 1 0 0-14h-1" />
		<path d="M9 14h2" />
		<path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
		<path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
	</Base>
);
export const Microwave = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="15" x="2" y="4" rx="2" />
		<rect width="8" height="7" x="6" y="8" rx="1" />
		<path d="M18 8v7" />
		<path d="M6 19v2" />
		<path d="M18 19v2" />
	</Base>
);
export const Milestone = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 13v8" />
		<path d="M12 3v3" />
		<path d="M18.172 6a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />
	</Base>
);
export const Milk = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 2h8" />
		<path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" />
		<path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
	</Base>
);
export const MilkOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 2h8" />
		<path d="M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3" />
		<path d="M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435" />
		<line x1="2" x2="22" y1="2" y2="22" />
	</Base>
);
export const Minimize = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 3v3a2 2 0 0 1-2 2H3" />
		<path d="M21 8h-3a2 2 0 0 1-2-2V3" />
		<path d="M3 16h3a2 2 0 0 1 2 2v3" />
		<path d="M16 21v-3a2 2 0 0 1 2-2h3" />
	</Base>
);
export const Minimize2 = (p: IconProps) => (
	<Base {...p}>
		<path d="m14 10 7-7" />
		<path d="M20 10h-6V4" />
		<path d="m3 21 7-7" />
		<path d="M4 14h6v6" />
	</Base>
);
export const MirrorRectangular = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 6 8 9" />
		<path d="m16 7-8 8" />
		<rect x="4" y="2" width="16" height="20" rx="2" />
	</Base>
);
export const MirrorRound = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 6.6 8.6 8" />
		<path d="M12 18v4" />
		<path d="M15 7.5 9.5 13" />
		<path d="M7 22h10" />
		<circle cx="12" cy="10" r="8" />
	</Base>
);
export const Monitor = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="14" x="2" y="3" rx="2" />
		<line x1="8" x2="16" y1="21" y2="21" />
		<line x1="12" x2="12" y1="17" y2="21" />
	</Base>
);
export const MonitorCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="m9 10 2 2 4-4" />
		<rect width="20" height="14" x="2" y="3" rx="2" />
		<path d="M12 17v4" />
		<path d="M8 21h8" />
	</Base>
);
export const MonitorCloud = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 13a3 3 0 1 1 2.83-4H14a2 2 0 0 1 0 4z" />
		<path d="M12 17v4" />
		<path d="M8 21h8" />
		<rect x="2" y="3" width="20" height="14" rx="2" />
	</Base>
);
export const MonitorCog = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 17v4" />
		<path d="m14.305 7.53.923-.382" />
		<path d="m15.228 4.852-.923-.383" />
		<path d="m16.852 3.228-.383-.924" />
		<path d="m16.852 8.772-.383.923" />
		<path d="m19.148 3.228.383-.924" />
		<path d="m19.53 9.696-.382-.924" />
		<path d="m20.772 4.852.924-.383" />
		<path d="m20.772 7.148.924.383" />
		<path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
		<path d="M8 21h8" />
		<circle cx="18" cy="6" r="3" />
	</Base>
);
export const MonitorDot = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 17v4" />
		<path d="M22 12.307V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693" />
		<path d="M8 21h8" />
		<circle cx="19" cy="6" r="3" />
	</Base>
);
export const MonitorDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 13V7" />
		<path d="m15 10-3 3-3-3" />
		<rect width="20" height="14" x="2" y="3" rx="2" />
		<path d="M12 17v4" />
		<path d="M8 21h8" />
	</Base>
);
export const MonitorOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 17v4" />
		<path d="M17 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 1.184-1.826" />
		<path d="m2 2 20 20" />
		<path d="M8 21h8" />
		<path d="M8.656 3H20a2 2 0 0 1 2 2v10a2 2 0 0 1-.293 1.042" />
	</Base>
);
export const MonitorPause = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 13V7" />
		<path d="M14 13V7" />
		<rect width="20" height="14" x="2" y="3" rx="2" />
		<path d="M12 17v4" />
		<path d="M8 21h8" />
	</Base>
);
export const MonitorPlay = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" />
		<path d="M12 17v4" />
		<path d="M8 21h8" />
		<rect x="2" y="3" width="20" height="14" rx="2" />
	</Base>
);
export const MonitorSmartphone = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
		<path d="M10 19v-3.96 3.15" />
		<path d="M7 19h5" />
		<rect width="6" height="10" x="16" y="12" rx="2" />
	</Base>
);
export const MonitorSpeaker = (p: IconProps) => (
	<Base {...p}>
		<path d="M5.5 20H8" />
		<path d="M17 9h.01" />
		<rect width="10" height="16" x="12" y="4" rx="2" />
		<path d="M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4" />
		<circle cx="17" cy="15" r="1" />
	</Base>
);
export const MonitorStop = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 17v4" />
		<path d="M8 21h8" />
		<rect x="2" y="3" width="20" height="14" rx="2" />
		<rect x="9" y="7" width="6" height="6" rx="1" />
	</Base>
);
export const MonitorUp = (p: IconProps) => (
	<Base {...p}>
		<path d="m9 10 3-3 3 3" />
		<path d="M12 13V7" />
		<rect width="20" height="14" x="2" y="3" rx="2" />
		<path d="M12 17v4" />
		<path d="M8 21h8" />
	</Base>
);
export const MonitorX = (p: IconProps) => (
	<Base {...p}>
		<path d="m14.5 12.5-5-5" />
		<path d="m9.5 12.5 5-5" />
		<rect width="20" height="14" x="2" y="3" rx="2" />
		<path d="M12 17v4" />
		<path d="M8 21h8" />
	</Base>
);
export const Moon = (p: IconProps) => (
	<Base {...p}>
		<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
	</Base>
);
export const MoonStar = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 5h4" />
		<path d="M20 3v4" />
		<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
	</Base>
);
export const Motorbike = (p: IconProps) => (
	<Base {...p}>
		<path d="m18 14-1-3" />
		<path d="m3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81" />
		<path d="M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5" />
		<circle cx="19" cy="17" r="3" />
		<circle cx="5" cy="17" r="3" />
	</Base>
);
export const Mountain = (p: IconProps) => (
	<Base {...p}>
		<path d="m8 3 4 8 5-5 5 15H2L8 3z" />
	</Base>
);
export const MountainSnow = (p: IconProps) => (
	<Base {...p}>
		<path d="m8 3 4 8 5-5 5 15H2L8 3z" />
		<path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" />
	</Base>
);
export const Mouse = (p: IconProps) => (
	<Base {...p}>
		<rect x="5" y="2" width="14" height="20" rx="7" />
		<path d="M12 6v4" />
	</Base>
);
export const MouseLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 7.318V10" />
		<path d="M5 10v5a7 7 0 0 0 14 0V9c0-3.527-2.608-6.515-6-7" />
		<circle cx="7" cy="4" r="2" />
	</Base>
);
export const MouseOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6v.343" />
		<path d="M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218" />
		<path d="M19 13.343V9A7 7 0 0 0 8.56 2.902" />
		<path d="M22 22 2 2" />
	</Base>
);
export const MousePointer = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.586 12.586 19 19" />
		<path d="M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z" />
	</Base>
);
export const MousePointer2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" />
	</Base>
);
export const MousePointer2Off = (p: IconProps) => (
	<Base {...p}>
		<path d="m15.55 8.45 5.138 2.087a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063L8.45 15.551" />
		<path d="M22 2 2 22" />
		<path d="m6.816 11.528-2.779-6.84a.495.495 0 0 1 .651-.651l6.84 2.779" />
	</Base>
);
export const MousePointerBan = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z" />
		<circle cx="16" cy="16" r="6" />
		<path d="m11.8 11.8 8.4 8.4" />
	</Base>
);
export const MousePointerClick = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 4.1 12 6" />
		<path d="m5.1 8-2.9-.8" />
		<path d="m6 12-1.9 2" />
		<path d="M7.2 2.2 8 5.1" />
		<path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
	</Base>
);
export const MouseRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 7.318V10" />
		<path d="M19 10v5a7 7 0 0 1-14 0V9c0-3.527 2.608-6.515 6-7" />
		<circle cx="17" cy="4" r="2" />
	</Base>
);
export const Move = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v20" />
		<path d="m15 19-3 3-3-3" />
		<path d="m19 9 3 3-3 3" />
		<path d="M2 12h20" />
		<path d="m5 9-3 3 3 3" />
		<path d="m9 5 3-3 3 3" />
	</Base>
);
export const Move3d = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 3v16h16" />
		<path d="m5 19 6-6" />
		<path d="m2 6 3-3 3 3" />
		<path d="m18 16 3 3-3 3" />
	</Base>
);
export const MoveDiagonal = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 19H5v-6" />
		<path d="M13 5h6v6" />
		<path d="M19 5 5 19" />
	</Base>
);
export const MoveDiagonal2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 13v6h-6" />
		<path d="M5 11V5h6" />
		<path d="m5 5 14 14" />
	</Base>
);
export const MoveDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 18L12 22L16 18" />
		<path d="M12 2V22" />
	</Base>
);
export const MoveDownLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 19H5V13" />
		<path d="M19 5L5 19" />
	</Base>
);
export const MoveDownRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 13V19H13" />
		<path d="M5 5L19 19" />
	</Base>
);
export const MoveHorizontal = (p: IconProps) => (
	<Base {...p}>
		<path d="m18 8 4 4-4 4" />
		<path d="M2 12h20" />
		<path d="m6 8-4 4 4 4" />
	</Base>
);
export const MoveLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 8L2 12L6 16" />
		<path d="M2 12H22" />
	</Base>
);
export const MoveRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 8L22 12L18 16" />
		<path d="M2 12H22" />
	</Base>
);
export const MoveUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 6L12 2L16 6" />
		<path d="M12 2V22" />
	</Base>
);
export const MoveUpLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 11V5H11" />
		<path d="M5 5L19 19" />
	</Base>
);
export const MoveUpRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 5H19V11" />
		<path d="M19 5L5 19" />
	</Base>
);
export const MoveVertical = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v20" />
		<path d="m8 18 4 4 4-4" />
		<path d="m8 6 4-4 4 4" />
	</Base>
);
export const Music = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 18V5l12-2v13" />
		<circle cx="6" cy="18" r="3" />
		<circle cx="18" cy="16" r="3" />
	</Base>
);
export const Music2 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="8" cy="18" r="4" />
		<path d="M12 18V2l7 4" />
	</Base>
);
export const Music3 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="18" r="4" />
		<path d="M16 18V2" />
	</Base>
);
export const Music4 = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 18V5l12-2v13" />
		<path d="m9 9 12-2" />
		<circle cx="6" cy="18" r="3" />
		<circle cx="18" cy="16" r="3" />
	</Base>
);
export const Navigation = (p: IconProps) => (
	<Base {...p}>
		<polygon points="3 11 22 2 13 21 11 13 3 11" />
	</Base>
);
export const Navigation2 = (p: IconProps) => (
	<Base {...p}>
		<polygon points="12 2 19 21 12 17 5 21 12 2" />
	</Base>
);
export const Navigation2Off = (p: IconProps) => (
	<Base {...p}>
		<path d="M9.31 9.31 5 21l7-4 7 4-1.17-3.17" />
		<path d="M14.53 8.88 12 2l-1.17 3.17" />
		<line x1="2" x2="22" y1="2" y2="22" />
	</Base>
);
export const NavigationOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M8.43 8.43 3 11l8 2 2 8 2.57-5.43" />
		<path d="M17.39 11.73 22 2l-9.73 4.61" />
		<line x1="2" x2="22" y1="2" y2="22" />
	</Base>
);
export const Network = (p: IconProps) => (
	<Base {...p}>
		<rect x="16" y="16" width="6" height="6" rx="1" />
		<rect x="2" y="16" width="6" height="6" rx="1" />
		<rect x="9" y="2" width="6" height="6" rx="1" />
		<path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
		<path d="M12 12V8" />
	</Base>
);
export const Newspaper = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 18h-5" />
		<path d="M18 14h-8" />
		<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
		<rect width="8" height="4" x="10" y="6" rx="1" />
	</Base>
);
export const Nfc = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 8.32a7.43 7.43 0 0 1 0 7.36" />
		<path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58" />
		<path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8" />
		<path d="M16.37 2a20.16 20.16 0 0 1 0 20" />
	</Base>
);
export const NonBinary = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v10" />
		<path d="m8.5 4 7 4" />
		<path d="m8.5 8 7-4" />
		<circle cx="12" cy="17" r="5" />
	</Base>
);
export const Notebook = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 6h4" />
		<path d="M2 10h4" />
		<path d="M2 14h4" />
		<path d="M2 18h4" />
		<rect width="16" height="20" x="4" y="2" rx="2" />
		<path d="M16 2v20" />
	</Base>
);
export const NotebookPen = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
		<path d="M2 6h4" />
		<path d="M2 10h4" />
		<path d="M2 14h4" />
		<path d="M2 18h4" />
		<path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
	</Base>
);
export const NotebookTabs = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 6h4" />
		<path d="M2 10h4" />
		<path d="M2 14h4" />
		<path d="M2 18h4" />
		<rect width="16" height="20" x="4" y="2" rx="2" />
		<path d="M15 2v20" />
		<path d="M15 7h5" />
		<path d="M15 12h5" />
		<path d="M15 17h5" />
	</Base>
);
export const NotebookText = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 6h4" />
		<path d="M2 10h4" />
		<path d="M2 14h4" />
		<path d="M2 18h4" />
		<rect width="16" height="20" x="4" y="2" rx="2" />
		<path d="M9.5 8h5" />
		<path d="M9.5 12H16" />
		<path d="M9.5 16H14" />
	</Base>
);
export const NotepadText = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 2v4" />
		<path d="M12 2v4" />
		<path d="M16 2v4" />
		<rect width="16" height="18" x="4" y="4" rx="2" />
		<path d="M8 10h6" />
		<path d="M8 14h8" />
		<path d="M8 18h5" />
	</Base>
);
export const NotepadTextDashed = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 2v4" />
		<path d="M12 2v4" />
		<path d="M16 2v4" />
		<path d="M16 4h2a2 2 0 0 1 2 2v2" />
		<path d="M20 12v2" />
		<path d="M20 18v2a2 2 0 0 1-2 2h-1" />
		<path d="M13 22h-2" />
		<path d="M7 22H6a2 2 0 0 1-2-2v-2" />
		<path d="M4 14v-2" />
		<path d="M4 8V6a2 2 0 0 1 2-2h2" />
		<path d="M8 10h6" />
		<path d="M8 14h8" />
		<path d="M8 18h5" />
	</Base>
);
export const Nut = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 4V2" />
		<path d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4" />
		<path d="M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z" />
	</Base>
);
export const NutOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 4V2" />
		<path d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939" />
		<path d="M19 10v3.343" />
		<path d="M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192" />
		<line x1="2" x2="22" y1="2" y2="22" />
	</Base>
);
export const Octagon = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" />
	</Base>
);
export const OctagonAlert = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 16h.01" />
		<path d="M12 8v4" />
		<path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z" />
	</Base>
);
export const OctagonMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" />
		<path d="M8 12h8" />
	</Base>
);
export const OctagonPause = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 15V9" />
		<path d="M14 15V9" />
		<path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" />
	</Base>
);
export const OctagonX = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 9-6 6" />
		<path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" />
		<path d="m9 9 6 6" />
	</Base>
);
export const Omega = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21" />
	</Base>
);
export const Option = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 3h7" />
		<path d="M3 3h5.28a1 1 0 0 1 .948.684l5.544 16.632a1 1 0 0 0 .949.684H21" />
	</Base>
);
export const Orbit = (p: IconProps) => (
	<Base {...p}>
		<path d="M20.341 6.484A10 10 0 0 1 10.266 21.85" />
		<path d="M3.659 17.516A10 10 0 0 1 13.74 2.152" />
		<circle cx="12" cy="12" r="3" />
		<circle cx="19" cy="5" r="2" />
		<circle cx="5" cy="19" r="2" />
	</Base>
);
export const Origami = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025" />
		<path d="m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009" />
		<path d="m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027" />
	</Base>
);
export const Package = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
		<path d="M12 22V12" />
		<polyline points="3.29 7 12 12 20.71 7" />
		<path d="m7.5 4.27 9 5.15" />
	</Base>
);
export const Package2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3v6" />
		<path d="M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z" />
		<path d="M3.054 9.013h17.893" />
	</Base>
);
export const PackageCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22V12" />
		<path d="m16 17 2 2 4-4" />
		<path d="M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753" />
		<path d="M3.29 7 12 12l8.71-5" />
		<path d="m7.5 4.27 8.997 5.148" />
	</Base>
);
export const PackageMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22V12" />
		<path d="M16 17h6" />
		<path d="M21 13V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955" />
		<path d="M3.29 7 12 12l8.71-5" />
		<path d="m7.5 4.27 8.997 5.148" />
	</Base>
);
export const PackageOpen = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22v-9" />
		<path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z" />
		<path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13" />
		<path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z" />
	</Base>
);
export const PackagePlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22V12" />
		<path d="M16 17h6" />
		<path d="M19 14v6" />
		<path d="M21 10.535V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955" />
		<path d="M3.29 7 12 12l8.71-5" />
		<path d="m7.5 4.27 8.997 5.148" />
	</Base>
);
export const PackageSearch = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22V12" />
		<path d="M20.27 18.27 22 20" />
		<path d="M21 10.498V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.98-.559" />
		<path d="M3.29 7 12 12l8.71-5" />
		<path d="m7.5 4.27 8.997 5.148" />
		<circle cx="18.5" cy="16.5" r="2.5" />
	</Base>
);
export const PackageX = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22V12" />
		<path d="m16.5 14.5 5 5" />
		<path d="m16.5 19.5 5-5" />
		<path d="M21 10.5V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.13-.074" />
		<path d="M3.29 7 12 12l8.71-5" />
		<path d="m7.5 4.27 8.997 5.148" />
	</Base>
);
export const PaintBucket = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 7 6 2" />
		<path d="M18.992 12H2.041" />
		<path d="M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595" />
		<path d="m8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33" />
	</Base>
);
export const PaintRoller = (p: IconProps) => (
	<Base {...p}>
		<rect width="16" height="6" x="2" y="2" rx="2" />
		<path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
		<rect width="4" height="6" x="8" y="16" rx="1" />
	</Base>
);
export const Paintbrush = (p: IconProps) => (
	<Base {...p}>
		<path d="m14.622 17.897-10.68-2.913" />
		<path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
		<path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />
	</Base>
);
export const PaintbrushVertical = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 2v2" />
		<path d="M14 2v4" />
		<path d="M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z" />
		<path d="M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1" />
	</Base>
);
export const Panda = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.25 17.25h1.5L12 18z" />
		<path d="m15 12 2 2" />
		<path d="M18 6.5a.5.5 0 0 0-.5-.5" />
		<path d="M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83" />
		<path d="M6 6.5a.495.495 0 0 1 .5-.5" />
		<path d="m9 12-2 2" />
	</Base>
);
export const PanelBottom = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M3 15h18" />
	</Base>
);
export const PanelBottomClose = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M3 15h18" />
		<path d="m15 8-3 3-3-3" />
	</Base>
);
export const PanelBottomDashed = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M14 15h1" />
		<path d="M19 15h2" />
		<path d="M3 15h2" />
		<path d="M9 15h1" />
	</Base>
);
export const PanelBottomOpen = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M3 15h18" />
		<path d="m9 10 3-3 3 3" />
	</Base>
);
export const PanelLeft = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M9 3v18" />
	</Base>
);
export const PanelLeftClose = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M9 3v18" />
		<path d="m16 15-3-3 3-3" />
	</Base>
);
export const PanelLeftDashed = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M9 14v1" />
		<path d="M9 19v2" />
		<path d="M9 3v2" />
		<path d="M9 9v1" />
	</Base>
);
export const PanelLeftOpen = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M9 3v18" />
		<path d="m14 9 3 3-3 3" />
	</Base>
);
export const PanelLeftRightDashed = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 10V9" />
		<path d="M15 15v-1" />
		<path d="M15 21v-2" />
		<path d="M15 5V3" />
		<path d="M9 10V9" />
		<path d="M9 15v-1" />
		<path d="M9 21v-2" />
		<path d="M9 5V3" />
		<rect x="3" y="3" width="18" height="18" rx="2" />
	</Base>
);
export const PanelRight = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M15 3v18" />
	</Base>
);
export const PanelRightClose = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M15 3v18" />
		<path d="m8 9 3 3-3 3" />
	</Base>
);
export const PanelRightDashed = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M15 14v1" />
		<path d="M15 19v2" />
		<path d="M15 3v2" />
		<path d="M15 9v1" />
	</Base>
);
export const PanelRightOpen = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M15 3v18" />
		<path d="m10 15-3-3 3-3" />
	</Base>
);
export const PanelTop = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M3 9h18" />
	</Base>
);
export const PanelTopBottomDashed = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 15h1" />
		<path d="M14 9h1" />
		<path d="M19 15h2" />
		<path d="M19 9h2" />
		<path d="M3 15h2" />
		<path d="M3 9h2" />
		<path d="M9 15h1" />
		<path d="M9 9h1" />
		<rect x="3" y="3" width="18" height="18" rx="2" />
	</Base>
);
export const PanelTopClose = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M3 9h18" />
		<path d="m9 16 3-3 3 3" />
	</Base>
);
export const PanelTopDashed = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M14 9h1" />
		<path d="M19 9h2" />
		<path d="M3 9h2" />
		<path d="M9 9h1" />
	</Base>
);
export const PanelTopOpen = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M3 9h18" />
		<path d="m15 14-3 3-3-3" />
	</Base>
);
export const PanelsLeftBottom = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M9 3v18" />
		<path d="M9 15h12" />
	</Base>
);
export const PanelsRightBottom = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M3 15h12" />
		<path d="M15 3v18" />
	</Base>
);
export const PanelsTopLeft = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M3 9h18" />
		<path d="M9 21V9" />
	</Base>
);
export const PaperBag = (p: IconProps) => (
	<Base {...p}>
		<path d="M5.364 3.848C4 6 3 9.652 3 12.652V19a2 2 0 002 2h14a2 2 0 002-2v-5c0-2.334-1.816-4.668-2.622-7.002" />
		<path d="M7 3h11.379a2 2 0 011.789 1.106l.723 1.447A1 1 0 0119.997 7h-8.525a2 2 0 01-1.789-1.106L8.79 4.105a2 2 0 10-3.579 1.789l2.261 4.522A5 5 0 018 12.652V21" />
	</Base>
);
export const Paperclip = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
	</Base>
);
export const Parasol = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.5 11.134 18.196 21" />
		<path d="M20.425 5.299a10 10 0 0 0-16.941 9.78c.183.563.843.774 1.355.478L20.16 6.711c.512-.296.66-.973.264-1.413" />
		<path d="M21 21H3" />
	</Base>
);
export const Parentheses = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 21s-4-3-4-9 4-9 4-9" />
		<path d="M16 3s4 3 4 9-4 9-4 9" />
	</Base>
);
export const ParkingMeter = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 15h2" />
		<path d="M12 12v3" />
		<path d="M12 19v3" />
		<path d="M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z" />
		<path d="M9 9a3 3 0 1 1 6 0" />
	</Base>
);
export const PartyPopper = (p: IconProps) => (
	<Base {...p}>
		<path d="M5.8 11.3 2 22l10.7-3.79" />
		<path d="M4 3h.01" />
		<path d="M22 8h.01" />
		<path d="M15 2h.01" />
		<path d="M22 20h.01" />
		<path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
		<path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" />
		<path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" />
		<path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
	</Base>
);
export const Pause = (p: IconProps) => (
	<Base {...p}>
		<rect x="14" y="3" width="5" height="18" rx="1" />
		<rect x="5" y="3" width="5" height="18" rx="1" />
	</Base>
);
export const PawPrint = (p: IconProps) => (
	<Base {...p}>
		<circle cx="11" cy="4" r="2" />
		<circle cx="18" cy="8" r="2" />
		<circle cx="20" cy="16" r="2" />
		<path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
	</Base>
);
export const PcCase = (p: IconProps) => (
	<Base {...p}>
		<rect width="14" height="20" x="5" y="2" rx="2" />
		<path d="M15 14h.01" />
		<path d="M9 6h6" />
		<path d="M9 10h6" />
	</Base>
);
export const Pen = (p: IconProps) => (
	<Base {...p}>
		<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
	</Base>
);
export const PenLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 21h8" />
		<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
	</Base>
);
export const PenOff = (p: IconProps) => (
	<Base {...p}>
		<path d="m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982" />
		<path d="m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353" />
		<path d="m2 2 20 20" />
	</Base>
);
export const PenTool = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
		<path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
		<path d="m2.3 2.3 7.286 7.286" />
		<circle cx="11" cy="11" r="2" />
	</Base>
);
export const Pencil = (p: IconProps) => (
	<Base {...p}>
		<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
		<path d="m15 5 4 4" />
	</Base>
);
export const PencilLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 21h8" />
		<path d="m15 5 4 4" />
		<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
	</Base>
);
export const PencilOff = (p: IconProps) => (
	<Base {...p}>
		<path d="m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982" />
		<path d="m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353" />
		<path d="m15 5 4 4" />
		<path d="m2 2 20 20" />
	</Base>
);
export const PencilRuler = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13" />
		<path d="m8 6 2-2" />
		<path d="m18 16 2-2" />
		<path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17" />
		<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
		<path d="m15 5 4 4" />
	</Base>
);
export const PencilSparkles = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 3H8" />
		<path d="m15.007 5.008 3.987 3.986" />
		<path d="M20 15v4" />
		<path d="M21.174 6.813a2.82 2.82 0 0 0-3.986-3.987L3.842 16.175a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
		<path d="M22 17h-4" />
		<path d="M4 5v4" />
		<path d="M6 7H2" />
		<path d="M9 2v2" />
	</Base>
);
export const Pentagon = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z" />
	</Base>
);
export const Percent = (p: IconProps) => (
	<Base {...p}>
		<line x1="19" x2="5" y1="5" y2="19" />
		<circle cx="6.5" cy="6.5" r="2.5" />
		<circle cx="17.5" cy="17.5" r="2.5" />
	</Base>
);
export const PersonStanding = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="5" r="1" />
		<path d="m9 20 3-6 3 6" />
		<path d="m6 8 6 2 6-2" />
		<path d="M12 10v4" />
	</Base>
);
export const Phi = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v20" />
		<circle cx="12" cy="12" r="7" />
	</Base>
);
export const PhilippinePeso = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 11H4" />
		<path d="M20 7H4" />
		<path d="M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7" />
	</Base>
);
export const Phone = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
	</Base>
);
export const PhoneCall = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 2a9 9 0 0 1 9 9" />
		<path d="M13 6a5 5 0 0 1 5 5" />
		<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
	</Base>
);
export const PhoneForwarded = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 6h8" />
		<path d="m18 2 4 4-4 4" />
		<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
	</Base>
);
export const PhoneIncoming = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 2v6h6" />
		<path d="m22 2-6 6" />
		<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
	</Base>
);
export const PhoneMissed = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 2 6 6" />
		<path d="m22 2-6 6" />
		<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
	</Base>
);
export const PhoneOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272" />
		<path d="M22 2 2 22" />
		<path d="M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473" />
	</Base>
);
export const PhoneOutgoing = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 8 6-6" />
		<path d="M22 8V2h-6" />
		<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
	</Base>
);
export const Pi = (p: IconProps) => (
	<Base {...p}>
		<line x1="9" x2="9" y1="4" y2="20" />
		<path d="M4 7c0-1.7 1.3-3 3-3h13" />
		<path d="M18 20c-1.7 0-3-1.3-3-3V4" />
	</Base>
);
export const Piano = (p: IconProps) => (
	<Base {...p}>
		<path d="M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8" />
		<path d="M2 14h20" />
		<path d="M6 14v4" />
		<path d="M10 14v4" />
		<path d="M14 14v4" />
		<path d="M18 14v4" />
	</Base>
);
export const Pickaxe = (p: IconProps) => (
	<Base {...p}>
		<path d="m14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999" />
		<path d="M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024" />
		<path d="M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069" />
		<path d="M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z" />
	</Base>
);
export const PictureInPicture = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 10h6V4" />
		<path d="m2 4 6 6" />
		<path d="M21 10V7a2 2 0 0 0-2-2h-7" />
		<path d="M3 14v2a2 2 0 0 0 2 2h3" />
		<rect x="12" y="14" width="10" height="7" rx="1" />
	</Base>
);
export const PictureInPicture2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" />
		<rect width="10" height="7" x="12" y="13" rx="2" />
	</Base>
);
export const PiggyBank = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" />
		<path d="M16 10h.01" />
		<path d="M2 8v1a2 2 0 0 0 2 2h1" />
	</Base>
);
export const Pilcrow = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 4v16" />
		<path d="M17 4v16" />
		<path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13" />
	</Base>
);
export const PilcrowLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 3v11" />
		<path d="M14 9h-3a3 3 0 0 1 0-6h9" />
		<path d="M18 3v11" />
		<path d="M22 18H2l4-4" />
		<path d="m6 22-4-4" />
	</Base>
);
export const PilcrowRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 3v11" />
		<path d="M10 9H7a1 1 0 0 1 0-6h8" />
		<path d="M14 3v11" />
		<path d="m18 14 4 4H2" />
		<path d="m22 18-4 4" />
	</Base>
);
export const Pill = (p: IconProps) => (
	<Base {...p}>
		<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
		<path d="m8.5 8.5 7 7" />
	</Base>
);
export const PillBottle = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4" />
		<path d="M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
		<rect width="16" height="5" x="4" y="2" rx="1" />
	</Base>
);
export const Pin = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 17v5" />
		<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
	</Base>
);
export const PinOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 17v5" />
		<path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89" />
		<path d="m2 2 20 20" />
		<path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11" />
	</Base>
);
export const Pipette = (p: IconProps) => (
	<Base {...p}>
		<path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12" />
		<path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" />
		<path d="m2 22 .414-.414" />
	</Base>
);
export const Pizza = (p: IconProps) => (
	<Base {...p}>
		<path d="m12 14-1 1" />
		<path d="m13.75 18.25-1.25 1.42" />
		<path d="M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12" />
		<path d="M18.8 9.3a1 1 0 0 0 2.1 7.7" />
		<path d="M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z" />
	</Base>
);
export const Plane = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
	</Base>
);
export const PlaneLanding = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 22h20" />
		<path d="M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z" />
	</Base>
);
export const PlaneTakeoff = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 22h20" />
		<path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z" />
	</Base>
);
export const Play = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
	</Base>
);
export const PlayOff = (p: IconProps) => (
	<Base {...p}>
		<path d="m10.215 4.56 9.79 5.71a2 2 0 0 1 .003 3.458l-.393.23" />
		<path d="m16.042 16.042-8.034 4.686A2 2 0 0 1 5 19V5" />
		<path d="m2 2 20 20" />
	</Base>
);
export const Plug = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22v-5" />
		<path d="M15 8V2" />
		<path d="M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z" />
		<path d="M9 8V2" />
	</Base>
);
export const Plug2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 2v6" />
		<path d="M15 2v6" />
		<path d="M12 17v5" />
		<path d="M5 8h14" />
		<path d="M6 11V8h12v3a6 6 0 1 1-12 0Z" />
	</Base>
);
export const PlugZap = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" />
		<path d="m2 22 3-3" />
		<path d="M7.5 13.5 10 11" />
		<path d="M10.5 16.5 13 14" />
		<path d="m18 3-4 4h6l-4 4" />
	</Base>
);
export const PocketKnife = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2" />
		<path d="M18 6h.01" />
		<path d="M6 18h.01" />
		<path d="M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z" />
		<path d="M18 11.66V22a4 4 0 0 0 4-4V6" />
	</Base>
);
export const Podcast = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 17a1 1 0 1 0-2 0l.5 4.5a0.5 0.5 0 0 0 1 0z" fill="currentColor" />
		<path d="M16.85 18.58a9 9 0 1 0-9.7 0" />
		<path d="M8 14a5 5 0 1 1 8 0" />
		<circle cx="12" cy="11" r="1" fill="currentColor" />
	</Base>
);
export const Podium = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6V2h-1" />
		<path d="M9 15a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1" />
		<path d="M9 21V11a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10" />
	</Base>
);
export const Pointer = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 14a8 8 0 0 1-8 8" />
		<path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
		<path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
		<path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
		<path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
	</Base>
);
export const PointerOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 4.5V4a2 2 0 0 0-2.41-1.957" />
		<path d="M13.9 8.4a2 2 0 0 0-1.26-1.295" />
		<path d="M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158" />
		<path d="m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343" />
		<path d="M6 6v8" />
		<path d="m2 2 20 20" />
	</Base>
);
export const Popcorn = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4" />
		<path d="M10 22 9 8" />
		<path d="m14 22 1-14" />
		<path d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z" />
	</Base>
);
export const Popsicle = (p: IconProps) => (
	<Base {...p}>
		<path d="M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z" />
		<path d="m22 22-5.5-5.5" />
	</Base>
);
export const PoundSterling = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 7c0-5.333-8-5.333-8 0" />
		<path d="M10 7v14" />
		<path d="M6 21h12" />
		<path d="M6 13h10" />
	</Base>
);
export const Power = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v10" />
		<path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
	</Base>
);
export const PowerOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M18.36 6.64A9 9 0 0 1 20.77 15" />
		<path d="M6.16 6.16a9 9 0 1 0 12.68 12.68" />
		<path d="M12 2v4" />
		<path d="m2 2 20 20" />
	</Base>
);
export const Presentation = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 3h20" />
		<path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
		<path d="m7 21 5-5 5 5" />
	</Base>
);
export const Printer = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
		<path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
		<rect x="6" y="14" width="12" height="8" rx="1" />
	</Base>
);
export const PrinterCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5" />
		<path d="m16 19 2 2 4-4" />
		<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2" />
		<path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
	</Base>
);
export const PrinterX = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.531 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6.377" />
		<path d="m16.5 16.5 5 5" />
		<path d="m16.5 21.5 5-5" />
		<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.5" />
		<path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
	</Base>
);
export const Projector = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 7 3 5" />
		<path d="M9 6V3" />
		<path d="m13 7 2-2" />
		<circle cx="9" cy="13" r="3" />
		<path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" />
		<path d="M16 16h2" />
	</Base>
);
export const Proportions = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="16" x="2" y="4" rx="2" />
		<path d="M12 9v11" />
		<path d="M2 9h13a2 2 0 0 1 2 2v9" />
	</Base>
);
export const Puzzle = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z" />
	</Base>
);
export const Pyramid = (p: IconProps) => (
	<Base {...p}>
		<path d="M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z" />
		<path d="M12 2v20" />
	</Base>
);
export const QrCode = (p: IconProps) => (
	<Base {...p}>
		<rect width="5" height="5" x="3" y="3" rx="1" />
		<rect width="5" height="5" x="16" y="3" rx="1" />
		<rect width="5" height="5" x="3" y="16" rx="1" />
		<path d="M21 16h-3a2 2 0 0 0-2 2v3" />
		<path d="M21 21v.01" />
		<path d="M12 7v3a2 2 0 0 1-2 2H7" />
		<path d="M3 12h.01" />
		<path d="M12 3h.01" />
		<path d="M12 16v.01" />
		<path d="M16 12h1" />
		<path d="M21 12v.01" />
		<path d="M12 21v-1" />
	</Base>
);
export const Quote = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
		<path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
	</Base>
);
export const Rabbit = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 16a3 3 0 0 1 2.24 5" />
		<path d="M18 12h.01" />
		<path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3" />
		<path d="M20 8.54V4a2 2 0 1 0-4 0v3" />
		<path d="M7.612 12.524a3 3 0 1 0-1.6 4.3" />
	</Base>
);
export const Radar = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
		<path d="M4 6h.01" />
		<path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
		<path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
		<path d="M12 18h.01" />
		<path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
		<circle cx="12" cy="12" r="2" />
		<path d="m13.41 10.59 5.66-5.66" />
	</Base>
);
export const Radiation = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 12h.01" />
		<path d="M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z" />
		<path d="M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z" />
		<path d="M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z" />
	</Base>
);
export const Radical = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21" />
	</Base>
);
export const Radio = (p: IconProps) => (
	<Base {...p}>
		<path d="M16.247 7.761a6 6 0 0 1 0 8.478" />
		<path d="M19.075 4.933a10 10 0 0 1 0 14.134" />
		<path d="M4.925 19.067a10 10 0 0 1 0-14.134" />
		<path d="M7.753 16.239a6 6 0 0 1 0-8.478" />
		<circle cx="12" cy="12" r="2" />
	</Base>
);
export const RadioOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.414 13.414a2 2 0 1 1-2.828-2.828" />
		<path d="M16.247 7.761a6 6 0 0 1 1.744 4.572" />
		<path d="M19.075 4.933a10 10 0 0 1 2.234 10.72" />
		<path d="m2 2 20 20" />
		<path d="M4.925 19.067a10 10 0 0 1 0-14.134" />
		<path d="M7.753 16.239a6 6 0 0 1 0-8.478" />
	</Base>
);
export const RadioReceiver = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 16v2" />
		<path d="M19 16v2" />
		<rect width="20" height="8" x="2" y="8" rx="2" />
		<path d="M18 12h.01" />
	</Base>
);
export const RadioTower = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9" />
		<path d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" />
		<circle cx="12" cy="9" r="2" />
		<path d="M16.2 4.8c2 2 2.26 5.11.8 7.47" />
		<path d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1" />
		<path d="M9.5 18h5" />
		<path d="m8 22 4-11 4 11" />
	</Base>
);
export const Radius = (p: IconProps) => (
	<Base {...p}>
		<path d="M20.34 17.52a10 10 0 1 0-2.82 2.82" />
		<circle cx="19" cy="19" r="2" />
		<path d="m13.41 13.41 4.18 4.18" />
		<circle cx="12" cy="12" r="2" />
	</Base>
);
export const Rainbow = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17a10 10 0 0 0-20 0" />
		<path d="M6 17a6 6 0 0 1 12 0" />
		<path d="M10 17a2 2 0 0 1 4 0" />
	</Base>
);
export const Rat = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 22H4a2 2 0 0 1 0-4h12" />
		<path d="M13.236 18a3 3 0 0 0-2.2-5" />
		<path d="M16 9h.01" />
		<path d="M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3" />
		<path d="M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18" />
	</Base>
);
export const Ratio = (p: IconProps) => (
	<Base {...p}>
		<rect width="12" height="20" x="6" y="2" rx="2" />
		<rect width="20" height="12" x="2" y="6" rx="2" />
	</Base>
);
export const Receipt = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 17V7" />
		<path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8" />
		<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
	</Base>
);
export const ReceiptCent = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 7v10" />
		<path d="M14.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0" />
		<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
	</Base>
);
export const ReceiptEuro = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0" />
		<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
		<path d="M8 12h5" />
	</Base>
);
export const ReceiptIndianRupee = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
		<path d="M8 11h8" />
		<path d="M8 7h8" />
		<path d="M9 7a4 4 0 0 1 0 8H8l3 2" />
	</Base>
);
export const ReceiptJapaneseYen = (p: IconProps) => (
	<Base {...p}>
		<path d="m12 10 3-3" />
		<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
		<path d="M9 11h6" />
		<path d="M9 15h6" />
		<path d="m9 7 3 3v7" />
	</Base>
);
export const ReceiptPoundSterling = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 17V9.5a1 1 0 0 1 5 0" />
		<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
		<path d="M8 13h5" />
		<path d="M8 17h7" />
	</Base>
);
export const ReceiptRussianRuble = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
		<path d="M8 11h5a2 2 0 0 0 0-4h-3v10" />
		<path d="M8 15h5" />
	</Base>
);
export const ReceiptSwissFranc = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 11h4" />
		<path d="M10 17V7h5" />
		<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
		<path d="M8 15h5" />
	</Base>
);
export const ReceiptText = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 16H8" />
		<path d="M14 8H8" />
		<path d="M16 12H8" />
		<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
	</Base>
);
export const ReceiptTurkishLira = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 7v10a5 5 0 0 0 5-5" />
		<path d="m14 8-6 3" />
		<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
	</Base>
);
export const RectangleCircle = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
		<circle cx="14" cy="12" r="8" />
	</Base>
);
export const RectangleEllipsis = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="12" x="2" y="6" rx="2" />
		<path d="M12 12h.01" />
		<path d="M17 12h.01" />
		<path d="M7 12h.01" />
	</Base>
);
export const RectangleGoggles = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
	</Base>
);
export const RectangleHorizontal = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="12" x="2" y="6" rx="2" />
	</Base>
);
export const RectangleVertical = (p: IconProps) => (
	<Base {...p}>
		<rect width="12" height="20" x="6" y="2" rx="2" />
	</Base>
);
export const Recycle = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
		<path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
		<path d="m14 16-3 3 3 3" />
		<path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
		<path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
		<path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
	</Base>
);
export const Redo = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 7v6h-6" />
		<path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
	</Base>
);
export const Redo2 = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 14 5-5-5-5" />
		<path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" />
	</Base>
);
export const RedoDot = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="17" r="1" />
		<path d="M21 7v6h-6" />
		<path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
	</Base>
);
export const RefreshCcw = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
		<path d="M3 3v5h5" />
		<path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
		<path d="M16 16h5v5" />
	</Base>
);
export const RefreshCcwDot = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
		<path d="M3 3v5h5" />
		<path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
		<path d="M16 16h5v5" />
		<circle cx="12" cy="12" r="1" />
	</Base>
);
export const RefreshCw = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
		<path d="M21 3v5h-5" />
		<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
		<path d="M8 16H3v5" />
	</Base>
);
export const RefreshCwOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47" />
		<path d="M8 16H3v5" />
		<path d="M3 12C3 9.51 4 7.26 5.64 5.64" />
		<path d="m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64" />
		<path d="M21 12c0 1-.16 1.97-.47 2.87" />
		<path d="M21 3v5h-5" />
		<path d="M22 22 2 2" />
	</Base>
);
export const Refrigerator = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" />
		<path d="M5 10h14" />
		<path d="M15 7v6" />
	</Base>
);
export const Regex = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 3v10" />
		<path d="m12.67 5.5 8.66 5" />
		<path d="m12.67 10.5 8.66-5" />
		<path d="M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z" />
	</Base>
);
export const RemoveFormatting = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 7V4h16v3" />
		<path d="M5 20h6" />
		<path d="M13 4 8 20" />
		<path d="m15 15 5 5" />
		<path d="m20 15-5 5" />
	</Base>
);
export const Repeat = (p: IconProps) => (
	<Base {...p}>
		<path d="m17 2 4 4-4 4" />
		<path d="M3 11v-1a4 4 0 0 1 4-4h14" />
		<path d="m7 22-4-4 4-4" />
		<path d="M21 13v1a4 4 0 0 1-4 4H3" />
	</Base>
);
export const Repeat1 = (p: IconProps) => (
	<Base {...p}>
		<path d="m17 2 4 4-4 4" />
		<path d="M3 11v-1a4 4 0 0 1 4-4h14" />
		<path d="m7 22-4-4 4-4" />
		<path d="M21 13v1a4 4 0 0 1-4 4H3" />
		<path d="M11 10h1v4" />
	</Base>
);
export const Repeat2 = (p: IconProps) => (
	<Base {...p}>
		<path d="m2 9 3-3 3 3" />
		<path d="M13 18H7a2 2 0 0 1-2-2V6" />
		<path d="m22 15-3 3-3-3" />
		<path d="M11 6h6a2 2 0 0 1 2 2v10" />
	</Base>
);
export const RepeatOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.656 6H21l-4-4" />
		<path d="M17.898 17.898A4 4 0 0 1 17 18H3l4-4" />
		<path d="m2 2 20 20" />
		<path d="M21 13v1a4 4 0 0 1-.171 1.159" />
		<path d="m21 6-4 4" />
		<path d="M3 11v-1a4 4 0 0 1 3.102-3.898" />
		<path d="m7 22-4-4" />
	</Base>
);
export const Replace = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 4a1 1 0 0 1 1-1" />
		<path d="M15 10a1 1 0 0 1-1-1" />
		<path d="M21 4a1 1 0 0 0-1-1" />
		<path d="M21 9a1 1 0 0 1-1 1" />
		<path d="m3 7 3 3 3-3" />
		<path d="M6 10V5a2 2 0 0 1 2-2h2" />
		<rect x="3" y="14" width="7" height="7" rx="1" />
	</Base>
);
export const ReplaceAll = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" />
		<path d="M14 4a1 1 0 0 1 1-1" />
		<path d="M15 10a1 1 0 0 1-1-1" />
		<path d="M19 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" />
		<path d="M21 4a1 1 0 0 0-1-1" />
		<path d="M21 9a1 1 0 0 1-1 1" />
		<path d="m3 7 3 3 3-3" />
		<path d="M6 10V5a2 2 0 0 1 2-2h2" />
		<rect x="3" y="14" width="7" height="7" rx="1" />
	</Base>
);
export const Reply = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 18v-2a4 4 0 0 0-4-4H4" />
		<path d="m9 17-5-5 5-5" />
	</Base>
);
export const ReplyAll = (p: IconProps) => (
	<Base {...p}>
		<path d="m12 17-5-5 5-5" />
		<path d="M22 18v-2a4 4 0 0 0-4-4H7" />
		<path d="m7 17-5-5 5-5" />
	</Base>
);
export const Rewind = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 12 18z" />
		<path d="M22 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 22 18z" />
	</Base>
);
export const Ribbon = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22" />
		<path d="m12 18 2.57-3.5" />
		<path d="M6.243 9.016a7 7 0 0 1 11.507-.009" />
		<path d="M9.35 14.53 12 11.22" />
		<path d="M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z" />
	</Base>
);
export const Road = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 17v4" />
		<path d="M12 5V3" />
		<path d="M12 9v3" />
		<path d="M2.077 18.449A2 2 0 0 0 4 21h16a2 2 0 0 0 1.924-2.55l-4-14A2 2 0 0 0 16 3H8a2 2 0 0 0-1.924 1.45z" />
	</Base>
);
export const Rocket = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
		<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
		<path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
		<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
	</Base>
);
export const RockingChair = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 13 3.708 7.416" />
		<path d="M3 19a15 15 0 0 0 18 0" />
		<path d="m3 2 3.21 9.633A2 2 0 0 0 8.109 13H18" />
		<path d="m9 13-3.708 7.416" />
	</Base>
);
export const RollerCoaster = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 19V5" />
		<path d="M10 19V6.8" />
		<path d="M14 19v-7.8" />
		<path d="M18 5v4" />
		<path d="M18 19v-6" />
		<path d="M22 19V9" />
		<path d="M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65" />
	</Base>
);
export const Rose = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 10h-1a4 4 0 1 1 4-4v.534" />
		<path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31" />
		<path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2" />
		<path d="M9.77 12C4 15 2 22 2 22" />
		<circle cx="17" cy="8" r="2" />
	</Base>
);
export const Rotate3d = (p: IconProps) => (
	<Base {...p}>
		<path d="m15.194 13.707 3.814 1.86-1.86 3.814" />
		<path d="M16.47214 7.52786 A 5 10 0 1 0 13 21.79796" />
		<path d="M21.79796 11 A 10 5 0 1 0 19 15.57071" />
	</Base>
);
export const RotateCcwKey = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 7v6" />
		<path d="M12 9h2" />
		<path d="M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8" />
		<path d="M3 3v5h5" />
		<circle cx="12" cy="15" r="2" />
	</Base>
);
export const RotateCcwSquare = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 9V7a2 2 0 0 0-2-2h-6" />
		<path d="m15 2-3 3 3 3" />
		<path d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
	</Base>
);
export const RotateCw = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
		<path d="M21 3v5h-5" />
	</Base>
);
export const RotateCwSquare = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 5H6a2 2 0 0 0-2 2v3" />
		<path d="m9 8 3-3-3-3" />
		<path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
	</Base>
);
export const Route = (p: IconProps) => (
	<Base {...p}>
		<circle cx="6" cy="19" r="3" />
		<path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
		<circle cx="18" cy="5" r="3" />
	</Base>
);
export const RouteOff = (p: IconProps) => (
	<Base {...p}>
		<circle cx="6" cy="19" r="3" />
		<path d="M9 19h8.5c.4 0 .9-.1 1.3-.2" />
		<path d="M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12" />
		<path d="m2 2 20 20" />
		<path d="M21 15.3a3.5 3.5 0 0 0-3.3-3.3" />
		<path d="M15 5h-4.3" />
		<circle cx="18" cy="5" r="3" />
	</Base>
);
export const Router = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="8" x="2" y="14" rx="2" />
		<path d="M6.01 18H6" />
		<path d="M10.01 18H10" />
		<path d="M15 10v4" />
		<path d="M17.84 7.17a4 4 0 0 0-5.66 0" />
		<path d="M20.66 4.34a8 8 0 0 0-11.31 0" />
	</Base>
);
export const Rows2 = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M3 12h18" />
	</Base>
);
export const Rows3 = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M21 9H3" />
		<path d="M21 15H3" />
	</Base>
);
export const Rows4 = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M21 7.5H3" />
		<path d="M21 12H3" />
		<path d="M21 16.5H3" />
	</Base>
);
export const Rss = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 11a9 9 0 0 1 9 9" />
		<path d="M4 4a16 16 0 0 1 16 16" />
		<circle cx="5" cy="19" r="1" />
	</Base>
);
export const Ruler = (p: IconProps) => (
	<Base {...p}>
		<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
		<path d="m14.5 12.5 2-2" />
		<path d="m11.5 9.5 2-2" />
		<path d="m8.5 6.5 2-2" />
		<path d="m17.5 15.5 2-2" />
	</Base>
);
export const RulerDimensionLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 15v-3" />
		<path d="M14 15v-3" />
		<path d="M18 15v-3" />
		<path d="M2 8V4" />
		<path d="M22 6H2" />
		<path d="M22 8V4" />
		<path d="M6 15v-3" />
		<rect x="2" y="12" width="20" height="8" rx="2" />
	</Base>
);
export const RussianRuble = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 11h8a4 4 0 0 0 0-8H9v18" />
		<path d="M6 15h8" />
	</Base>
);
export const Sailboat = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 2v15" />
		<path d="M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z" />
		<path d="M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z" />
	</Base>
);
export const Salad = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 21h10" />
		<path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
		<path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1" />
		<path d="m13 12 4-4" />
		<path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" />
	</Base>
);
export const Sandwich = (p: IconProps) => (
	<Base {...p}>
		<path d="m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777" />
		<path d="M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25" />
		<path d="M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9" />
		<path d="m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" />
		<rect width="20" height="4" x="2" y="11" rx="1" />
	</Base>
);
export const Satellite = (p: IconProps) => (
	<Base {...p}>
		<path d="m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5" />
		<path d="M16.5 7.5 19 5" />
		<path d="m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5" />
		<path d="M9 21a6 6 0 0 0-6-6" />
		<path d="M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z" />
	</Base>
);
export const SatelliteDish = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 10a7.31 7.31 0 0 0 10 10Z" />
		<path d="m9 15 3-3" />
		<path d="M17 13a6 6 0 0 0-6-6" />
		<path d="M21 13A10 10 0 0 0 11 3" />
	</Base>
);
export const SaudiRiyal = (p: IconProps) => (
	<Base {...p}>
		<path d="m20 19.5-5.5 1.2" />
		<path d="M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2" />
		<path d="m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2" />
		<path d="M20 10 4 13.5" />
	</Base>
);
export const Save = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
		<path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
		<path d="M7 3v4a1 1 0 0 0 1 1h7" />
	</Base>
);
export const SaveAll = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 2v3a1 1 0 0 0 1 1h5" />
		<path d="M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6" />
		<path d="M18 22H4a2 2 0 0 1-2-2V6" />
		<path d="M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z" />
	</Base>
);
export const SaveCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4v4.35" />
		<path d="m16 19 2 2 4-4" />
		<path d="M17 15.13V14a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
		<path d="M7 3v4a1 1 0 0 0 1 1h7" />
	</Base>
);
export const SaveOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 13H8a1 1 0 0 0-1 1v7" />
		<path d="M14 8h1" />
		<path d="M17 21v-4" />
		<path d="m2 2 20 20" />
		<path d="M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41" />
		<path d="M29.5 11.5s5 5 4 5" />
		<path d="M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15" />
	</Base>
);
export const SavePen = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.33 13H8a1 1 0 00-1 1v7" />
		<path d="M14.363 17.634a2 2 0 00-.506.854l-.837 2.87a.5.5 0 00.62.62l2.87-.837a2 2 0 00.854-.506l4.013-4.009a1 1 0 10-3.004-3.004z" />
		<path d="M7 3v4a1 1 0 001 1h7" />
		<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h10.2a2 2 0 011.4.6l3.8 3.8a2 2 0 01.6 1.4v.3" />
	</Base>
);
export const SavePlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V12" />
		<path d="M16 13H8a1 1 0 0 0-1 1v7" />
		<path d="M19 22v-6" />
		<path d="M22 19h-6" />
		<path d="M7 3v4a1 1 0 0 0 1 1h7" />
	</Base>
);
export const Scale = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3v18" />
		<path d="m19 8 3 8a5 5 0 0 1-6 0zV7" />
		<path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
		<path d="m5 8 3 8a5 5 0 0 1-6 0zV7" />
		<path d="M7 21h10" />
	</Base>
);
export const Scale3d = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 7v11a1 1 0 0 0 1 1h11" />
		<path d="M5.293 18.707 11 13" />
		<circle cx="19" cy="19" r="2" />
		<circle cx="5" cy="5" r="2" />
	</Base>
);
export const Scaling = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
		<path d="M14 15H9v-5" />
		<path d="M16 3h5v5" />
		<path d="M21 3 9 15" />
	</Base>
);
export const Scan = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 7V5a2 2 0 0 1 2-2h2" />
		<path d="M17 3h2a2 2 0 0 1 2 2v2" />
		<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
		<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
	</Base>
);
export const ScanBarcode = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 7V5a2 2 0 0 1 2-2h2" />
		<path d="M17 3h2a2 2 0 0 1 2 2v2" />
		<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
		<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
		<path d="M8 7v10" />
		<path d="M12 7v10" />
		<path d="M17 7v10" />
	</Base>
);
export const ScanEye = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 7V5a2 2 0 0 1 2-2h2" />
		<path d="M17 3h2a2 2 0 0 1 2 2v2" />
		<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
		<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
		<circle cx="12" cy="12" r="1" />
		<path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
	</Base>
);
export const ScanFace = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 7V5a2 2 0 0 1 2-2h2" />
		<path d="M17 3h2a2 2 0 0 1 2 2v2" />
		<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
		<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
		<path d="M8 14s1.5 2 4 2 4-2 4-2" />
		<path d="M9 9h.01" />
		<path d="M15 9h.01" />
	</Base>
);
export const ScanHeart = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 3h2a2 2 0 0 1 2 2v2" />
		<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
		<path d="M3 7V5a2 2 0 0 1 2-2h2" />
		<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
		<path d="M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 4.172 4.306l-3.447 3.62a1 1 0 0 1-1.449 0z" />
	</Base>
);
export const ScanLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 7V5a2 2 0 0 1 2-2h2" />
		<path d="M17 3h2a2 2 0 0 1 2 2v2" />
		<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
		<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
		<path d="M7 12h10" />
	</Base>
);
export const ScanQrCode = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 12v4a1 1 0 0 1-1 1h-4" />
		<path d="M17 3h2a2 2 0 0 1 2 2v2" />
		<path d="M17 8V7" />
		<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
		<path d="M3 7V5a2 2 0 0 1 2-2h2" />
		<path d="M7 17h.01" />
		<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
		<rect x="7" y="7" width="5" height="5" rx="1" />
	</Base>
);
export const ScanSearch = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 7V5a2 2 0 0 1 2-2h2" />
		<path d="M17 3h2a2 2 0 0 1 2 2v2" />
		<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
		<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
		<circle cx="12" cy="12" r="3" />
		<path d="m16 16-1.9-1.9" />
	</Base>
);
export const ScanText = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 7V5a2 2 0 0 1 2-2h2" />
		<path d="M17 3h2a2 2 0 0 1 2 2v2" />
		<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
		<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
		<path d="M7 8h8" />
		<path d="M7 12h10" />
		<path d="M7 16h6" />
	</Base>
);
export const School = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 21v-3a2 2 0 0 0-4 0v3" />
		<path d="M18 4.933V21" />
		<path d="m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6" />
		<path d="m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11" />
		<path d="M6 4.933V21" />
		<circle cx="12" cy="9" r="2" />
	</Base>
);
export const Scissors = (p: IconProps) => (
	<Base {...p}>
		<circle cx="6" cy="6" r="3" />
		<path d="M8.12 8.12 12 12" />
		<path d="M20 4 8.12 15.88" />
		<circle cx="6" cy="18" r="3" />
		<path d="M14.8 14.8 20 20" />
	</Base>
);
export const ScissorsLineDashed = (p: IconProps) => (
	<Base {...p}>
		<path d="M5.42 9.42 8 12" />
		<circle cx="4" cy="8" r="2" />
		<path d="m14 6-8.58 8.58" />
		<circle cx="4" cy="16" r="2" />
		<path d="M10.8 14.8 14 18" />
		<path d="M16 12h-2" />
		<path d="M22 12h-2" />
	</Base>
);
export const Scooter = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 4h-3.5l2 11.05" />
		<path d="M6.95 17h5.142c.523 0 .95-.406 1.063-.916a6.5 6.5 0 0 1 5.345-5.009" />
		<circle cx="19.5" cy="17.5" r="2.5" />
		<circle cx="4.5" cy="17.5" r="2.5" />
	</Base>
);
export const ScreenShare = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" />
		<path d="M8 21h8" />
		<path d="M12 17v4" />
		<path d="m17 8 5-5" />
		<path d="M17 3h5v5" />
	</Base>
);
export const ScreenShareOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" />
		<path d="M8 21h8" />
		<path d="M12 17v4" />
		<path d="m22 3-5 5" />
		<path d="m17 3 5 5" />
	</Base>
);
export const Scroll = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 17V5a2 2 0 0 0-2-2H4" />
		<path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
	</Base>
);
export const ScrollText = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 12h-5" />
		<path d="M15 8h-5" />
		<path d="M19 17V5a2 2 0 0 0-2-2H4" />
		<path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
	</Base>
);
export const SearchAlert = (p: IconProps) => (
	<Base {...p}>
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.3-4.3" />
		<path d="M11 7v4" />
		<path d="M11 15h.01" />
	</Base>
);
export const SearchCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="m8 11 2 2 4-4" />
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.3-4.3" />
	</Base>
);
export const SearchCode = (p: IconProps) => (
	<Base {...p}>
		<path d="m13 13.5 2-2.5-2-2.5" />
		<path d="m21 21-4.3-4.3" />
		<path d="M9 8.5 7 11l2 2.5" />
		<circle cx="11" cy="11" r="8" />
	</Base>
);
export const SearchSlash = (p: IconProps) => (
	<Base {...p}>
		<path d="m13.5 8.5-5 5" />
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.3-4.3" />
	</Base>
);
export const SearchX = (p: IconProps) => (
	<Base {...p}>
		<path d="m13.5 8.5-5 5" />
		<path d="m8.5 8.5 5 5" />
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.3-4.3" />
	</Base>
);
export const Section = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0" />
		<path d="M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0" />
	</Base>
);
export const Send = (p: IconProps) => (
	<Base {...p}>
		<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
		<path d="m21.854 2.147-10.94 10.939" />
	</Base>
);
export const SendHorizontal = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
		<path d="M6 12h16" />
	</Base>
);
export const SendToBack = (p: IconProps) => (
	<Base {...p}>
		<rect x="14" y="14" width="8" height="8" rx="2" />
		<rect x="2" y="2" width="8" height="8" rx="2" />
		<path d="M7 14v1a2 2 0 0 0 2 2h1" />
		<path d="M14 7h1a2 2 0 0 1 2 2v1" />
	</Base>
);
export const SeparatorHorizontal = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 16-4 4-4-4" />
		<path d="M3 12h18" />
		<path d="m8 8 4-4 4 4" />
	</Base>
);
export const SeparatorVertical = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3v18" />
		<path d="m16 16 4-4-4-4" />
		<path d="m8 8-4 4 4 4" />
	</Base>
);
export const Server = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
		<rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
		<line x1="6" x2="6.01" y1="6" y2="6" />
		<line x1="6" x2="6.01" y1="18" y2="18" />
	</Base>
);
export const ServerCog = (p: IconProps) => (
	<Base {...p}>
		<path d="m10.852 14.772-.383.923" />
		<path d="M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923" />
		<path d="m13.148 9.228.383-.923" />
		<path d="m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544" />
		<path d="m14.772 10.852.923-.383" />
		<path d="m14.772 13.148.923.383" />
		<path d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5" />
		<path d="M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5" />
		<path d="M6 18h.01" />
		<path d="M6 6h.01" />
		<path d="m9.228 10.852-.923-.383" />
		<path d="m9.228 13.148-.923.383" />
	</Base>
);
export const ServerCrash = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
		<path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
		<path d="M6 6h.01" />
		<path d="M6 18h.01" />
		<path d="m13 6-4 6h6l-4 6" />
	</Base>
);
export const ServerOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5" />
		<path d="M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z" />
		<path d="M22 17v-1a2 2 0 0 0-2-2h-1" />
		<path d="M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z" />
		<path d="M6 18h.01" />
		<path d="m2 2 20 20" />
	</Base>
);
export const Settings = (p: IconProps) => (
	<Base {...p}>
		<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
		<circle cx="12" cy="12" r="3" />
	</Base>
);
export const Settings2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 17H5" />
		<path d="M19 7h-9" />
		<circle cx="17" cy="17" r="3" />
		<circle cx="7" cy="7" r="3" />
	</Base>
);
export const Share = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v13" />
		<path d="m16 6-4-4-4 4" />
		<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
	</Base>
);
export const Share2 = (p: IconProps) => (
	<Base {...p}>
		<circle cx="18" cy="5" r="3" />
		<circle cx="6" cy="12" r="3" />
		<circle cx="18" cy="19" r="3" />
		<line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
		<line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
	</Base>
);
export const Sheet = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
		<line x1="3" x2="21" y1="9" y2="9" />
		<line x1="3" x2="21" y1="15" y2="15" />
		<line x1="9" x2="9" y1="9" y2="21" />
		<line x1="15" x2="15" y1="9" y2="21" />
	</Base>
);
export const Shell = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44" />
	</Base>
);
export const ShelvingUnit = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 12V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
		<path d="M16 20v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
		<path d="M20 22V2" />
		<path d="M4 12h16" />
		<path d="M4 20h16" />
		<path d="M4 2v20" />
		<path d="M4 4h16" />
	</Base>
);
export const Shield = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
	</Base>
);
export const ShieldAlert = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
		<path d="M12 8v4" />
		<path d="M12 16h.01" />
	</Base>
);
export const ShieldBan = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
		<path d="m4.243 5.21 14.39 12.472" />
	</Base>
);
export const ShieldCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
		<path d="m9 12 2 2 4-4" />
	</Base>
);
export const ShieldCog = (p: IconProps) => (
	<Base {...p}>
		<path d="m10.929 14.467-.383.924" />
		<path d="M10.929 8.923 10.546 8" />
		<path d="M13.225 8.923 13.608 8" />
		<path d="m13.607 15.391-.382-.924" />
		<path d="m14.849 10.547.923-.383" />
		<path d="m14.849 12.843.923.383" />
		<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
		<path d="m9.305 10.547-.923-.383" />
		<path d="m9.305 12.843-.923.383" />
		<circle cx="12.077" cy="11.695" r="3" />
	</Base>
);
export const ShieldCogCorner = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 22c-3.806-1.45-7-3.966-7-9V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v4" />
		<path d="M14.923 16.547 14 16.164" />
		<path d="m14.923 18.843-.923.383" />
		<path d="M16.547 14.923 16.164 14" />
		<path d="m16.547 20.467-.383.924" />
		<path d="m18.843 14.923.383-.923" />
		<path d="m19.225 21.391-.382-.924" />
		<path d="m20.467 16.547.923-.383" />
		<path d="m20.467 18.843.923.383" />
		<circle cx="17.695" cy="17.695" r="3" />
	</Base>
);
export const ShieldEllipsis = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
		<path d="M8 12h.01" />
		<path d="M12 12h.01" />
		<path d="M16 12h.01" />
	</Base>
);
export const ShieldHalf = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
		<path d="M12 22V2" />
	</Base>
);
export const ShieldMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
		<path d="M9 12h6" />
	</Base>
);
export const ShieldOff = (p: IconProps) => (
	<Base {...p}>
		<path d="m2 2 20 20" />
		<path d="M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71" />
		<path d="M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264" />
	</Base>
);
export const ShieldPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
		<path d="M9 12h6" />
		<path d="M12 9v6" />
	</Base>
);
export const ShieldQuestionMark = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
		<path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
		<path d="M12 17h.01" />
	</Base>
);
export const ShieldUser = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
		<path d="M6.376 18.91a6 6 0 0 1 11.249.003" />
		<circle cx="12" cy="11" r="4" />
	</Base>
);
export const ShieldX = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
		<path d="m14.5 9.5-5 5" />
		<path d="m9.5 9.5 5 5" />
	</Base>
);
export const Ship = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 10.189V14" />
		<path d="M12 2v3" />
		<path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
		<path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76" />
		<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
	</Base>
);
export const ShipWheel = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="8" />
		<path d="M12 2v7.5" />
		<path d="m19 5-5.23 5.23" />
		<path d="M22 12h-7.5" />
		<path d="m19 19-5.23-5.23" />
		<path d="M12 14.5V22" />
		<path d="M10.23 13.77 5 19" />
		<path d="M9.5 12H2" />
		<path d="M10.23 10.23 5 5" />
		<circle cx="12" cy="12" r="2.5" />
	</Base>
);
export const Shirt = (p: IconProps) => (
	<Base {...p}>
		<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
	</Base>
);
export const ShoppingBag = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 10a4 4 0 0 1-8 0" />
		<path d="M3.103 6.034h17.794" />
		<path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
	</Base>
);
export const ShoppingBasket = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 11-1 9" />
		<path d="m19 11-4-7" />
		<path d="M2 11h20" />
		<path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
		<path d="M4.5 15.5h15" />
		<path d="m5 11 4-7" />
		<path d="m9 11 1 9" />
	</Base>
);
export const ShoppingCart = (p: IconProps) => (
	<Base {...p}>
		<circle cx="8" cy="21" r="1" />
		<circle cx="19" cy="21" r="1" />
		<path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
	</Base>
);
export const Shovel = (p: IconProps) => (
	<Base {...p}>
		<path d="M21.56 4.56a1.5 1.5 0 0 1 0 2.122l-.47.47a3 3 0 0 1-4.212-.03 3 3 0 0 1 0-4.243l.44-.44a1.5 1.5 0 0 1 2.121 0z" />
		<path d="M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z" />
		<path d="m9 15 7.879-7.878" />
	</Base>
);
export const ShowerHead = (p: IconProps) => (
	<Base {...p}>
		<path d="m4 4 2.5 2.5" />
		<path d="M13.5 6.5a4.95 4.95 0 0 0-7 7" />
		<path d="M15 5 5 15" />
		<path d="M14 17v.01" />
		<path d="M10 16v.01" />
		<path d="M13 13v.01" />
		<path d="M16 10v.01" />
		<path d="M11 20v.01" />
		<path d="M17 14v.01" />
		<path d="M20 11v.01" />
	</Base>
);
export const Shredder = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5" />
		<path d="M14 2v5a1 1 0 0 0 1 1h5" />
		<path d="M10 22v-5" />
		<path d="M14 19v-2" />
		<path d="M18 20v-3" />
		<path d="M2 13h20" />
		<path d="M6 20v-3" />
	</Base>
);
export const Shrimp = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 12h.01" />
		<path d="M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1" />
		<path d="M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8" />
		<path d="M14 8a8.5 8.5 0 0 1 0 8" />
		<path d="M16 16c2 0 4.5-4 4-6" />
	</Base>
);
export const Shrink = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8" />
		<path d="M9 19.8V15m0 0H4.2M9 15l-6 6" />
		<path d="M15 4.2V9m0 0h4.8M15 9l6-6" />
		<path d="M9 4.2V9m0 0H4.2M9 9 3 3" />
	</Base>
);
export const Shrub = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22v-5.172a2 2 0 0 0-.586-1.414L9.5 13.5" />
		<path d="M14.5 14.5 12 17" />
		<path d="M17 8.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0z" />
	</Base>
);
export const Shuffle = (p: IconProps) => (
	<Base {...p}>
		<path d="m18 14 4 4-4 4" />
		<path d="m18 2 4 4-4 4" />
		<path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
		<path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" />
		<path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />
	</Base>
);
export const Sigma = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2" />
	</Base>
);
export const Signal = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 20h.01" />
		<path d="M7 20v-4" />
		<path d="M12 20v-8" />
		<path d="M17 20V8" />
		<path d="M22 4v16" />
	</Base>
);
export const SignalHigh = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 20h.01" />
		<path d="M7 20v-4" />
		<path d="M12 20v-8" />
		<path d="M17 20V8" />
	</Base>
);
export const SignalLow = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 20h.01" />
		<path d="M7 20v-4" />
	</Base>
);
export const SignalMedium = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 20h.01" />
		<path d="M7 20v-4" />
		<path d="M12 20v-8" />
	</Base>
);
export const SignalZero = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 20h.01" />
	</Base>
);
export const Signature = (p: IconProps) => (
	<Base {...p}>
		<path d="m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284" />
		<path d="M3 21h18" />
	</Base>
);
export const Signpost = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 13v8" />
		<path d="M12 3v3" />
		<path d="M2.354 10.354a1.207 1.207 0 0 1 0-1.708l2.06-2.06A2 2 0 0 1 5.828 6h12.344a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H5.828a2 2 0 0 1-1.414-.586z" />
	</Base>
);
export const SignpostBig = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 9H4L2 7l2-2h6" />
		<path d="M14 5h6l2 2-2 2h-6" />
		<path d="M10 22V4a2 2 0 1 1 4 0v18" />
		<path d="M8 22h8" />
	</Base>
);
export const Siren = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 18v-6a5 5 0 1 1 10 0v6" />
		<path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z" />
		<path d="M21 12h1" />
		<path d="M18.5 4.5 18 5" />
		<path d="M2 12h1" />
		<path d="M12 2v1" />
		<path d="m4.929 4.929.707.707" />
		<path d="M12 12v6" />
	</Base>
);
export const SkipBack = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z" />
		<path d="M3 20V4" />
	</Base>
);
export const SkipForward = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 4v16" />
		<path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z" />
	</Base>
);
export const Skull = (p: IconProps) => (
	<Base {...p}>
		<path d="m12.5 17-.5-1-.5 1h1z" />
		<path d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z" />
		<circle cx="15" cy="12" r="1" />
		<circle cx="9" cy="12" r="1" />
	</Base>
);
export const Slash = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 2 2 22" />
	</Base>
);
export const Slice = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 16.586V19a1 1 0 0 1-1 1H2L18.37 3.63a1 1 0 1 1 3 3l-9.663 9.663a1 1 0 0 1-1.414 0L8 14" />
	</Base>
);
export const SlidersHorizontal = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 5H3" />
		<path d="M12 19H3" />
		<path d="M14 3v4" />
		<path d="M16 17v4" />
		<path d="M21 12h-9" />
		<path d="M21 19h-5" />
		<path d="M21 5h-7" />
		<path d="M8 10v4" />
		<path d="M8 12H3" />
	</Base>
);
export const SlidersVertical = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 8h4" />
		<path d="M12 21v-9" />
		<path d="M12 8V3" />
		<path d="M17 16h4" />
		<path d="M19 12V3" />
		<path d="M19 21v-5" />
		<path d="M3 14h4" />
		<path d="M5 10V3" />
		<path d="M5 21v-7" />
	</Base>
);
export const Smartphone = (p: IconProps) => (
	<Base {...p}>
		<rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
		<path d="M12 18h.01" />
	</Base>
);
export const SmartphoneCharging = (p: IconProps) => (
	<Base {...p}>
		<rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
		<path d="M12.667 8 10 12h4l-2.667 4" />
	</Base>
);
export const SmartphoneNfc = (p: IconProps) => (
	<Base {...p}>
		<rect width="7" height="12" x="2" y="6" rx="1" />
		<path d="M13 8.32a7.43 7.43 0 0 1 0 7.36" />
		<path d="M16.46 6.21a11.76 11.76 0 0 1 0 11.58" />
		<path d="M19.91 4.1a15.91 15.91 0 0 1 .01 15.8" />
	</Base>
);
export const Smile = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<path d="M8 14s1.5 2 4 2 4-2 4-2" />
		<line x1="9" x2="9.01" y1="9" y2="9" />
		<line x1="15" x2="15.01" y1="9" y2="9" />
	</Base>
);
export const SmilePlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 11v1a10 10 0 1 1-9-10" />
		<path d="M8 14s1.5 2 4 2 4-2 4-2" />
		<line x1="9" x2="9.01" y1="9" y2="9" />
		<line x1="15" x2="15.01" y1="9" y2="9" />
		<path d="M16 5h6" />
		<path d="M19 2v6" />
	</Base>
);
export const Snail = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0" />
		<circle cx="10" cy="13" r="8" />
		<path d="M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6" />
		<path d="M18 3 19.1 5.2" />
		<path d="M22 3 20.9 5.2" />
	</Base>
);
export const Snowflake = (p: IconProps) => (
	<Base {...p}>
		<path d="m10 20-1.25-2.5L6 18" />
		<path d="M10 4 8.75 6.5 6 6" />
		<path d="m14 20 1.25-2.5L18 18" />
		<path d="m14 4 1.25 2.5L18 6" />
		<path d="m17 21-3-6h-4" />
		<path d="m17 3-3 6 1.5 3" />
		<path d="M2 12h6.5L10 9" />
		<path d="m20 10-1.5 2 1.5 2" />
		<path d="M22 12h-6.5L14 15" />
		<path d="m4 10 1.5 2L4 14" />
		<path d="m7 21 3-6-1.5-3" />
		<path d="m7 3 3 6h4" />
	</Base>
);
export const SoapDispenserDroplet = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.5 2v4" />
		<path d="M14 2H7a2 2 0 0 0-2 2" />
		<path d="M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19" />
		<path d="M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
	</Base>
);
export const Sofa = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
		<path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
		<path d="M4 18v2" />
		<path d="M20 18v2" />
		<path d="M12 4v9" />
	</Base>
);
export const SolarPanel = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 2h2" />
		<path d="m14.28 14-4.56 8" />
		<path d="m21 22-1.558-4H4.558" />
		<path d="M3 10v2" />
		<path d="M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z" />
		<path d="M7 2a4 4 0 0 1-4 4" />
		<path d="m8.66 7.66 1.41 1.41" />
	</Base>
);
export const Soup = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
		<path d="M7 21h10" />
		<path d="M19.5 12 22 6" />
		<path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62" />
		<path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62" />
		<path d="M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62" />
	</Base>
);
export const Space = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" />
	</Base>
);
export const Spade = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 18v4" />
		<path d="M2 14.499a5.5 5.5 0 0 0 9.591 3.675.6.6 0 0 1 .818.001A5.5 5.5 0 0 0 22 14.5c0-2.29-1.5-4-3-5.5l-5.492-5.312a2 2 0 0 0-3-.02L5 8.999c-1.5 1.5-3 3.2-3 5.5" />
	</Base>
);
export const Sparkle = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
	</Base>
);
export const Sparkles = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
		<path d="M20 2v4" />
		<path d="M22 4h-4" />
		<circle cx="4" cy="20" r="2" />
	</Base>
);
export const Speaker = (p: IconProps) => (
	<Base {...p}>
		<rect width="16" height="20" x="4" y="2" rx="2" />
		<path d="M12 6h.01" />
		<circle cx="12" cy="14" r="4" />
		<path d="M12 14h.01" />
	</Base>
);
export const Speech = (p: IconProps) => (
	<Base {...p}>
		<path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20" />
		<path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603" />
		<path d="M17 15a3.5 3.5 0 0 0-.025-4.975" />
	</Base>
);
export const SpellCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="m6 16 6-12 6 12" />
		<path d="M8 12h8" />
		<path d="m16 20 2 2 4-4" />
	</Base>
);
export const SpellCheck2 = (p: IconProps) => (
	<Base {...p}>
		<path d="m6 16 6-12 6 12" />
		<path d="M8 12h8" />
		<path d="M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1" />
	</Base>
);
export const Spline = (p: IconProps) => (
	<Base {...p}>
		<circle cx="19" cy="5" r="2" />
		<circle cx="5" cy="19" r="2" />
		<path d="M5 17A12 12 0 0 1 17 5" />
	</Base>
);
export const SplinePointer = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" />
		<path d="M5 17A12 12 0 0 1 17 5" />
		<circle cx="19" cy="5" r="2" />
		<circle cx="5" cy="19" r="2" />
	</Base>
);
export const Split = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 3h5v5" />
		<path d="M8 3H3v5" />
		<path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
		<path d="m15 9 6-6" />
	</Base>
);
export const Spool = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66" />
		<path d="m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178" />
	</Base>
);
export const SportShoe = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 10.42 4.8-5.07" />
		<path d="M19 18h3" />
		<path d="M9.5 22 21.414 9.415A2 2 0 0 0 21.2 6.4l-5.61-4.208A1 1 0 0 0 14 3v2a2 2 0 0 1-1.394 1.906L8.677 8.053A1 1 0 0 0 8 9c-.155 6.393-2.082 9-4 9a2 2 0 0 0 0 4h14" />
	</Base>
);
export const Spotlight = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.295 19.562 16 22" />
		<path d="m17 16 3.758 2.098" />
		<path d="m19 12.5 3.026-.598" />
		<path d="M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z" />
		<path d="M8 9V2" />
	</Base>
);
export const SprayCan = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 3h.01" />
		<path d="M7 5h.01" />
		<path d="M11 7h.01" />
		<path d="M3 7h.01" />
		<path d="M7 9h.01" />
		<path d="M3 11h.01" />
		<rect width="4" height="4" x="15" y="5" />
		<path d="m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2" />
		<path d="m13 14 8-2" />
		<path d="m13 19 8-2" />
	</Base>
);
export const Sprout = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3" />
		<path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" />
		<path d="M5 21h14" />
	</Base>
);
export const Square = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
	</Base>
);
export const SquareActivity = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M17 12h-2l-2 5-2-10-2 5H7" />
	</Base>
);
export const SquareArrowDown = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M12 8v8" />
		<path d="m8 12 4 4 4-4" />
	</Base>
);
export const SquareArrowDownLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 15H9l6-6" />
		<path d="M9 15V9" />
		<rect x="3" y="3" width="18" height="18" rx="2" />
	</Base>
);
export const SquareArrowDownRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 15 9 9" />
		<path d="M9 15h6V9" />
		<rect x="3" y="3" width="18" height="18" rx="2" />
	</Base>
);
export const SquareArrowLeft = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="m12 8-4 4 4 4" />
		<path d="M16 12H8" />
	</Base>
);
export const SquareArrowOutDownLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6" />
		<path d="m3 21 9-9" />
		<path d="M9 21H3v-6" />
	</Base>
);
export const SquareArrowOutDownRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
		<path d="m21 21-9-9" />
		<path d="M21 15v6h-6" />
	</Base>
);
export const SquareArrowOutUpLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6" />
		<path d="m3 3 9 9" />
		<path d="M3 9V3h6" />
	</Base>
);
export const SquareArrowOutUpRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
		<path d="m21 3-9 9" />
		<path d="M15 3h6v6" />
	</Base>
);
export const SquareArrowRight = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M8 12h8" />
		<path d="m12 16 4-4-4-4" />
	</Base>
);
export const SquareArrowRightEnter = (p: IconProps) => (
	<Base {...p}>
		<path d="m10 16 4-4-4-4" />
		<path d="M3 12h11" />
		<path d="M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
	</Base>
);
export const SquareArrowRightExit = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 12h11" />
		<path d="m17 16 4-4-4-4" />
		<path d="M21 6.344V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.344" />
	</Base>
);
export const SquareArrowUp = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="m16 12-4-4-4 4" />
		<path d="M12 16V8" />
	</Base>
);
export const SquareArrowUpLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 15 9 9" />
		<path d="M9 15V9h6" />
		<rect x="3" y="3" width="18" height="18" rx="2" />
	</Base>
);
export const SquareArrowUpRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 15V9H9" />
		<path d="m9 15 6-6" />
		<rect x="3" y="3" width="18" height="18" rx="2" />
	</Base>
);
export const SquareAsterisk = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M12 8v8" />
		<path d="m8.5 14 7-4" />
		<path d="m8.5 10 7 4" />
	</Base>
);
export const SquareBottomDashedScissors = (p: IconProps) => (
	<Base {...p}>
		<line x1="5" y1="3" x2="19" y2="3" />
		<line x1="3" y1="5" x2="3" y2="19" />
		<line x1="21" y1="5" x2="21" y2="19" />
		<line x1="9" y1="21" x2="10" y2="21" />
		<line x1="14" y1="21" x2="15" y2="21" />
		<path d="M 3 5 A2 2 0 0 1 5 3" />
		<path d="M 19 3 A2 2 0 0 1 21 5" />
		<path d="M 5 21 A2 2 0 0 1 3 19" />
		<path d="M 21 19 A2 2 0 0 1 19 21" />
		<circle cx="8.5" cy="8.5" r="1.5" />
		<line x1="9.56066" y1="9.56066" x2="12" y2="12" />
		<line x1="17" y1="17" x2="14.82" y2="14.82" />
		<circle cx="8.5" cy="15.5" r="1.5" />
		<line x1="9.56066" y1="14.43934" x2="17" y2="7" />
	</Base>
);
export const SquareCenterlineDashedHorizontal = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3" />
		<path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" />
		<path d="M12 20v2" />
		<path d="M12 14v2" />
		<path d="M12 8v2" />
		<path d="M12 2v2" />
	</Base>
);
export const SquareCenterlineDashedVertical = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
		<path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
		<path d="M4 12H2" />
		<path d="M10 12H8" />
		<path d="M16 12h-2" />
		<path d="M22 12h-2" />
	</Base>
);
export const SquareChartGantt = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M9 8h7" />
		<path d="M8 12h6" />
		<path d="M11 16h5" />
	</Base>
);
export const SquareCheck = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="m9 12 2 2 4-4" />
	</Base>
);
export const SquareCheckBig = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344" />
		<path d="m9 11 3 3L22 4" />
	</Base>
);
export const SquareChevronDown = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="m16 10-4 4-4-4" />
	</Base>
);
export const SquareChevronLeft = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="m14 16-4-4 4-4" />
	</Base>
);
export const SquareChevronRight = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="m10 8 4 4-4 4" />
	</Base>
);
export const SquareChevronUp = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="m8 14 4-4 4 4" />
	</Base>
);
export const SquareCode = (p: IconProps) => (
	<Base {...p}>
		<path d="m10 9-3 3 3 3" />
		<path d="m14 15 3-3-3-3" />
		<rect x="3" y="3" width="18" height="18" rx="2" />
	</Base>
);
export const SquareDashed = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 3a2 2 0 0 0-2 2" />
		<path d="M19 3a2 2 0 0 1 2 2" />
		<path d="M21 19a2 2 0 0 1-2 2" />
		<path d="M5 21a2 2 0 0 1-2-2" />
		<path d="M9 3h1" />
		<path d="M9 21h1" />
		<path d="M14 3h1" />
		<path d="M14 21h1" />
		<path d="M3 9v1" />
		<path d="M21 9v1" />
		<path d="M3 14v1" />
		<path d="M21 14v1" />
	</Base>
);
export const SquareDashedBottom = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" />
		<path d="M9 21h1" />
		<path d="M14 21h1" />
	</Base>
);
export const SquareDashedBottomCode = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 9.5 8 12l2 2.5" />
		<path d="M14 21h1" />
		<path d="m14 9.5 2 2.5-2 2.5" />
		<path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" />
		<path d="M9 21h1" />
	</Base>
);
export const SquareDashedKanban = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 7v7" />
		<path d="M12 7v4" />
		<path d="M16 7v9" />
		<path d="M5 3a2 2 0 0 0-2 2" />
		<path d="M9 3h1" />
		<path d="M14 3h1" />
		<path d="M19 3a2 2 0 0 1 2 2" />
		<path d="M21 9v1" />
		<path d="M21 14v1" />
		<path d="M21 19a2 2 0 0 1-2 2" />
		<path d="M14 21h1" />
		<path d="M9 21h1" />
		<path d="M5 21a2 2 0 0 1-2-2" />
		<path d="M3 14v1" />
		<path d="M3 9v1" />
	</Base>
);
export const SquareDashedMousePointer = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" />
		<path d="M5 3a2 2 0 0 0-2 2" />
		<path d="M19 3a2 2 0 0 1 2 2" />
		<path d="M5 21a2 2 0 0 1-2-2" />
		<path d="M9 3h1" />
		<path d="M9 21h2" />
		<path d="M14 3h1" />
		<path d="M3 9v1" />
		<path d="M21 9v2" />
		<path d="M3 14v1" />
	</Base>
);
export const SquareDashedText = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 21h1" />
		<path d="M14 3h1" />
		<path d="M19 3a2 2 0 0 1 2 2" />
		<path d="M21 14v1" />
		<path d="M21 19a2 2 0 0 1-2 2" />
		<path d="M21 9v1" />
		<path d="M3 14v1" />
		<path d="M3 9v1" />
		<path d="M5 21a2 2 0 0 1-2-2" />
		<path d="M5 3a2 2 0 0 0-2 2" />
		<path d="M7 12h10" />
		<path d="M7 16h6" />
		<path d="M7 8h8" />
		<path d="M9 21h1" />
		<path d="M9 3h1" />
	</Base>
);
export const SquareDashedTopSolid = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 21h1" />
		<path d="M21 14v1" />
		<path d="M21 19a2 2 0 0 1-2 2" />
		<path d="M21 9v1" />
		<path d="M3 14v1" />
		<path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
		<path d="M3 9v1" />
		<path d="M5 21a2 2 0 0 1-2-2" />
		<path d="M9 21h1" />
	</Base>
);
export const SquareDivide = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
		<line x1="8" x2="16" y1="12" y2="12" />
		<line x1="12" x2="12" y1="16" y2="16" />
		<line x1="12" x2="12" y1="8" y2="8" />
	</Base>
);
export const SquareDot = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<circle cx="12" cy="12" r="1" />
	</Base>
);
export const SquareEqual = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M7 10h10" />
		<path d="M7 14h10" />
	</Base>
);
export const SquareFunction = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
		<path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" />
		<path d="M9 11.2h5.7" />
	</Base>
);
export const SquareKanban = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M8 7v7" />
		<path d="M12 7v4" />
		<path d="M16 7v9" />
	</Base>
);
export const SquareLibrary = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M7 7v10" />
		<path d="M11 7v10" />
		<path d="m15 7 2 10" />
	</Base>
);
export const SquareM = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16" />
		<rect x="3" y="3" width="18" height="18" rx="2" />
	</Base>
);
export const SquareMenu = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M7 8h10" />
		<path d="M7 12h10" />
		<path d="M7 16h10" />
	</Base>
);
export const SquareMinus = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M8 12h8" />
	</Base>
);
export const SquareMousePointer = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" />
		<path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
	</Base>
);
export const SquareParking = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
	</Base>
);
export const SquareParkingOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41" />
		<path d="M3 8.7V19a2 2 0 0 0 2 2h10.3" />
		<path d="m2 2 20 20" />
		<path d="M13 13a3 3 0 1 0 0-6H9v2" />
		<path d="M9 17v-2.3" />
	</Base>
);
export const SquarePause = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<line x1="10" x2="10" y1="15" y2="9" />
		<line x1="14" x2="14" y1="15" y2="9" />
	</Base>
);
export const SquarePen = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
		<path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
	</Base>
);
export const SquarePercent = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="m15 9-6 6" />
		<path d="M9 9h.01" />
		<path d="M15 15h.01" />
	</Base>
);
export const SquarePi = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M7 7h10" />
		<path d="M10 7v10" />
		<path d="M16 17a2 2 0 0 1-2-2V7" />
	</Base>
);
export const SquarePilcrow = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M12 12H9.5a2.5 2.5 0 0 1 0-5H17" />
		<path d="M12 7v10" />
		<path d="M16 7v10" />
	</Base>
);
export const SquarePlay = (p: IconProps) => (
	<Base {...p}>
		<rect x="3" y="3" width="18" height="18" rx="2" />
		<path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" />
	</Base>
);
export const SquarePlus = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M8 12h8" />
		<path d="M12 8v8" />
	</Base>
);
export const SquarePower = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 7v4" />
		<path d="M7.998 9.003a5 5 0 1 0 8-.005" />
		<rect x="3" y="3" width="18" height="18" rx="2" />
	</Base>
);
export const SquareRadical = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 12h2l2 5 2-10h4" />
		<rect x="3" y="3" width="18" height="18" rx="2" />
	</Base>
);
export const SquareRoundCorner = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 11a8 8 0 0 0-8-8" />
		<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
	</Base>
);
export const SquareScissors = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<circle cx="8.5" cy="8.5" r="1.5" />
		<line x1="9.56066" y1="9.56066" x2="12" y2="12" />
		<line x1="17" y1="17" x2="14.82" y2="14.82" />
		<circle cx="8.5" cy="15.5" r="1.5" />
		<line x1="9.56066" y1="14.43934" x2="17" y2="7" />
	</Base>
);
export const SquareSigma = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M16 8.9V7H8l4 5-4 5h8v-1.9" />
	</Base>
);
export const SquareSlash = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<line x1="9" x2="15" y1="15" y2="9" />
	</Base>
);
export const SquareSplitHorizontal = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3" />
		<path d="M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3" />
		<line x1="12" x2="12" y1="4" y2="20" />
	</Base>
);
export const SquareSplitVertical = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3" />
		<path d="M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3" />
		<line x1="4" x2="20" y1="12" y2="12" />
	</Base>
);
export const SquareSquare = (p: IconProps) => (
	<Base {...p}>
		<rect x="3" y="3" width="18" height="18" rx="2" />
		<rect x="8" y="8" width="8" height="8" rx="1" />
	</Base>
);
export const SquareStack = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" />
		<path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" />
		<rect width="8" height="8" x="14" y="14" rx="2" />
	</Base>
);
export const SquareStar = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.035 7.69a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
		<rect x="3" y="3" width="18" height="18" rx="2" />
	</Base>
);
export const SquareStop = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<rect x="9" y="9" width="6" height="6" rx="1" />
	</Base>
);
export const SquareTerminal = (p: IconProps) => (
	<Base {...p}>
		<path d="m7 11 2-2-2-2" />
		<path d="M11 13h4" />
		<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
	</Base>
);
export const SquareUser = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<circle cx="12" cy="10" r="3" />
		<path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
	</Base>
);
export const SquareUserRound = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 21a6 6 0 0 0-12 0" />
		<circle cx="12" cy="11" r="4" />
		<rect width="18" height="18" x="3" y="3" rx="2" />
	</Base>
);
export const SquareX = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
		<path d="m15 9-6 6" />
		<path d="m9 9 6 6" />
	</Base>
);
export const SquaresExclude = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0" />
		<path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2" />
	</Base>
);
export const SquaresIntersect = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 22a2 2 0 0 1-2-2" />
		<path d="M14 2a2 2 0 0 1 2 2" />
		<path d="M16 22h-2" />
		<path d="M2 10V8" />
		<path d="M2 4a2 2 0 0 1 2-2" />
		<path d="M20 8a2 2 0 0 1 2 2" />
		<path d="M22 14v2" />
		<path d="M22 20a2 2 0 0 1-2 2" />
		<path d="M4 16a2 2 0 0 1-2-2" />
		<path d="M8 10a2 2 0 0 1 2-2h5a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H9a1 1 0 0 1-1-1z" />
		<path d="M8 2h2" />
	</Base>
);
export const SquaresSubtract = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 22a2 2 0 0 1-2-2" />
		<path d="M16 22h-2" />
		<path d="M16 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-5a2 2 0 0 1 2-2h5a1 1 0 0 0 1-1z" />
		<path d="M20 8a2 2 0 0 1 2 2" />
		<path d="M22 14v2" />
		<path d="M22 20a2 2 0 0 1-2 2" />
	</Base>
);
export const SquaresUnite = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1z" />
	</Base>
);
export const Squircle = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9" />
	</Base>
);
export const SquircleDashed = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.77 3.043a34 34 0 0 0-3.54 0" />
		<path d="M13.771 20.956a33 33 0 0 1-3.541.001" />
		<path d="M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44" />
		<path d="M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438" />
		<path d="M20.957 10.23a33 33 0 0 1 0 3.54" />
		<path d="M3.043 10.23a34 34 0 0 0 .001 3.541" />
		<path d="M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438" />
		<path d="M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44" />
	</Base>
);
export const Squirrel = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.236 22a3 3 0 0 0-2.2-5" />
		<path d="M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4" />
		<path d="M18 13h.01" />
		<path d="M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10" />
	</Base>
);
export const Stamp = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13" />
		<path d="M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z" />
		<path d="M5 22h14" />
	</Base>
);
export const StarCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="m19.06 12.501 2.78-2.707a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428.027-.014" />
		<path d="m15 18 2 2 4-4" />
	</Base>
);
export const StarHalf = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2" />
	</Base>
);
export const StarMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 18h6" />
		<path d="M17.688 14a2.1 2.1 0 0 1 .416-.568l3.736-3.638a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428.027-.014" />
	</Base>
);
export const StarOff = (p: IconProps) => (
	<Base {...p}>
		<path d="m10.344 4.688 1.181-2.393a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.237 3.152" />
		<path d="m17.945 17.945.43 2.505a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a8 8 0 0 0 .4-.099" />
		<path d="m2 2 20 20" />
	</Base>
);
export const StarPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.013 18.582 6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904L20 11.5" />
		<path d="M15 18h6" />
		<path d="M18 15v6" />
	</Base>
);
export const StarX = (p: IconProps) => (
	<Base {...p}>
		<path d="m15.5 15.5 5 5" />
		<path d="m20.063 11.525 1.777-1.731a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428a2.1 2.1 0 0 1 .987-.243 2 2 0 0 1 .132.004" />
		<path d="m20.5 15.5-5 5" />
	</Base>
);
export const StepBack = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.971 4.285A2 2 0 0 1 17 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z" />
		<path d="M21 20V4" />
	</Base>
);
export const StepForward = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z" />
		<path d="M3 4v16" />
	</Base>
);
export const Stethoscope = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 2v2" />
		<path d="M5 2v2" />
		<path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
		<path d="M8 15a6 6 0 0 0 12 0v-3" />
		<circle cx="20" cy="10" r="2" />
	</Base>
);
export const Sticker = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" />
		<path d="M15 3v5a1 1 0 0 0 1 1h5" />
		<path d="M8 13h.01" />
		<path d="M16 13h.01" />
		<path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1" />
	</Base>
);
export const StickyNote = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" />
		<path d="M15 3v5a1 1 0 0 0 1 1h5" />
	</Base>
);
export const StickyNoteCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="m15 19 2 2 4-4" />
		<path d="M15 3v5a1 1 0 0 0 1 1h5" />
		<path d="M21 13V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6.5" />
	</Base>
);
export const StickyNoteMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 3v5a1 1 0 0 0 1 1h5" />
		<path d="M21 14V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.35" />
		<path d="M21 18h-6" />
	</Base>
);
export const StickyNoteOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 3v5a1 1 0 0 0 1 1h5" />
		<path d="m2 2 20 20" />
		<path d="M3.586 3.586A2 2 0 0 0 3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.414-.586" />
		<path d="M8.656 3H15a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 21 9v6.344" />
	</Base>
);
export const StickyNotePlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 3v5a1 1 0 0 0 1 1h5" />
		<path d="M18 15v6" />
		<path d="M21 12.356V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.355" />
		<path d="M21 18h-6" />
	</Base>
);
export const StickyNoteX = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 3v5a1 1 0 0 0 1 1h5" />
		<path d="m16 16 5 5" />
		<path d="M21 12V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" />
		<path d="m21 16-5 5" />
	</Base>
);
export const StickyNotes = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 16 14v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" />
		<path d="M10 8v5a1 1 0 0 0 1 1h5" />
		<path d="M8 4a2 2 0 0 1 2-2h6a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 22 8v6a2 2 0 0 1-2 2" />
		<path d="M16 2v5a1 1 0 0 0 1 1h5" />
	</Base>
);
export const Stone = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.264 2.205A4 4 0 0 0 6.42 4.211l-4 8a4 4 0 0 0 1.359 5.117l6 4a4 4 0 0 0 4.438 0l6-4a4 4 0 0 0 1.576-4.592l-2-6a4 4 0 0 0-2.53-2.53z" />
		<path d="M11.99 22 14 12l7.822 3.184" />
		<path d="M14 12 8.47 2.302" />
	</Base>
);
export const Store = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
		<path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
		<path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
	</Base>
);
export const StretchHorizontal = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="6" x="2" y="4" rx="2" />
		<rect width="20" height="6" x="2" y="14" rx="2" />
	</Base>
);
export const StretchVertical = (p: IconProps) => (
	<Base {...p}>
		<rect width="6" height="20" x="4" y="2" rx="2" />
		<rect width="6" height="20" x="14" y="2" rx="2" />
	</Base>
);
export const Strikethrough = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 4H9a3 3 0 0 0-2.83 4" />
		<path d="M14 12a4 4 0 0 1 0 8H6" />
		<line x1="4" x2="20" y1="12" y2="12" />
	</Base>
);
export const Subscript = (p: IconProps) => (
	<Base {...p}>
		<path d="m4 5 8 8" />
		<path d="m12 5-8 8" />
		<path d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07" />
	</Base>
);
export const Summary = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 4H7" />
		<path d="m18 16 3 3-3 3" />
		<path d="M3 4v13a2 2 0 0 0 2 2h16" />
		<path d="M7 14h7" />
		<path d="M7 9h12" />
	</Base>
);
export const Sun = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2" />
		<path d="M12 20v2" />
		<path d="m4.93 4.93 1.41 1.41" />
		<path d="m17.66 17.66 1.41 1.41" />
		<path d="M2 12h2" />
		<path d="M20 12h2" />
		<path d="m6.34 17.66-1.41 1.41" />
		<path d="m19.07 4.93-1.41 1.41" />
	</Base>
);
export const SunDim = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="4" />
		<path d="M12 4h.01" />
		<path d="M20 12h.01" />
		<path d="M12 20h.01" />
		<path d="M4 12h.01" />
		<path d="M17.657 6.343h.01" />
		<path d="M17.657 17.657h.01" />
		<path d="M6.343 17.657h.01" />
		<path d="M6.343 6.343h.01" />
	</Base>
);
export const SunMedium = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="4" />
		<path d="M12 3v1" />
		<path d="M12 20v1" />
		<path d="M3 12h1" />
		<path d="M20 12h1" />
		<path d="m18.364 5.636-.707.707" />
		<path d="m6.343 17.657-.707.707" />
		<path d="m5.636 5.636.707.707" />
		<path d="m17.657 17.657.707.707" />
	</Base>
);
export const SunMoon = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v2" />
		<path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715" />
		<path d="M16 12a4 4 0 0 0-4-4" />
		<path d="m19 5-1.256 1.256" />
		<path d="M20 12h2" />
	</Base>
);
export const SunSnow = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 21v-1" />
		<path d="M10 4V3" />
		<path d="M10 9a3 3 0 0 0 0 6" />
		<path d="m14 20 1.25-2.5L18 18" />
		<path d="m14 4 1.25 2.5L18 6" />
		<path d="m17 21-3-6 1.5-3H22" />
		<path d="m17 3-3 6 1.5 3" />
		<path d="M2 12h1" />
		<path d="m20 10-1.5 2 1.5 2" />
		<path d="m3.64 18.36.7-.7" />
		<path d="m4.34 6.34-.7-.7" />
	</Base>
);
export const Sunrise = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v8" />
		<path d="m4.93 10.93 1.41 1.41" />
		<path d="M2 18h2" />
		<path d="M20 18h2" />
		<path d="m19.07 10.93-1.41 1.41" />
		<path d="M22 22H2" />
		<path d="m8 6 4-4 4 4" />
		<path d="M16 18a4 4 0 0 0-8 0" />
	</Base>
);
export const Sunset = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 10V2" />
		<path d="m4.93 10.93 1.41 1.41" />
		<path d="M2 18h2" />
		<path d="M20 18h2" />
		<path d="m19.07 10.93-1.41 1.41" />
		<path d="M22 22H2" />
		<path d="m16 6-4 4-4-4" />
		<path d="M16 18a4 4 0 0 0-8 0" />
	</Base>
);
export const Superscript = (p: IconProps) => (
	<Base {...p}>
		<path d="m4 19 8-8" />
		<path d="m12 19-8-8" />
		<path d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06" />
	</Base>
);
export const SwatchBook = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z" />
		<path d="M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7" />
		<path d="M 7 17h.01" />
		<path d="m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8" />
	</Base>
);
export const SwissFranc = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 21V3h8" />
		<path d="M6 16h9" />
		<path d="M10 9.5h7" />
	</Base>
);
export const SwitchCamera = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
		<path d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" />
		<circle cx="12" cy="12" r="3" />
		<path d="m18 22-3-3 3-3" />
		<path d="m6 2 3 3-3 3" />
	</Base>
);
export const Sword = (p: IconProps) => (
	<Base {...p}>
		<path d="m11 19-6-6" />
		<path d="m5 21-2-2" />
		<path d="m8 16-4 4" />
		<path d="M9.5 17.5 21 6V3h-3L6.5 14.5" />
	</Base>
);
export const Swords = (p: IconProps) => (
	<Base {...p}>
		<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
		<line x1="13" x2="19" y1="19" y2="13" />
		<line x1="16" x2="20" y1="16" y2="20" />
		<line x1="19" x2="21" y1="21" y2="19" />
		<polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
		<line x1="5" x2="9" y1="14" y2="18" />
		<line x1="7" x2="4" y1="17" y2="20" />
		<line x1="3" x2="5" y1="19" y2="21" />
	</Base>
);
export const Syringe = (p: IconProps) => (
	<Base {...p}>
		<path d="m18 2 4 4" />
		<path d="m17 7 3-3" />
		<path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
		<path d="m9 11 4 4" />
		<path d="m5 19-3 3" />
		<path d="m14 4 6 6" />
	</Base>
);
export const Table = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3v18" />
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M3 9h18" />
		<path d="M3 15h18" />
	</Base>
);
export const Table2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
	</Base>
);
export const TableCellsMerge = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 21v-6" />
		<path d="M12 9V3" />
		<path d="M3 15h18" />
		<path d="M3 9h18" />
		<rect width="18" height="18" x="3" y="3" rx="2" />
	</Base>
);
export const TableCellsSplit = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 15V9" />
		<path d="M3 15h18" />
		<path d="M3 9h18" />
		<rect width="18" height="18" x="3" y="3" rx="2" />
	</Base>
);
export const TableColumnsSplit = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 14v2" />
		<path d="M14 20v2" />
		<path d="M14 2v2" />
		<path d="M14 8v2" />
		<path d="M2 15h8" />
		<path d="M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2" />
		<path d="M2 9h8" />
		<path d="M22 15h-4" />
		<path d="M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" />
		<path d="M22 9h-4" />
		<path d="M5 3v18" />
	</Base>
);
export const TableOfContents = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 5H3" />
		<path d="M16 12H3" />
		<path d="M16 19H3" />
		<path d="M21 5h.01" />
		<path d="M21 12h.01" />
		<path d="M21 19h.01" />
	</Base>
);
export const TableProperties = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 3v18" />
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M21 9H3" />
		<path d="M21 15H3" />
	</Base>
);
export const TableRowsSplit = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 10h2" />
		<path d="M15 22v-8" />
		<path d="M15 2v4" />
		<path d="M2 10h2" />
		<path d="M20 10h2" />
		<path d="M3 19h18" />
		<path d="M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6" />
		<path d="M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2" />
		<path d="M8 10h2" />
		<path d="M9 22v-8" />
		<path d="M9 2v4" />
	</Base>
);
export const Tablet = (p: IconProps) => (
	<Base {...p}>
		<rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
		<line x1="12" x2="12.01" y1="18" y2="18" />
	</Base>
);
export const TabletSmartphone = (p: IconProps) => (
	<Base {...p}>
		<rect width="10" height="14" x="3" y="8" rx="2" />
		<path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
		<path d="M8 18h.01" />
	</Base>
);
export const Tablets = (p: IconProps) => (
	<Base {...p}>
		<circle cx="7" cy="7" r="5" />
		<circle cx="17" cy="17" r="5" />
		<path d="M12 17h10" />
		<path d="m3.46 10.54 7.08-7.08" />
	</Base>
);
export const Tag = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
		<circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
	</Base>
);
export const TagPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 13h6" />
		<path d="m16.5 6.5-3.914-3.914A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l1.79-1.79" />
		<path d="M19 10v6" />
		<circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
	</Base>
);
export const TagX = (p: IconProps) => (
	<Base {...p}>
		<path d="m16.5 6.5-3.914-3.914A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.43 2.43 0 0 0 3.42 0l1.79-1.79" />
		<path d="m16.5 10.5 5 5" />
		<path d="m21.5 10.5-5 5" />
		<circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
	</Base>
);
export const Tags = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z" />
		<path d="M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193" />
		<circle cx="10.5" cy="6.5" r=".5" fill="currentColor" />
	</Base>
);
export const Tally1 = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 4v16" />
	</Base>
);
export const Tally2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 4v16" />
		<path d="M9 4v16" />
	</Base>
);
export const Tally3 = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 4v16" />
		<path d="M9 4v16" />
		<path d="M14 4v16" />
	</Base>
);
export const Tally4 = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 4v16" />
		<path d="M9 4v16" />
		<path d="M14 4v16" />
		<path d="M19 4v16" />
	</Base>
);
export const Tally5 = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 4v16" />
		<path d="M9 4v16" />
		<path d="M14 4v16" />
		<path d="M19 4v16" />
		<path d="M22 6 2 18" />
	</Base>
);
export const Tangent = (p: IconProps) => (
	<Base {...p}>
		<circle cx="17" cy="4" r="2" />
		<path d="M15.59 5.41 5.41 15.59" />
		<circle cx="4" cy="17" r="2" />
		<path d="M12 22s-4-9-1.5-11.5S22 12 22 12" />
	</Base>
);
export const Target = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="12" r="10" />
		<circle cx="12" cy="12" r="6" />
		<circle cx="12" cy="12" r="2" />
	</Base>
);
export const Telescope = (p: IconProps) => (
	<Base {...p}>
		<path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
		<path d="m13.56 11.747 4.332-.924" />
		<path d="m16 21-3.105-6.21" />
		<path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
		<path d="m6.158 8.633 1.114 4.456" />
		<path d="m8 21 3.105-6.21" />
		<circle cx="12" cy="13" r="2" />
	</Base>
);
export const Tent = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.5 21 14 3" />
		<path d="M20.5 21 10 3" />
		<path d="M15.5 21 12 15l-3.5 6" />
		<path d="M2 21h20" />
	</Base>
);
export const TentTree = (p: IconProps) => (
	<Base {...p}>
		<circle cx="4" cy="4" r="2" />
		<path d="m14 5 3-3 3 3" />
		<path d="m14 10 3-3 3 3" />
		<path d="M17 14V2" />
		<path d="M17 14H7l-5 8h20Z" />
		<path d="M8 14v8" />
		<path d="m9 14 5 8" />
	</Base>
);
export const Terminal = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 19h8" />
		<path d="m4 17 6-6-6-6" />
	</Base>
);
export const TestTube = (p: IconProps) => (
	<Base {...p}>
		<path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2" />
		<path d="M8.5 2h7" />
		<path d="M14.5 16h-5" />
	</Base>
);
export const TestTubeDiagonal = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3" />
		<path d="m16 2 6 6" />
		<path d="M12 16H4" />
	</Base>
);
export const TestTubes = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2" />
		<path d="M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2" />
		<path d="M3 2h7" />
		<path d="M14 2h7" />
		<path d="M9 16H4" />
		<path d="M20 16h-5" />
	</Base>
);
export const TextAlignCenter = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 5H3" />
		<path d="M17 12H7" />
		<path d="M19 19H5" />
	</Base>
);
export const TextAlignEnd = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 5H3" />
		<path d="M21 12H9" />
		<path d="M21 19H7" />
	</Base>
);
export const TextAlignJustify = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 5h18" />
		<path d="M3 12h18" />
		<path d="M3 19h18" />
	</Base>
);
export const TextAlignStart = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 5H3" />
		<path d="M15 12H3" />
		<path d="M17 19H3" />
	</Base>
);
export const TextCursor = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1" />
		<path d="M7 22h1a4 4 0 0 0 4-4" />
		<path d="M7 2h1a4 4 0 0 1 4 4" />
	</Base>
);
export const TextCursorInput = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6" />
		<path d="M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7" />
		<path d="M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1" />
		<path d="M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1" />
		<path d="M9 6v12" />
	</Base>
);
export const TextInitial = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 5h6" />
		<path d="M15 12h6" />
		<path d="M3 19h18" />
		<path d="m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12" />
		<path d="M3.92 10h6.16" />
	</Base>
);
export const TextQuote = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 5H3" />
		<path d="M21 12H8" />
		<path d="M21 19H8" />
		<path d="M3 12v7" />
	</Base>
);
export const TextSearch = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 5H3" />
		<path d="M10 12H3" />
		<path d="M10 19H3" />
		<circle cx="17" cy="15" r="3" />
		<path d="m21 19-1.9-1.9" />
	</Base>
);
export const TextWrap = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 16-3 3 3 3" />
		<path d="M3 12h14.5a1 1 0 0 1 0 7H13" />
		<path d="M3 19h6" />
		<path d="M3 5h18" />
	</Base>
);
export const Theater = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 10s3-3 3-8" />
		<path d="M22 10s-3-3-3-8" />
		<path d="M10 2c0 4.4-3.6 8-8 8" />
		<path d="M14 2c0 4.4 3.6 8 8 8" />
		<path d="M2 10s2 2 2 5" />
		<path d="M22 10s-2 2-2 5" />
		<path d="M8 15h8" />
		<path d="M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
		<path d="M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
	</Base>
);
export const Thermometer = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
	</Base>
);
export const ThermometerSnowflake = (p: IconProps) => (
	<Base {...p}>
		<path d="m10 20-1.25-2.5L6 18" />
		<path d="M10 4 8.75 6.5 6 6" />
		<path d="M10.585 15H10" />
		<path d="M2 12h6.5L10 9" />
		<path d="M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
		<path d="m4 10 1.5 2L4 14" />
		<path d="m7 21 3-6-1.5-3" />
		<path d="m7 3 3 6h2" />
	</Base>
);
export const ThermometerSun = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v2" />
		<path d="M12 8a4 4 0 0 0-1.645 7.647" />
		<path d="M2 12h2" />
		<path d="M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
		<path d="m4.93 4.93 1.41 1.41" />
		<path d="m6.34 17.66-1.41 1.41" />
	</Base>
);
export const ThumbsDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
		<path d="M17 14V2" />
	</Base>
);
export const ThumbsUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
		<path d="M7 10v12" />
	</Base>
);
export const Ticket = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
		<path d="M13 5v2" />
		<path d="M13 17v2" />
		<path d="M13 11v2" />
	</Base>
);
export const TicketCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
		<path d="m9 12 2 2 4-4" />
	</Base>
);
export const TicketMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
		<path d="M9 12h6" />
	</Base>
);
export const TicketPercent = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
		<path d="M9 9h.01" />
		<path d="m15 9-6 6" />
		<path d="M15 15h.01" />
	</Base>
);
export const TicketPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
		<path d="M9 12h6" />
		<path d="M12 9v6" />
	</Base>
);
export const TicketSlash = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
		<path d="m9.5 14.5 5-5" />
	</Base>
);
export const TicketX = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
		<path d="m9.5 14.5 5-5" />
		<path d="m9.5 9.5 5 5" />
	</Base>
);
export const Tickets = (p: IconProps) => (
	<Base {...p}>
		<path d="m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8" />
		<path d="M6 10V8" />
		<path d="M6 14v1" />
		<path d="M6 19v2" />
		<rect x="2" y="8" width="20" height="13" rx="2" />
	</Base>
);
export const TicketsPlane = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12" />
		<path d="m12 13.5 3.794.506" />
		<path d="m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8" />
		<path d="M6 10V8" />
		<path d="M6 14v1" />
		<path d="M6 19v2" />
		<rect x="2" y="8" width="20" height="13" rx="2" />
	</Base>
);
export const Timeline = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 12h.01" />
		<path d="M4 16h.01" />
		<path d="M4 20h.01" />
		<path d="M4 4h.01" />
		<path d="M4 8h.01" />
		<path d="M9.414 13.414a2 2 0 0 0 1.414.586H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 12z" />
		<path d="M9.414 21.414a2 2 0 0 0 1.414.586H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 20z" />
		<path d="M9.414 5.414A2 2 0 0 0 10.828 6H19a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 4z" />
	</Base>
);
export const Timer = (p: IconProps) => (
	<Base {...p}>
		<line x1="10" x2="14" y1="2" y2="2" />
		<line x1="12" x2="15" y1="14" y2="11" />
		<circle cx="12" cy="14" r="8" />
	</Base>
);
export const TimerOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 2h4" />
		<path d="M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7" />
		<path d="M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2" />
		<path d="m2 2 20 20" />
		<path d="M12 12v-2" />
	</Base>
);
export const TimerReset = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 2h4" />
		<path d="M12 14v-4" />
		<path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" />
		<path d="M9 17H4v5" />
	</Base>
);
export const ToggleLeft = (p: IconProps) => (
	<Base {...p}>
		<circle cx="9" cy="12" r="3" />
		<rect width="20" height="14" x="2" y="5" rx="7" />
	</Base>
);
export const ToggleRight = (p: IconProps) => (
	<Base {...p}>
		<circle cx="15" cy="12" r="3" />
		<rect width="20" height="14" x="2" y="5" rx="7" />
	</Base>
);
export const Toilet = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18" />
		<path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" />
	</Base>
);
export const ToolCase = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 15h4" />
		<path d="m14.817 10.995-.971-1.45 1.034-1.232a2 2 0 0 0-2.025-3.238l-1.82.364L9.91 3.885a2 2 0 0 0-3.625.748L6.141 6.55l-1.725.426a2 2 0 0 0-.19 3.756l.657.27" />
		<path d="m18.822 10.995 2.26-5.38a1 1 0 0 0-.557-1.318L16.954 2.9a1 1 0 0 0-1.281.533l-.924 2.122" />
		<path d="M4 12.006A1 1 0 0 1 4.994 11H19a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
	</Base>
);
export const Toolbox = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 12v4" />
		<path d="M16 6a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 .586-1.414l4-4A2 2 0 0 1 8 6z" />
		<path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
		<path d="M2 14h20" />
		<path d="M8 12v4" />
	</Base>
);
export const Tornado = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 4H3" />
		<path d="M18 8H6" />
		<path d="M19 12H9" />
		<path d="M16 16h-6" />
		<path d="M11 20H9" />
	</Base>
);
export const Torus = (p: IconProps) => (
	<Base {...p}>
		<ellipse cx="12" cy="11" rx="3" ry="2" />
		<ellipse cx="12" cy="12.5" rx="10" ry="8.5" />
	</Base>
);
export const Touchpad = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="16" x="2" y="4" rx="2" />
		<path d="M2 14h20" />
		<path d="M12 20v-6" />
	</Base>
);
export const TouchpadOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 20v-6" />
		<path d="M19.656 14H22" />
		<path d="M2 14h12" />
		<path d="m2 2 20 20" />
		<path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
		<path d="M9.656 4H20a2 2 0 0 1 2 2v10.344" />
	</Base>
);
export const TowelRack = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 7h-2" />
		<path d="M6.5 3h11A2.5 2.5 0 0 1 20 5.5V20a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V5.5a1 1 0 0 0-5 0V17a1 1 0 0 0 1 1h4" />
		<path d="M9 7H2" />
	</Base>
);
export const TowerControl = (p: IconProps) => (
	<Base {...p}>
		<path d="M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z" />
		<path d="M8 13v9" />
		<path d="M16 22v-9" />
		<path d="m9 6 1 7" />
		<path d="m15 6-1 7" />
		<path d="M12 6V2" />
		<path d="M13 2h-2" />
	</Base>
);
export const ToyBrick = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="12" x="3" y="8" rx="1" />
		<path d="M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3" />
		<path d="M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3" />
	</Base>
);
export const Tractor = (p: IconProps) => (
	<Base {...p}>
		<path d="m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20" />
		<path d="M16 18h-5" />
		<path d="M18 5a1 1 0 0 0-1 1v5.573" />
		<path d="M3 4h8.129a1 1 0 0 1 .99.863L13 11.246" />
		<path d="M4 11V4" />
		<path d="M7 15h.01" />
		<path d="M8 10.1V4" />
		<circle cx="18" cy="18" r="2" />
		<circle cx="7" cy="15" r="5" />
	</Base>
);
export const TrafficCone = (p: IconProps) => (
	<Base {...p}>
		<path d="M16.05 10.966a5 2.5 0 0 1-8.1 0" />
		<path d="m16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04" />
		<path d="M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z" />
		<path d="M9.194 6.57a5 2.5 0 0 0 5.61 0" />
	</Base>
);
export const TrainFront = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 3.1V7a4 4 0 0 0 8 0V3.1" />
		<path d="m9 15-1-1" />
		<path d="m15 15 1-1" />
		<path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z" />
		<path d="m8 19-2 3" />
		<path d="m16 19 2 3" />
	</Base>
);
export const TrainFrontTunnel = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 22V12a10 10 0 1 1 20 0v10" />
		<path d="M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8" />
		<path d="M10 15h.01" />
		<path d="M14 15h.01" />
		<path d="M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z" />
		<path d="m9 19-2 3" />
		<path d="m15 19 2 3" />
	</Base>
);
export const TrainTrack = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 17 17 2" />
		<path d="m2 14 8 8" />
		<path d="m5 11 8 8" />
		<path d="m8 8 8 8" />
		<path d="m11 5 8 8" />
		<path d="m14 2 8 8" />
		<path d="M7 22 22 7" />
	</Base>
);
export const TramFront = (p: IconProps) => (
	<Base {...p}>
		<rect width="16" height="16" x="4" y="3" rx="2" />
		<path d="M4 11h16" />
		<path d="M12 3v8" />
		<path d="m8 19-2 3" />
		<path d="m18 22-2-3" />
		<path d="M8 15h.01" />
		<path d="M16 15h.01" />
	</Base>
);
export const Transgender = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 16v6" />
		<path d="M14 20h-4" />
		<path d="M18 2h4v4" />
		<path d="m2 2 7.17 7.17" />
		<path d="M2 5.355V2h3.357" />
		<path d="m22 2-7.17 7.17" />
		<path d="M8 5 5 8" />
		<circle cx="12" cy="12" r="4" />
	</Base>
);
export const Trash = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
		<path d="M3 6h18" />
		<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
	</Base>
);
export const Trash2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 11v6" />
		<path d="M14 11v6" />
		<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
		<path d="M3 6h18" />
		<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
	</Base>
);
export const TreeDeciduous = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z" />
		<path d="M12 19v3" />
	</Base>
);
export const TreePalm = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4" />
		<path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3" />
		<path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35" />
		<path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14" />
	</Base>
);
export const TreePine = (p: IconProps) => (
	<Base {...p}>
		<path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" />
		<path d="M12 22v-3" />
	</Base>
);
export const Trees = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
		<path d="M7 16v6" />
		<path d="M13 19v3" />
		<path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" />
	</Base>
);
export const TrendingDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 17h6v-6" />
		<path d="m22 17-8.5-8.5-5 5L2 7" />
	</Base>
);
export const TrendingUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 7h6v6" />
		<path d="m22 7-8.5 8.5-5-5L2 17" />
	</Base>
);
export const TrendingUpDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M14.828 14.828 21 21" />
		<path d="M21 16v5h-5" />
		<path d="m21 3-9 9-4-4-6 6" />
		<path d="M21 8V3h-5" />
	</Base>
);
export const Triangle = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
	</Base>
);
export const TriangleAlert = (p: IconProps) => (
	<Base {...p}>
		<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
		<path d="M12 9v4" />
		<path d="M12 17h.01" />
	</Base>
);
export const TriangleDashed = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.17 4.193a2 2 0 0 1 3.666.013" />
		<path d="M14 21h2" />
		<path d="m15.874 7.743 1 1.732" />
		<path d="m18.849 12.952 1 1.732" />
		<path d="M21.824 18.18a2 2 0 0 1-1.835 2.824" />
		<path d="M4.024 21a2 2 0 0 1-1.839-2.839" />
		<path d="m5.136 12.952-1 1.732" />
		<path d="M8 21h2" />
		<path d="m8.102 7.743-1 1.732" />
	</Base>
);
export const TriangleRight = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z" />
	</Base>
);
export const Trophy = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
		<path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
		<path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
		<path d="M4 22h16" />
		<path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
		<path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
	</Base>
);
export const Truck = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
		<path d="M15 18H9" />
		<path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
		<circle cx="17" cy="18" r="2" />
		<circle cx="7" cy="18" r="2" />
	</Base>
);
export const TruckElectric = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 19V7a2 2 0 0 0-2-2H9" />
		<path d="M15 19H9" />
		<path d="M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14" />
		<path d="M2 13v5a1 1 0 0 0 1 1h2" />
		<path d="M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02" />
		<circle cx="17" cy="19" r="2" />
		<circle cx="7" cy="19" r="2" />
	</Base>
);
export const TurkishLira = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 4 5 9" />
		<path d="m15 8.5-10 5" />
		<path d="M18 12a9 9 0 0 1-9 9V3" />
	</Base>
);
export const Turntable = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 12.01h.01" />
		<path d="M18 8v4a8 8 0 0 1-1.07 4" />
		<circle cx="10" cy="12" r="4" />
		<rect x="2" y="4" width="20" height="16" rx="2" />
	</Base>
);
export const Turtle = (p: IconProps) => (
	<Base {...p}>
		<path d="m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z" />
		<path d="M4.82 7.9 8 10" />
		<path d="M15.18 7.9 12 10" />
		<path d="M16.93 10H20a2 2 0 0 1 0 4H2" />
	</Base>
);
export const Tv = (p: IconProps) => (
	<Base {...p}>
		<path d="m17 2-5 5-5-5" />
		<rect width="20" height="15" x="2" y="7" rx="2" />
	</Base>
);
export const TvMinimal = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 21h10" />
		<rect width="20" height="14" x="2" y="3" rx="2" />
	</Base>
);
export const TvMinimalPlay = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" />
		<path d="M7 21h10" />
		<rect width="20" height="14" x="2" y="3" rx="2" />
	</Base>
);
export const Type = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 4v16" />
		<path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" />
		<path d="M9 20h6" />
	</Base>
);
export const TypeOutline = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z" />
	</Base>
);
export const Umbrella = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 13v7a2 2 0 0 0 4 0" />
		<path d="M12 2v2" />
		<path d="M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z" />
	</Base>
);
export const UmbrellaOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 13v7a2 2 0 0 0 4 0" />
		<path d="M12 2v2" />
		<path d="M18.656 13h2.336a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-12.07-7.51" />
		<path d="m2 2 20 20" />
		<path d="M5.961 5.957a10.28 10.28 0 0 0-3.922 5.769A1 1 0 0 0 3 13h10" />
	</Base>
);
export const Underline = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 4v6a6 6 0 0 0 12 0V4" />
		<line x1="4" x2="20" y1="20" y2="20" />
	</Base>
);
export const Undo = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 7v6h6" />
		<path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
	</Base>
);
export const Undo2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 14 4 9l5-5" />
		<path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
	</Base>
);
export const UndoDot = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 17a9 9 0 0 0-15-6.7L3 13" />
		<path d="M3 7v6h6" />
		<circle cx="12" cy="17" r="1" />
	</Base>
);
export const UnfoldHorizontal = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 12h6" />
		<path d="M8 12H2" />
		<path d="M12 2v2" />
		<path d="M12 8v2" />
		<path d="M12 14v2" />
		<path d="M12 20v2" />
		<path d="m19 15 3-3-3-3" />
		<path d="m5 9-3 3 3 3" />
	</Base>
);
export const UnfoldVertical = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22v-6" />
		<path d="M12 8V2" />
		<path d="M4 12H2" />
		<path d="M10 12H8" />
		<path d="M16 12h-2" />
		<path d="M22 12h-2" />
		<path d="m15 19-3 3-3-3" />
		<path d="m15 5-3-3-3 3" />
	</Base>
);
export const Ungroup = (p: IconProps) => (
	<Base {...p}>
		<rect x="11" y="14" width="10" height="7" rx="2" />
		<rect x="3" y="3" width="10" height="7" rx="2" />
	</Base>
);
export const University = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 21v-3a2 2 0 0 0-4 0v3" />
		<path d="M18 12h.01" />
		<path d="M18 16h.01" />
		<path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" />
		<path d="M6 12h.01" />
		<path d="M6 16h.01" />
		<circle cx="12" cy="10" r="2" />
	</Base>
);
export const Unlink = (p: IconProps) => (
	<Base {...p}>
		<path d="m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71" />
		<path d="m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71" />
		<line x1="8" x2="8" y1="2" y2="5" />
		<line x1="2" x2="5" y1="8" y2="8" />
		<line x1="16" x2="16" y1="19" y2="22" />
		<line x1="19" x2="22" y1="16" y2="16" />
	</Base>
);
export const Unlink2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2" />
	</Base>
);
export const Unplug = (p: IconProps) => (
	<Base {...p}>
		<path d="m19 5 3-3" />
		<path d="m2 22 3-3" />
		<path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" />
		<path d="M7.5 13.5 10 11" />
		<path d="M10.5 16.5 13 14" />
		<path d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" />
	</Base>
);
export const Usb = (p: IconProps) => (
	<Base {...p}>
		<circle cx="10" cy="7" r="1" />
		<circle cx="4" cy="20" r="1" />
		<path d="M4.7 19.3 19 5" />
		<path d="m21 3-3 1 2 2Z" />
		<path d="M9.26 7.68 5 12l2 5" />
		<path d="m10 14 5 2 3.5-3.5" />
		<path d="m18 12 1-1 1 1-1 1Z" />
	</Base>
);
export const User = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
		<circle cx="12" cy="7" r="4" />
	</Base>
);
export const UserCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 11 2 2 4-4" />
		<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
		<circle cx="9" cy="7" r="4" />
	</Base>
);
export const UserCog = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 15H6a4 4 0 0 0-4 4v2" />
		<path d="m14.305 16.53.923-.382" />
		<path d="m15.228 13.852-.923-.383" />
		<path d="m16.852 12.228-.383-.923" />
		<path d="m16.852 17.772-.383.924" />
		<path d="m19.148 12.228.383-.923" />
		<path d="m19.53 18.696-.382-.924" />
		<path d="m20.772 13.852.924-.383" />
		<path d="m20.772 16.148.924.383" />
		<circle cx="18" cy="15" r="3" />
		<circle cx="9" cy="7" r="4" />
	</Base>
);
export const UserKey = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 11v6" />
		<path d="M20 13h2" />
		<path d="M3 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 2.072.578" />
		<circle cx="10" cy="7" r="4" />
		<circle cx="20" cy="19" r="2" />
	</Base>
);
export const UserLock = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 16v-2a2 2 0 0 0-4 0v2" />
		<path d="M9.5 15H7a4 4 0 0 0-4 4v2" />
		<circle cx="10" cy="7" r="4" />
		<rect x="13" y="16" width="8" height="5" rx=".899" />
	</Base>
);
export const UserMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
		<circle cx="9" cy="7" r="4" />
		<line x1="22" x2="16" y1="11" y2="11" />
	</Base>
);
export const UserPen = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
		<path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
		<circle cx="10" cy="7" r="4" />
	</Base>
);
export const UserPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
		<circle cx="9" cy="7" r="4" />
		<line x1="19" x2="19" y1="8" y2="14" />
		<line x1="22" x2="16" y1="11" y2="11" />
	</Base>
);
export const UserRound = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="8" r="5" />
		<path d="M20 21a8 8 0 0 0-16 0" />
	</Base>
);
export const UserRoundArrowLeft = (p: IconProps) => (
	<Base {...p}>
		<path d="m19 16-3 3" />
		<path d="M2 21a8 8 0 0 1 12.664-6.5" />
		<path d="M22 19h-6l3 3" />
		<circle cx="10" cy="8" r="5" />
	</Base>
);
export const UserRoundCheck = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 21a8 8 0 0 1 13.292-6" />
		<circle cx="10" cy="8" r="5" />
		<path d="m16 19 2 2 4-4" />
	</Base>
);
export const UserRoundCog = (p: IconProps) => (
	<Base {...p}>
		<path d="m14.305 19.53.923-.382" />
		<path d="m15.228 16.852-.923-.383" />
		<path d="m16.852 15.228-.383-.923" />
		<path d="m16.852 20.772-.383.924" />
		<path d="m19.148 15.228.383-.923" />
		<path d="m19.53 21.696-.382-.924" />
		<path d="M2 21a8 8 0 0 1 10.434-7.62" />
		<path d="m20.772 16.852.924-.383" />
		<path d="m20.772 19.148.924.383" />
		<circle cx="10" cy="8" r="5" />
		<circle cx="18" cy="18" r="3" />
	</Base>
);
export const UserRoundKey = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 11v6" />
		<path d="M19 13h2" />
		<path d="M2 21a8 8 0 0 1 12.868-6.349" />
		<circle cx="10" cy="8" r="5" />
		<circle cx="19" cy="19" r="2" />
	</Base>
);
export const UserRoundMinus = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 21a8 8 0 0 1 13.292-6" />
		<circle cx="10" cy="8" r="5" />
		<path d="M22 19h-6" />
	</Base>
);
export const UserRoundPen = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 21a8 8 0 0 1 10.821-7.487" />
		<path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
		<circle cx="10" cy="8" r="5" />
	</Base>
);
export const UserRoundPlus = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 21a8 8 0 0 1 13.292-6" />
		<circle cx="10" cy="8" r="5" />
		<path d="M19 16v6" />
		<path d="M22 19h-6" />
	</Base>
);
export const UserRoundSearch = (p: IconProps) => (
	<Base {...p}>
		<circle cx="10" cy="8" r="5" />
		<path d="M2 21a8 8 0 0 1 10.434-7.62" />
		<circle cx="18" cy="18" r="3" />
		<path d="m22 22-1.9-1.9" />
	</Base>
);
export const UserRoundX = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 21a8 8 0 0 1 11.873-7" />
		<circle cx="10" cy="8" r="5" />
		<path d="m17 17 5 5" />
		<path d="m22 17-5 5" />
	</Base>
);
export const UserSearch = (p: IconProps) => (
	<Base {...p}>
		<circle cx="10" cy="7" r="4" />
		<path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
		<circle cx="17" cy="17" r="3" />
		<path d="m21 21-1.9-1.9" />
	</Base>
);
export const UserStar = (p: IconProps) => (
	<Base {...p}>
		<path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
		<path d="M8 15H7a4 4 0 0 0-4 4v2" />
		<circle cx="10" cy="7" r="4" />
	</Base>
);
export const UserX = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
		<circle cx="9" cy="7" r="4" />
		<line x1="17" x2="22" y1="8" y2="13" />
		<line x1="22" x2="17" y1="8" y2="13" />
	</Base>
);
export const Users = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
		<path d="M16 3.128a4 4 0 0 1 0 7.744" />
		<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
		<circle cx="9" cy="7" r="4" />
	</Base>
);
export const UsersRound = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 21a8 8 0 0 0-16 0" />
		<circle cx="10" cy="8" r="5" />
		<path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
	</Base>
);
export const Utensils = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
		<path d="M7 2v20" />
		<path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
	</Base>
);
export const UtensilsCrossed = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
		<path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
		<path d="m2.1 21.8 6.4-6.3" />
		<path d="m19 5-7 7" />
	</Base>
);
export const UtilityPole = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v20" />
		<path d="M2 5h20" />
		<path d="M3 3v2" />
		<path d="M7 3v2" />
		<path d="M17 3v2" />
		<path d="M21 3v2" />
		<path d="m19 5-7 7-7-7" />
	</Base>
);
export const Van = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 6v5a1 1 0 0 0 1 1h6.102a1 1 0 0 1 .712.298l.898.91a1 1 0 0 1 .288.702V17a1 1 0 0 1-1 1h-3" />
		<path d="M5 18H3a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h12c1.1 0 2.1.8 2.4 1.8l1.176 4.2" />
		<path d="M9 18h5" />
		<circle cx="16" cy="18" r="2" />
		<circle cx="7" cy="18" r="2" />
	</Base>
);
export const Variable = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 21s-4-3-4-9 4-9 4-9" />
		<path d="M16 3s4 3 4 9-4 9-4 9" />
		<line x1="15" x2="9" y1="9" y2="15" />
		<line x1="9" x2="15" y1="9" y2="15" />
	</Base>
);
export const Vault = (p: IconProps) => (
	<Base {...p}>
		<rect width="18" height="18" x="3" y="3" rx="2" />
		<circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
		<path d="m7.9 7.9 2.7 2.7" />
		<circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
		<path d="m13.4 10.6 2.7-2.7" />
		<circle cx="7.5" cy="16.5" r=".5" fill="currentColor" />
		<path d="m7.9 16.1 2.7-2.7" />
		<circle cx="16.5" cy="16.5" r=".5" fill="currentColor" />
		<path d="m13.4 13.4 2.7 2.7" />
		<circle cx="12" cy="12" r="2" />
	</Base>
);
export const VectorSquare = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.5 7a24 24 0 0 1 0 10" />
		<path d="M4.5 7a24 24 0 0 0 0 10" />
		<path d="M7 19.5a24 24 0 0 0 10 0" />
		<path d="M7 4.5a24 24 0 0 1 10 0" />
		<rect x="17" y="17" width="5" height="5" rx="1" />
		<rect x="17" y="2" width="5" height="5" rx="1" />
		<rect x="2" y="17" width="5" height="5" rx="1" />
		<rect x="2" y="2" width="5" height="5" rx="1" />
	</Base>
);
export const Vegan = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 8q6 0 6-6-6 0-6 6" />
		<path d="M17.41 3.59a10 10 0 1 0 3 3" />
		<path d="M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14" />
	</Base>
);
export const VenetianMask = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 11c-1.5 0-2.5.5-3 2" />
		<path d="M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z" />
		<path d="M6 11c1.5 0 2.5.5 3 2" />
	</Base>
);
export const Venus = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 15v7" />
		<path d="M9 19h6" />
		<circle cx="12" cy="9" r="6" />
	</Base>
);
export const VenusAndMars = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 20h4" />
		<path d="M12 16v6" />
		<path d="M17 2h4v4" />
		<path d="m21 2-5.46 5.46" />
		<circle cx="12" cy="11" r="5" />
	</Base>
);
export const Vibrate = (p: IconProps) => (
	<Base {...p}>
		<path d="m2 8 2 2-2 2 2 2-2 2" />
		<path d="m22 8-2 2 2 2-2 2 2 2" />
		<rect width="8" height="14" x="8" y="5" rx="1" />
	</Base>
);
export const VibrateOff = (p: IconProps) => (
	<Base {...p}>
		<path d="m2 8 2 2-2 2 2 2-2 2" />
		<path d="m22 8-2 2 2 2-2 2 2 2" />
		<path d="M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2" />
		<path d="M16 10.34V6c0-.55-.45-1-1-1h-4.34" />
		<line x1="2" x2="22" y1="2" y2="22" />
	</Base>
);
export const Video = (p: IconProps) => (
	<Base {...p}>
		<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
		<rect x="2" y="6" width="14" height="12" rx="2" />
	</Base>
);
export const VideoOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196" />
		<path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
		<path d="m2 2 20 20" />
	</Base>
);
export const Videotape = (p: IconProps) => (
	<Base {...p}>
		<rect width="20" height="16" x="2" y="4" rx="2" />
		<path d="M2 8h20" />
		<circle cx="8" cy="14" r="2" />
		<path d="M8 12h8" />
		<circle cx="16" cy="14" r="2" />
	</Base>
);
export const View = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
		<path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
		<circle cx="12" cy="12" r="1" />
		<path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
	</Base>
);
export const Voicemail = (p: IconProps) => (
	<Base {...p}>
		<circle cx="6" cy="12" r="4" />
		<circle cx="18" cy="12" r="4" />
		<line x1="6" x2="18" y1="16" y2="16" />
	</Base>
);
export const Volleyball = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 7a16 16 20 0 1 10.98 4.362" />
		<path d="M12 12a13 13 0 0 1-8.66 5" />
		<path d="M16.83 13.634a16 16 0 0 1-9.267 7.328" />
		<path d="M20.66 17A13 13 0 0 0 12 12a13 13 0 0 1 0-10" />
		<path d="M8.17 15.366a16 16 0 0 1-1.713-11.69" />
		<circle cx="12" cy="12" r="10" />
	</Base>
);
export const Volume = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
	</Base>
);
export const Volume1 = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
		<path d="M16 9a5 5 0 0 1 0 6" />
	</Base>
);
export const Volume2 = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
		<path d="M16 9a5 5 0 0 1 0 6" />
		<path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
	</Base>
);
export const VolumeOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 9a5 5 0 0 1 .95 2.293" />
		<path d="M19.364 5.636a9 9 0 0 1 1.889 9.96" />
		<path d="m2 2 20 20" />
		<path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11" />
		<path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686" />
	</Base>
);
export const VolumeX = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
		<line x1="22" x2="16" y1="9" y2="15" />
		<line x1="16" x2="22" y1="9" y2="15" />
	</Base>
);
export const Vote = (p: IconProps) => (
	<Base {...p}>
		<path d="m9 12 2 2 4-4" />
		<path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
		<path d="M22 19H2" />
	</Base>
);
export const Wallet = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
		<path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
	</Base>
);
export const WalletCards = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21" />
		<path d="M3 7h18" />
		<rect x="3" y="3" width="18" height="18" rx="2" />
	</Base>
);
export const WalletMinimal = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 14h.01" />
		<path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" />
	</Base>
);
export const Wallpaper = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 17v4" />
		<path d="M8 21h8" />
		<path d="m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15" />
		<circle cx="8" cy="9" r="2" />
		<rect x="2" y="3" width="20" height="14" rx="2" />
	</Base>
);
export const Wand = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 4V2" />
		<path d="M15 16v-2" />
		<path d="M8 9h2" />
		<path d="M20 9h2" />
		<path d="M17.8 11.8 19 13" />
		<path d="M15 9h.01" />
		<path d="M17.8 6.2 19 5" />
		<path d="m3 21 9-9" />
		<path d="M12.2 6.2 11 5" />
	</Base>
);
export const WandSparkles = (p: IconProps) => (
	<Base {...p}>
		<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
		<path d="m14 7 3 3" />
		<path d="M5 6v4" />
		<path d="M19 14v4" />
		<path d="M10 2v2" />
		<path d="M7 8H3" />
		<path d="M21 16h-4" />
		<path d="M11 3H9" />
	</Base>
);
export const Warehouse = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11" />
		<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z" />
		<path d="M6 13h12" />
		<path d="M6 17h12" />
	</Base>
);
export const WashingMachine = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 6h3" />
		<path d="M17 6h.01" />
		<rect width="18" height="20" x="3" y="2" rx="2" />
		<circle cx="12" cy="13" r="5" />
		<path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" />
	</Base>
);
export const Watch = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 10v2.2l1.6 1" />
		<path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05" />
		<path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05" />
		<circle cx="12" cy="12" r="6" />
	</Base>
);
export const WavesArrowDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 10L12 2" />
		<path d="M16 6L12 10L8 6" />
		<path d="M2 15C2.6 15.5 3.2 16 4.5 16C7 16 7 14 9.5 14C12.1 14 11.9 16 14.5 16C17 16 17 14 19.5 14C20.8 14 21.4 14.5 22 15" />
		<path d="M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C12.1 20 11.9 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21" />
	</Base>
);
export const WavesArrowUp = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2v8" />
		<path d="M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
		<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
		<path d="m8 6 4-4 4 4" />
	</Base>
);
export const WavesHorizontal = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 12q2.5 2 5 0t5 0 5 0 5 0" />
		<path d="M2 19q2.5 2 5 0t5 0 5 0 5 0" />
		<path d="M2 5q2.5 2 5 0t5 0 5 0 5 0" />
	</Base>
);
export const WavesLadder = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 5a2 2 0 0 0-2 2v11" />
		<path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
		<path d="M7 13h10" />
		<path d="M7 9h10" />
		<path d="M9 5a2 2 0 0 0-2 2v11" />
	</Base>
);
export const WavesVertical = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2q2 2.5 0 5t0 5 0 5 0 5" />
		<path d="M19 2q2 2.5 0 5t0 5 0 5 0 5" />
		<path d="M5 2q2 2.5 0 5t0 5 0 5 0 5" />
	</Base>
);
export const Waypoints = (p: IconProps) => (
	<Base {...p}>
		<path d="m10.586 5.414-5.172 5.172" />
		<path d="m18.586 13.414-5.172 5.172" />
		<path d="M6 12h12" />
		<circle cx="12" cy="20" r="2" />
		<circle cx="12" cy="4" r="2" />
		<circle cx="20" cy="12" r="2" />
		<circle cx="4" cy="12" r="2" />
	</Base>
);
export const Webcam = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="10" r="8" />
		<circle cx="12" cy="10" r="3" />
		<path d="M7 22h10" />
		<path d="M12 22v-4" />
	</Base>
);
export const WebcamOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 22v-4" />
		<path d="M12.754 7.096a3 3 0 0 1 2.15 2.15" />
		<path d="M12.863 12.873a3 3 0 0 1-3.736-3.735" />
		<path d="M16.566 16.57A8 8 0 0 1 5.43 5.433" />
		<path d="m2 2 20 20" />
		<path d="M7 22h10" />
		<path d="M8.478 2.817a8 8 0 0 1 10.705 10.705" />
	</Base>
);
export const Webhook = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
		<path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06" />
		<path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8" />
	</Base>
);
export const WebhookOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15" />
		<path d="M9 3.4a4 4 0 0 1 6.52.66" />
		<path d="m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05" />
		<path d="M20.3 20.3a4 4 0 0 1-2.3.7" />
		<path d="M18.6 13a4 4 0 0 1 3.357 3.414" />
		<path d="m12 6 .6 1" />
		<path d="m2 2 20 20" />
	</Base>
);
export const Weight = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="5" r="3" />
		<path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z" />
	</Base>
);
export const WeightTilde = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.5 8a2 2 0 0 0-1.906 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8z" />
		<path d="M7.999 15a2.5 2.5 0 0 1 4 0 2.5 2.5 0 0 0 4 0" />
		<circle cx="12" cy="5" r="3" />
	</Base>
);
export const Wheat = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 22 16 8" />
		<path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
		<path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
		<path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
		<path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
		<path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
		<path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
		<path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
	</Base>
);
export const WheatOff = (p: IconProps) => (
	<Base {...p}>
		<path d="m2 22 10-10" />
		<path d="m16 8-1.17 1.17" />
		<path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
		<path d="m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97" />
		<path d="M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62" />
		<path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
		<path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
		<path d="m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98" />
		<path d="M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28" />
		<line x1="2" x2="22" y1="2" y2="22" />
	</Base>
);
export const WholeWord = (p: IconProps) => (
	<Base {...p}>
		<circle cx="7" cy="12" r="3" />
		<path d="M10 9v6" />
		<circle cx="17" cy="12" r="3" />
		<path d="M14 7v8" />
		<path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" />
	</Base>
);
export const Wifi = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 20h.01" />
		<path d="M2 8.82a15 15 0 0 1 20 0" />
		<path d="M5 12.859a10 10 0 0 1 14 0" />
		<path d="M8.5 16.429a5 5 0 0 1 7 0" />
	</Base>
);
export const WifiCog = (p: IconProps) => (
	<Base {...p}>
		<path d="m14.305 19.53.923-.382" />
		<path d="m15.228 16.852-.923-.383" />
		<path d="m16.852 15.228-.383-.923" />
		<path d="m16.852 20.772-.383.924" />
		<path d="m19.148 15.228.383-.923" />
		<path d="m19.53 21.696-.382-.924" />
		<path d="M2 7.82a15 15 0 0 1 20 0" />
		<path d="m20.772 16.852.924-.383" />
		<path d="m20.772 19.148.924.383" />
		<path d="M5 11.858a10 10 0 0 1 11.5-1.785" />
		<path d="M8.5 15.429a5 5 0 0 1 2.413-1.31" />
		<circle cx="18" cy="18" r="3" />
	</Base>
);
export const WifiHigh = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 20h.01" />
		<path d="M5 12.859a10 10 0 0 1 14 0" />
		<path d="M8.5 16.429a5 5 0 0 1 7 0" />
	</Base>
);
export const WifiLow = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 20h.01" />
		<path d="M8.5 16.429a5 5 0 0 1 7 0" />
	</Base>
);
export const WifiOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 20h.01" />
		<path d="M8.5 16.429a5 5 0 0 1 7 0" />
		<path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
		<path d="M19 12.859a10 10 0 0 0-2.007-1.523" />
		<path d="M2 8.82a15 15 0 0 1 4.177-2.643" />
		<path d="M22 8.82a15 15 0 0 0-11.288-3.764" />
		<path d="m2 2 20 20" />
	</Base>
);
export const WifiPen = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 8.82a15 15 0 0 1 20 0" />
		<path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
		<path d="M5 12.859a10 10 0 0 1 10.5-2.222" />
		<path d="M8.5 16.429a5 5 0 0 1 3-1.406" />
	</Base>
);
export const WifiSync = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.965 10.105v4L13.5 12.5a5 5 0 0 1 8 1.5" />
		<path d="M11.965 14.105h4" />
		<path d="M17.965 18.105h4L20.43 19.71a5 5 0 0 1-8-1.5" />
		<path d="M2 8.82a15 15 0 0 1 20 0" />
		<path d="M21.965 22.105v-4" />
		<path d="M5 12.86a10 10 0 0 1 3-2.032" />
		<path d="M8.5 16.429h.01" />
	</Base>
);
export const WifiZero = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 20h.01" />
	</Base>
);
export const Wind = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
		<path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
		<path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
	</Base>
);
export const WindArrowDown = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 2v8" />
		<path d="M12.8 21.6A2 2 0 1 0 14 18H2" />
		<path d="M17.5 10a2.5 2.5 0 1 1 2 4H2" />
		<path d="m6 6 4 4 4-4" />
	</Base>
);
export const Wine = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 22h8" />
		<path d="M7 10h10" />
		<path d="M12 15v7" />
		<path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
	</Base>
);
export const WineOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 22h8" />
		<path d="M7 10h3m7 0h-1.343" />
		<path d="M12 15v7" />
		<path d="M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198" />
		<line x1="2" x2="22" y1="2" y2="22" />
	</Base>
);
export const Workflow = (p: IconProps) => (
	<Base {...p}>
		<rect width="8" height="8" x="3" y="3" rx="2" />
		<path d="M7 11v4a2 2 0 0 0 2 2h4" />
		<rect width="8" height="8" x="13" y="13" rx="2" />
	</Base>
);
export const Worm = (p: IconProps) => (
	<Base {...p}>
		<path d="m19 12-1.5 3" />
		<path d="M19.63 18.81 22 20" />
		<path d="M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z" />
	</Base>
);
export const Wrench = (p: IconProps) => (
	<Base {...p}>
		<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" />
	</Base>
);
export const WrenchOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.747 5.093a6 6 0 0 1 6.841-2.882c.438.12.54.662.219.984L14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-2.882 6.842" />
		<path d="m13.5 13.5-7.88 7.88a1 1 0 0 1-2.999-3l7.88-7.88" />
		<path d="m2 2 20 20" />
	</Base>
);
export const XLineTop = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 4H6" />
		<path d="M18 8 6 20" />
		<path d="m6 8 12 12" />
	</Base>
);
export const Zap = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
	</Base>
);
export const ZapOff = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317" />
		<path d="M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773" />
		<path d="M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643" />
		<path d="m2 2 20 20" />
	</Base>
);
export const ZodiacAquarius = (p: IconProps) => (
	<Base {...p}>
		<path d="m2 10 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.096-.001l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 10" />
		<path d="m2 18.002 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.097 0l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 18.002" />
	</Base>
);
export const ZodiacAries = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 7.5a4.5 4.5 0 1 1 5 4.5" />
		<path d="M7 12a4.5 4.5 0 1 1 5-4.5V21" />
	</Base>
);
export const ZodiacCancer = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 14.5A9 6.5 0 0 1 5.5 19" />
		<path d="M3 9.5A9 6.5 0 0 1 18.5 5" />
		<circle cx="17.5" cy="14.5" r="3.5" />
		<circle cx="6.5" cy="9.5" r="3.5" />
	</Base>
);
export const ZodiacCapricorn = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 21a3 3 0 0 0 3-3V6.5a1 1 0 0 0-7 0" />
		<path d="M7 19V6a3 3 0 0 0-3-3h0" />
		<circle cx="17" cy="17" r="3" />
	</Base>
);
export const ZodiacGemini = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 4.525v14.948" />
		<path d="M20 3A17 17 0 0 1 4 3" />
		<path d="M4 21a17 17 0 0 1 16 0" />
		<path d="M8 4.525v14.948" />
	</Base>
);
export const ZodiacLeo = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 16c0-4-3-4.5-3-8a5 5 0 0 1 10 0c0 3.466-3 6.196-3 10a3 3 0 0 0 6 0" />
		<circle cx="7" cy="16" r="3" />
	</Base>
);
export const ZodiacLibra = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 16h6.857c.162-.012.19-.323.038-.38a6 6 0 1 1 4.212 0c-.153.057-.125.368.038.38H21" />
		<path d="M3 20h18" />
	</Base>
);
export const ZodiacOphiuchus = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 10A6.06 6.06 0 0 1 12 10 A6.06 6.06 0 0 0 21 10" />
		<path d="M6 3v12a6 6 0 0 0 12 0V3" />
	</Base>
);
export const ZodiacPisces = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 21a15 15 0 0 1 0-18" />
		<path d="M20 12H4" />
		<path d="M5 3a15 15 0 0 1 0 18" />
	</Base>
);
export const ZodiacSagittarius = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 3h6v6" />
		<path d="M21 3 3 21" />
		<path d="m9 9 6 6" />
	</Base>
);
export const ZodiacScorpio = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 19V5.5a1 1 0 0 1 5 0V17a2 2 0 0 0 2 2h5l-3-3" />
		<path d="m22 19-3 3" />
		<path d="M5 19V5.5a1 1 0 0 1 5 0" />
		<path d="M5 5.5A2.5 2.5 0 0 0 2.5 3" />
	</Base>
);
export const ZodiacTaurus = (p: IconProps) => (
	<Base {...p}>
		<circle cx="12" cy="15" r="6" />
		<path d="M18 3A6 6 0 0 1 6 3" />
	</Base>
);
export const ZodiacVirgo = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 5.5a1 1 0 0 1 5 0V16a5 5 0 0 0 5 5" />
		<path d="M16 11.5a1 1 0 0 1 5 0V16a5 5 0 0 1-5 5" />
		<path d="M6 19V6a3 3 0 0 0-3-3h0" />
		<path d="M6 5.5a1 1 0 0 1 5 0V19" />
	</Base>
);
export const ZoomIn = (p: IconProps) => (
	<Base {...p}>
		<circle cx="11" cy="11" r="8" />
		<line x1="21" x2="16.65" y1="21" y2="16.65" />
		<line x1="11" x2="11" y1="8" y2="14" />
		<line x1="8" x2="14" y1="11" y2="11" />
	</Base>
);
export const ZoomOut = (p: IconProps) => (
	<Base {...p}>
		<circle cx="11" cy="11" r="8" />
		<line x1="21" x2="16.65" y1="21" y2="16.65" />
		<line x1="8" x2="14" y1="11" y2="11" />
	</Base>
);

// --- Icônes de marques (pack Camply) ---
export const Brand4chan = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 11s6.054 -1.05 6 -4.5c-.038 -2.324 -2.485 -3.19 -3.016 -1.5c0 0 -.502 -2 -2.01 -2c-1.508 0 -2.984 3 -.974 8" />
		<path d="M13.98 11s6.075 -1.05 6.02 -4.5c-.038 -2.324 -2.493 -3.19 -3.025 -1.5c0 0 -.505 -2 -2.017 -2c-1.513 0 -3 3 -.977 8l-.001 0" />
		<path d="M13 13.98l.062 .309l.081 .35l.075 .29l.092 .328l.11 .358l.061 .188l.139 .392c.64 1.73 1.841 3.837 3.88 3.805c2.324 -.038 3.19 -2.493 1.5 -3.025l.148 -.045l.165 -.058a4.13 4.13 0 0 0 .098 -.039l.222 -.098c.586 -.28 1.367 -.832 1.367 -1.777c0 -1.513 -3 -3 -8 -.977" />
		<path d="M10.02 13l-.309 .062l-.35 .081l-.29 .075l-.328 .092l-.358 .11l-.188 .061l-.392 .139c-1.73 .64 -3.837 1.84 -3.805 3.88c.038 2.324 2.493 3.19 3.025 1.5l.045 .148l.058 .165l.039 .098l.098 .222c.28 .586 .832 1.367 1.777 1.367c1.513 0 3 -3 .977 -8" />
		<path d="M11 10.02l-.062 -.309l-.081 -.35l-.075 -.29l-.092 -.328l-.11 -.358l-.128 -.382l-.148 -.399c-.658 -1.687 -1.844 -3.634 -3.804 -3.604c-2.324 .038 -3.19 2.493 -1.5 3.025l-.148 .045l-.164 .058a4.13 4.13 0 0 0 -.1 .039l-.22 .098c-.588 .28 -1.368 .832 -1.368 1.777c0 1.513 3 3 8 .977" />
	</Base>
);
export const BrandAbstract = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3c7.2 0 9 1.8 9 9c0 7.2 -1.8 9 -9 9c-7.2 0 -9 -1.8 -9 -9c0 -7.2 1.8 -9 9 -9" />
		<path d="M8 13.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
		<path d="M8 8h8v8" />
	</Base>
);
export const BrandAdobe = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.893 4.514l7.977 14a.993 .993 0 0 1 -.394 1.365a1.04 1.04 0 0 1 -.5 .127h-3.476l-4.5 -8l-2.5 4h1.5l2 4h-8.977c-.565 0 -1.023 -.45 -1.023 -1c0 -.171 .045 -.34 .13 -.49l7.977 -13.993a1.034 1.034 0 0 1 1.786 0l0 -.009" />
	</Base>
);
export const BrandAdobeAfterEffect = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12c0 -4.243 0 -6.364 1.318 -7.682s3.44 -1.318 7.682 -1.318s6.364 0 7.682 1.318s1.318 3.44 1.318 7.682s0 6.364 -1.318 7.682s-3.44 1.318 -7.682 1.318s-6.364 0 -7.682 -1.318s-1.318 -3.44 -1.318 -7.682" />
		<path d="M12 15.79l-.82 -2.653m-4.864 2.652l.82 -2.652m0 0l.686 -2.218c.559 -1.806 .838 -2.708 1.336 -2.708s.777 .902 1.335 2.708l.686 2.218m-4.043 0h4.043" />
		<path d="M13.895 12.824v1.07a1.895 1.895 0 0 0 3.54 .942m-3.54 -2.012v-.824a1.895 1.895 0 1 1 3.79 0v.824l-3.79 0" />
	</Base>
);
export const BrandAdobeIllustrator = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12c0 -4.243 0 -6.364 1.318 -7.682s3.44 -1.318 7.682 -1.318s6.364 0 7.682 1.318s1.318 3.44 1.318 7.682s0 6.364 -1.318 7.682s-3.44 1.318 -7.682 1.318s-6.364 0 -7.682 -1.318s-1.318 -3.44 -1.318 -7.682" />
		<path d="M12.947 15.79l-.82 -2.653m-4.864 2.652l.82 -2.652m0 0l.687 -2.218c.558 -1.806 .838 -2.708 1.335 -2.708c.498 0 .777 .902 1.336 2.708l.686 2.218m-4.043 0h4.043" />
		<path d="M15.789 15.789v-4.736" />
		<path d="M15.789 8.684v-.473" />
	</Base>
);
export const BrandAdobeIndesign = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12c0 -4.243 0 -6.364 1.318 -7.682s3.44 -1.318 7.682 -1.318s6.364 0 7.682 1.318s1.318 3.44 1.318 7.682s0 6.364 -1.318 7.682s-3.44 1.318 -7.682 1.318s-6.364 0 -7.682 -1.318s-1.318 -3.44 -1.318 -7.682" />
		<path d="M15 11v4c0 1.1 -.657 .997 -1.6 .997a2.35 2.35 0 0 1 -1.697 -.731a2.55 2.55 0 0 1 -.703 -1.767c0 -.663 .253 -1.299 .703 -1.767a2.35 2.35 0 0 1 1.697 -.732h1.6" />
		<path d="M15 11v-3" />
		<path d="M8 8v8" />
	</Base>
);
export const BrandAdobePhotoshop = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12c0 -4.243 0 -6.364 1.318 -7.682s3.44 -1.318 7.682 -1.318s6.364 0 7.682 1.318s1.318 3.44 1.318 7.682s0 6.364 -1.318 7.682s-3.44 1.318 -7.682 1.318s-6.364 0 -7.682 -1.318s-1.318 -3.44 -1.318 -7.682" />
		<path d="M6.79 15.79v-3.79m0 0v-2.724c0 -.11 0 -.165 .004 -.211c.044 -.45 .4 -.806 .85 -.85c.046 -.004 .101 -.004 .211 -.004h1.303a1.895 1.895 0 1 1 0 3.789l-2.368 0" />
		<path d="M17.178 11.263c-.164 -.659 -.935 -1.158 -1.862 -1.158c-1.047 0 -1.895 .637 -1.895 1.421c0 .785 .848 1.421 1.895 1.421c1.046 0 1.895 .637 1.895 1.421c0 .785 -.849 1.421 -1.895 1.421c-.93 0 -1.704 -.502 -1.864 -1.165" />
	</Base>
);
export const BrandAdobePremiere = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12c0 -4.243 0 -6.364 1.318 -7.682s3.44 -1.318 7.682 -1.318s6.364 0 7.682 1.318s1.318 3.44 1.318 7.682s0 6.364 -1.318 7.682s-3.44 1.318 -7.682 1.318s-6.364 0 -7.682 -1.318s-1.318 -3.44 -1.318 -7.682" />
		<path d="M7.263 15.79v-3.79m0 0v-3.248c0 -.335 .222 -.541 .542 -.541h1.353a1.895 1.895 0 1 1 0 3.789l-1.895 0" />
		<path d="M13.895 10.579v1.895m0 0v3.315m0 -3.315c.531 -.709 1.026 -1.592 1.894 -1.832q .22 -.062 .474 -.063" />
	</Base>
);
export const BrandAdobeXd = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12c0 -4.243 0 -6.364 1.318 -7.682s3.44 -1.318 7.682 -1.318s6.364 0 7.682 1.318s1.318 3.44 1.318 7.682s0 6.364 -1.318 7.682s-3.44 1.318 -7.682 1.318s-6.364 0 -7.682 -1.318s-1.318 -3.44 -1.318 -7.682" />
		<path d="M6 8l5 8" />
		<path d="M6 16l5 -8" />
		<path d="M18 11v4c0 1.1 -.517 .997 -1.5 .997a2.5 2.5 0 0 1 -2.5 -2.497a2.5 2.5 0 0 1 2.5 -2.5l1.5 0v-3" />
	</Base>
);
export const BrandAdonisJs = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3c7.2 0 9 1.8 9 9c0 7.2 -1.8 9 -9 9c-7.2 0 -9 -1.8 -9 -9c0 -7.2 1.8 -9 9 -9" />
		<path d="M8.863 16.922c1.137 -.422 1.637 -.922 3.137 -.922s2 .5 3.138 .922c.713 .264 1.516 -.102 1.778 -.772c.126 -.32 .11 -.673 -.044 -.983l-3.708 -7.474c-.297 -.598 -1.058 -.859 -1.7 -.583a1.24 1.24 0 0 0 -.627 .583l-3.709 7.474c-.321 .648 -.017 1.415 .679 1.714c.332 .143 .715 .167 1.056 .04l0 .001" />
	</Base>
);
export const BrandAirbnb = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 10c-2 0 -3 1 -3 3c0 1.5 1.494 3.535 3 5.5c1 1 1.5 1.5 2.5 2s2.5 1 4.5 -.5s1.5 -3.5 .5 -6s-2.333 -5.5 -5 -9.5c-.834 -1 -1.5 -1.5 -2.503 -1.5c-1 0 -1.623 .45 -2.497 1.5c-2.667 4 -4 7 -5 9.5s-1.5 4.5 .5 6s3.5 1 4.5 .5s1.5 -1 2.5 -2c1.506 -1.965 3 -4 3 -5.5c0 -2 -1 -3 -3 -3" />
	</Base>
);
export const BrandAirtable = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 10v8l7 -3v-2.6l-7 -2.4" />
		<path d="M3 6l9 3l9 -3l-9 -3l-9 3" />
		<path d="M14 12.3v8.7l7 -3v-8l-7 2.3" />
	</Base>
);
export const BrandAlgolia = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.5 11c-.414 -1.477 -1.886 -2.5 -3.5 -2.5a3.47 3.47 0 0 0 -3.5 3.5a3.47 3.47 0 0 0 3.5 3.5c.974 0 1.861 -.357 2.5 -1l4.5 4.5v-15h-7c-4.386 0 -8 3.582 -8 8s3.614 8 8 8a7.577 7.577 0 0 0 2.998 -.614" />
	</Base>
);
export const BrandAlipay = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 3h-14a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2v-14a2 2 0 0 0 -2 -2" />
		<path d="M7 7h10" />
		<path d="M12 3v7" />
		<path d="M21 17.314c-2.971 -1.923 -15 -8.779 -15 -1.864c0 1.716 1.52 2.55 2.985 2.55c3.512 0 6.814 -5.425 6.814 -8h-6.604" />
	</Base>
);
export const BrandAlpineJs = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 11.5l4.5 4.5h9l-9 -9l-4.5 4.5" />
		<path d="M16.5 16l4.5 -4.5l-4.5 -4.5l-4.5 4.5" />
	</Base>
);
export const BrandAmazon = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 12.5a15.198 15.198 0 0 1 -7.37 1.44a14.62 14.62 0 0 1 -6.63 -2.94" />
		<path d="M19.5 15c.907 -1.411 1.451 -3.323 1.5 -5c-1.197 -.773 -2.577 -.935 -4 -1" />
	</Base>
);
export const BrandAmd = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 16v-7c0 -.566 -.434 -1 -1 -1h-7l-5 -5h17c.566 0 1 .434 1 1v17l-5 -5" />
		<path d="M11.293 20.707l4.707 -4.707h-7a1 1 0 0 1 -1 -1v-7l-4.707 4.707a1 1 0 0 0 -.293 .707v6.586a1 1 0 0 0 1 1h6.586a1 1 0 0 0 .707 -.293" />
	</Base>
);
export const BrandAmie = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 8.5c0 1.33 .472 2.55 1.257 3.5a5.5 5.5 0 0 0 7.743 7.743a5.5 5.5 0 0 0 7.743 -7.743a5.5 5.5 0 0 0 -7.743 -7.743a5.5 5.5 0 0 0 -9 4.243" />
		<path d="M10 9.5c0 -.828 .895 -1.5 2 -1.5s2 .672 2 1.5v5c0 .828 -.895 1.5 -2 1.5s-2 -.672 -2 -1.5l0 -5" />
	</Base>
);
export const BrandAmigo = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M9.591 3.635l-7.13 14.082c-1.712 3.38 1.759 5.45 3.69 3.573l1.86 -1.81c3.142 -3.054 4.959 -2.99 8.039 .11l1.329 1.337c2.372 2.387 5.865 .078 4.176 -3.225l-7.195 -14.067c-1.114 -2.18 -3.666 -2.18 -4.77 0" />
	</Base>
);
export const BrandAmongUs = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.646 12.774c-1.939 .396 -4.467 .317 -6.234 -.601c-2.454 -1.263 -1.537 -4.66 1.423 -4.982c2.254 -.224 3.814 -.354 5.65 .214c.835 .256 1.93 .569 1.355 3.281c-.191 1.067 -1.07 1.904 -2.194 2.088" />
		<path d="M5.84 7.132c.083 -.564 .214 -1.12 .392 -1.661c.456 -.936 1.095 -2.068 3.985 -2.456a22.464 22.464 0 0 1 2.867 .08c1.776 .14 2.643 1.234 3.287 3.368c.339 1.157 .46 2.342 .629 3.537v11l-12.704 -.019c-.552 -2.386 -.262 -5.894 .204 -8.481" />
		<path d="M17 10c.991 .163 2.105 .383 3.069 .67c.255 .13 .52 .275 .534 .505c.264 3.434 .57 7.448 .278 9.825h-3.881" />
	</Base>
);
export const BrandAndroid = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 10l0 6" />
		<path d="M20 10l0 6" />
		<path d="M7 9h10v8a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-8a5 5 0 0 1 10 0" />
		<path d="M8 3l1 2" />
		<path d="M16 3l-1 2" />
		<path d="M9 18l0 3" />
		<path d="M15 18l0 3" />
	</Base>
);
export const BrandAngular = (p: IconProps) => (
	<Base {...p}>
		<path d="M5.428 17.245l6.076 3.471a1 1 0 0 0 .992 0l6.076 -3.471a1 1 0 0 0 .495 -.734l1.323 -9.704a1 1 0 0 0 -.658 -1.078l-7.4 -2.612a1 1 0 0 0 -.665 0l-7.399 2.613a1 1 0 0 0 -.658 1.078l1.323 9.704a1 1 0 0 0 .495 .734l0 -.001" />
		<path d="M9 15l3 -8l3 8" />
		<path d="M10 13h4" />
	</Base>
);
export const BrandAnsible = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M9.647 12.294l6.353 3.706l-4 -9l-4 9" />
	</Base>
);
export const BrandAo3 = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 5c7.109 4.1 10.956 10.131 12 14c1.074 -4.67 4.49 -8.94 8 -11" />
		<path d="M12 8a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M7 9c-.278 5.494 -2.337 7.33 -4 10c4.013 -2 6.02 -5 15.05 -5c4.012 0 3.51 2.5 1 3c2 .5 2.508 5 -2.007 2" />
	</Base>
);
export const BrandAppgallery = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8" />
		<path d="M9 8a3 3 0 0 0 6 0" />
	</Base>
);
export const BrandApple = (p: IconProps) => (
	<Base {...p}>
		<path d="M8.286 7.008c-3.216 0 -4.286 3.23 -4.286 5.92c0 3.229 2.143 8.072 4.286 8.072c1.165 -.05 1.799 -.538 3.214 -.538c1.406 0 1.607 .538 3.214 .538s4.286 -3.229 4.286 -5.381c-.03 -.011 -2.649 -.434 -2.679 -3.23c-.02 -2.335 2.589 -3.179 2.679 -3.228c-1.096 -1.606 -3.162 -2.113 -3.75 -2.153c-1.535 -.12 -3.032 1.077 -3.75 1.077c-.729 0 -2.036 -1.077 -3.214 -1.077" />
		<path d="M12 4a2 2 0 0 0 2 -2a2 2 0 0 0 -2 2" />
	</Base>
);
export const BrandAppleArcade = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M20 12.5v4.75a.734 .734 0 0 1 -.055 .325a.704 .704 0 0 1 -.348 .366l-5.462 2.58a5 5 0 0 1 -4.27 0l-5.462 -2.58a.705 .705 0 0 1 -.401 -.691l0 -4.75" />
		<path d="M4.431 12.216l5.634 -2.332a5.065 5.065 0 0 1 3.87 0l5.634 2.332a.692 .692 0 0 1 .028 1.269l-5.462 2.543a5.064 5.064 0 0 1 -4.27 0l-5.462 -2.543a.691 .691 0 0 1 .028 -1.27" />
		<path d="M12 7l0 6" />
	</Base>
);
export const BrandAppleNews = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 14l6 6h-6l0 -6" />
		<path d="M20 10l-6 -6h6l0 6" />
		<path d="M4 4v4l12 12h4v-4l-12 -12l-4 0" />
	</Base>
);
export const BrandApplePodcast = (p: IconProps) => (
	<Base {...p}>
		<path d="M18.364 18.364a9 9 0 1 0 -12.728 0" />
		<path d="M11.766 22h.468a2 2 0 0 0 1.985 -1.752l.5 -4a2 2 0 0 0 -1.985 -2.248h-1.468a2 2 0 0 0 -1.985 2.248l.5 4a2 2 0 0 0 1.985 1.752" />
		<path d="M10 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
	</Base>
);
export const BrandAppstore = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M8 16l1.106 -1.99m1.4 -2.522l2.494 -4.488" />
		<path d="M7 14h5m2.9 0h2.1" />
		<path d="M16 16l-2.51 -4.518m-1.487 -2.677l-1 -1.805" />
	</Base>
);
export const BrandArc = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.687 14.694l-.987 2.103c-.502 1.07 -.125 2.387 .908 2.945c1.096 .59 2.444 .13 2.972 -.995l.9 -1.92" />
		<path d="M18.317 14.576c1.818 -1.6 3.16 -3.78 3.64 -6.217c.235 -1.194 -.525 -2.351 -1.695 -2.586a2.14 2.14 0 0 0 -1.625 .326c-.478 .323 -.81 .826 -.922 1.398c-.208 1.054 -.695 2.037 -1.366 2.872" />
		<path d="M12.68 12.759a5.4 5.4 0 0 1 -1.283 .157c-.336 0 -.683 -.04 -1.03 -.115c-1.44 -.31 -2.89 -1.215 -3.709 -2.315a3.7 3.7 0 0 1 -.487 -.853a2.157 2.157 0 0 0 -2.818 -1.213c-1.107 .455 -1.641 1.736 -1.196 2.86c.508 1.278 1.404 2.45 2.53 3.415a11.2 11.2 0 0 0 3.791 2.133c.953 .31 1.942 .483 2.916 .483a9.8 9.8 0 0 0 3.162 -.537" />
		<path d="M10.37 12.801l.943 -2.013c.09 -.19 .357 -.19 .446 0l.923 1.97h.006h-.006l1.88 4.015l.923 1.971a2.16 2.16 0 0 0 1.957 1.254q .29 0 .576 -.081c1.303 -.365 1.92 -1.887 1.339 -3.129l-1.04 -2.218l-1.968 -4.204l-.003 .003l.003 -.003l-2.862 -6.112a2.16 2.16 0 0 0 -1.954 -1.254c-.833 0 -1.593 .488 -1.953 1.254l-2.92 6.232" />
	</Base>
);
export const BrandAsana = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 7a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
		<path d="M14 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
		<path d="M4 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
	</Base>
);
export const BrandAstro = (p: IconProps) => (
	<Base {...p}>
		<path d="M14.972 3.483c.163 .196 .247 .46 .413 .987l3.64 11.53a15.5 15.5 0 0 0 -4.352 -1.42l-2.37 -7.723a.31 .31 0 0 0 -.296 -.213a.31 .31 0 0 0 -.295 .214l-2.342 7.718a15.5 15.5 0 0 0 -4.37 1.422l3.657 -11.53c.168 -.527 .251 -.79 .415 -.986c.144 -.172 .331 -.306 .544 -.388c.242 -.094 .527 -.094 1.099 -.094h2.612c.572 0 .858 0 1.1 .094c.213 .082 .4 .217 .545 .39" />
		<path d="M9 18c0 1.5 2 3 3 4c1 -1 3 -3 3 -4q -3 1.5 -6 0" />
	</Base>
);
export const BrandAudible = (p: IconProps) => (
	<Base {...p}>
		<path d="M18.46 9.75a9 9 0 0 0 -12.92 0" />
		<path d="M14.34 11.58a5 5 0 0 0 -4.68 0" />
		<path d="M22 13l-10 4l-10 -4" />
	</Base>
);
export const BrandAuth0 = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 14.5l-5.5 3.5l2 -6l-4.5 -4h6l2 -5l2 5h6l-4.5 4l2 6l-5.5 -3.5" />
		<path d="M20.507 8.872l-2.01 -5.872h-12.994l-2.009 5.872c-1.242 3.593 -.135 7.094 3.249 9.407l5.257 3.721l5.257 -3.721c3.385 -2.313 4.49 -5.814 3.25 -9.407" />
	</Base>
);
export const BrandAws = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 18.5a15.198 15.198 0 0 1 -7.37 1.44a14.62 14.62 0 0 1 -6.63 -2.94" />
		<path d="M19.5 21c.907 -1.411 1.451 -3.323 1.5 -5c-1.197 -.773 -2.577 -.935 -4 -1" />
		<path d="M3 11v-4.5a1.5 1.5 0 0 1 3 0v4.5" />
		<path d="M3 9h3" />
		<path d="M9 5l1.2 6l1.8 -4l1.8 4l1.2 -6" />
		<path d="M18 10.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75" />
	</Base>
);
export const BrandAzure = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 7.5l-4 9.5h4l6 -15l-6 5.5" />
		<path d="M22 20l-7 -15l-3 7l4 5l-8 3l14 0" />
	</Base>
);
export const BrandBackbone = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 20l14 -8l-14 -8l0 16" />
		<path d="M19 20l-14 -8l14 -8l0 16" />
	</Base>
);
export const BrandBadoo = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 9.43c0 5.838 -4.477 10.57 -10 10.57s-10 -4.662 -10 -10.5c0 -2.667 1.83 -5.01 4.322 -5.429c2.492 -.418 4.9 1.392 5.678 3.929c.768 -2.54 3.177 -4.354 5.668 -3.931c2.495 .417 4.332 2.69 4.332 5.36" />
		<path d="M7.5 10c0 2.761 2.015 5 4.5 5s4.5 -2.239 4.5 -5" />
	</Base>
);
export const BrandBaidu = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 9.5a1 1.5 0 1 0 2 0a1 1.5 0 1 0 -2 0" />
		<path d="M14.463 11.596c1.282 1.774 3.476 3.416 3.476 3.416s1.921 1.574 .593 3.636c-1.328 2.063 -4.892 1.152 -4.892 1.152s-1.416 -.44 -3.06 -.088c-1.644 .356 -3.06 .22 -3.06 .22s-2.055 -.22 -2.47 -2.304c-.416 -2.084 1.918 -3.638 2.102 -3.858c.182 -.222 1.409 -.966 2.284 -2.394c.875 -1.428 3.337 -2.287 5.027 .221" />
		<path d="M8 4.5a1 1.5 0 1 0 2 0a1 1.5 0 1 0 -2 0" />
		<path d="M14 4.5a1 1.5 0 1 0 2 0a1 1.5 0 1 0 -2 0" />
		<path d="M18 9.5a1 1.5 0 1 0 2 0a1 1.5 0 1 0 -2 0" />
	</Base>
);
export const BrandBandcamp = (p: IconProps) => (
	<Base {...p}>
		<path d="M8.5 6h13.5l-7 12h-13l6.5 -12" />
	</Base>
);
export const BrandBandlab = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.885 7l-2.536 4.907c-2.021 3.845 -2.499 8.775 3.821 9.093h6.808c4.86 -.207 7.989 -2.975 4.607 -9.093l-2.988 -4.907" />
		<path d="M15.078 4h-5.136l3.678 8.768c.547 1.14 .847 1.822 .162 2.676c-.053 .093 -1.332 1.907 -3.053 1.495c-.825 -.187 -1.384 -.926 -1.32 -1.74c.04 -.91 .62 -1.717 1.488 -2.074a4.463 4.463 0 0 1 2.723 -.358" />
	</Base>
);
export const BrandBeats = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M9 12.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0" />
		<path d="M9 12v-8" />
	</Base>
);
export const BrandBebo = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 17.5a3.5 3.5 0 0 0 3.5 -3.5c0 -1.838 -1.159 -3.002 -3.005 -3.372c-.746 -.15 -1.37 -.745 -1.37 -1.506c0 -1.142 .934 -2.095 2.058 -1.894c3.61 .645 5.817 3.058 5.817 6.772a7 7 0 1 1 -14 0v-9.25a1.75 1.75 0 1 1 3.5 0v9.25a3.5 3.5 0 0 0 3.5 3.5" />
	</Base>
);
export const BrandBehance = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 18v-12h4.5a3 3 0 0 1 0 6a3 3 0 0 1 0 6h-4.5" />
		<path d="M3 12l4.5 0" />
		<path d="M14 13h7a3.5 3.5 0 0 0 -7 0v2a3.5 3.5 0 0 0 6.64 1" />
		<path d="M16 6l3 0" />
	</Base>
);
export const BrandBilibili = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 10a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v6a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4v-6" />
		<path d="M8 3l2 3" />
		<path d="M16 3l-2 3" />
		<path d="M9 13v-2" />
		<path d="M15 11v2" />
	</Base>
);
export const BrandBinance = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 8l2 2l4 -4l4 4l2 -2l-6 -6l-6 6" />
		<path d="M6 16l2 -2l4 4l3.5 -3.5l2 2l-5.5 5.5l-6 -6" />
		<path d="M20 10l2 2l-2 2l-2 -2l2 -2" />
		<path d="M4 10l2 2l-2 2l-2 -2l2 -2" />
		<path d="M12 10l2 2l-2 2l-2 -2l2 -2" />
	</Base>
);
export const BrandBing = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 3l4 1.5v12l6 -2.5l-2 -1l-1 -4l7 2.5v4.5l-10 5l-4 -2l0 -16" />
	</Base>
);
export const BrandBitbucket = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.648 4a.64 .64 0 0 0 -.64 .744l3.14 14.528c.07 .417 .43 .724 .852 .728h10a.644 .644 0 0 0 .642 -.539l3.35 -14.71a.641 .641 0 0 0 -.64 -.744l-16.704 -.007" />
		<path d="M14 15h-4l-1 -6h6l-1 6" />
	</Base>
);
export const BrandBlackberry = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 6a1 1 0 0 0 -1 -1h-2l-.5 2h2.5a1 1 0 0 0 1 -1" />
		<path d="M6 12a1 1 0 0 0 -1 -1h-2l-.5 2h2.5a1 1 0 0 0 1 -1" />
		<path d="M13 12a1 1 0 0 0 -1 -1h-2l-.5 2h2.5a1 1 0 0 0 1 -1" />
		<path d="M14 6a1 1 0 0 0 -1 -1h-2l-.5 2h2.5a1 1 0 0 0 1 -1" />
		<path d="M12 18a1 1 0 0 0 -1 -1h-2l-.5 2h2.5a1 1 0 0 0 1 -1" />
		<path d="M20 15a1 1 0 0 0 -1 -1h-2l-.5 2h2.5a1 1 0 0 0 1 -1" />
		<path d="M21 9a1 1 0 0 0 -1 -1h-2l-.5 2h2.5a1 1 0 0 0 1 -1" />
	</Base>
);
export const BrandBlender = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 14a6 5 0 1 0 12 0a6 5 0 1 0 -12 0" />
		<path d="M14 14a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M3 16l9 -6.5" />
		<path d="M6 9h9" />
		<path d="M13 5l5.65 5" />
	</Base>
);
export const BrandBlogger = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 21h8a5 5 0 0 0 5 -5v-3a3 3 0 0 0 -3 -3h-1v-2a5 5 0 0 0 -5 -5h-4a5 5 0 0 0 -5 5v8a5 5 0 0 0 5 5" />
		<path d="M7 8.5a1.5 1.5 0 0 1 1.5 -1.5h3a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1 -1.5 1.5h-3a1.5 1.5 0 0 1 -1.5 -1.5" />
		<path d="M7 15.5a1.5 1.5 0 0 1 1.5 -1.5h7a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1 -1.5 1.5h-7a1.5 1.5 0 0 1 -1.5 -1.5" />
	</Base>
);
export const BrandBluesky = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.335 5.144c-1.654 -1.199 -4.335 -2.127 -4.335 .826c0 .59 .35 4.953 .556 5.661c.713 2.463 3.13 2.75 5.444 2.369c-4.045 .665 -4.889 3.208 -2.667 5.41c1.03 1.018 1.913 1.59 2.667 1.59c2 0 3.134 -2.769 3.5 -3.5c.333 -.667 .5 -1.167 .5 -1.5c0 .333 .167 .833 .5 1.5c.366 .731 1.5 3.5 3.5 3.5c.754 0 1.637 -.571 2.667 -1.59c2.222 -2.203 1.378 -4.746 -2.667 -5.41c2.314 .38 4.73 .094 5.444 -2.369c.206 -.708 .556 -5.072 .556 -5.661c0 -2.953 -2.68 -2.025 -4.335 -.826c-2.293 1.662 -4.76 5.048 -5.665 6.856c-.905 -1.808 -3.372 -5.194 -5.665 -6.856" />
	</Base>
);
export const BrandBooking = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 18v-9.5a4.5 4.5 0 0 1 4.5 -4.5h7a4.5 4.5 0 0 1 4.5 4.5v7a4.5 4.5 0 0 1 -4.5 4.5h-9.5a2 2 0 0 1 -2 -2" />
		<path d="M8 12h3.5a2 2 0 1 1 0 4h-3.5v-7a1 1 0 0 1 1 -1h1.5a2 2 0 1 1 0 4h-1.5" />
		<path d="M16 16l.01 0" />
	</Base>
);
export const BrandBootstrap = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 12a2 2 0 0 0 2 -2v-4a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2" />
		<path d="M2 12a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-4a2 2 0 0 1 2 -2" />
		<path d="M9 16v-8h3.5a2 2 0 1 1 0 4h-3.5h4a2 2 0 1 1 0 4h-4" />
	</Base>
);
export const BrandBulma = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 16l1 -9l5 -5l6.5 6l-3.5 4l5 5l-8 5l-6 -6" />
	</Base>
);
export const BrandBumble = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 12h10" />
		<path d="M9 8h6" />
		<path d="M10 16h4" />
		<path d="M16.268 3h-8.536a1.46 1.46 0 0 0 -1.268 .748l-4.268 7.509a1.507 1.507 0 0 0 0 1.486l4.268 7.509c.26 .462 .744 .747 1.268 .748h8.536a1.46 1.46 0 0 0 1.268 -.748l4.268 -7.509a1.507 1.507 0 0 0 0 -1.486l-4.268 -7.509a1.46 1.46 0 0 0 -1.268 -.748" />
	</Base>
);
export const BrandBunpo = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.9 7.205a17.764 17.764 0 0 0 4.008 2.753a7.917 7.917 0 0 0 4.57 .567c1.5 -.33 2.907 -1 4.121 -1.956a12.107 12.107 0 0 0 2.892 -2.903c.603 -.94 .745 -1.766 .484 -2.231c-.261 -.465 -.927 -.568 -1.72 -.257a7.564 7.564 0 0 0 -2.608 2.034a18.425 18.425 0 0 0 -2.588 3.884a34.927 34.927 0 0 0 -2.093 5.073a12.908 12.908 0 0 0 -.677 3.515c-.07 .752 .07 1.51 .405 2.184c.323 .562 1.06 1.132 2.343 1.132c3.474 0 5.093 -3.53 5.463 -5.62c.24 -1.365 -.085 -3.197 -1.182 -4.01" />
	</Base>
);
export const BrandCSharp = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 9a3 3 0 0 0 -3 -3h-.5a3.5 3.5 0 0 0 -3.5 3.5v5a3.5 3.5 0 0 0 3.5 3.5h.5a3 3 0 0 0 3 -3" />
		<path d="M16 7l-1 10" />
		<path d="M20 7l-1 10" />
		<path d="M14 10h7.5" />
		<path d="M21 14h-7.5" />
	</Base>
);
export const BrandCake = (p: IconProps) => (
	<Base {...p}>
		<path d="M20.84 12c0 2.05 .985 3.225 -.04 5c-1.026 1.775 -2.537 1.51 -4.314 2.534c-1.776 1.026 -2.302 2.466 -4.353 2.466c-2.051 0 -2.576 -1.441 -4.353 -2.466c-1.776 -1.024 -3.288 -.759 -4.314 -2.534c-1.025 -1.775 -.04 -2.95 -.04 -5s-.985 -3.225 .04 -5c1.026 -1.775 2.537 -1.51 4.314 -2.534c1.776 -1.026 2.302 -2.466 4.353 -2.466s2.577 1.441 4.353 2.466c1.776 1.024 3.288 .759 4.313 2.534c1.026 1.775 .04 2.95 .04 5l.001 0" />
	</Base>
);
export const BrandCakephp = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 11l8 2c1.361 -.545 2 -1.248 2 -2v-3.8c0 -1.765 -4.479 -3.2 -10.002 -3.2c-5.522 0 -9.998 1.435 -9.998 3.2v2.8c0 1.766 4.478 4 10 4v-3" />
		<path d="M12 14v3l8 2c1.362 -.547 2 -1.246 2 -2v-3c0 .754 -.638 1.453 -2 2l-8 -2" />
		<path d="M2 17c0 1.766 4.476 3 9.998 3l.002 -3c-5.522 0 -10 -1.734 -10 -3.5v3.5" />
		<path d="M2 10v4" />
		<path d="M22 10v4" />
	</Base>
);
export const BrandCampaignmonitor = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 18l9 -6.462l-9 -5.538v12h18v-12l-9 5.538" />
	</Base>
);
export const BrandCarbon = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 10v-.2a1.8 1.8 0 0 0 -1.8 -1.8h-.4a1.8 1.8 0 0 0 -1.8 1.8v4.4a1.8 1.8 0 0 0 1.8 1.8h.4a1.8 1.8 0 0 0 1.8 -1.8v-.2" />
		<path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12" />
	</Base>
);
export const BrandCashapp = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.1 8.648a.568 .568 0 0 1 -.761 .011a5.682 5.682 0 0 0 -3.659 -1.34c-1.102 0 -2.205 .363 -2.205 1.374c0 1.023 1.182 1.364 2.546 1.875c2.386 .796 4.363 1.796 4.363 4.137c0 2.545 -1.977 4.295 -5.204 4.488l-.295 1.364a.557 .557 0 0 1 -.546 .443h-2.034l-.102 -.011a.568 .568 0 0 1 -.432 -.67l.318 -1.444a7.432 7.432 0 0 1 -3.273 -1.784v-.011a.545 .545 0 0 1 0 -.773l1.137 -1.102c.214 -.2 .547 -.2 .761 0a5.495 5.495 0 0 0 3.852 1.5c1.478 0 2.466 -.625 2.466 -1.614c0 -.989 -1 -1.25 -2.886 -1.954c-2 -.716 -3.898 -1.728 -3.898 -4.091c0 -2.75 2.284 -4.091 4.989 -4.216l.284 -1.398a.545 .545 0 0 1 .545 -.432h2.023l.114 .012a.544 .544 0 0 1 .42 .647l-.307 1.557a8.528 8.528 0 0 1 2.818 1.58l.023 .022c.216 .228 .216 .569 0 .773l-1.057 1.057" />
	</Base>
);
export const BrandChrome = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
		<path d="M12 9h8.4" />
		<path d="M14.598 13.5l-4.2 7.275" />
		<path d="M9.402 13.5l-4.2 -7.275" />
	</Base>
);
export const BrandCinema4d = (p: IconProps) => (
	<Base {...p}>
		<path d="M9.65 6.956a5.39 5.39 0 0 0 7.494 7.495" />
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M17.7 12.137a5.738 5.738 0 1 1 -5.737 -5.737" />
		<path d="M17.7 12.338v-1.175c0 -.47 .171 -.92 .476 -1.253a1.56 1.56 0 0 1 1.149 -.52c.827 0 1.523 .676 1.62 1.573c.037 .344 .055 .69 .055 1.037" />
		<path d="M11.662 6.4h1.175c.47 0 .92 -.176 1.253 -.49c.333 -.314 .52 -.74 .52 -1.184c0 -.852 -.676 -1.57 -1.573 -1.67a9.496 9.496 0 0 0 -1.037 -.056" />
	</Base>
);
export const BrandCitymapper = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 11a1 1 0 1 1 -1 1.013a1 1 0 0 1 1 -1v-.013" />
		<path d="M21 11a1 1 0 1 1 -1 1.013a1 1 0 0 1 1 -1v-.013" />
		<path d="M8 12h8" />
		<path d="M13 9l3 3l-3 3" />
	</Base>
);
export const BrandCloudflare = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.031 7.007c2.469 -.007 3.295 1.293 3.969 2.993c4 0 4.994 3.825 5 6h-20c-.001 -1.64 1.36 -2.954 3 -3c0 -1.5 1 -3 3 -3c.66 -1.942 2.562 -2.986 5.031 -2.993" />
		<path d="M12 13h6" />
		<path d="M17 10l-2.5 6" />
	</Base>
);
export const BrandCodecov = (p: IconProps) => (
	<Base {...p}>
		<path d="M9.695 12.985a5.972 5.972 0 0 0 -3.295 -.985c-1.257 0 -2.436 .339 -3.4 1a9 9 0 1 1 18 0c-.966 -.664 -2.14 -1 -3.4 -1a6 6 0 0 0 -5.605 8.144" />
	</Base>
);
export const BrandCodepen = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 15l9 6l9 -6l-9 -6l-9 6" />
		<path d="M3 9l9 6l9 -6l-9 -6l-9 6" />
		<path d="M3 9l0 6" />
		<path d="M21 9l0 6" />
		<path d="M12 3l0 6" />
		<path d="M12 15l0 6" />
	</Base>
);
export const BrandCodesandbox = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25l4 2.25" />
		<path d="M12 12l4 -2.25l4 -2.25" />
		<path d="M12 12l0 9" />
		<path d="M12 12l-4 -2.25l-4 -2.25" />
		<path d="M20 12l-4 2v4.75" />
		<path d="M4 12l4 2l0 4.75" />
		<path d="M8 5.25l4 2.25l4 -2.25" />
	</Base>
);
export const BrandCohost = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 14a3 2 0 1 0 6 0a3 2 0 1 0 -6 0" />
		<path d="M4.526 17.666c-1.133 -.772 -1.897 -1.924 -2.291 -3.456c-.398 -1.54 -.29 -2.937 .32 -4.19c.61 -1.255 1.59 -2.34 2.938 -3.254c1.348 -.914 2.93 -1.625 4.749 -2.132c1.81 -.504 3.516 -.708 5.12 -.61c1.608 .1 2.979 .537 4.112 1.31s1.897 1.924 2.291 3.456c.398 1.541 .29 2.938 -.32 4.192c-.61 1.253 -1.59 2.337 -2.938 3.252c-1.348 .915 -2.93 1.626 -4.749 2.133c-1.81 .503 -3.516 .707 -5.12 .61c-1.608 -.102 -2.979 -.538 -4.112 -1.31" />
		<path d="M11 12.508c-.53 -.316 -1.23 -.508 -2 -.508c-1.657 0 -3 .895 -3 2s1.343 2 3 2c.767 0 1.467 -.192 2 -.508" />
	</Base>
);
export const BrandCoinbase = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.95 22c-4.503 0 -8.445 -3.04 -9.61 -7.413c-1.165 -4.373 .737 -8.988 4.638 -11.25a9.906 9.906 0 0 1 12.008 1.598l-3.335 3.367a5.185 5.185 0 0 0 -7.354 .013a5.252 5.252 0 0 0 0 7.393a5.185 5.185 0 0 0 7.354 .013l3.349 3.367a9.887 9.887 0 0 1 -7.05 2.912" />
	</Base>
);
export const BrandComedyCentral = (p: IconProps) => (
	<Base {...p}>
		<path d="M5.343 17.657a8 8 0 1 0 0 -11.314" />
		<path d="M13.828 9.172a4 4 0 1 0 0 5.656" />
	</Base>
);
export const BrandCoreos = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 12a9 9 0 1 1 -18 0a9 9 0 0 1 18 0" />
		<path d="M12 3c-3.263 3.212 -3 7.654 -3 12c4.59 .244 8.814 -.282 12 -3" />
		<path d="M9.5 9a4.494 4.494 0 0 1 5.5 5.5" />
	</Base>
);
export const BrandCouchdb = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 12h12v-2a2 2 0 0 1 2 -2a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2a2 2 0 0 1 2 2v2" />
		<path d="M6 15h12" />
		<path d="M6 18h12" />
		<path d="M21 11v7" />
		<path d="M3 11v7" />
	</Base>
);
export const BrandCouchsurfing = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.1 13c3.267 0 5.9 -.167 7.9 -.5c3 -.5 4 -2 4 -3.5a3 3 0 1 0 -6 0c0 1.554 1.807 3 3 4c1.193 1 2 2.5 2 3.5a1.5 1.5 0 1 1 -3 0c0 -2 4 -3.5 7 -3.5h2.9" />
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
	</Base>
);
export const BrandCpp = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 12h4" />
		<path d="M20 10v4" />
		<path d="M11 12h4" />
		<path d="M13 10v4" />
		<path d="M9 9a3 3 0 0 0 -3 -3h-.5a3.5 3.5 0 0 0 -3.5 3.5v5a3.5 3.5 0 0 0 3.5 3.5h.5a3 3 0 0 0 3 -3" />
	</Base>
);
export const BrandCraft = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 4h-8a8 8 0 1 0 0 16h8a8 8 0 0 0 -8 -8a8 8 0 0 0 8 -8" />
		<path d="M4 12h8" />
		<path d="M12 4v16" />
	</Base>
);
export const BrandCrunchbase = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 19v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2" />
		<path d="M10.414 11.586a2 2 0 1 0 0 2.828" />
		<path d="M13 13a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M13 7v6" />
	</Base>
);
export const BrandCss3 = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5l16 0" />
		<path d="M8.5 8h7l-4.5 4h4l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5" />
	</Base>
);
export const BrandCtemplar = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.04 14.831l4.46 -4.331" />
		<path d="M12.555 20.82c4.55 -3.456 7.582 -8.639 8.426 -14.405a1.668 1.668 0 0 0 -.934 -1.767a19.647 19.647 0 0 0 -8.047 -1.648a19.647 19.647 0 0 0 -8.047 1.647a1.668 1.668 0 0 0 -.934 1.767c.844 5.766 3.875 10.95 8.426 14.406a.948 .948 0 0 0 1.11 0" />
		<path d="M20 5c-2 0 -4.37 3.304 -8 6.644c-3.63 -3.34 -6 -6.644 -8 -6.644" />
		<path d="M17.738 15l-4.238 -4.5" />
	</Base>
);
export const BrandCucumber = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 10.99c-.01 5.52 -4.48 10 -10 10.01v-2.26l-.01 -.01c-4.28 -1.11 -6.86 -5.47 -5.76 -9.75a8 8 0 0 1 9.74 -5.76c3.53 .91 6.03 4.13 6.03 7.78v-.01" />
		<path d="M10.5 8l-.5 -1" />
		<path d="M13.5 14l.5 1" />
		<path d="M9 12.5l-1 .5" />
		<path d="M11 14l-.5 1" />
		<path d="M13 8l.5 -1" />
		<path d="M16 12.5l-1 -.5" />
		<path d="M9 10l-1 -.5" />
	</Base>
);
export const BrandCupra = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.5 10l-2.5 -4l15.298 6.909a.2 .2 0 0 1 .09 .283l-3.388 5.808" />
		<path d="M10 19l-3.388 -5.808a.2 .2 0 0 1 .09 -.283l15.298 -6.909l-2.5 4" />
	</Base>
);
export const BrandCypress = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.48 17.007a9 9 0 1 0 -7.48 3.993c.896 0 1.691 -.573 1.974 -1.423l3.526 -10.577" />
		<path d="M13.5 9l2 6" />
		<path d="M10.764 9.411a3 3 0 1 0 -.023 5.19" />
	</Base>
);
export const BrandD3 = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 4h1.8c3.976 0 7.2 3.582 7.2 8s-3.224 8 -7.2 8h-1.8" />
		<path d="M12 4h5.472c1.948 0 3.528 1.79 3.528 4s-1.58 4 -3.528 4" />
		<path d="M17.472 12h-2.472" />
		<path d="M17.472 12h-2.352" />
		<path d="M17.472 12c1.948 0 3.528 1.79 3.528 4s-1.58 4 -3.528 4h-5.472" />
	</Base>
);
export const BrandDatabricks = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 17l9 5l9 -5v-3l-9 5l-9 -5v-3l9 5l9 -5v-3l-9 5l-9 -5l9 -5l5.418 3.01" />
	</Base>
);
export const BrandDaysCounter = (p: IconProps) => (
	<Base {...p}>
		<path d="M20.779 10.007a9 9 0 1 0 -10.77 10.772" />
		<path d="M13 21h8v-7" />
		<path d="M12 8v4l3 3" />
	</Base>
);
export const BrandDcos = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 18l18 -12h-18l9 14l9 -14v10l-18 -10l0 12" />
	</Base>
);
export const BrandDebian = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 17c-2.397 -.943 -4 -3.153 -4 -5.635c0 -2.19 1.039 -3.14 1.604 -3.595c2.646 -2.133 6.396 -.27 6.396 3.23c0 2.5 -2.905 2.121 -3.5 1.5c-.595 -.621 -1 -1.5 -.5 -2.5" />
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
	</Base>
);
export const BrandDeezer = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 16.5h2v.5h-2l0 -.5" />
		<path d="M8 16.5h2.5v.5h-2.5l0 -.5" />
		<path d="M16 17h-2.5v-.5h2.5l0 .5" />
		<path d="M21.5 17h-2.5v-.5h2.5l0 .5" />
		<path d="M21.5 13h-2.5v.5h2.5l0 -.5" />
		<path d="M21.5 9.5h-2.5v.5h2.5l0 -.5" />
		<path d="M21.5 6h-2.5v.5h2.5l0 -.5" />
		<path d="M16 13h-2.5v.5h2.5l0 -.5" />
		<path d="M8 13.5h2.5v-.5h-2.5l0 .5" />
		<path d="M8 9.5h2.5v.5h-2.5l0 -.5" />
	</Base>
);
export const BrandDeliveroo = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 11l1 -9l5 .5l-1 13.5l-3 6l-12.5 -2.5l-1.5 -6l7 -1.5l-1.5 -7.5l4.5 -1l2 7.5" />
		<path d="M14.5 15.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" fill="currentColor" />
		<path d="M10.5 14.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" fill="currentColor" />
	</Base>
);
export const BrandDeno = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M13.47 20.882l-1.47 -5.882c-2.649 -.088 -5 -1.624 -5 -3.5c0 -1.933 2.239 -3.5 5 -3.5s4 1 5 3c.024 .048 .69 2.215 2 6.5" />
		<path d="M12 11h.01" />
	</Base>
);
export const BrandDenodo = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 11h2v2h-2l0 -2" />
		<path d="M3.634 15.634l1.732 -1l1 1.732l-1.732 1l-1 -1.732" />
		<path d="M11 19h2v2h-2l0 -2" />
		<path d="M18.634 14.634l1.732 1l-1 1.732l-1.732 -1l1 -1.732" />
		<path d="M17.634 7.634l1.732 -1l1 1.732l-1.732 1l-1 -1.732" />
		<path d="M11 3h2v2h-2l0 -2" />
		<path d="M3.634 8.366l1 -1.732l1.732 1l-1 1.732l-1.732 -1" />
	</Base>
);
export const BrandDeviantart = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 3v4l-3.857 6h3.857v4h-6.429l-2.571 4h-3v-4l3.857 -6h-3.857v-4h6.429l2.571 -4l3 0" />
	</Base>
);
export const BrandDigg = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 15h-3v-4h3" />
		<path d="M15 15h-3v-4h3" />
		<path d="M9 15v-4" />
		<path d="M15 11v7h-3" />
		<path d="M6 7v8" />
		<path d="M21 15h-3v-4h3" />
		<path d="M21 11v7h-3" />
	</Base>
);
export const BrandDingtalk = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 12a9 9 0 1 1 -18 0a9 9 0 0 1 18 0" />
		<path d="M8 7.5l7.02 2.632a1 1 0 0 1 .567 1.33l-1.087 2.538h1.5l-5 4l1 -4c-3.1 .03 -3.114 -3.139 -4 -6.5" />
	</Base>
);
export const BrandDiscord = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
		<path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
		<path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" />
		<path d="M7 16.5c3.5 1 6.5 1 10 0" />
	</Base>
);
export const BrandDisney = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.22 5.838c-1.307 -.15 -1.22 -.578 -1.22 -.794c0 -.216 .424 -1.044 4.34 -1.044c4.694 0 14.66 3.645 14.66 10.042s-8.71 4.931 -10.435 4.52c-1.724 -.412 -5.565 -2.256 -5.565 -4.174c0 -1.395 3.08 -2.388 6.715 -2.388c3.634 0 5.285 1.041 5.285 2c0 .5 -.074 1.229 -1 1.5" />
		<path d="M10.02 8a505.153 505.153 0 0 0 0 13" />
	</Base>
);
export const BrandDisqus = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.847 21c-2.259 0 -4.323 -.667 -5.919 -2h-3.928l1.708 -3.266c-.545 -1.174 -.759 -2.446 -.758 -3.734c0 -4.97 3.84 -9 8.898 -9c5.052 0 9.152 4.03 9.152 9c0 4.972 -4.098 9 -9.153 9" />
		<path d="M11.485 15h-1.485v-6h1.485c2.112 0 3.515 .823 3.515 2.981v.035c0 2.18 -1.403 2.984 -3.515 2.984" />
	</Base>
);
export const BrandDjango = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12" />
		<path d="M12 7v8.5l-2.015 .201a2.715 2.715 0 1 1 0 -5.402l2.015 .201" />
		<path d="M16 7v.01" />
		<path d="M16 10v5.586c0 .905 -.36 1.774 -1 2.414" />
	</Base>
);
export const BrandDocker = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 12.54c-1.804 -.345 -2.701 -1.08 -3.523 -2.94c-.487 .696 -1.102 1.568 -.92 2.4c.028 .238 -.32 1 -.557 1h-14c0 5.208 3.164 7 6.196 7c4.124 .022 7.828 -1.376 9.854 -5c1.146 -.101 2.296 -1.505 2.95 -2.46" />
		<path d="M5 10h3v3h-3l0 -3" />
		<path d="M8 10h3v3h-3l0 -3" />
		<path d="M11 10h3v3h-3l0 -3" />
		<path d="M8 7h3v3h-3l0 -3" />
		<path d="M11 7h3v3h-3l0 -3" />
		<path d="M11 4h3v3h-3l0 -3" />
		<path d="M4.571 18c1.5 0 2.047 -.074 2.958 -.78" />
		<path d="M10 16l0 .01" />
	</Base>
);
export const BrandDoctrine = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 14a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
		<path d="M9 14h6" />
		<path d="M12 11l3 3l-3 3" />
		<path d="M10 3l6.9 6" />
	</Base>
);
export const BrandDolbyDigital = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 6v12h-.89c-3.34 0 -6.047 -2.686 -6.047 -6s2.707 -6 6.046 -6h.891" />
		<path d="M3.063 6v12h.891c3.34 0 6.046 -2.686 6.046 -6s-2.707 -6 -6.046 -6h-.89" />
	</Base>
);
export const BrandDouban = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 20h16" />
		<path d="M5 4h14" />
		<path d="M8 8h8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2" />
		<path d="M16 14l-2 6" />
		<path d="M8 17l1 3" />
	</Base>
);
export const BrandDribbble = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M9 3.6c5 6 7 10.5 7.5 16.2" />
		<path d="M6.4 19c3.5 -3.5 6 -6.5 14.5 -6.4" />
		<path d="M3.1 10.75c5 0 9.814 -.38 15.314 -5" />
	</Base>
);
export const BrandDropbox = (p: IconProps) => (
	<Base {...p}>
		<path d="M7.5 10.625l-4.5 -2.813l4.5 -2.812l4.5 2.813m-4.5 2.812l4.5 -2.813m-4.5 2.813l-4.5 2.823l4.5 2.802m0 -5.625l4.5 2.823m0 -5.636l4.5 2.791l4.5 -2.812l-4.5 -2.791l-4.5 2.813m-4.5 8.438l4.5 -2.802m-4.5 2.802v1.123l4.5 2.627l4.5 -2.627v-1.123m-4.5 -2.802l4.5 -2.823l4.5 2.823l-4.5 2.802m-4.5 -2.802l4.5 2.802" />
	</Base>
);
export const BrandDrops = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.637 7.416a7.907 7.907 0 0 1 1.76 8.666a8 8 0 0 1 -7.397 4.918a8 8 0 0 1 -7.396 -4.918a7.907 7.907 0 0 1 1.759 -8.666l5.637 -5.416l5.637 5.416" />
		<path d="M14.466 10.923a3.595 3.595 0 0 1 .77 3.877a3.5 3.5 0 0 1 -3.236 2.2a3.5 3.5 0 0 1 -3.236 -2.2a3.595 3.595 0 0 1 .77 -3.877l2.466 -2.423l2.466 2.423" />
	</Base>
);
export const BrandDrupal = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 2c0 4.308 -7 6 -7 12a7 7 0 0 0 14 0c0 -6 -7 -7.697 -7 -12" />
		<path d="M12 11.33a65.753 65.753 0 0 1 -2.012 2.023c-1 .957 -1.988 1.967 -1.988 3.647c0 2.17 1.79 4 4 4s4 -1.827 4 -4c0 -1.676 -.989 -2.685 -1.983 -3.642c-.42 -.404 -2.259 -2.357 -5.517 -5.858l3.5 3.83" />
	</Base>
);
export const BrandEdge = (p: IconProps) => (
	<Base {...p}>
		<path d="M20.978 11.372a9 9 0 1 0 -1.593 5.773" />
		<path d="M20.978 11.372c.21 2.993 -5.034 2.413 -6.913 1.486c1.392 -1.6 .402 -4.038 -2.274 -3.851c-1.745 .122 -2.927 1.157 -2.784 3.202c.28 3.99 4.444 6.205 10.36 4.79" />
		<path d="M3.022 12.628c-.283 -4.043 8.717 -7.228 11.248 -2.688" />
		<path d="M12.628 20.978c-2.993 .21 -5.162 -4.725 -3.567 -9.748" />
	</Base>
);
export const BrandElastic = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 2a5 5 0 0 1 5 5c0 .712 -.232 1.387 -.5 2c1.894 .042 3.5 1.595 3.5 3.5c0 1.869 -1.656 3.4 -3.5 3.5c.333 .625 .5 1.125 .5 1.5a2.5 2.5 0 0 1 -2.5 2.5c-.787 0 -1.542 -.432 -2 -1c-.786 1.73 -2.476 3 -4.5 3a5 5 0 0 1 -4.583 -7a3.5 3.5 0 0 1 -.11 -6.992l.195 0a2.5 2.5 0 0 1 2 -4c.787 0 1.542 .432 2 1c.786 -1.73 2.476 -3 4.5 -3l-.002 -.008" />
		<path d="M8.5 9l-3 -1" />
		<path d="M9.5 5l-1 4l1 2l5 2l4 -4" />
		<path d="M18.499 16l-3 -.5l-1 -2.5" />
		<path d="M14.5 19l1 -3.5" />
		<path d="M5.417 15l4.083 -4" />
	</Base>
);
export const BrandElectronicArts = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M17.5 15l-3 -6l-3 6h-5l1.5 -3" />
		<path d="M17 14h-2" />
		<path d="M6.5 12h3.5" />
		<path d="M8 9h3" />
	</Base>
);
export const BrandEmber = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12.958c8.466 1.647 11.112 -1.196 12.17 -2.294c2.116 -2.196 0 -6.589 -2.646 -5.49c-2.644 1.096 -6.35 7.686 -3.174 12.078c2.116 2.928 6 2.178 11.65 -2.252" />
	</Base>
);
export const BrandEnvato = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.711 17.875c-.534 -1.339 -1.35 -4.178 .129 -6.47c1.415 -2.193 3.769 -3.608 5.099 -4.278l-5.229 10.748l.001 0" />
		<path d="M19.715 12.508c-.54 3.409 -2.094 6.156 -4.155 7.348c-4.069 2.353 -8.144 .45 -9.297 -.188c.877 -1.436 4.433 -7.22 6.882 -10.591c2.714 -3.737 5.864 -5.978 6.565 -6.077c0 .201 .03 .55 .071 1.03c.144 1.709 .443 5.264 -.066 8.478" />
	</Base>
);
export const BrandEtsy = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 12h-5" />
		<path d="M3 8a5 5 0 0 1 5 -5h8a5 5 0 0 1 5 5v8a5 5 0 0 1 -5 5h-8a5 5 0 0 1 -5 -5l0 -8" />
		<path d="M15 16h-5a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h5" />
	</Base>
);
export const BrandEvernote = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 8h5v-5" />
		<path d="M17.9 19c.6 -2.5 1.1 -5.471 1.1 -9c0 -4.5 -2 -5 -3 -5c-1.906 0 -3 -.5 -3.5 -1c-.354 -.354 -.5 -1 -1.5 -1h-2l-5 5c0 6 2.5 8 5 8c1 0 1.5 -.5 2 -1.5s1.414 -.326 2.5 0c1.044 .313 2.01 .255 2.5 .5c1 .5 2 1.5 2 3c0 .5 0 3 -3 3s-3 -3 -1 -3" />
		<path d="M15 10h1" />
	</Base>
);
export const BrandFacebook = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
	</Base>
);
export const BrandFeedly = (p: IconProps) => (
	<Base {...p}>
		<path d="M7.833 12.278l4.445 -4.445" />
		<path d="M10.055 14.5l2.223 -2.222" />
		<path d="M12.278 16.722l.555 -.555" />
		<path d="M19.828 14.828a4 4 0 0 0 0 -5.656l-5 -5a4 4 0 0 0 -5.656 0l-5 5a4 4 0 0 0 0 5.656l6.171 6.172h3.314l6.171 -6.172" />
	</Base>
);
export const BrandFigma = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
		<path d="M6 6a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3 -3" />
		<path d="M9 9a3 3 0 0 0 0 6h3m-3 0a3 3 0 1 0 3 3v-15" />
	</Base>
);
export const BrandFilezilla = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 15.824a4.062 4.062 0 0 1 -2.25 .033c-.738 -.201 -2.018 -.08 -2.75 .143l4.583 -5h-6.583" />
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M8 15l2 -8h5" />
	</Base>
);
export const BrandFinder = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1l0 -14" />
		<path d="M7 8v1" />
		<path d="M17 8v1" />
		<path d="M12.5 4c-.654 1.486 -1.26 3.443 -1.5 9h2.5c-.19 2.867 .094 5.024 .5 7" />
		<path d="M7 15.5c3.667 2 6.333 2 10 0" />
	</Base>
);
export const BrandFirebase = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.53 17.05l6.15 -11.72h-.02c.38 -.74 1.28 -1.02 2.01 -.63c.26 .14 .48 .36 .62 .62l1.06 2.01" />
		<path d="M15.47 6.45c.58 -.59 1.53 -.59 2.11 -.01c.22 .22 .36 .5 .41 .81l1.5 9.11c.1 .62 -.2 1.24 -.76 1.54l-6.07 2.9c-.46 .25 -1.01 .26 -1.46 0l-6.02 -2.92c-.55 -.31 -.85 -.92 -.75 -1.54l1.96 -12.04c.12 -.82 .89 -1.38 1.7 -1.25c.46 .07 .87 .36 1.09 .77l1.24 1.76" />
		<path d="M4.57 17.18l10.93 -10.68" />
	</Base>
);
export const BrandFirefox = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.028 7.82a9 9 0 1 0 12.823 -3.4c-1.636 -1.02 -3.064 -1.02 -4.851 -1.02h-1.647" />
		<path d="M4.914 9.485c-1.756 -1.569 -.805 -5.38 .109 -6.17c.086 .896 .585 1.208 1.111 1.685c.88 -.275 1.313 -.282 1.867 0c.82 -.91 1.694 -2.354 2.628 -2.093c-1.082 1.741 -.07 3.733 1.371 4.173c-.17 .975 -1.484 1.913 -2.76 2.686c-1.296 .938 -.722 1.85 0 2.234c.949 .506 3.611 -1 4.545 .354c-1.698 .102 -1.536 3.107 -3.983 2.727c2.523 .957 4.345 .462 5.458 -.34c1.965 -1.52 2.879 -3.542 2.879 -5.557c-.014 -1.398 .194 -2.695 -1.26 -4.75" />
	</Base>
);
export const BrandFiverr = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 3h-2a6 6 0 0 0 -6 6h-3v4h3v8h4v-7h4v7h4v-11h-8v-1.033a1.967 1.967 0 0 1 2 -1.967h2v-4" />
	</Base>
);
export const BrandFlickr = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
		<path d="M14 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
	</Base>
);
export const BrandFlightradar24 = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
		<path d="M8.5 20l3.5 -8l-6.5 6" />
		<path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
	</Base>
);
export const BrandFlipboard = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.973 3h16.054c.537 0 .973 .436 .973 .973v4.052a.973 .973 0 0 1 -.973 .973h-5.025v4.831c0 .648 -.525 1.173 -1.173 1.173h-4.829v5.025a.973 .973 0 0 1 -.974 .973h-4.053a.973 .973 0 0 1 -.973 -.973v-16.054c0 -.537 .436 -.973 .973 -.973" />
	</Base>
);
export const BrandFlutter = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 14l-3 -3l8 -8h6l-11 11" />
		<path d="M14 21l-5 -5l5 -5h5l-5 5l5 5l-5 0" />
	</Base>
);
export const BrandFortnite = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 3h7.5l-.5 4h-3v3h3v3.5h-3v6.5l-4 1l0 -18" />
	</Base>
);
export const BrandFoursquare = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 3h10c.644 0 1.11 .696 .978 1.33l-1.984 9.859a1.014 1.014 0 0 1 -1 .811h-2.254c-.308 0 -.6 .141 -.793 .382l-4.144 5.25c-.599 .752 -1.809 .331 -1.809 -.632v-16c0 -.564 .44 -1 1 -1l.006 0" />
		<path d="M12 9l5 0" />
	</Base>
);
export const BrandFramer = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 15h12l-12 -12h12v6h-12v6l6 6v-6" />
	</Base>
);
export const BrandFramerMotion = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 12l-8 -8v16l16 -16v16l-4 -4" />
		<path d="M20 12l-8 8l-4 -4" />
	</Base>
);
export const BrandFunimation = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M8 13h8a4 4 0 1 1 -8 0" />
	</Base>
);
export const BrandGatsby = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.296 14.297l6.407 6.407a9.018 9.018 0 0 1 -6.325 -6.116l-.082 -.291" />
		<path d="M16 13h5c-.41 3.603 -3.007 6.59 -6.386 7.614l-11.228 -11.229a9 9 0 0 1 15.66 -2.985" />
	</Base>
);
export const BrandGit = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M11 8a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M11 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M12 15v-6" />
		<path d="M15 11l-2 -2" />
		<path d="M11 7l-1.9 -1.9" />
		<path d="M13.446 2.6l7.955 7.954a2.045 2.045 0 0 1 0 2.892l-7.955 7.955a2.045 2.045 0 0 1 -2.892 0l-7.955 -7.955a2.045 2.045 0 0 1 0 -2.892l7.955 -7.955a2.045 2.045 0 0 1 2.892 0" />
	</Base>
);
export const BrandGithub = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
	</Base>
);
export const BrandGithubCopilot = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 18v-5.5c0 -.667 .167 -1.333 .5 -2" />
		<path d="M12 7.5c0 -1 -.01 -4.07 -4 -3.5c-3.5 .5 -4 2.5 -4 3.5c0 1.5 0 4 3 4c4 0 5 -2.5 5 -4" />
		<path d="M4 12c-1.333 .667 -2 1.333 -2 2c0 1 0 3 1.5 4c3 2 6.5 3 8.5 3s5.499 -1 8.5 -3c1.5 -1 1.5 -3 1.5 -4c0 -.667 -.667 -1.333 -2 -2" />
		<path d="M20 18v-5.5c0 -.667 -.167 -1.333 -.5 -2" />
		<path d="M12 7.5l0 -.297l.01 -.269l.027 -.298l.013 -.105l.033 -.215c.014 -.073 .029 -.146 .046 -.22l.06 -.223c.336 -1.118 1.262 -2.237 3.808 -1.873c2.838 .405 3.703 1.797 3.93 2.842l.036 .204c0 .033 .01 .066 .013 .098l.016 .185l0 .171l0 .49l-.015 .394l-.02 .271c-.122 1.366 -.655 2.845 -2.962 2.845c-3.256 0 -4.524 -1.656 -4.883 -3.081l-.053 -.242a3.865 3.865 0 0 1 -.036 -.235l-.021 -.227a3.518 3.518 0 0 1 -.007 -.215l.005 0" />
		<path d="M10 15v2" />
		<path d="M14 15v2" />
	</Base>
);
export const BrandGitlab = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 14l-9 7l-9 -7l3 -11l3 7h6l3 -7l3 11" />
	</Base>
);
export const BrandGmail = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 20h3a1 1 0 0 0 1 -1v-14a1 1 0 0 0 -1 -1h-3v16" />
		<path d="M5 20h3v-16h-3a1 1 0 0 0 -1 1v14a1 1 0 0 0 1 1" />
		<path d="M16 4l-4 4l-4 -4" />
		<path d="M4 6.5l8 7.5l8 -7.5" />
	</Base>
);
export const BrandGolang = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.695 14.305c1.061 1.06 2.953 .888 4.226 -.384c1.272 -1.273 1.444 -3.165 .384 -4.226c-1.061 -1.06 -2.953 -.888 -4.226 .384c-1.272 1.273 -1.444 3.165 -.384 4.226" />
		<path d="M12.68 9.233c-1.084 -.497 -2.545 -.191 -3.591 .846c-1.284 1.273 -1.457 3.165 -.388 4.226c1.07 1.06 2.978 .888 4.261 -.384a3.669 3.669 0 0 0 1.038 -1.921h-2.427" />
		<path d="M5.5 15h-1.5" />
		<path d="M6 9h-2" />
		<path d="M5 12h-3" />
	</Base>
);
export const BrandGoogle = (p: IconProps) => (
	<Base {...p}>
		<path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945" />
	</Base>
);
export const BrandGoogleAnalytics = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 10.105a1.105 1.105 0 0 1 1.105 -1.105h1.79a1.105 1.105 0 0 1 1.105 1.105v9.79a1.105 1.105 0 0 1 -1.105 1.105h-1.79a1.105 1.105 0 0 1 -1.105 -1.105l0 -9.79" />
		<path d="M17 4.105a1.105 1.105 0 0 1 1.105 -1.105h1.79a1.105 1.105 0 0 1 1.105 1.105v15.79a1.105 1.105 0 0 1 -1.105 1.105h-1.79a1.105 1.105 0 0 1 -1.105 -1.105l0 -15.79" />
		<path d="M3 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
	</Base>
);
export const BrandGoogleBigQuery = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.73 19.875a2.225 2.225 0 0 1 -1.948 1.125h-7.283a2.222 2.222 0 0 1 -1.947 -1.158l-4.272 -6.75a2.269 2.269 0 0 1 0 -2.184l4.272 -6.75a2.225 2.225 0 0 1 1.946 -1.158h7.285c.809 0 1.554 .443 1.947 1.158l3.98 6.75a2.33 2.33 0 0 1 0 2.25l-3.98 6.75v-.033" />
		<path d="M8 11.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0" />
		<path d="M14 14l2 2" />
	</Base>
);
export const BrandGoogleDrive = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 10l-6 10l-3 -5l6 -10l3 5" />
		<path d="M9 15h12l-3 5h-12" />
		<path d="M15 15l-6 -10h6l6 10l-6 0" />
	</Base>
);
export const BrandGoogleFit = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 8.866l-2.733 -2.734a3.866 3.866 0 0 0 -5.467 5.467l2.733 2.734l5.467 5.467l8.202 -8.201a3.866 3.866 0 0 0 -5.469 -5.466l-8.201 8.2" />
	</Base>
);
export const BrandGoogleHome = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.072 21h-14.144a1.928 1.928 0 0 1 -1.928 -1.928v-6.857c0 -.512 .203 -1 .566 -1.365l7.07 -7.063a1.928 1.928 0 0 1 2.727 0l7.071 7.063c.363 .362 .566 .853 .566 1.365v6.857a1.928 1.928 0 0 1 -1.928 1.928" />
		<path d="M7 13v4h10v-4l-5 -5" />
		<path d="M14.8 5.2l-11.8 11.8" />
		<path d="M7 17v4" />
		<path d="M17 17v4" />
	</Base>
);
export const BrandGoogleMaps = (p: IconProps) => (
	<Base {...p}>
		<path d="M9.5 9.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
		<path d="M6.428 12.494l7.314 -9.252" />
		<path d="M10.002 7.935l-2.937 -2.545" />
		<path d="M17.693 6.593l-8.336 9.979" />
		<path d="M17.591 6.376c.472 .907 .715 1.914 .709 2.935a7.263 7.263 0 0 1 -.72 3.18a19.085 19.085 0 0 1 -2.089 3c-.784 .933 -1.49 1.93 -2.11 2.98c-.314 .62 -.568 1.27 -.757 1.938c-.121 .36 -.277 .591 -.622 .591c-.315 0 -.463 -.136 -.626 -.593a10.595 10.595 0 0 0 -.779 -1.978a18.18 18.18 0 0 0 -1.423 -2.091c-.877 -1.184 -2.179 -2.535 -2.853 -4.071a7.077 7.077 0 0 1 -.621 -2.967a6.226 6.226 0 0 1 1.476 -4.055a6.25 6.25 0 0 1 4.811 -2.245a6.462 6.462 0 0 1 1.918 .284a6.255 6.255 0 0 1 3.686 3.092" />
	</Base>
);
export const BrandGoogleOne = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 5v13.982a2 2 0 0 0 4 0v-13.982a2 2 0 1 0 -4 0" />
		<path d="M6.63 8.407a2.125 2.125 0 0 0 -.074 2.944c.77 .834 2.051 .869 2.862 .077l4.95 -4.834c.812 -.792 .846 -2.11 .076 -2.945a1.984 1.984 0 0 0 -2.861 -.077l-4.953 4.835" />
	</Base>
);
export const BrandGooglePhotos = (p: IconProps) => (
	<Base {...p}>
		<path d="M7.5 7c2.485 0 4.5 1.974 4.5 4.409v.591h-8.397a.61 .61 0 0 1 -.426 -.173a.585 .585 0 0 1 -.177 -.418c0 -2.435 2.015 -4.409 4.5 -4.409" />
		<path d="M16.5 17c-2.485 0 -4.5 -1.974 -4.5 -4.409v-.591h8.397c.333 0 .603 .265 .603 .591c0 2.435 -2.015 4.409 -4.5 4.409" />
		<path d="M7 16.5c0 -2.485 1.972 -4.5 4.405 -4.5h.595v8.392a.61 .61 0 0 1 -.173 .431a.584 .584 0 0 1 -.422 .177c-2.433 0 -4.405 -2.015 -4.405 -4.5" />
		<path d="M17 7.5c0 2.485 -1.972 4.5 -4.405 4.5h-.595v-8.397a.61 .61 0 0 1 .175 -.428a.584 .584 0 0 1 .42 -.175c2.433 0 4.405 2.015 4.405 4.5" />
	</Base>
);
export const BrandGooglePlay = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 3.71v16.58a.7 .7 0 0 0 1.05 .606l14.622 -8.42a.55 .55 0 0 0 0 -.953l-14.622 -8.419a.7 .7 0 0 0 -1.05 .607l0 -.001" />
		<path d="M15 9l-10.5 11.5" />
		<path d="M4.5 3.5l10.5 11.5" />
	</Base>
);
export const BrandGooglePodcasts = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3v2" />
		<path d="M12 19v2" />
		<path d="M12 8v8" />
		<path d="M8 17v2" />
		<path d="M4 11v2" />
		<path d="M20 11v2" />
		<path d="M8 5v8" />
		<path d="M16 7v-2" />
		<path d="M16 19v-8" />
	</Base>
);
export const BrandGrammarly = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M15.697 9.434a4.5 4.5 0 1 0 .217 4.788" />
		<path d="M13.5 14h2.5v2.5" />
	</Base>
);
export const BrandGraphql = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 8l8 -5l8 5v8l-8 5l-8 -5l0 -8" />
		<path d="M12 4l7.5 12h-15l7.5 -12" />
		<path d="M11 3a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
		<path d="M11 21a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
		<path d="M3 8a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
		<path d="M3 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
		<path d="M19 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
		<path d="M19 8a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
	</Base>
);
export const BrandGravatar = (p: IconProps) => (
	<Base {...p}>
		<path d="M5.64 5.632a9 9 0 1 0 6.36 -2.632v7.714" />
	</Base>
);
export const BrandGrindr = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 13.282c0 .492 .784 1.718 2.102 1.718c1.318 0 2.898 -.966 2.898 -2.062c0 -.817 -.932 -.938 -1.409 -.938c-.228 0 -3.591 .111 -3.591 1.282" />
		<path d="M12 21c-2.984 0 -6.471 -2.721 -6.63 -2.982c-2.13 -3.49 -2.37 -13.703 -2.37 -13.703l1.446 -1.315c2.499 .39 5.023 .617 7.554 .68a58.626 58.626 0 0 0 7.554 -.68l1.446 1.315s-.24 10.213 -2.37 13.704c-.16 .26 -3.646 2.981 -6.63 2.981" />
		<path d="M11 13.282c0 .492 -.784 1.718 -2.102 1.718c-1.318 0 -2.898 -.966 -2.898 -2.062c0 -.817 .932 -.938 1.409 -.938c.228 0 3.591 .111 3.591 1.282" />
	</Base>
);
export const BrandGuardian = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 13h6" />
		<path d="M4 12c0 -9.296 9.5 -9 9.5 -9c-2.808 0 -4.5 4.373 -4.5 9s1.763 8.976 4.572 8.976c0 .023 -9.572 1.092 -9.572 -8.976" />
		<path d="M14.5 3c1.416 0 3.853 1.16 4.5 2v3.5" />
		<path d="M15 13v8s2.77 -.37 4 -2v-6" />
		<path d="M13.5 21h1.5" />
		<path d="M13.5 3h1" />
	</Base>
);
export const BrandGumroad = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 12a9 9 0 1 1 -18 0a9 9 0 0 1 18 0" />
		<path d="M13.5 13h2.5v3" />
		<path d="M15.024 9.382a4 4 0 1 0 -3.024 6.618c1.862 0 2.554 -1.278 3 -3" />
	</Base>
);
export const BrandHackerrank = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.484 5.667c-1.146 -.904 -3.35 -2.394 -6.497 -3.429c-.484 -.159 -.725 -.238 -1.04 -.238c-.314 0 -.556 .08 -1.04 .238c-3.147 1.035 -5.35 2.525 -6.496 3.43c-.402 .317 -.604 .476 -.797 .816c-.194 .341 -.233 .62 -.309 1.178a33 33 0 0 0 -.305 4.338c0 1.742 .165 3.317 .305 4.338c.076 .558 .115 .837 .309 1.178c.193 .34 .395 .5 .797 .817c1.146 .904 3.35 2.394 6.497 3.429c.483 .159 .725 .238 1.04 .238c.314 0 .555 -.08 1.04 -.238c3.146 -1.035 5.35 -2.525 6.496 -3.43c.402 -.317 .603 -.476 .797 -.816c.194 -.341 .232 -.62 .309 -1.178c.14 -1.021 .305 -2.596 .305 -4.338s-.165 -3.317 -.305 -4.338c-.077 -.558 -.115 -.837 -.309 -1.178s-.395 -.5 -.797 -.817" />
		<path d="M9 8v7" />
		<path d="M9 12h6" />
		<path d="M16 16h-2l1 1l1 -1" />
		<path d="M8 8h2l-1 -1l-1 1" />
		<path d="M15 9v7" />
	</Base>
);
export const BrandHbo = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 16v-8" />
		<path d="M6 8v8" />
		<path d="M2 12h4" />
		<path d="M9 16h2a2 2 0 1 0 0 -4h-2h2a2 2 0 1 0 0 -4h-2v8" />
		<path d="M19 8a4 4 0 1 1 0 8a4 4 0 0 1 0 -8" />
		<path d="M18 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
	</Base>
);
export const BrandHeadlessui = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.744 4.325l7.82 -1.267a4.456 4.456 0 0 1 5.111 3.686l1.267 7.82a4.456 4.456 0 0 1 -3.686 5.111l-7.82 1.267a4.456 4.456 0 0 1 -5.111 -3.686l-1.267 -7.82a4.456 4.456 0 0 1 3.686 -5.111" />
		<path d="M7.252 7.704l7.897 -1.28a1 1 0 0 1 1.147 .828l.36 2.223l-9.562 3.51l-.67 -4.134a1 1 0 0 1 .828 -1.147" />
	</Base>
);
export const BrandHexo = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033" />
		<path d="M9 8v8" />
		<path d="M15 8v8" />
		<path d="M9 12h6" />
	</Base>
);
export const BrandHipchat = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.802 17.292s.077 -.055 .2 -.149c1.843 -1.425 3 -3.49 3 -5.789c0 -4.286 -4.03 -7.764 -9 -7.764c-4.97 0 -9 3.478 -9 7.764c0 4.288 4.03 7.646 9 7.646c.424 0 1.12 -.028 2.088 -.084c1.262 .82 3.104 1.493 4.716 1.493c.499 0 .734 -.41 .414 -.828c-.486 -.596 -1.156 -1.551 -1.416 -2.29l-.002 .001" />
		<path d="M7.5 13.5c2.5 2.5 6.5 2.5 9 0" />
	</Base>
);
export const BrandHtml5 = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5l16 0" />
		<path d="M15.5 8h-7l.5 4h6l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5" />
	</Base>
);
export const BrandInertia = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.5 8l4 4l-4 4h4.5l4 -4l-4 -4l-4.5 0" />
		<path d="M3.5 8l4 4l-4 4h4.5l4 -4l-4 -4l-4.5 0" />
	</Base>
);
export const BrandInfakt = (p: IconProps) => (
	<Base {...p}>
		<path d="M14.936 6.063a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
		<path d="M5.52 5c.002 -.033 -1.69 1.568 1.02 3.733c-1.092 2.015 .853 2.992 .853 2.992c-.972 1.879 1.39 2.805 1.39 2.805c-1 2.39 -2 4.68 -3.555 6.454c1.495 .09 2.04 -.196 2.9 -.844c3.386 -2.552 4.937 -6.471 5.765 -8.62c.385 -1.001 -.323 -2.47 -1.247 -2.964c-2.52 -1.35 -7.178 -3.526 -7.127 -3.555" />
	</Base>
);
export const BrandInstagram = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8" />
		<path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
		<path d="M16.5 7.5v.01" />
	</Base>
);
export const BrandIntercom = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
		<path d="M7 8v3" />
		<path d="M10 7v6" />
		<path d="M14 7v6" />
		<path d="M17 8v3" />
		<path d="M7 15c4 2.667 6 2.667 10 0" />
	</Base>
);
export const BrandItch = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 7v1c0 1.087 1.078 2 2 2c1.107 0 2 -.91 2 -2c0 1.09 .893 2 2 2s2 -.91 2 -2c0 1.09 .893 2 2 2s2 -.91 2 -2c0 1.09 .893 2 2 2s2 -.91 2 -2c0 1.09 .893 2 2 2c.922 0 2 -.913 2 -2v-1c-.009 -.275 -.538 -.964 -1.588 -2.068a3 3 0 0 0 -2.174 -.932h-12.476a3 3 0 0 0 -2.174 .932c-1.05 1.104 -1.58 1.793 -1.588 2.068" />
		<path d="M4 10c-.117 6.28 .154 9.765 .814 10.456c1.534 .367 4.355 .535 7.186 .536c2.83 -.001 5.652 -.169 7.186 -.536c.99 -1.037 .898 -9.559 .814 -10.456" />
		<path d="M10 16l2 -2l2 2" />
		<path d="M12 14v4" />
	</Base>
);
export const BrandJavascript = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5l16 0" />
		<path d="M7.5 8h3v8l-2 -1" />
		<path d="M16.5 8h-2.5a.5 .5 0 0 0 -.5 .5v3a.5 .5 0 0 0 .5 .5h1.423a.5 .5 0 0 1 .495 .57l-.418 2.93l-2 .5" />
	</Base>
);
export const BrandJira = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 4h-9v1.5a2.5 2.5 0 0 0 2.5 2.5h1.5a1 1 0 0 1 1 1v1.5a2.5 2.5 0 0 0 2.5 2.5h1.5v-9" />
		<path d="M15 8h-8v1.5a2.5 2.5 0 0 0 2.5 2.5h1.5a1 1 0 0 1 1 1v1.5a2.5 2.5 0 0 0 2.5 2.5h1.5v-8a1 1 0 0 0 -1 -1" />
		<path d="M11 12h-8v1.5a2.5 2.5 0 0 0 2.5 2.5h1.5a1 1 0 0 1 1 1v1.5a2.5 2.5 0 0 0 2.5 2.5h1.5v-8a1 1 0 0 0 -1 -1" />
	</Base>
);
export const BrandJuejin = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 12l10 7.422l10 -7.422" />
		<path d="M7 9l5 4l5 -4" />
		<path d="M11 6l1 .8l1 -.8l-1 -.8l-1 .8" />
	</Base>
);
export const BrandKakoTalk = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 8v7" />
		<path d="M14 10l-2 2.5l2 2.5" />
		<path d="M12 4c4.97 0 9 3.358 9 7.5c0 4.142 -4.03 7.5 -9 7.5c-.67 0 -1.323 -.061 -1.95 -.177l-3.05 2.177l.592 -2.962c-2.741 -1.284 -4.592 -3.73 -4.592 -6.538c0 -4.142 4.03 -7.5 9 -7.5" />
	</Base>
);
export const BrandKbin = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.586 9.506h-2.43c-.434 -.932 -.7 -1.506 -1.596 -1.506l-2.404 .019c-.662 0 -1.353 .592 -1.103 1.487l2.216 9.436c.486 1.743 .811 2.058 1.145 2.058h.64" />
		<path d="M14.275 3h5.645c.84 0 1.24 .714 1.02 1.287l-4.687 15.109c-.42 1.133 -1.159 1.603 -2.354 1.603h-7.485c.39 0 .76 -.618 1.296 -2.061l4.457 -14.49c.326 -.83 .76 -1.448 2.108 -1.448" />
	</Base>
);
export const BrandKick = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 4h5v4h3v-2h2v-2h6v4h-2v2h-2v4h2v2h2v4h-6v-2h-2v-2h-3v4h-5l0 -16" />
	</Base>
);
export const BrandKickstarter = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 9l2.975 -4.65c.615 -.9 1.405 -1.35 2.377 -1.35c.79 0 1.474 .286 2.054 .858c.576 .574 .866 1.256 .866 2.054c0 .588 -.153 1.109 -.46 1.559l-2.812 4.029l3.465 4.912c.356 .46 .535 1 .535 1.613a2.92 2.92 0 0 1 -.843 2.098c-.561 .584 -1.242 .877 -2.04 .877c-.876 0 -1.545 -.29 -2 -.87l-4.112 -5.697v3.067c0 .876 -.313 1.69 -.611 2.175c-.543 .883 -1.35 1.325 -2.389 1.325c-.944 0 -1.753 -.327 -2.271 -.974c-.486 -.6 -.729 -1.392 -.729 -2.38v-11.371c0 -.934 .247 -1.706 .74 -2.313c.512 -.641 1.347 -.962 2.26 -.962c.868 0 1.821 .321 2.4 .962c.323 .356 .515 .714 .6 1.08c.052 .224 0 .643 0 1.26v2.698l-.005 0" />
	</Base>
);
export const BrandKotlin = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 20h-16v-16h16" />
		<path d="M4 20l16 -16" />
		<path d="M4 12l8 -8" />
		<path d="M12 12l8 8" />
	</Base>
);
export const BrandLaravel = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 17l8 5l7 -4v-8l-4 -2.5l4 -2.5l4 2.5v4l-11 6.5l-4 -2.5v-7.5l-4 -2.5l0 11.5" />
		<path d="M11 18v4" />
		<path d="M7 15.5l7 -4" />
		<path d="M14 7.5v4" />
		<path d="M14 11.5l4 2.5" />
		<path d="M11 13v-7.5l-4 -2.5l-4 2.5" />
		<path d="M7 8l4 -2.5" />
		<path d="M18 10l4 -2.5" />
	</Base>
);
export const BrandLastfm = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 8c-.83 -1 -1.388 -1 -2 -1c-.612 0 -2 .271 -2 2s1.384 2.233 3 3c1.616 .767 2.125 1.812 2 3s-1 2 -3 2s-3 -1 -3.5 -2s-1.585 -4.78 -2.497 -6a5 5 0 1 0 -1 7" />
	</Base>
);
export const BrandLeetcode = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 13h7.5" />
		<path d="M9.424 7.268l4.999 -4.999" />
		<path d="M16.633 16.644l-2.402 2.415a3.189 3.189 0 0 1 -4.524 0l-3.77 -3.787a3.223 3.223 0 0 1 0 -4.544l3.77 -3.787a3.189 3.189 0 0 1 4.524 0l2.302 2.313" />
	</Base>
);
export const BrandLetterboxd = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M6 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M10 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M14 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
	</Base>
);
export const BrandLine = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 10.663c0 -4.224 -4.041 -7.663 -9 -7.663s-9 3.439 -9 7.663c0 3.783 3.201 6.958 7.527 7.56c1.053 .239 .932 .644 .696 2.133c-.039 .238 -.184 .932 .777 .512c.96 -.42 5.18 -3.201 7.073 -5.48c1.304 -1.504 1.927 -3.029 1.927 -4.715v-.01" />
	</Base>
);
export const BrandLinkedin = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 11v5" />
		<path d="M8 8v.01" />
		<path d="M12 16v-5" />
		<path d="M16 16v-3a2 2 0 1 0 -4 0" />
		<path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
	</Base>
);
export const BrandLinktree = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 10h16" />
		<path d="M6.5 4.5l11 11" />
		<path d="M6.5 15.5l11 -11" />
		<path d="M12 10v-8" />
		<path d="M12 15v7" />
	</Base>
);
export const BrandLinqpad = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 21h3.5l2.5 -6l2.5 -1l2.5 7h4l1 -4.5l-2 -1l-7 -12l-6 -.5l1.5 4l2.5 .5l1 2.5l-7 8l1 3" />
	</Base>
);
export const BrandLivewire = (p: IconProps) => (
	<Base {...p}>
		<path d="M20.982 18.777c-.372 .548 -.652 1.223 -1.406 1.223c-1.269 0 -1.337 -1.913 -2.607 -1.913c-1.27 0 -1.2 1.913 -2.47 1.913c-1.268 0 -1.337 -1.913 -2.607 -1.913c-1.269 0 -1.2 1.913 -2.47 1.913c-1.268 0 -1.337 -1.913 -2.607 -1.913c-1.27 0 -1.2 1.913 -2.47 1.913c-.398 0 -.679 -.189 -.915 -.448a10.414 10.414 0 0 1 -1.43 -5.29c0 -5.669 4.477 -10.262 10 -10.262c5.524 0 10 4.594 10 10.261c0 1.62 -.366 3.152 -1.018 4.516" />
		<path d="M20.982 18.777c-.372 .548 -.652 1.223 -1.406 1.223c-1.269 0 -1.337 -1.913 -2.607 -1.913c-1.27 0 -1.2 1.913 -2.47 1.913c-1.268 0 -1.337 -1.913 -2.607 -1.913c-1.269 0 -1.2 1.913 -2.47 1.913c-1.268 0 -1.337 -1.913 -2.607 -1.913c-1.27 0 -1.2 1.913 -2.47 1.913c-.398 0 -.679 -.189 -.915 -.448a10.414 10.414 0 0 1 -1.43 -5.29c0 -5.669 4.477 -10.262 10 -10.262c5.524 0 10 4.594 10 10.261c0 1.62 -.366 3.152 -1.018 4.516" />
		<path d="M11.5 16c3.167 0 4.5 -1.748 4.5 -4.231c0 -2.484 -2.014 -4.769 -4.5 -4.769c-2.485 0 -4.5 2.286 -4.5 4.769s1.333 4.231 4.5 4.231" />
		<path d="M10 11a1 1 0 1 0 0 -2a1 1 0 0 0 0 2" />
	</Base>
);
export const BrandLoom = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.464 6.518a6 6 0 1 0 -3.023 7.965" />
		<path d="M17.482 17.464a6 6 0 1 0 -7.965 -3.023" />
		<path d="M6.54 17.482a6 6 0 1 0 3.024 -7.965" />
		<path d="M6.518 6.54a6 6 0 1 0 7.965 3.024" />
	</Base>
);
export const BrandMailgun = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 12a2 2 0 1 0 4 0a9 9 0 1 0 -2.987 6.697" />
		<path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
		<path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
	</Base>
);
export const BrandMantine = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M11 16c1.22 -.912 2 -2.36 2 -4a5.01 5.01 0 0 0 -2 -4" />
		<path d="M14 9h-2" />
		<path d="M14 15h-2" />
		<path d="M10 12h.01" />
	</Base>
);
export const BrandMastercard = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
		<path d="M12 9.765a3 3 0 1 0 0 4.47" />
		<path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
	</Base>
);
export const BrandMastodon = (p: IconProps) => (
	<Base {...p}>
		<path d="M18.648 15.254c-1.816 1.763 -6.648 1.626 -6.648 1.626a18.262 18.262 0 0 1 -3.288 -.256c1.127 1.985 4.12 2.81 8.982 2.475c-1.945 2.013 -13.598 5.257 -13.668 -7.636l-.026 -1.154c0 -3.036 .023 -4.115 1.352 -5.633c1.671 -1.91 6.648 -1.666 6.648 -1.666s4.977 -.243 6.648 1.667c1.329 1.518 1.352 2.597 1.352 5.633s-.456 4.074 -1.352 4.944" />
		<path d="M12 11.204v-2.926c0 -1.258 -.895 -2.278 -2 -2.278s-2 1.02 -2 2.278v4.722m4 -4.722c0 -1.258 .895 -2.278 2 -2.278s2 1.02 2 2.278v4.722" />
	</Base>
);
export const BrandMatrix = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 3h-1v18h1" />
		<path d="M20 21h1v-18h-1" />
		<path d="M7 9v6" />
		<path d="M12 15v-3.5a2.5 2.5 0 1 0 -5 0v.5" />
		<path d="M17 15v-3.5a2.5 2.5 0 1 0 -5 0v.5" />
	</Base>
);
export const BrandMcdonalds = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" />
	</Base>
);
export const BrandMedium = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
		<path d="M8 9h1l3 3l3 -3h1" />
		<path d="M8 15l2 0" />
		<path d="M14 15l2 0" />
		<path d="M9 9l0 6" />
		<path d="M15 9l0 6" />
	</Base>
);
export const BrandMeetup = (p: IconProps) => (
	<Base {...p}>
		<path d="M5.455 10.82c.935 -2.163 3.045 -3.82 5.545 -3.82c2.104 0 2.844 1.915 2 4l-2 6" />
		<path d="M6.981 7l-3.981 9.914" />
		<path d="M13 11c.937 -2.16 3.071 -3.802 5.42 -3.972c2.104 0 3.128 1.706 2.284 3.792l-2.454 6.094c-.853 1.676 .75 2.586 2.75 2.086" />
	</Base>
);
export const BrandMercedes = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M12 3v9" />
		<path d="M12 12l7 5" />
		<path d="M12 12l-7 5" />
	</Base>
);
export const BrandMessenger = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
		<path d="M8 13l3 -2l2 2l3 -2" />
	</Base>
);
export const BrandMeta = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 10.174c1.766 -2.784 3.315 -4.174 4.648 -4.174c2 0 3.263 2.213 4 5.217c.704 2.869 .5 6.783 -2 6.783c-1.114 0 -2.648 -1.565 -4.148 -3.652a27.627 27.627 0 0 1 -2.5 -4.174" />
		<path d="M12 10.174c-1.766 -2.784 -3.315 -4.174 -4.648 -4.174c-2 0 -3.263 2.213 -4 5.217c-.704 2.869 -.5 6.783 2 6.783c1.114 0 2.648 -1.565 4.148 -3.652c1 -1.391 1.833 -2.783 2.5 -4.174" />
	</Base>
);
export const BrandMetabrainz = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 7v10l7 4v-18l-7 4" />
		<path d="M21 7v10l-7 4v-18l7 4" />
	</Base>
);
export const BrandMinecraft = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008c.62 .354 1.38 .354 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718" />
		<path d="M12 22v-10" />
		<path d="M12 12l8.73 -5.04" />
		<path d="M3.27 6.96l8.73 5.04" />
		<path d="M12 17l3.003 -1.668m3 -1.667l2.997 -1.665m-9 5l-9 -5" />
		<path d="M15 17l3 -1.67v-3l-3 1.67l0 3" />
	</Base>
);
export const BrandMiniprogram = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 12a9 9 0 1 1 -18 0a9 9 0 0 1 18 0" />
		<path d="M8 11.503a2.5 2.5 0 1 0 4 2v-3a2.5 2.5 0 1 1 4 2" />
	</Base>
);
export const BrandMixpanel = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 12a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
		<path d="M19 12a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" />
		<path d="M11 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
	</Base>
);
export const BrandMonday = (p: IconProps) => (
	<Base {...p}>
		<path d="M18 15.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" />
		<path d="M9.5 7a1.5 1.5 0 0 1 1.339 2.177l-4.034 7.074c-.264 .447 -.75 .749 -1.305 .749a1.5 1.5 0 0 1 -1.271 -2.297l3.906 -6.827a1.5 1.5 0 0 1 1.365 -.876" />
		<path d="M16.5 7a1.5 1.5 0 0 1 1.339 2.177l-4.034 7.074c-.264 .447 -.75 .749 -1.305 .749a1.5 1.5 0 0 1 -1.271 -2.297l3.906 -6.827a1.5 1.5 0 0 1 1.365 -.876" />
	</Base>
);
export const BrandMongodb = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3v19" />
		<path d="M18 11.227c0 3.273 -1.812 4.77 -6 9.273c-4.188 -4.503 -6 -6 -6 -9.273c0 -4.454 3.071 -6.927 6 -9.227c2.929 2.3 6 4.773 6 9.227" />
	</Base>
);
export const BrandMyOppo = (p: IconProps) => (
	<Base {...p}>
		<path d="M18.316 5h-12.632l-3.418 4.019a1.089 1.089 0 0 0 .019 1.447l9.714 10.534l9.715 -10.49a1.09 1.09 0 0 0 .024 -1.444l-3.422 -4.066" />
		<path d="M9 11l3 3l3 -3" />
	</Base>
);
export const BrandMysql = (p: IconProps) => (
	<Base {...p}>
		<path d="M13 21c-1.427 -1.026 -3.59 -3.854 -4 -6c-.486 .77 -1.501 2 -2 2c-1.499 -.888 -.574 -3.973 0 -6c-1.596 -1.433 -2.468 -2.458 -2.5 -4c-3.35 -3.44 -.444 -5.27 2.5 -3h1c8.482 .5 6.421 8.07 9 11.5c2.295 .522 3.665 2.254 5 3.5c-2.086 -.2 -2.784 -.344 -3.5 0c.478 1.64 2.123 2.2 3.5 3" />
		<path d="M9 7h.01" />
	</Base>
);
export const BrandNationalGeographic = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 3h10v18h-10l0 -18" />
	</Base>
);
export const BrandNem = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.182 2c1.94 .022 3.879 .382 5.818 1.08l.364 .135a23.075 23.075 0 0 1 3.636 1.785c0 5.618 -1.957 10.258 -5.87 13.92c-1.24 1.239 -2.5 2.204 -3.78 2.898l-.35 .182c-1.4 -.703 -2.777 -1.729 -4.13 -3.079c-3.912 -3.663 -5.87 -8.303 -5.87 -13.921c2.545 -1.527 5.09 -2.471 7.636 -2.832l.364 -.048a16.786 16.786 0 0 1 1.818 -.12h.364" />
		<path d="M2.1 7.07c2.073 6.72 5.373 7.697 9.9 2.93c0 -4 1.357 -6.353 4.07 -7.06l.59 -.11" />
		<path d="M16.35 18.51s2.65 -5.51 -4.35 -8.51" />
	</Base>
);
export const BrandNetbeans = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033" />
		<path d="M15.5 9.43a1 1 0 0 1 .5 .874v3.268a1 1 0 0 1 -.515 .874l-3 1.917a1 1 0 0 1 -.97 0l-3 -1.917a1 1 0 0 1 -.515 -.873v-3.269a1 1 0 0 1 .514 -.874l3 -1.786c.311 -.173 .69 -.173 1 0l3 1.787h-.014l0 -.001" />
		<path d="M12 21v-9l-7.5 -4.5" />
		<path d="M12 12l7.5 -4.5" />
		<path d="M12 3v4.5" />
		<path d="M19.5 16l-3.5 -2" />
		<path d="M8 14l-3.5 2" />
	</Base>
);
export const BrandNeteaseMusic = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 4c-2.93 1.346 -5 5.046 -5 8.492c0 4.508 4 7.508 8 7.508c4 0 8 -3 8 -7c0 -3.513 -3.5 -5.513 -6 -5.513c-2.5 0 -5 1.513 -5 4.513c0 2 1.5 3 3 3c1.5 0 3 -1 3 -3c0 -3.513 -2 -4.508 -2 -6.515c0 -3.504 3.5 -2.603 4 -1.502" />
	</Base>
);
export const BrandNetflix = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 3l10 18h-4l-10 -18l4 0" />
		<path d="M5 3v18h4v-10.5" />
		<path d="M19 21v-18h-4v10.5" />
	</Base>
);
export const BrandNexo = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 3l5 3v12l-5 3l-10 -6v-6l10 6v-6l-5 -3l5 -3" />
		<path d="M12 6l-5 -3l-5 3v12l5 3l4.7 -3.13" />
	</Base>
);
export const BrandNextcloud = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
		<path d="M2 12.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
		<path d="M17 12.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
	</Base>
);
export const BrandNextjs = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993" />
		<path d="M15 12v-3" />
	</Base>
);
export const BrandNodejs = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 9v8.044a2 2 0 0 1 -2.996 1.734l-1.568 -.9a3 3 0 0 1 -1.436 -2.561v-6.635a3 3 0 0 1 1.436 -2.56l6 -3.667a3 3 0 0 1 3.128 0l6 3.667a3 3 0 0 1 1.436 2.561v6.634a3 3 0 0 1 -1.436 2.56l-6 3.667a3 3 0 0 1 -3.128 0" />
		<path d="M17 9h-3.5a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3.5" />
	</Base>
);
export const BrandNordVpn = (p: IconProps) => (
	<Base {...p}>
		<path d="M9.992 15l-2.007 -3l-4.015 8c-2.212 -3.061 -2.625 -7.098 -.915 -10.463a10.14 10.14 0 0 1 8.945 -5.537a10.14 10.14 0 0 1 8.945 5.537c1.71 3.365 1.297 7.402 -.915 10.463l-4.517 -8l-1.505 1.5" />
		<path d="M14.5 15l-3 -6l-2.5 4.5" />
	</Base>
);
export const BrandNotion = (p: IconProps) => (
	<Base {...p}>
		<path d="M11 17.5v-6.5h.5l4 6h.5v-6.5" />
		<path d="M19.077 20.071l-11.53 .887a1 1 0 0 1 -.876 -.397l-2.471 -3.294a1 1 0 0 1 -.2 -.6v-10.741a1 1 0 0 1 .923 -.997l11.389 -.876a2 2 0 0 1 1.262 .33l1.535 1.023a2 2 0 0 1 .891 1.664v12.004a1 1 0 0 1 -.923 .997" />
		<path d="M4.5 5.5l2.5 2.5" />
		<path d="M20 7l-13 1v12.5" />
	</Base>
);
export const BrandNpm = (p: IconProps) => (
	<Base {...p}>
		<path d="M1 8h22v7h-12v2h-4v-2h-6l0 -7" />
		<path d="M7 8v7" />
		<path d="M14 8v7" />
		<path d="M17 11v4" />
		<path d="M4 11v4" />
		<path d="M11 11v1" />
		<path d="M20 11v4" />
	</Base>
);
export const BrandNuxt = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.146 8.583l-1.3 -2.09a1.046 1.046 0 0 0 -1.786 .017l-5.91 9.908a1.046 1.046 0 0 0 .897 1.582h3.913" />
		<path d="M20.043 18c.743 0 1.201 -.843 .82 -1.505l-4.044 -7.013a.936 .936 0 0 0 -1.638 0l-4.043 7.013c-.382 .662 .076 1.505 .819 1.505h8.086" />
	</Base>
);
export const BrandNytimes = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.036 5.058a8 8 0 1 0 8.706 9.965" />
		<path d="M12 21v-11l-7.5 4" />
		<path d="M17.5 3a2.5 2.5 0 1 1 0 5l-11 -5a2.5 2.5 0 0 0 -.67 4.91" />
		<path d="M9 12v8" />
		<path d="M16 13h-.01" />
	</Base>
);
export const BrandOauth = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0" />
		<path d="M12.556 6c.65 0 1.235 .373 1.508 .947l2.839 7.848a1.646 1.646 0 0 1 -1.01 2.108a1.673 1.673 0 0 1 -2.068 -.851l-.46 -1.052h-2.73l-.398 .905a1.67 1.67 0 0 1 -1.977 1.045l-.153 -.047a1.647 1.647 0 0 1 -1.056 -1.956l2.824 -7.852a1.664 1.664 0 0 1 1.409 -1.087l1.272 -.008" />
	</Base>
);
export const BrandOffice = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 18h9v-12l-5 2v5l-4 2v-8l9 -4l7 2v13l-7 3l-9 -3" />
	</Base>
);
export const BrandOkRu = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M20 12c0 8 0 8 -8 8s-8 0 -8 -8s0 -8 8 -8s8 0 8 8" />
		<path d="M9.5 13c1.333 .667 3.667 .667 5 0" />
		<path d="M9.5 17l2.5 -3l2.5 3" />
		<path d="M12 13.5v.5" />
	</Base>
);
export const BrandOnedrive = (p: IconProps) => (
	<Base {...p}>
		<path d="M18.456 10.45a6.45 6.45 0 0 0 -12 -2.151a4.857 4.857 0 0 0 -4.44 5.241a4.856 4.856 0 0 0 5.236 4.444h10.751a3.771 3.771 0 0 0 3.99 -3.54a3.772 3.772 0 0 0 -3.538 -3.992l.001 -.002" />
	</Base>
);
export const BrandOnlyfans = (p: IconProps) => (
	<Base {...p}>
		<path d="M8.5 6a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0 -13" />
		<path d="M8.5 15a2.5 2.5 0 1 1 0 -5a2.5 2.5 0 0 1 0 5" />
		<path d="M14 16c2.5 0 6.42 -1.467 7 -4h-6c3 -1 6.44 -3.533 7 -6h-4c-3.03 0 -3.764 -.196 -5 1.5" />
	</Base>
);
export const BrandOpenSource = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3a9 9 0 0 1 3.618 17.243l-2.193 -5.602a3 3 0 1 0 -2.849 0l-2.193 5.603a9 9 0 0 1 3.617 -17.244" />
	</Base>
);
export const BrandOpenai = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.217 19.384a3.501 3.501 0 0 0 6.783 -1.217v-5.167l-6 -3.35" />
		<path d="M5.214 15.014a3.501 3.501 0 0 0 4.446 5.266l4.34 -2.534v-6.946" />
		<path d="M6 7.63c-1.391 -.236 -2.787 .395 -3.534 1.689a3.474 3.474 0 0 0 1.271 4.745l4.263 2.514l6 -3.348" />
		<path d="M12.783 4.616a3.501 3.501 0 0 0 -6.783 1.217v5.067l6 3.45" />
		<path d="M18.786 8.986a3.501 3.501 0 0 0 -4.446 -5.266l-4.34 2.534v6.946" />
		<path d="M18 16.302c1.391 .236 2.787 -.395 3.534 -1.689a3.474 3.474 0 0 0 -1.271 -4.745l-4.308 -2.514l-5.955 3.42" />
	</Base>
);
export const BrandOpenvpn = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.618 20.243l-2.193 -5.602a3 3 0 1 0 -2.849 0l-2.193 5.603" />
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
	</Base>
);
export const BrandOpera = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M9 12a3 5 0 1 0 6 0a3 5 0 1 0 -6 0" />
	</Base>
);
export const BrandPagekit = (p: IconProps) => (
	<Base {...p}>
		<path d="M12.077 20h-5.077v-16h11v14h-5.077" />
	</Base>
);
export const BrandParsinta = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3a9 9 0 1 0 9 9" />
		<path d="M21 12a9 9 0 0 0 -9 -9" opacity=".5" />
		<path d="M10 9v6l5 -3l-5 -3" />
	</Base>
);
export const BrandPatreon = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 8.408c-.003 -2.299 -1.746 -4.182 -3.79 -4.862c-2.54 -.844 -5.888 -.722 -8.312 .453c-2.939 1.425 -3.862 4.545 -3.896 7.656c-.028 2.559 .22 9.297 3.92 9.345c2.75 .036 3.159 -3.603 4.43 -5.356c.906 -1.247 2.071 -1.599 3.506 -1.963c2.465 -.627 4.146 -2.626 4.142 -5.273" />
	</Base>
);
export const BrandPaypal = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 13l2.5 0c2.5 0 5 -2.5 5 -5c0 -3 -1.9 -5 -5 -5h-5.5c-.5 0 -1 .5 -1 1l-2 14c0 .5 .5 1 1 1h2.8l1.2 -5c.1 -.6 .4 -1 1 -1m7.5 -5.8c1.7 1 2.5 2.8 2.5 4.8c0 2.5 -2.5 4.5 -5 4.5h-2.6l-.6 3.6a1 1 0 0 1 -1 .8l-2.7 0a.5 .5 0 0 1 -.5 -.6l.2 -1.4" />
	</Base>
);
export const BrandPaypay = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.375 21l3.938 -13.838" />
		<path d="M3 6c16.731 0 21.231 9.881 4.5 11" />
		<path d="M21 19v-14a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2" />
	</Base>
);
export const BrandPeanut = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 16.25l-.816 -.36l-.462 -.196c-1.444 -.592 -2 -.593 -3.447 0l-.462 .195l-.817 .359a4.5 4.5 0 1 1 0 -8.49l1.054 .462l.434 .178c1.292 .507 1.863 .48 3.237 -.082l.462 -.195l.817 -.359a4.5 4.5 0 1 1 0 8.49" />
	</Base>
);
export const BrandPepsi = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M4 16c5.713 -2.973 11 -3.5 13.449 -11.162" />
		<path d="M5 17.5c5.118 -2.859 15 0 14 -11" />
	</Base>
);
export const BrandPhp = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 12a10 9 0 1 0 20 0a10 9 0 1 0 -20 0" />
		<path d="M5.5 15l.395 -1.974l.605 -3.026h1.32a1 1 0 0 1 .986 1.164l-.167 1a1 1 0 0 1 -.986 .836h-1.653" />
		<path d="M15.5 15l.395 -1.974l.605 -3.026h1.32a1 1 0 0 1 .986 1.164l-.167 1a1 1 0 0 1 -.986 .836h-1.653" />
		<path d="M12 7.5l-1 5.5" />
		<path d="M11.6 10h2.4l-.5 3" />
	</Base>
);
export const BrandPicsart = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 9a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
		<path d="M9 9a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
		<path d="M5 9v11a2 2 0 1 0 4 0v-4.5" />
	</Base>
);
export const BrandPinterest = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 20l4 -9" />
		<path d="M10.7 14c.437 1.263 1.43 2 2.55 2c2.071 0 3.75 -1.554 3.75 -4a5 5 0 1 0 -9.7 1.7" />
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
	</Base>
);
export const BrandPlanetscale = (p: IconProps) => (
	<Base {...p}>
		<path d="M20.993 11.63a9 9 0 0 1 -9.362 9.362l9.362 -9.362" />
		<path d="M12 3a9.001 9.001 0 0 1 8.166 5.211l-11.955 11.955a9 9 0 0 1 3.789 -17.166" />
		<path d="M12 12l-6 6" />
	</Base>
);
export const BrandPnpm = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 17h4v4h-4l0 -4" />
		<path d="M10 17h4v4h-4l0 -4" />
		<path d="M17 17h4v4h-4l0 -4" />
		<path d="M17 10h4v4h-4l0 -4" />
		<path d="M17 3h4v4h-4l0 -4" />
		<path d="M10 10h4v4h-4l0 -4" />
		<path d="M10 3h4v4h-4l0 -4" />
		<path d="M3 3h4v4h-4l0 -4" />
	</Base>
);
export const BrandPocket = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 4h14a2 2 0 0 1 2 2v6a9 9 0 0 1 -18 0v-6a2 2 0 0 1 2 -2" />
		<path d="M8 11l4 4l4 -4" />
	</Base>
);
export const BrandPolymer = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.706 6l-3.706 6l3.706 6h1.059l8.47 -12h1.06l3.705 6l-3.706 6" />
	</Base>
);
export const BrandPowershell = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.887 20h11.868c.893 0 1.664 -.665 1.847 -1.592l2.358 -12c.212 -1.081 -.442 -2.14 -1.462 -2.366a1.784 1.784 0 0 0 -.385 -.042h-11.868c-.893 0 -1.664 .665 -1.847 1.592l-2.358 12c-.212 1.081 .442 2.14 1.462 2.366c.127 .028 .256 .042 .385 .042" />
		<path d="M9 8l4 4l-6 4" />
		<path d="M12 16h3" />
	</Base>
);
export const BrandPrintables = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 21l12 -7v-7.5l-6 -3.5l-6 3.5l6 3.5v7.5l-6 -3.5l0 7" />
	</Base>
);
export const BrandPrisma = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.186 16.202l3.615 5.313c.265 .39 .754 .57 1.215 .447l10.166 -2.718a1.086 1.086 0 0 0 .713 -1.511l-7.505 -15.483a.448 .448 0 0 0 -.787 -.033l-7.453 12.838a1.07 1.07 0 0 0 .037 1.147l-.001 0" />
		<path d="M8.5 22l3.5 -20" />
	</Base>
);
export const BrandProducthunt = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 16v-8h2.5a2.5 2.5 0 1 1 0 5h-2.5" />
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
	</Base>
);
export const BrandPushbullet = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M11 8v8h2a4 4 0 1 0 0 -8h-2" />
		<path d="M8 8v8" />
	</Base>
);
export const BrandPushover = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.16 10.985c-.83 -1.935 1.53 -7.985 8.195 -7.985c3.333 0 4.645 1.382 4.645 3.9c0 2.597 -2.612 6.1 -9 6.1" />
		<path d="M12.5 6l-5.5 15" />
	</Base>
);
export const BrandPython = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 9h-7a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h3" />
		<path d="M12 15h7a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-3" />
		<path d="M8 9v-4a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v5a2 2 0 0 1 -2 2h-4a2 2 0 0 0 -2 2v5a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4" />
		<path d="M11 6l0 .01" />
		<path d="M13 18l0 .01" />
	</Base>
);
export const BrandQq = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 9.748a14.716 14.716 0 0 0 11.995 -.052c.275 -9.236 -11.104 -11.256 -11.995 .052" />
		<path d="M18 10c.984 2.762 1.949 4.765 2 7.153c.014 .688 -.664 1.346 -1.184 .303c-.346 -.696 -.952 -1.181 -1.816 -1.456" />
		<path d="M17 16c.031 1.831 .147 3.102 -1 4" />
		<path d="M8 20c-1.099 -.87 -.914 -2.24 -1 -4" />
		<path d="M6 10c-.783 2.338 -1.742 4.12 -1.968 6.43c-.217 2.227 .716 1.644 1.16 .917c.296 -.487 .898 -.934 1.808 -1.347" />
		<path d="M15.898 13l-.476 -2" />
		<path d="M8 20l-1.5 1c-.5 .5 -.5 1 .5 1h10c1 0 1 -.5 .5 -1l-1.5 -1" />
		<path d="M12.75 7a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M9.25 7a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
	</Base>
);
export const BrandRadixUi = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 5.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
		<path d="M6 3h5v5h-5l0 -5" />
		<path d="M11 11v10a5 5 0 0 1 -.217 -9.995l.217 -.005" />
	</Base>
);
export const BrandReact = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" />
		<path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" />
		<path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" />
		<path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" />
		<path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" />
		<path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" />
		<path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732" />
	</Base>
);
export const BrandReactNative = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.357 9c-2.637 .68 -4.357 1.845 -4.357 3.175c0 2.107 4.405 3.825 9.85 3.825c.74 0 1.26 -.039 1.95 -.097" />
		<path d="M9.837 15.9c-.413 -.596 -.806 -1.133 -1.18 -1.8c-2.751 -4.9 -3.488 -9.77 -1.63 -10.873c1.15 -.697 3.047 .253 4.974 2.254" />
		<path d="M6.429 15.387c-.702 2.688 -.56 4.716 .56 5.395c1.783 1.08 5.387 -1.958 8.043 -6.804c.36 -.67 .683 -1.329 .968 -1.978" />
		<path d="M12 18.52c1.928 2 3.817 2.95 4.978 2.253c1.85 -1.102 1.121 -5.972 -1.633 -10.873c-.384 -.677 -.777 -1.204 -1.18 -1.8" />
		<path d="M17.66 15c2.612 -.687 4.34 -1.85 4.34 -3.176c0 -2.11 -4.408 -3.824 -9.845 -3.824c-.747 0 -1.266 .029 -1.955 .087" />
		<path d="M8 12c.285 -.66 .607 -1.308 .968 -1.978c2.647 -4.844 6.253 -7.89 8.046 -6.801c1.11 .679 1.262 2.706 .56 5.393" />
		<path d="M12.26 12.015h-.01c-.01 .13 -.12 .24 -.26 .24a.263 .263 0 0 1 -.25 -.26c0 -.14 .11 -.25 .24 -.25h-.01c.13 -.01 .25 .11 .25 .24" />
	</Base>
);
export const BrandReason = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" />
		<path d="M18 18h-3v-6h3" />
		<path d="M18 15h-3" />
		<path d="M8 18v-6h2.5a1.5 1.5 0 0 1 0 3h-2.5" />
		<path d="M12 18l-2 -3" />
	</Base>
);
export const BrandReddit = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 8c2.648 0 5.028 .826 6.675 2.14a2.5 2.5 0 0 1 2.326 4.36c0 3.59 -4.03 6.5 -9 6.5c-4.875 0 -8.845 -2.8 -9 -6.294l-1 -.206a2.5 2.5 0 0 1 2.326 -4.36c1.646 -1.313 4.026 -2.14 6.674 -2.14l.999 0" />
		<path d="M12 8l1 -5l6 1" />
		<path d="M18 4a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M8.5 13a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0" fill="currentColor" />
		<path d="M14.5 13a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0" fill="currentColor" />
		<path d="M10 17c.667 .333 1.333 .5 2 .5s1.333 -.167 2 -.5" />
	</Base>
);
export const BrandRedhat = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 10.5l1.436 -4c.318 -.876 .728 -1.302 1.359 -1.302c.219 0 1.054 .365 1.88 .583c.825 .219 .733 -.329 .908 -.487c.176 -.158 .355 -.294 .61 -.294c.242 0 .553 .048 1.692 .448c.759 .267 1.493 .574 2.204 .922c1.175 .582 1.426 .913 1.595 1.507l.816 4.623c2.086 .898 3.5 2.357 3.5 3.682c0 1.685 -1.2 3.818 -5.957 3.818c-6.206 0 -14.043 -4.042 -14.043 -7.32c0 -1.044 1.333 -1.77 4 -2.18" />
		<path d="M6 10.5c0 .969 4.39 3.5 9.5 3.5c1.314 0 3 .063 3 -1.5" />
	</Base>
);
export const BrandRedux = (p: IconProps) => (
	<Base {...p}>
		<path d="M16.54 7c-.805 -2.365 -2.536 -4 -4.54 -4c-2.774 0 -5.023 2.632 -5.023 6.496c0 1.956 1.582 4.727 2.512 6" />
		<path d="M4.711 11.979c-1.656 1.877 -2.214 4.185 -1.211 5.911c1.387 2.39 5.138 2.831 8.501 .9c1.703 -.979 2.875 -3.362 3.516 -4.798" />
		<path d="M15.014 19.99c2.511 0 4.523 -.438 5.487 -2.1c1.387 -2.39 -.215 -5.893 -3.579 -7.824c-1.702 -.979 -4.357 -1.235 -5.927 -1.07" />
		<path d="M10.493 9.862c.48 .276 1.095 .112 1.372 -.366a1 1 0 0 0 -.367 -1.365a1.007 1.007 0 0 0 -1.373 .366a1 1 0 0 0 .368 1.365" />
		<path d="M8.5 15.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M14.5 14a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
	</Base>
);
export const BrandRevolut = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 10h3v10h-3l0 -10" />
		<path d="M14.5 4h-9.5v3h9.4a1.5 1.5 0 0 1 0 3h-3.4v4l4 6h4l-5 -7h.5a4.5 4.5 0 1 0 0 -9" />
	</Base>
);
export const BrandRumble = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.993 9.108c.383 .4 .687 .863 .893 1.368a4.195 4.195 0 0 1 .006 3.166a4.37 4.37 0 0 1 -.887 1.372a20.233 20.233 0 0 1 -2.208 2a20.615 20.615 0 0 1 -2.495 1.669a21.322 21.322 0 0 1 -5.622 2.202a4.213 4.213 0 0 1 -3.002 -.404a3.98 3.98 0 0 1 -1.163 -.967a3.796 3.796 0 0 1 -.695 -1.312c-1.199 -3.902 -1.022 -8.312 .134 -12.23c.609 -2.057 2.643 -3.349 4.737 -2.874c3.88 .88 7.52 3.147 10.302 6.01" />
		<path d="M14.044 13.034c.67 -.505 .67 -1.489 0 -2.01a14.824 14.824 0 0 0 -1.498 -1.044a15.783 15.783 0 0 0 -1.62 -.865c-.77 -.35 -1.63 .139 -1.753 .973a15.385 15.385 0 0 0 -.1 3.786a1.232 1.232 0 0 0 1.715 1.027a14.783 14.783 0 0 0 1.694 -.827a14.46 14.46 0 0 0 1.562 -1.035v-.005" />
	</Base>
);
export const BrandRust = (p: IconProps) => (
	<Base {...p}>
		<path d="M10.139 3.463c.473 -1.95 3.249 -1.95 3.722 0a1.916 1.916 0 0 0 2.859 1.185c1.714 -1.045 3.678 .918 2.633 2.633a1.916 1.916 0 0 0 1.184 2.858c1.95 .473 1.95 3.249 0 3.722a1.916 1.916 0 0 0 -1.185 2.859c1.045 1.714 -.918 3.678 -2.633 2.633a1.916 1.916 0 0 0 -2.858 1.184c-.473 1.95 -3.249 1.95 -3.722 0a1.916 1.916 0 0 0 -2.859 -1.185c-1.714 1.045 -3.678 -.918 -2.633 -2.633a1.916 1.916 0 0 0 -1.184 -2.858c-1.95 -.473 -1.95 -3.249 0 -3.722a1.916 1.916 0 0 0 1.185 -2.859c-1.045 -1.714 .918 -3.678 2.633 -2.633a1.914 1.914 0 0 0 2.858 -1.184" />
		<path d="M8 12h6a2 2 0 1 0 0 -4h-6v8v-4" />
		<path d="M19 16h-2a2 2 0 0 1 -2 -2a2 2 0 0 0 -2 -2h-1" />
		<path d="M9 8h-4" />
		<path d="M5 16h4" />
	</Base>
);
export const BrandSafari = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 16l2 -6l6 -2l-2 6l-6 2" />
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
	</Base>
);
export const BrandSamsungpass = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -7" />
		<path d="M7 10v-1.862c0 -2.838 2.239 -5.138 5 -5.138s5 2.3 5 5.138v1.862" />
		<path d="M10.485 17.577c.337 .29 .7 .423 1.515 .423h.413c.323 0 .633 -.133 .862 -.368a1.27 1.27 0 0 0 .356 -.886c0 -.332 -.128 -.65 -.356 -.886a1.203 1.203 0 0 0 -.862 -.368h-.826a1.2 1.2 0 0 1 -.861 -.367a1.27 1.27 0 0 1 -.356 -.886c0 -.332 .128 -.651 .356 -.886a1.2 1.2 0 0 1 .861 -.368h.413c.816 0 1.178 .133 1.515 .423" />
	</Base>
);
export const BrandSass = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M12 10.523c2.46 -.826 4 -.826 4 -2.155c0 -1.366 -1.347 -1.366 -2.735 -1.366c-1.91 0 -3.352 .49 -4.537 1.748c-.848 .902 -1.027 2.449 -.153 3.307c.973 .956 3.206 1.789 2.884 3.493c-.233 1.235 -1.469 1.823 -2.617 1.202c-.782 -.424 -.454 -1.746 .626 -2.512s2.822 -.992 4.1 -.24c.98 .575 1.046 1.724 .434 2.193" />
	</Base>
);
export const BrandSentry = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 18a1.93 1.93 0 0 0 .306 1.076a2 2 0 0 0 1.584 .924c.646 .033 -.537 0 .11 0h3a4.992 4.992 0 0 0 -3.66 -4.81c.558 -.973 1.24 -2.149 2.04 -3.531a9 9 0 0 1 5.62 8.341h4c.663 0 2.337 0 3 0a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-1.84 3.176c4.482 2.05 7.6 6.571 7.6 11.824" />
	</Base>
);
export const BrandSharik = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.281 16.606a8.968 8.968 0 0 1 1.363 -10.977a9.033 9.033 0 0 1 11.011 -1.346c-1.584 4.692 -2.415 6.96 -4.655 8.717c-1.584 1.242 -3.836 2.24 -7.719 3.606m16.335 -7.306c2.113 7.59 -4.892 13.361 -11.302 11.264c1.931 -3.1 3.235 -4.606 4.686 -6.065c1.705 -1.715 3.591 -3.23 6.616 -5.199" />
	</Base>
);
export const BrandShazam = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 12l2 -2a2.828 2.828 0 0 1 4 0a2.828 2.828 0 0 1 0 4l-3 3" />
		<path d="M14 12l-2 2a2.828 2.828 0 1 1 -4 -4l3 -3" />
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
	</Base>
);
export const BrandShopee = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 7l.867 12.143a2 2 0 0 0 2 1.857h10.276a2 2 0 0 0 2 -1.857l.867 -12.143h-16l-.01 0" />
		<path d="M8.5 7c0 -1.653 1.5 -4 3.5 -4s3.5 2.347 3.5 4" />
		<path d="M9.5 17c.413 .462 1 1 2.5 1s2.5 -.897 2.5 -2s-1 -1.5 -2.5 -2s-2 -1.47 -2 -2c0 -1.104 1 -2 2 -2s1.5 0 2.5 1" />
	</Base>
);
export const BrandSketch = (p: IconProps) => (
	<Base {...p}>
		<path d="M3.262 10.878l8 8.789c.4 .44 1.091 .44 1.491 0l8 -8.79c.313 -.344 .349 -.859 .087 -1.243l-3.537 -5.194a1 1 0 0 0 -.823 -.436h-8.926a1 1 0 0 0 -.823 .436l-3.54 5.192c-.263 .385 -.227 .901 .087 1.246l-.016 0" />
	</Base>
);
export const BrandSkype = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 3a9 9 0 0 1 8.603 11.65a4.5 4.5 0 0 1 -5.953 5.953a9 9 0 0 1 -11.253 -11.253a4.5 4.5 0 0 1 5.953 -5.954a8.987 8.987 0 0 1 2.65 -.396" />
		<path d="M8 14.5c.5 2 2.358 2.5 4 2.5c2.905 0 4 -1.187 4 -2.5c0 -1.503 -1.927 -2.5 -4 -2.5s-4 -1 -4 -2.5c0 -1.313 1.095 -2.5 4 -2.5c1.642 0 3.5 .5 4 2.5" />
	</Base>
);
export const BrandSlack = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 12v-6a2 2 0 0 1 4 0v6m0 -2a2 2 0 1 1 2 2h-6" />
		<path d="M12 12h6a2 2 0 0 1 0 4h-6m2 0a2 2 0 1 1 -2 2v-6" />
		<path d="M12 12v6a2 2 0 0 1 -4 0v-6m0 2a2 2 0 1 1 -2 -2h6" />
		<path d="M12 12h-6a2 2 0 0 1 0 -4h6m-2 0a2 2 0 1 1 2 -2v6" />
	</Base>
);
export const BrandSnapchat = (p: IconProps) => (
	<Base {...p}>
		<path d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118m-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118" />
	</Base>
);
export const BrandSnapseed = (p: IconProps) => (
	<Base {...p}>
		<path d="M8.152 3.115a.46 .46 0 0 0 -.609 0c-2.943 2.58 -4.529 5.441 -4.543 8.378c0 2.928 1.586 5.803 4.543 8.392a.46 .46 0 0 0 .61 0c2.957 -2.589 4.547 -5.464 4.547 -8.392c0 -2.928 -1.6 -5.799 -4.548 -8.378" />
		<path d="M8 20l12.09 -.011c.503 0 .91 -.434 .91 -.969v-6.063c0 -.535 -.407 -.968 -.91 -.968h-7.382" />
	</Base>
);
export const BrandSnowflake = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 21v-5.5l4.5 2.5" />
		<path d="M10 21v-5.5l-4.5 2.5" />
		<path d="M3.5 14.5l4.5 -2.5l-4.5 -2.5" />
		<path d="M20.5 9.5l-4.5 2.5l4.5 2.5" />
		<path d="M10 3v5.5l-4.5 -2.5" />
		<path d="M14 3v5.5l4.5 -2.5" />
		<path d="M12 11l1 1l-1 1l-1 -1l1 -1" />
	</Base>
);
export const BrandSocketIo = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M11 11h1l3 -4l-4 4" />
		<path d="M12 13h1l-4 4l3 -4" />
	</Base>
);
export const BrandSolidjs = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 17.5c4.667 3 8 4.5 10 4.5c2.5 0 4 -1.5 4 -3.5s-1.5 -3.5 -4 -3.5c-2 0 -5.333 .833 -10 2.5" />
		<path d="M5 13.5c4.667 -1.667 8 -2.5 10 -2.5c2.5 0 4 1.5 4 3.5c0 .738 -.204 1.408 -.588 1.96l-2.883 3.825" />
		<path d="M22 6.5c-4 -3 -8 -4.5 -10 -4.5c-2.04 0 -2.618 .463 -3.419 1.545" />
		<path d="M2 17.5l3 -4" />
		<path d="M22 6.5l-3 4" />
		<path d="M8.581 3.545l-2.953 3.711" />
		<path d="M7.416 12.662c-1.51 -.476 -2.416 -1.479 -2.416 -3.162c0 -2.5 1.5 -3.5 4 -3.5c1.688 0 5.087 1.068 8.198 3.204a114.76 114.76 0 0 1 1.802 1.296l-2.302 .785" />
	</Base>
);
export const BrandSoundcloud = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 11h1c1.38 0 3 1.274 3 3c0 1.657 -1.5 3 -3 3l-6 0v-10c3 0 4.5 1.5 5 4" />
		<path d="M9 8l0 9" />
		<path d="M6 17l0 -7" />
		<path d="M3 16l0 -2" />
	</Base>
);
export const BrandSpacehey = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M14 20h6v-6a3 3 0 0 0 -6 0v6" />
		<path d="M11 8v2.5a3.5 3.5 0 0 1 -3.5 3.5h-.5a3 3 0 0 1 0 -6h4" />
	</Base>
);
export const BrandSpeedtest = (p: IconProps) => (
	<Base {...p}>
		<path d="M5.636 19.364a9 9 0 1 1 12.728 0" />
		<path d="M16 9l-4 4" />
	</Base>
);
export const BrandSpotify = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527" />
		<path d="M9 15c1.5 -1 4 -1 5 .5" />
		<path d="M7 9c2 -1 6 -2 10 .5" />
	</Base>
);
export const BrandStackoverflow = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-1" />
		<path d="M8 16h8" />
		<path d="M8.322 12.582l7.956 .836" />
		<path d="M8.787 9.168l7.826 1.664" />
		<path d="M10.096 5.764l7.608 2.472" />
	</Base>
);
export const BrandStackshare = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M17 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M3 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M7 12h3l3.5 6h3.5" />
		<path d="M17 6h-3.5l-3.5 6" />
	</Base>
);
export const BrandSteam = (p: IconProps) => (
	<Base {...p}>
		<path d="M16.5 5a4.5 4.5 0 1 1 -.653 8.953l-4.347 3.009l0 .038a3 3 0 0 1 -2.824 3l-.176 0a3 3 0 0 1 -2.94 -2.402l-2.56 -1.098v-3.5l3.51 1.755a2.989 2.989 0 0 1 2.834 -.635l2.727 -3.818a4.5 4.5 0 0 1 4.429 -5.302" />
		<path d="M15.5 9.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" fill="currentColor" />
	</Base>
);
export const BrandStellar = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 6l-17 7v-1c-.004 -1.259 .234 -2.5 .81 -3.62c1.363 -2.686 4.178 -4.378 7.19 -4.38a7.5 7.5 0 0 1 2.61 .46" />
		<path d="M9.38 19.54a8 8 0 0 0 9.81 -3.92c.576 -1.12 .814 -2.361 .81 -3.62v-1l-17 7" />
	</Base>
);
export const BrandStocktwits = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 3l-8 4.5l8 4.5" />
		<path d="M8 12l8 4.5l-8 4.5" />
	</Base>
);
export const BrandStorj = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 17a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M3 7a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M19 17a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M19 7a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M11 3a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M11 21a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M12 21l-8 -4v-10l8 -4l8 4v10l-8 4" />
		<path d="M9.1 15a2.1 2.1 0 0 1 -.648 -4.098c.282 -1.648 1.319 -2.902 3.048 -2.902c1.694 0 2.906 1.203 3.23 2.8h.17a2.1 2.1 0 0 1 .202 4.19l-.202 .01h-5.8" />
		<path d="M4 7l4.323 2.702" />
		<path d="M16.413 14.758l3.587 2.242" />
		<path d="M4 17l3.529 -2.206" />
		<path d="M14.609 10.37l5.391 -3.37" />
		<path d="M12 3v5" />
		<path d="M12 15v6" />
	</Base>
);
export const BrandStorybook = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 4l.5 16.5l13.5 .5v-18l-14 1" />
		<path d="M9 15c.6 1.5 1.639 2 3.283 2h-.283c1.8 0 3 -.974 3 -2.435c0 -1.194 -.831 -1.799 -2.147 -2.333l-1.975 -.802c-1.15 -.467 -1.878 -1.422 -1.878 -2.467c0 -.97 .899 -1.786 2.087 -1.893l.613 -.055c1.528 -.138 3 .762 3.3 1.985" />
		<path d="M16 3.5v1" />
	</Base>
);
export const BrandStorytel = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.103 22c2.292 -2.933 16.825 -2.43 16.825 -11.538c0 -6.298 -4.974 -8.462 -8.451 -8.462c-3.477 0 -9.477 3.036 -9.477 11.241c0 6.374 1.103 8.759 1.103 8.759" />
	</Base>
);
export const BrandStrava = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 13l-5 -10l-5 10m6 0l4 8l4 -8" />
	</Base>
);
export const BrandStripe = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.453 8.056c0 -.623 .518 -.979 1.442 -.979c1.69 0 3.41 .343 4.605 .923l.5 -4c-.948 -.449 -2.82 -1 -5.5 -1c-1.895 0 -3.373 .087 -4.5 1c-1.172 .956 -2 2.33 -2 4c0 3.03 1.958 4.906 5 6c1.961 .69 3 .743 3 1.5c0 .735 -.851 1.5 -2 1.5c-1.423 0 -3.963 -.609 -5.5 -1.5l-.5 4c1.321 .734 3.474 1.5 6 1.5c2 0 3.957 -.468 5.084 -1.36c1.263 -.979 1.916 -2.268 1.916 -4.14c0 -3.096 -1.915 -4.547 -5 -5.637c-1.646 -.605 -2.544 -1.07 -2.544 -1.807l-.003 0" />
	</Base>
);
export const BrandSublimeText = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 8l-14 4.5v-5.5l14 -4.5l0 5.5" />
		<path d="M19 17l-14 4.5v-5.5l14 -4.5l0 5.5" />
		<path d="M19 11.5l-14 -4.5" />
		<path d="M5 12.5l14 4.5" />
	</Base>
);
export const BrandSugarizer = (p: IconProps) => (
	<Base {...p}>
		<path d="M14.277 16l3.252 -3.252a1.61 1.61 0 0 0 -2.277 -2.276l-3.252 3.251l-3.252 -3.251a1.61 1.61 0 0 0 -2.276 2.276l3.251 3.252l-3.251 3.252a1.61 1.61 0 1 0 2.276 2.277l3.252 -3.252l3.252 3.252a1.61 1.61 0 1 0 2.277 -2.277l-3.252 -3.252" />
		<path d="M9 5a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
	</Base>
);
export const BrandSupabase = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 14h8v7l8 -11h-8v-7l-8 11" />
	</Base>
);
export const BrandSuperhuman = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 12l4 3l-8 7l-8 -7l4 -3" />
		<path d="M12 3l-8 6l8 6l8 -6l-8 -6" />
		<path d="M12 15h8" />
	</Base>
);
export const BrandSupernova = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M15 15h.5c3.038 0 5.5 -1.343 5.5 -3s-2.462 -3 -5.5 -3c-1.836 0 -3.462 .49 -4.46 1.245" />
		<path d="M9 9h-.5c-3.038 0 -5.5 1.343 -5.5 3s2.462 3 5.5 3c1.844 0 3.476 -.495 4.474 -1.255" />
		<path d="M15 9v-.5c0 -3.038 -1.343 -5.5 -3 -5.5s-3 2.462 -3 5.5c0 1.833 .49 3.457 1.241 4.456" />
		<path d="M9 15v.5c0 3.038 1.343 5.5 3 5.5s3 -2.462 3 -5.5c0 -1.842 -.494 -3.472 -1.252 -4.47" />
	</Base>
);
export const BrandSurfshark = (p: IconProps) => (
	<Base {...p}>
		<path d="M19.954 9.447c-.237 -6.217 0 -6.217 -6 -6.425c-5.774 -.208 -6.824 1 -7.91 5.382c-2.884 11.816 -3.845 14.716 4.792 11.198c9.392 -3.831 9.297 -5.382 9.114 -10.155l.004 0" />
		<path d="M8 16h.452c1.943 .007 3.526 -1.461 3.543 -3.286v-2.428c.018 -1.828 1.607 -3.298 3.553 -3.286h.452" />
	</Base>
);
export const BrandSvelte = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 8l-5 3l.821 -.495c1.86 -1.15 4.412 -.49 5.574 1.352a3.91 3.91 0 0 1 -1.264 5.42l-5.053 3.126c-1.86 1.151 -4.312 .591 -5.474 -1.251a3.91 3.91 0 0 1 1.263 -5.42l.26 -.16" />
		<path d="M8 17l5 -3l-.822 .496c-1.86 1.151 -4.411 .491 -5.574 -1.351a3.91 3.91 0 0 1 1.264 -5.42l5.054 -3.127c1.86 -1.15 4.311 -.59 5.474 1.252a3.91 3.91 0 0 1 -1.264 5.42l-.26 .16" />
	</Base>
);
export const BrandSwift = (p: IconProps) => (
	<Base {...p}>
		<path d="M20.547 15.828c1.33 -4.126 -1.384 -9.521 -6.047 -12.828c-.135 -.096 2.39 6.704 1.308 9.124c-2.153 -1.454 -4.756 -3.494 -7.808 -6.124l-.5 2l-3.5 -1c4.36 4.748 7.213 7.695 8.56 8.841c-4.658 2.089 -10.65 -.978 -10.56 -.841c1.016 1.545 6 6 11 6c2 0 3.788 -.502 4.742 -1.389c.005 -.005 .432 -.446 1.378 -.17c.504 .148 1.463 .667 2.88 1.559v-1.507c0 -1.377 -.515 -2.67 -1.453 -3.665" />
	</Base>
);
export const BrandSymfony = (p: IconProps) => (
	<Base {...p}>
		<path d="M6 13c.458 .667 1.125 1 2 1c1.313 0 2 -.875 2 -1.5c0 -1.5 -2 -1 -2 -2c0 -.625 .516 -1.5 1.5 -1.5c2.5 0 1.563 2 5.5 2c.667 0 1 -.333 1 -1" />
		<path d="M9 17c-.095 .667 .238 1 1 1c1.714 0 2.714 -2 3 -6c.286 -4 1.571 -6 3 -6c.571 0 .905 .333 1 1" />
		<path d="M22 12c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10a10 10 0 0 1 10 10" />
	</Base>
);
export const BrandTabler = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 9l3 3l-3 3" />
		<path d="M13 15h3" />
		<path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
	</Base>
);
export const BrandTabnine = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 12l-12 6.75m12 -6.75l-12 -6.75m12 6.75v-4.527l-8 -4.473l-4 2.25m12 6.75v4.5l-8 4.5l-4 -2.25m0 -13.5l-4 2.222v9.028l4 2.25l12 -6.75" />
	</Base>
);
export const BrandTailwind = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968m-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968" />
	</Base>
);
export const BrandTaobao = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 5c.968 .555 1.335 1.104 2 2" />
		<path d="M2 10c5.007 3.674 2.85 6.544 0 10" />
		<path d="M10 4c-.137 4.137 -2.258 5.286 -3.709 6.684" />
		<path d="M10 6c2.194 -.8 3.736 -.852 6.056 -.993c4.206 -.158 5.523 2.264 5.803 5.153c.428 4.396 -.077 7.186 -2.117 9.298c-1.188 1.23 -3.238 2.62 -7.207 .259" />
		<path d="M11 10h6" />
		<path d="M13 10v6.493" />
		<path d="M8 13h10" />
		<path d="M16 15.512l.853 1.72" />
		<path d="M16.5 17c-1.145 .361 -7 3 -8.5 -.5" />
		<path d="M11.765 8.539l-1.765 2.461" />
	</Base>
);
export const BrandTeams = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 7h10v10h-10l0 -10" />
		<path d="M6 10h4" />
		<path d="M8 10v4" />
		<path d="M8.104 17c.47 2.274 2.483 4 4.896 4a5 5 0 0 0 5 -5v-7h-5" />
		<path d="M18 18a4 4 0 0 0 4 -4v-5h-4" />
		<path d="M13.003 8.83a3 3 0 1 0 -1.833 -1.833" />
		<path d="M15.83 8.36a2.5 2.5 0 1 0 .594 -4.117" />
	</Base>
);
export const BrandTed = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 8h4" />
		<path d="M4 8v8" />
		<path d="M13 8h-4v8h4" />
		<path d="M9 12h2.5" />
		<path d="M16 8v8h2a3 3 0 0 0 3 -3v-2a3 3 0 0 0 -3 -3h-2" />
	</Base>
);
export const BrandTelegram = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
	</Base>
);
export const BrandTerraform = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 15.5l-11.476 -6.216a1 1 0 0 1 -.524 -.88v-4.054a1.35 1.35 0 0 1 2.03 -1.166l9.97 5.816v10.65a1.35 1.35 0 0 1 -2.03 1.166l-3.474 -2.027a1 1 0 0 1 -.496 -.863v-11.926" />
		<path d="M15 15.5l5.504 -3.21a1 1 0 0 0 .496 -.864v-3.576a1.35 1.35 0 0 0 -2.03 -1.166l-3.97 2.316" />
	</Base>
);
export const BrandTesla = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 21l3 -11c2.359 0 3 0 3 1c0 0 1.18 -1.745 2 -3c-3.077 -1.464 -6 -1 -6 -1l-2 2l-2 -2s-2.923 -.464 -6 1c.82 1.255 2 3 2 3c0 -1 .744 -1 3 -1l3 11" />
		<path d="M20 5c-5.114 -2 -10.886 -2 -16 0" />
	</Base>
);
export const BrandTether = (p: IconProps) => (
	<Base {...p}>
		<path d="M14.08 20.188c-1.15 1.083 -3.02 1.083 -4.17 0l-6.93 -6.548c-.96 -.906 -1.27 -2.624 -.69 -3.831l2.4 -5.018c.47 -.991 1.72 -1.791 2.78 -1.791h9.06c1.06 0 2.31 .802 2.78 1.79l2.4 5.019c.58 1.207 .26 2.925 -.69 3.83c-3.453 3.293 -3.466 3.279 -6.94 6.549" />
		<path d="M12 15v-7" />
		<path d="M8 8h8" />
	</Base>
);
export const BrandThingiverse = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M8 9h8m-4 0v8" />
	</Base>
);
export const BrandThreads = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 7.5c-1.333 -3 -3.667 -4.5 -7 -4.5c-5 0 -8 2.5 -8 9s3.5 9 8 9s7 -3 7 -5s-1 -5 -7 -5c-2.5 0 -3 1.25 -3 2.5c0 1.5 1 2.5 2.5 2.5c2.5 0 3.5 -1.5 3.5 -5s-2 -4 -3 -4s-1.833 .333 -2.5 1" />
	</Base>
);
export const BrandThreejs = (p: IconProps) => (
	<Base {...p}>
		<path d="M8 22l-5 -19l19 5.5l-14 13.5" />
		<path d="M12.573 17.58l-6.152 -1.576l8.796 -9.466l1.914 6.64" />
		<path d="M12.573 17.58l-1.573 -6.58l6.13 2.179" />
		<path d="M9.527 4.893l1.473 6.107l-6.31 -1.564l4.837 -4.543" />
	</Base>
);
export const BrandTidal = (p: IconProps) => (
	<Base {...p}>
		<path d="M5.333 6l3.334 3.25l3.333 -3.25l3.333 3.25l3.334 -3.25l3.333 3.25l-3.333 3.25l-3.334 -3.25l-3.333 3.25l3.333 3.25l-3.333 3.25l-3.333 -3.25l3.333 -3.25l-3.333 -3.25l-3.334 3.25l-3.333 -3.25l3.333 -3.25" />
	</Base>
);
export const BrandTiktok = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917" />
	</Base>
);
export const BrandTinder = (p: IconProps) => (
	<Base {...p}>
		<path d="M18.918 8.174c2.56 4.982 .501 11.656 -5.38 12.626c-7.702 1.687 -12.84 -7.716 -7.054 -13.229c.309 -.305 1.161 -1.095 1.516 -1.349c0 .528 .27 3.475 1 3.167c3 0 4 -4.222 3.587 -7.389c2.7 1.411 4.987 3.376 6.331 6.174" />
	</Base>
);
export const BrandTopbuzz = (p: IconProps) => (
	<Base {...p}>
		<path d="M4.417 8.655a.524 .524 0 0 1 -.405 -.622l.986 -4.617a.524 .524 0 0 1 .626 -.404l14.958 3.162c.285 .06 .467 .339 .406 .622l-.987 4.618a.524 .524 0 0 1 -.625 .404l-4.345 -.92c-.198 -.04 -.315 .024 -.353 .197l-2.028 9.49a.527 .527 0 0 1 -.625 .404l-4.642 -.982a.527 .527 0 0 1 -.406 -.622l2.028 -9.493c.037 -.17 -.031 -.274 -.204 -.31l-4.384 -.927" />
	</Base>
);
export const BrandTorchain = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.588 15.537l-3.553 -3.537l-7.742 8.18c-.791 .85 .153 2.18 1.238 1.73l9.616 -4.096a1.398 1.398 0 0 0 .44 -2.277" />
		<path d="M8.412 8.464l3.553 3.536l7.742 -8.18c.791 -.85 -.153 -2.18 -1.238 -1.73l-9.616 4.098a1.398 1.398 0 0 0 -.44 2.277l-.001 -.001" />
	</Base>
);
export const BrandToyota = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 12a10 7 0 1 0 20 0a10 7 0 1 0 -20 0" />
		<path d="M9 12c0 3.866 1.343 7 3 7s3 -3.134 3 -7s-1.343 -7 -3 -7s-3 3.134 -3 7" />
		<path d="M6.415 6.191c-.888 .503 -1.415 1.13 -1.415 1.809c0 1.657 3.134 3 7 3s7 -1.343 7 -3c0 -.678 -.525 -1.304 -1.41 -1.806" />
	</Base>
);
export const BrandTrello = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
		<path d="M7 7h3v10h-3l0 -10" />
		<path d="M14 7h3v6h-3l0 -6" />
	</Base>
);
export const BrandTripadvisor = (p: IconProps) => (
	<Base {...p}>
		<path d="M5 13.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" />
		<path d="M16 13.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" />
		<path d="M17.5 9a4.5 4.5 0 1 0 3.5 1.671l1 -1.671h-4.5" />
		<path d="M6.5 9a4.5 4.5 0 1 1 -3.5 1.671l-1 -1.671h4.5" />
		<path d="M10.5 15.5l1.5 2l1.5 -2" />
		<path d="M9 6.75c2 -.667 4 -.667 6 0" />
	</Base>
);
export const BrandTumblr = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 21h4v-4h-4v-6h4v-4h-4v-4h-4v1a3 3 0 0 1 -3 3h-1v4h4v6a4 4 0 0 0 4 4" />
	</Base>
);
export const BrandTwilio = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 12a9 9 0 1 1 -18 0a9 9 0 0 1 18 0" />
		<path d="M8 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M14 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M14 15a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M8 15a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
	</Base>
);
export const BrandTwitch = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 5v11a1 1 0 0 0 1 1h2v4l4 -4h5.584c.266 0 .52 -.105 .707 -.293l2.415 -2.414c.187 -.188 .293 -.442 .293 -.708v-8.585a1 1 0 0 0 -1 -1h-14a1 1 0 0 0 -1 1l.001 0" />
		<path d="M16 8l0 4" />
		<path d="M12 8l0 4" />
	</Base>
);
export const BrandTwitter = (p: IconProps) => (
	<Base {...p}>
		<path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013l0 .001" />
	</Base>
);
export const BrandTypescript = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 17.5c.32 .32 .754 .5 1.207 .5h.543c.69 0 1.25 -.56 1.25 -1.25v-.25a1.5 1.5 0 0 0 -1.5 -1.5a1.5 1.5 0 0 1 -1.5 -1.5v-.25c0 -.69 .56 -1.25 1.25 -1.25h.543c.453 0 .887 .18 1.207 .5" />
		<path d="M9 12h4" />
		<path d="M11 12v6" />
		<path d="M21 19v-14a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2" />
	</Base>
);
export const BrandUber = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M9 10a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
		<path d="M3 12h6" />
	</Base>
);
export const BrandUbuntu = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M17.723 7.41a7.992 7.992 0 0 0 -3.74 -2.162m-3.971 0a7.993 7.993 0 0 0 -3.789 2.216m-1.881 3.215a8 8 0 0 0 -.342 2.32c0 .738 .1 1.453 .287 2.132m1.96 3.428a7.993 7.993 0 0 0 3.759 2.19m4 0a7.993 7.993 0 0 0 3.747 -2.186m1.962 -3.43a8.008 8.008 0 0 0 .287 -2.131c0 -.764 -.107 -1.503 -.307 -2.203" />
		<path d="M3 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M17 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
	</Base>
);
export const BrandUnity = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 3l6 4v7" />
		<path d="M18 17l-6 4l-6 -4" />
		<path d="M4 14v-7l6 -4" />
		<path d="M4 7l8 5v9" />
		<path d="M20 7l-8 5" />
	</Base>
);
export const BrandUnsplash = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 11h5v4h6v-4h5v9h-16v-9" />
		<path d="M9 4h6v4h-6l0 -4" />
	</Base>
);
export const BrandUpwork = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 7v5a3 3 0 0 0 6 0v-5h1l4 6c.824 1.319 1.945 2 3.5 2a3.5 3.5 0 0 0 0 -7c-2.027 0 -3.137 1 -3.5 3c-.242 1.33 -.908 4 -2 8" />
	</Base>
);
export const BrandValorant = (p: IconProps) => (
	<Base {...p}>
		<path d="M14.5 14h4.5l2 -2v-6l-6.5 8" />
		<path d="M9 19h5l-11 -13v6l6 7" />
	</Base>
);
export const BrandVechain = (p: IconProps) => (
	<Base {...p}>
		<path d="M20 4l-8 16l-8 -16h2.028a4 4 0 0 1 3.578 2.211l2.894 5.789" />
	</Base>
);
export const BrandVercel = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 19h18l-9 -15l-9 15" />
	</Base>
);
export const BrandVimeo = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 8.5l1 1s1.5 -1.102 2 -.5c.509 .609 1.863 7.65 2.5 9c.556 1.184 1.978 2.89 4 1.5c2 -1.5 7.5 -5.5 8.5 -11.5c.444 -2.661 -1 -4 -2.5 -4c-2 0 -4.047 1.202 -4.5 4c2.05 -1.254 2.551 1 1.5 3c-1.052 2 -2 3 -2.5 3c-.49 0 -.924 -1.165 -1.5 -3.5c-.59 -2.42 -.5 -6.5 -3 -6.5s-5.5 4.5 -5.5 4.5" />
	</Base>
);
export const BrandVinted = (p: IconProps) => (
	<Base {...p}>
		<path d="M11.028 6c0 7.695 -.292 11.728 0 12c2.046 -5 4.246 -12.642 5.252 -14.099c.343 -.497 .768 -.93 1.257 -1.277c.603 -.39 1.292 -.76 1.463 -.575c-.07 2.319 -4.023 15.822 -4.209 16.314a6.135 6.135 0 0 1 -3.465 3.386c-3.213 .78 -3.429 -.446 -3.836 -1.134c-.95 -2.103 -1.682 -14.26 -1.445 -15.615c.05 -.523 .143 -1.851 2.491 -2c2.359 -.354 2.547 1.404 2.492 3" />
	</Base>
);
export const BrandVisa = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 15l-1 -6l-2.5 6" />
		<path d="M9 15l1 -6" />
		<path d="M3 9h1v6h.5l2.5 -6" />
		<path d="M16 9.5a.5 .5 0 0 0 -.5 -.5h-.75c-.721 0 -1.337 .521 -1.455 1.233l-.09 .534a1.059 1.059 0 0 0 1.045 1.233a1.059 1.059 0 0 1 1.045 1.233l-.09 .534a1.476 1.476 0 0 1 -1.455 1.233h-.75a.5 .5 0 0 1 -.5 -.5" />
		<path d="M18 14h2.7" />
	</Base>
);
export const BrandVisualStudio = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 8l2 -1l10 13l4 -2v-12l-4 -2l-10 13l-2 -1l0 -8" />
	</Base>
);
export const BrandVite = (p: IconProps) => (
	<Base {...p}>
		<path d="M10 4.5l6 -1.5l-2 6.5l2 -.5l-4 7v-5l-3 1l1 -7.5" />
		<path d="M15 6.5l7 -1.5l-10 17l-10 -17l7.741 1.5" />
	</Base>
);
export const BrandVivaldi = (p: IconProps) => (
	<Base {...p}>
		<path d="M21.648 6.808c-2.468 4.28 -4.937 8.56 -7.408 12.836c-.397 .777 -1.366 1.301 -2.24 1.356c-.962 .102 -1.7 -.402 -2.154 -1.254c-1.563 -2.684 -3.106 -5.374 -4.66 -8.064c-.943 -1.633 -1.891 -3.266 -2.83 -4.905a2.47 2.47 0 0 1 -.06 -2.45a2.493 2.493 0 0 1 2.085 -1.307c.951 -.065 1.85 .438 2.287 1.281c.697 1.19 2.043 3.83 2.55 4.682a3.919 3.919 0 0 0 3.282 2.017c2.126 .133 3.974 -.95 4.21 -3.058c0 -.164 .228 -3.178 .846 -3.962c.619 -.784 1.64 -1.155 2.606 -.893a2.484 2.484 0 0 1 1.814 2.062c.08 .581 -.041 1.171 -.343 1.674" />
	</Base>
);
export const BrandVk = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 19h-4a8 8 0 0 1 -8 -8v-5h4v5a4 4 0 0 0 4 4v-9h4v4.5l.03 0a4.531 4.531 0 0 0 3.97 -4.496h4l-.342 1.711a6.858 6.858 0 0 1 -3.658 4.789a5.34 5.34 0 0 1 3.566 4.111l.434 2.389h-4a4.531 4.531 0 0 0 -3.97 -4.496v4.5l-.03 -.008" />
	</Base>
);
export const BrandVlc = (p: IconProps) => (
	<Base {...p}>
		<path d="M13.79 4.337l3.101 9.305c.33 .985 -.113 2.07 -1.02 2.499a9.148 9.148 0 0 1 -7.742 0c-.907 -.428 -1.35 -1.514 -1.02 -2.499l3.1 -9.305c.267 -.8 .985 -1.337 1.791 -1.337c.807 0 1.525 .537 1.79 1.337" />
		<path d="M7 14h-1.429a2 2 0 0 0 -1.923 1.45l-.571 2a2 2 0 0 0 1.923 2.55h13.998a2 2 0 0 0 1.923 -2.55l-.572 -2a2 2 0 0 0 -1.923 -1.45h-1.426" />
	</Base>
);
export const BrandVolkswagen = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9" />
		<path d="M5 7l4.5 11l1.5 -5h2l1.5 5l4.5 -11" />
		<path d="M9 4l2 6h2l2 -6" />
	</Base>
);
export const BrandVsco = (p: IconProps) => (
	<Base {...p}>
		<path d="M21 12a9 9 0 1 1 -18 0a9 9 0 0 1 18 0" />
		<path d="M17 12a5 5 0 1 0 -10 0a5 5 0 0 0 10 0" />
		<path d="M12 3v4" />
		<path d="M21 12h-4" />
		<path d="M12 21v-4" />
		<path d="M3 12h4" />
		<path d="M18.364 5.636l-2.828 2.828" />
		<path d="M18.364 18.364l-2.828 -2.828" />
		<path d="M5.636 18.364l2.828 -2.828" />
		<path d="M5.636 5.636l2.828 2.828" />
	</Base>
);
export const BrandVscode = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 3v18l4 -2.5v-13l-4 -2.5" />
		<path d="M9.165 13.903l-4.165 3.597l-2 -1l4.333 -4.5m1.735 -1.802l6.932 -7.198v5l-4.795 4.141" />
		<path d="M16 16.5l-11 -10l-2 1l13 13.5" />
	</Base>
);
export const BrandVue = (p: IconProps) => (
	<Base {...p}>
		<path d="M16.5 4l-4.5 8l-4.5 -8" />
		<path d="M3 4l9 16l9 -16" />
	</Base>
);
export const BrandWalmart = (p: IconProps) => (
	<Base {...p}>
		<path d="M12 8.04v-5.04" />
		<path d="M15.5 10l4.5 -2.5" />
		<path d="M15.5 14l4.5 2.5" />
		<path d="M12 15.96v5.04" />
		<path d="M8.5 14l-4.5 2.5" />
		<path d="M8.5 10l-4.5 -2.505" />
	</Base>
);
export const BrandWaze = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.66 17.52a7 7 0 0 1 -3.66 -4.52c2 0 3 -1 3 -2.51c0 -3.92 2.25 -7.49 7.38 -7.49c4.62 0 7.62 3.51 7.62 8a8.08 8.08 0 0 1 -3.39 6.62" />
		<path d="M10 18.69a17.29 17.29 0 0 0 3.33 .3h.54" />
		<path d="M14 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M6 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		<path d="M16 9h.01" />
		<path d="M11 9h.01" />
	</Base>
);
export const BrandWebflow = (p: IconProps) => (
	<Base {...p}>
		<path d="M17 10s-1.376 3.606 -1.5 4c-.046 -.4 -1.5 -8 -1.5 -8c-2.627 0 -3.766 1.562 -4.5 3.5c0 0 -1.843 4.593 -2 5c-.013 -.368 -.5 -4.5 -.5 -4.5c-.15 -2.371 -2.211 -3.98 -4 -3.98l2 12.98c2.745 -.013 4.72 -1.562 5.5 -3.5c0 0 1.44 -4.3 1.5 -4.5c.013 .18 1 8 1 8c2.758 0 4.694 -1.626 5.5 -3.5l3.5 -9.5c-2.732 0 -4.253 2.055 -5 4" />
	</Base>
);
export const BrandWechat = (p: IconProps) => (
	<Base {...p}>
		<path d="M16.5 10c3.038 0 5.5 2.015 5.5 4.5c0 1.397 -.778 2.645 -2 3.47l0 2.03l-1.964 -1.178a6.649 6.649 0 0 1 -1.536 .178c-3.038 0 -5.5 -2.015 -5.5 -4.5s2.462 -4.5 5.5 -4.5" />
		<path d="M11.197 15.698c-.69 .196 -1.43 .302 -2.197 .302a8.008 8.008 0 0 1 -2.612 -.432l-2.388 1.432v-2.801c-1.237 -1.082 -2 -2.564 -2 -4.199c0 -3.314 3.134 -6 7 -6c3.782 0 6.863 2.57 7 5.785l0 .233" />
		<path d="M10 8h.01" />
		<path d="M7 8h.01" />
		<path d="M15 14h.01" />
		<path d="M18 14h.01" />
	</Base>
);
export const BrandWeibo = (p: IconProps) => (
	<Base {...p}>
		<path d="M19 14.127c0 3.073 -3.502 5.873 -8 5.873c-4.126 0 -8 -2.224 -8 -5.565c0 -1.78 .984 -3.737 2.7 -5.567c2.362 -2.51 5.193 -3.687 6.551 -2.238c.415 .44 .752 1.39 .749 2.062c2 -1.615 4.308 .387 3.5 2.693c1.26 .557 2.5 .538 2.5 2.742" />
		<path d="M15 4h1a5 5 0 0 1 5 5v1" />
	</Base>
);
export const BrandWhatsapp = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
		<path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
	</Base>
);
export const BrandWikipedia = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 4.984h2" />
		<path d="M8 4.984h2.5" />
		<path d="M14.5 4.984h2.5" />
		<path d="M22 4.984h-2" />
		<path d="M4 4.984l5.455 14.516l6.545 -14.516" />
		<path d="M9 4.984l6 14.516l6 -14.516" />
	</Base>
);
export const BrandWindows = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.8 20l-12 -1.5c-1 -.1 -1.8 -.9 -1.8 -1.9v-9.2c0 -1 .8 -1.8 1.8 -1.9l12 -1.5c1.2 -.1 2.2 .8 2.2 1.9v12.1c0 1.2 -1.1 2.1 -2.2 1.9l0 .1" />
		<path d="M12 5l0 14" />
		<path d="M4 12l16 0" />
	</Base>
);
export const BrandWindy = (p: IconProps) => (
	<Base {...p}>
		<path d="M9 4c0 5.5 -.33 16 4 16s7.546 -11.27 8 -13" />
		<path d="M3 4c.253 5.44 1.449 16 5.894 16c4.444 0 8.42 -10.036 9.106 -14" />
	</Base>
);
export const BrandWish = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 6l5.981 2.392l-.639 6.037c-.18 .893 .06 1.819 .65 2.514a3 3 0 0 0 2.381 1.057a4.328 4.328 0 0 0 4.132 -3.57c-.18 .893 .06 1.819 .65 2.514a3 3 0 0 0 2.38 1.056a4.328 4.328 0 0 0 4.132 -3.57l.333 -4.633" />
		<path d="M14.504 14.429l.334 -3" />
	</Base>
);
export const BrandWix = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 9l1.5 6l1.379 -5.515a.64 .64 0 0 1 1.242 0l1.379 5.515l1.5 -6" />
		<path d="M13 11.5v3.5" />
		<path d="M16 9l5 6" />
		<path d="M21 9l-5 6" />
		<path d="M13 9h.01" />
	</Base>
);
export const BrandWordpress = (p: IconProps) => (
	<Base {...p}>
		<path d="M9.5 9h3" />
		<path d="M4 9h2.5" />
		<path d="M11 9l3 11l4 -9" />
		<path d="M5.5 9l3.5 11l3 -7" />
		<path d="M18 11c.177 -.528 1 -1.364 1 -2.5c0 -1.78 -.776 -2.5 -1.875 -2.5c-.898 0 -1.125 .812 -1.125 1.429c0 1.83 2 2.058 2 3.571" />
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
	</Base>
);
export const BrandX = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 4l11.733 16h4.267l-11.733 -16l-4.267 0" />
		<path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
	</Base>
);
export const BrandXamarin = (p: IconProps) => (
	<Base {...p}>
		<path d="M15.958 21h-7.917a2 2 0 0 1 -1.732 -1l-4.041 -7a2 2 0 0 1 0 -2l4.041 -7a2 2 0 0 1 1.732 -1h7.917a2 2 0 0 1 1.732 1l4.042 7a2 2 0 0 1 0 2l-4.041 7a2 2 0 0 1 -1.733 1" />
		<path d="M15 16l-6 -8" />
		<path d="M9 16l6 -8" />
	</Base>
);
export const BrandXbox = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M6.5 5c7.72 2.266 10.037 7.597 12.5 12.5" />
		<path d="M17.5 5c-7.72 2.266 -10.037 7.597 -12.5 12.5" />
	</Base>
);
export const BrandXdeep = (p: IconProps) => (
	<Base {...p}>
		<path d="M14.401 8.398l1.599 -2.398h5l-4 6l4 6h-5l-8 -12h-5l4 6l-4 6h5l1.596 -2.393" />
	</Base>
);
export const BrandXing = (p: IconProps) => (
	<Base {...p}>
		<path d="M16 21l-4 -7l6.5 -11" />
		<path d="M7 7l2 3.5l-3 4.5" />
	</Base>
);
export const BrandYahoo = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 6l5 0" />
		<path d="M7 18l7 0" />
		<path d="M4.5 6l5.5 7v5" />
		<path d="M10 13l6 -5" />
		<path d="M12.5 8l5 0" />
		<path d="M20 11l0 4" />
		<path d="M20 18l0 .01" />
	</Base>
);
export const BrandYandex = (p: IconProps) => (
	<Base {...p}>
		<path d="M15 20v-16h-2a4 4 0 0 0 -4 4v1a4 4 0 0 0 4 4h2" />
		<path d="M9 20l3 -7" />
	</Base>
);
export const BrandYarn = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.845 19.308c-1.268 .814 -2.41 1.254 -3.845 1.692c-.176 .21 -.645 .544 -.912 .588a42.469 42.469 0 0 1 -4.498 .412c-.812 .006 -1.31 -.214 -1.447 -.554c-.115 -.279 .336 -2.054 .298 -1.964c-.157 .392 -.575 1.287 -.997 1.72c-.579 .6 -1.674 .4 -2.322 .051c-.71 -.386 -.07 -1.28 -.346 -1.267c-.276 .014 -.776 -1.486 -.776 -2.236c0 -.828 .622 -1.674 1.235 -2.211a6.811 6.811 0 0 1 .46 -3.143a7.414 7.414 0 0 1 2.208 -2.615s-1.353 -1.534 -.849 -2.912c.328 -.902 .46 -.895 .567 -.935c.38 -.12 .727 -.33 1.013 -.612c.78 -.88 1.96 -1.438 3.116 -1.322c0 0 .781 -2.43 1.533 -1.936c.415 .653 .671 1.218 .967 1.936c0 0 1.15 -.7 1.25 -.5c.514 1.398 .487 3.204 .211 4.67c-.324 1.408 -.84 2.691 -1.711 3.83c-.094 .16 .98 .705 1.722 2.812c.686 1.928 .278 2.438 .278 2.688s.716 .144 2.296 -.855a5.848 5.848 0 0 1 2.984 -1.145c.735 -.066 .988 -.035 1.22 1c.232 1.035 -.346 1.406 -.744 1.506c0 0 -2.09 .675 -2.911 1.302" />
	</Base>
);
export const BrandYatse = (p: IconProps) => (
	<Base {...p}>
		<path d="M7 3l5 2.876v5.088l4.197 -2.73l4.803 2.731l-9.281 5.478l-2.383 1.41l-2.334 1.377l-3 1.77v-5.565l3 -1.771l-.002 -10.664" />
	</Base>
);
export const BrandYcombinator = (p: IconProps) => (
	<Base {...p}>
		<path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
		<path d="M8 7l4 6l4 -6" />
		<path d="M12 17l0 -4" />
	</Base>
);
export const BrandYoutube = (p: IconProps) => (
	<Base {...p}>
		<path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8" />
		<path d="M10 9l5 3l-5 3l0 -6" />
	</Base>
);
export const BrandYoutubeKids = (p: IconProps) => (
	<Base {...p}>
		<path d="M18.608 17.75l-3.9 .268h-.027a13.83 13.83 0 0 0 -3.722 .828l-2.511 .908a4.111 4.111 0 0 1 -3.287 -.216a3.82 3.82 0 0 1 -1.98 -2.527l-1.376 -6.05a3.669 3.669 0 0 1 .536 -2.86a3.964 3.964 0 0 1 2.489 -1.661l11.25 -2.354c2.137 -.448 4.247 .85 4.713 2.9l1.403 6.162a3.677 3.677 0 0 1 -.697 3.086a4.007 4.007 0 0 1 -2.89 1.512v.002l-.001 .002" />
		<path d="M9 10l1.208 5l4.292 -4l-5.5 -1" />
	</Base>
);
export const BrandZalando = (p: IconProps) => (
	<Base {...p}>
		<path d="M7.531 21c-.65 0 -1 -.15 -1.196 -.27c-.266 -.157 -.753 -.563 -1.197 -1.747a20.583 20.583 0 0 1 -1.137 -6.983c.015 -2.745 .436 -5.07 1.137 -6.975c.444 -1.2 .93 -1.605 1.197 -1.763c.192 -.103 .545 -.262 1.195 -.262c.244 0 .532 .022 .871 .075a19.093 19.093 0 0 1 6.425 2.475h.007a19.572 19.572 0 0 1 5.287 4.508c.783 .99 .879 1.627 .879 1.942c0 .315 -.096 .953 -.879 1.943a19.571 19.571 0 0 1 -5.287 4.5h-.007a19.041 19.041 0 0 1 -6.425 2.474a5.01 5.01 0 0 1 -.871 .083" />
	</Base>
);
export const BrandZapier = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 12h6" />
		<path d="M21 12h-6" />
		<path d="M12 3v6" />
		<path d="M12 15v6" />
		<path d="M5.636 5.636l4.243 4.243" />
		<path d="M18.364 18.364l-4.243 -4.243" />
		<path d="M18.364 5.636l-4.243 4.243" />
		<path d="M9.879 14.121l-4.243 4.243" />
	</Base>
);
export const BrandZeit = (p: IconProps) => (
	<Base {...p}>
		<path d="M3 20h18l-9 -16l-9 16" />
	</Base>
);
export const BrandZhihu = (p: IconProps) => (
	<Base {...p}>
		<path d="M14 6h6v12h-2l-2 2l-1 -2h-1l0 -12" />
		<path d="M4 12h6.5" />
		<path d="M10.5 6h-5" />
		<path d="M6 4c-.5 2.5 -1.5 3.5 -2.5 4.5" />
		<path d="M8 6v7c0 4.5 -2 5.5 -4 7" />
		<path d="M11 18l-3 -5" />
	</Base>
);
export const BrandZoom = (p: IconProps) => (
	<Base {...p}>
		<path d="M17.011 9.385v5.128l3.989 3.487v-12l-3.989 3.385" />
		<path d="M3.887 6h10.08c1.468 0 3.033 1.203 3.033 2.803v8.196a.991 .991 0 0 1 -.975 1h-10.373c-1.667 0 -2.652 -1.5 -2.652 -3l.01 -8a.882 .882 0 0 1 .208 -.71a.841 .841 0 0 1 .67 -.287l-.001 -.002" />
	</Base>
);
export const BrandZulip = (p: IconProps) => (
	<Base {...p}>
		<path d="M6.5 3h11c1.325 0 2.5 1 2.5 2.5c0 2 -1.705 3.264 -2 3.5l-4.5 4l2 -5h-9a2.5 2.5 0 0 1 0 -5" />
		<path d="M17.5 21h-11c-1.325 0 -2.5 -1 -2.5 -2.5c0 -2 1.705 -3.264 2 -3.5l4.5 -4l-2 5h9a2.5 2.5 0 1 1 0 5" />
	</Base>
);
export const BrandZwift = (p: IconProps) => (
	<Base {...p}>
		<path d="M5.5 4c-1.465 0 -2.5 1.101 -2.5 2.5s1.035 2.5 2.5 2.5h2.5l-4.637 7.19a2.434 2.434 0 0 0 -.011 2.538c.473 .787 1.35 1.272 2.3 1.272h10.848c1.465 0 2.5 -1.101 2.5 -2.5s-1.035 -2.5 -2.5 -2.5h-2.5l7 -11h-15.5" />
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
