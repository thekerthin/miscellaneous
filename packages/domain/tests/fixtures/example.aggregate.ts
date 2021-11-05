import { AggregateRoot, Aggregate, ValueObjectProp } from '../../lib';
import { Name } from './name.value-object';
import { Email } from './email.value-object';
import { Info } from './info.value-object';

@Aggregate({ name: 'example' })
export class ExampleAggregate extends AggregateRoot {
  @ValueObjectProp()
  exampleId: Name;

  @ValueObjectProp()
  name: Name;

  @ValueObjectProp()
  email: Email;

  @ValueObjectProp(() => Info)
  info: Array<Info>;

  static create(data): ExampleAggregate {
    const example = new ExampleAggregate(data);
    // example.validate();
    return example;
  }

}
