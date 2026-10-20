import {
	type ForwardedRef,
	forwardRef,
	type InputHTMLAttributes,
	type ReactNode,
	type RefAttributes,
	useCallback,
	useMemo,
	useState,
} from "react";
import { compose } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { Field, idRefs } from "../../lib/Field";
import { FieldChevron } from "../../lib/FieldChevron";
import { FormReset, HiddenField } from "../../lib/HiddenField";
import { useLabels } from "../../lib/i18n";
import { Check, Search } from "../../lib/icons";
import { Listbox, ListboxOption } from "../../lib/Listbox";
import type { Option } from "../../lib/types";
import { useControllable } from "../../lib/useControllable";
import {
	firstEnabledIndex,
	type ReservedListboxAttr,
	useListboxField,
} from "../../lib/useListboxField";

/** Alias de `Option` : Select, Combobox et MultiSelect partagent la même forme. */
export type ComboboxOption<T extends string = string> = Option<T>;

export interface ComboboxProps<T extends string = string>
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		| "value"
		| "defaultValue"
		| "onChange"
		| "type"
		| "name"
		| "aria-autocomplete"
		| ReservedListboxAttr
	> {
	options: ComboboxOption<T>[];
	value?: T;
	defaultValue?: T;
	onChange?: (value: T) => void;
	/** Texte du champ de recherche (défaut : libellés de la lib). */
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

const ComboboxBase = forwardRef(function Combobox<T extends string = string>(
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
		emptyMessage,
		disabled = false,
		id,
		className,
		style,
		filter = defaultFilter,
		"aria-describedby": ariaDescribedBy,
		"aria-invalid": ariaInvalid,
		onFocus: onFocusProp,
		onBlur: onBlurProp,
		onClick: onClickProp,
		onKeyDown: onKeyDownProp,
		...rest
	}: ComboboxProps<T>,
	ref: ForwardedRef<HTMLInputElement>,
) {
	const labels = useLabels();
	const [selected, setSelected] = useControllable(value, defaultValue, onChange, {
		allowUndefined: true,
	});
	const [query, setQuery] = useState("");

	const selectedOption = options.find((o) => o.value === selected);
	const applyFilter = useCallback(
		(q: string) => (q ? options.filter((o) => filter(o, q)) : options),
		[options, filter],
	);
	const filtered = useMemo(() => applyFilter(query), [applyFilter, query]);

	const list = useListboxField<HTMLDivElement, ComboboxOption<T>>({
		idPrefix: "combobox",
		items: filtered,
		// Boucler ferait repartir la surbrillance en haut sans mouvement visible.
		wrap: false,
		// Home/End appartiennent au caret dans un champ de saisie.
		homeEnd: false,
		// Vider la recherche avec la liste : sinon `displayValue` garderait un texte
		// qui ne correspond plus à la valeur sélectionnée.
		onClose: () => setQuery(""),
	});

	/**
	 * L'option active repart sur la première réellement sélectionnable. Appelé
	 * depuis les gestionnaires et non depuis un effet : `options` écrit en littéral
	 * change d'identité à chaque rendu du parent, et la surbrillance ne doit PAS
	 * sauter pour autant. Même règle que Select.
	 */
	const resetActive = (items: ComboboxOption<T>[]) => {
		const first = firstEnabledIndex(items);
		list.setActive(first < 0 ? 0 : first);
	};

	const openList = () => {
		resetActive(filtered);
		list.setOpen(true);
	};

	const displayValue = list.open ? query : (selectedOption?.label ?? "");

	const pick = (opt: ComboboxOption<T>) => {
		if (opt.disabled) return;
		setSelected(opt.value);
		// Le focus RESTE sur l'input (pattern APG). Il ne l'a jamais quitté — Entrée
		// vient du clavier, le clic est neutralisé par le onMouseDown de l'option —
		// donc aucun onFocus n'est émis et la liste ne se rouvre pas.
		list.close();
	};

	// Veto du consommateur sur l'ouverture (règle 4), comme sur `Tooltip`.
	const onFocus = compose(onFocusProp, () => {
		if (!disabled) openList();
	});

	// Le focus reste sur l'input après une sélection : sans un clic qui rouvre,
	// l'utilisateur à la souris n'aurait aucun moyen de revoir la liste.
	const onClick = compose(onClickProp, () => {
		if (!disabled && !list.open) openList();
	});

	const onBlur = compose(onBlurProp, (e) => {
		// Quitter le champ doit refermer le popup portalisé, qui resterait sinon
		// affiché par-dessus la page avec aria-expanded sur un input sans focus.
		if (list.listRef.current?.contains(e.relatedTarget)) return;
		list.close();
	});

	const onKeyDown = compose(onKeyDownProp, (e) => {
		// Une saisie en cours de composition (japonais, chinois…) : Entrée valide le mot,
		// pas une option.
		if (disabled || e.nativeEvent.isComposing) return;
		if (!list.open && ["ArrowDown", "ArrowUp"].includes(e.key)) {
			openList();
			return;
		}
		if (list.handleNavKey(e)) return;
		// Liste fermée, Entrée appartient au formulaire (il s'envoie) : l'index actif
		// date de l'ancien filtrage et désignerait une autre option.
		if (e.key === "Enter" && list.open) {
			e.preventDefault();
			if (filtered[list.active]) pick(filtered[list.active]);
		}
	});

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
						ref={list.anchorRef}
						className={cn(
							"camply-field-shell",
							error && "camply-field-shell--error",
							list.open && "camply-field-shell--open",
							disabled && "camply-field-shell--disabled camply-field-shell--inert",
						)}
					>
						<Search size={16} className="camply-combobox__searchIcon" />
						<input
							{...rest}
							ref={ref}
							id={inputId}
							type="text"
							// Invariants du contrat combobox — cf. `ReservedListboxAttr`.
							role="combobox"
							aria-haspopup="listbox"
							aria-expanded={list.open}
							aria-autocomplete="list"
							aria-required={required || undefined}
							{...list.aria}
							// Composés, jamais écrasés (règle 4). Pas d'`aria-labelledby` ici : le
							// <label htmlFor> nomme déjà l'input, celui du consommateur passe donc
							// par {...rest} et remplace ce nom, comme sur `Input`.
							aria-describedby={idRefs(describedBy, ariaDescribedBy)}
							aria-invalid={invalid ?? ariaInvalid}
							className="camply-field-control"
							placeholder={placeholder ?? labels.search}
							disabled={disabled}
							value={displayValue}
							onFocus={onFocus}
							onBlur={onBlur}
							onClick={onClick}
							onChange={(e) => {
								const q = e.target.value;
								setQuery(q);
								// La liste filtrée du rendu suivant n'existe pas encore : on la
								// recalcule ici pour viser une option qui existera vraiment.
								resetActive(applyFilter(q));
								list.setOpen(true);
							}}
							onKeyDown={onKeyDown}
						/>
						<FieldChevron open={list.open} />
					</div>

					<HiddenField name={name} value={selected ?? ""} disabled={disabled} />
					<FormReset onReset={value === undefined ? () => setSelected(defaultValue) : undefined} />

					{list.open && (
						<Listbox {...list.props} className="camply-combobox__list">
							{filtered.length === 0 ? (
								<div className="camply-combobox__empty">{emptyMessage ?? labels.noResults}</div>
							) : (
								filtered.map((opt, i) => {
									const isSelected = opt.value === selected;
									return (
										<ListboxOption
											key={opt.value}
											id={list.optionId(i)}
											active={i === list.active}
											selected={isSelected}
											disabled={opt.disabled}
											className="camply-combobox__option"
											onActivate={() => list.setActive(i)}
											onClick={() => pick(opt)}
										>
											<span>{opt.label}</span>
											{isSelected && <Check size={15} className="camply-combobox__tick" />}
										</ListboxOption>
									);
								})
							)}
						</Listbox>
					)}
				</>
			)}
		</Field>
	);
});

/**
 * Champ de recherche à liste filtrée (pattern APG « combobox »).
 * `forwardRef` efface le paramètre générique : on le restaure par un cast pour que
 * `T` continue d'être inféré depuis `options`. La ref vise l'input de recherche,
 * de quoi lui rendre le focus après une erreur de validation.
 */
export const Combobox = ComboboxBase as <T extends string = string>(
	props: ComboboxProps<T> & RefAttributes<HTMLInputElement>,
) => ReactNode;
