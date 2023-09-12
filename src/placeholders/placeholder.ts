import { PlaceholderType } from './placeholderType';

export class Placeholder {
  public format?: string;

  public symbol?: string;

  public decimalDigits?: number;

  public customPattern?: string;

  constructor(
    readonly name: string,
    readonly value: string,
    readonly type: PlaceholderType,
  ) {}

  addFormat(value: string): this {
    this.format = value;
    return this;
  }

  addSymbol(value: string): this {
    this.symbol = value;
    return this;
  }

  addDecimalDigits(value: number): this {
    this.decimalDigits = value;
    return this;
  }

  addCustomPattern(format: string): this {
    this.customPattern = format;
    return this;
  }
}
