import type { CSSProperties } from "react";
import { cn } from "../../lib/cn";
export type AvatarStatus = "online" | "away" | "busy" | "offline";

export interface AvatarProps {
	src?: string;
	/** used for alt text and to derive initials */
	name?: string;
	/** override the derived initials */
	initials?: string;
	size?: number;
	status?: AvatarStatus;
	className?: string;
	style?: CSSProperties;
}

function deriveInitials(name?: string): string {
	if (!name) return "?";
	const parts = name.trim().split(/\s+/);
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Deterministic gradient from the name, so an avatar keeps its color.
const GRADIENTS = [
	"linear-gradient(150deg,#7dd3fc,#38bdf8)",
	"linear-gradient(150deg,#7ab6e0,#4f86b0)",
	"linear-gradient(150deg,#e0c07a,#b0904a)",
	"linear-gradient(150deg,#e0a17a,#b06a4a)",
	"linear-gradient(150deg,#b79ee0,#8467b0)",
];
function gradientFor(seed: string): string {
	let h = 0;
	for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
	return GRADIENTS[Math.abs(h) % GRADIENTS.length];
}

export function Avatar({ src, name, initials, size = 52, status, className, style }: AvatarProps) {
	const label = initials ?? deriveInitials(name);
	const dotSize = Math.max(8, Math.round(size * 0.26));

	return (
		<span
			role="img"
			aria-label={name}
			className={cn("camply-avatar__avatar", className)}
			style={{ width: size, height: size, ...style }}
		>
			{src ? (
				<img src={src} alt="" className={"camply-avatar__img"} />
			) : (
				<span
					aria-hidden="true"
					className={"camply-avatar__fallback"}
					style={{
						background: gradientFor(name ?? label),
						fontSize: Math.round(size * 0.36),
					}}
				>
					{label}
				</span>
			)}
			{status && (
				<span
					className={cn("camply-avatar__status", `camply-avatar__${status}`)}
					style={{ width: dotSize, height: dotSize }}
				/>
			)}
		</span>
	);
}

export interface AvatarGroupProps {
	avatars: AvatarProps[];
	size?: number;
	/** max shown before a +N chip */
	max?: number;
	className?: string;
}

export function AvatarGroup({ avatars, size = 38, max = 4, className }: AvatarGroupProps) {
	const shown = avatars.slice(0, max);
	const overflow = avatars.length - shown.length;
	const overlap = Math.round(size * 0.32);

	return (
		<div className={cn("camply-avatar__group", className)}>
			{shown.map((a, i) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: avatars déclaratifs sans identifiant — la position est l'identité
					key={i}
					className={"camply-avatar__groupItem"}
					style={{ marginLeft: i === 0 ? 0 : -overlap }}
				>
					<Avatar {...a} size={size} status={undefined} />
				</span>
			))}
			{overflow > 0 && (
				<span
					className={cn("camply-avatar__groupItem", "camply-avatar__overflow")}
					style={{
						width: size,
						height: size,
						marginLeft: -overlap,
						fontSize: Math.round(size * 0.34),
					}}
				>
					+{overflow}
				</span>
			)}
		</div>
	);
}
