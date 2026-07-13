interface CommandLike {
	label: string;
	keywords?: string;
	group?: string;
}

export function filterCommands<T extends CommandLike>(commands: T[], query: string): T[] {
	const q = query.trim().toLowerCase();
	if (!q) return commands;
	return commands.filter((c) =>
		`${c.label} ${c.keywords ?? ""} ${c.group ?? ""}`.toLowerCase().includes(q),
	);
}

export interface GroupedCommands<T> {
	byGroup: Map<string, T[]>;
	flat: T[];
	index: Map<T, number>;
}

export function groupCommands<T extends CommandLike>(commands: T[]): GroupedCommands<T> {
	const byGroup = new Map<string, T[]>();
	for (const cmd of commands) {
		const key = cmd.group ?? "";
		const list = byGroup.get(key);
		if (list) list.push(cmd);
		else byGroup.set(key, [cmd]);
	}
	const flat: T[] = [];
	const index = new Map<T, number>();
	for (const list of byGroup.values()) {
		for (const cmd of list) {
			index.set(cmd, flat.length);
			flat.push(cmd);
		}
	}
	return { byGroup, flat, index };
}
