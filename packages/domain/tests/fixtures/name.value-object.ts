import { isEmptyOrNil } from '@kerthin/utils';
import { DomainValueObject, ValueObject, IsString, Exception } from '../../lib';

@ValueObject({
  defaultTo: [IsString]
})
export class Name extends DomainValueObject {
  validate(): void {
    if (isEmptyOrNil(this.value)) {
      this.validator.add(new Exception('Cannot be empty.'));
    }

    this.validator.throwException();
  }
}
