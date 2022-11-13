import { expect } from 'chai';
import { getStringWithoutEscapes } from '../../extension/parser/parser';

function charnL(value: string): string {
  if (value === '') {
    return 'empty';
  }
  return value.replace(/\r/gu, '\\r').replace(/\n/gu, '\\n');
}

describe('getStringWithoutEscapes', () => {
  const tests = [
    { actual: '""', expected: '' },
    { actual: "''", expected: '' },
    { actual: '""""""', expected: '' },
    { actual: "''''''", expected: '' },
    { actual: 'r""""""', expected: '' },
    { actual: "r''''''", expected: '' },
    { actual: '"""\n"""', expected: '\n' },
    { actual: "'''\n'''", expected: '\n' },
    { actual: 'r"""\r\n"""', expected: '\r\n' },
    { actual: "r'''\r\n'''", expected: '\r\n' },
    { actual: '"a"', expected: 'a' },
    { actual: "'a'", expected: 'a' },
    { actual: "r'a'", expected: 'a' },
    { actual: 'r"a"', expected: 'a' },
    { actual: "'''a'''", expected: 'a' },
    { actual: '"""a"""', expected: 'a' },
    { actual: "r'''a'''", expected: 'a' },
    { actual: 'r"""a"""', expected: 'a' },
    { actual: "'''a\nb'''", expected: 'a\nb' },
    { actual: '"""a\nb"""', expected: 'a\nb' },
    { actual: "r'''a\nb'''", expected: 'a\nb' },
    { actual: 'r"""a\nb"""', expected: 'a\nb' },
    { actual: "'''a\r\nb'''", expected: 'a\r\nb' },
    { actual: '"""a\r\nb"""', expected: 'a\r\nb' },
    { actual: "r'''a\r\nb'''", expected: 'a\r\nb' },
    { actual: 'r"""a\r\nb"""', expected: 'a\r\nb' },
    { actual: '"\'"', expected: "'" },
    { actual: "'\"'", expected: '"' }
  ];
  tests.forEach(({ actual, expected }) => {
    it(`should return ${charnL(expected)} when ${charnL(actual)}`, () => {
      expect(getStringWithoutEscapes(actual)).to.be.eq(expected);
    });
  });
});
