import { camelize } from '../../camelize';
import { expect } from 'chai';

describe('Camelize', () => {
  it('should return empty when empty', () => {
    expect(camelize('')).to.be.equal('');
  });

  it('should return helloWorld when Hello World!', () => {
    expect(camelize('Hello World!')).to.be.equal('helloWorld');
  });

  it('should return without accent when with accent', () => {
    expect(
      camelize("Aujourd'hui nous sommes en été, il fait 50°C")
    ).to.be.equal('aujourdHuiNousSommesEnEteIlFait50C');
  });
});
