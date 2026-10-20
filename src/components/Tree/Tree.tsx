import {
	type ForwardedRef,
	forwardRef,
	type HTMLAttributes,
	type ReactNode,
	type RefAttributes,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { compose } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { ChevronRight } from "../../lib/icons";
import { useTypeahead } from "../../lib/typeahead";
import { useControllable } from "../../lib/useControllable";

/**
 * Nœud d'arbre. `T` est la charge utile du consommateur : elle voyage avec le
 * nœud jusqu'à `onSelect`, ce qui évite de re-chercher le nœud dans l'arbre
 * source à chaque sélection. `TreeNode` nu (sans paramètre) reste valide : `data`
 * vaut alors `never`, donc simplement absent.
 */
export interface TreeNode<T = never> {
	id: string;
	label: ReactNode;
	icon?: ReactNode;
	/** Données libres attachées au nœud — jamais lues par le composant. */
	data?: T;
	children?: TreeNode<T>[];
}

/**
 * Attributs que la racine se réserve (règle 3) : `role="tree"` porte la navigation
 * clavier, le tabindex tournant et les `treeitem` enfants ; le contenu vient de `nodes`.
 */
type ReservedTreeAttr = "role" | "children" | "dangerouslySetInnerHTML";

export interface TreeProps<T = never>
	extends Omit<HTMLAttributes<HTMLUListElement>, "onSelect" | ReservedTreeAttr> {
	nodes: TreeNode<T>[];
	selectedId?: string;
	defaultSelectedId?: string;
	/** Reçoit l'id du nœud, puis le nœud complet. */
	onSelect?: (id: string, node: TreeNode<T>) => void;
	/** Nœuds dépliés, pilotés par le parent (règle 2), pour accorder l'arbre à une route. */
	expanded?: string[];
	/** Nœuds dépliés au montage, en mode non contrôlé. */
	defaultExpanded?: string[];
	onExpandedChange?: (expanded: string[]) => void;
	guides?: boolean;
}

/** Nœud visible aplati : c'est cette liste que la navigation clavier parcourt. */
interface FlatNode<T> {
	node: TreeNode<T>;
	depth: number;
	parentId?: string;
	hasChildren: boolean;
	isOpen: boolean;
}

const TreeRoot = forwardRef(function Tree<T>(
	{
		nodes,
		selectedId,
		defaultSelectedId,
		onSelect,
		expanded,
		defaultExpanded = [],
		onExpandedChange,
		guides = false,
		className,
		onKeyDown,
		...rest
	}: TreeProps<T>,
	ref: ForwardedRef<HTMLUListElement>,
) {
	// Index id → nœud sur l'arbre entier : c'est lui qui permet de rendre le nœud
	// à `onSelect` sans le faire re-chercher au consommateur.
	const byId = useMemo(() => {
		const map = new Map<string, TreeNode<T>>();
		const walk = (list: TreeNode<T>[]) => {
			for (const node of list) {
				map.set(node.id, node);
				if (node.children) walk(node.children);
			}
		};
		walk(nodes);
		return map;
	}, [nodes]);

	// `useControllable` ne transporte qu'une valeur : le nœud est rattaché ici, au
	// moment d'émettre.
	const emitSelect = useCallback(
		(id: string | undefined) => {
			if (id === undefined) return;
			const node = byId.get(id);
			// Les sélections ne naissent que de nœuds rendus : l'absence est impossible
			// en pratique, mais on préfère ne rien émettre à émettre un nœud inventé.
			if (node) onSelect?.(id, node);
		},
		[byId, onSelect],
	);

	const [selected, setSelected] = useControllable(selectedId, defaultSelectedId, emitSelect, {
		allowUndefined: true,
	});
	const [expandedIds, setExpandedIds] = useControllable<string[]>(
		expanded,
		defaultExpanded,
		onExpandedChange,
	);
	// L'appartenance se teste à chaque nœud rendu et à chaque touche : un Set dérivé
	// une fois coûte moins qu'un `includes` par nœud.
	const open = useMemo(() => new Set(expandedIds), [expandedIds]);
	const [focusedId, setFocusedId] = useState<string>();
	const rows = useRef(new Map<string, HTMLDivElement>()).current;
	const typeahead = useTypeahead();

	// Les nœuds visibles à plat : l'ordre des flèches Haut/Bas est celui de l'écran.
	const visible = useMemo(() => {
		const flat: FlatNode<T>[] = [];
		const walk = (list: TreeNode<T>[], depth: number, parentId?: string) => {
			for (const node of list) {
				const hasChildren = !!node.children?.length;
				const isOpen = hasChildren && open.has(node.id);
				flat.push({ node, depth, parentId, hasChildren, isOpen });
				if (isOpen) walk(node.children ?? [], depth + 1, node.id);
			}
		};
		walk(nodes, 0);
		return flat;
	}, [nodes, open]);

	// Roving tabindex : un seul nœud tabbable — le focusé, sinon le sélectionné, sinon le premier.
	const activeId = useMemo(() => {
		const isVisible = (id?: string) => !!id && visible.some((f) => f.node.id === id);
		if (isVisible(focusedId)) return focusedId;
		if (isVisible(selected)) return selected;
		return visible[0]?.node.id;
	}, [focusedId, selected, visible]);

	// `set` de useControllable ne prend pas d'updater : on part de l'état courant,
	// comme Accordion. Le Set garantit au passage l'absence de doublon.
	const setOpen = (id: string, isOpen: boolean) => {
		const next = new Set(open);
		if (isOpen) next.add(id);
		else next.delete(id);
		setExpandedIds([...next]);
	};

	const focusNode = (id: string | undefined) => {
		if (!id) return;
		setFocusedId(id);
		rows.get(id)?.focus();
	};

	const activate = (node: TreeNode<T>, hasChildren: boolean) => {
		setFocusedId(node.id);
		setSelected(node.id);
		if (hasChildren) setOpen(node.id, !open.has(node.id));
	};

	// Navigation APG portée par l'arbre lui-même : les touches remontent depuis le nœud focusé.
	const handleKeyDown = compose(onKeyDown, (e) => {
		if (visible.length === 0) return;

		const found = visible.findIndex((f) => f.node.id === activeId);
		const index = found === -1 ? 0 : found;
		const current = visible[index];
		const move = (to: number) => {
			e.preventDefault();
			focusNode(visible[Math.min(Math.max(to, 0), visible.length - 1)]?.node.id);
		};

		switch (e.key) {
			case "ArrowDown":
				return move(index + 1);
			case "ArrowUp":
				return move(index - 1);
			case "Home":
				return move(0);
			case "End":
				return move(visible.length - 1);
			case "ArrowRight": {
				e.preventDefault();
				if (!current.hasChildren) return;
				// Fermé : on déplie. Ouvert : on descend sur le 1er enfant (= nœud visible suivant).
				if (current.isOpen) focusNode(visible[index + 1]?.node.id);
				else setOpen(current.node.id, true);
				return;
			}
			case "ArrowLeft": {
				e.preventDefault();
				// Ouvert : on replie. Sinon : on remonte au parent.
				if (current.isOpen) setOpen(current.node.id, false);
				else focusNode(current.parentId);
				return;
			}
			case "Enter":
			case " ": {
				e.preventDefault();
				activate(current.node, current.hasChildren);
				return;
			}
			default: {
				// Typeahead : le texte est lu dans la table des lignes rendues, la recherche
				// elle-même est partagée avec le menu (src/lib/typeahead.ts).
				const labels = visible.map((f) => rows.get(f.node.id)?.textContent);
				const at = typeahead.find(e, labels, index);
				if (at === -1) return;
				e.preventDefault();
				focusNode(visible[at].node.id);
			}
		}
	});

	const renderNodes = (list: TreeNode<T>[], depth: number): ReactNode =>
		list.map((node) => {
			const hasChildren = !!node.children?.length;
			const isOpen = hasChildren && open.has(node.id);
			const isSelected = selected === node.id;
			return (
				<li key={node.id} role="none">
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: le clavier est géré une seule fois sur le <ul role="tree"> (pattern APG), pas sur chaque nœud */}
					<div
						ref={(el) => {
							if (el) rows.set(node.id, el);
							else rows.delete(node.id);
						}}
						role="treeitem"
						tabIndex={node.id === activeId ? 0 : -1}
						aria-expanded={hasChildren ? isOpen : undefined}
						aria-selected={isSelected}
						aria-level={depth + 1}
						className={cn(
							"camply-tree__row",
							"camply-focus-ring",
							isSelected && "camply-tree__selected",
						)}
						style={{ paddingLeft: guides ? 8 : 8 + depth * 18 }}
						onClick={() => activate(node, hasChildren)}
						// Le focus arrive aussi d'ailleurs (lecteur d'écran, `.focus()`, glisser
						// hors d'un clic) : les flèches doivent partir de là où il est.
						onFocus={() => setFocusedId(node.id)}
					>
						<span className="camply-tree__caret">
							{hasChildren && (
								<ChevronRight
									size={14}
									className={cn("camply-tree__caretIcon", isOpen && "camply-tree__caretOpen")}
								/>
							)}
						</span>
						{node.icon && <span className="camply-tree__icon">{node.icon}</span>}
						<span className="camply-tree__label">{node.label}</span>
					</div>
					{hasChildren && isOpen && (
						// biome-ignore lint/a11y/useSemanticElements: ul+role="group" est le pattern ARIA des sous-arbres
						<ul className={cn("camply-tree__group", guides && "camply-tree__guided")} role="group">
							{renderNodes(node.children ?? [], depth + 1)}
						</ul>
					)}
				</li>
			);
		});

	return (
		// Règle 3 : le spread d'abord ; un `role` du consommateur détruirait la
		// sémantique dont dépendent le clavier et les `treeitem`.
		<ul
			{...rest}
			ref={ref}
			// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: ul+role="tree" est le pattern ARIA canonique — la navigation clavier vit sur l'arbre, les treeitem se partagent un tabindex (roving)
			role="tree"
			className={cn("camply-tree__tree", className)}
			onKeyDown={handleKeyDown}
		>
			{renderNodes(nodes, 0)}
		</ul>
	);
});

/**
 * Arbre APG (`ul[role=tree]`, tabindex tournant). `forwardRef` efface le
 * paramètre générique : on le restaure par un cast, pour que `T` continue d'être
 * inféré depuis `nodes` — et que `<Tree nodes={…} />` sans `data` reste écrivable
 * sans annotation.
 */
export const Tree = TreeRoot as <T = never>(
	props: TreeProps<T> & RefAttributes<HTMLUListElement>,
) => ReactNode;
