import isLengthValidator from 'validator/lib/isLength';
import { applyValidation, ValidationOptions } from './apply-validation';

export const MaxLength = (
  max: number,
  validationOptions?: ValidationOptions
) => applyValidation(
  {
    code: 'MAX_LENGTH',
    defaultMessage: `The value must be shorter than or equal to ${max} characters`,
    validate: (value: any): boolean => {
      return typeof value === 'string' && isLengthValidator(value, { min: 0, max });
    }
  },
  validationOptions
);
