import { expect } from 'chai';
import { resolvePath } from '../../shared/resolvePath';

describe('resolvePath', () => {
  it('should return the same path for a valid path without parent directories', () => {
    expect(resolvePath('**/my_other_app/lib/l10n/arb/*.arb')).to.be.equal('**/my_other_app/lib/l10n/arb/*.arb');
  });
  it('should fix the path by removing parent directories', () => {
    expect(resolvePath('**/my_other_app/../my_other_app/lib/l10n/arb/*.arb')).to.be.equal('**/my_other_app/lib/l10n/arb/*.arb');
  });
  it('should fix the path by removing parent directories and extra subdirectories', () => {
    expect(resolvePath('**/my_other_app/sub/../../my_other_app/lib/l10n/arb/*.arb')).to.be.equal('**/my_other_app/lib/l10n/arb/*.arb');
  });
});
