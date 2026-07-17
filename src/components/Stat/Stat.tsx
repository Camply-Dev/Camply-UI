import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { TrendDown, TrendUp } from "../../lib/icons";

export interface StatProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
	label: ReactNode;
	value: ReactNode;
	delta?: number;
	deltaSuffix?: string;
	invertDelta?: boolean;
	icon?: ReactNode;
	hint?: ReactNode;
}

export const Stat = forwardRef<HTMLDivElement, StatProps>(
	(
		{
			label,
			value,
			delta,
			deltaSuffix = "%",
			invertDelta = false,
			icon,
			hint,
			className,
			...props
		},
		ref,
	) => {
		const up = delta != null && delta >= 0;
		const good = invertDelta ? !up : up;

		return (
			<div ref={ref} className={cn("camply-stat__root", className)} {...props}>
				<div className={"camply-stat__top"}>
					<span className={"camply-stat__label"}>{label}</span>
					{icon && (
						<span aria-hidden="true" className={"camply-stat__icon"}>
							{icon}
						</span>
					)}
				</div>
				<div className={"camply-stat__value"}>{value}</div>
				<div className={"camply-stat__bottom"}>
					{delta != null && (
						<span
							className={cn("camply-stat__delta", good ? "camply-stat__good" : "camply-stat__bad")}
						>
							{up ? <TrendUp size={13} /> : <TrendDown size={13} />}
							{up ? "+" : ""}
							{delta}
							{deltaSuffix}
						</span>
					)}
					{hint && <span className={"camply-stat__hint"}>{hint}</span>}
				</div>
			</div>
		);
	},
);

Stat.displayName = "Stat";
