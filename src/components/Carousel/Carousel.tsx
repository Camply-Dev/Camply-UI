import {
	type CSSProperties,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { ChevronLeft, ChevronRight } from "../../lib/icons";
export interface CarouselProps {
	children: ReactNode[];
	/** show prev/next arrows */
	arrows?: boolean;
	/** show dot indicators */
	dots?: boolean;
	/** auto-advance interval in ms (0 = off) */
	autoPlay?: number;
	/** loop back to the start after the last slide */
	loop?: boolean;
	className?: string;
	style?: CSSProperties;
}

/** Swipeable slide carousel with arrows, dots, keyboard and optional autoplay.
 *  Pass each slide as a child. */
export function Carousel({
	children,
	arrows = true,
	dots = true,
	autoPlay = 0,
	loop = true,
	className,
	style,
}: CarouselProps) {
	const slides = Array.isArray(children) ? children : [children];
	const count = slides.length;
	const [index, setIndex] = useState(0);
	const touchX = useRef<number | null>(null);

	const go = useCallback(
		(next: number) => {
			if (loop) setIndex((next + count) % count);
			else setIndex(Math.max(0, Math.min(count - 1, next)));
		},
		[count, loop],
	);

	useEffect(() => {
		if (!autoPlay || count <= 1) return;
		const id = setInterval(() => go(index + 1), autoPlay);
		return () => clearInterval(id);
	}, [autoPlay, count, go, index]);

	const canPrev = loop || index > 0;
	const canNext = loop || index < count - 1;

	return (
		<section
			className={cn("camply-carousel__root", className)}
			style={style}
			aria-label="Carrousel"
			aria-roledescription="carrousel"
			// biome-ignore lint/a11y/noNoninteractiveTabindex: carrousel focusable pour la navigation ←/→ (pattern APG carousel)
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "ArrowLeft") go(index - 1);
				else if (e.key === "ArrowRight") go(index + 1);
			}}
			onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
			onTouchEnd={(e) => {
				if (touchX.current == null) return;
				const dx = e.changedTouches[0].clientX - touchX.current;
				if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
				touchX.current = null;
			}}
		>
			<div className={"camply-carousel__viewport"}>
				<div
					className={"camply-carousel__track"}
					style={{ transform: `translateX(-${index * 100}%)` }}
				>
					{slides.map((slide, i) => (
						// biome-ignore lint/a11y/useSemanticElements: div+role="group"+aria-roledescription="diapositive" est le pattern APG des slides
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: diapositives = children positionnels — l'index EST l'identité
							key={i}
							className={"camply-carousel__slide"}
							aria-hidden={i !== index}
							role="group"
							aria-roledescription="diapositive"
						>
							{slide}
						</div>
					))}
				</div>

				{arrows && count > 1 && (
					<>
						<button
							type="button"
							className={cn("camply-carousel__arrow", "camply-carousel__prev")}
							aria-label="Précédent"
							disabled={!canPrev}
							onClick={() => go(index - 1)}
						>
							<ChevronLeft size={18} />
						</button>
						<button
							type="button"
							className={cn("camply-carousel__arrow", "camply-carousel__next")}
							aria-label="Suivant"
							disabled={!canNext}
							onClick={() => go(index + 1)}
						>
							<ChevronRight size={18} />
						</button>
					</>
				)}
			</div>

			{dots && count > 1 && (
				<div className={"camply-carousel__dots"}>
					{slides.map((_, i) => (
						<button
							// biome-ignore lint/suspicious/noArrayIndexKey: un point par position de diapositive — l'index EST l'identité
							key={i}
							type="button"
							aria-label={`Diapositive ${i + 1}`}
							aria-current={i === index}
							className={cn("camply-carousel__dot", i === index && "camply-carousel__dotActive")}
							onClick={() => setIndex(i)}
						/>
					))}
				</div>
			)}
		</section>
	);
}
