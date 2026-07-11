import { type CSSProperties, type ReactNode, useCallback, useRef, useState } from "react";
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

/** A classic application menu bar (File / Edit / View…). Clicking a top menu
 *  opens it; hovering across the bar switches menus while one is open. Menus
 *  are portalled so they never clip. */
export function Menubar({ menus, className, style: styleProp }: MenubarProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const barRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

	// A STABLE ref object pointed at whichever top trigger is currently open.
	// (A fresh `{ get current() }` object each render would make useAnchor's
	// `update` unstable, re-run its effect every render, and — since setStyle
	// produced a new object each time — spin into "Maximum update depth".)
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

	const activeMenu = openIndex != null ? menus[openIndex] : null;

	return (
		<>
			<div
				ref={barRef}
				role="menubar"
				className={cn("camply-menubar__bar", className)}
				style={styleProp}
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
						onClick={() => setOpenIndex((cur) => (cur === i ? null : i))}
						onMouseEnter={() => openIndex != null && setOpenIndex(i)}
					>
						{menu.label}
					</button>
				))}
			</div>

			{activeMenu && (
				<Portal>
					<div ref={menuRef} role="menu" className={"camply-menubar__menu"} style={style}>
						{activeMenu.items.map((item, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: items de menu déclaratifs sans id — la position est l'identité
							<div key={i}>
								{item.separatorBefore && <hr className={"camply-menubar__separator"} />}
								<button
									type="button"
									role="menuitem"
									disabled={item.disabled}
									className={cn("camply-menubar__item", item.danger && "camply-menubar__danger")}
									onClick={() => {
										close();
										item.onSelect?.();
									}}
								>
									{item.icon && <span className={"camply-menubar__icon"}>{item.icon}</span>}
									<span className={"camply-menubar__label"}>{item.label}</span>
									{item.shortcut && (
										<span className={"camply-menubar__shortcut"}>{item.shortcut}</span>
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
