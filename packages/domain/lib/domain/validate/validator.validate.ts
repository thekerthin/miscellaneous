import { ValidatorException } from './validator-exception.validate';

/**
 * trigger exceptions
 */
export abstract class Validator {

  abstract execute(validatorException: ValidatorException): void;

}
