import { type CSSProperties, type ReactNode, useState } from "react";
import { cn } from "../../lib/cn";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "../../lib/icons";
import { IconButton } from "../IconButton";
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

const ICONS = {
	info: Info,
	success: CheckCircle,
	warn: AlertTriangle,
	danger: AlertCircle,
	accent: Info,
} as const;

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
	const [open, setOpen] = useState(true);
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
			{dismissible && (
				<IconButton
					label="Fermer"
					variant="ghost"
					size="sm"
					className={"camply-banner__close"}
					onClick={() => {
						setOpen(false);
						onDismiss?.();
					}}
				>
					<X size={15} />
				</IconButton>
			)}
		</div>
	);
}
