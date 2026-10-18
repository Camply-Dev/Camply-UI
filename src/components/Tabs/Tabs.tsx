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

export type TabsVariant = "line" | "soft";
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

/**
 * Ce que chaque pièce du bandeau se réserve (règle 3). Rôle, état et IDREF sont le
 * contrat APG : un `id` repris de l'extérieur décrocherait `aria-controls` et
 * `aria-labelledby` (règle 8). `type="button"` : un onglet ne soumet pas un
 * formulaire. L'orientation est fixée, le clavier ne gérant que ←/→.
 */
type ReservedTabListAttr = "role" | "aria-orientation";
type ReservedTabAttr = "type" | "role" | "id" | "aria-selected" | "aria-controls" | "tabIndex";
type ReservedTabPanelAttr = "role" | "id" | "aria-labelledby";

/**
 * Ids de l'onglet et de son panneau. La valeur est encodée : `aria-controls` et
 * `aria-labelledby` sont des LISTES d'ids séparés par des espaces, et une valeur
 * comme « Mes cartes » y valait deux ids inexistants.
 */
const tabId = (base: string, value: string) => `${base}-tab-${encodeURIComponent(value)}`;
const panelId = (base: string, value: string) => `${base}-panel-${encodeURIComponent(value)}`;

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

export interface TabListProps extends Omit<HTMLAttributes<HTMLDivElement>, ReservedTabListAttr> {
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
		// Règle 3 : le spread d'abord, le contrat du bandeau après.
		<div
			{...rest}
			ref={ref}
			role="tablist"
			aria-orientation="horizontal"
			className={cn("camply-tabs__list", `camply-tabs__list-${variant}`, className)}
			onKeyDown={handleKeyDown}
		>
			{children}
		</div>
	);
});

export interface TabProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | ReservedTabAttr> {
	value: string;
	children: ReactNode;
	icon?: ReactNode;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
	{ value, children, icon, className, onClick, ...rest },
	ref,
) {
	const { value: active, setValue, idBase, variant } = useTabs();
	const selected = active === value;
	return (
		// Règle 3 : le spread d'abord, l'état de l'onglet après.
		<button
			{...rest}
			ref={ref}
			type="button"
			role="tab"
			id={tabId(idBase, value)}
			aria-selected={selected}
			// Le panneau inactif est démonté : hors sélection, l'IDREF pointerait
			// dans le vide (règle 8).
			aria-controls={selected ? panelId(idBase, value) : undefined}
			// Roving tabindex : un seul onglet dans l'ordre de tabulation.
			tabIndex={selected ? 0 : -1}
			className={cn(
				"camply-tabs__tab",
				"camply-focus-ring",
				`camply-tabs__tab-${variant}`,
				selected && "camply-tabs__selected",
				className,
			)}
			// Règle 4.
			onClick={(e) => {
				onClick?.(e);
				if (e.defaultPrevented) return;
				setValue(value);
			}}
		>
			{icon && <span className="camply-tabs__tabIcon">{icon}</span>}
			{children}
		</button>
	);
});

export interface TabPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, ReservedTabPanelAttr> {
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
		// Même contrat que l'onglet : le spread d'abord, l'appariement APG après.
		<div
			{...rest}
			ref={ref}
			role="tabpanel"
			id={panelId(idBase, value)}
			aria-labelledby={tabId(idBase, value)}
			className={cn("camply-tabs__panel", className)}
		>
			{children}
		</div>
	);
});
