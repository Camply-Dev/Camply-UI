import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type TimelineTone = "accent" | "info" | "warn" | "danger" | "muted";

export interface TimelineItem {
	title: ReactNode;
	time?: ReactNode;
	description?: ReactNode;
	icon?: ReactNode;
	tone?: TimelineTone;
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
	items: TimelineItem[];
}

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
	{ items, className, ...rest },
	ref,
) {
	return (
		<ol ref={ref} className={cn("camply-timeline__root", className)} {...rest}>
			{items.map((item, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: événements déclaratifs ordonnés — la position est l'identité
				<li key={i} className={"camply-timeline__item"}>
					{/* Pastille et trait sont purement décoratifs. */}
					<div className={"camply-timeline__rail"} aria-hidden="true">
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
});
