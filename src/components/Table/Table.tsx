import {
	type ComponentPropsWithoutRef,
	type ForwardedRef,
	forwardRef,
	type KeyboardEvent,
	type MouseEvent,
	type ReactElement,
	type ReactNode,
	type Ref,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { cn } from "../../lib/cn";
import { useLabels } from "../../lib/i18n";
import { ChevronDown, ChevronUp } from "../../lib/icons";
import { nextSortState, type SortState, sortRows } from "../../lib/tableSort";
import { useControllable } from "../../lib/useControllable";
import { Checkbox } from "../Checkbox";
import { Skeleton } from "../Skeleton";

export type { SortDir, SortState } from "../../lib/tableSort";

/** Clé de ligne renvoyée par `rowKey` — c'est aussi l'unité de sélection. */
export type RowKey = string | number;

/**
 * Clés de `Row` dont la valeur est directement affichable par React — donc les
 * seules qu'une colonne peut lire sans `cell`. Une `Date`, un objet ou un tableau
 * d'objets en sont exclus : ils exigent un `cell`, au lieu de finir rendus en
 * `[object Object]` à l'exécution. Les clés numériques le sont aussi (`& string`).
 * La garantie vaut ce que vaut le typage de `Row` : un `Row` en `any` laisse tout
 * passer, un `Row` en `Record<string, unknown>` ne laisse rien passer (`never`, donc
 * `cell` partout).
 */
export type RenderableKey<Row> = {
	[K in keyof Row]-?: Row[K] extends ReactNode ? K : never;
}[keyof Row] &
	string;

interface ColumnBase<Row> {
	header: ReactNode;
	/** Rend la colonne triable ; la valeur renvoyée sert de critère de comparaison. */
	sortValue?: (row: Row) => string | number;
	align?: "left" | "right" | "center";
	width?: number | string;
}

/**
 * Colonne adossée à un champ : `key` désigne une propriété rendable de `Row`, dont
 * la valeur est affichée telle quelle. `cell` reste possible pour l'habiller — il
 * prime alors sur la lecture du champ.
 */
export interface FieldColumn<Row> extends ColumnBase<Row> {
	key: RenderableKey<Row>;
	cell?: (row: Row) => ReactNode;
}

/**
 * Colonne calculée (actions, agrégat, colonne virtuelle) : `key` est un identifiant
 * de colonne libre qui ne pointe vers aucun champ, donc `cell` dit quoi afficher.
 */
export interface ComputedColumn<Row> extends ColumnBase<Row> {
	key: string;
	cell: (row: Row) => ReactNode;
}

/**
 * Union discriminée par la présence de `cell` : une clé qui n'est pas un champ
 * rendable de `Row` bascule la colonne du côté « calculée », où `cell` est exigé.
 * Une clé mal orthographiée donne une erreur de compilation, pas une cellule vide.
 */
export type Column<Row> = FieldColumn<Row> | ComputedColumn<Row>;

export interface TableProps<Row> extends ComponentPropsWithoutRef<"div"> {
	columns: Column<Row>[];
	data: Row[];
	rowKey: (row: Row, index: number) => RowKey;
	onRowClick?: (row: Row) => void;
	striped?: boolean;
	emptyState?: ReactNode;
	/** Tri contrôlé (`null` = aucun tri). */
	sort?: SortState | null;
	/** Tri initial en mode non contrôlé. */
	defaultSort?: SortState | null;
	onSortChange?: (sort: SortState | null) => void;
	/** Affiche une case à cocher par ligne + une case « tout » dans l'en-tête. */
	selectable?: boolean;
	selectedKeys?: RowKey[];
	defaultSelectedKeys?: RowKey[];
	onSelectionChange?: (keys: RowKey[]) => void;
	/** Remplace les lignes par des squelettes et marque le tableau `aria-busy`. */
	loading?: boolean;
	/** Nombre de lignes squelettes affichées pendant le chargement (défaut 4). */
	loadingRows?: number;
	/** En-tête collant — à combiner avec une hauteur max sur le conteneur. */
	stickyHeader?: boolean;
	/** Nom accessible de la case « tout sélectionner » ; sinon `CamplyLabels.selectAll`. */
	selectAllLabel?: string;
	/** Nom accessible de la case d'une ligne ; sinon `CamplyLabels.selectRow`. */
	rowSelectionLabel?: (row: Row, index: number) => string;
}

/**
 * TypeScript ne réduit pas une union sur la présence d'une prop optionnelle. Le
 * prédicat teste « a un `cell` », seul sens vrai par construction : une
 * `FieldColumn` habillée d'un `cell` satisfait aussi `ComputedColumn`.
 */
function hasCell<Row>(col: Column<Row>): col is ComputedColumn<Row> {
	return !!col.cell;
}

/** Contenu d'une cellule : `cell` s'il est fourni, sinon le champ désigné par `key`. */
function cellContent<Row>(col: Column<Row>, row: Row): ReactNode {
	if (hasCell(col)) return col.cell(row);
	// `key` est ici une clé de `Row` — l'indexation est vérifiée par le compilateur.
	// Seule la « rendabilité » de la valeur lui échappe : il ne résout pas le
	// conditionnel de `RenderableKey` tant que `Row` reste un générique ouvert. D'où
	// cette unique assertion, vraie par construction du type côté consommateur.
	return (row[col.key] as ReactNode) ?? null;
}

/** Un clic né d'un contrôle interne (case à cocher, lien, bouton) ne déclenche pas `onRowClick`. */
function fromControl(target: EventTarget | null): boolean {
	return (
		target instanceof HTMLElement && !!target.closest("input, button, a, select, textarea, label")
	);
}

const TableRoot = forwardRef(function Table<Row>(
	{
		columns,
		data,
		rowKey,
		onRowClick,
		striped,
		className,
		emptyState,
		sort: sortProp,
		defaultSort = null,
		onSortChange,
		selectable = false,
		selectedKeys,
		defaultSelectedKeys,
		onSelectionChange,
		loading = false,
		loadingRows = 4,
		stickyHeader = false,
		selectAllLabel,
		rowSelectionLabel,
		...rest
	}: TableProps<Row>,
	ref: ForwardedRef<HTMLDivElement>,
) {
	const labels = useLabels();
	const [sort, setSort] = useControllable<SortState | null>(sortProp, defaultSort, onSortChange);
	const [selection, setSelection] = useControllable<RowKey[]>(
		selectedKeys,
		defaultSelectedKeys ?? [],
		onSelectionChange,
	);
	const selectAllRef = useRef<HTMLInputElement>(null);

	const sorted = useMemo(() => {
		if (!sort) return data;
		const sortValue = columns.find((c) => c.key === sort.key)?.sortValue;
		return sortValue ? sortRows(data, sortValue, sort.dir) : data;
	}, [data, sort, columns]);

	const selected = useMemo(() => new Set(selection), [selection]);
	const keys = useMemo(() => sorted.map((row, i) => rowKey(row, i)), [sorted, rowKey]);
	const allSelected = keys.length > 0 && keys.every((key) => selected.has(key));
	const someSelected = !allSelected && keys.some((key) => selected.has(key));

	// La case « tout » est partielle dès qu'une partie seulement des lignes est cochée.
	useEffect(() => {
		if (selectAllRef.current) selectAllRef.current.indeterminate = someSelected;
	}, [someSelected]);

	const toggleSort = (col: Column<Row>) => {
		if (!col.sortValue) return;
		setSort(nextSortState(sort, col.key));
	};

	const toggleAll = () => setSelection(allSelected ? [] : keys);

	const toggleRow = (key: RowKey) =>
		setSelection(selected.has(key) ? selection.filter((k) => k !== key) : [...selection, key]);

	const clickRow = (row: Row) => (e: MouseEvent<HTMLTableRowElement>) => {
		if (fromControl(e.target)) return;
		onRowClick?.(row);
	};

	// Ligne cliquable = ligne activable au clavier (Entrée / Espace), focus sur la ligne elle-même.
	const keyDownRow = (row: Row) => (e: KeyboardEvent<HTMLTableRowElement>) => {
		if (e.target !== e.currentTarget) return;
		if (e.key !== "Enter" && e.key !== " ") return;
		e.preventDefault();
		onRowClick?.(row);
	};

	const colCount = columns.length + (selectable ? 1 : 0);

	return (
		<div
			ref={ref}
			className={cn("camply-table__wrap", stickyHeader && "camply-table__stickyWrap", className)}
			aria-busy={loading || undefined}
			{...rest}
		>
			<table className="camply-table__table">
				<thead className={cn(stickyHeader && "camply-table__stickyHead")}>
					<tr>
						{selectable && (
							<th className="camply-table__th camply-table__selectCell" scope="col">
								<Checkbox
									ref={selectAllRef}
									checked={allSelected}
									onChange={toggleAll}
									aria-label={selectAllLabel ?? labels.selectAll}
								/>
							</th>
						)}
						{columns.map((col) => {
							const dir = sort?.key === col.key ? sort.dir : undefined;
							const inner = (
								<>
									{col.header}
									{col.sortValue && (
										<span className="camply-table__sortIcon">
											{dir === "asc" ? (
												<ChevronUp size={13} />
											) : (
												<ChevronDown
													size={13}
													className={dir ? undefined : "camply-table__sortIdle"}
												/>
											)}
										</span>
									)}
								</>
							);
							return (
								<th
									key={col.key}
									className={cn(
										"camply-table__th",
										col.sortValue && "camply-table__sortable",
										col.align && `camply-table__align-${col.align}`,
									)}
									style={{ width: col.width }}
									aria-sort={dir ? (dir === "asc" ? "ascending" : "descending") : undefined}
								>
									{col.sortValue ? (
										<button
											type="button"
											className="camply-table__thInner camply-focus-ring"
											onClick={() => toggleSort(col)}
										>
											{inner}
										</button>
									) : (
										<span className="camply-table__thInner">{inner}</span>
									)}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{loading ? (
						Array.from({ length: loadingRows }).map((_, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: lignes de chargement à position fixe — l'index EST l'identité
							<tr key={i}>
								{Array.from({ length: colCount }).map((__, j) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: cellules de chargement à position fixe — l'index EST l'identité
									<td key={j} className="camply-table__td">
										<Skeleton />
									</td>
								))}
							</tr>
						))
					) : sorted.length === 0 && emptyState ? (
						<tr>
							<td colSpan={colCount} className="camply-table__empty">
								{emptyState}
							</td>
						</tr>
					) : (
						sorted.map((row, i) => {
							const key = keys[i];
							const isSelected = selected.has(key);
							return (
								// Ligne activable : on garde le rôle implicite "row" (sémantique du tableau)
								// plutôt que de la travestir en bouton — Entrée/Espace font le reste.
								<tr
									key={key}
									className={cn(
										striped && i % 2 === 1 && "camply-table__striped",
										onRowClick && "camply-table__clickable",
										isSelected && "camply-table__selectedRow",
									)}
									aria-selected={selectable ? isSelected : undefined}
									tabIndex={onRowClick ? 0 : undefined}
									onClick={onRowClick && clickRow(row)}
									onKeyDown={onRowClick && keyDownRow(row)}
								>
									{selectable && (
										<td className="camply-table__td camply-table__selectCell">
											<Checkbox
												checked={isSelected}
												onChange={() => toggleRow(key)}
												aria-label={
													rowSelectionLabel ? rowSelectionLabel(row, i) : labels.selectRow(i)
												}
											/>
										</td>
									)}
									{columns.map((col) => (
										<td
											key={col.key}
											className={cn(
												"camply-table__td",
												col.align && `camply-table__align-${col.align}`,
											)}
										>
											{cellContent(col, row)}
										</td>
									))}
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
});

// forwardRef efface le générique <Row> : on restaure la signature générique par un cast.
export const Table = TableRoot as <Row>(
	props: TableProps<Row> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;
