import type { CSSProperties, ReactNode } from "react";
import { CloseButton } from "../../lib/CloseButton";
import { cn } from "../../lib/cn";
import { Info, STATUS_ICONS } from "../../lib/icons";
import { useDismissible } from "../../lib/useDismissible";
export type BannerTone = "info" | "success" | "warn" | "danger" | "accent";

export interface BannerProps {
	tone?: BannerTone;
	children: ReactNode;
	/** trailing action(s), e.g. a Button or link */
	action?: ReactNode;
	dismissible?: boolean;
	onDismiss?: () => void;
	icon?: ReactNode | null;
	className?: string;
	style?: CSSProperties;
}

const ICONS = { ...STATUS_ICONS, accent: Info } as const;

/** Full-width notification bar for page- or section-level messages. */
export function Banner({
	tone = "accent",
	children,
	action,
	dismissible,
	onDismiss,
	icon,
	className,
	style,
}: BannerProps) {
	const { open, dismiss } = useDismissible(onDismiss);
	if (!open) return null;
	const ToneIcon = ICONS[tone];
	const showIcon = icon !== null;

	return (
		<div
			role="status"
			className={cn("camply-banner__banner", `camply-banner__${tone}`, className)}
			style={style}
		>
			{showIcon && <span className={"camply-banner__icon"}>{icon ?? <ToneIcon size={18} />}</span>}
			<span className={"camply-banner__text"}>{children}</span>
			{action && <span className={"camply-banner__action"}>{action}</span>}
			{dismissible && <CloseButton className="camply-banner__close" onClick={dismiss} />}
		</div>
	);
}
