import {
	type CSSProperties,
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	type MouseEvent,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { Field } from "../../lib/Field";
import { useLabels } from "../../lib/i18n";
import { useControllable } from "../../lib/useControllable";
import { Tag } from "../Tag";

export interface TagInputProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "children"> {
	value?: string[];
	defaultValue?: string[];
	onChange?: (value: string[]) => void;
	placeholder?: string;
	label?: string;
	hint?: string;
	error?: string;
	/** Soumis dans un formulaire : un <input type="hidden"> par tag. */
	name?: string;
	/** Au moins un tag est requis (validation native portée par le champ de saisie). */
	required?: boolean;
	readOnly?: boolean;
	max?: number;
	validate?: (tag: string) => boolean;
	unique?: boolean;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
}

export const TagInput = forwardRef<HTMLDivElement, TagInputProps>(function TagInput(
	{
		value,
		defaultValue = [],
		onChange,
		placeholder = "Ajouter…",
		label,
		hint,
		error,
		name,
		required,
		readOnly = false,
		max,
		validate,
		unique = true,
		disabled = false,
		className,
		style,
		id,
		onMouseDown,
		...rest
	},
	ref,
) {
	const labels = useLabels();
	const [tags, setTags] = useControllable<string[]>(value, defaultValue, onChange);
	const [draft, setDraft] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const locked = disabled || readOnly;

	const addTag = (raw: string) => {
		if (locked) return;
		const tag = raw.trim();
		if (!tag) return;
		if (max != null && tags.length >= max) return;
		if (unique && tags.includes(tag)) return;
		if (validate && !validate(tag)) return;
		setTags([...tags, tag]);
		setDraft("");
	};

	const removeAt = (i: number) => {
		if (locked) return;
		setTags(tags.filter((_, idx) => idx !== i));
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			addTag(draft);
		} else if (e.key === "Backspace" && !draft && tags.length) {
			removeAt(tags.length - 1);
		}
	};

	const full = max != null && tags.length >= max;

	/**
	 * Le shell était un <label> englobant les tags : leur texte se retrouvait
	 * concaténé dans le nom accessible du champ. C'est désormais un <div> neutre
	 * qui redonne simplement le focus à la saisie (le vrai <label> vient de Field).
	 */
	const onShellMouseDown = (e: MouseEvent<HTMLDivElement>) => {
		onMouseDown?.(e);
		if (e.defaultPrevented || locked || full) return;
		const target = e.target as HTMLElement;
		if (target === inputRef.current || target.closest("button")) return;
		e.preventDefault();
		inputRef.current?.focus();
	};

	const seen = new Map<string, number>();
	const keyed = tags.map((tag, i) => {
		const n = (seen.get(tag) ?? 0) + 1;
		seen.set(tag, n);
		return { tag, i, key: n === 1 ? tag : `${tag}·${n}` };
	});

	return (
		<Field
			label={label}
			hint={hint}
			error={error}
			required={required}
			id={id}
			idPrefix="taginput"
			className={className}
			style={style}
		>
			{({ id: inputId, describedBy, invalid, required: isRequired }) => (
				// biome-ignore lint/a11y/noStaticElementInteractions: shell non interactif — le mousedown ne fait que renvoyer le focus vers la saisie, déjà atteignable au clavier
				<div
					ref={ref}
					className={cn(
						"camply-field-shell",
						"camply-field-shell--wrap",
						"camply-taginput__wrap",
						error && "camply-field-shell--error",
						disabled && "camply-field-shell--disabled",
					)}
					onMouseDown={onShellMouseDown}
					{...rest}
				>
					{name &&
						keyed.map(({ tag, key }) => (
							<input
								key={`hidden:${key}`}
								type="hidden"
								name={name}
								value={tag}
								disabled={disabled}
							/>
						))}
					{keyed.map(({ tag, i, key }) => (
						<Tag
							key={key}
							onRemove={locked ? undefined : () => removeAt(i)}
							removeLabel={`${labels.remove} ${tag}`}
						>
							{tag}
						</Tag>
					))}
					<input
						ref={inputRef}
						id={inputId}
						className={"camply-field-control camply-taginput__input"}
						value={draft}
						placeholder={tags.length === 0 ? placeholder : ""}
						disabled={disabled || full}
						readOnly={readOnly}
						// La validation native se joue sur la saisie : elle n'est requise
						// que tant qu'aucun tag n'a été ajouté (et qu'elle reste visible).
						required={isRequired && tags.length === 0 && !full}
						aria-required={isRequired}
						aria-invalid={invalid}
						aria-describedby={describedBy}
						style={full ? { display: "none" } : undefined}
						onChange={(e) => setDraft(e.target.value)}
						onKeyDown={onKeyDown}
						onBlur={() => addTag(draft)}
					/>
				</div>
			)}
		</Field>
	);
});
