import { type CSSProperties, type DragEvent, forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { formatFileSize, isFileAccepted } from "../../lib/fileUtils";
import { CheckCircle, Upload, X } from "../../lib/icons";
import { Progress } from "../Progress";
import { Spinner } from "../Spinner";

export interface FileUploadProps {
	onChange?: (files: File[]) => void;
	accept?: string;
	multiple?: boolean;
	/** max size per file, in bytes */
	maxSize?: number;
	disabled?: boolean;
	hint?: string;
	className?: string;
	style?: CSSProperties;
}

type UploadStatus = "uploading" | "done";
interface FileItem {
	id: number;
	file: File;
	progress: number; // 0 → 1
	status: UploadStatus;
}

// Cadence de la progression simulée (retour visuel ; le vrai upload est côté conso).
const TICK = 80;
const STEP = 0.07;

/** Drag-and-drop upload zone. The zone itself reflects the state: prompt → live
 *  progress (loader + bar) → uploaded confirmation (✓ + file names). Emits real
 *  File objects through onChange — wire them to your own upload logic. The zone is
 *  a native label wrapping the file input: click and keyboard come for free. */
export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
	(
		{ onChange, accept, multiple = false, maxSize, disabled = false, hint, className, style },
		ref,
	) => {
		const [items, setItems] = useState<FileItem[]>([]);
		const [dragging, setDragging] = useState(false);
		const [error, setError] = useState<string | null>(null);
		const nextId = useRef(0);

		const uploading = items.some((it) => it.status === "uploading");

		// Fait avancer la progression des fichiers "uploading" jusqu'à 100 %, puis "done".
		useEffect(() => {
			if (!uploading) return;
			const id = setInterval(() => {
				setItems((prev) =>
					prev.map((it) => {
						if (it.status !== "uploading") return it;
						const p = it.progress + STEP;
						return p >= 1 ? { ...it, progress: 1, status: "done" } : { ...it, progress: p };
					}),
				);
			}, TICK);
			return () => clearInterval(id);
		}, [uploading]);

		const addFiles = (incoming: FileList | null) => {
			if (!incoming) return;
			setError(null);
			const list: FileItem[] = [];
			for (const f of Array.from(incoming)) {
				if (!isFileAccepted(f, accept)) {
					setError(`Type non accepté : ${f.name}`);
					continue;
				}
				if (maxSize && f.size > maxSize) {
					setError(`${f.name} dépasse ${formatFileSize(maxSize)}`);
					continue;
				}
				nextId.current += 1;
				list.push({ id: nextId.current, file: f, progress: 0, status: "uploading" });
			}
			if (list.length === 0) return;
			const next = multiple ? [...items, ...list] : list.slice(0, 1);
			setItems(next);
			onChange?.(next.map((it) => it.file));
		};

		const clear = () => {
			setItems([]);
			setError(null);
			onChange?.([]);
		};

		const onDrop = (e: DragEvent) => {
			e.preventDefault();
			setDragging(false);
			if (!disabled) addFiles(e.dataTransfer.files);
		};

		const count = items.length;
		// 1 fichier → son nom ; plusieurs → le nombre.
		const summary = multiple
			? `${count} fichier${count > 1 ? "s" : ""}`
			: (items[0]?.file.name ?? "");
		const pending = items.filter((it) => it.status === "uploading");
		const percent = pending.length
			? Math.round((pending.reduce((s, it) => s + it.progress, 0) / pending.length) * 100)
			: 100;

		return (
			<div ref={ref} className={cn("camply-fileupload__root", className)} style={style}>
				<label
					className={cn(
						"camply-fileupload__zone",
						dragging && "camply-fileupload__dragging",
						disabled && "camply-fileupload__disabled",
						count > 0 && !uploading && "camply-fileupload__uploaded",
					)}
					onDragOver={(e) => {
						e.preventDefault();
						if (!disabled) setDragging(true);
					}}
					onDragLeave={() => setDragging(false)}
					onDrop={onDrop}
				>
					<input
						type="file"
						accept={accept}
						multiple={multiple}
						disabled={disabled}
						className={"camply-fileupload__input"}
						onChange={(e) => {
							addFiles(e.target.files);
							e.target.value = "";
						}}
					/>

					{count === 0 ? (
						<>
							<span className={"camply-fileupload__icon"}>
								<Upload size={22} />
							</span>
							<span className={"camply-fileupload__primary"}>
								Glisse tes fichiers ou <span className={"camply-fileupload__link"}>parcours</span>
							</span>
							{hint && <span className={"camply-fileupload__hint"}>{hint}</span>}
						</>
					) : uploading ? (
						<>
							<span className={"camply-fileupload__icon"}>
								<Spinner size={22} thickness={2.5} label="Upload en cours" />
							</span>
							<span className={"camply-fileupload__primary"}>{summary}</span>
							<Progress
								value={percent}
								size="sm"
								showValue
								label="Envoi…"
								className={"camply-fileupload__bar"}
							/>
						</>
					) : (
						<>
							<span className={"camply-fileupload__icon camply-fileupload__iconDone"}>
								<CheckCircle size={24} />
							</span>
							<span className={"camply-fileupload__primary"}>{summary}</span>
							<button
								type="button"
								className={"camply-fileupload__clear"}
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									clear();
								}}
							>
								<X size={13} />
								Effacer
							</button>
						</>
					)}
				</label>

				{error && <div className={"camply-fileupload__error"}>{error}</div>}
			</div>
		);
	},
);

FileUpload.displayName = "FileUpload";
