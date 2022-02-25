import { Exception } from './exception';

type Detail = {
  code: string;
  message: string;
};

export class DomainValidationException extends Exception {
  constructor(message: string, private readonly detail?: Detail)  {
    super(message);
  }
}
