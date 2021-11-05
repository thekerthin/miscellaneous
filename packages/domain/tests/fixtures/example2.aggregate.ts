import { AggregateRoot, Aggregate, ValueObjectProp } from '../../lib';
import { Name } from './name.value-object';
import { Info } from './info.value-object';
import { ExampleEntity } from './example.entity';

@Aggregate({ name: 'example2' })
export class ExampleAggregate2 extends AggregateRoot {
  @ValueObjectProp()
  name: Name;

  @ValueObjectProp(() => Info)
  info: Array<Info>;

  @ValueObjectProp()
  example: ExampleEntity;

  @ValueObjectProp(() => ExampleEntity)
  example2: Array<ExampleEntity>;

  static create(data): ExampleAggregate2 {
    const example2 = new ExampleAggregate2(data);
    return example2;
  }

}
