import { type CSSProperties, createContext, type ReactNode, useContext } from "react";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/useControllable";
import { useId } from "../../lib/useId";

interface RadioContextValue {
	name: string;
	value?: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}
const RadioContext = createContext<RadioContextValue | null>(null);

export interface RadioGroupProps {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	name?: string;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
	children: ReactNode;
}

export function RadioGroup({
	value,
	defaultValue,
	onChange,
	name,
	disabled,
	className,
	style,
	children,
}: RadioGroupProps) {
	const [current, setCurrent] = useControllable<string | undefined>(
		value,
		defaultValue,
		onChange as ((v: string | undefined) => void) | undefined,
	);
	const autoName = useId("radio");

	return (
		<RadioContext.Provider
			value={{
				name: name ?? autoName,
				value: current,
				onChange: setCurrent,
				disabled,
			}}
		>
			<div role="radiogroup" className={cn("camply-radio__group", className)} style={style}>
				{children}
			</div>
		</RadioContext.Provider>
	);
}

export interface RadioProps {
	value: string;
	label?: string;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
}

export function Radio({ value, label, disabled, className, style }: RadioProps) {
	const ctx = useContext(RadioContext);
	if (!ctx) throw new Error("<Radio> must be used inside <RadioGroup>");
	const isDisabled = disabled || ctx.disabled;
	const checked = ctx.value === value;

	return (
		<label
			className={cn("camply-radio__wrap", isDisabled && "camply-radio__disabled", className)}
			style={style}
		>
			<span className={"camply-radio__box"}>
				<input
					type="radio"
					className={"camply-radio__input"}
					name={ctx.name}
					value={value}
					checked={checked}
					disabled={isDisabled}
					onChange={() => ctx.onChange(value)}
				/>
				<span className={"camply-radio__control"} aria-hidden="true">
					<span className={"camply-radio__dot"} />
				</span>
			</span>
			{label && <span className={"camply-radio__label"}>{label}</span>}
		</label>
	);
}
