import {
	type ButtonHTMLAttributes,
	type KeyboardEvent,
	type MouseEvent,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { Field } from "../../lib/Field";
import { Check, ChevronDown, X } from "../../lib/icons";
import { Listbox, ListboxOption } from "../../lib/Listbox";
import { Portal } from "../../lib/Portal";
import { useAnchor } from "../../lib/useAnchor";
import { useControllable } from "../../lib/useControllable";
import { useDismiss } from "../../lib/useDismiss";
import { useId } from "../../lib/useId";
import { useListboxNav } from "../../lib/useListboxNav";

export interface MultiSelectOption<T extends string = string> {
	value: T;
	label: string;
	disabled?: boolean;
}

export interface MultiSelectProps<T extends string = string>
	extends Omit<
		ButtonHTMLAttributes<HTMLButtonElement>,
		"value" | "defaultValue" | "onChange" | "type" | "name"
	> {
	options: MultiSelectOption<T>[];
	value?: T[];
	defaultValue?: T[];
	onChange?: (value: T[]) => void;
	placeholder?: string;
	label?: string;
	/** Texte d'aide affiché sous le champ. */
	hint?: string;
	/** Message d'erreur : remplace l'aide, colore le champ et pose aria-invalid. */
	error?: string;
	/**
	 * Nom soumis avec le formulaire. Le trigger étant un <button>, on émet un
	 * <input type="hidden"> PAR valeur sélectionnée, tous sous le même `name`
	 * — comme un <select multiple>. Côté serveur : `FormData.getAll(name)`.
	 */
	name?: string;
	/**
	 * Marque le champ obligatoire (astérisque + aria-required). Un input caché
	 * n'étant pas soumis à la validation native, l'erreur passe par `error`.
	 */
	required?: boolean;
	max?: number;
	disabled?: boolean;
}

export function MultiSelect<T extends string = string>({
	options,
	value,
	defaultValue = [],
	onChange,
	placeholder = "Sélectionner…",
	label,
	hint,
	error,
	name,
	required,
	max,
	disabled = false,
	id,
	className,
	style,
	onClick: onClickProp,
	onKeyDown: onKeyDownProp,
	...rest
}: MultiSelectProps<T>) {
	const [selected, setSelected] = useControllable<T[]>(value, defaultValue, onChange);
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const listId = useId("multiselect");
	const { active, setActive, moveActive } = useListboxNav(listRef, open, options);

	const { style: floatStyle } = useAnchor(triggerRef, listRef, open, {
		placement: "bottom-start",
		gap: 6,
		matchWidth: true,
		constrainHeight: true,
	});
	const close = useCallback(() => setOpen(false), []);
	useDismiss(open, close, [triggerRef, listRef]);

	const selectedSet = useMemo(() => new Set(selected), [selected]);
	const selectedOptions = useMemo(
		() => options.filter((o) => selectedSet.has(o.value)),
		[options, selectedSet],
	);

	const toggle = (opt: MultiSelectOption<T>) => {
		if (opt.disabled) return;
		if (selectedSet.has(opt.value)) {
			setSelected(selected.filter((v) => v !== opt.value));
		} else {
			if (max != null && selected.length >= max) return;
			setSelected([...selected, opt.value]);
		}
	};

	const remove = (val: T) => setSelected(selected.filter((v) => v !== val));

	const onClick = (e: MouseEvent<HTMLButtonElement>) => {
		onClickProp?.(e);
		if (e.defaultPrevented || disabled) return;
		setOpen((o) => !o);
	};

	const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
		onKeyDownProp?.(e);
		if (e.defaultPrevented || disabled) return;
		if (e.key === "Backspace" && selected.length > 0) {
			remove(selected[selected.length - 1]);
			return;
		}
		if (!open) {
			if (["ArrowDown", "ArrowUp"].includes(e.key)) {
				e.preventDefault();
				setActive(0);
				setOpen(true);
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
			case "Enter":
			case " ":
				e.preventDefault();
				if (options[active]) toggle(options[active]);
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
			idPrefix="multiselect"
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
						aria-haspopup="listbox"
						aria-expanded={open}
						aria-controls={listId}
						aria-labelledby={labelId}
						aria-describedby={describedBy}
						aria-invalid={invalid}
						aria-required={required || undefined}
						aria-activedescendant={open ? `${listId}-opt-${active}` : undefined}
						disabled={disabled}
						className={cn(
							"camply-field-shell",
							"camply-field-shell--wrap",
							"camply-multiselect__trigger",
							error && "camply-field-shell--error",
							open && "camply-field-shell--open",
							disabled && "camply-field-shell--disabled",
						)}
						{...rest}
						onClick={onClick}
						onKeyDown={onKeyDown}
					>
						<span className={"camply-multiselect__values"}>
							{selectedOptions.length === 0 ? (
								<span className={"camply-multiselect__placeholder"}>{placeholder}</span>
							) : (
								selectedOptions.map((o) => (
									<span key={o.value} className={"camply-multiselect__chip"}>
										{o.label}
										<span
											aria-hidden="true"
											className={"camply-multiselect__chipX"}
											onClick={(e) => {
												e.stopPropagation();
												remove(o.value);
											}}
										>
											<X size={10} />
										</span>
									</span>
								))
							)}
						</span>
						<ChevronDown
							size={16}
							className={cn("camply-chevron", open && "camply-chevron--open")}
						/>
					</button>

					{name && selected.map((v) => <input key={v} type="hidden" name={name} value={v} />)}

					{open && (
						<Portal>
							<Listbox
								listRef={listRef}
								id={listId}
								multiselectable
								className="camply-floating-surface camply-floating-list camply-multiselect__list"
								style={floatStyle}
							>
								{options.map((opt, i) => {
									const isSelected = selectedSet.has(opt.value);
									const blocked = !isSelected && max != null && selected.length >= max;
									return (
										<ListboxOption
											key={opt.value}
											id={`${listId}-opt-${i}`}
											active={i === active}
											selected={isSelected}
											disabled={opt.disabled || blocked}
											className={cn(
												"camply-multiselect__option",
												isSelected && "camply-multiselect__selected",
											)}
											onMouseEnter={() => !opt.disabled && setActive(i)}
											onClick={() => toggle(opt)}
										>
											<span
												className={cn(
													"camply-multiselect__box",
													isSelected && "camply-multiselect__boxOn",
												)}
											>
												{isSelected && <Check size={12} />}
											</span>
											<span>{opt.label}</span>
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
