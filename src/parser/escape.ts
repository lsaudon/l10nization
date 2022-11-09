class Escape {
  start: string;

  startRegExp: RegExp;

  endRegExp: RegExp;

  negativeRegExp: RegExp;

  constructor(start: string, end?: string) {
    this.start = start;
    this.startRegExp = new RegExp(`${start}`, 'iu');
    this.endRegExp = new RegExp(`${end ?? start}`, 'iu');
    this.negativeRegExp = new RegExp(
      `(.|\r\n|\r|\n)*?(?=${end ?? start})`,
      'iu'
    );
  }
}

export const escapes = [
  new Escape('r"""', '"""'),
  new Escape("r'''", "'''"),
  new Escape('r"', '"'),
  new Escape("r'", "'"),
  new Escape('"""'),
  new Escape("'''"),
  new Escape('"'),
  new Escape("'")
];
