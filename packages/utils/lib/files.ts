import * as R from 'ramda';
import * as glob from 'glob';

export const getPrototypes = <T = any>(path: string): T[] =>
  glob.sync(path).map(require).map<T>(R.prop('default'));
