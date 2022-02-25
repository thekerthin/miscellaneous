import isLengthValidator from 'validator/lib/isLength';
import { applyValidation, ValidationOptions } from './apply-validation';

export const MinLength = (
  min: number,
  validationOptions?: ValidationOptions
) => applyValidation(
  {
    code: 'MIN_LENGTH',
    defaultMessage: `The value must be longer than or equal to ${min} characters`,
    validate: (value: any): boolean => {
      return typeof value === 'string' && isLengthValidator(value, { min });
    }
  },
  validationOptions
);
