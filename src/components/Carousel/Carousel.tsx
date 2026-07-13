import {
	type CSSProperties,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { ChevronLeft, ChevronRight } from "../../lib/icons";
import { wrapIndex } from "../../lib/rovingIndex";
import { useControllable } from "../../lib/useControllable";

export type CarouselIndicator = "dots" | "lines" | "count";
export type CarouselEffect = "slide" | "fade";

export interface CarouselProps {
	children: ReactNode[];
	arrows?: boolean;
	dots?: boolean;
	indicator?: CarouselIndicator;
	slidesPerView?: number;
	gap?: number;
	effect?: CarouselEffect;
	autoPlay?: number;
	pauseOnHover?: boolean;
	loop?: boolean;
	aspectRatio?: string;
	index?: number;
	defaultIndex?: number;
	onIndexChange?: (index: number) => void;
	className?: string;
	style?: CSSProperties;
}

export function Carousel({
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
}: CarouselProps) {
	const slides = Array.isArray(children) ? children : [children];
	const count = slides.length;
	const fade = effect === "fade";
	const perView = fade ? 1 : clamp(slidesPerView, 1, Math.max(1, count));
	const pages = Math.max(1, count - perView + 1);

	const [index, setIndex] = useControllable<number>(indexProp, defaultIndex, onIndexChange);
	const [paused, setPaused] = useState(false);
	const touchX = useRef<number | null>(null);

	const active = clamp(index, 0, pages - 1);

	const go = useCallback(
		(next: number) => {
			if (loop) setIndex(wrapIndex(next, pages));
			else setIndex(clamp(next, 0, pages - 1));
		},
		[pages, loop, setIndex],
	);

	useEffect(() => {
		if (!autoPlay || count <= 1 || (pauseOnHover && paused)) return;
		const id = setInterval(() => go(active + 1), autoPlay);
		return () => clearInterval(id);
	}, [autoPlay, count, go, active, pauseOnHover, paused]);

	const canPrev = loop || active > 0;
	const canNext = loop || active < pages - 1;

	return (
		<section
			className={cn("camply-carousel__root", className)}
			style={{ ...style, "--cu-spv": perView, "--cu-gap": `${gap}px` } as CSSProperties}
			aria-label="Carrousel"
			aria-roledescription="carrousel"
			// biome-ignore lint/a11y/noNoninteractiveTabindex: carrousel focusable pour la navigation ←/→ (pattern APG carousel)
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "ArrowLeft") go(active - 1);
				else if (e.key === "ArrowRight") go(active + 1);
			}}
			onMouseEnter={() => pauseOnHover && setPaused(true)}
			onMouseLeave={() => pauseOnHover && setPaused(false)}
			onTouchStart={(e) => {
				touchX.current = e.touches[0].clientX;
			}}
			onTouchEnd={(e) => {
				if (touchX.current == null) return;
				const dx = e.changedTouches[0].clientX - touchX.current;
				if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
				touchX.current = null;
			}}
		>
			<div
				className={"camply-carousel__viewport"}
				style={aspectRatio ? { aspectRatio } : undefined}
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
					{slides.map((slide, i) => (
						// biome-ignore lint/a11y/useSemanticElements: div+role="group"+aria-roledescription="diapositive" est le pattern APG des slides
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: diapositives = children positionnels — l'index EST l'identité
							key={i}
							className={cn(
								"camply-carousel__slide",
								fade && i === active && "camply-carousel__slideActive",
							)}
							aria-hidden={fade ? i !== active : i < active || i >= active + perView}
							role="group"
							aria-roledescription="diapositive"
						>
							{slide}
						</div>
					))}
				</div>

				{arrows && pages > 1 && (
					<>
						<button
							type="button"
							className={cn("camply-carousel__arrow", "camply-focus-ring", "camply-carousel__prev")}
							aria-label="Précédent"
							disabled={!canPrev}
							onClick={() => go(active - 1)}
						>
							<ChevronLeft size={18} />
						</button>
						<button
							type="button"
							className={cn("camply-carousel__arrow", "camply-focus-ring", "camply-carousel__next")}
							aria-label="Suivant"
							disabled={!canNext}
							onClick={() => go(active + 1)}
						>
							<ChevronRight size={18} />
						</button>
					</>
				)}
			</div>

			{dots &&
				pages > 1 &&
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
		</section>
	);
}
