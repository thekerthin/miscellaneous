import { Class } from '@kerthin/utils';
import { ValueObject } from './domain/value-object';
import { ValueObjectDefaultProps } from './ValueObjectDefaultProps';

type ValueObjectDefinition = Class<ValueObject<any>> & any;

export const transformValueObject =
  (valueObjectClass: ValueObjectDefinition) =>
    ({ value }) =>
      valueObjectClass.create({ value } as ValueObjectDefaultProps<any>);
