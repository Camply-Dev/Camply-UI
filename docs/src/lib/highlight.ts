/** Les langages que la vitrine affiche. */
export type Lang = "ts" | "tsx" | "css";

export interface Token {
	type: string;
	value: string;
	start: number;
}

type Rule = [type: string, re: RegExp];

const JS: Rule[] = [
	["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
	["string", /`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/y],
	[
		"keyword",
		/\b(?:import|export|from|as|default|const|let|var|function|return|if|else|for|while|switch|case|break|continue|new|delete|typeof|instanceof|in|of|await|async|yield|class|extends|implements|interface|type|enum|namespace|declare|public|private|protected|readonly|abstract|static|get|set|this|super|void|keyof|infer|satisfies)\b/y,
	],
	["boolean", /\b(?:true|false|null|undefined)\b/y],
	["number", /\b0x[\da-fA-F]+\b|\b\d[\d_]*(?:\.\d+)?(?:e[+-]?\d+)?\b/y],
	["type", /\b[A-Z][A-Za-z0-9_$]*\b/y],
	["function", /\b[a-zA-Z_$][\w$]*(?=\s*\()/y],
	["punct", /[{}()[\]<>.,;:?=+\-*/%!&|]/y],
];

const CSS: Rule[] = [
	["comment", /\/\*[\s\S]*?\*\//y],
	["string", /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/y],
	["atrule", /@[\w-]+/y],
	["variable", /--[\w-]+/y],
	["number", /#[\da-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms|deg|fr|ch)?\b/y],
	["property", /[a-zA-Z-]+(?=\s*:)/y],
	["selector", /[.#:]?[a-zA-Z][\w-]*/y],
	["punct", /[{}():;,>]/y],
];

const RULES: Record<Lang, Rule[]> = { ts: JS, tsx: JS, css: CSS };

export function highlight(code: string, lang: Lang): Token[] {
	const rules = RULES[lang];
	const tokens: Token[] = [];
	let i = 0;
	while (i < code.length) {
		let matched = false;
		for (const [type, re] of rules) {
			re.lastIndex = i;
			const m = re.exec(code);
			if (m) {
				tokens.push({ type, value: m[0], start: i });
				i += m[0].length || 1;
				matched = true;
				break;
			}
		}
		if (!matched) {
			const last = tokens[tokens.length - 1];
			if (last && last.type === "plain") last.value += code[i];
			else tokens.push({ type: "plain", value: code[i], start: i });
			i += 1;
		}
	}
	return tokens;
}
