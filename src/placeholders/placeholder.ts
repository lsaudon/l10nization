import { PlaceholderType } from './placeholderType';

export class Placeholder {
  name: string;

  value: string;

  type: PlaceholderType;

  format: string | undefined;

  symbol: string | undefined;

  decimalDigits: number | undefined;

  customPattern: string | undefined;

  constructor(name: string, value: string, type: PlaceholderType) {
    this.name = name;
    this.value = value;
    this.type = type;
  }

  public addFormat(value: string): this {
    this.format = value;
    return this;
  }

  public addSymbol(value: string): this {
    this.symbol = value;
    return this;
  }

  public addDecimalDigits(value: number): this {
    this.decimalDigits = value;
    return this;
  }

  public addCustomPattern(format: string): this {
    this.customPattern = format;
    return this;
  }
}
