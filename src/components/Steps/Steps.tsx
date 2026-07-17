import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useLabels } from "../../lib/i18n";
import { Check } from "../../lib/icons";

export interface Step {
	label: ReactNode;
	description?: ReactNode;
}

export interface StepsProps extends HTMLAttributes<HTMLOListElement> {
	steps: Step[];
	current: number;
	orientation?: "horizontal" | "vertical";
}

export const Steps = forwardRef<HTMLOListElement, StepsProps>(function Steps(
	{ steps, current, orientation = "horizontal", className, ...rest },
	ref,
) {
	const labels = useLabels();
	return (
		<ol
			ref={ref}
			className={cn("camply-steps__root", `camply-steps__${orientation}`, className)}
			aria-label={labels.steps}
			{...rest}
		>
			{steps.map((step, i) => {
				const state = i < current ? "done" : i === current ? "current" : "upcoming";
				const isLast = i === steps.length - 1;
				return (
					<li
						// biome-ignore lint/suspicious/noArrayIndexKey: étapes déclaratives ordonnées — la position est l'identité
						key={i}
						className={cn("camply-steps__step", `camply-steps__${state}`)}
						aria-current={state === "current" ? "step" : undefined}
					>
						{/* Puce et connecteur sont décoratifs : le rang est déjà porté par la liste ordonnée. */}
						<div className={"camply-steps__marker"} aria-hidden="true">
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
});
