import { DomainEntity, ValueObjectProp, Entity } from '../../lib';
import { Name } from './name.value-object';
import { Email } from './email.value-object';

@Entity({ name: 'example-entity' })
export class ExampleEntity extends DomainEntity {

  @ValueObjectProp()
  name: Name;

  @ValueObjectProp()
  email: Email;

}
