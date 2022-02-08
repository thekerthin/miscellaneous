import { compose, is, map, filter, forEach } from 'ramda';
import { Actions, Metadata } from '../utils';
import { Exception } from '../exceptions';
import { ValueObjectOptions } from '../decorators';
import { ValidatorExecutor, ValueObjectValidator } from './validate';

export abstract class DomainValueObject {
  protected validator = new ValidatorExecutor(new ValueObjectValidator());

  constructor(protected readonly value: any) {}

  toValue():
    | string
    | number
    | boolean
    | Array<string | number | boolean> {
    return this.value;
  }

  validate(throwException = true, action: Actions = Actions.DEFAULT_TO): void {
    const target = this['constructor'];
    const meta = Metadata.getTargetMetadata(target);
    const validators = meta.validators as ValueObjectOptions;

    const getExceptions = compose(
      filter(is(Exception)),
      map((validatorTarget) => new validatorTarget()
        .validate(this.toValue()))
    );
    const addExceptions = forEach(
      (exception) => this.validator.add(exception)
    );

    switch (action) {
      case 'OnCreate':
        addExceptions(getExceptions(validators?.[Actions.ON_CREATE] || []));
        break;
      case 'OnUpdate':
        addExceptions(getExceptions(validators?.[Actions.ON_UPDATE] || []));
        break;
      default:
        addExceptions(getExceptions(validators?.[Actions.DEFAULT_TO] || []));
        break;
    }

    throwException && this.validator.throwException();
  }

  equals(vo?: this): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.value === undefined) {
      return false;
    }
    return JSON.stringify(this.value) === JSON.stringify(vo.value);
  }

}
