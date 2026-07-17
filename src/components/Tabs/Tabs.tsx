import {
	type ButtonHTMLAttributes,
	createContext,
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	type ReactNode,
	useContext,
} from "react";
import { cn } from "../../lib/cn";
import { nextRovingIndex } from "../../lib/rovingIndex";
import { useControllable } from "../../lib/useControllable";
import { useId } from "../../lib/useId";

type TabsVariant = "line" | "soft";
interface TabsContextValue {
	value: string;
	setValue: (v: string) => void;
	idBase: string;
	variant: TabsVariant;
}
const TabsContext = createContext<TabsContextValue | null>(null);
const useTabs = () => {
	const ctx = useContext(TabsContext);
	if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
	return ctx;
};

export interface TabsProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
	value?: string;
	defaultValue: string;
	onChange?: (value: string) => void;
	variant?: TabsVariant;
	children: ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
	{ value, defaultValue, onChange, variant = "line", className, children, ...rest },
	ref,
) {
	const [current, setCurrent] = useControllable<string>(value, defaultValue, onChange);
	const idBase = useId("tabs");
	return (
		<TabsContext.Provider value={{ value: current, setValue: setCurrent, idBase, variant }}>
			<div ref={ref} className={cn("camply-tabs__root", className)} {...rest}>
				{children}
			</div>
		</TabsContext.Provider>
	);
});

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList(
	{ children, className, onKeyDown, ...rest },
	ref,
) {
	const { variant } = useTabs();

	// APG : ←/→ entre onglets (avec bouclage), Home/End aux extrémités, activation immédiate.
	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		onKeyDown?.(e);
		if (e.defaultPrevented) return;
		const tabs = Array.from(
			e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
		);
		const at = tabs.indexOf(document.activeElement as HTMLButtonElement);
		// Focus hors des onglets (contenu libre du bandeau) : on ne détourne rien.
		if (at < 0) return;
		const next = nextRovingIndex(e.key, at, tabs.length);
		if (next == null) return;
		e.preventDefault();
		tabs[next].focus();
		tabs[next].click();
	};

	return (
		<div
			ref={ref}
			role="tablist"
			aria-orientation="horizontal"
			className={cn("camply-tabs__list", `camply-tabs__list-${variant}`, className)}
			{...rest}
			onKeyDown={handleKeyDown}
		>
			{children}
		</div>
	);
});

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
	value: string;
	children: ReactNode;
	icon?: ReactNode;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
	{ value, children, icon, disabled, className, onClick, ...rest },
	ref,
) {
	const { value: active, setValue, idBase, variant } = useTabs();
	const selected = active === value;
	return (
		<button
			ref={ref}
			type="button"
			role="tab"
			id={`${idBase}-tab-${value}`}
			aria-selected={selected}
			aria-controls={`${idBase}-panel-${value}`}
			// Roving tabindex : un seul onglet dans l'ordre de tabulation.
			tabIndex={selected ? 0 : -1}
			disabled={disabled}
			className={cn(
				"camply-tabs__tab",
				"camply-focus-ring",
				`camply-tabs__tab-${variant}`,
				selected && "camply-tabs__selected",
				className,
			)}
			{...rest}
			onClick={(e) => {
				onClick?.(e);
				setValue(value);
			}}
		>
			{icon && <span className={"camply-tabs__tabIcon"}>{icon}</span>}
			{children}
		</button>
	);
});

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
	value: string;
	children: ReactNode;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
	{ value, children, className, ...rest },
	ref,
) {
	const { value: active, idBase } = useTabs();
	if (active !== value) return null;
	return (
		<div
			ref={ref}
			role="tabpanel"
			id={`${idBase}-panel-${value}`}
			aria-labelledby={`${idBase}-tab-${value}`}
			className={cn("camply-tabs__panel", className)}
			{...rest}
		>
			{children}
		</div>
	);
});
