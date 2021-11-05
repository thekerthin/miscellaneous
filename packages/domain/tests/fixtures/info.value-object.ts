import { isEmptyOrNil } from '@kerthin/utils';
import { DomainValueObject, Exception, ValueObject } from '../../lib';

@ValueObject()
export class Info extends DomainValueObject {
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
