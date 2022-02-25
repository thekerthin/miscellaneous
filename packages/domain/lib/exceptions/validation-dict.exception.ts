import { isEmptyOrNil } from '@kerthin/utils';
import { Exception } from './';

export type ExceptionType = { [name: string]: Array<Exception> };

export class ValidationDictException extends Exception {

  constructor(
    message: string,
    private readonly exceptions?: ExceptionType
  )  { super(message); }

  parseExceptions() {
    console.log('this.exceptions', this.exceptions);

    const parsed = this.foobar(this.exceptions);
    // console.log('parsed', parsed);
    return parsed;
  }

  private foobar(exceptions: any) {
    if (isEmptyOrNil(exceptions)) return;

    if (Array.isArray(exceptions)) {
      return exceptions.map((exception) => {
        if (isEmptyOrNil(exception.exceptions)) {
          return exception.message;
        }
        return this.foobar(exception.exceptions);
      });
    }

    return Object
      .entries(exceptions)
      .reduce((parsed, [key, errors]: any) => {
        parsed[key] = this.foobar(Array.isArray(errors) ? errors : errors.exceptions);
        return parsed;
      }, {});
  }

}
