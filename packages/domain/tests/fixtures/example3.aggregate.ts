import { AggregateRoot, Aggregate, ValueObjectProp } from '../../lib';
import { Name } from './name.value-object';
import { ExampleEntity } from './example.entity';

@Aggregate({ name: 'example3' })
export class ExampleAggregate3 extends AggregateRoot {
  @ValueObjectProp()
  name: Name;

  @ValueObjectProp({ type: ExampleEntity })
  example: Array<ExampleEntity>;

  static create(data): ExampleAggregate3 {
    const example3 = new ExampleAggregate3(data);
    return example3;
  }

}
