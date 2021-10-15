import { v4 } from 'uuid';
import { Validator } from './validator.validate';
import { Exception } from '../../exceptions';
import { ValidatorException } from './validator-exception.validate';

export class ValidatorExecutor {

  private readonly exception: ValidatorException = new ValidatorException();

  constructor(private readonly validator: Validator) { }

  add(exception: Exception, key?: string): this {
    this.exception.set(key || `random_${v4()}`, exception);
    return this;
  }

  get(key: string): Exception | Array<Exception> {
    return this.exception.get(key);
  }

  throwException(): void {
    this.validator.execute(this.exception);
  }

}
