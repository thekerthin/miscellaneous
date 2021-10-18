import { UniqueEntityID } from './unique-entity-id';
import { getValueObjectsFromTarget, isValueObjectDefinedInTarget } from '../utils';
import { EntityValidator, ValidatorExecutor } from './validate';

const isEntity = (v: any): v is DomainEntity<any> => {
  return v instanceof DomainEntity;
};

export abstract class DomainEntity<T = any> {
  public readonly id: UniqueEntityID;

  protected readonly props: T;

  protected validator = new ValidatorExecutor(new EntityValidator());

  private static initialize(instance: any, data: any): void {
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

  constructor(data: any) {
    DomainEntity.initialize(this, data);
  }

  public equals(object?: DomainEntity<T>): boolean {
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

    return this.serialize(this.props, defaults);
  }

  public validate(): void {
    const runValidation = ({ propName, target, isArray = false }) => {
      try {
        target.validate();
        // TODO: this is important to get the array's positions where failed
        isArray && this.validator.add(null, propName, isArray);
      } catch (error) {
        this.validator.add(error, propName, isArray);
      }
    };

    Object.entries(this)
      .filter(([propName]) => isValueObjectDefinedInTarget(this.constructor, propName))
      .forEach(([propName, target]) => {
        Array.isArray(target)
          ? target.forEach((target) => runValidation({ propName, target, isArray: true }))
          : runValidation({ propName, target });
      });

    this.validator.throwException();
  }

  private serialize(props: any, defaults: any = {}) {
    return Object.entries(props).reduce((raw: any, [propName, valueObject]: any) => {
      raw[propName] = Array.isArray(valueObject)
        ? valueObject.map((vo) => this.serialize(vo.props))
        : valueObject.toValue();

      return raw;
    }, defaults);
  }
}
