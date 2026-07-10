import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { TrendDown, TrendUp } from "../../lib/icons";
export interface StatProps {
	label: ReactNode;
	value: ReactNode;
	/** signed delta, e.g. +18 or -4.2 */
	delta?: number;
	deltaSuffix?: string;
	/** what "up" means — usually up is good (accent), sometimes bad */
	invertDelta?: boolean;
	icon?: ReactNode;
	hint?: ReactNode;
	className?: string;
	style?: CSSProperties;
}

export function Stat({
	label,
	value,
	delta,
	deltaSuffix = "%",
	invertDelta = false,
	icon,
	hint,
	className,
	style,
}: StatProps) {
	const up = delta != null && delta >= 0;
	const good = delta == null ? true : invertDelta ? !up : up;

	return (
		<div className={cn("camply-stat__root", className)} style={style}>
			<div className={"camply-stat__top"}>
				<span className={"camply-stat__label"}>{label}</span>
				{icon && <span className={"camply-stat__icon"}>{icon}</span>}
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
}
