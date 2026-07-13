import { type RefObject, useEffect, useState } from "react";
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
) {
	const [active, setActive] = useState(0);

	const moveActive = (dir: 1 | -1) => {
		setActive((prev) => {
			let next = prev;
			for (let i = 0; i < options.length; i++) {
				next = wrapIndex(next + dir, options.length);
				if (!options[next].disabled) break;
			}
			return next;
		});
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: listRef est un RefObject stable
	useEffect(() => {
		if (!open) return;
		const el = listRef.current?.children[active] as HTMLElement | undefined;
		el?.scrollIntoView({ block: "nearest" });
	}, [active, open]);

	return { active, setActive, moveActive };
}
