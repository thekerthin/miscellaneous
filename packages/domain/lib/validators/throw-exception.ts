import { isEmptyOrNil } from '@kerthin/utils';
import { curry } from 'ramda';
import { DomainValueObjectValidationException } from '../exceptions';
import { ValidationResult } from './apply-validation';

type Validations = {[key: string]: ValidationResult[]} | null;

export const throwValueObjectException = curry(
  (message: string, validations: Validations): void => {
    if(isEmptyOrNil(validations)) return;
    throw new DomainValueObjectValidationException('', validations);
  }
);
