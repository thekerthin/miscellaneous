import { ValidationResult } from '../../validators';
import { ValidatorException } from './validator-exception.validate';

export type ValidatorResult =
  ValidationResult[]
  | {[key: string]: ValidationResult[]}
  | null;

export abstract class Validator {

  abstract execute(validatorException: ValidatorException): ValidatorResult;

}
