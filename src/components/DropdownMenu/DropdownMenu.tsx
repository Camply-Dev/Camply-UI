import {
	type ComponentPropsWithoutRef,
	createContext,
	forwardRef,
	type KeyboardEvent,
	type ReactElement,
	type ReactNode,
	useContext,
} from "react";
import { cloneTrigger } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { useMergedRefs } from "../../lib/mergeRefs";
import { Portal } from "../../lib/Portal";
import type { Placement } from "../../lib/useAnchor";
import { useClickDisclosure } from "../../lib/useClickDisclosure";
import type { Controllable } from "../../lib/useControllable";
import { useId } from "../../lib/useId";
import { useMenuNav } from "../../lib/useMenuNav";

/** Permet à MenuItem de refermer le menu APRÈS avoir déclenché onSelect. */
const MenuCloseContext = createContext<(() => void) | null>(null);

export interface DropdownMenuProps extends ComponentPropsWithoutRef<"div">, Controllable {
	trigger: ReactElement;
	children: ReactNode;
	placement?: Placement;
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
	(
		{
			trigger,
			children,
			placement = "bottom-start",
			open: openProp,
			defaultOpen,
			onOpenChange,
			className,
			style: styleProp,
			...rest
		},
		ref,
	) => {
		const { open, close, floatRef, style, triggerProps } = useClickDisclosure({
			placement,
			minHeight: 100,
			open: openProp,
			defaultOpen,
			onOpenChange,
		});

		const { onKeyDown: onItemsKeyDown } = useMenuNav(floatRef, open);

		const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
			// Le focus quitte le menu : il ne doit pas rester ouvert derrière lui.
			// close() rend le focus au déclencheur, d'où la tabulation repart.
			if (e.key === "Tab") {
				close();
				return;
			}
			// Flèches, Home/End, typeahead. Échap est géré par useDismiss (pile de couches).
			onItemsKeyDown(e);
		};

		// Le menu tire son nom accessible du déclencheur ; on ne génère un id que si
		// le consommateur n'en a pas déjà posé un sur le sien.
		const autoTriggerId = useId("dropdownmenu-trigger");
		const triggerId = (trigger.props as { id?: string } | undefined)?.id ?? autoTriggerId;

		const setMenuRef = useMergedRefs(floatRef, ref);

		return (
			<>
				{cloneTrigger(trigger, {
					...triggerProps,
					id: triggerId,
					"aria-haspopup": "menu",
				})}
				{open && (
					<Portal>
						{/* La fermeture se fait depuis l'item (via le contexte), pas sur un
						    onPointerDown du conteneur : celui-ci démontait l'entrée avant que
						    son click ne parte, et fermait aussi sur un label ou un séparateur. */}
						<div
							{...rest}
							ref={setMenuRef}
							role="menu"
							aria-labelledby={triggerId}
							tabIndex={-1}
							className={cn("camply-floating-surface", "camply-dropdownmenu__menu", className)}
							style={{ ...style, ...styleProp }}
							onKeyDown={onKeyDown}
						>
							<MenuCloseContext.Provider value={close}>{children}</MenuCloseContext.Provider>
						</div>
					</Portal>
				)}
			</>
		);
	},
);

DropdownMenu.displayName = "DropdownMenu";

// `onSelect` existe déjà sur les props DOM (événement de sélection de texte) :
// on garde notre signature « entrée choisie ».
export interface MenuItemProps extends Omit<ComponentPropsWithoutRef<"button">, "onSelect"> {
	children: ReactNode;
	icon?: ReactNode;
	onSelect?: () => void;
	danger?: boolean;
	shortcut?: string;
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
	({ children, icon, onSelect, danger, shortcut, className, onClick, ...rest }, ref) => {
		const close = useContext(MenuCloseContext);
		return (
			<button
				{...rest}
				ref={ref}
				type="button"
				role="menuitem"
				className={cn("camply-menu-item", danger && "camply-menu-item--danger", className)}
				onClick={(e) => {
					onClick?.(e);
					onSelect?.();
					close?.();
				}}
			>
				{icon && <span className={"camply-menu-item__icon"}>{icon}</span>}
				<span className={"camply-menu-item__label"}>{children}</span>
				{shortcut && <span className={"camply-menu-item__shortcut"}>{shortcut}</span>}
			</button>
		);
	},
);

MenuItem.displayName = "MenuItem";

export type MenuSeparatorProps = ComponentPropsWithoutRef<"hr">;

export const MenuSeparator = forwardRef<HTMLHRElement, MenuSeparatorProps>(
	({ className, ...rest }, ref) => (
		<hr {...rest} ref={ref} className={cn("camply-menu-separator", className)} />
	),
);

MenuSeparator.displayName = "MenuSeparator";

export interface MenuLabelProps extends ComponentPropsWithoutRef<"div"> {
	children: ReactNode;
}

export const MenuLabel = forwardRef<HTMLDivElement, MenuLabelProps>(
	({ children, className, ...rest }, ref) => (
		<div {...rest} ref={ref} className={cn("camply-dropdownmenu__menuLabel", className)}>
			{children}
		</div>
	),
);

MenuLabel.displayName = "MenuLabel";
