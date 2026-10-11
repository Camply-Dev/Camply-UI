import {
	type ComponentPropsWithoutRef,
	Fragment,
	forwardRef,
	type KeyboardEvent,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { useMergedRefs } from "../../lib/mergeRefs";
import { Portal } from "../../lib/Portal";
import { nextRovingIndex } from "../../lib/rovingIndex";
import { useAnchor } from "../../lib/useAnchor";
import { useControllable } from "../../lib/useControllable";
import { useDismiss } from "../../lib/useDismiss";
import { useId } from "../../lib/useId";
import { useMenuNav } from "../../lib/useMenuNav";
// Import direct plutôt que par le barrel : `MenuCloseContext` est interne à la
// librairie (le barrel de DropdownMenu ne l'expose pas) et c'est lui qui permet
// à la barre de réutiliser l'entrée de menu du menu déroulant.
import {
	MenuCloseContext,
	MenuItem,
	type MenuItemProps,
	MenuSeparator,
} from "../DropdownMenu/DropdownMenu";

/**
 * Une entrée de barre est une `MenuItem` (règle 1) décrite par des données :
 * `children` devient `label`, et le séparateur qui la précède devient un drapeau.
 */
export interface MenubarItem extends Omit<MenuItemProps, "children"> {
	label: ReactNode;
	separatorBefore?: boolean;
}

export interface MenubarMenu {
	label: string;
	items: MenubarItem[];
}

/**
 * `role="menubar"` est posé après le spread et `children` retiré du type : c'est
 * `menus` qui décrit le contenu (règle 3). `onKeyDown` et `onMouseLeave` sont
 * composés avec les nôtres (règle 4).
 */
export interface MenubarProps
	extends Omit<ComponentPropsWithoutRef<"div">, "role" | "children" | "dangerouslySetInnerHTML"> {
	menus: MenubarMenu[];
	/**
	 * Index du menu ouvert, piloté par le parent (`null` = aucun). Une barre de
	 * menus n'a pas un état ouvert/fermé mais un menu courant : c'est l'index qui
	 * remplace ici le couple `open`/`onOpenChange` des autres surfaces.
	 */
	openIndex?: number | null;
	/** Menu ouvert au montage en mode non contrôlé. */
	defaultOpenIndex?: number | null;
	onOpenIndexChange?: (index: number | null) => void;
}

const OPEN_DELAY = 110;
const CLOSE_DELAY = 180;

const ITEM_SELECTOR = '[role="menuitem"]:not([disabled])';

/**
 * Barre de menus au pattern APG. Passe-lui un `aria-label` (transmis tel quel à
 * l'élément `role="menubar"`) : sans nom, un lecteur d'écran annonce une « barre
 * de menus » nue, indistinguable d'une autre sur la même page.
 */
export const Menubar = forwardRef<HTMLDivElement, MenubarProps>(
	(
		{
			menus,
			openIndex: openProp,
			defaultOpenIndex = null,
			onOpenIndexChange,
			className,
			style: styleProp,
			onKeyDown: onKeyDownProp,
			onMouseLeave: onMouseLeaveProp,
			...rest
		},
		ref,
	) => {
		const [openIdx, setOpenIdx] = useControllable<number | null>(
			openProp,
			defaultOpenIndex,
			onOpenIndexChange,
		);
		const open = openIdx != null;

		const barRef = useRef<HTMLDivElement>(null);
		const menuRef = useRef<HTMLDivElement>(null);
		const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
		const openTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
		const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

		// Roving tabindex : la barre n'occupe qu'un seul arrêt de tabulation, les
		// flèches déplacent le focus à l'intérieur.
		const [focusIndex, setFocusIndex] = useState(0);
		const roving = menus.length > 0 ? clamp(focusIndex, 0, menus.length - 1) : 0;

		const anchorRef = useRef<HTMLElement | null>(null);
		anchorRef.current = openIdx != null ? triggerRefs.current[openIdx] : null;

		const { style } = useAnchor(anchorRef, menuRef, open, {
			placement: "bottom-start",
			gap: 6,
			constrainHeight: true,
			minHeight: 100,
		});

		const baseId = useId("menubar");
		const menuId = `${baseId}-menu`;
		const triggerId = (i: number) => `${baseId}-trigger-${i}`;

		// Le focus vit dans le menu portalisé : à la fermeture (Échap, clic extérieur,
		// sélection) il doit revenir au déclencheur, sinon il retombe sur <body>.
		const close = useCallback(() => {
			const hadFocus = menuRef.current?.contains(document.activeElement) ?? false;
			const trigger = openIdx != null ? triggerRefs.current[openIdx] : null;
			setOpenIdx(null);
			if (hadFocus) trigger?.focus();
		}, [openIdx, setOpenIdx]);

		useDismiss(open, close, [barRef, menuRef]);

		useEffect(
			() => () => {
				clearTimeout(openTimer.current);
				clearTimeout(closeTimer.current);
			},
			[],
		);

		const clearTimers = () => {
			clearTimeout(openTimer.current);
			clearTimeout(closeTimer.current);
		};
		const hoverOpen = (i: number) => {
			clearTimers();
			if (open) setOpenIdx(i);
			else openTimer.current = setTimeout(() => setOpenIdx(i), OPEN_DELAY);
		};
		const cancelOpen = () => clearTimeout(openTimer.current);
		// close() et non setOpenIdx(null) : si le menu a été ouvert au clavier, le
		// démonter en laissant le focus dedans le ferait retomber sur <body>.
		const scheduleClose = () => {
			clearTimeout(closeTimer.current);
			closeTimer.current = setTimeout(close, CLOSE_DELAY);
		};
		const cancelClose = () => clearTimeout(closeTimer.current);

		const focusTrigger = (i: number) => {
			setFocusIndex(i);
			triggerRefs.current[i]?.focus();
		};

		// useMenuNav ne pose le focus qu'à l'OUVERTURE : quand on passe d'un menu à
		// l'autre alors qu'un menu est déjà ouvert, on entre à la main.
		const focusFirstItem = () => {
			requestAnimationFrame(() => {
				menuRef.current?.querySelector<HTMLElement>(ITEM_SELECTOR)?.focus();
			});
		};

		const { onKeyDown: onItemsKeyDown } = useMenuNav(menuRef, open);

		const onBarKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
			// Règle 4 : le spread précède ce handler, celui du consommateur est donc appelé ici.
			onKeyDownProp?.(e);
			if (e.defaultPrevented) return;
			if (menus.length === 0) return;

			// Bas : ouvre le menu du déclencheur focalisé et entre dedans.
			if (e.key === "ArrowDown") {
				e.preventDefault();
				clearTimers();
				setOpenIdx(roving);
				// Si un menu était DÉJÀ ouvert (survol, autre entrée), `open` ne change pas
				// et useMenuNav ne se redéclenche pas : on entre à la main.
				if (open) focusFirstItem();
				return;
			}

			const next = nextRovingIndex(e.key, roving, menus.length, "horizontal");
			if (next == null) return;
			e.preventDefault();
			clearTimers();
			focusTrigger(next);
			// Barre déjà « active » : on suit le focus en gardant un menu ouvert.
			if (open) setOpenIdx(next);
		};

		const onMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
			// Le focus quitte le menu : il ne doit pas rester ouvert derrière lui.
			// close() ramène le focus au déclencheur, d'où la tabulation repart.
			if (e.key === "Tab") {
				close();
				return;
			}

			// Gauche/Droite depuis une entrée : on change de menu sans sortir du clavier.
			if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
				const next = nextRovingIndex(e.key, openIdx ?? roving, menus.length, "horizontal");
				if (next == null) return;
				e.preventDefault();
				clearTimers();
				setFocusIndex(next);
				setOpenIdx(next);
				focusFirstItem();
				return;
			}

			// Haut/Bas, Home/End, typeahead. Échap est géré par useDismiss (pile de couches).
			onItemsKeyDown(e);
		};

		const setBarRef = useMergedRefs(barRef, ref);

		const activeMenu = openIdx != null ? menus[openIdx] : undefined;
		const activeTriggerId = openIdx != null ? triggerId(openIdx) : undefined;

		return (
			<>
				<div
					{...rest}
					ref={setBarRef}
					role="menubar"
					className={cn("camply-menubar__bar", className)}
					style={styleProp}
					onKeyDown={onBarKeyDown}
					onMouseLeave={(e) => {
						onMouseLeaveProp?.(e);
						if (e.defaultPrevented) return;
						scheduleClose();
					}}
				>
					{menus.map((menu, i) => (
						<button
							key={menu.label}
							ref={(el) => {
								triggerRefs.current[i] = el;
							}}
							type="button"
							role="menuitem"
							id={triggerId(i)}
							aria-haspopup="menu"
							aria-expanded={openIdx === i}
							aria-controls={openIdx === i ? menuId : undefined}
							tabIndex={i === roving ? 0 : -1}
							className={cn(
								"camply-menubar__trigger",
								"camply-focus-ring",
								openIdx === i && "camply-menubar__triggerOpen",
							)}
							onClick={() => {
								cancelOpen();
								setFocusIndex(i);
								setOpenIdx(openIdx === i ? null : i);
							}}
							onFocus={() => setFocusIndex(i)}
							onMouseEnter={() => hoverOpen(i)}
							onMouseLeave={cancelOpen}
						>
							{menu.label}
						</button>
					))}
				</div>

				{activeMenu && (
					<Portal>
						<div
							ref={menuRef}
							id={menuId}
							role="menu"
							aria-labelledby={activeTriggerId}
							tabIndex={-1}
							className="camply-floating-surface camply-menubar__menu"
							style={style}
							onKeyDown={onMenuKeyDown}
							onMouseEnter={cancelClose}
							onMouseLeave={scheduleClose}
						>
							{/* Mêmes entrées que DropdownMenu, à la lettre : c'est le contexte qui
							    leur donne LA fermeture de la barre (celle qui rend le focus au bon
							    déclencheur). L'ordre « onSelect puis close » vit dans MenuItem, une
							    seule fois, pour les deux menus. */}
							<MenuCloseContext.Provider value={close}>
								{activeMenu.items.map(({ label, separatorBefore, ...item }, i) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: items de menu déclaratifs sans id — la position est l'identité
									<Fragment key={i}>
										{separatorBefore && <MenuSeparator />}
										<MenuItem {...item}>{label}</MenuItem>
									</Fragment>
								))}
							</MenuCloseContext.Provider>
						</div>
					</Portal>
				)}
			</>
		);
	},
);

Menubar.displayName = "Menubar";
