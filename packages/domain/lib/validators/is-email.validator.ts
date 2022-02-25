import isEmailValidator from 'validator/lib/isEmail';
import { applyValidation, ValidationOptions } from './apply-validation';

export const IsEmail = (validationOptions?: ValidationOptions) => applyValidation(
  {
    code: 'IS_EMAIL',
    defaultMessage: 'The value must be an email.',
    validate: (value: any): boolean => {
      return typeof value === 'string' && isEmailValidator(value);
    }
  },
  validationOptions
);
