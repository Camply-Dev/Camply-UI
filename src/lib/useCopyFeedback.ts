import { useEffect, useRef, useState } from "react";

/** État « copié » avec retour visuel temporaire. `copy(text)` écrit dans le
 *  presse-papiers, passe `copied` à true, puis le remet à false après `resetMs`.
 *  Le timer est nettoyé au démontage et à chaque nouvelle copie. */
export function useCopyFeedback(resetMs = 1400) {
	const [copied, setCopied] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	useEffect(() => () => clearTimeout(timer.current), []);

	const copy = async (text: string) => {
		try {
			await navigator.clipboard?.writeText(text);
			setCopied(true);
			clearTimeout(timer.current);
			timer.current = setTimeout(() => setCopied(false), resetMs);
		} catch {
			/* presse-papiers indisponible */
		}
	};

	return { copied, copy };
}
