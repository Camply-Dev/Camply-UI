import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
export interface SkeletonProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
	width?: number | string;
	height?: number | string;
	variant?: "text" | "rect" | "circle";
	radius?: number | string;
}

/** Placeholder purement visuel : masqué aux lecteurs d'écran (le conteneur porte l'état de chargement). */
export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
	({ width, height, variant = "text", radius, className, style, ...props }, ref) => {
		return (
			<span
				ref={ref}
				aria-hidden="true"
				className={cn("camply-skeleton__sk", `camply-skeleton__${variant}`, className)}
				style={{ width, height, borderRadius: radius, ...style }}
				{...props}
			/>
		);
	},
);

Skeleton.displayName = "Skeleton";

export interface SkeletonTextProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
	lines?: number;
}

export const SkeletonText = forwardRef<HTMLSpanElement, SkeletonTextProps>(
	({ lines = 3, className, ...props }, ref) => {
		return (
			<span
				ref={ref}
				aria-hidden="true"
				className={cn("camply-skeleton__stack", className)}
				{...props}
			>
				{Array.from({ length: lines }).map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: lignes de placeholder à position fixe — l'index EST l'identité
					<Skeleton key={i} variant="text" width={i === lines - 1 ? "60%" : "100%"} />
				))}
			</span>
		);
	},
);

SkeletonText.displayName = "SkeletonText";
