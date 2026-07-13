import type { CSSProperties, ReactNode } from "react";
import { CloseButton } from "../../lib/CloseButton";
import { cn } from "../../lib/cn";
import { STATUS_ICONS } from "../../lib/icons";
import { useDismissible } from "../../lib/useDismissible";
export type AlertTone = "info" | "success" | "warn" | "danger";

export interface AlertProps {
	tone?: AlertTone;
	title?: ReactNode;
	children?: ReactNode;
	dismissible?: boolean;
	onDismiss?: () => void;
	icon?: ReactNode | null;
	className?: string;
	style?: CSSProperties;
}

export function Alert({
	tone = "info",
	title,
	children,
	dismissible,
	onDismiss,
	icon,
	className,
	style,
}: AlertProps) {
	const { open, dismiss } = useDismissible(onDismiss);
	if (!open) return null;

	const ToneIcon = STATUS_ICONS[tone];
	const showIcon = icon !== null;

	return (
		<div
			role="alert"
			className={cn("camply-alert__alert", `camply-alert__${tone}`, className)}
			style={style}
		>
			{showIcon && <span className={"camply-alert__icon"}>{icon ?? <ToneIcon size={19} />}</span>}
			<div className={"camply-alert__body"}>
				{title && <div className={"camply-alert__title"}>{title}</div>}
				{children && <div className={"camply-alert__text"}>{children}</div>}
			</div>
			{dismissible && <CloseButton className="camply-alert__close" onClick={dismiss} />}
		</div>
	);
}
