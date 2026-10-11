import {
	type ComponentPropsWithoutRef,
	type CSSProperties,
	type HTMLAttributes,
	type ReactNode,
	type Ref,
	useEffect,
	useRef,
} from "react";
import { cn } from "./cn";
import { idRefs } from "./Field";
import { focusableWithin, trapTab } from "./focusTrap";
import { useMergedRefs } from "./mergeRefs";
import { Portal } from "./Portal";
import { useEscapeAndScrollLock } from "./useEscapeAndScrollLock";

/**
 * Attributs que le panneau se réserve, retirés du type (règle 3) : rôle, modalité
 * et sortie clavier forment le contrat d'`aria-modal` ; le contenu vient de `children`.
 */
export type ReservedPanelAttr =
	| "role"
	| "aria-modal"
	| "tabIndex"
	| "children"
	| "dangerouslySetInnerHTML";

/** Balises que le panneau sait rendre ; un dialogue nomme la sienne (`DialogPanelProps<"aside">`). */
type OverlayDialogElement = "div" | "aside";

/**
 * Props publiques d'un dialogue bâti sur `OverlayDialog` (Modal, Drawer, Sheet) :
 * les attributs natifs du panneau `E`, moins deux choses :
 * — `title`, `string` en natif alors que le titre maison est un `ReactNode` ;
 * — `ReservedPanelAttr`, dont `children`, que chaque dialogue réintroduit avec
 *   le type de son propre corps.
 */
export type DialogPanelProps<E extends OverlayDialogElement> = Omit<
	ComponentPropsWithoutRef<E>,
	"title" | ReservedPanelAttr
>;

export interface OverlayDialogProps {
	open: boolean;
	onClose: () => void;
	closeOnBackdrop?: boolean;
	backdropClassName?: string;
	panelClassName?: string;
	as?: OverlayDialogElement;
	focusPanel?: boolean;
	/** Nom accessible explicite (si le dialogue n'a pas de titre visible). */
	ariaLabel?: string;
	/** id du titre visible — donne son nom accessible au dialogue (à préférer). */
	ariaLabelledBy?: string;
	/**
	 * Ref du PANNEAU, la racine du dialogue pour le consommateur. Fusionnée avec la
	 * ref interne, qui pilote le piège de focus et ne doit donc pas être écrasée.
	 */
	panelRef?: Ref<HTMLElement>;
	/**
	 * Attributs supplémentaires du panneau (`id`, `data-*`, gestionnaires…), étalés
	 * AVANT ceux qui font le dialogue (règle 3). `className` et `style` n'y figurent
	 * pas : ils passent par `panelClassName` et `style`, qui les composent (règle 1).
	 */
	panelProps?: Omit<HTMLAttributes<HTMLElement>, ReservedPanelAttr | "className" | "style">;
	children: ReactNode;
	style?: CSSProperties;
}

/**
 * Socle commun des dialogues modaux (Modal, Drawer, Sheet, CommandPalette).
 * Implémente ce qu'`aria-modal="true"` promet : le focus entre dans le
 * dialogue, y reste (piège Tab), et revient au déclencheur à la fermeture.
 */
export function OverlayDialog({
	open,
	onClose,
	closeOnBackdrop = true,
	backdropClassName,
	panelClassName,
	as = "div",
	focusPanel = true,
	ariaLabel,
	ariaLabelledBy,
	panelRef,
	panelProps,
	children,
	style,
}: OverlayDialogProps) {
	const innerRef = useRef<HTMLElement | null>(null);
	const setPanelRef = useMergedRefs<HTMLElement>(innerRef, panelRef);

	// Le voile, et non le seul panneau, est l'intérieur de la couche : il recouvre
	// tout, donc un clic dessus ne concerne que ce dialogue et ne doit jamais
	// refermer la couche d'où il est issu.
	const backdropRef = useRef<HTMLDivElement | null>(null);
	useEscapeAndScrollLock(open, onClose, backdropRef);

	// Mémorise le focus d'origine et le restaure à la fermeture.
	useEffect(() => {
		if (!open) return;
		const previous = document.activeElement as HTMLElement | null;
		return () => previous?.focus?.();
	}, [open]);

	// Entrée du focus dans le dialogue : premier élément focalisable, sinon le panneau.
	useEffect(() => {
		if (!open || !focusPanel) return;
		const panel = innerRef.current;
		if (!panel) return;
		const [first] = focusableWithin(panel);
		(first ?? panel).focus();
	}, [open, focusPanel]);

	// Piège Tab : le focus ne peut pas sortir derrière le voile.
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			const panel = innerRef.current;
			if (panel) trapTab(e, panel);
		};
		document.addEventListener("keydown", onKeyDown, true);
		return () => document.removeEventListener("keydown", onKeyDown, true);
	}, [open]);

	if (!open) return null;

	// `aria-labelledby` est une liste d'ids : le titre visible et celui de
	// `panelProps` se composent (règle 4). À défaut, un `aria-label` du
	// consommateur vaut mieux qu'un dialogue anonyme.
	const labelledBy = idRefs(ariaLabelledBy, panelProps?.["aria-labelledby"]);
	const label = labelledBy ? undefined : (ariaLabel ?? panelProps?.["aria-label"]);

	const panelAttrs = {
		// Règle 3 : le contrat ARIA est posé après le spread.
		...panelProps,
		ref: setPanelRef,
		role: "dialog",
		"aria-modal": true,
		"aria-label": label,
		"aria-labelledby": labelledBy,
		tabIndex: -1,
		className: cn("camply-overlay-panel", panelClassName),
		style,
	};

	return (
		<Portal>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: fermeture au clic sur le voile — chemin clavier équivalent : Échap */}
			<div
				ref={backdropRef}
				className={cn("camply-overlay-backdrop", backdropClassName)}
				onMouseDown={(e) => {
					if (closeOnBackdrop && e.target === e.currentTarget) onClose();
				}}
			>
				{as === "aside" ? (
					<aside {...panelAttrs}>{children}</aside>
				) : (
					<div {...panelAttrs}>{children}</div>
				)}
			</div>
		</Portal>
	);
}
