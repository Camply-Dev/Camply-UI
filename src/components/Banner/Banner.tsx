import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { CloseButton } from "../../lib/CloseButton";
import { cn } from "../../lib/cn";
import { Info, STATUS_ICONS } from "../../lib/icons";
import { useDismissible } from "../../lib/useDismissible";

export type BannerTone = "info" | "success" | "warn" | "danger" | "accent";

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
	tone?: BannerTone;
	children: ReactNode;
	action?: ReactNode;
	dismissible?: boolean;
	onDismiss?: () => void;
	icon?: ReactNode | null;
}

const ICONS = { ...STATUS_ICONS, accent: Info } as const;

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
	(
		{ tone = "accent", children, action, dismissible, onDismiss, icon, className, ...props },
		ref,
	) => {
		const { open, dismiss } = useDismissible(onDismiss);
		if (!open) return null;

		const ToneIcon = ICONS[tone];
		const showIcon = icon !== null;
		// Seuls les tons qui signalent un problème interrompent le lecteur d'écran.
		const role = tone === "danger" || tone === "warn" ? "alert" : "status";

		return (
			<div
				ref={ref}
				role={role}
				className={cn("camply-banner__banner", `camply-banner__${tone}`, className)}
				{...props}
			>
				{showIcon && (
					<span aria-hidden="true" className={"camply-banner__icon"}>
						{icon ?? <ToneIcon size={18} />}
					</span>
				)}
				<span className={"camply-banner__text"}>{children}</span>
				{action && <span className={"camply-banner__action"}>{action}</span>}
				{dismissible && <CloseButton className="camply-banner__close" onClick={dismiss} />}
			</div>
		);
	},
);

Banner.displayName = "Banner";
