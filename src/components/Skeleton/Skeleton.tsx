import type { CSSProperties } from "react";
import { cn } from "../../lib/cn";
export interface SkeletonProps {
	width?: number | string;
	height?: number | string;
	/** shape of the placeholder */
	variant?: "text" | "rect" | "circle";
	/** custom border radius (rect) */
	radius?: number | string;
	className?: string;
	style?: CSSProperties;
}

export function Skeleton({
	width,
	height,
	variant = "text",
	radius,
	className,
	style,
}: SkeletonProps) {
	// React ajoute automatiquement "px" aux valeurs numériques de style.
	return (
		<span
			aria-hidden="true"
			className={cn("camply-skeleton__sk", `camply-skeleton__${variant}`, className)}
			style={{ width, height, borderRadius: radius, ...style }}
		/>
	);
}

/** Convenience multi-line text skeleton. */
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
	return (
		<span className={cn("camply-skeleton__stack", className)}>
			{Array.from({ length: lines }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: lignes de placeholder à position fixe — l'index EST l'identité
				<Skeleton key={i} variant="text" width={i === lines - 1 ? "60%" : "100%"} />
			))}
		</span>
	);
}
