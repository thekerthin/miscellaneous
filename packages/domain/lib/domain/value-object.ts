import { ValidatorExecutor, ValueObjectValidator } from './validate';

export abstract class ValueObject {
  protected validator = new ValidatorExecutor(new ValueObjectValidator());

  constructor(protected readonly value: any) {}

  abstract toValue():
    | string
    | number
    | boolean
    | Array<string | number | boolean>;

  abstract validate(): void;

  public equals(vo?: this): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.value === undefined) {
      return false;
    }
    return JSON.stringify(this.value) === JSON.stringify(vo.value);
  }

}
