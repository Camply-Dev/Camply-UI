import { Input } from "@camply/ui";
import { useEffect, useState } from "react";
import { Icon } from "../icons";
import {
	BY_ID,
	COMPONENTS,
	CSS,
	FAMILIES,
	type Family,
	GUIDE,
	HOME,
	ICONS,
	ROADMAP,
	type Subfamily,
	TOTAL,
} from "../showcase-data";

interface SidebarProps {
	active: string;
	onNavigate: (id: string) => void;
	onOpenPalette?: () => void;
}

const subKey = (family: string, sub: string) => `${family}|${sub}`;

export function Sidebar({ active, onNavigate, onOpenPalette }: SidebarProps) {
	const [query, setQuery] = useState("");

	const q = query.trim().toLowerCase();
	const searching = q.length > 0;
	const activeIsComponent =
		active !== HOME && active !== GUIDE && active !== ICONS && active !== CSS && active !== ROADMAP;

	const matches = (label: string) => label.toLowerCase().includes(q);
	const famHasMatch = (family: Family) =>
		family.subfamilies.some((s) => s.items.some((i) => matches(i.label)));
	const subHasMatch = (sub: Subfamily) => sub.items.some((i) => matches(i.label));

	const [open, setOpen] = useState<{ fam: string; sub: string }>(() => {
		const entry = activeIsComponent ? BY_ID[active] : undefined;
		if (entry) return { fam: entry.family, sub: subKey(entry.family, entry.subfamily) };
		const first = FAMILIES[0];
		return { fam: first.title, sub: subKey(first.title, first.subfamilies[0].title) };
	});

	useEffect(() => {
		if (!activeIsComponent) return;
		const entry = BY_ID[active];
		if (entry) setOpen({ fam: entry.family, sub: subKey(entry.family, entry.subfamily) });
	}, [active, activeIsComponent]);

	const famOpen = (family: Family) => (searching ? famHasMatch(family) : open.fam === family.title);
	const subOpen = (family: Family, sub: Subfamily) =>
		searching ? subHasMatch(sub) : open.sub === subKey(family.title, sub.title);

	const toggleFam = (family: Family) => {
		setOpen((cur) =>
			cur.fam === family.title
				? { fam: "", sub: "" }
				: { fam: family.title, sub: subKey(family.title, family.subfamilies[0].title) },
		);
	};

	const toggleSub = (family: Family, sub: Subfamily) => {
		const key = subKey(family.title, sub.title);
		setOpen((cur) => ({ fam: family.title, sub: cur.sub === key ? "" : key }));
	};

	const noResults = searching && !COMPONENTS.some((i) => matches(i.label));

	return (
		<aside className="cu-side">
			<div className="cu-brand">
				<img className="cu-logo" src="/logo.svg" alt="Camply UI" width={38} height={38} />
				<div>
					<div className="cu-brand__name">Camply UI</div>
					<div className="cu-brand__meta">{TOTAL} composants · React</div>
				</div>
			</div>

			<div className="cu-search">
				<Input
					size="sm"
					type="search"
					leftIcon={<Icon name="search" size={15} />}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => {
						if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
							e.preventDefault();
							onOpenPalette?.();
						}
					}}
					placeholder="Rechercher un composant…"
					aria-label="Rechercher un composant"
				/>
			</div>

			<div className="cu-links">
				<button
					type="button"
					className={active === HOME ? "cu-link cu-link--active" : "cu-link"}
					onClick={() => onNavigate(HOME)}
				>
					<Icon name="home" size={15} />
					Accueil
				</button>
				<button
					type="button"
					className={active === GUIDE ? "cu-link cu-link--active" : "cu-link"}
					onClick={() => onNavigate(GUIDE)}
				>
					<Icon name="book" size={15} />
					Guide d'utilisation
				</button>
				<button
					type="button"
					className={active === ICONS ? "cu-link cu-link--active" : "cu-link"}
					onClick={() => onNavigate(ICONS)}
				>
					<Icon name="shapes" size={15} />
					Icônes
				</button>
				<button
					type="button"
					className={active === CSS ? "cu-link cu-link--active" : "cu-link"}
					onClick={() => onNavigate(CSS)}
				>
					<Icon name="tokens" size={15} />
					CSS par défaut
				</button>
			</div>

			<div className="cu-nav__label">Composants</div>
			<nav className="cu-tree">
				{FAMILIES.map((family) => {
					if (searching && !famHasMatch(family)) return null;
					const isOpen = famOpen(family);
					const count = searching
						? family.subfamilies.flatMap((s) => s.items).filter((i) => matches(i.label)).length
						: family.count;
					return (
						<div key={family.title}>
							<button type="button" className="cu-fam-row" onClick={() => toggleFam(family)}>
								<Icon
									name="chevron"
									size={13}
									className={isOpen ? "cu-chev cu-chev--open" : "cu-chev"}
								/>
								<span className="cu-fam-row__label">{family.title}</span>
								<span className="cu-count">{count}</span>
							</button>
							{isOpen && (
								<div className="cu-sublist">
									{family.subfamilies.map((sub) => {
										if (searching && !subHasMatch(sub)) return null;
										const isSubOpen = subOpen(family, sub);
										const items = searching ? sub.items.filter((i) => matches(i.label)) : sub.items;
										return (
											<div key={sub.title}>
												<button
													type="button"
													className="cu-sub-row"
													onClick={() => toggleSub(family, sub)}
												>
													<Icon
														name="chevron"
														size={12}
														className={isSubOpen ? "cu-chev cu-chev--open" : "cu-chev"}
													/>
													<span className="cu-sub-row__label">{sub.title}</span>
													<span className="cu-count">{items.length}</span>
												</button>
												{isSubOpen && (
													<div className="cu-itemlist">
														{items.map((item) => (
															<button
																key={item.id}
																type="button"
																className={
																	item.id === active ? "cu-item cu-item--active" : "cu-item"
																}
																onClick={() => onNavigate(item.id)}
															>
																{item.label}
															</button>
														))}
													</div>
												)}
											</div>
										);
									})}
								</div>
							)}
						</div>
					);
				})}
				{noResults && <div className="cu-noresult">Aucun résultat pour « {query.trim()} ».</div>}
			</nav>

			<button type="button" className="cu-side__foot" onClick={() => onNavigate(ROADMAP)}>
				<Icon name="arrow" size={15} />
				Voir la roadmap
			</button>
		</aside>
	);
}
