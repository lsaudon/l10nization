class StringEscapeSequence {
	private readonly unescapedStringRegex: RegExp;

	constructor(readonly start: string) {
		this.unescapedStringRegex = new RegExp(`^${start}([\\s\\S]*?)${start.replace("r", "")}$`, "iu");
	}

	getUnescapedString = (input: string): string => {
		const match = input.match(this.unescapedStringRegex);
		const value = match?.[1] ?? "";
		return value.replace(/\\n/gu, "\n");
	};
}

export const escapeSequences = ['r"""', "r'''", 'r"', "r'", '"""', "'''", '"', "'"].map(
	(start) => new StringEscapeSequence(start),
);
