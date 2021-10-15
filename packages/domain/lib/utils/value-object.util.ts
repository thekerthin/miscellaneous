import { has } from 'ramda';
import { VALUE_OBJECT_PROP } from '../decorators';
import { ValueObject } from '../domain';

export const getValueObjectsFromTarget = (target: any): any =>
  Reflect.getMetadata(VALUE_OBJECT_PROP, target);

export const isValueObject = (target: any) =>
  target.__proto__.name === ValueObject.name;

export const isValueObjectDefinedInTarget = (target: any, propName: string) => {
  const valueObjects = getValueObjectsFromTarget(target);
  return has(propName, valueObjects);
};
