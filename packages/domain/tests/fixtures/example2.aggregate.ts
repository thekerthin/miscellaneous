import { AggregateRoot, Aggregate, ValueObjectProp, UniqueEntityID } from '../../lib';
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

  static create(data: any, ownId?: string): ExampleAggregate2 {
    return new ExampleAggregate2(data, ownId && new UniqueEntityID(ownId));
  }

  update<T>(data: T) {
    this.setValueObjects(data);
  }

}
