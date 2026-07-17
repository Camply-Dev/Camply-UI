import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { deriveInitials, hashString } from "../../lib/initials";

export type AvatarStatus = "online" | "away" | "busy" | "offline";

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
	src?: string;
	name?: string;
	initials?: string;
	size?: number;
	status?: AvatarStatus;
}

const GRADIENTS = [
	"linear-gradient(150deg,#7dd3fc,#38bdf8)",
	"linear-gradient(150deg,#7ab6e0,#4f86b0)",
	"linear-gradient(150deg,#e0c07a,#b0904a)",
	"linear-gradient(150deg,#e0a17a,#b06a4a)",
	"linear-gradient(150deg,#b79ee0,#8467b0)",
];
const gradientFor = (seed: string): string =>
	GRADIENTS[Math.abs(hashString(seed)) % GRADIENTS.length];

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
	({ src, name, initials, size = 52, status, className, style, ...props }, ref) => {
		const label = initials ?? deriveInitials(name);
		const dotSize = Math.max(8, Math.round(size * 0.26));
		// Sans nom, l'avatar n'a rien à annoncer : on le laisse décoratif plutôt que
		// d'exposer un role="img" dépourvu de nom accessible.
		const accessibleName = name ?? initials;
		const a11y: HTMLAttributes<HTMLSpanElement> = accessibleName
			? { role: "img", "aria-label": accessibleName }
			: {};

		return (
			<span
				ref={ref}
				{...a11y}
				className={cn("camply-avatar__avatar", className)}
				style={{ width: size, height: size, ...style }}
				{...props}
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
						aria-hidden="true"
						className={cn("camply-avatar__status", `camply-avatar__${status}`)}
						style={{ width: dotSize, height: dotSize }}
					/>
				)}
			</span>
		);
	},
);

Avatar.displayName = "Avatar";

export interface AvatarGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
	avatars: AvatarProps[];
	size?: number;
	max?: number;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
	({ avatars, size = 38, max = 4, className, ...props }, ref) => {
		const shown = avatars.slice(0, max);
		const overflow = avatars.length - shown.length;
		const overlap = Math.round(size * 0.32);

		return (
			<div ref={ref} className={cn("camply-avatar__group", className)} {...props}>
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
	},
);

AvatarGroup.displayName = "AvatarGroup";
