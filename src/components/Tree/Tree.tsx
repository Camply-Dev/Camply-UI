import { type CSSProperties, type ReactNode, useState } from "react";
import { cn } from "../../lib/cn";
import { ChevronRight } from "../../lib/icons";
import { useControllable } from "../../lib/useControllable";

export interface TreeNode {
	id: string;
	label: ReactNode;
	icon?: ReactNode;
	children?: TreeNode[];
}

export interface TreeProps {
	nodes: TreeNode[];
	selectedId?: string;
	defaultSelectedId?: string;
	onSelect?: (id: string) => void;
	defaultExpanded?: string[];
	guides?: boolean;
	className?: string;
	style?: CSSProperties;
}

export function Tree({
	nodes,
	selectedId,
	defaultSelectedId,
	onSelect,
	defaultExpanded = [],
	guides = false,
	className,
	style,
}: TreeProps) {
	const [selected, setSelected] = useControllable<string | undefined>(
		selectedId,
		defaultSelectedId,
		onSelect as ((v: string | undefined) => void) | undefined,
	);
	const [expanded, setExpanded] = useState<Set<string>>(() => new Set(defaultExpanded));

	const toggle = (id: string) =>
		setExpanded((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});

	const activate = (node: TreeNode, hasChildren: boolean) => {
		setSelected(node.id);
		if (hasChildren) toggle(node.id);
	};

	const renderNodes = (list: TreeNode[], depth: number): ReactNode =>
		list.map((node) => {
			const hasChildren = !!node.children?.length;
			const isOpen = expanded.has(node.id);
			const isSelected = selected === node.id;
			return (
				<li key={node.id} role="none">
					<div
						role="treeitem"
						tabIndex={0}
						aria-expanded={hasChildren ? isOpen : undefined}
						aria-selected={isSelected}
						className={cn(
							"camply-tree__row",
							"camply-focus-ring",
							isSelected && "camply-tree__selected",
						)}
						style={{ paddingLeft: guides ? 8 : 8 + depth * 18 }}
						onClick={(e) => {
							e.stopPropagation();
							activate(node, hasChildren);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								e.stopPropagation();
								activate(node, hasChildren);
							}
						}}
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
		// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: ul+role="tree" est le pattern ARIA canonique — les lignes (treeitem) sont focusables et clavier
		<ul className={cn("camply-tree__tree", className)} style={style} role="tree">
			{renderNodes(nodes, 0)}
		</ul>
	);
}
