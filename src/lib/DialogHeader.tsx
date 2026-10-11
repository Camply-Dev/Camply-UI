import type { ReactNode } from "react";
import { CloseButton } from "./CloseButton";

export interface DialogHeaderProps {
	/**
	 * Nom BEM du dialogue hôte. L'union ferme la porte au `camply-drawer__title`
	 * égaré dans une Sheet ; un `string` libre laisserait passer la faute.
	 */
	prefix: "modal" | "drawer" | "sheet";
	title?: ReactNode;
	/** id du titre — c'est lui que le panneau cible en `aria-labelledby`. */
	titleId: string;
	description?: ReactNode;
	/** id de la description — c'est lui que le panneau cible en `aria-describedby`. */
	descriptionId?: string;
	showClose?: boolean;
	onClose: () => void;
}

/**
 * En-tête commun à Modal, Drawer et Sheet. Rendu dès qu'il y a un titre, une
 * description ou un bouton de fermeture : une description seule ne doit pas
 * disparaître.
 */
export function DialogHeader({
	prefix,
	title,
	titleId,
	description,
	descriptionId,
	showClose,
	onClose,
}: DialogHeaderProps) {
	if (!title && !description && !showClose) return null;

	const heading = title && (
		<h2 id={titleId} className={`camply-${prefix}__title`}>
			{title}
		</h2>
	);

	return (
		<div className={`camply-${prefix}__header`}>
			{/* L'en-tête est un flex `space-between` : ce groupe garde la description
			    contre son titre au lieu d'en faire un troisième enfant. */}
			{description ? (
				<div>
					{heading}
					<p id={descriptionId} className={`camply-${prefix}__desc`}>
						{description}
					</p>
				</div>
			) : (
				heading
			)}
			{showClose && <CloseButton className={`camply-${prefix}__close`} onClick={onClose} />}
		</div>
	);
}
