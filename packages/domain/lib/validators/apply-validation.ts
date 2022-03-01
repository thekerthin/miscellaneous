import { isUndefined } from '../utils';

export type ValidationOptions = {
  message?: string;
};

export type ApplyValidationOptions = {
  code: string;
  defaultMessage: string;
  forceValidation?: boolean;
  validate: (value: any) => boolean;
};

export type ValidationResult = {
  code: string;
  message: string;
} | null;

export const applyValidation = (
  options: ApplyValidationOptions,
  validationOptions?: ValidationOptions
) => (value: any): ValidationResult => {
  if (options.forceValidation !== true && isUndefined(value)) return null;
  if (options.validate(value)) return null;

  return {
    code: options.code,
    message: validationOptions?.message || options?.defaultMessage,
  };
};
