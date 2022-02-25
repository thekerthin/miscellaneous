import { compose, map, filter, forEach } from 'ramda';
import { Actions, Metadata } from '../utils';
import { ValueObjectOptions } from '../decorators';
import { ValidatorExecutor, ValueObjectValidator } from './validate';
import { isNotEmptyOrNil } from '@kerthin/utils';
import { ValidationResult } from '../validators';

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

  validate(action?: Actions): ValidationResult[] {
    const target = this['constructor'];
    const meta = Metadata.getTargetMetadata(target);
    const validators = meta.validators as ValueObjectOptions;

    const getValidations = compose(
      filter(isNotEmptyOrNil),
      map((validator) => validator(this.toValue()))
    );

    const addValidations = forEach(
      (validation) => this.validator.add(validation)
    );

    addValidations(getValidations(validators?.[Actions.DEFAULT_TO] || []));

    switch (action) {
      case Actions.ON_CREATE:
        addValidations(getValidations(validators?.[Actions.ON_CREATE] || []));
        break;
      case Actions.ON_UPDATE:
        addValidations(getValidations(validators?.[Actions.ON_UPDATE] || []));
        break;
      default:
        break;
    }

    return this.validator.throwException() as ValidationResult[];
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
