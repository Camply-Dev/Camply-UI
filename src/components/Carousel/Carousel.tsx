import {
	type CSSProperties,
	type FocusEvent,
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	type MouseEvent,
	type ReactNode,
	type TouchEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { useLabels } from "../../lib/i18n";
import { ChevronLeft, ChevronRight, Pause, Play } from "../../lib/icons";
import { wrapIndex } from "../../lib/rovingIndex";
import { useControllable } from "../../lib/useControllable";

export type CarouselIndicator = "dots" | "lines" | "count";
export type CarouselEffect = "slide" | "fade";

/**
 * `inert` attend un booléen en React 19 et une chaîne en React 18 : chaque forme
 * déclenche un avertissement sur l'autre version. On pose donc l'attribut à la main.
 * La ref est rejouée à chaque rendu, l'attribut suit toujours l'état visible.
 */
function setInert(el: HTMLElement | null, on: boolean): void {
	if (!el) return;
	if (on) el.setAttribute("inert", "");
	else el.removeAttribute("inert");
}

/** Les flèches restent au champ de saisie : on ne les détourne que hors saisie. */
function isTextTarget(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) return false;
	if (target.isContentEditable) return true;
	const tag = target.tagName;
	return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

export interface CarouselProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
	children: ReactNode[];
	arrows?: boolean;
	dots?: boolean;
	indicator?: CarouselIndicator;
	slidesPerView?: number;
	gap?: number;
	effect?: CarouselEffect;
	/** Intervalle de rotation automatique en ms (0 = pas de rotation). */
	autoPlay?: number;
	pauseOnHover?: boolean;
	loop?: boolean;
	aspectRatio?: string;
	index?: number;
	defaultIndex?: number;
	onIndexChange?: (index: number) => void;
}

