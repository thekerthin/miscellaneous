import { isEmptyOrNil, isNotEmptyOrNil } from '@kerthin/utils';
import { UniqueEntityID } from './unique-entity-id';
import { Actions, isValueObject, isValueObjectDefinedInTarget, Metadata, TargetMetadata, TargetPropertyMeta } from '../utils';
import { EntityValidator, ValidatorExecutor } from './validate';
import { ValidationResult } from '../validators';

const isEntity = (v: any): v is DomainEntity => {
  return v instanceof DomainEntity;
};

export abstract class DomainEntity {
  public readonly ownId: UniqueEntityID;

  protected readonly action: Actions;

  protected validator = new ValidatorExecutor(new EntityValidator());

  private static initialize(instance: any, data: any = {}): void {
    const target = instance.constructor;
    const { properties } = Metadata.getTargetMetadata(target) as TargetMetadata;
    const getTargetInstance = ({ target }: any) => (value: any) =>
      new target(value);

    Object.entries(properties).forEach(([propName, { valueObject }]: [string, TargetPropertyMeta]) => {
      const { options } = valueObject.meta;

      let dataValue = data[propName];

      if (isEmptyOrNil(dataValue) && options.isArray) {
        dataValue = [];
      }

      // if (options.isArray && !Array.isArray(dataValue)) {
      //   throw new Error(`The ${options.isEntity ? 'entity' : 'value object'} '${propName}' must be an Array.`);
      // }

      instance[propName] = options.isArray ?
        dataValue.map(getTargetInstance(valueObject.meta)):
        getTargetInstance(valueObject.meta)(dataValue);
    });
  }

  constructor(data: any, ownId?: UniqueEntityID) {
    this.ownId = ownId || new UniqueEntityID();
    DomainEntity.initialize(this, data);
  }

  public equals(object?: DomainEntity): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this.ownId.equals(object.ownId);
  }

  public toRaw<T = any>(): T {
    const defaults = { ownId: this.ownId.toValue() };
    const target = this.constructor;
    const { properties } = Metadata.getTargetMetadata(target) as TargetMetadata;
    return this.serialize(properties, this, defaults);
  }

  public validate(): {[key: string]: ValidationResult[]} | null {
    const target = this.constructor;

    const filterTargets = ([propName]: [string, any]) =>
      isValueObjectDefinedInTarget(target, propName);

    const validate = ([propName, target]) => {
      Array.isArray(target)
        ? target.forEach((target, index) => this.runValidation({
          propName, target, isArray: true, index
        }))
        : this.runValidation({ propName, target });
    };

    Object.entries(this)
      .filter(filterTargets)
      .forEach(validate);

    return this.validator.throwException() as {[key: string]: ValidationResult[]} | null;
  }

  private runValidation({ propName, target, isArray = false, index = null }) {
    const validationResult = target.validate(this.action);
    if (isNotEmptyOrNil(validationResult)) {
      this.validator.add(validationResult, propName, isArray, index);
    }
  }

  private serialize(props: any, context: any, defaults: any = {}) {
    return Object.entries(props).reduce((raw: any, [propName, { valueObject }]: [string, TargetPropertyMeta]) => {
      const { target, options } = valueObject.meta;

      if (isEmptyOrNil(context[propName])) return raw;

      if (options.isArray && Array.isArray(context[propName])) {
        raw[propName] = context[propName].map((element) => {
          if (isValueObject(target)) return element.toValue();
          const _defaults = { ownId: element.ownId.toValue() };
          const { properties } = Metadata.getTargetMetadata(target) as TargetMetadata;
          return this.serialize(properties, element, _defaults);
        });
      }

      if (options.isValueObject) {
        raw[propName] = context[propName].toValue();
      }

      if (options.isEntity) {
        const _defaults = { ownId: context.ownId.toValue() };
        const { properties } = Metadata.getTargetMetadata(target) as TargetMetadata;
        raw[propName] = this.serialize(properties, context[propName], _defaults);
      }

      return raw;
    }, defaults);
  }
}
