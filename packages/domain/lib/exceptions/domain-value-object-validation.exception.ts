import { Exception } from './exception';

type Detail = {
  code: string;
  message: string;
};

type ExceptionType = { [name: string]: Array<Detail> };

export class DomainValueObjectValidationException extends Exception {
  constructor(message: string, public readonly properties?: ExceptionType)  {
    super(message);
  }
}
