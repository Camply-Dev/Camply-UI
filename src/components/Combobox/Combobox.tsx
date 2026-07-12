import {
	type CSSProperties,
	type KeyboardEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { Check, ChevronDown, Search } from "../../lib/icons";
import { Portal } from "../../lib/Portal";
import { useAnchor } from "../../lib/useAnchor";
import { useControllable } from "../../lib/useControllable";
import { useDismiss } from "../../lib/useDismiss";
import { useId } from "../../lib/useId";
import { useListboxNav } from "../../lib/useListboxNav";
export interface ComboboxOption<T extends string = string> {
	value: T;
	label: string;
	disabled?: boolean;
}

export interface ComboboxProps<T extends string = string> {
	options: ComboboxOption<T>[];
	value?: T;
	defaultValue?: T;
	onChange?: (value: T) => void;
	placeholder?: string;
	label?: string;
	emptyMessage?: string;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
	/** custom filter; defaults to case-insensitive "includes" */
	filter?: (option: ComboboxOption<T>, query: string) => boolean;
}

const defaultFilter = <T extends string>(option: ComboboxOption<T>, query: string) =>
	option.label.toLowerCase().includes(query.toLowerCase());

/**
 * Autocomplete: a text input that filters a list of options. The list is
 * portalled + anchored so it is never clipped, and fully keyboard-navigable.
 */
export function Combobox<T extends string = string>({
	options,
	value,
	defaultValue,
	onChange,
	placeholder = "Rechercher…",
	label,
	emptyMessage = "Aucun résultat",
	disabled = false,
	className,
	style,
	filter = defaultFilter,
}: ComboboxProps<T>) {
	const [selected, setSelected] = useControllable<T | undefined>(
		value,
		defaultValue,
		onChange as ((v: T | undefined) => void) | undefined,
	);
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");

	const wrapRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLUListElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const listId = useId("combobox");

	const floatStyle = useAnchor(wrapRef, listRef, open, {
		placement: "bottom-start",
		gap: 6,
		matchWidth: true,
		constrainHeight: true,
	});

	const close = useCallback(() => setOpen(false), []);
	useDismiss(open, close, [wrapRef, listRef]);

	const selectedOption = options.find((o) => o.value === selected);
	const filtered = useMemo(
		() => (query ? options.filter((o) => filter(o, query)) : options),
		[options, query, filter],
	);
	// Combobox garde ses propres flèches (sans boucle) : on ne reprend du hook que
	// l'index actif et le défilement automatique de l'option active.
	const { active, setActive } = useListboxNav(listRef, open, filtered);

	// À chaque nouvelle liste filtrée, place l'actif sur la première option activable
	// (sinon Enter sur une première option désactivée ne ferait rien).
	useEffect(() => {
		const first = filtered.findIndex((o) => !o.disabled);
		setActive(first < 0 ? 0 : first);
	}, [filtered, setActive]);

	// Déplace l'option active en sautant les désactivées, sans boucler.
	const moveActive = (dir: 1 | -1) => {
		setActive((prev) => {
			for (let next = prev + dir; next >= 0 && next < filtered.length; next += dir) {
				if (!filtered[next].disabled) return next;
			}
			return prev;
		});
	};

	const displayValue = open ? query : (selectedOption?.label ?? "");

	const pick = (opt: ComboboxOption<T>) => {
		if (opt.disabled) return;
		setSelected(opt.value);
		setQuery("");
		setOpen(false);
		inputRef.current?.blur();
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (disabled) return;
		if (!open && ["ArrowDown", "ArrowUp"].includes(e.key)) {
			setOpen(true);
			return;
		}
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				moveActive(1);
				break;
			case "ArrowUp":
				e.preventDefault();
				moveActive(-1);
				break;
			case "Enter":
				e.preventDefault();
				if (filtered[active]) pick(filtered[active]);
				break;
			// Échap est déjà géré par useDismiss (écoute au niveau document).
		}
	};

	return (
		<div className={cn("camply-combobox__root", className)} style={style}>
			{label && <span className={"camply-combobox__label"}>{label}</span>}
			<div
				ref={wrapRef}
				className={cn(
					"camply-combobox__control",
					open && "camply-combobox__open",
					disabled && "camply-combobox__disabled",
				)}
			>
				<Search size={16} className={"camply-combobox__searchIcon"} />
				<input
					ref={inputRef}
					type="text"
					role="combobox"
					aria-expanded={open}
					aria-controls={listId}
					aria-autocomplete="list"
					aria-activedescendant={open && filtered[active] ? `${listId}-opt-${active}` : undefined}
					className={"camply-combobox__input"}
					placeholder={placeholder}
					value={displayValue}
					disabled={disabled}
					onFocus={() => setOpen(true)}
					onChange={(e) => {
						setQuery(e.target.value);
						setActive(0);
						setOpen(true);
					}}
					onKeyDown={onKeyDown}
				/>
				<ChevronDown
					size={16}
					className={cn("camply-combobox__chevron", open && "camply-combobox__chevronOpen")}
				/>
			</div>

			{open && (
				<Portal>
					{/* Pattern combobox ARIA : le focus reste dans l'input, qui gère le clavier
					    et pointe l'option active via aria-activedescendant. */}
					<ul
						ref={listRef}
						id={listId}
						// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: ul+role="listbox" est le pattern ARIA canonique
						role="listbox"
						className="camply-floating-surface camply-floating-list camply-combobox__list"
						style={floatStyle}
					>
						{filtered.length === 0 ? (
							<li className={"camply-combobox__empty"}>{emptyMessage}</li>
						) : (
							filtered.map((opt, i) => {
								const isSelected = opt.value === selected;
								return (
									// biome-ignore lint/a11y/useFocusableInteractive: les options ne prennent pas le focus — piloté par aria-activedescendant depuis l'input
									// biome-ignore lint/a11y/useKeyWithClickEvents: clavier géré au niveau de l'input (↑/↓/Enter/Esc)
									<li
										key={opt.value}
										id={`${listId}-opt-${i}`}
										// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: li+role="option" est le pattern ARIA canonique
										role="option"
										aria-selected={isSelected}
										className={cn(
											"camply-listbox-option",
											"camply-combobox__option",
											i === active && "camply-listbox-option--active",
											opt.disabled && "camply-listbox-option--disabled",
										)}
										onMouseEnter={() => !opt.disabled && setActive(i)}
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => pick(opt)}
									>
										<span>{opt.label}</span>
										{isSelected && <Check size={15} className={"camply-combobox__tick"} />}
									</li>
								);
							})
						)}
					</ul>
				</Portal>
			)}
		</div>
	);
}
