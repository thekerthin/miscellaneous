import isMobilePhoneValidator from 'validator/lib/isMobilePhone';
import ValidatorJS from 'validator';
import { applyValidation, ValidationOptions } from './apply-validation';

export const IsMobilePhone = (
  locale: ValidatorJS.MobilePhoneLocale,
  validationOptions?: ValidationOptions
) => applyValidation(
  {
    code: 'IS_MOBILE',
    defaultMessage: 'The value must be a mobile phone.',
    validate: (value: any): boolean => {
      return typeof value === 'string' && isMobilePhoneValidator(value, locale);
    }
  },
  validationOptions
);

