// Coloration syntaxique minimaliste et sans dépendance pour la vitrine.
// Tokenizer par règles ordonnées (regex « sticky ») : on essaie chaque règle à
// la position courante ; rien ne matche → un caractère « plain ». Suffisant pour
// des extraits de doc (ts/tsx/js, bash, css, html, json) — pas un vrai parseur.

export type Lang = "ts" | "tsx" | "js" | "jsx" | "bash" | "sh" | "html" | "css" | "json" | "text";

export interface Token {
	type: string;
	value: string;
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

const BASH: Rule[] = [
	["comment", /#[^\n]*/y],
	["string", /"(?:\\.|[^"\\])*"|'[^']*'/y],
	[
		"builtin",
		/\b(?:bun|bunx|npm|npx|pnpm|yarn|node|git|cd|ls|echo|export|curl|mkdir|rm|cp|mv|cat|sudo)\b/y,
	],
	["flag", /--?[a-zA-Z][\w-]*/y],
	["number", /\b\d+\b/y],
	["punct", /[|&;()<>]/y],
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

const HTML: Rule[] = [
	["comment", /<!--[\s\S]*?-->/y],
	["tag", /<\/?[a-zA-Z][\w-]*|\/?>/y],
	["string", /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/y],
	["attr", /[a-zA-Z-]+(?=\s*=)/y],
	["punct", /[=]/y],
];

const JSON_: Rule[] = [
	["property", /"(?:\\.|[^"\\])*"(?=\s*:)/y],
	["string", /"(?:\\.|[^"\\])*"/y],
	["number", /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/y],
	["boolean", /\b(?:true|false|null)\b/y],
	["punct", /[{}[\]:,]/y],
];

const RULES: Record<string, Rule[]> = {
	ts: JS,
	tsx: JS,
	js: JS,
	jsx: JS,
	bash: BASH,
	sh: BASH,
	css: CSS,
	html: HTML,
	json: JSON_,
};

export function highlight(code: string, lang: Lang): Token[] {
	const rules = RULES[lang];
	if (!rules) return [{ type: "plain", value: code }];

	const tokens: Token[] = [];
	let i = 0;
	while (i < code.length) {
		let matched = false;
		for (const [type, re] of rules) {
			re.lastIndex = i;
			const m = re.exec(code);
			if (m) {
				tokens.push({ type, value: m[0] });
				i += m[0].length || 1;
				matched = true;
				break;
			}
		}
		if (!matched) {
			// aucun token reconnu : on empile le caractère dans le « plain » courant.
			const last = tokens[tokens.length - 1];
			if (last && last.type === "plain") last.value += code[i];
			else tokens.push({ type: "plain", value: code[i] });
			i += 1;
		}
	}
	return tokens;
}
