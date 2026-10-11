import { IconButton } from "../components/IconButton";
import { useLabels } from "./i18n";
import { X } from "./icons";

export interface CloseButtonProps {
	className?: string;
	onClick: () => void;
}

/**
 * Bouton de fermeture commun (Alert, Banner, Toast, dialogues). La taille de la
 * cible est un delta CSS propre à chaque hôte (`--_s`, posé par sa feuille).
 */
export function CloseButton({ className, onClick }: CloseButtonProps) {
	const labels = useLabels();
	return (
		<IconButton
			label={labels.close}
			variant="ghost"
			size="sm"
			className={className}
			onClick={onClick}
		>
			<X size={15} />
		</IconButton>
	);
}
