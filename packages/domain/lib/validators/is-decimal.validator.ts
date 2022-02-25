import ValidatorJS from 'validator';
import isDecimalValidator from 'validator/lib/isDecimal';
import { applyValidation, ValidationOptions } from './apply-validation';

export const IsDecimal = (
  options?: ValidatorJS.IsDecimalOptions,
  validationOptions?: ValidationOptions
) => applyValidation(
  {
    code: 'IS_DECIMAL',
    defaultMessage: 'The value must be an decimal.',
    validate: (value: any): boolean => {
      return typeof value === 'string' && isDecimalValidator(value, options);
    }
  },
  validationOptions
);
