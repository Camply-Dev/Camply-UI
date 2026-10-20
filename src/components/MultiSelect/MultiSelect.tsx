import {
	type ButtonHTMLAttributes,
	type ForwardedRef,
	forwardRef,
	type ReactNode,
	type RefAttributes,
	useMemo,
} from "react";
import { compose } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { Field, fieldShell, idRefs } from "../../lib/Field";
import { FieldChevron } from "../../lib/FieldChevron";
import { FormReset, HiddenField } from "../../lib/HiddenField";
import { useLabels } from "../../lib/i18n";
import { Check, X } from "../../lib/icons";
import { Listbox, ListboxOption } from "../../lib/Listbox";
import { useMergedRefs } from "../../lib/mergeRefs";
import type { Option } from "../../lib/types";
import { useControllable } from "../../lib/useControllable";
import { type ReservedListboxAttr, useListboxField } from "../../lib/useListboxField";

/** Alias de `Option` : Select, Combobox et MultiSelect partagent la même forme. */
export type MultiSelectOption<T extends string = string> = Option<T>;

export interface MultiSelectProps<T extends string = string>
	extends Omit<
		ButtonHTMLAttributes<HTMLButtonElement>,
		"value" | "defaultValue" | "onChange" | "type" | "name" | ReservedListboxAttr
	> {
	options: MultiSelectOption<T>[];
	value?: T[];
	defaultValue?: T[];
	onChange?: (value: T[]) => void;
	/** Texte affiché tant que rien n'est choisi (défaut : libellés de la lib). */
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

const MultiSelectBase = forwardRef(function MultiSelect<T extends string = string>(
	{
		options,
		value,
		defaultValue = [],
		onChange,
		placeholder,
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
		"aria-labelledby": ariaLabelledBy,
		"aria-describedby": ariaDescribedBy,
		"aria-invalid": ariaInvalid,
		onClick: onClickProp,
		onKeyDown: onKeyDownProp,
		...rest
	}: MultiSelectProps<T>,
	ref: ForwardedRef<HTMLButtonElement>,
) {
	const labels = useLabels();
	const [selected, setSelected] = useControllable<T[]>(value, defaultValue, onChange);
	const list = useListboxField<HTMLButtonElement, MultiSelectOption<T>>({
		idPrefix: "multiselect",
		items: options,
	});
	const setTriggerRef = useMergedRefs(list.anchorRef, ref);

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

	const onClick = compose(onClickProp, () => {
		if (disabled) return;
		// Fermer passe TOUJOURS par close() : c'est le seul chemin qui déclenche le
		// nettoyage joint au renvoi. setOpen(false) le court-circuiterait en silence.
		if (list.open) list.close();
		else list.setOpen(true);
	});

	const onKeyDown = compose(onKeyDownProp, (e) => {
		if (disabled) return;
		if (e.key === "Backspace" && selected.length > 0) {
			remove(selected[selected.length - 1]);
			return;
		}
		if (!list.open) {
			if (["ArrowDown", "ArrowUp"].includes(e.key)) {
				e.preventDefault();
				list.setActive(0);
				list.setOpen(true);
			}
			return;
		}
		if (list.handleNavKey(e)) return;
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			if (options[list.active]) toggle(options[list.active]);
		}
	});

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
						// Pas de `disabled` : le trigger est un <button>, que
						// `.camply-field-shell:disabled` couvre déjà.
						className={cn(
							fieldShell({ layout: "wrap", error, open: list.open }),
							"camply-multiselect__trigger",
						)}
						onClick={onClick}
						onKeyDown={onKeyDown}
					>
						<span className="camply-multiselect__values">
							{selectedOptions.length === 0 ? (
								<span className="camply-multiselect__placeholder">
									{placeholder ?? labels.selectPlaceholder}
								</span>
							) : (
								selectedOptions.map((o) => (
									<span key={o.value} className="camply-multiselect__chip">
										{o.label}
										<span
											aria-hidden="true"
											className="camply-multiselect__chipX"
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
						<FieldChevron open={list.open} />
					</button>

					{selected.map((v) => (
						<HiddenField key={v} name={name} value={v} disabled={disabled} />
					))}
					<FormReset onReset={value === undefined ? () => setSelected(defaultValue) : undefined} />

					{list.open && (
						<Listbox {...list.props} multiselectable className="camply-multiselect__list">
							{options.map((opt, i) => {
								const isSelected = selectedSet.has(opt.value);
								return (
									<ListboxOption
										key={opt.value}
										id={list.optionId(i)}
										active={i === list.active}
										selected={isSelected}
										disabled={opt.disabled}
										blocked={!isSelected && max != null && selected.length >= max}
										className={cn(
											"camply-multiselect__option",
											isSelected && "camply-multiselect__selected",
										)}
										onActivate={() => list.setActive(i)}
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
					)}
				</>
			)}
		</Field>
	);
});

/**
 * Sélection multiple (bouton + listbox multi-sélectionnable ancrée).
 * `forwardRef` efface le paramètre générique : on le restaure par un cast pour que
 * `T` continue d'être inféré depuis `options`. La ref vise le bouton déclencheur,
 * de quoi lui rendre le focus après une erreur de validation.
 */
export const MultiSelect = MultiSelectBase as <T extends string = string>(
	props: MultiSelectProps<T> & RefAttributes<HTMLButtonElement>,
) => ReactNode;
