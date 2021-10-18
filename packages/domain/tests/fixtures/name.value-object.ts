import { isEmptyOrNil } from '@kerthin/utils';
import { ValueObject, Exception } from '../../lib';

export class Name extends ValueObject<any> {
  toValue(): string | number | boolean | (string | number | boolean)[] {
    throw new Error('Method not implemented.');
  }

  validate(): void {
    if (isEmptyOrNil(this.value)) {
      this.validator.add(new Exception('Cannot be empty.'));
    }

    this.validator.throwException();
  }
}
