import { is } from 'ramda';
import { Exception } from '../exceptions';
import { Validator } from './validator';

const isString = is(String);

export class IsString extends Validator {
  validate(value: any): Exception | null {
    const isNotString = !isString(value);
    return isNotString ? new Exception('The value must be a string.') : null;
  }
}
