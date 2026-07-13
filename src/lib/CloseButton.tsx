import { IconButton } from "../components/IconButton";
import { X } from "./icons";

export interface CloseButtonProps {
	className?: string;
	onClick: () => void;
	iconSize?: number;
}

export function CloseButton({ className, onClick, iconSize = 15 }: CloseButtonProps) {
	return (
		<IconButton label="Fermer" variant="ghost" size="sm" className={className} onClick={onClick}>
			<X size={iconSize} />
		</IconButton>
	);
}
