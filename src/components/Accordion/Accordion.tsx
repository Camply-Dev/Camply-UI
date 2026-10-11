import {
	createContext,
	forwardRef,
	type HTMLAttributes,
	type ReactNode,
	useContext,
	useMemo,
} from "react";
import { cn } from "../../lib/cn";
import { ChevronDown } from "../../lib/icons";
import type { HeadingLevel } from "../../lib/types";
import { useControllable } from "../../lib/useControllable";
import { useId } from "../../lib/useId";

interface AccordionContextValue {
	isOpen: (value: string) => boolean;
	toggle: (value: string) => void;
}
const AccordionContext = createContext<AccordionContextValue | null>(null);

/** Section(s) ouverte(s) : un tableau si `multiple`, sinon une valeur ou `null`. */
export type AccordionValue = string | string[] | null;

export interface AccordionProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
	/** Autorise plusieurs sections ouvertes en même temps. */
	multiple?: boolean;
	/**
	 * Sections ouvertes, pilotées par le parent (deep-link vers une FAQ, « tout
	 * déplier »…). `null` ferme tout ; `undefined` laisse le composant gérer.
	 */
	value?: AccordionValue;
	/** Sections ouvertes au montage, en mode non contrôlé. */
	defaultValue?: AccordionValue;
	/** Reçoit un tableau si `multiple`, sinon la valeur ouverte ou `null`. */
	onChange?: (value: AccordionValue) => void;
	children: ReactNode;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
	{ multiple = false, value, defaultValue, onChange, className, children, ...rest },
	ref,
) {
	const [current, setCurrent] = useControllable<AccordionValue>(
		value,
		defaultValue ?? (multiple ? [] : null),
		onChange,
	);

	const open = useMemo(
		() => new Set(current == null ? [] : Array.isArray(current) ? current : [current]),
		[current],
	);

	// Mémoïsé : un objet littéral recréé à chaque rendu re-rendrait tous les items.
	const ctx = useMemo<AccordionContextValue>(
		() => ({
			isOpen: (v) => open.has(v),
			// `set` de useControllable ne prend pas d'updater : on part de l'état courant.
			toggle: (v) => {
				if (multiple) setCurrent(open.has(v) ? [...open].filter((x) => x !== v) : [...open, v]);
				else setCurrent(open.has(v) ? null : v);
			},
		}),
		[open, multiple, setCurrent],
	);

	return (
		<AccordionContext.Provider value={ctx}>
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
	/**
	 * Niveau du titre qui enveloppe le bouton d'en-tête, à ajuster selon la
	 * hiérarchie de la page (pattern APG « Accordion »).
	 */
	headingLevel?: HeadingLevel;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
	{ value, title, children, disabled, headingLevel = 3, className, ...rest },
	ref,
) {
	const ctx = useContext(AccordionContext);
	if (!ctx) throw new Error("<AccordionItem> must be used within <Accordion>");
	const open = ctx.isOpen(value);
	const triggerId = useId("accordion-trigger");
	const panelId = useId("accordion-panel");
	const Heading = `h${headingLevel}` as const;

	return (
		<div
			ref={ref}
			className={cn("camply-accordion__item", open && "camply-accordion__itemOpen", className)}
			{...rest}
		>
			<Heading className="camply-accordion__heading">
				<button
					type="button"
					id={triggerId}
					className="camply-accordion__trigger camply-focus-ring"
					aria-expanded={open}
					aria-controls={panelId}
					disabled={disabled}
					onClick={() => ctx.toggle(value)}
				>
					<span className="camply-accordion__title">{title}</span>
					<ChevronDown
						size={17}
						className={cn("camply-accordion__chevron", open && "camply-accordion__chevronOpen")}
					/>
				</button>
			</Heading>

			{/* Replié, le panneau passe en visibility:hidden : ni focusable, ni lu par les lecteurs d'écran. */}
			<section
				id={panelId}
				aria-labelledby={triggerId}
				className={cn("camply-accordion__panel", open && "camply-accordion__panelOpen")}
			>
				<div className="camply-accordion__panelInner">
					<div className="camply-accordion__body">{children}</div>
				</div>
			</section>
		</div>
	);
});
