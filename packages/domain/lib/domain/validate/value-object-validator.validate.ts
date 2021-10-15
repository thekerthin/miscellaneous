import { Exception, ValidationArrayException } from '../../exceptions';
import { ValidatorException } from './validator-exception.validate';
import { Validator } from './validator.validate';

export class ValueObjectValidator extends Validator {

  execute(validatorException: ValidatorException): void {
    const exceptions: Array<Exception> = [];

    validatorException.forEach((exception: Exception) => {
      exceptions.push(exception);
    });

    if (exceptions.length > 0) {
      throw new ValidationArrayException('Value Object Validation', exceptions);
    }
  }

}
