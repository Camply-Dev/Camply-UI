import { type CSSProperties, type DragEvent, forwardRef, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { File as FileIcon, Upload, X } from "../../lib/icons";

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

function formatSize(bytes: number): string {
	if (bytes < 1024) return `${bytes} o`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

interface FileItem {
	id: number;
	file: File;
}

/** Drag-and-drop upload zone with a live file list. Emits real File objects
 *  through onChange — wire them to your own upload logic. The zone is a
 *  native label wrapping the file input: click and keyboard come for free. */
export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
	(
		{ onChange, accept, multiple = false, maxSize, disabled = false, hint, className, style },
		ref,
	) => {
		const [items, setItems] = useState<FileItem[]>([]);
		const [dragging, setDragging] = useState(false);
		const [error, setError] = useState<string | null>(null);
		const nextId = useRef(0);

		const isAccepted = (f: File) => {
			if (!accept) return true;
			const rules = accept.split(",").map((s) => s.trim());
			return rules.some((r) =>
				r.startsWith(".")
					? f.name.toLowerCase().endsWith(r.toLowerCase())
					: new RegExp(`^${r.replace("*", ".*")}$`).test(f.type),
			);
		};

		const addFiles = (incoming: FileList | null) => {
			if (!incoming) return;
			setError(null);
			const list: FileItem[] = [];
			for (const f of Array.from(incoming)) {
				if (!isAccepted(f)) {
					setError(`Type non accepté : ${f.name}`);
					continue;
				}
				if (maxSize && f.size > maxSize) {
					setError(`${f.name} dépasse ${formatSize(maxSize)}`);
					continue;
				}
				nextId.current += 1;
				list.push({ id: nextId.current, file: f });
			}
			const next = multiple ? [...items, ...list] : list.slice(0, 1);
			setItems(next);
			onChange?.(next.map((it) => it.file));
		};

		const remove = (id: number) => {
			const next = items.filter((it) => it.id !== id);
			setItems(next);
			onChange?.(next.map((it) => it.file));
		};

		const onDrop = (e: DragEvent) => {
			e.preventDefault();
			setDragging(false);
			if (!disabled) addFiles(e.dataTransfer.files);
		};

		return (
			<div ref={ref} className={cn("camply-fileupload__root", className)} style={style}>
				<label
					className={cn(
						"camply-fileupload__zone",
						dragging && "camply-fileupload__dragging",
						disabled && "camply-fileupload__disabled",
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
					<span className={"camply-fileupload__icon"}>
						<Upload size={22} />
					</span>
					<span className={"camply-fileupload__primary"}>
						Glisse tes fichiers ou <span className={"camply-fileupload__link"}>parcours</span>
					</span>
					{hint && <span className={"camply-fileupload__hint"}>{hint}</span>}
				</label>

				{error && <div className={"camply-fileupload__error"}>{error}</div>}

				{items.length > 0 && (
					<ul className={"camply-fileupload__files"}>
						{items.map(({ id, file }) => (
							<li key={id} className={"camply-fileupload__file"}>
								<span className={"camply-fileupload__fileIcon"}>
									<FileIcon size={17} />
								</span>
								<span className={"camply-fileupload__fileMeta"}>
									<span className={"camply-fileupload__fileName"}>{file.name}</span>
									<span className={"camply-fileupload__fileSize"}>{formatSize(file.size)}</span>
								</span>
								<button
									type="button"
									className={"camply-fileupload__fileRemove"}
									aria-label={`Retirer ${file.name}`}
									onClick={() => remove(id)}
								>
									<X size={14} />
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		);
	},
);

FileUpload.displayName = "FileUpload";
