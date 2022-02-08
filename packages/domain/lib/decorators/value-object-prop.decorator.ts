import { Class, isEmptyOrNil } from '@kerthin/utils';
import { toLower } from 'ramda';
import { isValueObject, isEntity, Metadata } from '../utils';

export function ValueObjectProp(targetType?: () => Class) {
  return  (target: any, propName: string) => {
    const meta = Metadata.getTargetMetadata(target.constructor);

    const valueObjectType = Metadata.getTargetPropType(target, propName);

    // throw an exception in case something goes wrong
    validate({ propName, valueObjectType, targetType });

    if (isEmptyOrNil(meta.properties)) {
      meta.properties = {};
    }

    meta.properties[propName] = {
      valueObject: {
        meta: getValueObjectMeta(valueObjectType, targetType)
      }
    };

    Metadata.addTargetMetadata(target.constructor, meta);
  };
}


function validate({ propName, valueObjectType, targetType }): void {
  const targetName = valueObjectType.name;

  if (toLower(targetName) === 'array' && isEmptyOrNil(targetType?.())) {
    throw new Error(`The value object '${propName}' is an array so that 'type' option is required.`);
  }
}

function getValueObjectMeta(
  valueObjectTarget: any,
  targetType: () => Class
) {
  return {
    target: targetType?.() || valueObjectTarget,
    options: {
      isArray: toLower(valueObjectTarget.name) === 'array',
      isValueObject: isValueObject(valueObjectTarget),
      isEntity: isEntity(valueObjectTarget),
    }
  };
}
