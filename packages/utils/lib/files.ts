import * as R from 'ramda';
import * as glob from 'glob';
import { isNotEmptyOrNil } from './validations';
import { Class } from './types';

const choosePrototype = R.ifElse(
  R.has('default'),
  R.prop('default'),
  R.converge(R.prop, [R.compose(R.head, R.keys), R.identity]),
);

export const getPrototypes = <T = any>(path: string): T[] =>
  glob.sync(path).map<T>(R.compose(choosePrototype, require));

type PrototypesForDI = {
  provide: Class;
  useClass: Class;
};

const withLiskov = R.applySpec<PrototypesForDI>({
  provide: R.ifElse(
    R.compose(isNotEmptyOrNil, R.path(['__proto__', 'name'])),
    R.prop('__proto__'),
    R.identity,
  ),
  useClass: R.identity,
});

export const getPrototypesForDI = <T = PrototypesForDI>(
  path: string,
): PrototypesForDI[] =>
  glob
    .sync(path)
    .map<PrototypesForDI>(R.compose(withLiskov, choosePrototype, require));
