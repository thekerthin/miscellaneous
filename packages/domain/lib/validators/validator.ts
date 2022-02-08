import { Exception } from '../exceptions';

export abstract class Validator {
  abstract validate(value: any): Exception | null;
}
