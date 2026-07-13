import { type RefObject, useEffect, useRef, useState } from "react";
import { wrapIndex } from "./rovingIndex";

type OptionLike = { disabled?: boolean };

export const firstEnabledIndex = (options: OptionLike[]): number =>
	options.findIndex((o) => !o.disabled);
export const lastEnabledIndex = (options: OptionLike[]): number => {
	for (let i = options.length - 1; i >= 0; i--) if (!options[i].disabled) return i;
	return -1;
};

export function useListboxNav(
	listRef: RefObject<HTMLElement | null>,
	open: boolean,
	options: OptionLike[],
	config?: { wrap?: boolean },
) {
	const wrap = config?.wrap !== false;
	const [active, setActive] = useState(0);
	const listRefStable = useRef(listRef);
	listRefStable.current = listRef;

	const moveActive = (dir: 1 | -1) => {
		setActive((prev) => {
			if (!wrap) {
				for (let next = prev + dir; next >= 0 && next < options.length; next += dir) {
					if (!options[next].disabled) return next;
				}
				return prev;
			}
			let next = prev;
			for (let i = 0; i < options.length; i++) {
				next = wrapIndex(next + dir, options.length);
				if (!options[next].disabled) break;
			}
			return next;
		});
	};

	useEffect(() => {
		if (!open) return;
		const el = listRefStable.current.current?.children[active] as HTMLElement | undefined;
		el?.scrollIntoView({ block: "nearest" });
	}, [active, open]);

	return { active, setActive, moveActive };
}
