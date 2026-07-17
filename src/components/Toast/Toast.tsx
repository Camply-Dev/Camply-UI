import {
	type ComponentPropsWithoutRef,
	createContext,
	forwardRef,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { CloseButton } from "../../lib/CloseButton";
import { cn } from "../../lib/cn";
import { useLabels } from "../../lib/i18n";
import { Info, STATUS_ICONS } from "../../lib/icons";
import { Portal } from "../../lib/Portal";
export type ToastTone = "default" | "success" | "info" | "warn" | "danger";

export interface ToastOptions {
	title: ReactNode;
	description?: ReactNode;
	tone?: ToastTone;
	duration?: number;
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

export interface ToastProviderProps extends Omit<ComponentPropsWithoutRef<"section">, "children"> {
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
				if (ms > 0) {
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
						data-position={position}
						aria-label={ariaLabel ?? labels.notifications}
						aria-live="polite"
						aria-atomic="false"
						onPointerEnter={() => {
							hovered.current = true;
							syncPause();
						}}
						onPointerLeave={() => {
							hovered.current = false;
							syncPause();
						}}
						onFocus={() => {
							focused.current = true;
							syncPause();
						}}
						onBlur={(e) => {
							// Focus qui reste dans la pile (toast → bouton fermer) : on ne reprend pas.
							if (e.currentTarget.contains(e.relatedTarget)) return;
							focused.current = false;
							syncPause();
						}}
						{...props}
					>
						{toasts.map((t) => {
							const tone = t.tone ?? "default";
							const ToneIcon = TONE_ICON[tone];
							// Une erreur interrompt la tâche en cours : elle est annoncée sans attendre.
							const urgent = tone === "danger";
							return (
								<div
									key={t.id}
									className={"camply-toast__toast"}
									data-tone={tone}
									role={urgent ? "alert" : "status"}
									aria-live={urgent ? "assertive" : "polite"}
									aria-atomic="true"
								>
									<span className={"camply-toast__icon"} aria-hidden="true">
										<ToneIcon size={15} />
									</span>
									<div className={"camply-toast__body"}>
										<div className={"camply-toast__title"}>{t.title}</div>
										{t.description && <div className={"camply-toast__desc"}>{t.description}</div>}
									</div>
									<CloseButton
										className="camply-toast__close"
										onClick={() => dismiss(t.id)}
										iconSize={14}
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
