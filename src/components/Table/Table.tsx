import { type CSSProperties, type ReactNode, useMemo, useState } from "react";
import { cn } from "../../lib/cn";
import { ChevronDown, ChevronUp } from "../../lib/icons";
export interface Column<Row> {
	key: string;
	header: ReactNode;
	/** cell renderer; defaults to Row[key] */
	cell?: (row: Row) => ReactNode;
	/** value used for sorting; enables sorting on this column */
	sortValue?: (row: Row) => string | number;
	align?: "left" | "right" | "center";
	width?: number | string;
}

export interface TableProps<Row> {
	columns: Column<Row>[];
	data: Row[];
	rowKey: (row: Row, index: number) => string | number;
	onRowClick?: (row: Row) => void;
	/** zebra striping */
	striped?: boolean;
	className?: string;
	style?: CSSProperties;
	emptyState?: ReactNode;
}

export function Table<Row>({
	columns,
	data,
	rowKey,
	onRowClick,
	striped,
	className,
	style,
	emptyState,
}: TableProps<Row>) {
	const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);

	const sorted = useMemo(() => {
		if (!sort) return data;
		const sortValue = columns.find((c) => c.key === sort.key)?.sortValue;
		if (!sortValue) return data;
		const factor = sort.dir === "asc" ? 1 : -1;
		return [...data].sort((a, b) => {
			const va = sortValue(a);
			const vb = sortValue(b);
			if (va < vb) return -1 * factor;
			if (va > vb) return 1 * factor;
			return 0;
		});
	}, [data, sort, columns]);

	const toggleSort = (col: Column<Row>) => {
		if (!col.sortValue) return;
		setSort((prev) => {
			if (prev?.key !== col.key) return { key: col.key, dir: "asc" };
			if (prev.dir === "asc") return { key: col.key, dir: "desc" };
			return null;
		});
	};

	return (
		<div className={cn("camply-table__wrap", className)} style={style}>
			<table className={"camply-table__table"}>
				<thead>
					<tr>
						{columns.map((col) => {
							const dir = sort?.key === col.key ? sort.dir : undefined;
							const inner = (
								<>
									{col.header}
									{col.sortValue && (
										<span className={"camply-table__sortIcon"}>
											{dir ? (
												dir === "asc" ? (
													<ChevronUp size={13} />
												) : (
													<ChevronDown size={13} />
												)
											) : (
												<ChevronDown size={13} className={"camply-table__sortIdle"} />
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
											className={"camply-table__thInner"}
											onClick={() => toggleSort(col)}
										>
											{inner}
										</button>
									) : (
										<span className={"camply-table__thInner"}>{inner}</span>
									)}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{sorted.length === 0 && emptyState ? (
						<tr>
							<td colSpan={columns.length} className={"camply-table__empty"}>
								{emptyState}
							</td>
						</tr>
					) : (
						sorted.map((row, i) => (
							<tr
								key={rowKey(row, i)}
								className={cn(
									striped && i % 2 === 1 && "camply-table__striped",
									onRowClick && "camply-table__clickable",
								)}
								onClick={() => onRowClick?.(row)}
							>
								{columns.map((col) => (
									<td
										key={col.key}
										className={cn(
											"camply-table__td",
											col.align && `camply-table__align-${col.align}`,
										)}
									>
										{col.cell
											? col.cell(row)
											: ((row as Record<string, ReactNode>)[col.key] ?? null)}
									</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
