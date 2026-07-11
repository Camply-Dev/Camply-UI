import {
	type CSSProperties,
	type KeyboardEvent,
	type ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { Search } from "../../lib/icons";
import { Portal } from "../../lib/Portal";
export interface Command {
	id: string;
	label: string;
	/** shown under / beside the label, and used for matching */
	keywords?: string;
	group?: string;
	icon?: ReactNode;
	shortcut?: string;
	onRun: () => void;
}

export interface CommandPaletteProps {
	open: boolean;
	onClose: () => void;
	commands: Command[];
	placeholder?: string;
	emptyMessage?: string;
	/** applied to the palette panel */
	className?: string;
	style?: CSSProperties;
}

/** ⌘K-style command palette. Bind `open` to a global shortcut yourself, or
 *  use the exported `useCommandPalette` helper below. */
export function CommandPalette({
	open,
	onClose,
	commands,
	placeholder = "Tape une commande ou recherche…",
	emptyMessage = "Aucune commande",
	className,
	style,
}: CommandPaletteProps) {
	const [query, setQuery] = useState("");
	const [active, setActive] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	const results = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return commands;
		return commands.filter((c) =>
			`${c.label} ${c.keywords ?? ""} ${c.group ?? ""}`.toLowerCase().includes(q),
		);
	}, [commands, query]);

	// Group results, preserving order of first appearance.
	const groups = useMemo(() => {
		const byGroup = new Map<string, Command[]>();
		for (const cmd of results) {
			const key = cmd.group ?? "";
			const list = byGroup.get(key);
			if (list) list.push(cmd);
			else byGroup.set(key, [cmd]);
		}
		// flat index lookup for keyboard nav
		const flat: Command[] = [];
		for (const list of byGroup.values()) flat.push(...list);
		return { byGroup, flat };
	}, [results]);

	useEffect(() => {
		if (open) {
			setQuery("");
			setActive(0);
			// focus after the portal paints
			requestAnimationFrame(() => inputRef.current?.focus());
		}
	}, [open]);

	const run = useCallback(
		(cmd: Command) => {
			onClose();
			cmd.onRun();
		},
		[onClose],
	);

	const onKeyDown = (e: KeyboardEvent) => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setActive((a) => Math.min(a + 1, groups.flat.length - 1));
				break;
			case "ArrowUp":
				e.preventDefault();
				setActive((a) => Math.max(a - 1, 0));
				break;
			case "Enter":
				e.preventDefault();
				if (groups.flat[active]) run(groups.flat[active]);
				break;
			case "Escape":
				e.preventDefault();
				onClose();
				break;
		}
	};

	useEffect(() => {
		const el = listRef.current?.querySelector(`[data-index="${active}"]`);
		(el as HTMLElement | null)?.scrollIntoView({ block: "nearest" });
	}, [active]);

	if (!open) return null;

	return (
		<Portal>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: fermeture au clic sur le backdrop — chemin clavier équivalent : Échap */}
			<div
				className={"camply-commandpalette__backdrop"}
				onMouseDown={(e) => e.target === e.currentTarget && onClose()}
			>
				<div
					role="dialog"
					aria-modal="true"
					aria-label="Palette de commandes"
					className={cn("camply-commandpalette__panel", className)}
					style={style}
				>
					<div className={"camply-commandpalette__searchRow"}>
						<Search size={18} className={"camply-commandpalette__searchIcon"} />
						<input
							ref={inputRef}
							className={"camply-commandpalette__input"}
							placeholder={placeholder}
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
								setActive(0);
							}}
							onKeyDown={onKeyDown}
						/>
						<kbd className={"camply-commandpalette__esc"}>Esc</kbd>
					</div>

					<div ref={listRef} className={"camply-commandpalette__list"}>
						{groups.flat.length === 0 && (
							<div className={"camply-commandpalette__empty"}>{emptyMessage}</div>
						)}
						{[...groups.byGroup.entries()].map(([group, cmds]) => (
							<div key={group || "_"} className={"camply-commandpalette__group"}>
								{group && <div className={"camply-commandpalette__groupLabel"}>{group}</div>}
								{cmds.map((cmd) => {
									const idx = groups.flat.indexOf(cmd);
									return (
										<button
											key={cmd.id}
											type="button"
											data-index={idx}
											className={cn(
												"camply-commandpalette__item",
												idx === active && "camply-commandpalette__active",
											)}
											onMouseEnter={() => setActive(idx)}
											onClick={() => run(cmd)}
										>
											{cmd.icon && (
												<span className={"camply-commandpalette__itemIcon"}>{cmd.icon}</span>
											)}
											<span className={"camply-commandpalette__itemLabel"}>{cmd.label}</span>
											{cmd.shortcut && (
												<kbd className={"camply-commandpalette__shortcut"}>{cmd.shortcut}</kbd>
											)}
										</button>
									);
								})}
							</div>
						))}
					</div>
				</div>
			</div>
		</Portal>
	);
}

/** Opens the palette on ⌘K / Ctrl-K. Returns [open, setOpen]. */
export function useCommandPalette(): [boolean, (open: boolean) => void] {
	const [open, setOpen] = useState(false);
	useEffect(() => {
		const onKey = (e: globalThis.KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen((o) => !o);
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, []);
	return [open, setOpen];
}
