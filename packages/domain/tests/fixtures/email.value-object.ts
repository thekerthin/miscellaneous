import { DomainValueObject, IsEmail, IsRequired, ValueObject } from '../../lib';

@ValueObject({
  defaultTo: [IsEmail(), IsRequired()]
})
export class Email extends DomainValueObject {}
