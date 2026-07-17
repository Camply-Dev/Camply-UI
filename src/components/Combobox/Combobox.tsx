import {
	type FocusEvent,
	type InputHTMLAttributes,
	type KeyboardEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { Field } from "../../lib/Field";
import { useLabels } from "../../lib/i18n";
import { Check, ChevronDown, Search } from "../../lib/icons";
import { Listbox, ListboxOption } from "../../lib/Listbox";
import { Portal } from "../../lib/Portal";
import { useAnchor } from "../../lib/useAnchor";
import { useControllable } from "../../lib/useControllable";
import { useDismiss } from "../../lib/useDismiss";
import { useId } from "../../lib/useId";
import { firstEnabledIndex, useListboxNav } from "../../lib/useListboxNav";

export interface ComboboxOption<T extends string = string> {
	value: T;
	label: string;
	disabled?: boolean;
}

export interface ComboboxProps<T extends string = string>
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		"value" | "defaultValue" | "onChange" | "type" | "name"
	> {
	options: ComboboxOption<T>[];
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
	 * Nom soumis avec le formulaire. La valeur SÉLECTIONNÉE part dans un
	 * <input type="hidden"> — l'input visible ne contient que la recherche.
	 */
	name?: string;
	/**
	 * Marque le champ obligatoire (astérisque + aria-required). L'input visible
	 * portant la requête et non la valeur, la validation native ne s'applique
	 * pas : l'erreur passe par `error`.
	 */
	required?: boolean;
	/** Texte affiché quand aucune option ne correspond (défaut : libellés de la lib). */
	emptyMessage?: string;
	disabled?: boolean;
	filter?: (option: ComboboxOption<T>, query: string) => boolean;
}

const defaultFilter = <T extends string>(option: ComboboxOption<T>, query: string) => {
	const q = query.toLowerCase();
	return option.label.toLowerCase().includes(q);
};

export function Combobox<T extends string = string>({
	options,
	value,
	defaultValue,
	onChange,
	placeholder = "Rechercher…",
	label,
	hint,
	error,
	name,
	required,
	emptyMessage,
	disabled = false,
	id,
	className,
	style,
	filter = defaultFilter,
	onFocus: onFocusProp,
	onKeyDown: onKeyDownProp,
	...rest
}: ComboboxProps<T>) {
	const labels = useLabels();
	const [selected, setSelected] = useControllable(value, defaultValue, onChange, {
		allowUndefined: true,
	});
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");

	const wrapRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const listId = useId("combobox");

	const { style: floatStyle } = useAnchor(wrapRef, listRef, open, {
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
	const { active, setActive, moveActive } = useListboxNav(listRef, open, filtered, {
		wrap: false,
	});

	useEffect(() => {
		const first = firstEnabledIndex(filtered);
		setActive(first < 0 ? 0 : first);
	}, [filtered, setActive]);

	const displayValue = open ? query : (selectedOption?.label ?? "");

	const pick = (opt: ComboboxOption<T>) => {
		if (opt.disabled) return;
		setSelected(opt.value);
		setQuery("");
		setOpen(false);
		inputRef.current?.blur();
	};

	const onFocus = (e: FocusEvent<HTMLInputElement>) => {
		onFocusProp?.(e);
		if (disabled) return;
		setOpen(true);
	};

	const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		onKeyDownProp?.(e);
		if (e.defaultPrevented || disabled) return;
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
		}
	};

	return (
		<Field
			label={label}
			hint={hint}
			error={error}
			required={required}
			id={id}
			idPrefix="combobox"
			className={className}
			style={style}
		>
			{({ id: inputId, describedBy, invalid }) => (
				<>
					<div
						ref={wrapRef}
						className={cn(
							"camply-field-shell",
							error && "camply-field-shell--error",
							open && "camply-field-shell--open",
							disabled && "camply-field-shell--disabled camply-field-shell--inert",
						)}
					>
						<Search size={16} className={"camply-combobox__searchIcon"} />
						<input
							ref={inputRef}
							id={inputId}
							type="text"
							role="combobox"
							aria-expanded={open}
							aria-controls={listId}
							aria-autocomplete="list"
							aria-describedby={describedBy}
							aria-invalid={invalid}
							aria-required={required || undefined}
							aria-activedescendant={
								open && filtered[active] ? `${listId}-opt-${active}` : undefined
							}
							className={"camply-field-control"}
							placeholder={placeholder}
							disabled={disabled}
							{...rest}
							value={displayValue}
							onFocus={onFocus}
							onChange={(e) => {
								setQuery(e.target.value);
								setActive(0);
								setOpen(true);
							}}
							onKeyDown={onKeyDown}
						/>
						<ChevronDown
							size={16}
							className={cn("camply-chevron", open && "camply-chevron--open")}
						/>
					</div>

					{name && <input type="hidden" name={name} value={selected ?? ""} />}

					{open && (
						<Portal>
							<Listbox
								listRef={listRef}
								id={listId}
								className="camply-floating-surface camply-floating-list camply-combobox__list"
								style={floatStyle}
							>
								{filtered.length === 0 ? (
									<div className={"camply-combobox__empty"}>{emptyMessage ?? labels.noResults}</div>
								) : (
									filtered.map((opt, i) => {
										const isSelected = opt.value === selected;
										return (
											<ListboxOption
												key={opt.value}
												id={`${listId}-opt-${i}`}
												active={i === active}
												selected={isSelected}
												disabled={opt.disabled}
												className="camply-combobox__option"
												onMouseEnter={() => !opt.disabled && setActive(i)}
												onMouseDown={(e) => e.preventDefault()}
												onClick={() => pick(opt)}
											>
												<span>{opt.label}</span>
												{isSelected && <Check size={15} className={"camply-combobox__tick"} />}
											</ListboxOption>
										);
									})
								)}
							</Listbox>
						</Portal>
					)}
				</>
			)}
		</Field>
	);
}
