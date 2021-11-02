import { isEmptyOrNil } from '@kerthin/utils';
import { ValueObject, Exception } from '../../lib';

export class Name extends ValueObject {
  toValue(): string | number | boolean | (string | number | boolean)[] {
    return this.value;
  }

  validate(): void {
    if (isEmptyOrNil(this.value)) {
      this.validator.add(new Exception('Cannot be empty.'));
    }

    this.validator.throwException();
  }
}
