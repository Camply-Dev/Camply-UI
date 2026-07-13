import {
	type CSSProperties,
	type KeyboardEvent,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
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

export interface MultiSelectProps<T extends string = string> {
	options: MultiSelectOption<T>[];
	value?: T[];
	defaultValue?: T[];
	onChange?: (value: T[]) => void;
	placeholder?: string;
	label?: string;
	max?: number;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
}

export function MultiSelect<T extends string = string>({
	options,
	value,
	defaultValue = [],
	onChange,
	placeholder = "Sélectionner…",
	label,
	max,
	disabled = false,
	className,
	style,
}: MultiSelectProps<T>) {
	const [selected, setSelected] = useControllable<T[]>(value, defaultValue, onChange);
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const listId = useId("multiselect");
	const { active, setActive, moveActive } = useListboxNav(listRef, open, options);

	const floatStyle = useAnchor(triggerRef, listRef, open, {
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

	const onKeyDown = (e: KeyboardEvent) => {
		if (disabled) return;
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
		<div className={cn("camply-field", className)} style={style}>
			{label && <span className={"camply-field__label"}>{label}</span>}
			<button
				ref={triggerRef}
				type="button"
				role="combobox"
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-controls={listId}
				aria-activedescendant={open ? `${listId}-opt-${active}` : undefined}
				disabled={disabled}
				className={cn(
					"camply-field-shell",
					"camply-field-shell--wrap",
					"camply-multiselect__trigger",
					open && "camply-field-shell--open",
					disabled && "camply-field-shell--disabled",
				)}
				onClick={() => setOpen((o) => !o)}
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
				<ChevronDown size={16} className={cn("camply-chevron", open && "camply-chevron--open")} />
			</button>

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
		</div>
	);
}
