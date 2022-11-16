import * as P from 'parsimmon';
import { empty } from '../../shared/constants';
import { escapes } from './escape';

export function getStringWithoutEscapes(input: string): string {
  for (const escape of escapes) {
    if (input.startsWith(escape.start)) {
      const escapeStart = P.regexp(escape.startRegExp);
      const text = P.regexp(escape.negativeRegExp);
      const escapeEnd = P.regexp(escape.endRegExp);
      const result = escapeStart.chain(() => {
        return text.chain((txt) => {
          return escapeEnd.map(() => {
            return txt;
          });
        });
      });
      return result.tryParse(input).replace('\\n', '\n');
    }
  }
  return empty;
}
