import { getFormatArbEnabled } from '../shared/configuration';

export function sortArb(map: Map<string, unknown>): Map<string, unknown> {
  return new Map(
    [...map].sort((a, b) => {
      if (a[0] === '@@locale') {
        return -1;
      }
      if (b[0] === '@@locale') {
        return 1;
      }
      const compared = String(a[0].replace('@', '')).localeCompare(b[0].replace('@', ''));
      if (compared === 0) {
        if (a[0].startsWith('@')) {
          return 1;
        }
        if (b[0].startsWith('@')) {
          return -1;
        }
      }

      return compared;
    }),
  );
}

export function getSortedArb(text: string) {
  const sorted = Object.fromEntries(sortArb(new Map<string, unknown>(Object.entries<string>(JSON.parse(text) as string))));

  if (getFormatArbEnabled) {
    return JSON.stringify(sorted, null, 2);
  }

  return JSON.stringify(sorted);
}