export const Carousel = forwardRef<HTMLElement, CarouselProps>(function Carousel(
	{
		children,
		arrows = true,
		dots = true,
		indicator = "dots",
		slidesPerView = 1,
		gap = 0,
		effect = "slide",
		autoPlay = 0,
		pauseOnHover = true,
		loop = true,
		aspectRatio,
		index: indexProp,
		defaultIndex = 0,
		onIndexChange,
		className,
		style,
		onKeyDown,
		onMouseEnter,
		onMouseLeave,
		onTouchStart,
		onTouchEnd,
		onFocusCapture,
		onBlurCapture,
		...rest
	},
	ref,
) {
	const labels = useLabels();
	const slides = Array.isArray(children) ? children : [children];
	const count = slides.length;
	const fade = effect === "fade";
	const perView = fade ? 1 : clamp(slidesPerView, 1, Math.max(1, count));
	const pages = Math.max(1, count - perView + 1);

	const [index, setIndex] = useControllable<number>(indexProp, defaultIndex, onIndexChange);
	const [playing, setPlaying] = useState(true);
	const [hovered, setHovered] = useState(false);
	const [focused, setFocused] = useState(false);
	const touchX = useRef<number | null>(null);

	const active = clamp(index, 0, pages - 1);

	const go = useCallback(
		(next: number) => {
			if (loop) setIndex(wrapIndex(next, pages));
			else setIndex(clamp(next, 0, pages - 1));
		},
		[pages, loop, setIndex],
	);

	// WCAG 2.2.2 : la rotation doit pouvoir être arrêtée — bouton, survol ou focus.
	const canRotate = autoPlay > 0 && pages > 1;
	const rotating = canRotate && playing && !focused && !(pauseOnHover && hovered);

	useEffect(() => {
		if (!rotating) return;
		const id = setInterval(() => go(active + 1), autoPlay);
		return () => clearInterval(id);
	}, [rotating, autoPlay, go, active]);

	const canPrev = loop || active > 0;
	const canNext = loop || active < pages - 1;
	const showDots = dots && pages > 1;

	return (
		<section
			ref={ref}
			className={cn("camply-carousel__root", className)}
			style={{ ...style, "--cu-spv": perView, "--cu-gap": `${gap}px` } as CSSProperties}
			aria-label={labels.carousel}
			aria-roledescription="carrousel"
			// biome-ignore lint/a11y/noNoninteractiveTabindex: carrousel focusable pour la navigation ←/→ (pattern APG carousel)
			tabIndex={0}
			{...rest}
			onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
				onKeyDown?.(e);
				if (e.defaultPrevented || isTextTarget(e.target)) return;
				if (e.key === "ArrowLeft") {
					e.preventDefault();
					go(active - 1);
				} else if (e.key === "ArrowRight") {
					e.preventDefault();
					go(active + 1);
				}
			}}
			onMouseEnter={(e: MouseEvent<HTMLElement>) => {
				onMouseEnter?.(e);
				setHovered(true);
			}}
			onMouseLeave={(e: MouseEvent<HTMLElement>) => {
				onMouseLeave?.(e);
				setHovered(false);
			}}
			onFocusCapture={(e: FocusEvent<HTMLElement>) => {
				onFocusCapture?.(e);
				setFocused(true);
			}}
			onBlurCapture={(e: FocusEvent<HTMLElement>) => {
				onBlurCapture?.(e);
				// Un déplacement interne du focus ne doit pas relancer la rotation.
				if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
			}}
			onTouchStart={(e: TouchEvent<HTMLElement>) => {
				onTouchStart?.(e);
				touchX.current = e.touches[0].clientX;
			}}
			onTouchEnd={(e: TouchEvent<HTMLElement>) => {
				onTouchEnd?.(e);
				if (touchX.current == null) return;
				const dx = e.changedTouches[0].clientX - touchX.current;
				if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
				touchX.current = null;
			}}
		>
			<div
				className={"camply-carousel__viewport"}
				style={aspectRatio ? { aspectRatio } : undefined}
				aria-live={rotating ? "off" : "polite"}
			>
				<div
					className={cn("camply-carousel__track", fade && "camply-carousel__trackFade")}
					style={
						fade
							? undefined
							: {
									transform: `translateX(calc(${-active} * (100% + var(--cu-gap)) / var(--cu-spv)))`,
								}
					}
				>
					{slides.map((slide, i) => {
						const visible = fade ? i === active : i >= active && i < active + perView;
						return (
							// biome-ignore lint/a11y/useSemanticElements: div+role="group"+aria-roledescription="diapositive" est le pattern APG des slides
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: diapositives = children positionnels — l'index EST l'identité
								key={i}
								// Sans `inert`, le contenu des slides masquées reste atteignable au clavier.
								ref={(el) => {
									setInert(el, !visible);
								}}
								className={cn(
									"camply-carousel__slide",
									fade && i === active && "camply-carousel__slideActive",
								)}
								aria-hidden={!visible}
								role="group"
								aria-roledescription="diapositive"
							>
								{slide}
							</div>
						);
					})}
				</div>

				{arrows && pages > 1 && (
					<>
						<button
							type="button"
							className={cn("camply-carousel__arrow", "camply-focus-ring", "camply-carousel__prev")}
							aria-label={labels.previous}
							disabled={!canPrev}
							onClick={() => go(active - 1)}
						>
							<ChevronLeft size={18} />
						</button>
						<button
							type="button"
							className={cn("camply-carousel__arrow", "camply-focus-ring", "camply-carousel__next")}
							aria-label={labels.next}
							disabled={!canNext}
							onClick={() => go(active + 1)}
						>
							<ChevronRight size={18} />
						</button>
					</>
				)}
			</div>

			{(canRotate || showDots) && (
				<div className={"camply-carousel__controls"}>
					{canRotate && (
						<button
							type="button"
							className={cn("camply-carousel__toggle", "camply-round-btn", "camply-focus-ring")}
							aria-label={playing ? labels.pause : labels.play}
							onClick={() => setPlaying((p) => !p)}
						>
							{playing ? <Pause size={15} /> : <Play size={15} />}
						</button>
					)}

					{showDots &&
						(indicator === "count" ? (
							<div className={"camply-carousel__count"}>
								{active + 1} / {pages}
							</div>
						) : (
							<div
								className={cn(
									"camply-carousel__dots",
									indicator === "lines" && "camply-carousel__dotsLines",
								)}
							>
								{Array.from({ length: pages }, (_, i) => (
									<button
										// biome-ignore lint/suspicious/noArrayIndexKey: un point par page — l'index EST l'identité
										key={i}
										type="button"
										aria-label={`Diapositive ${i + 1}`}
										aria-current={i === active}
										className={cn(
											"camply-carousel__dot",
											"camply-focus-ring",
											i === active && "camply-carousel__dotActive",
										)}
										onClick={() => setIndex(i)}
									/>
								))}
							</div>
						))}
				</div>
			)}
		</section>
	);
});
