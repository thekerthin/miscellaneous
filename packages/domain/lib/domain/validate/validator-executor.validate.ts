import { v4 } from 'uuid';
import { Validator } from './validator.validate';
import { Exception } from '../../exceptions';
import { ValidatorException } from './validator-exception.validate';

export class ValidatorExecutor {

  private readonly exception: ValidatorException = new ValidatorException();

  constructor(private readonly validator: Validator) { }

  add(exception: Exception, key?: string, isValueArray?: boolean): this {
    let exceptionValue: Exception | Array<Exception> = exception;

    if (isValueArray) {
      const keyExceptions = (this.exception.get(key) || []) as Array<Exception>;
      exceptionValue = [...keyExceptions, exceptionValue];
    }

    this.exception.set(key || `random_${v4()}`, exceptionValue);

    return this;
  }

  get(key: string): Exception | Array<Exception> {
    return this.exception.get(key);
  }

  throwException(): void {
    this.validator.execute(this.exception);
  }

}
