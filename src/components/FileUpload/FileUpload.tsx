import {
	type DragEvent,
	forwardRef,
	type HTMLAttributes,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { Field } from "../../lib/Field";
import { formatFileSize, isFileAccepted } from "../../lib/fileUtils";
import { useLabels } from "../../lib/i18n";
import { AlertCircle, Check, Upload, X } from "../../lib/icons";
import { useControllable } from "../../lib/useControllable";
import { useId } from "../../lib/useId";

export type UploadStatus = "pending" | "uploading" | "done" | "error";

/**
 * Un fichier de la liste. `status` et `progress` décrivent un upload RÉEL :
 * la librairie ne les fait jamais avancer toute seule — c'est le consommateur
 * (ou `onUpload`) qui les pilote.
 */
export interface UploadFile {
	id: string;
	file: File;
	/** Progression réelle en pourcentage (0 → 100). Absente = inconnue. */
	progress?: number;
	status: UploadStatus;
	error?: string;
}

export interface FileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
	/** Liste contrôlée. */
	files?: UploadFile[];
	/** Liste initiale en mode non contrôlé. */
	defaultFiles?: UploadFile[];
	onFilesChange?: (files: UploadFile[]) => void;
	/** Raccourci : notifié avec les `File` bruts à chaque changement de liste. */
	onChange?: (files: File[]) => void;
	/**
	 * Uploader fourni par le consommateur : appelé pour chaque nouveau fichier,
	 * il rapporte sa progression via `onProgress` (0 → 100). Sans lui, aucun
	 * upload n'a lieu : les fichiers restent en "pending" et aucune barre de
	 * progression n'est affichée.
	 */
	onUpload?: (file: File, onProgress: (percent: number) => void) => Promise<void>;
	accept?: string;
	multiple?: boolean;
	/** Taille maximale par fichier, en octets. */
	maxSize?: number;
	disabled?: boolean;
	label?: string;
	hint?: string;
	error?: string;
	required?: boolean;
	/** Nom du champ pour la soumission native du formulaire. */
	name?: string;
	id?: string;
}

