import { isNotEmptyOrNil } from '@kerthin/utils';
import { applyValidation, ValidationOptions } from './apply-validation';

export const IsRequired = (validationOptions?: ValidationOptions) => applyValidation(
  {
    code: 'IS_REQUIRED',
    defaultMessage: 'The value is required.',
    validate: (value: any): boolean => {
      return isNotEmptyOrNil(value);
    }
  },
  validationOptions
);
