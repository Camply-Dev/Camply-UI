import { Card } from "@camply/ui";
import type { ReactNode } from "react";

/** Carte cliquable ET accessible au clavier (Entrée / Espace) — factorise le
 *  boilerplate role="button" + tabIndex + onKeyDown répété dans HomeView et
 *  RoadmapView. */
export function ClickableCard({
	onActivate,
	className,
	children,
}: {
	onActivate: () => void;
	className?: string;
	children: ReactNode;
}) {
	return (
		<Card
			interactive
			role="button"
			tabIndex={0}
			className={className}
			onClick={onActivate}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onActivate();
				}
			}}
		>
			{children}
		</Card>
	);
}
