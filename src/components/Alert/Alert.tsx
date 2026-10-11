import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { CloseButton } from "../../lib/CloseButton";
import { cn } from "../../lib/cn";
import { STATUS_ICONS } from "../../lib/icons";
import type { Tone } from "../../lib/types";
import { type Controllable, useControllable } from "../../lib/useControllable";

export type AlertTone = Extract<Tone, "info" | "success" | "warn" | "danger">;

/**
 * `title` maison (ReactNode) : le `title` natif (string) est retiré pour éviter
 * le conflit. `role` reste dans le type : dérivé du `tone`, c'est un défaut et
 * non un invariant (voir la racine).
 */
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title">, Controllable {
	tone?: AlertTone;
	title?: ReactNode;
	children?: ReactNode;
	dismissible?: boolean;
	icon?: ReactNode | null;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
	(
		{
			tone = "info",
			title,
			children,
			dismissible,
			icon,
			open: openProp,
			// Inversion assumée du défaut de `Controllable` : une alerte n'a pas de
			// déclencheur, elle est là dès le montage et ne part qu'une fois fermée.
			defaultOpen = true,
			onOpenChange,
			className,
			...props
		},
		ref,
	) => {
		const [open, setOpen] = useControllable<boolean>(openProp, defaultOpen, onOpenChange);
		if (!open) return null;

		const ToneIcon = STATUS_ICONS[tone];
		const showIcon = icon !== null;
		// Seuls les tons qui signalent un problème interrompent le lecteur d'écran.
		const defaultRole = tone === "danger" || tone === "warn" ? "alert" : "status";

		return (
			// `role` avant le spread : dérivé du `tone`, c'est un défaut, et aucun mécanisme
			// interne n'en dépend. La politesse d'une annonce se juge au contexte : une alerte
			// décorative mérite `role="status"`, un message déjà annoncé par son champ
			// `role="none"`. Le défaut couvre le cas courant, le consommateur a le dernier mot.
			<div
				ref={ref}
				role={defaultRole}
				className={cn("camply-alert__alert", `camply-alert__${tone}`, className)}
				{...props}
			>
				{showIcon && (
					<span aria-hidden="true" className="camply-alert__icon">
						{icon ?? <ToneIcon size={19} />}
					</span>
				)}
				<div className="camply-alert__body">
					{title && <div className="camply-alert__title">{title}</div>}
					{children && <div className="camply-alert__text">{children}</div>}
				</div>
				{dismissible && (
					<CloseButton className="camply-alert__close" onClick={() => setOpen(false)} />
				)}
			</div>
		);
	},
);

Alert.displayName = "Alert";
