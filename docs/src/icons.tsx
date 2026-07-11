import type { SVGProps } from "react";

const PATHS: Record<string, string> = {
	home: "M3 11l9-8 9 8M5 10v10h14V10",
	components: "M4 4h7v7H4zM13 4h7v7h-7zM13 13h7v7h-7zM4 13h7v7H4z",
	tokens: "m8 6-6 6 6 6M16 6l6 6-6 6",
	arrow: "M5 12h14M13 6l6 6-6 6",
	chevron: "m9 6 6 6-6 6",
	copy: "M9 9h11v11H9zM5 15H4V4h11v1",
	check: "M20 6 9 17l-5-5",
	plus: "M12 5v14M5 12h14",
	search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20.5 20.5 16.7 16.7",
	clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v4l2.5 1.5",
	form: "M4 5h16M4 12h16M4 19h10",
	surface: "M3 5h18v14H3zM3 10h18",
	nav: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM15 9l-2 6-4 1 2-6z",
	feedback: "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M10 21a2 2 0 0 0 4 0",
	data: "M4 5c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2M4 5v14c0 1.1 3.6 2 8 2s8-.9 8-2V5M4 12c0 1.1 3.6 2 8 2s8-.9 8-2",
};

type IconProps = { name: string; size?: number } & Omit<SVGProps<SVGSVGElement>, "name">;

export function Icon({ name, size = 16, ...rest }: IconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.8}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...rest}
		>
			<path d={PATHS[name] ?? ""} />
		</svg>
	);
}
