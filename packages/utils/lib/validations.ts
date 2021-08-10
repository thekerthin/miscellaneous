import * as R from 'ramda';

export const isEmptyOrNil: (value: any) => boolean = R.either(
  R.isEmpty,
  R.isNil,
);

export const isNotEmptyOrNil: (value: any) => boolean = R.compose(
  R.not,
  isEmptyOrNil,
);
