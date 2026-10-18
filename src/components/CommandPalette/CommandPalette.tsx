import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	type ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { filterCommands, groupCommands } from "../../lib/commandPalette";
import { useLabels } from "../../lib/i18n";
import { Search } from "../../lib/icons";
import { OverlayDialog, type ReservedPanelAttr } from "../../lib/OverlayDialog";
import { useId } from "../../lib/useId";

export interface Command {
	id: string;
	label: string;
	keywords?: string;
	group?: string;
	icon?: ReactNode;
	shortcut?: string;
	onRun: () => void;
}

/** Id d'une option : sert à la fois à `aria-activedescendant` et au défilement. */
const optionId = (listId: string, index: number) => `${listId}-opt-${index}`;

/**
 * Une listbox ne possède que des `option` et des `group` : un groupe titré porte
 * son nom, un conteneur sans titre s'efface de l'arbre pour ne pas rompre cette
 * relation entre la liste et ses options.
 */
function groupProps(group: string): HTMLAttributes<HTMLDivElement> {
	return group ? { role: "group", "aria-label": group } : { role: "presentation" };
}

/**
 * Le panneau est un `div` aux attributs natifs, `title` natif compris : la palette
 * n'a pas de titre maison, d'où l'absence de `DialogPanelProps`. Ce qu'il se
 * réserve, `children` compris, fait foi dans `ReservedPanelAttr`
 * (`src/lib/OverlayDialog.tsx`). Le nom accessible passe par l'`aria-label`
 * natif (règle 1), comme Meter, Progress et RangeSlider.
 */
export interface CommandPaletteProps
	extends Omit<ComponentPropsWithoutRef<"div">, ReservedPanelAttr> {
	open: boolean;
	onClose: () => void;
	commands: Command[];
	placeholder?: string;
	emptyMessage?: string;
	/**
	 * Au plus `limit` commandes affichées : les premières qui correspondent. Au-delà, une
	 * ligne dit combien d'autres correspondent, que la recherche précise. Une liste de
	 * plus de mille commandes (des fiches, des clients…) s'ouvre ainsi sans délai : la
	 * palette ne rend que ce qu'on parcourt. Sans : toutes.
	 */
	limit?: number;
}

