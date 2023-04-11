class StringEscapeSequence {
  private readonly unescapedStringRegex: RegExp;

  constructor(readonly start: string) {
    this.unescapedStringRegex = new RegExp(
      `^${start}([\\s\\S]*?)${start.replace('r', '')}$`,
      'iu'
    );
  }

  getUnescapedString = (input: string): string =>
    (input.match(this.unescapedStringRegex) ?? [])[1].replace(/\\n/gu, '\n');
}

export const escapeSequences = [
  'r"""',
  "r'''",
  'r"',
  "r'",
  '"""',
  "'''",
  '"',
  "'"
].map((start) => new StringEscapeSequence(start));
