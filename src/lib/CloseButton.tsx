import { IconButton } from "../components/IconButton";
import { X } from "./icons";

export interface CloseButtonProps {
	className?: string;
	onClick: () => void;
	/** taille de l'icône ✕ (défaut 15) */
	iconSize?: number;
}

/** Bouton de fermeture standard des surfaces (Alert, Banner, Modal, Drawer, Sheet,
 *  Toast) : IconButton fantôme « Fermer » portant l'icône ✕. Un seul endroit pour
 *  faire évoluer le libellé, la taille ou l'accessibilité. */
export function CloseButton({ className, onClick, iconSize = 15 }: CloseButtonProps) {
	return (
		<IconButton label="Fermer" variant="ghost" size="sm" className={className} onClick={onClick}>
			<X size={iconSize} />
		</IconButton>
	);
}
