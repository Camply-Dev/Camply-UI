import {
	type CSSProperties,
	createContext,
	type KeyboardEvent,
	type ReactNode,
	useContext,
	useRef,
} from "react";
import { cn } from "../../lib/cn";
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

export interface TabsProps {
	value?: string;
	defaultValue: string;
	onChange?: (value: string) => void;
	/** underline tabs (default) or a soft pill group */
	variant?: TabsVariant;
	className?: string;
	style?: CSSProperties;
	children: ReactNode;
}

export function Tabs({
	value,
	defaultValue,
	onChange,
	variant = "line",
	className,
	style,
	children,
}: TabsProps) {
	const [current, setCurrent] = useControllable<string>(value, defaultValue, onChange);
	const idBase = useId("tabs");
	return (
		<TabsContext.Provider value={{ value: current, setValue: setCurrent, idBase, variant }}>
			<div className={cn("camply-tabs__root", className)} style={style}>
				{children}
			</div>
		</TabsContext.Provider>
	);
}

export function TabList({ children, className }: { children: ReactNode; className?: string }) {
	const { variant } = useTabs();
	const ref = useRef<HTMLDivElement>(null);

	// Navigation clavier APG : ←/→ (+ Home/End) déplacent le focus entre onglets
	// actifs et activent au passage (activation automatique — le focus suit la
	// sélection via le tabIndex mobile). On interroge le DOM car TabList ne connaît
	// pas la liste des valeurs (les onglets sont des enfants libres).
	const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
		const tabs = Array.from(
			ref.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? [],
		);
		if (tabs.length === 0) return;
		e.preventDefault();
		const at = tabs.indexOf(document.activeElement as HTMLButtonElement);
		let next = at;
		if (e.key === "ArrowRight") next = at < 0 ? 0 : (at + 1) % tabs.length;
		else if (e.key === "ArrowLeft") next = at < 0 ? 0 : (at - 1 + tabs.length) % tabs.length;
		else if (e.key === "Home") next = 0;
		else next = tabs.length - 1;
		tabs[next].focus();
		tabs[next].click();
	};

	return (
		<div
			ref={ref}
			role="tablist"
			className={cn("camply-tabs__list", `camply-tabs__list-${variant}`, className)}
			onKeyDown={onKeyDown}
		>
			{children}
		</div>
	);
}

export function Tab({
	value,
	children,
	icon,
	disabled,
}: {
	value: string;
	children: ReactNode;
	icon?: ReactNode;
	disabled?: boolean;
}) {
	const { value: active, setValue, idBase, variant } = useTabs();
	const selected = active === value;
	return (
		<button
			type="button"
			role="tab"
			id={`${idBase}-tab-${value}`}
			aria-selected={selected}
			aria-controls={`${idBase}-panel-${value}`}
			tabIndex={selected ? 0 : -1}
			disabled={disabled}
			className={cn(
				"camply-tabs__tab",
				`camply-tabs__tab-${variant}`,
				selected && "camply-tabs__selected",
			)}
			onClick={() => setValue(value)}
		>
			{icon && <span className={"camply-tabs__tabIcon"}>{icon}</span>}
			{children}
		</button>
	);
}

export function TabPanel({
	value,
	children,
	className,
}: {
	value: string;
	children: ReactNode;
	className?: string;
}) {
	const { value: active, idBase } = useTabs();
	if (active !== value) return null;
	return (
		<div
			role="tabpanel"
			id={`${idBase}-panel-${value}`}
			aria-labelledby={`${idBase}-tab-${value}`}
			className={cn("camply-tabs__panel", className)}
		>
			{children}
		</div>
	);
}
