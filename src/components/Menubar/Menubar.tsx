import {
	type CSSProperties,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { Portal } from "../../lib/Portal";
import { useAnchor } from "../../lib/useAnchor";
import { useDismiss } from "../../lib/useDismiss";
export interface MenubarItem {
	label: ReactNode;
	icon?: ReactNode;
	shortcut?: string;
	onSelect?: () => void;
	danger?: boolean;
	disabled?: boolean;
	separatorBefore?: boolean;
}

export interface MenubarMenu {
	label: string;
	items: MenubarItem[];
}

export interface MenubarProps {
	menus: MenubarMenu[];
	className?: string;
	style?: CSSProperties;
}

const OPEN_DELAY = 110;
const CLOSE_DELAY = 180;

export function Menubar({ menus, className, style: styleProp }: MenubarProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const barRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const openTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const anchorRef = useRef<HTMLElement | null>(null);
	anchorRef.current = openIndex != null ? triggerRefs.current[openIndex] : null;

	const style = useAnchor(anchorRef, menuRef, openIndex != null, {
		placement: "bottom-start",
		gap: 6,
		constrainHeight: true,
		minHeight: 100,
	});

	const close = useCallback(() => setOpenIndex(null), []);
	useDismiss(openIndex != null, close, [barRef, menuRef]);

	useEffect(
		() => () => {
			clearTimeout(openTimer.current);
			clearTimeout(closeTimer.current);
		},
		[],
	);

	const hoverOpen = (i: number) => {
		clearTimeout(closeTimer.current);
		clearTimeout(openTimer.current);
		if (openIndex != null) setOpenIndex(i);
		else openTimer.current = setTimeout(() => setOpenIndex(i), OPEN_DELAY);
	};
	const cancelOpen = () => clearTimeout(openTimer.current);
	const scheduleClose = () => {
		clearTimeout(closeTimer.current);
		closeTimer.current = setTimeout(() => setOpenIndex(null), CLOSE_DELAY);
	};
	const cancelClose = () => clearTimeout(closeTimer.current);

	const activeMenu = openIndex != null ? menus[openIndex] : null;

	return (
		<>
			<div
				ref={barRef}
				role="menubar"
				className={cn("camply-menubar__bar", className)}
				style={styleProp}
				onMouseLeave={scheduleClose}
			>
				{menus.map((menu, i) => (
					<button
						key={menu.label}
						ref={(el) => {
							triggerRefs.current[i] = el;
						}}
						type="button"
						role="menuitem"
						aria-haspopup="menu"
						aria-expanded={openIndex === i}
						className={cn(
							"camply-menubar__trigger",
							openIndex === i && "camply-menubar__triggerOpen",
						)}
						onClick={() => {
							cancelOpen();
							setOpenIndex((cur) => (cur === i ? null : i));
						}}
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
						role="menu"
						className="camply-floating-surface camply-menubar__menu"
						style={style}
						onMouseEnter={cancelClose}
						onMouseLeave={scheduleClose}
					>
						{activeMenu.items.map((item, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: items de menu déclaratifs sans id — la position est l'identité
							<div key={i}>
								{item.separatorBefore && <hr className={"camply-menu-separator"} />}
								<button
									type="button"
									role="menuitem"
									disabled={item.disabled}
									className={cn("camply-menu-item", item.danger && "camply-menu-item--danger")}
									onClick={() => {
										close();
										item.onSelect?.();
									}}
								>
									{item.icon && <span className={"camply-menu-item__icon"}>{item.icon}</span>}
									<span className={"camply-menu-item__label"}>{item.label}</span>
									{item.shortcut && (
										<span className={"camply-menu-item__shortcut"}>{item.shortcut}</span>
									)}
								</button>
							</div>
						))}
					</div>
				</Portal>
			)}
		</>
	);
}
