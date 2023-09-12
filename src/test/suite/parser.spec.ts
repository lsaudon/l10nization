/* eslint-disable no-template-curly-in-string */
import { extractInterpolatedVariables, getUnescapedString } from '../../shared/parser/parser';
import { expect } from 'chai';

function charnL(value: string): string {
  if (value === '') {
    return 'empty';
  }
  return value.replace(/\r/gu, '\\r').replace(/\n/gu, '\\n');
}

describe('getUnescapedString', () => {
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
    { actual: "'\"'", expected: '"' },
    {
      actual: "'a ${DateFormat('yyyy').parse('2023-03-21')} b'",
      expected: "a ${DateFormat('yyyy').parse('2023-03-21')} b",
    },
  ];
  tests.forEach(({ actual, expected }) => {
    it(`should return ${charnL(expected)} when ${charnL(actual)}`, () => {
      expect(getUnescapedString(actual)).to.be.eq(expected);
    });
  });
});

describe('extractInterpolatedVariables', () => {
  const tests = [
    { actual: 'a $b c', expected: ['b'] },
    { actual: 'a $b $c d', expected: ['b', 'c'] },
    { actual: 'a $name d', expected: ['name'] },
    { actual: 'a $otherName1 d', expected: ['otherName1'] },
    { actual: 'a $name ${other.name} d', expected: ['name', 'other.name'] },
    { actual: 'a ${other.toString()} d', expected: ['other.toString()'] },
    {
      actual: "a ${DateFormat('yyyy').parse('2023-03-21')} b",
      expected: ["DateFormat('yyyy').parse('2023-03-21')"],
    },
  ];
  tests.forEach(({ actual, expected }) => {
    it(`should return ${charnL(expected.toString())} when ${charnL(actual)}`, () => {
      expect(extractInterpolatedVariables(actual)).to.be.all.members(expected);
    });
  });
});
