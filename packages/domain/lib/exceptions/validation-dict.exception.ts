import { Exception } from './';

export type ExceptionType = { [name: string]: Array<Exception> };

export class ValidationDictException extends Exception {
  constructor(message: string, private readonly exceptions?: ExceptionType)  {
    super(message);
  }
}
