import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { deriveInitials, hashString } from "../../lib/initials";
import type { Size } from "../../lib/types";

export type AvatarStatus = "online" | "away" | "busy" | "offline";

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
	src?: string;
	name?: string;
	initials?: string;
	/** Échelle nommée de la lib, ou un diamètre libre en pixels. */
	size?: Size | number;
	status?: AvatarStatus;
}

/** Barème des tailles nommées, en pixels : un pas constant de 20 px autour de `md`. */
const SIZES: Record<Size, number> = { sm: 32, md: 52, lg: 72 };

/**
 * Un nom d'échelon se résout en pixels ; un nombre passe tel quel — c'est la
 * porte de sortie pour les diamètres que l'échelle ne couvre pas (AvatarGroup
 * impose 38, par exemple).
 */
const resolveSize = (size: Size | number): number =>
	typeof size === "number" ? size : SIZES[size];

/**
 * Nombre de dégradés de repli. Le JS ne choisit que l'index (hachage du nom,
 * donc couleur stable d'un montage à l'autre) ; les couleurs vivent en feuille,
 * surchargeables sans `!important` (règle 7). Toute classe ajoutée dans
 * `Avatar.css` doit faire monter ce compte.
 */
const TINTS = 5;
const tintFor = (seed: string): string =>
	`camply-avatar__tint${Math.abs(hashString(seed)) % TINTS}`;

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
	({ src, name, initials, size = "md", status, className, style, ...props }, ref) => {
		const label = initials ?? deriveInitials(name);
		// Tout se dimensionne à partir du diamètre résolu — pastille de statut comprise,
		// qu'on arrive par l'échelle nommée ou par un nombre.
		const px = resolveSize(size);
		const dotSize = Math.max(8, Math.round(px * 0.26));
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
				style={{ width: px, height: px, ...style }}
				{...props}
			>
				{src ? (
					<img src={src} alt="" className="camply-avatar__img" />
				) : (
					<span
						aria-hidden="true"
						className={cn("camply-avatar__fallback", tintFor(name ?? label))}
						// Seule la taille reste inline : elle se calcule depuis le diamètre.
						style={{ fontSize: Math.round(px * 0.36) }}
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
	/**
	 * Avatars de la pile, sans `size` ni `status` : le groupe impose un diamètre
	 * unique (sinon le chevauchement ne s'aligne plus) et aucune pastille (elles
	 * tomberaient sous l'avatar suivant).
	 */
	avatars: Omit<AvatarProps, "size" | "status">[];
	/** Diamètre imposé à toute la pile : échelle nommée ou pixels (défaut 38). */
	size?: Size | number;
	max?: number;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
	({ avatars, size = 38, max = 4, className, ...props }, ref) => {
		const shown = avatars.slice(0, max);
		const overflow = avatars.length - shown.length;
		// La pile impose son diamètre : on le résout une fois ici, et les avatars le
		// reçoivent déjà en pixels — chevauchement et pastille « +N » s'y accordent.
		const px = resolveSize(size);
		const overlap = Math.round(px * 0.32);

		return (
			<div ref={ref} className={cn("camply-avatar__group", className)} {...props}>
				{shown.map((a, i) => (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: avatars déclaratifs sans identifiant — la position est l'identité
						key={i}
						className="camply-avatar__groupItem"
						style={{ marginLeft: i === 0 ? 0 : -overlap }}
					>
						{/* `status` neutralisé après le spread : le type l'interdit déjà, mais un appelant JS peut en glisser un. */}
						<Avatar {...a} size={px} status={undefined} />
					</span>
				))}
				{overflow > 0 && (
					<span
						className={cn("camply-avatar__groupItem", "camply-avatar__overflow")}
						style={{
							width: px,
							height: px,
							marginLeft: -overlap,
							fontSize: Math.round(px * 0.34),
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
