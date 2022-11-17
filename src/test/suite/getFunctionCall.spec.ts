import { expect } from 'chai';
import { getFunctionCall } from '../../extension/getFunctionCall';

describe('toJson', () => {
  it('should return l10n call when messages with no variable', () => {
    expect(getFunctionCall('l10n', 'hello', [])).to.be.equal('l10n.hello');
  });
  it('should return l10n call when messages with 1 variable', () => {
    expect(getFunctionCall('l10n', 'hello', ['name'])).to.be.equal(
      'l10n.hello(name)'
    );
  });
  it('should return l10n call when messages with 2 variables', () => {
    expect(getFunctionCall('l10n', 'hello', ['name', 'otherName'])).to.be.equal(
      'l10n.hello(name, otherName)'
    );
  });
});
