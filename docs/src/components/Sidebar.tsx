import { Input } from "@camply/ui";
import { useState } from "react";
import { Icon } from "../icons";
import {
	COMPONENTS,
	CSS,
	FAMILIES,
	type Family,
	HOME,
	ROADMAP,
	type Subfamily,
	TOTAL,
} from "../showcase-data";

interface SidebarProps {
	active: string;
	onNavigate: (id: string) => void;
	onOpenPalette?: () => void;
}

const subKey = (family: Family, sub: Subfamily) => `${family.title}|${sub.title}`;

export function Sidebar({ active, onNavigate, onOpenPalette }: SidebarProps) {
	const [query, setQuery] = useState("");
	const [openFam, setOpenFam] = useState<Record<string, boolean>>({});
	const [openSub, setOpenSub] = useState<Record<string, boolean>>({});

	const q = query.trim().toLowerCase();
	const searching = q.length > 0;
	const activeIsComponent = active !== HOME && active !== CSS && active !== ROADMAP;
	const firstFamily = FAMILIES[0].title;

	const matches = (label: string) => label.toLowerCase().includes(q);
	const famHasMatch = (family: Family) =>
		family.subfamilies.some((s) => s.items.some((i) => matches(i.label)));
	const subHasMatch = (sub: Subfamily) => sub.items.some((i) => matches(i.label));

	const famOpen = (family: Family) => {
		if (searching) return famHasMatch(family);
		if (family.title in openFam) return openFam[family.title];
		if (activeIsComponent)
			return family.subfamilies.some((s) => s.items.some((i) => i.id === active));
		return family.title === firstFamily;
	};

	const subOpen = (family: Family, sub: Subfamily) => {
		if (searching) return subHasMatch(sub);
		const key = subKey(family, sub);
		if (key in openSub) return openSub[key];
		if (activeIsComponent) return sub.items.some((i) => i.id === active);
		return family.title === firstFamily && family.subfamilies[0].title === sub.title;
	};

	const toggleFam = (family: Family) => {
		const next = !famOpen(family);
		setOpenFam((prev) => ({ ...prev, [family.title]: next }));
	};

	const toggleSub = (family: Family, sub: Subfamily) => {
		const next = !subOpen(family, sub);
		setOpenSub((prev) => ({ ...prev, [subKey(family, sub)]: next }));
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
					const open = famOpen(family);
					const count = searching
						? family.subfamilies.reduce(
								(n, s) => n + s.items.filter((i) => matches(i.label)).length,
								0,
							)
						: family.count;
					return (
						<div key={family.title}>
							<button type="button" className="cu-fam-row" onClick={() => toggleFam(family)}>
								<Icon
									name="chevron"
									size={13}
									className={open ? "cu-chev cu-chev--open" : "cu-chev"}
								/>
								<span className="cu-fam-row__label">{family.title}</span>
								<span className="cu-count">{count}</span>
							</button>
							{open && (
								<div className="cu-sublist">
									{family.subfamilies.map((sub) => {
										if (searching && !subHasMatch(sub)) return null;
										const sopen = subOpen(family, sub);
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
														className={sopen ? "cu-chev cu-chev--open" : "cu-chev"}
													/>
													<span className="cu-sub-row__label">{sub.title}</span>
													<span className="cu-count">{items.length}</span>
												</button>
												{sopen && (
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
