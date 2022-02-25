import { is } from 'ramda';
import { applyValidation, ValidationOptions } from './apply-validation';

export const IsString = (validationOptions?: ValidationOptions) => applyValidation(
  {
    code: 'IS_STRING',
    defaultMessage: 'The value must be a string.',
    validate: (value: any): boolean => {
      return is(String)(value);
    }
  },
  validationOptions
);
