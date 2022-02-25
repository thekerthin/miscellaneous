import { applyValidation, ValidationOptions } from './apply-validation';

export type IsNumberOptions = {
  allowNaN?: boolean;
  allowInfinity?: boolean;
  maxDecimalPlaces?: number;
}

export const IsNumber = (
  options?: IsNumberOptions,
  validationOptions?: ValidationOptions
) => applyValidation(
  {
    code: 'IS_NUMBER',
    defaultMessage: 'The value must be a number.',
    validate: (value: any): boolean => {
      if (typeof value !== 'number') {
        return false;
      }

      if (value === Infinity || value === -Infinity) {
        return options.allowInfinity;
      }

      if (Number.isNaN(value)) {
        return options.allowNaN;
      }

      if (options.maxDecimalPlaces !== undefined) {
        let decimalPlaces = 0;
        if (value % 1 !== 0) {
          decimalPlaces = value.toString().split('.')[1].length;
        }
        if (decimalPlaces > options.maxDecimalPlaces) {
          return false;
        }
      }

      return Number.isFinite(value);
    }
  },
  validationOptions
);
