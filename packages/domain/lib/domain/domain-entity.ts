import { UniqueEntityID } from './unique-entity-id';
import { Actions, isValueObject, isValueObjectDefinedInTarget, Metadata, TargetMetadata, TargetPropertyMeta } from '../utils';
import { EntityValidator, ValidatorExecutor } from './validate';

const isEntity = (v: any): v is DomainEntity => {
  return v instanceof DomainEntity;
};

export abstract class DomainEntity {
  public readonly id: UniqueEntityID;

  protected readonly action: Actions;

  protected validator = new ValidatorExecutor(new EntityValidator());

  private static initialize(instance: any, data: any = {}): void {
    const target = instance.constructor;
    const { properties } = Metadata.getTargetMetadata(target) as TargetMetadata;
    const getTargetInstance = ({ target }: any) => (value: any) =>
      new target(value);

    Object.entries(properties).forEach(([propName, { valueObject }]: [string, TargetPropertyMeta]) => {
      const { options } = valueObject.meta;

      const dataValue = data[propName];

      if (options.isArray && !Array.isArray(dataValue)) {
        throw new Error(`The ${options.isEntity ? 'entity' : 'value object'} '${propName}' must be an Array.`);
      }

      instance[propName] = options.isArray ?
        dataValue.map(getTargetInstance(valueObject.meta)):
        getTargetInstance(valueObject.meta)(dataValue);
    });
  }

  constructor(data: any, id?: UniqueEntityID) {
    this.id = id || new UniqueEntityID();
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

    return this.id.equals(object.id);
  }

  public toRaw<T = any>(): T {
    const defaults = { id: this.id.toString() };
    const target = this.constructor;
    const { properties } = Metadata.getTargetMetadata(target) as TargetMetadata;
    return this.serialize(properties, this, defaults);
  }

  public validate(): void {
    const target = this.constructor;

    const filterTargets = ([propName]: [string, any]) =>
      isValueObjectDefinedInTarget(target, propName);

    const validate = ([propName, target]) => {
      Array.isArray(target)
        ? target.forEach((target) => this.runValidation({
          propName, target, isArray: true
        }))
        : this.runValidation({ propName, target });
    };

    Object.entries(this)
      .filter(filterTargets)
      .forEach(validate);

    this.validator.throwException();
  }

  private runValidation({ propName, target, isArray = false }) {
    try {
      target.validate(true, this.action);
      // TODO: this is important to get the array's positions where failed
      isArray && this.validator.add(null, propName, isArray);
    } catch (error) {
      this.validator.add(error, propName, isArray);
    }
  }

  private serialize(props: any, context: any, defaults: any = {}) {
    return Object.entries(props).reduce((raw: any, [propName, { valueObject }]: [string, TargetPropertyMeta]) => {
      const { target, options } = valueObject.meta;

      if (options.isArray && Array.isArray(context[propName])) {
        raw[propName] = context[propName].map((element) => {
          if (isValueObject(target)) return element.toValue();
          const { properties } = Metadata.getTargetMetadata(target) as TargetMetadata;
          return this.serialize(properties, element);
        });
      }

      if (options.isValueObject) {
        raw[propName] = context[propName].toValue();
      }

      if (options.isEntity) {
        const { properties } = Metadata.getTargetMetadata(target) as TargetMetadata;
        raw[propName] = this.serialize(properties, context[propName]);
      }

      return raw;
    }, defaults);
  }
}