export const isSameDay = (a: Date, b: Date) =>
	a.getFullYear() === b.getFullYear() &&
	a.getMonth() === b.getMonth() &&
	a.getDate() === b.getDate();

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const pad2 = (n: number) => String(n).padStart(2, "0");

export const formatInput = (d: Date) =>
	`${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;

export function maskDate(raw: string): string {
	const segs = raw.split("/");
	const maxes = [2, 2, 4];
	const out = ["", "", ""];
	let carry = "";
	for (let i = 0; i < 3; i++) {
		let seg = carry + (segs[i] ?? "").replace(/\D/g, "");
		carry = "";
		const isLast = i >= segs.length - 1;
		if (seg.length > maxes[i]) {
			if (isLast) carry = seg.slice(maxes[i]);
			seg = seg.slice(0, maxes[i]);
		}
		out[i] = seg;
	}
	let end = 3;
	while (end > 0 && out[end - 1] === "") end--;
	return out.slice(0, end).join("/");
}

export function parseDate(text: string): Date | null {
	const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text.trim());
	if (!m) return null;
	const day = +m[1];
	const month = +m[2];
	const year = +m[3];
	const d = new Date(year, month - 1, day);
	if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null;
	return d;
}

export const YEAR_PAGE = 12;
export const yearPageStart = (year: number) => Math.floor(year / YEAR_PAGE) * YEAR_PAGE;

export function weekdayNames(locale: string, weekStartsOn: number): string[] {
	const base = new Date(2023, 0, 1); // a Sunday
	const names: string[] = [];
	for (let i = 0; i < 7; i++) {
		const d = new Date(base);
		d.setDate(base.getDate() + ((i + weekStartsOn) % 7));
		names.push(new Intl.DateTimeFormat(locale, { weekday: "short" }).format(d).replace(".", ""));
	}
	return names;
}

export function buildMonthGrid(view: Date, weekStartsOn: number): Date[] {
	const year = view.getFullYear();
	const month = view.getMonth();
	const first = new Date(year, month, 1);
	const offset = (first.getDay() - weekStartsOn + 7) % 7;
	const start = new Date(year, month, 1 - offset);
	return Array.from({ length: 42 }, (_, i) => {
		const d = new Date(start);
		d.setDate(start.getDate() + i);
		return d;
	});
}
