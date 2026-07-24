import { useEffect, useRef, useState } from "react";

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
		} catch {}
	};

	return { copied, copy };
}
