import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { CloseButton } from "../../lib/CloseButton";
import { cn } from "../../lib/cn";
import { Info, STATUS_ICONS } from "../../lib/icons";
import type { Tone } from "../../lib/types";
import { type Controllable, useControllable } from "../../lib/useControllable";

export type BannerTone = Extract<Tone, "info" | "success" | "warn" | "danger" | "accent">;

/**
 * `role` reste dans le type : dérivé du `tone`, c'est un défaut et non un
 * invariant (voir la racine).
 */
export interface BannerProps extends HTMLAttributes<HTMLDivElement>, Controllable {
	tone?: BannerTone;
	children: ReactNode;
	action?: ReactNode;
	dismissible?: boolean;
	icon?: ReactNode | null;
}

const ICONS = { ...STATUS_ICONS, accent: Info } as const;

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
	(
		{
			tone = "accent",
			children,
			action,
			dismissible,
			icon,
			open: openProp,
			// Inversion assumée du défaut de `Controllable` : un bandeau n'a pas de
			// déclencheur, il est là dès le montage et ne part qu'une fois fermé.
			defaultOpen = true,
			onOpenChange,
			className,
			...props
		},
		ref,
	) => {
		const [open, setOpen] = useControllable<boolean>(openProp, defaultOpen, onOpenChange);
		if (!open) return null;

		const ToneIcon = ICONS[tone];
		const showIcon = icon !== null;
		// Seuls les tons qui signalent un problème interrompent le lecteur d'écran.
		const defaultRole = tone === "danger" || tone === "warn" ? "alert" : "status";

		return (
			// `role` avant le spread : dérivé du `tone`, c'est un défaut, et aucun mécanisme
			// interne n'en dépend. Un bandeau permanent relu à chaque navigation veut souvent
			// `role="none"`, une annonce persistante `role="status"` malgré un ton `warn`. Le
			// défaut couvre le cas courant, le consommateur a le dernier mot.
			<div
				ref={ref}
				role={defaultRole}
				className={cn("camply-banner__banner", `camply-banner__${tone}`, className)}
				{...props}
			>
				{showIcon && (
					<span aria-hidden="true" className="camply-banner__icon">
						{icon ?? <ToneIcon size={18} />}
					</span>
				)}
				<span className="camply-banner__text">{children}</span>
				{action && <span className="camply-banner__action">{action}</span>}
				{dismissible && (
					<CloseButton className="camply-banner__close" onClick={() => setOpen(false)} />
				)}
			</div>
		);
	},
);

Banner.displayName = "Banner";
