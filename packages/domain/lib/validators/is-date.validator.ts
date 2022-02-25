import { applyValidation, ValidationOptions } from './apply-validation';

export const IsDate = (validationOptions?: ValidationOptions) => applyValidation(
  {
    code: 'IS_DATE',
    defaultMessage: 'The value must be a Date instance.',
    validate: (value: any): boolean => {
      return value instanceof Date && !isNaN(value?.getTime());
    }
  },
  validationOptions
);
