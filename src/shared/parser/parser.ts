import { empty } from '../constants';
import { escapeSequences } from './escape';

export const getUnescapedString = (input: string): string =>
  escapeSequences
    .find((e) => input.startsWith(e.start))
    ?.getUnescapedString(input) ?? empty;

export const extractInterpolatedVariables = (input: string): string[] =>
  Array.from(input.matchAll(/\$\{?([^\s{}]+)\}?/gu), (match) => match[1]);
