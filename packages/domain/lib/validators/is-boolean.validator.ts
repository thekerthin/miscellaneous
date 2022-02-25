import { applyValidation, ValidationOptions } from './apply-validation';

export const IsBoolean = (validationOptions?: ValidationOptions) => applyValidation(
  {
    code: 'IS_BOOLEAN',
    defaultMessage: 'The value must be boolean.',
    validate: (value: any): boolean => {
      return value instanceof Boolean || typeof value === 'boolean';
    }
  },
  validationOptions
);
