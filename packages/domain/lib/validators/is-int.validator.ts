import { applyValidation, ValidationOptions } from './apply-validation';

export const IsInt = (validationOptions?: ValidationOptions) => applyValidation(
  {
    code: 'IS_INT',
    defaultMessage: 'The value must be an integer.',
    validate: (value: any): boolean => {
      return typeof value === 'number' && Number.isInteger(value);
    }
  },
  validationOptions
);
