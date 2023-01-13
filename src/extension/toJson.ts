/* eslint-disable complexity */
/* eslint-disable max-depth */
import { Placeholder } from '../placeholders/placeholder';
import { PlaceholderType } from '../placeholders/placeholderType';
import { notInclude } from '../placeholders/dateFormat';
import { sortArb } from './sortArb';

export function toJson(
  text: string,
  key: string,
  value: string,
  placeholders: Placeholder[],
  sorted: boolean
): string {
  const map = new Map<string, unknown>(
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
      if (placeholder.type === PlaceholderType.plural) {
        newValue = `{${placeholder.name}, plural, other{${newValue}}}`;
      }
    }
    map.set(key, newValue);
    const placeholdersMap = new Map<string, unknown>();
    for (const placeholder of placeholders) {
      const placeholderMap = new Map<string, unknown>([]);
      if (placeholder.type !== PlaceholderType.plural) {
        placeholderMap.set('type', placeholder.type);
      }
      if (
        placeholder.type === PlaceholderType.DateTime &&
        typeof placeholder.format !== 'undefined'
      ) {
        placeholderMap.set('format', placeholder.format);
        if (notInclude(placeholder.format)) {
          placeholderMap.set('isCustomDateFormat', 'true');
        }
      }

      if (
        (placeholder.type === PlaceholderType.int ||
          placeholder.type === PlaceholderType.num ||
          placeholder.type === PlaceholderType.double) &&
        typeof placeholder.format !== 'undefined'
      ) {
        placeholderMap.set('format', placeholder.format);
        if (
          typeof placeholder.symbol !== 'undefined' ||
          typeof placeholder.decimalDigits !== 'undefined' ||
          typeof placeholder.customPattern !== 'undefined'
        ) {
          const optionalParametersMap = new Map<string, unknown>([]);
          if (typeof placeholder.symbol !== 'undefined') {
            optionalParametersMap.set('symbol', placeholder.symbol);
          }
          if (typeof placeholder.decimalDigits !== 'undefined') {
            optionalParametersMap.set(
              'decimalDigits',
              placeholder.decimalDigits
            );
          }

          if (typeof placeholder.customPattern !== 'undefined') {
            optionalParametersMap.set(
              'customPattern',
              placeholder.customPattern
            );
          }

          placeholderMap.set(
            'optionalParameters',
            Object.fromEntries(optionalParametersMap)
          );
        }
      }

      placeholdersMap.set(placeholder.name, Object.fromEntries(placeholderMap));
    }
    map.set(
      `@${key}`,
      Object.fromEntries(
        new Map<string, unknown>([
          ['placeholders', Object.fromEntries(placeholdersMap)]
        ])
      )
    );
  }

  if (sorted) {
    return JSON.stringify(Object.fromEntries(sortArb(map)), null, 2);
  }
  return JSON.stringify(Object.fromEntries(map), null, 2);
}
