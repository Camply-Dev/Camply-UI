import {
	type ComponentPropsWithoutRef,
	type CSSProperties,
	type HTMLAttributes,
	type ReactNode,
	type Ref,
	type RefObject,
	useEffect,
	useInsertionEffect,
	useRef,
} from "react";
import { cn } from "./cn";
import { idRefs } from "./Field";
import { focusInto, trapTab } from "./focusTrap";
import { useMergedRefs } from "./mergeRefs";
import { Portal } from "./Portal";
import { useDismiss } from "./useDismiss";
import { useLatest } from "./useLatest";

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

/** Ce que Modal, Drawer et Sheet exposent du focus d'entrée. */
export interface DialogFocusProps {
	/**
	 * Élément qui reçoit le focus à l'ouverture (un champ de recherche…), à la place
	 * du premier focalisable du panneau. Un contrôle `autoFocus` du contenu est aussi
	 * respecté ; dans les deux cas, le focus revient au déclencheur à la fermeture.
	 */
	initialFocus?: RefObject<HTMLElement | null>;
}

export interface OverlayDialogProps extends DialogFocusProps {
	open: boolean;
	onClose: () => void;
	closeOnBackdrop?: boolean;
	backdropClassName?: string;
	panelClassName?: string;
	as?: OverlayDialogElement;
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
 * dialogue (`initialFocus`, un contrôle `autoFocus`, sinon le premier
 * focalisable), y reste (piège Tab), et revient au déclencheur à la fermeture.
 */
export function OverlayDialog({
	open,
	onClose,
	closeOnBackdrop = true,
	backdropClassName,
	panelClassName,
	as = "div",
	initialFocus,
	ariaLabel,
	ariaLabelledBy,
	panelRef,
	panelProps,
	children,
	style,
}: OverlayDialogProps) {
	const innerRef = useRef<HTMLElement | null>(null);
	const setPanelRef = useMergedRefs<HTMLElement>(innerRef, panelRef);

	// Échap passe par la pile partagée (et non par un écouteur `document` isolé) :
	// sans ça, une seule frappe fermerait à la fois la liste d'un Select ouvert DANS
	// le dialogue et le dialogue lui-même. La couche est `escapeOnly` — le clic
	// extérieur reste l'affaire du voile, via `closeOnBackdrop`.
	// Le voile, et non le seul panneau, est l'intérieur de la couche : il recouvre
	// tout, donc un clic dessus ne concerne que ce dialogue et ne doit jamais
	// refermer le Popover ou le menu d'où il est issu — ce qui le démonterait.
	const backdropRef = useRef<HTMLDivElement | null>(null);
	useDismiss(open, onClose, [backdropRef], { escapeOnly: true });

	// Verrou de défilement : la page ne défile plus derrière le voile.
	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);

	// Le focus d'origine, lu AVANT que le contenu monté ne le prenne : un contrôle
	// `autoFocus` le prend pendant la phase de mise en page du commit, avant tout
	// `useEffect` et même avant les `useLayoutEffect` du parent. Seul un effet
	// d'insertion passe avant ; il ne fait que lire, c'est son usage permis.
	const previousFocus = useRef<HTMLElement | null>(null);
	useInsertionEffect(() => {
		if (open) previousFocus.current = document.activeElement as HTMLElement | null;
	}, [open]);

	// Restaure le focus d'origine à la fermeture.
	useEffect(() => {
		if (!open) return;
		const previous = previousFocus.current;
		return () => previous?.focus?.();
	}, [open]);

	// Entrée du focus dans le dialogue : un contrôle `autoFocus` qui l'a déjà pris le
	// garde ; sinon `initialFocus`, le premier focalisable, ou le panneau lui-même.
	// `initialFocus` est lu ici, à l'ouverture : il ne relance pas l'effet.
	const initialFocusRef = useLatest(initialFocus);
	useEffect(() => {
		if (open && innerRef.current) focusInto(innerRef.current, initialFocusRef.current?.current);
	}, [open]);

	// Piège Tab : le focus ne peut pas sortir derrière le voile.
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			const panel = innerRef.current;
			if (panel) trapTab(e, panel);
		};
		// Un Tab né dans une autre couche (un menu ouvert depuis le dialogue) : le piège
		// l'a laissé passer pour qu'elle se referme, et elle a rendu le focus à son
		// déclencheur, DANS le dialogue. Ce second passage, après elle (phase de
		// remontée), boucle de nouveau aux bords : sinon le Tab repartait du
		// déclencheur et, s'il était le dernier, sortait du dialogue.
		const onKeyDownAfter = (e: KeyboardEvent) => {
			const panel = innerRef.current;
			if (e.key !== "Tab" || e.defaultPrevented || !panel) return;
			if (!(e.target instanceof Node) || panel.contains(e.target)) return;
			if (panel.contains(document.activeElement)) trapTab(e, panel);
		};
		document.addEventListener("keydown", onKeyDown, true);
		document.addEventListener("keydown", onKeyDownAfter);
		return () => {
			document.removeEventListener("keydown", onKeyDown, true);
			document.removeEventListener("keydown", onKeyDownAfter);
		};
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
