import {
	createContext,
	forwardRef,
	type HTMLAttributes,
	type ReactNode,
	useContext,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { ChevronDown } from "../../lib/icons";
import { useId } from "../../lib/useId";

interface AccordionContextValue {
	isOpen: (value: string) => boolean;
	toggle: (value: string) => void;
}
const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
	multiple?: boolean;
	defaultValue?: string | string[];
	children: ReactNode;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
	{ multiple = false, defaultValue, className, children, ...rest },
	ref,
) {
	const [open, setOpen] = useState<Set<string>>(
		() =>
			new Set(
				defaultValue == null ? [] : Array.isArray(defaultValue) ? defaultValue : [defaultValue],
			),
	);

	const toggle = (value: string) => {
		setOpen((prev) => {
			const next = new Set(multiple ? prev : []);
			if (prev.has(value)) next.delete(value);
			else next.add(value);
			return next;
		});
	};

	return (
		<AccordionContext.Provider value={{ isOpen: (v) => open.has(v), toggle }}>
			<div ref={ref} className={cn("camply-accordion__root", className)} {...rest}>
				{children}
			</div>
		</AccordionContext.Provider>
	);
});

export interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	value: string;
	title: ReactNode;
	children: ReactNode;
	disabled?: boolean;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
	{ value, title, children, disabled, className, ...rest },
	ref,
) {
	const ctx = useContext(AccordionContext);
	if (!ctx) throw new Error("<AccordionItem> must be used within <Accordion>");
	const open = ctx.isOpen(value);
	const triggerId = useId("accordion-trigger");
	const panelId = useId("accordion-panel");

	return (
		<div
			ref={ref}
			className={cn("camply-accordion__item", open && "camply-accordion__itemOpen", className)}
			{...rest}
		>
			<button
				type="button"
				id={triggerId}
				className={"camply-accordion__trigger camply-focus-ring"}
				aria-expanded={open}
				aria-controls={panelId}
				disabled={disabled}
				onClick={() => ctx.toggle(value)}
			>
				<span className={"camply-accordion__title"}>{title}</span>
				<ChevronDown
					size={17}
					className={cn("camply-accordion__chevron", open && "camply-accordion__chevronOpen")}
				/>
			</button>

			{/* Replié, le panneau passe en visibility:hidden : ni focusable, ni lu par les lecteurs d'écran. */}
			<section
				id={panelId}
				aria-labelledby={triggerId}
				className={cn("camply-accordion__panel", open && "camply-accordion__panelOpen")}
			>
				<div className={"camply-accordion__panelInner"}>
					<div className={"camply-accordion__body"}>{children}</div>
				</div>
			</section>
		</div>
	);
});
