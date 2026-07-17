import {
	type ButtonHTMLAttributes,
	type KeyboardEvent,
	type MouseEvent,
	useCallback,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { Field } from "../../lib/Field";
import { Check, ChevronDown } from "../../lib/icons";
import { Listbox, ListboxOption } from "../../lib/Listbox";
import { Portal } from "../../lib/Portal";
import { useAnchor } from "../../lib/useAnchor";
import { useControllable } from "../../lib/useControllable";
import { useDismiss } from "../../lib/useDismiss";
import { useId } from "../../lib/useId";
import { firstEnabledIndex, lastEnabledIndex, useListboxNav } from "../../lib/useListboxNav";

export interface SelectOption<T extends string = string> {
	value: T;
	label: string;
	disabled?: boolean;
}

export interface SelectProps<T extends string = string>
	extends Omit<
		ButtonHTMLAttributes<HTMLButtonElement>,
		"value" | "defaultValue" | "onChange" | "type" | "name"
	> {
	options: SelectOption<T>[];
	value?: T;
	defaultValue?: T;
	onChange?: (value: T) => void;
	placeholder?: string;
	label?: string;
	/** Texte d'aide affiché sous le champ. */
	hint?: string;
	/** Message d'erreur : remplace l'aide, colore le champ et pose aria-invalid. */
	error?: string;
	/**
	 * Nom soumis avec le formulaire. La valeur part dans un <input type="hidden">,
	 * le trigger étant un <button>.
	 */
	name?: string;
	/**
	 * Marque le champ obligatoire (astérisque + aria-required). Un input caché
	 * n'étant pas soumis à la validation native, l'erreur passe par `error`.
	 */
	required?: boolean;
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
}

export function Select<T extends string = string>({
	options,
	value,
	defaultValue,
	onChange,
	placeholder = "Sélectionner…",
	label,
	hint,
	error,
	name,
	required,
	disabled = false,
	size = "md",
	id,
	className,
	style,
	onClick: onClickProp,
	onKeyDown: onKeyDownProp,
	...rest
}: SelectProps<T>) {
	const [selected, setSelected] = useControllable(value, defaultValue, onChange, {
		allowUndefined: true,
	});
	const [open, setOpen] = useState(false);

	const triggerRef = useRef<HTMLButtonElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const listId = useId("listbox");
	const { active, setActive, moveActive } = useListboxNav(listRef, open, options);

	const { style: floatStyle } = useAnchor(triggerRef, listRef, open, {
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

	const onClick = (e: MouseEvent<HTMLButtonElement>) => {
		onClickProp?.(e);
		if (e.defaultPrevented || disabled) return;
		if (open) setOpen(false);
		else openMenu();
	};

	const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
		onKeyDownProp?.(e);
		if (e.defaultPrevented || disabled) return;
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
				setActive(firstEnabledIndex(options));
				break;
			case "End":
				e.preventDefault();
				setActive(lastEnabledIndex(options));
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
		<Field
			label={label}
			hint={hint}
			error={error}
			required={required}
			id={id}
			idPrefix="select"
			className={className}
			style={style}
		>
			{({ id: triggerId, labelId, describedBy, invalid }) => (
				<>
					<button
						ref={triggerRef}
						id={triggerId}
						type="button"
						role="combobox"
						aria-expanded={open}
						aria-haspopup="listbox"
						aria-controls={listId}
						aria-labelledby={labelId}
						aria-describedby={describedBy}
						aria-invalid={invalid}
						aria-required={required || undefined}
						aria-activedescendant={open ? `${listId}-opt-${active}` : undefined}
						disabled={disabled}
						className={cn(
							"camply-field-shell",
							"camply-select__trigger",
							`camply-field-shell--${size}`,
							error && "camply-field-shell--error",
							open && "camply-field-shell--open",
						)}
						{...rest}
						onClick={onClick}
						onKeyDown={onKeyDown}
					>
						<span
							className={cn(
								"camply-select__value",
								!selectedOption && "camply-select__placeholder",
							)}
						>
							{selectedOption ? selectedOption.label : placeholder}
						</span>
						<ChevronDown
							size={16}
							className={cn("camply-chevron", open && "camply-chevron--open")}
						/>
					</button>

					{name && <input type="hidden" name={name} value={selected ?? ""} />}

					{open && (
						<Portal>
							<Listbox
								listRef={listRef}
								id={listId}
								className="camply-floating-surface camply-floating-list camply-select__list"
								style={floatStyle}
							>
								{options.map((opt, i) => {
									const isSelected = opt.value === selected;
									return (
										<ListboxOption
											key={opt.value}
											id={`${listId}-opt-${i}`}
											active={i === active}
											selected={isSelected}
											disabled={opt.disabled}
											className="camply-select__option"
											onMouseEnter={() => !opt.disabled && setActive(i)}
											onClick={() => pick(opt)}
										>
											<span>{opt.label}</span>
											{isSelected && <Check size={15} className={"camply-select__tick"} />}
										</ListboxOption>
									);
								})}
							</Listbox>
						</Portal>
					)}
				</>
			)}
		</Field>
	);
}
