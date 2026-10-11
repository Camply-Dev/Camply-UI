import type { CSSProperties, MouseEvent, ReactNode, Ref } from "react";
import { cn } from "./cn";

interface ListboxProps {
	listRef: Ref<HTMLDivElement>;
	id: string;
	style?: CSSProperties;
	className?: string;
	multiselectable?: boolean;
	children: ReactNode;
}

export function Listbox({
	listRef,
	id,
	style,
	className,
	multiselectable,
	children,
}: ListboxProps) {
	return (
		<div
			ref={listRef}
			id={id}
			role="listbox"
			// La liste ne prend jamais le focus : il reste sur le trigger ou l'input,
			// qui pilote l'option active par aria-activedescendant.
			tabIndex={-1}
			aria-multiselectable={multiselectable ? "true" : undefined}
			className={className}
			style={style}
		>
			{children}
		</div>
	);
}

interface ListboxOptionProps {
	id: string;
	active?: boolean;
	selected?: boolean;
	disabled?: boolean;
	className?: string;
	onMouseEnter?: () => void;
	onMouseDown?: (e: MouseEvent) => void;
	onClick?: () => void;
	children: ReactNode;
}

export function ListboxOption({
	id,
	active,
	selected,
	disabled,
	className,
	onMouseEnter,
	onMouseDown,
	onClick,
	children,
}: ListboxOptionProps) {
	return (
		// biome-ignore lint/a11y/useFocusableInteractive: les options ne prennent pas le focus — piloté par aria-activedescendant
		// biome-ignore lint/a11y/useKeyWithClickEvents: clavier géré au niveau du trigger ou de l'input
		<div
			id={id}
			role="option"
			aria-selected={selected}
			aria-disabled={disabled || undefined}
			className={cn(
				"camply-listbox-option",
				active && "camply-listbox-option--active",
				disabled && "camply-listbox-option--disabled",
				className,
			)}
			onMouseEnter={onMouseEnter}
			onMouseDown={onMouseDown}
			onClick={onClick}
		>
			{children}
		</div>
	);
}
