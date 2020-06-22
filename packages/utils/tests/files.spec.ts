import * as chai from 'chai';
import * as path from 'path';
import { getPrototypes, getPrototypesForDI } from '../lib';
import { Example } from './fixtures/files/example';
import { Example2 } from './fixtures/files/example-2';
import { PatternExample } from './fixtures/files/pattern-example';

describe('files', () => {
  it('should get all prototypes passed a regular path', () => {
    const prototypes = getPrototypes(
      path.resolve(__dirname, 'fixtures/files/example.ts'),
    );

    chai.expect(Array.isArray(prototypes)).is.true;
    chai.expect(prototypes[0] === Example).is.true;
  });

  it(`should get all prototypes to be injected on nest.js' DI passed a regular path`, () => {
    const prototypes = getPrototypesForDI(
      path.resolve(__dirname, 'fixtures/files/example.ts'),
    );

    chai.expect(Array.isArray(prototypes)).is.true;
    chai.expect(prototypes[0].provide === Example).is.true;
    chai.expect(prototypes[0].useClass === Example).is.true;
  });

  it(`should get all prototypes to be injected on nest.js' DI passed a regular path using liskov substitution`, () => {
    const prototypes = getPrototypesForDI(
      path.resolve(__dirname, 'fixtures/files/example-2.ts'),
    );

    chai.expect(Array.isArray(prototypes)).is.true;
    chai.expect(prototypes[0].provide === PatternExample).is.true;
    chai.expect(prototypes[0].useClass === Example2).is.true;
  });
});
