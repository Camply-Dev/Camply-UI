import { forwardRef, type HTMLAttributes, type ReactNode, useMemo } from "react";
import { cn } from "../../lib/cn";
import { useLocale } from "../../lib/i18n";
import { Minus, TrendDown, TrendUp } from "../../lib/icons";

export interface StatProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
	label: ReactNode;
	value: ReactNode;
	/**
	 * Écart affiché sous la valeur, signé et mis en forme selon la locale
	 * (`CamplyProvider`) : `12.5` → « +12,5 » en fr-FR, deux décimales au plus.
	 * Une hausse est un succès, une baisse un danger (`invertDelta` les échange),
	 * zéro est neutre.
	 */
	delta?: number;
	deltaSuffix?: string;
	/** Une baisse est bonne (un coût, un délai) : les tons s'échangent. */
	invertDelta?: boolean;
	icon?: ReactNode;
	hint?: ReactNode;
	/** `card` (défaut) : un bloc encadré. `plain` : à plat, sans cadre, fond ni marge — dans un panneau. */
	variant?: "card" | "plain";
	/** `sm` : compacte (une grille de chiffres sur téléphone) — marges et valeur réduites, sans icône. */
	size?: "sm" | "md";
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
			variant = "card",
			size = "md",
			className,
			...props
		},
		ref,
	) => {
		const locale = useLocale();
		const format = useMemo(
			() => new Intl.NumberFormat(locale, { maximumFractionDigits: 2, signDisplay: "exceptZero" }),
			[locale],
		);
		const trend = delta == null ? null : delta > 0 ? "up" : delta < 0 ? "down" : "flat";
		const tone = trend === "flat" ? "flat" : (trend === "up") !== invertDelta ? "good" : "bad";

		return (
			<div
				ref={ref}
				className={cn(
					"camply-stat__root",
					variant === "plain" && "camply-stat__plain",
					size === "sm" && "camply-stat__sm",
					className,
				)}
				{...props}
			>
				<div className="camply-stat__top">
					<span className="camply-stat__label">{label}</span>
					{icon && (
						<span aria-hidden="true" className="camply-stat__icon">
							{icon}
						</span>
					)}
				</div>
				<div className="camply-stat__value">{value}</div>
				{(delta != null || hint) && (
					<div className="camply-stat__bottom">
						{delta != null && (
							<span className={cn("camply-stat__delta", `camply-stat__${tone}`)}>
								{trend === "up" ? (
									<TrendUp size={13} />
								) : trend === "down" ? (
									<TrendDown size={13} />
								) : (
									<Minus size={13} />
								)}
								{format.format(delta)}
								{deltaSuffix}
							</span>
						)}
						{hint && <span className="camply-stat__hint">{hint}</span>}
					</div>
				)}
			</div>
		);
	},
);

Stat.displayName = "Stat";
