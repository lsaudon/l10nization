import { Placeholder } from '../placeholders/placeholder';

export class L10nObject {
  readonly isMetadataEnabled: boolean;
  readonly key: string;
  readonly description: string | null;
  readonly value: string;
  readonly placeholders: Placeholder[];

  constructor(isMetadataEnabled: boolean, key: string, description: string | null, value: string, placeholders: Placeholder[]) {
    this.isMetadataEnabled = isMetadataEnabled;
    this.key = key;
    this.description = description;
    this.value = value;
    this.placeholders = placeholders;
  }
}
