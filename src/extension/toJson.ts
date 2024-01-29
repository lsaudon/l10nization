import { Placeholder } from '../placeholders/placeholder';
import { PlaceholderType } from '../placeholders/placeholderType';
import { notInclude } from '../placeholders/dateFormat';
import { sortArb } from './sortArb';

function getOptionalParametersMap(placeholder: Placeholder): Map<string, unknown> {
  const optionalParametersMap = new Map<string, unknown>();
  if (typeof placeholder.symbol !== 'undefined') {
    optionalParametersMap.set('symbol', placeholder.symbol);
  }
  if (typeof placeholder.decimalDigits !== 'undefined') {
    optionalParametersMap.set('decimalDigits', placeholder.decimalDigits);
  }
  if (typeof placeholder.customPattern !== 'undefined') {
    optionalParametersMap.set('customPattern', placeholder.customPattern);
  }
  return optionalParametersMap;
}

function getPlaceholderMap(placeholder: Placeholder) {
  const placeholderMap = new Map<string, unknown>();

  if (placeholder.type !== PlaceholderType.plural) {
    placeholderMap.set('type', placeholder.type);
  }

  switch (placeholder.type) {
    case PlaceholderType.DateTime:
      if (typeof placeholder.format !== 'undefined') {
        placeholderMap.set('format', placeholder.format);
        if (notInclude(placeholder.format)) {
          placeholderMap.set('isCustomDateFormat', 'true');
        }
      }
      return placeholderMap;
    case PlaceholderType.int:
    case PlaceholderType.num:
    case PlaceholderType.double:
      if (typeof placeholder.format !== 'undefined') {
        placeholderMap.set('format', placeholder.format);
        if (typeof placeholder.symbol !== 'undefined' || typeof placeholder.decimalDigits !== 'undefined' || typeof placeholder.customPattern !== 'undefined') {
          placeholderMap.set('optionalParameters', Object.fromEntries(getOptionalParametersMap(placeholder)));
        }
      }
      return placeholderMap;
    default:
      return placeholderMap;
  }
}

const getPlaceholdersMap = (placeholders: Placeholder[]): Map<string, unknown> =>
  placeholders.reduce((map, placeholder) => map.set(placeholder.name, Object.fromEntries(getPlaceholderMap(placeholder))), new Map<string, unknown>());

const replacePlaceholders = (value: string, placeholders: Placeholder[]): string =>
  placeholders.reduce((v, p) => {
    const current = v.replace(/\$\{?([^\s{}]+)\}?/u, `{${p.name}}`);
    return p.type === PlaceholderType.plural ? `{${p.name}, plural, other{${current}}}` : current;
  }, value);

export function toJson(
  text: string,
  isMetadataEnabled: boolean,
  key: string,
  description: string | null,
  value: string,
  placeholders: Placeholder[],
  sorted: boolean,
): string {
  const map = new Map<string, unknown>(Object.entries<string>(JSON.parse(text) as string));
  map.set(key, placeholders.length > 0 ? replacePlaceholders(value, placeholders) : value);

  if (isMetadataEnabled && (description || placeholders.length > 0)) {
    const entry = {
      ...(description && { description }),
      ...(placeholders.length > 0 && {
        placeholders: Object.fromEntries(getPlaceholdersMap(placeholders)),
      }),
    };
    map.set(`@${key}`, entry);
  }
  return JSON.stringify(
    Object.fromEntries(sorted ? sortArb(map) : map),
    (_key: string, _value: unknown): unknown => {
      if (typeof _value === 'string') {
        return _value.replace(/\\'/gu, "'");
      }
      return _value;
    },
    2,
  );
}
