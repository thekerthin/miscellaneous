import { Exception, ExceptionType, ValidationDictException } from '../../exceptions';
import { ValidatorException } from './validator-exception.validate';
import { Validator } from './validator.validate';

export class EntityValidator extends Validator {

  execute(validatorException: ValidatorException): void {
    const exceptions: ExceptionType = {};

    validatorException.forEach((exception: Array<Exception>, key: string) => {
      exceptions[key] = exception;
    });

    if (Object.keys(exceptions).length > 0) {
      throw new ValidationDictException('Entity Validation', exceptions);
    }
  }

}
