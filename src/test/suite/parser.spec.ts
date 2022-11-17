import {
  getStringWithoutEscapes,
  getVariablesInInterpolation
} from '../../shared/parser/parser';
import { expect } from 'chai';

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

describe('getVariableInInterpolation', () => {
  const tests = [
    { actual: 'a $b c', expected: ['b'] },
    { actual: 'a $b $c d', expected: ['b', 'c'] },
    { actual: 'a $name d', expected: ['name'] },
    { actual: 'a $otherName1 d', expected: ['otherName1'] },
    // eslint-disable-next-line no-template-curly-in-string
    { actual: 'a $name ${other.name} d', expected: ['name', 'other.name'] },
    // eslint-disable-next-line no-template-curly-in-string
    { actual: 'a ${other.toString()} d', expected: ['other.toString()'] }
  ];
  tests.forEach(({ actual, expected }) => {
    it(`should return ${charnL(expected.toString())} when ${charnL(
      actual
    )}`, () => {
      expect(getVariablesInInterpolation(actual)).to.be.all.members(expected);
    });
  });
});
