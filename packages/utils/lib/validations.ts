import * as R from 'ramda';

export const isEmptyOrNil = R.either(R.isEmpty, R.isNil);
export const isNotEmptyOrNil = R.compose(R.not, isEmptyOrNil);
