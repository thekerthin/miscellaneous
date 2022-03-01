import { Exception } from './exception';

export class DomainValidationException extends Exception {
  constructor(message: string, public readonly code?: string)  {
    super(message);
  }
}
