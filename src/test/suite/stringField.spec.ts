/* eslint-disable no-unused-expressions */
import { isNotString, isString } from '../../stringField';
import { expect } from 'chai';

describe('StringField', () => {
  it('should return true when isNotString', () => {
    expect(isNotString('', 0, 0)).to.be.true;
    expect(isNotString('a', 0, 1)).to.be.true;
  });
  it('should return true when isString', () => {
    expect(isString('""', 0, 0)).to.be.true;
    expect(isString('"a"', 0, 2)).to.be.true;
    expect(isString("'a'", 0, 2)).to.be.true;
  });
});
