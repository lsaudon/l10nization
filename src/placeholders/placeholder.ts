import { PlaceholderType } from './placeholderType';

export class Placeholder {
  name: string;

  value: string;

  type: PlaceholderType;

  format: string | undefined;

  constructor(
    name: string,
    value: string,
    type: PlaceholderType,
    format?: string
  ) {
    this.name = name;
    this.value = value;
    this.type = type;
    this.format = format;
  }
}
