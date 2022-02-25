import { ValidationResult } from '../../validators';
import { ValidatorException } from './validator-exception.validate';
import { Validator } from './validator.validate';

type EntityValidatorResult = {[key: string]: ValidationResult[]} | null;

export class EntityValidator extends Validator {

  execute(validatorException: ValidatorException): EntityValidatorResult {
    const validations: {[key: string]: ValidationResult[]} = {};

    validatorException.forEach((validation: Array<ValidationResult>, key: string) => {
      validations[key] = validation;
    });

    return Object.keys(validations).length > 0 ? validations : null;
  }

}
