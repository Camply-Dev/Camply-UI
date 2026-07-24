import { Card } from "@camply/ui";
import type { ReactNode } from "react";

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
