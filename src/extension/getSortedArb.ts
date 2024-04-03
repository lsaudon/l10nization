import { getFormatArbEnabled } from '../shared/configuration';
import { sortArb } from './sortArb';

export function getSortedArb(text: string) {
  const sorted = Object.fromEntries(sortArb(new Map<string, unknown>(Object.entries<string>(JSON.parse(text) as string))));

  if (getFormatArbEnabled) {
    return JSON.stringify(sorted, null, 2);
  }

  return JSON.stringify(sorted);
}
