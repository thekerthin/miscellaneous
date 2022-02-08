import { AggregateRoot, Aggregate, ValueObjectProp, OnAction } from '../../lib';
import { Name } from './name.value-object';

@Aggregate('definitive')
export class DefinitiveAggregate extends AggregateRoot {

  @ValueObjectProp()
  name: Name;

  static create(data: any): DefinitiveAggregate {
    return new DefinitiveAggregate(data);
  }

  @OnAction('OnCreate')
  create() {
    const value = this.name.toValue();
    console.log('value', value);
  }


}
