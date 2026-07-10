import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";
export type TimelineTone = "accent" | "info" | "warn" | "danger" | "muted";

export interface TimelineItem {
	title: ReactNode;
	time?: ReactNode;
	description?: ReactNode;
	/** custom node inside the dot (e.g. an icon) */
	icon?: ReactNode;
	tone?: TimelineTone;
}

export interface TimelineProps {
	items: TimelineItem[];
	className?: string;
	style?: CSSProperties;
}

export function Timeline({ items, className, style }: TimelineProps) {
	return (
		<ol className={cn("camply-timeline__root", className)} style={style}>
			{items.map((item, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: événements déclaratifs ordonnés — la position est l'identité
				<li key={i} className={"camply-timeline__item"}>
					<div className={"camply-timeline__rail"}>
						<span
							className={cn(
								"camply-timeline__dot",
								`camply-timeline__tone-${item.tone ?? "accent"}`,
							)}
						>
							{item.icon}
						</span>
						{i < items.length - 1 && <span className={"camply-timeline__line"} />}
					</div>
					<div className={"camply-timeline__content"}>
						<div className={"camply-timeline__header"}>
							<span className={"camply-timeline__title"}>{item.title}</span>
							{item.time && <span className={"camply-timeline__time"}>{item.time}</span>}
						</div>
						{item.description && (
							<div className={"camply-timeline__description"}>{item.description}</div>
						)}
					</div>
				</li>
			))}
		</ol>
	);
}
