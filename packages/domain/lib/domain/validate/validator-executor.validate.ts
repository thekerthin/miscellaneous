import { v4 } from 'uuid';
import { Validator, ValidatorResult } from './validator.validate';
import { ValidatorException } from './validator-exception.validate';
import { ValidationResult } from '../../validators';

export class ValidatorExecutor {

  private readonly exception: ValidatorException = new ValidatorException();

  constructor(private readonly validator: Validator) { }

  add(validation: ValidationResult, key?: string, isValueArray?: boolean, index?: number): this {
    let validationValue: ValidationResult | Array<ValidationResult> = validation;

    if (isValueArray) {
      const keyExceptions = (this.exception.get(key) || {}) as Array<ValidationResult>;
      validationValue = {...keyExceptions, [index]: validationValue};
    }

    this.exception.set(key || `random_${v4()}`, validationValue);

    return this;
  }

  get(key: string): ValidationResult | Array<ValidationResult> {
    return this.exception.get(key);
  }

  throwException(): ValidatorResult {
    return this.validator.execute(this.exception);
  }

}