export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
	(
		{
			open,
			onClose,
			commands,
			placeholder,
			emptyMessage,
			limit,
			className,
			style,
			"aria-label": ariaLabel,
			...rest
		},
		ref,
	) => {
		const labels = useLabels();
		const [query, setQuery] = useState("");
		const [active, setActive] = useState(0);
		const inputRef = useRef<HTMLInputElement>(null);
		const listId = useId("camply-cmdk");
		const prompt = placeholder ?? labels.commandPalettePlaceholder;
		// `listbox` exige un nom accessible : celui de la palette, pas le placeholder.
		const paletteLabel = ariaLabel ?? labels.commandPalette;

		const results = useMemo(() => filterCommands(commands, query), [commands, query]);
		const shown = useMemo(
			() => (limit !== undefined && results.length > limit ? results.slice(0, limit) : results),
			[results, limit],
		);
		const groups = useMemo(() => groupCommands(shown), [shown]);
		const hidden = results.length - shown.length;

		useEffect(() => {
			if (open) {
				setQuery("");
				setActive(0);
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
			// Entrée qui valide un mot en cours de composition (japonais, chinois…) : pas une commande.
			if (e.nativeEvent.isComposing) return;
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault();
					setActive((a) => clamp(a + 1, 0, groups.flat.length - 1));
					break;
				case "ArrowUp":
					e.preventDefault();
					setActive((a) => clamp(a - 1, 0, groups.flat.length - 1));
					break;
				case "Enter":
					e.preventDefault();
					if (groups.flat[active]) run(groups.flat[active]);
					break;
			}
		};

		useEffect(() => {
			document.getElementById(optionId(listId, active))?.scrollIntoView({ block: "nearest" });
		}, [active, listId]);

		return (
			<OverlayDialog
				open={open}
				onClose={onClose}
				backdropClassName="camply-commandpalette__backdrop"
				panelClassName={cn("camply-commandpalette__panel", className)}
				style={style}
				// Le focus entre dans le champ, pas sur le premier bouton : on tape aussitôt.
				initialFocus={inputRef}
				ariaLabel={paletteLabel}
				// La racine publique de la palette, c'est le panneau : ref et attributs
				// natifs y atterrissent, pas sur le voile.
				panelRef={ref}
				panelProps={rest}
			>
				<div className="camply-commandpalette__searchRow">
					<Search size={18} className="camply-commandpalette__searchIcon" />
					{/* Pattern APG « Combobox with Listbox Popup » : le focus reste dans le champ,
					    c'est aria-activedescendant qui fait annoncer la commande active. */}
					<input
						ref={inputRef}
						role="combobox"
						aria-expanded="true"
						aria-controls={listId}
						aria-autocomplete="list"
						aria-label={prompt}
						aria-activedescendant={groups.flat[active] ? optionId(listId, active) : undefined}
						className="camply-commandpalette__input"
						placeholder={prompt}
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
							setActive(0);
						}}
						onKeyDown={onKeyDown}
					/>
					<kbd className="camply-commandpalette__esc">Esc</kbd>
				</div>

				<div
					id={listId}
					role="listbox"
					aria-label={paletteLabel}
					className="camply-commandpalette__list"
				>
					{groups.flat.length === 0 && (
						<div className="camply-commandpalette__empty">{emptyMessage ?? labels.noCommands}</div>
					)}
					{[...groups.byGroup.entries()].map(([group, cmds]) => (
						<div key={group || "_"} className="camply-commandpalette__group" {...groupProps(group)}>
							{/* Le titre est déjà le nom du groupe (aria-label) : le laisser aussi
							    dans l'arbre le ferait annoncer deux fois, et glisserait du texte
							    libre entre les options de la listbox. */}
							{group && (
								<div className="camply-commandpalette__groupLabel" aria-hidden="true">
									{group}
								</div>
							)}
							{cmds.map((cmd) => {
								const idx = groups.index.get(cmd) ?? 0;
								return (
									<button
										key={cmd.id}
										type="button"
										id={optionId(listId, idx)}
										// Le <button> garde le style et le clic ; role="option" le rattache
										// à la listbox, et tabIndex=-1 le sort de l'ordre de tabulation
										// (la navigation se fait aux flèches depuis le champ).
										role="option"
										aria-selected={idx === active}
										tabIndex={-1}
										className={cn(
											"camply-commandpalette__item",
											idx === active && "camply-commandpalette__active",
										)}
										// Un vrai mouvement du pointeur, pas `mouseenter` : le défilement aux
										// flèches fait passer la liste sous un curseur immobile, et l'entrée
										// survolée volait alors la sélection (Entrée lançait la mauvaise).
										onPointerMove={() => setActive(idx)}
										onClick={() => run(cmd)}
									>
										{cmd.icon && (
											<span className="camply-commandpalette__itemIcon">{cmd.icon}</span>
										)}
										<span className="camply-commandpalette__itemLabel">{cmd.label}</span>
										{cmd.shortcut && (
											<kbd className="camply-commandpalette__shortcut">{cmd.shortcut}</kbd>
										)}
									</button>
								);
							})}
						</div>
					))}
				</div>
				{/* Hors de la listbox, qui ne possède que des options et des groupes ; annoncé quand
				    une frappe change le nombre de commandes cachées. */}
				{hidden > 0 && (
					<p className="camply-commandpalette__more" aria-live="polite">
						{labels.moreCommands(hidden)}
					</p>
				)}
			</OverlayDialog>
		);
	},
);

CommandPalette.displayName = "CommandPalette";

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
