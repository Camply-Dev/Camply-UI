import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { CloseButton } from "../../lib/CloseButton";
import { cn } from "../../lib/cn";
import { STATUS_ICONS } from "../../lib/icons";
import { useDismissible } from "../../lib/useDismissible";

export type AlertTone = "info" | "success" | "warn" | "danger";

/** `title` maison (ReactNode) : on retire le `title` natif (string) pour éviter le conflit. */
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	tone?: AlertTone;
	title?: ReactNode;
	children?: ReactNode;
	dismissible?: boolean;
	onDismiss?: () => void;
	icon?: ReactNode | null;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
	({ tone = "info", title, children, dismissible, onDismiss, icon, className, ...props }, ref) => {
		const { open, dismiss } = useDismissible(onDismiss);
		if (!open) return null;

		const ToneIcon = STATUS_ICONS[tone];
		const showIcon = icon !== null;
		// Seuls les tons qui signalent un problème interrompent le lecteur d'écran.
		const role = tone === "danger" || tone === "warn" ? "alert" : "status";

		return (
			<div
				ref={ref}
				role={role}
				className={cn("camply-alert__alert", `camply-alert__${tone}`, className)}
				{...props}
			>
				{showIcon && (
					<span aria-hidden="true" className={"camply-alert__icon"}>
						{icon ?? <ToneIcon size={19} />}
					</span>
				)}
				<div className={"camply-alert__body"}>
					{title && <div className={"camply-alert__title"}>{title}</div>}
					{children && <div className={"camply-alert__text"}>{children}</div>}
				</div>
				{dismissible && <CloseButton className="camply-alert__close" onClick={dismiss} />}
			</div>
		);
	},
);

Alert.displayName = "Alert";
