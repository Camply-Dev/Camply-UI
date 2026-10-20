import type { ReactNode } from "react";
import { CloseButton } from "./CloseButton";

interface DialogHeaderProps {
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

interface DialogFrameProps extends DialogHeaderProps {
	children?: ReactNode;
	footer?: ReactNode;
	/**
	 * Sans enfants, ni zone de contenu ni corps (Modal). Drawer et Sheet la gardent :
	 * elle remplit le panneau et pousse le pied en bas.
	 */
	optionalBody?: boolean;
}

/**
 * En-tête commun à Modal, Drawer et Sheet. Rendu dès qu'il y a un titre, une
 * description ou un bouton de fermeture : une description seule ne doit pas
 * disparaître.
 */
function DialogHeader({
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

/**
 * Charpente commune à Modal, Drawer et Sheet, dans le panneau d'`OverlayDialog` :
 * l'en-tête, puis la zone qui défile (`__content > __body`), puis le pied. Seul le
 * contenu défile, l'en-tête et le pied restent à l'écran.
 */
export function DialogFrame({
	prefix,
	children,
	footer,
	optionalBody,
	...header
}: DialogFrameProps) {
	// La zone qui défile n'a pas de marge : la marge est celle du corps.
	const body = (
		<div className={`camply-${prefix}__content`}>
			<div className={`camply-${prefix}__body`}>{children}</div>
		</div>
	);
	return (
		<>
			<DialogHeader prefix={prefix} {...header} />
			{optionalBody ? children && body : body}
			{footer && <div className={`camply-${prefix}__footer`}>{footer}</div>}
		</>
	);
}
