import { type CSSProperties, type KeyboardEvent, useState } from "react";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/useControllable";
import { Tag } from "../Tag";

export interface TagInputProps {
	value?: string[];
	defaultValue?: string[];
	onChange?: (value: string[]) => void;
	placeholder?: string;
	label?: string;
	hint?: string;
	max?: number;
	validate?: (tag: string) => boolean;
	unique?: boolean;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
}

export function TagInput({
	value,
	defaultValue = [],
	onChange,
	placeholder = "Ajouter…",
	label,
	hint,
	max,
	validate,
	unique = true,
	disabled = false,
	className,
	style,
}: TagInputProps) {
	const [tags, setTags] = useControllable<string[]>(value, defaultValue, onChange);
	const [draft, setDraft] = useState("");

	const addTag = (raw: string) => {
		const tag = raw.trim();
		if (!tag) return;
		if (max != null && tags.length >= max) return;
		if (unique && tags.includes(tag)) return;
		if (validate && !validate(tag)) return;
		setTags([...tags, tag]);
		setDraft("");
	};

	const removeAt = (i: number) => setTags(tags.filter((_, idx) => idx !== i));

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			addTag(draft);
		} else if (e.key === "Backspace" && !draft && tags.length) {
			removeAt(tags.length - 1);
		}
	};

	const full = max != null && tags.length >= max;

	const seen = new Map<string, number>();
	const keyed = tags.map((tag, i) => {
		const n = (seen.get(tag) ?? 0) + 1;
		seen.set(tag, n);
		return { tag, i, key: n === 1 ? tag : `${tag}·${n}` };
	});

	return (
		<div className={cn("camply-field", className)} style={style}>
			{label && <span className={"camply-field__label"}>{label}</span>}

			<label
				className={cn(
					"camply-field-shell",
					"camply-field-shell--wrap",
					"camply-taginput__wrap",
					disabled && "camply-field-shell--disabled",
				)}
			>
				{keyed.map(({ tag, i, key }) => (
					<Tag key={key} onRemove={() => removeAt(i)} removeLabel={`Retirer ${tag}`}>
						{tag}
					</Tag>
				))}
				<input
					className={"camply-field-control camply-taginput__input"}
					value={draft}
					placeholder={tags.length === 0 ? placeholder : ""}
					disabled={disabled || full}
					style={full ? { display: "none" } : undefined}
					onChange={(e) => setDraft(e.target.value)}
					onKeyDown={onKeyDown}
					onBlur={() => addTag(draft)}
				/>
			</label>
			{hint && <span className={"camply-field__desc"}>{hint}</span>}
		</div>
	);
}