const EMPTY: UploadFile[] = [];

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
	(
		{
			files,
			defaultFiles,
			onFilesChange,
			onChange,
			onUpload,
			accept,
			multiple = false,
			maxSize,
			disabled = false,
			label,
			hint,
			error,
			required,
			name,
			id,
			className,
			...rest
		},
		ref,
	) => {
		const labels = useLabels();
		const [items, setItems] = useControllable<UploadFile[]>(
			files,
			defaultFiles ?? EMPTY,
			onFilesChange,
		);
		const [rejected, setRejected] = useState<string[]>([]);
		const [dragging, setDragging] = useState(false);

		const inputRef = useRef<HTMLInputElement>(null);
		const uid = useId("camply-file");
		const seq = useRef(0);

		// Miroirs synchrones : les callbacks de progression tombent hors rendu, et
		// plusieurs mises à jour peuvent s'enchaîner dans le même tick.
		const itemsRef = useRef(items);
		itemsRef.current = items;
		const setItemsRef = useRef(setItems);
		setItemsRef.current = setItems;
		const onChangeRef = useRef(onChange);
		onChangeRef.current = onChange;
		const onUploadRef = useRef(onUpload);
		onUploadRef.current = onUpload;

		const commit = useCallback((next: UploadFile[]) => {
			itemsRef.current = next;
			setItemsRef.current(next);
			onChangeRef.current?.(next.map((it) => it.file));
		}, []);

		/** Met à jour un fichier ; sans effet s'il a été retiré entre-temps. */
		const patch = useCallback(
			(fileId: string, update: (item: UploadFile) => UploadFile) => {
				commit(itemsRef.current.map((it) => (it.id === fileId ? update(it) : it)));
			},
			[commit],
		);

		/**
		 * Recopie la liste dans le `<input type="file">` : le glisser-déposer et les
		 * retraits ne passent pas par lui, sans ça la soumission native du
		 * formulaire (et `required`) enverrait autre chose que ce qui est affiché.
		 */
		const syncInput = useCallback((list: UploadFile[]) => {
			const input = inputRef.current;
			if (!input || typeof DataTransfer === "undefined") return;
			const transfer = new DataTransfer();
			for (const it of list) transfer.items.add(it.file);
			input.files = transfer.files;
		}, []);

		useEffect(() => {
			syncInput(items);
		}, [items, syncInput]);

		const runUpload = useCallback(
			async (item: UploadFile) => {
				const upload = onUploadRef.current;
				if (!upload) return;
				patch(item.id, (it) => ({ ...it, status: "uploading", progress: 0, error: undefined }));
				try {
					await upload(item.file, (percent) => {
						patch(item.id, (it) =>
							it.status === "uploading" ? { ...it, progress: clamp(percent, 0, 100) } : it,
						);
					});
					patch(item.id, (it) => ({ ...it, status: "done", progress: 100, error: undefined }));
				} catch (err) {
					patch(item.id, (it) => ({
						...it,
						status: "error",
						error: err instanceof Error ? err.message : String(err),
					}));
				}
			},
			[patch],
		);

		const receive = (incoming: FileList | null) => {
			if (incoming && incoming.length > 0) {
				const errors: string[] = [];
				const accepted: UploadFile[] = [];

				for (const file of Array.from(incoming)) {
					if (!isFileAccepted(file, accept)) {
						errors.push(`Type non accepté : ${file.name}`);
						continue;
					}
					if (maxSize != null && file.size > maxSize) {
						errors.push(`${file.name} dépasse ${formatFileSize(maxSize)}`);
						continue;
					}
					seq.current += 1;
					accepted.push({ id: `${uid}-${seq.current}`, file, status: "pending" });
				}

				setRejected([...new Set(errors)]);

				const added = multiple ? accepted : accepted.slice(0, 1);
				if (added.length > 0) {
					commit(multiple ? [...itemsRef.current, ...added] : added);
					if (onUploadRef.current) for (const item of added) void runUpload(item);
				}
			}
			// Les fichiers refusés ne doivent pas rester dans l'input (ils partiraient
			// avec le formulaire) : on le remet en phase avec la liste réelle.
			syncInput(itemsRef.current);
		};

		const remove = (fileId: string) => {
			commit(itemsRef.current.filter((it) => it.id !== fileId));
		};

		const clear = () => {
			setRejected([]);
			commit([]);
		};

		const onDrop = (e: DragEvent<HTMLLabelElement>) => {
			e.preventDefault();
			setDragging(false);
			if (!disabled) receive(e.dataTransfer.files);
		};

		const uploading = items.some((it) => it.status === "uploading");

		return (
			<div
				ref={ref}
				className={cn("camply-fileupload__root", className)}
				aria-busy={uploading || undefined}
				{...rest}
			>
				<Field
					label={label}
					hint={hint}
					error={error}
					required={required}
					id={id}
					idPrefix="fileupload"
				>
					{({ id: inputId, labelId, describedBy, invalid, required: isRequired }) => (
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
							onDragLeave={(e) => {
								// dragleave se déclenche aussi en passant sur un enfant : on ignore.
								if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
								setDragging(false);
							}}
							onDrop={onDrop}
						>
							<input
								ref={inputRef}
								id={inputId}
								name={name}
								type="file"
								accept={accept}
								multiple={multiple}
								disabled={disabled}
								required={isRequired}
								// aria-labelledby l'emporte sur le <label> englobant : le nom
								// accessible reste celui du champ quand `label` est fourni.
								aria-labelledby={labelId}
								aria-describedby={describedBy}
								aria-invalid={invalid}
								className={"camply-fileupload__input"}
								onChange={(e) => receive(e.target.files)}
							/>
							<span className={"camply-fileupload__icon"}>
								<Upload size={22} />
							</span>
							<span className={"camply-fileupload__primary"}>
								Glisse tes fichiers ou <span className={"camply-fileupload__link"}>parcours</span>
							</span>
						</label>
					)}
				</Field>

				{items.length > 0 && (
					<ul className={"camply-fileupload__list"}>
						{items.map((it) => {
							const percent = it.progress == null ? null : Math.round(clamp(it.progress, 0, 100));
							return (
								<li key={it.id} className={"camply-fileupload__item"}>
									<span className={"camply-fileupload__body"}>
										<span className={"camply-fileupload__name"} title={it.file.name}>
											{it.file.name}
										</span>
										<span className={"camply-fileupload__meta"}>
											{formatFileSize(it.file.size)}
											{it.status === "uploading" &&
												` · ${labels.uploading}${percent == null ? "" : ` ${percent} %`}`}
										</span>
										{it.status === "uploading" && (
											<span
												className={"camply-fileupload__bar"}
												role="progressbar"
												aria-label={labels.uploading}
												aria-valuemin={0}
												aria-valuemax={100}
												aria-valuenow={percent ?? undefined}
											>
												<span
													className={cn(
														"camply-fileupload__barFill",
														percent == null && "camply-fileupload__barPending",
													)}
													style={percent == null ? undefined : { width: `${percent}%` }}
												/>
											</span>
										)}
										{it.status === "error" && it.error && (
											<span role="alert" className={"camply-fileupload__itemError"}>
												{it.error}
											</span>
										)}
									</span>

									{it.status === "done" && (
										<span className={"camply-fileupload__done"}>
											<Check size={14} />
										</span>
									)}
									{it.status === "error" && (
										<span className={"camply-fileupload__failed"}>
											<AlertCircle size={14} />
										</span>
									)}

									<button
										type="button"
										className={"camply-fileupload__remove"}
										aria-label={`${labels.remove} ${it.file.name}`}
										disabled={disabled}
										onClick={() => remove(it.id)}
									>
										<X size={13} />
									</button>
								</li>
							);
						})}
					</ul>
				)}

				<div className={"camply-fileupload__error"} role="alert">
					{rejected.map((message) => (
						<span key={message}>{message}</span>
					))}
				</div>

				{items.length > 0 && (
					<button
						type="button"
						className={"camply-fileupload__clear"}
						disabled={disabled}
						onClick={clear}
					>
						<X size={13} />
						{labels.clear}
					</button>
				)}
			</div>
		);
	},
);

FileUpload.displayName = "FileUpload";
