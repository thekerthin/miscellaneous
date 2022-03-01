import { AggregateRoot, Aggregate, ValueObjectProp, OnAction } from '../../lib';
import { Actions } from '../../lib/utils';
import { Name } from './name.value-object';

@Aggregate('definitive')
export class DefinitiveAggregate extends AggregateRoot {

  @ValueObjectProp()
  name: Name;

  static create(data: any): DefinitiveAggregate {
    return new DefinitiveAggregate(data);
  }

  @OnAction(Actions.ON_CREATE)
  create() {
    const value = this.name.toValue();
    console.log('value', value);
  }


}
