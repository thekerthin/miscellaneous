import { DomainValueObject, ValueObject, IsString,  IsRequired } from '../../lib';

@ValueObject({
  defaultTo: [
    IsString(),
    IsRequired()
  ]
})
export class Name extends DomainValueObject {}
