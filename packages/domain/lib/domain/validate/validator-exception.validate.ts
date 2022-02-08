import { Exception } from '../../exceptions';

export class ValidatorException extends Map<string, Exception | Array<Exception>> { }
