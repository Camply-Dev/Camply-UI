import { type CSSProperties, createContext, type ReactNode, useContext, useState } from "react";
import { cn } from "../../lib/cn";
import { ChevronDown } from "../../lib/icons";
import { useId } from "../../lib/useId";

interface AccordionContextValue {
	isOpen: (value: string) => boolean;
	toggle: (value: string) => void;
}
const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps {
	/** allow multiple panels open at once */
	multiple?: boolean;
	/** initially open value(s) */
	defaultValue?: string | string[];
	className?: string;
	style?: CSSProperties;
	children: ReactNode;
}

export function Accordion({
	multiple = false,
	defaultValue,
	className,
	style,
	children,
}: AccordionProps) {
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
			<div className={cn("camply-accordion__root", className)} style={style}>
				{children}
			</div>
		</AccordionContext.Provider>
	);
}

export interface AccordionItemProps {
	value: string;
	title: ReactNode;
	children: ReactNode;
	disabled?: boolean;
}

export function AccordionItem({ value, title, children, disabled }: AccordionItemProps) {
	const ctx = useContext(AccordionContext);
	if (!ctx) throw new Error("<AccordionItem> must be used within <Accordion>");
	const open = ctx.isOpen(value);
	const triggerId = useId("accordion-trigger");
	const panelId = useId("accordion-panel");

	return (
		<div className={cn("camply-accordion__item", open && "camply-accordion__itemOpen")}>
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
			{/* <section> nommé par le trigger = région ARIA (pattern APG accordion). */}
			<section
				id={panelId}
				aria-labelledby={triggerId}
				className={"camply-accordion__panel"}
				style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
			>
				<div className={"camply-accordion__panelInner"}>
					<div className={"camply-accordion__body"}>{children}</div>
				</div>
			</section>
		</div>
	);
}
