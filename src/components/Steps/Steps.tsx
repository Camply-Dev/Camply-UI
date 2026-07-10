import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Check } from "../../lib/icons";
export interface Step {
	label: ReactNode;
	description?: ReactNode;
}

export interface StepsProps {
	steps: Step[];
	/** index of the current (in-progress) step, 0-based */
	current: number;
	orientation?: "horizontal" | "vertical";
	className?: string;
	style?: CSSProperties;
}

export function Steps({
	steps,
	current,
	orientation = "horizontal",
	className,
	style,
}: StepsProps) {
	return (
		<ol
			className={cn("camply-steps__root", `camply-steps__${orientation}`, className)}
			style={style}
			aria-label="Progression par étapes"
		>
			{/* étapes déclaratives ordonnées — la position est l'identité */}
			{steps.map((step, i) => {
				const state = i < current ? "done" : i === current ? "current" : "upcoming";
				const isLast = i === steps.length - 1;
				return (
					// biome-ignore lint/suspicious/noArrayIndexKey: étapes déclaratives ordonnées — la position est l'identité
					<li key={i} className={cn("camply-steps__step", `camply-steps__${state}`)}>
						<div className={"camply-steps__marker"}>
							<span className={"camply-steps__bubble"}>
								{state === "done" ? <Check size={15} /> : i + 1}
							</span>
							{!isLast && <span className={"camply-steps__connector"} />}
						</div>
						<div className={"camply-steps__text"}>
							<span className={"camply-steps__label"}>{step.label}</span>
							{step.description && <span className={"camply-steps__desc"}>{step.description}</span>}
						</div>
					</li>
				);
			})}
		</ol>
	);
}
