import {
	type ButtonHTMLAttributes,
	type ForwardedRef,
	forwardRef,
	type KeyboardEvent,
	type MouseEvent,
	type ReactNode,
	type RefAttributes,
} from "react";
import { cn } from "../../lib/cn";
import { Field, idRefs } from "../../lib/Field";
import { FieldChevron } from "../../lib/FieldChevron";
import { FormReset, HiddenField } from "../../lib/HiddenField";
import { useLabels } from "../../lib/i18n";
import { Check } from "../../lib/icons";
import { Listbox, ListboxOption } from "../../lib/Listbox";
import { useMergedRefs } from "../../lib/mergeRefs";
import { Portal } from "../../lib/Portal";
import type { Option, Size } from "../../lib/types";
import { useControllable } from "../../lib/useControllable";
import { type ReservedListboxAttr, useListboxField } from "../../lib/useListboxField";

/** Alias de `Option` : Select, Combobox et MultiSelect partagent la même forme. */
export type SelectOption<T extends string = string> = Option<T>;

export interface SelectProps<T extends string = string>
	extends Omit<
		ButtonHTMLAttributes<HTMLButtonElement>,
		"value" | "defaultValue" | "onChange" | "type" | "name" | ReservedListboxAttr
	> {
	options: SelectOption<T>[];
	value?: T;
	defaultValue?: T;
	onChange?: (value: T) => void;
	/** Texte affiché tant que rien n'est choisi (défaut : libellés de la lib). */
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
	size?: Size;
}

const SelectBase = forwardRef(function Select<T extends string = string>(
	{
		options,
		value,
		defaultValue,
		onChange,
		placeholder,
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
		"aria-labelledby": ariaLabelledBy,
		"aria-describedby": ariaDescribedBy,
		"aria-invalid": ariaInvalid,
		onClick: onClickProp,
		onKeyDown: onKeyDownProp,
		...rest
	}: SelectProps<T>,
	ref: ForwardedRef<HTMLButtonElement>,
) {
	const labels = useLabels();
	const [selected, setSelected] = useControllable(value, defaultValue, onChange, {
		allowUndefined: true,
	});
	const list = useListboxField<HTMLButtonElement, SelectOption<T>>({
		idPrefix: "listbox",
		items: options,
	});
	const setTriggerRef = useMergedRefs(list.anchorRef, ref);

	const selectedOption = options.find((o) => o.value === selected);

	const openMenu = () => {
		if (disabled) return;
		const idx = options.findIndex((o) => o.value === selected);
		list.setActive(idx >= 0 ? idx : 0);
		list.setOpen(true);
	};

	const pick = (opt: SelectOption<T>) => {
		if (opt.disabled) return;
		setSelected(opt.value);
		list.close();
		list.anchorRef.current?.focus();
	};

	const onClick = (e: MouseEvent<HTMLButtonElement>) => {
		onClickProp?.(e);
		if (e.defaultPrevented || disabled) return;
		if (list.open) list.close();
		else openMenu();
	};

	const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
		onKeyDownProp?.(e);
		if (e.defaultPrevented || disabled) return;
		if (!list.open) {
			if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
				e.preventDefault();
				openMenu();
			}
			return;
		}
		if (list.handleNavKey(e)) return;
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			if (options[list.active]) pick(options[list.active]);
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
						{...rest}
						ref={setTriggerRef}
						id={triggerId}
						type="button"
						// Invariants du contrat combobox — cf. `ReservedListboxAttr`.
						role="combobox"
						aria-haspopup="listbox"
						aria-expanded={list.open}
						aria-required={required || undefined}
						{...list.aria}
						// Composés, jamais écrasés (règle 4) : nos IDREF d'abord, et l'invalidité
						// du consommateur ne vaut que tant qu'aucune `error` n'est rendue.
						aria-labelledby={idRefs(labelId, ariaLabelledBy)}
						aria-describedby={idRefs(describedBy, ariaDescribedBy)}
						aria-invalid={invalid ?? ariaInvalid}
						disabled={disabled}
						className={cn(
							"camply-field-shell",
							"camply-select__trigger",
							`camply-field-shell--${size}`,
							error && "camply-field-shell--error",
							list.open && "camply-field-shell--open",
						)}
						onClick={onClick}
						onKeyDown={onKeyDown}
					>
						<span
							className={cn(
								"camply-select__value",
								!selectedOption && "camply-select__placeholder",
							)}
						>
							{selectedOption ? selectedOption.label : (placeholder ?? labels.selectPlaceholder)}
						</span>
						<FieldChevron open={list.open} />
					</button>

					<HiddenField name={name} value={selected ?? ""} disabled={disabled} />
					<FormReset onReset={value === undefined ? () => setSelected(defaultValue) : undefined} />

					{list.open && (
						<Portal>
							<Listbox
								{...list.props}
								className="camply-floating-surface camply-floating-list camply-select__list"
							>
								{options.map((opt, i) => {
									const isSelected = opt.value === selected;
									return (
										<ListboxOption
											key={opt.value}
											id={list.optionId(i)}
											active={i === list.active}
											selected={isSelected}
											disabled={opt.disabled}
											className="camply-select__option"
											onMouseEnter={() => !opt.disabled && list.setActive(i)}
											// Le focus ne quitte jamais le trigger : un aller-retour body → bouton
											// émettrait un onBlur/onFocus parasite au clic.
											onMouseDown={(e) => e.preventDefault()}
											onClick={() => pick(opt)}
										>
											<span>{opt.label}</span>
											{isSelected && <Check size={15} className="camply-select__tick" />}
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
});

/**
 * Champ de sélection unique (pattern APG « combobox » : bouton + listbox ancrée).
 * `forwardRef` efface le paramètre générique : on le restaure par un cast pour que
 * `T` continue d'être inféré depuis `options`. La ref vise le bouton déclencheur,
 * de quoi lui rendre le focus après une erreur de validation.
 */
export const Select = SelectBase as <T extends string = string>(
	props: SelectProps<T> & RefAttributes<HTMLButtonElement>,
) => ReactNode;
