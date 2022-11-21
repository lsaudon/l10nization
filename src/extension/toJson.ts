/* eslint-disable @typescript-eslint/no-explicit-any */
import { Placeholder } from '../placeholders/placeholder';
import { PlaceholderType } from '../placeholders/placeholderType';

export function toJson(
  text: string,
  key: string,
  value: string,
  placeholders: Placeholder[]
): string {
  const map = new Map<string, any>(
    Object.entries<string>(JSON.parse(text) as string)
  );
  if (placeholders.length === 0) {
    map.set(key, value);
  } else if (placeholders.length > 0) {
    let newValue = value;
    for (const placeholder of placeholders) {
      newValue = newValue
        .replace(`$\{${placeholder.value}}`, `{${placeholder.name}}`)
        .replace(`$${placeholder.value}`, `{${placeholder.name}}`);
    }
    map.set(key, newValue);
    const placeholdersMap = new Map<string, any>();
    for (const placeholder of placeholders) {
      const placeholderMap = new Map<string, any>([['type', placeholder.type]]);
      if (
        placeholder.type === PlaceholderType.DateTime ||
        (placeholder.type === PlaceholderType.int &&
          typeof placeholder.format !== 'undefined')
      ) {
        placeholderMap.set('format', placeholder.format);
      }
      placeholdersMap.set(placeholder.name, Object.fromEntries(placeholderMap));
    }
    map.set(
      `@${key}`,
      Object.fromEntries(
        new Map<string, any>([
          ['placeholders', Object.fromEntries(placeholdersMap)]
        ])
      )
    );
  }

  return JSON.stringify(Object.fromEntries(map), null, 2);
}
