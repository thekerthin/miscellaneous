import { has } from 'ramda';
import { Metadata } from './metadata';
import { TargetMetadata } from './types';
import { ValueObject } from '../domain';

export const isValueObject = (target: any) =>
  target.__proto__.name === ValueObject.name;

export const isValueObjectDefinedInTarget = (target: any, propName: string) => {
  const { properties } = Metadata.getTargetMetadata(target) as TargetMetadata;
  return has(propName, properties);
};
