import { PlaceholderType } from './placeholderType';

export class Placeholder {
  name: string;

  value: string;

  type: PlaceholderType;

  constructor(name: string, value: string, type: PlaceholderType) {
    this.name = name;
    this.value = value;
    this.type = type;
  }
}
