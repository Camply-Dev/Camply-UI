import {
	type ComponentPropsWithoutRef,
	createContext,
	forwardRef,
	type MouseEvent,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { CloseButton } from "../../lib/CloseButton";
import { compose } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { useLabels } from "../../lib/i18n";
import { Info, STATUS_ICONS } from "../../lib/icons";
import { Portal } from "../../lib/Portal";
import type { Tone } from "../../lib/types";
import { Button } from "../Button";
/** `default` sort de la palette sémantique : notification neutre, sans statut. */
export type ToastTone = Extract<Tone, "success" | "info" | "warn" | "danger"> | "default";

/** Bouton d'action d'un toast (« Annuler », « Voir »…). */
export interface ToastAction {
	label: ReactNode;
	/** Appelé au clic ; le toast se ferme ensuite, sauf `event.preventDefault()`. */
	onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export interface ToastOptions {
	title: ReactNode;
	description?: ReactNode;
	tone?: ToastTone;
	duration?: number;
	/**
	 * Bouton d'action sous le texte. Le toast disparaît au bout de `duration` :
	 * en laisser le temps (une durée plus longue, ou `0`), et ne jamais en faire
	 * le seul moyen d'agir (WCAG 2.2.1).
	 */
	action?: ToastAction;
}

interface ToastRecord extends ToastOptions {
	id: number;
}

/** Minuterie d'un toast : on garde le temps restant pour pouvoir la suspendre puis la reprendre. */
interface ToastTimer {
	remaining: number;
	startedAt: number;
	handle: ReturnType<typeof setTimeout> | null;
}

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom-center";

interface ToastContextValue {
	toast: (options: ToastOptions) => number;
	dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
	return ctx;
}

const TONE_ICON = { ...STATUS_ICONS, default: Info } as const;

/**
 * Règle 3. La pile n'est annoncée que si elle reste une région live, et
 * `data-position` (posé après le spread) suit la prop `position`.
 */
type ReservedToastViewportAttr = "aria-live" | "aria-atomic";

export interface ToastProviderProps
	extends Omit<ComponentPropsWithoutRef<"section">, "children" | ReservedToastViewportAttr> {
	children: ReactNode;
	position?: Corner;
	duration?: number;
}

/**
 * Fournit `useToast()` et rend la pile de notifications dans un portail.
 * La ref et les props HTML supplémentaires vont sur le viewport (la pile elle-même).
 */
export const ToastProvider = forwardRef<HTMLElement, ToastProviderProps>(
	(
		{
			children,
			position = "bottom-right",
			duration = 4000,
			className,
			"aria-label": ariaLabel,
			onPointerEnter,
			onPointerLeave,
			onFocus,
			onBlur,
			...props
		},
		ref,
	) => {
		const labels = useLabels();
		const [toasts, setToasts] = useState<ToastRecord[]>([]);
		const timers = useRef<Map<number, ToastTimer>>(new Map());
		const seq = useRef(0);
		const paused = useRef(false);
		const hovered = useRef(false);
		const focused = useRef(false);

		const dismiss = useCallback((id: number) => {
			setToasts((list) => list.filter((t) => t.id !== id));
			const timer = timers.current.get(id);
			if (timer?.handle) clearTimeout(timer.handle);
			timers.current.delete(id);
		}, []);

		/** (Re)lance la minuterie d'un toast sur son temps restant. */
		const start = useCallback(
			(id: number) => {
				const timer = timers.current.get(id);
				if (!timer || timer.handle) return;
				timer.startedAt = Date.now();
				timer.handle = setTimeout(() => dismiss(id), timer.remaining);
			},
			[dismiss],
		);

		/**
		 * Suspend les minuteries tant que la pile est survolée ou contient le focus : un toast ne
		 * doit pas disparaître pendant qu'on le lit ou qu'on tabule dedans (WCAG 2.2.1).
		 */
		const syncPause = useCallback(() => {
			const next = hovered.current || focused.current;
			if (next === paused.current) return;
			paused.current = next;
			timers.current.forEach((timer, id) => {
				if (!next) {
					start(id);
					return;
				}
				if (!timer.handle) return;
				clearTimeout(timer.handle);
				timer.handle = null;
				timer.remaining = Math.max(0, timer.remaining - (Date.now() - timer.startedAt));
			});
		}, [start]);

		const toast = useCallback(
			(options: ToastOptions) => {
				const id = ++seq.current;
				const record: ToastRecord = { tone: "default", ...options, id };
				setToasts((list) => [...list, record]);
				const ms = options.duration ?? duration;
				// `0` ou `Infinity` : le toast reste. Un `setTimeout(…, Infinity)` partirait
				// aussitôt (le délai déborde), il ne faut pas en créer.
				if (ms > 0 && Number.isFinite(ms)) {
					timers.current.set(id, { remaining: ms, startedAt: 0, handle: null });
					if (!paused.current) start(id);
				}
				return id;
			},
			[duration, start],
		);

		// Une pile vide ne capte ni la souris ni le focus : on repart d'un état non suspendu, même si
		// le navigateur n'a pas émis de pointerleave sur le toast retiré sous le curseur.
		useEffect(() => {
			if (toasts.length > 0) return;
			hovered.current = false;
			focused.current = false;
			paused.current = false;
		}, [toasts.length]);

		useEffect(() => {
			const map = timers.current;
			return () => {
				map.forEach((timer) => {
					if (timer.handle) clearTimeout(timer.handle);
				});
				map.clear();
			};
		}, []);

		/**
		 * Ferme un toast depuis l'un de ses boutons. S'il avait le focus, celui-ci passe au
		 * toast voisin ; sans voisin, la pile ne le retient plus : certains navigateurs
		 * n'émettent aucun `blur` quand le bouton focalisé disparaît, et les autres toasts
		 * resteraient sinon suspendus pour toujours.
		 */
		const dismissFrom = (id: number, button: HTMLElement) => {
			const item = button.closest<HTMLElement>(".camply-toast__toast");
			const hadFocus = !!item?.contains(document.activeElement);
			const neighbour = (item?.nextElementSibling ??
				item?.previousElementSibling) as HTMLElement | null;
			dismiss(id);
			if (!hadFocus) return;
			const next = neighbour?.querySelector<HTMLElement>(".camply-toast__close");
			if (next) {
				next.focus();
				return;
			}
			focused.current = false;
			syncPause();
		};

		const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

		return (
			<ToastContext.Provider value={value}>
				{children}
				<Portal>
					{/* Le viewport est monté en permanence : une région live n'est annoncée que si elle
					    existait déjà dans le DOM avant l'arrivée du contenu. */}
					<section
						ref={ref}
						className={cn("camply-toast__viewport", className)}
						aria-label={ariaLabel ?? labels.notifications}
						{...props}
						data-position={position}
						aria-live="polite"
						aria-atomic="false"
						// La pause relève de WCAG 2.2.1 : elle est composée avec les gestionnaires du
						// consommateur, jamais écrasée ; seul son `preventDefault()` la neutralise.
						onPointerEnter={compose(onPointerEnter, () => {
							hovered.current = true;
							syncPause();
						})}
						onPointerLeave={compose(onPointerLeave, () => {
							hovered.current = false;
							syncPause();
						})}
						onFocus={compose(onFocus, () => {
							focused.current = true;
							syncPause();
						})}
						onBlur={compose(onBlur, (e) => {
							// Focus qui reste dans la pile (toast → bouton fermer) : on ne reprend pas.
							if (e.currentTarget.contains(e.relatedTarget)) return;
							focused.current = false;
							syncPause();
						})}
					>
						{toasts.map((t) => {
							const tone = t.tone ?? "default";
							const ToneIcon = TONE_ICON[tone];
							// Une erreur interrompt la tâche en cours : elle est annoncée sans attendre.
							const urgent = tone === "danger";
							return (
								<div
									key={t.id}
									className="camply-toast__toast"
									data-tone={tone}
									role={urgent ? "alert" : "status"}
									aria-live={urgent ? "assertive" : "polite"}
									aria-atomic="true"
								>
									<span className="camply-toast__icon" aria-hidden="true">
										<ToneIcon size={15} />
									</span>
									<div className="camply-toast__body">
										<div className="camply-toast__title">{t.title}</div>
										{t.description && <div className="camply-toast__desc">{t.description}</div>}
										{t.action && (
											<Button
												size="sm"
												variant="soft"
												className="camply-toast__action"
												onClick={compose(t.action.onClick, (e) =>
													dismissFrom(t.id, e.currentTarget),
												)}
											>
												{t.action.label}
											</Button>
										)}
									</div>
									<CloseButton
										className="camply-toast__close"
										onClick={(e) => dismissFrom(t.id, e.currentTarget)}
									/>
								</div>
							);
						})}
					</section>
				</Portal>
			</ToastContext.Provider>
		);
	},
);

ToastProvider.displayName = "ToastProvider";
