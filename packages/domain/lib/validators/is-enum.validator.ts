import { applyValidation, ValidationOptions } from './apply-validation';

export const IsEnum = (enumEntity: any, validationOptions?: ValidationOptions) => applyValidation(
  {
    code: 'IS_ENUM',
    defaultMessage: 'The value must be a valid enum.',
    validate: (value: any): boolean => {
      const enumValues = Object.keys(enumEntity).map(k => enumEntity[k]);
      return enumValues.indexOf(value) >= 0;
    }
  },
  validationOptions
);
