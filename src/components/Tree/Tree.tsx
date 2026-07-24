import {
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	type ReactNode,
	useMemo,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { ChevronRight } from "../../lib/icons";
import { useControllable } from "../../lib/useControllable";

export interface TreeNode {
	id: string;
	label: ReactNode;
	icon?: ReactNode;
	children?: TreeNode[];
}

export interface TreeProps extends Omit<HTMLAttributes<HTMLUListElement>, "onSelect"> {
	nodes: TreeNode[];
	selectedId?: string;
	defaultSelectedId?: string;
	onSelect?: (id: string) => void;
	defaultExpanded?: string[];
	guides?: boolean;
}

/** Nœud visible aplati : c'est cette liste que la navigation clavier parcourt. */
interface FlatNode {
	node: TreeNode;
	depth: number;
	parentId?: string;
	hasChildren: boolean;
	isOpen: boolean;
}

/** Délai au-delà duquel la saisie au clavier repart d'une nouvelle recherche. */
const TYPEAHEAD_RESET = 500;

export const Tree = forwardRef<HTMLUListElement, TreeProps>(function Tree(
	{
		nodes,
		selectedId,
		defaultSelectedId,
		onSelect,
		defaultExpanded = [],
		guides = false,
		className,
		onKeyDown,
		...rest
	},
	ref,
) {
	const [selected, setSelected] = useControllable(selectedId, defaultSelectedId, onSelect, {
		allowUndefined: true,
	});
	const [expanded, setExpanded] = useState<Set<string>>(() => new Set(defaultExpanded));
	const [focusedId, setFocusedId] = useState<string>();
	const rows = useRef(new Map<string, HTMLDivElement>()).current;
	const search = useRef({ query: "", at: 0 });

	// Les nœuds visibles à plat : l'ordre des flèches Haut/Bas est celui de l'écran.
	const visible = useMemo(() => {
		const flat: FlatNode[] = [];
		const walk = (list: TreeNode[], depth: number, parentId?: string) => {
			for (const node of list) {
				const hasChildren = !!node.children?.length;
				const isOpen = hasChildren && expanded.has(node.id);
				flat.push({ node, depth, parentId, hasChildren, isOpen });
				if (isOpen) walk(node.children ?? [], depth + 1, node.id);
			}
		};
		walk(nodes, 0);
		return flat;
	}, [nodes, expanded]);

	// Roving tabindex : un seul nœud tabbable — le focusé, sinon le sélectionné, sinon le premier.
	const activeId = useMemo(() => {
		const isVisible = (id?: string) => !!id && visible.some((f) => f.node.id === id);
		if (isVisible(focusedId)) return focusedId;
		if (isVisible(selected)) return selected;
		return visible[0]?.node.id;
	}, [focusedId, selected, visible]);

	const setOpen = (id: string, open: boolean) =>
		setExpanded((prev) => {
			const next = new Set(prev);
			if (open) next.add(id);
			else next.delete(id);
			return next;
		});

	const focusNode = (id: string | undefined) => {
		if (!id) return;
		setFocusedId(id);
		rows.get(id)?.focus();
	};

	const activate = (node: TreeNode, hasChildren: boolean) => {
		setFocusedId(node.id);
		setSelected(node.id);
		if (hasChildren) setOpen(node.id, !expanded.has(node.id));
	};

	/** Saisie au clavier : saute au nœud visible dont le libellé commence par ce qui est tapé. */
	const typeahead = (e: KeyboardEvent<HTMLUListElement>, from: number) => {
		if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey || !e.key.trim()) return;
		const now = Date.now();
		const previous = now - search.current.at < TYPEAHEAD_RESET ? search.current.query : "";
		const query = previous + e.key.toLowerCase();
		search.current = { query, at: now };

		// Une lettre répétée avance au suivant ; une saisie continue affine sur place.
		const start = query.length > 1 ? from : from + 1;
		const ordered = [...visible.slice(start), ...visible.slice(0, start)];
		const hit = ordered.find((f) =>
			rows.get(f.node.id)?.textContent?.trim().toLowerCase().startsWith(query),
		);
		if (!hit) return;
		e.preventDefault();
		focusNode(hit.node.id);
	};

	// Navigation APG portée par l'arbre lui-même : les touches remontent depuis le nœud focusé.
	const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
		onKeyDown?.(e);
		if (e.defaultPrevented || visible.length === 0) return;

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
			default:
				typeahead(e, index);
		}
	};

	const renderNodes = (list: TreeNode[], depth: number): ReactNode =>
		list.map((node) => {
			const hasChildren = !!node.children?.length;
			const isOpen = hasChildren && expanded.has(node.id);
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
					>
						<span className={"camply-tree__caret"}>
							{hasChildren && (
								<ChevronRight
									size={14}
									className={cn("camply-tree__caretIcon", isOpen && "camply-tree__caretOpen")}
								/>
							)}
						</span>
						{node.icon && <span className={"camply-tree__icon"}>{node.icon}</span>}
						<span className={"camply-tree__label"}>{node.label}</span>
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
		<ul
			ref={ref}
			className={cn("camply-tree__tree", className)}
			// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: ul+role="tree" est le pattern ARIA canonique — la navigation clavier vit sur l'arbre, les treeitem se partagent un tabindex (roving)
			role="tree"
			onKeyDown={handleKeyDown}
			{...rest}
		>
			{renderNodes(nodes, 0)}
		</ul>
	);
});
