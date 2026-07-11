import { type CSSProperties, type KeyboardEvent, useCallback, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { Check, ChevronDown } from "../../lib/icons";
import { Portal } from "../../lib/Portal";
import { useAnchor } from "../../lib/useAnchor";
import { useControllable } from "../../lib/useControllable";
import { useDismiss } from "../../lib/useDismiss";
import { useId } from "../../lib/useId";
import { useListboxNav } from "../../lib/useListboxNav";

export interface SelectOption<T extends string = string> {
	value: T;
	label: string;
	disabled?: boolean;
}

export interface SelectProps<T extends string = string> {
	options: SelectOption<T>[];
	value?: T;
	defaultValue?: T;
	onChange?: (value: T) => void;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
	style?: CSSProperties;
}

/**
 * Fully custom select — no native <select>. The listbox is rendered in a
 * Portal with viewport-aware positioning, so it is never clipped by parent
 * overflow. Keyboard: ↑/↓ move, Enter/Space select, Esc closes, Home/End jump.
 */
export function Select<T extends string = string>({
	options,
	value,
	defaultValue,
	onChange,
	placeholder = "Sélectionner…",
	label,
	disabled = false,
	size = "md",
	className,
	style,
}: SelectProps<T>) {
	const [selected, setSelected] = useControllable<T | undefined>(
		value,
		defaultValue,
		onChange as ((v: T | undefined) => void) | undefined,
	);
	const [open, setOpen] = useState(false);

	const triggerRef = useRef<HTMLButtonElement>(null);
	const listRef = useRef<HTMLUListElement>(null);
	const listId = useId("listbox");
	const { active, setActive, moveActive } = useListboxNav(listRef, open, options);

	const floatStyle = useAnchor(triggerRef, listRef, open, {
		placement: "bottom-start",
		gap: 6,
		matchWidth: true,
		constrainHeight: true,
	});

	const close = useCallback(() => setOpen(false), []);
	useDismiss(open, close, [triggerRef, listRef]);

	const selectedOption = options.find((o) => o.value === selected);

	const openMenu = () => {
		if (disabled) return;
		const idx = options.findIndex((o) => o.value === selected);
		setActive(idx >= 0 ? idx : 0);
		setOpen(true);
	};

	const pick = (opt: SelectOption<T>) => {
		if (opt.disabled) return;
		setSelected(opt.value);
		setOpen(false);
		triggerRef.current?.focus();
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (disabled) return;
		if (!open) {
			if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
				e.preventDefault();
				openMenu();
			}
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
			case "Home":
				e.preventDefault();
				setActive(options.findIndex((o) => !o.disabled));
				break;
			case "End":
				e.preventDefault();
				for (let i = options.length - 1; i >= 0; i--) {
					if (!options[i].disabled) {
						setActive(i);
						break;
					}
				}
				break;
			case "Enter":
			case " ":
				e.preventDefault();
				if (options[active]) pick(options[active]);
				break;
			case "Tab":
				setOpen(false);
				break;
		}
	};

	return (
		<div className={cn("camply-select__root", className)} style={style}>
			{label && <span className={"camply-select__label"}>{label}</span>}
			<button
				ref={triggerRef}
				type="button"
				role="combobox"
				aria-expanded={open}
				aria-haspopup="listbox"
				aria-controls={listId}
				aria-activedescendant={open ? `${listId}-opt-${active}` : undefined}
				disabled={disabled}
				className={cn(
					"camply-select__trigger",
					`camply-select__${size}`,
					open && "camply-select__open",
				)}
				onClick={() => (open ? setOpen(false) : openMenu())}
				onKeyDown={onKeyDown}
			>
				<span
					className={cn("camply-select__value", !selectedOption && "camply-select__placeholder")}
				>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<ChevronDown size={16} className={"camply-select__chevron"} />
			</button>

			{open && (
				<Portal>
					{/* Pattern listbox ARIA : le focus reste sur le trigger (combobox), qui gère
					    tout le clavier et pointe l'option active via aria-activedescendant. */}
					<ul
						ref={listRef}
						id={listId}
						// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: ul+role="listbox" est le pattern ARIA canonique
						role="listbox"
						tabIndex={-1}
						className={"camply-select__list"}
						style={floatStyle}
					>
						{options.map((opt, i) => {
							const isSelected = opt.value === selected;
							return (
								// biome-ignore lint/a11y/useFocusableInteractive: les options ne prennent pas le focus — piloté par aria-activedescendant depuis le trigger
								// biome-ignore lint/a11y/useKeyWithClickEvents: clavier géré au niveau du trigger (↑/↓/Enter/Home/End)
								<li
									key={opt.value}
									id={`${listId}-opt-${i}`}
									// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: li+role="option" est le pattern ARIA canonique
									role="option"
									aria-selected={isSelected}
									aria-disabled={opt.disabled || undefined}
									className={cn(
										"camply-select__option",
										i === active && "camply-select__active",
										opt.disabled && "camply-select__optionDisabled",
									)}
									onMouseEnter={() => !opt.disabled && setActive(i)}
									onClick={() => pick(opt)}
								>
									<span>{opt.label}</span>
									{isSelected && <Check size={15} className={"camply-select__tick"} />}
								</li>
							);
						})}
					</ul>
				</Portal>
			)}
		</div>
	);
}
