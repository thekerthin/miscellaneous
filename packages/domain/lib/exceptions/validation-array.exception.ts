import { Exception } from './';

export class ValidationArrayException extends Exception {
  constructor(message: string, private readonly exceptions?: Array<Exception>)  {
    super(message);
  }
}
