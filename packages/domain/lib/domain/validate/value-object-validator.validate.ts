import { ValidationResult } from '../../validators';
import { ValidatorException } from './validator-exception.validate';
import { Validator } from './validator.validate';

export class ValueObjectValidator extends Validator {

  execute(validatorException: ValidatorException): ValidationResult[] {
    const exceptions: ValidationResult[] = [];

    validatorException.forEach((exception: ValidationResult) => {
      exceptions.push(exception);
    });

    return exceptions;
  }

}
