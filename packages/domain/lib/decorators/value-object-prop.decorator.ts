import { isEmptyOrNil } from '@kerthin/utils';
import { toLower } from 'ramda';
import { isValueObject, isEntity } from '../utils';

export const VALUE_OBJECT_PROP = '__VALUE_OBJECT_PROP__';

export type ValueObjectPropOptions = {
  type?: any;
};

export function ValueObjectProp(options: ValueObjectPropOptions = {}) {
  return  (target: any, propName: string) => {
    const valueObjects = Reflect.getMetadata(
      VALUE_OBJECT_PROP, target.constructor
    ) || {};
    const valueObjectTarget = Reflect.getMetadata(
      'design:type', target, propName
    );

    validate({ propName, valueObjectTarget, options });

    valueObjects[propName] = {
      target: options.type || valueObjectTarget,
      options: {
        ...options,
        isArray: toLower(valueObjectTarget.name) === 'array',
        isValueObject: isValueObject(valueObjectTarget),
        isEntity: isEntity(valueObjectTarget),
      }
    };

    Reflect.defineMetadata(
      VALUE_OBJECT_PROP, valueObjects, target.constructor
    );
  };
}

function validate({ propName, valueObjectTarget, options }): void {
  const targetName = valueObjectTarget.name;

  if (toLower(targetName) === 'array' && isEmptyOrNil(options.type)) {
    throw new Error(`The value object '${propName}' is an array so that 'type' option is required.`);
  }
}
