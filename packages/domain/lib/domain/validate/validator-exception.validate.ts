import { ValidationResult } from '../../validators';

export class ValidatorException extends Map<string, ValidationResult | Array<ValidationResult>> { }
