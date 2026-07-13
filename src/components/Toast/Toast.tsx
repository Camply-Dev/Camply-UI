import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { CloseButton } from "../../lib/CloseButton";
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

export interface ToastProviderProps {
	children: ReactNode;
	position?: Corner;
	duration?: number;
}

export function ToastProvider({
	children,
	position = "bottom-right",
	duration = 4000,
}: ToastProviderProps) {
	const [toasts, setToasts] = useState<ToastRecord[]>([]);
	const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
	const seq = useRef(0);

	const dismiss = useCallback((id: number) => {
		setToasts((list) => list.filter((t) => t.id !== id));
		const timer = timers.current.get(id);
		if (timer) {
			clearTimeout(timer);
			timers.current.delete(id);
		}
	}, []);

	const toast = useCallback(
		(options: ToastOptions) => {
			const id = ++seq.current;
			const record: ToastRecord = { tone: "default", ...options, id };
			setToasts((list) => [...list, record]);
			const ms = options.duration ?? duration;
			if (ms > 0) {
				timers.current.set(
					id,
					setTimeout(() => dismiss(id), ms),
				);
			}
			return id;
		},
		[duration, dismiss],
	);

	useEffect(() => {
		const map = timers.current;
		return () => {
			map.forEach((t) => {
				clearTimeout(t);
			});
			map.clear();
		};
	}, []);

	const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<Portal>
				<section
					className={"camply-toast__viewport"}
					data-position={position}
					aria-label="Notifications"
				>
					{toasts.map((t) => {
						const ToneIcon = TONE_ICON[t.tone ?? "default"];
						return (
							<div key={t.id} className={"camply-toast__toast"} data-tone={t.tone}>
								<span className={"camply-toast__icon"}>
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
}
