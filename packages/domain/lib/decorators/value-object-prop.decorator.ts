import { Class, isEmptyOrNil } from '@kerthin/utils';
import { toLower } from 'ramda';
import { isValueObject, isEntity, Metadata } from '../utils';

export type ValueObjectOptions = {
  type?: Class;
};

export function ValueObjectProp(options: ValueObjectOptions = {}) {
  return  (target: any, propName: string) => {
    // const options = defaultTo(_options);
    const meta = Metadata.getTargetMetadata(target.constructor);

    const valueObjectType = Metadata.getTargetPropType(target, propName);

    // throw an exception in case something goes wrong
    validate({ propName, valueObjectType, options });

    if (isEmptyOrNil(meta.properties)) {
      meta.properties = {};
    }

    meta.properties[propName] = {
      valueObject: {
        meta: getValueObjectMeta(valueObjectType, options)
      }
    };

    Metadata.addTargetMetadata(target.constructor, meta);
  };
}


function validate({ propName, valueObjectType, options }): void {
  const targetName = valueObjectType.name;

  if (toLower(targetName) === 'array' && isEmptyOrNil(options.type)) {
    throw new Error(`The value object '${propName}' is an array so that 'type' option is required.`);
  }
}

function getValueObjectMeta(
  valueObjectTarget: any,
  options: ValueObjectOptions = {}
) {
  return {
    target: options.type || valueObjectTarget,
    options: {
      ...options,
      isArray: toLower(valueObjectTarget.name) === 'array',
      isValueObject: isValueObject(valueObjectTarget),
      isEntity: isEntity(valueObjectTarget),
    }
  };
}
