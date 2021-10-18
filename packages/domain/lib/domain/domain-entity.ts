import { UniqueEntityID } from './unique-entity-id';
import { getValueObjectsFromTarget, isValueObject, isValueObjectDefinedInTarget } from '../utils';
import { EntityValidator, ValidatorExecutor } from './validate';

const isEntity = (v: any): v is DomainEntity => {
  return v instanceof DomainEntity;
};

export abstract class DomainEntity {
  public readonly id: UniqueEntityID;

  protected validator = new ValidatorExecutor(new EntityValidator());

  private static initialize(instance: any, data: any = {}): void {
    const target = instance.constructor;
    const valueObjects = getValueObjectsFromTarget(target);
    const getTargetInstance = ({ target }: any) => (value: any) =>
      new target(value);

    Object.entries(valueObjects).forEach(([propName, value]: any) => {
      const { options } = value;
      const dataValue = data[propName];

      if (options.isArray && !Array.isArray(dataValue)) {
        throw new Error(`The ${options.isEntity ? 'entity' : 'value object'} '${propName}' must be an Array.`);
      }

      instance[propName] = options.isArray ?
        dataValue.map(getTargetInstance(value)):
        getTargetInstance(value)(dataValue);
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
    const valueObjects = getValueObjectsFromTarget(target);
    return this.serialize(valueObjects, this, defaults);
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
      target.validate();
      // TODO: this is important to get the array's positions where failed
      isArray && this.validator.add(null, propName, isArray);
    } catch (error) {
      this.validator.add(error, propName, isArray);
    }
  }

  private serialize(props: any, context: any, defaults: any = {}) {
    return Object.entries(props).reduce((raw: any, [propName, metadata]: any) => {
      const { target, options } = metadata;

      if (options.isArray && Array.isArray(context[propName])) {
        raw[propName] = context[propName].map((element) => {
          if (isValueObject(target)) return element.toValue();
          const valueObjects = getValueObjectsFromTarget(metadata.target);
          return this.serialize(valueObjects, element);
        });
      }

      if (options.isValueObject) {
        raw[propName] = context[propName].toValue();
      }

      if (options.isEntity) {
        const valueObjects = getValueObjectsFromTarget(metadata.target);
        raw[propName] = this.serialize(valueObjects, context[propName]);
      }

      return raw;
    }, defaults);
  }
}
